/* ── AUREO · templates/themes/CorporateLuxury.js ───────────────
   Template: Corporate Luxury
   Aesthetic: dark / charcoal / metallic silver / luxury tech
   Fonts: Space Grotesk (all) — clean, modern, technical
   Animations: line reveals, grid pulse, clean motion
─────────────────────────────────────────────────────────────── */

function buildCorporateLuxury(d) {
  const names = d.names || 'Evento Corporativo';
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
  const bg    = '#0a0a0e';
  const bg2   = '#111116';
  const ch    = '#a0a8b8';   // cool silver
  const chlt  = '#c8d0e0';
  const accent = '#4a9eff';  // electric blue accent
  const gold  = '#c8a96e';   // single warm accent thread

  const heroImg = d.photos.hero
    ? `<img src="${d.photos.hero}" style="width:100%;height:100%;object-fit:cover;object-position:center;filter:brightness(.6) contrast(1.12) saturate(.4) grayscale(.3);">`
    : `<div style="width:100%;height:100%;background:linear-gradient(160deg,#0e0e18,#0a0a14,#0e0e12);display:flex;align-items:center;justify-content:center;font-size:88px;opacity:.1">🏢</div>`;

  const closingImg = d.photos.closing
    ? `<img src="${d.photos.closing}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.55) contrast(1.08) saturate(.35);">`
    : `<div style="width:100%;height:100%;background:linear-gradient(160deg,#0a0a0e,#111116);display:flex;align-items:center;justify-content:center;font-size:88px;opacity:.1">◆</div>`;

  const galSlides = d.photos.gallery.length > 0
    ? d.photos.gallery.map((src, i) =>
        `<div class="rslide"><img src="${src}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.72) contrast(1.1) saturate(.4)"><div class="rov"></div><div class="rcap"><div class="rct">0${i+1} / 0${d.photos.gallery.length}</div></div></div>`)
    : ['◆','◻','◆','◻'].map((e, i) =>
        `<div class="rslide"><div style="width:100%;height:100%;background:${['#111116','#0e0e14','#12121a','#0a0a0e'][i]};display:flex;align-items:center;justify-content:center;font-size:80px;color:${ch}22">${e}</div><div class="rov"></div><div class="rcap"><div class="rct">0${i+1} / 04</div></div></div>`);

  const hasAudio = !!(d.audioSrc || d.audioLink || d.audioName);
  const audioTag = d.audioSrc ? `<audio id="aud" loop preload="auto"><source src="${d.audioSrc}" type="audio/mpeg"></audio>` : '';

  const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
body{background:${bg};color:${chlt};font-family:'Space Grotesk',sans-serif;overflow-x:hidden}

@keyframes lineReveal{from{transform:scaleX(0);transform-origin:left}to{transform:scaleX(1);transform-origin:left}}
@keyframes gridPulse{0%,100%{opacity:.04}50%{opacity:.09}}
@keyframes hpan{from{transform:scale(1.03)}to{transform:scale(1.07) translateY(-6px)}}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes scanLine{0%{top:-100%}100%{top:100%}}
@keyframes eqb{from{transform:scaleY(.25)}to{transform:scaleY(1)}}

.sr{opacity:0;transform:translateY(14px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.sr.v{opacity:1;transform:none}
.d1{transition-delay:.1s}.d2{transition-delay:.22s}.d3{transition-delay:.34s}.d4{transition-delay:.46s}
#prog{position:fixed;top:0;left:0;height:1px;width:0;background:${accent};z-index:9998;transition:width .1s}

${hasAudio ? `#mb{position:fixed;bottom:22px;right:18px;z-index:9999;width:40px;height:40px;border:1px solid ${ch}33;background:rgba(10,10,14,.9);backdrop-filter:blur(12px);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:2px;transition:all .3s}
#mb:hover{border-color:${accent}}
.eq{width:2px;background:${ch};animation:eqb .7s ease-in-out infinite alternate}
.eq:nth-child(1){height:5px}.eq:nth-child(2){height:10px;animation-delay:.1s}.eq:nth-child(3){height:8px;animation-delay:.2s}.eq:nth-child(4){height:12px;animation-delay:.06s}.eq:nth-child(5){height:6px;animation-delay:.16s}
.eq.off{animation-play-state:paused;height:3px!important;opacity:.2}
#mb:hover .eq{background:${accent}}` : ''}

/* AUREO bar */
.aureo-bar{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:18px 28px;background:linear-gradient(to bottom,rgba(0,0,0,.6),transparent)}
.aureo-logo{font-family:'Space Grotesk',sans-serif;font-size:10px;font-weight:500;letter-spacing:.45em;color:${ch}66;text-transform:uppercase}
.aureo-logo span{display:none}
.aureo-tag{font-family:'Space Grotesk',sans-serif;font-size:8px;letter-spacing:.3em;color:${ch}33;text-transform:uppercase}

/* Grid overlay */
.hero-grid{position:absolute;inset:0;z-index:3;pointer-events:none;background:repeating-linear-gradient(0deg,transparent,transparent 60px,${ch}06 60px,${ch}06 61px),repeating-linear-gradient(90deg,transparent,transparent 60px,${ch}06 60px,${ch}06 61px);animation:gridPulse 4s ease-in-out infinite}
/* Scan line */
.hero-scan{position:absolute;inset:0;z-index:4;pointer-events:none;overflow:hidden}
.hero-scan::after{content:'';position:absolute;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${accent}44,transparent);animation:scanLine 6s linear infinite}

/* HERO */
#hero{position:relative;height:100svh;min-height:660px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;overflow:hidden;padding:0 0 72px 36px}
.hphoto{position:absolute;inset:0;z-index:0}
.hphoto img{animation:hpan 18s ease-in-out infinite alternate}
.hov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(10,10,14,.88) 0%,rgba(10,10,14,.4) 55%,rgba(10,10,14,.1) 100%)}
.hov2{position:absolute;inset:0;z-index:2;background:linear-gradient(to bottom,transparent 30%,rgba(10,10,14,.9) 100%)}
.hcontent{position:relative;z-index:6;max-width:480px;animation:fadeUp 1.6s cubic-bezier(.16,1,.3,1) .2s both}

