/* ── AUREO · scripts/livePreview.js ────────────────────────────
   Reactive live preview system.

   ARCHITECTURE:
   ┌─────────────────────────────────────────────────────────┐
   │  Editor (parent window)                                  │
   │    livePreview.init()  — attaches input listeners        │
   │    livePreview.push()  — debounced, diffs state          │
   │    livePreview.flush() — immediate (photo / toggle)      │
   │                │                                         │
   │          postMessage({type:'AUREO_UPDATE', payload})     │
   │                │                                         │
   │  Invitation iframe (child)                               │
   │    window.AUREO_BRIDGE — injected by invitationScripts   │
   │    Applies surgical DOM patches, never re-renders        │
   └─────────────────────────────────────────────────────────┘

   WHAT GETS PATCHED (no full re-render):
     · names (n1, n2, amp)
     · date display string
     · countdown target timestamp
     · venue / time / dress / wa texts
     · hero / closing / gallery images (src swap)
     · section visibility (show/hide)
     · frase / gm (gift message)
     · audio src

   WHAT TRIGGERS FULL RE-RENDER (via gen() as before):
     · template switch
     · plan change
     · user clicks "Generar"

   Depends on: state.js · helpers.js
─────────────────────────────────────────────────────────────── */

const livePreview = (() => {

  /* ── Internal state snapshot for diffing ── */
  let _last = null;

  /* ── Debounce timer ── */
  let _timer = null;
  const DEBOUNCE_MS = 280;   // feel: responsive but not jittery

  /* ── Whether an invitation is loaded in the iframe ── */
  function _hasFrame() {
    const fr = g('invframe');
    return fr && fr.style.display !== 'none' && fr.src && fr.src !== 'about:blank';
  }

  /* ── Build a lightweight payload from current form state ── */
  function _buildPayload() {
    const d = getData();   // helpers.js — reads all form fields

    const names = d.names || '';
    const pts   = names.split(/&|y/i).map(s => s.trim());
    const n1    = pts[0] || names;
    const n2    = pts[1] || '';
    const ini   = (n1[0] || '') + (n2[0] || '');

    const dateDisplay = d.dd && d.mm && d.yy
      ? `${d.dd} · ${(d.mm || '').toUpperCase()} · ${d.yy}`
      : 'Fecha por confirmar';

    const tgtDate = buildTargetDate(d.dd, d.mm, d.yy, d.t1);

    const waNum  = (d.wa || '').replace(/\D/g, '') || '5500000000';
    const waLink = `https://wa.me/${waNum}?text=Confirmo+mi+asistencia`;

    return {
      // identity
      n1, n2, ini, names,
      // template / tipo (for diff awareness — rerender handled by setTemplate/setTipo)
      template: S.template,
      tipo    : S.tipo,
      // date
      dateDisplay,
      countdownMs: tgtDate.getTime(),
      dateLabel  : d.dateLabel,
      // venues
      v1: d.v1, t1: d.t1, m1: d.m1,
      v2: d.v2, t2: d.t2, m2: d.m2,
      // extras
      dress: d.dress,
      waLink,
      frase: d.frase,
      gm   : d.gm,
      gl   : d.gl,
      // sections visibility
      sec: { ...d.sec },
      // media (base64 — diffed by fingerprint, not full stringify)
      heroSrc   : d.photos.hero    || null,
      closingSrc: d.photos.closing || null,
      gallerySrcs: d.photos.gallery.length ? [...d.photos.gallery] : null,
      audioSrc  : d.audioSrc || null,
    };
  }

  /* ── Diff: detect which keys changed vs last payload ── */
  function _diff(next) {
    if (!_last) return next;   // first call — send everything
    const changed = {};
    for (const k of Object.keys(next)) {
      // gallerySrcs: compare by length + content fingerprint (avoid 6× full base64 stringify)
      if (k === 'gallerySrcs') {
        const a = next[k], b = _last[k];
        const aFp = a ? a.length + '|' + (a[0] || '').slice(0, 32) + (a[a.length-1] || '').slice(0, 32) : 'null';
        const bFp = b ? b.length + '|' + (b[0] || '').slice(0, 32) + (b[b.length-1] || '').slice(0, 32) : 'null';
        if (aFp !== bFp) changed[k] = next[k];
        continue;
      }
      // heroSrc / closingSrc / audioSrc: compare first 64 chars (base64 prefix is unique)
      if (k === 'heroSrc' || k === 'closingSrc' || k === 'audioSrc') {
        const a = (next[k] || '').slice(0, 64);
        const b = (_last[k] || '').slice(0, 64);
        if (a !== b) changed[k] = next[k];
        continue;
      }
      const a = JSON.stringify(next[k]);
      const b = JSON.stringify(_last[k]);
      if (a !== b) changed[k] = next[k];
    }
    return Object.keys(changed).length ? changed : null;
  }

  /* ── Send a message to the iframe ── */
  function _post(payload) {
    if (!_hasFrame()) return;
    const fr = g('invframe');
    try {
      fr.contentWindow.postMessage(
        { type: 'AUREO_UPDATE', payload },
        '*'   // same-origin blob URL — wildcard is safe here
      );
    } catch (_) { /* iframe not ready yet */ }
  }

  /* ── Public: debounced push (text fields) ── */
  function push() {
    clearTimeout(_timer);
    _timer = setTimeout(() => {
      if (!_hasFrame()) return;
      const next = _buildPayload();
      const diff = _diff(next);
      if (diff) {
        _post(diff);
        _last = next;
      }
    }, DEBOUNCE_MS);
  }

  /* ── Public: immediate flush (photos, toggles, audio) ── */
  function flush() {
    clearTimeout(_timer);
    if (!_hasFrame()) return;
    const next = _buildPayload();
    _post(next);   // always send full payload on structural change
    _last = next;
  }

  /* ── Public: reset snapshot (called after full gen()) ── */
  function reset() {
    _last = null;
    // Rebuild snapshot after iframe loads
    const fr = g('invframe');
    if (!fr) return;
    fr.addEventListener('load', () => {
      _last = _buildPayload();
    }, { once: true });
  }

  /* ── Public: attach all form listeners ── */
  function init() {
    /* Text inputs — debounced */
    const textIds = [
      'fn',     // names
      'fdd','fmm','fyy',   // date
      'ft1','ft2',         // times
      'fv1','fv2',         // venues
      'fm1','fm2',         // maps (not visible in preview but keep in sync)
      'fdc',               // dress code
      'fwa',               // whatsapp
      'ffrase',            // custom phrase
      'fgm',               // gift message
      'fgl',               // gift link
      'ffeel',             // feeling (drives intro word in some templates)
    ];
    textIds.forEach(id => {
      const el = g(id);
      if (!el) return;
      el.addEventListener('input', push);
      el.addEventListener('change', push);
    });

    /* Chip clicks (tipo, estilo, template) — immediate flush
       chips mutate S before firing, so we flush after the existing handler runs */
    document.querySelectorAll('.chips, #chtpl').forEach(group => {
      group.addEventListener('click', () => {
        // Let existing formNav chip handler run first, then flush
        setTimeout(flush, 0);
      });
    });

    /* Section toggles — immediate (show/hide sections) */
    document.querySelectorAll('.trow').forEach(row => {
      row.addEventListener('click', () => setTimeout(flush, 0));
    });

    /* The livePreview attaches to the existing formNav chip listeners
       via bubbling — no duplication, no override. */
  }

  /* ── Public: instant local re-render (template / tipo switch) ──
     Builds HTML via the local builder (no AI) and loads it in
     the iframe. Faster than gen() — no spinner, no API call.
     Only called when HTML structure truly must change.            */
  function rerender() {
    clearTimeout(_timer);
    const d = getData();
    if (!d.names && !d.dd) return;   // nothing filled yet — skip

    /* Build with current template */
    let html;
    try {
      html = buildFromTemplate(d);   // registry.js
    } catch (e) {
      console.warn('[AUREO] rerender failed:', e);
      return;
    }

    S.html = html;
    showInv(html);                   // preview.js — also calls livePreview.reset()
    g('dlbtn') && g('dlbtn').classList.add('on');
  }

  return { init, push, flush, reset, rerender };

})();

/* ── Hook into showInv so reset() fires after every full render ── */
const _origShowInv = typeof showInv === 'function' ? showInv : null;
// Actual override is done in preview.js where showInv is defined.
// livePreview.reset() is called from there.
