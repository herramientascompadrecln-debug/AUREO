/* ── AUREO · templates/themes/XVPrincess.js ────────────────────
   Template: XV Princess
   Aesthetic: rose gold / blush / soft glitter / magical / royal
   Fonts: Italiana (display) + Quicksand (body)
   Animations: floating particles, sparkle pulse, shimmer
─────────────────────────────────────────────────────────────── */

function buildXVPrincess(d) {
  const names = d.names || 'Valeria';
  const pts   = names.split(/&|y/i).map(s => s.trim());
  const n1    = pts[0] || names;
  const ini   = n1[0] || 'V';
  const waNum = (d.wa || '5500000000').replace(/\D/g, '');
  const waLink = `https://wa.me/${waNum}?text=Confirmo+mi+asistencia`;

  const dateDisplay = d.dd && d.mm && d.yy
    ? `${d.dd} · ${(d.mm || '').toUpperCase()} · ${d.yy}`
    : 'Fecha por confirmar';
  const tgtDate = buildTargetDate(d.dd, d.mm, d.yy, d.t1);

  /* ── Palette ── */
  const bg   = '#1a0e18';
  const bg2  = '#221526';
  const ch   = '#e8a0b0';   // rose gold
  const chlt = '#f5c8d4';
  const gold = '#d4a574';
  const accent = '#f0c0d0';

  const heroImg = d.photos.hero
    ? `<img src="${d.photos.hero}" style="width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(.65) contrast(1.08) saturate(.9) hue-rotate(-5deg);">`
    : `<div style="width:100%;height:100%;background:linear-gradient(160deg,#3a1528 0%,#1a0e18 50%,#2a1020 100%);display:flex;align-items:center;justify-content:center;font-size:88px;opacity:.2">👑</div>`;

  const closingImg = d.photos.closing
    ? `<img src="${d.photos.closing}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.6) contrast(1.06) saturate(.85);">`
    : `<div style="width:100%;height:100%;background:linear-gradient(160deg,#2a1528,#1a0e18);display:flex;align-items:center;justify-content:center;font-size:88px;opacity:.14">🌸</div>`;

  const galSlides = d.photos.gallery.length > 0
    ? d.photos.gallery.map((src, i) =>
        `<div class="rslide"><img src="${src}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.75) contrast(1.06) saturate(.9)"><div class="rov"></div><div class="rcap"><div class="rct">${['Mis sueños','Mi familia','Mis amigos','Mi historia'][i] || 'Momento ' + (i+1)}</div></div></div>`)
    : ['🌹','🦋','💎','👑'].map((e, i) =>
        `<div class="rslide"><div style="width:100%;height:100%;background:linear-gradient(135deg,#2a1535,#3a1028,#1a0e18);display:flex;align-items:center;justify-content:center;font-size:70px">${e}</div><div class="rov"></div><div class="rcap"><div class="rct">${['Mis sueños','Mi familia','Mis amigos','Mi historia'][i]}</div></div></div>`);

  const hasAudio = !!(d.audioSrc || d.audioLink || d.audioName);
  const audioTag = d.audioSrc ? `<audio id="aud" loop preload="auto"><source src="${d.audioSrc}" type="audio/mpeg"></audio>` : '';

  const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
body{background:${bg};color:${chlt};font-family:'Quicksand',sans-serif;overflow-x:hidden}

@import url('https://fonts.googleapis.com/css2?family=Italiana&family=Quicksand:wght@300;400;500&display=swap');

@keyframes sparkle{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
@keyframes magicFloat{0%,100%{transform:translateY(0) rotate(0deg);opacity:.4}50%{transform:translateY(-14px) rotate(8deg);opacity:.8}}
@keyframes hpan{from{transform:scale(1.04)}to{transform:scale(1.09) translateY(-8px)}}
@keyframes reveal{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes ringPulse{0%,100%{box-shadow:0 0 0 0 ${ch}44,0 0 30px ${ch}22}50%{box-shadow:0 0 0 12px transparent,0 0 60px ${ch}55}}

.sr{opacity:0;transform:translateY(20px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1)}
.sr.v{opacity:1;transform:none}
.d1{transition-delay:.12s}.d2{transition-delay:.26s}.d3{transition-delay:.4s}.d4{transition-delay:.54s}
#prog{position:fixed;top:0;left:0;height:2px;width:0;background:linear-gradient(90deg,${ch},${gold},${chlt});z-index:9998}

${hasAudio ? `#mb{position:fixed;bottom:22px;right:18px;z-index:9999;width:46px;height:46px;border-radius:50%;border:1px solid ${ch}44;background:rgba(26,14,24,.88);backdrop-filter:blur(12px);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:2px;box-shadow:0 0 20px ${ch}22;transition:all .4s}
#mb:hover{border-color:${ch};box-shadow:0 0 36px ${ch}44}
.eq{width:2px;border-radius:2px;background:${ch};animation:eqb .7s ease-in-out infinite alternate}
.eq:nth-child(1){height:5px}.eq:nth-child(2){height:11px;animation-delay:.1s}.eq:nth-child(3){height:8px;animation-delay:.2s}.eq:nth-child(4){height:13px;animation-delay:.06s}.eq:nth-child(5){height:6px;animation-delay:.16s}
.eq.off{animation-play-state:paused;height:3px!important;opacity:.2}
@keyframes eqb{from{transform:scaleY(.25)}to{transform:scaleY(1)}}` : ''}

/* AUREO bar */
.aureo-bar{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:center;padding:18px;background:linear-gradient(to bottom,rgba(0,0,0,.4),transparent)}
.aureo-logo{font-family:'Quicksand',sans-serif;font-size:9px;font-weight:500;letter-spacing:.5em;color:${ch}88;text-align:center;text-transform:uppercase}
.aureo-logo span{display:block;font-size:7px;letter-spacing:.4em;color:${ch}44;margin-top:2px}

/* Magic floating particles */
.magic-particles{position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:4}
.sparkle{position:absolute;width:4px;height:4px;border-radius:50%;background:${chlt};animation:sparkle linear infinite}

/* HERO */
#hero{position:relative;height:100svh;min-height:680px;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;padding-bottom:40px}
.hphoto{position:absolute;inset:0;z-index:0}
.hphoto img{animation:hpan 16s ease-in-out infinite alternate}
.hov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,rgba(26,14,24,.3) 0%,rgba(26,14,24,.05) 30%,rgba(26,14,24,.55) 70%,rgba(26,14,24,.95) 100%)}
.hov2{position:absolute;inset:0;z-index:2;background:radial-gradient(ellipse 100% 100% at 50% 50%,transparent 40%,rgba(26,14,24,.5) 100%)}
.hov3{position:absolute;inset:0;z-index:3;background:radial-gradient(ellipse 70% 50% at 50% 60%,${ch}0a 0%,transparent 60%)}
.hcontent{position:relative;z-index:6;text-align:center;padding:0 28px;max-width:420px;animation:reveal 1.8s cubic-bezier(.16,1,.3,1) .2s both}

/* Crown ornament */
.h-crown{font-size:32px;display:block;margin-bottom:12px;filter:drop-shadow(0 0 10px ${ch}66)}

.hsubtitle{font-family:'Quicksand',sans-serif;font-size:9px;font-weight:500;letter-spacing:.6em;text-transform:uppercase;color:${ch};margin-bottom:16px;display:block}

/* Glitter name */
.hname{
  font-family:'Italiana',serif;
  font-size:clamp(56px,16vw,88px);
  font-weight:400;
  color:${chlt};
  line-height:1;
  background:linear-gradient(135deg,${ch},${gold},${chlt},${ch},${gold});
  background-size:300% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  animation:shimmer 4s linear infinite;
  filter:drop-shadow(0 0 20px ${ch}44);
}
.hamp{display:block;font-family:'Quicksand',sans-serif;font-size:11px;font-weight:300;letter-spacing:.4em;text-transform:uppercase;color:${ch}77;margin:10px 0}

/* Countdown ring style */
.hcd-wrap{margin:20px 0 14px}
.hcd-label{font-family:'Quicksand',sans-serif;font-size:8px;font-weight:400;letter-spacing:.5em;text-transform:uppercase;color:${ch}77;margin-bottom:10px}
.hcd{display:flex;align-items:center;justify-content:center;gap:8px}
.hcd-box{background:rgba(0,0,0,.45);border:1px solid ${ch}44;border-radius:50%;width:58px;height:58px;display:flex;flex-direction:column;align-items:center;justify-content:center;animation:ringPulse 3s ease-in-out infinite;backdrop-filter:blur(6px)}
.hcd-num{font-family:'Italiana',serif;font-size:clamp(20px,5.5vw,26px);color:${chlt};line-height:1}
.hcd-u{font-family:'Quicksand',sans-serif;font-size:6px;font-weight:400;letter-spacing:.2em;text-transform:uppercase;color:${ch}77}
.hcd-sep{font-family:'Italiana',serif;font-size:20px;color:${ch}44;line-height:1;padding-top:4px}
.hdate{font-family:'Quicksand',sans-serif;font-size:10px;font-weight:400;letter-spacing:.5em;text-transform:uppercase;color:${ch}88;margin-top:14px}
.hscroll{position:absolute;bottom:24px;left:50%;transform:translateX(-50%);z-index:6;display:flex;flex-direction:column;align-items:center;gap:7px;opacity:0;animation:reveal 2s ease 2s both}
.hsl{width:1px;height:34px;background:linear-gradient(to bottom,${ch},transparent)}
.hscroll span{font-family:'Quicksand',sans-serif;font-size:7px;letter-spacing:.4em;color:${ch}66;text-transform:uppercase}

/* Shared utility */
.lbl{font-family:'Quicksand',sans-serif;font-size:8px;font-weight:500;letter-spacing:.45em;text-transform:uppercase;color:${ch};display:inline-block;margin-bottom:12px}
.rule{display:flex;align-items:center;gap:12px;justify-content:center;margin:16px 0}
.rule::before,.rule::after{content:'';flex:1;max-width:48px;height:1px;background:linear-gradient(90deg,transparent,${ch}55)}
.rule::after{background:linear-gradient(90deg,${ch}55,transparent)}
.rd{width:4px;height:4px;border-radius:50%;background:${ch};box-shadow:0 0 8px ${ch}}

/* Intro */
.intro{background:${bg};padding:88px 36px;text-align:center}
.iword{display:none}
.iin{max-width:440px;margin:0 auto}
.ih{font-family:'Italiana',serif;font-size:clamp(26px,8vw,40px);color:${chlt};line-height:1.4;margin-bottom:20px;font-weight:400}
.ih em{color:${ch}}
.ib{font-family:'Quicksand',sans-serif;font-size:13px;font-weight:300;line-height:2;color:${ch}99}
.ipill{display:inline-block;margin-top:26px;padding:9px 28px;border:1px solid ${ch}33;border-radius:100px;font-family:'Quicksand',sans-serif;font-size:8px;font-weight:500;letter-spacing:.4em;color:${ch};text-transform:uppercase;background:${ch}0a}

/* Reel */
.reel-sec{background:${bg2};padding:72px 0;overflow:hidden}
.rheader{text-align:center;padding:0 32px 44px}
.rhdr-t{font-family:'Italiana',serif;font-size:clamp(26px,8vw,40px);color:${chlt};font-weight:400}
.rcon{height:68svh;min-height:380px;max-height:560px;overflow-y:scroll;scroll-snap-type:y mandatory;scrollbar-width:none;margin:0 16px;border-radius:20px;border:1px solid ${ch}18}
.rcon::-webkit-scrollbar{display:none}
.rslide{position:relative;height:68svh;min-height:380px;max-height:560px;scroll-snap-align:start;overflow:hidden}
.rov{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 45%,rgba(26,14,24,.92) 100%)}
.rcap{position:absolute;bottom:22px;left:22px;right:22px;z-index:3}
.rct{font-family:'Italiana',serif;font-size:22px;color:${chlt};font-weight:400}
.rcs{font-family:'Quicksand',sans-serif;font-size:8px;letter-spacing:.38em;color:${ch};text-transform:uppercase;margin-top:4px}
.rdots{display:flex;justify-content:center;gap:6px;margin-top:14px}
.rdot{width:5px;height:5px;border-radius:50%;background:${ch}33;transition:all .3s}
.rdot.on{background:${ch};width:14px;border-radius:3px}
.rhint{text-align:center;margin-top:10px;font-family:'Quicksand',sans-serif;font-size:8px;letter-spacing:.3em;color:${ch}40;text-transform:uppercase}

