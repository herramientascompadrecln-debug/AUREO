/* ── AUREO · templates/invitationStyles.js ──────────────────────
   Returns the full CSS string for the generated invitation HTML.
   Receives the resolved palette (tc, ch, chlt) as params.
   Keep all invitation styles here — never in the generator UI CSS.
─────────────────────────────────────────────────────────────── */

function buildInvitationCSS({ tc, ch, chlt }) {
  return `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;scroll-behavior:smooth}
body{background:${tc.bg};color:#f8f0e0;font-family:'Montserrat',sans-serif;overflow-x:hidden}
:root{--ch:${ch};--chlt:${chlt};--bg:${tc.bg};--bg2:${tc.bg2};--cream:#f8f0e0;--dim:rgba(248,240,224,.55)}

@keyframes glow{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.85;transform:scale(1.12)}}
@keyframes hfloat{from{transform:scale(1.04) translateY(0)}to{transform:scale(1.09) translateY(-10px)}}
@keyframes reveal{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes scrolll{0%{transform:scaleY(0);transform-origin:top;opacity:1}100%{transform:scaleY(1);transform-origin:top;opacity:0}}
@keyframes ppin{0%,100%{box-shadow:0 0 0 3px rgba(200,169,110,.2),0 0 20px rgba(200,169,110,.55)}50%{box-shadow:0 0 0 7px rgba(200,169,110,.1),0 0 44px rgba(200,169,110,.9)}}
@keyframes eqb{from{transform:scaleY(.25)}to{transform:scaleY(1)}}
@keyframes float{0%{opacity:0;transform:translateY(0)}8%{opacity:.45}90%{opacity:.16}100%{opacity:0;transform:translateY(-94vh) rotate(310deg)}}
@keyframes cdpulse{0%,100%{text-shadow:0 0 20px ${ch},0 0 40px ${ch}44}50%{text-shadow:0 0 30px ${ch},0 0 60px ${ch}88}}

.sr{opacity:0;transform:translateY(24px);transition:opacity 1s cubic-bezier(.16,1,.3,1),transform 1s cubic-bezier(.16,1,.3,1)}
.sr.v{opacity:1;transform:none}
.d1{transition-delay:.12s}.d2{transition-delay:.26s}.d3{transition-delay:.4s}.d4{transition-delay:.54s}

#prog{position:fixed;top:0;left:0;height:1px;width:0;background:linear-gradient(90deg,transparent,${ch},${chlt});z-index:9998;transition:width .1s}

/* Music button */
#mb{position:fixed;bottom:22px;right:18px;z-index:9999;width:44px;height:44px;border-radius:50%;border:1px solid rgba(200,169,110,.28);background:rgba(12,10,20,.86);backdrop-filter:blur(14px);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:2px;box-shadow:0 0 18px rgba(200,169,110,.1);transition:all .4s}
#mb:hover{border-color:${ch};box-shadow:0 0 32px rgba(200,169,110,.25)}
.eq{width:2px;border-radius:2px;background:${ch};animation:eqb .7s ease-in-out infinite alternate}
.eq:nth-child(1){height:6px;animation-delay:0s}.eq:nth-child(2){height:12px;animation-delay:.12s}
.eq:nth-child(3){height:9px;animation-delay:.24s}.eq:nth-child(4){height:14px;animation-delay:.08s}
.eq:nth-child(5){height:7px;animation-delay:.18s}.eq.off{animation-play-state:paused;height:4px!important;opacity:.25}

/* AUREO brand bar */
.aureo-bar{position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:center;padding:18px 24px;background:linear-gradient(to bottom,rgba(0,0,0,.45),transparent)}
.aureo-logo{font-family:'Cinzel',serif;font-size:13px;font-weight:500;letter-spacing:.38em;color:${ch};text-shadow:0 0 16px ${ch}88;text-align:center}
.aureo-logo span{display:block;font-size:7px;font-weight:400;letter-spacing:.45em;color:rgba(200,169,110,.5);margin-top:2px;text-transform:uppercase}

/* Hero */
#hero{position:relative;height:100svh;min-height:680px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;overflow:hidden;padding-bottom:56px}
.hphoto{position:absolute;inset:0;z-index:0}
.hov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,rgba(0,0,0,.38) 0%,rgba(0,0,0,.05) 22%,rgba(0,0,0,.18) 50%,rgba(0,0,0,.72) 78%,rgba(0,0,0,.97) 100%)}
.hov2{position:absolute;inset:0;z-index:2;background:radial-gradient(ellipse 110% 100% at 50% 50%,transparent 35%,rgba(0,0,0,.52) 100%)}
.hov3{position:absolute;inset:0;z-index:3;background:radial-gradient(ellipse 80% 60% at 50% 75%,${ch}0a 0%,transparent 60%)}
.hglow{position:absolute;top:-60px;left:50%;transform:translateX(-50%);width:520px;height:380px;background:radial-gradient(ellipse,${ch}0f 0%,transparent 65%);z-index:4;animation:glow 9s ease-in-out infinite;pointer-events:none}
.hcontent{position:relative;z-index:6;text-align:center;padding:0 24px;width:100%;max-width:480px;animation:reveal 1.6s cubic-bezier(.16,1,.3,1) .2s both}
.hnames{margin-bottom:14px}
.hname{font-family:'Cinzel',serif;font-size:clamp(48px,15vw,76px);font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:${ch};line-height:.95;text-shadow:0 0 40px ${ch}99,0 0 80px ${ch}44,0 4px 24px rgba(0,0,0,.8)}
.hamp{display:block;font-family:'Cormorant Garamond',serif;font-size:clamp(28px,8vw,40px);font-weight:200;font-style:italic;color:rgba(255,255,255,.7);letter-spacing:.2em;margin:8px 0;line-height:1}
.hsubtitle{font-family:'Montserrat',sans-serif;font-size:9px;font-weight:300;letter-spacing:.6em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:20px;display:block}
.hcd-wrap{margin:16px 0 14px}
.hcd-label{font-family:'Montserrat',sans-serif;font-size:8px;font-weight:300;letter-spacing:.5em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:10px}
.hcd{display:flex;align-items:center;justify-content:center;gap:8px}
.hcd-box{background:rgba(0,0,0,.55);border:1px solid ${ch}55;border-radius:8px;padding:10px 12px;min-width:60px;text-align:center;backdrop-filter:blur(8px)}
.hcd-num{font-family:'Cinzel',serif;font-size:clamp(26px,7vw,36px);font-weight:400;color:${ch};line-height:1;animation:cdpulse 3s ease-in-out infinite}
.hcd-u{font-family:'Montserrat',sans-serif;font-size:7px;font-weight:300;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.38);margin-top:3px}
.hcd-sep{font-family:'Cormorant Garamond',serif;font-size:22px;color:${ch}66;line-height:1;padding-top:8px}
.hdate{font-family:'Montserrat',sans-serif;font-size:10px;font-weight:300;letter-spacing:.5em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-top:14px}
.hscroll{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);z-index:6;display:flex;flex-direction:column;align-items:center;gap:7px;opacity:0;animation:reveal 2s ease 2s both}
.hsl{width:1px;height:36px;background:linear-gradient(to bottom,${ch},transparent);animation:scrolll 2s ease-in-out infinite}
.hscroll span{font-family:'Montserrat',sans-serif;font-size:7px;letter-spacing:.48em;color:rgba(255,255,255,.35);text-transform:uppercase}

/* Intro */
.intro{position:relative;min-height:100svh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:linear-gradient(180deg,${tc.bg} 0%,${tc.bg2} 60%,${tc.bg} 100%)}
.iword{position:absolute;font-family:'Cinzel',serif;font-size:clamp(100px,32vw,200px);font-weight:500;color:${ch}05;white-space:nowrap;user-select:none;pointer-events:none;top:50%;left:50%;transform:translate(-50%,-50%);letter-spacing:.1em}
.iin{position:relative;z-index:2;text-align:center;padding:88px 36px;max-width:440px}
.ih{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,9vw,42px);font-weight:200;font-style:italic;color:var(--cream);line-height:1.38;margin-bottom:22px}
.ih em{color:${chlt}}
.ib{font-family:'Montserrat',sans-serif;font-size:12px;font-weight:300;line-height:2.05;color:var(--dim);letter-spacing:.04em}
.ipill{display:inline-block;margin-top:30px;padding:9px 30px;border:1px solid ${ch}38;border-radius:100px;font-family:'Montserrat',sans-serif;font-size:8px;font-weight:300;letter-spacing:.44em;color:${ch};text-transform:uppercase;background:${ch}08}

/* Reel gallery */
.reel-sec{background:${tc.bg};padding:72px 0;overflow:hidden}
.rheader{text-align:center;padding:0 32px 48px}
.rhdr-t{font-family:'Cinzel',serif;font-size:clamp(22px,7vw,34px);font-weight:400;letter-spacing:.12em;color:var(--cream);text-transform:uppercase}
.rcon{height:72svh;min-height:400px;max-height:580px;overflow-y:scroll;scroll-snap-type:y mandatory;scrollbar-width:none;position:relative;margin:0 16px;border-radius:18px;border:1px solid ${ch}18}
.rcon::-webkit-scrollbar{display:none}
.rslide{position:relative;height:72svh;min-height:400px;max-height:580px;flex-shrink:0;scroll-snap-align:start;overflow:hidden}
.rov{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 45%,rgba(0,0,0,.9) 100%)}
.rcap{position:absolute;bottom:22px;left:22px;right:22px;z-index:3}
.rct{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:300;font-style:italic;color:var(--cream);line-height:1.2;margin-bottom:4px}
.rcs{font-family:'Montserrat',sans-serif;font-size:8px;font-weight:300;letter-spacing:.38em;color:${ch};text-transform:uppercase}
.rdots{display:flex;justify-content:center;gap:6px;margin-top:16px}
.rdot{width:5px;height:5px;border-radius:50%;background:${ch}33;transition:all .3s}
.rdot.on{background:${ch};width:14px;border-radius:3px}
.rhint{text-align:center;margin-top:10px;font-family:'Montserrat',sans-serif;font-size:8px;letter-spacing:.3em;color:${ch}40;text-transform:uppercase}

/* Moment */
.mom{position:relative;min-height:72svh;display:flex;align-items:center;justify-content:center;background:${tc.bg2};overflow:hidden;padding:88px 36px}
.mom-g{position:absolute;width:460px;height:460px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,${ch}0f 0%,transparent 65%);animation:glow 9s ease-in-out infinite;pointer-events:none}
.mom-in{position:relative;z-index:2;text-align:center;max-width:390px}
.mom-o{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:200;font-style:italic;color:${ch}38;line-height:1;margin-bottom:-4px}
.mom-q{font-family:'Cormorant Garamond',serif;font-size:clamp(21px,6.5vw,30px);font-weight:300;font-style:italic;color:var(--cream);line-height:1.7}
.mom-q em{color:${chlt}}
.mom-a{font-family:'Montserrat',sans-serif;font-size:9px;font-weight:300;letter-spacing:.44em;color:${ch};text-transform:uppercase;margin-top:22px}

/* Details */
.det{background:${tc.bg};padding:88px 26px}
.dh{font-family:'Cinzel',serif;font-size:clamp(22px,7vw,32px);font-weight:400;letter-spacing:.1em;color:var(--cream);text-align:center;text-transform:uppercase;margin-bottom:40px}
.dlist{max-width:380px;margin:0 auto;display:flex;flex-direction:column}
.drow{display:flex;align-items:flex-start;gap:15px;padding:18px 0;border-bottom:1px solid ${ch}11}
.drow:first-child{border-top:1px solid ${ch}11}
.dic{width:33px;height:33px;flex-shrink:0;border-radius:50%;border:1px solid ${ch}2a;display:flex;align-items:center;justify-content:center;background:${ch}07;margin-top:2px;font-size:13px}
.dtg{font-family:'Montserrat',sans-serif;font-size:7px;font-weight:300;letter-spacing:.4em;text-transform:uppercase;color:${ch};margin-bottom:3px}
.dv{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:300;color:var(--cream);line-height:1.35}
.dv small{display:block;font-size:13px;color:rgba(248,240,224,.38);font-style:italic;margin-top:1px}

/* Location dual cards */
.loc{background:${tc.bg2};padding:72px 20px}
.lh{font-family:'Cinzel',serif;font-size:clamp(20px,6vw,28px);font-weight:400;letter-spacing:.1em;color:var(--cream);text-align:center;text-transform:uppercase;margin-bottom:28px}
.lcards{max-width:420px;margin:0 auto;display:flex;flex-direction:column;gap:14px}
.lcard{background:${ch}06;border:1px solid ${ch}18;border-radius:16px;overflow:hidden}
.lcard-hdr{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:${ch}0a;border-bottom:1px solid ${ch}12}
.lcard-map{height:120px;position:relative;background:linear-gradient(135deg,#0f1520,#1a2030,#0f1520);display:flex;align-items:center;justify-content:center;overflow:hidden}
.lcard-map::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 28px,${ch}04 28px,${ch}04 29px),repeating-linear-gradient(90deg,transparent,transparent 28px,${ch}04 28px,${ch}04 29px)}
.lcard-map::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 28%,rgba(0,0,0,.6) 100%)}
.lpw{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center}
.lpd{width:13px;height:13px;background:${ch};border-radius:50%;animation:ppin 2.5s ease-in-out infinite}
.lpl{width:1px;height:22px;background:linear-gradient(${ch},transparent)}
.ltype{font-family:'Montserrat',sans-serif;font-size:8px;font-weight:400;letter-spacing:.4em;text-transform:uppercase;color:${ch}}
.ltime{font-family:'Cinzel',serif;font-size:13px;font-weight:400;color:var(--cream);letter-spacing:.06em}
.lvenue{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:300;font-style:italic;color:var(--cream);padding:14px 20px 6px}
.lbtn{display:flex;align-items:center;justify-content:center;gap:8px;margin:8px 16px 16px;padding:12px 24px;border-radius:100px;border:1px solid ${ch}30;background:${ch}07;font-family:'Montserrat',sans-serif;font-size:8px;font-weight:300;letter-spacing:.38em;color:${ch};text-transform:uppercase;text-decoration:none;transition:all .4s}
.lbtn:hover{background:${ch}12;border-color:${ch};transform:translateY(-2px)}
.lbtn2{border-color:${ch}18;color:${ch}aa}

/* Gifts */
.gifts{background:${tc.bg};padding:88px 32px;text-align:center}
.gm{font-family:'Cormorant Garamond',serif;font-size:clamp(17px,5vw,23px);font-weight:300;font-style:italic;color:var(--dim);line-height:1.8;max-width:340px;margin:0 auto 32px}
.gopts{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;max-width:340px;margin:0 auto}
.gopt{flex:1;min-width:136px;padding:18px 14px;border-radius:12px;border:1px solid ${ch}14;background:${ch}04;display:flex;flex-direction:column;align-items:center;gap:9px;text-decoration:none;cursor:pointer;transition:all .5s cubic-bezier(.16,1,.3,1)}
.gopt:hover{border-color:${ch}33;transform:translateY(-5px);box-shadow:0 16px 44px ${ch}12}
.gico{width:38px;height:38px;border-radius:50%;border:1px solid ${ch}1a;display:flex;align-items:center;justify-content:center;font-size:15px;background:${ch}05}
.glbl{font-family:'Montserrat',sans-serif;font-size:8px;font-weight:300;letter-spacing:.36em;color:${ch};text-transform:uppercase}
.gsub{font-family:'Cormorant Garamond',serif;font-size:13px;font-style:italic;color:rgba(248,240,224,.28)}

/* RSVP */
.rsvp{position:relative;background:${tc.bg2};padding:88px 36px;text-align:center;overflow:hidden}
.rsvp-g{position:absolute;width:460px;height:460px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,${ch}07 0%,transparent 65%);animation:glow 8s ease-in-out infinite;pointer-events:none}
.rdead{display:inline-block;padding:7px 20px;border:1px solid ${ch}18;border-radius:100px;font-family:'Montserrat',sans-serif;font-size:8px;font-weight:300;letter-spacing:.38em;color:${ch};text-transform:uppercase;margin-bottom:24px;background:${ch}04}
.rt{font-family:'Cinzel',serif;font-size:clamp(22px,8vw,32px);font-weight:400;letter-spacing:.08em;color:var(--cream);text-transform:uppercase;margin-bottom:10px}
.rs{font-family:'Montserrat',sans-serif;font-size:12px;font-weight:300;line-height:1.95;color:var(--dim);margin-bottom:34px}
.wabtn{display:inline-flex;align-items:center;gap:11px;padding:15px 36px;border-radius:100px;background:linear-gradient(135deg,#25D366,#1aaa55);font-family:'Montserrat',sans-serif;font-size:9px;font-weight:300;letter-spacing:.34em;color:#fff;text-transform:uppercase;text-decoration:none;cursor:pointer;border:none;box-shadow:0 4px 24px rgba(37,211,102,.22);transition:all .4s}
.wabtn:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 10px 38px rgba(37,211,102,.36)}
.wabtn svg{width:18px;height:18px}

/* Closing */
#closing{position:relative;height:100svh;min-height:640px;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden}
.clp{position:absolute;inset:0;z-index:0}
.clov1{position:absolute;inset:0;z-index:1;background:linear-gradient(to bottom,rgba(0,0,0,.42) 0%,rgba(0,0,0,.16) 38%,rgba(0,0,0,.52) 78%,rgba(0,0,0,.95) 100%)}
.clov2{position:absolute;inset:0;z-index:2;background:radial-gradient(ellipse 90% 90% at 50% 50%,transparent 44%,rgba(0,0,0,.58) 100%)}
.clglow{position:absolute;width:460px;height:460px;top:50%;left:50%;transform:translate(-50%,-50%);background:radial-gradient(circle,${ch}0f 0%,transparent 65%);z-index:3;animation:glow 10s ease-in-out infinite;pointer-events:none}
#floats{position:absolute;inset:0;z-index:4;pointer-events:none;overflow:hidden}
.fe{position:absolute;pointer-events:none;opacity:0;animation:float linear infinite}
.clc{position:relative;z-index:5;text-align:center;padding:0 32px;max-width:420px}
.cle{font-family:'Montserrat',sans-serif;font-size:8px;font-weight:300;letter-spacing:.5em;color:rgba(255,255,255,.4);text-transform:uppercase;margin-bottom:18px;display:block}
.cln{font-family:'Cinzel',serif;font-size:clamp(36px,12vw,58px);font-weight:400;letter-spacing:.1em;text-transform:uppercase;color:${ch};line-height:1;text-shadow:0 0 40px ${ch}88,0 0 80px ${ch}44;margin-bottom:10px}
.clm{font-family:'Montserrat',sans-serif;font-size:12px;font-weight:300;line-height:2.05;color:rgba(248,240,224,.42);margin-top:16px;margin-bottom:22px}
.clst{font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:200;font-style:italic;color:${ch};letter-spacing:.18em}

/* Brand */
.brand-sec{background:${tc.bg};padding:56px 32px;text-align:center;border-top:1px solid ${ch}10}
.brand-logo{font-family:'Cinzel',serif;font-size:16px;font-weight:500;letter-spacing:.4em;color:${ch};text-shadow:0 0 20px ${ch}55;margin-bottom:8px}
.brand-tag{font-family:'Montserrat',sans-serif;font-size:9px;font-weight:300;letter-spacing:.32em;color:${ch}66;text-transform:uppercase;margin-bottom:4px}
.brand-url{font-family:'Montserrat',sans-serif;font-size:10px;font-weight:300;letter-spacing:.12em;color:${ch}44}
.brand-heart{font-family:'Cormorant Garamond',serif;font-size:13px;font-style:italic;color:rgba(248,240,224,.28);margin-top:10px}

/* Final */
#final{background:${tc.bg};padding:52px 32px;text-align:center;border-top:1px solid ${ch}08}
.finm{font-family:'Cinzel',serif;font-size:52px;font-weight:400;letter-spacing:.1em;color:${ch};line-height:1;text-shadow:0 0 32px ${ch}44;margin-bottom:14px}
.finr{width:36px;height:1px;background:linear-gradient(90deg,transparent,${ch}88,transparent);margin:0 auto 14px}
.finc{font-family:'Montserrat',sans-serif;font-size:7px;font-weight:300;letter-spacing:.42em;color:${ch}26;text-transform:uppercase}

/* Shared utilities */
.rule{display:flex;align-items:center;gap:12px;justify-content:center;margin:16px 0}
.rule::before,.rule::after{content:'';flex:1;max-width:52px;height:1px;background:linear-gradient(90deg,transparent,${ch}66)}
.rule::after{background:linear-gradient(90deg,${ch}66,transparent)}
.rd{width:4px;height:4px;border-radius:50%;background:${ch};box-shadow:0 0 6px ${ch}}
.lbl{display:inline-block;font-family:'Montserrat',sans-serif;font-size:8px;font-weight:300;letter-spacing:.44em;text-transform:uppercase;color:${ch};margin-bottom:12px}
`;
}