/* Horizontal rule that reveals on load */
.h-rule-top{width:48px;height:1px;background:${accent};margin-bottom:18px;animation:lineReveal 1s ease .5s both}
.hsubtitle{font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:500;letter-spacing:.6em;text-transform:uppercase;color:${accent};margin-bottom:12px;display:block}
.hnames{margin-bottom:18px}
.hname{
  font-family:'Space Grotesk',sans-serif;
  font-size:clamp(36px,11vw,62px);
  font-weight:700;
  color:${chlt};
  line-height:1.05;
  letter-spacing:-.01em;
}
.hamp{display:block;font-size:14px;font-weight:300;letter-spacing:.3em;color:${ch}66;margin:8px 0;text-transform:uppercase}

/* Countdown — data display style */
.hcd-wrap{margin:14px 0 12px;border-left:2px solid ${accent};padding-left:16px}
.hcd-label{font-family:'Space Grotesk',sans-serif;font-size:8px;font-weight:500;letter-spacing:.5em;text-transform:uppercase;color:${ch}55;margin-bottom:8px}
.hcd{display:flex;align-items:flex-start;gap:20px}
.hcd-box{display:flex;flex-direction:column}
.hcd-num{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,8vw,38px);font-weight:700;color:${chlt};line-height:1;letter-spacing:-.02em}
.hcd-u{font-family:'Space Grotesk',sans-serif;font-size:7px;font-weight:500;letter-spacing:.4em;text-transform:uppercase;color:${ch}55;margin-top:2px}
.hcd-sep{font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:300;color:${ch}33;line-height:1;padding-top:6px}
.h-rule-bot{width:100%;max-width:280px;height:1px;background:linear-gradient(90deg,${ch}22,transparent);margin:14px 0}
.hdate{font-family:'Space Grotesk',sans-serif;font-size:10px;font-weight:500;letter-spacing:.4em;text-transform:uppercase;color:${ch}66}
.hscroll{position:absolute;bottom:24px;right:32px;z-index:6;display:flex;flex-direction:column;align-items:center;gap:8px;opacity:0;animation:fadeUp 2s ease 2s both}
.hsl{width:1px;height:40px;background:linear-gradient(to bottom,${ch}55,transparent)}
.hscroll span{font-family:'Space Grotesk',sans-serif;font-size:7px;font-weight:500;letter-spacing:.4em;color:${ch}44;text-transform:uppercase}

