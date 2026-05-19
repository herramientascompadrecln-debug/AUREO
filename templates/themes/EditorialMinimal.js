/* ── AUREO · templates/themes/EditorialMinimal.js ──────────────
   Template: Editorial Minimal
   Aesthetic: white / ivory / black. Serif editorial. Zero glow.
   Fonts: Playfair Display (display) + DM Sans (body)
   Sections reused: GallerySection · DetailsSection · LocationSection
                    GiftsSection · RSVPSection · BrandSection · FinalSection
─────────────────────────────────────────────────────────────── */

function buildEditorialMinimal(d) {
  /* ── Names ── */
  const names = d.names || 'Sofia & Christian';
  const pts   = names.split(/&|y/i).map(s => s.trim());
  const n1    = pts[0] || names;
  const n2    = pts[1] || '';
  const ini   = (n1[0] || '') + (n2[0] || '');
  const waNum = (d.wa || '5500000000').replace(/\D/g, '');
  const waLink = `https://wa.me/${waNum}?text=Confirmo+mi+asistencia`;

  const dateDisplay = d.dd && d.mm && d.yy
    ? `${d.dd} · ${(d.mm || '').toUpperCase()} · ${d.yy}`
    : 'Fecha por confirmar';
  const tgtDate = buildTargetDate(d.dd, d.mm, d.yy, d.t1);

  /* ── Palette ── */
  const ch   = '#1a1a1a';
  const chlt = '#444444';
  const bg   = '#faf9f7';
  const bg2  = '#f2f0ec';
  const accent = '#c8a96e';   // single gold accent thread

  /* ── Media ── */
  const heroImg = d.photos.hero
    ? `<img src="${d.photos.hero}" style="width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(.82) contrast(1.04) saturate(.6);">`
    : `<div style="width:100%;height:100%;background:linear-gradient(180deg,#e8e4de,#f5f3f0);display:flex;align-items:center;justify-content:center;font-size:88px;opacity:.18">🌿</div>`;

  const closingImg = d.photos.closing
    ? `<img src="${d.photos.closing}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.7) contrast(1.05) saturate(.5);">`
    : `<div style="width:100%;height:100%;background:linear-gradient(180deg,#1a1a1a,#2a2a2a);display:flex;align-items:center;justify-content:center;font-size:88px;opacity:.12">🌿</div>`;

  const galSlides = d.photos.gallery.length > 0
    ? d.photos.gallery.map((src, i) =>
        `<div class="rslide"><img src="${src}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.82) contrast(1.06) saturate(.55)"><div class="rov"></div><div class="rcap"><div class="rct">0${i + 1}</div></div></div>`)
    : ['◻','◼','◻','◼'].map((e, i) =>
        `<div class="rslide"><div style="width:100%;height:100%;background:${['#e8e4de','#1a1a1a','#f0ece6','#2a2828'][i]};display:flex;align-items:center;justify-content:center;font-size:60px;color:${['#1a1a1a','#e8e4de','#1a1a1a','#e8e4de'][i]}">0${i+1}</div><div class="rov"></div><div class="rcap"><div class="rct">${['El comienzo','El viaje','El sí','La celebración'][i]}</div></div></div>`);

  const hasAudio = !!(d.audioSrc || d.audioLink || d.audioName);
  const audioTag = d.audioSrc ? `<audio id="aud" loop preload="auto"><source src="${d.audioSrc}" type="audio/mpeg"></audio>` : '';

  const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
body{background:${bg};color:${ch};font-family:'DM Sans',sans-serif;overflow-x:hidden}

@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes revealLine{from{scaleX:0}to{scaleX:1}}
@keyframes hpan{from{transform:scale(1.04) translateY(0)}to{transform:scale(1.08) translateY(-8px)}}

.sr{opacity:0;transform:translateY(18px);transition:opacity 1.1s cubic-bezier(.16,1,.3,1),transform 1.1s cubic-bezier(.16,1,.3,1)}
.sr.v{opacity:1;transform:none}
.d1{transition-delay:.12s}.d2{transition-delay:.26s}.d3{transition-delay:.4s}.d4{transition-delay:.54s}

#prog{position:fixed;top:0;left:0;height:2px;width:0;background:${ch};z-index:9998;transition:width .1s}

/* Minimal music btn */
${hasAudio ? `#mb{position:fixed;bottom:24px;right:22px;z-index:9999;width:40px;height:40px;border-radius:50%;border:1px solid ${ch};background:${bg};cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:all .3s}
#mb:hover{background:${ch};color:${bg}}` : ''}

/* AUREO bar */
.aureo-bar{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:center;padding:20px 24px}
.aureo-logo{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:.5em;color:rgba(255,255,255,.7);text-align:center;text-transform:uppercase}
.aureo-logo span{display:block;font-size:7px;font-weight:300;letter-spacing:.4em;color:rgba(255,255,255,.4);margin-top:2px}

/* HERO — left-aligned editorial */
#hero{position:relative;height:100svh;min-height:660px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;overflow:hidden;padding:0 0 64px 40px}
.hphoto{position:absolute;inset:0;z-index:0}
.hphoto img{animation:hpan 18s ease-in-out infinite alternate}
.hov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(0,0,0,.72) 0%,rgba(0,0,0,.2) 60%,rgba(0,0,0,.05) 100%)}
.hov2{position:absolute;inset:0;z-index:2;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,.55) 100%)}
.hcontent{position:relative;z-index:5;max-width:360px;animation:fadeUp 1.8s cubic-bezier(.16,1,.3,1) .2s both}
.hsubtitle{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.6em;text-transform:uppercase;color:${accent};margin-bottom:16px;display:block}
.hnames{margin-bottom:20px}
.hname{font-family:'Playfair Display',serif;font-size:clamp(44px,13vw,72px);font-weight:400;font-style:italic;color:#fff;line-height:1;text-shadow:0 2px 20px rgba(0,0,0,.4)}
.hamp{display:block;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:300;color:rgba(255,255,255,.5);letter-spacing:.4em;margin:10px 0;text-transform:uppercase}
.hline{width:48px;height:1px;background:${accent};margin:16px 0}
.hdate{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:400;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,.6)}
/* NO countdown in editorial — clean */
.hscroll{position:absolute;bottom:24px;right:32px;z-index:5;display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:fadeUp 2s ease 2s both}
.hsl{width:1px;height:40px;background:rgba(255,255,255,.3)}
.hscroll span{font-family:'DM Sans',sans-serif;font-size:7px;letter-spacing:.4em;color:rgba(255,255,255,.4);text-transform:uppercase}

