// Flow tab: drag / Space-drag to pan each day canvas, per-day zoom and Fit, remembered plan + layout.
(() => {
  const store = (k, v) => { try { v === undefined ? (v = localStorage.getItem(k)) : localStorage.setItem(k, v); } catch { v = null; } return v; };

  // Restore plan/layout; a #b-d2 style hash picks the plan that owns that day.
  const hashPlan = (location.hash.match(/^#(b|a|compare|whole)-d\d+$/) || [])[1];
  const plan = hashPlan || store('flow-plan');
  if (plan && document.getElementById('t-' + plan)) document.getElementById('t-' + plan).checked = true;
  const layout = store('flow-layout') || (matchMedia('(max-width:700px)').matches ? 'stack' : null);
  if (layout && document.getElementById('l-' + layout)) document.getElementById('l-' + layout).checked = true;
  document.querySelectorAll('input[name=plan]').forEach(i => i.addEventListener('change', () => store('flow-plan', i.id.slice(2))));
  document.querySelectorAll('input[name=layout]').forEach(i => i.addEventListener('change', () => { store('flow-layout', i.id.slice(2)); }));
  if (hashPlan) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView());
  // Day chips live inside the plan, so its radio is already checked; nothing else needed for jumps.

  const stacked = () => document.getElementById('l-stack').checked;
  let space = false, hovered = null;

  // Zoom uses CSS zoom on the flow so layout (and scroll width) follows the scale.
  const setZoom = (canvas, z) => {
    const flow = canvas.querySelector('.flow');
    z = Math.min(1.6, Math.max(0.3, Math.round(z * 100) / 100));
    flow.style.zoom = z;
    canvas.dataset.zoom = z;
    const out = canvas.closest('.day')?.querySelector('.zoom output');
    if (out) out.textContent = Math.round(z * 100) + '%';
  };
  const zoomOf = c => parseFloat(c.dataset.zoom || '1');
  const fit = canvas => {
    const flow = canvas.querySelector('.flow');
    flow.style.zoom = 1; // measure at 100% so the ratio is exact
    const natural = flow.getBoundingClientRect().width;
    setZoom(canvas, Math.min(1, (canvas.clientWidth - 4) / natural));
    canvas.scrollLeft = 0;
  };

  document.querySelectorAll('.day').forEach(day => {
    const canvases = day.querySelectorAll('.canvas');
    day.querySelectorAll('.zoom button').forEach(b => b.addEventListener('click', () => {
      canvases.forEach(c => b.dataset.z === 'fit' ? fit(c) : setZoom(c, zoomOf(c) + (b.dataset.z === '+' ? 0.1 : -0.1)));
    }));
  });

  document.querySelectorAll('.canvas').forEach(canvas => {
    let start = null;
    canvas.addEventListener('pointerenter', () => { hovered = canvas; });
    canvas.addEventListener('pointerleave', () => { if (hovered === canvas) hovered = null; });
    canvas.addEventListener('pointerdown', e => {
      if (stacked() || e.button !== 0 || e.pointerType === 'touch') return; // touch already scrolls natively
      if (!space && e.target.closest('a,button')) return;
      start = { x: e.clientX, y: e.clientY, l: canvas.scrollLeft, t: canvas.scrollTop };
      canvas.setPointerCapture(e.pointerId);
      canvas.classList.add('dragging');
      e.preventDefault();
    });
    canvas.addEventListener('pointermove', e => {
      if (!start) return;
      canvas.scrollLeft = start.l - (e.clientX - start.x);
      canvas.scrollTop = start.t - (e.clientY - start.y);
    });
    const end = () => { start = null; canvas.classList.remove('dragging'); };
    canvas.addEventListener('pointerup', end);
    canvas.addEventListener('pointercancel', end);
    // Ctrl/⌘ + wheel zooms the canvas under the pointer; plain vertical wheel keeps scrolling the page.
    canvas.addEventListener('wheel', e => {
      if (stacked() || !(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      setZoom(canvas, zoomOf(canvas) * (e.deltaY < 0 ? 1.08 : 0.93));
    }, { passive: false });
  });

  addEventListener('keydown', e => {
    if (!hovered || stacked()) return;
    if (e.code === 'Space' && !e.target.closest('input,textarea,select,button')) {
      e.preventDefault(); // Space would otherwise scroll the page
      if (!space) { space = true; hovered.classList.add('space'); }
    } else if ((e.ctrlKey || e.metaKey) && ['=', '+', '-', '_', '0'].includes(e.key)) {
      e.preventDefault();
      setZoom(hovered, e.key === '0' ? 1 : zoomOf(hovered) + (e.key === '-' || e.key === '_' ? -0.1 : 0.1));
    }
  });
  addEventListener('keyup', e => { if (e.code === 'Space') { space = false; document.querySelectorAll('.canvas.space').forEach(c => c.classList.remove('space')); } });
  // Arrow keys pan a focused canvas, for keyboard users.
  document.querySelectorAll('.canvas').forEach(c => c.addEventListener('keydown', e => {
    if (stacked()) return;
    const step = { ArrowRight: 120, ArrowLeft: -120 }[e.key];
    if (step) { e.preventDefault(); c.scrollBy({ left: step }); }
  }));
})();
