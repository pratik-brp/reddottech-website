/* =============================================================
   APPLICATION LOGIC
   -------------------------------------------------------------
   LAYOUT & HOME SCREEN
     homeView()       the landing / programme overview screen
     homeModList()    the curriculum list on the home screen
     lessonView()     a module page
     quizPageView()   an assessment page
     paywallView()    the payment screen
     certView()       the certificate
     sourcesView()    the sources & further reading page
     renderNav()      the left sidebar
     ctaBand()        the PECP call-to-action block
     footer()         the page footer
   DIAGRAMS
     FIG / FIGCAP     one inline SVG per module
   ROUTER
     go(view)         switches screens; also enforces the paywall
   ============================================================= */
const B32="23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
function fnv(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h>>>0;}
function checksumFor(body){let h=fnv(CODE_SALT+"|"+body),o="";for(let i=0;i<4;i++){o+=B32[h%32];h=Math.floor(h/32);}return o;}
function validCode(raw){
  const c=String(raw||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  const m=c.match(/^RDT([A-Z0-9]{5})([A-Z0-9]{4})$/);
  if(!m) return false;
  return checksumFor(m[1])===m[2];
}

/* ============ STATE ============ */
const KEY="aiFinPro_v1";
let state=JSON.parse(localStorage.getItem(KEY)||'{}');
state.done=state.done||{};
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function isPaid(){return !!(state.access&&state.access.unlocked);}
function isLocked(id){return !isPaid() && FREE_PREVIEW.indexOf(id)===-1;}
const N=COURSE.lessons.length;
function doneCount(){return COURSE.lessons.filter(l=>state.done[l.id]).length;}
function allDone(){return doneCount()===N;}
function totalMinutes(){return COURSE.lessons.reduce((a,l)=>a+(parseInt(l.time)||0),0);}
function hoursLabel(){const m=totalMinutes();return (Math.floor(m/60))+"h "+(m%60?(m%60)+"m":"00m");}

/* ============ NAV ============ */
function renderNav(active){
  const base=(active&&active.indexOf('q_')===0)?active.slice(2):active;
  let h=`<div class="navitem ${active==='home'?'active':''}" onclick="go('home')">
      <div class="ni-num">◆</div><div><div class="ni-t">Programme Overview</div><div class="ni-sub">Start here</div></div></div>`;
  COURSE.lessons.forEach((l,i)=>{
    const dn=state.done[l.id], lk=isLocked(l.id);
    h+=`<div class="navitem ${base===l.id?'active':''} ${dn?'done':''}" onclick="go('${l.id}')">
      <div class="ni-num">${dn?'✓':i+1}</div>
      <div style="flex:1"><div class="ni-t">${l.title}</div><div class="ni-sub">${l.tag} · ${l.time}${!isPaid()&&!lk?' · free preview':''}</div></div>
      ${lk?'<div class="lockico">🔒</div>':''}</div>`;
  });
  h+=`<div class="navitem ${active==='sources'?'active':''}" onclick="go('sources')">
      <div class="ni-num">§</div><div style="flex:1"><div class="ni-t">Sources &amp; Reading</div><div class="ni-sub">Research underpinning this programme</div></div></div>`;
  h+=`<div class="navitem special ${active==='cert'?'active':''}" onclick="go('cert')">
      <div class="ni-num">★</div><div style="flex:1"><div class="ni-t">Certificate</div><div class="ni-sub">${allDone()?'Ready to claim':'Complete all 8 modules'}</div></div>
      ${isPaid()?'':'<div class="lockico">🔒</div>'}</div>`;
  document.getElementById('navlist').innerHTML=h;
  const pct=Math.round(doneCount()/N*100);
  document.getElementById('progfill').style.width=pct+'%';
  document.getElementById('progtxt').textContent=pct+'%';
}

/* ============ DIAGRAMS ============ */
const FIG={
  m1(){ // nested AI > ML > DL > GenAI
    const rings=[[300,'AI',''],[232,'Machine Learning',''],[164,'Deep Learning',''],[96,'Gen AI','']];
    let g='';
    const cx=250,cy=112;
    [[210,'#1c3563','AI'],[160,'#24406F','Machine Learning'],[112,'#2E6FB0','Deep Learning'],[64,'#C8102E','Generative AI']].forEach((r,i)=>{
      g+=`<ellipse cx="${cx}" cy="${cy}" rx="${r[0]}" ry="${r[0]*0.47}" fill="${r[1]}" fill-opacity="${0.35+i*0.16}" stroke="#8FB0E0" stroke-opacity="0.35"/>`;
    });
    g+=`<text x="${cx}" y="${cy-72}" fill="#CFDCEF" font-size="11.5" text-anchor="middle" font-weight="bold">ARTIFICIAL INTELLIGENCE</text>`;
    g+=`<text x="${cx}" y="${cy-46}" fill="#CFDCEF" font-size="11" text-anchor="middle">Machine Learning</text>`;
    g+=`<text x="${cx}" y="${cy-22}" fill="#DDE8F6" font-size="10.5" text-anchor="middle">Deep Learning</text>`;
    g+=`<text x="${cx}" y="${cy+6}" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">Generative AI</text>`;
    const ex=[['Rules engines','#8FB0E0',cy+78],['Credit scoring · Fraud','#8FB0E0',cy+96]];
    g+=`<line x1="480" y1="42" x2="520" y2="42" stroke="#8FB0E0" stroke-width="1.2"/>`;
    const notes=[['AI','Rules-based fraud engines',40],['ML','Credit scoring, AML detection',72],['DL','Documents, voice, images',104],['GenAI','Drafting, summarising, RAG',136]];
    notes.forEach((n,i)=>{ g+=`<rect x="500" y="${n[2]-14}" width="168" height="26" rx="4" fill="#22386A" stroke="#3A5680"/><text x="510" y="${n[2]+3}" fill="#CFDCEF" font-size="10"><tspan font-weight="bold" fill="#F0DCB4">${n[0]}</tspan>  ${n[1]}</text>`; });
    return `<svg viewBox="0 0 690 230" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  m2(){ // silos -> joined -> split
    let g='';
    const silos=['Core banking','Origination','Cards / digital','KYC files'];
    silos.forEach((s,i)=>{ const y=26+i*44; g+=`<rect x="14" y="${y}" width="132" height="34" rx="5" fill="#22386A" stroke="#3A5680"/><text x="80" y="${y+21}" fill="#CFDCEF" font-size="10.5" text-anchor="middle">${s}</text><path d="M148 ${y+17} L200 106" stroke="#7FA0D0" stroke-opacity="0.5" stroke-width="1.2"/>`; });
    g+=`<rect x="202" y="76" width="130" height="60" rx="7" fill="#C8102E"/><text x="267" y="101" fill="#fff" font-size="11.5" text-anchor="middle" font-weight="bold">JOINED</text><text x="267" y="118" fill="#FFD8DD" font-size="10" text-anchor="middle">customer dataset</text>`;
    g+=`<path d="M334 106 h44" stroke="#7FA0D0" stroke-width="1.6" marker-end="url(#a2)"/>`;
    const sp=[['Training','60–70%','#2E6FB0',30],['Validation','15–20%','#4A85C4',88],['Test (out-of-time)','15–20%','#1E7A52',146]];
    sp.forEach(s=>{ g+=`<rect x="386" y="${s[3]+10}" width="276" height="44" rx="5" fill="${s[2]}" fill-opacity="0.28" stroke="${s[2]}"/><text x="400" y="${s[3]+30}" fill="#E7EEF9" font-size="11" font-weight="bold">${s[0]}</text><text x="400" y="${s[3]+45}" fill="#A8C0E4" font-size="9.5">${s[1]} of data</text>`; });
    g+=`<defs><marker id="a2" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 214" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  m3(){ // credit lifecycle
    const st=[['Origination','Application scoring'],['Underwriting','Pricing · conditions'],['Monitoring','Early warning'],['Collections','Prioritisation'],['Portfolio','PD · LGD · ECL']];
    let g=''; const w=124,gap=14,x0=12;
    st.forEach((s,i)=>{ const x=x0+i*(w+gap);
      g+=`<rect x="${x}" y="44" width="${w}" height="66" rx="6" fill="${i===2?'#C8102E':'#22386A'}" stroke="${i===2?'#FF6B7A':'#3A5680'}"/>`;
      g+=`<text x="${x+w/2}" y="70" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">${s[0]}</text>`;
      g+=`<text x="${x+w/2}" y="90" fill="${i===2?'#FFD8DD':'#A8C0E4'}" font-size="9.5" text-anchor="middle">${s[1]}</text>`;
      if(i<st.length-1) g+=`<path d="M${x+w+1} 77 h${gap-3}" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#a3)"/>`;
    });
    g+=`<text x="345" y="26" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">AI TOUCHPOINTS ACROSS THE CREDIT LIFECYCLE</text>`;
    g+=`<rect x="${x0+2*(w+gap)}" y="122" width="${w}" height="24" rx="4" fill="#C8102E" fill-opacity="0.22" stroke="#FF6B7A" stroke-dasharray="3 3"/><text x="${x0+2*(w+gap)+w/2}" y="138" fill="#FF9BA6" font-size="9.5" text-anchor="middle">highest early value</text>`;
    g+=`<defs><marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 158" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  m4(){ // mule network
    let g=''; const cx=345,cy=100;
    const outer=[]; for(let i=0;i<10;i++){const a=(Math.PI*2*i)/10; outer.push([cx+Math.cos(a)*230,cy+Math.sin(a)*72]);}
    const mid=[[cx-96,cy-30],[cx-96,cy+30],[cx+96,cy-30],[cx+96,cy+30]];
    outer.forEach((p,i)=>{ const m=mid[i%4];
      g+=`<line x1="${p[0].toFixed(0)}" y1="${p[1].toFixed(0)}" x2="${m[0]}" y2="${m[1]}" stroke="#7FA0D0" stroke-opacity="0.32" stroke-width="1"/>`;
      g+=`<circle cx="${p[0].toFixed(0)}" cy="${p[1].toFixed(0)}" r="7" fill="#2E6FB0" stroke="#8FB0E0" stroke-width="0.8"/>`; });
    mid.forEach(m=>{ g+=`<line x1="${m[0]}" y1="${m[1]}" x2="${cx}" y2="${cy}" stroke="#FF6B7A" stroke-opacity="0.55" stroke-width="1.6"/><circle cx="${m[0]}" cy="${m[1]}" r="11" fill="#24406F" stroke="#8FB0E0"/>`; });
    g+=`<circle cx="${cx}" cy="${cy}" r="19" fill="#C8102E" stroke="#FFD8DD" stroke-width="1.6"><animate attributeName="r" values="18;21;18" dur="2.4s" repeatCount="indefinite"/></circle>`;
    g+=`<text x="${cx}" y="${cy+4}" fill="#fff" font-size="10" text-anchor="middle" font-weight="bold">HUB</text>`;
    g+=`<text x="${cx}" y="24" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">NETWORK VIEW: MULE STRUCTURE</text>`;
    g+=`<text x="60" y="188" fill="#A8C0E4" font-size="10">Many low-value accounts…</text><text x="${cx}" y="188" fill="#FF9BA6" font-size="10" text-anchor="middle">…funnel through collectors…</text><text x="632" y="188" fill="#A8C0E4" font-size="10" text-anchor="end">…into a single hub</text>`;
    return `<svg viewBox="0 0 690 200" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  m5(){ // RAG
    let g='';
    const box=(x,y,w,h,fill,stroke,t1,t2,c1,c2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}"/><text x="${x+w/2}" y="${y+h/2-3}" fill="${c1}" font-size="11" text-anchor="middle" font-weight="bold">${t1}</text>${t2?`<text x="${x+w/2}" y="${y+h/2+13}" fill="${c2}" font-size="9.5" text-anchor="middle">${t2}</text>`:''}`;
    g+=box(12,72,104,54,'#22386A','#3A5680','Staff question','"What is our…?"','#fff','#A8C0E4');
    g+=`<path d="M118 99 h34" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#a5)"/>`;
    g+=box(154,72,116,54,'#2E6FB0','#8FB0E0','RETRIEVE','search bank docs','#fff','#DDE8F6');
    g+=box(154,10,116,44,'#12274d','#3A5680','Policy · circulars','KYC · product terms','#F0DCB4','#A8C0E4');
    g+=`<path d="M212 56 v14" stroke="#7FA0D0" stroke-width="1.4"/>`;
    g+=`<path d="M272 99 h34" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#a5)"/>`;
    g+=box(308,72,116,54,'#C8102E','#FF6B7A','LLM','answers only from','#fff','#FFD8DD');
    g+=`<text x="366" y="140" fill="#FF9BA6" font-size="9.5" text-anchor="middle">retrieved passages</text>`;
    g+=`<path d="M426 99 h34" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#a5)"/>`;
    g+=box(462,62,120,74,'#1E7A52','#5FC98D','ANSWER','with citations','#fff','#CFE9DA');
    g+=`<text x="522" y="152" fill="#8FD9B3" font-size="9.5" text-anchor="middle">✓ traceable · auditable</text>`;
    g+=`<text x="345" y="176" fill="#A8C0E4" font-size="10" text-anchor="middle">Grounding the model in your own approved documents constrains hallucination.</text>`;
    g+=`<defs><marker id="a5" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 190" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  m6(){ // risk taxonomy grid
    const risks=[['Model risk','drift · overfitting'],['Bias','discriminatory outcomes'],['Privacy','consent · shadow AI'],['Cyber','poisoning · injection'],['Third party','vendor · concentration'],['Systemic','herding · procyclicality'],['Human','automation bias'],['Legal','supervisory · reputational']];
    let g=''; const w=158,h=58,gx=12,gy=10,cols=4;
    risks.forEach((r,i)=>{ const x=gx+(i%cols)*(w+8), y=gy+Math.floor(i/cols)*(h+10);
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#22386A" stroke="#C8102E" stroke-opacity="0.5"/>`;
      g+=`<rect x="${x}" y="${y}" width="4" height="${h}" fill="#C8102E"/>`;
      g+=`<text x="${x+14}" y="${y+24}" fill="#fff" font-size="11.5" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+14}" y="${y+41}" fill="#A8C0E4" font-size="9.5">${r[1]}</text>`; });
    g+=`<text x="345" y="152" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">Eight categories a board-accountable institution must assess</text>`;
    return `<svg viewBox="0 0 690 164" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  m7(){ // four value levers
    const q=[['REVENUE','Personalisation · pricing · new segments','#C8102E'],['EFFICIENCY','STP · document automation','#2E6FB0'],['RISK','Early warning · fraud interception','#B8892B'],['EXPERIENCE','Speed · availability · Nepali language','#1E7A52']];
    let g=''; const w=320,h=72;
    q.forEach((v,i)=>{ const x=14+(i%2)*(w+12), y=14+Math.floor(i/2)*(h+12);
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${v[2]}" fill-opacity="0.17" stroke="${v[2]}"/>`;
      g+=`<text x="${x+18}" y="${y+30}" fill="#fff" font-size="13" font-weight="bold">${v[0]}</text>`;
      g+=`<text x="${x+18}" y="${y+51}" fill="#CFDCEF" font-size="10.5">${v[1]}</text>`; });
    g+=`<text x="345" y="186" fill="#F0DCB4" font-size="10.5" text-anchor="middle">Every AI proposal should name its lever — and state how it will be measured.</text>`;
    return `<svg viewBox="0 0 690 198" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  m8(){ // lifecycle circle
    const steps=['Define','Develop','Validate','Approve','Deploy','Monitor','Retire'];
    const cx=345,cy=122,r=76; let g='';
    g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3A5680" stroke-width="1.4" stroke-dasharray="5 5"/>`;
    steps.forEach((s,i)=>{ const a=(Math.PI*2*i)/steps.length - Math.PI/2;
      const x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r;
      const isV=(s==='Validate');
      g+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" fill="${isV?'#C8102E':'#24406F'}" stroke="${isV?'#FFD8DD':'#8FB0E0'}" stroke-width="1.4"/>`;
      g+=`<text x="${x.toFixed(1)}" y="${(y+4).toFixed(1)}" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">${i+1}</text>`;
      const lx=cx+Math.cos(a)*(r+40), ly=cy+Math.sin(a)*(r+26);
      g+=`<text x="${lx.toFixed(1)}" y="${(ly+4).toFixed(1)}" fill="${isV?'#FF9BA6':'#CFDCEF'}" font-size="10.5" text-anchor="middle" font-weight="${isV?'bold':'normal'}">${s}</text>`; });
    g+=`<circle r="6" fill="#F0DCB4"><animateMotion dur="9s" repeatCount="indefinite" path="M${cx} ${cy-r} A ${r} ${r} 0 1 1 ${cx-0.1} ${cy-r}"/></circle>`;
    g+=`<text x="${cx}" y="${cy-4}" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">MODEL</text><text x="${cx}" y="${cy+11}" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">LIFECYCLE</text>`;
    g+=`<text x="${cx}" y="258" fill="#A8C0E4" font-size="10" text-anchor="middle">Independent validation is the pillar supervisors examine most closely.</text>`;
    return `<svg viewBox="0 0 690 270" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  }
};
const FIGCAP={
  m1:"AI, machine learning, deep learning and generative AI — nested, not interchangeable.",
  m2:"Most projects fail here: joining fragmented systems, then splitting data honestly.",
  m3:"AI applies across the credit lifecycle — monitoring often delivers the fastest value.",
  m4:"Individually ordinary transactions form a revealing structure at network level.",
  m5:"Retrieval-augmented generation: the default safe architecture for regulated institutions.",
  m6:"The AI risk taxonomy for a supervised financial institution.",
  m7:"Four value levers — name the one your proposal pulls.",
  m8:"The model lifecycle, from definition through monitoring to retirement."
};
function applyReveal(){
  const els=document.querySelectorAll('#main .reveal:not(.in)');
  if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return;}
  const io=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:0.05,rootMargin:'0px 0px -30px 0px'});
  els.forEach(e=>io.observe(e));
}

/* ============ VIEWS ============ */
function homeView(){
  return `
  <section class="hero">
    <div class="blob" style="width:300px;height:300px;top:-110px;right:-70px"></div>
    <div class="blob" style="width:170px;height:170px;bottom:-60px;right:150px"></div>
    <img class="hero-logo" src="${LOGO_WHITE}" alt="Red Dot Technologies">
    <span class="kicker">Professional Certificate Programme</span>
    <h1>AI for Financial<br>Professionals</h1>
    <p class="lead">An applied programme for bankers, risk and compliance officers, and finance leaders in Nepal — covering credit, fraud and AML, generative AI in operations, the risks that matter to a supervised institution, and the governance NRB now expects.</p>
    <div class="meta">
      <span class="chip">◷ 8 modules · ${hoursLabel()} of structured learning</span>
      <span class="chip">◈ Intermediate to advanced</span>
      <span class="chip g">★ Certificate of Completion</span>
      <span class="chip">⚑ Aligned to NRB AI Guidelines</span>
      ${isPaid()?'<span class="chip g">✓ Full access unlocked</span>':`<span class="chip g">${PRICE.currency} ${PRICE.amount}${PRICE.was?' · introductory':''}</span>`}
    </div>
    ${isPaid()
      ? `<button class="btn" onclick="resume()">${doneCount()>0?'Resume programme':'Begin Module 1'} →</button>`
      : `<button class="btn" onclick="go('m1')">Start free preview — Module 1 →</button>
         <button class="btn gold sm" style="margin-left:10px" onclick="go('pay')">Get full access · ${PRICE.currency} ${PRICE.amount}</button>`}
  </section>

  <div class="grid3">
    <div class="feat r"><h3>Built for banking</h3><p>Every concept is applied to credit, fraud, AML, operations and compliance — not generic technology training.</p></div>
    <div class="feat"><h3>Nepal-specific</h3><p>Grounded in NRB's AI Guidelines, the Privacy Act, remittance flows, the MSME credit gap and local market realities.</p></div>
    <div class="feat g"><h3>Decision-ready</h3><p>You finish with a defensible AI use-case proposal you can take to your own management committee.</p></div>
  </div>

  <div class="evid" style="margin-top:18px">
    <div class="src"><span class="tag">Grounded in industry research</span></div>
    <p style="margin-bottom:8px">Module content draws on published research and white papers from <b>EY</b>, <b>Boston Consulting Group</b>, <b>SAS</b>, <b>Salesforce</b>, <b>FIS</b> and the <b>Oxford Future of Finance and Technology Initiative</b> at Saïd Business School — applied throughout to the regulatory and market context of Nepal. Findings, frameworks and data are attributed inline where they appear.</p>
    <button class="btn out sm" onclick="go('sources')">View sources &amp; further reading ›</button>
  </div>

  <div class="sectitle">Programme curriculum</div>
  <div id="homeModList"></div>

  <div class="sectitle">Who this programme is for</div>
  <div class="grid2">
    <div class="feat"><h3>Risk, credit &amp; compliance</h3><p>Credit officers and analysts, risk managers, AML and compliance officers, internal auditors, and model validation staff.</p></div>
    <div class="feat"><h3>Business &amp; leadership</h3><p>Branch and operations managers, digital banking and product teams, strategy and transformation leads, and senior management with AI oversight duties.</p></div>
  </div>

  <div class="sectitle">How the programme works</div>
  <div class="grid3">
    <div class="feat"><h3>1 · Study</h3><p>Eight in-depth modules with worked banking examples, practitioner notes and diagrams.</p></div>
    <div class="feat"><h3>2 · Assess</h3><p>A separate assessment follows each module. All questions must be answered correctly to complete it.</p></div>
    <div class="feat"><h3>3 · Apply</h3><p>Workplace exercises build toward a capstone AI use-case proposal for your own institution.</p></div>
  </div>

  ${ctaBand()}
  ${footer()}`;
}
function homeModList(){
  return COURSE.lessons.map((l,i)=>`
    <div class="modrow ${state.done[l.id]?'done':''}" onclick="go('${l.id}')">
      <div class="mn">${state.done[l.id]?'✓':i+1}</div>
      <div style="flex:1"><div class="mt">${l.title} ${isLocked(l.id)?'<span style="color:var(--gold);font-size:12px">🔒</span>':(!isPaid()?'<span style="color:var(--green);font-size:11px;font-weight:700">FREE PREVIEW</span>':'')}</div><div class="ms">${l.summary}</div></div>
      <div class="mtime">${l.time}</div>
    </div>`).join('');
}

function lessonView(l,idx){
  let h=`<div class="lesson-head"><div class="ltag">${l.tag} · ${l.time}</div><h2>${l.title}</h2><div class="lmeta">${l.summary}</div></div>`;
  h+=`<div class="obj reveal"><h4>Learning objectives</h4><ul>${l.objectives.map(o=>`<li>${o}</li>`).join('')}</ul></div>`;
  if(FIG[l.id]) h+=`<div class="figure reveal">${FIG[l.id]()}<div class="cap">${FIGCAP[l.id]||''}</div></div>`;
  l.sections.forEach((s,i)=>{ h+=`<div class="sec reveal"><h3><span class="n">${i+1}</span>${s.h}</h3>${s.html}</div>`; });
  if(l.practitioner) h+=`<div class="callout prac reveal"><h4>▲ ${l.practitioner.title}</h4><p style="margin:0">${l.practitioner.text}</p></div>`;
  h+=`<div class="callout act reveal"><h4>✎ ${l.activity.title}</h4><p style="margin:0">${l.activity.text}</p></div>`;
  h+=`<div class="key reveal"><h4>Key takeaways</h4><ul>${l.takeaways.map(t=>`<li>${t}</li>`).join('')}</ul></div>`;
  if(!isPaid()){
    h+=`<div class="lockbanner reveal"><h3>🔒 That is the end of the free preview</h3>
      <p>Modules 2–8 cover credit risk, financial crime, generative AI in operations, AI risk, and the governance NRB expects — plus all assessments and your certificate.</p>
      <button class="btn gold" onclick="go('pay')">Unlock full access — ${PRICE.currency} ${PRICE.amount} →</button></div>`;
    h+=`<div class="lesson-nav"><span></span><button class="btn out sm" onclick="go('home')">Programme overview ›</button></div>`;
    return h;
  }
  h+=`<div class="lesson-nav">`;
  h+= idx>0?`<button class="btn out sm" onclick="go('${COURSE.lessons[idx-1].id}')">‹ ${COURSE.lessons[idx-1].tag}</button>`:`<span></span>`;
  h+=`<button class="btn" onclick="go('q_${l.id}')">Take the ${l.tag} assessment →</button></div>`;
  return h;
}

function quizPageView(l,idx){
  let h=`<div class="lesson-head"><div class="ltag">${l.tag} · Assessment</div><h2>${l.title}</h2>
    <div class="lmeta">Answer all ${l.quiz.length} questions correctly to complete this module. You may change your answers freely.</div></div>`;
  h+=`<div style="margin:-6px 0 14px"><button class="btn out sm" onclick="go('${l.id}')">‹ Return to module content</button></div>`;
  h+=`<div class="quiz" id="quiz-${l.id}">`;
  l.quiz.forEach((q,qi)=>{
    h+=`<div class="q"><div class="qq">${qi+1}. ${q.q}</div>`;
    q.opts.forEach((o,oi)=>{ h+=`<label class="opt" id="opt-${l.id}-${qi}-${oi}"><input type="radio" name="${l.id}-${qi}" value="${oi}" onchange="answer('${l.id}',${qi},${oi})"><span>${o}</span></label>`; });
    h+=`<div class="qfb" id="fb-${l.id}-${qi}"></div></div>`;
  });
  h+=`<div class="quizresult" id="qr-${l.id}"></div></div>`;
  h+=`<div class="lesson-nav"><button class="btn out sm" onclick="go('${l.id}')">‹ Module content</button>`;
  h+= idx<N-1?`<button class="btn sm" onclick="go('${COURSE.lessons[idx+1].id}')">Next: ${COURSE.lessons[idx+1].tag} →</button>`
             :`<button class="btn gold sm" onclick="go('cert')">Complete programme → Certificate</button>`;
  h+=`</div>`;
  return h;
}

function answer(lid,qi,oi){
  const lesson=COURSE.lessons.find(x=>x.id===lid), q=lesson.quiz[qi];
  q.opts.forEach((_,k)=>{const el=document.getElementById(`opt-${lid}-${qi}-${k}`); if(el) el.classList.remove('correct','wrong');});
  const ok=oi===q.a;
  const sel=document.getElementById(`opt-${lid}-${qi}-${oi}`); if(sel) sel.classList.add(ok?'correct':'wrong');
  if(!ok){const c=document.getElementById(`opt-${lid}-${qi}-${q.a}`); if(c) c.classList.add('correct');}
  const fb=document.getElementById(`fb-${lid}-${qi}`);
  if(fb){fb.className='qfb show '+(ok?'ok':'no'); fb.innerHTML=(ok?'✓ Correct. ':'✗ Not quite. ')+q.fb;}
  state['ans_'+lid]=state['ans_'+lid]||{}; state['ans_'+lid][qi]=oi;
  checkLesson(lid); save();
}
function checkLesson(lid){
  const lesson=COURSE.lessons.find(x=>x.id===lid), ans=state['ans_'+lid]||{};
  const answered=Object.keys(ans).length, correct=lesson.quiz.filter((q,i)=>ans[i]===q.a).length;
  const qr=document.getElementById('qr-'+lid);
  if(answered<lesson.quiz.length){ if(qr) qr.innerHTML=`<span style="color:var(--grey)">${answered} of ${lesson.quiz.length} answered</span>`; return; }
  if(correct===lesson.quiz.length){
    if(!state.done[lid]){state.done[lid]=true;save();renderNav(state.last||lid);}
    if(qr) qr.innerHTML=`<span style="color:#14603E">✓ Module complete — all ${lesson.quiz.length} correct.</span>`;
  }else{
    if(qr) qr.innerHTML=`<span style="color:#9a0c23">${correct} of ${lesson.quiz.length} correct. Correct the highlighted answers to complete this module.</span>`;
    if(state.done[lid]){state.done[lid]=false;save();renderNav(state.last||lid);}
  }
}
function restoreQuiz(l){
  const ans=state['ans_'+l.id]; if(!ans) return;
  Object.keys(ans).forEach(qi=>{
    const oi=ans[qi], input=document.querySelector(`input[name="${l.id}-${qi}"][value="${oi}"]`);
    if(input){input.checked=true;answer(l.id,parseInt(qi),oi);}
  });
}

function certView(){
  if(!allDone()){
    return `<div class="cert-lock"><div class="lk">◈</div>
      <h2 style="color:var(--navy)">Certificate not yet available</h2>
      <p>All eight modules must be completed to claim your certificate.<br>You have completed <b>${doneCount()} of ${N}</b>.</p>
      <div style="margin-top:18px"><button class="btn" onclick="resume()">Continue programme →</button></div></div>${footer()}`;
  }
  if(!(state.lead&&state.lead.captured)) return leadFormView();
  const d=state.lead, today=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});
  return `
  <div class="lesson-head"><div class="ltag">★ Programme complete</div><h2>Certificate of Completion</h2>
    <div class="lmeta">Congratulations, ${escapeHtml(d.name)}. Use the button below to save or print your certificate.</div></div>
  <div style="text-align:center;margin-bottom:18px">
    <button class="btn navy sm" onclick="window.print()">Save / Print certificate</button>
  </div>
  <div class="certwrap"><div class="certbox"><div class="certinner">
    <img class="cert-logo" src="${LOGO}" alt="Red Dot Technologies">
    <div class="ctitle">Certificate of Completion</div>
    <h2>AI for Financial Professionals</h2>
    <div class="csub">Professional Certificate Programme · ${hoursLabel()}</div>
    <div class="pres">This is to certify that</div>
    <div class="cname">${escapeHtml(d.name)}</div>
    <div class="corg">${d.org?escapeHtml(d.org):'&nbsp;'}${d.role?' · '+escapeHtml(d.role):''}</div>
    <div class="cdesc">has successfully completed all eight modules and assessments of <b>AI for Financial Professionals</b>, an applied programme covering artificial intelligence in credit risk, financial crime, banking operations, AI risk management and governance aligned to the regulatory expectations of Nepal's financial sector.</div>
    <div class="cmods">${COURSE.lessons.map(l=>`<span>${l.title}</span>`).join('')}</div>
    <div class="csig">
      <div style="text-align:left"><div class="sigline"><b>Red Dot Technologies Pvt. Ltd.</b>Baluwatar, Kathmandu, Nepal</div></div>
      <div style="text-align:right"><div class="sigline"><b>${today}</b>Date of completion</div></div>
    </div>
    <div class="certid">Certificate reference: ${certRef(d)}</div>
  </div></div></div>
  ${ctaBand()}
  ${footer()}`;
}
function certRef(d){
  const s=(d.name||'')+(d.email||'')+(d.date||'');
  let hsh=0; for(let i=0;i<s.length;i++){hsh=((hsh<<5)-hsh+s.charCodeAt(i))|0;}
  const y=new Date(d.date||Date.now()).getFullYear();
  return 'RDT-AIFP-'+y+'-'+Math.abs(hsh).toString(36).toUpperCase().padStart(6,'0').slice(0,6);
}
function leadFormView(){
  return `
  <div class="lesson-head"><div class="ltag">★ All eight modules complete</div><h2>Claim your certificate</h2>
    <div class="lmeta">Please confirm your details for the certificate record.</div></div>
  <div class="leadcard">
    <h3>Certificate details</h3>
    <p class="sub">Your name and institution will appear on the certificate.</p>
    <div class="field"><label>Full name *</label><input id="lf-name" placeholder="As it should appear on the certificate" oninput="clearLeadErr()"></div>
    <div class="field"><label>Work email address *</label><input id="lf-email" type="email" placeholder="name@yourbank.com.np" oninput="clearLeadErr()"></div>
    <div class="field"><label>Institution *</label><input id="lf-org" placeholder="e.g. Nabil Bank / NIC Asia / Swisscontact" oninput="clearLeadErr()"></div>
    <div class="field"><label>Designation</label><input id="lf-role" placeholder="e.g. Credit Officer, AML Analyst"></div>
    <div class="field"><label>Department</label>
      <select id="lf-dept">
        <option value="">Select (optional)</option>
        <option>Credit / Lending</option><option>Risk Management</option><option>Compliance / AML</option>
        <option>Internal Audit</option><option>Operations</option><option>Digital / IT</option>
        <option>Branch Banking</option><option>Strategy / Management</option><option>Other</option>
      </select></div>
    <div class="lead-err" id="lf-err"></div>
    <button class="btn" style="width:100%;justify-content:center" onclick="captureLead()">Issue my certificate →</button>
    <div class="privacy">Your details are used to issue this certificate and to share related professional development information from Red Dot Technologies.</div>
  </div>${footer()}`;
}
/* ============ PAYWALL ============ */
function paywallView(target){
  const back=target?`<div style="margin-bottom:14px"><button class="btn out sm" onclick="go('m1')">‹ Back to the free preview</button></div>`:'';
  return `${back}
  <div class="paywrap">
    <div class="payhero">
      <span class="kicker">Full programme access</span>
      <h2>Unlock all 8 modules &amp; your certificate</h2>
      <p>You have been reading the free preview. Full access opens Modules 2–8, all assessments, and your Certificate of Completion.</p>
      <div class="pricebox">
        <span class="cur">${PRICE.currency}</span><span class="amt">${PRICE.amount}</span>
        ${PRICE.was?`<span class="was">${PRICE.currency} ${PRICE.was}</span>`:''}
      </div>
      <div class="paynote">${PRICE.intro?'Introductory price · one-time payment · lifetime access':'One-time payment · lifetime access'}</div>
    </div>

    <div class="paygrid">
      <div class="paycard">
        <div class="ph">Step 1 · Pay</div>
        <h3>Scan to pay with Fonepay</h3>
        <div class="qrbox">
          <div class="qrhead"><span class="fp">fonepay</span><b>Red Dot Technologies</b></div>
          <img src="${QR_IMG}" alt="Fonepay QR — Red Dot Technologies">
          <div class="qrsub">Scan with any Nepali mobile banking or wallet app<br>नेपाल राष्ट्र बैंकबाट अनुमति प्राप्त</div>
        </div>
        <ol class="paysteps">
          <li>Scan the QR and pay <b>${PRICE.currency} ${PRICE.amount}</b>.</li>
          <li>Note your transaction reference from the app.</li>
          <li>Submit your details below — we email your access code, usually within one working day.</li>
        </ol>
      </div>

      <div class="paycard">
        <div class="ph">Step 2 · Unlock</div>
        <h3>Enter your access code</h3>
        <p style="font-size:13.5px;color:var(--grey);margin-top:4px">Already have a code from Red Dot? Enter it to unlock the full programme instantly.</p>
        <div class="codebox">
          <input id="ac-code" placeholder="RDT-XXXXX-XXXX" oninput="clearPayErr()">
          <button class="btn sm" onclick="redeemCode()">Unlock</button>
        </div>
        <div class="lead-err" id="ac-err"></div>
        <div class="payok" id="ac-ok"></div>

        <div style="border-top:1px solid var(--line);margin:18px 0 14px"></div>
        <div class="ph">Paid already? Request your code</div>
        <div class="field"><label>Full name *</label><input id="ac-name" placeholder="Your name" oninput="clearPayErr()"></div>
        <div class="field"><label>Work email *</label><input id="ac-email" type="email" placeholder="name@yourbank.com.np" oninput="clearPayErr()"></div>
        <div class="field"><label>Institution *</label><input id="ac-org" placeholder="Your bank or organisation" oninput="clearPayErr()"></div>
        <div class="field"><label>Fonepay transaction reference</label><input id="ac-txn" placeholder="From your payment confirmation"></div>
        <button class="btn navy sm" style="width:100%;justify-content:center" onclick="requestCode()">Send my payment details →</button>
        <div class="privacy">Questions? ${CONTACT.email} · ${CONTACT.phone}</div>
      </div>
    </div>

    <div class="paycard">
      <div class="ph">What full access includes</div>
      <div class="grid2" style="margin-top:6px">
        <ul class="incl">
          <li>All 8 modules — ${hoursLabel()} of structured learning</li>
          <li>43 assessment questions across the programme</li>
          <li>Modules on AI risk and governance for supervised institutions</li>
          <li>Nepal-specific content aligned to NRB's AI Guidelines</li>
        </ul>
        <ul class="incl">
          <li>Practitioner notes and workplace application exercises</li>
          <li>Capstone: a defensible AI use-case proposal</li>
          <li>Certificate of Completion with verification reference</li>
          <li>Lifetime access — study at your own pace</li>
        </ul>
      </div>
      <div style="margin-top:16px;padding-top:14px;border-top:1px solid var(--line);font-size:13px;color:var(--grey)">
        <b style="color:var(--navy)">Training a team?</b> Institutional rates are available for group enrolments of 10 or more.
        Contact us at ${CONTACT.email} or ${CONTACT.phone}.
      </div>
    </div>
  </div>
  ${footer()}`;
}
function clearPayErr(){const e=document.getElementById('ac-err'); if(e) e.className='lead-err';}
function showPayErr(m){const e=document.getElementById('ac-err'); if(e){e.textContent=m;e.className='lead-err show';}}
function redeemCode(){
  const el=document.getElementById('ac-code'); const raw=el?el.value:'';
  if(!validCode(raw)){showPayErr('That access code was not recognised. Please check it and try again, or contact '+CONTACT.email+'.');return;}
  state.access={unlocked:true,code:String(raw).toUpperCase().trim(),date:new Date().toISOString()};
  save();
  const ok=document.getElementById('ac-ok');
  if(ok){ok.className='payok show';ok.textContent='Access granted. Opening the full programme…';}
  setTimeout(()=>go(state.pendingTarget||'m2'),700);
}
function requestCode(){
  const g=id=>((document.getElementById(id)||{}).value||'').trim();
  const name=g('ac-name'),email=g('ac-email'),org=g('ac-org'),txn=g('ac-txn');
  if(name.length<2){showPayErr('Please enter your full name.');return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showPayErr('Please enter a valid email address.');return;}
  if(org.length<2){showPayErr('Please enter your institution.');return;}
  const payload={name,email,org,txn,type:"ACCESS_REQUEST",amount:PRICE.currency+" "+PRICE.amount,
    course:"AI for Financial Professionals",date:new Date().toISOString(),source:"Paywall — payment submitted"};
  state.requested=payload; save();
  if(LEAD_ENDPOINT){try{fetch(LEAD_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});}catch(e){}}
  const ok=document.getElementById('ac-ok');
  if(ok){ok.className='payok show';ok.innerHTML='<b>Thank you.</b> Your details have been received. We will verify your payment and email your access code to '+escapeHtml(email)+', usually within one working day.';}
  clearPayErr();
}

function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function clearLeadErr(){const e=document.getElementById('lf-err'); if(e) e.className='lead-err';}
function showLeadErr(m){const e=document.getElementById('lf-err'); if(e){e.textContent=m;e.className='lead-err show';}}
function captureLead(){
  const g=id=>((document.getElementById(id)||{}).value||'').trim();
  const name=g('lf-name'),email=g('lf-email'),org=g('lf-org'),role=g('lf-role'),dept=g('lf-dept');
  if(name.length<2){showLeadErr('Please enter your full name.');return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showLeadErr('Please enter a valid email address.');return;}
  if(org.length<2){showLeadErr('Please enter your institution.');return;}
  state.lead={name,email,org,role,dept,captured:true,date:new Date().toISOString(),
    course:"AI for Financial Professionals",hours:hoursLabel(),source:"AI for Financial Professionals"};
  save();
  if(LEAD_ENDPOINT){try{fetch(LEAD_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(state.lead)});}catch(e){}}
  go('cert');
}
const SOURCES=[
  ["Ernst &amp; Young (EY)","AI Bank White Paper: Reconstructing the Financial Paradigm through Intelligent Agents","EY Greater China. Source of the five-stage AI Bank Maturity Assessment Scheme, the five assessment dimensions, and global findings on AI governance, talent structure and scalability. Also draws on joint EY–Institute of International Finance (IIF) research on data quality as the primary barrier to AI adoption."],
  ["Boston Consulting Group (BCG)","Generative AI in Banking: Six Myths You Need to Ignore","October 2024. Source of the two deployment archetypes (the model as expert versus the model as a tool around a deterministic core), the chatbot control spectrum, the distinction between off-the-shelf and production-grade RAG, and the separation of generative and predictive AI technology stacks."],
  ["SAS","From Algorithms to Impact: Banking's AI Future","Source of adoption and outcome data for generative AI in banking, departmental deployment patterns, and practitioner perspectives from Millennium BCP, Banorte, Old National Bank and Intesa Sanpaolo. Includes Juniper Research projections for banking AI spend."],
  ["Salesforce","A Guide to AI in Financial Services for Southeast Asia","Source of the three implementation pathways (automate, reimagine, power new models), consumer trust data, and estimates for compliance and service cost reduction. Cites McKinsey analysis on the revenue potential of AI in banking."],
  ["FIS","AI Alchemy: Stepping Forward into the Future of Financial Services","Ameet Bhatt, FIS. Source of the machine learning / predictive AI / generative AI taxonomy and the six-part risk and ethical framework for generative AI in financial services, including AI voice-cloning fraud and the cost of AI ownership."],
  ["University of Oxford","AI Preparedness in Established Financial Services Firms","Oxford Future of Finance and Technology Initiative, Sa&iuml;d Business School (Kilminster &amp; Ozcan, 2025), in collaboration with Finbridge Global. Source of the AI preparedness precursors, the paradox of caution, findings on efficiency business cases, shadow AI as a governance trigger, and recommended adoption practices."],
  ["Nepal Rastra Bank","Artificial Intelligence Guidelines and related circulars","The governing regulatory framework for licensed institutions in Nepal, covering board accountability, risk classification, explainability, privacy and consent, and ongoing monitoring. Participants must always work from the current published text."]
];
function sourcesView(){
  return `
  <div class="lesson-head"><div class="ltag">Reference</div><h2>Sources &amp; Further Reading</h2>
    <div class="lmeta">The industry research underpinning this programme.</div></div>
  <p style="font-size:15.5px;margin-bottom:18px">This programme has been developed by Red Dot Technologies and draws on published research and white papers from leading global advisory, technology and academic institutions, applied to the regulatory and market context of Nepal. Where a specific statistic, framework or practitioner quotation appears in a module, it is attributed inline to its source.</p>
  <div class="srcgrid">
    ${SOURCES.map(s=>`<div class="srccard"><div class="org">${s[0]}</div><h4>${s[1]}</h4><p>${s[2]}</p></div>`).join('')}
  </div>
  <div class="callout note" style="margin-top:22px"><h4>A note on the use of this material</h4><p style="margin:0">Statistics and findings are reproduced for educational purposes and remain the intellectual property of their respective publishers. Figures reflect the period in which each study was conducted and should be treated as indicative of direction rather than as current precise values. Participants are encouraged to consult the original publications, and to verify all regulatory positions against the current Nepal Rastra Bank guidelines and their own compliance function.</p></div>
  ${footer()}`;
}
function ctaBand(){
  return `<div class="ctaband">
    <span class="kicker">Continue your development</span>
    <h2>The next step: PECP</h2>
    <p>This programme is a gateway to the <b>Professional Excellence &amp; Certification Program (PECP)</b> from Red Dot Technologies, in partnership with the University of South Carolina Upstate — instructor-led, cohort-based professional certification in project management, business analytics, quality and leadership, designed for working professionals.</p>
    <a class="btn gold" href="https://reddottech.com.np/pecp" target="_blank" rel="noopener">Explore PECP →</a>
    <a class="btn ghost" style="margin-left:8px" href="https://reddottech.com.np/contact" target="_blank" rel="noopener">Enquire about in-house cohorts</a>
  </div>`;
}
function footer(){
  return `<div class="foot">© <span id="yr"></span> Red Dot Technologies Pvt. Ltd. · Baluwatar-04, Kathmandu, Nepal · <a href="https://reddottech.com.np" target="_blank" rel="noopener">reddottech.com.np</a><br>
  <span style="opacity:.85">This programme is provided for professional education. It summarises regulatory concepts for training purposes and does not constitute legal, compliance or investment advice. Always refer to the current Nepal Rastra Bank guidelines and consult your compliance function.</span></div>`;
}

/* ============ ROUTER ============ */
function go(view){
  const main=document.getElementById('main');
  // paywall gate
  const targetId=(view.indexOf('q_')===0)?view.slice(2):view;
  if(view==='sources'){
    main.innerHTML=sourcesView(); renderNav('sources'); applyReveal();
    const ys=document.getElementById('yr'); if(ys) ys.textContent=new Date().getFullYear();
    window.scrollTo(0,0); closeSide(); state.last='sources'; save(); return;
  }
  if(view==='pay' || (targetId!=='home'&&targetId!=='cert'&&isLocked(targetId)) || (view==='cert'&&!isPaid())){
    if(view!=='pay'&&view!=='cert') state.pendingTarget=targetId;
    main.innerHTML=paywallView(view!=='pay');
    renderNav(view==='cert'?'cert':targetId); applyReveal();
    const y0=document.getElementById('yr'); if(y0) y0.textContent=new Date().getFullYear();
    window.scrollTo(0,0); closeSide(); save(); return;
  }
  if(view==='home'){ main.innerHTML=homeView(); const el=document.getElementById('homeModList'); if(el) el.innerHTML=homeModList(); }
  else if(view==='cert'){ main.innerHTML=certView(); }
  else if(view.indexOf('q_')===0){
    const id=view.slice(2), idx=COURSE.lessons.findIndex(l=>l.id===id);
    main.innerHTML=quizPageView(COURSE.lessons[idx],idx); restoreQuiz(COURSE.lessons[idx]);
  } else {
    const idx=COURSE.lessons.findIndex(l=>l.id===view);
    main.innerHTML=lessonView(COURSE.lessons[idx],idx);
  }
  renderNav(view); applyReveal();
  const y=document.getElementById('yr'); if(y) y.textContent=new Date().getFullYear();
  window.scrollTo(0,0); closeSide(); state.last=view; save();
}
function resume(){const n=COURSE.lessons.find(l=>!state.done[l.id]); go(n?n.id:'cert');}
function toggleSide(){document.getElementById('side').classList.toggle('open');}
function closeSide(){document.getElementById('side').classList.remove('open');}
go('home');
