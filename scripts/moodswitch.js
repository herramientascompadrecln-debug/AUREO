/* ── AUREO · moodswitch.js ─────────────────────────────────────
   v2 — Aplica mood class en body (preview exterior) Y
   inyecta CSS directamente en contentDocument del iframe
   (invitación renderizada interior).
   Zero deps. NO modifica state, rendering, templates ni export.
──────────────────────────────────────────────────────────────── */
(function () {

  /* ── Mapeo chip value → body class ── */
  var MOOD_MAP = {
    'Dark Luxury'    : 'mood-darkluxury',
    'Romantico'      : 'mood-romantico',
    'Minimalista'    : 'mood-minimalista',
    'Cinematografico': 'mood-cinematografico',
    'Elegante'       : 'mood-clasico',
    'Moderno'        : 'mood-moderno',
    'Magico'         : 'mood-magico',
  };
  var ALL_MOODS = Object.values(MOOD_MAP);

  /* ── Paletas de color por mood ── */
  var PALETTES = {
    'Dark Luxury': {
      ch   : '#c8a96e', chlt : '#e8d49a',
      bg   : '#0c0a14', bg2  : '#14111f',
      gR: 200, gG: 169, gB: 110,
    },
    'Romantico': {
      ch   : '#d4708a', chlt : '#f0a0bb',
      bg   : '#110a0d', bg2  : '#1a0f14',
      gR: 212, gG: 108, gB: 138,
    },
    'Minimalista': {
      ch   : '#a0a0a0', chlt : '#d0d0d0',
      bg   : '#0d0d0d', bg2  : '#141414',
      gR: 180, gG: 180, gB: 180,
    },
    'Cinematografico': {
      ch   : '#4888d8', chlt : '#78b0f0',
      bg   : '#060a10', bg2  : '#0c1018',
      gR: 60, gG: 120, gB: 220,
    },
    'Elegante': {
      ch   : '#c89848', chlt : '#e8c878',
      bg   : '#0d0a08', bg2  : '#141008',
      gR: 200, gG: 152, gB: 72,
    },
    'Moderno': {
      ch   : '#00b8e8', chlt : '#60d8f8',
      bg   : '#080c12', bg2  : '#0e1420',
      gR: 0, gG: 184, gB: 232,
    },
    'Magico': {
      ch   : '#a850e0', chlt : '#d080ff',
      bg   : '#0a0610', bg2  : '#100818',
      gR: 168, gG: 80, gB: 224,
    },
  };

  /* ── Construye el CSS a inyectar en el iframe ── */
  function buildIframeCSS(val) {
    var p = PALETTES[val] || PALETTES['Dark Luxury'];
    var rg = 'rgba(' + p.gR + ',' + p.gG + ',' + p.gB + ',';

    return [
      '/* AUREO mood-inner: ' + val + ' */',

      /* CSS vars — afecta elementos que usan var(--ch) var(--chlt) etc. */
      ':root{',
      '  --ch:'   + p.ch   + ' !important;',
      '  --chlt:' + p.chlt + ' !important;',
      '  --bg:'   + p.bg   + ' !important;',
      '  --bg2:'  + p.bg2  + ' !important;',
      '}',

      /* Fondo base de la invitación */
      'body{background:' + p.bg + ' !important;}',

      /* Secciones de fondo alternante */
      '.intro{background:linear-gradient(180deg,' + p.bg + ' 0%,' + p.bg2 + ' 60%,' + p.bg + ' 100%) !important;}',
      '.reel-sec{background:' + p.bg + ' !important;}',
      '.mom{background:' + p.bg2 + ' !important;}',
      '.det{background:' + p.bg + ' !important;}',
      '.loc{background:' + p.bg2 + ' !important;}',
      '.gifts{background:' + p.bg + ' !important;}',
      '.rsvp{background:' + p.bg2 + ' !important;}',
      '.brand-sec{background:' + p.bg + ' !important;}',
      '#final{background:' + p.bg + ' !important;}',

      /* Glows y overlays ambientales — los más visibles */
      '.hov3{background:radial-gradient(ellipse 80% 60% at 50% 75%,' + rg + '0.08) 0%,transparent 60%) !important;}',
      '.hglow{background:radial-gradient(ellipse,' + rg + '0.10) 0%,transparent 65%) !important;}',
      '.mom-g{background:radial-gradient(circle,' + rg + '0.10) 0%,transparent 65%) !important;}',

      /* Barra de progreso */
      '#prog{background:linear-gradient(90deg,transparent,' + p.ch + ',' + p.chlt + ') !important;}',

      /* Music button glow */
      '#mb{box-shadow:0 0 18px ' + rg + '0.12) !important;}',

    ].join('\n');
  }

  /* ── Estado actual ── */
  var _currentMood = 'Dark Luxury';

  /* ── Inyecta / actualiza <style> en contentDocument del iframe ── */
  function injectIntoIframe() {
    var frame = document.getElementById('invframe');
    if (!frame) return;
    var doc;
    try { doc = frame.contentDocument; } catch (e) { return; }
    if (!doc || !doc.head) return;

    var style = doc.getElementById('aureo-mood-inner');
    if (!style) {
      style = doc.createElement('style');
      style.id = 'aureo-mood-inner';
      doc.head.appendChild(style);
    }
    style.textContent = buildIframeCSS(_currentMood);
  }

  /* ── Aplica mood: body class + iframe injection ── */
  function applyMood(val) {
    _currentMood = val;

    /* 1. Outer preview area (body class → moods.css) */
    document.body.classList.remove.apply(document.body.classList, ALL_MOODS);
    var cls = MOOD_MAP[val];
    if (cls) document.body.classList.add(cls);

    /* 2. Inner invitation (iframe contentDocument) */
    injectIntoIframe();
  }

  /* ── Re-inyecta cada vez que el iframe carga (gen / rerender) ── */
  var frame = document.getElementById('invframe');
  if (frame) {
    frame.addEventListener('load', function () {
      /* Pequeño delay para que contentDocument esté listo */
      setTimeout(injectIntoIframe, 30);
    });
  }

  /* ── Re-inyecta cuando el bridge del iframe avisa AUREO_READY ── */
  window.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'AUREO_READY') {
      setTimeout(injectIntoIframe, 30);
    }
  });

  /* ── Default al cargar ── */
  applyMood('Dark Luxury');

  /* ── Escucha clics en chips de estilo ── */
  document.addEventListener('click', function (e) {
    var chip = e.target.closest('#chestilo .chip');
    if (!chip) return;
    applyMood(chip.dataset.v);
  });

})();
