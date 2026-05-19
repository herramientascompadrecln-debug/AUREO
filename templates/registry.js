/* ── AUREO · templates/registry.js ─────────────────────────────
   Central registry for all invitation templates.
   To add a new template:
     1. Create /templates/themes/YourTemplate.js  (exports buildYourTemplate)
     2. Add an entry here — nothing else changes.

   Each entry shape:
   {
     id        : string   — used in S.template and buildSum
     label     : string   — shown in the UI selector
     emoji     : string   — visual hint in the selector chip
     tipos     : string[] — event types this template suits (used for auto-suggest)
     build     : function — (d) => HTML string
   }
─────────────────────────────────────────────────────────────── */

const TEMPLATE_REGISTRY = [
  {
    id    : 'DarkLuxuryWedding',
    label : 'Dark Luxury Wedding',
    emoji : '🖤',
    tipos : ['Boda'],
    // buildHTML is the existing localBuilder — aliased here, not duplicated
    build : (d) => buildHTML(d),
  },
  {
    id    : 'EditorialMinimal',
    label : 'Editorial Minimal',
    emoji : '◻',
    tipos : ['Boda', 'Corporativo'],
    build : (d) => buildEditorialMinimal(d),
  },
  {
    id    : 'XVPrincess',
    label : 'XV Princess',
    emoji : '👑',
    tipos : ['XV Anos'],
    build : (d) => buildXVPrincess(d),
  },
  {
    id    : 'KidsFantasy',
    label : 'Kids Fantasy',
    emoji : '🎈',
    tipos : ['Infantil', 'Baby Shower'],
    build : (d) => buildKidsFantasy(d),
  },
  {
    id    : 'CorporateLuxury',
    label : 'Corporate Luxury',
    emoji : '🏢',
    tipos : ['Corporativo'],
    build : (d) => buildCorporateLuxury(d),
  },
];

/* ── Loader: get a template by id ── */
function getTemplate(id) {
  return TEMPLATE_REGISTRY.find(t => t.id === id) || TEMPLATE_REGISTRY[0];
}

/* ── Auto-suggest best template for a given tipo ── */
function suggestTemplate(tipo) {
  const match = TEMPLATE_REGISTRY.find(t => t.tipos.includes(tipo));
  return match ? match.id : 'DarkLuxuryWedding';
}

/* ── Dispatch: resolve template and call its builder ── */
function buildFromTemplate(d) {
  const tpl = getTemplate(S.template || 'DarkLuxuryWedding');
  return tpl.build(d);
}
