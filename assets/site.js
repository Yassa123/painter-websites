(() => {
  // reveal on scroll
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 }) : null;
  document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));
  // before / after sliders
  document.querySelectorAll('.ba').forEach(b => { const r = b.querySelector('input'); const set = () => b.style.setProperty('--pos', r.value + '%'); r.addEventListener('input', set); set(); });
  // counters
  const fmt = n => n.toLocaleString('en-US');
  const cio = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || ''; let t0; const step = t => { t0 = t0 || t; const p = Math.min(1, (t - t0) / 1400); el.textContent = fmt(Math.round(end * (1 - Math.pow(1 - p, 3)))) + suf; if (p < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); cio.unobserve(el); }), { threshold: .5 }) : null;
  document.querySelectorAll('[data-count]').forEach(el => cio ? cio.observe(el) : (el.textContent = fmt(+el.dataset.count) + (el.dataset.suffix || '')));
  // colour chips
  const room = document.getElementById('room');
  document.querySelectorAll('.chip').forEach(c => c.addEventListener('click', () => { document.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', 'false')); c.setAttribute('aria-pressed', 'true'); if (room) room.style.setProperty('--wall', c.dataset.c); }));
  // multi-step estimate form
  const f = document.getElementById('est'); if (!f) return;
  let s = 1; const max = 3; const bar = f.querySelector('.progress i'); const next = f.querySelector('[data-next]'); const back = f.querySelector('[data-back]');
  f.querySelectorAll('.opt').forEach(o => o.addEventListener('click', () => { o.setAttribute('aria-pressed', o.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); }));
  const show = () => { f.querySelectorAll('.fstep').forEach(x => x.classList.toggle('on', +x.dataset.step === s)); bar.style.width = Math.min(100, s / max * 100) + '%'; back.style.visibility = s > 1 && s <= max ? 'visible' : 'hidden'; next.style.display = s > max ? 'none' : ''; next.textContent = s === max ? 'Send my request' : 'Next'; };
  next.addEventListener('click', () => { if (s === max) { const bad = [...f.querySelectorAll('[data-step="3"] input[required]')].find(i => !i.value.trim()); if (bad) { bad.focus(); bad.style.borderColor = 'var(--accent)'; return; } } s++; show(); });
  back.addEventListener('click', () => { s = Math.max(1, s - 1); show(); });
  show();
})();