/* Shared utility */
.lbl{font-family:'Space Grotesk',sans-serif;font-size:8px;font-weight:500;letter-spacing:.5em;text-transform:uppercase;color:${accent};display:inline-block;margin-bottom:11px}
.rule{display:flex;align-items:center;gap:14px;justify-content:center;margin:14px 0}
.rule::before,.rule::after{content:'';flex:1;max-width:44px;height:1px;background:${ch}22}
.rd{width:4px;height:4px;background:${accent}}

/* Intro */
.intro{background:${bg2};padding:100px 40px}
.iword{display:none}
.iin{max-width:520px;padding:0;border-left:2px solid ${ch}12;padding-left:32px}
.ih{font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,6.5vw,36px);font-weight:600;color:${chlt};line-height:1.3;margin-bottom:20px;letter-spacing:-.01em}
.ih em{color:${accent};font-style:normal}
.ib{font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:300;line-height:1.9;color:${ch}99;letter-spacing:.02em}
.ipill{display:inline-block;margin-top:26px;padding:9px 24px;border:1px solid ${ch}18;font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:500;letter-spacing:.4em;color:${ch};text-transform:uppercase}

/* Reel */
.reel-sec{background:${bg};padding:80px 0;overflow:hidden}
.rheader{text-align:left;padding:0 40px 48px;border-left:0;position:relative}
.rheader::before{content:'';position:absolute;left:40px;bottom:24px;width:32px;height:1px;background:${accent}}
.rhdr-t{font-family:'Space Grotesk',sans-serif;font-size:clamp(20px,6vw,30px);font-weight:600;color:${chlt};letter-spacing:-.01em}
.rcon{height:68svh;min-height:380px;max-height:560px;overflow-y:scroll;scroll-snap-type:y mandatory;scrollbar-width:none;margin:0 24px;border:1px solid ${ch}12}
.rcon::-webkit-scrollbar{display:none}
.rslide{position:relative;height:68svh;min-height:380px;max-height:560px;scroll-snap-align:start;overflow:hidden}
.rov{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 55%,rgba(10,10,14,.92) 100%)}
.rcap{position:absolute;bottom:24px;left:24px;right:24px;z-index:3}
.rct{font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:500;letter-spacing:.3em;color:${ch}88;text-transform:uppercase}
.rcs{display:none}
.rdots{display:flex;justify-content:center;gap:5px;margin-top:12px}
.rdot{width:4px;height:4px;background:${ch}22;transition:all .3s}
.rdot.on{background:${accent};width:14px}
.rhint{display:none}

/* Moment */
.mom{position:relative;min-height:60svh;display:flex;align-items:center;justify-content:center;background:${bg2};overflow:hidden;padding:100px 40px}
.mom-g{display:none}
.mom-in{position:relative;z-index:2;max-width:500px;border-left:2px solid ${accent};padding-left:32px}
.mom-o{display:none}
.mom-q{font-family:'Space Grotesk',sans-serif;font-size:clamp(18px,5vw,26px);font-weight:400;color:${chlt};line-height:1.65;letter-spacing:-.01em}
.mom-q em{color:${accent};font-style:normal;font-weight:600}
.mom-a{font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:500;letter-spacing:.5em;color:${ch}55;text-transform:uppercase;margin-top:24px}

