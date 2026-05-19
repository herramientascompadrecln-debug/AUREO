/* ── AUREO · state.js ───────────────────────────────────────────
   Single source of truth for all mutable UI state.
   Never mutate S directly from templates — use the helpers below.
─────────────────────────────────────────────────────────────── */

const S = {
  step  : 1,
  tipo  : 'Boda',
  plan  : 'Signature',
  estilo: 'Dark Luxury',

  sec: {
    gallery : true,
    countdown: true,
    location: true,
    gifts   : true,
    rsvp    : true,
    music   : true,
  },

  photos: {
    hero   : null,   // base64 string | null
    gallery: [],     // base64[]  (max 6)
    closing: null,   // base64 string | null
  },

  audio: {
    type: 'file',    // 'file' | 'link' | 'name'
    src : null,      // base64 for 'file' mode
    name: null,      // display name
    link: null,      // URL for 'link' mode
  },

  html    : null,        // last generated invitation HTML
  template: 'DarkLuxuryWedding',  // active template id (see templates/registry.js)
};

/* Convenience setter used by form navigation */
function setState(key, value) {
  S[key] = value;
}
