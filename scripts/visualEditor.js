/* ── AUREO · scripts/visualEditor.js ───────────────────────────
   Luxury visual editor panel.

   ARCHITECTURE:
   ┌─────────────────────────────────────────────────────────┐
   │  visualEditor (singleton IIFE)                          │
   │    open() / close() / toggle()  — panel visibility      │
   │    _buildPanel()  — renders tabs + controls             │
   │                                                         │
   │  Three tabs:                                            │
   │    SECCIONES  — drag to reorder, eye to hide/show       │
   │    VISUAL     — glow, overlays, spacing, typography     │
   │    EFECTOS    — cinematic effects, alignment            │
   │                                                         │
   │  Each change posts to iframe via livePreview system:    │
   │    { type:'AUREO_UPDATE', payload: { visualEffects:{} } }│
   │  Bridge PATCH 'visualEffects' applies CSS vars to :root │
   └─────────────────────────────────────────────────────────┘

   SECTION REORDER / HIDE:
   Drag events reorder .ve-section-item list.
   On drop → posts AUREO_UPDATE { sectionOrder, sectionVisibility }
   Bridge moves actual DOM sections in the iframe.

   Depends on: state.js · helpers.js · livePreview.js · preview.js
─────────────────────────────────────────────────────────────── */

const visualEditor = (() => {

  /* ── Visual state (extends S without polluting it) ── */
  const VE = {
    open: false,
    tab : 'sections',   // 'sections' | 'visual' | 'effects'

    /* Visual effects — synced to iframe via postMessage */
    effects: {
      glowIntensity  : 50,    // 0–100
      overlayDark    : 50,    // 0–100
      overlayWarm    : 30,    // 0–100
      spacingScale   : 50,    // 0–100  → maps to padding multiplier
      fontScale      : 50,    // 0–100  → base font-size tweak
      motionSpeed    : 50,    // 0–100  → animation-duration multiplier
      accentColor    : '#c8a96e',
      heroAlign      : 'left',   // 'left' | 'center'
      textAlign      : 'center', // 'left' | 'center'
      cinematicGrain : false,
      particlesOn    : true,
    },

    /* Section ordering & visibility (mirrors S.sec + order) */
    sections: [
      { id: 'hero',     label: 'Portada',       icon: '🖼', visible: true,  fixed: true  },
      { id: 'intro',    label: 'Intro',          icon: '✦',  visible: true,  fixed: false },
      { id: 'gallery',  label: 'Galería',        icon: '📸', visible: true,  fixed: false },
      { id: 'moment',   label: 'Momento',        icon: '"',  visible: true,  fixed: false },
      { id: 'details',  label: 'Detalles',       icon: '📅', visible: true,  fixed: false },
      { id: 'location', label: 'Ubicación',      icon: '📍', visible: true,  fixed: false },
      { id: 'gifts',    label: 'Regalos',        icon: '🎁', visible: true,  fixed: false },
      { id: 'rsvp',     label: 'RSVP',           icon: '💬', visible: true,  fixed: false },
      { id: 'closing',  label: 'Cierre',         icon: '🌿', visible: true,  fixed: true  },
      { id: 'brand',    label: 'Marca AUREO',    icon: '✦',  visible: true,  fixed: true  },
    ],
  };

  /* Drag state */
  let _dragIdx = null;

  /* ── Post visual effects to iframe ── */
  function _postEffects() {
    if (!livePreview) return;
    const fr = g('invframe');
    if (!fr || fr.style.display === 'none') return;
    try {
      fr.contentWindow.postMessage({
        type: 'AUREO_UPDATE',
        payload: { visualEffects: { ...VE.effects } }
      }, '*');
    } catch(_) {}
  }

  /* ── Post section order/visibility to iframe ── */
  function _postSections() {
    if (!livePreview) return;
    const fr = g('invframe');
    if (!fr || fr.style.display === 'none') return;
    try {
      fr.contentWindow.postMessage({
        type: 'AUREO_UPDATE',
        payload: {
          sectionOrder     : VE.sections.map(s => s.id),
          sectionVisibility: Object.fromEntries(VE.sections.map(s => [s.id, s.visible])),
        }
      }, '*');
    } catch(_) {}
  }

  /* ── Build the full panel DOM ── */
  function _buildPanel() {
    const panel = g('ve-panel');
    if (!panel) return;

    panel.innerHTML = `
      <div class="ve-hdr">
        <span class="ve-title">Editor Visual</span>
        <button class="ve-close" onclick="visualEditor.close()">✕</button>
      </div>
      <div class="ve-tabs">
        <button class="ve-tab ${VE.tab==='sections'?'on':''}" onclick="visualEditor.setTab('sections',this)">Secciones</button>
        <button class="ve-tab ${VE.tab==='visual'?'on':''}"   onclick="visualEditor.setTab('visual',this)">Visual</button>
        <button class="ve-tab ${VE.tab==='effects'?'on':''}"  onclick="visualEditor.setTab('effects',this)">Efectos</button>
      </div>
      <div class="ve-body">
        ${_tabSections()}
        ${_tabVisual()}
        ${_tabEffects()}
      </div>`;

    _bindDrag();
    _bindSliders();
    _bindToggles();
    _bindAlign();
    _bindSwatches();
  }

  /* ─────────────────────────────────
     TAB: SECCIONES
  ───────────────────────────────── */
  function _tabSections() {
    const items = VE.sections.map((s, i) => `
      <div class="ve-section-item ${s.visible?'':'hidden'}"
           data-idx="${i}"
           draggable="${s.fixed ? 'false' : 'true'}">
        <span class="ve-drag-handle">${s.fixed ? '·' : '⋮⋮'}</span>
        <span class="ve-section-ico">${s.icon}</span>
        <span class="ve-section-name">${s.label}</span>
        ${!s.fixed ? `<button class="ve-eye" title="${s.visible?'Ocultar':'Mostrar'}"
          onclick="visualEditor.toggleSection(${i})">${s.visible ? '👁' : '◌'}</button>` : ''}
      </div>`).join('');

    return `<div class="ve-pane ${VE.tab==='sections'?'on':''}" id="ve-pane-sections">
      <span class="ve-group-label">Arrastra para reordenar</span>
      <div class="ve-section-list" id="ve-section-list">${items}</div>
      <button class="ve-reset" onclick="visualEditor.resetSections()">↺ Restablecer orden</button>
    </div>`;
  }

  /* ─────────────────────────────────
     TAB: VISUAL
  ───────────────────────────────── */
  function _tabVisual() {
    const e = VE.effects;

    const swatchColors = [
      { hex:'#c8a96e', label:'Champagne'  },
      { hex:'#d4a0b0', label:'Rose Gold'  },
      { hex:'#a0b8cc', label:'Glacier'    },
      { hex:'#b8c4a8', label:'Sage'       },
      { hex:'#c4b0d8', label:'Lavender'   },
      { hex:'#d4c4a0', label:'Ivory Gold' },
    ];
    const swatchHTML = swatchColors.map(s =>
      `<div class="ve-swatch ${e.accentColor===s.hex?'on':''}"
            style="background:${s.hex}"
            title="${s.label}"
            data-hex="${s.hex}"
            onclick="visualEditor.setAccent('${s.hex}',this)"></div>`
    ).join('');

    return `<div class="ve-pane ${VE.tab==='visual'?'on':''}" id="ve-pane-visual">

      <div class="ve-group">
        <span class="ve-group-label">Color de acento</span>
        <div class="ve-swatches">${swatchHTML}</div>
      </div>

      <div class="ve-group">
        <span class="ve-group-label">Iluminación</span>
        ${_slider('glowIntensity', 'Glow', 0, 100, e.glowIntensity, '%')}
        ${_slider('overlayDark',   'Oscuridad', 0, 100, e.overlayDark, '%')}
        ${_slider('overlayWarm',   'Calidez', 0, 100, e.overlayWarm, '%')}
      </div>

      <div class="ve-group">
        <span class="ve-group-label">Tipografía y espacio</span>
        ${_slider('fontScale',    'Tamaño', 0, 100, e.fontScale, '')}
        ${_slider('spacingScale', 'Espacio', 0, 100, e.spacingScale, '')}
      </div>

      <button class="ve-reset" onclick="visualEditor.resetEffects()">↺ Restablecer visual</button>
    </div>`;
  }

  /* ─────────────────────────────────
     TAB: EFECTOS
  ───────────────────────────────── */
  function _tabEffects() {
    const e = VE.effects;

    return `<div class="ve-pane ${VE.tab==='effects'?'on':''}" id="ve-pane-effects">

      <div class="ve-group">
        <span class="ve-group-label">Alineación del hero</span>
        <div class="ve-align-row">
          <button class="ve-align-btn ${e.heroAlign==='left'?'on':''}"   data-align="heroAlign" data-val="left"   onclick="visualEditor.setAlign('heroAlign','left',this)">⬤ Izquierda</button>
          <button class="ve-align-btn ${e.heroAlign==='center'?'on':''}" data-align="heroAlign" data-val="center" onclick="visualEditor.setAlign('heroAlign','center',this)">⬤ Centro</button>
        </div>
        <span class="ve-group-label" style="margin-top:10px">Alineación de texto</span>
        <div class="ve-align-row">
          <button class="ve-align-btn ${e.textAlign==='left'?'on':''}"   data-align="textAlign" data-val="left"   onclick="visualEditor.setAlign('textAlign','left',this)">⬤ Izquierda</button>
          <button class="ve-align-btn ${e.textAlign==='center'?'on':''}" data-align="textAlign" data-val="center" onclick="visualEditor.setAlign('textAlign','center',this)">⬤ Centro</button>
        </div>
      </div>

      <div class="ve-group">
        <span class="ve-group-label">Motion</span>
        ${_slider('motionSpeed', 'Velocidad', 0, 100, e.motionSpeed, '')}
      </div>

      <div class="ve-group">
        <span class="ve-group-label">Efectos cinematográficos</span>
        ${_veToggle('cinematicGrain', '🎞', 'Grain de película', e.cinematicGrain)}
        ${_veToggle('particlesOn',    '✦',  'Partículas flotantes', e.particlesOn)}
      </div>

      <div class="ve-group">
        <span class="ve-group-label">Edición inline</span>
        <button class="ve-align-btn" style="width:100%;margin:0"
          onclick="visualEditor.toggleInlineEdit()">✏ Activar edición inline</button>
      </div>

    </div>`;
  }

  /* ── Slider builder ── */
  function _slider(key, label, min, max, val, unit) {
    return `<div class="ve-row">
      <span class="ve-row-label">${label}</span>
      <input class="ve-slider" type="range" min="${min}" max="${max}" value="${val}"
             data-key="${key}" oninput="visualEditor.onSlider(this)">
      <span class="ve-val" id="ve-val-${key}">${val}${unit}</span>
    </div>`;
  }

  /* ── Toggle builder ── */
  function _veToggle(key, icon, label, val) {
    return `<div class="ve-toggle-row ${val?'on':''}" data-key="${key}" onclick="visualEditor.onVeToggle(this)">
      <span class="ve-toggle-label"><span class="ve-toggle-icon">${icon}</span>${label}</span>
      <div class="ve-sw"></div>
    </div>`;
  }

  /* ── Bind drag reorder ── */
  function _bindDrag() {
    const list = g('ve-section-list');
    if (!list) return;

    list.addEventListener('dragstart', e => {
      const item = e.target.closest('.ve-section-item');
      if (!item) return;
      _dragIdx = parseInt(item.dataset.idx);
      item.classList.add('dragging');
    });

    list.addEventListener('dragend', e => {
      const item = e.target.closest('.ve-section-item');
      if (item) item.classList.remove('dragging');
      list.querySelectorAll('.ve-section-item').forEach(i => i.classList.remove('drag-over'));
    });

    list.addEventListener('dragover', e => {
      e.preventDefault();
      const item = e.target.closest('.ve-section-item[draggable="true"]');
      if (!item) return;
      list.querySelectorAll('.ve-section-item').forEach(i => i.classList.remove('drag-over'));
      item.classList.add('drag-over');
    });

    list.addEventListener('drop', e => {
      e.preventDefault();
      const item = e.target.closest('.ve-section-item[draggable="true"]');
      if (!item || _dragIdx === null) return;
      const dropIdx = parseInt(item.dataset.idx);
      if (dropIdx === _dragIdx) return;

      /* Reorder VE.sections */
      const moved = VE.sections.splice(_dragIdx, 1)[0];
      VE.sections.splice(dropIdx, 0, moved);
      _dragIdx = null;

      /* Re-render sections tab and re-bind */
      const pane = g('ve-pane-sections');
      if (pane) {
        const tmp = document.createElement('div');
        tmp.innerHTML = _tabSections();
        const newPane = tmp.querySelector('.ve-pane');
        pane.replaceWith(newPane);
      }
      _bindDrag();

      _postSections();
    });
  }

  /* ── Bind sliders ── */
  function _bindSliders() {
    document.querySelectorAll('#ve-panel .ve-slider').forEach(sl => {
      sl.addEventListener('input', () => {
        /* handled by oninput="visualEditor.onSlider(this)" */
      });
    });
  }

  /* ── Bind effect toggles ── */
  function _bindToggles() {
    /* handled inline via onclick */
  }

  /* ── Bind alignment buttons ── */
  function _bindAlign() {
    /* handled inline via onclick */
  }

  /* ── Bind swatches ── */
  function _bindSwatches() {
    /* handled inline via onclick */
  }

  /* ── Inline edit injection ── */
  const INLINE_EDIT_CSS = `
    .aureo-editable{outline:none;cursor:text;position:relative;transition:box-shadow .2s}
    .aureo-editable:hover{box-shadow:0 0 0 1px rgba(200,169,110,.4),0 0 12px rgba(200,169,110,.15)}
    .aureo-editable:focus{box-shadow:0 0 0 1px rgba(200,169,110,.7),0 0 20px rgba(200,169,110,.25)}
    .aureo-edit-hint{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:rgba(12,10,20,.9);border:1px solid rgba(200,169,110,.3);border-radius:8px;padding:8px 16px;font-family:'Montserrat',sans-serif;font-size:8px;letter-spacing:.35em;text-transform:uppercase;color:rgba(200,169,110,.7);pointer-events:none;z-index:9999;backdrop-filter:blur(12px)}`;

  let _inlineEditActive = false;

  /* ── Public API ── */
  return {

    open() {
      VE.open = true;
      _buildPanel();
      const panel = g('ve-panel');
      if (panel) {
        panel.classList.add('open');
        /* Shrink devframe slightly so panel doesn't overlap */
        const df = g('devframe');
        if (df) df.style.marginRight = '280px';
      }
      const btn = g('btn-edit');
      if (btn) btn.classList.add('active');
    },

    close() {
      VE.open = false;
      const panel = g('ve-panel');
      if (panel) panel.classList.remove('open');
      const df = g('devframe');
      if (df) df.style.marginRight = '';
      const btn = g('btn-edit');
      if (btn) btn.classList.remove('active');
      /* Deactivate inline edit */
      if (_inlineEditActive) this.toggleInlineEdit();
    },

    toggle() {
      VE.open ? this.close() : this.open();
    },

    setTab(tab, el) {
      VE.tab = tab;
      document.querySelectorAll('#ve-panel .ve-tab').forEach(t => t.classList.remove('on'));
      if (el) el.classList.add('on');
      document.querySelectorAll('#ve-panel .ve-pane').forEach(p => p.classList.remove('on'));
      const pane = g('ve-pane-' + tab);
      if (pane) pane.classList.add('on');
    },

    /* ── Section handlers ── */
    toggleSection(idx) {
      VE.sections[idx].visible = !VE.sections[idx].visible;
      /* Update item DOM */
      const list = g('ve-section-list');
      if (list) {
        const item = list.querySelector(`[data-idx="${idx}"]`);
        if (item) {
          item.classList.toggle('hidden', !VE.sections[idx].visible);
          const eye = item.querySelector('.ve-eye');
          if (eye) eye.textContent = VE.sections[idx].visible ? '👁' : '◌';
        }
      }
      /* Also sync S.sec for save consistency */
      const secMap = { gallery:'gallery', location:'location', gifts:'gifts', rsvp:'rsvp' };
      const s = VE.sections[idx];
      if (secMap[s.id]) S.sec[secMap[s.id]] = s.visible;
      _postSections();
    },

    resetSections() {
      VE.sections = [
        { id:'hero',     label:'Portada',    icon:'🖼', visible:true, fixed:true  },
        { id:'intro',    label:'Intro',      icon:'✦',  visible:true, fixed:false },
        { id:'gallery',  label:'Galería',    icon:'📸', visible:true, fixed:false },
        { id:'moment',   label:'Momento',    icon:'"',  visible:true, fixed:false },
        { id:'details',  label:'Detalles',   icon:'📅', visible:true, fixed:false },
        { id:'location', label:'Ubicación',  icon:'📍', visible:true, fixed:false },
        { id:'gifts',    label:'Regalos',    icon:'🎁', visible:true, fixed:false },
        { id:'rsvp',     label:'RSVP',       icon:'💬', visible:true, fixed:false },
        { id:'closing',  label:'Cierre',     icon:'🌿', visible:true, fixed:true  },
        { id:'brand',    label:'Marca AUREO',icon:'✦',  visible:true, fixed:true  },
      ];
      _buildPanel();
      _postSections();
      showT('Orden restablecido ✦', 'ok');
    },

    /* ── Slider handler ── */
    onSlider(el) {
      const key = el.dataset.key;
      const val = parseInt(el.value);
      VE.effects[key] = val;
      /* Update display value */
      const unit = key === 'glowIntensity' || key === 'overlayDark' || key === 'overlayWarm' ? '%' : '';
      const display = g('ve-val-' + key);
      if (display) display.textContent = val + unit;
      _postEffects();
    },

    /* ── Effect toggle handler ── */
    onVeToggle(row) {
      row.classList.toggle('on');
      const key = row.dataset.key;
      VE.effects[key] = row.classList.contains('on');
      _postEffects();
    },

    /* ── Accent color ── */
    setAccent(hex, el) {
      VE.effects.accentColor = hex;
      document.querySelectorAll('#ve-panel .ve-swatch').forEach(s => s.classList.remove('on'));
      if (el) el.classList.add('on');
      _postEffects();
    },

    /* ── Alignment ── */
    setAlign(prop, val, el) {
      VE.effects[prop] = val;
      /* Update sibling buttons */
      const row = el.closest('.ve-align-row');
      if (row) row.querySelectorAll('.ve-align-btn').forEach(b => b.classList.remove('on'));
      if (el) el.classList.add('on');
      _postEffects();
    },

    /* ── Reset effects ── */
    resetEffects() {
      VE.effects = {
        glowIntensity: 50, overlayDark: 50, overlayWarm: 30,
        spacingScale : 50, fontScale   : 50, motionSpeed : 50,
        accentColor  : '#c8a96e',
        heroAlign    : 'left', textAlign: 'center',
        cinematicGrain: false, particlesOn: true,
      };
      _buildPanel();
      _postEffects();
      showT('Visual restablecido ✦', 'ok');
    },

    /* ── Inline edit mode ── */
    toggleInlineEdit() {
      _inlineEditActive = !_inlineEditActive;
      const fr = g('invframe');
      if (!fr || fr.style.display === 'none') {
        showT('Genera la invitación primero', 'er');
        _inlineEditActive = false;
        return;
      }
      try {
        fr.contentWindow.postMessage({
          type: 'AUREO_UPDATE',
          payload: { inlineEdit: _inlineEditActive }
        }, '*');
      } catch(_) {}
      showT(_inlineEditActive ? '✏ Edición inline activa' : 'Edición inline desactivada', 'ok');
    },

    /* ── Called by preview.js after gen() to show the edit button ── */
    onGenerated() {
      const btn = g('btn-edit');
      if (btn) btn.classList.add('visible');
    },

    /* ── Expose VE for debugging ── */
    getState() { return VE; },
  };

})();