/* Details */
.det{background:${bg};padding:100px 36px}
.dh{font-family:'Space Grotesk',sans-serif;font-size:clamp(20px,6vw,28px);font-weight:600;color:${chlt};text-align:center;letter-spacing:-.01em;margin-bottom:44px}
.dlist{max-width:440px;margin:0 auto}
.drow{display:flex;align-items:flex-start;gap:20px;padding:20px 0;border-bottom:1px solid ${ch}0d}
.drow:first-child{border-top:1px solid ${ch}0d}
.dic{width:36px;height:36px;flex-shrink:0;border:1px solid ${ch}18;display:flex;align-items:center;justify-content:center;background:transparent;font-size:14px;color:${ch}}
.dtg{font-family:'Space Grotesk',sans-serif;font-size:8px;font-weight:500;letter-spacing:.44em;text-transform:uppercase;color:${accent};margin-bottom:4px}
.dv{font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:500;color:${chlt};line-height:1.35;letter-spacing:-.01em}
.dv small{font-weight:300;display:block;font-size:12px;color:${ch}55;margin-top:2px}

/* Location */
.loc{background:${bg2};padding:80px 20px}
.lh{font-family:'Space Grotesk',sans-serif;font-size:clamp(18px,5.5vw,26px);font-weight:600;color:${chlt};text-align:center;letter-spacing:-.01em;margin-bottom:24px}
.lcards{max-width:420px;margin:0 auto;display:flex;flex-direction:column;gap:10px}
.lcard{background:transparent;border:1px solid ${ch}12;overflow:hidden}
.lcard-map{height:110px;background:${bg};display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.lcard-map::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 24px,${ch}05 24px,${ch}05 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,${ch}05 24px,${ch}05 25px)}
.lcard-map::after{content:'';position:absolute;inset:0}
.lpw{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center}
.lpd{width:10px;height:10px;background:${accent}}
.lpl{width:1px;height:20px;background:linear-gradient(${accent},transparent)}
.lcard-hdr{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;border-bottom:1px solid ${ch}0d}
.ltype{font-family:'Space Grotesk',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;text-transform:uppercase;color:${accent}}
.ltime{font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:600;color:${chlt}}
.lvenue{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:500;color:${chlt};padding:12px 18px 5px;letter-spacing:-.01em}
.lbtn{display:flex;align-items:center;justify-content:center;gap:8px;margin:7px 14px 14px;padding:10px 20px;border:1px solid ${accent}44;background:${accent}0a;font-family:'Space Grotesk',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;color:${accent};text-transform:uppercase;text-decoration:none;transition:all .3s}
.lbtn:hover{background:${accent}18;border-color:${accent};transform:translateY(-1px)}
.lbtn2{border-color:${ch}18;color:${ch}66}
.lno-map{font-size:9px;color:${ch}33;text-align:center;padding:8px 0 12px}

/* Gifts */
.gifts{background:${bg};padding:100px 40px;text-align:center}
.gm{font-family:'Space Grotesk',sans-serif;font-size:clamp(14px,4vw,18px);font-weight:300;color:${ch}77;line-height:1.85;max-width:380px;margin:0 auto 30px}
.gopts{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;max-width:340px;margin:0 auto}
.gopt{flex:1;min-width:136px;padding:18px 14px;border:1px solid ${ch}12;background:transparent;display:flex;flex-direction:column;align-items:center;gap:9px;text-decoration:none;transition:all .4s}
.gopt:hover{border-color:${accent}33;background:${accent}06}
.gico{width:36px;height:36px;border:1px solid ${ch}14;display:flex;align-items:center;justify-content:center;font-size:14px}
.glbl{font-family:'Space Grotesk',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;color:${ch};text-transform:uppercase}
.gsub{font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:300;color:${ch}44}

