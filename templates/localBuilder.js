/* ── AUREO · templates/localBuilder.js ─────────────────────────
   Assembles the full invitation HTML from section components.
   Called as fallback when the AI API is unavailable.
   Depends on: tipoConfig.js · components/sections-a.js · sections-b.js
               invitationStyles.js · invitationScripts.js
─────────────────────────────────────────────────────────────── */

function buildHTML(d) {
  /* ── Names ── */
  const names = d.names || 'Sofia & Christian';
  const pts   = names.split(/&|y/i).map(s => s.trim());
  const n1    = pts[0] || names;
  const n2    = pts[1] || '';
  const ini   = (n1[0] || '') + (n2[0] || '');

  /* ── WhatsApp ── */
  const waNum  = (d.wa || '5500000000').replace(/\D/g, '');
  const waLink = `https://wa.me/${waNum}?text=Confirmo+mi+asistencia`;

  /* ── Palette ── */
  const tc  = getTipoConfig(d.tipo);
  const ch  = tc.ch;
  const chlt = tc.chlt;

  /* ── Date display ── */
  const dateDisplay = d.dd && d.mm && d.yy
    ? `${d.dd} · ${(d.mm || '').toUpperCase()} · ${d.yy}`
    : 'Fecha por confirmar';

  /* ── Target date for countdown ── */
  const tgtDate = buildTargetDate(d.dd, d.mm, d.yy, d.t1);

  /* ── Media assets ── */
  const heroImg = d.photos.hero
    ? `<img src="${d.photos.hero}" style="width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(.68) contrast(1.1) saturate(.78);animation:hfloat 16s ease-in-out infinite alternate">`
    : `<div style="width:100%;height:100%;background:linear-gradient(155deg,#2a1e38 0%,#14101e 40%,#0e0c14 100%);display:flex;align-items:center;justify-content:center;font-size:88px;opacity:.18">🌿</div>`;

  const closingImg = d.photos.closing
    ? `<img src="${d.photos.closing}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.55) contrast(1.06) saturate(.72)">`
    : `<div style="width:100%;height:100%;background:linear-gradient(155deg,#1e142a,#0e0c14,#1a1208);display:flex;align-items:center;justify-content:center;font-size:88px;opacity:.14">🌿</div>`;

  const galSlides = d.photos.gallery.length > 0
    ? d.photos.gallery.map((src, i) =>
        `<div class="rslide"><img src="${src}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.78) contrast(1.08) saturate(.78)"><div class="rov"></div><div class="rcap"><div class="rct">Momento ${i + 1}</div></div></div>`)
    : ['🌹','✈️','💍','🥂'].map((e, i) =>
        `<div class="rslide"><div style="width:100%;height:100%;background:linear-gradient(135deg,${['#2a1535,#1e0f28','#1a1510,#2a2015','#0f1520,#152030','#1a1020,#251530'][i]});display:flex;align-items:center;justify-content:center;font-size:70px">${e}</div><div class="rov"></div><div class="rcap"><div class="rct">${['El primer encuentro','Nuestro primer viaje','El momento perfecto','Celebrando juntos'][i]}</div><div class="rcs">${['2021','2022','2025','Hoy'][i]}</div></div></div>`);

  const hasAudio = !!(d.audioSrc || d.audioLink || d.audioName);
  const audioTag = d.audioSrc
    ? `<audio id="aud" loop preload="auto"><source src="${d.audioSrc}" type="audio/mpeg"></audio>`
    : '';

  /* ── Assemble sections ── */
  const hero    = HeroSection({ d, n1, n2, ch, heroImg, dateDisplay, tgtDate });
  const intro   = IntroSection({ d, dateDisplay });
  const gallery = GallerySection({ d, galSlides });
  const moment  = MomentSection({ names });
  const details = DetailsSection({ d });
  const location = LocationSection({ d });
  const gifts   = GiftsSection({ d });
  const rsvp    = RSVPSection({ d, waLink });
  const closing = ClosingSection({ n1, n2, closingImg, dateDisplay, ch });
  const brand   = BrandSection();
  const final   = FinalSection({ ini, yy: d.yy });

  /* ── CSS and JS strings (from dedicated files) ── */
  const css    = buildInvitationCSS({ tc, ch, chlt });
  const scripts = buildInvitationScripts({ d, tgtDate, galSlides, hasAudio, ch });

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
<title>${names}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,200;0,300;1,200;1,300&family=Montserrat:wght@200;300;400&family=Cinzel:wght@400;500&display=swap" rel="stylesheet">
${audioTag}
<style>${css}</style>
</head>
<body>
<div id="prog"></div>
${hasAudio ? `<button id="mb" onclick="tgm()" aria-label="Música"><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div></button>` : ''}
${hero}
${intro}
${gallery}
${moment}
${details}
${location}
${gifts}
${rsvp}
${closing}
${brand}
${final}
<script>${scripts}<\/script>
</body>
</html>`;
}
