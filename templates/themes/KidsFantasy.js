/* ── AUREO · templates/themes/KidsFantasy.js ───────────────────
   Template: Kids Fantasy
   Aesthetic: bold colors / playful / immersive / magical world
   Fonts: Baloo 2 (display) + Nunito (body)
   Animations: bounce, pop, confetti, stars
─────────────────────────────────────────────────────────────── */

function buildKidsFantasy(d) {
  const names = d.names || 'Mateo';
  const pts   = names.split(/&|y/i).map(s => s.trim());
  const n1    = pts[0] || names;
  const ini   = n1[0] || 'M';
  const waNum = (d.wa || '5500000000').replace(/\D/g, '');
  const waLink = `https://wa.me/${waNum}?text=Confirmo+mi+asistencia`;

  const dateDisplay = d.dd && d.mm && d.yy
    ? `${d.dd} · ${(d.mm || '').toUpperCase()} · ${d.yy}`
    : 'Fecha por confirmar';
  const tgtDate = buildTargetDate(d.dd, d.mm, d.yy, d.t1);

  /* ── Palette (warm rainbow-lite) ── */
  const bg    = '#0d0b1a';
  const bg2   = '#13102a';
  const ch    = '#ffd166';   // golden yellow
  const chlt  = '#ffe599';
  const blue  = '#06d6a0';
  const pink  = '#ff6b9d';
  const purple = '#a855f7';

  const heroImg = d.photos.hero
    ? `<img src="${d.photos.hero}" style="width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(.7) contrast(1.1) saturate(1.1);">`
    : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#0d0b1a,#1a1040,#0d1a2a);display:flex;align-items:center;justify-content:center;font-size:88px">🎈</div>`;

  const closingImg = d.photos.closing
    ? `<img src="${d.photos.closing}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.65) contrast(1.08) saturate(1.0);">`
    : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#0d0b1a,#1a1040);display:flex;align-items:center;justify-content:center;font-size:88px">🎉</div>`;

  const galSlides = d.photos.gallery.length > 0
    ? d.photos.gallery.map((src, i) =>
        `<div class="rslide"><img src="${src}" style="width:100%;height:100%;object-fit:cover;filter:brightness(.78) contrast(1.1) saturate(1.05)"><div class="rov"></div><div class="rcap"><div class="rct">${['Mi mundo','Mis amigos','La diversión','El gran día'][i] || 'Momento ' + (i+1)}</div></div></div>`)
    : ['🦄','🚀','🌈','🎂'].map((e, i) =>
        `<div class="rslide"><div style="width:100%;height:100%;background:linear-gradient(135deg,${['#1a0d2a,#0d1a40','#0d1a14,#1a2d0d','#1a0d20,#2d0d1a','#2d1a0d,#1a0d0d'][i]});display:flex;align-items:center;justify-content:center;font-size:80px">${e}</div><div class="rov"></div><div class="rcap"><div class="rct">${['Mi mundo','Mis amigos','La diversión','El gran día'][i]}</div></div></div>`);

  const hasAudio = !!(d.audioSrc || d.audioLink || d.audioName);
  const audioTag = d.audioSrc ? `<audio id="aud" loop preload="auto"><source src="${d.audioSrc}" type="audio/mpeg"></audio>` : '';

  const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
body{background:${bg};color:#f0e8ff;font-family:'Nunito',sans-serif;overflow-x:hidden}

@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes pop{0%{transform:scale(.8);opacity:0}100%{transform:scale(1);opacity:1}}
@keyframes starSpin{0%{transform:rotate(0deg) scale(1)}50%{transform:rotate(180deg) scale(1.2)}100%{transform:rotate(360deg) scale(1)}}
@keyframes confettiFall{0%{opacity:0;transform:translateY(-10px) rotate(0deg)}10%{opacity:.8}90%{opacity:.5}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}
@keyframes hpan{from{transform:scale(1.04)}to{transform:scale(1.08) translateY(-6px)}}
@keyframes revealPop{from{opacity:0;transform:scale(.9) translateY(14px)}to{opacity:1;transform:none}}
@keyframes eqb{from{transform:scaleY(.25)}to{transform:scaleY(1)}}

.sr{opacity:0;transform:translateY(16px);transition:opacity .9s cubic-bezier(.16,1,.3,1),transform .9s cubic-bezier(.16,1,.3,1)}
.sr.v{opacity:1;transform:none}
.d1{transition-delay:.1s}.d2{transition-delay:.22s}.d3{transition-delay:.34s}.d4{transition-delay:.46s}
#prog{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,${pink},${ch},${blue});z-index:9998}

${hasAudio ? `#mb{position:fixed;bottom:22px;right:18px;z-index:9999;width:48px;height:48px;border-radius:50%;border:2px solid ${ch};background:rgba(13,11,26,.88);backdrop-filter:blur(10px);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:2px;box-shadow:0 0 20px ${ch}44;transition:all .4s}
#mb:hover{background:${ch};border-color:${ch}}
.eq{width:2.5px;border-radius:2px;background:${ch};animation:eqb .7s ease-in-out infinite alternate}
.eq:nth-child(1){height:6px}.eq:nth-child(2){height:12px;animation-delay:.1s}.eq:nth-child(3){height:9px;animation-delay:.2s}.eq:nth-child(4){height:14px;animation-delay:.06s}.eq:nth-child(5){height:7px;animation-delay:.16s}
.eq.off{animation-play-state:paused;height:4px!important;opacity:.25}
#mb:hover .eq{background:#0d0b1a}` : ''}

/* AUREO bar */
.aureo-bar{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:center;padding:16px;background:linear-gradient(to bottom,rgba(0,0,0,.5),transparent)}
.aureo-logo{font-family:'Nunito',sans-serif;font-size:9px;font-weight:700;letter-spacing:.4em;color:${ch}88;text-transform:uppercase;text-align:center}
.aureo-logo span{display:block;font-size:7px;font-weight:400;letter-spacing:.36em;color:${ch}44;margin-top:2px}

/* Stars background */
.hero-stars{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}
.star{position:absolute;background:#fff;border-radius:50%;animation:starSpin linear infinite}

/* HERO */
#hero{position:relative;height:100svh;min-height:660px;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;padding-bottom:40px}
.hphoto{position:absolute;inset:0;z-index:0}
.hphoto img{animation:hpan 16s ease-in-out infinite alternate}
.hov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,rgba(13,11,26,.35) 0%,rgba(13,11,26,.05) 25%,rgba(13,11,26,.5) 70%,rgba(13,11,26,.95) 100%)}
.hov2{position:absolute;inset:0;z-index:2;background:radial-gradient(ellipse 100% 100% at 50% 50%,transparent 40%,rgba(13,11,26,.45) 100%)}
.hcontent{position:relative;z-index:6;text-align:center;padding:0 24px;max-width:440px;animation:revealPop 1.4s cubic-bezier(.16,1,.3,1) .2s both}

.h-emoji{font-size:40px;display:block;margin-bottom:10px;animation:bounce 2s ease-in-out infinite}
.hsubtitle{font-family:'Nunito',sans-serif;font-size:10px;font-weight:700;letter-spacing:.4em;text-transform:uppercase;color:${ch};margin-bottom:10px;display:block}
.hnames{margin-bottom:14px}
.hname{
  font-family:'Baloo 2',cursive;
  font-size:clamp(50px,15vw,80px);
  font-weight:800;
  color:${ch};
  line-height:.95;
  text-shadow:0 0 30px ${ch}77,0 4px 0 rgba(0,0,0,.4),0 0 60px ${ch}33;
}
.hamp{display:block;font-family:'Nunito',sans-serif;font-size:13px;font-weight:600;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.5);margin:8px 0}