/* Intro — full white */
.intro{background:${bg};padding:100px 40px;max-width:600px;margin:0 auto;text-align:center}
.iword{display:none}/* no watermark in minimal */
.iin{padding:0}
.lbl{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;letter-spacing:.5em;text-transform:uppercase;color:${accent}}
.rule{display:flex;align-items:center;gap:16px;justify-content:center;margin:16px 0}
.rule::before,.rule::after{content:'';flex:1;max-width:48px;height:1px;background:${ch}22}
.rd{width:4px;height:4px;border-radius:50%;background:${accent}}
.ih{font-family:'Playfair Display',serif;font-size:clamp(26px,7vw,38px);font-weight:400;font-style:italic;color:${ch};line-height:1.4;margin-bottom:20px}
.ih em{font-style:normal;font-weight:500}
.ib{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:300;line-height:1.95;color:rgba(26,26,26,.6)}
.ipill{display:inline-block;margin-top:28px;padding:10px 28px;border:1px solid ${ch}22;font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.4em;color:${ch};text-transform:uppercase}

/* Reel */
.reel-sec{background:${bg2};padding:80px 0;overflow:hidden}
.rheader{text-align:center;padding:0 40px 48px}
.rhdr-t{font-family:'Playfair Display',serif;font-size:clamp(24px,7vw,36px);font-weight:400;font-style:italic;color:${ch}}
.rcon{height:68svh;min-height:380px;max-height:560px;overflow-y:scroll;scroll-snap-type:y mandatory;scrollbar-width:none;margin:0 24px;border:1px solid ${ch}14}
.rcon::-webkit-scrollbar{display:none}
.rslide{position:relative;height:68svh;min-height:380px;max-height:560px;scroll-snap-align:start;overflow:hidden}
.rov{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.7) 100%)}
.rcap{position:absolute;bottom:28px;left:28px;right:28px;z-index:3}
.rct{font-family:'Playfair Display',serif;font-size:20px;font-weight:400;font-style:italic;color:#fff}
.rcs{font-family:'DM Sans',sans-serif;font-size:8px;letter-spacing:.4em;color:rgba(255,255,255,.5);text-transform:uppercase;margin-top:4px}
.rdots{display:flex;justify-content:center;gap:6px;margin-top:14px}
.rdot{width:4px;height:4px;border-radius:50%;background:${ch}33;transition:all .3s}
.rdot.on{background:${ch};width:16px;border-radius:2px}
.rhint{display:none}

/* Moment */
.mom{background:${ch};padding:100px 40px;text-align:center}
.mom-g{display:none}
.mom-in{max-width:440px;margin:0 auto;position:relative;z-index:2}
.mom-o{font-family:'Playfair Display',serif;font-size:80px;font-style:italic;color:rgba(255,255,255,.12);line-height:1;margin-bottom:-16px}
.mom-q{font-family:'Playfair Display',serif;font-size:clamp(20px,5.5vw,28px);font-weight:400;font-style:italic;color:#fff;line-height:1.7}
.mom-q em{font-style:normal;color:${accent}}
.mom-a{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.4em;color:rgba(255,255,255,.45);text-transform:uppercase;margin-top:24px}

/* Details */
.det{background:${bg};padding:100px 32px}
.dh{font-family:'Playfair Display',serif;font-size:clamp(24px,7vw,34px);font-weight:400;font-style:italic;color:${ch};text-align:center;margin-bottom:48px}
.dlist{max-width:440px;margin:0 auto}
.drow{display:flex;align-items:flex-start;gap:20px;padding:20px 0;border-bottom:1px solid ${ch}10}
.drow:first-child{border-top:1px solid ${ch}10}
.dic{width:36px;height:36px;flex-shrink:0;border:1px solid ${ch}18;display:flex;align-items:center;justify-content:center;font-size:14px}
.dtg{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;text-transform:uppercase;color:${accent};margin-bottom:4px}
.dv{font-family:'Playfair Display',serif;font-size:19px;font-weight:400;font-style:italic;color:${ch};line-height:1.35}
.dv small{font-family:'DM Sans',sans-serif;font-style:normal;display:block;font-size:12px;color:${ch}66;margin-top:2px}

/* Location */
.loc{background:${bg2};padding:80px 20px}
.lh{font-family:'Playfair Display',serif;font-size:clamp(22px,6vw,30px);font-weight:400;font-style:italic;color:${ch};text-align:center;margin-bottom:28px}
.lcards{max-width:420px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.lcard{background:${bg};border:1px solid ${ch}14;overflow:hidden}
.lcard-map{height:110px;background:linear-gradient(135deg,#e8e4de,#f0ece6);display:flex;align-items:center;justify-content:center;position:relative}
.lcard-map::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 24px,${ch}07 24px,${ch}07 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,${ch}07 24px,${ch}07 25px)}
.lcard-map::after{content:'';position:absolute;inset:0}
.lpw{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center}
.lpd{width:10px;height:10px;background:${ch};border-radius:50%}
.lpl{width:1px;height:20px;background:linear-gradient(${ch},transparent)}
.lcard-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid ${ch}10}
.ltype{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;text-transform:uppercase;color:${accent}}
.ltime{font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:${ch}}
.lvenue{font-family:'Playfair Display',serif;font-size:19px;font-weight:400;font-style:italic;color:${ch};padding:14px 18px 6px}
.lbtn{display:flex;align-items:center;justify-content:center;gap:8px;margin:8px 14px 14px;padding:11px 20px;border:1px solid ${ch};font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;color:${ch};text-transform:uppercase;text-decoration:none;transition:all .3s}
.lbtn:hover{background:${ch};color:${bg}}
.lbtn2{border-color:${ch}44;color:${ch}88}
.lno-map{font-size:9px;color:${ch}44;text-align:center;padding:8px 0 12px;font-style:italic}

/* Gifts */
.gifts{background:${bg};padding:100px 40px;text-align:center}
.gm{font-family:'Playfair Display',serif;font-size:clamp(16px,4.5vw,22px);font-style:italic;font-weight:400;color:${ch}88;line-height:1.8;max-width:360px;margin:0 auto 32px}
.gopts{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;max-width:340px;margin:0 auto}
.gopt{flex:1;min-width:136px;padding:20px 14px;border:1px solid ${ch}18;background:transparent;display:flex;flex-direction:column;align-items:center;gap:10px;text-decoration:none;transition:all .4s}
.gopt:hover{border-color:${ch};background:${ch}06}
.gico{width:36px;height:36px;border:1px solid ${ch}18;display:flex;align-items:center;justify-content:center;font-size:14px}
.glbl{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;color:${ch};text-transform:uppercase}
.gsub{font-family:'Playfair Display',serif;font-size:13px;font-style:italic;color:${ch}55}

/* RSVP */
.rsvp{position:relative;background:${bg2};padding:100px 40px;text-align:center;overflow:hidden}
.rsvp-g{display:none}
.rdead{display:inline-block;padding:8px 20px;border:1px solid ${ch}18;font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;color:${ch};text-transform:uppercase;margin-bottom:24px}
.rt{font-family:'Playfair Display',serif;font-size:clamp(24px,7vw,36px);font-weight:400;font-style:italic;color:${ch};margin-bottom:10px}
.rs{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:300;line-height:1.9;color:${ch}77;margin-bottom:36px}
.wabtn{display:inline-flex;align-items:center;gap:10px;padding:14px 36px;background:#25D366;font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.35em;color:#fff;text-transform:uppercase;text-decoration:none;border:none;transition:all .3s}
.wabtn:hover{background:#1aaa55;transform:translateY(-2px)}
.wabtn svg{width:17px;height:17px}

/* Closing */
#closing{position:relative;height:100svh;min-height:640px;display:flex;align-items:flex-end;overflow:hidden;padding-bottom:80px}
.clp{position:absolute;inset:0;z-index:0}
.clov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,rgba(0,0,0,.15) 0%,rgba(0,0,0,.02) 30%,rgba(0,0,0,.65) 80%,rgba(0,0,0,.92) 100%)}
.clov2{display:none}
.clglow{display:none}
#floats{display:none}
.clc{position:relative;z-index:5;padding:0 40px;max-width:500px}
.cle{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:500;letter-spacing:.5em;color:rgba(255,255,255,.5);text-transform:uppercase;margin-bottom:14px;display:block}
.cln{font-family:'Playfair Display',serif;font-size:clamp(40px,12vw,60px);font-weight:400;font-style:italic;color:#fff;line-height:1;margin-bottom:16px}
.clm{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:300;line-height:1.95;color:rgba(255,255,255,.55);margin-bottom:20px}
.clst{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:500;letter-spacing:.4em;color:${accent};text-transform:uppercase}

/* Brand */
.brand-sec{background:${bg};padding:48px 32px;text-align:center;border-top:1px solid ${ch}10}
.brand-logo{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;letter-spacing:.5em;color:${ch};margin-bottom:6px;text-transform:uppercase}
.brand-tag{font-family:'DM Sans',sans-serif;font-size:9px;font-weight:300;letter-spacing:.32em;color:${ch}55;text-transform:uppercase;margin-bottom:4px}
.brand-url{font-family:'DM Sans',sans-serif;font-size:10px;font-weight:300;color:${ch}33}
.brand-heart{font-family:'Playfair Display',serif;font-size:12px;font-style:italic;color:${ch}33;margin-top:8px}

/* Final */
#final{background:${bg};padding:48px 32px;text-align:center;border-top:1px solid ${ch}0a}
.finm{font-family:'Playfair Display',serif;font-size:52px;font-weight:400;font-style:italic;color:${ch};line-height:1;margin-bottom:12px}
.finr{width:32px;height:1px;background:${ch}44;margin:0 auto 12px}
.finc{font-family:'DM Sans',sans-serif;font-size:8px;font-weight:300;letter-spacing:.4em;color:${ch}33;text-transform:uppercase}
`;

  const scripts = buildInvitationScripts({ d, tgtDate, galSlides, hasAudio, ch: accent });

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
<title>${names}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
${audioTag}
<style>${css}</style>
</head>
<body>
<div id="prog"></div>
${hasAudio ? `<button id="mb" onclick="tgm()" aria-label="Música">♪</button>` : ''}
<section id="hero">
  <div class="hphoto">${heroImg}</div>
  <div class="hov1"></div><div class="hov2"></div>
  <div class="aureo-bar"><div class="aureo-logo">AUREO<span>Invitaciones Digitales</span></div></div>
  <div class="hcontent">
    <span class="hsubtitle">${{'Boda':'Nos Casamos','XV Anos':'Mis XV Años','Infantil':'Te Invitamos','Bautizo':'Mi Bautizo','Baby Shower':'Baby Shower','Gender Reveal':'Gender Reveal','Corporativo':'Evento Especial'}[d.tipo]||'Te Invitamos'}</span>
    <div class="hnames">
      <div class="hname">${n1}</div>
      ${n2 ? `<span class="hamp">&amp;</span><div class="hname">${n2}</div>` : ''}
    </div>
    <div class="hline"></div>
    <div class="hdate">${dateDisplay}</div>
  </div>
  <div class="hscroll"><div class="hsl"></div><span>Desliza</span></div>
</section>
<section class="intro"><div class="iword"></div><div class="iin">
  <span class="lbl sr">Nuestra historia</span>
  <div class="rule sr d1"><div class="rd"></div></div>
  <h2 class="ih sr d2">${d.frase || `Un amor que creció<br>un <em>momento</em> a la vez`}</h2>
  <p class="ib sr d3">Después de años de aventuras y sueños compartidos, comienza el capítulo más hermoso. Queremos que formes parte de él.</p>
  <div class="ipill sr d4">${dateDisplay}</div>
</div></section>
${d.sec.gallery ? `<section class="reel-sec"><div class="rheader"><span class="lbl sr">Momentos nuestros</span><div class="rule sr d1"><div class="rd"></div></div><h2 class="rhdr-t sr d2">Nuestra Historia</h2></div><div class="rcon sr d3" id="rcon">${galSlides.join('')}</div><div class="rdots" id="rdots">${galSlides.map((_,i)=>`<div class="rdot${i===0?' on':''}"></div>`).join('')}</div></section>` : ''}
<section class="mom"><div class="mom-g"></div><div class="mom-in"><div class="mom-o sr">"</div><p class="mom-q sr d1">No fue amor a primera vista.<br>Fue amor a cada <em>mirada</em> que siguió.<br>Y seguirá siendo así para siempre.</p><div class="rule sr d2"><div class="rd"></div></div><p class="mom-a sr d3">${names}</p></div></section>
${DetailsSection({ d })}
${d.sec.location ? LocationSection({ d }) : ''}
${d.sec.gifts ? GiftsSection({ d }) : ''}
${d.sec.rsvp ? RSVPSection({ d, waLink }) : ''}
<section id="closing"><div class="clp">${closingImg}</div><div class="clov1"></div><div class="clov2"></div><div class="clglow"></div><div id="floats"></div>
<div class="clc"><span class="cle sr">Con todo nuestro amor</span><div class="cln sr d1">${n1}${n2 ? ` &amp; ${n2}` : ''}</div><div class="rule sr d2"><div class="rd"></div></div><p class="clm sr d3">Gracias por ser parte de esta historia.<br>Tu presencia hace este día inolvidable.</p><div class="clst sr d4">${dateDisplay}</div></div></section>
${BrandSection()}
${FinalSection({ ini, yy: d.yy })}
<script>${scripts}<\/script>
</body></html>`;
}