/* Moment */
.mom{position:relative;min-height:68svh;display:flex;align-items:center;justify-content:center;background:${bg};overflow:hidden;padding:88px 36px}
.mom-g{position:absolute;width:420px;height:420px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,${ch}0e 0%,transparent 65%);animation:sparkle 6s ease-in-out infinite;pointer-events:none}
.mom-in{position:relative;z-index:2;text-align:center;max-width:380px}
.mom-o{font-family:'Italiana',serif;font-size:52px;color:${ch}28;line-height:1;margin-bottom:-4px;font-weight:400}
.mom-q{font-family:'Italiana',serif;font-size:clamp(20px,6vw,30px);color:${chlt};line-height:1.72;font-weight:400}
.mom-q em{color:${ch}}
.mom-a{font-family:'Quicksand',sans-serif;font-size:9px;font-weight:500;letter-spacing:.44em;color:${ch};text-transform:uppercase;margin-top:22px}

/* Details */
.det{background:${bg2};padding:88px 26px}
.dh{font-family:'Italiana',serif;font-size:clamp(24px,7vw,34px);color:${chlt};text-align:center;font-weight:400;margin-bottom:40px}
.dlist{max-width:380px;margin:0 auto}
.drow{display:flex;align-items:flex-start;gap:16px;padding:18px 0;border-bottom:1px solid ${ch}10}
.drow:first-child{border-top:1px solid ${ch}10}
.dic{width:34px;height:34px;flex-shrink:0;border-radius:50%;border:1px solid ${ch}28;display:flex;align-items:center;justify-content:center;background:${ch}08;font-size:13px}
.dtg{font-family:'Quicksand',sans-serif;font-size:8px;font-weight:500;letter-spacing:.38em;text-transform:uppercase;color:${ch};margin-bottom:3px}
.dv{font-family:'Italiana',serif;font-size:18px;color:${chlt};line-height:1.35;font-weight:400}
.dv small{font-family:'Quicksand',sans-serif;display:block;font-size:12px;color:${ch}77;margin-top:1px}