/* Countdown — digital display */
.hcd-wrap{margin:14px 0 12px}
.hcd-label{font-family:'Nunito',sans-serif;font-size:9px;font-weight:700;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:8px}
.hcd{display:flex;align-items:center;justify-content:center;gap:6px}
.hcd-box{background:rgba(0,0,0,.6);border:2px solid ${ch}55;border-radius:10px;padding:8px 10px;min-width:52px;text-align:center;backdrop-filter:blur(6px)}
.hcd-num{font-family:'Baloo 2',cursive;font-size:clamp(22px,6vw,30px);font-weight:800;color:${ch};line-height:1}
.hcd-u{font-family:'Nunito',sans-serif;font-size:7px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4)}
.hcd-sep{font-family:'Baloo 2',cursive;font-size:24px;font-weight:800;color:${ch}66;line-height:1;padding-top:4px}
.hdate{font-family:'Nunito',sans-serif;font-size:10px;font-weight:600;letter-spacing:.4em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-top:12px}
.hscroll{position:absolute;bottom:22px;left:50%;transform:translateX(-50%);z-index:6;display:flex;flex-direction:column;align-items:center;gap:7px;opacity:0;animation:revealPop 2s ease 2s both}
.hsl{width:2px;height:32px;background:linear-gradient(to bottom,${ch},transparent);border-radius:1px}
.hscroll span{font-family:'Nunito',sans-serif;font-size:7px;font-weight:700;letter-spacing:.4em;color:rgba(255,255,255,.35);text-transform:uppercase}

