/* ── AUREO · scripts/visualpolish.js — FASE 4D ─────────────────
   Visual Polish Controls — modifica ÚNICAMENTE:
   · CSS variables en :root del iframe (vía contentDocument style tag)
   · CSS variables en :root del documento exterior (document.documentElement)
   
   Patrón idéntico a moodswitch.js: inyecta <style id="aureo-vpolish-inner">
   en contentDocument del iframe. Zero deps. Cero regeneraciones.
   
   PROHIBIDO en este archivo:
   · HTML injection / buildHTML / generador
   · Modificar state.js, livepreview.js, generator.js
   · Nuevos sistemas reactivos o stores
   · Tocar pipeline de exportación o renderizado
────────────────────────────────────────────────────────────────
   CONTROLES:
   · glow      — intensidad glow ambiental (.hglow, .mom-g)
   · overlay   — intensidad overlay foto (.hov1, .hov2)
   · blur      — blur ambiental (backdrop-filter)
   · shadow    — profundidad sombras (cards, texto)
   · gradient  — intensidad gradients (.hov3, .rsvp-g, .rule dividers)
   · cw        — ancho de contenido (max-width wrappers)
   · vgap      — separación vertical (section padding)
   · radius    — radio de bordes (cards, pills, frames)
──────────────────────────────────────────────────────────────── */