/* RSVP */
.rsvp{position:relative;background:${bg2};padding:100px 40px;text-align:center;overflow:hidden}
.rsvp-g{display:none}
.rdead{display:inline-block;padding:7px 20px;border:1px solid ${ch}14;font-family:'Space Grotesk',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;color:${ch};text-transform:uppercase;margin-bottom:22px}
.rt{font-family:'Space Grotesk',sans-serif;font-size:clamp(20px,6vw,30px);font-weight:600;color:${chlt};letter-spacing:-.01em;margin-bottom:10px}
.rs{font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:300;line-height:1.85;color:${ch}77;margin-bottom:32px}
.wabtn{display:inline-flex;align-items:center;gap:10px;padding:14px 36px;background:#25D366;font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:600;letter-spacing:.32em;color:#fff;text-transform:uppercase;text-decoration:none;border:none;transition:all .3s}
.wabtn:hover{background:#1aaa55;transform:translateY(-2px)}
.wabtn svg{width:17px;height:17px}

/* Closing */
#closing{position:relative;height:100svh;min-height:640px;display:flex;flex-direction:column;align-items:flex-start;justify-content:flex-end;overflow:hidden;padding:0 0 80px 40px}
.clp{position:absolute;inset:0;z-index:0}
.clov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to right,rgba(10,10,14,.92) 0%,rgba(10,10,14,.5) 60%,rgba(10,10,14,.15) 100%)}
.clov2{position:absolute;inset:0;z-index:2;background:linear-gradient(to bottom,transparent 30%,rgba(10,10,14,.9) 100%)}
.clglow{display:none}
#floats{display:none}
.clc{position:relative;z-index:5;max-width:420px}
.cle{font-family:'Space Grotesk',sans-serif;font-size:8px;font-weight:500;letter-spacing:.5em;color:${ch}44;text-transform:uppercase;margin-bottom:14px;display:block}
.h-rule-top-cl{width:32px;height:1px;background:${accent};margin-bottom:18px}
.cln{font-family:'Space Grotesk',sans-serif;font-size:clamp(32px,10vw,52px);font-weight:700;color:${chlt};line-height:1;letter-spacing:-.02em;margin-bottom:10px}
.clm{font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:300;line-height:1.95;color:${ch}66;margin-top:16px;margin-bottom:20px}
.clst{font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:500;letter-spacing:.4em;color:${accent};text-transform:uppercase}

/* Brand */
.brand-sec{background:${bg};padding:44px 32px;text-align:left;border-top:1px solid ${ch}0d;padding-left:40px}
.brand-logo{font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:600;letter-spacing:.5em;color:${ch};margin-bottom:5px;text-transform:uppercase}
.brand-tag{font-family:'Space Grotesk',sans-serif;font-size:8px;font-weight:300;letter-spacing:.3em;color:${ch}44;text-transform:uppercase;margin-bottom:4px}
.brand-url{font-family:'Space Grotesk',sans-serif;font-size:9px;color:${ch}2a}
.brand-heart{font-family:'Space Grotesk',sans-serif;font-size:11px;font-weight:300;color:${ch}33;margin-top:8px}