/* Location */
.loc{background:${bg};padding:72px 20px}
.lh{font-family:'Italiana',serif;font-size:clamp(22px,6vw,32px);color:${chlt};text-align:center;font-weight:400;margin-bottom:28px}
.lcards{max-width:400px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.lcard{background:${ch}05;border:1px solid ${ch}18;border-radius:14px;overflow:hidden}
.lcard-map{height:110px;background:linear-gradient(135deg,#2a1535,#1a0e18,#2a1020);display:flex;align-items:center;justify-content:center;position:relative}
.lcard-map::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 26px,${ch}05 26px,${ch}05 27px),repeating-linear-gradient(90deg,transparent,transparent 26px,${ch}05 26px,${ch}05 27px)}
.lcard-map::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 28%,rgba(26,14,24,.6) 100%)}
.lpw{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center}
.lpd{width:12px;height:12px;background:${ch};border-radius:50%;animation:ringPulse 2.5s ease-in-out infinite}
.lpl{width:1px;height:20px;background:linear-gradient(${ch},transparent)}
.lcard-hdr{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:${ch}08;border-bottom:1px solid ${ch}10}
.ltype{font-family:'Quicksand',sans-serif;font-size:8px;font-weight:500;letter-spacing:.38em;text-transform:uppercase;color:${ch}}
.ltime{font-family:'Italiana',serif;font-size:14px;color:${chlt};font-weight:400}
.lvenue{font-family:'Italiana',serif;font-size:19px;color:${chlt};padding:12px 18px 5px;font-weight:400}
.lbtn{display:flex;align-items:center;justify-content:center;gap:8px;margin:7px 14px 14px;padding:11px 20px;border-radius:100px;border:1px solid ${ch}33;background:${ch}08;font-family:'Quicksand',sans-serif;font-size:8px;font-weight:500;letter-spacing:.36em;color:${ch};text-transform:uppercase;text-decoration:none;transition:all .4s}
.lbtn:hover{background:${ch}16;border-color:${ch};transform:translateY(-2px)}
.lbtn2{border-color:${ch}18;color:${ch}77}
.lno-map{font-size:9px;color:${ch}44;text-align:center;padding:8px 0 12px;font-style:italic}

