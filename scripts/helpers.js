/* ── AUREO · helpers.js ─────────────────────────────────────────
   Pure utility functions with no side effects.
─────────────────────────────────────────────────────────────── */

/** Shorthand for document.getElementById */
const g = id => document.getElementById(id);

/** Left-pad a number with zeros */
const pad = n => String(n).padStart(2, '0');

/** Slug-safe filename from a display name */
const slugify = str => (str || 'invitacion').replace(/[^a-zA-Z0-9]/g, '-');

/** Month name → 0-based index map */
const MONTHS = {
  enero:0, febrero:1, marzo:2, abril:3, mayo:4, junio:5,
  julio:6, agosto:7, septiembre:8, octubre:9, noviembre:10, diciembre:11,
};

/**
 * Build a Date from the three separate day/month/year fields.
 * Falls back to 90 days from now if any field is missing.
 */
function buildTargetDate(dd, mm, yy, time = '16:00') {
  if (!dd || !mm || !yy) return new Date(Date.now() + 90 * 86400000);
  const [hh, min] = time.split(':').map(Number);
  return new Date(parseInt(yy), MONTHS[mm.toLowerCase()] ?? 0, parseInt(dd), hh, min, 0);
}

/**
 * Collect every form field into a plain data object.
 * Only reads from the DOM — no mutations.
 */
function getData() {
  const dd = g('fdd').value;
  const mm = g('fmm').value;
  const yy = g('fyy').value;
  const t1 = g('ft1').value || '16:00';
  const t2 = g('ft2').value || '20:00';

  const dateLabel = dd && mm && yy
    ? `${dd} de ${mm} de ${yy}`
    : 'Fecha por confirmar';

  const dateISO = buildTargetDate(dd, mm, yy, t1);

  const audioSrc  = S.audio.type === 'file' ? S.audio.src  : null;
  const audioLink = S.audio.type === 'link' ? g('fmlink').value : null;
  const audioName = S.audio.type === 'name' ? g('fmname').value : null;

  return {
    tipo   : S.tipo,
    plan   : S.plan,
    estilo : S.estilo,
    names  : g('fn').value  || 'Sofia & Christian',
    dateLabel,
    dateISO,
    dd, mm, yy,
    v1: g('fv1').value, t1, m1: g('fm1').value,
    v2: g('fv2').value, t2, m2: g('fm2').value,
    dress  : g('fdc').value,
    wa     : g('fwa').value,
    feeling: g('ffeel').value  || 'elegancia, amor, lujo',
    frase  : g('ffrase').value,
    gm     : g('fgm').value   || 'Tu presencia es el mejor regalo.',
    gl     : g('fgl').value   || '#',
    sec    : { ...S.sec },
    photos : { ...S.photos },
    audioSrc,
    audioLink,
    audioName,
  };
}

/** One summary row for the review panel */
const srRow = (label, value) =>
  `<div class="sumr"><span class="suml">${label}</span><span class="sumv">${value}</span></div>`;
