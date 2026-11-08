function load(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}}
function save(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function applyTheme(){let t=load('sf_set',{}).theme||'dark';
 if(t==='auto')t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';
 document.documentElement.dataset.theme=t;}
applyTheme();
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
const INTERESTS=['utazás','zene','sport','film','főzés','természet','könyvek','humor','fotózás','játékok'];
const GENRES=['pop','rock','hip-hop','elektronikus','jazz','klasszikus','népzene','metál'];