/* Gifts */
.gifts{background:${bg2};padding:88px 36px;text-align:center}
.gm{font-family:'Italiana',serif;font-size:clamp(17px,5vw,23px);color:${ch}99;line-height:1.8;max-width:340px;margin:0 auto 30px;font-weight:400}
.gopts{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;max-width:340px;margin:0 auto}
.gopt{flex:1;min-width:136px;padding:20px 14px;border-radius:14px;border:1px solid ${ch}14;background:${ch}05;display:flex;flex-direction:column;align-items:center;gap:10px;text-decoration:none;transition:all .5s}
.gopt:hover{border-color:${ch}33;transform:translateY(-4px);box-shadow:0 14px 40px ${ch}12}
.gico{width:38px;height:38px;border-radius:50%;border:1px solid ${ch}1a;display:flex;align-items:center;justify-content:center;font-size:15px;background:${ch}06}
.glbl{font-family:'Quicksand',sans-serif;font-size:8px;font-weight:500;letter-spacing:.36em;color:${ch};text-transform:uppercase}
.gsub{font-family:'Italiana',serif;font-size:13px;color:${ch}55;font-weight:400}

/* RSVP */
.rsvp{position:relative;background:${bg};padding:88px 36px;text-align:center;overflow:hidden}
.rsvp-g{position:absolute;width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,${ch}08 0%,transparent 65%);animation:sparkle 8s ease-in-out infinite;pointer-events:none}
.rdead{display:inline-block;padding:7px 20px;border:1px solid ${ch}18;border-radius:100px;font-family:'Quicksand',sans-serif;font-size:8px;font-weight:500;letter-spacing:.38em;color:${ch};text-transform:uppercase;margin-bottom:22px;background:${ch}05}
.rt{font-family:'Italiana',serif;font-size:clamp(24px,7vw,36px);color:${chlt};margin-bottom:10px;font-weight:400}
.rs{font-family:'Quicksand',sans-serif;font-size:13px;font-weight:300;line-height:1.9;color:${ch}88;margin-bottom:34px}
.wabtn{display:inline-flex;align-items:center;gap:10px;padding:15px 36px;border-radius:100px;background:linear-gradient(135deg,#25D366,#1aaa55);font-family:'Quicksand',sans-serif;font-size:9px;font-weight:500;letter-spacing:.34em;color:#fff;text-transform:uppercase;text-decoration:none;border:none;box-shadow:0 4px 24px rgba(37,211,102,.22);transition:all .4s}
.wabtn:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 36px rgba(37,211,102,.34)}
.wabtn svg{width:17px;height:17px}

/* Closing */
#closing{position:relative;height:100svh;min-height:640px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.clp{position:absolute;inset:0;z-index:0}
.clov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,rgba(26,14,24,.4) 0%,rgba(26,14,24,.18) 35%,rgba(26,14,24,.55) 75%,rgba(26,14,24,.96) 100%)}
.clov2{position:absolute;inset:0;z-index:2;background:radial-gradient(ellipse 90% 90% at 50% 50%,transparent 44%,rgba(26,14,24,.58) 100%)}
.clglow{position:absolute;width:440px;height:440px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,${ch}0e 0%,transparent 65%);z-index:3;animation:sparkle 9s ease-in-out infinite;pointer-events:none}
#floats{position:absolute;inset:0;z-index:4;pointer-events:none;overflow:hidden}
.fe{position:absolute;pointer-events:none;opacity:0;animation:magicFloat linear infinite}
.clc{position:relative;z-index:5;text-align:center;padding:0 32px;max-width:420px}
.cle{font-family:'Quicksand',sans-serif;font-size:8px;font-weight:500;letter-spacing:.5em;color:${ch}77;text-transform:uppercase;margin-bottom:16px;display:block}
.cln{font-family:'Italiana',serif;font-size:clamp(44px,13vw,66px);color:${chlt};line-height:1;text-shadow:0 0 40px ${ch}66,0 0 80px ${ch}33;margin-bottom:10px;font-weight:400}
.clm{font-family:'Quicksand',sans-serif;font-size:12px;font-weight:300;line-height:2;color:${ch}77;margin-top:16px;margin-bottom:20px}
.clst{font-family:'Italiana',serif;font-size:15px;color:${ch};font-weight:400}

