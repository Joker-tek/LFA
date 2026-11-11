function load(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
const SET=()=>load('sf_set',{});
function applyTheme(){let t=SET().theme||'dark';
 if(t==='auto')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
 document.documentElement.dataset.theme=t;return t}
applyTheme();
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

/* ---- kitalált profilok: név, kor, km, bemutatkozás, érdeklődés, zene, szín, lájkolt-e téged, nem, kedvenc étel, foglalkozás ---- */
const PEOPLE=[
['Anna',27,3,'Hegyekben nyaralok, otthon főzök. Olyat keresek, akivel lehet nevetni.',['utazás','főzés','természet'],['pop','népzene'],'#B3122E',1,'f','lecsó','tanár'],
['Bence',29,8,'Kosárlabda, gitár, jó beszélgetés egy pohár tea mellett.',['sport','zene','humor'],['rock','jazz'],'#6E0B1D',0,'m','gulyásleves','programozó'],
['Réka',25,5,'Fényképezek, kávét iszom, és mindig van nálam egy könyv.',['fotózás','könyvek','utazás'],['elektronikus','pop'],'#8C1530',1,'f','sushi','grafikus'],
['Dani',31,12,'Kerékpár, sütés, régi filmek. Vasárnap a legjobb nap.',['sport','film','főzés'],['rock','metál'],'#4A0A15',0,'m','töltött káposzta','pék'],
['Lilla',26,2,'Koncertek, könyvek, hosszú esti séták a városban.',['zene','könyvek','film'],['jazz','klasszikus'],'#A3162F',0,'f','carbonara','zenetanár'],
['Márk',30,15,'Futok, utazom, nyelveket tanulok. Hirtelen ötletekre mindig nyitott vagyok.',['sport','utazás','játékok'],['hip-hop','elektronikus'],'#5C0C1B',1,'m','ramen','építész'],
['Zsófi',28,6,'Zongorázom, süteményt sütök, és szeretem a csendes estéket.',['zene','főzés','természet'],['klasszikus','jazz'],'#C21F3B',0,'f','somlói','orvos'],
['Tamás',32,9,'Túrák, fotózás, vasárnapi főzés a barátokkal.',['természet','fotózás','főzés'],['népzene','rock'],'#7A0F22',0,'m','grillezett hal','fotós'],
['Eszter',24,4,'Szeretem a mély beszélgetéseket, a jó kávét és a nyári zivatarokat.',['könyvek','természet','humor'],['pop','jazz'],'#9E1030',1,'f','tiramisu','pszichológus'],
['Gergő',33,20,'Hétköznap mérnök, hétvégén túrázó. Jó társaságban bármit megbeszélek.',['túrázás','technika','sport'],['rock','elektronikus'],'#6A0E1E',1,'m','pizza','mérnök'],
['Vivien',29,7,'Kreatív vagyok, szeretek új helyeket felfedezni és új ízeket kipróbálni.',['utazás','divat','főzés'],['pop','hip-hop'],'#B81D3A',0,'f','avokádós pirítós','marketinges'],
['Kristóf',27,11,'Kézzel dolgozom, de szeretek olvasni is. Őszinte vagyok, és hűséges.',['autók','könyvek','film'],['rock','népzene'],'#520A18',0,'m','rántott hús','villanyszerelő']];
const liked=()=>load('sf_liked',[]),passed=()=>load('sf_passed',[]);
const today=()=>new Date().toISOString().slice(0,10);
const prem=()=>load('sf_premium',false);
const used=()=>{const d=load('sf_likes',{});return d.day===today()?d.n:0};
const cap=()=>prem()?Infinity:100;
function addLike(p){const L=liked();if(!L.includes(p[0])){L.push(p[0]);save('sf_liked',L)}save('sf_likes',{day:today(),n:used()+1})}
function addPass(p){const L=passed();if(!L.includes(p[0])){L.push(p[0]);save('sf_passed',L)}}
const pending=()=>PEOPLE.filter(p=>p[7]&&!liked().includes(p[0])&&!passed().includes(p[0]));

/* ---- hang: csak gombokhoz, a beállításokban kikapcsolható ---- */
let AC,bus;
function sfx(t){const s=SET();if(s.sound===false)return;
 try{if(!AC){AC=new (window.AudioContext||window.webkitAudioContext)();bus=AC.createGain();bus.connect(AC.destination)}
 if(AC.state==='suspended')AC.resume();bus.gain.value=((s.vol==null?60:s.vol)/100)*.9;
 const now=AC.currentTime;
 const tone=(f,t0,d,ty,v,f2)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=ty;o.frequency.setValueAtTime(f,now+t0);if(f2)o.frequency.exponentialRampToValueAtTime(f2,now+t0+d);
  g.gain.setValueAtTime(0,now+t0);g.gain.linearRampToValueAtTime(v,now+t0+.01);g.gain.exponentialRampToValueAtTime(.0001,now+t0+d);o.connect(g);g.connect(bus);o.start(now+t0);o.stop(now+t0+d+.05)};
 if(t==='yes'){tone(659,0,.5,'sine',.25);tone(988,.08,.6,'sine',.22);tone(1319,.16,.9,'triangle',.15)}
 else if(t==='no'){tone(180,0,.35,'sine',.3,55)}
 else if(t==='match'){[523,659,784,1047,1319].forEach((f,i)=>tone(f,i*.11,.9,'sine',.2))}
 else tone(520,0,.12,'triangle',.12,780)}catch(e){}}

