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
const KEY="aiFinAdv_v1";
let state=JSON.parse(localStorage.getItem(KEY)||'{}');
state.done=state.done||{};
function save(){localStorage.setItem(KEY,JSON.stringify(state));}
function isPaid(){return !!(state.access&&state.access.unlocked);}
function isLocked(id){return !isPaid() && FREE_PREVIEW.indexOf(id)===-1;}
const N=COURSE.lessons.length;
function doneCount(){return COURSE.lessons.filter(l=>state.done[l.id]).length;}
function allDone(){return doneCount()===N;}
function totalQuestions(){return COURSE.lessons.reduce((a,l)=>a+l.quiz.length,0);}
function lockedFrom(){for(let i=0;i<COURSE.lessons.length;i++){if(FREE_PREVIEW.indexOf(COURSE.lessons[i].id)===-1)return i+1;}return 1;}
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
  a1(){ // adoption vs transformation gap
    let g=''; const x0=40,w=600,y=54,h=44;
    g+=`<rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="5" fill="#2E6FB0" fill-opacity="0.85"/>`;
    g+=`<text x="${x0+w/2}" y="${y+28}" fill="#fff" font-size="14" text-anchor="middle" font-weight="bold">81% ADOPTING AI</text>`;
    const w2=w*14/81;
    g+=`<rect x="${x0}" y="${y+68}" width="${w2}" height="${h}" rx="5" fill="#C8102E"/>`;
    g+=`<text x="${x0+w2/2}" y="${y+96}" fill="#fff" font-size="13" text-anchor="middle" font-weight="bold">14%</text>`;
    g+=`<text x="${x0+w2+16}" y="${y+92}" fill="#FF9BA6" font-size="12" font-weight="bold">see AI as transformational to strategy</text>`;
    g+=`<path d="M${x0+w2} ${y+44} L${x0+w2} ${y+68}" stroke="#FF6B7A" stroke-width="1.5" stroke-dasharray="4 3"/>`;
    g+=`<path d="M${x0+w} ${y+44} L${x0+w2+2} ${y+68}" stroke="#FF6B7A" stroke-opacity="0.5" stroke-width="1.2" stroke-dasharray="4 3"/>`;
    g+=`<text x="345" y="28" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold">THE EXECUTION GAP — CAMBRIDGE CCAF 2026</text>`;
    g+=`<text x="345" y="186" fill="#A8C0E4" font-size="10.5" text-anchor="middle">Adoption without structural change. Closing this gap is what this programme is about.</text>`;
    return `<svg viewBox="0 0 690 200" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a2(){ // capability stack
    const layers=[['ENGAGEMENT','Personalisation · omnichannel · embedded finance','#C8102E'],['AI-POWERED DECISIONING','Decision inventory · feature store · serving · logging','#2E6FB0'],['CORE TECHNOLOGY & DATA','Identifiers · APIs · compute · environments','#B8892B'],['PLATFORM OPERATING MODEL','Persistent ownership · funding · standards · decision rights','#1E7A52']];
    let g=''; const w=560,h=40,x0=65;
    layers.forEach((l,i)=>{ const y=36+i*(h+10);
      g+=`<rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="5" fill="${l[2]}" fill-opacity="0.2" stroke="${l[2]}"/>`;
      g+=`<rect x="${x0}" y="${y}" width="5" height="${h}" fill="${l[2]}"/>`;
      g+=`<text x="${x0+18}" y="${y+18}" fill="#fff" font-size="11.5" font-weight="bold">${l[0]}</text>`;
      g+=`<text x="${x0+18}" y="${y+33}" fill="#CFDCEF" font-size="9.5">${l[1]}</text>`; });
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THE AI CAPABILITY STACK</text>`;
    g+=`<text x="345" y="240" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">The institution performs at the level of its weakest layer.</text>`;
    return `<svg viewBox="0 0 690 252" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a3(){ // model tiering
    const t=[['TIER 1','Determines customer outcomes or regulatory numbers','Full independent validation · annual revalidation · continuous monitoring','#C8102E'],['TIER 2','Materially informs decisions with human review','Independent review · periodic revalidation · regular monitoring','#B8892B'],['TIER 3','Internal productivity, no direct consequence','Lighter review · documented owner · spot checks','#2E6FB0']];
    let g=''; const w=612,h=52,x0=39;
    t.forEach((r,i)=>{ const y=34+i*(h+10);
      g+=`<rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="5" fill="#22386A" stroke="${r[3]}"/>`;
      g+=`<rect x="${x0}" y="${y}" width="76" height="${h}" rx="5" fill="${r[3]}"/>`;
      g+=`<text x="${x0+38}" y="${y+31}" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x0+90}" y="${y+22}" fill="#fff" font-size="10.5" font-weight="bold">${r[1]}</text>`;
      g+=`<text x="${x0+90}" y="${y+38}" fill="#A8C0E4" font-size="9.5">${r[2]}</text>`; });
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">RISK TIERING DRIVES PROPORTIONATE CONTROL</text>`;
    return `<svg viewBox="0 0 690 226" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a4(){ // explainability by stakeholder
    const s=[['Customer','Plain language · few factors · counterfactual','#C8102E'],['Front line','Enough to converse and to challenge','#2E6FB0'],['Validator','Global behaviour · dependencies · stability','#B8892B'],['Supervisor','Transparency · fairness · accountability evidence','#1E7A52']];
    let g=''; const w=152,h=88;
    s.forEach((v,i)=>{ const x=22+i*(w+13);
      g+=`<rect x="${x}" y="42" width="${w}" height="${h}" rx="6" fill="${v[2]}" fill-opacity="0.18" stroke="${v[2]}"/>`;
      g+=`<rect x="${x}" y="42" width="${w}" height="5" fill="${v[2]}"/>`;
      g+=`<text x="${x+w/2}" y="${72}" fill="#fff" font-size="12.5" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      const words=v[1].split(' · ');
      words.forEach((wd,j)=>{ g+=`<text x="${x+w/2}" y="${92+j*15}" fill="#CFDCEF" font-size="9" text-anchor="middle">${wd}</text>`; }); });
    g+=`<text x="345" y="26" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">CONTEXT-AWARE EXPLANATION DESIGN</text>`;
    g+=`<text x="345" y="152" fill="#FF9BA6" font-size="10" text-anchor="middle">An explanation is adequate only if the recipient can act on it or challenge it.</text>`;
    return `<svg viewBox="0 0 690 166" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a5(){ // two stacks
    let g='';
    const col=(x,title,items,c)=>{ let s=`<rect x="${x}" y="36" width="290" height="152" rx="7" fill="${c}" fill-opacity="0.14" stroke="${c}"/><text x="${x+145}" y="58" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${title}</text>`;
      items.forEach((it,i)=>{ s+=`<rect x="${x+16}" y="${70+i*26}" width="258" height="20" rx="3" fill="#12274d" stroke="#3A5680"/><text x="${x+26}" y="${84+i*26}" fill="#CFDCEF" font-size="9.5">${it}</text>`; });
      return s; };
    g+=col(30,'PREDICTIVE AI STACK',['Data warehouse','Feature store','Training pipelines / MLOps','Model serving & monitoring'],'#2E6FB0');
    g+=col(370,'GENERATIVE AI STACK',['Foundation & embedding models','Vector store & retrieval','Prompt / agent orchestration','Guardrails & evaluation harness'],'#C8102E');
    g+=`<text x="345" y="24" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">LARGELY SEPARATE STACKS</text>`;
    g+=`<text x="345" y="208" fill="#A8C0E4" font-size="10" text-anchor="middle">Shared component: the data lake / document store. A weak warehouse does not block document-centric use cases.</text>`;
    return `<svg viewBox="0 0 690 220" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a6(){ // autonomy levels
    const lv=[['L0','Suggest','human acts'],['L1','Draft & stage','human releases'],['L2','Act within limits','escalates outside'],['L3','Act, review exceptions','post-hoc sampling'],['L4','Fully autonomous','reversible only']];
    let g=''; const w=118,x0=28;
    lv.forEach((l,i)=>{ const x=x0+i*(w+12), hgt=44+i*14, y=150-hgt;
      const c = i<=1?'#1E7A52':(i===2?'#B8892B':'#C8102E');
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${hgt}" rx="5" fill="${c}" fill-opacity="0.28" stroke="${c}"/>`;
      g+=`<text x="${x+w/2}" y="${y+20}" fill="#fff" font-size="13" text-anchor="middle" font-weight="bold">${l[0]}</text>`;
      g+=`<text x="${x+w/2}" y="${166}" fill="#CFDCEF" font-size="10" text-anchor="middle">${l[1]}</text>`;
      g+=`<text x="${x+w/2}" y="${180}" fill="#A8C0E4" font-size="8.5" text-anchor="middle">${l[2]}</text>`; });
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">LEVELS OF AGENT AUTONOMY</text>`;
    g+=`<text x="345" y="202" fill="#FF9BA6" font-size="10" text-anchor="middle">For customer funds, credit or financial crime: Level 1–2 with hard limits is the defensible position.</text>`;
    return `<svg viewBox="0 0 690 214" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a7(){ // credit parameters
    const p=[['PD','Probability of default','data-rich · ML contributes most','#C8102E'],['LGD','Loss given default','only defaults contribute · scarce','#B8892B'],['EAD','Exposure at default','drawdown behaviour · complex','#2E6FB0']];
    let g=''; const w=196,x0=36;
    p.forEach((v,i)=>{ const x=x0+i*(w+14);
      g+=`<rect x="${x}" y="42" width="${w}" height="80" rx="7" fill="#22386A" stroke="${v[3]}"/>`;
      g+=`<circle cx="${x+34}" cy="${74}" r="21" fill="${v[3]}"/><text x="${x+34}" y="${80}" fill="#fff" font-size="14" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g+=`<text x="${x+64}" y="${70}" fill="#fff" font-size="10.5" font-weight="bold">${v[1]}</text>`;
      g+=`<text x="${x+64}" y="${88}" fill="#A8C0E4" font-size="9">${v[2]}</text>`; });
    g+=`<rect x="36" y="134" width="618" height="34" rx="5" fill="#C8102E" fill-opacity="0.16" stroke="#FF6B7A"/>`;
    g+=`<text x="345" y="155" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">ECL is audited — calibration and explainability are non-negotiable</text>`;
    g+=`<text x="345" y="26" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THE CREDIT PARAMETER SET</text>`;
    return `<svg viewBox="0 0 690 182" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a8(){ // financial crime architecture layers
    const L=['Deterministic rules — regulatory thresholds','Entity resolution — the foundation','Supervised models — known typologies','Unsupervised detection — novel behaviour','Network analytics — structure across entities','Investigator workbench — enriched cases'];
    let g=''; const w=520,x0=85;
    L.forEach((t,i)=>{ const y=32+i*27;
      const c = i===1?'#C8102E':'#2E6FB0';
      g+=`<rect x="${x0}" y="${y}" width="${w}" height="22" rx="4" fill="${c}" fill-opacity="${i===1?0.34:0.18}" stroke="${c}"/>`;
      g+=`<text x="${x0+14}" y="${y+15}" fill="#fff" font-size="10">${t}</text>`; });
    g+=`<text x="345" y="20" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">LAYERED FINANCIAL CRIME ARCHITECTURE</text>`;
    g+=`<text x="345" y="212" fill="#FF9BA6" font-size="10" text-anchor="middle">Entity resolution delivers more detection uplift per rupee than any new model.</text>`;
    return `<svg viewBox="0 0 690 224" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a9(){ // three lines of defence
    const l=[['FIRST LINE','Business & development','Owns model, use, performance, outcomes','#2E6FB0'],['SECOND LINE','Risk & compliance','Framework, tiering, independent validation','#C8102E'],['THIRD LINE','Internal audit','Assures the framework operates as documented','#B8892B']];
    let g=''; const w=196,x0=36;
    l.forEach((v,i)=>{ const x=x0+i*(w+14);
      g+=`<rect x="${x}" y="40" width="${w}" height="96" rx="7" fill="${v[3]}" fill-opacity="0.17" stroke="${v[3]}"/>`;
      g+=`<rect x="${x}" y="40" width="${w}" height="5" fill="${v[3]}"/>`;
      g+=`<text x="${x+w/2}" y="68" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g+=`<text x="${x+w/2}" y="90" fill="#CFDCEF" font-size="10" text-anchor="middle">${v[1]}</text>`;
      g+=`<text x="${x+w/2}" y="112" fill="#A8C0E4" font-size="8.5" text-anchor="middle">${v[2].slice(0,30)}</text>`;
      g+=`<text x="${x+w/2}" y="125" fill="#A8C0E4" font-size="8.5" text-anchor="middle">${v[2].slice(30)}</text>`; });
    g+=`<text x="345" y="24" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THREE LINES OF DEFENCE, APPLIED TO AI</text>`;
    g+=`<text x="345" y="158" fill="#FF9BA6" font-size="10" text-anchor="middle">The binding constraint is second-line technical capability.</text>`;
    return `<svg viewBox="0 0 690 170" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a10(){ // herding
    let g=''; const cx=345;
    for(let i=0;i<7;i++){ const x=70+i*84;
      g+=`<rect x="${x}" y="46" width="58" height="34" rx="4" fill="#22386A" stroke="#3A5680"/>`;
      g+=`<text x="${x+29}" y="67" fill="#CFDCEF" font-size="9" text-anchor="middle">Bank ${i+1}</text>`;
      g+=`<path d="M${x+29} 82 L${cx} 118" stroke="#FF6B7A" stroke-opacity="0.45" stroke-width="1.2"/>`; }
    g+=`<rect x="${cx-96}" y="118" width="192" height="34" rx="5" fill="#C8102E"/>`;
    g+=`<text x="${cx}" y="140" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">SIMILAR MODELS · SAME DATA</text>`;
    g+=`<path d="M${cx} 154 v18" stroke="#FF6B7A" stroke-width="1.8" marker-end="url(#ah10)"/>`;
    g+=`<rect x="${cx-150}" y="176" width="300" height="30" rx="5" fill="#B8892B" fill-opacity="0.22" stroke="#F0DCB4"/>`;
    g+=`<text x="${cx}" y="196" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">CORRELATED ACTION → AMPLIFIED MOVEMENT</text>`;
    g+=`<text x="345" y="28" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">MODEL HERDING AS A STABILITY RISK — BIS</text>`;
    g+=`<defs><marker id="ah10" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#FF6B7A"/></marker></defs>`;
    return `<svg viewBox="0 0 690 218" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a11(){ // four levels of value
    const lv=[['ACTIVITY','models deployed · users','worthless as evidence','#5A6779'],['OPERATIONAL','cycle time · cost per file','directly attributable','#2E6FB0'],['BUSINESS','approval at constant risk','control for confounds','#B8892B'],['FINANCIAL','revenue · cost · efficiency ratio','the only level a board accepts','#1E7A52']];
    let g=''; const w=148,x0=32;
    lv.forEach((v,i)=>{ const x=x0+i*(w+14);
      g+=`<rect x="${x}" y="44" width="${w}" height="86" rx="6" fill="${v[3]}" fill-opacity="0.2" stroke="${v[3]}"/>`;
      g+=`<text x="${x+w/2}" y="70" fill="#fff" font-size="11.5" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g+=`<text x="${x+w/2}" y="92" fill="#CFDCEF" font-size="8.5" text-anchor="middle">${v[1]}</text>`;
      g+=`<text x="${x+w/2}" y="114" fill="#A8C0E4" font-size="8.5" text-anchor="middle">${v[2]}</text>`;
      if(i<3) g+=`<path d="M${x+w+2} 87 h10" stroke="#7FA0D0" stroke-width="1.5" marker-end="url(#ah11)"/>`; });
    g+=`<text x="345" y="28" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">FOUR LEVELS OF VALUE MEASUREMENT</text>`;
    g+=`<text x="345" y="152" fill="#FF9BA6" font-size="10" text-anchor="middle">Define one metric at each level — and the mechanism linking them.</text>`;
    g+=`<defs><marker id="ah11" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L7 4 L0 8 z" fill="#7FA0D0"/></marker></defs>`;
    return `<svg viewBox="0 0 690 164" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  a12(){ // three horizons
    const h=[['HORIZON 1','0–12 months','Foundations & credible wins','#2E6FB0'],['HORIZON 2','12–30 months','Decisioning & scale','#B8892B'],['HORIZON 3','30 months +','Business model','#C8102E']];
    let g=''; const w=200,x0=36;
    h.forEach((v,i)=>{ const x=x0+i*(w+11), ht=64+i*18, y=150-ht;
      g+=`<rect x="${x}" y="${y}" width="${w}" height="${ht}" rx="6" fill="${v[3]}" fill-opacity="0.22" stroke="${v[3]}"/>`;
      g+=`<text x="${x+w/2}" y="${y+24}" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${v[0]}</text>`;
      g+=`<text x="${x+w/2}" y="${y+42}" fill="#F0DCB4" font-size="9.5" text-anchor="middle">${v[1]}</text>`;
      g+=`<text x="${x+w/2}" y="166" fill="#CFDCEF" font-size="10" text-anchor="middle">${v[2]}</text>`; });
    g+=`<text x="345" y="24" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">THREE-HORIZON ROADMAP</text>`;
    g+=`<text x="345" y="192" fill="#FF9BA6" font-size="10" text-anchor="middle">Only in Horizon 3 does an institution begin crossing from the 86% into the 14%.</text>`;
    return `<svg viewBox="0 0 690 204" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  }
};
const FIGCAP={
  a1:"Adoption is widespread; transformation is rare. The gap between them is the subject of this programme.",
  a2:"The four-layer AI capability stack — performance is capped by the weakest layer.",
  a3:"Risk tiering is how proportionate control is designed and evidenced to a supervisor.",
  a4:"Four audiences, four explanation requirements — context-aware explanation design.",
  a5:"Predictive and generative AI run on largely separate technology stacks.",
  a6:"Levels of agent autonomy, and where the defensible line sits for material processes.",
  a7:"PD, LGD and EAD differ in data availability and regulatory sensitivity.",
  a8:"A layered financial crime architecture, built on entity resolution.",
  a9:"Three lines of defence applied to AI, inside enterprise risk management.",
  a10:"Model uniformity produces correlated action — the core systemic concern identified by BIS.",
  a11:"Four levels of value measurement, from activity through to the P&L.",
  a12:"Sequencing: foundations, then decisioning and scale, then business model."
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
    <span class="kicker">Advanced Certificate Programme · Level 2</span>
    <h1>Advanced AI for<br>Finance Professionals</h1>
    <p class="lead">The follow-on programme for banking professionals who have completed <b>Advanced AI for Finance Professionals</b> and want to move from using AI to architecting, governing and leading it — model risk and validation, explainability, foundation models, agentic AI, systemic risk and enterprise transformation.</p>
    <div style="background:rgba(184,137,43,.16);border:1px solid rgba(184,137,43,.5);border-radius:5px;padding:11px 16px;margin:18px 0 0;max-width:640px">
      <span style="color:#F0DCB4;font-size:12.5px;font-weight:700">PREREQUISITE</span>
      <span style="color:#E7EEF9;font-size:13.5px"> &nbsp;This is an advanced programme. It assumes completion of <b>Advanced AI for Finance Professionals</b> or equivalent working knowledge, and moves quickly into technical and institutional depth.</span>
    </div>
    <div class="meta">
      <span class="chip">◷ ${N} modules · ${hoursLabel()} of structured learning</span>
      <span class="chip">◈ Advanced · builds on Course 1</span>
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
    <div class="feat r"><h3>Architect, not user</h3><p>Model risk frameworks, capability stacks, agentic control, systemic risk — the material required to design and govern AI, not merely to use it.</p></div>
    <div class="feat"><h3>Evidence-led</h3><p>Built on the Cambridge CCAF survey of 628 institutions across 151 jurisdictions, BIS working papers, and peer-reviewed research — not vendor narrative.</p></div>
    <div class="feat g"><h3>Board-ready</h3><p>You finish with a defensible enterprise AI strategy written to be presented to your management committee or board.</p></div>
  </div>

  <div class="evid" style="margin-top:18px">
    <div class="src"><span class="tag">Grounded in industry research</span></div>
    <p style="margin-bottom:8px">Module content draws on the <b>Cambridge Centre for Alternative Finance</b> 2026 global survey, <b>Bank for International Settlements</b> working papers, <b>McKinsey</b>, the <b>World Economic Forum</b>, <b>BCG</b>, <b>PwC</b>, <b>Deloitte</b>, <b>EY</b>, peer-reviewed literature in <i>Applied Artificial Intelligence</i>, and the <b>Oxford Future of Finance and Technology Initiative</b> — applied throughout to the regulatory and market context of Nepal. Findings, frameworks and data are attributed inline where they appear.</p>
    <button class="btn out sm" onclick="go('sources')">View sources &amp; further reading ›</button>
  </div>

  <div class="sectitle">Programme curriculum</div>
  <div id="homeModList"></div>

  <div class="sectitle">Who this programme is for</div>
  <div class="grid2">
    <div class="feat"><h3>Risk, model validation &amp; compliance</h3><p>Senior risk managers, model validators, model risk officers, heads of credit risk, AML and compliance leads, and internal audit.</p></div>
    <div class="feat"><h3>Strategy &amp; senior leadership</h3><p>Heads of digital and transformation, chief data and analytics officers, technology leadership, executive committee members and board members with AI oversight duties.</p></div>
  </div>

  <div class="sectitle">How the programme works</div>
  <div class="grid3">
    <div class="feat"><h3>1 · Study</h3><p>${N} advanced modules with institutional frameworks, practitioner notes and diagrams.</p></div>
    <div class="feat"><h3>2 · Assess</h3><p>A separate assessment follows each module. All questions must be answered correctly to complete it.</p></div>
    <div class="feat"><h3>3 · Apply</h3><p>Workplace exercises build toward a capstone enterprise AI strategy for your own institution.</p></div>
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
      <p>${lockedRange()} cover the AI capability stack, model risk and validation, explainable AI, foundation models, agentic systems, advanced credit risk, financial crime analytics, enterprise governance, systemic risk and transformation — plus all assessments and your certificate.</p>
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
    <h2>Advanced AI for Finance Professionals</h2>
    <div class="csub">Advanced Certificate Programme · Level 2 · ${hoursLabel()}</div>
    <div class="pres">This is to certify that</div>
    <div class="cname">${escapeHtml(d.name)}</div>
    <div class="corg">${d.org?escapeHtml(d.org):'&nbsp;'}${d.role?' · '+escapeHtml(d.role):''}</div>
    <div class="cdesc">has successfully completed all ${N} modules and assessments of <b>Advanced AI for Finance Professionals</b>, an advanced programme covering AI capability architecture, model risk management and validation, explainable AI, foundation models and agentic systems, advanced credit risk, financial crime analytics, enterprise governance, systemic risk and AI-enabled institutional transformation.</div>
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
  return 'RDT-AIFA-'+y+'-'+Math.abs(hsh).toString(36).toUpperCase().padStart(6,'0').slice(0,6);
}
function leadFormView(){
  return `
  <div class="lesson-head"><div class="ltag">★ All ${N} modules complete</div><h2>Claim your certificate</h2>
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
          <li>All ${N} modules — ${hoursLabel()} of structured learning</li>
          <li>${totalQuestions()} assessment questions across the programme</li>
          <li>Advanced modules on model validation, agentic control and systemic risk</li>
          <li>Nepal-specific content aligned to NRB's AI Guidelines</li>
        </ul>
        <ul class="incl">
          <li>Practitioner notes and workplace application exercises</li>
          <li>Capstone: a defensible enterprise AI strategy</li>
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
    course:"Advanced AI for Finance Professionals",date:new Date().toISOString(),source:"Paywall — payment submitted"};
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
    course:"Advanced AI for Finance Professionals",hours:hoursLabel(),source:"Advanced AI for Finance Professionals"};
  save();
  if(LEAD_ENDPOINT){try{fetch(LEAD_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(state.lead)});}catch(e){}}
  go('cert');
}
const SOURCES=[
  ["Cambridge Centre for Alternative Finance","The 2026 Global AI in Financial Services Report: Adoption, impact and risks","University of Cambridge Judge Business School, in partnership with the BIS, IMF, World Economic Forum, IDB, CGAP and the Arab Monetary Fund. Survey of 628 organisations across 151 jurisdictions. Source of adoption benchmarks, the execution gap, agentic adoption data, vendor concentration, profitability and value-measurement findings."],
  ["Bank for International Settlements","Intelligent financial system: how AI is transforming finance (BIS Working Paper No. 1194)","Aldasoro, Gambacorta, Korinek, Shreeti and Stein, June 2024. Source of the financial stability analysis — model herding, uniformity and network connectedness — the real-economy scenarios, and principles for upgrading financial regulation."],
  ["McKinsey &amp; Company","Building the AI Bank of the Future / AI-bank of the future: Can banks meet the AI challenge?","Source of the four-layer AI capability stack — engagement, AI-powered decisioning, core technology and data, and platform operating model — and the estimate of up to USD 1 trillion in annual value for global banking."],
  ["World Economic Forum &amp; Accenture","Artificial Intelligence in Financial Services (January 2025)","Insights from over 100 financial services executives. Source of automation and augmentation potential estimates, AI investment trajectory, and the shift of executive attention from efficiency toward revenue growth."],
  ["Applied Artificial Intelligence (Taylor &amp; Francis)","Explainable Artificial Intelligence in the Banking Sector: A Systematic Literature Review","Tuge &amp; Msweli, 2026. PRISMA 2020 review of 78 peer-reviewed studies and industry reports (2021–2025). Source of the XAI implementation gap, the accuracy–interpretability trade-off, the 'explaining the explanation' problem, and the organisational barriers to adoption."],
  ["Boston Consulting Group","Banking on Generative AI / Generative AI in Banking: Six Myths You Need to Ignore","Source of the foundation model and LLM distinction, the separate generative technology stack, production-grade retrieval requirements, and the deployment archetypes for regulated customer-facing use."],
  ["PwC Strategy&amp;","The Future of Banking: How AI is Reshaping the Industry","Source of the efficiency ratio as a forward-looking indicator of AI maturity, and the estimate of up to a 15-percentage-point efficiency ratio improvement from full AI adoption."],
  ["Deloitte","Artificial Intelligence: Transforming the Future of Banking","Source of executive adoption sentiment, personalisation and customer trust findings, and organisational enablers for successful AI implementation."],
  ["Ernst &amp; Young","AI Bank White Paper: Reconstructing the Financial Paradigm through Intelligent Agents","Source of global AI governance benchmarks, the maturity assessment approach, AI talent composition findings, and model reuse and scalability evidence."],
  ["University of Oxford","AI Preparedness in Established Financial Services Firms","Oxford Future of Finance and Technology Initiative, Saïd Business School. Source of the paradox of caution, findings on efficiency business cases, the integration cost observation, and recommended adoption practices."],
  ["SAS","From Algorithms to Impact: Banking's AI Future","Source of practitioner perspectives from Millennium BCP, Banorte, Old National Bank and Intesa Sanpaolo on leadership, scenario modelling and governance."],
  ["Nepal Rastra Bank","Artificial Intelligence Guidelines and related circulars","The governing regulatory framework for licensed institutions in Nepal — board accountability, risk classification, explainability, fairness, privacy aligned to the Privacy Act (2075), consent and ongoing monitoring. Always work from the current published text and confirm with your compliance function."]
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
    <p>Having completed both levels of the AI for Finance programme, the natural next step is the <b>Professional Excellence &amp; Certification Program (PECP)</b> from Red Dot Technologies, in partnership with the University of South Carolina Upstate — instructor-led, cohort-based professional certification in project management, business analytics, quality and leadership, designed for working professionals.</p>
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