(function () {

  /* ── Valores default ── */
  var DEFAULTS = {
    glow    : 100,   /* 0–200, porcentaje */
    overlay : 100,   /* 0–200, porcentaje */
    blur    : 12,    /* 0–24, px          */
    shadow  : 100,   /* 0–200, porcentaje */
    gradient: 100,   /* 0–200, porcentaje */
    cw      : 440,   /* 320–600, px       */
    vgap    : 72,    /* 0–120, px         */
    radius  : 16,    /* 0–32, px          */
  };

  /* ── Estado vivo — clon mutable de defaults ── */
  var _s = Object.assign({}, DEFAULTS);

  /* ── Mapeo de IDs de slider → keys del estado ── */
  var SLIDER_MAP = [
    { id: 'vp-glow',     key: 'glow',     suffix: '%'  },
    { id: 'vp-overlay',  key: 'overlay',  suffix: '%'  },
    { id: 'vp-blur',     key: 'blur',     suffix: 'px' },
    { id: 'vp-shadow',   key: 'shadow',   suffix: '%'  },
    { id: 'vp-gradient', key: 'gradient', suffix: '%'  },
    { id: 'vp-cw',       key: 'cw',       suffix: 'px' },
    { id: 'vp-vgap',     key: 'vgap',     suffix: 'px' },
    { id: 'vp-radius',   key: 'radius',   suffix: 'px' },
  ];

  /* ═══════════════════════════════════════════════════════════
     CSS PARA EL IFRAME (contentDocument)
     Modifica SOLO variables CSS y clases — no toca HTML.
  ═══════════════════════════════════════════════════════════ */
  function _buildIframeCSS() {
    var glowO  = (_s.glow    / 100).toFixed(3);
    var overlO = (_s.overlay / 100).toFixed(3);
    var shadO  = (_s.shadow  / 100).toFixed(3);
    var gradO  = (_s.gradient/ 100).toFixed(3);
    var blurPx = _s.blur + 'px';
    var cwPx   = _s.cw   + 'px';
    var vgPx   = _s.vgap + 'px';
    var rrPx   = _s.radius + 'px';

    /* Calc: pills y botones usan radio mayor */
    var rrPillPx = Math.min(_s.radius * 3, 100) + 'px';
    /* Calc: sombra de card — base 6px + scale */
    var shadowBlurPx = (6 + (_s.shadow / 100) * 26).toFixed(1) + 'px';
    var shadowAlpha  = (0.04 + (_s.shadow / 100) * 0.26).toFixed(3);

    return [
      '/* AUREO visual-polish-inner — generado por visualpolish.js */',

      /* ── CSS variables en :root del iframe ── */
      ':root{',
      '  --vp-glow-o:'  + glowO  + ';',
      '  --vp-overlay-o:'+ overlO + ';',
      '  --vp-blur:'    + blurPx + ';',
      '  --vp-shadow-o:'+ shadO  + ';',
      '  --vp-grad-o:'  + gradO  + ';',
      '  --vp-cw:'      + cwPx  + ';',
      '  --vp-vgap:'    + vgPx  + ';',
      '  --vp-radius:'  + rrPx  + ';',
      '}',

      /* ── 1. Glow ambiental: .hglow y .mom-g ── */
      '.hglow { opacity: var(--vp-glow-o) !important; }',
      '.mom-g  { opacity: var(--vp-glow-o) !important; }',

      /* ── 2. Overlay foto: .hov1 y .hov2 ── */
      '.hov1 { opacity: var(--vp-overlay-o) !important; }',
      '.hov2 { opacity: var(--vp-overlay-o) !important; }',

      /* ── 3. Blur ambiental: elementos con backdrop-filter ── */
      '#mb        { backdrop-filter: blur(var(--vp-blur)) !important;',
      '             -webkit-backdrop-filter: blur(var(--vp-blur)) !important; }',
      '.hcd-box   { backdrop-filter: blur(var(--vp-blur)) !important;',
      '             -webkit-backdrop-filter: blur(var(--vp-blur)) !important; }',
      '.aureo-bar { backdrop-filter: blur(var(--vp-blur)) !important;',
      '             -webkit-backdrop-filter: blur(var(--vp-blur)) !important; }',

      /* ── 4. Profundidad sombras: cards internas + hname text-shadow ── */
      '.lcard {',
      '  box-shadow: 0 2px ' + shadowBlurPx + ' rgba(0,0,0,' + shadowAlpha + ') !important;',
      '}',
      '.hname {',
      '  text-shadow:',
      '    0 0 calc(40px * var(--vp-shadow-o)) var(--ch),',
      '    0 0 calc(80px * var(--vp-shadow-o)) ' + 'color-mix(in srgb, var(--ch) 27%, transparent),',
      '    0 4px calc(24px * var(--vp-shadow-o)) rgba(0,0,0,.8) !important;',
      '}',

      /* ── 5. Intensidad gradients: .hov3 hero gradient + rsvp-g + rule ── */
      '.hov3   { opacity: var(--vp-grad-o) !important; }',
      '.rsvp-g { opacity: var(--vp-grad-o) !important; }',
      '.rule::before { opacity: var(--vp-grad-o) !important; }',
      '.rule::after  { opacity: var(--vp-grad-o) !important; }',

      /* ── 6. Ancho de contenido: wrappers de texto ── */
      '.iin, .hcontent, .mom-in, .clc {',
      '  max-width: var(--vp-cw) !important;',
      '}',
      '.lcards, .dlist {',
      '  max-width: calc(var(--vp-cw) - 40px) !important;',
      '}',
      '.gopts {',
      '  max-width: calc(var(--vp-cw) - 40px) !important;',
      '}',

      /* ── 7. Separación vertical: padding en secciones no-hero ── */
      '.reel-sec {',
      '  padding-top: var(--vp-vgap) !important;',
      '  padding-bottom: var(--vp-vgap) !important;',
      '}',
      '.mom {',
      '  padding-top: var(--vp-vgap) !important;',
      '  padding-bottom: var(--vp-vgap) !important;',
      '}',
      '.det {',
      '  padding-top: var(--vp-vgap) !important;',
      '  padding-bottom: var(--vp-vgap) !important;',
      '}',
      '.loc {',
      '  padding-top: var(--vp-vgap) !important;',
      '  padding-bottom: var(--vp-vgap) !important;',
      '}',
      '.gifts {',
      '  padding-top: var(--vp-vgap) !important;',
      '  padding-bottom: var(--vp-vgap) !important;',
      '}',
      '.rsvp {',
      '  padding-top: var(--vp-vgap) !important;',
      '  padding-bottom: var(--vp-vgap) !important;',
      '}',
      '.brand-sec {',
      '  padding-top: calc(var(--vp-vgap) * .7) !important;',
      '  padding-bottom: calc(var(--vp-vgap) * .7) !important;',
      '}',

      /* ── 8. Radio de bordes ── */
      '.rcon, .lcard, .gopt {',
      '  border-radius: var(--vp-radius) !important;',
      '}',
      '.hcd-box {',
      '  border-radius: calc(var(--vp-radius) * .55) !important;',
      '}',
      '.rdead, .ipill, .lbtn, .wabtn {',
      '  border-radius: ' + rrPillPx + ' !important;',
      '}',

    ].join('\n');
  }

  /* ═══════════════════════════════════════════════════════════
     INYECCIÓN EN IFRAME — mismo patrón que moodswitch.js
  ═══════════════════════════════════════════════════════════ */
  function _injectIntoIframe() {
    var frame = document.getElementById('invframe');
    if (!frame) return;
    var doc;
    try { doc = frame.contentDocument; } catch (e) { return; }
    if (!doc || !doc.head) return;

    var style = doc.getElementById('aureo-vpolish-inner');
    if (!style) {
      style = doc.createElement('style');
      style.id = 'aureo-vpolish-inner';
      doc.head.appendChild(style);
    }
    style.textContent = _buildIframeCSS();
  }

  /* ═══════════════════════════════════════════════════════════
     ACTUALIZACIÓN EXTERIOR (documento principal)
     Solo modifica CSS vars en document.documentElement
  ═══════════════════════════════════════════════════════════ */
  function _updateOuter() {
    var root = document.documentElement;
    /* Glow del .pbody::before (radial gradient ambiental del preview) */
    root.style.setProperty('--vp-outer-glow', (_s.glow / 100).toFixed(3));
    /* Blur del devframe header (si existe) */
    root.style.setProperty('--vp-blur-outer', _s.blur + 'px');
  }

  /* ── Apply: exterior + iframe ── */
  function _applyAll() {
    _updateOuter();
    _injectIntoIframe();
  }

  /* ═══════════════════════════════════════════════════════════
     SLIDER FILL — actualiza el gradiente inline del track
     para dar efecto "filled" sin CSS complicado
  ═══════════════════════════════════════════════════════════ */
  function _updateSliderFill(el) {
    var min = parseFloat(el.min) || 0;
    var max = parseFloat(el.max) || 100;
    var val = parseFloat(el.value) || 0;
    var pct = ((val - min) / (max - min) * 100).toFixed(1) + '%';
    el.style.background = [
      'linear-gradient(to right,',
      'var(--ch) 0%,',
      'var(--ch) ' + pct + ',',
      'rgba(200,169,110,.13) ' + pct + ',',
      'rgba(200,169,110,.13) 100%)'
    ].join(' ');
  }

  /* ═══════════════════════════════════════════════════════════
     RESET
  ═══════════════════════════════════════════════════════════ */
  function _reset() {
    Object.assign(_s, DEFAULTS);
    SLIDER_MAP.forEach(function (cfg) {
      var el  = document.getElementById(cfg.id);
      var out = document.getElementById(cfg.id + '-val');
      if (!el) return;
      el.value = _s[cfg.key];
      _updateSliderFill(el);
      if (out) out.textContent = _formatVal(_s[cfg.key], cfg.suffix);
    });
    _applyAll();
  }

  /* ── Formatter para readout ── */
  function _formatVal(val, suffix) {
    if (suffix === '%')  return Math.round(val) + '%';
    if (suffix === 'px') return Math.round(val) + 'px';
    return val;
  }

  /* ═══════════════════════════════════════════════════════════
     INIT
  ═══════════════════════════════════════════════════════════ */
  function init() {
    /* ── Re-inject on iframe load (mismo patrón que moodswitch.js) ── */
    var frame = document.getElementById('invframe');
    if (frame) {
      frame.addEventListener('load', function () {
        /* Pequeño delay para que contentDocument esté listo */
        setTimeout(_injectIntoIframe, 40);
      });
    }

    /* ── Re-inject cuando el bridge del iframe avisa AUREO_READY ── */
    window.addEventListener('message', function (e) {
      if (e.data && e.data.type === 'AUREO_READY') {
        setTimeout(_injectIntoIframe, 40);
      }
    });

    /* ── Init sliders + listeners ── */
    SLIDER_MAP.forEach(function (cfg) {
      var el  = document.getElementById(cfg.id);
      var out = document.getElementById(cfg.id + '-val');
      if (!el) return;

      /* Valor inicial */
      el.value = _s[cfg.key];
      _updateSliderFill(el);
      if (out) out.textContent = _formatVal(_s[cfg.key], cfg.suffix);

      /* Listener: input en tiempo real */
      el.addEventListener('input', function () {
        _s[cfg.key] = parseFloat(el.value);
        _updateSliderFill(el);
        if (out) out.textContent = _formatVal(_s[cfg.key], cfg.suffix);
        _applyAll();
      });
    });

    /* ── Reset button ── */
    var resetBtn = document.getElementById('vp-reset');
    if (resetBtn) resetBtn.addEventListener('click', _reset);

    /* ── Outer initial state ── */
    _updateOuter();
  }

  /* ── Export para uso externo (debug, futuras fases) ── */
  window.visualPolish = { init: init, reset: _reset };

  /* ── Auto-init ── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
