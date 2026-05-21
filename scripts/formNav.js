/* ── AUREO · formNav.js ─────────────────────────────────────────
   Step navigation, validation, chip/toggle/plan handlers.
   Depends on: state.js · helpers.js · toast.js · preview.js
─────────────────────────────────────────────────────────────── */

/* ── Step navigation ── */
function goS(n) { if (n <= S.step) setS(n) }
function nx()   { if (S.step === 1 && !v1()) return; if (S.step < 4) setS(S.step + 1) }
function pv()   { if (S.step > 1) setS(S.step - 1) }

function setS(n) {
  S.step = n;

  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  g('p' + n).classList.add('active');

  document.querySelectorAll('.step').forEach(s => {
    const sn = parseInt(s.dataset.s);
    s.classList.remove('active', 'done');
    if (sn === n)     s.classList.add('active');
    else if (sn < n)  s.classList.add('done');
  });

  for (let i = 1; i <= 4; i++) {
    const line = g('l' + i + (i + 1));
    if (line) line.classList.toggle('done', i < n);
  }

  if (n === 4) buildSum();
}

/* ── Step 1 validation ── */
function v1() {
  if (!g('fn').value.trim())                         { showT('Ingresa los nombres', 'er'); return false }
  if (!g('fdd').value || !g('fmm').value || !g('fyy').value) { showT('Ingresa la fecha completa', 'er'); return false }
  return true;
}

/* ── Summary (step 4) ── */
function buildSum() {
  const d    = getData();
  const secs = Object.entries(d.sec).filter(([, v]) => v).map(([k]) => k).join(', ') || '—';
  const photos = (d.photos.hero    ? 'Hero '               : '')
               + (d.photos.gallery.length ? d.photos.gallery.length + ' galería ' : '')
               + (d.photos.closing ? 'Cierre'              : '')
               || 'Placeholders';

  g('summary').innerHTML = `<div class="sumbox">
    ${srRow('Tipo',      d.tipo + ' · ' + d.names)}
    ${srRow('Fecha',     d.dateLabel)}
    ${srRow('Ceremonia', (d.v1 || '—') + ' · ' + d.t1)}
    ${srRow('Recepción', (d.v2 || '—') + ' · ' + d.t2)}
    ${srRow('Estilo',    d.estilo)}
    ${srRow('Fotos',     photos)}
    ${srRow('Secciones', secs)}
  </div>`;
}

/* ── Chip groups (tipo / estilo) ── */
document.querySelectorAll('.chips').forEach(group => {
  group.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    group.querySelectorAll('.chip').forEach(c => c.classList.remove('sel'));
    chip.classList.add('sel');
    if (group.id === 'chtipo')   {
      S.tipo   = chip.dataset.v;
      /* tipo changes the template palette — trigger re-render */
      if (typeof livePreview !== 'undefined') setTimeout(() => livePreview.rerender(), 0);
    }
    if (group.id === 'chestilo') S.estilo = chip.dataset.v;
  });
});

/* ── Plan cards ── */
function selP(el) {
  document.querySelectorAll('.pcard').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  S.plan = el.dataset.v;
}

/* ── Section toggles ── */
function tog(row) {
  row.classList.toggle('on');
  S.sec[row.dataset.k] = row.classList.contains('on');
  if (row.dataset.k === 'music') {
    g('musicfield').style.display = S.sec.music ? 'block' : 'none';
  }
}

/* ── Music input tabs ── */
function setMT(tab, btn) {
  document.querySelectorAll('.mtab').forEach(b  => b.classList.remove('on'));
  document.querySelectorAll('.mpanel').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  g('mt-' + tab).classList.add('on');
  S.audio.type = tab;
}

/* ── Template selector ── */
function setTemplate(id, el) {
  S.template = id;
  document.querySelectorAll('.tpl-chip').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  showT('Template: ' + id, 'ok');
  /* Template switch requires a full re-render (different HTML structure/styles).
     Use the local builder — no AI call, instant. */
  if (typeof livePreview !== 'undefined') livePreview.rerender();
}
