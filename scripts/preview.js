/* ── AUREO · preview.js ─────────────────────────────────────────
   Device toggle, iframe renderer, download handler.
   Depends on: state.js · helpers.js · toast.js · livePreview.js
─────────────────────────────────────────────────────────────── */

/* ── Toggle mobile / desktop frame ── */
function setDev(type, btn) {
  document.querySelectorAll('.pdbtn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  g('devframe').classList.toggle('desk', type === 'desktop');
}

/* ── Render generated HTML in the iframe ── */
function showInv(html) {
  g('pph').style.display = 'none';
  const frame = g('invframe');
  frame.style.display = 'block';
  const blob = new Blob([html], { type: 'text/html' });
  frame.src = URL.createObjectURL(blob);
  /* After full render, re-sync live preview snapshot */
  if (typeof livePreview !== 'undefined') livePreview.reset();
}

/* ── Download the last generated invitation ── */
function dlInv() {
  if (!S.html) return;
  const filename = 'aureo-' + slugify(g('fn').value) + '.html';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([S.html], { type: 'text/html' }));
  a.download = filename;
  a.click();
  showT('Descargando ✦', 'ok');
}

/* ── Called by mediaHandlers after photo/audio upload ── */
function onMediaChange() {
  if (typeof livePreview !== 'undefined') livePreview.flush();
}
