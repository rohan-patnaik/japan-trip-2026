/* Dated offers; geographic distances are not travel distances. */
const root = document.documentElement;
const $ = id => document.getElementById(id);
const prefs = {get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
let planner, tiles, groups=[], selected=0, markers=new Map(), layers={}, connector;
const categories={held:['Held stay','H','#70b7ff'],proposed:['Candidate stay','?','#f5bd58'],visit:['Itinerary','●','#f88185'],optional:['Optional','+','#75d3a2'],station:['Station','T','#c3c7cd']};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setTheme(theme){root.dataset.theme=theme;$('theme').textContent=theme==='dark'?'Light mode':'Dark mode';prefs.set('explore-theme',theme);}
function tileURL(){return 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';}
setTheme(prefs.get('explore-theme')||'dark');$('theme').onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');
let width=Number(prefs.get('w'))||80;
function setWidth(v){width=Math.max(50,Math.min(100,v));root.style.setProperty('--w',width+'vw');$('width').textContent=width+'%';prefs.set('w',width);if(planner)requestAnimationFrame(()=>planner.invalidateSize());}
setWidth(width);$('less').onclick=()=>setWidth(width-5);$('more').onclick=()=>setWidth(width+5);
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-city]').forEach(r=>r.hidden=b.dataset.filter!=='All'&&r.dataset.city!==b.dataset.filter);document.querySelectorAll('[data-filter]').forEach(c=>c.setAttribute('aria-pressed',String(c===b)))});
function km(a,b){const r=Math.PI/180;const h=Math.sin((b.lat-a.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lon-a.lon)*r/2)**2;return 12742.0176*Math.asin(Math.sqrt(Math.min(1,h)));}
function distance(a,b){const d=km(a,b);return d<1?Math.round(d*1000)+' m':d.toFixed(1)+' km';}
function directions(a,b,mode='transit'){return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(a.lat+','+a.lon)+'&destination='+encodeURIComponent(b.lat+','+b.lon)+'&travelmode='+mode;}
function getPin(id){return groups[selected].pins.find(p=>p.id===id)}
function focusPins(pins){if(pins.length)planner.fitBounds(pins.map(p=>[p.lat,p.lon]),{padding:[35,35],maxZoom:15,animate:false});}
function popup(p){return '<b>'+esc(p.name)+'</b><small>'+categories[p.kind][0]+'</small><p>'+esc(p.note)+'</p><a href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+' '+p.lat+','+p.lon)+'" target="_blank" rel="noopener">Open place</a>'+(p.source?' · <a href="'+esc(p.source)+'" target="_blank" rel="noopener">Visitor info</a>':'');}
function showGroup(index){selected=index;const g=groups[index];Object.values(layers).forEach(l=>planner.removeLayer(l));layers={};markers.clear();if(connector)planner.removeLayer(connector);
 Object.keys(categories).forEach(k=>layers[k]=L.layerGroup().addTo(planner));
 g.pins.forEach(p=>{const [label,symbol,color]=categories[p.kind];const icon=L.divIcon({className:'pin '+p.kind,html:'<span style="--pin:'+color+'">'+symbol+'</span>',iconSize:[28,28],iconAnchor:[14,14]});const m=L.marker([p.lat,p.lon],{icon,title:p.name+' · '+label,alt:p.name,keyboard:true,zIndexOffset:p.kind==='held'?600:p.kind==='proposed'?500:0}).bindTooltip(p.name,{direction:'top',offset:[0,-12]}).bindPopup(popup(p));m.addTo(layers[p.kind]);m.on('click',()=>{if(p.base)$('from').value=p.id;else $('to').value=p.id;updateRoute(false)});markers.set(p.id,m)});
 document.querySelectorAll('[data-map]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.map===index)));
 document.querySelectorAll('[data-layer]').forEach(c=>{c.checked=true});
 ['from','to'].forEach(id=>{const s=$(id);s.replaceChildren();const ps=id==='from'?[...g.pins.filter(p=>p.base),...g.pins.filter(p=>!p.base)]:g.pins;ps.forEach(p=>s.add(new Option(categories[p.kind][1]+' '+p.name,p.id)))});
 $('to').value=(g.pins.find(p=>p.dest==='teamlab')||g.pins.find(p=>p.kind==='visit')).id;
 $('group-note').textContent=g.notes;planner.setView(g.center,g.zoom,{animate:false});updateRoute(false);
 const legend=$('pin-legend');legend.replaceChildren();g.pins.forEach(p=>{const li=document.createElement('li');const b=document.createElement('button');b.textContent=categories[p.kind][1]+' '+p.name;b.onclick=()=>{planner.setView([p.lat,p.lon],15,{animate:false});markers.get(p.id).openPopup()};li.append(b);legend.append(li)});
}
const setaRoutes={
 kyoto:['JR Seta → Kyoto (Biwako Line westbound).','0 changes · 17–20 min on train; allow 25–35 min from hotel.',640],
 teamlab:['Walk to Seta → JR Kyoto → walk ~15–20 min to teamLab.','0 train changes · allow 45–60 min door to door. Aim to arrive by 14:15 on 24 Nov.',640],
 inari:['JR Seta → Kyoto → Nara Line LOCAL → Inari → shrine.','1 change · allow 45–60 min door to door. Rapid trains skip Inari.',640],
 arashiyama:['JR Seta → Kyoto → Sagano Line → Saga-Arashiyama → walk.','1 change · allow 60–80 min to the bamboo grove; train/connection ~40–60 min.',980],
 sanjo:['JR Seta → Yamashina → Tozai subway → Sanjo Keihan.','1 change · allow 40–55 min. Use the subway entrance at Yamashina.',1000],
 gion:['JR Seta → Yamashina → Tozai → Sanjo Keihan → walk south to Gion.','1 change · allow 50–65 min. Walk 15–20 min from Sanjō; a Keihan hop adds another fare.',1000],
 shijo:['JR Seta → Kyoto → Karasuma subway → Shijō.','1 change · allow 35–50 min; Shijō is 2 subway stops north of Kyoto.',1080],
 kiyomizu:['JR Seta → Kyoto → bus 206 to Gojozaka → uphill walk.','1 change · allow 60–90 min; buses can be crowded. Rail alternative via Tofukuji / Kiyomizu-Gojo avoids road delays.',1100]
};
function routeAdvice(a,b){if(a.id===b.id)return ['Same pin selected. Choose another destination.'];
 if(a.base==='seta'&&setaRoutes[b.dest]){const v=setaRoutes[b.dest];return [v[0],v[1],'Planning fare for both, one way: JPY ≈¥'+v[2].toLocaleString()+' / INR ≈₹'+Math.round(v[2]*.59912)+'. Local transport only; admission excluded.','No advance booking: one Suica/ICOCA per person, or buy ordinary tickets at the station.'];}
 if(['otsu','ishiyama'].includes(a.base)&&b.dest){return ['JR '+(a.base==='otsu'?'Ōtsu':'Ishiyama')+' → '+(['gion','sanjo'].includes(b.dest)?'Yamashina → Tozai subway → Sanjo Keihan.':'Kyoto → onward city connection.'),'Same transfer pattern as the Seta guide below; closer to Kyoto. Check departure-time fares in Live transit.'];}
 if(['shijo','sanjo','gion'].includes(a.base)&&b.dest){const base=a.base;if(b.dest==='inari'&&base!=='shijo')return ['Keihan '+(base==='sanjo'?'Sanjo':'Gion-Shijō')+' → Fushimi-Inari on a stopping service → walk.','No reservation for ordinary trains. Check that the service stops at Fushimi-Inari.'];if(b.dest==='arashiyama')return ['Walk / local connection to Hankyu '+(base==='shijo'?'Karasuma':'Kyoto-Kawaramachi')+' → Katsura → Hankyu Arashiyama.','1 train change; allow extra walking to Torokko Saga. For the scenic train, JR Saga-Arashiyama may be the easier arrival.'];return [base==='shijo'?'Karasuma subway: Shijō → Kyoto for Shinkansen, teamLab or JR connections.':'Keihan serves eastern Kyoto; Kyoto Station requires a connection (e.g. Tofukuji → JR).','Use Live transit for this exact pair. Area pins are not hotel entrances.'];}
 if(a.base==='rti'&&b.id==='osaka-0')return ['Walk to Shin-Imamiya → JR Osaka Loop Line → Nishikujō → JR Yumesaki Line → Universal City → USJ.','Usually 1 change; some through trains. Allow 40–55 min from the approximate stay area. Ordinary tickets / Suica / ICOCA; no reservation.'];
 if(a.base==='rti'&&['osaka-3','osaka-4','osaka-6'].includes(b.id))return ['Walk to Dōbutsuen-mae → Midosuji subway → Namba → walk.','Direct train; allow roughly 20–35 min from the stay area. No advance booking.'];
 if(a.base==='tokyo'&&b.id.startsWith('kasukabe'))return ['Reach Kita-Senju → Tobu Skytree Line express towards Kasukabe → walk to LaLa Garden.','From Iriya: Hibiya Line to Kita-Senju, then change. Allow roughly 70–90 min from your stay area. Ordinary express needs no seat reservation; limited express needs a separate ticket.'];
 return [b.kind==='optional'?b.note:'Use Live transit for departure-time trains, transfers and fares.','The dotted line is a geographic comparison, not a walking or train route.'];}
function updateRoute(fit=true){const a=getPin($('from').value),b=getPin($('to').value);if(!a||!b)return;$('distance').textContent=distance(a,b)+' straight-line';$('transit-link').href=directions(a,b);$('walk-link').href=directions(a,b,'walking');$('route-advice').replaceChildren(...routeAdvice(a,b).map(t=>{const li=document.createElement('li');li.textContent=t;return li}));
 if(connector)planner.removeLayer(connector);connector=L.polyline([[a.lat,a.lon],[b.lat,b.lon]],{color:'#9dc6ec',weight:2,dashArray:'5 7',interactive:false}).addTo(planner);if(fit)focusPins([a,b]);
 const near=groups[selected].pins.filter(p=>p.id!==a.id&&['visit','optional'].includes(p.kind)).sort((x,y)=>km(a,x)-km(a,y));const list=$('nearby-list');list.replaceChildren();near.slice(0,8).forEach(p=>{const li=document.createElement('li');const b=document.createElement('button');b.textContent=categories[p.kind][1]+' '+p.name; b.onclick=()=>{$('to').value=p.id;updateRoute();markers.get(p.id).openPopup()};const d=document.createElement('span');d.textContent=distance(a,p);li.append(b,d);list.append(li)});$('nearby-title').textContent='Closest pins to '+a.name;
}
$('from').onchange=()=>updateRoute();$('to').onchange=()=>updateRoute();
fetch('assets/maps/explore.json').then(r=>{if(!r.ok)throw Error('Map data');return r.json()}).then(data=>{groups=data;if(!window.L)throw Error('Map library');planner=L.map('explore-map',{scrollWheelZoom:false});tiles=L.tileLayer(tileURL(),{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(planner);L.control.scale({imperial:false}).addTo(planner);tiles.on('tileerror',()=>{$('map-status').textContent='If the basemap is blank, pin distances and Live transit still work.'});
 groups.forEach((g,i)=>{const b=document.createElement('button');b.textContent=g.title;b.dataset.map=i;b.onclick=()=>showGroup(i);$('map-tabs').append(b)});
 Object.entries(categories).forEach(([k,[label,symbol,color]])=>{const l=document.createElement('label');const c=document.createElement('input');c.type='checkbox';c.checked=true;c.dataset.layer=k;c.onchange=()=>{if(c.checked)layers[k].addTo(planner);else planner.removeLayer(layers[k])};const s=document.createElement('span');s.style.color=color;s.textContent=symbol+' '+label;l.append(c,s);$('map-key').append(l)});
 $('fit-all').onclick=()=>focusPins(groups[selected].pins);$('fit-city').onclick=()=>planner.setView(groups[selected].center,groups[selected].zoom,{animate:false});$('fit-pair').onclick=()=>focusPins([getPin($('from').value),getPin($('to').value)]);showGroup(0);new ResizeObserver(()=>planner.invalidateSize()).observe($('explore-map'));
}).catch(e=>{$('map-status').textContent='Interactive map unavailable. Open the static maps below.';console.error(e)});
