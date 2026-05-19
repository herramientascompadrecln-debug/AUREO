/* ── AUREO · components/sections-a.js ──────────────────────────
   Template functions for: HeroSection · IntroSection ·
   GallerySection · MomentSection
   Each returns an HTML string. No DOM mutations here.
─────────────────────────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   1. HERO SECTION
───────────────────────────────────────────── */
function HeroSection({ d, n1, n2, ch, heroImg, dateDisplay, tgtDate }) {
  const eyebrow = {
    'Boda'         : 'Nos Casamos',
    'XV Anos'      : 'Mis XV Años',
    'Bautizo'      : 'Mi Bautizo',
    'Baby Shower'  : 'Baby Shower',
    'Gender Reveal': 'Gender Reveal',
    'Corporativo'  : 'Te Invitamos',
  }[d.tipo] || 'Te Invitamos';

  const countdown = d.sec.countdown ? `
    <div class="hcd-wrap sr">
      <div class="hcd-label">Faltan</div>
      <div class="hcd">
        <div class="hcd-box"><div class="hcd-num" id="cdd">--</div><div class="hcd-u">Días</div></div>
        <div class="hcd-sep">·</div>
        <div class="hcd-box"><div class="hcd-num" id="cdh">--</div><div class="hcd-u">Horas</div></div>
        <div class="hcd-sep">·</div>
        <div class="hcd-box"><div class="hcd-num" id="cdm">--</div><div class="hcd-u">Min</div></div>
        <div class="hcd-sep">·</div>
        <div class="hcd-box"><div class="hcd-num" id="cds">--</div><div class="hcd-u">Seg</div></div>
      </div>
    </div>` : '';

  return `
<section id="hero">
  <div class="hphoto">${heroImg}</div>
  <div class="hov1"></div><div class="hov2"></div><div class="hov3"></div><div class="hglow"></div>
  <div class="aureo-bar">
    <div class="aureo-logo">AUREO<span>Invitaciones Digitales</span></div>
  </div>
  <div class="hcontent">
    <span class="hsubtitle">${eyebrow}</span>
    <div class="hnames">
      <div class="hname">${n1}</div>
      ${n2 ? `<span class="hamp">&amp;</span><div class="hname">${n2}</div>` : ''}
    </div>
    ${countdown}
    <div class="hdate">${dateDisplay}</div>
  </div>
  <div class="hscroll"><div class="hsl"></div><span>Desliza</span></div>
</section>`;
}

/* ─────────────────────────────────────────────
   2. INTRO SECTION
───────────────────────────────────────────── */
function IntroSection({ d, dateDisplay }) {
  const headline = d.frase || `Un amor que nació<br><em>sin querer queriendo</em>`;
  const bgWord   = (d.feeling.split(',')[0] || 'AMOR').toUpperCase();

  return `
<section class="intro">
  <div class="iword">${bgWord}</div>
  <div class="iin">
    <span class="lbl sr">Nuestra historia</span>
    <div class="rule sr d1"><div class="rd"></div></div>
    <h2 class="ih sr d2">${headline}</h2>
    <p class="ib sr d3">Después de años de risas, aventuras y sueños compartidos, llegó el momento más hermoso de nuestras vidas. Queremos que tú formes parte de este capítulo que apenas comienza.</p>
    <div class="ipill sr d4">${dateDisplay}</div>
  </div>
</section>`;
}

/* ─────────────────────────────────────────────
   4. GALLERY / REEL SECTION
───────────────────────────────────────────── */
function GallerySection({ d, galSlides }) {
  if (!d.sec.gallery) return '';

  const dots = galSlides.map((_, i) =>
    `<div class="rdot${i === 0 ? ' on' : ''}"></div>`
  ).join('');

  return `
<section class="reel-sec">
  <div class="rheader">
    <span class="lbl sr">Momentos nuestros</span>
    <div class="rule sr d1"><div class="rd"></div></div>
    <h2 class="rhdr-t sr d2">Nuestra Historia</h2>
  </div>
  <div class="rcon sr d3" id="rcon">${galSlides.join('')}</div>
  <div class="rdots" id="rdots">${dots}</div>
  <div class="rhint">↑ Desliza para ver más</div>
</section>`;
}

/* ─────────────────────────────────────────────
   5. MOMENT / EMOTIONAL SECTION
───────────────────────────────────────────── */
function MomentSection({ names }) {
  return `
<section class="mom">
  <div class="mom-g"></div>
  <div class="mom-in">
    <div class="mom-o sr">"</div>
    <p class="mom-q sr d1">No fue amor a primera vista.<br>Fue amor a cada <em>mirada que siguió</em>.<br>Y seguirá siendo así para siempre.</p>
    <div class="rule sr d2"><div class="rd"></div></div>
    <p class="mom-a sr d3">${names}</p>
  </div>
</section>`;
}
