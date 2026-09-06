(function(){
  "use strict";
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth < 760;

  // ---------- Creature palette (procedural SVG "cute blob" builder) ----------
  function svgEl(tag, attrs){
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for(const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  function faceGroup(eyeStyle, mouthStyle, cx, cy, scale, blush){
    const g = svgEl('g', {});
    const eyeOffsets = [[-11,0],[11,0]];
    eyeOffsets.forEach(([dx,dy])=>{
      if(eyeStyle==='sleepy'){
        g.appendChild(svgEl('path',{d:`M ${cx+dx-6} ${cy+dy} Q ${cx+dx} ${cy+dy+4} ${cx+dx+6} ${cy+dy}`,stroke:'#4a3b42','stroke-width':2.4,fill:'none','stroke-linecap':'round',class:'eye-sleepy'}));
      } else {
        const eye = svgEl('circle',{cx:cx+dx, cy:cy+dy, r:4.6*scale, fill:'#3d2f38', stroke:'none', class:'eye'});
        g.appendChild(eye);
        g.appendChild(svgEl('circle',{cx:cx+dx-1.4, cy:cy+dy-1.4, r:1.4*scale, fill:'#fff', stroke:'none'}));
      }
    });
    if(blush){
      g.appendChild(svgEl('ellipse',{cx:cx-16,cy:cy+8,rx:5,ry:3.2,fill:'#ffb6c8',opacity:'0.7',stroke:'none'}));
      g.appendChild(svgEl('ellipse',{cx:cx+16,cy:cy+8,rx:5,ry:3.2,fill:'#ffb6c8',opacity:'0.7',stroke:'none'}));
    }
    if(mouthStyle==='smile'){
      g.appendChild(svgEl('path',{d:`M ${cx-6} ${cy+9} Q ${cx} ${cy+14} ${cx+6} ${cy+9}`,stroke:'#4a3b42','stroke-width':2,fill:'none','stroke-linecap':'round'}));
    } else if(mouthStyle==='laugh'){
      g.appendChild(svgEl('ellipse',{cx:cx,cy:cy+11,rx:6,ry:4,fill:'#7a4a55',stroke:'none'}));
    }
    return g;
  }

  function buildCat(colors, eyeStyle, mouthStyle){
    const svg = svgEl('svg',{width:96,height:96,viewBox:'0 0 96 96'});
    const g = svgEl('g',{stroke:'#8a5a68','stroke-width':'1.6','stroke-linejoin':'round'});
    g.appendChild(svgEl('path',{d:'M 30 34 L 24 16 L 40 30 Z', fill:colors.body}));
    g.appendChild(svgEl('path',{d:'M 66 34 L 72 16 L 56 30 Z', fill:colors.body}));
    g.appendChild(svgEl('path',{d:'M 30 33 L 27 22 L 36 30 Z', fill:colors.inner,stroke:'none'}));
    g.appendChild(svgEl('path',{d:'M 66 33 L 69 22 L 60 30 Z', fill:colors.inner,stroke:'none'}));
    g.appendChild(svgEl('ellipse',{cx:48,cy:56,rx:30,ry:26,fill:colors.body,class:'body-shape'}));
    if(colors.pattern){
      g.appendChild(svgEl('ellipse',{cx:34,cy:44,rx:6,ry:8,fill:colors.pattern,opacity:'0.55'}));
      g.appendChild(svgEl('ellipse',{cx:62,cy:50,rx:5,ry:7,fill:colors.pattern,opacity:'0.55'}));
    }
    g.appendChild(faceGroup(eyeStyle||'normal',mouthStyle||'smile',48,58,1,true));
    [-1,1].forEach(side=>{
      for(let i=0;i<2;i++){
        g.appendChild(svgEl('line',{x1:48+side*16,y1:60+i*4,x2:48+side*30,y2:56+i*6,stroke:'#c9a9b3','stroke-width':1.4,'stroke-linecap':'round'}));
      }
    });
    g.appendChild(svgEl('ellipse',{cx:34,cy:80,rx:8,ry:6,fill:colors.body}));
    g.appendChild(svgEl('ellipse',{cx:62,cy:80,rx:8,ry:6,fill:colors.body}));
    g.appendChild(svgEl('path',{d:'M 76 66 Q 92 60 88 40', stroke:colors.body,'stroke-width':9,fill:'none','stroke-linecap':'round', class:'tail'}));
    svg.appendChild(g);
    return svg;
  }

  function buildPanda(eyeStyle, mouthStyle){
    const svg = svgEl('svg',{width:104,height:104,viewBox:'0 0 104 104'});
    const g = svgEl('g',{stroke:'#8a5a68','stroke-width':'1.6','stroke-linejoin':'round'});
    g.appendChild(svgEl('circle',{cx:28,cy:24,r:13,fill:'#3a3540'}));
    g.appendChild(svgEl('circle',{cx:76,cy:24,r:13,fill:'#3a3540'}));
    g.appendChild(svgEl('ellipse',{cx:52,cy:60,rx:32,ry:29,fill:'#fdfcf9'}));
    g.appendChild(svgEl('ellipse',{cx:33,cy:56,rx:11,ry:14,fill:'#3a3540',opacity:'0.92'}));
    g.appendChild(svgEl('ellipse',{cx:71,cy:56,rx:11,ry:14,fill:'#3a3540',opacity:'0.92'}));
    g.appendChild(faceGroup(eyeStyle||'normal',mouthStyle||'smile',52,64,1,true));
    g.appendChild(svgEl('ellipse',{cx:36,cy:88,rx:9,ry:7,fill:'#3a3540'}));
    g.appendChild(svgEl('ellipse',{cx:68,cy:88,rx:9,ry:7,fill:'#3a3540'}));
    svg.appendChild(g);
    return svg;
  }

  function buildBunny(colors, eyeStyle, mouthStyle){
    const svg = svgEl('svg',{width:80,height:96,viewBox:'0 0 80 96'});
    const g = svgEl('g',{class:'bunny-ears',stroke:'#8a5a68','stroke-width':'1.6','stroke-linejoin':'round'});
    g.appendChild(svgEl('ellipse',{cx:30,cy:18,rx:8,ry:22,fill:colors.body, class:'ear-l'}));
    g.appendChild(svgEl('ellipse',{cx:50,cy:18,rx:8,ry:22,fill:colors.body, class:'ear-r'}));
    g.appendChild(svgEl('ellipse',{cx:30,cy:18,rx:4,ry:15,fill:'#ffd6e0',stroke:'none'}));
    g.appendChild(svgEl('ellipse',{cx:50,cy:18,rx:4,ry:15,fill:'#ffd6e0',stroke:'none'}));
    g.appendChild(svgEl('ellipse',{cx:40,cy:62,rx:26,ry:24,fill:colors.body}));
    g.appendChild(faceGroup(eyeStyle||'normal',mouthStyle||'smile',40,64,0.9,true));
    svg.appendChild(g);
    return svg;
  }

  function buildBird(color, mouthStyle){
    const svg = svgEl('svg',{width:64,height:64,viewBox:'0 0 64 64'});
    const g = svgEl('g',{stroke:'#8a5a68','stroke-width':'1.6','stroke-linejoin':'round'});
    g.appendChild(svgEl('ellipse',{cx:32,cy:36,rx:18,ry:16,fill:color}));
    g.appendChild(svgEl('path',{d:'M 8 32 Q -4 30 6 22 Q 16 26 20 34 Z', fill:color, class:'wing'}));
    g.appendChild(svgEl('path',{d:'M 30 26 L 22 20 L 30 22 Z', fill:'#f2a154'}));
    g.appendChild(faceGroup('normal',mouthStyle,34,32,0.6,false));
    svg.appendChild(g);
    return svg;
  }

  function buildFlower(color){
    const svg = svgEl('svg',{width:52,height:52,viewBox:'0 0 52 52'});
    const g = svgEl('g',{stroke:'#8a5a68','stroke-width':'1.2','stroke-linejoin':'round'});
    for(let i=0;i<5;i++){
      const ang = i*72;
      const petal = svgEl('ellipse',{cx:26,cy:12,rx:8,ry:12,fill:color, transform:`rotate(${ang} 26 26)`});
      g.appendChild(petal);
    }
    g.appendChild(svgEl('circle',{cx:26,cy:26,r:7,fill:'#fbd35e'}));
    svg.appendChild(g);
    return svg;
  }

  function buildMonster(kind, mouthStyle){
    const palettes = {
      electric: {body:'#fbe36a', dark:'#e8b93a'},
      water: {body:'#9fd8f5', dark:'#6bb8de'},
      fire: {body:'#ff9d6c', dark:'#e8703c'},
      sleepy: {body:'#f3b8d6', dark:'#e191bb'},
      grass: {body:'#a8e0b0', dark:'#6bc27f'},
      shadow: {body:'#c9b8e8', dark:'#9a80cf'}
    };
    const c = palettes[kind];
    const svg = svgEl('svg',{width:70,height:70,viewBox:'0 0 70 70'});
    const g = svgEl('g',{stroke:'#8a5a68','stroke-width':'1.6','stroke-linejoin':'round'});
    g.appendChild(svgEl('circle',{cx:35,cy:38,r:24,fill:c.body}));
    g.appendChild(svgEl('path',{d:'M 20 20 L 14 6 L 26 16 Z', fill:c.dark}));
    g.appendChild(svgEl('path',{d:'M 50 20 L 56 6 L 44 16 Z', fill:c.dark}));
    g.appendChild(faceGroup(kind==='sleepy'?'sleepy':'normal',mouthStyle||'smile',35,40,0.85,true));
    svg.appendChild(g);
    return svg;
  }

  const CAT_BODIES = ['#f6d9c4','#efe6dd','#e8935a','#fbeee3','#d9c7f0','#c7e3f5','#f5c1c9','#e0d4b8','#3a3540','#f7e6b8'];
  const BUNNY_BODIES = ['#ffffff','#f6e3d8','#f3d0c8','#e9d9f7','#d8ecf7','#f9e2ea'];
  const BIRD_BODIES = ['#f2a154','#8ec7e8','#f2716b','#c9a6ef','#8fd9b6','#f7d35e'];
  const FLOWER_BODIES = ['#ffb6c8','#ffd27a','#c9a6ef','#ff9db0','#a8e0c4','#9ecbf0'];
  const MOUTHS = ['smile','laugh'];
  const EYES = ['normal','normal','normal','sleepy'];

  // cheap "grounding" shadow baked as a plain SVG shape (no CSS filter!) —
  // a drop-shadow filter on ~300 animating elements is what made scroll feel broken.
  function withShadow(svg){
    const vb = svg.getAttribute('viewBox').split(' ').map(Number);
    const w = vb[2], h = vb[3];
    const shadow = svgEl('ellipse',{cx:w/2, cy:h*0.93, rx:w*0.3, ry:h*0.06, fill:'#5a4048', opacity:'0.16'});
    svg.insertBefore(shadow, svg.firstChild);
    return svg;
  }

  const builders = {
    cat: ()=>withShadow(buildCat({body:pick(CAT_BODIES), inner:pick(['#ffc9d6','#ffe0b0','#d9f0e6']), pattern: Math.random()>0.45?pick(['#d98a55','#8a6ad9','#5aa8c9']):null}, pick(EYES), pick(MOUTHS))),
    panda: ()=>withShadow(buildPanda(pick(EYES), pick(MOUTHS))),
    bunny: ()=>withShadow(buildBunny({body:pick(BUNNY_BODIES)}, pick(EYES), pick(MOUTHS))),
    bird: ()=>withShadow(buildBird(pick(BIRD_BODIES), pick(MOUTHS))),
    flower: ()=>withShadow(buildFlower(pick(FLOWER_BODIES))),
    monster: ()=>withShadow(buildMonster(pick(['electric','water','fire','sleepy','grass','shadow']), pick(MOUTHS)))
  };

  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function rand(min,max){ return min + Math.random()*(max-min); }
  function clamp01(v){ return Math.max(0,Math.min(1,v)); }

  const TYPES = ['cat','cat','cat','panda','panda','bunny','bird','flower','flower','monster'];
  const behaviors = ['breathe','bounce','sway','rotate','wave','bob'];

  function generateCreatures(cols, rows){
    const list = [];
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        const type = pick(TYPES);
        const depthLayer = pick(['back','mid','front','front']);
        const depth = depthLayer==='back'? rand(0.15,0.35) : depthLayer==='mid'? rand(0.4,0.65) : rand(0.7,1);

        const cellW = 1/cols, cellH = 1/rows;
        const jx = (c+0.5)*cellW + rand(-0.6,0.6)*cellW;
        const jy = (r+0.5)*cellH + rand(-0.6,0.6)*cellH;
        const x = clamp01(jx);
        const y = clamp01(jy);

        list.push({
          type, depthLayer, depth,
          x, y,
          scale: depthLayer==='back'? rand(0.55,0.8) : depthLayer==='mid'? rand(0.85,1.15) : rand(1.15,1.7),
          rotation: rand(-20,20),
          behavior: pick(behaviors),
          phase: rand(0,Math.PI*2),
          speed: rand(0.7,1.4),
          exitDistance: rand(1.0,1.8) * (depthLayer==='front'?1.3:1),
          curveBend: rand(-70,70),
          exitRotation: rand(-150,150),
          delay: rand(0,0.22),
          blurAtExit: depthLayer==='back'? rand(1,2.4):0,
        });
      }
    }
    for(let i=list.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [list[i],list[j]] = [list[j],list[i]];
    }
    return list;
  }

  const world = document.getElementById('world');
  const gridCols = isMobile ? 10 : 20;
  const gridRows = isMobile ? 10 : 15;
  const creatures = generateCreatures(gridCols, gridRows);

  const nodes = creatures.map(cfg=>{
    const el = document.createElement('div');
    el.className = 'creature hoverable';
    el.style.zIndex = Math.round(cfg.depth*100);
    el.style.left = `${cfg.x*100}vw`;
    el.style.top = `${cfg.y*100}vh`;
    const svg = builders[cfg.type]();
    const size = 90*cfg.scale;
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    el.appendChild(svg);
    world.appendChild(el);

    el.addEventListener('mouseenter', ()=>{
      if(reduceMotion) return;
      svg.style.transform = 'scale(1.12)';
      svg.style.transition = 'transform .25s cubic-bezier(.34,1.6,.64,1)';
      const heart = document.createElement('div');
      heart.textContent = '♡';
      heart.className = 'heart-pop';
      heart.style.color = '#e88aa8';
      el.appendChild(heart);
      requestAnimationFrame(()=>{
        heart.style.transition = 'all 0.9s ease-out';
        heart.style.opacity = '1';
        heart.style.transform = 'translate(-50%,-30px) scale(1)';
      });
      setTimeout(()=>{
        heart.style.opacity='0';
        setTimeout(()=>heart.remove(),400);
      },500);
    });
    el.addEventListener('mouseleave', ()=>{
      svg.style.transform = 'scale(1)';
    });

    return {cfg, el, svg};
  });

  // ---------- Scroll progress engine ----------
  const scrollSpace = document.getElementById('scrollSpace');
  let scrollProgress = 0;
  let smoothProgress = 0;
  let mouseX = 0.5, mouseY = 0.5;
  let targetMouseX = 0.5, targetMouseY = 0.5;

  function updateScrollProgress(){
    const doc = document.documentElement;
    const scrollTop = window.pageYOffset || doc.scrollTop || document.body.scrollTop || 0;
    const total = scrollSpace.offsetHeight - window.innerHeight;
    const raw = total>0 ? scrollTop/total : 0;
    scrollProgress = clamp01(raw);
  }
  window.addEventListener('scroll', updateScrollProgress, {passive:true});
  window.addEventListener('resize', updateScrollProgress);
  window.addEventListener('wheel', function(){ /* ensure a scroll event always fires even on trackpads that batch */ }, {passive:true});

  window.addEventListener('mousemove', (e)=>{
    targetMouseX = e.clientX/window.innerWidth;
    targetMouseY = e.clientY/window.innerHeight;
    const glow = document.getElementById('cursorGlow');
    glow.style.left = e.clientX+'px';
    glow.style.top = e.clientY+'px';
    glow.classList.add('show');
  }, {passive:true});

  function easeOutCubic(t){ return 1 - Math.pow(1-t,3); }
  function smoothstep(a,b,x){
    const t = clamp01((x-a)/(b-a));
    return t*t*(3-2*t);
  }

  const hint = document.getElementById('hint');
  const centerGlow = document.getElementById('center-glow');
  const sorryWrap = document.getElementById('sorryWrap');
  const sorryText = document.getElementById('sorryText');
  const penTip = document.getElementById('penTip');

  // particle sparkles around center
  const sparkleEls = [];
  const sparkleCount = isMobile? 10:22;
  for(let i=0;i<sparkleCount;i++){
    const s = document.createElement('div');
    s.className = 'sparkle';
    const ang = rand(0,Math.PI*2);
    const rad = rand(0.08,0.28);
    s.dataset.ang = ang;
    s.dataset.rad = rad;
    s.dataset.phase = rand(0,Math.PI*2);
    document.getElementById('stage').appendChild(s);
    sparkleEls.push(s);
  }

  let sparkleBurstDone = false;
  function burstSparkles(){
    if(sparkleBurstDone) return;
    sparkleBurstDone = true;
    sparkleEls.forEach((s,i)=>{
      setTimeout(()=>{
        s.style.transition = 'transform 1s cubic-bezier(.2,.8,.3,1), opacity 1s ease';
        const ang = parseFloat(s.dataset.ang);
        s.style.transform += ` translate(${Math.cos(ang)*40}px, ${Math.sin(ang)*40}px) scale(1.6)`;
      }, i*18);
    });
  }

  let t = 0;
  function tick(){
    t += 0.016;
    smoothProgress += (scrollProgress - smoothProgress) * (reduceMotion?1:0.09);
    mouseX += (targetMouseX-mouseX)*0.06;
    mouseY += (targetMouseY-mouseY)*0.06;

    const p = smoothProgress;

    if(p>0.02) hint.classList.add('hide');

    document.getElementById('bg').style.filter = `saturate(${1-p*0.15}) brightness(${1+p*0.06})`;

    const reveal = smoothstep(0.08, 0.62, p);
    const glowIn = smoothstep(0.45, 0.72, p);
    const writeStart = 0.66, writeEnd = 0.94;

    centerGlow.style.opacity = glowIn*0.95;
    centerGlow.style.transform = `translate(-50%,-50%) scale(${0.3+glowIn*0.9})`;

    // "handwriting" reveal: a left-to-right clip-path wipe over the cursive text,
    // with a glowing pen-tip that rides the leading edge.
    const writeT = smoothstep(writeStart, writeEnd, p);
    const revealPct = (1-writeT)*100;
    sorryText.style.clipPath = `inset(0 ${revealPct}% 0 0)`;
    sorryText.style.webkitClipPath = `inset(0 ${revealPct}% 0 0)`;
    sorryText.style.opacity = writeT>0.01 ? 1 : 0;

    if(writeT>0.01 && writeT<0.995){
      const rect = sorryText.getBoundingClientRect();
      penTip.style.opacity = String(0.9*Math.sin(Math.min(writeT,1-writeT)*Math.PI*0.5+0.3));
      penTip.style.left = (writeT*rect.width) + 'px';
    } else {
      penTip.style.opacity = '0';
    }

    if(p>writeEnd-0.01){
      burstSparkles();
      sorryWrap.classList.add('settled');
    } else {
      sorryWrap.classList.remove('settled');
    }

    sparkleEls.forEach(s=>{
      const ang = parseFloat(s.dataset.ang) + t*0.15;
      const rad = parseFloat(s.dataset.rad) * (1+Math.sin(t*0.6+parseFloat(s.dataset.phase))*0.15);
      const cx = window.innerWidth*0.5 + Math.cos(ang)*rad*Math.min(window.innerWidth,window.innerHeight);
      const cy = window.innerHeight*0.5 + Math.sin(ang)*rad*Math.min(window.innerWidth,window.innerHeight);
      s.style.left = cx+'px';
      s.style.top = cy+'px';
      s.style.opacity = (glowIn*0.9*(0.5+0.5*Math.sin(t*1.3+parseFloat(s.dataset.phase)))).toFixed(2);
    });

    const cx = 0.5, cy = 0.5;
    nodes.forEach(({cfg, el})=>{
      const dx = cfg.x - cx, dy = cfg.y - cy;
      const dist = Math.max(0.001, Math.hypot(dx,dy));
      const dirX = dx/dist, dirY = dy/dist;

      const localReveal = clamp01((reveal - cfg.delay) / (1-cfg.delay));
      const eased = easeOutCubic(localReveal);

      const travel = eased * cfg.exitDistance * 55;
      const bend = Math.sin(localReveal*Math.PI) * cfg.curveBend * 0.01;
      const perpX = -dirY, perpY = dirX;

      const moveX = dirX*travel + perpX*bend*40;
      const moveY = dirY*travel + perpY*bend*40;

      let idleX=0, idleY=0, idleRot=0, idleScale=1;
      if(!reduceMotion){
        const ph = t*cfg.speed + cfg.phase;
        switch(cfg.behavior){
          case 'breathe': idleScale = 1+Math.sin(ph)*0.035; break;
          case 'bounce': idleY = Math.abs(Math.sin(ph*1.4))* -4; break;
          case 'sway': idleRot = Math.sin(ph)*6; break;
          case 'rotate': idleRot = (t*10*cfg.speed*0.3)%360; break;
          case 'wave': idleRot = Math.sin(ph*2)*4; idleY = Math.sin(ph)*2; break;
          case 'bob': idleY = Math.sin(ph)*3; idleX = Math.cos(ph*0.7)*2; break;
        }
      }

      const parallaxStrength = (cfg.depthLayer==='front'?18: cfg.depthLayer==='mid'?9:3);
      const parX = (mouseX-0.5)*parallaxStrength;
      const parY = (mouseY-0.5)*parallaxStrength;

      const totalRot = cfg.rotation + idleRot + eased*cfg.exitRotation;
      const totalScale = cfg.scale*idleScale*(1-eased*0.12);
      const blur = cfg.blurAtExit*eased;
      const depthZ = cfg.depthLayer==='back'? -200:0;

      const op = (1 - eased*0.15*(cfg.depthLayer==='back'?1:0.3));
      const tf = `translate(-50%,-50%) translate3d(${(moveX+idleX+parX).toFixed(2)}px, ${(moveY+idleY+parY).toFixed(2)}px, ${depthZ}px) rotate(${totalRot.toFixed(2)}deg) scale(${totalScale.toFixed(3)})`;
      if(blur>0.05){
        el.style.cssText = `left:${cfg.x*100}vw;top:${cfg.y*100}vh;z-index:${el.style.zIndex};opacity:${op};filter:blur(${blur.toFixed(2)}px);transform:${tf}`;
      } else {
        el.style.opacity = op;
        el.style.transform = tf;
      }
    });

    requestAnimationFrame(tick);
  }

  window.addEventListener('load', ()=>{
    setTimeout(()=>{
      const l = document.getElementById('loading');
      l.classList.add('gone');
      setTimeout(()=>l.remove(), 800);
    }, 500);
  });

  updateScrollProgress();
  requestAnimationFrame(tick);

  if(reduceMotion){
    const cg = document.getElementById('cursorGlow');
    if(cg) cg.remove();
  }
})();
