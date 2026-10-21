/* Dated offers; geographic distances are not travel distances. */
const root = document.documentElement;
const $ = id => document.getElementById(id);
const prefs = {get(k){try{return localStorage.getItem(k)}catch{return null}},set(k,v){try{localStorage.setItem(k,v)}catch{}}};
let planner, tiles, groups=[], allPins=[], selected=0, markers=new Map(), layers={}, connector;
const categories={held:['Held stay','H','#70b7ff'],proposed:['Candidate stay','?','#f5bd58'],visit:['Itinerary','●','#f88185'],optional:['Optional','+','#75d3a2'],station:['Station','T','#c3c7cd']};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function setTheme(theme){root.dataset.theme=theme;$('theme').textContent=theme==='dark'?'Light mode':'Dark mode';prefs.set('explore-theme',theme);}
function tileURL(){return 'https://tile.openstreetmap.jp/styles/osm-bright-en/{z}/{x}/{y}.png';}
setTheme(prefs.get('explore-theme')||'dark');$('theme').onclick=()=>setTheme(root.dataset.theme==='dark'?'light':'dark');
function setMapTheme(theme){const dark=theme!=='light';$('explore-map').dataset.mapTheme=dark?'dark':'light';$('map-theme').textContent='Map: '+(dark?'Dark':'Light');$('map-theme').setAttribute('aria-pressed',String(dark));$('map-theme').title='Switch map to '+(dark?'light':'dark')+' mode';prefs.set('explore-map-theme',dark?'dark':'light');}
setMapTheme(prefs.get('explore-map-theme')||'dark');$('map-theme').onclick=()=>setMapTheme($('explore-map').dataset.mapTheme==='dark'?'light':'dark');
function enableMapShortcuts(){
 const area=$('explore-map');let hovered=false;
 area.addEventListener('pointerenter',()=>hovered=true);area.addEventListener('pointerleave',()=>hovered=false);
 window.addEventListener('blur',()=>hovered=false);
 document.addEventListener('keydown',e=>{
  if(!hovered||!e.ctrlKey||e.altKey||e.metaKey||e.target.closest?.('input,textarea,select,[contenteditable="true"]'))return;
  const direction=['+','='].includes(e.key)||e.code==='NumpadAdd'?1:['-','_'].includes(e.key)||e.code==='NumpadSubtract'?-1:0;
  if(!direction)return;
  e.preventDefault();e.stopPropagation();planner.setZoom(planner.getZoom()+direction,{animate:false});
 },true);
}
let width=Number(prefs.get('w'))||80;
function setWidth(v){width=Math.max(50,Math.min(100,v));root.style.setProperty('--w',width+'vw');$('width').textContent=width+'%';prefs.set('w',width);if(planner)requestAnimationFrame(()=>planner.invalidateSize());}
setWidth(width);$('less').onclick=()=>setWidth(width-5);$('more').onclick=()=>setWidth(width+5);
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-city]').forEach(r=>r.hidden=b.dataset.filter!=='All'&&r.dataset.city!==b.dataset.filter);document.querySelectorAll('[data-filter]').forEach(c=>c.setAttribute('aria-pressed',String(c===b)))});
function km(a,b){const r=Math.PI/180;const h=Math.sin((b.lat-a.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((b.lon-a.lon)*r/2)**2;return 12742.0176*Math.asin(Math.sqrt(Math.min(1,h)));}
function distance(a,b){const d=km(a,b);return d<1?Math.round(d*1000)+' m':d.toFixed(1)+' km';}
function directions(a,b,mode='transit'){return 'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(a.lat+','+a.lon)+'&destination='+encodeURIComponent(b.lat+','+b.lon)+'&travelmode='+mode;}
function getPin(id){return allPins.find(p=>p.id===id)}
function focusPins(pins){if(pins.length)planner.fitBounds(pins.map(p=>[p.lat,p.lon]),{padding:[35,35],maxZoom:15,animate:false});}
function popup(p){return '<b>'+esc(p.name)+'</b><small>'+categories[p.kind][0]+'</small><p>'+esc(p.note)+'</p><a href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(p.name+' '+p.lat+','+p.lon)+'" target="_blank" rel="noopener">Open place</a>'+(p.source?' · <a href="'+esc(p.source)+'" target="_blank" rel="noopener">Visitor info</a>':'');}
function buildPins(){
 Object.keys(categories).forEach(k=>layers[k]=L.layerGroup().addTo(planner));
 allPins.forEach(p=>{const [label,symbol,color]=categories[p.kind];const icon=L.divIcon({className:'pin '+p.kind,html:'<span style="--pin:'+color+'">'+symbol+'</span>',iconSize:[28,28],iconAnchor:[14,14]});const m=L.marker([p.lat,p.lon],{icon,title:p.name+' · '+label,alt:p.name,keyboard:true,zIndexOffset:p.kind==='held'?600:p.kind==='proposed'?500:0}).bindTooltip(p.name,{direction:'top',offset:[0,-12]}).bindPopup(popup(p));m.addTo(layers[p.kind]);m.on('click',()=>{if(p.base)$('from').value=p.id;else $('to').value=p.id;updateRoute(false)});markers.set(p.id,m)});
 ['from','to'].forEach(id=>{const select=$(id);groups.forEach(g=>{const optgroup=document.createElement('optgroup');optgroup.label=g.title;const ps=id==='from'?[...g.pins.filter(p=>p.base),...g.pins.filter(p=>!p.base)]:g.pins;ps.forEach(p=>optgroup.append(new Option(categories[p.kind][1]+' '+p.name,p.id)));select.append(optgroup)})});
 const legend=$('pin-legend');groups.forEach(g=>{const heading=document.createElement('li');heading.textContent=g.title;heading.className='legend-region';legend.append(heading);g.pins.forEach(p=>{const li=document.createElement('li');const b=document.createElement('button');b.textContent=categories[p.kind][1]+' '+p.name;b.onclick=()=>{const toggle=document.querySelector('[data-layer="'+p.kind+'"]');toggle.checked=true;layers[p.kind].addTo(planner);planner.setView([p.lat,p.lon],15,{animate:false});markers.get(p.id).openPopup()};li.append(b);legend.append(li)})});
}
function showGroup(index){selected=index;const g=groups[index];
 document.querySelectorAll('[data-map]').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.map===index)));
 $('from').value=(g.pins.find(p=>p.base)||g.pins[0]).id;
 $('to').value=(g.pins.find(p=>p.dest==='teamlab')||g.pins.find(p=>p.kind==='visit')).id;
 $('group-note').textContent=g.notes;planner.setView(g.center,g.zoom,{animate:false});updateRoute(false);
}
function showOverview(region){
 document.querySelectorAll('[data-map]').forEach(b=>b.setAttribute('aria-pressed','false'));
 focusPins(region==='kansai'?groups.filter(g=>g.id!=='tokyo').flatMap(g=>g.pins).filter(p=>p.id!=='kix'):allPins);
 $('group-note').textContent=region==='kansai'?'Osaka, Kyoto and Otsu together. Choose a stay and a destination below to compare the commute.':'All trip cities, stays, stations and visits. Zoom in anywhere; city tabs only move the view.';
}
function addCityLabels(){
 const labelLayer=L.layerGroup().addTo(planner);
 function refresh(){labelLayer.clearLayers();const z=planner.getZoom();if(z>11)return;
 const cities=z<=8?[['Tokyo / Kasukabe',35.72,139.76,'right'],['Kyoto / Otsu',35.06,135.8,'right'],['Osaka',34.67,135.48,'left']]:[['Tokyo',35.68,139.76,'left'],['Kasukabe',35.98,139.75,'right'],['Kyoto',35.02,135.75,'left'],['Otsu / Seta',35.01,135.9,'right'],['Osaka',34.67,135.48,'left']];
 cities.forEach(([name,lat,lon,side])=>{const narrow=planner.getSize().x<600&&side==='right';L.tooltip({permanent:true,direction:narrow?'top':side,offset:narrow?[0,-32]:[side==='left'?-28:28,-22],className:'city-label',interactive:false}).setLatLng([lat,lon]).setContent(name).addTo(labelLayer)});
 }planner.on('zoomend',refresh);refresh();
}
// Find a simple planning path through the documented corridors, not a live fastest route.
function railPath(start,end,allowShinkansen=false){
 const key=(station,line)=>JSON.stringify([station,line]);
 const first=key(start,'');const costs=new Map([[first,0]]),previous=new Map(),pending=new Set([first]),done=new Set();
 while(pending.size){let state=null;for(const n of pending)if(state===null||costs.get(n)<costs.get(state))state=n;
  pending.delete(state);done.add(state);const [at,line]=JSON.parse(state);
  if(at===end){const path=[];let cursor=state;while(previous.has(cursor)){const step=previous.get(cursor);path.unshift(step.edge);cursor=step.state;}return {edges:path,cost:costs.get(state)};}
  TRAVEL_GUIDE.edges.forEach(e=>{const next=e.a===at?e.b:e.b===at?e.a:null;if(!next||e.ticket==='shinkansen'&&!allowShinkansen)return;
   const nextLine=e.ticket==='walk'?line:e.line,n=key(next,nextLine);if(done.has(n))return;
   const transfer=e.ticket!=='walk'&&line&&line!==e.line?12:0;
   const cost=costs.get(state)+(e.minutes[0]+e.minutes[1])/2+transfer+(e.ticket==='reserved'?10:0);
   if(!costs.has(n)||cost<costs.get(n)){costs.set(n,cost);previous.set(n,{state,edge:{...e,from:at,to:next}});pending.add(n);}
  });
 }return null;
}
function journey(a,b){
 const from=TRAVEL_GUIDE.access[a.id],to=TRAVEL_GUIDE.access[b.id];if(!from||!to)return null;
 const options=access=>[access,...(access.alternatives||[])];let best=null;
 const allowShinkansen=(a.region==='tokyo')!==(b.region==='tokyo');
 for(const origin of options(from))for(const destination of options(to)){
  const rail=railPath(origin.station,destination.station,allowShinkansen);if(!rail)continue;
  const walk=access=>access.walk?(access.walk[0]+access.walk[1])/2:10;
  const cost=rail.cost+walk(origin)+walk(destination);
  if(!best||cost<best.cost)best={from:origin,to:destination,path:rail.edges,cost};
 }return best;
}
const timeRange=v=>v[0]===v[1]?String(v[0]):v[0]+'–'+v[1];
function accessStep(p,arrival=false,a=TRAVEL_GUIDE.access[p.id]){const station=TRAVEL_GUIDE.stations[a.station];
 if(a.walk===null)return (arrival?'Walk from '+station+' to ':'Walk from ')+p.name+(arrival?'':' to '+station)+' — walking time needs the final hotel address.';
 if(a.walk[1]===0)return (arrival?'Arrive at ':'Start at ')+station+'.';
 return 'Walk ≈'+timeRange(a.walk)+' min: '+(arrival?station+' → '+p.name:p.name+' → '+station)+'.'+(a.note?' '+a.note:'');
}
function routeAdvice(a,b){
 if(a.id===b.id)return ['Same place selected. Choose a different destination.'];
 const trip=journey(a,b);
 if(!trip)return ['Open Live transit for directions between these places.'];
 const {from,to,path}=trip;
 if(!path.length)return ['Both places use '+TRAVEL_GUIDE.stations[from.station]+'. A direct walk may be easier; open Walking route for the actual street route.',accessStep(a,false,from),accessStep(b,true,to)];
 const merged=[];path.forEach(e=>{const last=merged.at(-1);if(last&&e.ticket!=='walk'&&last.line===e.line&&last.to===e.from){last.to=e.to;last.minutes=last.minutes.map((v,i)=>v+e.minutes[i]);if(e.note&&!last.notes.includes(e.note))last.notes.push(e.note);}else merged.push({...e,minutes:[...e.minutes],notes:e.note?[e.note]:[]});});
 const steps=[accessStep(a,false,from)];
 if(merged[0].ticket==='shinkansen')steps.push('At the station, allow another ≈15–20 min to find the Shinkansen gate and platform with luggage.');
 merged.forEach((e,i)=>{const origin=TRAVEL_GUIDE.stations[e.from],end=TRAVEL_GUIDE.stations[e.to];
  if(e.ticket==='walk'){steps.push('Change stations on foot, ≈'+timeRange(e.minutes)+' min: '+origin+' → '+end+'.');return;}
  if(i&&merged[i-1].ticket!=='walk')steps.push('Change at '+origin+': follow signs for '+e.line+'. Allow ≈'+(e.ticket==='shinkansen'||merged[i-1].ticket==='shinkansen'?'15–20':'5–10')+' min to reach the next platform, plus waiting.');
  steps.push('Train: '+e.line+' — board at '+origin+'; get off at '+end+'. Ride ≈'+timeRange(e.minutes)+' min.'+(e.notes.length?' '+e.notes.join(' '):''));
 });
 steps.push(accessStep(b,true,to));
 const special=merged.some(e=>['shinkansen','reserved'].includes(e.ticket));
 steps.push(special?'Tickets: this route includes a Shinkansen / reserved airport train. Buy the required ticket separately; tapping a normal Suica/ICOCA balance alone is not enough.':'Tickets: one Suica/ICOCA per person, or ordinary station tickets. No reservation for the ordinary trains shown; metro-only passes do not cover every operator.');
 if(b.dest==='teamlab')steps.push('24 Nov booking: aim to arrive by 14:15; your entry window is 14:30–15:00.');
 return steps;
}

function updateRoute(fit=true){const a=getPin($('from').value),b=getPin($('to').value);if(!a||!b)return;$('distance').textContent=distance(a,b)+' straight-line';$('transit-link').href=directions(a,b);$('walk-link').href=directions(a,b,'walking');$('route-advice').replaceChildren(...routeAdvice(a,b).map(t=>{const li=document.createElement('li');li.textContent=t;return li}));
 if(connector)planner.removeLayer(connector);connector=L.polyline([[a.lat,a.lon],[b.lat,b.lon]],{color:'#9dc6ec',weight:2,dashArray:'5 7',interactive:false}).addTo(planner);if(fit)focusPins([a,b]);
 const near=allPins.filter(p=>p.id!==a.id&&['visit','optional'].includes(p.kind)).sort((x,y)=>km(a,x)-km(a,y));const list=$('nearby-list');list.replaceChildren();near.slice(0,8).forEach(p=>{const li=document.createElement('li');const b=document.createElement('button');b.textContent=categories[p.kind][1]+' '+p.name; b.onclick=()=>{$('to').value=p.id;updateRoute();markers.get(p.id).openPopup()};const d=document.createElement('span');d.textContent=distance(a,p);li.append(b,d);list.append(li)});$('nearby-title').textContent='Closest pins to '+a.name;
}
$('from').onchange=()=>updateRoute();$('to').onchange=()=>updateRoute();
fetch('assets/maps/explore.json').then(r=>{if(!r.ok)throw Error('Map data');return r.json()}).then(data=>{groups=data;allPins=groups.flatMap(g=>g.pins.map(p=>({...p,region:g.id})));if(!window.L)throw Error('Map library');planner=L.map('explore-map',{scrollWheelZoom:false});tiles=L.tileLayer(tileURL(),{maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · <a href="https://openmaptiles.org/">OpenMapTiles</a> · <a href="https://tile.openstreetmap.jp/">OSMF Japan</a>'}).addTo(planner);L.control.scale({imperial:false}).addTo(planner);tiles.on('tileerror',()=>{$('map-status').textContent='If the basemap is blank, pin distances and Live transit still work.'});
 groups.forEach((g,i)=>{const b=document.createElement('button');b.textContent=g.title;b.dataset.map=i;b.onclick=()=>showGroup(i);$('map-tabs').append(b)});
 Object.entries(categories).forEach(([k,[label,symbol,color]])=>{const l=document.createElement('label');const c=document.createElement('input');c.type='checkbox';c.checked=true;c.dataset.layer=k;c.onchange=()=>{if(c.checked)layers[k].addTo(planner);else planner.removeLayer(layers[k])};const s=document.createElement('span');s.style.color=color;s.textContent=symbol+' '+label;l.append(c,s);$('map-key').append(l)});
 buildPins();addCityLabels();enableMapShortcuts();$('fit-all').onclick=()=>showOverview('japan');$('fit-kansai').onclick=()=>showOverview('kansai');$('fit-region').onclick=()=>focusPins(groups[selected].pins);$('fit-city').onclick=()=>planner.setView(groups[selected].center,groups[selected].zoom,{animate:false});$('fit-pair').onclick=()=>focusPins([getPin($('from').value),getPin($('to').value)]);showGroup(0);new ResizeObserver(()=>planner.invalidateSize()).observe($('explore-map'));
}).catch(e=>{$('map-status').textContent='Interactive map unavailable. Open the static maps below.';console.error(e)});