/* ---- effekt: szívek és szikrák ---- */
function burst(x,y,kind){if(SET().fx===false||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const n=kind==='yes'?20:kind==='no'?12:7;
 for(let i=0;i<n;i++){const s=document.createElement('span');
  s.textContent=kind==='yes'?(i%3?'♥':'✦'):'•';
  s.style.cssText='position:fixed;left:'+x+'px;top:'+y+'px;z-index:99;pointer-events:none;font-size:'+(12+Math.random()*16)+'px;color:'+(kind==='no'?'#8a6a6a':(i%2?'#E0314F':'#D4B16A'));
  document.body.appendChild(s);const a=Math.random()*6.28,d=50+Math.random()*(kind==='spark'?50:120),dy=Math.sin(a)*d-(kind==='yes'?70:kind==='no'?-50:0);
  s.animate([{transform:'translate(-50%,-50%) scale(.5)',opacity:1},{transform:'translate(calc(-50% + '+Math.cos(a)*d+'px),calc(-50% + '+dy+'px)) scale(1.3)',opacity:0}],{duration:700+Math.random()*500,easing:'cubic-bezier(.2,.8,.3,1)'}).onfinish=()=>s.remove()}}
document.addEventListener('click',e=>{const b=e.target.closest('.btn,.chip');if(!b||b.dataset.fx)return;sfx('click');burst(e.clientX,e.clientY,'spark')});
function match(p){sfx('match');
 const o=document.createElement('div');o.className='overlay';
 o.innerHTML='<div><h2>Egyezés!</h2><p>Te és '+esc(p[0])+' kölcsönösen tetszetek egymásnak.</p><p style="margin-top:20px"><button class="btn" data-fx="1">Tovább</button></p></div>';
 o.querySelector('button').onclick=()=>o.remove();document.body.appendChild(o);burst(innerWidth/2,innerHeight/2,'yes')}

document.addEventListener('DOMContentLoaded',()=>{
 /* menü */
 const nav=document.querySelector('nav'),cur=location.pathname.split('/').pop()||'index.html',n=pending().length;
 if(nav){nav.innerHTML=[['index.html','Ismerkedés'],['likeok.html','Ki likeolt?'],['profil.html','Profil'],['beallitasok.html','Beállítások'],['premium.html','Premium']]
  .map(([h,t])=>'<a href="'+h+'"'+(cur===h?' aria-current="page"':'')+'>'+t+(h==='likeok.html'&&n?' <span class="dot">'+n+'</span>':'')+'</a>').join('')+'<a class="btn" href="belepes.html">Belépés</a>'}
 /* reklámhelyek */
 const ad='<div class="ad"><div><b>Hirdetés</b>Itt lehet a te reklámod</div></div>';
 document.body.insertAdjacentHTML('beforeend','<aside class="ad-rail l" aria-label="Hirdetés">'+ad+'</aside><aside class="ad-rail r" aria-label="Hirdetés">'+ad+'</aside><div id="glow"></div><div id="thr"><svg id="tsvg" aria-hidden="true"><path id="tbase" fill="none" stroke="currentColor" stroke-opacity=".3" stroke-width="2"/><path id="tpath" fill="none" stroke="#FF2D55" stroke-width="5" stroke-linecap="round"/></svg><div id="tdot"></div></div>');
 const w=document.querySelector('.wrap');if(w)w.insertAdjacentHTML('beforeend','<div class="ad ad-bar"><div><b>Hirdetés</b>Itt lehet a te reklámod</div></div>');
 /* vörös fonal: az oldal teljes hosszában fut, a vége pontosan a görgetést követi */
 const docH=()=>Math.max(w?w.offsetTop+w.offsetHeight:0,innerHeight);
 const thr=document.getElementById('thr'),svg=document.getElementById('tsvg'),p=document.getElementById('tpath'),base=document.getElementById('tbase'),dot=document.getElementById('tdot');
 let H=0,L=1,W=0;
 function build(h){H=h;thr.style.height=h+'px';svg.setAttribute('width',36);svg.setAttribute('height',h);svg.setAttribute('viewBox','0 0 36 '+h);
  const mob=innerWidth<700,cx=mob?10:18,am=mob?5:14;let d='M'+cx+' 0';for(let y=0;y<h;y+=160){const s=(y/160)%2?-1:1;d+=' C '+(cx+s*am)+' '+(y+50)+', '+(cx-s*am)+' '+(y+110)+', '+cx+' '+(y+160)}
  p.setAttribute('d',d);base.setAttribute('d',d);L=p.getTotalLength()}
 let tick=false;
 const upd=()=>{tick=false;const h=docH();if(Math.abs(h-H)>2||W!==innerWidth){W=innerWidth;build(h)}
  const m=h-innerHeight,k=m>0?Math.min(1,Math.max(0,scrollY/m)):0,tip=scrollY+innerHeight*(.2+.6*k),f=Math.min(1,Math.max(0,tip/h));
  const tipLen=L*f,seg=Math.min(L,(innerWidth<700?220:340)*L/h),start=Math.max(0,tipLen-seg);p.style.strokeDasharray=seg+' '+L;p.style.strokeDashoffset=-start;const pt=p.getPointAtLength(Math.max(.1,tipLen));dot.style.transform='translate('+(4+pt.x)+'px,'+pt.y+'px)'};
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd);addEventListener('load',upd);upd();
 const g=document.getElementById('glow');addEventListener('pointermove',e=>{g.style.transform='translate('+(e.clientX-250)+'px,'+(e.clientY-250)+'px)'},{passive:true});
});
