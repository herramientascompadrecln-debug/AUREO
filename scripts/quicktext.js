/* ── AUREO · scripts/quicktext.js ──────────────────────────────
   FASE 4C LIGHT — Quick Text Controls
   
   ARQUITECTURA:
   ┌──────────────────────────────────────────────────────────┐
   │  Grupo A — Mirrors (usa AUREO_UPDATE existente)           │
   │    qt-names  → #fn     → patches n1/n2/names             │
   │    qt-frase  → #ffrase → patch frase                     │
   │    qt-gm     → #fgm    → patch gm                        │
   │                                                           │
   │  Grupo B — Directos (AUREO_QT, bridge inyectado)         │
   │    Títulos de sección, RSVP text, textos de cierre       │
   │    → script tag inyectado en contentDocument del iframe  │
   └──────────────────────────────────────────────────────────┘
   
   REGLAS:
   · Sin contenteditable / sin HTML injection
   · Solo textContent updates en el iframe
   · Sin modificación de archivos prohibidos
   · Sin nuevos sistemas reactivos
─────────────────────────────────────────────────────────────── */

const quickText = (() => {

  /* ── Estado QT (solo Grupo B) — persiste entre renders ── */
  const _qtState = {};

  /* ── Script del bridge inyectado en iframe ──
     Se compila como string para insertarlo via createElement('script').
     Maneja caso especial de .wabtn (SVG + text node mixto).            */
  const _BRIDGE_SCRIPT = `
(function(){
  if(window._AUREO_QT_ACTIVE)return;
  window._AUREO_QT_ACTIVE=true;

  function tx(sel,val){
    document.querySelectorAll(sel).forEach(function(el){el.textContent=val;});
  }

  window.addEventListener('message',function(e){
    if(!e.data||e.data.type!=='AUREO_QT')return;
    var p=e.data.payload||{};

    /* Títulos de sección */
    if(p.galTitle   !=null) tx('.rhdr-t',p.galTitle);
    if(p.detTitle   !=null) tx('.dh',p.detTitle);
    if(p.locTitle   !=null) tx('.lh',p.locTitle);
    if(p.giftsTitle !=null) tx('.gifts h2',p.giftsTitle);

    /* RSVP */
    if(p.rsvpSub    !=null) tx('.rdead',p.rsvpSub);
    if(p.rsvpHeading!=null) tx('.rt',p.rsvpHeading);

    /* Botón RSVP — tiene SVG + text node: actualizar solo el text node */
    if(p.rsvpBtn!=null){
      document.querySelectorAll('.wabtn').forEach(function(btn){
        btn.childNodes.forEach(function(node){
          if(node.nodeType===3&&node.textContent.trim()){
            node.textContent=' '+p.rsvpBtn;
          }
        });
      });
    }

    /* Sección cierre */
    if(p.closingTag !=null) tx('.cle',p.closingTag);
    if(p.closingMsg !=null) tx('.clm',p.closingMsg);

    /* Pie de página / branding */
    if(p.brandHeart !=null) tx('.brand-heart',p.brandHeart);
  });
})();
`;

  /* ── Inyectar bridge en iframe ── */
  function _injectBridge(frame) {
    if (!frame || !frame.contentDocument || !frame.contentDocument.body) return;
    try {
      /* Evitar doble inyección */
      if (frame.contentDocument.getElementById('_aureo_qt_bridge')) return;
      const script = frame.contentDocument.createElement('script');
      script.id          = '_aureo_qt_bridge';
      script.textContent = _BRIDGE_SCRIPT;
      frame.contentDocument.body.appendChild(script);
    } catch (err) {
      /* Falla silenciosa — nunca rompe animaciones existentes */
    }
  }

  /* ── Enviar mensaje AUREO_QT al iframe ── */
  function _postQT(payload) {
    const frame = g('invframe');
    if (!frame || frame.style.display === 'none') return;
    try {
      frame.contentWindow.postMessage({ type: 'AUREO_QT', payload }, '*');
    } catch (_) {}
  }

  /* ── Sincronizar mirrors desde campos originales del formulario ── */
  function syncMirrors() {
    [
      ['fn',     'qt-names'],
      ['ffrase', 'qt-frase'],
      ['fgm',    'qt-gm'],
    ].forEach(function([formId, qtId]) {
      const form = g(formId);
      const qt   = g(qtId);
      if (form && qt) qt.value = form.value;
    });
  }

  /* ── Callback al cargar/recargar iframe ── */
  function _onFrameLoad() {
    const frame = g('invframe');
    if (!frame) return;
    _injectBridge(frame);
    /* Re-aplicar estado QT guardado con pequeño delay (bridge necesita ejecutarse) */
    if (Object.keys(_qtState).length > 0) {
      setTimeout(function() { _postQT(Object.assign({}, _qtState)); }, 90);
    }
  }

  /* ── Init ── */
  function init() {
    /* Listener persistente en iframe — se activa en cada render/re-render */
    const frame = g('invframe');
    if (frame) {
      frame.addEventListener('load', _onFrameLoad);
    }

    /* ── Grupo A: mirrors — actualiza campo original + llama push() ── */
    [
      ['qt-names', 'fn'],
      ['qt-frase', 'ffrase'],
      ['qt-gm',    'fgm'],
    ].forEach(function([qtId, formId]) {
      const qtEl   = g(qtId);
      const formEl = g(formId);
      if (!qtEl || !formEl) return;
      qtEl.addEventListener('input', function() {
        formEl.value = qtEl.value;
        if (typeof livePreview !== 'undefined') livePreview.push();
      });
    });

    /* ── Grupo B: campos directos QT ── */
    [
      ['qt-galtitle',    'galTitle'],
      ['qt-dettitle',    'detTitle'],
      ['qt-loctitle',    'locTitle'],
      ['qt-giftstitle',  'giftsTitle'],
      ['qt-rsvpsub',     'rsvpSub'],
      ['qt-rsvpheading', 'rsvpHeading'],
      ['qt-rsvpbtn',     'rsvpBtn'],
      ['qt-closingtag',  'closingTag'],
      ['qt-closingmsg',  'closingMsg'],
      ['qt-brandheart',  'brandHeart'],
    ].forEach(function([qtId, key]) {
      const el = g(qtId);
      if (!el) return;
      el.addEventListener('input', function() {
        _qtState[key] = el.value;
        _postQT({ [key]: el.value });
      });
    });
  }

  return { init, syncMirrors };

})();

/* ── Auto-init ── */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() { quickText.init(); });
} else {
  quickText.init();
}