/* Shared utility */
.lbl{font-family:'Nunito',sans-serif;font-size:9px;font-weight:700;letter-spacing:.4em;text-transform:uppercase;color:${ch};display:inline-block;margin-bottom:11px}
.rule{display:flex;align-items:center;gap:12px;justify-content:center;margin:14px 0}
.rule::before,.rule::after{content:'';flex:1;max-width:44px;height:2px;background:linear-gradient(90deg,transparent,${ch}55)}
.rule::after{background:linear-gradient(90deg,${ch}55,transparent)}
.rd{width:6px;height:6px;border-radius:50%;background:${ch};box-shadow:0 0 8px ${ch}}

/* Intro */
.intro{background:${bg2};padding:80px 36px;text-align:center}
.iword{display:none}
.iin{max-width:440px;margin:0 auto}
.ih{font-family:'Baloo 2',cursive;font-size:clamp(24px,8vw,36px);font-weight:700;color:#f0e8ff;line-height:1.3;margin-bottom:18px}
.ih em{color:${ch}}
.ib{font-family:'Nunito',sans-serif;font-size:14px;font-weight:400;line-height:1.9;color:rgba(240,232,255,.65)}
.ipill{display:inline-block;margin-top:24px;padding:9px 26px;border:2px solid ${ch}33;border-radius:100px;font-family:'Nunito',sans-serif;font-size:9px;font-weight:700;letter-spacing:.35em;color:${ch};text-transform:uppercase;background:${ch}0a}

/* Reel */
.reel-sec{background:${bg};padding:72px 0;overflow:hidden}
.rheader{text-align:center;padding:0 32px 44px}
.rhdr-t{font-family:'Baloo 2',cursive;font-size:clamp(24px,7vw,36px);font-weight:700;color:#f0e8ff}
.rcon{height:68svh;min-height:380px;max-height:560px;overflow-y:scroll;scroll-snap-type:y mandatory;scrollbar-width:none;margin:0 16px;border-radius:20px;border:2px solid ${ch}22}
.rcon::-webkit-scrollbar{display:none}
.rslide{position:relative;height:68svh;min-height:380px;max-height:560px;scroll-snap-align:start;overflow:hidden}
.rov{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 45%,rgba(13,11,26,.92) 100%)}
.rcap{position:absolute;bottom:22px;left:22px;right:22px;z-index:3}
.rct{font-family:'Baloo 2',cursive;font-size:22px;font-weight:700;color:#f0e8ff}
.rcs{font-family:'Nunito',sans-serif;font-size:9px;font-weight:600;letter-spacing:.35em;color:${ch};text-transform:uppercase;margin-top:3px}
.rdots{display:flex;justify-content:center;gap:7px;margin-top:14px}
.rdot{width:6px;height:6px;border-radius:50%;background:${ch}33;transition:all .3s}
.rdot.on{background:${ch};width:16px;border-radius:3px}
.rhint{text-align:center;margin-top:10px;font-family:'Nunito',sans-serif;font-size:8px;font-weight:600;letter-spacing:.3em;color:${ch}44;text-transform:uppercase}

/* Moment */
.mom{position:relative;min-height:60svh;display:flex;align-items:center;justify-content:center;background:${bg2};overflow:hidden;padding:80px 36px}
.mom-g{position:absolute;width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,${ch}0a 0%,transparent 65%);pointer-events:none}
.mom-in{position:relative;z-index:2;text-align:center;max-width:380px}
.mom-o{font-family:'Baloo 2',cursive;font-size:60px;font-weight:800;color:${ch}22;line-height:1;margin-bottom:-8px}
.mom-q{font-family:'Nunito',sans-serif;font-size:clamp(18px,5.5vw,24px);font-weight:400;color:#f0e8ff;line-height:1.75}
.mom-q em{color:${ch};font-weight:700}
.mom-a{font-family:'Nunito',sans-serif;font-size:9px;font-weight:700;letter-spacing:.4em;color:${ch};text-transform:uppercase;margin-top:20px}

/* Details */
.det{background:${bg};padding:80px 26px}
.dh{font-family:'Baloo 2',cursive;font-size:clamp(22px,7vw,32px);font-weight:700;color:#f0e8ff;text-align:center;margin-bottom:36px}
.dlist{max-width:380px;margin:0 auto}
.drow{display:flex;align-items:flex-start;gap:16px;padding:16px 0;border-bottom:2px solid ${ch}0d}
.drow:first-child{border-top:2px solid ${ch}0d}
.dic{width:36px;height:36px;flex-shrink:0;border-radius:12px;border:2px solid ${ch}22;display:flex;align-items:center;justify-content:center;background:${ch}0a;font-size:15px}
.dtg{font-family:'Nunito',sans-serif;font-size:8px;font-weight:700;letter-spacing:.36em;text-transform:uppercase;color:${ch};margin-bottom:3px}
.dv{font-family:'Nunito',sans-serif;font-size:17px;font-weight:600;color:#f0e8ff;line-height:1.35}
.dv small{display:block;font-size:13px;color:rgba(240,232,255,.5);font-weight:400;margin-top:1px}

/* Location */
.loc{background:${bg2};padding:72px 20px}
.lh{font-family:'Baloo 2',cursive;font-size:clamp(20px,6vw,30px);font-weight:700;color:#f0e8ff;text-align:center;margin-bottom:26px}
.lcards{max-width:400px;margin:0 auto;display:flex;flex-direction:column;gap:12px}
.lcard{background:${ch}06;border:2px solid ${ch}18;border-radius:16px;overflow:hidden}
.lcard-map{height:110px;background:linear-gradient(135deg,#1a1040,#0d1a2a);display:flex;align-items:center;justify-content:center;position:relative}
.lcard-map::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 24px,${ch}05 24px,${ch}05 25px),repeating-linear-gradient(90deg,transparent,transparent 24px,${ch}05 24px,${ch}05 25px)}
.lcard-map::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 28%,rgba(13,11,26,.6) 100%)}
.lpw{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center}
.lpd{width:14px;height:14px;background:${ch};border-radius:50%;box-shadow:0 0 16px ${ch}88}
.lpl{width:2px;height:20px;background:linear-gradient(${ch},transparent);border-radius:1px}
.lcard-hdr{display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:${ch}0a;border-bottom:1px solid ${ch}10}
.ltype{font-family:'Nunito',sans-serif;font-size:8px;font-weight:700;letter-spacing:.36em;text-transform:uppercase;color:${ch}}
.ltime{font-family:'Baloo 2',cursive;font-size:15px;font-weight:700;color:#f0e8ff}
.lvenue{font-family:'Nunito',sans-serif;font-size:18px;font-weight:600;color:#f0e8ff;padding:12px 18px 5px}
.lbtn{display:flex;align-items:center;justify-content:center;gap:8px;margin:7px 14px 14px;padding:11px 20px;border-radius:100px;border:2px solid ${ch}33;background:${ch}08;font-family:'Nunito',sans-serif;font-size:8px;font-weight:700;letter-spacing:.34em;color:${ch};text-transform:uppercase;text-decoration:none;transition:all .3s}
.lbtn:hover{background:${ch};color:#0d0b1a;border-color:${ch};transform:translateY(-2px)}
.lbtn2{border-color:${ch}18;color:${ch}77}
.lno-map{font-size:9px;color:${ch}44;text-align:center;padding:8px 0 12px}

/* Gifts */
.gifts{background:${bg};padding:80px 36px;text-align:center}
.gm{font-family:'Nunito',sans-serif;font-size:clamp(15px,4.5vw,20px);font-weight:400;color:rgba(240,232,255,.65);line-height:1.8;max-width:340px;margin:0 auto 28px}
.gopts{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;max-width:340px;margin:0 auto}
.gopt{flex:1;min-width:136px;padding:18px 14px;border-radius:16px;border:2px solid ${ch}14;background:${ch}05;display:flex;flex-direction:column;align-items:center;gap:9px;text-decoration:none;transition:all .4s}
.gopt:hover{border-color:${ch};background:${ch}0c;transform:translateY(-4px);box-shadow:0 12px 36px ${ch}16}
.gico{width:40px;height:40px;border-radius:14px;border:2px solid ${ch}1a;display:flex;align-items:center;justify-content:center;font-size:18px;background:${ch}08}
.glbl{font-family:'Nunito',sans-serif;font-size:9px;font-weight:700;letter-spacing:.34em;color:${ch};text-transform:uppercase}
.gsub{font-family:'Nunito',sans-serif;font-size:12px;font-weight:400;color:rgba(240,232,255,.4)}

/* RSVP */
.rsvp{position:relative;background:${bg2};padding:80px 36px;text-align:center;overflow:hidden}
.rsvp-g{position:absolute;width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,${ch}08 0%,transparent 65%);pointer-events:none}
.rdead{display:inline-block;padding:7px 20px;border:2px solid ${ch}22;border-radius:100px;font-family:'Nunito',sans-serif;font-size:9px;font-weight:700;letter-spacing:.35em;color:${ch};text-transform:uppercase;margin-bottom:20px;background:${ch}05}
.rt{font-family:'Baloo 2',cursive;font-size:clamp(22px,7vw,34px);font-weight:700;color:#f0e8ff;margin-bottom:10px}
.rs{font-family:'Nunito',sans-serif;font-size:13px;font-weight:400;line-height:1.85;color:rgba(240,232,255,.6);margin-bottom:32px}
.wabtn{display:inline-flex;align-items:center;gap:10px;padding:14px 36px;border-radius:100px;background:#25D366;font-family:'Nunito',sans-serif;font-size:10px;font-weight:700;letter-spacing:.3em;color:#fff;text-transform:uppercase;text-decoration:none;border:none;box-shadow:0 4px 24px rgba(37,211,102,.3);transition:all .4s}
.wabtn:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 36px rgba(37,211,102,.4)}
.wabtn svg{width:18px;height:18px}

/* Closing */
#closing{position:relative;height:100svh;min-height:640px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.clp{position:absolute;inset:0;z-index:0}
.clov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,rgba(13,11,26,.38) 0%,rgba(13,11,26,.14) 35%,rgba(13,11,26,.54) 75%,rgba(13,11,26,.96) 100%)}
.clov2{position:absolute;inset:0;z-index:2;background:radial-gradient(ellipse 90% 90% at 50% 50%,transparent 44%,rgba(13,11,26,.55) 100%)}
.clglow{position:absolute;width:440px;height:440px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,${ch}0c 0%,transparent 65%);z-index:3;pointer-events:none}
#floats{position:absolute;inset:0;z-index:4;pointer-events:none;overflow:hidden}
.fe{position:absolute;pointer-events:none;opacity:0;animation:confettiFall linear infinite}
.clc{position:relative;z-index:5;text-align:center;padding:0 32px;max-width:420px}
.cle{font-family:'Nunito',sans-serif;font-size:9px;font-weight:700;letter-spacing:.44em;color:rgba(255,255,255,.42);text-transform:uppercase;margin-bottom:16px;display:block}
.cln{font-family:'Baloo 2',cursive;font-size:clamp(40px,12vw,64px);font-weight:800;color:${ch};line-height:1;text-shadow:0 0 36px ${ch}66,0 0 70px ${ch}33;margin-bottom:10px}
.clm{font-family:'Nunito',sans-serif;font-size:12px;font-weight:400;line-height:2;color:rgba(255,255,255,.5);margin-top:16px;margin-bottom:20px}
.clst{font-family:'Nunito',sans-serif;font-size:10px;font-weight:700;letter-spacing:.38em;color:${ch};text-transform:uppercase}

/* Brand */
.brand-sec{background:${bg};padding:48px 32px;text-align:center;border-top:2px solid ${ch}0c}
.brand-logo{font-family:'Nunito',sans-serif;font-size:12px;font-weight:800;letter-spacing:.4em;color:${ch};margin-bottom:6px;text-transform:uppercase}
.brand-tag{font-family:'Nunito',sans-serif;font-size:9px;font-weight:400;letter-spacing:.3em;color:${ch}55;text-transform:uppercase;margin-bottom:4px}
.brand-url{font-family:'Nunito',sans-serif;font-size:10px;color:${ch}33}
.brand-heart{font-family:'Nunito',sans-serif;font-size:12px;color:${ch}44;margin-top:8px}

/* Final */
#final{background:${bg};padding:48px 32px;text-align:center;border-top:1px solid ${ch}0a}
.finm{font-family:'Baloo 2',cursive;font-size:52px;font-weight:800;color:${ch};line-height:1;text-shadow:0 0 28px ${ch}44;margin-bottom:12px}
.finr{width:32px;height:2px;background:linear-gradient(90deg,transparent,${ch}66,transparent);margin:0 auto 12px}
.finc{font-family:'Nunito',sans-serif;font-size:8px;font-weight:600;letter-spacing:.38em;color:${ch}33;text-transform:uppercase}
`;

  const scripts = buildInvitationScripts({ d, tgtDate, galSlides, hasAudio, ch });

  /* Confetti particles */
  const confettiColors = [ch, pink, blue, purple, '#fff'];
  const confettiInit = `
const ccont=document.getElementById('floats');
if(ccont){
  const cols=${JSON.stringify(confettiColors)};
  function mkConf(){
    const e=document.createElement('div');e.className='fe';
    const shapes=['●','◆','▲','★','✦'];
    e.textContent=shapes[Math.floor(Math.random()*shapes.length)];
    e.style.cssText='left:'+Math.random()*100+'%;bottom:-20px;font-size:'+(Math.random()*10+8)+'px;color:'+cols[Math.floor(Math.random()*cols.length)]+';animation-duration:'+(Math.random()*5+5)+'s;animation-delay:'+(Math.random()*3)+'s;';
    ccont.appendChild(e);setTimeout(()=>e.remove(),12000);
  }
  const cobs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting){for(let i=0;i<12;i++)setTimeout(mkConf,i*200);const iv=setInterval(mkConf,500);cobs.disconnect();setTimeout(()=>clearInterval(iv),20000)}
  },{threshold:.2});
  const cls=document.getElementById('closing');if(cls)cobs.observe(cls);
}`;

  /* Stars in hero */
  const starsInit = `
