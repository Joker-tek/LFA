function load(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function applyTheme(){let t=load('sf_set',{}).theme||'dark';
 if(t==='auto')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
 document.documentElement.dataset.theme=t;return t}
applyTheme();
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
const INTERESTS=['utazás','zene','sport','film','főzés','természet','könyvek','humor','fotózás','játékok'];
const GENRES=['pop','rock','hip-hop','elektronikus','jazz','klasszikus','népzene','metál'];

/* ---- HANG (WebAudio, nincs külső fájl) ---- */
let AC,master,bus,amb=null;
function ac(){if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=0;master.connect(AC.destination);bus=AC.createGain();bus.gain.value=.6;bus.connect(AC.destination)}
 if(AC.state==='suspended')AC.resume();return AC}
function startAmb(){if(amb)return;const a=ac();amb=[];
 const lp=a.createBiquadFilter();lp.type='lowpass';lp.frequency.value=520;lp.connect(master);
 [110,164.81,220,261.63,329.63].forEach((f,i)=>{const o=a.createOscillator();o.type=i%2?'sine':'triangle';o.frequency.value=f;o.detune.value=(i-2)*7;
  const g=a.createGain();g.gain.value=.1;const l=a.createOscillator();l.frequency.value=.05+i*.027;const lg=a.createGain();lg.gain.value=.07;
  l.connect(lg);lg.connect(g.gain);o.connect(g);g.connect(lp);o.start();l.start();amb.push(o,l)});
 master.gain.cancelScheduledValues(a.currentTime);master.gain.linearRampToValueAtTime(.3,a.currentTime+3)}
function stopAmb(){if(!amb)return;const o=amb;amb=null;master.gain.linearRampToValueAtTime(0,AC.currentTime+1);setTimeout(()=>o.forEach(x=>{try{x.stop()}catch(e){}}),1200)}
function sfx(t){if(!load('sf_set',{}).sound)return;const a=ac(),now=a.currentTime;
 const tone=(f,t0,d,ty,v,f2)=>{const o=a.createOscillator(),g=a.createGain();o.type=ty;o.frequency.setValueAtTime(f,now+t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,now+t0+d);
  g.gain.setValueAtTime(0,now+t0);g.gain.linearRampToValueAtTime(v,now+t0+.01);g.gain.exponentialRampToValueAtTime(.0001,now+t0+d);o.connect(g);g.connect(bus);o.start(now+t0);o.stop(now+t0+d+.05)};
 if(t==='yes'){tone(659,0,.5,'sine',.25);tone(988,.08,.6,'sine',.22);tone(1319,.16,.9,'triangle',.15)}
 else if(t==='no'){tone(180,0,.35,'sine',.3,55)}
 else if(t==='match'){[523,659,784,1047,1319].forEach((f,i)=>tone(f,i*.11,.9,'sine',.2))}
 else tone(520,0,.12,'triangle',.12,780)}
function setSound(on){const s=load('sf_set',{});s.sound=on;save('sf_set',s);on?startAmb():stopAmb();const b=document.getElementById('snd');if(b){b.setAttribute('aria-pressed',on);b.textContent=on?'♪ Hang: be':'♪ Hang: ki'}}

