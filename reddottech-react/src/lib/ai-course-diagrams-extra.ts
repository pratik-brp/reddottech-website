/* eslint-disable */
// @ts-nocheck
// SVG Diagrams for AI for Teachers & Educators and AI for Management Professionals

export const EDUCATION_FIG: Record<string, () => string> = {
  e1(){ // the two-question test
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE TWO-QUESTION TEST</text>`;
    g+=`<rect x="150" y="38" width="390" height="34" rx="6" fill="#2E6FB0" fill-opacity="0.2" stroke="#2E6FB0"/>`;
    g+=`<text x="345" y="60" fill="#fff" font-size="12.5" text-anchor="middle" font-weight="bold">A task in front of you</text>`;
    g+=`<path d="M345 72 L345 88" stroke="#6E7F94" stroke-width="1.4"/>`;
    g+=`<rect x="118" y="88" width="454" height="30" rx="5" fill="#B8892B" fill-opacity="0.18" stroke="#B8892B"/>`;
    g+=`<text x="345" y="108" fill="#F0DCB4" font-size="11.5" text-anchor="middle" font-weight="bold">Whose cognitive effort is this designed to exercise?</text>`;
    const br=[[70,'THE STUDENT\u2019S','If AI does it, the learning is destroyed','#C8102E'],
              [370,'THE TEACHER\u2019S','Overhead \u2014 automate without hesitation','#1E7A52']];
    br.forEach(b=>{
      g+=`<path d="M345 118 L${b[0]+125} 136" stroke="${b[3]}" stroke-width="1.4"/>`;
      g+=`<rect x="${b[0]}" y="136" width="250" height="58" rx="6" fill="${b[3]}" fill-opacity="0.16" stroke="${b[3]}"/>`;
      g+=`<rect x="${b[0]}" y="136" width="250" height="3.5" fill="${b[3]}"/>`;
      g+=`<text x="${b[0]+125}" y="160" fill="#fff" font-size="13" text-anchor="middle" font-weight="bold">${b[1]}</text>`;
      g+=`<text x="${b[0]+125}" y="180" fill="#CFDCEF" font-size="9.8" text-anchor="middle">${b[2]}</text>`;
    });
    g+=`<text x="345" y="216" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">Automate the overhead without hesitation. Protect the learning without exception.</text>`;
    return `<svg viewBox="0 0 690 228" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e2(){ // evidence-based techniques
    const t=[['WORKED EXAMPLES','Step-by-step solutions free working memory for reasoning','#2E6FB0'],
             ['SPACING','Distributed practice beats massed practice','#1E7A52'],
             ['INTERLEAVING','Mixed problem types build discrimination','#B8892B'],
             ['ELABORATION','Connecting new to known makes knowledge usable','#4A8FD0'],
             ['RETRIEVAL PRACTICE','Recalling strengthens far more than re-reading','#C8102E']];
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE FIVE TECHNIQUES WITH THE STRONGEST EVIDENCE</text>`;
    t.forEach((r,i)=>{ const y=40+i*38;
      g+=`<rect x="52" y="${y}" width="586" height="32" rx="5" fill="${r[2]}" fill-opacity="0.14" stroke="${r[2]}" stroke-opacity="0.75"/>`;
      g+=`<rect x="52" y="${y}" width="4.5" height="32" fill="${r[2]}"/>`;
      g+=`<text x="70" y="${y+21}" fill="#fff" font-size="11" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="256" y="${y+21}" fill="#A8C0E4" font-size="9.8">${r[1]}</text>`; });
    g+=`<rect x="52" y="238" width="586" height="30" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="345" y="258" fill="#7FD6A8" font-size="10.8" text-anchor="middle" font-weight="bold">Each makes the student work harder in a productive way \u2014 not work less.</text>`;
    return `<svg viewBox="0 0 690 278" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e3(){ // workload evidence
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">MEASURED WORKLOAD OUTCOMES</text>`;
    // 50 hour week bar
    g+=`<text x="52" y="48" fill="#CFDCEF" font-size="10" font-weight="bold">THE TEACHER WEEK \u2014 ~50 HOURS</text>`;
    const bw=586;
    g+=`<rect x="52" y="56" width="${bw*0.46}" height="26" rx="3" fill="#1E7A52" fill-opacity="0.85"/>`;
    g+=`<rect x="${52+bw*0.46}" y="56" width="${bw*0.54}" height="26" rx="3" fill="#6E7F94" fill-opacity="0.55"/>`;
    g+=`<text x="${52+bw*0.23}" y="74" fill="#fff" font-size="10.5" text-anchor="middle" font-weight="bold">with students</text>`;
    g+=`<text x="${52+bw*0.73}" y="74" fill="#E7EEF9" font-size="10.5" text-anchor="middle" font-weight="bold">planning, admin, marking, meetings</text>`;
    g+=`<text x="638" y="98" fill="#8FA6C8" font-size="9" text-anchor="end">Less than half is direct student interaction</text>`;
    // two systems
    const s=[['BRISBANE CATHOLIC EDUCATION','146 schools \u00b7 13,000 staff','up to 9 hrs','saved per week','#1E7A52',52],
             ['BROWARD COUNTY SCHOOLS','20,000+ licences \u00b7 75% active use','over 2 hrs','saved per week','#B8892B',352]];
    s.forEach(r=>{
      g+=`<rect x="${r[5]}" y="112" width="286" height="76" rx="6" fill="${r[4]}" fill-opacity="0.15" stroke="${r[4]}"/>`;
      g+=`<rect x="${r[5]}" y="112" width="286" height="3.5" fill="${r[4]}"/>`;
      g+=`<text x="${r[5]+143}" y="132" fill="#CFDCEF" font-size="9.3" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${r[5]+143}" y="146" fill="#8FA6C8" font-size="8.6" text-anchor="middle">${r[1]}</text>`;
      g+=`<text x="${r[5]+143}" y="170" fill="#fff" font-size="19" text-anchor="middle" font-weight="bold">${r[2]}</text>`;
      g+=`<text x="${r[5]+143}" y="183" fill="#A8C0E4" font-size="9" text-anchor="middle">${r[3]}</text>`; });
    g+=`<text x="345" y="210" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">Same software. The difference is training, workflow redesign and time to learn.</text>`;
    return `<svg viewBox="0 0 690 222" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e4(){ // differentiation done right vs wrong
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">DIFFERENTIATE THE SUPPORT, NOT THE OBJECTIVE</text>`;
    const cols=[['THE TRAP','#C8102E',52,['Lower the demand','Shorter, simpler sheet','Visibly different','Permanent ability label','Gap widens']],
                ['THE PRACTICE','#1E7A52',352,['Same objective for all','Vary only the scaffolding','Matched length and format','Responsive to the task','Gap closes']]];
    cols.forEach(c=>{
      g+=`<rect x="${c[2]}" y="38" width="286" height="176" rx="6" fill="${c[1]}" fill-opacity="0.13" stroke="${c[1]}"/>`;
      g+=`<rect x="${c[2]}" y="38" width="286" height="26" rx="6" fill="${c[1]}" fill-opacity="0.35"/>`;
      g+=`<text x="${c[2]+143}" y="56" fill="#fff" font-size="11.5" text-anchor="middle" font-weight="bold">${c[0]}</text>`;
      c[3].forEach((ln,j)=>{
        g+=`<circle cx="${c[2]+22}" cy="${84+j*26}" r="3.4" fill="${c[1]}"/>`;
        g+=`<text x="${c[2]+36}" y="${88+j*26}" fill="#CFDCEF" font-size="10">${ln}</text>`; });
    });
    g+=`<text x="345" y="236" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">State it in the prompt: "All versions assess the same objective. Vary only the scaffolding."</text>`;
    return `<svg viewBox="0 0 690 248" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e5(){ // division of labour in marking
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">MARKING \u2014 THE DIVISION OF LABOUR</text>`;
    const a=['Flag surface errors','Check against a structural checklist','Spot class-wide error patterns','Generate a feedback phrase bank','Summarise what 14 students got wrong'];
    const b=['Read for meaning','Recognise the unusual insight','Know this child has improved','Decide the grade','Choose the comment that moves them'];
    [['AI DOES THE MECHANICAL LAYER','#2E6FB0',52,a],['YOU KEEP THE JUDGEMENT','#1E7A52',352,b]].forEach(c=>{
      g+=`<rect x="${c[2]}" y="38" width="286" height="172" rx="6" fill="${c[1]}" fill-opacity="0.13" stroke="${c[1]}"/>`;
      g+=`<rect x="${c[2]}" y="38" width="286" height="26" rx="6" fill="${c[1]}" fill-opacity="0.35"/>`;
      g+=`<text x="${c[2]+143}" y="56" fill="#fff" font-size="10.5" text-anchor="middle" font-weight="bold">${c[0]}</text>`;
      c[3].forEach((ln,j)=>{
        g+=`<text x="${c[2]+18}" y="${86+j*25}" fill="#CFDCEF" font-size="9.8">\u203a ${ln}</text>`; });
    });
    g+=`<rect x="52" y="222" width="586" height="30" rx="5" fill="#B8892B" fill-opacity="0.18" stroke="#B8892B"/>`;
    g+=`<text x="345" y="242" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">If you never disagree with it, you are rubber-stamping rather than reviewing.</text>`;
    return `<svg viewBox="0 0 690 262" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e6(){ // AI maturity matrix
    const L=[['LEVEL 0','NO AI','Assesses your unaided ability. Done in class or supervised.','#C8102E'],
             ['LEVEL 1','PLANNING ONLY','Brainstorm and structure with AI. All writing is yours. Submit the conversation.','#B8892B'],
             ['LEVEL 2','ASSISTANCE','Check grammar, improve your own draft. Highlight and justify every change.','#2E6FB0'],
             ['LEVEL 3','COLLABORATOR','Full use. Assessed on your prompts, your judgement, and what you rejected.','#1E7A52']];
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE AI MATURITY MATRIX \u2014 PRINT THIS ON EVERY ASSIGNMENT</text>`;
    L.forEach((r,i)=>{ const y=40+i*50;
      g+=`<rect x="52" y="${y}" width="586" height="42" rx="5" fill="${r[3]}" fill-opacity="0.14" stroke="${r[3]}"/>`;
      g+=`<rect x="52" y="${y}" width="76" height="42" rx="5" fill="${r[3]}" fill-opacity="0.36"/>`;
      g+=`<text x="90" y="${y+26}" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="142" y="${y+18}" fill="#fff" font-size="11" font-weight="bold">${r[1]}</text>`;
      g+=`<text x="142" y="${y+34}" fill="#A8C0E4" font-size="9.6">${r[2]}</text>`; });
    g+=`<text x="345" y="256" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">Where AI is permitted, undisclosed use is the breach \u2014 not the use itself.</text>`;
    return `<svg viewBox="0 0 690 268" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e7(){ // assessment shift
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">ASSESSMENT AS CONVERSATION, NOT SURVEILLANCE</text>`;
    g+=`<rect x="46" y="44" width="252" height="60" rx="6" fill="#6E7F94" fill-opacity="0.2" stroke="#6E7F94"/>`;
    g+=`<text x="172" y="68" fill="#CFDCEF" font-size="9.5" text-anchor="middle" font-weight="bold">THE OLD QUESTION</text>`;
    g+=`<text x="172" y="90" fill="#fff" font-size="15" text-anchor="middle" font-weight="bold">"What do you know?"</text>`;
    g+=`<path d="M304 74 L378 74" stroke="#B8892B" stroke-width="2" marker-end="url(#earr)"/>`;
    g+=`<defs><marker id="earr" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#B8892B"/></marker></defs>`;
    g+=`<rect x="384" y="44" width="260" height="60" rx="6" fill="#1E7A52" fill-opacity="0.2" stroke="#1E7A52"/>`;
    g+=`<text x="514" y="68" fill="#7FD6A8" font-size="9.5" text-anchor="middle" font-weight="bold">THE NEW QUESTION</text>`;
    g+=`<text x="514" y="90" fill="#fff" font-size="15" text-anchor="middle" font-weight="bold">"How do you think?"</text>`;
    const m=[['STAGED SUBMISSION','Plan \u00b7 draft \u00b7 final, each marked','#2E6FB0'],
             ['PROCESS EVIDENCE','Annotated drafts and AI logs','#B8892B'],
             ['ORAL DEFENCE','Two minutes, two questions','#C8102E'],
             ['MASTERY GATES','Apply in an unfamiliar context','#1E7A52']];
    m.forEach((r,i)=>{ const x=46+i*152;
      g+=`<rect x="${x}" y="122" width="140" height="62" rx="5" fill="${r[2]}" fill-opacity="0.15" stroke="${r[2]}"/>`;
      g+=`<rect x="${x}" y="122" width="140" height="3.5" fill="${r[2]}"/>`;
      g+=`<text x="${x+70}" y="146" fill="#fff" font-size="9.6" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+70}" y="166" fill="#A8C0E4" font-size="8.8" text-anchor="middle">${r[1]}</text>`; });
    g+=`<text x="345" y="206" fill="#FF9BA6" font-size="10.3" text-anchor="middle" font-weight="bold">Frame oral work as developing a human skill \u2014 never as an interrogation to catch cheats.</text>`;
    return `<svg viewBox="0 0 690 218" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e8(){ // seven roles
    const R=[['AI-TUTOR','Explains and questions','#2E6FB0'],['AI-COACH','Prompts reflection','#4A8FD0'],
             ['AI-MENTOR','Gives feedback on work','#B8892B'],['AI-TEAMMATE','Contributes to group work','#8A6FBF'],
             ['AI-TOOL','Performs a defined function','#1E7A52'],['AI-SIMULATOR','Plays a scenario or role','#C8102E'],
             ['AI-STUDENT','The learner teaches it','#D4A017']];
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">SEVEN ROLES AI CAN PLAY FOR A STUDENT</text>`;
    R.forEach((r,i)=>{ const col=i%4, row=Math.floor(i/4);
      const x=52+col*148, y=40+row*66;
      g+=`<rect x="${x}" y="${y}" width="138" height="56" rx="6" fill="${r[2]}" fill-opacity="0.15" stroke="${r[2]}"/>`;
      g+=`<rect x="${x}" y="${y}" width="138" height="3.5" fill="${r[2]}"/>`;
      g+=`<text x="${x+69}" y="${y+25}" fill="#fff" font-size="10.5" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+69}" y="${y+43}" fill="#A8C0E4" font-size="8.8" text-anchor="middle">${r[1]}</text>`; });
    g+=`<rect x="348" y="106" width="290" height="56" rx="6" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="493" y="128" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">Teach verification before prompting.</text>`;
    g+=`<text x="493" y="147" fill="#A8C0E4" font-size="9.2" text-anchor="middle">Capability without scepticism produces confident wrong work.</text>`;
    return `<svg viewBox="0 0 690 176" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e9(){ // the widening gap mechanism
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">HOW ADAPTIVE LEARNING CAN WIDEN THE GAP IT WAS BOUGHT TO CLOSE</text>`;
    const st=['Student arrives with\nweaker prior attainment','System detects lower\nperformance','System slows the pace,\noffers easier content','Student receives less\ncurriculum than peers','The gap widens \u2014 and the\nsystem reports success'];
    const bw=130;
    st.forEach((s,i)=>{ const x=32+i*146, y=42, col=i===4?'#C8102E':'#B8892B';
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="72" rx="6" fill="${col}" fill-opacity="0.15" stroke="${col}"/>`;
      g+=`<circle cx="${x+bw/2}" cy="${y+18}" r="11" fill="${col}" fill-opacity="0.4"/>`;
      g+=`<text x="${x+bw/2}" y="${y+22}" fill="#fff" font-size="10" text-anchor="middle" font-weight="bold">${i+1}</text>`;
      s.split('\n').forEach((ln,j)=>{ g+=`<text x="${x+bw/2}" y="${y+42+j*13}" fill="#CFDCEF" font-size="8.6" text-anchor="middle">${ln}</text>`; });
      if(i<4) g+=`<path d="M${x+bw+2} ${y+36} L${x+bw+13} ${y+36}" stroke="#6E7F94" stroke-width="1.4" marker-end="url(#e9a)"/>`; });
    g+=`<defs><marker id="e9a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#6E7F94"/></marker></defs>`;
    g+=`<rect x="32" y="130" width="714" height="32" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="389" y="150" fill="#7FD6A8" font-size="11" text-anchor="middle" font-weight="bold">The check to run each term: has the lowest quartile fallen behind in content covered?</text>`;
    return `<svg viewBox="0 0 780 174" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e10(){ // case study outcomes
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">WHAT THREE SCHOOL SYSTEMS MEASURED</text>`;
    const c=[['BRISBANE CATHOLIC','Australia \u00b7 146 schools','#1E7A52',32,
              [['9 hrs','admin time saved per week'],['10\u201330%','improvement in student results'],['275%','increase in student agency']]],
             ['BROWARD COUNTY','United States \u00b7 20,000 licences','#B8892B',282,
              [['75%','of staff actively using'],['2+ hrs','saved per week'],['12%','energy cost reduction']]],
             ['COQUITLAM','Canada \u00b7 "go slow to go fast"','#2E6FB0',532,
              [['1st','data and security foundations'],['ALL','parents on the committee'],['\u2713','trust before adoption']]]];
    c.forEach(r=>{
      g+=`<rect x="${r[3]}" y="38" width="216" height="150" rx="6" fill="${r[2]}" fill-opacity="0.13" stroke="${r[2]}"/>`;
      g+=`<rect x="${r[3]}" y="38" width="216" height="4" fill="${r[2]}"/>`;
      g+=`<text x="${r[3]+108}" y="60" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${r[3]+108}" y="75" fill="#8FA6C8" font-size="8.6" text-anchor="middle">${r[1]}</text>`;
      r[4].forEach((m,j)=>{ const y=98+j*30;
        g+=`<text x="${r[3]+16}" y="${y}" fill="${r[2]==='#B8892B'?'#F0DCB4':'#fff'}" font-size="14" font-weight="bold">${m[0]}</text>`;
        g+=`<text x="${r[3]+78}" y="${y-1}" fill="#A8C0E4" font-size="8.6">${m[1]}</text>`; }); });
    g+=`<text x="380" y="208" fill="#FF9BA6" font-size="10.3" text-anchor="middle" font-weight="bold">Self-reported, vendor-sponsored, no control groups. Evidence that serious programmes work \u2014 not a forecast.</text>`;
    return `<svg viewBox="0 0 780 220" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e11(){ // six characteristics
    const S=[['FUNCTIONAL FOCUS','AI tied to named goals','#2E6FB0'],['GUARDRAILS','Policy \u00b7 matrix \u00b7 register','#C8102E'],
             ['LEARNING COMMUNITIES','Sharing what works','#1E7A52'],['CHANGE &amp; TRAINING','Role-specific, continuous','#B8892B'],
             ['PARTNERSHIPS','External expertise','#4A8FD0'],['CHAMPION NETWORKS','Top-down meets bottom-up','#D4A017']];
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">SIX CHARACTERISTICS OF SCHOOLS THAT GOT THIS RIGHT</text>`;
    S.forEach((r,i)=>{ const col=i%3, row=Math.floor(i/3);
      const x=52+col*196, y=40+row*72;
      g+=`<rect x="${x}" y="${y}" width="186" height="62" rx="6" fill="${r[2]}" fill-opacity="0.14" stroke="${r[2]}"/>`;
      g+=`<circle cx="${x+22}" cy="${y+31}" r="14" fill="${r[2]}" fill-opacity="0.4"/>`;
      g+=`<text x="${x+22}" y="${y+36}" fill="#fff" font-size="13" text-anchor="middle" font-weight="bold">${i+1}</text>`;
      g+=`<text x="${x+44}" y="${y+27}" fill="#fff" font-size="9.8" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+44}" y="${y+44}" fill="#A8C0E4" font-size="8.8">${r[1]}</text>`; });
    g+=`<rect x="52" y="190" width="586" height="32" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="345" y="210" fill="#7FD6A8" font-size="10.8" text-anchor="middle" font-weight="bold">Five of the six are about people. None of them requires a budget.</text>`;
    return `<svg viewBox="0 0 690 234" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  e12(){ // term plan
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">YOUR THREE-TERM PLAN</text>`;
    const t=[['TERM 1','RECLAIM TIME','Build your prompt library\nBatch weekly planning\nAI level on every task sheet\nThe honest conversation','#2E6FB0'],
             ['TERM 2','IMPROVE DELIVERY','Differentiate one unit properly\nRubric to self-check questions\nClass-level pattern analysis\nOne oral defence \u00b7 one AI lesson','#B8892B'],
             ['TERM 3','REDESIGN','Staged submission with process\nOne AI-integrated task\nPre-adoption checklist\nShare with two colleagues','#1E7A52']];
    const bw=222;
    t.forEach((r,i)=>{ const x=42+i*236, y=40;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="132" rx="6" fill="${r[3]}" fill-opacity="0.14" stroke="${r[3]}"/>`;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="4" fill="${r[3]}"/>`;
      g+=`<text x="${x+bw/2}" y="${y+21}" fill="#CFDCEF" font-size="9.2" text-anchor="middle" font-weight="bold" letter-spacing="0.6">${r[0]}</text>`;
      g+=`<text x="${x+bw/2}" y="${y+41}" fill="#fff" font-size="13" text-anchor="middle" font-weight="bold">${r[1]}</text>`;
      r[2].split('\n').forEach((ln,j)=>{ g+=`<text x="${x+14}" y="${y+64+j*17}" fill="#A8C0E4" font-size="9">\u2022 ${ln}</text>`; });
      if(i<2) g+=`<path d="M${x+bw+3} ${y+66} L${x+bw+11} ${y+66}" stroke="#6E7F94" stroke-width="1.4" marker-end="url(#e12a)"/>`; });
    g+=`<defs><marker id="e12a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#6E7F94"/></marker></defs>`;
    g+=`<rect x="42" y="186" width="694" height="32" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="389" y="206" fill="#7FD6A8" font-size="10.8" text-anchor="middle" font-weight="bold">The tools have changed. The job has not.</text>`;
    return `<svg viewBox="0 0 780 230" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  }
};

export const MANAGEMENT_FIG: Record<string, () => string> = {
  g1(){ // predicts / produces / acts
    const c=[['MACHINE LEARNING','PREDICTS','How likely is X?','Forecasting · churn · risk scoring','#2E6FB0'],
             ['GENERATIVE AI','PRODUCES','Draft, summarise, explain','Documents · correspondence · analysis','#B8892B'],
             ['AGENTIC AI','ACTS','Pursue a goal across steps','Multi-step workflows · tool use','#C8102E']];
    let g=''; const w=196,x0=42;
    c.forEach((r,i)=>{ const x=x0+i*(w+16);
      g+=`<rect x="${x}" y="40" width="${w}" height="132" rx="6" fill="${r[4]}" fill-opacity="0.16" stroke="${r[4]}" stroke-width="1.3"/>`;
      g+=`<rect x="${x}" y="40" width="${w}" height="4" rx="2" fill="${r[4]}"/>`;
      g+=`<text x="${x+w/2}" y="66" fill="#CFDCEF" font-size="9.5" text-anchor="middle" font-weight="bold" letter-spacing="0.6">${r[0]}</text>`;
      g+=`<text x="${x+w/2}" y="94" fill="#fff" font-size="19" text-anchor="middle" font-weight="bold">${r[1]}</text>`;
      g+=`<text x="${x+w/2}" y="118" fill="#F0DCB4" font-size="11" text-anchor="middle" font-style="italic">${r[2]}</text>`;
      g+=`<text x="${x+w/2}" y="146" fill="#A8C0E4" font-size="9.5" text-anchor="middle">${r[3]}</text>`;
      g+=`<text x="${x+w/2}" y="162" fill="#8FA6C8" font-size="9" text-anchor="middle">Different cost · risk · governance</text>`; });
    g+=`<text x="345" y="24" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE THREE KINDS THAT MATTER TO A MANAGER</text>`;
    g+=`<text x="345" y="192" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">A proposal that does not say which one it is has not been thought through.</text>`;
    return `<svg viewBox="0 0 690 204" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g2(){ // ladder of ambition
    const s=[['EFFICIENCY','Same work, faster and cheaper','#1E7A52'],
             ['EFFECTIVENESS','Same work, done better','#2E6FB0'],
             ['EXPERIENCE','Change what it feels like to be a customer','#4A8FD0'],
             ['NEW PROPOSITIONS','Offer what you could not offer before','#B8892B'],
             ['BUSINESS MODEL','Redesign the organisation around AI','#C8102E']];
    let g=''; const bw=118,x0=48;
    s.forEach((r,i)=>{ const x=x0+i*(bw+2), h=30+i*24, y=196-h;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="${h}" rx="4" fill="${r[2]}" fill-opacity="0.22" stroke="${r[2]}"/>`;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="3.5" fill="${r[2]}"/>`;
      g+=`<text x="${x+bw/2}" y="${y-8}" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+bw/2}" y="${y+h/2+4}" fill="#CFDCEF" font-size="8" text-anchor="middle">${r[1].length>28?r[1].slice(0,26)+'…':r[1]}</text>`; });
    g+=`<path d="M44 210 L716 210" stroke="#3A4E68" stroke-width="1"/>`;
    g+=`<text x="48" y="224" fill="#8FA6C8" font-size="9.5">Lower risk · faster payback</text>`;
    g+=`<text x="716" y="224" fill="#FF9BA6" font-size="9.5" text-anchor="end">Higher risk · larger prize</text>`;
    g+=`<text x="380" y="20" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE LADDER OF AMBITION</text>`;
    g+=`<text x="380" y="240" fill="#A8C0E4" font-size="10" text-anchor="middle">A strategy that does not state its level drifts to the easiest and disappoints those expecting the hardest.</text>`;
    return `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g3(){ // decision rights evidence
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">DECISION RIGHTS AND AI RETURNS — DELOITTE, 550 LEADERS</text>`;
    // CFO bars
    const bx=58, by=46, bw=240;
    g+=`<text x="${bx}" y="${by-6}" fill="#CFDCEF" font-size="10" font-weight="bold">CFO AUTHORITY → ABOVE-AVERAGE PROFITABILITY</text>`;
    g+=`<rect x="${bx}" y="${by+6}" width="${bw*0.18}" height="26" rx="3" fill="#6E7F94"/>`;
    g+=`<text x="${bx+bw*0.18+8}" y="${by+24}" fill="#A8C0E4" font-size="11" font-weight="bold">18% — no authority</text>`;
    g+=`<rect x="${bx}" y="${by+42}" width="${bw*0.42}" height="26" rx="3" fill="#1E7A52"/>`;
    g+=`<text x="${bx+bw*0.42+8}" y="${by+60}" fill="#7FD6A8" font-size="11" font-weight="bold">42% — full authority</text>`;
    g+=`<path d="M${bx} ${by+78} L${bx+bw} ${by+78}" stroke="#3A4E68" stroke-width="1"/>`;
    g+=`<text x="${bx}" y="${by+94}" fill="#F0DCB4" font-size="10.5" font-weight="bold">More than twice as likely to outperform.</text>`;
    // right panel
    const rx=352;
    const items=[['CTO','from no control to full control','>2× advanced AI automation maturity','#2E6FB0'],
                 ['CSO','substantial authority','up to 88× more likely to achieve high ROI','#C8102E']];
    items.forEach((r,i)=>{ const y=by+i*62;
      g+=`<rect x="${rx}" y="${y}" width="288" height="52" rx="5" fill="${r[3]}" fill-opacity="0.16" stroke="${r[3]}"/>`;
      g+=`<rect x="${rx}" y="${y}" width="4" height="52" fill="${r[3]}"/>`;
      g+=`<text x="${rx+16}" y="${y+18}" fill="#fff" font-size="11" font-weight="bold">${r[0]} — ${r[1]}</text>`;
      g+=`<text x="${rx+16}" y="${y+38}" fill="#F0DCB4" font-size="10.5">${r[2]}</text>`; });
    g+=`<rect x="58" y="176" width="582" height="30" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="349" y="196" fill="#7FD6A8" font-size="11" text-anchor="middle" font-weight="bold">No single role can deliver all three. Outcomes peak when decision rights are distributed.</text>`;
    return `<svg viewBox="0 0 690 216" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g4(){ // value vs feasibility matrix
    let g=''; const x0=90,y0=36,w=380,h=190;
    g+=`<rect x="${x0}" y="${y0}" width="${w}" height="${h}" rx="4" fill="#132234" stroke="#3A4E68"/>`;
    g+=`<path d="M${x0+w/2} ${y0} L${x0+w/2} ${y0+h} M${x0} ${y0+h/2} L${x0+w} ${y0+h/2}" stroke="#3A4E68" stroke-width="1"/>`;
    const q=[[x0+w/4,y0+h/4,'BUILD TOWARD','high value · low feasibility','#B8892B'],
             [x0+3*w/4,y0+h/4,'START HERE','high value · high feasibility','#1E7A52'],
             [x0+w/4,y0+3*h/4,'DECLINE','low value · low feasibility','#C8102E'],
             [x0+3*w/4,y0+3*h/4,'FILL CAPACITY','low value · high feasibility','#2E6FB0']];
    q.forEach(r=>{
      g+=`<text x="${r[0]}" y="${r[1]-4}" fill="${r[4]}" font-size="12.5" text-anchor="middle" font-weight="bold">${r[2]}</text>`;
      g+=`<text x="${r[0]}" y="${r[1]+14}" fill="#A8C0E4" font-size="9.5" text-anchor="middle">${r[3]}</text>`; });
    g+=`<circle cx="${x0+3*w/4}" cy="${y0+h/4}" r="52" fill="#1E7A52" fill-opacity="0.12"/>`;
    g+=`<text x="${x0+w/2}" y="${y0+h+22}" fill="#CFDCEF" font-size="10.5" text-anchor="middle" font-weight="bold">FEASIBILITY →</text>`;
    g+=`<text x="${x0-18}" y="${y0+h/2}" fill="#CFDCEF" font-size="10.5" text-anchor="middle" font-weight="bold" transform="rotate(-90 ${x0-18} ${y0+h/2})">VALUE →</text>`;
    g+=`<text x="${x0+w/2}" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">PRIORITISING USE CASES</text>`;
    // portfolio bar
    const px=500;
    g+=`<text x="${px}" y="52" fill="#CFDCEF" font-size="10" font-weight="bold">PORTFOLIO BALANCE</text>`;
    const p=[['60%','Near-term efficiency','#1E7A52'],['30%','Capability building','#B8892B'],['10%','Exploratory','#2E6FB0']];
    p.forEach((r,i)=>{ const y=66+i*44;
      g+=`<rect x="${px}" y="${y}" width="150" height="34" rx="4" fill="${r[2]}" fill-opacity="0.18" stroke="${r[2]}"/>`;
      g+=`<text x="${px+12}" y="${y+22}" fill="${r[2]==='#B8892B'?'#F0DCB4':'#fff'}" font-size="14" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${px+56}" y="${y+21}" fill="#CFDCEF" font-size="9.5">${r[1]}</text>`; });
    g+=`<text x="${px}" y="212" fill="#FF9BA6" font-size="9" font-weight="bold">The 30% is what</text>`;
    g+=`<text x="${px}" y="224" fill="#FF9BA6" font-size="9" font-weight="bold">most organisations skip.</text>`;
    return `<svg viewBox="0 0 690 258" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g5(){ // today vs three years
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">HOW CXOs USE AI — CAPGEMINI, 500 EXECUTIVES</text>`;
    const cols=[['TODAY','Productivity support','Research · analysis · summarisation','#2E6FB0',58],
                ['WITHIN 3 YEARS','Augment and challenge','Strategic thinking · scenarios · counter-argument','#1E7A52',382]];
    cols.forEach(c=>{
      g+=`<rect x="${c[4]}" y="40" width="250" height="104" rx="6" fill="${c[3]}" fill-opacity="0.16" stroke="${c[3]}"/>`;
      g+=`<rect x="${c[4]}" y="40" width="250" height="4" fill="${c[3]}"/>`;
      g+=`<text x="${c[4]+125}" y="64" fill="#CFDCEF" font-size="9.5" text-anchor="middle" font-weight="bold" letter-spacing="0.6">${c[0]}</text>`;
      g+=`<text x="${c[4]+125}" y="92" fill="#fff" font-size="16" text-anchor="middle" font-weight="bold">${c[1]}</text>`;
      g+=`<text x="${c[4]+125}" y="118" fill="#A8C0E4" font-size="10" text-anchor="middle">${c[2]}</text>`; });
    g+=`<path d="M316 92 L376 92" stroke="#B8892B" stroke-width="2" marker-end="url(#mgar)"/>`;
    g+=`<defs><marker id="mgar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#B8892B"/></marker></defs>`;
    g+=`<text x="345" y="84" fill="#F0DCB4" font-size="9" text-anchor="middle" font-weight="bold">2×</text>`;
    const stats=[['>50%','already use AI in strategic decisions','#2E6FB0'],
                 ['48%','report above-average trust','#B8892B'],
                 ['38%','feel confident in prompting','#C8102E']];
    stats.forEach((s,i)=>{ const x=58+i*208;
      g+=`<rect x="${x}" y="160" width="190" height="44" rx="5" fill="${s[2]}" fill-opacity="0.14" stroke="${s[2]}"/>`;
      g+=`<text x="${x+14}" y="188" fill="#fff" font-size="17" font-weight="bold">${s[0]}</text>`;
      g+=`<text x="${x+72}" y="180" fill="#CFDCEF" font-size="9">${s[1].split(' ').slice(0,3).join(' ')}</text>`;
      g+=`<text x="${x+72}" y="193" fill="#CFDCEF" font-size="9">${s[1].split(' ').slice(3).join(' ')}</text>`; });
    g+=`<text x="345" y="222" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">AI is not expected to make autonomous strategic decisions any time soon.</text>`;
    return `<svg viewBox="0 0 690 234" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g6(){ // the cost iceberg
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">WHAT AN AI INITIATIVE ACTUALLY COSTS</text>`;
    g+=`<path d="M40 74 L650 74" stroke="#4A8FD0" stroke-width="1.5" stroke-dasharray="6 4"/>`;
    g+=`<text x="650" y="68" fill="#4A8FD0" font-size="9.5" text-anchor="end" font-style="italic">what the proposal shows</text>`;
    g+=`<rect x="248" y="40" width="194" height="30" rx="4" fill="#4A8FD0" fill-opacity="0.3" stroke="#4A8FD0"/>`;
    g+=`<text x="345" y="60" fill="#fff" font-size="11.5" text-anchor="middle" font-weight="bold">Licence fees</text>`;
    const below=[['Data preparation — often the largest line (~80% of effort)','#C8102E'],
                 ['Integration and middleware — up to 60–70% of use-case spend','#C8102E'],
                 ['Internal staff time — experts, IT, project management','#B8892B'],
                 ['Training, change management and protected learning time','#B8892B'],
                 ['Ongoing usage charges — scale with adoption, not with pilot size','#2E6FB0'],
                 ['Monitoring and maintenance — indefinitely','#2E6FB0'],
                 ['Contingency — 30%+ given documented 2–3× overruns','#6E7F94']];
    below.forEach((r,i)=>{ const y=84+i*22, w=250+i*46, x=345-w/2;
      g+=`<rect x="${x}" y="${y}" width="${w}" height="18" rx="2.5" fill="${r[1]}" fill-opacity="0.2" stroke="${r[1]}" stroke-opacity="0.6"/>`;
      g+=`<text x="345" y="${y+13}" fill="#CFDCEF" font-size="9.3" text-anchor="middle">${r[0]}</text>`; });
    g+=`<text x="345" y="256" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">When a proposal's cost is dominated by licence fees, it is incomplete.</text>`;
    return `<svg viewBox="0 0 690 268" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g7(){ // readiness radar-style bars
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE FOUR READINESS DIMENSIONS</text>`;
    const d=[['DATA','Relevant · accessible · reliable · linkable across systems','Usually weakest','#C8102E'],
             ['TECHNOLOGY','Extraction · storage · integration · access control','Usually adequate','#2E6FB0'],
             ['PEOPLE &amp; SKILLS','Can evaluate, pilot and challenge a vendor. Has capacity.','Usually thin','#B8892B'],
             ['GOVERNANCE','Decision rights · acceptable use · ability to stop','Usually absent','#C8102E']];
    d.forEach((r,i)=>{ const y=44+i*48;
      g+=`<rect x="48" y="${y}" width="594" height="40" rx="5" fill="${r[3]}" fill-opacity="0.13" stroke="${r[3]}" stroke-opacity="0.7"/>`;
      g+=`<rect x="48" y="${y}" width="4.5" height="40" fill="${r[3]}"/>`;
      g+=`<text x="66" y="${y+18}" fill="#fff" font-size="11" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="66" y="${y+33}" fill="#A8C0E4" font-size="9.5">${r[1]}</text>`;
      g+=`<text x="628" y="${y+25}" fill="${r[3]==='#2E6FB0'?'#8FC0F0':'#F0C8A0'}" font-size="9.5" text-anchor="end" font-style="italic">${r[2]}</text>`; });
    g+=`<rect x="48" y="242" width="594" height="30" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="345" y="262" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">Rate each with documented evidence, not opinion. The weakest dimension sets the roadmap.</text>`;
    return `<svg viewBox="0 0 690 282" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g8(){ // literacy by group
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">AI LITERACY AT THE RIGHT DEPTH</text>`;
    const t=[['BOARD &amp; EXECUTIVE','Enough to govern','What to ask · how to read a proposal · risk appetite','2–3 hours','#C8102E'],
             ['MANAGERS','Enough to specify and challenge','Use cases · business cases · vendor questions · change','This programme','#B8892B'],
             ['STAFF WHO WILL USE AI','Practical fluency','How to prompt · how to check · what never to enter','Short and hands-on','#2E6FB0'],
             ['SPECIALISTS','Technical depth','Appropriate to the role','Role-specific','#1E7A52']];
    t.forEach((r,i)=>{ const y=42+i*54;
      g+=`<rect x="48" y="${y}" width="594" height="46" rx="5" fill="${r[3]}" fill-opacity="0.14" stroke="${r[3]}" stroke-opacity="0.7"/>`;
      g+=`<rect x="48" y="${y}" width="4.5" height="46" fill="${r[4]}"/>`;
      g+=`<text x="66" y="${y+18}" fill="#fff" font-size="10.5" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="66" y="${y+34}" fill="#F0DCB4" font-size="10">${r[1]}</text>`;
      g+=`<text x="250" y="${y+34}" fill="#A8C0E4" font-size="9.5">${r[2]}</text>`;
      g+=`<text x="628" y="${y+20}" fill="#CFDCEF" font-size="9.5" text-anchor="end" font-style="italic">${r[3]}</text>`; });
    g+=`<text x="345" y="278" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">Train on real work — and train the challenge, not only the use.</text>`;
    return `<svg viewBox="0 0 690 290" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g9(){ // risk tiers
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">PROPORTIONATE GOVERNANCE — TIER BY CONSEQUENCE</text>`;
    const t=[['HIGH','Materially affects customers, employees or standing. Sensitive data. Hard to reverse.','Full pre-deployment review · executive approval · continuous monitoring · rollback · board visibility','#C8102E'],
             ['MEDIUM','Informs decisions about people or money. Errors correctable but costly.','Documented owner · pre-deployment testing · human approval before effect · periodic review','#B8892B'],
             ['LOW','Internal productivity. Human reviews everything. No personal data.','Acceptable use policy · basic training','#2E6FB0']];
    t.forEach((r,i)=>{ const y=40+i*62;
      g+=`<rect x="48" y="${y}" width="594" height="54" rx="5" fill="${r[3]}" fill-opacity="0.14" stroke="${r[3]}"/>`;
      g+=`<rect x="48" y="${y}" width="70" height="54" rx="5" fill="${r[3]}" fill-opacity="0.34"/>`;
      g+=`<text x="83" y="${y+32}" fill="#fff" font-size="12.5" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="132" y="${y+21}" fill="#E7EEF9" font-size="9.8">${r[1]}</text>`;
      g+=`<text x="132" y="${y+40}" fill="#A8C0E4" font-size="9.3">${r[2]}</text>`; });
    g+=`<rect x="48" y="228" width="594" height="30" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="345" y="248" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">Classify by consequence, not by technology. A simple system making consequential decisions needs more control.</text>`;
    return `<svg viewBox="0 0 690 268" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g10(){ // six failure causes
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">WHY AI INITIATIVES FAIL — WORLD ECONOMIC FORUM</text>`;
    const f=[['1','CAPABILITY GAPS','Skills at several levels; poor education damages morale'],
             ['2','DATA UNAVAILABLE OR POOR','Fragmented silos; ~80% of effort goes on cleansing'],
             ['3','FOUNDATIONS NOT IN PLACE','"Trying to run before they can walk"'],
             ['4','POOR GOVERNANCE','Unclear decision rights; no mechanism to stop'],
             ['5','PROJECT FINANCE MISUNDERSTOOD','No ring-fenced funding; foundations cannibalised'],
             ['6','PROJECT MANAGEMENT MISUNDERSTOOD','R&amp;D managed as IT; 2–3× cost and time overruns']];
    f.forEach((r,i)=>{ const col=i%2, row=Math.floor(i/2);
      const x=48+col*300, y=42+row*54;
      g+=`<rect x="${x}" y="${y}" width="290" height="46" rx="5" fill="#C8102E" fill-opacity="0.12" stroke="#C8102E" stroke-opacity="0.6"/>`;
      g+=`<circle cx="${x+22}" cy="${y+23}" r="13" fill="#C8102E" fill-opacity="0.42"/>`;
      g+=`<text x="${x+22}" y="${y+28}" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+44}" y="${y+20}" fill="#fff" font-size="9.8" font-weight="bold">${r[1]}</text>`;
      g+=`<text x="${x+44}" y="${y+36}" fill="#A8C0E4" font-size="8.8">${r[2]}</text>`; });
    g+=`<rect x="48" y="210" width="590" height="32" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="343" y="230" fill="#7FD6A8" font-size="11" text-anchor="middle" font-weight="bold">Note what is absent: "the technology did not work." Models rarely fail. Organisations do.</text>`;
    return `<svg viewBox="0 0 690 252" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g11(){ // stage gates
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">STAGE GATES — FROM DESIGN TO POST-IMPLEMENTATION REVIEW</text>`;
    const st=[['DESIGN','Problem · baseline\nthreshold · owner','GATE 1','#2E6FB0'],
              ['PILOT','6–12 weeks\nordinary conditions','GATE 2','#B8892B'],
              ['PRODUCTION','Integration · training\nmonitoring · rollback','GATE 3','#1E7A52'],
              ['REVIEW','6 months on\nvalue vs business case','GATE 4','#C8102E']];
    const bw=150,x0=48;
    st.forEach((r,i)=>{ const x=x0+i*(bw+38), y=48;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="76" rx="6" fill="${r[3]}" fill-opacity="0.16" stroke="${r[3]}"/>`;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="4" fill="${r[3]}"/>`;
      g+=`<text x="${x+bw/2}" y="${y+26}" fill="#fff" font-size="12.5" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      r[1].split('\n').forEach((ln,j)=>{ g+=`<text x="${x+bw/2}" y="${y+46+j*14}" fill="#A8C0E4" font-size="9" text-anchor="middle">${ln}</text>`; });
      if(i<3){ const gx=x+bw+19;
        g+=`<path d="M${x+bw+4} ${y+38} L${gx+15} ${y+38}" stroke="${r[3]}" stroke-width="1.6"/>`;
        g+=`<polygon points="${gx-13},${y+22} ${gx+13},${y+38} ${gx-13},${y+54}" fill="#0E1A28" stroke="${r[3]}" stroke-width="1.4"/>`;
        g+=`<text x="${gx-3}" y="${y+41}" fill="${r[3]}" font-size="8" text-anchor="middle" font-weight="bold">${i+1}</text>`; }
    });
    g+=`<rect x="48" y="146" width="662" height="30" rx="5" fill="#C8102E" fill-opacity="0.14" stroke="#C8102E"/>`;
    g+=`<text x="379" y="166" fill="#FF9BA6" font-size="10.8" text-anchor="middle" font-weight="bold">At Gate 2 there are three outcomes only: proceed, iterate once with a revised threshold, or stop. "Continue as is" is not one.</text>`;
    g+=`<text x="379" y="196" fill="#A8C0E4" font-size="10" text-anchor="middle">Gate 4 is the one organisations skip — and the one that builds judgement about your own business cases.</text>`;
    return `<svg viewBox="0 0 760 208" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  g12(){ // twelve month sequence
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">A TWELVE-MONTH SEQUENCE</text>`;
    const q=[['MONTHS 1–3','ESTABLISH','Owner and decision rights\nRegister · policy · approved tool\nOpportunity sweep · readiness\nExecutive and manager literacy','#2E6FB0'],
             ['MONTHS 4–6','PROVE','2–3 use cases selected\nBusiness cases with baselines\nPilots in ordinary conditions\nEmployment conversation held','#B8892B'],
             ['MONTHS 7–9','DECIDE &amp; SCALE','Gate 2 decisions taken\nStop at least one, without blame\nMove one to production\nMeasured value to the board','#1E7A52'],
             ['MONTHS 10–12','INSTITUTIONALISE','Post-implementation reviews\nLiteracy extended to staff\nPipeline refreshed\nNext year set on evidence','#C8102E']];
    const bw=158,x0=44;
    q.forEach((r,i)=>{ const x=x0+i*(bw+16), y=42;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="132" rx="6" fill="${r[3]}" fill-opacity="0.14" stroke="${r[3]}"/>`;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="4" fill="${r[3]}"/>`;
      g+=`<text x="${x+bw/2}" y="${y+20}" fill="#CFDCEF" font-size="8.6" text-anchor="middle" font-weight="bold" letter-spacing="0.5">${r[0]}</text>`;
      g+=`<text x="${x+bw/2}" y="${y+39}" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${r[1]}</text>`;
      r[2].split('\n').forEach((ln,j)=>{ g+=`<text x="${x+10}" y="${y+60+j*17}" fill="#A8C0E4" font-size="8.6">• ${ln}</text>`; });
      if(i<3) g+=`<path d="M${x+bw+2} ${y+66} L${x+bw+13} ${y+66}" stroke="#6E7F94" stroke-width="1.4" marker-end="url(#mg12)"/>`;
    });
    g+=`<defs><marker id="mg12" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#6E7F94"/></marker></defs>`;
    g+=`<rect x="44" y="188" width="668" height="32" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="378" y="208" fill="#7FD6A8" font-size="10.8" text-anchor="middle" font-weight="bold">Year one builds capability. It does not transform the business. Say so at the outset.</text>`;
    return `<svg viewBox="0 0 760 232" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  }
};

export function renderEducationDiagram(id: string): string {
  if (EDUCATION_FIG[id]) {
    return EDUCATION_FIG[id]();
  }
  return "";
}

export function renderManagementDiagram(id: string): string {
  if (MANAGEMENT_FIG[id]) {
    return MANAGEMENT_FIG[id]();
  }
  return "";
}

export const AGILE_DEVELOPERS_FIG: Record<string, () => string> = {

  d1(){ // waterfall vs iterative feedback
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">HOW LONG BEFORE YOU FIND OUT YOU WERE WRONG</text>`;
    g+=`<text x="44" y="52" fill="#FF9BA6" font-size="10" font-weight="bold">WATERFALL</text>`;
    const ph=[['Requirements','#6E7F94'],['Design','#6E7F94'],['Build','#2E6FB0'],['Test','#B8892B'],['Release','#1E7A52']];
    let x=140;
    ph.forEach(p=>{ g+=`<rect x="${x}" y="40" width="108" height="26" rx="3" fill="${p[1]}" fill-opacity="0.35" stroke="${p[1]}"/>`;
      g+=`<text x="${x+54}" y="58" fill="#fff" font-size="9" text-anchor="middle">${p[0]}</text>`; x+=112; });
    g+=`<path d="M690 53 L714 53" stroke="#C8102E" stroke-width="2" marker-end="url(#dar)"/>`;
    g+=`<text x="700" y="80" fill="#FF9BA6" font-size="9" text-anchor="middle" font-weight="bold">feedback</text>`;
    g+=`<defs><marker id="dar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#C8102E"/></marker></defs>`;
    g+=`<text x="44" y="112" fill="#7FD6A8" font-size="10" font-weight="bold">ITERATIVE</text>`;
    for(let i=0;i<6;i++){ const bx=140+i*96;
      g+=`<rect x="${bx}" y="100" width="88" height="26" rx="3" fill="#1E7A52" fill-opacity="0.3" stroke="#1E7A52"/>`;
      g+=`<text x="${bx+44}" y="118" fill="#fff" font-size="8.4" text-anchor="middle">plan·build·test</text>`;
      g+=`<path d="M${bx+44} 126 L${bx+44} 138" stroke="#7FD6A8" stroke-width="1.4"/>`;
      g+=`<circle cx="${bx+44}" cy="143" r="4" fill="#7FD6A8"/>`; }
    g+=`<text x="380" y="166" fill="#7FD6A8" font-size="9.5" text-anchor="middle">feedback after every cycle</text>`;
    g+=`<rect x="140" y="180" width="572" height="30" rx="5" fill="#B8892B" fill-opacity="0.16" stroke="#B8892B"/>`;
    g+=`<text x="426" y="200" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">Wrong in week 2, found in week 80 — you wasted 78 weeks. Found in week 4 — you wasted two.</text>`;
    return `<svg viewBox="0 0 760 222" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d2(){ // four values
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE FOUR VALUES — PREFERENCES, NOT PROHIBITIONS</text>`;
    const v=[['Individuals and interactions','processes and tools'],['Working software','comprehensive documentation'],
             ['Customer collaboration','contract negotiation'],['Responding to change','following a plan']];
    v.forEach((r,i)=>{ const y=42+i*44;
      g+=`<rect x="48" y="${y}" width="268" height="34" rx="5" fill="#1E7A52" fill-opacity="0.22" stroke="#1E7A52"/>`;
      g+=`<text x="182" y="${y+22}" fill="#fff" font-size="10.3" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="345" y="${y+22}" fill="#F0DCB4" font-size="10" text-anchor="middle" font-style="italic">over</text>`;
      g+=`<rect x="374" y="${y}" width="268" height="34" rx="5" fill="#6E7F94" fill-opacity="0.22" stroke="#6E7F94"/>`;
      g+=`<text x="508" y="${y+22}" fill="#CFDCEF" font-size="10.3" text-anchor="middle">${r[1]}</text>`; });
    g+=`<rect x="48" y="224" width="594" height="34" rx="5" fill="#C8102E" fill-opacity="0.15" stroke="#C8102E"/>`;
    g+=`<text x="345" y="245" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">"There is value in the items on the right." Left wins in a conflict — it does not delete the right.</text>`;
    return `<svg viewBox="0 0 690 270" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d3(){ // scrum on a page
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">SCRUM ON ONE PAGE</text>`;
    const cols=[['ROLES','#C8102E',40,['Product Owner','— owns priority','Scrum Master','— removes blockers','Developers','— self-managing']],
                ['EVENTS','#2E6FB0',288,['Sprint Planning','Daily Scrum','Sprint Review','Sprint Retrospective','Backlog Refinement','(continuous)']],
                ['ARTEFACTS','#1E7A52',536,['Product Backlog','— Product Owner','Sprint Backlog','— the developers','Increment','— meets done']]];
    cols.forEach(c=>{
      g+=`<rect x="${c[2]}" y="38" width="184" height="168" rx="6" fill="${c[1]}" fill-opacity="0.13" stroke="${c[1]}"/>`;
      g+=`<rect x="${c[2]}" y="38" width="184" height="26" rx="6" fill="${c[1]}" fill-opacity="0.36"/>`;
      g+=`<text x="${c[2]+92}" y="56" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">${c[0]}</text>`;
      c[3].forEach((ln,j)=>{ const sub=ln.startsWith('—')||ln.startsWith('(');
        g+=`<text x="${c[2]+14}" y="${84+j*20}" fill="${sub?'#8FA6C8':'#CFDCEF'}" font-size="${sub?8.6:9.8}">${ln}</text>`; }); });
    g+=`<rect x="40" y="220" width="680" height="30" rx="5" fill="#B8892B" fill-opacity="0.16" stroke="#B8892B"/>`;
    g+=`<text x="380" y="240" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">Every sprint ends with a potentially releasable increment — and a sprint goal you can state in one sentence.</text>`;
    return `<svg viewBox="0 0 760 262" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d4(){ // sprint timeline
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">A TWO-WEEK SPRINT, DAY BY DAY</text>`;
    g+=`<path d="M50 92 L706 92" stroke="#3A4E68" stroke-width="2"/>`;
    const ev=[[50,'Day 1','Planning','#2E6FB0',1],[180,'Days 2–5','Build · standup daily','#1E7A52',0],
              [330,'Day 6','Say it now if it will slip','#C8102E',1],[460,'Days 7–9','Finish before starting','#1E7A52',0],
              [640,'Day 10','Review + retro','#B8892B',1]];
    ev.forEach(e=>{
      g+=`<circle cx="${e[0]}" cy="92" r="7" fill="${e[3]}"/>`;
      const up=e[4]===1;
      g+=`<path d="M${e[0]} ${up?85:99} L${e[0]} ${up?62:122}" stroke="${e[3]}" stroke-width="1.3"/>`;
      g+=`<text x="${e[0]}" y="${up?54:136}" fill="#fff" font-size="9.6" text-anchor="middle" font-weight="bold">${e[1]}</text>`;
      g+=`<text x="${e[0]}" y="${up?40:150}" fill="#A8C0E4" font-size="8.8" text-anchor="middle">${e[2]}</text>`; });
    g+=`<rect x="50" y="170" width="656" height="30" rx="5" fill="#C8102E" fill-opacity="0.15" stroke="#C8102E"/>`;
    g+=`<text x="378" y="190" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">Stuck for two hours with no progress? Ask. You have tried, and you have not yet burned a day.</text>`;
    return `<svg viewBox="0 0 760 212" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d5(){ // story anatomy
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">ANATOMY OF A USER STORY</text>`;
    const p=[['As a','registered customer','who it is for','#2E6FB0'],
             ['I want','to reset my password by email','what they need','#B8892B'],
             ['So that','I can get back in without support','why it matters','#1E7A52']];
    p.forEach((r,i)=>{ const y=40+i*44;
      g+=`<rect x="48" y="${y}" width="76" height="34" rx="4" fill="${r[3]}" fill-opacity="0.35"/>`;
      g+=`<text x="86" y="${y+22}" fill="#fff" font-size="10.5" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<rect x="130" y="${y}" width="360" height="34" rx="4" fill="${r[3]}" fill-opacity="0.14" stroke="${r[3]}"/>`;
      g+=`<text x="146" y="${y+22}" fill="#E7EEF9" font-size="10.5">${r[1]}</text>`;
      g+=`<text x="502" y="${y+22}" fill="#8FA6C8" font-size="9" font-style="italic">${r[2]}</text>`; });
    g+=`<rect x="48" y="180" width="594" height="30" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="345" y="200" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">INVEST: Independent · Negotiable · Valuable · Estimable · Small · Testable</text>`;
    g+=`<text x="345" y="228" fill="#A8C0E4" font-size="10" text-anchor="middle">A story is a placeholder for a conversation — not a specification. If it is unclear, go and ask.</text>`;
    return `<svg viewBox="0 0 690 242" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d6(){ // fibonacci
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">RELATIVE SIZING — WHY THE GAPS WIDEN</text>`;
    const s=[[1,'1'],[2,'2'],[3,'3'],[5,'5'],[8,'8'],[13,'13'],[21,'21']];
    let x=60;
    s.forEach(v=>{ const w=18+v[0]*4.2, h=22+v[0]*3.4, col=v[0]<=3?'#1E7A52':v[0]<=8?'#B8892B':'#C8102E';
      g+=`<rect x="${x}" y="${140-h}" width="${w}" height="${h}" rx="4" fill="${col}" fill-opacity="0.32" stroke="${col}"/>`;
      g+=`<text x="${x+w/2}" y="${140-h/2+5}" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${v[1]}</text>`;
      x+=w+22; });
    g+=`<path d="M50 148 L710 148" stroke="#3A4E68" stroke-width="1"/>`;
    g+=`<text x="110" y="166" fill="#7FD6A8" font-size="9">well understood</text>`;
    g+=`<text x="380" y="166" fill="#F0DCB4" font-size="9" text-anchor="middle">consider splitting</text>`;
    g+=`<text x="660" y="166" fill="#FF9BA6" font-size="9" text-anchor="end">too big — split or spike</text>`;
    g+=`<rect x="50" y="182" width="660" height="30" rx="5" fill="#2E6FB0" fill-opacity="0.16" stroke="#2E6FB0"/>`;
    g+=`<text x="380" y="202" fill="#8FC0F0" font-size="10.5" text-anchor="middle" font-weight="bold">Points are relative to your team only. They do not convert to hours and mean nothing between teams.</text>`;
    return `<svg viewBox="0 0 760 224" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d7(){ // WIP limits
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">WHY LIMITING WORK FINISHES MORE WORK</text>`;
    const cols=['Ready','In progress','Review','Done'];
    [['NO LIMITS','#C8102E',40,[2,6,5,1]],['WIP LIMITED','#1E7A52',392,[2,2,1,6]]].forEach(b=>{
      g+=`<text x="${b[2]+160}" y="46" fill="${b[1]==='#C8102E'?'#FF9BA6':'#7FD6A8'}" font-size="10" text-anchor="middle" font-weight="bold">${b[0]}</text>`;
      cols.forEach((c,ci)=>{ const x=b[2]+ci*78;
        g+=`<rect x="${x}" y="54" width="70" height="112" rx="4" fill="#132234" stroke="#3A4E68"/>`;
        g+=`<text x="${x+35}" y="70" fill="#8FA6C8" font-size="8.4" text-anchor="middle">${c}</text>`;
        for(let k=0;k<b[3][ci];k++){
          g+=`<rect x="${x+8}" y="${78+k*14}" width="54" height="11" rx="2" fill="${ci===3?'#1E7A52':b[1]}" fill-opacity="0.55"/>`; }
        if(b[0]==='WIP LIMITED'&&ci<3) g+=`<text x="${x+35}" y="180" fill="#7FD6A8" font-size="8" text-anchor="middle">limit ${[3,2,2][ci]}</text>`; }); });
    g+=`<rect x="40" y="196" width="680" height="30" rx="5" fill="#B8892B" fill-opacity="0.16" stroke="#B8892B"/>`;
    g+=`<text x="380" y="216" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">Everyone busy is not the goal. A board with no limits is a to-do list on a wall.</text>`;
    return `<svg viewBox="0 0 760 238" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d8(){ // XP practices
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE PRACTICES THAT KEEP CODE CHANGEABLE</text>`;
    const p=[['Test-driven development','#1E7A52'],['Continuous integration','#2E6FB0'],['Pair programming','#B8892B'],
             ['Collective ownership','#8A6FBF'],['Refactoring','#1E7A52'],['Simple design','#2E6FB0'],
             ['Coding standards','#B8892B'],['Sustainable pace','#8A6FBF'],['Small releases','#1E7A52']];
    p.forEach((r,i)=>{ const col=i%3, row=Math.floor(i/3), x=52+col*196, y=42+row*46;
      g+=`<rect x="${x}" y="${y}" width="186" height="36" rx="5" fill="${r[1]}" fill-opacity="0.16" stroke="${r[1]}"/>`;
      g+=`<text x="${x+93}" y="${y+23}" fill="#fff" font-size="10.2" text-anchor="middle" font-weight="bold">${r[0]}</text>`; });
    g+=`<rect x="52" y="186" width="586" height="34" rx="5" fill="#C8102E" fill-opacity="0.15" stroke="#C8102E"/>`;
    g+=`<text x="345" y="207" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">Scrum and Kanban say nothing about how code is built. This is the gap they leave.</text>`;
    g+=`<text x="345" y="238" fill="#A8C0E4" font-size="10" text-anchor="middle">If code is hard to change, agility disappears while the ceremonies continue.</text>`;
    return `<svg viewBox="0 0 690 250" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d9(){ // test pyramid + TDD
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE TEST PYRAMID AND THE TDD CYCLE</text>`;
    const t=[['End-to-end','few · slow · brittle','#C8102E',150,44],['Integration','some · slower','#B8892B',230,44],['Unit tests','many · milliseconds','#1E7A52',310,44]];
    t.forEach((r,i)=>{ const y=44+i*46, w=r[3], x=200-w/2;
      g+=`<path d="M${x} ${y+r[4]} L${x+w} ${y+r[4]} L${x+w-40} ${y} L${x+40} ${y} z" fill="${r[2]}" fill-opacity="0.25" stroke="${r[2]}"/>`;
      g+=`<text x="200" y="${y+20}" fill="#fff" font-size="10" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="200" y="${y+34}" fill="#A8C0E4" font-size="8.4" text-anchor="middle">${r[1]}</text>`; });
    const cyc=[['RED','Write a failing test','#C8102E'],['GREEN','Simplest code to pass','#1E7A52'],['REFACTOR','Improve, tests protect you','#2E6FB0']];
    cyc.forEach((c,i)=>{ const y=48+i*54;
      g+=`<rect x="430" y="${y}" width="286" height="44" rx="6" fill="${c[2]}" fill-opacity="0.16" stroke="${c[2]}"/>`;
      g+=`<text x="452" y="${y+27}" fill="#fff" font-size="12" font-weight="bold">${c[0]}</text>`;
      g+=`<text x="540" y="${y+27}" fill="#CFDCEF" font-size="10">${c[1]}</text>`;
      if(i<2) g+=`<path d="M573 ${y+44} L573 ${y+54}" stroke="#6E7F94" stroke-width="1.4"/>`; });
    g+=`<text x="380" y="228" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">Write a failing test before every bug fix. No permission required, and coverage grows where it matters.</text>`;
    return `<svg viewBox="0 0 760 240" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d10(){ // pipeline
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE BUILD PIPELINE — FAST AND CHEAP FIRST</text>`;
    const st=[['Build','~30s','#1E7A52'],['Unit tests','~2m','#1E7A52'],['Static analysis','~1m','#2E6FB0'],
              ['Integration','~6m','#B8892B'],['Package','~1m','#2E6FB0'],['Deploy test','~3m','#B8892B'],['End-to-end','~12m','#C8102E']];
    let x=34;
    st.forEach((s,i)=>{ const w=92;
      g+=`<rect x="${x}" y="46" width="${w}" height="52" rx="5" fill="${s[2]}" fill-opacity="0.18" stroke="${s[2]}"/>`;
      g+=`<text x="${x+w/2}" y="70" fill="#fff" font-size="9.4" text-anchor="middle" font-weight="bold">${s[0]}</text>`;
      g+=`<text x="${x+w/2}" y="86" fill="#A8C0E4" font-size="8.6" text-anchor="middle">${s[1]}</text>`;
      if(i<st.length-1) g+=`<path d="M${x+w+1} 72 L${x+w+8} 72" stroke="#6E7F94" stroke-width="1.3"/>`;
      x+=w+10; });
    g+=`<text x="80" y="120" fill="#7FD6A8" font-size="9">fail here in seconds</text>`;
    g+=`<text x="700" y="120" fill="#FF9BA6" font-size="9" text-anchor="end">not twenty minutes later</text>`;
    g+=`<rect x="34" y="136" width="686" height="32" rx="5" fill="#C8102E" fill-opacity="0.15" stroke="#C8102E"/>`;
    g+=`<text x="377" y="156" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">A build allowed to stay red is the same as having no build at all.</text>`;
    g+=`<text x="377" y="186" fill="#A8C0E4" font-size="10" text-anchor="middle">Broke it? Fix it now, or revert. Reverting is not failure — it unblocks everyone else.</text>`;
    return `<svg viewBox="0 0 760 198" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d11(){ // PR size vs review quality
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">PULL REQUEST SIZE VERSUS REVIEW QUALITY</text>`;
    const b=[['50 lines','Read line by line','Real review','#1E7A52',0.22],
             ['200 lines','Read carefully','Good review','#B8892B',0.42],
             ['600 lines','Skimmed','Partial review','#C8102E',0.68],
             ['2,000 lines','Scrolled and approved','No review at all','#C8102E',0.95]];
    b.forEach((r,i)=>{ const y=44+i*44, w=520*r[4];
      g+=`<text x="48" y="${y+20}" fill="#CFDCEF" font-size="10">${r[0]}</text>`;
      g+=`<rect x="126" y="${y}" width="${w}" height="30" rx="4" fill="${r[3]}" fill-opacity="0.28" stroke="${r[3]}"/>`;
      g+=`<text x="138" y="${y+20}" fill="#fff" font-size="9.6">${r[1]}</text>`;
      g+=`<text x="${126+w+10}" y="${y+20}" fill="${r[3]==='#1E7A52'?'#7FD6A8':'#F0C8A0'}" font-size="9.4" font-weight="bold">${r[2]}</text>`; });
    g+=`<rect x="48" y="226" width="594" height="30" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="345" y="246" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">Small changes: better feedback, faster merge, easier to revert, fewer conflicts.</text>`;
    return `<svg viewBox="0 0 690 268" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  d12(){ // first 90 days
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">YOUR FIRST NINETY DAYS</text>`;
    const w=[['WEEKS 1–2','LEARN','Get the environment running\nMake one tiny change end to end\nSit in every ceremony, ask why\nWrite down what confuses you','#2E6FB0'],
             ['WEEKS 3–6','CONTRIBUTE','Finish small items properly\nWrite tests · use the two-hour rule\nStart reviewing others’ code\nAsk one question every planning','#B8892B'],
             ['WEEKS 7–12','IMPROVE','Take on something uncomfortable\nRaise one point in a retrospective\nFix one thing that annoys everyone\nPair on unfamiliar work','#1E7A52']];
    const bw=218;
    w.forEach((r,i)=>{ const x=44+i*(bw+18), y=42;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="130" rx="6" fill="${r[3]}" fill-opacity="0.14" stroke="${r[3]}"/>`;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="4" fill="${r[3]}"/>`;
      g+=`<text x="${x+bw/2}" y="${y+21}" fill="#CFDCEF" font-size="9" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+bw/2}" y="${y+40}" fill="#fff" font-size="12.5" text-anchor="middle" font-weight="bold">${r[1]}</text>`;
      r[2].split('\n').forEach((ln,j)=>{ g+=`<text x="${x+12}" y="${y+62+j*17}" fill="#A8C0E4" font-size="8.8">• ${ln}</text>`; });
      if(i<2) g+=`<path d="M${x+bw+3} ${y+65} L${x+bw+13} ${y+65}" stroke="#6E7F94" stroke-width="1.4"/>`; });
    g+=`<rect x="44" y="186" width="668" height="32" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="378" y="206" fill="#7FD6A8" font-size="10.8" text-anchor="middle" font-weight="bold">Finish things. Say bad news early. Keep changes small. None of it needs permission.</text>`;
    return `<svg viewBox="0 0 760 230" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  }
};

export const AGILE_MANAGERS_FIG: Record<string, () => string> = {

  n1(){ // mindset vs mechanics
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">DOING AGILE VERSUS BEING AGILE</text>`;
    const c=[['MECHANICS','"Doing agile"','#B8892B',48,['Standups held','Two-week sprints','Backlog maintained','Retrospectives run','Scope and date still fixed above']],
             ['MINDSET','"Being agile"','#1E7A52',352,['Decisions sit with the work','Plans are forecasts, not promises','Change is information','Value measured, not effort','The plan actually changes']]];
    c.forEach(r=>{
      g+=`<rect x="${r[3]}" y="38" width="290" height="176" rx="6" fill="${r[2]}" fill-opacity="0.13" stroke="${r[2]}"/>`;
      g+=`<rect x="${r[3]}" y="38" width="290" height="30" rx="6" fill="${r[2]}" fill-opacity="0.34"/>`;
      g+=`<text x="${r[3]+145}" y="58" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${r[0]} — ${r[1]}</text>`;
      r[4].forEach((ln,j)=>{
        g+=`<circle cx="${r[3]+22}" cy="${88+j*26}" r="3.4" fill="${r[2]}"/>`;
        g+=`<text x="${r[3]+36}" y="${92+j*26}" fill="#CFDCEF" font-size="10">${ln}</text>`; });
    });
    g+=`<rect x="48" y="226" width="594" height="30" rx="5" fill="#C8102E" fill-opacity="0.15" stroke="#C8102E"/>`;
    g+=`<text x="345" y="246" fill="#FF9BA6" font-size="10.8" text-anchor="middle" font-weight="bold">The test: when the team learns the plan is wrong, what actually happens?</text>`;
    return `<svg viewBox="0 0 690 268" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n2(){ // when agile works
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">WHEN AGILE OUTPERFORMS — 1,002 PROJECTS</text>`;
    const rows=[['Team experience','Experienced','Inexperienced'],['Team size','Smaller','Large'],
                ['Goal clarity','Unclear goals','Clear goals'],['Complexity','Medium to high','Low'],
                ['Stakeholder engagement','Medium to low','Very high']];
    g+=`<text x="200" y="46" fill="#7FD6A8" font-size="10" text-anchor="middle" font-weight="bold">FAVOURS AGILE</text>`;
    g+=`<text x="520" y="46" fill="#FF9BA6" font-size="10" text-anchor="middle" font-weight="bold">LIMITS AGILE</text>`;
    rows.forEach((r,i)=>{ const y=56+i*32;
      g+=`<text x="52" y="${y+16}" fill="#CFDCEF" font-size="10">${r[0]}</text>`;
      g+=`<rect x="128" y="${y}" width="150" height="24" rx="4" fill="#1E7A52" fill-opacity="0.22" stroke="#1E7A52" stroke-opacity="0.7"/>`;
      g+=`<text x="203" y="${y+16}" fill="#7FD6A8" font-size="10" text-anchor="middle">${r[1]}</text>`;
      g+=`<rect x="446" y="${y}" width="150" height="24" rx="4" fill="#C8102E" fill-opacity="0.2" stroke="#C8102E" stroke-opacity="0.7"/>`;
      g+=`<text x="521" y="${y+16}" fill="#FF9BA6" font-size="10" text-anchor="middle">${r[2]}</text>`;
      g+=`<path d="M290 ${y+12} L434 ${y+12}" stroke="#3A4E68" stroke-width="0.8" stroke-dasharray="3 3"/>`; });
    g+=`<rect x="52" y="224" width="586" height="30" rx="5" fill="#B8892B" fill-opacity="0.16" stroke="#B8892B"/>`;
    g+=`<text x="345" y="244" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">Teams still benefit outside the ideal case — but not equally. Evaluate before committing.</text>`;
    return `<svg viewBox="0 0 690 266" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n3(){ // framework selection
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">WHAT EACH FRAMEWORK OPTIMISES FOR</text>`;
    const f=[['SCRUM','Cadence and commitment','Fixed sprints · defined roles · regular demo','Fails as: a treadmill with no goal','#2E6FB0'],
             ['KANBAN','Flow and responsiveness','WIP limits · continuous pull · no sprints','Fails as: a board with no limits','#1E7A52'],
             ['XP','Technical quality','TDD · pairing · CI · refactoring','Fails as: practices cut under pressure','#C8102E']];
    f.forEach((r,i)=>{ const y=40+i*62;
      g+=`<rect x="48" y="${y}" width="594" height="54" rx="5" fill="${r[4]}" fill-opacity="0.14" stroke="${r[4]}"/>`;
      g+=`<rect x="48" y="${y}" width="86" height="54" rx="5" fill="${r[4]}" fill-opacity="0.34"/>`;
      g+=`<text x="91" y="${y+32}" fill="#fff" font-size="12.5" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="148" y="${y+19}" fill="#fff" font-size="10.8" font-weight="bold">${r[1]}</text>`;
      g+=`<text x="148" y="${y+35}" fill="#A8C0E4" font-size="9.5">${r[2]}</text>`;
      g+=`<text x="632" y="${y+47}" fill="#F0C8A0" font-size="9" text-anchor="end" font-style="italic">${r[3]}</text>`; });
    g+=`<text x="345" y="242" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">Scrum + XP is the strongest default for a product team. Combination beats purity.</text>`;
    return `<svg viewBox="0 0 690 254" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n4(){ // stop keep start
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">THE MANAGER'S ROLE — STOP, KEEP, START</text>`;
    const c=[['STOP','#C8102E',36,['Assigning individual tasks','Being the only channel to stakeholders','Asking for status the board shows','Approving technical decisions','Managing utilisation']],
             ['KEEP','#B8892B',284,['Accountability for outcomes','Setting and defending priorities','Budget, contracts and vendors','Developing and hiring people','Saying no on the team’s behalf']],
             ['START','#1E7A52',532,['Clearing organisational blockers','Protecting from scope injection','Making strategy visible','Making bad news safe to report','Tracking impediment age']]];
    c.forEach(r=>{
      g+=`<rect x="${r[2]}" y="38" width="212" height="176" rx="6" fill="${r[1]}" fill-opacity="0.13" stroke="${r[1]}"/>`;
      g+=`<rect x="${r[2]}" y="38" width="212" height="28" rx="6" fill="${r[1]}" fill-opacity="0.36"/>`;
      g+=`<text x="${r[2]+106}" y="57" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      r[3].forEach((ln,j)=>{ g+=`<text x="${r[2]+12}" y="${86+j*26}" fill="#CFDCEF" font-size="9.3">› ${ln}</text>`; }); });
    g+=`<text x="380" y="236" fill="#F0DCB4" font-size="10.5" text-anchor="middle" font-weight="bold">The value of a manager is not positional. It is the ability to make everyone else better.</text>`;
    return `<svg viewBox="0 0 760 248" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n5(){ // hand-offs and queues
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">WHY WORK TAKES SO LONG — QUEUES, NOT EFFORT</text>`;
    const st=[['Request','#6E7F94',12],['Analysis','#2E6FB0',60],['Build','#2E6FB0',110],['Test team','#C8102E',48],['Release team','#C8102E',52],['Live','#1E7A52',12]];
    let x=40; const total=st.reduce((a,b)=>a+b[2],0);
    st.forEach((s,i)=>{ const w=Math.max(46,(s[2]/total)*560);
      g+=`<rect x="${x}" y="46" width="${w}" height="36" rx="4" fill="${s[1]}" fill-opacity="0.28" stroke="${s[1]}"/>`;
      g+=`<text x="${x+w/2}" y="68" fill="#fff" font-size="9" text-anchor="middle" font-weight="bold">${s[0]}</text>`;
      if(i<st.length-1){ g+=`<rect x="${x+w}" y="52" width="14" height="24" rx="2" fill="#B8892B" fill-opacity="0.5"/>`;
        g+=`<text x="${x+w+7}" y="96" fill="#F0DCB4" font-size="8" text-anchor="middle">wait</text>`; }
      x+=w+14; });
    g+=`<text x="380" y="124" fill="#A8C0E4" font-size="10" text-anchor="middle">Each hand-off adds a queue. In most organisations, flow efficiency is under 20%.</text>`;
    const b=[['ACTIVE WORK','#1E7A52',0.18],['WAITING','#C8102E',0.82]];
    let bx=100;
    b.forEach(r=>{ const w=560*r[2];
      g+=`<rect x="${bx}" y="140" width="${w}" height="30" rx="3" fill="${r[1]}" fill-opacity="0.6"/>`;
      g+=`<text x="${bx+w/2}" y="160" fill="#fff" font-size="10" text-anchor="middle" font-weight="bold">${r[0]}</text>`; bx+=w; });
    g+=`<text x="380" y="192" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">The opportunity is in the waiting, not in the working. That is a structural problem.</text>`;
    return `<svg viewBox="0 0 760 204" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n6(){ // three-point forecast
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">FORECAST WITH THREE NUMBERS, NOT ONE</text>`;
    g+=`<text x="52" y="50" fill="#CFDCEF" font-size="10" font-weight="bold">REMAINING BACKLOG ÷ OBSERVED THROUGHPUT</text>`;
    const r=[['FASTEST observed rate','Feb','#1E7A52',0.42],['MEDIAN rate','Mar','#B8892B',0.62],['SLOWEST observed rate','Apr','#C8102E',0.86]];
    r.forEach((x,i)=>{ const y=62+i*44, w=520*x[3];
      g+=`<rect x="52" y="${y}" width="${w}" height="30" rx="4" fill="${x[2]}" fill-opacity="0.28" stroke="${x[2]}"/>`;
      g+=`<text x="64" y="${y+20}" fill="#fff" font-size="10" font-weight="bold">${x[0]}</text>`;
      g+=`<text x="${52+w+12}" y="${y+20}" fill="${x[2]==='#B8892B'?'#F0DCB4':'#fff'}" font-size="13" font-weight="bold">${x[1]}</text>`; });
    g+=`<rect x="52" y="200" width="590" height="30" rx="5" fill="#2E6FB0" fill-opacity="0.16" stroke="#2E6FB0"/>`;
    g+=`<text x="347" y="220" fill="#8FC0F0" font-size="10.5" text-anchor="middle" font-weight="bold">Report the range. A single date is remembered as a promise, whatever caveats you attach.</text>`;
    return `<svg viewBox="0 0 690 242" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n7(){ // funding models
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">FUNDING MODELS THAT FIT ADAPTIVE DELIVERY</text>`;
    const m=[['INCREMENTAL','Release money in tranches at review points','#2E6FB0'],
             ['PRODUCT / CAPABILITY','Fund a persistent team against an outcome','#1E7A52'],
             ['CAPACITY-BASED','Fund N teams; allocate capacity quarterly','#B8892B'],
             ['FIXED ENVELOPE','Budget and date fixed; scope prioritised','#8A6FBF']];
    m.forEach((r,i)=>{ const y=40+i*44;
      g+=`<rect x="48" y="${y}" width="594" height="36" rx="5" fill="${r[2]}" fill-opacity="0.14" stroke="${r[2]}"/>`;
      g+=`<rect x="48" y="${y}" width="4.5" height="36" fill="${r[2]}"/>`;
      g+=`<text x="68" y="${y+23}" fill="#fff" font-size="11" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="270" y="${y+23}" fill="#A8C0E4" font-size="9.8">${r[1]}</text>`; });
    g+=`<rect x="48" y="222" width="594" height="46" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="345" y="242" fill="#7FD6A8" font-size="11" text-anchor="middle" font-weight="bold">All four commit to a level of investment rather than to a list of features.</text>`;
    g+=`<text x="345" y="259" fill="#A8C0E4" font-size="9.8" text-anchor="middle">Sell it to finance as tighter control — four chances to stop, not one — never as flexibility.</text>`;
    return `<svg viewBox="0 0 690 280" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n8(){ // metrics levels
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">FOUR LEVELS OF MEASUREMENT</text>`;
    const L=[['IMPACT','Revenue · cost · retention','The only level a board accepts','#1E7A52',0],
             ['OUTCOME','Adoption · errors · satisfaction','What changed for users','#4A8FD0',1],
             ['FLOW','Cycle time · WIP · blocked time','Where improvement is found','#B8892B',2],
             ['ACTIVITY','Story points · tickets · sprints','Useful to the team, worthless as evidence','#6E7F94',3]];
    L.forEach(r=>{ const y=40+r[4]*46, w=280+r[4]*80, x=345-w/2;
      g+=`<rect x="${x}" y="${y}" width="${w}" height="38" rx="5" fill="${r[3]}" fill-opacity="0.18" stroke="${r[3]}"/>`;
      g+=`<text x="345" y="${y+17}" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">${r[0]} — ${r[1]}</text>`;
      g+=`<text x="345" y="${y+31}" fill="#A8C0E4" font-size="9" text-anchor="middle">${r[2]}</text>`; });
    g+=`<path d="M40 60 L40 210" stroke="#3A4E68" stroke-width="1"/>`;
    g+=`<text x="30" y="80" fill="#7FD6A8" font-size="9" text-anchor="middle" transform="rotate(-90 30 80)">managers report</text>`;
    g+=`<text x="30" y="180" fill="#B8892B" font-size="9" text-anchor="middle" transform="rotate(-90 30 180)">teams use</text>`;
    g+=`<text x="345" y="240" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">Any metric a team can improve without improving the outcome, will be.</text>`;
    return `<svg viewBox="0 0 690 252" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n9(){ // governance substitutions
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">FOUR GOVERNANCE SUBSTITUTIONS</text>`;
    const s=[['Infrequent large decisions','Frequent small decisions'],['Documented status','Demonstrated working output'],
             ['Point-in-time snapshots','Trends over several sprints'],['RAG status','Named risks with owners']];
    s.forEach((r,i)=>{ const y=42+i*44;
      g+=`<rect x="40" y="${y}" width="270" height="34" rx="5" fill="#6E7F94" fill-opacity="0.2" stroke="#6E7F94"/>`;
      g+=`<text x="175" y="${y+22}" fill="#CFDCEF" font-size="10.5" text-anchor="middle">${r[0]}</text>`;
      g+=`<path d="M316 ${y+17} L392 ${y+17}" stroke="#B8892B" stroke-width="1.8" marker-end="url(#ngar)"/>`;
      g+=`<rect x="400" y="${y}" width="290" height="34" rx="5" fill="#1E7A52" fill-opacity="0.2" stroke="#1E7A52"/>`;
      g+=`<text x="545" y="${y+22}" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">${r[1]}</text>`; });
    g+=`<defs><marker id="ngar" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#B8892B"/></marker></defs>`;
    g+=`<text x="380" y="238" fill="#A8C0E4" font-size="10.3" text-anchor="middle">Most audit objections to agile are objections to <tspan font-style="italic">undocumented</tspan> agile — and are usually correct.</text>`;
    return `<svg viewBox="0 0 760 250" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n10(){ // scale or descale
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">BEFORE YOU SCALE, ASK WHY THE DEPENDENCIES EXIST</text>`;
    g+=`<rect x="240" y="38" width="210" height="34" rx="6" fill="#B8892B" fill-opacity="0.22" stroke="#B8892B"/>`;
    g+=`<text x="345" y="60" fill="#F0DCB4" font-size="11" text-anchor="middle" font-weight="bold">Map your dependencies</text>`;
    const br=[[48,'INHERENT','Genuinely unavoidable coupling','Manage them: visible board, explicit commitments, sequencing','#2E6FB0'],
              [352,'STRUCTURAL','Caused by team or architecture design','Remove them: value-stream teams, decoupling, less concurrent work','#1E7A52']];
    br.forEach(b=>{
      g+=`<path d="M345 72 L${b[0]+145} 92" stroke="${b[4]}" stroke-width="1.4"/>`;
      g+=`<rect x="${b[0]}" y="92" width="290" height="86" rx="6" fill="${b[4]}" fill-opacity="0.15" stroke="${b[4]}"/>`;
      g+=`<rect x="${b[0]}" y="92" width="290" height="3.5" fill="${b[4]}"/>`;
      g+=`<text x="${b[0]+145}" y="116" fill="#fff" font-size="12" text-anchor="middle" font-weight="bold">${b[1]}</text>`;
      g+=`<text x="${b[0]+145}" y="136" fill="#A8C0E4" font-size="9.5" text-anchor="middle">${b[2]}</text>`;
      g+=`<text x="${b[0]+145}" y="160" fill="#CFDCEF" font-size="9.2" text-anchor="middle">${b[3].slice(0,44)}</text>`;
      g+=`<text x="${b[0]+145}" y="172" fill="#CFDCEF" font-size="9.2" text-anchor="middle">${b[3].slice(44)}</text>`; });
    g+=`<rect x="48" y="192" width="594" height="30" rx="5" fill="#C8102E" fill-opacity="0.15" stroke="#C8102E"/>`;
    g+=`<text x="345" y="212" fill="#FF9BA6" font-size="10.5" text-anchor="middle" font-weight="bold">Buying a framework for a structural problem is the most expensive mistake here.</text>`;
    return `<svg viewBox="0 0 690 234" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n11(){ // why transformations fail
    let g='';
    g+=`<text x="345" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">WHY TRANSFORMATIONS FAIL</text>`;
    g+=`<rect x="48" y="38" width="594" height="34" rx="5" fill="#C8102E" fill-opacity="0.2" stroke="#C8102E"/>`;
    g+=`<text x="345" y="60" fill="#FF9BA6" font-size="12.5" text-anchor="middle" font-weight="bold">Around 70% of change initiatives fail. Assume you are in that population.</text>`;
    const f=[['Only the teams change','Funding, governance and contracts untouched'],
             ['It is a cost programme in disguise','Staff conclude the goal is fewer people'],
             ['Ceremonies mandated, mindset not','Compliance without belief'],
             ['Middle management bypassed','The layer that changes most, consulted least'],
             ['The first failure is punished','One punishment ends candid reporting for years'],
             ['Success is never defined','The transformation becomes permanent']];
    f.forEach((r,i)=>{ const col=i%2, row=Math.floor(i/2), x=48+col*300, y=84+row*50;
      g+=`<rect x="${x}" y="${y}" width="290" height="42" rx="5" fill="#B8892B" fill-opacity="0.12" stroke="#B8892B" stroke-opacity="0.6"/>`;
      g+=`<text x="${x+14}" y="${y+18}" fill="#fff" font-size="10" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+14}" y="${y+33}" fill="#A8C0E4" font-size="8.8">${r[1]}</text>`; });
    g+=`<rect x="48" y="240" width="594" height="30" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="345" y="260" fill="#7FD6A8" font-size="10.5" text-anchor="middle" font-weight="bold">Change one organisational mechanism in six months, or the change is read as optional.</text>`;
    return `<svg viewBox="0 0 690 282" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  },
  n12(){ // twelve month plan
    let g='';
    g+=`<text x="380" y="22" fill="#F0DCB4" font-size="12" text-anchor="middle" font-weight="bold" letter-spacing="0.8">A TWELVE-MONTH SEQUENCE</text>`;
    const q=[['MONTHS 1–3','ASSESS','Suitability filter on the portfolio\nMap dependencies and hand-offs\nDecision-rights map\nStop reporting activity data','#2E6FB0'],
             ['MONTHS 4–6','CHANGE ONE THING','One initiative to incremental funding\nOne governance artefact to a demo\nOne structural change\nThree-point forecasting','#B8892B'],
             ['MONTHS 7–9','EXTEND','A second team, chosen for willingness\nRenegotiate one contract clause\nPublish the five-number set\nReport honestly, including failures','#1E7A52'],
             ['MONTHS 10–12','CONSOLIDATE','Benefits claimed versus observed\nScale only if the map justifies it\nRetire outdated internal policies\nNext year set on evidence','#C8102E']];
    const bw=158;
    q.forEach((r,i)=>{ const x=44+i*(bw+16), y=42;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="132" rx="6" fill="${r[3]}" fill-opacity="0.14" stroke="${r[3]}"/>`;
      g+=`<rect x="${x}" y="${y}" width="${bw}" height="4" fill="${r[3]}"/>`;
      g+=`<text x="${x+bw/2}" y="${y+20}" fill="#CFDCEF" font-size="8.6" text-anchor="middle" font-weight="bold">${r[0]}</text>`;
      g+=`<text x="${x+bw/2}" y="${y+38}" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">${r[1]}</text>`;
      r[2].split('\n').forEach((ln,j)=>{ g+=`<text x="${x+9}" y="${y+58+j*17}" fill="#A8C0E4" font-size="8.4">• ${ln}</text>`; });
      if(i<3) g+=`<path d="M${x+bw+2} ${y+66} L${x+bw+13} ${y+66}" stroke="#6E7F94" stroke-width="1.4" marker-end="url(#n12a)"/>`; });
    g+=`<defs><marker id="n12a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7 z" fill="#6E7F94"/></marker></defs>`;
    g+=`<rect x="44" y="188" width="668" height="32" rx="5" fill="#1E7A52" fill-opacity="0.18" stroke="#1E7A52"/>`;
    g+=`<text x="378" y="208" fill="#7FD6A8" font-size="10.8" text-anchor="middle" font-weight="bold">Team practices decay back toward whatever the surrounding system rewards.</text>`;
    return `<svg viewBox="0 0 760 232" xmlns="http://www.w3.org/2000/svg">${g}</svg>`;
  }
};

export function renderAgileDevDiagram(id: string): string {
  if (AGILE_DEVELOPERS_FIG[id]) {
    return AGILE_DEVELOPERS_FIG[id]();
  }
  return "";
}

export function renderAgileMgmtDiagram(id: string): string {
  if (AGILE_MANAGERS_FIG[id]) {
    return AGILE_MANAGERS_FIG[id]();
  }
  return "";
}
