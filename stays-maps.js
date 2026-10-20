/* Dated hotel comparison. No live booking feed or automatic price claims. */
const root = document.documentElement;
const prefs = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key, value) { try { localStorage.setItem(key, value); } catch {} } };
function setTheme(theme) {
  root.dataset.theme = theme;
  document.getElementById('theme').textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
  prefs.set('t', theme);
}
setTheme(prefs.get('t') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
document.getElementById('theme').onclick = () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
let width = Number(prefs.get('w')) || 80;
function setWidth(value) {
  width = Math.max(50, Math.min(100, value));
  root.style.setProperty('--w', width + 'vw');
  document.getElementById('width').textContent = width + '%';
  prefs.set('w', width);
}
setWidth(width);
document.getElementById('less').onclick = () => setWidth(width - 5);
document.getElementById('more').onclick = () => setWidth(width + 5);
document.querySelectorAll('[data-filter]').forEach(button => button.onclick = () => {
  const city = button.dataset.filter;
  document.querySelectorAll('[data-city]').forEach(item => item.hidden = city !== 'All' && item.dataset.city !== city);
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
});
let maps = [], selectedMap = 0;
function measureDistance() {
  const map = maps[selectedMap];
  const a = map.pins[Number(document.getElementById('from').value)];
  const b = map.pins[Number(document.getElementById('to').value)];
  const r = Math.PI / 180, x = a.lat * r, y = b.lat * r;
  const h = Math.sin((y-x)/2)**2 + Math.cos(x)*Math.cos(y)*Math.sin((b.lon-a.lon)*r/2)**2;
  const km = 6371.0088*2*Math.asin(Math.sqrt(Math.min(1,h)));
  document.getElementById('distance').textContent = (km < 1 ? Math.round(km*1000)+' m' : km.toFixed(2)+' km') + ' straight-line';
}
function showMap(index) {
  selectedMap = index;
  const map = maps[index], path = 'assets/maps/' + map.id + '.webp';
  const image = document.getElementById('map-image');
  image.src = path; image.alt = map.title + ': numbered pins, legend, north arrow and metric scale';
  document.getElementById('map-title').textContent = map.title;
  document.getElementById('map-full').href = path;
  document.getElementById('map-download').href = path;
  ['from','to'].forEach(id => {
    const select = document.getElementById(id); select.replaceChildren();
    map.pins.forEach((pin,i) => select.add(new Option((i+1)+'. '+pin.name, i)));
  });
  document.getElementById('to').value = '1';
  const legend = document.getElementById('pin-legend'); legend.replaceChildren();
  map.pins.forEach(pin => { const li = document.createElement('li'); li.textContent = pin.name + (pin.note ? ' — '+pin.note : ''); legend.append(li); });
  document.querySelectorAll('[data-map]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.map) === index)));
  measureDistance();
}
document.getElementById('from').onchange = measureDistance;
document.getElementById('to').onchange = measureDistance;
fetch('assets/maps/coordinates.json').then(response => { if (!response.ok) throw new Error('Map metadata unavailable'); return response.json(); }).then(data => {
  maps = data;
  const names = ['Tokyo','Kyoto','Kyoto–Ōtsu','Osaka','Kasukabe','Shinjuku'];
  maps.forEach((map,i) => {
    const button = document.createElement('button'); button.textContent = names[i]; button.dataset.map = i; button.onclick = () => showMap(i); document.getElementById('map-tabs').append(button);
  });
  showMap(0);
}).catch(error => { document.getElementById('distance').textContent = 'Map controls unavailable. Use the full-size image links.'; console.error(error); });