/* ---- EFFEKT: szívek és szikrák ---- */
function burst(x,y,kind){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const n=kind==='yes'?20:kind==='no'?12:7;
 for(let i=0;i<n;i++){const s=document.createElement('span');
  s.textContent=kind==='yes'?(i%3?'♥':'✦'):'•';
  s.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;z-index:99;pointer-events:none;font-size:'+(12+Math.random()*16)+'px;color:'+(kind==='no'?'#8a6a6a':(i%2?'#E0314F':'#D4B16A'));
  document.body.appendChild(s);const a=Math.random()*6.28,d=50+Math.random()*(kind==='spark'?50:120),dy=Math.sin(a)*d-(kind==='yes'?70:kind==='no'?-50:0);
  s.animate([{transform:'translate(-50%,-50%) scale(.5)',opacity:1},{transform:'translate(calc(-50% + '+Math.cos(a)*d+'px),calc(-50% + '+dy+'px)) scale(1.3)',opacity:0}],{duration:700+Math.random()*500,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>s.remove()}}
document.addEventListener('click',e=>{const b=e.target.closest('.btn,.chip');if(!b||b.dataset.fx)return;sfx('click');burst(e.clientX,e.clientY,'spark')});

document.addEventListener('DOMContentLoaded',()=>{
 /* gombok a menüben */
 const nav=document.querySelector('nav');
 if(nav){nav.insertAdjacentHTML('afterbegin','<button class="chip" id="thm" data-fx="1" aria-label="Világos vagy sötét mód">☀</button><button class="chip" id="snd" data-fx="1" aria-pressed="false">♪ Hang: ki</button>');
  const th=document.getElementById('thm');const lab=()=>{th.textContent=document.documentElement.dataset.theme==='dark'?'☀ Világos':'☾ Sötét'};lab();
  th.onclick=()=>{const s=load('sf_set',{});s.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';save('sf_set',s);applyTheme();lab();sfx('click')};
  document.getElementById('snd').onclick=()=>setSound(!load('sf_set',{}).sound);
  if(load('sf_set',{}).sound){const b=document.getElementById('snd');b.setAttribute('aria-pressed','true');b.textContent='♪ Hang: be'}}
 addEventListener('pointerdown',()=>{if(load('sf_set',{}).sound&&!amb)startAmb()},{once:true});
 /* reklámhelyek */
 const ad='<div class="ad"><div><b>Hirdetés</b>Itt lehet a te reklámod</div></div>';
 document.body.insertAdjacentHTML('beforeend','<aside class="ad-rail l" aria-label="Hirdetés">'+ad+'</aside><aside class="ad-rail r" aria-label="Hirdetés">'+ad+'</aside><div id="glow"></div><svg class="scroll-thread" viewBox="0 0 24 1000" preserveAspectRatio="none" aria-hidden="true"><path id="tbase" fill="none" stroke="currentColor" stroke-opacity=".18" stroke-width="2" vector-effect="non-scaling-stroke"/><path id="tpath" fill="none" stroke="#E0314F" stroke-width="3" stroke-linecap="round" vector-effect="non-scaling-stroke"/><circle id="tdot" r="6" fill="#E0314F"/></svg>');
 const w=document.querySelector('.wrap');if(w)w.insertAdjacentHTML('beforeend','<div class="ad ad-bar"><div><b>Hirdetés</b>Itt lehet a te reklámod</div></div>');
 /* mozgó vörös fonal görgetésre */
 let d='M12 0';for(let y=0;y<1000;y+=125){const s=(y/125)%2?-1:1;d+=' C '+(12+s*10)+' '+(y+40)+', '+(12-s*10)+' '+(y+85)+', 12 '+(y+125)}
 const p=document.getElementById('tpath'),base=document.getElementById('tbase'),dot=document.getElementById('tdot');
 p.setAttribute('d',d);base.setAttribute('d',d);const L=p.getTotalLength();p.style.strokeDasharray=L;
 let tick=false;const upd=()=>{tick=false;const m=document.documentElement.scrollHeight-innerHeight;const k=m>0?Math.min(1,Math.max(0,scrollY/m)):0;
  p.style.strokeDashoffset=L*(1-k);const pt=p.getPointAtLength(L*k);dot.setAttribute('cx',pt.x);dot.setAttribute('cy',pt.y)};
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);upd();
 /* fény az egér körül */
 const g=document.getElementById('glow');addEventListener('pointermove',e=>{g.style.transform='translate('+(e.clientX-250)+'px,'+(e.clientY-250)+'px)'},{passive:true});
});
