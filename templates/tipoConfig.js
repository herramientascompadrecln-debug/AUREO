/* ── AUREO · templates/tipoConfig.js ───────────────────────────
   Color palette and default feeling per event type.
   Referenced by localBuilder.js and aiPrompt.js.
─────────────────────────────────────────────────────────────── */

const TIPO_CONFIG = {
  'Boda'         : { bg:'#0c0a14', bg2:'#14111f', ch:'#c8a96e', chlt:'#e8d49a', feeling:'elegante, romántico, cinematográfico' },
  'XV Anos'      : { bg:'#120810', bg2:'#1e1020', ch:'#d4a0b0', chlt:'#ecc8d8', feeling:'princesa moderna, glam, mágico' },
  'Infantil'     : { bg:'#0a0e1a', bg2:'#12183a', ch:'#6090e0', chlt:'#90c0ff', feeling:'divertido, mágico, energético' },
  'Bautizo'      : { bg:'#0a0e14', bg2:'#12181e', ch:'#a0b8cc', chlt:'#c8dce8', feeling:'espiritual, delicado, limpio' },
  'Baby Shower'  : { bg:'#120a14', bg2:'#1e1020', ch:'#d0a8c0', chlt:'#e8ccd8', feeling:'tierno, cálido, delicado' },
  'Gender Reveal': { bg:'#0c0c14', bg2:'#141422', ch:'#a090d0', chlt:'#c8bae8', feeling:'emoción, anticipación, moderno' },
  'Corporativo'  : { bg:'#0a0a0e', bg2:'#12121a', ch:'#9090b0', chlt:'#c0c0d8', feeling:'moderno, minimal, luxury tech' },
};

function getTipoConfig(tipo) {
  return TIPO_CONFIG[tipo] || TIPO_CONFIG['Boda'];
}
