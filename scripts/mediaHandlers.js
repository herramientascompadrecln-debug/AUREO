/* ── AUREO · mediaHandlers.js ───────────────────────────────────
   Image uploads (hero / gallery / closing) and audio (MP3 → base64).
   Depends on: state.js · helpers.js · toast.js · preview.js
─────────────────────────────────────────────────────────────── */

/* ── Image upload ── */
function upImg(event, type) {
  Array.from(event.target.files).forEach(file => {
    const reader = new FileReader();
    reader.onload = ev => {
      const src = ev.target.result;
      if (type === 'hero') {
        S.photos.hero = src;
        rThumbs('pv-hero', [src], 'hero');
      } else if (type === 'closing') {
        S.photos.closing = src;
        rThumbs('pv-close', [src], 'closing');
      } else if (type === 'gallery' && S.photos.gallery.length < 6) {
        S.photos.gallery.push(src);
        rThumbs('pv-gal', S.photos.gallery, 'gallery');
      }
      /* Live preview: push photo update immediately */
      if (typeof onMediaChange === 'function') onMediaChange();
    };
    reader.readAsDataURL(file);
  });
}

/* ── Render thumbnail strip ── */
function rThumbs(containerId, srcs, type) {
  const container = g(containerId);
  container.innerHTML = '';
  srcs.forEach((src, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'twrap';

    const img = document.createElement('img');
    img.className = 'uthumb';
    img.src = src;

    const del = document.createElement('div');
    del.className = 'tdel';
    del.textContent = '×';
    del.onclick = () => rmPhoto(type, i);

    wrap.appendChild(img);
    wrap.appendChild(del);
    container.appendChild(wrap);
  });
}

/* ── Remove photo ── */
function rmPhoto(type, index) {
  if (type === 'hero') {
    S.photos.hero = null;
    g('pv-hero').innerHTML = '';
  } else if (type === 'closing') {
    S.photos.closing = null;
    g('pv-close').innerHTML = '';
  } else {
    S.photos.gallery.splice(index, 1);
    rThumbs('pv-gal', S.photos.gallery, 'gallery');
  }
  /* Live preview: sync after removal */
  if (typeof onMediaChange === 'function') onMediaChange();
}

/* ── Audio upload (base64 — embedded directly into the output HTML) ── */
document.addEventListener('DOMContentLoaded', () => {
  const audioInput = g('audiofile');
  if (!audioInput) return;

  audioInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 16 * 1024 * 1024) {
      showT('Archivo muy grande (máx 15MB)', 'er');
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
      S.audio.src  = ev.target.result;
      S.audio.name = file.name;
      g('audiotxt').textContent = '✓ ' + file.name;
      g('audioz').style.borderColor = 'var(--ch)';
      /* Live preview: push audio update immediately */
      if (typeof onMediaChange === 'function') onMediaChange();
    };
    reader.readAsDataURL(file);
  });
});
