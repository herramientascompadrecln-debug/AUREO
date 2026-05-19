/* ── AUREO · components/sections-b.js ──────────────────────────
   Template functions for: DetailsSection · LocationSection ·
   GiftsSection · RSVPSection · ClosingSection · BrandSection ·
   FinalSection
   Each returns an HTML string. No DOM mutations here.
─────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   6. DETAILS SECTION
───────────────────────────────────────────── */
function DetailsSection({ d }) {
  const rows = [
    `<div class="drow sr"><div class="dic">📅</div><div><div class="dtg">Fecha</div><div class="dv">${d.dateLabel}</div></div></div>`,
    d.v1 ? `<div class="drow sr d1"><div class="dic">⛪</div><div><div class="dtg">Ceremonia</div><div class="dv">${d.v1}<small>${d.t1} hrs</small></div></div></div>` : '',
    d.v2 ? `<div class="drow sr d2"><div class="dic">🥂</div><div><div class="dtg">Recepción</div><div class="dv">${d.v2}<small>${d.t2} hrs</small></div></div></div>` : '',
    d.dress ? `<div class="drow sr d3"><div class="dic">👔</div><div><div class="dtg">Dress Code</div><div class="dv">${d.dress}</div></div></div>` : '',
  ].join('');

  return `
<section class="det">
  <div style="text-align:center;margin-bottom:12px"><span class="lbl sr">El gran día</span></div>
  <div class="rule sr d1"><div class="rd"></div></div>
  <h2 class="dh sr d2">Detalles del Evento</h2>
  <div class="dlist">${rows}</div>
</section>`;
}

/* ─────────────────────────────────────────────
   7. LOCATION SECTION (dual cards)
───────────────────────────────────────────── */
const MAP_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`;
const PPL_ICON = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>`;

function _locationCard({ label, venue, time, mapsUrl, icon }) {
  const btn = mapsUrl
    ? `<a href="${mapsUrl}" class="lbtn${label === 'Recepción' ? ' lbtn2' : ''}" target="_blank" rel="noopener">${icon}Abrir en Google Maps</a>`
    : '';
  return `
<div class="lcard">
  <div class="lcard-map"><div class="lpw"><div class="lpd"></div><div class="lpl"></div></div></div>
  <div class="lcard-hdr"><span class="ltype">${label}</span><span class="ltime">${time} hrs</span></div>
  <div class="lvenue">${venue}</div>
  ${btn}
</div>`;
}

function LocationSection({ d }) {
  if (!d.sec.location) return '';

  const cards = [
    (d.v1 || d.m1) ? _locationCard({ label:'Ceremonia', venue:d.v1||'Lugar de ceremonia', time:d.t1, mapsUrl:d.m1, icon:MAP_ICON }) : '',
    d.v2            ? _locationCard({ label:'Recepción', venue:d.v2,                       time:d.t2, mapsUrl:d.m2, icon:PPL_ICON }) : '',
  ].join('');

  return `
<section class="loc">
  <div style="text-align:center;margin-bottom:12px"><span class="lbl sr">Cómo llegar</span></div>
  <div class="rule sr d1"><div class="rd"></div></div>
  <h2 class="lh sr d2">Ubicación</h2>
  <div class="lcards sr d3">${cards}</div>
</section>`;
}

/* ─────────────────────────────────────────────
   8. GIFTS SECTION
───────────────────────────────────────────── */
function GiftsSection({ d }) {
  if (!d.sec.gifts) return '';

  return `
<section class="gifts">
  <span class="lbl sr">Mesa de regalos</span>
  <div class="rule sr d1"><div class="rd"></div></div>
  <h2 class="sr d2" style="font-family:'Cinzel',serif;font-size:clamp(20px,6vw,28px);font-weight:400;letter-spacing:.08em;color:var(--cream);text-transform:uppercase;margin-bottom:14px">Tu presencia es el mejor regalo</h2>
  <p class="gm sr d3">${d.gm}</p>
  <div class="gopts sr d4">
    <a href="${d.gl}" class="gopt" target="_blank">
      <div class="gico">🎁</div><div class="glbl">Mesa</div><div class="gsub">Ver lista</div>
    </a>
    <a href="#" class="gopt">
      <div class="gico">✉️</div><div class="glbl">Sobre</div><div class="gsub">Transferencia</div>
    </a>
  </div>
</section>`;
}

/* ─────────────────────────────────────────────
   9. RSVP SECTION
───────────────────────────────────────────── */
const WA_SVG = `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#fff"/></svg>`;

function RSVPSection({ d, waLink }) {
  if (!d.sec.rsvp) return '';

  return `
<section class="rsvp">
  <div class="rsvp-g"></div>
  <div style="position:relative;z-index:2;max-width:360px;margin:0 auto;text-align:center">
    <div class="rdead sr">Confirma tu asistencia</div>
    <h2 class="rt sr d1">¿Nos Acompañas?</h2>
    <p class="rs sr d2">Tu presencia hace este día verdaderamente especial.</p>
    <a href="${waLink}" class="wabtn sr d3" target="_blank" rel="noopener">
      ${WA_SVG} Confirmar asistencia
    </a>
  </div>
</section>`;
}

/* ─────────────────────────────────────────────
   10. CLOSING SECTION
───────────────────────────────────────────── */
function ClosingSection({ n1, n2, closingImg, dateDisplay, ch }) {
  return `
<section id="closing">
  <div class="clp">${closingImg}</div>
  <div class="clov1"></div><div class="clov2"></div><div class="clglow"></div>
  <div id="floats"></div>
  <div class="clc">
    <span class="cle sr">Con todo nuestro amor</span>
    <div class="cln sr d1">${n1}${n2 ? ' &amp; ' + n2 : ''}</div>
    <div class="rule sr d2"><div class="rd"></div></div>
    <p class="clm sr d3">Gracias por ser parte de esta historia.<br>Tu presencia hará este día inolvidable.</p>
    <div class="clst sr d4">${dateDisplay}</div>
  </div>
</section>`;
}

/* ─────────────────────────────────────────────
   BRAND SECTION
───────────────────────────────────────────── */
function BrandSection() {
  return `
<section class="brand-sec">
  <div class="brand-logo">AUREO</div>
  <div class="brand-tag">Invitaciones Digitales Premium</div>
  <div class="brand-url">aureo.mx</div>
  <div class="brand-heart">Creado con amor para momentos que merecen brillar ✦</div>
</section>`;
}

/* ─────────────────────────────────────────────
   FINAL SECTION
───────────────────────────────────────────── */
function FinalSection({ ini, yy }) {
  return `
<section id="final">
  <div class="finm">${ini || 'V &amp; C'}</div>
  <div class="finr"></div>
  <p class="finc">Aureo · Invitaciones Premium · ${yy || 2025}</p>
</section>`;
}
