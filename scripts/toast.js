/* ── AUREO · toast.js ───────────────────────────────────────────
   Lightweight notification system.
   Usage: showT('Message', 'ok' | 'er' | '')
─────────────────────────────────────────────────────────────── */

let _toastTimer = null;

function showT(msg, type = '') {
  const el = document.getElementById('toast');
  if (!el) return;

  clearTimeout(_toastTimer);
  el.textContent = msg;
  el.className = 'toast' + (type ? ' ' + type : '');
  el.classList.add('show');

  _toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}
