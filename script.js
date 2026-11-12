function load(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
const SET=()=>load('sf_set',{});
function applyTheme(){let t=SET().theme||'dark';
 if(t==='auto')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
 document.documentElement.dataset.theme=t;return t}
applyTheme();
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

/* ---- kitalált profilok ----
   A kulcsok ugyanazok, mint a profil.html mezői, így a fonal közvetlenül össze tudja őket hasonlítani a te profiloddal.
   lajkolt: 1 = már lájkolt téged; nem: f/m; valaszok: a minta-beszélgetés válaszai, sorban. */
const PEOPLE=[
{nev:'Anna',kor:27,km:3,nem:'f',lajkolt:1,szin:'#B3122E',foglalkozas:'tanár',kedvenc_etel:'lecsó',
 bio:'Hegyekben nyaralok, otthon főzök. Olyat keresek, akivel lehet nevetni.',
 hobbik:['utazás','főzés','természet'],zene:['pop','népzene'],keresem:'Komoly kapcsolatot',gyerek:'Nincs, de szeretnék',
 dohany:'Nem dohányzom',alkohol:'Társaságban',alvas:'Korán kelő',szeretet:'Együtt töltött idő',idojaras:'Nyár',etrend:'Mindenevő',
 konyha:['magyar','olasz'],ital:['tea','bor'],hetvege:['kirándulok','családdal vagyok'],humor:['helyzetkomikum','kedves'],
 elsorandi:'Piknik a hegyen, termoszban forró teával.',
 valaszok:['Szia! De jó, hogy írtál 😊','Épp a hétvégi kirándulást tervezem. Te merre szoktál menni?','Akkor egyszer muszáj lesz együtt mennünk. A teát én viszem!']},
{nev:'Bence',kor:29,km:8,nem:'m',lajkolt:0,szin:'#6E0B1D',foglalkozas:'programozó',kedvenc_etel:'gulyásleves',
 bio:'Kosárlabda, gitár, jó beszélgetés egy pohár tea mellett.',
 hobbik:['sport','zene','humor'],zene:['rock','jazz'],keresem:'Ismerkedést',gyerek:'Nyitott vagyok rá',
 dohany:'Nem dohányzom',alkohol:'Társaságban',alvas:'Éjszakai bagoly',szeretet:'Kedves szavak',idojaras:'Tél',etrend:'Mindenevő',
 konyha:['magyar','grill'],ital:['tea','sör'],hetvege:['sportolok','bulizok'],humor:['szarkasztikus','szójátékos'],
 elsorandi:'Egy kosármeccs, utána vacsora.'},
{nev:'Réka',kor:25,km:5,nem:'f',lajkolt:1,szin:'#8C1530',foglalkozas:'grafikus',kedvenc_etel:'sushi',
 bio:'Fényképezek, kávét iszom, és mindig van nálam egy könyv.',
 hobbik:['fotózás','könyvek','utazás'],zene:['elektronikus','pop'],keresem:'Komoly kapcsolatot',gyerek:'Nyitott vagyok rá',
 dohany:'Nem dohányzom',alkohol:'Ritkán',alvas:'Éjszakai bagoly',szeretet:'Együtt töltött idő',idojaras:'Ősz',etrend:'Pescetáriánus',
 konyha:['ázsiai'],ital:['kávé','tea'],hetvege:['alkotok','utazom'],humor:['önironikus','kedves'],
 elsorandi:'Kiállítás, utána egy csendes kávézó.',
 valaszok:['Szia! Ez nagyon jólesett 🙂','Most épp egy plakáton dolgozom, de egy kávé mindig belefér. Te milyet iszol?','Tudok egy kis kávézót, ahol könyvek vannak a falakon. Egyszer megmutatom!']},
{nev:'Dani',kor:31,km:12,nem:'m',lajkolt:0,szin:'#4A0A15',foglalkozas:'pék',kedvenc_etel:'töltött káposzta',
 bio:'Kerékpár, sütés, régi filmek. Vasárnap a legjobb nap.',
 hobbik:['sport','film','főzés'],zene:['rock','metál'],keresem:'Komoly kapcsolatot',gyerek:'Nincs, de szeretnék',
 dohany:'Alkalmanként',alkohol:'Társaságban',alvas:'Korán kelő',szeretet:'Segítség, szívesség',idojaras:'Tél',etrend:'Mindenevő',
 konyha:['magyar'],ital:['kávé','sör'],hetvege:['otthon pihenek','sportolok'],humor:['fekete humor'],
 elsorandi:'Hajnali friss kifli a pékségből, aztán egy régi film.'},
{nev:'Lilla',kor:26,km:2,nem:'f',lajkolt:0,szin:'#A3162F',foglalkozas:'zenetanár',kedvenc_etel:'carbonara',
 bio:'Koncertek, könyvek, hosszú esti séták a városban.',
 hobbik:['zene','könyvek','film'],zene:['jazz','klasszikus'],keresem:'Komoly kapcsolatot',gyerek:'Nincs, de szeretnék',
 dohany:'Nem dohányzom',alkohol:'Ritkán',alvas:'Éjszakai bagoly',szeretet:'Kedves szavak',idojaras:'Ősz',etrend:'Mindenevő',
 konyha:['olasz'],ital:['bor','tea'],hetvege:['otthon pihenek','alkotok'],humor:['szójátékos','kedves'],
 elsorandi:'Jazzklub, ahol beszélgetni is lehet.'},
{nev:'Márk',kor:30,km:15,nem:'m',lajkolt:1,szin:'#5C0C1B',foglalkozas:'építész',kedvenc_etel:'ramen',
 bio:'Futok, utazom, nyelveket tanulok. Hirtelen ötletekre mindig nyitott vagyok.',
 hobbik:['sport','utazás','játékok'],zene:['hip-hop','elektronikus'],keresem:'Ismerkedést',gyerek:'Nyitott vagyok rá',
 dohany:'Nem dohányzom',alkohol:'Társaságban',alvas:'Korán kelő',szeretet:'Együtt töltött idő',idojaras:'Tavasz',etrend:'Mindenevő',
 konyha:['ázsiai','mexikói'],ital:['kávé','koktél'],hetvege:['utazom','sportolok','bulizok'],humor:['helyzetkomikum','szarkasztikus'],
 elsorandi:'Egy hirtelen ötlet: vonattal a legközelebbi városba.',
 valaszok:['Hali! Na végre 😄','Most jöttem futásból. Te mit csinálsz ma este?','Mit szólnál egy ramenhez a héten? Tudok egy jó helyet.']},
{nev:'Zsófi',kor:28,km:6,nem:'f',lajkolt:0,szin:'#C21F3B',foglalkozas:'orvos',kedvenc_etel:'somlói',
 bio:'Zongorázom, süteményt sütök, és szeretem a csendes estéket.',
 hobbik:['zene','főzés','természet'],zene:['klasszikus','jazz'],keresem:'Komoly kapcsolatot',gyerek:'Nincs, de szeretnék',
 dohany:'Nem dohányzom',alkohol:'Ritkán',alvas:'Korán kelő',szeretet:'Érintés',idojaras:'Tavasz',etrend:'Vegetáriánus',
 konyha:['olasz','görög'],ital:['tea','víz'],hetvege:['otthon pihenek','kirándulok'],humor:['kedves'],
 elsorandi:'Közös főzés, utána egy kis zongora.'},
{nev:'Tamás',kor:32,km:9,nem:'m',lajkolt:0,szin:'#7A0F22',foglalkozas:'fotós',kedvenc_etel:'grillezett hal',
 bio:'Túrák, fotózás, vasárnapi főzés a barátokkal.',
 hobbik:['természet','fotózás','főzés'],zene:['népzene','rock'],keresem:'Komoly kapcsolatot',gyerek:'Van és még szeretnék',
 dohany:'Nem dohányzom',alkohol:'Társaságban',alvas:'Korán kelő',szeretet:'Segítség, szívesség',idojaras:'Ősz',etrend:'Pescetáriánus',
 konyha:['tengeri','grill','görög'],ital:['kávé','pálinka'],hetvege:['kirándulok','családdal vagyok'],humor:['helyzetkomikum'],
 elsorandi:'Napfelkelte-fotózás a hegyen.'},
{nev:'Eszter',kor:24,km:4,nem:'f',lajkolt:1,szin:'#9E1030',foglalkozas:'pszichológus',kedvenc_etel:'tiramisu',
 bio:'Szeretem a mély beszélgetéseket, a jó kávét és a nyári zivatarokat.',
 hobbik:['könyvek','természet','humor'],zene:['pop','jazz'],keresem:'Még nem tudom',gyerek:'Nyitott vagyok rá',
 dohany:'Nem dohányzom',alkohol:'Ritkán',alvas:'Éjszakai bagoly',szeretet:'Kedves szavak',idojaras:'Nyár',etrend:'Vegetáriánus',
 konyha:['olasz','indiai'],ital:['kávé','tea'],hetvege:['otthon pihenek','kirándulok'],humor:['önironikus','szójátékos'],
 elsorandi:'Hosszú séta olyan kérdésekkel, amikre nincs kész válasz.',
 valaszok:['Szia! Ez kedves volt 🙂','Mondok egy kérdést: min nevettél utoljára igazán jót?','Ez tetszik. Folytassuk egy kávé mellett?']},
{nev:'Gergő',kor:33,km:20,nem:'m',lajkolt:1,szin:'#6A0E1E',foglalkozas:'mérnök',kedvenc_etel:'pizza',
 bio:'Hétköznap mérnök, hétvégén túrázó. Jó társaságban bármit megbeszélek.',
 hobbik:['túrázás','technika','sport'],zene:['rock','elektronikus'],keresem:'Komoly kapcsolatot',gyerek:'Nincs, de szeretnék',
 dohany:'Nem dohányzom',alkohol:'Társaságban',alvas:'Korán kelő',szeretet:'Együtt töltött idő',idojaras:'Ősz',etrend:'Mindenevő',
 konyha:['olasz','grill'],ital:['kávé','sör'],hetvege:['kirándulok','sportolok'],humor:['szójátékos','helyzetkomikum'],
 elsorandi:'Rövid túra, a csúcson szendvics és jó beszélgetés.',
 valaszok:['Szia! Jó, hogy összekötött a fonal 😄','Hétvégén megyek egy túrára, már csak társ kell hozzá. Bírod a hegyet?','Akkor ezt komolyan veszem! A szendvicset én hozom.']},
{nev:'Vivien',kor:29,km:7,nem:'f',lajkolt:0,szin:'#B81D3A',foglalkozas:'marketinges',kedvenc_etel:'avokádós pirítós',
 bio:'Kreatív vagyok, szeretek új helyeket felfedezni és új ízeket kipróbálni.',
 hobbik:['utazás','divat','főzés'],zene:['pop','hip-hop'],keresem:'Ismerkedést',gyerek:'Nincs és nem is akarok',
 dohany:'Alkalmanként',alkohol:'Gyakran',alvas:'Éjszakai bagoly',szeretet:'Ajándékozás',idojaras:'Nyár',etrend:'Mindenevő',
 konyha:['mexikói','ázsiai','olasz'],ital:['koktél','kávé'],hetvege:['bulizok','utazom'],humor:['szarkasztikus'],
 elsorandi:'Tetőterasz, koktél, naplemente.'},
{nev:'Kristóf',kor:27,km:11,nem:'m',lajkolt:0,szin:'#520A18',foglalkozas:'villanyszerelő',kedvenc_etel:'rántott hús',
 bio:'Kézzel dolgozom, de szeretek olvasni is. Őszinte vagyok, és hűséges.',
 hobbik:['autók','könyvek','film'],zene:['rock','népzene'],keresem:'Komoly kapcsolatot',gyerek:'Nincs, de szeretnék',
 dohany:'Rendszeresen',alkohol:'Társaságban',alvas:'Korán kelő',szeretet:'Segítség, szívesség',idojaras:'Tél',etrend:'Mindenevő',
 konyha:['magyar'],ital:['sör','kávé'],hetvege:['otthon pihenek','családdal vagyok'],humor:['fekete humor','önironikus'],
 elsorandi:'Autós kirándulás egy régi várhoz.'}];
const liked=()=>load('sf_liked',[]),passed=()=>load('sf_passed',[]);
const today=()=>new Date().toISOString().slice(0,10);
const prem=()=>load('sf_premium',false);
const used=()=>{const d=load('sf_likes',{});return d.day===today()?d.n:0};
const cap=()=>prem()?Infinity:100;
function addLike(p){const L=liked();if(!L.includes(p.nev)){L.push(p.nev);save('sf_liked',L)}save('sf_likes',{day:today(),n:used()+1})}
function addPass(p){const L=passed();if(!L.includes(p.nev)){L.push(p.nev);save('sf_passed',L)}}
const pending=()=>PEOPLE.filter(p=>p.lajkolt&&!liked().includes(p.nev)&&!passed().includes(p.nev));

/* ---- a fonal: mennyire illik hozzád valaki ----
   A profilod és az ő válaszai alapján számol. Csak azt nézi, amit kitöltöttél: üres profilnál nincs fonal (pct=null).
   sz = közös szálak, gond = ahol szakadhat a fonal, tilt = amit kizáró oknak írtál. */
const sajat=()=>load('sf_profile',{});
const GY_IGEN=['Nincs, de szeretnék','Van és még szeretnék'],GY_NEM='Nincs és nem is akarok';
const HETVEGE={'otthon pihenek':'otthoni pihenés','kirándulok':'kirándulás','bulizok':'bulizás','utazom':'utazás','családdal vagyok':'családi hétvégék','sportolok':'hétvégi sport','alkotok':'alkotás'};
function fonal(p,m){
 m=m||sajat();let pts=0,max=0;const sz=[],gond=[],tilt=[];
 const kz=(m.kizaro||'').toLowerCase();
 if(/dohány|cigi|cigaret/.test(kz)&&p.dohany&&p.dohany!=='Nem dohányzom')tilt.push('dohányzik');
 if(/alkohol|ivás|iszik|pia/.test(kz)&&p.alkohol==='Gyakran')tilt.push('gyakran iszik');
 if(/buli/.test(kz)&&(p.hetvege||[]).includes('bulizok'))tilt.push('sokat bulizik');
 const set=(k,w,need,lab)=>{const a=m[k]||[],b=p[k]||[];if(!a.length||!b.length)return;max+=w;
  const c=b.filter(x=>a.includes(x));pts+=w*Math.min(1,c.length/need);c.forEach(x=>sz.push(lab?lab(x):x))};
 set('hobbik',20,3);set('zene',8,2,x=>'♪ '+x);set('hetvege',8,2,x=>HETVEGE[x]||x);set('ital',5,2);
 set('konyha',5,2,x=>x+' konyha');set('humor',6,2,x=>/humor|komikum/.test(x)?x:x+' humor');
 if(m.keresem&&p.keresem){max+=20;
  if(m.keresem===p.keresem){pts+=20;sz.unshift('ugyanazt keresitek')}
  else if(m.keresem==='Még nem tudom'||p.keresem==='Még nem tudom')pts+=10;
  else gond.push('mást keres: '+p.keresem.toLowerCase())}
 if(m.gyerek&&p.gyerek){max+=12;
  const ia=GY_IGEN.includes(m.gyerek),ib=GY_IGEN.includes(p.gyerek),na=m.gyerek===GY_NEM,nb=p.gyerek===GY_NEM;
  if((ia&&nb)||(na&&ib))gond.push('mást terveztek a gyerekekkel');
  else if((ia&&ib)||(na&&nb)){pts+=12;sz.push('a gyerekekről is egyet gondoltok')}
  else pts+=6}
 if(m.szeretet&&p.szeretet){max+=6;if(m.szeretet===p.szeretet){pts+=6;sz.push('közös szeretetnyelv')}}
 if(m.alvas&&p.alvas){max+=4;
  if(m.alvas===p.alvas&&m.alvas!=='Vegyes'){pts+=4;sz.push(m.alvas==='Korán kelő'?'mindketten korán keltek':'két éjszakai bagoly')}
  else if(m.alvas==='Vegyes'||p.alvas==='Vegyes')pts+=2}
 if(m.idojaras&&p.idojaras){max+=2;if(m.idojaras===p.idojaras){pts+=2;sz.push('kedvenc évszak: '+p.idojaras.toLowerCase())}}
 if(m.dohany&&p.dohany){max+=6;
  if(m.dohany===p.dohany)pts+=6;
  else if(m.dohany==='Nem dohányzom'&&p.dohany==='Rendszeresen'){if(!tilt.length)gond.push('rendszeresen dohányzik')}
  else pts+=3}
 if(m.alkohol&&p.alkohol){max+=3;if(m.alkohol==='Nem iszom'&&p.alkohol==='Gyakran'){if(!tilt.includes('gyakran iszik'))gond.push('gyakran iszik')}else pts+=m.alkohol===p.alkohol?3:1.5}
 if(m.etrend&&p.etrend){max+=3;pts+=m.etrend===p.etrend?3:1.5}
 if(!max)return {pct:null,sz:[],gond:[],tilt:[]};
 let pct=Math.round(30+69*pts/max)-10*gond.length;
 if(tilt.length)pct=Math.min(pct,25);
 return {pct:Math.max(5,Math.min(99,pct)),sz:[...new Set(sz)],gond,tilt};
}
const fonalSzo=n=>n>=80?'Erős fonal':n>=65?'Szoros szál':n>=40?'Laza szál':'Vékony szál';
/* kis vörös fonal: minél erősebb a kötődés, annál vastagabb és fényesebb */
function fonalJel(f){if(f.pct==null)return '';
 return '<span class="fonal'+(f.pct>=80?' eros':'')+'" title="Fonal-erősség: mennyire illik hozzád a profilod alapján"><svg class="szal" viewBox="0 0 64 16" aria-hidden="true"><path d="M2 8 C 12 1, 18 15, 28 8 S 38 2, 42 8 C 45 13, 38 14, 38 9 C 38 4, 46 4, 50 8 S 58 13, 62 8" fill="none" stroke="currentColor" stroke-width="'+(1+f.pct/22).toFixed(1)+'" stroke-linecap="round"/></svg><b>'+f.pct+'%</b> <span>'+fonalSzo(f.pct)+'</span></span>'}
/* minta profil, hogy profil-kitöltés nélkül is ki lehessen próbálni a fonalat */
const MINTA={nev:'Teszt Elek',kor:'28',kit:'Mindenkit',keresem:'Komoly kapcsolatot',tulaj:['humor','őszinteség','kalandvágy'],kizaro:'dohányzás',
 foglalkozas:'könyvtáros',dohany:'Nem dohányzom',alkohol:'Társaságban',edzes:'Hetente 1-2 alkalom',alvas:'Korán kelő',gyerek:'Nincs, de szeretnék',
 etrend:'Mindenevő',foz:'Szeretek főzni',kedvenc_etel:'paprikás krumpli',konyha:['magyar','olasz','ázsiai'],ital:['kávé','bor'],
 hobbik:['túrázás','főzés','kávézás','könyvek','fotózás'],zene:['jazz','indie','rock'],szemelyiseg:'Mindkettő',szeretet:'Együtt töltött idő',
 idojaras:'Ősz',humor:['szójátékos','önironikus'],hetvege:['kirándulok','otthon pihenek'],
 bio:'Hétköznap könyvek között, hétvégén a hegyekben. Jó kávé nélkül nem indul a nap.'};
function mintaProfil(){save('sf_profile',MINTA)}

/* ---- egyezések és üzenetek (minta: a válaszokat a gép írja) ---- */
const egyezesek=()=>PEOPLE.filter(p=>p.lajkolt&&liked().includes(p.nev));
const beszelgetes=n=>load('sf_chat',{})[n]||[];
function uzen(n,m){const c=load('sf_chat',{});(c[n]=c[n]||[]).push(m);save('sf_chat',c)}
const olvasatlan=n=>beszelgetes(n).filter(m=>!m.en).length-(load('sf_seen',{})[n]||0);
function olvasva(n){const s=load('sf_seen',{});s[n]=beszelgetes(n).filter(m=>!m.en).length;save('sf_seen',s)}
const ujUzenet=()=>egyezesek().filter(p=>!beszelgetes(p.nev).length||olvasatlan(p.nev)>0).length;

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
 else if(t==='msg'){tone(880,0,.25,'sine',.14);tone(1175,.09,.35,'sine',.12)}
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

/* ---- egyezés: a vörös fonal összeköti a két profilt ---- */
const SZAL_UT='M2 45 C 40 8, 70 82, 104 45 C 120 27, 146 32, 140 54 C 135 70, 106 64, 111 44 C 116 26, 150 28, 170 50 C 192 72, 214 18, 238 45';
function match(p){sfx('match');
 const m=sajat(),f=fonal(p,m),ph=load('sf_photo',null);
 const av=(bg,t,img)=>'<div class="mav"'+(img?'':' style="background:'+bg+'"')+'>'+(img?'<img src="'+img+'" alt="">':esc(t))+'</div>';
 const o=document.createElement('div');o.className='overlay';o.setAttribute('role','dialog');o.setAttribute('aria-label','Egyezés');
 o.innerHTML='<div class="mbox"><div class="pair">'+av('linear-gradient(160deg,#B3122E,#6E0B1D)',(m.nev||'Te')[0].toUpperCase(),ph)
  +'<svg class="mthread" viewBox="0 0 240 90" aria-hidden="true"><path pathLength="1" d="'+SZAL_UT+'"/></svg>'
  +av('linear-gradient(160deg,'+p.szin+',#0D0406)',p.nev[0])+'</div>'
  +'<h2>Összekötött a fonal!</h2><p>Te és '+esc(p.nev)+' kölcsönösen tetszetek egymásnak.'+(f.pct!=null?' Fonalatok erőssége: '+f.pct+'%.':'')+'</p>'
  +(f.sz.length?'<div class="tags k">'+f.sz.slice(0,6).map(x=>'<span>'+esc(x)+'</span>').join('')+'</div>':'')
  +'<p class="mbtn"><a class="btn" data-fx="1" href="uzenetek.html#'+encodeURIComponent(p.nev)+'">Írok neki</a> <button class="btn ghost" data-fx="1">Tovább</button></p></div>';
 o.querySelector('button').onclick=()=>o.remove();document.body.appendChild(o);o.querySelector('a').focus();
 setTimeout(()=>burst(innerWidth/2,innerHeight/2-60,'yes'),1300)}

document.addEventListener('DOMContentLoaded',()=>{
 /* menü */
 const nav=document.querySelector('nav'),cur=location.pathname.split('/').pop()||'index.html',n=pending().length,u=ujUzenet();
 if(nav){nav.innerHTML=[['index.html','Ismerkedés'],['likeok.html','Ki likeolt?'],['uzenetek.html','Üzenetek'],['profil.html','Profil'],['beallitasok.html','Beállítások'],['premium.html','Premium']]
  .map(([h,t])=>'<a href="'+h+'"'+(cur===h?' aria-current="page"':'')+'>'+t+(h==='likeok.html'&&n?' <span class="dot">'+n+'</span>':'')+(h==='uzenetek.html'&&u?' <span class="dot">'+u+'</span>':'')+'</a>').join('')+'<a class="btn" href="belepes.html">Belépés</a>'}
 /* reklámhelyek */
 const ad='<div class="ad"><div><b>Hirdetés</b>Itt lehet a te reklámod</div></div>';
 document.body.insertAdjacentHTML('beforeend','<aside class="ad-rail l" aria-label="Hirdetés">'+ad+'</aside><aside class="ad-rail r" aria-label="Hirdetés">'+ad+'</aside><div id="glow"></div>');
 const w=document.querySelector('.wrap');if(w)w.insertAdjacentHTML('beforeend','<div class="ad ad-bar"><div><b>Hirdetés</b>Itt lehet a te reklámod</div></div>');
 const g=document.getElementById('glow');addEventListener('pointermove',e=>{g.style.transform='translate('+(e.clientX-250)+'px,'+(e.clientY-250)+'px)'},{passive:true});
});