/* Final */
#final{background:${bg};padding:44px 40px;text-align:left;border-top:1px solid ${ch}08}
.finm{font-family:'Space Grotesk',sans-serif;font-size:44px;font-weight:700;color:${ch}33;line-height:1;letter-spacing:-.02em;margin-bottom:12px}
.finr{width:24px;height:1px;background:${accent};margin:0 0 12px}
.finc{font-family:'Space Grotesk',sans-serif;font-size:7px;font-weight:500;letter-spacing:.42em;color:${ch}22;text-transform:uppercase}
`;

  const scripts = buildInvitationScripts({ d, tgtDate, galSlides, hasAudio, ch: accent });

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
<title>${names} · Evento</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
${audioTag}
<style>${css}</style>
</head>
<body>
<div id="prog"></div>
${hasAudio ? `<button id="mb" onclick="tgm()" aria-label="Música"><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div></button>` : ''}
<section id="hero">
  <div class="hphoto">${heroImg}</div>
  <div class="hov1"></div><div class="hov2"></div>
  <div class="hero-grid"></div><div class="hero-scan"></div>
  <div class="aureo-bar">
    <div class="aureo-logo">AUREO</div>
    <div class="aureo-tag">Invitaciones Digitales</div>
  </div>
  <div class="hcontent">
    <div class="h-rule-top"></div>
    <span class="hsubtitle">${d.tipo === 'Corporativo' ? 'Corporate Event' : 'Event'}</span>
    <div class="hnames">
      <div class="hname">${n1}</div>
      ${n2 ? `<span class="hamp">&amp;</span><div class="hname">${n2}</div>` : ''}
    </div>
    ${d.sec.countdown ? `<div class="hcd-wrap sr"><div class="hcd-label">Cuenta regresiva</div><div class="hcd"><div class="hcd-box"><div class="hcd-num" id="cdd">--</div><div class="hcd-u">Días</div></div><div class="hcd-sep">·</div><div class="hcd-box"><div class="hcd-num" id="cdh">--</div><div class="hcd-u">Horas</div></div><div class="hcd-sep">·</div><div class="hcd-box"><div class="hcd-num" id="cdm">--</div><div class="hcd-u">Min</div></div><div class="hcd-sep">·</div><div class="hcd-box"><div class="hcd-num" id="cds">--</div><div class="hcd-u">Seg</div></div></div></div>` : ''}
    <div class="h-rule-bot"></div>
    <div class="hdate">${dateDisplay}</div>
  </div>
  <div class="hscroll"><div class="hsl"></div><span>Scroll</span></div>
</section>
<section class="intro"><div class="iword"></div><div class="iin">
  <span class="lbl sr">Acerca del evento</span>
  <h2 class="ih sr d1">${d.frase || `Una experiencia<br>diseñada para <em>inspirar</em>`}</h2>
  <p class="ib sr d2">Nos complace invitarte a este evento exclusivo. Tu presencia es fundamental para hacer de este un momento verdaderamente memorable.</p>
  <div class="ipill sr d3">${dateDisplay}</div>
</div></section>
${d.sec.gallery ? `<section class="reel-sec"><div class="rheader"><span class="lbl sr">Contenido</span><h2 class="rhdr-t sr d1">Galería</h2></div><div class="rcon sr d2" id="rcon">${galSlides.join('')}</div><div class="rdots" id="rdots">${galSlides.map((_,i)=>`<div class="rdot${i===0?' on':''}"></div>`).join('')}</div></section>` : ''}
<section class="mom"><div class="mom-g"></div><div class="mom-in"><p class="mom-q sr">${d.frase || `La excelencia no es un acto,<br>es un hábito. Cada <em>detalle importa</em>.<br>Este evento lo refleja.`}</p><p class="mom-a sr d1">${names}</p></div></section>
${DetailsSection({ d })}
${d.sec.location ? LocationSection({ d }) : ''}
${d.sec.gifts ? GiftsSection({ d }) : ''}
${d.sec.rsvp ? RSVPSection({ d, waLink }) : ''}
<section id="closing">
  <div class="clp">${closingImg}</div>
  <div class="clov1"></div><div class="clov2"></div><div class="clglow"></div><div id="floats"></div>
  <div class="clc">
    <span class="cle sr">Hasta pronto</span>
    <div class="h-rule-top-cl"></div>
    <div class="cln sr d1">${n1}${n2 ? '<br>' + n2 : ''}</div>
    <p class="clm sr d2">Gracias por confirmar tu asistencia.<br>Esperamos verte pronto.</p>
    <div class="clst sr d3">${dateDisplay}</div>
  </div>
</section>
${BrandSection()}
${FinalSection({ ini, yy: d.yy })}
<script>${scripts}<\/script>
</body></html>`;
}