/* Brand */
.brand-sec{background:${bg};padding:52px 32px;text-align:center;border-top:1px solid ${ch}10}
.brand-logo{font-family:'Quicksand',sans-serif;font-size:12px;font-weight:500;letter-spacing:.4em;color:${ch};margin-bottom:6px;text-transform:uppercase}
.brand-tag{font-family:'Quicksand',sans-serif;font-size:9px;font-weight:300;letter-spacing:.32em;color:${ch}55;text-transform:uppercase;margin-bottom:4px}
.brand-url{font-family:'Quicksand',sans-serif;font-size:10px;color:${ch}33}
.brand-heart{font-family:'Italiana',serif;font-size:13px;color:${ch}44;margin-top:8px;font-weight:400}

/* Final */
#final{background:${bg};padding:48px 32px;text-align:center;border-top:1px solid ${ch}0a}
.finm{font-family:'Italiana',serif;font-size:54px;color:${ch};line-height:1;margin-bottom:14px;font-weight:400;text-shadow:0 0 28px ${ch}44}
.finr{width:32px;height:1px;background:linear-gradient(90deg,transparent,${ch}66,transparent);margin:0 auto 12px}
.finc{font-family:'Quicksand',sans-serif;font-size:7px;font-weight:300;letter-spacing:.4em;color:${ch}33;text-transform:uppercase}
`;

  const scripts = buildInvitationScripts({ d, tgtDate, galSlides, hasAudio, ch });

  /* Sparkle particles injection */
  const sparkleInit = `
