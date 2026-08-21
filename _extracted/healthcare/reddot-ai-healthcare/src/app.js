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
const KEY="aiHealthPro_v1";
let state=JSON.parse(localStorage.getItem(KEY)||'{}');
state.done=state.done||{};
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function isPaid(){return !!(state.access&&state.access.unlocked);}
function isLocked(id){return !isPaid() && FREE_PREVIEW.indexOf(id)===-1;}
const N=COURSE.lessons.length;
function doneCount(){return COURSE.lessons.filter(l=>state.done[l.id]).length;}
function allDone(){return doneCount()===N;}
function totalQuestions(){return COURSE.lessons.reduce((a,l)=>a+l.quiz.length,0);}
function lockedFrom(){ // first module number that requires payment
  for(let i=0;i<COURSE.lessons.length;i++){ if(FREE_PREVIEW.indexOf(COURSE.lessons[i].id)===-1) return i+1; }
  return 1;
}
function lockedRange(){const a=lockedFrom();return a>=N?('Module '+N):('Modules '+a+'\u2013'+N);}
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
      <div class="ni-num">★</div><div style="flex:1"><div class="ni-t">Certificate</div><div class="ni-sub">${allDone()?'Ready to claim':'Complete all '+N+' modules'}</div></div>
      ${isPaid()?'':'<div class="lockico">🔒</div>'}</div>`;
  document.getElementById('navlist').innerHTML=h;
  const pct=Math.round(doneCount()/N*100);
  document.getElementById('progfill').style.width=pct+'%';
  document.getElementById('progtxt').textContent=pct+'%';
}

/* ============ DIAGRAMS ============ */
const FIG={
  h1(){ // nested AI concepts with clinical examples
    let g=''; const cx=250,cy=112;
    [[210,'#1c3563'],[160,'#24406F'],[112,'#2E6FB0'],[64,'#C8102E']].forEach((r,i)=>{
      g+=`<ellipse cx="${cx}" cy="${cy}" rx="${r[0]}" ry="${r[0]*0.47}" fill="${r[1]}" fill-opacity="${0.35+i*0.16}" stroke="#8FB0E0" stroke-opacity="0.35"/>`;
    });
    g+=`<text x="${cx}" y="${cy-72}" fill="#CFDCEF" font-size="11.5" text-anchor="middle" font-weight="bold">ARTIFICIAL INTELLIGENCE</text>`;
    g+=`<text x="${cx}" y="${cy-46}" fill="#CFDCEF" font-size="11" text-anchor="middle">Machine Learning</text>`;
    g+=`<text x="${cx}" y="${cy-22}" fill="#DDE8F6" font-size="10.5" text-anchor="middle">Deep Learning</text>`;
    g+=`<text x="${cx}" y="${cy+6}" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">Generative AI</text>`;
    const notes=[['AI','Drug-interaction alerts',40],['ML','Risk & outcome prediction',72],['DL','Imaging, pathology, retina',104],['GenAI','Notes, summaries, translation',136]];
    notes.forEach(nt=>{ g+=`<rect x="500" y="${nt[2]-14}" width="172" height="26" rx="4" fill="#22386A" stroke="#3A5680"/><text x="510" y="${nt[2]+3}" fill="#CFDCEF" font-size="10"><tspan font-weight="bold" fill="#F0DCB4">${nt[0]}</tspan>  ${nt[1]}</text>`; });
    return `<svg viewBox="0 0 690 230" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  h2(){ // fragmented health data -> linked record -> splits
    let g=''; const src=['Paper case notes','Hospital system','Lab & imaging','Programme registries'];
    src.forEach((s,i)=>{ const y=22+i*44; g+=`<rect x="12" y="${y}" width="142" height="34" rx="5" fill="#22386A" stroke="#3A5680"/><text x="83" y="${y+21}" fill="#CFDCEF" font-size="10" text-anchor="middle">${s}</text><path d="M156 ${y+17} L204 106" stroke="#7FA0D0" stroke-opacity="0.45" stroke-width="1.2"/>`; });
    g+=`<rect x="206" y="76" width="132" height="60" rx="7" fill="#C8102E"/><text x="272" y="100" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">LINKED</text><text x="272" y="117" fill="#FFD8DD" font-size="9.5" text-anchor="middle">patient record</text>`;
    g+=`<text x="272" y="152" fill="#FF9BA6" font-size="9.5" text-anchor="middle">needs a consistent patient ID</text>`;
    g+=`<path d="M340 106 h42" stroke="#7FA0D0" stroke-width="1.6" marker-end="url(#ah2)"/>`;
    [['Training','learns the pattern','#2E6FB0',26],['Validation','tunes the model','#4A85C4',84],['Test / external','proves it generalises','#1E7A52',142]].forEach(s=>{
      g+=`<rect x="390" y="${s[3]+8}" width="278" height="42" rx="5" fill="${s[2]}" fill-opacity="0.28" stroke="${s[2]}"/><text x="404" y="${s[3]+27}" fill="#E7EEF9" font-size="10.5" font-weight="bold">${s[0]}</text><text x="404" y="${s[3]+41}" fill="#A8C0E4" font-size="9">${s[1]}</text>`; });
    g+=`<defs><marker id="ah2" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 206" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  h3(){ // three deployment modes
    const modes=[['ASSISTIVE','Clinician reads independently','model offers second opinion','#2E6FB0'],['TRIAGE','All cases still read','model reorders the worklist','#C8102E'],['AUTONOMOUS','No human review','narrow, validated, approved only','#8a6a1e']];
    let g=''; const w=206,gap=16,x0=20;
    modes.forEach((m,i)=>{ const x=x0+i*(w+gap);
      g+=`<rect x="${x}" y="40" width="${w}" height="96" rx="7" fill="#22386A" stroke="${m[3]}" stroke-width="1.6"/>`;
      g+=`<rect x="${x}" y="40" width="${w}" height="6" fill="${m[3]}"/>`;
      g+=`<text x="${x+w/2}" y="70" fill="#fff" font-size="12.5" text-anchor="middle" font-weight="bold">${m[0]}</text>`;
      g+=`<text x="${x+w/2}" y="92" fill="#CFDCEF" font-size="10" text-anchor="middle">${m[1]}</text>`;
      g+=`<text x="${x+w/2}" y="110" fill="#A8C0E4" font-size="9.5" text-anchor="middle">${m[2]}</text>`;
      g+=`<text x="${x+w/2}" y="128" fill="${m[3]==='#8a6a1e'?'#F0DCB4':'#8FB0E0'}" font-size="9" text-anchor="middle">${i===0?'lowest risk':(i===1?'best value-to-risk':'highest risk')}</text>`;
    });
    g+=`<text x="345" y="24" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">THREE MODES OF CLINICAL DEPLOYMENT</text>`;
    g+=`<text x="345" y="158" fill="#A8C0E4" font-size="10" text-anchor="middle">Clarify the mode before discussing anything else — the same algorithm carries very different risk.</text>`;
    return `<svg viewBox="0 0 690 170" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  h4(){ // real-world use case map
    const cases=[['TB X-ray triage','Tanzania · Zambia'],['Retinopathy screening','Zambia'],['Ubenwa cry analysis','Nigeria'],['Ambient AI scribes','Global'],['Patient navigation','Worldwide'],['Telemedicine triage','India · Nepal'],['Surveillance','Public health'],['Hospital operations','Global']];
    let g=''; const w=158,h=52,cols=4;
    cases.forEach((c,i)=>{ const x=12+(i%cols)*(w+8), y=30+Math.floor(i/cols)*(h+10);
      const hot=i<3;
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#22386A" stroke="${hot?'#C8102E':'#3A5680'}"/>`;
      g+=`<rect x="${x}" y="${y}" width="4" height="${h}" fill="${hot?'#C8102E':'#2E6FB0'}"/>`;
      g+=`<text x="${x+13}" y="${y+22}" fill="#fff" font-size="10.5" font-weight="bold">${c[0]}</text>`;
      g+=`<text x="${x+13}" y="${y+38}" fill="#A8C0E4" font-size="9">${c[1]}</text>`; });
    g+=`<text x="345" y="18" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">DEPLOYED TODAY — RED BORDER = MOST TRANSFERABLE TO NEPAL</text>`;
    return `<svg viewBox="0 0 690 150" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  h5(){ // RAG for clinical protocols
    let g='';
    const box=(x,y,w,h,fill,stroke,t1,t2,c1,c2)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${stroke}"/><text x="${x+w/2}" y="${y+h/2-3}" fill="${c1}" font-size="11" text-anchor="middle" font-weight="bold">${t1}</text>${t2?`<text x="${x+w/2}" y="${y+h/2+13}" fill="${c2}" font-size="9.5" text-anchor="middle">${t2}</text>`:''}`;
    g+=box(12,72,108,54,'#22386A','#3A5680','Clinician asks','"What is our..."','#fff','#A8C0E4');
    g+=`<path d="M122 99 h32" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#ah5)"/>`;
    g+=box(156,72,116,54,'#2E6FB0','#8FB0E0','RETRIEVE','your protocols','#fff','#DDE8F6');
    g+=box(156,10,116,44,'#12274d','#3A5680','Formulary · guidelines','SOPs · national protocols','#F0DCB4','#A8C0E4');
    g+=`<path d="M214 56 v14" stroke="#7FA0D0" stroke-width="1.4"/>`;
    g+=`<path d="M274 99 h32" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#ah5)"/>`;
    g+=box(308,72,116,54,'#C8102E','#FF6B7A','LLM','answers only from','#fff','#FFD8DD');
    g+=`<text x="366" y="140" fill="#FF9BA6" font-size="9.5" text-anchor="middle">retrieved passages</text>`;
    g+=`<path d="M426 99 h32" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#ah5)"/>`;
    g+=box(460,62,124,74,'#1E7A52','#5FC98D','ANSWER','with citations','#fff','#CFE9DA');
    g+=`<text x="522" y="152" fill="#8FD9B3" font-size="9.5" text-anchor="middle">✓ checkable by a clinician</text>`;
    g+=`<text x="345" y="176" fill="#A8C0E4" font-size="10" text-anchor="middle">Grounding answers in your own approved protocols is what constrains hallucination.</text>`;
    g+=`<defs><marker id="ah5" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 190" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  h6(){ // clinical risk taxonomy
    const risks=[['Patient harm','missed & false findings'],['Bias & equity','unlike populations'],['Dataset shift','silent degradation'],['Automation bias','deference & deskilling'],['Privacy','shadow AI · re-identification'],['Cyber & dependency','downtime is a safety issue'],['Vendor risk','pilots that end'],['Legal & professional','clinician carries the risk']];
    let g=''; const w=158,h=58,cols=4;
    risks.forEach((r,i)=>{ const x=12+(i%cols)*(w+8), y=10+Math.floor(i/cols)*(h+10);
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#22386A" stroke="#C8102E" stroke-opacity="0.5"/>`;
      g+=`<rect x="${x}" y="${y}" width="4" height="${h}" fill="#C8102E"/>`;
      g+=`<text x="${x+14}" y="${y+24}" fill="#fff" font-size="11.5" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+14}" y="${y+41}" fill="#A8C0E4" font-size="9">${r[1]}</text>`; });
    g+=`<text x="345" y="152" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">In healthcare, an AI failure can mean patient harm — assess all eight</text>`;
    return `<svg viewBox="0 0 690 164" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  h7(){ // RISE framework
    const q=[['R','Robust Capacity Building','Train and empower local professionals','#C8102E'],['I','Inclusive Research Agenda','Localisation over one-size-fits-all','#2E6FB0'],['S','Smart & Accessible Infrastructure','Affordable, interoperable, low-resource ready','#B8892B'],['E','Equitable & Secure Data','Fair, safe, representative data practices','#1E7A52']];
    let g=''; const w=320,h=76;
    q.forEach((v,i)=>{ const x=14+(i%2)*(w+12), y=32+Math.floor(i/2)*(h+12);
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="${v[3]}" fill-opacity="0.17" stroke="${v[3]}"/>`;
      g+=`<circle cx="${x+30}" cy="${y+38}" r="19" fill="${v[3]}"/><text x="${x+30}" y="${y+44}" fill="#fff" font-size="17" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g+=`<text x="${x+60}" y="${y+32}" fill="#fff" font-size="12" font-weight="bold">${v[1]}</text>`;
      g+=`<text x="${x+60}" y="${y+52}" fill="#CFDCEF" font-size="9.5">${v[2]}</text>`; });
    g+=`<text x="345" y="20" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THE RISE FRAMEWORK — WHO · ITU · WIPO (GI-AI4H)</text>`;
    g+=`<text x="345" y="216" fill="#A8C0E4" font-size="10" text-anchor="middle">Modular and mutually reinforcing — countries prioritise according to their own capacity and needs.</text>`;
    return `<svg viewBox="0 0 690 228" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  h8(){ // governance lifecycle
    const steps=['Assess need','Validate locally','Approve','Set threshold','Deploy','Monitor','Review / withdraw'];
    const cx=345,cy=122,r=76; let g='';
    g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3A5680" stroke-width="1.4" stroke-dasharray="5 5"/>`;
    steps.forEach((s,i)=>{ const a=(Math.PI*2*i)/steps.length - Math.PI/2;
      const x=cx+Math.cos(a)*r, y=cy+Math.sin(a)*r, isV=(i===1);
      g+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="15" fill="${isV?'#C8102E':'#24406F'}" stroke="${isV?'#FFD8DD':'#8FB0E0'}" stroke-width="1.4"/>`;
      g+=`<text x="${x.toFixed(1)}" y="${(y+4).toFixed(1)}" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">${i+1}</text>`;
      const lx=cx+Math.cos(a)*(r+46), ly=cy+Math.sin(a)*(r+26);
      g+=`<text x="${lx.toFixed(1)}" y="${(ly+4).toFixed(1)}" fill="${isV?'#FF9BA6':'#CFDCEF'}" font-size="10" text-anchor="middle" font-weight="${isV?'bold':'normal'}">${s}</text>`; });
    g+=`<circle r="6" fill="#F0DCB4"><animateMotion dur="9s" repeatCount="indefinite" path="M${cx} ${cy-r} A ${r} ${r} 0 1 1 ${cx-0.1} ${cy-r}"/></circle>`;
    g+=`<text x="${cx}" y="${cy-4}" fill="#F0DCB4" font-size="10" text-anchor="middle" font-weight="bold">CLINICAL AI</text><text x="${cx}" y="${cy+11}" fill="#F0DCB4" font-size="10" text-anchor="middle" font-weight="bold">GOVERNANCE</text>`;
    g+=`<text x="${cx}" y="258" fill="#A8C0E4" font-size="10" text-anchor="middle">Local validation is the step most often skipped — and the one that protects your patients.</text>`;
    return `<svg viewBox="0 0 690 270" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  h9(){ // 10-20-70 rule
    let g=''; const total=620, x0=35, y=52, h=54;
    const parts=[[10,'#2E6FB0','Algorithms'],[20,'#B8892B','Technology & data'],[70,'#C8102E','People & processes']];
    let acc=0;
    parts.forEach(p=>{ const w=total*p[0]/100, x=x0+acc;
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${p[1]}" fill-opacity="0.85" stroke="#0d1a35"/>`;
      g+=`<text x="${x+w/2}" y="${y+26}" fill="#fff" font-size="${p[0]===10?12:16}" text-anchor="middle" font-weight="bold">${p[0]}%</text>`;
      g+=`<text x="${x+w/2}" y="${y+44}" fill="#fff" font-size="${p[0]===10?8:10}" text-anchor="middle">${p[2]}</text>`;
      acc+=w; });
    g+=`<text x="345" y="30" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold">THE 10-20-70 RULE</text>`;
    g+=`<text x="345" y="132" fill="#CFDCEF" font-size="11" text-anchor="middle">Most of the effort is people and process — not the model.</text>`;
    g+=`<text x="345" y="152" fill="#A8C0E4" font-size="9.5" text-anchor="middle">If your implementation plan is mostly technical, it is inverted.</text>`;
    return `<svg viewBox="0 0 690 168" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  }
};
const FIGCAP={
  h1:"AI, machine learning, deep learning and generative AI — with their clinical counterparts.",
  h2:"Fragmented health data must be linked before any model can be trained honestly.",
  h3:"The same algorithm carries very different risk depending on how it is deployed.",
  h4:"Documented deployments — the red-bordered examples transfer most directly to Nepal.",
  h5:"Retrieval-augmented generation grounded in your own clinical protocols.",
  h6:"The clinical AI risk taxonomy — all eight categories require assessment.",
  h7:"The RISE framework for equitable AI adoption in health systems.",
  h8:"The clinical AI governance cycle, from assessment through monitoring to withdrawal.",
  h9:"BCG's 10-20-70 rule: implementation succeeds or fails on people and process."
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
    <h1>AI for Healthcare<br>Professionals</h1>
    <p class="lead">An applied programme for doctors, nurses, public health professionals and health managers in Nepal and other developing countries — covering diagnosis and clinical decision support, real-world deployments improving care today, clinical risk, health equity and governance.</p>
    <div class="meta">
      <span class="chip">◷ ${N} modules · ${hoursLabel()} of structured learning</span>
      <span class="chip">◈ Intermediate to advanced</span>
      <span class="chip g">★ Certificate of Completion</span>
      <span class="chip">⚑ Built for Nepal &amp; developing countries</span>
      ${isPaid()?'<span class="chip g">✓ Full access unlocked</span>':`<span class="chip g">${PRICE.currency} ${PRICE.amount}${PRICE.was?' · introductory':''}</span>`}
    </div>
    ${isPaid()
      ? `<button class="btn" onclick="resume()">${doneCount()>0?'Resume programme':'Begin Module 1'} →</button>`
      : `<button class="btn" onclick="go('m1')">Start free preview — Module 1 →</button>
         <button class="btn gold sm" style="margin-left:10px" onclick="go('pay')">Get full access · ${PRICE.currency} ${PRICE.amount}</button>`}
  </section>

  <div class="grid3">
    <div class="feat r"><h3>Built for clinical practice</h3><p>Every concept is applied to diagnosis, patient safety, clinical workflow and health systems — not generic technology training.</p></div>
    <div class="feat"><h3>Real deployments</h3><p>A full module on AI improving patient care today — TB screening, retinopathy, neonatal care, documentation — and what transfers to our setting.</p></div>
    <div class="feat g"><h3>Decision-ready</h3><p>You finish with a defensible AI use-case proposal you can take to your own clinical governance committee.</p></div>
  </div>

  <div class="evid" style="margin-top:18px">
    <div class="src"><span class="tag">Grounded in industry research</span></div>
    <p style="margin-bottom:8px">Module content draws on published research from the <b>World Health Organization</b>, the <b>World Economic Forum</b>, <b>UNDP</b>, <b>Boston Consulting Group</b>, <b>KPMG &amp; FICCI</b>, <b>OpenAI</b> and <b>npj Health Systems (Nature)</b> — applied throughout to the realities of health systems in Nepal and comparable developing countries. Findings, frameworks and data are attributed inline where they appear.</p>
    <button class="btn out sm" onclick="go('sources')">View sources &amp; further reading ›</button>
  </div>

  <div class="sectitle">Programme curriculum</div>
  <div id="homeModList"></div>

  <div class="sectitle">Who this programme is for</div>
  <div class="grid2">
    <div class="feat"><h3>Clinical professionals</h3><p>Doctors, nurses, midwives, radiographers, laboratory scientists, pharmacists and allied health professionals in hospital and primary care settings.</p></div>
    <div class="feat"><h3>Public health &amp; leadership</h3><p>Public health professionals, programme managers, hospital administrators, medical directors, health informatics staff and policy advisers.</p></div>
  </div>

  <div class="sectitle">How the programme works</div>
  <div class="grid3">
    <div class="feat"><h3>1 · Study</h3><p>${N} in-depth modules with clinical examples, practitioner notes and diagrams.</p></div>
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
      <p>${lockedRange()} cover clinical diagnosis and decision support, real-world deployments improving patient care today, generative AI in practice, clinical risk and patient safety, health equity in developing countries, and governance — plus all assessments and your certificate.</p>
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
      <p>All ${N} modules must be completed to claim your certificate.<br>You have completed <b>${doneCount()} of ${N}</b>.</p>
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
    <h2>AI for Healthcare Professionals</h2>
    <div class="csub">Professional Certificate Programme · ${hoursLabel()}</div>
    <div class="pres">This is to certify that</div>
    <div class="cname">${escapeHtml(d.name)}</div>
    <div class="corg">${d.org?escapeHtml(d.org):'&nbsp;'}${d.role?' · '+escapeHtml(d.role):''}</div>
    <div class="cdesc">has successfully completed all ${N} modules and assessments of <b>AI for Healthcare Professionals</b>, an applied programme covering artificial intelligence in clinical diagnosis and decision support, real-world deployments in patient care, clinical risk and patient safety, health equity, and the governance of AI in health systems.</div>
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
  return 'RDT-AIHP-'+y+'-'+Math.abs(hsh).toString(36).toUpperCase().padStart(6,'0').slice(0,6);
}
function leadFormView(){
  return `
  <div class="lesson-head"><div class="ltag">★ All ${N} modules complete</div><h2>Claim your certificate</h2>
    <div class="lmeta">Please confirm your details for the certificate record.</div></div>
  <div class="leadcard">
    <h3>Certificate details</h3>
    <p class="sub">Your name and institution will appear on the certificate.</p>
    <div class="field"><label>Full name *</label><input id="lf-name" placeholder="As it should appear on the certificate" oninput="clearLeadErr()"></div>
    <div class="field"><label>Work email address *</label><input id="lf-email" type="email" placeholder="name@yourhospital.org.np" oninput="clearLeadErr()"></div>
    <div class="field"><label>Institution *</label><input id="lf-org" placeholder="e.g. Tribhuvan University Teaching Hospital" oninput="clearLeadErr()"></div>
    <div class="field"><label>Designation</label><input id="lf-role" placeholder="e.g. Medical Officer, Staff Nurse, Programme Manager"></div>
    <div class="field"><label>Department</label>
      <select id="lf-dept">
        <option value="">Select (optional)</option>
        <option>Medicine / General Practice</option><option>Surgery</option><option>Nursing &amp; Midwifery</option>
        <option>Radiology / Imaging</option><option>Laboratory / Pathology</option><option>Public Health</option>
        <option>Pharmacy</option><option>Hospital Administration</option><option>Health Informatics / IT</option>
        <option>Academia / Research</option><option>Other</option>
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
      <h2>Unlock all ${N} modules &amp; your certificate</h2>
      <p>You have been reading the free preview. Full access opens ${lockedRange()}, all assessments, and your Certificate of Completion.</p>
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
        <div class="field"><label>Work email *</label><input id="ac-email" type="email" placeholder="name@yourhospital.org.np" oninput="clearPayErr()"></div>
        <div class="field"><label>Institution *</label><input id="ac-org" placeholder="Your hospital or organisation" oninput="clearPayErr()"></div>
        <div class="field"><label>Fonepay transaction reference</label><input id="ac-txn" placeholder="From your payment confirmation"></div>
        <button class="btn navy sm" style="width:100%;justify-content:center" onclick="requestCode()">Send my payment details →</button>
        <div class="privacy">Questions? ${CONTACT.email} · ${CONTACT.phone}</div>
      </div>
    </div>

    <div class="paycard">
      <div class="ph">What full access includes</div>
      <div class="grid2" style="margin-top:6px">
        <ul class="incl">
          <li>All ${N} modules — ${hoursLabel()} of structured learning</li>
          <li>${totalQuestions()} assessment questions across the programme</li>
          <li>A dedicated module on real-world AI deployments improving patient care today</li>
          <li>Content built for Nepal and other developing-country health systems</li>
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
    course:"AI for Healthcare Professionals",date:new Date().toISOString(),source:"Paywall — payment submitted"};
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
    course:"AI for Healthcare Professionals",hours:hoursLabel(),source:"AI for Healthcare Professionals"};
  save();
  if(LEAD_ENDPOINT){try{fetch(LEAD_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(state.lead)});}catch(e){}}
  go('cert');
}
const SOURCES=[
  ["World Economic Forum &amp; BCG","The Future of AI-Enabled Health: Leading the Way (January 2025)","Source of the six pivotal transitions, the three barriers to scaling AI in health, market growth projections, and the framing of leapfrogging opportunities for low- and middle-income countries."],
  ["OpenAI","AI as a Healthcare Ally (January 2026)","Analysis of anonymised ChatGPT usage showing the scale of public health-seeking behaviour, out-of-hours patterns, rural access gaps, and documented cases of AI-assisted care navigation and escalation."],
  ["UNDP Human Development Report Office","AI and Big Data Deployment in Health Care: Governance Solutions for Developing Country Governments (Miriam Stankovich)","Background paper for the 2022 Special Report on Human Security. Source of workforce and access statistics, developing-country deployment examples including CAD4TB, Ubenwa and retinopathy screening, and governance recommendations."],
  ["World Health Organization","Artificial Intelligence and Evidence-Informed Policy — discussion paper (2026)","WHO guidance on the intersection of AI with evidence-informed health policy-making, including risks, challenges and governance frameworks."],
  ["npj Health Systems (Nature)","Driving global health equity with artificial intelligence: the Global Initiative on AI for Health (GI-AI4H)","Raskar, Chopra, AlSalamah, Farlow, Kalra et al. Source of the RISE framework and the ENABLE / FACILITATE / IMPLEMENT pillars of the WHO-ITU-WIPO initiative."],
  ["Boston Consulting Group","The Stairway to GenAI Impact in the Health Care Industry (April 2025)","Source of adoption benchmarks across healthcare segments, projected OPEX and revenue effects, the health workforce shortfall projection, and the three success factors for scaling."],
  ["Boston Consulting Group / BCG X","How AI Agents and Tech Will Transform Health Care in 2026 (December 2025)","Source of the 10-20-70 rule, ambient AI scribe adoption, precision medicine outlook, and guidance on workforce augmentation and AI literacy."],
  ["KPMG &amp; FICCI (India)","AI in Healthcare: Reimagine care with AI-driven transformation (October 2025)","Indian healthcare use cases across the value chain — public health, hospital operations, clinical screening, documentation and patient engagement — with direct relevance to comparable South Asian systems."],
  ["KPMG","Intelligent Healthcare: A blueprint for creating value through AI-driven transformation (June 2025)","Executive research on AI value realisation in healthcare organisations, ROI measurement and the phased journey to an intelligent healthcare organisation."],
  ["Boston Consulting Group","A (Gen)AI Pathfinder: Unlock the potential of (Gen)AI in health insurance (August 2024)","Source of health insurance and payer applications, operational efficiency estimates, and the four-pillar operating model for scaling responsibly."],
  ["Nepal — national framework","Privacy Act (2075), health sector regulation and institutional ethics oversight","The governing local framework for health data and clinical research in Nepal. Requirements continue to evolve — always confirm the current position with your institution's ethics committee and the relevant national authority."]
];
function sourcesView(){
  return `
  <div class="lesson-head"><div class="ltag">Reference</div><h2>Sources &amp; Further Reading</h2>
    <div class="lmeta">The industry research underpinning this programme.</div></div>
  <p style="font-size:15.5px;margin-bottom:18px">This programme has been developed by Red Dot Technologies and draws on published research and white papers from leading global advisory, technology and academic institutions, applied to the regulatory and market context of Nepal. Where a specific statistic, framework or practitioner quotation appears in a module, it is attributed inline to its source.</p>
  <div class="srcgrid">
    ${SOURCES.map(s=>`<div class="srccard"><div class="org">${s[0]}</div><h4>${s[1]}</h4><p>${s[2]}</p></div>`).join('')}
  </div>
  <div class="callout note" style="margin-top:22px"><h4>A note on the use of this material</h4><p style="margin:0">Statistics and findings are reproduced for educational purposes and remain the intellectual property of their respective publishers. Figures reflect the period in which each study was conducted and should be treated as indicative of direction rather than as current precise values. Participants are encouraged to consult the original publications, and to verify all regulatory and ethical positions with their own institution’s ethics committee and the relevant national health authority.</p></div>
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
  <span style="opacity:.85">This programme is provided for professional education. It does not constitute clinical, legal or regulatory advice, and nothing in it should be used to guide the care of an individual patient. Clinical decisions remain the responsibility of the treating health professional. Always confirm regulatory and ethical requirements with your institution and the relevant national authority.</span></div>`;
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
