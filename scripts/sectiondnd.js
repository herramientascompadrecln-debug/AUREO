/* ── AUREO · scripts/sectiondnd.js ─────────────────────────────
   Self-contained drag & drop section reorder module.
   SCOPE: panel UI + postMessage to iframe only.
   TOUCHES NOTHING: generator · localbuilder · preview · templates
                    gallery · audio · export · reactive engine.

   Flow:
     sectionDnd.onFrameReady()   called from AUREO_READY handler
     sectionDnd.open/close/toggle()  panel visibility
     drop event → _postOrder()   → postMessage sectionOrder[]
     iframe BRIDGE PATCH sectionOrder: moves DOM nodes

   Depends on: helpers.js (g), toast.js (showT), tokens.css vars
─────────────────────────────────────────────────────────────── */

const sectionDnd = (() => {

  /* ── Section registry — order determines iframe layout ── */
  const DEFAULT_SECTIONS = [
    { id: 'hero',     label: 'Portada',     ico: '🖼', fixed: true,  visible: true },
    { id: 'intro',    label: 'Intro',       ico: '✦',  fixed: false, visible: true },
    { id: 'gallery',  label: 'Galería',     ico: '📸', fixed: false, visible: true },
    { id: 'moment',   label: 'Momento',     ico: '"',  fixed: false, visible: true },
    { id: 'details',  label: 'Detalles',    ico: '📅', fixed: false, visible: true },
    { id: 'location', label: 'Ubicación',   ico: '📍', fixed: false, visible: true },
    { id: 'gifts',    label: 'Regalos',     ico: '🎁', fixed: false, visible: true },
    { id: 'rsvp',     label: 'RSVP',        ico: '💬', fixed: false, visible: true },
    { id: 'closing',  label: 'Cierre',      ico: '🌿', fixed: true,  visible: true },
    { id: 'brand',    label: 'Marca AUREO', ico: '✦',  fixed: true,  visible: true },
  ];

  /* Live order (mutated on each drop) */
  let _order = DEFAULT_SECTIONS.map(s => ({ ...s }));

  /* Drag state */
  let _dragIdx = null;
  let _open    = false;

  /* ── Post current order to iframe via postMessage ── */
  function _postOrder() {
    const fr = g('invframe');
    if (!fr || fr.style.display === 'none') return;
    try {
      fr.contentWindow.postMessage({
        type   : 'AUREO_UPDATE',
        payload: { sectionOrder: _order.map(s => s.id) },
      }, '*');
    } catch (_) {}
  }

  /* ── Post section visibility map to iframe ── */
  function _postVisibility() {
    const fr = g('invframe');
    if (!fr || fr.style.display === 'none') return;
    const vis = {};
    _order.forEach(s => { vis[s.id] = s.visible; });
    try {
      fr.contentWindow.postMessage({
        type   : 'AUREO_UPDATE',
        payload: { sectionVisibility: vis },
      }, '*');
    } catch (_) {}
  }

  /* Current active tab */
  let _activeTab = 'order';   /* 'order' | 'visibility' */

  /* ── Render panel tabs + content ── */
  function _render() {
    const panel = g('dnd-panel');
    if (!panel) return;

    /* ── Header (kept from HTML) ── */
    const hdr  = panel.querySelector('.dnd-hdr');
    const hint = panel.querySelector('.dnd-hint');
    const list = panel.querySelector('.dnd-list');
    const rst  = panel.querySelector('.dnd-reset');

    /* Build tabs once (idempotent check) */
    if (!panel.querySelector('.dnd-tabs')) {
      const tabs = document.createElement('div');
      tabs.className = 'dnd-tabs';
      tabs.innerHTML =
        `<button class="dnd-tab${_activeTab==='order'?' on':''}" onclick="sectionDnd.switchTab('order',this)">Orden</button>` +
        `<button class="dnd-tab${_activeTab==='visibility'?' on':''}" onclick="sectionDnd.switchTab('visibility',this)">Visibilidad</button>`;
      /* Insert tabs after header */
      if (hdr && hdr.nextSibling) hdr.parentNode.insertBefore(tabs, hdr.nextSibling);
      else panel.appendChild(tabs);
    } else {
      /* Update tab active state */
      panel.querySelectorAll('.dnd-tab').forEach((btn, i) => {
        const t = ['order','visibility'][i];
        btn.classList.toggle('on', t === _activeTab);
      });
    }

    /* ── Wrap list + reset inside pane divs if not already done ── */
    if (!panel.querySelector('.dnd-pane')) {
      /* Order pane — move existing list + reset into it */
      const orderPane = document.createElement('div');
      orderPane.className = 'dnd-pane' + (_activeTab==='order'?' on':'');
      orderPane.id = 'dnd-pane-order';
      if (list) orderPane.appendChild(list);
      if (rst)  orderPane.appendChild(rst);

      /* Visibility pane */
      const visPane = document.createElement('div');
      visPane.className = 'dnd-pane' + (_activeTab==='visibility'?' on':'');
      visPane.id = 'dnd-pane-visibility';

      const tabs = panel.querySelector('.dnd-tabs');
      if (tabs) {
        if (hint) panel.insertBefore(orderPane, hint.nextSibling || null);
        else      panel.appendChild(orderPane);
        panel.appendChild(visPane);
        /* Remove floating hint — it's now redundant with tabs */
        if (hint) hint.remove();
      }
    }

    /* ── Populate order pane ── */
    const orderList = panel.querySelector('#dnd-pane-order .dnd-list');
    if (orderList) {
      orderList.innerHTML = '';
      _order.forEach((sec, i) => {
        const item = document.createElement('div');
        item.className = 'dnd-item' + (sec.fixed ? ' fixed' : '');
        item.dataset.idx = i;
        item.draggable   = !sec.fixed;
        item.innerHTML =
          `<span class="dnd-handle">${sec.fixed ? '·' : '⋮⋮'}</span>` +
          `<span class="dnd-ico">${sec.ico}</span>` +
          `<span class="dnd-label">${sec.label}</span>`;
        orderList.appendChild(item);
      });
      _bindDrag();
    }

    /* ── Populate visibility pane ── */
    _renderVisibility();
  }

  /* ── Render the visibility toggle list ── */
  function _renderVisibility() {
    const pane = g('dnd-pane-visibility');
    if (!pane) return;
    pane.innerHTML = '';

    const list = document.createElement('div');
    list.className = 'sh-list';

    _order.forEach((sec, i) => {
      const row = document.createElement('div');
      row.className = 'sh-row' +
        (sec.visible ? ' on' : ' hidden-sec') +
        (sec.fixed   ? ' fixed-sec' : '');
      row.dataset.idx = i;
      if (!sec.fixed) row.onclick = () => sectionDnd.toggleVisibility(i);
      row.innerHTML =
        `<span class="sh-ico">${sec.ico}</span>` +
        `<span class="sh-label">${sec.label}</span>` +
        `<div class="sh-sw"></div>`;
      list.appendChild(row);
    });

    const actions = document.createElement('div');
    actions.className = 'sh-actions';
    actions.innerHTML =
      `<button class="sh-act" onclick="sectionDnd.showAll()">Mostrar todo</button>` +
      `<button class="sh-act" onclick="sectionDnd.hideOptional()">Solo esencial</button>`;

    pane.appendChild(list);
    pane.appendChild(actions);
  }

  /* ── Drag & drop event wiring ── */
  function _bindDrag() {
    const list = g('dnd-list');
    if (!list) return;

    list.addEventListener('dragstart', e => {
      const item = e.target.closest('.dnd-item:not(.fixed)');
      if (!item) { e.preventDefault(); return; }
      _dragIdx = parseInt(item.dataset.idx);
      e.dataTransfer.effectAllowed = 'move';
      /* Delay class add so drag ghost renders cleanly */
      requestAnimationFrame(() => item.classList.add('dragging'));
    }, { capture: true });

    list.addEventListener('dragend', () => {
      list.querySelectorAll('.dnd-item').forEach(el =>
        el.classList.remove('dragging', 'drag-over')
      );
      _dragIdx = null;
    });

    list.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      const over = e.target.closest('.dnd-item');
      if (!over) return;
      list.querySelectorAll('.dnd-item').forEach(el => el.classList.remove('drag-over'));
      if (parseInt(over.dataset.idx) !== _dragIdx) over.classList.add('drag-over');
    });

    list.addEventListener('dragleave', e => {
      const over = e.target.closest('.dnd-item');
      if (over) over.classList.remove('drag-over');
    });

    list.addEventListener('drop', e => {
      e.preventDefault();
      const over = e.target.closest('.dnd-item');
      if (!over || _dragIdx === null) return;
      const dropIdx = parseInt(over.dataset.idx);
      if (dropIdx === _dragIdx) return;

      /* Reorder _order array */
      const moved = _order.splice(_dragIdx, 1)[0];
      _order.splice(dropIdx, 0, moved);

      /* Re-render list + send to iframe */
      _render();
      _postOrder();
    });
  }

  /* ── Public API ── */
  return {

    open() {
      _open = true;
      _render();
      const panel = g('dnd-panel');
      if (panel) panel.classList.add('open');
      g('devframe')?.classList.add('dnd-open');
      const btn = g('btn-dnd');
      if (btn) btn.classList.add('active');
    },

    close() {
      _open = false;
      g('dnd-panel')?.classList.remove('open');
      g('devframe')?.classList.remove('dnd-open');
      const btn = g('btn-dnd');
      if (btn) btn.classList.remove('active');
    },

    toggle() {
      _open ? this.close() : this.open();
    },

    /* Restore default section order */
    reset() {
      _order = DEFAULT_SECTIONS.map(s => ({ ...s }));
      _render();
      _postOrder();
      _postVisibility();
      showT('Orden restablecido ✦', 'ok');
    },

    /* ── Tab switch ── */
    switchTab(tab, btn) {
      _activeTab = tab;
      /* Update tab buttons */
      const panel = g('dnd-panel');
      if (panel) panel.querySelectorAll('.dnd-tab').forEach((b, i) => {
        b.classList.toggle('on', ['order','visibility'][i] === tab);
      });
      /* Update panes */
      const op = g('dnd-pane-order');
      const vp = g('dnd-pane-visibility');
      if (op) op.classList.toggle('on', tab === 'order');
      if (vp) vp.classList.toggle('on', tab === 'visibility');
    },

    /* ── Toggle one section's visibility ── */
    toggleVisibility(idx) {
      const sec = _order[idx];
      if (!sec || sec.fixed) return;
      sec.visible = !sec.visible;

      /* Update S.sec so livePreview stays in sync */
      const secMap = {
        gallery:'gallery', location:'location', gifts:'gifts',
        rsvp:'rsvp', countdown:'countdown', music:'music',
        intro:'intro', moment:'moment', details:'details',
      };
      if (secMap[sec.id] !== undefined && typeof S !== 'undefined') {
        S.sec[secMap[sec.id]] = sec.visible;
      }

      /* Re-render visibility pane (cheap — only the pane) */
      _renderVisibility();

      /* Push to iframe immediately */
      _postVisibility();

      showT(sec.visible ? `${sec.label} visible ✦` : `${sec.label} oculta`, sec.visible ? 'ok' : '');
    },

    /* ── Show all non-fixed sections ── */
    showAll() {
      _order.forEach(sec => { if (!sec.fixed) sec.visible = true; });
      /* Sync S.sec */
      if (typeof S !== 'undefined') {
        ['gallery','location','gifts','rsvp','countdown','music','intro','moment','details'].forEach(k => {
          if (S.sec.hasOwnProperty(k)) S.sec[k] = true;
        });
      }
      _renderVisibility();
      _postVisibility();
      showT('Todas las secciones visibles ✦', 'ok');
    },

    /* ── Hide optional sections (keep Hero + Closing + Details + RSVP) ── */
    hideOptional() {
      const keep = new Set(['hero','closing','brand','details','rsvp']);
      _order.forEach(sec => { if (!sec.fixed) sec.visible = keep.has(sec.id); });
      /* Sync S.sec */
      if (typeof S !== 'undefined') {
        const optionals = ['gallery','location','gifts','countdown','music','intro','moment'];
        optionals.forEach(k => { if (S.sec.hasOwnProperty(k)) S.sec[k] = false; });
      }
      _renderVisibility();
      _postVisibility();
      showT('Solo secciones esenciales ✦', 'ok');
    },

    /* ── Also push visibility on frame ready ── */
    onFrameReady() {
      const btn = g('btn-dnd');
      if (btn) btn.classList.add('visible');
      /* Push current visibility state to freshly loaded iframe */
      _postVisibility();
    },

  };

})();
