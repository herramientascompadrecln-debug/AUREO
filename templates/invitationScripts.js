/* ── AUREO · templates/invitationScripts.js ─────────────────────
   Returns the inline <script> content for the generated invitation.
   Isolated here so animation logic never bleeds into the generator.
─────────────────────────────────────────────────────────────── */

function buildInvitationScripts({ d, tgtDate, galSlides, hasAudio, ch }) {
  const targetMs = tgtDate.getTime();

  const audioBlock = hasAudio ? `
let aud=document.getElementById('aud'), pl=false;
const bars=document.querySelectorAll('.eq');
function tgm(){
  if(!aud)return;
  if(pl){aud.pause();bars.forEach(b=>b.classList.add('off'))}
  else  {aud.play().catch(()=>{});bars.forEach(b=>b.classList.remove('off'))}
  pl=!pl;
}` : 'function tgm(){}';

  const floatColors = `'${ch}'`;

  return `
/* ── Scroll reveal ── */
const els=document.querySelectorAll('.sr');
const obs=new IntersectionObserver(e=>{
  e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('v');obs.unobserve(x.target)}})
},{threshold:.1});
els.forEach(el=>obs.observe(el));

/* ── Progress bar ── */
window.addEventListener('scroll',()=>{
  const p=document.getElementById('prog');
  if(p) p.style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';
},{passive:true});

/* ── Countdown ── */
const T=new Date(${targetMs});
const pad=n=>String(n).padStart(2,'0');
function tick(){
  const diff=T-new Date();
  const el=id=>document.getElementById(id);
  if(diff<=0){['cdd','cdh','cdm','cds'].forEach(id=>{const e=el(id);if(e)e.textContent='00'});return}
  if(el('cdd'))el('cdd').textContent=pad(Math.floor(diff/86400000));
  if(el('cdh'))el('cdh').textContent=pad(Math.floor((diff%86400000)/3600000));
  if(el('cdm'))el('cdm').textContent=pad(Math.floor((diff%3600000)/60000));
  if(el('cds'))el('cds').textContent=pad(Math.floor((diff%60000)/1000));
}
tick();setInterval(tick,1000);

/* ── Reel gallery dots ── */
const rc=document.getElementById('rcon');
const rd=document.querySelectorAll('.rdot');
if(rc&&rd.length){
  rc.addEventListener('scroll',()=>{
    const i=Math.round(rc.scrollTop/(rc.clientHeight||1));
    rd.forEach((d,j)=>d.classList.toggle('on',j===i));
  },{passive:true});
}

/* ── Hero parallax ── */
window.addEventListener('scroll',()=>{
  const h=document.getElementById('hero');
  if(!h||window.scrollY>h.offsetHeight)return;
  const p=h.querySelector('img');
  if(p) p.style.transform='scale(1.07) translateY('+(window.scrollY*.22)+'px)';
},{passive:true});

/* ── Closing floating particles ── */
const fc=document.getElementById('floats');
const sy=['✦','·','✧','⋆','◦','✩'];
function sf(){
  if(!fc)return;
  const e=document.createElement('div');
  e.className='fe';
  e.textContent=sy[Math.floor(Math.random()*sy.length)];
  e.style.cssText='left:'+Math.random()*100+'%;bottom:-20px;font-size:'
    +(Math.random()*9+8)+'px;color:'+${floatColors}
    +(Math.random()*.35+.08).toFixed(2)+';animation-duration:'
    +(Math.random()*8+8)+'s;animation-delay:'+(Math.random()*2)+'s;';
  fc.appendChild(e);
  setTimeout(()=>e.remove(),20000);
}
const co=new IntersectionObserver(e=>{
  if(e[0].isIntersecting){
    for(let i=0;i<8;i++)setTimeout(sf,i*300);
    const iv=setInterval(sf,700);
    co.disconnect();
    setTimeout(()=>clearInterval(iv),26000);
  }
},{threshold:.2});
const cl=document.getElementById('closing');
if(cl)co.observe(cl);

/* ── Music ── */
${audioBlock}

/* ══════════════════════════════════════════════════════════════
   AUREO LIVE PREVIEW BRIDGE
   Receives postMessage patches from the editor (parent window).
   Applies surgical DOM updates — never re-renders.
   Keys mirror livePreview._buildPayload() in livePreview.js.
══════════════════════════════════════════════════════════════ */
(function(){
  /* Countdown target — kept in module scope so bridge can update it */
  let _T = new Date(${targetMs});
  /* Re-use existing tick, restart interval on target change */
  let _cdInterval = setInterval(tick, 1000);

  /* ── Tiny helpers ── */
  const el  = id => document.getElementById(id);
  const txt = (id, val) => { const e=el(id); if(e&&val!=null) e.textContent=val; };
  const src = (id, val) => { const e=el(id); if(e&&val) e.src=val; };
  const show = (sel, on) => {
    document.querySelectorAll(sel).forEach(e => {
      e.style.display = on ? '' : 'none';
    });
  };

  /* ── Patch map: key → function(value) ── */
  const PATCHES = {

    /* Names */
    n1: v => {
      document.querySelectorAll('.hname:first-of-type, .cln').forEach(e => {
        if(e.id==='closing'||e.closest('#closing')) return;
        // avoid overwriting the combined closing name
      });
      /* Hero names */
      const heroNames = document.querySelectorAll('#hero .hname');
      if(heroNames[0]) heroNames[0].textContent = v;
      /* Closing name (cln contains n1 & n2) */
      const cln = el('cln') || document.querySelector('.cln');
      if(cln) {
        const n2El = cln.querySelector ? null : null; // handled via names key
      }
      /* Title */
      document.title = v;
    },

    n2: v => {
      const heroNames = document.querySelectorAll('#hero .hname');
      if(heroNames[1]) heroNames[1].textContent = v;
      const amp = document.querySelector('#hero .hamp');
      if(amp) amp.style.display = v ? '' : 'none';
    },

    names: v => {
      /* Moment attribution */
      const momA = document.querySelector('.mom-a');
      if(momA) momA.textContent = v;
      /* Closing combined name */
      const cln = document.querySelector('.cln');
      if(cln) {
        const pts = v.split(/&|y/i).map(s=>s.trim());
        const n1 = pts[0]||v, n2 = pts[1]||'';
        cln.innerHTML = n1 + (n2 ? ' <span>&amp;</span> ' + n2 : '');
      }
      /* Final monogram */
      const finm = document.querySelector('.finm');
      if(finm) {
        const pts = v.split(/&|y/i).map(s=>s.trim());
        finm.textContent = ((pts[0]||'')[0]||'') + ((pts[1]||'')[0]||'');
      }
    },

    dateDisplay: v => {
      /* Hero date */
      const hdate = document.querySelector('.hdate');
      if(hdate) hdate.textContent = v;
      /* Intro pill */
      const pill = document.querySelector('.ipill');
      if(pill) pill.textContent = v;
      /* Closing stamp */
      const clst = document.querySelector('.clst');
      if(clst) clst.textContent = v;
      /* Final credit */
      const finc = document.querySelector('.finc');
      // keep existing — too granular to update here
    },

    countdownMs: v => {
      /* Update countdown target and restart interval */
      _T = new Date(v);
      clearInterval(_cdInterval);
      tick();
      _cdInterval = setInterval(tick, 1000);
      /* Redefine tick to use new _T */
    },

    v1: v => {
      /* Details section ceremony venue */
      const drows = document.querySelectorAll('.det .drow');
      drows.forEach(row => {
        const tag = row.querySelector('.dtg');
        if(tag && tag.textContent.trim().toLowerCase().includes('ceremonia')) {
          const val = row.querySelector('.dv');
          if(val) {
            const small = val.querySelector('small');
            val.childNodes[0].textContent = v || '';
            // preserve <small>
          }
        }
      });
      /* Location card venue name */
      const lvenueEls = document.querySelectorAll('.lcard .lvenue');
      if(lvenueEls[0]) lvenueEls[0].textContent = v || '';
    },

    t1: v => {
      /* Location card ceremony time */
      const ltimes = document.querySelectorAll('.lcard .ltime');
      if(ltimes[0]) ltimes[0].textContent = v + ' hrs';
      /* Details small */
      const drows = document.querySelectorAll('.det .drow');
      drows.forEach(row => {
        const tag = row.querySelector('.dtg');
        if(tag && tag.textContent.trim().toLowerCase().includes('ceremonia')) {
          const small = row.querySelector('.dv small');
          if(small) small.textContent = v + ' hrs';
        }
      });
    },

    v2: v => {
      const lvenueEls = document.querySelectorAll('.lcard .lvenue');
      if(lvenueEls[1]) lvenueEls[1].textContent = v || '';
      /* Details reception */
      const drows = document.querySelectorAll('.det .drow');
      drows.forEach(row => {
        const tag = row.querySelector('.dtg');
        if(tag && tag.textContent.trim().toLowerCase().includes('recepci')) {
          const val = row.querySelector('.dv');
          if(val) val.childNodes[0].textContent = v || '';
        }
      });
    },

    t2: v => {
      const ltimes = document.querySelectorAll('.lcard .ltime');
      if(ltimes[1]) ltimes[1].textContent = v + ' hrs';
      const drows = document.querySelectorAll('.det .drow');
      drows.forEach(row => {
        const tag = row.querySelector('.dtg');
        if(tag && tag.textContent.trim().toLowerCase().includes('recepci')) {
          const small = row.querySelector('.dv small');
          if(small) small.textContent = v + ' hrs';
        }
      });
    },

    dress: v => {
      const drows = document.querySelectorAll('.det .drow');
      drows.forEach(row => {
        const tag = row.querySelector('.dtg');
        if(tag && tag.textContent.trim().toLowerCase().includes('dress')) {
          const val = row.querySelector('.dv');
          if(val) val.textContent = v || '';
        }
      });
    },

    waLink: v => {
      document.querySelectorAll('.wabtn').forEach(btn => { btn.href = v; });
    },

    frase: v => {
      const ih = document.querySelector('.ih');
      if(ih && v) ih.innerHTML = v;
    },

    gm: v => {
      const gmEl = document.querySelector('.gm');
      if(gmEl) gmEl.textContent = v || '';
    },

    gl: v => {
      const goptFirst = document.querySelector('.gopt');
      if(goptFirst) goptFirst.href = v || '#';
    },

    /* Section visibility */
    sec: v => {
      /* Gallery */
      const reelSec = document.querySelector('.reel-sec');
      if(reelSec) reelSec.style.display = v.gallery ? '' : 'none';
      /* Location */
      const locSec = document.querySelector('.loc');
      if(locSec) locSec.style.display = v.location ? '' : 'none';
      /* Gifts */
      const giftsSec = document.querySelector('.gifts');
      if(giftsSec) giftsSec.style.display = v.gifts ? '' : 'none';
      /* RSVP */
      const rsvpSec = document.querySelector('.rsvp');
      if(rsvpSec) rsvpSec.style.display = v.rsvp ? '' : 'none';
      /* Countdown */
      const cdWrap = document.querySelector('.hcd-wrap');
      if(cdWrap) cdWrap.style.display = v.countdown ? '' : 'none';
    },

    /* Hero photo */
    heroSrc: v => {
      const hphoto = document.querySelector('#hero .hphoto img, #hero .hphoto div');
      if(v) {
        /* Already an img — update src */
        let img = document.querySelector('#hero .hphoto img');
        if(img) {
          img.src = v;
        } else {
          /* Replace placeholder div with real img */
          const wrap = document.querySelector('#hero .hphoto');
          if(wrap) {
            const newImg = document.createElement('img');
            newImg.src = v;
            newImg.style.cssText = 'width:100%;height:100%;object-fit:cover;object-position:center top;filter:brightness(.68) contrast(1.1) saturate(.78);animation:hfloat 16s ease-in-out infinite alternate';
            wrap.innerHTML = '';
            wrap.appendChild(newImg);
          }
        }
      }
    },

    /* Closing photo */
    closingSrc: v => {
      if(v) {
        let img = document.querySelector('#closing .clp img');
        if(img) {
          img.src = v;
        } else {
          const wrap = document.querySelector('#closing .clp');
          if(wrap) {
            const newImg = document.createElement('img');
            newImg.src = v;
            newImg.style.cssText = 'width:100%;height:100%;object-fit:cover;filter:brightness(.55) contrast(1.06) saturate(.72)';
            wrap.innerHTML = '';
            wrap.appendChild(newImg);
          }
        }
      }
    },

    /* Gallery photos — FIX: robust placeholder detection + new slide injection */
    gallerySrcs: v => {
      if(!v || !v.length) return;
      const rcon = document.getElementById('rcon');
      if(!rcon) return;

      const imgStyle = 'width:100%;height:100%;object-fit:cover;filter:brightness(.78) contrast(1.08) saturate(.78)';

      v.forEach((srcUrl, i) => {
        let slide = rcon.querySelectorAll('.rslide')[i];

        /* If slide doesn't exist yet, create it */
        if(!slide) {
          slide = document.createElement('div');
          slide.className = 'rslide';
          slide.innerHTML = '<div class="rov"></div><div class="rcap"><div class="rct">Momento ' + (i+1) + '</div></div>';
          rcon.appendChild(slide);
          /* Add a dot */
          const dotsEl = document.getElementById('rdots');
          if(dotsEl){const d=document.createElement('div');d.className='rdot';dotsEl.appendChild(d);}
        }

        /* Swap or inject image */
        let img = slide.querySelector('img');
        if(img) {
          img.src = srcUrl;
        } else {
          /* Remove any placeholder div (first child that is not .rov or .rcap) */
          const ph = Array.from(slide.children).find(c =>
            !c.classList.contains('rov') && !c.classList.contains('rcap')
          );
          const newImg = document.createElement('img');
          newImg.style.cssText = imgStyle;
          newImg.src = srcUrl;
          if(ph) ph.replaceWith(newImg);
          else slide.prepend(newImg);
        }
      });
    },

    /* Audio — FIX: inject <audio> + music button if absent, then swap src */
    audioSrc: v => {
      if(!v) return;

      let aud = document.getElementById('aud');

      /* Element missing — invitation was built without audio, inject it */
      if(!aud) {
        aud = document.createElement('audio');
        aud.id = 'aud';
        aud.loop = true;
        aud.preload = 'auto';
        document.body.appendChild(aud);
      }

      /* Update source */
      let srcEl = aud.querySelector('source');
      if(!srcEl) { srcEl = document.createElement('source'); aud.appendChild(srcEl); }
      srcEl.src = v;
      srcEl.type = 'audio/mpeg';
      aud.load();

      /* Inject music button if absent */
      if(!document.getElementById('mb')) {
        const mb = document.createElement('button');
        mb.id = 'mb';
        mb.setAttribute('aria-label','Música');
        mb.setAttribute('onclick','tgm()');
        mb.style.cssText = 'position:fixed;bottom:22px;right:18px;z-index:9999;width:44px;height:44px;border-radius:50%;border:1px solid rgba(200,169,110,.3);background:rgba(12,10,20,.86);backdrop-filter:blur(14px);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:2px;transition:all .4s';
        for(let i=0;i<5;i++){
          const bar=document.createElement('div');
          bar.className='eq off';
          bar.style.cssText='width:2px;border-radius:2px;background:var(--ch,#c8a96e);animation:eqb .7s ease-in-out infinite alternate';
          const h=['6px','12px','9px','14px','7px'][i];
          const delay=['0s','.12s','.24s','.08s','.18s'][i];
          bar.style.height=h; bar.style.animationDelay=delay;
          mb.appendChild(bar);
        }
        document.body.appendChild(mb);

        /* Inject tgm if not defined */
        if(typeof tgm === 'undefined' || tgm.toString().includes('{}')) {
          window.tgm = function(){
            const a=document.getElementById('aud');
            const bars=document.querySelectorAll('.eq');
            if(!a)return;
            if(a.paused){a.play().catch(()=>{});bars.forEach(b=>b.classList.remove('off'))}
            else{a.pause();bars.forEach(b=>b.classList.add('off'))}
          };
        }
      }
    },
  };

  /* Redefine tick to use module-scoped _T */
  function tick(){
    const diff = _T - new Date();
    const $ = id => document.getElementById(id);
    const pad = n => String(n).padStart(2,'0');
    if(diff<=0){['cdd','cdh','cdm','cds'].forEach(id=>{const e=$(id);if(e)e.textContent='00'});return}
    if($('cdd'))$('cdd').textContent=pad(Math.floor(diff/86400000));
    if($('cdh'))$('cdh').textContent=pad(Math.floor((diff%86400000)/3600000));
    if($('cdm'))$('cdm').textContent=pad(Math.floor((diff%3600000)/60000));
    if($('cds'))$('cds').textContent=pad(Math.floor((diff%60000)/1000));
  }

  /* ── postMessage listener ── */
  window.addEventListener('message', e => {
    if(!e.data || e.data.type !== 'AUREO_UPDATE') return;
    const payload = e.data.payload || {};
    /* Apply each patched key */
    for(const [key, val] of Object.entries(payload)){
      if(PATCHES[key]) {
        try { PATCHES[key](val); }
        catch(err){ /* silent — never break animations */ }
      }
    }
  });

  /* ── Signal ready to parent ── */
  window.parent.postMessage({ type: 'AUREO_READY' }, '*');

})();
`;
}