const heroEl=document.getElementById('hero');
if(heroEl){const sc=document.createElement('div');sc.className='hero-stars';heroEl.appendChild(sc);
for(let i=0;i<20;i++){const s=document.createElement('div');s.className='star';
const sz=Math.random()*3+1;
s.style.cssText='left:'+Math.random()*100+'%;top:'+Math.random()*80+'%;width:'+sz+'px;height:'+sz+'px;animation-duration:'+(Math.random()*4+3)+'s;animation-delay:'+(Math.random()*4)+'s';
sc.appendChild(s);}}`;

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
<title>${n1} · ${d.tipo === 'Baby Shower' ? 'Baby Shower' : 'Cumpleaños'}</title>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
${audioTag}
<style>${css}</style>
</head>
<body>
<div id="prog"></div>
${hasAudio ? `<button id="mb" onclick="tgm()" aria-label="Música"><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div><div class="eq off"></div></button>` : ''}
<section id="hero">
  <div class="hphoto">${heroImg}</div>
  <div class="hov1"></div><div class="hov2"></div>
  <div class="aureo-bar"><div class="aureo-logo">AUREO<span>Invitaciones Digitales</span></div></div>
  <div class="hcontent">
    <span class="h-emoji">${d.tipo === 'Baby Shower' ? '🌸' : '🎈'}</span>
    <span class="hsubtitle">${d.tipo === 'Baby Shower' ? 'Baby Shower' : 'Cumpleaños'}</span>
    <div class="hnames"><div class="hname">${n1}</div></div>
    ${d.sec.countdown ? `<div class="hcd-wrap sr"><div class="hcd-label">Faltan</div><div class="hcd"><div class="hcd-box"><div class="hcd-num" id="cdd">--</div><div class="hcd-u">Días</div></div><div class="hcd-sep">·</div><div class="hcd-box"><div class="hcd-num" id="cdh">--</div><div class="hcd-u">Hrs</div></div><div class="hcd-sep">·</div><div class="hcd-box"><div class="hcd-num" id="cdm">--</div><div class="hcd-u">Min</div></div><div class="hcd-sep">·</div><div class="hcd-box"><div class="hcd-num" id="cds">--</div><div class="hcd-u">Seg</div></div></div></div>` : ''}
    <div class="hdate">${dateDisplay}</div>
  </div>
  <div class="hscroll"><div class="hsl"></div><span>Desliza</span></div>
</section>
<section class="intro"><div class="iword"></div><div class="iin">
  <span class="lbl sr">La celebración</span>
  <div class="rule sr d1"><div class="rd"></div></div>
  <h2 class="ih sr d2">${d.frase || `Un mundo de diversión<br>y <em>magia</em> te espera`}</h2>
  <p class="ib sr d3">¡Es hora de celebrar! Te invitamos a ser parte de este momento tan especial lleno de alegría, risas y recuerdos que durarán para siempre.</p>
  <div class="ipill sr d4">${dateDisplay}</div>
</div></section>
${d.sec.gallery ? `<section class="reel-sec"><div class="rheader"><span class="lbl sr">Nuestros momentos</span><div class="rule sr d1"><div class="rd"></div></div><h2 class="rhdr-t sr d2">Historia</h2></div><div class="rcon sr d3" id="rcon">${galSlides.join('')}</div><div class="rdots" id="rdots">${galSlides.map((_,i)=>`<div class="rdot${i===0?' on':''}"></div>`).join('')}</div><div class="rhint">↑ Desliza</div></section>` : ''}
<section class="mom"><div class="mom-g"></div><div class="mom-in"><div class="mom-o sr">"</div><p class="mom-q sr d1">La vida es más bella<br>cuando se celebra con quienes <em>amamos</em>.<br>¡Nos vemos en la fiesta!</p><div class="rule sr d2"><div class="rd"></div></div><p class="mom-a sr d3">${n1}</p></div></section>
${DetailsSection({ d })}
${d.sec.location ? LocationSection({ d }) : ''}
${d.sec.gifts ? GiftsSection({ d }) : ''}
${d.sec.rsvp ? RSVPSection({ d, waLink }) : ''}
<section id="closing"><div class="clp">${closingImg}</div><div class="clov1"></div><div class="clov2"></div><div class="clglow"></div><div id="floats"></div>
<div class="clc"><span class="cle sr">¡Te esperamos!</span><div class="cln sr d1">${n1}</div><div class="rule sr d2"><div class="rd"></div></div><p class="clm sr d3">Gracias por hacer especial cada momento.<br>¡Será una celebración increíble!</p><div class="clst sr d4">${dateDisplay}</div></div></section>
${BrandSection()}
${FinalSection({ ini, yy: d.yy })}
<script>${scripts}${confettiInit}${starsInit}<\/script>
</body></html>`;
}
