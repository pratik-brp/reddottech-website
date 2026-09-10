export interface Section {
  h: string;
  html: string;
}

export interface QuizItem {
  q: string;
  opts: string[];
  a: number;
  fb: string;
}

export interface Lesson {
  id: string;
  tag: string;
  time: string;
  title: string;
  summary: string;
  objectives: string[];
  sections: Section[];
  practitioner?: { title: string; text: string };
  activity: { title: string; text: string };
  takeaways: string[];
  quiz: QuizItem[];
}

export const managementLessons: Lesson[] = [
  {
    "id": "g1",
    "tag": "Module 1",
    "time": "45 min",
    "title": "The Executive's Mental Model of AI",
    "summary": "What leaders actually need to understand — and what they can safely ignore",
    "objectives": [
      "Distinguish the four kinds of AI a manager will encounter, and know which problems each solves",
      "Understand what AI can and cannot do, in terms you can defend in a management meeting",
      "Recognise the three eras of business AI and where your organisation currently sits",
      "Speak precisely enough to lead vendor conversations and challenge weak proposals",
      "Understand why AI projects behave more like research than like IT projects"
    ],
    "sections": [
      {
        "h": "What this programme is, and who it is for",
        "html": "\n        <p>This programme is written for managers, senior management teams and executives — people who must <strong>decide about AI rather than build it</strong>. It assumes no technical background and requires none.</p>\n        <p>You will not learn to write code or train a model. You will learn to set strategy, allocate budget, assign decision rights, select vendors, govern risk, lead your people through change, and judge whether what you are being sold is worth buying. Every module ends with something you can apply in your own organisation, and the programme concludes with a capstone AI strategy you can take to your board or management committee.</p>\n        <p>The pressure to act is real. Capgemini Research Institute's 2026 survey of <strong>500 CXOs, including 100 CEOs</strong>, found that <strong>more than half already use AI to support or inform strategic decision-making</strong>, with close to another third experimenting — and this is expected to <strong>more than double within three years</strong>. The question facing most leadership teams is no longer whether to engage, but whether they will do so deliberately or by accident.</p>"
      },
      {
        "h": "The four kinds of AI a manager will meet",
        "html": "\n        <p>Vendors use these terms interchangeably. Precision protects your budget.</p>\n        <ul class=\"body\">\n          <li><strong>Rule-based automation.</strong> Software following logic a person wrote: \"if the invoice is over this amount, route it for approval.\" Reliable, transparent, and it does not learn. Much of what is sold as AI is this.</li>\n          <li><strong>Machine learning (ML).</strong> Systems that learn patterns from historical data rather than following written rules. This is what powers demand forecasting, customer churn prediction, credit assessment and fraud detection. It answers questions of the form <em>\"how likely is X?\"</em></li>\n          <li><strong>Generative AI.</strong> Models that produce new content — text, images, summaries, code. This is the wave that made AI a boardroom topic. It answers <em>\"draft this, summarise this, explain this.\"</em></li>\n          <li><strong>Agentic AI.</strong> Systems that pursue a goal across multiple steps, using tools and adapting as they go, rather than answering a single request. The newest category, the most powerful, and the one requiring the most control.</li>\n        </ul>\n        <p>A practical translation for management: <strong>machine learning predicts, generative AI produces, agentic AI acts.</strong> Each carries a different cost profile, a different risk profile and a different governance requirement. A proposal that does not say which one it is has not been thought through.</p>"
      },
      {
        "h": "The three eras — and where you are",
        "html": "\n        <p>The evolution of AI in business has moved through recognisable phases:</p>\n        <ol class=\"body\">\n          <li><strong>Rule-based systems.</strong> Automating routine tasks on predefined logic. Efficient but rigid, requiring constant manual updating.</li>\n          <li><strong>Predictive analytics and machine learning.</strong> Identifying patterns, forecasting trends and automating decisions at scale — though early applications were often <em>siloed</em>, operating in isolation and constrained by data quality.</li>\n          <li><strong>Enterprise AI.</strong> AI as an organisation-wide capability integrated across functions, learning from large datasets and adapting in real time — moving from static insight toward being a decision-making partner.</li>\n        </ol>\n        <p>Most organisations in Nepal and comparable markets sit somewhere between the first and second era, with pockets of the third appearing through purchased software. That is a perfectly reasonable position. The mistake is believing you are further along than you are, which leads to buying era-three solutions that your era-one foundations cannot support.</p>"
      },
      {
        "h": "What AI genuinely does well",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Finds patterns in large volumes of data</strong> that no human could hold in their head — customer behaviour, demand seasonality, quality defects, risk indicators.</li>\n          <li><strong>Processes language and documents at scale</strong> — reading, summarising, extracting, drafting, translating.</li>\n          <li><strong>Handles repetitive cognitive work</strong> consistently and without fatigue.</li>\n          <li><strong>Makes expertise more available</strong> — putting a reasonable first answer in the hands of someone who would otherwise wait for a specialist.</li>\n          <li><strong>Operates continuously</strong> — no shifts, no queue, no closing time.</li>\n        </ul>"
      },
      {
        "h": "What AI does not do — and why executives get this wrong",
        "html": "\n        <ul class=\"body\">\n          <li><strong>It does not understand your business.</strong> It has no model of your strategy, your customers or your constraints beyond what is in its data or what you tell it.</li>\n          <li><strong>It is not reliably factual.</strong> Generative systems can produce confident, well-written statements that are simply wrong. This is the single most important limitation for a manager to internalise.</li>\n          <li><strong>It is not objective.</strong> A system trained on your historical decisions will reproduce your historical preferences, including ones you would not defend publicly.</li>\n          <li><strong>It does not maintain itself.</strong> Conditions change; performance quietly degrades. Deployment is the beginning of an obligation, not the end of a project.</li>\n          <li><strong>It does not take accountability.</strong> When something goes wrong, the manager who authorised it answers for it. No regulator, customer or board has ever accepted \"the system decided.\"</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The executive translation</h4><p style=\"margin:0\">Treat AI output the way you would treat work from a capable, fast, tireless analyst who is <strong>new to your organisation, occasionally overconfident, and unable to tell you when they are out of their depth</strong>. You would not forward that person's work to a customer unread. Apply the same standard, and most AI risk management follows naturally.</p></div>"
      },
      {
        "h": "Why AI projects behave differently from IT projects",
        "html": "\n        <p>This is the insight that most protects a management team from disappointment. The World Economic Forum's <em>AI C-Suite Toolkit</em> puts it directly: <strong>AI projects often resemble research and development rather than IT projects.</strong> They are less deterministic and more experimental in nature.</p>\n        <p>The consequences are practical and financial:</p>\n        <ul class=\"body\">\n          <li><strong>Outcomes cannot be guaranteed in advance.</strong> Getting a system to an acceptable level of performance and robustness can be challenging and unpredictable.</li>\n          <li><strong>Overruns are common.</strong> The WEF reports AI projects falling foul of data accessibility, quality and manipulation challenges, <strong>overrunning by factors of two to three times in cost and time.</strong></li>\n          <li><strong>Data work dominates.</strong> It is not uncommon for <strong>80% of the time needed to create an AI system to be devoted to data cleansing and manipulation.</strong></li>\n          <li><strong>Maintenance is permanent.</strong> Models drift as the environment changes, undermining effectiveness unless actively managed.</li>\n        </ul>\n        <p>If you budget and govern an AI initiative as though it were an ERP implementation with a fixed scope and a fixed date, you will be disappointed and your team will be blamed for something structural. Budget it as a portfolio of experiments with staged decision points, and you will be running it correctly.</p>"
      },
      {
        "h": "The vocabulary that makes you effective in the room",
        "html": "\n        <p>Six terms worth using precisely:</p>\n        <ul class=\"body\">\n          <li><strong>Model</strong> — the trained system that produces predictions or output.</li>\n          <li><strong>Training data</strong> — the historical examples the model learned from. Ask what it was, and how similar it is to your situation.</li>\n          <li><strong>Hallucination</strong> — a confident, fluent, factually wrong output from a generative system.</li>\n          <li><strong>Human in the loop</strong> — a person reviews or approves before the output takes effect. Ask <em>who</em>, and whether they have the time and authority to disagree.</li>\n          <li><strong>Drift</strong> — gradual degradation of performance as conditions change.</li>\n          <li><strong>Use case</strong> — a specific business problem AI is applied to. Insist that proposals name one; \"adopting AI\" is not a use case.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the three questions that expose a weak proposal",
      "text": "In any AI proposal meeting, ask these in order: <em>(1) Which specific decision or task does this improve? (2) What does the system do when it is wrong, and who notices? (3) What data does it need, and do we actually have it today?</em> A serious proposal answers all three in plain language within two minutes. A weak one retreats into technology description. You do not need technical knowledge to run this test — only the discipline to keep asking."
    },
    "activity": {
      "title": "Workplace application",
      "text": "List the three most repetitive, judgement-light tasks your team performs each week, and estimate the hours each consumes. For each, note whether it is fundamentally about <strong>predicting</strong> something, <strong>producing</strong> something, or <strong>acting</strong> across several steps. You have just categorised your first candidate use cases by AI type — and you will use this list again in Module 4."
    },
    "takeaways": [
      "Machine learning predicts, generative AI produces, agentic AI acts — each has a different risk and cost profile",
      "Most organisations sit between the rule-based and predictive eras; overstating your position leads to buying what you cannot support",
      "AI is fast and tireless but not factual, not objective, not self-maintaining and never accountable",
      "AI projects resemble R&D more than IT — they overrun by two to three times when governed as fixed-scope projects",
      "Roughly 80% of the effort in building an AI system is data cleansing and preparation",
      "Insist every proposal names a specific use case, a failure mode, and the data it requires"
    ],
    "quiz": [
      {
        "q": "A vendor proposes a system that will 'use AI to transform your operations'. Your first response as a manager should be:",
        "opts": [
          "Ask which specific decision or task it improves, what happens when it is wrong, and what data it needs",
          "Approve a pilot to avoid falling behind",
          "Ask how many parameters the model has",
          "Refer it to the IT department"
        ],
        "a": 0,
        "fb": "'Adopting AI' is not a use case. A serious proposal answers all three questions in plain language within two minutes."
      },
      {
        "q": "The World Economic Forum notes that AI projects often resemble research and development rather than IT projects. The practical consequence for a management team is:",
        "opts": [
          "They should be cancelled as too risky",
          "They should be budgeted as staged experiments with decision points, not as fixed-scope, fixed-date projects",
          "They require no governance",
          "They should be run entirely by the IT department"
        ],
        "a": 1,
        "fb": "Governing an experimental initiative as a deterministic project produces overruns of two to three times and blames the team for something structural."
      },
      {
        "q": "Roughly what proportion of the effort in creating an AI system is typically devoted to data cleansing and manipulation?",
        "opts": [
          "None — modern AI handles messy data automatically",
          "Under 5%",
          "Around 80%",
          "Around 10%"
        ],
        "a": 2,
        "fb": "The WEF notes it is not uncommon for 80% of the time to go on data preparation. Budgets that ignore this are wrong before they start."
      },
      {
        "q": "Which statement about AI accountability is correct?",
        "opts": [
          "No one is accountable for automated decisions",
          "The vendor becomes accountable once the system is live",
          "Accountability transfers to the IT department",
          "The manager who authorised the system remains accountable for its outcomes"
        ],
        "a": 3,
        "fb": "No regulator, customer or board has ever accepted 'the system decided'. Authorisation carries accountability."
      },
      {
        "q": "'Drift' in an AI system refers to:",
        "opts": [
          "Gradual performance degradation as conditions change after deployment",
          "Staff gradually losing interest",
          "Data moving between servers",
          "Budget overruns"
        ],
        "a": 0,
        "fb": "Deployment is the beginning of an obligation, not the end of a project. Drift must be actively monitored and managed."
      }
    ]
  },
  {
    "id": "g2",
    "tag": "Module 2",
    "time": "55 min",
    "title": "AI Strategy: Aligning Technology to Business Goals",
    "summary": "Turning enthusiasm into a defensible plan",
    "objectives": [
      "Understand what an AI strategy is and why it must sit inside corporate strategy rather than beside it",
      "Assess your organisation's AI maturity honestly",
      "Understand the relationship between AI strategy, data strategy and change management",
      "Design an AI roadmap and know who must be consulted in building it",
      "Recognise the strategic options AI creates, from incremental efficiency to business-model change",
      "Avoid the most common strategic errors"
    ],
    "sections": [
      {
        "h": "What an AI strategy actually is",
        "html": "\n        <p>An AI strategy is <strong>not</strong> a list of technologies, a budget line, or a statement that the organisation will \"embrace AI.\" It is a set of choices: which business objectives AI will serve, which problems it will be applied to first, what capability the organisation will build versus buy, what risks it will accept, and how success will be measured.</p>\n        <p>The World Economic Forum's <em>AI C-Suite Toolkit</em> is direct on the central requirement: an AI strategy <strong>must be aligned with the organisation's larger corporate strategy</strong>. This sounds obvious and is routinely violated. AI strategies written by technology functions in isolation optimise for technical capability; AI strategies written by business leaders without technical input optimise for things that cannot be built. Neither survives.</p>"
      },
      {
        "h": "The strategic options AI creates",
        "html": "\n        <p>AI presents a spectrum of ambition, and choosing where you sit on it is the first strategic decision:</p>\n        <ul class=\"body\">\n          <li><strong>Efficiency.</strong> Do what you do now, faster and cheaper. Lowest risk, most measurable, and where nearly all organisations should start.</li>\n          <li><strong>Effectiveness.</strong> Do what you do now, better — more accurate forecasts, better targeting, earlier problem detection.</li>\n          <li><strong>Experience.</strong> Change what it feels like to be your customer or your employee — faster service, personalisation, availability outside working hours.</li>\n          <li><strong>New propositions.</strong> Offer something you could not previously offer — a service that was uneconomic at your scale, or a product that requires continuous intelligence.</li>\n          <li><strong>Business model.</strong> Redesign the organisation around an AI-optimised workflow, enabling a rethinking of internal economics and organisational design.</li>\n        </ul>\n        <p>The WEF observes that these carry very different risk profiles — reimagining the business as an AI-first organisation is a fundamentally different undertaking from rolling out a customer-facing chatbot, \"despite both being relevant AI strategic options.\" A strategy that does not state which level it is pursuing will drift toward the easiest and disappoint everyone who expected the hardest.</p>"
      },
      {
        "h": "Assessing maturity honestly",
        "html": "\n        <p>Strategy requires a truthful starting point. A workable four-stage assessment:</p>\n        <ol class=\"body\">\n          <li><strong>Exploring.</strong> Interest and discussion. Perhaps unapproved tools in use. No owner, no governance, no measured use case.</li>\n          <li><strong>Piloting.</strong> One or more defined use cases in controlled testing, with named owners and some measurement. Value not yet proven at scale.</li>\n          <li><strong>Scaling.</strong> Proven use cases extended across functions, supported by shared data, reusable components and a governance framework.</li>\n          <li><strong>Transforming.</strong> AI materially changes products, propositions or the operating model. Strategy and AI capability are inseparable.</li>\n        </ol>\n        <p>Assess across five dimensions rather than as a single score: <strong>strategy and sponsorship, data foundations, technology, people and skills, and governance.</strong> Most organisations discover they are further along on enthusiasm than on data — which is precisely the diagnosis that should shape the roadmap.</p>\n        <div class=\"callout note\"><h4>Deeper dive: the honest self-assessment problem</h4><p style=\"margin:0\">Organisations consistently overstate maturity because pilots are visible and foundations are not. A useful corrective: for each dimension, require <em>evidence</em> rather than opinion. \"We have good data\" becomes \"we can produce a joined, reliable customer dataset within four weeks — yes or no?\" Written, evidenced assessments circulated to the management team are uncomfortable and immediately clarifying.</p></div>"
      },
      {
        "h": "AI strategy, data strategy and change management",
        "html": "\n        <p>The WEF toolkit treats these as inseparable, and the relationships are worth stating plainly:</p>\n        <ul class=\"body\">\n          <li><strong>AI strategy depends on data strategy.</strong> AI is fuelled by data. If your data is fragmented across systems with no common identifiers, your AI ambitions are constrained regardless of budget. Data strategy is not a subordinate technical matter — it is a precondition.</li>\n          <li><strong>AI strategy is a change programme.</strong> The technology is rarely the hard part. Getting people to use, trust and challenge a new system — and redesigning the work around it — is where initiatives succeed or fail.</li>\n          <li><strong>AI strategy rides on digital transformation.</strong> AI typically piggybacks on investments in data platforms, cloud and process engineering. The WEF warns specifically that removing funding from these to pay for a \"sexy\" new AI initiative <em>\"may well prove counterproductive.\"</em></li>\n        </ul>"
      },
      {
        "h": "Designing the roadmap",
        "html": "\n        <p>A credible AI roadmap has six components:</p>\n        <ol class=\"body\">\n          <li><strong>Business objectives it serves.</strong> Stated in the language of your existing strategy — growth, cost, service, risk — not in the language of technology.</li>\n          <li><strong>Prioritised use cases</strong>, sequenced by value and feasibility (Module 4).</li>\n          <li><strong>Capability build-out.</strong> What data, technology, skills and governance must exist for each wave to be possible.</li>\n          <li><strong>Sequencing across horizons.</strong> Foundations and quick wins first; decision support second; customer-facing and transformational last.</li>\n          <li><strong>Investment and funding model</strong>, including ring-fenced capability spend that no single use case can justify alone.</li>\n          <li><strong>Measures and decision points.</strong> What will be true at six, twelve and twenty-four months, and what triggers a stop.</li>\n        </ol>"
      },
      {
        "h": "Who must be consulted",
        "html": "\n        <p>A roadmap designed by too few people fails on adoption; one designed by everyone never gets written. The WEF's guidance points to a defined consultation set:</p>\n        <ul class=\"body\">\n          <li><strong>Business function heads</strong> — they know which problems are worth solving and which processes will resist change.</li>\n          <li><strong>Technology and data leadership</strong> — feasibility, foundations, sequencing.</li>\n          <li><strong>Finance</strong> — funding model, and crucially the appetite for uncertainty in returns.</li>\n          <li><strong>Risk, legal and compliance</strong> — early, not at approval. Late involvement is the most common source of delay.</li>\n          <li><strong>HR</strong> — skills, role redesign, and the employment questions your people are already asking privately.</li>\n          <li><strong>Front-line representatives</strong> — the people who will actually use the system, and who know the edge cases.</li>\n        </ul>"
      },
      {
        "h": "The strategic errors that recur",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Technology-led strategy.</strong> Starting with a tool and searching for a problem. Reverse it.</li>\n          <li><strong>Everything at once.</strong> A portfolio of twelve simultaneous pilots produces twelve half-finished pilots and no capability.</li>\n          <li><strong>Underfunding foundations.</strong> Data and platform work fails every individual business case and makes everything else possible.</li>\n          <li><strong>Ignoring change management.</strong> Budgeting for software and not for adoption.</li>\n          <li><strong>No stopping rule.</strong> Initiatives that cannot be cancelled consume budget indefinitely.</li>\n          <li><strong>Copying a competitor's strategy.</strong> Their data, systems, skills and constraints are not yours.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: write the one-page strategy first",
      "text": "Before commissioning any detailed planning, write a single page: the three business objectives AI will serve, the three use cases you will start with, the one capability gap you will close, the budget envelope, and what will be measurably different in twelve months. If your management team cannot agree on that page, no amount of detailed planning will rescue the programme — and if they can, the detail follows quickly."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Assess your organisation on the four-stage maturity ladder across all five dimensions — strategy and sponsorship, data, technology, people, governance — and write one sentence of <strong>evidence</strong> for each rating, not opinion. Identify your weakest dimension. Then draft the one-page strategy described above. Keep both; they form the opening of your capstone."
    },
    "takeaways": [
      "An AI strategy is a set of choices about objectives, priorities, capability and risk — not a technology list",
      "It must sit inside corporate strategy; strategies written in isolation by either business or technology fail",
      "Choose your ambition level deliberately: efficiency, effectiveness, experience, new propositions or business model",
      "Assess maturity across strategy, data, technology, people and governance — with evidence, not opinion",
      "Data strategy is a precondition, and AI strategy is fundamentally a change programme",
      "Do not defund the data and platform investments that AI depends on to pay for AI",
      "Consult business heads, technology, finance, risk, HR and front-line staff early"
    ],
    "quiz": [
      {
        "q": "The World Economic Forum emphasises that an AI strategy must above all be:",
        "opts": [
          "Led by the technology function",
          "Aligned with the organisation's larger corporate strategy",
          "Focused on the newest available models",
          "Approved by an external consultant"
        ],
        "a": 1,
        "fb": "Strategies written by technology alone optimise for capability; those written by business alone optimise for the unbuildable. Neither survives."
      },
      {
        "q": "An organisation redirects funding from its data platform programme to pay for a new AI initiative. The WEF's guidance suggests this is:",
        "opts": [
          "Required for AI success",
          "Only a problem in large organisations",
          "Likely counterproductive, since AI typically piggybacks on those very investments",
          "Efficient reallocation of scarce capital"
        ],
        "a": 2,
        "fb": "AI depends on data lakes, cloud and process engineering. Defunding the foundation to buy the application undermines both."
      },
      {
        "q": "Which is the correct order of ambition, from lowest risk to highest?",
        "opts": [
          "There is no meaningful difference between them",
          "New propositions → efficiency → business model",
          "Business model → experience → efficiency",
          "Efficiency → effectiveness → experience → new propositions → business model"
        ],
        "a": 3,
        "fb": "Reimagining the business as AI-first is a fundamentally different undertaking from a chatbot rollout, despite both being valid strategic options."
      },
      {
        "q": "When assessing organisational AI maturity, the most useful discipline is to:",
        "opts": [
          "Require documented evidence for each rating rather than opinion",
          "Rate the organisation as a single overall score",
          "Ask each department for a self-rating",
          "Benchmark only against competitors"
        ],
        "a": 0,
        "fb": "Organisations overstate maturity because pilots are visible and foundations are not. 'We have good data' must become a testable claim."
      },
      {
        "q": "Which is the most common reason a technically successful AI initiative fails to deliver value?",
        "opts": [
          "The vendor was too expensive",
          "Change management and adoption were not funded or led",
          "The servers were too slow",
          "The model was not accurate enough"
        ],
        "a": 1,
        "fb": "The technology is rarely the hard part. Getting people to use, trust and challenge the system is where initiatives succeed or fail."
      }
    ]
  },
  {
    "id": "g3",
    "tag": "Module 3",
    "time": "55 min",
    "title": "Decision Rights: Who Owns AI in the Leadership Team",
    "summary": "The evidence on which executives should hold which decisions",
    "objectives": [
      "Understand the empirical relationship between executive decision rights and AI returns",
      "Recognise the distinct value each senior role brings to AI investment decisions",
      "Design a decision-rights allocation for your own leadership team",
      "Understand where the AI or data leader should sit and report",
      "Establish the governance forums an AI programme requires",
      "Avoid the failure modes of siloed ownership"
    ],
    "sections": [
      {
        "h": "The finding that should reshape your leadership discussion",
        "html": "\n        <p>Deloitte's Center for Integrated Research ran a predictive analysis on its Tech Value data, surveying <strong>550 business and technology leaders in April and May 2025</strong>, to establish how the degree to which a given executive owns technology decision-making corresponds with AI outcomes. Results were measured against perceived return on technology investment, movement across <strong>46 operational and financial indicators</strong>, and reported EBITDA gains.</p>\n        <p>Their headline conclusion is unambiguous, and it is not about technology:</p>\n        <p><strong>\"AI-driven business outcomes peak when decision rights are distributed among complementary leaders.\"</strong></p>\n        <p>In other words, the strongest predictor of AI returns Deloitte found was not the sophistication of the technology, the size of the budget or the calibre of the data science team. It was <em>who sits at the table when investment decisions are made, and how well they work together.</em></p>"
      },
      {
        "h": "What each role contributes — with the evidence",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Chief technology / information officer.</strong> Deloitte found CIOs and CTOs still drive most technology decisions, according to 60–80% of respondents. When CTOs shift from no control to full control of technology investment decisions, organisations are <strong>more than twice as likely to achieve \"advanced\" AI automation maturity</strong>. The caution: where CTOs are the <em>primary</em> decision-makers, companies often invest less aggressively in new data monetisation initiatives — possibly reflecting constrained budgets or a focus on maximising return from existing assets rather than pursuing growth.</li>\n          <li><strong>Chief financial officer.</strong> The most striking single finding. Among organisations where the CFO had <em>no</em> decision-making authority over digital investment, only <strong>18% achieved above-average profitability</strong>. Where the CFO had <em>full</em> authority, that figure rose to <strong>42%</strong> — more than twice as likely to outperform. Deloitte also notes CFOs tend to forecast AI-driven returns cautiously, but that their confidence in meeting programme milestones grows when they are hands-on.</li>\n          <li><strong>Chief strategy officer.</strong> The largest effect in the study. Companies with limited CSO involvement rarely excel across their KPIs. Where CSOs are given substantial authority, organisations could be <strong>up to 88 times more likely to achieve high ROI</strong> across financial, customer, operational, workforce and purpose-driven metrics. In practice the CSO is called on either to refocus investments that have plateaued, or to clarify the broader strategic value of the transformation.</li>\n        </ul>\n        <p>Deloitte's synthesis: <strong>no single role can drive strategic alignment, technical capability growth and profitability on its own.</strong> All three are needed to deliver the full set of outcomes organisations are seeking.</p>"
      },
      {
        "h": "Translating this to an organisation without a formal C-suite",
        "html": "\n        <p>Most organisations in Nepal and comparable markets do not have a chief strategy officer or a chief technology officer. The finding still applies, because what matters is the <em>lens</em>, not the title. Every AI investment decision needs four perspectives present:</p>\n        <ul class=\"body\">\n          <li><strong>Technical feasibility</strong> — can this be built and run with what we have? (IT head, or a trusted external adviser)</li>\n          <li><strong>Financial discipline</strong> — what does it cost in full, and how will we know it paid? (finance director)</li>\n          <li><strong>Strategic alignment</strong> — does this advance where the business is going? (CEO or managing director)</li>\n          <li><strong>Operational reality</strong> — will this survive contact with how the work is actually done? (the function head who owns the process)</li>\n        </ul>\n        <p>If your AI decisions are being made by one person with one lens — most commonly the technology lens, or the enthusiasm of whoever attended a conference — Deloitte's evidence suggests you are systematically underperforming what the same investment could deliver.</p>"
      },
      {
        "h": "The three predictive value drivers",
        "html": "\n        <p>Beyond decision rights, Deloitte's modelling identified three drivers that predict returns:</p>\n        <ol class=\"body\">\n          <li><strong>Technology strategy innovation maturity</strong> — having a deliberate strategy for innovation rather than reactive purchasing.</li>\n          <li><strong>Automation budget</strong> — a higher dedicated budget for automation is associated with greater profitability.</li>\n          <li><strong>Monetisation strategy investment</strong> — deliberate investment in how data and capability generate value, not only in cost reduction.</li>\n        </ol>\n        <p>Note that two of the three are <em>funding</em> decisions and one is a <em>strategy</em> decision. None is a technology decision. This is a recurring theme of the programme and worth internalising early.</p>"
      },
      {
        "h": "Where the AI or data leader should sit",
        "html": "\n        <p>Whoever leads AI in your organisation — whether a dedicated appointment or an existing executive with the remit added — three structural questions matter:</p>\n        <ul class=\"body\">\n          <li><strong>Reporting line.</strong> Deloitte's related research on digital operating models suggests <strong>a direct line to the CEO helps organisations capture more value</strong>, because digital and AI ambitions succeed when they visibly reinforce the organisation's mission. An AI leader buried three levels inside IT will deliver IT outcomes.</li>\n          <li><strong>Profile.</strong> The right leader depends on your maturity. Early-stage organisations usually need a translator — someone credible with both the business and the technology — more than they need a deep technical specialist.</li>\n          <li><strong>Authority.</strong> Can this person convene function heads, stop a project, and access the budget? A leader with responsibility and no authority is a coordinator with a title.</li>\n        </ul>"
      },
      {
        "h": "The governance forums you actually need",
        "html": "\n        <p>Two, in most organisations, plus one document:</p>\n        <ul class=\"body\">\n          <li><strong>An AI steering group.</strong> Cross-functional — business, finance, technology, risk, HR. Meets monthly. Approves use cases, allocates budget, reviews progress, and stops things. This is where the four lenses meet.</li>\n          <li><strong>Board or executive committee oversight.</strong> Quarterly. Receives a standing report on the AI portfolio, value realised, risks and incidents. Approves strategy and risk appetite.</li>\n          <li><strong>A decision-rights table.</strong> One page listing every AI-related decision, the accountable role, and the evidence required. Most governance disputes are not disagreements about principle; they are ambiguity about who decides.</li>\n        </ul>\n        <div class=\"callout note\"><h4>Deeper dive: why siloed ownership fails</h4><p style=\"margin:0\">Deloitte concludes that <strong>siloed leadership is unlikely to deliver the versatility, agility or strategic focus needed to achieve enterprise-wide value</strong>. The mechanism is straightforward: technology-owned AI optimises for capability and under-invests in adoption; finance-owned AI optimises for cost and under-invests in growth; business-owned AI optimises for one function and creates duplication. Each is individually rational and collectively insufficient.</p></div>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: check who was in the room",
      "text": "Take the last three technology or AI investment decisions your organisation made. For each, list who was actually in the room when the decision was taken. If the same one or two people appear every time — and particularly if the finance and strategy lenses were absent — you have found a structural cause of underperformance that costs nothing to fix. Widening the table is free; the returns evidence says it is also the highest-leverage change available."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Draft the decision-rights table for your organisation. List at least six AI-related decisions — approving a use case, approving spend above a threshold, approving customer-facing deployment, approving use of customer data, stopping a project, accepting a risk finding. For each, name the accountable role and the evidence required. Identify which decisions currently have no clear owner; that gap is your most urgent governance action."
    },
    "takeaways": [
      "Deloitte's survey of 550 leaders found AI outcomes peak when decision rights are distributed among complementary leaders",
      "CFO with full decision authority: 42% achieve above-average profitability, versus 18% with none",
      "Substantial CSO involvement is associated with up to 88x greater likelihood of high ROI across metrics",
      "No single role can deliver strategic alignment, technical capability and profitability alone",
      "Without a formal C-suite, ensure four lenses are present: technical, financial, strategic and operational",
      "The three predictive value drivers are innovation maturity, automation budget and monetisation investment — two funding, one strategy",
      "A direct reporting line to the CEO helps capture more value; responsibility without authority is a title"
    ],
    "quiz": [
      {
        "q": "Deloitte's predictive analysis of 550 leaders found that AI-driven business outcomes peak when:",
        "opts": [
          "The CTO holds sole authority over technology decisions",
          "Decisions are delegated entirely to the IT department",
          "Decision rights are distributed among complementary leaders",
          "An external consultant makes the decisions"
        ],
        "a": 2,
        "fb": "Each executive brings a distinct lens — technical capability, financial discipline, strategic alignment. Combined, they drive smarter bets."
      },
      {
        "q": "In Deloitte's findings, organisations where the CFO had full decision-making authority over digital investment achieved above-average profitability at what rate, compared with those where the CFO had none?",
        "opts": [
          "20% versus 19%",
          "5% versus 50%",
          "There was no measurable difference",
          "42% versus 18%"
        ],
        "a": 3,
        "fb": "More than twice as likely to outperform. Financial discipline in the decision process is strongly associated with financial outcomes."
      },
      {
        "q": "An organisation with no chief strategy officer should conclude that:",
        "opts": [
          "The strategic lens must still be present in every AI investment decision, typically supplied by the CEO or managing director",
          "They should hire a CSO immediately",
          "They cannot succeed with AI",
          "The finding does not apply to them"
        ],
        "a": 0,
        "fb": "What matters is the lens, not the title. Four perspectives must be present: technical, financial, strategic and operational."
      },
      {
        "q": "Deloitte's research on digital operating models suggests that the AI or digital leader benefits from:",
        "opts": [
          "Reporting to an external board",
          "A direct line to the CEO",
          "Reporting deep within the IT function",
          "No formal reporting line"
        ],
        "a": 1,
        "fb": "A direct line to the CEO helps organisations capture more value, because AI ambitions succeed when they visibly reinforce the mission."
      },
      {
        "q": "Which of Deloitte's three predictive value drivers is a strategy decision rather than a funding decision?",
        "opts": [
          "All three are funding decisions",
          "Monetisation strategy investment",
          "Technology strategy innovation maturity",
          "Automation budget"
        ],
        "a": 2,
        "fb": "Two of the three drivers are funding decisions and one is a strategy decision. None is a technology decision."
      },
      {
        "q": "Why does technology-owned AI typically underperform?",
        "opts": [
          "Technology teams are too small",
          "Regulators prohibit it",
          "Technologists lack intelligence",
          "It optimises for capability and under-invests in adoption, while lacking the financial and strategic lenses"
        ],
        "a": 3,
        "fb": "Each siloed ownership model is individually rational and collectively insufficient — which is why distributed decision rights outperform."
      }
    ]
  },
  {
    "id": "g4",
    "tag": "Module 4",
    "time": "55 min",
    "title": "Finding and Prioritising Use Cases",
    "summary": "From vague ambition to a ranked, fundable list",
    "objectives": [
      "Systematically identify AI opportunities across your organisation",
      "Apply a value-versus-feasibility framework to rank candidates",
      "Recognise the characteristics that make a use case likely to succeed",
      "Understand where the strongest opportunities sit by function",
      "Build a balanced portfolio rather than a collection of projects",
      "Know which use cases to refuse"
    ],
    "sections": [
      {
        "h": "Start with work, not with technology",
        "html": "\n        <p>The most common failure in use-case selection is starting from what AI can do and searching for somewhere to apply it. The disciplined approach reverses this: <strong>start from where your organisation loses time, money, accuracy or customers, and ask whether AI addresses that specific cause.</strong></p>\n        <p>Four questions surface almost every worthwhile opportunity:</p>\n        <ol class=\"body\">\n          <li><strong>Where do we do the same thing repeatedly?</strong> High-volume, rule-bounded work — data entry, document checking, routine correspondence, reconciliation, first-line queries.</li>\n          <li><strong>Where do we wait?</strong> Queues and backlogs — waiting for a report, an approval, a specialist, a translation.</li>\n          <li><strong>Where do we guess?</strong> Decisions made on instinct that could be informed by data — demand, pricing, staffing, which customer to call, which risk to investigate.</li>\n          <li><strong>Where do we get it wrong?</strong> Recurring errors, rework, complaints, missed opportunities.</li>\n        </ol>\n        <p>Ask these of every function head and you will typically generate thirty to fifty candidates in a fortnight. That list, not a vendor's catalogue, is the raw material of an AI strategy.</p>"
      },
      {
        "h": "The prioritisation framework",
        "html": "\n        <p>Score each candidate on two axes, each from 1 to 5.</p>\n        <p><strong>Value</strong> — combining:</p>\n        <ul class=\"body\">\n          <li>Volume: how often does this happen?</li>\n          <li>Cost or time consumed per occurrence</li>\n          <li>Consequence of error today</li>\n          <li>Strategic importance — does it serve a stated business objective?</li>\n        </ul>\n        <p><strong>Feasibility</strong> — combining:</p>\n        <ul class=\"body\">\n          <li>Data: do we have it, is it accessible, is it reliable?</li>\n          <li>Clarity: is \"correct\" well defined, or a matter of judgement?</li>\n          <li>Workflow: can the output be acted on without redesigning everything around it?</li>\n          <li>Risk: what is the consequence of the system being wrong, and is it reversible?</li>\n          <li>Readiness: do the people involved have capacity and willingness?</li>\n        </ul>\n        <p>Plot the results. The <strong>high-value, high-feasibility quadrant</strong> is where you start — not the most exciting quadrant, which is usually high-value and low-feasibility. Those belong on the roadmap for a later horizon, after the foundations they depend on exist.</p>"
      },
      {
        "h": "What a good first use case looks like",
        "html": "\n        <p>Six characteristics, and the strongest candidates have all of them:</p>\n        <ul class=\"body\">\n          <li><strong>Internal before external.</strong> Mistakes stay inside the organisation while you learn.</li>\n          <li><strong>Reversible.</strong> A wrong output can be corrected before it causes harm.</li>\n          <li><strong>Measurable.</strong> There is a number that will move, and you can measure it today.</li>\n          <li><strong>Bounded.</strong> One process, one team, a clear definition of done.</li>\n          <li><strong>Frequent.</strong> Happens often enough that improvement is visible within weeks.</li>\n          <li><strong>Wanted.</strong> The people doing the work would welcome help with it.</li>\n        </ul>\n        <p>That last point is systematically underrated. A use case the affected team actively wants will overcome implementation problems; one imposed on a resistant team will fail on adoption regardless of technical quality.</p>"
      },
      {
        "h": "Where the opportunities usually sit, by function",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Marketing.</strong> Customer segmentation, personalised content and offers, campaign optimisation, content drafting. One documented example describes AI-powered segmentation delivering personalised promotions based on browsing behaviour and <strong>increasing conversion rates by 30%</strong>.</li>\n          <li><strong>Sales.</strong> Lead scoring and prioritisation using engagement history and behavioural signals, demand forecasting, proposal drafting, meeting summarisation.</li>\n          <li><strong>Operations.</strong> Demand planning, scheduling, quality checking, supply chain and inventory optimisation. Accurate forecasting has been associated with <strong>inventory cost reductions of 20–50%</strong>.</li>\n          <li><strong>Finance.</strong> Invoice processing, expense checking, reconciliation, variance analysis, first-draft reporting commentary.</li>\n          <li><strong>Human resources.</strong> Job description drafting, initial screening support, policy question answering, onboarding material, training content.</li>\n          <li><strong>Customer service.</strong> Query handling within defined limits, agent assistance, call and case summarisation, sentiment monitoring.</li>\n          <li><strong>Management.</strong> Consolidated performance reporting, scenario modelling, board and committee pack preparation, competitor and market monitoring.</li>\n        </ul>\n        <p>The functions with the highest concentration of language-heavy, repetitive work — finance operations, customer service, HR administration and marketing — usually offer the fastest measurable returns.</p>"
      },
      {
        "h": "Building a portfolio, not a list",
        "html": "\n        <p>A ranked list still produces a collection of projects. A portfolio produces capability. A workable balance for an organisation beginning this journey:</p>\n        <ul class=\"body\">\n          <li><strong>Roughly 60% near-term efficiency</strong> — measurable payback within twelve months, building credibility and freeing capacity.</li>\n          <li><strong>Roughly 30% capability building</strong> — data foundations, skills, platform, governance. These fail every individual business case and make everything else possible.</li>\n          <li><strong>Roughly 10% exploratory</strong> — deliberately uncertain, small, time-boxed, and permitted to fail.</li>\n        </ul>\n        <p>The 30% is the discipline most organisations lack. Without a portfolio view, foundational work never survives a business-case test, and the organisation accumulates disconnected pilots that cannot scale.</p>"
      },
      {
        "h": "The use cases to refuse",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Anything where \"correct\" cannot be defined.</strong> If your own experts disagree on the right answer, a model cannot learn it.</li>\n          <li><strong>Anything irreversible without human approval.</strong> Payments, contractual commitments, dismissals, public communications.</li>\n          <li><strong>Anything requiring data you do not have.</strong> The most common quiet killer. Verify data existence before approving, not after.</li>\n          <li><strong>Anything where the affected team was not consulted.</strong> It will fail on adoption.</li>\n          <li><strong>Anything justified only by \"our competitors are doing it.\"</strong> Their constraints are not yours, and you do not know whether theirs is working.</li>\n          <li><strong>Anything with no measurable outcome.</strong> If success cannot be demonstrated, it cannot be defended at the next budget cycle.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: run the two-week opportunity sweep",
      "text": "Give every function head a single page with the four questions — where do we repeat, wait, guess and get it wrong — and two weeks to answer with volumes and time estimates. It costs nothing, requires no consultant, and consistently surfaces opportunities leadership did not know existed, usually in finance operations and customer service. It also creates ownership: a use case a function head identified is one they will support."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Run the opportunity sweep for your own department. Generate at least eight candidates, then score each on value (1–5) and feasibility (1–5) using the criteria in this module. Plot them. Select your top three from the high-value, high-feasibility quadrant and, for each, write one sentence on the measure that would move and the data required. This ranked shortlist becomes the core of your capstone."
    },
    "takeaways": [
      "Start from where the organisation repeats, waits, guesses and errs — not from what AI can do",
      "Score candidates on value and feasibility; start in the high-high quadrant, not the exciting one",
      "The best first use cases are internal, reversible, measurable, bounded, frequent and wanted by the team",
      "Language-heavy functions — finance operations, service, HR, marketing — usually give the fastest returns",
      "Balance the portfolio roughly 60% efficiency, 30% capability building, 10% exploratory",
      "Foundational capability work never survives an individual business case — fund it at portfolio level",
      "Refuse use cases with undefined correctness, no data, no measure, or no consultation with the affected team"
    ],
    "quiz": [
      {
        "q": "The disciplined approach to identifying AI use cases begins by:",
        "opts": [
          "Asking where the organisation repeats work, waits, guesses and gets things wrong",
          "Benchmarking against competitors",
          "Selecting the newest available technology",
          "Reviewing vendor product catalogues"
        ],
        "a": 0,
        "fb": "Starting from capability and searching for an application is the most common failure. Start from where value is lost."
      },
      {
        "q": "When plotting candidates on value and feasibility, an organisation should generally start with:",
        "opts": [
          "High value, low feasibility — the most exciting opportunities",
          "High value, high feasibility",
          "Whichever the vendor recommends",
          "Low value, high feasibility"
        ],
        "a": 1,
        "fb": "High-value, low-feasibility candidates belong on a later horizon, after the foundations they depend on exist."
      },
      {
        "q": "Which characteristic of a first use case is most often underrated?",
        "opts": [
          "That it uses the largest available model",
          "That it is technically sophisticated",
          "That the affected team actively wants the help",
          "That it is customer-facing"
        ],
        "a": 2,
        "fb": "A wanted use case overcomes implementation problems; an imposed one fails on adoption regardless of technical quality."
      },
      {
        "q": "In a balanced AI portfolio, roughly 30% should be allocated to capability building because:",
        "opts": [
          "Vendors insist on it",
          "Regulators require it",
          "It is the cheapest category",
          "Foundational work fails every individual business case yet makes everything else possible"
        ],
        "a": 3,
        "fb": "Without a portfolio view, data and platform work never survives a business-case test, and pilots accumulate without scaling."
      },
      {
        "q": "Which use case should be refused outright?",
        "opts": [
          "One where the organisation's own experts cannot agree what the correct answer is",
          "One the affected team requested",
          "One that improves a measurable operational metric",
          "A high-volume internal document-checking task"
        ],
        "a": 0,
        "fb": "If correctness cannot be defined, a model cannot learn it and success cannot be evaluated."
      },
      {
        "q": "'Our competitors are doing it' is a weak justification for a use case because:",
        "opts": [
          "It breaches confidentiality",
          "Their data, systems and constraints differ, and you do not know whether theirs is working",
          "Competitors are always wrong",
          "It is unethical to follow competitors"
        ],
        "a": 1,
        "fb": "Copying a visible initiative without knowing its results or preconditions imports someone else's risk without their capability."
      }
    ]
  },
  {
    "id": "g5",
    "tag": "Module 5",
    "time": "55 min",
    "title": "AI in Executive Decision-Making",
    "summary": "Using AI to sharpen judgement without surrendering it",
    "objectives": [
      "Understand how senior leaders are actually using AI in strategic decisions today",
      "Apply a framework to judge which decisions are ready for AI support",
      "Use AI to challenge your thinking rather than confirm it",
      "Recognise the cognitive risks specific to AI-assisted decision-making",
      "Establish norms for disclosing AI use in executive work",
      "Build personal fluency in the techniques that produce useful output"
    ],
    "sections": [
      {
        "h": "What executives are actually doing",
        "html": "\n        <p>Capgemini Research Institute's 2026 research brief, based on a survey of <strong>500 CXOs including 100 CEOs</strong>, provides the clearest available picture of AI in senior decision-making.</p>\n        <ul class=\"body\">\n          <li><strong>More than half of CXOs already use AI</strong> to support or inform strategic decision-making — either actively or selectively — with close to another third experimenting.</li>\n          <li>Use is expected to <strong>more than double within three years</strong>.</li>\n          <li>Today, most use it for <strong>productivity support</strong>: research, analysis and summarisation. Within three years, they expect to use it to <strong>augment and challenge their strategic thinking</strong>.</li>\n          <li><strong>AI is not expected to make autonomous decisions any time soon</strong> — a finding worth quoting to anyone who fears or promises otherwise.</li>\n          <li><strong>Over half report significant improvements</strong> in efficiency, creativity and foresight, with the greatest gains going to those already using AI to strengthen strategic thinking rather than merely to save time.</li>\n        </ul>\n        <p>The research defines strategic decision-making precisely: high-impact choices that shape long-term direction, commit significant resources and carry significant risk — <strong>market entry or exit, major investments, budget shifts, mergers and acquisitions, and competitive repositioning.</strong></p>"
      },
      {
        "h": "The uncomfortable finding: quiet use",
        "html": "\n        <p>Two findings from the same study deserve to be read together.</p>\n        <p>First, <strong>most organisations lack the frameworks, systems and processes</strong> needed to help leaders harness AI responsibly and confidently. Second — and this is the telling one — <strong>many CXOs continue to use AI cautiously and remain uncomfortable openly disclosing its use.</strong></p>\n        <p>This is the pattern the report's title captures: AI is <em>quietly</em> reshaping executive decisions. Senior people are using these tools, deriving value from them, and not saying so. The organisational consequences are real: no shared standards emerge, mistakes are not surfaced or learned from, and junior staff receive no guidance while observing that the practice is apparently acceptable but unmentionable.</p>\n        <p>Bringing this into the open is one of the cheapest and highest-value governance acts available to a leadership team, and it is covered later in this module.</p>"
      },
      {
        "h": "Which decisions are ready for AI support",
        "html": "\n        <p>Capgemini's recommendations include building <em>\"a framework to evaluate readiness of decisions for AI support.\"</em> A practical version assesses four factors:</p>\n        <ol class=\"body\">\n          <li><strong>Data availability.</strong> Is there relevant, reliable information a system could actually draw on? A market-entry decision in a country with no reliable data is not made better by AI.</li>\n          <li><strong>Structure.</strong> Can the decision be broken into components — market size, cost, competitive response, capability fit? Highly structured decisions benefit most.</li>\n          <li><strong>Reversibility and stakes.</strong> Higher stakes do not disqualify AI support; they raise the standard of verification required.</li>\n          <li><strong>Verifiability.</strong> Can you check the reasoning and the facts? If a recommendation cannot be interrogated, it cannot responsibly inform a major commitment.</li>\n        </ol>\n        <p>Decisions scoring well on structure and verifiability — pricing analysis, scenario modelling, competitor synthesis, investment option comparison — are strong candidates. Decisions dominated by relationships, politics, values or tacit knowledge are not, and no amount of prompting changes that.</p>"
      },
      {
        "h": "Using AI to challenge rather than confirm",
        "html": "\n        <p>The most valuable executive application is not generating answers. It is <strong>stress-testing the answer you already have</strong>. Capgemini's finding that the greatest gains accrue to leaders using AI to strengthen strategic thinking — rather than simply to save time — points directly at this.</p>\n        <p>Five prompts worth keeping:</p>\n        <ul class=\"body\">\n          <li><em>\"Here is our proposed strategy. Argue the strongest case against it.\"</em></li>\n          <li><em>\"What assumptions is this plan making that we have not stated explicitly?\"</em></li>\n          <li><em>\"What would have to be true for this to fail badly? Rank by likelihood.\"</em></li>\n          <li><em>\"How would our three main competitors most likely respond, and what would we do then?\"</em></li>\n          <li><em>\"What question should we be asking that we have not asked?\"</em></li>\n        </ul>\n        <p>Used this way, AI functions as a tireless, unintimidated devil's advocate — which is precisely the role that seniority tends to eliminate from a leadership team. Nobody's promotion depends on the model agreeing with the chief executive.</p>"
      },
      {
        "h": "The cognitive risks",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Automation bias.</strong> Deferring to the machine because it sounds authoritative. Strongest under time pressure and when the output is well formatted.</li>\n          <li><strong>Confirmation at speed.</strong> AI will happily build a compelling case for whatever you propose. Ask it to argue the opposite before you ask it to support you.</li>\n          <li><strong>False precision.</strong> A number generated with three decimal places carries no more truth than the assumption behind it.</li>\n          <li><strong>Persuasion effects.</strong> Capgemini's research explicitly raises concerns around AI-generated argumentation and the risk of what it terms <em>\"persuasion bombing\"</em> — being overwhelmed by fluent, confident advocacy that displaces critical evaluation. Fluency is not evidence.</li>\n          <li><strong>Homogenised thinking.</strong> If every executive in your market uses similar tools on similar data, strategies converge and genuine differentiation erodes.</li>\n          <li><strong>Erosion of the discipline of thinking.</strong> The strategic reasoning muscle is built by struggling with a problem. Outsourcing the struggle atrophies it.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The executive discipline</h4><p style=\"margin:0\">Form your own view <strong>before</strong> consulting the model, then compare. If you consult first, you will anchor on its framing and never know what you would have thought. This costs ten minutes and preserves the independent judgement your organisation is actually paying you for.</p></div>"
      },
      {
        "h": "Disclosure norms your leadership team should agree",
        "html": "\n        <p>Given that many executives currently use AI without disclosing it, agreeing explicit norms removes ambiguity and the low-grade discomfort that comes with it. A workable standard:</p>\n        <ul class=\"body\">\n          <li><strong>No disclosure needed</strong> for personal productivity — summarising your own reading, drafting your own notes, organising your own thinking.</li>\n          <li><strong>Disclose the method</strong> when AI materially shaped an analysis presented to others — \"the scenario ranges were generated with AI support and checked against our finance model.\"</li>\n          <li><strong>Always disclose</strong> when AI-generated content goes to a customer, a regulator, a board, or is published externally.</li>\n          <li><strong>Never present AI output as verified fact</strong> without having verified it. The person who signs the paper owns the paper.</li>\n        </ul>\n        <p>Announcing these norms does something beyond compliance: it signals that using these tools is legitimate, which converts a quiet, unmanaged practice into a shared, improvable one.</p>"
      },
      {
        "h": "Personal fluency — the gap in the room",
        "html": "\n        <p>Capgemini found that only <strong>38% of CXOs feel confident in prompt engineering</strong>. Given that more than half are already using these tools for strategic work, that gap is significant and easily closed.</p>\n        <p>Five techniques that account for most of the difference in output quality:</p>\n        <ol class=\"body\">\n          <li><strong>Give role and context.</strong> \"You are advising the management team of a mid-sized manufacturer in Nepal considering entry into a new district.\"</li>\n          <li><strong>Supply your own material.</strong> Paste the actual figures, the actual policy, the actual draft. Grounded output is far more reliable than general knowledge.</li>\n          <li><strong>Specify the output.</strong> \"Give me three options, each with two risks and one leading indicator to monitor.\"</li>\n          <li><strong>Require gaps to be flagged.</strong> \"Where you do not have enough information, say so explicitly rather than assuming.\"</li>\n          <li><strong>Iterate.</strong> The first answer is a draft. \"Make the second option more concrete.\" \"You have ignored our capacity constraint.\"</li>\n        </ol>\n        <p>Capgemini's recommendations include boosting executive confidence through <strong>targeted upskilling and mentoring</strong>. Thirty minutes of structured practice moves most executives from tentative to competent — a return on time that is difficult to match elsewhere.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the pre-read challenge",
      "text": "Before your next major decision paper goes to the management committee, have the paper's author run one prompt: <em>\"Argue the strongest case against this recommendation, and list the three assumptions most likely to be wrong.\"</em> Attach the output as an appendix. It takes fifteen minutes, it consistently surfaces objections that would otherwise emerge only after the decision, and it normalises AI use as a rigour tool rather than a shortcut."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take a real decision your organisation faces in the next quarter. First, write your own view in five bullet points — before touching any AI tool. Then use the five challenge prompts from this module. Compare: what did it surface that you had not considered, and where did it merely restate your own framing back to you? Finally, draft the four disclosure norms you would propose to your leadership team."
    },
    "takeaways": [
      "More than half of CXOs already use AI in strategic decision-making; use is expected to more than double in three years",
      "AI is not expected to make autonomous strategic decisions any time soon",
      "The greatest gains go to leaders using AI to challenge their thinking, not merely to save time",
      "Many executives use AI without disclosing it, which prevents shared standards and learning from emerging",
      "Assess decision readiness on data availability, structure, stakes and verifiability",
      "Form your own view before consulting the model, or you will anchor on its framing",
      "Only 38% of CXOs feel confident in prompting — a large, cheaply closed capability gap"
    ],
    "quiz": [
      {
        "q": "Capgemini's survey of 500 CXOs found that within three years, executives expect to use AI primarily to:",
        "opts": [
          "Handle only administrative tasks",
          "Make autonomous strategic decisions",
          "Augment and challenge their strategic thinking",
          "Replace the management committee"
        ],
        "a": 2,
        "fb": "AI is not expected to make autonomous decisions any time soon. The shift is from productivity support toward challenging strategic thinking."
      },
      {
        "q": "The finding that many CXOs remain uncomfortable disclosing their AI use matters because:",
        "opts": [
          "It increases licensing costs",
          "It slows down the technology",
          "It is a legal breach",
          "No shared standards emerge, mistakes are not surfaced, and junior staff receive no guidance"
        ],
        "a": 3,
        "fb": "Quiet use converts a potentially improvable practice into an unmanaged one. Agreeing disclosure norms is a cheap, high-value governance act."
      },
      {
        "q": "The recommended discipline before consulting AI on a decision is to:",
        "opts": [
          "Form and write down your own view first, then compare",
          "Ask three different AI tools",
          "Gather as much data as possible first",
          "Delegate the question entirely"
        ],
        "a": 0,
        "fb": "Consulting first anchors you on the model's framing, and you never learn what you would independently have concluded."
      },
      {
        "q": "Which decision type is LEAST suited to AI support?",
        "opts": [
          "Scenario modelling for a pricing change",
          "A decision dominated by relationships, organisational politics and tacit knowledge",
          "Synthesising competitor activity",
          "Comparing investment options against defined criteria"
        ],
        "a": 1,
        "fb": "Decisions score well when structured and verifiable. Those dominated by tacit and relational factors are not improved by prompting."
      },
      {
        "q": "'Persuasion bombing', a concern raised in the Capgemini research, refers to:",
        "opts": [
          "A cyberattack technique",
          "Excessive advertising spend",
          "Being overwhelmed by fluent, confident AI-generated advocacy that displaces critical evaluation",
          "Sending too many emails"
        ],
        "a": 2,
        "fb": "Fluency is not evidence. AI will build a compelling case for whatever position it is asked to support."
      },
      {
        "q": "Capgemini found the proportion of CXOs confident in prompt engineering to be approximately:",
        "opts": [
          "5%",
          "70%",
          "95%",
          "38%"
        ],
        "a": 3,
        "fb": "Given that more than half already use AI for strategic work, this is a significant gap — and thirty minutes of structured practice closes most of it."
      }
    ]
  },
  {
    "id": "g6",
    "tag": "Module 6",
    "time": "55 min",
    "title": "The Business Case: Investment, ROI and Budgeting",
    "summary": "Funding AI properly and proving it worked",
    "objectives": [
      "Build a business case that survives finance scrutiny",
      "Understand the full cost of an AI initiative, not merely the licence fee",
      "Understand why AI project finance differs from conventional IT finance",
      "Avoid the efficiency trap and the double-counting of benefits",
      "Establish baselines and measure value credibly",
      "Design a funding model that supports capability, not only projects"
    ],
    "sections": [
      {
        "h": "Why AI business cases fail finance review",
        "html": "\n        <p>The World Economic Forum identifies <strong>lack of understanding about AI project finance</strong> as one of the principal reasons AI initiatives fail to deliver business value. Three specific dynamics cause the friction:</p>\n        <ul class=\"body\">\n          <li><strong>AI projects need ring-fenced funding</strong> to support capacity-building, plus aligned incentives across the wider organisation — and this is frequently absent.</li>\n          <li><strong>AI typically piggybacks on other investments</strong> in data platforms, cloud and process engineering. Diverting funding from those to pay for a new AI initiative \"may well prove counterproductive.\"</li>\n          <li><strong>Uncertainty is genuinely higher.</strong> The scale of outcomes can be hard to guarantee, which conflicts with the precision a finance function reasonably expects.</li>\n        </ul>\n        <p>The WEF's practical conclusion is worth acting on directly: <em>helping the finance department understand this dynamic can be key to a project's corporate survival.</em> Bring finance in early, explain the R&D-like character of the work, and agree a staged funding model rather than presenting a single fixed-return case that will not hold.</p>"
      },
      {
        "h": "The six elements of a credible business case",
        "html": "\n        <ol class=\"body\">\n          <li><strong>The problem, in operational language.</strong> \"Invoice processing takes an average of eleven days and consumes 240 staff hours per month, with a 6% error rate requiring rework.\"</li>\n          <li><strong>The measured baseline.</strong> Current performance, quantified <em>before</em> anything changes. The most commonly skipped element, and its absence makes success unprovable.</li>\n          <li><strong>The intervention.</strong> Precisely what the system does, where the human remains in the loop, and what changes in the workflow.</li>\n          <li><strong>The benefit, ranged and conservative.</strong> Expressed in the organisation's own terms — time, cost, error rate, revenue, service level — with the assumptions stated.</li>\n          <li><strong>The full lifetime cost</strong> (below).</li>\n          <li><strong>Risks and controls</strong>, with named owner and stopping criteria.</li>\n        </ol>"
      },
      {
        "h": "The full cost — what proposals omit",
        "html": "\n        <p>Licence fees are usually a minority of total cost. A complete costing includes:</p>\n        <ul class=\"body\">\n          <li><strong>Data preparation.</strong> Frequently the largest line, given that roughly 80% of effort in creating an AI system goes on data cleansing and manipulation.</li>\n          <li><strong>Integration</strong> with existing systems and workflows.</li>\n          <li><strong>Internal staff time</strong> — subject-matter experts, IT, project management. Real cost even when it does not appear in a budget line.</li>\n          <li><strong>Training and change management</strong>, including protected time for staff to learn.</li>\n          <li><strong>Ongoing running costs.</strong> Generative AI in particular is charged per use, so cost scales with adoption — a pilot with fifty users is a poor guide to production with five hundred.</li>\n          <li><strong>Monitoring and maintenance</strong>, indefinitely.</li>\n          <li><strong>Contingency.</strong> Given documented overruns of two to three times in cost and time, a contingency below 30% on a first initiative is optimistic.</li>\n        </ul>\n        <div class=\"callout note\"><h4>Deeper dive: the integration reality</h4><p style=\"margin:0\">Research from the Oxford Future of Finance and Technology Initiative records a practitioner observing that <strong>\"60–70% of spend on the use case has got nothing to do with AI. It's the basic foundational middleware integration.\"</strong> When a proposal's costs are dominated by licence fees, it is incomplete — and the missing money will be found later, from an unbudgeted source, under pressure.</p></div>"
      },
      {
        "h": "The efficiency trap",
        "html": "\n        <div class=\"callout warn\"><h4>The failure mode that catches nearly everyone</h4><p style=\"margin:0\">Oxford's research documents a business case built on <em>\"incremental gains on automations, something like 5–15% of every human doing an ops job,\"</em> which tallied to substantial annual savings — followed by: <em>\"in the real world, we couldn't remove those humans from the system. So most people who put in an AI business case failed to deliver it.\"</em></p></div>\n        <p>The lesson is precise. <strong>Time saved is not money saved unless the organisation acts on it.</strong> Ten minutes returned to forty people is only a benefit if roles are redesigned to absorb higher-value work, headcount genuinely changes, or the freed capacity absorbs growth that would otherwise have required hiring.</p>\n        <p>A business case claiming efficiency benefit must therefore state explicitly what the freed capacity will do. \"Staff will be freed for more strategic work\" is not a plan; \"this absorbs the 15% volume growth forecast for next year without additional hiring\" is.</p>"
      },
      {
        "h": "Double counting and the portfolio view",
        "html": "\n        <p>When several initiatives each claim to save time in the same function, the same saving is counted repeatedly and the aggregate becomes fiction. This is discovered at the worst possible moment — when the promised savings do not appear in the accounts.</p>\n        <p>Oxford's recommended remedy is to <strong>evaluate AI initiatives programmatically as well as case by case</strong>. Programme-level evaluation does two things: it prevents double counting, and it allows enabling investments that generate no standalone return to be funded on the strength of the overall programme. Without it, the data platform, the training programme and the governance framework all fail their individual business cases — and the organisation wonders why nothing scales.</p>"
      },
      {
        "h": "Measuring value credibly",
        "html": "\n        <p>Work through four levels, each closer to the accounts:</p>\n        <ol class=\"body\">\n          <li><strong>Activity</strong> — tools deployed, users trained, queries handled. Useful for management, worthless as value evidence. Most reporting stops here.</li>\n          <li><strong>Operational outcome</strong> — cycle time, cost per transaction, error rate, throughput. Directly attributable if a baseline exists.</li>\n          <li><strong>Business outcome</strong> — conversion, retention, service level, capacity absorbed.</li>\n          <li><strong>Financial outcome</strong> — revenue, cost, margin. The only level a board ultimately accepts.</li>\n        </ol>\n        <p>Define one metric at each level <em>before</em> deployment, plus the mechanism linking them. An initiative that cannot articulate that chain has not been thought through, however attractive the technology.</p>"
      },
      {
        "h": "A funding model that works",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Ring-fence a capability budget</strong> separate from use-case budgets — data, platform, skills, governance. The WEF is explicit that ring-fenced funding matters, and this is the line that dies first without protection.</li>\n          <li><strong>Fund in stages with decision points.</strong> Discovery, pilot, scale — each with its own release of funds and explicit stop criteria. This matches the experimental nature of the work and gives finance appropriate control.</li>\n          <li><strong>Align incentives.</strong> If a function's budget is cut the moment AI saves it money, no function will volunteer for AI. Let functions retain some benefit for a period.</li>\n          <li><strong>Accept a portfolio failure rate.</strong> If every initiative succeeds, you are not attempting anything difficult. Say this to the board in advance, not after the first failure.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: bring finance in at the start",
      "text": "Invite your finance lead into the first AI planning conversation, not the approval meeting. Explain the R&D-like character of the work, the 80% data effort, the documented two-to-three-times overrun risk, and propose stage-gated funding with explicit stop criteria. Finance leaders are rarely obstructive when they understand the shape of the uncertainty — they become obstructive when presented with a confident single-point return they know cannot be justified."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Build a full business case for the top use case you identified in Module 4. Include all six elements, and cost every line in the full-cost list — not just licences. Then apply two tests: <strong>(1)</strong> does the case state explicitly what freed capacity will be used for, and <strong>(2)</strong> is any of this benefit already claimed by another initiative? If either fails, revise before presenting."
    },
    "takeaways": [
      "Lack of understanding of AI project finance is a principal reason initiatives fail to deliver value",
      "Bring finance in early and agree stage-gated funding rather than a single fixed-return case",
      "Licence fees are a minority of cost; integration can be 60–70% of use-case spend",
      "Budget a contingency of at least 30% given documented two-to-three-times overruns",
      "Time saved is not money saved unless roles are redesigned or capacity is explicitly absorbed",
      "Evaluate programmatically to prevent double counting and to fund enabling investments",
      "Define one metric at each of four levels before deployment — activity, operational, business, financial",
      "Ring-fence a capability budget and align incentives so functions are not punished for saving money"
    ],
    "quiz": [
      {
        "q": "A business case projects savings from returning ten minutes per day to forty staff. For this to become real organisational benefit:",
        "opts": [
          "Roles must be redesigned, headcount must change, or the freed capacity must absorb defined growth",
          "The software must be cheaper",
          "Nothing further is required — the saving is automatic",
          "The project must be centralised"
        ],
        "a": 0,
        "fb": "Oxford documents exactly this failure: 'we couldn't remove those humans from the system, so most people who put in an AI business case failed to deliver it.'"
      },
      {
        "q": "Research cited in this module suggests that in a typical AI use case, integration and foundational work account for approximately:",
        "opts": [
          "None — modern platforms remove integration cost",
          "60–70% of spend",
          "5–10% of spend",
          "Less than 1%"
        ],
        "a": 1,
        "fb": "When a proposal's costs are dominated by licence fees, it is incomplete, and the missing money will be found later under pressure."
      },
      {
        "q": "The WEF identifies which finance-related factor as a principal cause of AI initiative failure?",
        "opts": [
          "Currency fluctuations",
          "Excessive budgets",
          "Lack of understanding about AI project finance, including absent ring-fenced funding and misaligned incentives",
          "Too much finance involvement"
        ],
        "a": 2,
        "fb": "Helping finance understand the R&D-like dynamic of AI work can be key to a project's corporate survival."
      },
      {
        "q": "Evaluating AI initiatives programmatically rather than only case by case principally prevents:",
        "opts": [
          "Vendor lock-in",
          "Staff turnover",
          "Data breaches",
          "Double counting of the same benefit, and the underfunding of enabling investments"
        ],
        "a": 3,
        "fb": "Foundational work fails every individual business case yet makes everything else possible — programme-level evaluation is how it gets funded."
      },
      {
        "q": "If a function's budget is cut immediately whenever AI saves it money, the predictable result is:",
        "opts": [
          "No function will volunteer for AI initiatives",
          "Lower software costs",
          "Improved governance",
          "Faster adoption across the organisation"
        ],
        "a": 0,
        "fb": "Incentive alignment matters. Letting functions retain some benefit for a period is what makes them willing participants."
      },
      {
        "q": "Given documented overrun patterns, a reasonable contingency on a first AI initiative is:",
        "opts": [
          "Exactly 5%",
          "At least 30%",
          "Zero — modern tools are predictable",
          "Contingency is not appropriate for technology projects"
        ],
        "a": 1,
        "fb": "AI projects have been documented overrunning by factors of two to three in cost and time, driven largely by data challenges."
      }
    ]
  },
  {
    "id": "g7",
    "tag": "Module 7",
    "time": "55 min",
    "title": "Data, Technology and Organisational Readiness",
    "summary": "What must be true before AI can work",
    "objectives": [
      "Assess your organisation's readiness across the dimensions that actually determine success",
      "Understand why data is the binding constraint and what to do about it",
      "Judge build, buy and partner options without technical expertise",
      "Conduct vendor due diligence as a non-technical executive",
      "Understand what technology foundations are genuinely required",
      "Sequence foundational work so it does not block all progress"
    ],
    "sections": [
      {
        "h": "Readiness is not a technology question",
        "html": "\n        <p>The World Economic Forum lists <strong>unavailable or poor-quality data</strong> and <strong>technology foundations not in place</strong> among the principal reasons AI initiatives fail — alongside capability gaps, poor governance, and weak project finance and management. Note that only two of the six are technical.</p>\n        <p>A practical readiness assessment covers four dimensions. Rate each honestly, with evidence:</p>\n        <ol class=\"body\">\n          <li><strong>Data.</strong> Do we have relevant data, can we access it, is it reliable, and can we link records about the same customer or product across systems?</li>\n          <li><strong>Technology.</strong> Can data be extracted from core systems? Do we have somewhere to run things? Can systems talk to each other?</li>\n          <li><strong>People and skills.</strong> Do we have anyone who can evaluate a proposal, run a pilot, and challenge a vendor? Does the affected team have capacity?</li>\n          <li><strong>Governance and process.</strong> Do we have decision rights, a policy on acceptable use, and a way to stop something that is going wrong?</li>\n        </ol>\n        <p>Most organisations score adequately on technology and poorly on data and governance. That diagnosis should determine the roadmap — and it usually does not, because data and governance work is invisible and unexciting.</p>"
      },
      {
        "h": "Data: the binding constraint",
        "html": "\n        <p>The WEF is direct that <strong>data is the key fuel for AI</strong>, and identifies the specific problems that recur:</p>\n        <ul class=\"body\">\n          <li><strong>Accessibility.</strong> Data stored in multiple, disparate legacy silos with little linkage between datasets, limiting any consolidated picture.</li>\n          <li><strong>Quality and representativeness.</strong> Understanding data lineage, quality and statistical representativeness is necessary — and rarely documented.</li>\n          <li><strong>Labelling effort.</strong> Extensive resources, often including manual labour, are needed to label datasets so they can train models.</li>\n          <li><strong>Regulation.</strong> Increasing regulation of personal data use requires a clear understanding of what you hold and on what basis.</li>\n        </ul>\n        <p>For most organisations the practical priority is unglamorous and specific: <strong>a consistent way to identify the same customer, product or transaction across systems.</strong> Without it, every analysis is quietly wrong. With it, a surprising amount becomes possible. It is also useful independently of AI, which makes it the easiest foundational investment to justify.</p>"
      },
      {
        "h": "Do not wait for perfect foundations",
        "html": "\n        <p>The opposite error is equally damaging: concluding that nothing can begin until data is fixed. Two considerations resolve the tension:</p>\n        <ul class=\"body\">\n          <li><strong>Different use cases have different data requirements.</strong> Building a demand-forecasting model requires clean, joined historical data. Using AI to draft correspondence, summarise documents or answer policy questions requires almost none of your structured data at all. The second category can proceed while the first waits.</li>\n          <li><strong>Build alongside, not after.</strong> Extract and standardise the data specific use cases need, rather than attempting an enterprise-wide data programme first. Enterprise data programmes have a poor completion record; targeted extraction delivers value and builds the foundation incrementally.</li>\n        </ul>\n        <p>The sequencing rule: <strong>start with use cases that need documents and language, while building the data foundations that structured use cases will require.</strong></p>"
      },
      {
        "h": "Build, buy or partner",
        "html": "\n        <p>Three options, and for most organisations the answer is clear:</p>\n        <ul class=\"body\">\n          <li><strong>Buy.</strong> Purchase software with AI built in, or a ready application. Fastest, lowest risk, least differentiation. <strong>Correct for the overwhelming majority of first initiatives.</strong></li>\n          <li><strong>Partner.</strong> Work with an external provider to configure or develop something for your context. Moderate cost, moderate control. Appropriate where the need is specific but the capability is not core.</li>\n          <li><strong>Build.</strong> Develop internally. Only justified where the capability is a genuine source of competitive advantage <em>and</em> you can attract and retain the people. Rarely true for organisations of moderate size.</li>\n        </ul>\n        <p>The honest test: <strong>is this capability something customers would choose us for?</strong> If not, buy it. Organisations routinely build things that are available off the shelf, because building feels strategic — and then spend years maintaining something a vendor would have maintained for them.</p>"
      },
      {
        "h": "Vendor due diligence for the non-technical executive",
        "html": "\n        <p>You do not need technical expertise to run a rigorous vendor process. Ask these, and require written answers:</p>\n        <ol class=\"body\">\n          <li><strong>Show me an organisation like ours using this.</strong> Similar size, similar sector, similar country if possible. Then contact them directly.</li>\n          <li><strong>What data do you need from us, where is it processed and stored, and does it leave the country?</strong></li>\n          <li><strong>Will our data be used to train models serving your other clients?</strong> A surprising number of contracts permit this by default.</li>\n          <li><strong>What happens when the system is wrong? Who notices, and how?</strong></li>\n          <li><strong>What does year three cost, in full?</strong> Including usage growth, support and any per-user or per-transaction charges.</li>\n          <li><strong>What happens if we leave? Can we retrieve our data in a usable form?</strong></li>\n          <li><strong>What do we need to do for this to work?</strong> A vendor who says \"nothing\" is either mistaken or selling.</li>\n          <li><strong>What training and knowledge transfer is included?</strong></li>\n        </ol>\n        <p>A vendor unwilling to answer the data-use, exit and total-cost questions in writing should be excluded regardless of how impressive the demonstration was.</p>"
      },
      {
        "h": "The technology foundations that actually matter",
        "html": "\n        <p>The WEF notes that ambitious organisations digitise and architect their platforms, processes and tools to enable rapid roll-out — with typical foundations including data storage, access and cleansing capability, algorithmic frameworks, and access to AI-as-a-service solutions. It also warns that not all organisations have these foundations and <em>\"may be trying to run before they can walk.\"</em></p>\n        <p>Translated to a practical minimum for a mid-sized organisation:</p>\n        <ul class=\"body\">\n          <li>A way to get data out of core systems without a manual export every time</li>\n          <li>A consistent identifier linking records across systems</li>\n          <li>Somewhere to store and process data securely, with defined access control</li>\n          <li>An approved, safe generative AI tool that staff can actually use — which removes the incentive for unapproved use</li>\n          <li>Basic security hygiene: access management, logging, backup</li>\n        </ul>\n        <p>Notably, none of this is exotic or expensive. It is ordinary institutional discipline, and its absence — not the absence of advanced technology — is what stops most organisations.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: test the data claim",
      "text": "When someone says \"we have plenty of data,\" convert it into a testable request: <em>\"Please produce a single spreadsheet listing our top 200 customers with their total revenue, product holdings and last transaction date — by Friday.\"</em> How long that takes, and how many people it involves, is your real data-readiness assessment. Organisations are routinely surprised, and the exercise costs nothing but a few hours."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Complete a readiness assessment across the four dimensions — data, technology, people, governance — rating each 1–5 with written evidence. Then run the data test above on a real request relevant to your priority use case. Finally, for that use case, decide build, buy or partner using the competitive-advantage test, and list the eight vendor questions you would require in writing."
    },
    "takeaways": [
      "Only two of the WEF's six failure causes are technical; data and governance are usually the weak dimensions",
      "The practical data priority is a consistent identifier linking records across systems",
      "Document and language use cases need almost none of your structured data — start there while building foundations",
      "Buy for the overwhelming majority of first initiatives; build only where customers would choose you for the capability",
      "Require written answers on data use, processing location, total three-year cost and exit terms",
      "A vendor who says you need to do nothing is either mistaken or selling",
      "The required foundations are ordinary institutional discipline, not exotic technology"
    ],
    "quiz": [
      {
        "q": "For most organisations, the single most valuable data foundation to establish first is:",
        "opts": [
          "A large data warehouse",
          "Cloud infrastructure",
          "A consistent identifier linking the same customer or product across systems",
          "A data science team"
        ],
        "a": 2,
        "fb": "Without consistent identifiers every analysis is quietly wrong. It is also valuable independently of AI, which makes it easy to justify."
      },
      {
        "q": "An organisation with poor structured data should conclude that:",
        "opts": [
          "It should buy more data",
          "No AI work can begin until data is fixed",
          "AI is not suitable for them",
          "Document and language use cases can proceed now while structured-data foundations are built in parallel"
        ],
        "a": 3,
        "fb": "Drafting, summarising and policy question-answering require almost none of your structured data. Sequencing matters more than waiting."
      },
      {
        "q": "The clearest test for whether to build rather than buy an AI capability is:",
        "opts": [
          "Whether customers would choose your organisation because of that capability",
          "Whether a vendor exists",
          "Whether building is cheaper in year one",
          "Whether the IT team wants to build it"
        ],
        "a": 0,
        "fb": "Organisations routinely build available capabilities because building feels strategic, then spend years maintaining what a vendor would have maintained."
      },
      {
        "q": "Which vendor question most often reveals an unacceptable contract term?",
        "opts": [
          "What colour is the interface?",
          "Will our data be used to train models serving your other clients?",
          "How long have you been in business?",
          "How many staff does your company employ?"
        ],
        "a": 1,
        "fb": "A surprising number of contracts permit this by default. It must be answered in writing before signing."
      },
      {
        "q": "A vendor tells you that no effort is required from your organisation for the system to work. This indicates:",
        "opts": [
          "A good value proposition",
          "That you should sign immediately",
          "They are either mistaken or selling — every deployment requires data, integration and change effort",
          "An unusually well-designed product"
        ],
        "a": 2,
        "fb": "Data preparation, integration, training and workflow change are always required. A vendor denying this is not a reliable partner."
      },
      {
        "q": "The WEF warns that organisations without adequate technology foundations may be:",
        "opts": [
          "Overspending on governance",
          "Too focused on data quality",
          "Excessively cautious",
          "Trying to run before they can walk"
        ],
        "a": 3,
        "fb": "Typical foundations include data storage, access and cleansing capability. Ambition without foundations produces expensive disappointment."
      }
    ]
  },
  {
    "id": "g8",
    "tag": "Module 8",
    "time": "55 min",
    "title": "People, Culture and Change Management",
    "summary": "The dimension that decides whether any of it works",
    "objectives": [
      "Understand why culture and adoption determine AI outcomes more than technology",
      "Address employment anxiety honestly and effectively",
      "Decide whether to hire, train or outsource AI capability",
      "Understand the role of executive sponsorship and what it requires in practice",
      "Design an AI change programme with the right sequence and pace",
      "Build AI literacy across the organisation at the right depth for each group"
    ],
    "sections": [
      {
        "h": "Why this module matters most",
        "html": "\n        <p>The WEF's toolkit devotes an entire chapter to people and organisation, and identifies <strong>capability gaps</strong> as the first of its principal failure causes — noting that these emerge at several levels, and that <em>\"a lack of education about the role of AI in an organisation can lead to negative impacts on employee morale and even attempts to sabotage roll-out.\"</em></p>\n        <p>That word — sabotage — is unusually direct for a WEF publication, and it should be taken seriously. Resistance to AI is rarely irrational. It is a reasonable response to a change whose implications for one's job have not been explained. The management task is not to overcome resistance but to remove its cause.</p>"
      },
      {
        "h": "The employment conversation you must have",
        "html": "\n        <p>Your people are already discussing whether AI will replace them. Silence does not prevent that conversation; it only removes management from it.</p>\n        <p>An honest position, which most organisations can defend:</p>\n        <ul class=\"body\">\n          <li><strong>Some tasks will be automated.</strong> Name them. Vagueness generates more fear than specificity.</li>\n          <li><strong>Most roles will change rather than disappear</strong> — but changed roles require new skills, and the organisation will invest in providing them.</li>\n          <li><strong>Some roles will change substantially.</strong> Say so, and say what support exists.</li>\n          <li><strong>Here is what we commit to</strong> — retraining, redeployment, notice, or whatever your organisation can genuinely promise. Promise only what you will honour.</li>\n        </ul>\n        <p>The WEF also flags a subtler risk: over-hasty deployment may <em>\"sideline the very internal domain experts required to ensure high-quality deployment.\"</em> The people who understand the work best are both your greatest implementation asset and the most likely to feel threatened. Involving them early converts a risk into a resource.</p>"
      },
      {
        "h": "Executive sponsorship — what it actually requires",
        "html": "\n        <p>Every framework cites executive sponsorship. Few define it. In practice it means five observable behaviours:</p>\n        <ol class=\"body\">\n          <li><strong>Visible personal use.</strong> A leader who talks about AI but has never used it is not credible. Executives who use these tools themselves lead the change materially better.</li>\n          <li><strong>Protected budget</strong> that is not raided when quarterly pressure arrives.</li>\n          <li><strong>Attendance.</strong> Turning up to the steering group consistently, not delegating it after the launch.</li>\n          <li><strong>Removing obstacles.</strong> When a function refuses to share data or release a subject-matter expert, the sponsor resolves it — this is the main practical function of sponsorship.</li>\n          <li><strong>Public support after a failure.</strong> The single most powerful signal available. If the first setback produces blame, all subsequent honesty disappears.</li>\n        </ol>"
      },
      {
        "h": "Hire, train or outsource",
        "html": "\n        <p>The WEF poses this question directly, and for most mid-sized organisations the practical answer is a combination:</p>\n        <ul class=\"body\">\n          <li><strong>Train your existing people</strong> for the majority of the need. People who understand your business and are taught to use AI tools generally outperform newly hired specialists who must learn your business. This is the highest-return option and the most commonly overlooked.</li>\n          <li><strong>Hire selectively</strong> — perhaps one person who can evaluate, translate and challenge, rather than a team. Recruiting a data science team into an organisation without data foundations produces frustration and departure within two years.</li>\n          <li><strong>Outsource specialist and infrequent work</strong> — building, validating, integrating — while insisting on knowledge transfer and documented handover so capability accrues to you rather than to the vendor.</li>\n        </ul>\n        <p>The WEF also flags retention explicitly: the people you train become externally marketable. Career path, interesting work and recognition matter more than incremental salary, and losing your trained people to a competitor is a predictable cost of doing this well.</p>"
      },
      {
        "h": "AI literacy at the right depth",
        "html": "\n        <p>A single training programme serves nobody. Segment by what each group must do:</p>\n        <ul class=\"body\">\n          <li><strong>Board and executive</strong> — enough to govern: what AI is, what it risks, what to ask, how to read a proposal. Two to three hours, ideally with peers.</li>\n          <li><strong>Managers</strong> — enough to specify, prioritise and challenge: use-case identification, business cases, vendor questions, change leadership. This programme.</li>\n          <li><strong>Staff who will use AI</strong> — practical fluency: how to prompt, how to check, what never to enter, when to escalate. Short, hands-on, on real work.</li>\n          <li><strong>Specialists</strong> — technical depth appropriate to their role.</li>\n        </ul>\n        <p>Two design principles that materially improve outcomes. First, <strong>train on real work</strong>, not abstract exercises — people learn the tool when it solves a problem they actually have. Second, <strong>train the challenge, not just the use</strong>: staff must be able to recognise when output is wrong and be genuinely empowered to override it. Training that produces compliant users rather than critical ones has created a new risk.</p>"
      },
      {
        "h": "Designing the change programme",
        "html": "\n        <p>Sequence matters more than intensity:</p>\n        <ol class=\"body\">\n          <li><strong>Explain the why</strong> before the what. Connect AI to a business challenge people already recognise.</li>\n          <li><strong>Address employment early</strong> — before the first deployment, not after rumours circulate.</li>\n          <li><strong>Start where it is wanted.</strong> Volunteers first. Their success recruits the sceptics far more effectively than mandate.</li>\n          <li><strong>Give people time.</strong> Change introduced without protected time is change that does not happen.</li>\n          <li><strong>Redesign the work, not just the tool.</strong> If the process stays identical and a tool is added, you have added a step rather than removed one.</li>\n          <li><strong>Make results visible.</strong> Show what improved and who benefited. Nothing sustains adoption like a colleague's demonstrated success.</li>\n          <li><strong>Close the loop.</strong> Collect what users find frustrating and fix it. Unacknowledged frustration becomes quiet abandonment.</li>\n        </ol>"
      },
      {
        "h": "Permission to fail",
        "html": "\n        <p>The WEF's guidance is unusually pointed here, and it belongs in this module rather than a risk module:</p>\n        <p><em>\"The AI journey is a learning journey, and learning is all about taking risks. Managers must have room to fail, as long as they can course-correct and learn. Shutting down all risk will likely lead to the firm falling behind in the competitive race.\"</em></p>\n        <p>This requires a specific management behaviour: <strong>defining in advance what an acceptable failure looks like.</strong> A small, time-boxed, well-governed initiative that does not work is a successful experiment. An uncontrolled, unbudgeted failure is not. Making that distinction explicit lets you encourage the first without appearing to license the second — and it is what makes \"permission to fail\" a governance position rather than a slogan.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: use it yourself, visibly",
      "text": "The most effective single act of AI sponsorship costs nothing: use the tools yourself, and say so in a management meeting — including where they were unhelpful. Leaders who advocate AI without using it are transparently unconvincing, and their teams know it. Leaders who describe a real task they attempted, what worked and what did not, establish both credibility and permission to experiment in a single sentence."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Draft the message you would give your team about AI and their jobs — no more than 200 words, specific about which tasks change, honest about what you do not yet know, and clear about what the organisation commits to. Then list the three people in your organisation who best understand the work you want to improve, and plan how you would involve them from the start rather than presenting to them at the end."
    },
    "takeaways": [
      "Capability gaps are the WEF's first-listed failure cause; poor education can damage morale and provoke resistance",
      "Resistance is rarely irrational — it is a response to unexplained implications for people's jobs",
      "Name which tasks change, commit only to what you will honour, and involve domain experts early",
      "Sponsorship means visible personal use, protected budget, attendance, obstacle removal and public support after failure",
      "Train existing people for most of the need; hire selectively; outsource with mandatory knowledge transfer",
      "Segment literacy by group, train on real work, and train challenge rather than compliance",
      "Define in advance what an acceptable failure looks like — this makes permission to fail a governance position"
    ],
    "quiz": [
      {
        "q": "The WEF warns that a lack of education about AI's role in an organisation can lead to:",
        "opts": [
          "Negative impacts on employee morale and even attempts to sabotage roll-out",
          "Higher licensing costs",
          "Slightly slower adoption",
          "Regulatory penalties"
        ],
        "a": 0,
        "fb": "Resistance is a reasonable response to unexplained change. The management task is to remove its cause, not to overcome it."
      },
      {
        "q": "For most mid-sized organisations, the highest-return approach to building AI capability is to:",
        "opts": [
          "Wait for the market to mature",
          "Train existing people who already understand the business",
          "Outsource everything permanently",
          "Hire a full data science team immediately"
        ],
        "a": 1,
        "fb": "People who know your business and learn AI tools generally outperform specialists who must first learn your business."
      },
      {
        "q": "Which behaviour is the most powerful signal of genuine executive sponsorship?",
        "opts": [
          "Approving the budget",
          "Appointing a project manager",
          "Publicly supporting the team after a failure",
          "Announcing the programme at a town hall"
        ],
        "a": 2,
        "fb": "If the first setback produces blame, all subsequent honesty disappears — and you lose the information you most need."
      },
      {
        "q": "Training staff to use AI without training them to challenge its output:",
        "opts": [
          "Is the efficient approach",
          "Is required by most vendors",
          "Reduces change management costs",
          "Creates a new risk by producing compliant rather than critical users"
        ],
        "a": 3,
        "fb": "Staff must be able to recognise when output is wrong and be genuinely empowered to override it."
      },
      {
        "q": "The WEF's position on risk in AI initiatives is that:",
        "opts": [
          "Managers must have room to fail and course-correct; shutting down all risk will likely leave the firm behind",
          "Risk is irrelevant for small projects",
          "All risk should be eliminated before proceeding",
          "Only the board should take risks"
        ],
        "a": 0,
        "fb": "Defining in advance what an acceptable failure looks like turns permission to fail into a governance position rather than a slogan."
      },
      {
        "q": "When introducing AI to a team, the recommended starting point is:",
        "opts": [
          "Start with the most resistant team to prove the point",
          "Start with volunteers, whose success recruits the sceptics",
          "Mandate use across all departments simultaneously",
          "Start with the largest process"
        ],
        "a": 1,
        "fb": "Voluntary early adopters demonstrate value credibly to peers in a way that management mandate cannot."
      }
    ]
  },
  {
    "id": "g9",
    "tag": "Module 9",
    "time": "55 min",
    "title": "Responsible AI and Governance for Leaders",
    "summary": "Building the framework before you need it",
    "objectives": [
      "Understand what responsible AI means in operational rather than aspirational terms",
      "Build a governance structure proportionate to your organisation's size",
      "Write an acceptable use policy your staff will actually follow",
      "Understand how governance must adapt for agentic AI",
      "Establish board and executive oversight that is meaningful rather than ceremonial",
      "Know the questions a leader must be able to answer about any deployed system"
    ],
    "sections": [
      {
        "h": "Why governance is a value question, not a compliance one",
        "html": "\n        <p>The WEF lists <strong>poor governance structure</strong> among the principal reasons AI initiatives fail to deliver business value — not among the reasons they create risk. That framing matters. Weak governance does not merely expose you; it stops things working. Projects stall in unresolved disputes about data access. Deployments are blocked at the last moment by risk functions consulted too late. Nobody can authorise the decision to stop, so failing initiatives consume budget indefinitely.</p>\n        <p>Capgemini's 2026 research reaches the same place from the other direction: <strong>most organisations lack the frameworks, systems and processes</strong> needed to help leaders harness AI responsibly and confidently. Their first recommendation to CXOs is to <em>revamp AI governance and accountability frameworks for the agentic era.</em></p>\n        <p>Governance is what converts scattered enthusiasm into an institutional capability. It is also what allows you to move faster, because pre-agreed rules remove the need to relitigate every decision.</p>"
      },
      {
        "h": "The principles, and what they mean operationally",
        "html": "\n        <p>Responsible AI principles are widely published and largely convergent. What distinguishes serious organisations is translating each into an operational requirement:</p>\n        <ul class=\"body\">\n          <li><strong>Fairness</strong> → we test outputs for disparate impact across groups we can identify, and we record the result.</li>\n          <li><strong>Transparency</strong> → people affected by an automated or AI-assisted decision are told, and can ask why.</li>\n          <li><strong>Accountability</strong> → every deployed system has a named accountable owner. Not a committee — a person.</li>\n          <li><strong>Privacy</strong> → we know what data each system uses, on what legal basis, where it is processed, and who can access it.</li>\n          <li><strong>Safety and robustness</strong> → we know how the system fails, we monitor for it, and we can switch it off.</li>\n          <li><strong>Human oversight</strong> → a person can review and override, and has the time, information and authority to do so.</li>\n        </ul>\n        <p>A principle that has not been converted into a testable requirement is a statement of intention, and will be treated as such by everyone in your organisation.</p>"
      },
      {
        "h": "Proportionate governance structure",
        "html": "\n        <p>Governance should scale with the organisation, not with the ambition of the framework document.</p>\n        <p><strong>For a smaller organisation (under roughly 200 staff), three things suffice:</strong></p>\n        <ol class=\"body\">\n          <li>A <strong>named executive owner</strong> for AI, with authority to convene and to stop.</li>\n          <li>A <strong>one-page acceptable use policy</strong> every employee has read.</li>\n          <li>A <strong>register of AI systems in use</strong>, with owner, purpose, data used and risk rating — reviewed quarterly.</li>\n        </ol>\n        <p><strong>Larger organisations add:</strong></p>\n        <ol class=\"body\">\n          <li>A <strong>cross-functional steering group</strong> approving use cases and allocating budget.</li>\n          <li>A <strong>risk classification framework</strong> determining the approval and monitoring each use case requires.</li>\n          <li>A <strong>pre-deployment review</strong> covering data, testing, failure modes, oversight and rollback.</li>\n          <li><strong>Standing board reporting</strong> on portfolio, value and incidents.</li>\n        </ol>\n        <p>The register is the item most often missing and most immediately useful. Many organisations cannot answer the simple question <em>\"what AI systems are we currently using?\"</em> — including software their vendors have quietly added AI features to. Building the register takes a fortnight and frequently produces the most surprising findings of the entire governance exercise.</p>"
      },
      {
        "h": "Risk-tiering: proportionate control",
        "html": "\n        <p>Applying the same controls to a meeting-summary tool and a customer-facing decision system wastes effort on one and under-protects the other. A three-tier model works for most organisations:</p>\n        <ul class=\"body\">\n          <li><strong>Low risk</strong> — internal productivity, human reviews everything, no personal data, easily reversible. <em>Control: acceptable use policy and basic training.</em></li>\n          <li><strong>Medium risk</strong> — informs decisions about people or money, uses internal or personal data, errors are correctable but costly. <em>Control: documented owner, pre-deployment testing, human approval before effect, periodic performance review.</em></li>\n          <li><strong>High risk</strong> — materially affects customers, employees or the organisation's standing; uses sensitive data; errors are hard to reverse. <em>Control: full pre-deployment review, explicit executive approval, continuous monitoring, defined rollback, incident procedure, board visibility.</em></li>\n        </ul>\n        <p>Classification should be driven by <strong>consequence, not by technology</strong>. A simple system making consequential decisions requires more control than a sophisticated one drafting internal memoranda.</p>"
      },
      {
        "h": "The acceptable use policy",
        "html": "\n        <p>One page, written in plain language. Six clauses cover most of the need:</p>\n        <ol class=\"body\">\n          <li><strong>Approved tools.</strong> These are the tools you may use. Others require approval. <em>Provide a genuinely usable approved option — the main driver of unapproved use is the absence of a sanctioned alternative.</em></li>\n          <li><strong>Never enter.</strong> Customer personal data, employee records, confidential commercial information, credentials, or anything under a confidentiality obligation — unless using a specifically approved system where this has been assessed.</li>\n          <li><strong>Always verify.</strong> Check facts, figures, names, calculations and citations before using AI output in any work product.</li>\n          <li><strong>You remain responsible.</strong> The person who submits the work owns it, regardless of how it was produced.</li>\n          <li><strong>Disclose when it matters.</strong> Say when AI materially shaped analysis presented to others, and always for external or customer-facing content.</li>\n          <li><strong>Report problems.</strong> Tell your manager when output was wrong in a way that mattered — without blame. This is your early warning system, and it only works if reporting is genuinely safe.</li>\n        </ol>\n        <div class=\"callout warn\"><h4>Shadow AI</h4><p style=\"margin:0\">If your staff have no approved tool, they are using unapproved ones on their personal accounts with your data, and you have no visibility of it. Prohibition without provision does not reduce risk; it relocates it somewhere you cannot see. <strong>Providing a safe, approved tool is a risk control, not a convenience.</strong></p></div>"
      },
      {
        "h": "Governance for the agentic era",
        "html": "\n        <p>Capgemini's first recommendation is specifically about the shift to agentic AI — systems that pursue goals across multiple steps, use tools, and act rather than merely answer. Existing governance frameworks generally assume a human reviews each output. That assumption breaks.</p>\n        <p>Four additions are required:</p>\n        <ul class=\"body\">\n          <li><strong>Scope limits.</strong> Define explicitly what an agent may and may not do, which systems it can access, and what value or category of action requires human authorisation.</li>\n          <li><strong>Logging.</strong> Every action taken must be recorded and reviewable after the fact. Where a human no longer reviews each step in advance, the audit trail becomes the primary control.</li>\n          <li><strong>Circuit breakers.</strong> A defined condition — volume, value, error rate, anomaly — that halts the agent automatically and escalates to a person.</li>\n          <li><strong>Accountability that survives autonomy.</strong> A named owner accountable for the agent's actions, with the authority and the technical means to stop it immediately.</li>\n        </ul>\n        <p>The governing principle is straightforward: <strong>an agent should never be able to take an action that the person accountable for it could not reverse.</strong> If it can, either the scope is too wide or the oversight is too thin.</p>"
      },
      {
        "h": "Board and executive oversight that is meaningful",
        "html": "\n        <p>A quarterly AI report to the board or executive committee should contain five items and fit on two pages:</p>\n        <ol class=\"body\">\n          <li><strong>Portfolio.</strong> What is in progress, at what stage, consuming what budget.</li>\n          <li><strong>Value.</strong> What has been measured against baseline — not activity metrics.</li>\n          <li><strong>Risk.</strong> The register by tier, changes since last quarter, and any high-risk system approved.</li>\n          <li><strong>Incidents.</strong> What went wrong, what it cost, what changed as a result. <em>A report with no incidents over several quarters usually means incidents are not being reported.</em></li>\n          <li><strong>Decisions required.</strong> What the board must approve or resolve.</li>\n        </ol>\n        <p>Seven questions any board member should be able to ask, and any executive should be able to answer:</p>\n        <ul class=\"body\">\n          <li>What AI systems are we using, and who owns each?</li>\n          <li>Which of them affect customers or employees directly?</li>\n          <li>What data do they use, and where is it processed?</li>\n          <li>How would we know if one started performing badly?</li>\n          <li>Who can switch it off, and how quickly?</li>\n          <li>What has this cost us in total, and what value have we measured?</li>\n          <li>What is our largest single AI-related exposure?</li>\n        </ul>\n        <p>An executive team that cannot answer these does not have a governance problem to solve later. It has one now.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: build the register first",
      "text": "Before writing a policy or convening a committee, spend two weeks building the register of AI systems already in use — including AI features vendors have added to software you already own, and tools individuals have adopted informally. Ask every function head directly. Organisations are routinely surprised by what is already running, on what data, with no owner. You cannot govern what you have not inventoried, and the register makes the rest of the framework concrete rather than theoretical."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Draft your organisation's one-page acceptable use policy using the six clauses. Then start the register: list every AI system or AI-enabled feature you know is in use, with owner, purpose, data used and a low/medium/high risk rating. Identify which entries have no owner — that is your first governance action. Finally, answer the seven board questions honestly for your own organisation and note which you cannot yet answer."
    },
    "takeaways": [
      "The WEF lists poor governance as a cause of value failure, not merely of risk",
      "Convert each principle into a testable operational requirement or it will be treated as intention",
      "Smaller organisations need only three things: a named owner, a one-page policy, and a register",
      "Risk-tier by consequence, not by technology sophistication",
      "Prohibition without provision relocates risk rather than reducing it — an approved tool is a control",
      "Agentic AI requires scope limits, logging, circuit breakers and accountability that survives autonomy",
      "An agent should never take an action its accountable owner could not reverse",
      "A quarterly report with no incidents usually means incidents are not being reported"
    ],
    "quiz": [
      {
        "q": "The WEF cites poor governance structure primarily as a cause of:",
        "opts": [
          "Regulatory penalties only",
          "Higher software costs",
          "AI initiatives failing to deliver business value",
          "Slower model training"
        ],
        "a": 2,
        "fb": "Weak governance stalls projects in unresolved disputes, blocks late-stage deployments, and prevents anyone authorising a stop."
      },
      {
        "q": "An organisation prohibits AI tools but provides no approved alternative. The most likely outcome is:",
        "opts": [
          "Risk is eliminated",
          "Productivity improves",
          "Compliance is achieved",
          "Staff use unapproved tools on personal accounts with company data, invisible to management"
        ],
        "a": 3,
        "fb": "Prohibition without provision relocates risk somewhere you cannot see. Providing a safe approved tool is a risk control."
      },
      {
        "q": "AI use cases should be risk-tiered principally according to:",
        "opts": [
          "The consequence of the system being wrong",
          "The sophistication of the underlying technology",
          "The size of the vendor",
          "The cost of the licence"
        ],
        "a": 0,
        "fb": "A simple system making consequential decisions needs more control than a sophisticated one drafting internal memos."
      },
      {
        "q": "Which control becomes the PRIMARY safeguard for agentic AI, where a human no longer reviews each step in advance?",
        "opts": [
          "Model accuracy testing",
          "Comprehensive logging and a reviewable audit trail",
          "User training",
          "Vendor reputation"
        ],
        "a": 1,
        "fb": "When pre-approval of each action is no longer possible, after-the-fact reviewability plus circuit breakers carry the control burden."
      },
      {
        "q": "A quarterly AI report to the board shows zero incidents across four consecutive quarters. The most likely explanation is:",
        "opts": [
          "AI is not risky",
          "The systems are too small to fail",
          "Incidents are not being reported",
          "Excellent risk management"
        ],
        "a": 2,
        "fb": "Reporting must be genuinely blame-free to function as an early warning system. Silence is usually a reporting failure, not an absence of problems."
      },
      {
        "q": "The governing principle for agentic AI scope is that an agent should never:",
        "opts": [
          "Use more than one data source",
          "Interact with customers",
          "Operate outside business hours",
          "Take an action the person accountable for it could not reverse"
        ],
        "a": 3,
        "fb": "If it can take irreversible action, either the scope is too wide or the oversight is too thin."
      }
    ]
  },
  {
    "id": "g10",
    "tag": "Module 10",
    "time": "55 min",
    "title": "Managing AI Risk: What Actually Goes Wrong",
    "summary": "The failure modes, in order of likelihood",
    "objectives": [
      "Understand the six principal reasons AI initiatives fail, and diagnose which apply to you",
      "Recognise the operational, legal and reputational risks of deployed systems",
      "Manage third-party and vendor concentration risk",
      "Design an incident response process before you need one",
      "Understand the risks specific to generative and agentic systems",
      "Balance risk management against the cost of inaction"
    ],
    "sections": [
      {
        "h": "The six reasons AI initiatives fail",
        "html": "\n        <p>The World Economic Forum's toolkit sets these out directly. Read them as a diagnostic checklist against your own organisation:</p>\n        <ol class=\"body\">\n          <li><strong>Capability gaps.</strong> Insufficient skills at multiple levels, and inadequate education about AI's role — which damages morale and can provoke resistance to roll-out.</li>\n          <li><strong>Unavailable or poor-quality data.</strong> Fragmented legacy silos, undocumented lineage and quality, and the labelling burden. Around 80% of the effort in building an AI system goes here.</li>\n          <li><strong>Technology foundations not in place.</strong> Organisations attempting sophisticated deployment without the platforms, storage, access and integration to support it — \"trying to run before they can walk.\"</li>\n          <li><strong>Poor governance structure.</strong> Unclear decision rights, late involvement of risk functions, no mechanism to stop.</li>\n          <li><strong>Lack of understanding about AI project finance.</strong> Absent ring-fenced funding, misaligned incentives, and cannibalisation of the very data and cloud investments AI depends on.</li>\n          <li><strong>Lack of understanding about AI project management.</strong> Managing R&D-like work as deterministic IT projects, producing overruns of two to three times in cost and time.</li>\n        </ol>\n        <p>Note what is absent from this list: <em>the technology not working</em>. In practice, models rarely fail. Organisations fail to prepare for them, fund them, govern them, manage them or adopt them.</p>"
      },
      {
        "h": "Operational risks of live systems",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Silent degradation.</strong> Performance declines gradually as conditions change. Nobody notices because nobody is measuring. This is the most common live-system risk and the easiest to control — define a performance metric and a threshold at deployment.</li>\n          <li><strong>Automation bias in operation.</strong> Human reviewers who approve everything because the system is usually right. Human oversight becomes a formality. Test this deliberately: track how often reviewers override, and investigate if the rate approaches zero.</li>\n          <li><strong>Scale of error.</strong> A human error affects one case; a systematic model error affects every case until detected. Speed of detection matters more than probability of error.</li>\n          <li><strong>Dependency.</strong> Once a process is built around an AI system, the manual capability atrophies. What happens when the vendor has an outage, changes the model, or raises prices sharply?</li>\n          <li><strong>Data leakage.</strong> Staff entering confidential information into external tools. Usually inadvertent, occasionally catastrophic, and best addressed through provision and training rather than prohibition.</li>\n        </ul>"
      },
      {
        "h": "Legal, regulatory and reputational risk",
        "html": "\n        <p>Capgemini's research identifies the leading CXO concerns as <strong>legal risks, explainability, data transparency and governance</strong>. In practice:</p>\n        <ul class=\"body\">\n          <li><strong>Data protection.</strong> Requirements on personal data use are tightening across jurisdictions. Know what data each system uses, on what basis, and where it is processed — including whether it leaves the country.</li>\n          <li><strong>Explainability.</strong> If a decision affecting a person cannot be explained, it is difficult to defend to that person, to a regulator or to a court. This constrains which use cases are appropriate for opaque systems.</li>\n          <li><strong>Contractual exposure.</strong> Vendor terms frequently disclaim liability for output. Read who bears the loss when the system is wrong; it is usually you.</li>\n          <li><strong>Intellectual property.</strong> Both the status of AI-generated content and the risk of generated content resembling protected material.</li>\n          <li><strong>Reputation.</strong> Often the largest practical exposure. A discriminatory outcome, a fabricated statement sent to a customer, or a data leak becomes a story about your judgement, not about the technology. Reputational damage does not require legal breach.</li>\n        </ul>"
      },
      {
        "h": "Vendor and concentration risk",
        "html": "\n        <p>Most organisations will access AI through third parties, which transfers execution but not accountability. Five questions worth answering before signing and reviewing annually:</p>\n        <ul class=\"body\">\n          <li><strong>Continuity.</strong> How dependent are we, and how quickly could we operate without them? Many AI vendors are young and unprofitable.</li>\n          <li><strong>Change.</strong> Can they alter the underlying model, and would we know? Behaviour can shift materially with no change on your side.</li>\n          <li><strong>Data.</strong> Where is it processed, who can access it, and is it used to train models for others?</li>\n          <li><strong>Pricing.</strong> Usage-based costs scale with adoption. What is the exposure if usage triples?</li>\n          <li><strong>Exit.</strong> Can we retrieve our data in a usable form, and what would migration actually cost?</li>\n        </ul>\n        <p><strong>Concentration is the under-considered risk.</strong> If several critical processes depend on one provider, you have created a single point of failure across your operations — a position you would not accept in any other supplier relationship.</p>"
      },
      {
        "h": "Risks specific to generative and agentic systems",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Fabrication.</strong> Confident, fluent, false output — including invented figures, citations, regulations and names. The defining risk of generative systems.</li>\n          <li><strong>Prompt injection.</strong> Instructions hidden in a document, email or web page that the system reads and follows, causing it to behave contrary to your intent. Materially more dangerous where the system can act rather than only respond.</li>\n          <li><strong>Inconsistency.</strong> The same question can produce different answers. Problematic wherever consistency is a fairness or compliance requirement.</li>\n          <li><strong>Scope creep in agents.</strong> A system given a goal may take an unanticipated route to achieve it. Constrain by explicit permission rather than by prohibition — define what it <em>may</em> do, not what it may not.</li>\n          <li><strong>Compounding errors.</strong> In multi-step agentic work, an early mistake propagates and amplifies through subsequent steps.</li>\n        </ul>"
      },
      {
        "h": "Incident response",
        "html": "\n        <p>Design this before you need it. Six steps:</p>\n        <ol class=\"body\">\n          <li><strong>Detect.</strong> Monitoring thresholds, plus a genuinely safe channel for staff to report bad output.</li>\n          <li><strong>Contain.</strong> A named person who can suspend the system immediately, without a committee.</li>\n          <li><strong>Assess.</strong> What was affected, over what period, how many cases, what harm.</li>\n          <li><strong>Remediate.</strong> Correct affected cases, notify those affected where appropriate.</li>\n          <li><strong>Learn.</strong> Why did detection take as long as it did? That is usually the more important question than why the error occurred.</li>\n          <li><strong>Report.</strong> To the executive and, for material incidents, to the board.</li>\n        </ol>\n        <p>Test the containment step in advance. The number of organisations that discover mid-incident that nobody actually has the technical ability to switch a vendor system off is not small.</p>"
      },
      {
        "h": "The other side: the cost of inaction",
        "html": "\n        <p>A module on risk must state the counterweight, and the WEF states it plainly: <em>managers must have room to fail, as long as they can course-correct and learn. Shutting down all risk will likely lead to the firm falling behind in the competitive race.</em></p>\n        <p>The risks of excessive caution are real and less visible than the risks of action:</p>\n        <ul class=\"body\">\n          <li>Competitors build capability and cost advantage while you deliberate</li>\n          <li>Your people use unapproved tools anyway, without training or oversight</li>\n          <li>You lose the staff who wanted to work somewhere that was learning</li>\n          <li>You skip the small, cheap mistakes that build institutional judgement — and make your first mistake a large one</li>\n        </ul>\n        <p>The correct posture is neither prohibition nor enthusiasm. It is <strong>controlled experimentation</strong>: small, bounded, well-governed initiatives with real stopping criteria, which build capability and judgement while limiting exposure. That is a management discipline, not a technology strategy.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: run the switch-off drill",
      "text": "Pick one AI system currently in use and ask, in a management meeting: <em>\"If this started producing harmful output at nine tomorrow morning, who switches it off, how, and how long would it take?\"</em> If the answer requires a vendor support ticket, a committee, or a person who is on leave, you have found a serious gap that costs nothing to fix and would cost a great deal to discover during a live incident."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Score your organisation against each of the six WEF failure causes on a scale of 1 (fully exposed) to 5 (well controlled), with one line of evidence for each. Identify your two weakest. Then write the incident response process for your highest-risk system — naming the person who can suspend it, the detection threshold, and the escalation path. Verify the containment step is actually possible."
    },
    "takeaways": [
      "None of the WEF's six failure causes is 'the technology did not work' — organisations fail, models rarely do",
      "Silent degradation is the most common live-system risk and the easiest to control with a metric and a threshold",
      "If human reviewers never override the system, oversight has become a formality — track the override rate",
      "Vendor arrangements transfer execution but not accountability; concentration across processes is a single point of failure",
      "Prompt injection is materially more dangerous where a system can act rather than only respond",
      "Test containment in advance — many organisations cannot actually switch a vendor system off",
      "Excessive caution is itself a risk; controlled experimentation with real stopping criteria is the correct posture"
    ],
    "quiz": [
      {
        "q": "Reviewing the WEF's six principal causes of AI initiative failure, which is notably absent?",
        "opts": [
          "The technology itself not working",
          "Weak governance",
          "Capability gaps",
          "Poor data quality"
        ],
        "a": 0,
        "fb": "Models rarely fail. Organisations fail to prepare for, fund, govern, manage or adopt them."
      },
      {
        "q": "A human reviewer approves virtually every AI recommendation without amendment. This indicates:",
        "opts": [
          "Training was effective",
          "Human oversight has become a formality and the override rate should be investigated",
          "No further action is needed",
          "The system is performing excellently"
        ],
        "a": 1,
        "fb": "Automation bias converts oversight into rubber-stamping. Track override rates and investigate if they approach zero."
      },
      {
        "q": "'Prompt injection' describes:",
        "opts": [
          "A method of improving output quality",
          "A pricing model",
          "Hidden instructions in a document or web page that the system reads and follows, contrary to your intent",
          "Typing too quickly"
        ],
        "a": 2,
        "fb": "It is materially more dangerous in agentic systems, where the system can act on the injected instruction rather than merely respond."
      },
      {
        "q": "When several critical processes depend on a single AI vendor, the organisation has created:",
        "opts": [
          "A regulatory requirement",
          "An efficient procurement arrangement",
          "A cost advantage only",
          "A single point of failure across operations"
        ],
        "a": 3,
        "fb": "Concentration is the under-considered vendor risk — a position you would not accept in any other supplier relationship."
      },
      {
        "q": "After an AI incident, the most important learning question is usually:",
        "opts": [
          "Why did detection take as long as it did?",
          "How much did it cost?",
          "Which vendor was responsible?",
          "Who authorised the system?"
        ],
        "a": 0,
        "fb": "Errors will occur. Speed of detection is the variable you control, and it determines the scale of the consequence."
      },
      {
        "q": "The WEF's position on organisations that attempt to eliminate all AI risk is that they will likely:",
        "opts": [
          "Reduce costs significantly",
          "Fall behind in the competitive race",
          "Achieve superior compliance outcomes",
          "Improve staff morale"
        ],
        "a": 1,
        "fb": "The correct posture is controlled experimentation — small, bounded, well-governed initiatives with real stopping criteria."
      }
    ]
  },
  {
    "id": "g11",
    "tag": "Module 11",
    "time": "55 min",
    "title": "Implementation: From Pilot to Production",
    "summary": "Where most initiatives quietly stop",
    "objectives": [
      "Manage an AI initiative through its four lifecycle stages",
      "Design a pilot that produces a decision rather than an impression",
      "Understand why organisations get stuck in pilot purgatory and how to avoid it",
      "Apply stage gates and stopping criteria",
      "Manage the transition from pilot to production",
      "Establish the monitoring that keeps a live system trustworthy"
    ],
    "sections": [
      {
        "h": "The four stages",
        "html": "\n        <p>The WEF's implementation guidance frames the AI lifecycle in four stages, each with distinct management requirements:</p>\n        <ol class=\"body\">\n          <li><strong>Design.</strong> Define the problem, the success measure, the data, the human oversight and the failure modes. Most implementation failures are traceable to this stage being rushed.</li>\n          <li><strong>Development.</strong> Build or configure, prepare data, test against the defined measure. Expect this to take longer than estimated — this is where the 80% data effort lands.</li>\n          <li><strong>Deployment.</strong> Integrate into workflow, train users, run in parallel, transition. The technical work is usually the smaller part of this stage.</li>\n          <li><strong>Monitoring.</strong> Continuous, permanent. Performance, drift, usage, incidents, value delivered.</li>\n        </ol>\n        <p>The management error that recurs is treating stage four as optional and stage one as a formality. Both are backwards.</p>"
      },
      {
        "h": "Designing a pilot that produces a decision",
        "html": "\n        <p>A pilot exists to answer a question, not to demonstrate enthusiasm. Before starting, write down five things:</p>\n        <ol class=\"body\">\n          <li><strong>The question.</strong> \"Can this reduce document processing time by at least 30% without increasing errors?\" — not \"can we use AI here?\"</li>\n          <li><strong>The baseline.</strong> Current performance, measured before anything changes. Without this, no pilot can produce a conclusion.</li>\n          <li><strong>The threshold.</strong> The result that means proceed, and the result that means stop. Agreed in advance, in writing, by the people who will make the decision.</li>\n          <li><strong>The duration.</strong> Long enough for a real signal, short enough to force a decision. Six to twelve weeks suits most cases.</li>\n          <li><strong>The scope.</strong> One team, one process, a defined volume.</li>\n        </ol>\n        <p>A pilot without a pre-agreed stopping threshold cannot fail — which means it also cannot succeed, because no result changes anyone's mind. It becomes an expensive way of postponing a decision.</p>"
      },
      {
        "h": "Pilot purgatory",
        "html": "\n        <p>The most common state for AI in mid-sized organisations is a collection of pilots that neither scale nor stop. The causes are identifiable and each has a remedy:</p>\n        <ul class=\"body\">\n          <li><strong>No baseline</strong>, so results are contested indefinitely. → Measure before starting.</li>\n          <li><strong>No decision owner</strong> for scaling. → Name them at the outset, alongside the threshold.</li>\n          <li><strong>No scaling budget.</strong> The pilot was funded; production was not. → Fund the pilot and the scale-up decision together, contingent on the threshold.</li>\n          <li><strong>Pilot conditions were unrepresentative</strong> — best data, most enthusiastic team, hand-held support. → Pilot in ordinary conditions, not ideal ones.</li>\n          <li><strong>Integration was never addressed</strong>, so the pilot ran alongside the real process rather than inside it. → Require the integration path at design stage.</li>\n          <li><strong>Nobody is willing to stop it.</strong> → Make stopping a documented, blameless outcome that appears in reporting as a completed experiment.</li>\n        </ul>\n        <div class=\"callout note\"><h4>Deeper dive: the honest pilot</h4><p style=\"margin:0\">A pilot run with the best data, the most capable team and vendor engineers on hand tells you what is possible under ideal conditions. Production has ordinary data, ordinary staff and no vendor on site. If you want a pilot that predicts production, degrade the conditions deliberately: use a normal team, normal data quality and normal support. A slightly disappointing honest pilot is far more valuable than an impressive misleading one.</p></div>"
      },
      {
        "h": "Stage gates",
        "html": "\n        <p>Fund and govern in stages, each with a written decision:</p>\n        <ul class=\"body\">\n          <li><strong>Gate 1 — Design approved.</strong> Problem, baseline, threshold, data confirmed available, risk tier assigned, owner named. Releases pilot funding.</li>\n          <li><strong>Gate 2 — Pilot result.</strong> Measured against threshold. Three outcomes only: proceed, iterate once with a revised threshold, or stop. \"Continue as is\" is not an outcome.</li>\n          <li><strong>Gate 3 — Production readiness.</strong> Integration, training, monitoring, oversight, rollback and incident process all in place. Releases production funding.</li>\n          <li><strong>Gate 4 — Post-implementation review</strong>, at six months. Did the value materialise? If not, why, and does the system continue?</li>\n        </ul>\n        <p>Gate 4 is the one organisations skip, and it is the one that builds institutional judgement. Without it you never learn whether your business cases were realistic, and every subsequent case repeats the same optimism.</p>"
      },
      {
        "h": "The transition to production",
        "html": "\n        <p>Six things must be true before a system goes live, and the technical readiness is only one of them:</p>\n        <ol class=\"body\">\n          <li><strong>Integration.</strong> It sits inside the workflow, not beside it. Anything requiring staff to leave their normal system will decay.</li>\n          <li><strong>Training delivered</strong>, including how to recognise and challenge bad output.</li>\n          <li><strong>Oversight defined.</strong> Who reviews what, how often, with what authority.</li>\n          <li><strong>Monitoring live</strong> — metric, threshold, named recipient of alerts.</li>\n          <li><strong>Rollback tested.</strong> Can you revert to the previous process, and has anyone actually tried?</li>\n          <li><strong>Support arranged.</strong> Who does a user ask when it behaves oddly, and is that person real and available?</li>\n        </ol>\n        <p>Run in parallel where the stakes justify it: the new system operates alongside the existing process, outputs are compared, and you transition only when confidence is evidenced rather than assumed. It costs more for a period and it is the single most reliable protection against a bad go-live.</p>"
      },
      {
        "h": "Monitoring a live system",
        "html": "\n        <p>Four things, reviewed monthly and reported quarterly:</p>\n        <ul class=\"body\">\n          <li><strong>Performance</strong> against the metric defined at design. Alert on threshold breach.</li>\n          <li><strong>Usage.</strong> Falling usage is the earliest signal that something is wrong — users stop before they complain.</li>\n          <li><strong>Override rate.</strong> Rising means declining performance or declining trust; near-zero means oversight has become a formality. Both require investigation.</li>\n          <li><strong>Value.</strong> Is the benefit in the business case actually appearing in the operational numbers?</li>\n        </ul>\n        <p>Assign monitoring to a named person with the time to do it. Monitoring that is everyone's responsibility is nobody's, and the first indication of failure will come from a customer rather than from your own systems.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: write the stop condition first",
      "text": "Before a pilot begins, have the decision-maker write and sign one sentence: <em>\"If, after ten weeks, X is not at least Y, we will stop this.\"</em> It takes two minutes and it changes the character of the entire initiative — because from that point the pilot is an experiment with a defined answer rather than a commitment gathering momentum. It also makes stopping a professional outcome rather than a personal defeat, which is what makes stopping possible at all."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Design the pilot for the use case you have been developing through this programme. Write all five elements — question, baseline, threshold, duration, scope — and name the person who will make the go/no-go decision. Then work through the six production-readiness conditions and identify which your organisation could not currently satisfy. Those gaps are the real work of implementation."
    },
    "takeaways": [
      "The four stages are design, development, deployment and monitoring — design is rushed and monitoring is treated as optional",
      "A pilot needs a question, a baseline, a pre-agreed threshold, a duration and a scope",
      "A pilot without a stopping threshold cannot fail, and therefore cannot succeed",
      "Pilot under ordinary conditions, not ideal ones, if you want it to predict production",
      "Fund the pilot and the scale-up decision together, or you will build things you cannot deploy",
      "Gate 4, the six-month post-implementation review, is what builds institutional judgement about your own business cases",
      "Falling usage is the earliest signal of a failing system — users stop before they complain"
    ],
    "quiz": [
      {
        "q": "A pilot with no pre-agreed stopping threshold is problematic because:",
        "opts": [
          "Vendors will not support it",
          "It costs more to run",
          "It cannot fail, and therefore cannot succeed — no result changes anyone's mind",
          "It breaches governance rules"
        ],
        "a": 2,
        "fb": "Without a threshold agreed in writing in advance, the pilot becomes an expensive way of postponing a decision."
      },
      {
        "q": "To make a pilot predictive of production performance, you should run it with:",
        "opts": [
          "The largest possible volume",
          "No measurement, to avoid bias",
          "The best available data, the most capable team and vendor engineers on site",
          "Ordinary data quality, an ordinary team and ordinary support"
        ],
        "a": 3,
        "fb": "A slightly disappointing honest pilot is far more valuable than an impressive misleading one."
      },
      {
        "q": "Which gate do organisations most commonly skip, at the greatest cost to institutional learning?",
        "opts": [
          "The six-month post-implementation review",
          "Pilot result review",
          "Production readiness",
          "Design approval"
        ],
        "a": 0,
        "fb": "Without it you never learn whether your business cases were realistic, and every subsequent case repeats the same optimism."
      },
      {
        "q": "Declining usage of a deployed AI system should be interpreted as:",
        "opts": [
          "A training scheduling problem",
          "The earliest signal that something is wrong — users stop before they complain",
          "Evidence of successful automation",
          "A minor administrative issue"
        ],
        "a": 1,
        "fb": "Usage is a leading indicator. By the time complaints arrive, the system has usually been failing for some time."
      },
      {
        "q": "At Gate 2, the pilot result review, the permitted outcomes are:",
        "opts": [
          "Proceed only",
          "Any outcome the project team prefers",
          "Proceed, iterate once with a revised threshold, or stop",
          "Proceed or continue as is"
        ],
        "a": 2,
        "fb": "'Continue as is' is not an outcome — it is how pilots become permanent without ever being decided upon."
      },
      {
        "q": "Running a new system in parallel with the existing process before transition is valuable because:",
        "opts": [
          "It shortens the project",
          "Vendors require it",
          "It is cheaper",
          "Outputs can be compared, so transition happens on evidenced confidence rather than assumption"
        ],
        "a": 3,
        "fb": "It costs more for a period and is the single most reliable protection against a bad go-live."
      }
    ]
  },
  {
    "id": "g12",
    "tag": "Module 12",
    "time": "55 min",
    "title": "Leading the Transformation: Your Twelve-Month Plan",
    "summary": "Bringing it together into something you can act on Monday",
    "objectives": [
      "Synthesise the programme into a coherent, sequenced twelve-month plan",
      "Set realistic expectations with your board and your organisation",
      "Understand the specific considerations for organisations in developing markets",
      "Know what to do in the first ninety days",
      "Build the leadership habits that sustain the work beyond the first initiative",
      "Complete your capstone AI strategy"
    ],
    "sections": [
      {
        "h": "What the evidence collectively says",
        "html": "\n        <p>Four independent bodies of research have informed this programme. Their conclusions converge in a way that should shape your plan:</p>\n        <ul class=\"body\">\n          <li><strong>Deloitte</strong> (550 leaders): outcomes are driven by <em>who decides</em>. Distributed decision rights across technology, finance and strategy lenses outperform concentrated ownership, by very large margins.</li>\n          <li><strong>The World Economic Forum</strong>: initiatives fail for <em>organisational</em> reasons — capability, data, foundations, governance, finance and project management — not technical ones.</li>\n          <li><strong>Capgemini</strong> (500 CXOs): executives are already using AI in strategic work, quietly and without frameworks; the gains accrue to those who use it to <em>challenge</em> their thinking, and the binding constraint is confidence and governance rather than technology.</li>\n          <li><strong>Enterprise practice</strong>: value comes from AI integrated across functions with strategic alignment, data foundations and human–AI collaboration — not from isolated pilots.</li>\n        </ul>\n        <p>The common thread is unambiguous. <strong>AI is a management problem that happens to involve technology.</strong> Every constraint in the evidence is one a leadership team can act on directly, without any technical capability at all.</p>"
      },
      {
        "h": "A twelve-month sequence",
        "html": "\n        <p><strong>Months 1–3: Establish and inventory.</strong></p>\n        <ul class=\"body\">\n          <li>Name the executive owner and set the decision-rights table (Module 3)</li>\n          <li>Build the register of AI already in use, and issue the acceptable use policy (Module 9)</li>\n          <li>Provide an approved, safe tool so shadow use has an alternative</li>\n          <li>Run the opportunity sweep across every function (Module 4)</li>\n          <li>Complete the readiness assessment with evidence (Modules 2 and 7)</li>\n          <li>Deliver executive and management AI literacy (Module 8)</li>\n        </ul>\n        <p><strong>Months 4–6: Prove.</strong></p>\n        <ul class=\"body\">\n          <li>Select two or three use cases from the high-value, high-feasibility quadrant</li>\n          <li>Build full business cases including baselines and stop conditions (Module 6)</li>\n          <li>Run pilots under ordinary conditions, with thresholds agreed in writing (Module 11)</li>\n          <li>Begin the data foundation work the next wave will require (Module 7)</li>\n          <li>Have the employment conversation with your people before the first deployment (Module 8)</li>\n        </ul>\n        <p><strong>Months 7–9: Decide and scale.</strong></p>\n        <ul class=\"body\">\n          <li>Take pilot decisions at Gate 2 — proceed, iterate once, or stop. Stop at least one, publicly and without blame</li>\n          <li>Move the successful case to production against the six readiness conditions</li>\n          <li>Establish monitoring with a named owner</li>\n          <li>Report measured value to the board against baseline, not activity</li>\n        </ul>\n        <p><strong>Months 10–12: Institutionalise.</strong></p>\n        <ul class=\"body\">\n          <li>Run the first post-implementation reviews and compare outcome to business case</li>\n          <li>Extend literacy training to the staff groups now affected</li>\n          <li>Refresh the use-case pipeline with what you have learned</li>\n          <li>Set the following year's strategy and budget on evidence rather than enthusiasm</li>\n        </ul>"
      },
      {
        "h": "Setting expectations honestly",
        "html": "\n        <p>What to tell your board at the outset — because saying it now costs far less than explaining it later:</p>\n        <ul class=\"body\">\n          <li><strong>The first year builds capability; it does not transform the business.</strong> Expect measurable improvement in two or three processes, not a step change in results.</li>\n          <li><strong>Some initiatives will be stopped.</strong> This is the design working, not a failure of management.</li>\n          <li><strong>A meaningful share of the investment goes to foundations</strong> that produce no direct return but make everything subsequent possible.</li>\n          <li><strong>Timelines will move.</strong> Data work consistently takes longer than estimated — plan for it rather than apologising for it.</li>\n          <li><strong>Efficiency gains require a decision to realise them.</strong> Time saved converts to value only if roles change or growth is absorbed.</li>\n        </ul>\n        <p>A leadership team that sets these expectations at the start retains credibility through the inevitable difficulties. One that promises transformation in year one spends year two defending itself.</p>"
      },
      {
        "h": "Considerations for organisations in developing markets",
        "html": "\n        <p>Several constraints are more binding in markets such as Nepal, and each has a workable response:</p>\n        <ul class=\"body\">\n          <li><strong>Scarce specialist talent, and international competition for it.</strong> Response: train existing staff rather than attempting to hire specialists, and partner externally for infrequent technical work with mandatory knowledge transfer.</li>\n          <li><strong>Weaker data foundations</strong>, with more paper-based and fragmented records. Response: begin with document and language use cases that need little structured data, while building foundations for the next wave.</li>\n          <li><strong>Cost sensitivity and currency exposure</strong> on usage-priced international tools. Response: model usage growth explicitly, negotiate caps, and monitor consumption monthly rather than annually.</li>\n          <li><strong>Regulatory uncertainty.</strong> Response: govern to a defensible internal standard rather than waiting for rules, so that when they arrive you are adjusting rather than starting.</li>\n          <li><strong>Language.</strong> Model performance in Nepali and other regional languages is weaker than in English. Test on your actual material before committing, not on a vendor's demonstration.</li>\n        </ul>\n        <p>There is also a genuine advantage. Organisations without decades of legacy systems and entrenched process can adopt more quickly than large incumbents, and the absence of a heavy existing technology estate removes a constraint that slows many larger organisations considerably.</p>"
      },
      {
        "h": "The first ninety days — five actions",
        "html": "\n        <ol class=\"body\">\n          <li><strong>Name the owner and widen the table.</strong> Ensure the technical, financial, strategic and operational lenses are present in every AI decision. Free, and Deloitte's evidence suggests it is the highest-leverage change available.</li>\n          <li><strong>Build the register.</strong> Two weeks. You cannot govern what you have not inventoried.</li>\n          <li><strong>Issue the policy and provide an approved tool.</strong> Converts invisible shadow use into a managed practice.</li>\n          <li><strong>Run the opportunity sweep.</strong> Four questions to every function head. Generates the pipeline and the ownership.</li>\n          <li><strong>Use the tools yourself, visibly.</strong> Including where they failed. This does more for adoption than any communication programme.</li>\n        </ol>\n        <p>None of the five requires technical capability, significant budget or external assistance. All five can begin this month.</p>"
      },
      {
        "h": "The habits that sustain it",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Ask the three questions</strong> of every proposal: which decision does it improve, what happens when it is wrong, what data does it need.</li>\n          <li><strong>Form your own view before consulting the model.</strong> Protects the judgement your organisation is paying for.</li>\n          <li><strong>Require baselines.</strong> No initiative starts without a measured before.</li>\n          <li><strong>Keep stopping things.</strong> An organisation that never stops an initiative is not experimenting; it is accumulating.</li>\n          <li><strong>Keep the register current.</strong> Quarterly, permanently.</li>\n          <li><strong>Talk to your people about it honestly.</strong> Repeatedly, not once.</li>\n        </ul>\n        <p>The organisations that will do well with AI over the coming decade are not those with the largest budgets or the newest tools. They are those whose leadership teams built the habit of deciding well about it — early, cheaply, and with the whole management table in the room.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: pick one thing and start it this week",
      "text": "The most common outcome of a programme like this is a thoughtful plan that is never executed, because it requires a strategy day that never gets scheduled. Avoid that: select one of the five ninety-day actions and start it before this week ends. The register is usually the best choice — it requires only emails to function heads, it produces findings that create their own urgency, and it makes every subsequent step concrete."
    },
    "activity": {
      "title": "Capstone: your AI strategy",
      "text": "Assemble the work from across this programme into a document of no more than six pages for your board or management committee: <strong>(1)</strong> the one-page strategy from Module 2, <strong>(2)</strong> your maturity and readiness assessment with evidence, <strong>(3)</strong> the decision-rights table from Module 3, <strong>(4)</strong> your top three prioritised use cases from Module 4 with the full business case for the first, <strong>(5)</strong> your governance structure, policy and register from Module 9, and <strong>(6)</strong> the twelve-month sequence with named owners and the five ninety-day actions. Then present it. A strategy that stays in a drawer is indistinguishable from no strategy at all."
    },
    "takeaways": [
      "The evidence converges: AI is a management problem that happens to involve technology",
      "Sequence the year as establish and inventory, prove, decide and scale, then institutionalise",
      "Tell the board at the outset that year one builds capability rather than transforming the business",
      "In developing markets, train rather than hire, start with document and language use cases, and test regional-language performance on your own material",
      "The absence of a heavy legacy estate is a genuine adoption advantage",
      "Five ninety-day actions require no technical capability, no budget and no consultant",
      "An organisation that never stops an initiative is not experimenting — it is accumulating",
      "Start one action this week; the register is usually the right choice"
    ],
    "quiz": [
      {
        "q": "The common conclusion across the Deloitte, WEF and Capgemini research is that:",
        "opts": [
          "AI is fundamentally a management problem that happens to involve technology",
          "Only large organisations can succeed with AI",
          "Technical sophistication is the primary driver of AI returns",
          "Governance is less important than speed"
        ],
        "a": 0,
        "fb": "Every constraint identified in the evidence is one a leadership team can act on directly, without technical capability."
      },
      {
        "q": "What should a leadership team tell its board about the first year of an AI programme?",
        "opts": [
          "That returns are guaranteed",
          "That it builds capability, delivers measurable improvement in two or three processes, and that some initiatives will be stopped",
          "That it will transform business results",
          "That no investment in foundations is required"
        ],
        "a": 1,
        "fb": "Teams that set honest expectations at the start retain credibility through difficulty; those promising transformation spend year two defending themselves."
      },
      {
        "q": "For an organisation in a market with weaker data foundations, the recommended starting point is:",
        "opts": [
          "Hire an international data science team",
          "Wait until an enterprise data programme is complete",
          "Begin with document and language use cases that need little structured data, while building foundations for the next wave",
          "Avoid AI entirely"
        ],
        "a": 2,
        "fb": "Different use cases have different data requirements. Sequencing matters more than waiting for perfect foundations."
      },
      {
        "q": "Which first-ninety-days action does Deloitte's evidence suggest is the highest-leverage and costs nothing?",
        "opts": [
          "Purchasing an enterprise AI platform",
          "Commissioning a consultancy review",
          "Hiring a chief AI officer",
          "Widening the decision table so technical, financial, strategic and operational lenses are all present"
        ],
        "a": 3,
        "fb": "Outcomes peak when decision rights are distributed among complementary leaders. Widening the table is free."
      },
      {
        "q": "An organisation that has never stopped an AI initiative is most likely:",
        "opts": [
          "Accumulating rather than experimenting",
          "Exceptionally well managed",
          "Following best practice",
          "Under-investing"
        ],
        "a": 0,
        "fb": "If every initiative continues, the stopping criteria are not real and the portfolio is not being managed."
      },
      {
        "q": "A genuine advantage for organisations in developing markets pursuing AI is:",
        "opts": [
          "Lower regulatory standards",
          "The absence of decades of legacy systems and entrenched process, allowing faster adoption",
          "Cheaper international software",
          "Fewer competitors"
        ],
        "a": 1,
        "fb": "A heavy existing technology estate is a constraint that slows many larger incumbents considerably."
      }
    ]
  }
];