const magicC=document.getElementById('hero');
if(magicC){const mp=document.createElement('div');mp.className='magic-particles';magicC.appendChild(mp);
for(let i=0;i<18;i++){const s=document.createElement('div');s.className='sparkle';
s.style.cssText='left:'+Math.random()*100+'%;top:'+Math.random()*100+'%;animation-duration:'+(Math.random()*3+2)+'s;animation-delay:'+(Math.random()*3)+'s;opacity:'+( Math.random()*.5+.1)+';width:'+(Math.random()*4+2)+'px;height:'+(Math.random()*4+2)+'px;background:${ ch}';
mp.appendChild(s);}}`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
<title>${names} · XV Años</title>
<link href="https://fonts.googleapis.com/css2?family=Italiana&family=Quicksand:wght@300;400;500&display=swap" rel="stylesheet">
${audioTag}
<style>${css}</style>
</head>
<body>
<div id="prog"></div>
${hasAudio ? `<button id="mb" onclick="tgm()" aria-label="Música"><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div></button>` : ''}
<section id="hero">
  <div class="hphoto">${heroImg}</div>
  <div class="hov1"></div><div class="hov2"></div><div class="hov3"></div>
  <div class="aureo-bar"><div class="aureo-logo">AUREO<span>Invitaciones Digitales</span></div></div>
  <div class="hcontent">
    <span class="h-crown">👑</span>
    <span class="hsubtitle">Mis XV Años</span>
    <div class="hnames"><div class="hname">${n1}</div></div>
    ${d.sec.countdown ? `<div class="hcd-wrap sr"><div class="hcd-label">Faltan</div><div class="hcd"><div class="hcd-box"><div class="hcd-num" id="cdd">--</div><div class="hcd-u">Días</div></div><div class="hcd-sep">·</div><div class="hcd-box"><div class="hcd-num" id="cdh">--</div><div class="hcd-u">Hrs</div></div><div class="hcd-sep">·</div><div class="hcd-box"><div class="hcd-num" id="cdm">--</div><div class="hcd-u">Min</div></div><div class="hcd-sep">·</div><div class="hcd-box"><div class="hcd-num" id="cds">--</div><div class="hcd-u">Seg</div></div></div></div>` : ''}
    <div class="hdate">${dateDisplay}</div>
  </div>
  <div class="hscroll"><div class="hsl"></div><span>Desliza</span></div>
</section>
<section class="intro"><div class="iword"></div><div class="iin">
  <span class="lbl sr">Mi historia</span>
  <div class="rule sr d1"><div class="rd"></div></div>
  <h2 class="ih sr d2">${d.frase || `Quince años de magia<br>y hoy el capítulo más <em>especial</em>`}</h2>
  <p class="ib sr d3">Con el corazón lleno de alegría y amor, te invito a ser parte de este momento tan especial de mi vida.</p>
  <div class="ipill sr d4">${dateDisplay}</div>
</div></section>
${d.sec.gallery ? `<section class="reel-sec"><div class="rheader"><span class="lbl sr">Mis momentos</span><div class="rule sr d1"><div class="rd"></div></div><h2 class="rhdr-t sr d2">Mi Historia</h2></div><div class="rcon sr d3" id="rcon">${galSlides.join('')}</div><div class="rdots" id="rdots">${galSlides.map((_,i)=>`<div class="rdot${i===0?' on':''}"></div>`).join('')}</div><div class="rhint">↑ Desliza para ver más</div></section>` : ''}
<section class="mom"><div class="mom-g"></div><div class="mom-in"><div class="mom-o sr">"</div><p class="mom-q sr d1">Gracias a quienes han sido parte de este viaje.<br>Hoy celebro la vida con <em>toda mi alegría</em>.<br>Los espero con el corazón abierto.</p><div class="rule sr d2"><div class="rd"></div></div><p class="mom-a sr d3">${n1}</p></div></section>
${DetailsSection({ d })}
${d.sec.location ? LocationSection({ d }) : ''}
${d.sec.gifts ? GiftsSection({ d }) : ''}
${d.sec.rsvp ? RSVPSection({ d, waLink }) : ''}
<section id="closing"><div class="clp">${closingImg}</div><div class="clov1"></div><div class="clov2"></div><div class="clglow"></div><div id="floats"></div>
<div class="clc"><span class="cle sr">Con todo mi amor</span><div class="cln sr d1">${n1}</div><div class="rule sr d2"><div class="rd"></div></div><p class="clm sr d3">Gracias por ser parte de este sueño.<br>Tu presencia hará esta noche inolvidable.</p><div class="clst sr d4">${dateDisplay}</div></div></section>
${BrandSection()}
${FinalSection({ ini, yy: d.yy })}
<script>${scripts}${sparkleInit}<\/script>
</body></html>`;
}
