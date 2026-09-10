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

export const financeAdvancedLessons: Lesson[] = [
  {
    "id": "a1",
    "tag": "Module 1",
    "time": "45 min",
    "title": "From Practitioner to Architect: The Advanced Landscape",
    "summary": "Where the industry actually stands, and the execution gap",
    "objectives": [
      "Position yourself accurately against global adoption benchmarks rather than vendor narrative",
      "Understand the 'execution and business integration gap' and why it defines the current phase",
      "Interpret the AI maturity ladder — Exploring, Piloting, Scaling, Transforming — and locate your institution honestly",
      "Understand why emerging-market institutions are outperforming advanced-economy peers on deployment",
      "Distinguish efficiency-led adoption from business-model reinvention",
      "Frame the strategic question this programme is designed to answer"
    ],
    "sections": [
      {
        "h": "What this programme assumes, and where it goes",
        "html": "\n        <p>This programme assumes you have completed <strong>AI for Financial Professionals</strong> or possess equivalent working knowledge: you can distinguish machine learning from generative AI, read a Gini coefficient, recognise data leakage, explain why NRB's guidelines place accountability with the board, and structure a prompt properly.</p>\n        <p>We now move from <em>using</em> AI to <strong>architecting, governing and leading it</strong>. The orientation shifts from the individual practitioner to the institution: model risk frameworks, capability stacks, agentic systems, systemic risk, target operating models, and the economics of value realisation. Where the first programme taught you to be a competent user, this one prepares you to sit on the committee that decides.</p>"
      },
      {
        "h": "The honest benchmark: where the industry actually is",
        "html": "\n        <p>Strategy begins with an accurate baseline. The <strong>2026 Global AI in Financial Services Report</strong> from the Cambridge Centre for Alternative Finance — surveying <strong>628 organisations across 151 jurisdictions</strong>, including 149 traditional financial institutions, 203 fintechs, 146 vendors and 130 central banks and regulators — provides the most credible picture currently available.</p>\n        <ul class=\"body\">\n          <li><strong>81% of surveyed financial services firms are adopting AI at some level</strong>, with 40% reporting advanced adoption (Scaling or Transforming).</li>\n          <li>Regulators lag: only <strong>20% report advanced adoption</strong>, and 48% remain in Exploring or are not engaged with AI at all.</li>\n          <li>Fintechs lead incumbents on advanced adoption by <strong>47% to 30%</strong>, and at the Transforming stage by <strong>19% to 6%</strong>.</li>\n        </ul>\n        <p>That final comparison is the strategic threat for an incumbent bank. The gap is not primarily technological — the report identifies <strong>workforce preparedness and investment levels</strong> as the key differentiators between fintechs and incumbents. Both are choices, not constraints.</p>"
      },
      {
        "h": "The execution gap — the defining finding",
        "html": "\n        <p>One statistic in the Cambridge study deserves more attention than any other:</p>\n        <p><strong>Only 14% of industry respondents currently see AI as transformational to their organisational strategy and competitive advantage.</strong></p>\n        <p>Eighty-one percent are adopting. Fourteen percent consider it strategically transformational. The report names this directly as <em>\"a potentially significant execution and business integration gap.\"</em></p>\n        <p>Read carefully, this says most institutions have successfully installed AI into existing processes without changing what the institution <em>is</em>. That is not failure — process improvement is real value — but it is a ceiling. And it explains why board-level enthusiasm so often fails to convert into competitive position.</p>\n        <div class=\"callout note\"><h4>Deeper dive: why the gap persists</h4><p style=\"margin:0\">Efficiency gains accrue inside existing organisational boundaries and require no structural change. Business-model reinvention requires redesigning products, pricing, channels, risk appetite and incentives simultaneously — which requires the board, not the innovation team. Institutions that cross this gap do so because leadership treated AI as a strategy question rather than a technology programme. Every subsequent module in this course is, ultimately, about crossing it.</p></div>"
      },
      {
        "h": "Adoption is concentrated in the back office",
        "html": "\n        <p>The Cambridge data shows precisely where deployment sits today. <strong>Four of the top five financial-services use cases are back-office functions:</strong></p>\n        <ul class=\"body\">\n          <li>Process automation — <strong>79%</strong> at pilot stage or beyond</li>\n          <li>Data visualisation — <strong>75%</strong></li>\n          <li>Software engineering — <strong>75%</strong></li>\n          <li>Data and knowledge management — <strong>69%</strong></li>\n          <li>AI-powered customer support — <strong>74%</strong> (the leading front-office use case; fintechs 82% versus incumbents 67%)</li>\n        </ul>\n        <p>In risk and compliance, <strong>fraud detection leads at 57%</strong> and <strong>credit risk modelling at 54%</strong>.</p>\n        <p>The report's conclusion is blunt: AI is currently being used <em>\"to improve execution rather than to fundamentally reconfigure business models.\"</em> Encouragingly, <strong>51% of more mature adopters are piloting or deploying new AI-powered financial products, versus 28% among less mature institutions</strong> — evidence that maturity does eventually convert into product innovation.</p>"
      },
      {
        "h": "The maturity ladder, used honestly",
        "html": "\n        <p>The framework used throughout this programme has four stages. Locate your institution without flattery:</p>\n        <ol class=\"body\">\n          <li><strong>Exploring.</strong> Interest, discussion, perhaps an unapproved tool in use somewhere. No governance, no owned use case.</li>\n          <li><strong>Piloting.</strong> One or more defined use cases in controlled testing, with owners and some measurement. Value not yet proven at scale.</li>\n          <li><strong>Scaling.</strong> Proven use cases extended across business lines, supported by shared platforms, reusable components and a governance framework.</li>\n          <li><strong>Transforming.</strong> AI materially changes products, propositions or the operating model. Strategy and AI capability are inseparable.</li>\n        </ol>\n        <p>Most Nepali institutions today sit between Exploring and Piloting. That is neither shameful nor unusual — 48% of the world's regulators are in the same position. What matters is whether the trajectory is deliberate.</p>"
      },
      {
        "h": "The emerging-market finding that should change your thinking",
        "html": "\n        <p>A result from the Cambridge study runs against conventional expectation and is directly relevant to Nepal:</p>\n        <p><strong>Industry respondents in emerging markets and developing economies report higher levels of deployment — Scaling and Transforming — than firms in advanced economies.</strong></p>\n        <p>Related, and equally striking: <strong>53% of surveyed industry respondents spend under USD 100,000 annually on AI, yet still report high maturity in generative and agentic AI.</strong></p>\n        <p>Two implications follow. First, capital is not the binding constraint it is often claimed to be — foundation models have collapsed the cost of entry, and institutions building on external models rather than training their own can reach real capability at modest spend. Second, the absence of entrenched legacy systems and legacy processes can be an advantage rather than a handicap. An institution without thirty years of accumulated technical debt has fewer things to unpick.</p>\n        <p>This does not mean Nepal's banks are ahead. It means the excuse that they cannot compete because they lack scale is empirically weak.</p>"
      },
      {
        "h": "The value at stake, and the scepticism it deserves",
        "html": "\n        <p>McKinsey's widely cited estimate is that AI technologies could deliver <strong>up to USD 1 trillion of additional value annually to global banking</strong>. PwC's Strategy& analysis concludes that institutions fully embracing AI could achieve up to a <strong>15-percentage-point improvement in their efficiency ratio</strong> — a figure that, if realised, would reset shareholder expectations for the sector.</p>\n        <div class=\"callout note\"><h4>Industry evidence: World Economic Forum &amp; Accenture</h4><p style=\"margin:0 0 8px\">The WEF's <i>Artificial Intelligence in Financial Services</i> (January 2025), drawing on roundtables with over 100 financial services executives, quantifies the exposure differently: research indicates that <b>32–39% of the work performed across capital markets, insurance and banking has high potential to be fully automated</b>, with a further <b>34–37% holding high augmentation potential</b>.</p><p style=\"margin:0 0 8px\">Investment is following. Financial services firms spent <b>USD 35 billion on AI in 2023</b>, with projected investment across banking, insurance, capital markets and payments expected to reach <b>USD 97 billion by 2027</b> — making financial services one of the most heavily AI-invested industries.</p><p style=\"margin:0\">Notably, executive attention is shifting: approximately <b>70% of financial services executives believe AI will directly contribute to revenue growth</b> in the coming years, rather than efficiency alone.</p></div>\n        <p>Treat these as directional rather than predictive. They describe a theoretical maximum under full execution, and the Cambridge data shows almost nobody is executing fully. The professionally useful reading is not \"we will capture this\" but rather: <em>the gap between the theoretical value and current realisation is the size of the execution problem</em> — which is precisely the problem this programme addresses.</p>"
      },
      {
        "h": "How this programme is structured",
        "html": "\n        <p>Twelve modules, arranged as a progression from technical depth to institutional leadership:</p>\n        <ul class=\"body\">\n          <li><strong>Modules 2–3</strong> build the architectural and risk foundations: the AI capability stack, and advanced model risk management.</li>\n          <li><strong>Modules 4–6</strong> address the hard technical frontier: explainability in depth, foundation models and the modern AI stack, and agentic AI.</li>\n          <li><strong>Modules 7–8</strong> apply this to the two highest-value domains: advanced credit risk and capital, and financial crime at network scale.</li>\n          <li><strong>Modules 9–10</strong> move to the institution and the system: enterprise governance and target operating model, then systemic risk and the regulatory frontier.</li>\n          <li><strong>Modules 11–12</strong> close on execution: value realisation, and leading transformation in a Nepali institution — concluding with your capstone enterprise AI strategy.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: benchmark before you strategise",
      "text": "Before your next AI steering discussion, place your institution on the four-stage ladder in writing and circulate it. Institutions consistently overstate their maturity because pilots are visible and scaling is not. A written, evidenced position — <em>\"we have three pilots, none scaled, no model inventory, no independent validation\"</em> — is uncomfortable and immediately clarifying. Strategy built on a flattering self-assessment fails predictably."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Assess your institution against the Cambridge benchmarks. For each of the five leading use cases (process automation, data visualisation, software engineering, data and knowledge management, customer support), plus fraud detection and credit risk modelling, mark your stage: Not engaged, Exploring, Piloting, Scaling or Transforming. Then answer one question honestly: <strong>of everything we have deployed, has any of it changed a product, a price, or a customer proposition?</strong> If the answer is no, you are in the 86%, and you now know what the work is."
    },
    "takeaways": [
      "81% of financial firms are adopting AI, but only 14% consider it transformational — the execution gap defines this phase",
      "Fintechs lead incumbents 47% to 30% on advanced adoption; workforce preparedness and investment are the differentiators",
      "Four of the top five use cases remain back-office; AI is improving execution rather than reconfiguring business models",
      "EMDE institutions report higher deployment than advanced-economy peers — scale is not the binding constraint",
      "53% spend under USD 100,000 annually yet report high GenAI and agentic maturity",
      "The $1 trillion and 15-point efficiency figures describe a theoretical maximum; the gap to realisation is the execution problem"
    ],
    "quiz": [
      {
        "q": "The Cambridge Centre for Alternative Finance found that 81% of financial firms are adopting AI, yet only 14% see it as transformational to strategy. This is best described as:",
        "opts": [
          "An execution and business integration gap — adoption without structural change",
          "Proof that regulators are blocking adoption",
          "A statistical error in the survey",
          "Evidence that AI does not work in finance"
        ],
        "a": 0,
        "fb": "Most institutions have installed AI into existing processes without changing what the institution is. Crossing that gap requires board-level strategy, not more pilots."
      },
      {
        "q": "On advanced AI adoption, the Cambridge study found fintechs lead traditional financial institutions by:",
        "opts": [
          "10% to 9%",
          "47% to 30%",
          "They are equal",
          "95% to 5%"
        ],
        "a": 1,
        "fb": "Fintechs lead 47% to 30% on advanced adoption and 19% to 6% at the Transforming stage, with workforce preparedness and investment as key differentiators."
      },
      {
        "q": "Which finding most directly challenges the argument that Nepali banks cannot compete on AI because of scale?",
        "opts": [
          "Fintechs are growing quickly",
          "Regulators are slow to adopt",
          "EMDE respondents report higher deployment than advanced economies, and 53% spend under USD 100,000 annually while reporting high GenAI maturity",
          "AI is mostly used in the back office"
        ],
        "a": 2,
        "fb": "Foundation models have collapsed the cost of entry, and the absence of legacy technical debt can be an advantage rather than a handicap."
      },
      {
        "q": "Four of the top five financial services AI use cases are:",
        "opts": [
          "Regulatory reporting only",
          "Customer-facing lending products",
          "Trading strategies",
          "Back-office functions such as process automation and data management"
        ],
        "a": 3,
        "fb": "Process automation (79%), data visualisation (75%), software engineering (75%) and data/knowledge management (69%) dominate — execution improvement rather than business-model change."
      },
      {
        "q": "PwC's estimate that full AI adoption could improve a bank's efficiency ratio by up to 15 percentage points should be interpreted as:",
        "opts": [
          "A theoretical maximum under full execution — the gap to realisation is the size of the execution problem",
          "An estimate that applies only to fintechs",
          "A regulatory requirement",
          "A guaranteed outcome for any bank that buys AI software"
        ],
        "a": 0,
        "fb": "Such figures describe the ceiling under complete execution. The Cambridge data shows almost no institution is executing fully."
      }
    ]
  },
  {
    "id": "a2",
    "tag": "Module 2",
    "time": "55 min",
    "title": "The AI Capability Stack",
    "summary": "The four-layer architecture of an AI-first bank",
    "objectives": [
      "Describe the four layers of the AI capability stack and how they interact",
      "Understand why weakness in any single layer caps the entire institution",
      "Evaluate the engagement layer: personalisation, omnichannel journeys and embedded finance",
      "Understand the decisioning layer and the components a credible decisioning capability requires",
      "Assess core technology and data infrastructure requirements realistically",
      "Understand the platform operating model and why it is the layer most institutions neglect"
    ],
    "sections": [
      {
        "h": "Why architecture, not use cases",
        "html": "\n        <p>Most institutions organise AI thinking around use cases. That is the right way to start and the wrong way to scale. A use-case portfolio produces a collection of point solutions with duplicated data pipelines, incompatible tooling and no reusable components — which is precisely the condition the Cambridge study describes when it finds firms unable to move beyond execution improvement.</p>\n        <p>McKinsey's framework in <em>Building the AI Bank of the Future</em> addresses this by describing a <strong>capability stack of four layers</strong>: engagement; AI-powered decisioning; core technology and data infrastructure; and a platform operating model. The insight is not the taxonomy but the dependency — <strong>the institution performs at the level of its weakest layer</strong>, regardless of investment in the others.</p>"
      },
      {
        "h": "Layer 1 — Engagement",
        "html": "\n        <p>The customer-facing layer: how the institution reaches, serves and retains customers.</p>\n        <ul class=\"body\">\n          <li><strong>Intelligent propositions.</strong> Offers shaped to the individual rather than the segment — the right product, at the moment of need, at a price reflecting actual risk.</li>\n          <li><strong>Smart servicing.</strong> Resolution at first contact through whichever channel the customer chooses, with context carried across channels.</li>\n          <li><strong>Omnichannel journeys.</strong> A customer starting an application on mobile and completing it in a branch should not restart. This is an integration problem, not an AI problem, but AI is what makes the personalisation worth integrating for.</li>\n          <li><strong>Embedded finance.</strong> Bank functionality delivered inside a partner's platform — commerce, logistics, agriculture — with decisioning happening in real time at the point of need.</li>\n        </ul>\n        <p>Deloitte reports that <strong>more than 50% of bank customers believe personalised services are a key factor in trusting their bank</strong>, and documents an institution achieving a <strong>40% increase in reward-programme usage</strong> through data-driven microsegmentation. Personalisation is a trust mechanism, not merely a sales one.</p>"
      },
      {
        "h": "Layer 2 — AI-powered decisioning",
        "html": "\n        <p>The layer that converts data into decisions at scale. A credible decisioning capability requires several components that institutions often assume they already have:</p>\n        <ul class=\"body\">\n          <li><strong>A decision inventory.</strong> A catalogue of every material recurring decision — credit approval, limit setting, pricing, collections treatment, fraud disposition, marketing eligibility — with owner, current method and volume. Most institutions have never compiled one.</li>\n          <li><strong>A feature store.</strong> Curated, documented, reusable variables computed once and shared across models. Without it, every model rebuilds its own inputs, and two models compute \"average balance\" differently.</li>\n          <li><strong>Model serving infrastructure.</strong> The ability to deploy a model into production and call it in real time within the latency the decision requires.</li>\n          <li><strong>Decision logging.</strong> Every automated decision recorded with its inputs, the model version and the outcome. This is a regulatory necessity and the raw material for future improvement.</li>\n          <li><strong>Champion–challenger capability.</strong> Running an alternative model in parallel to evidence improvement before switching.</li>\n        </ul>\n        <p>The decision inventory is the highest-value item on that list and the cheapest to produce. It converts an abstract ambition — \"we should use more AI\" — into a ranked, finite list of specific decisions that could be improved.</p>"
      },
      {
        "h": "Layer 3 — Core technology and data infrastructure",
        "html": "\n        <p>The foundation, and where most incumbents are genuinely constrained. McKinsey identifies an inflexible, investment-starved technology core and fragmented data assets as primary obstacles to scaling AI.</p>\n        <p>The realistic requirements:</p>\n        <ul class=\"body\">\n          <li><strong>Data accessible outside the core.</strong> If extracting customer data requires a batch job scheduled overnight, real-time decisioning is impossible regardless of model quality.</li>\n          <li><strong>A consistent customer identifier</strong> across core, cards, digital channels, loans and CRM. Without it, the joins that every model depends on fail silently.</li>\n          <li><strong>API-based integration</strong> so capabilities can be composed rather than rebuilt.</li>\n          <li><strong>Scalable compute</strong> — cloud or otherwise — sufficient to train and serve models. The Cambridge data shows AWS leading industry usage at 46%, though notably <strong>traditional financial institutions remain more reliant on on-premises or local cloud deployments (39%) than fintechs (23%)</strong>.</li>\n          <li><strong>Environment separation</strong> — development, testing and production — with controlled promotion between them.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The strategic trap</h4><p style=\"margin:0\">Institutions frequently conclude that core modernisation must complete before AI can begin. This is usually wrong and always expensive. The pragmatic path is to build a data layer <em>beside</em> the core — extracting, standardising and serving the data AI needs — while core replacement proceeds on its own timeline. Making AI dependent on a multi-year core programme guarantees several years of nothing.</p></div>"
      },
      {
        "h": "Layer 4 — The platform operating model",
        "html": "\n        <p>The layer institutions most often neglect, and the one McKinsey identifies as decisive: technology alone cannot define a successful AI bank.</p>\n        <p>The essential shift is from <strong>project-based delivery to platform-based ownership</strong>. In a project model, a cross-functional team assembles, delivers, and disperses; the asset then has no owner and decays. In a platform model, a persistent team owns a business capability — payments, lending decisioning, customer engagement — with a funded roadmap and accountability for outcomes rather than deliverables.</p>\n        <p>What this requires in practice:</p>\n        <ul class=\"body\">\n          <li><strong>Business and technology in one team</strong>, jointly accountable. The EY research cited in the foundational programme found that in high-return banks, <strong>40–50% of AI team members come from business rather than purely technical backgrounds</strong>.</li>\n          <li><strong>Persistent funding</strong> for capabilities rather than annual project bidding.</li>\n          <li><strong>Standards and reusable components</strong> so the second use case costs materially less than the first.</li>\n          <li><strong>Clear decision rights</strong> — who may approve a model into production, and on what evidence.</li>\n        </ul>"
      },
      {
        "h": "Diagnosing your weakest layer",
        "html": "\n        <p>Because the stack performs at the level of its weakest layer, the practical exercise is diagnosis rather than aspiration. Four questions, each answerable in an afternoon:</p>\n        <ol class=\"body\">\n          <li><strong>Engagement:</strong> can we make a different offer to two customers in the same product segment based on their behaviour? If not, personalisation is aspirational.</li>\n          <li><strong>Decisioning:</strong> can we list our top twenty recurring decisions, with owners and volumes? If not, we cannot prioritise.</li>\n          <li><strong>Core and data:</strong> can we assemble a joined, reliable customer dataset in under a month? If not, that is the constraint.</li>\n          <li><strong>Operating model:</strong> does any AI capability have a named owner with a funded roadmap? If not, whatever is built will decay.</li>\n        </ol>\n        <p>The answers usually point to layers three and four — which is inconvenient, because those are the least visible and hardest to fund. It is also why so much AI investment produces so little durable capability.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: build the decision inventory first",
      "text": "If you do one thing from this module, compile the decision inventory: every material recurring decision in your institution, with owner, volume, current method and the cost of being wrong. It typically takes two weeks and requires no technology investment. It converts AI strategy from a technology conversation into a prioritisation conversation — and prioritisation is something bank executives are already very good at."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Score your institution 1–5 on each of the four layers using the diagnostic questions above, and write one sentence of evidence for each score. Then identify your weakest layer and draft three specific actions that would raise it by one point within twelve months. Be honest if the answer is layer three or four — that finding is more valuable than another use-case idea."
    },
    "takeaways": [
      "A use-case portfolio does not scale; a capability stack does",
      "The four layers are engagement, AI-powered decisioning, core technology and data, and the platform operating model",
      "The institution performs at the level of its weakest layer regardless of investment elsewhere",
      "A decision inventory and a feature store are the highest-value decisioning components and are frequently absent",
      "Build a data layer beside the core rather than waiting for core replacement",
      "Platform ownership with persistent funding beats project delivery; high-return banks have 40–50% business people on AI teams"
    ],
    "quiz": [
      {
        "q": "In McKinsey's AI capability stack, overall institutional performance is determined by:",
        "opts": [
          "The size of the technology budget",
          "The weakest of the four layers",
          "The number of models in production",
          "The engagement layer alone"
        ],
        "a": 1,
        "fb": "Investment in one layer cannot compensate for weakness in another — the stack performs at the level of its weakest layer."
      },
      {
        "q": "Which decisioning component converts abstract AI ambition into a ranked, finite set of opportunities?",
        "opts": [
          "A cloud contract",
          "A feature store",
          "A decision inventory listing every material recurring decision with owner and volume",
          "A model serving platform"
        ],
        "a": 2,
        "fb": "The decision inventory is cheap, takes about two weeks, and turns a technology conversation into a prioritisation conversation."
      },
      {
        "q": "An institution concludes it must complete core banking replacement before starting AI. The best response is:",
        "opts": [
          "Agree — sequencing is essential",
          "Cancel the core programme",
          "Buy more models",
          "Build a data layer beside the core while replacement proceeds separately"
        ],
        "a": 3,
        "fb": "Making AI dependent on a multi-year core programme guarantees years of nothing. Extract, standardise and serve data alongside the core."
      },
      {
        "q": "The 'platform operating model' layer differs from project delivery principally because:",
        "opts": [
          "A persistent team owns a business capability with funded roadmap and outcome accountability",
          "It requires more vendors",
          "It uses different programming languages",
          "It eliminates the need for governance"
        ],
        "a": 0,
        "fb": "In project models the asset has no owner once the team disperses, and it decays. Platform ownership is what makes capability durable."
      },
      {
        "q": "Why does a feature store matter for an institution running several models?",
        "opts": [
          "It is a regulatory requirement in Nepal",
          "Variables are computed once, documented and reused — otherwise each model rebuilds inputs and definitions diverge",
          "It replaces the need for validation",
          "It reduces cloud costs only"
        ],
        "a": 1,
        "fb": "Without a feature store, two models may compute the same concept differently, creating inconsistency that is very hard to detect later."
      }
    ]
  },
  {
    "id": "a3",
    "tag": "Module 3",
    "time": "55 min",
    "title": "Advanced Model Risk Management & Validation",
    "summary": "Building a validation function a supervisor would respect",
    "objectives": [
      "Apply model risk management principles at institutional rather than individual model level",
      "Design a model inventory with risk tiering that drives proportionate control",
      "Conduct or commission genuine independent validation — conceptual soundness, outcomes analysis, benchmarking",
      "Understand backtesting, stability testing and the treatment of overlays",
      "Design ongoing monitoring that detects drift before it becomes a supervisory finding",
      "Understand how model risk management extends to generative and third-party models"
    ],
    "sections": [
      {
        "h": "Model risk as a first-class risk category",
        "html": "\n        <p>Model risk — adverse consequences from decisions based on incorrect or misused model output — is a recognised risk category in banking supervision, articulated most influentially in the US Federal Reserve and OCC guidance known as <strong>SR 11-7</strong>. Its three pillars are robust development and implementation, <em>independent</em> validation, and governance with ongoing monitoring.</p>\n        <p>The advanced insight is that model risk is <strong>not merely the sum of individual model risks</strong>. It has portfolio characteristics:</p>\n        <ul class=\"body\">\n          <li><strong>Correlated failure.</strong> Models sharing input data, feature definitions or vendor components fail together.</li>\n          <li><strong>Cascade risk.</strong> One model's output feeds another; an error propagates and amplifies while remaining invisible in each individual validation.</li>\n          <li><strong>Aggregate exposure.</strong> No single model may be material, while their combined influence over the balance sheet is.</li>\n        </ul>\n        <p>This is why an institution needs a model risk <em>framework</em>, not a stack of validation reports.</p>"
      },
      {
        "h": "The model inventory and risk tiering",
        "html": "\n        <p>Everything begins with a complete inventory. Institutions consistently discover more models than expected, because the definition is broader than \"things the data science team built\" — it includes vendor models, spreadsheet-based calculators used in decisioning, and AI features embedded inside purchased software.</p>\n        <p>Each entry should record: purpose and decision affected; owner (business) and developer; materiality; data sources; validation status and date; monitoring status; and known limitations.</p>\n        <p><strong>Risk tiering</strong> then drives proportionality. A defensible three-tier scheme:</p>\n        <ul class=\"body\">\n          <li><strong>Tier 1 — high.</strong> Directly determines customer outcomes or regulatory numbers: credit approval, pricing, ECL, capital, AML disposition. Full independent validation before deployment, annual revalidation, continuous monitoring.</li>\n          <li><strong>Tier 2 — medium.</strong> Materially informs decisions with human review: early-warning, alert prioritisation, propensity models. Independent review, periodic revalidation, regular monitoring.</li>\n          <li><strong>Tier 3 — low.</strong> Internal productivity and analysis with no direct customer or regulatory consequence. Lighter review, documented owner, spot checks.</li>\n        </ul>\n        <p>NRB's guidelines require institutions to classify AI systems by risk and apply proportionate controls. A documented tiering scheme is how you evidence that you have done so.</p>"
      },
      {
        "h": "What genuine independent validation examines",
        "html": "\n        <p>Independence means the validator did not build, procure or champion the model, and does not report to the person who did. Beyond independence, credible validation covers four areas:</p>\n        <ol class=\"body\">\n          <li><strong>Conceptual soundness.</strong> Is the modelling approach appropriate to the question? Are the variables justifiable? Is the target definition correct — does \"default\" here match the definition used in policy and reporting?</li>\n          <li><strong>Data quality and representativeness.</strong> Is the development sample representative of the population the model will face? Is there leakage? Is the outcome window appropriate?</li>\n          <li><strong>Outcomes analysis.</strong> Performance on hold-out and, critically, <strong>out-of-time</strong> samples. Discrimination (Gini, AUC), calibration (do predicted probabilities match observed frequencies?), and stability across segments.</li>\n          <li><strong>Benchmarking.</strong> Comparison against a simpler alternative. If a gradient-boosted model beats logistic regression by two Gini points but cannot be explained to a declined applicant, the marginal gain may not justify the cost.</li>\n        </ol>\n        <div class=\"callout note\"><h4>Deeper dive: discrimination versus calibration</h4><p style=\"margin:0\">These are distinct and both matter. <strong>Discrimination</strong> asks whether the model ranks customers correctly — do worse risks receive worse scores? <strong>Calibration</strong> asks whether the predicted probability is numerically right — of customers assigned a 5% default probability, do approximately 5% default? A model can discriminate excellently and be badly calibrated. For ranking and cut-off decisions, discrimination dominates. For expected credit loss, pricing and capital, <strong>calibration is what matters</strong>, because the number itself flows into the financial statements.</p></div>"
      },
      {
        "h": "Backtesting, stability and overlays",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Backtesting</strong> compares predictions against realised outcomes over time. It is the primary evidence that a model continues to work, and it requires the decision logging described in Module 2.</li>\n          <li><strong>Population stability</strong> tracks whether the distribution of inputs and scores is shifting. Common practice uses a population stability index, with movement beyond agreed thresholds triggering investigation. Stability breaks usually precede performance breaks, which makes them an early warning.</li>\n          <li><strong>Overlays and management adjustments</strong> — where judgement modifies model output — deserve particular scrutiny. They are legitimate and sometimes necessary, especially where recent conditions are unrepresented in the data. But they must be documented, quantified, governed and time-limited. An overlay that has persisted for three years is not an adjustment; it is an admission that the model is wrong and has not been rebuilt.</li>\n        </ul>"
      },
      {
        "h": "Monitoring designed to catch drift early",
        "html": "\n        <p>Monitoring is where frameworks most often fail, because it requires sustained effort after the excitement has passed. A workable monitoring specification defines, for each Tier 1 and Tier 2 model:</p>\n        <ul class=\"body\">\n          <li><strong>Metrics</strong> — discrimination, calibration, stability, override rate, subgroup performance</li>\n          <li><strong>Frequency</strong> — monthly or quarterly according to tier and volume</li>\n          <li><strong>Thresholds</strong> — the values that trigger review, agreed in advance</li>\n          <li><strong>Escalation</strong> — who is informed, within what period, and who may suspend the model</li>\n          <li><strong>Reporting</strong> — a standing item to the risk committee, not an annual exercise</li>\n        </ul>\n        <p>The discipline that distinguishes a mature institution is <strong>agreeing thresholds before deployment</strong>. Thresholds set after performance has deteriorated will always be set generously.</p>"
      },
      {
        "h": "Extending the framework to generative and third-party models",
        "html": "\n        <p>Traditional model risk management assumes a model you built, with a measurable output and a knowable outcome. Generative and vendor models break both assumptions.</p>\n        <ul class=\"body\">\n          <li><strong>Generative models</strong> produce text, not probabilities. Validation shifts toward evaluation harnesses — a fixed set of representative tasks with expected answers, run against every model version — plus factual grounding checks, refusal behaviour, and human review sampling. The Cambridge study found <strong>model hallucinations</strong> among the most-cited risks by both industry and regulators.</li>\n          <li><strong>Third-party models</strong> may be opaque by contract. Where internals cannot be inspected, validation must rely more heavily on outcomes analysis using your own data, contractual rights to evidence, and benchmarking against an internally built challenger.</li>\n          <li><strong>Foundation model dependency.</strong> With <strong>63% of industry respondents building internal workflows on external foundation models</strong>, and OpenAI used by 76% of industry respondents, an institution's model risk now includes the risk that an external provider changes, deprecates or reprices a model underneath a live process. Version pinning and documented fallback are basic hygiene.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the calibration question",
      "text": "In any model review where the output feeds expected credit loss, pricing or capital, ask one question: <em>\"Show me the calibration curve — of the accounts we predicted at 5%, what proportion actually defaulted?\"</em> Discrimination statistics are reported far more often because they flatter the model. Calibration is what determines whether the number entering your financial statements is right, and it is where errors become material."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take one model in production at your institution. Document: its tier and why; who validated it and whether they were genuinely independent; when it was last revalidated; what is monitored, how often, and against what thresholds; whether any overlay is applied and for how long it has persisted. Any item you cannot answer is a finding — and collectively they constitute your model risk gap analysis."
    },
    "takeaways": [
      "Model risk has portfolio characteristics: correlated failure, cascade risk and aggregate exposure",
      "A complete inventory with documented risk tiering is how you evidence proportionate control to NRB",
      "Independent validation covers conceptual soundness, data, outcomes analysis and benchmarking against a simpler alternative",
      "Discrimination and calibration are distinct — calibration governs ECL, pricing and capital",
      "Stability breaks precede performance breaks; agree monitoring thresholds before deployment",
      "Overlays must be documented, quantified and time-limited; a three-year overlay means the model needs rebuilding",
      "Generative models require evaluation harnesses; foundation model dependency requires version pinning and fallback"
    ],
    "quiz": [
      {
        "q": "A model's output feeds expected credit loss calculations. Which property matters most?",
        "opts": [
          "Number of variables",
          "Discrimination — correct ranking of risk",
          "Calibration — predicted probabilities matching observed frequencies",
          "Processing speed"
        ],
        "a": 2,
        "fb": "ECL, pricing and capital consume the probability itself, so the number must be numerically right. A model can rank well and still be badly calibrated."
      },
      {
        "q": "An overlay adjusting model output has been in place for three years. This indicates:",
        "opts": [
          "A regulatory requirement",
          "Prudent conservatism that should continue",
          "Excellent governance",
          "The model is wrong and has not been rebuilt — the overlay is no longer an adjustment"
        ],
        "a": 3,
        "fb": "Overlays are legitimate but must be documented, quantified and time-limited. Persistent overlays substitute judgement for a model that needs redevelopment."
      },
      {
        "q": "Why is model risk more than the sum of individual model risks?",
        "opts": [
          "Correlated failure, cascade effects between models and aggregate balance-sheet exposure",
          "Because there are more models than staff",
          "It is not — they are equivalent",
          "Because regulators say so"
        ],
        "a": 0,
        "fb": "Shared data, shared features and chained outputs mean models fail together and errors propagate invisibly through individual validations."
      },
      {
        "q": "Validation of a third-party model whose internals are proprietary should rely most heavily on:",
        "opts": [
          "Parameter count",
          "Outcomes analysis on your own data, contractual evidence rights, and benchmarking against an internal challenger",
          "Skipping validation for vendor models",
          "Trusting the vendor's published figures"
        ],
        "a": 1,
        "fb": "Where you cannot inspect internals, evidence must come from performance on your population plus contractual rights and a comparison model."
      },
      {
        "q": "Population stability monitoring is valuable primarily because:",
        "opts": [
          "It replaces the need for validation",
          "It is cheaper than backtesting",
          "Stability breaks typically precede performance breaks, providing early warning",
          "Regulators require it monthly"
        ],
        "a": 2,
        "fb": "Detecting that the input distribution has shifted gives you time to act before predictive performance visibly deteriorates."
      },
      {
        "q": "An institution builds internal workflows on an external foundation model. The additional model risk introduced is:",
        "opts": [
          "Only a data privacy risk",
          "None — external models are the vendor's responsibility",
          "Only a cost risk",
          "The provider may change, deprecate or reprice the model beneath a live process — requiring version pinning and fallback"
        ],
        "a": 3,
        "fb": "With 63% of firms building on external foundation models, provider change management becomes part of your own model risk framework."
      }
    ]
  },
  {
    "id": "a4",
    "tag": "Module 4",
    "time": "55 min",
    "title": "Explainable AI in Depth",
    "summary": "Why XAI fails in practice, and how to make it work",
    "objectives": [
      "Understand the accuracy–interpretability trade-off and when it is real versus assumed",
      "Distinguish interpretable models from post-hoc explanation, and know when each is appropriate",
      "Apply SHAP, LIME and counterfactual explanations, and understand their limitations",
      "Recognise the 'explaining the explanation' problem",
      "Design stakeholder-specific explanations for customers, front-line staff, validators and supervisors",
      "Understand why XAI implementation fails for organisational rather than technical reasons"
    ],
    "sections": [
      {
        "h": "The implementation gap in explainability",
        "html": "\n        <p>A 2026 systematic literature review in <em>Applied Artificial Intelligence</em> — <strong>Explainable Artificial Intelligence in the Banking Sector</strong> by Tuge and Msweli — synthesises <strong>78 peer-reviewed studies and industry reports from 2021 to 2025</strong> using PRISMA 2020 methodology. Its central finding is uncomfortable and important:</p>\n        <p>There is a <strong>persistent gap between XAI's technical promise and its operational deployment in banking</strong>. The literature extensively documents XAI's potential to enhance transparency, regulatory compliance and trust. Yet the review finds that technical challenges are <em>\"compounded by more fundamental organisational and cultural barriers\"</em> — resistance to change, misalignment between technical teams and business units, and the absence of standardised evaluation frameworks.</p>\n        <p>Their conclusion should shape how your institution approaches this: <strong>XAI must evolve from a technical add-on to an embedded organisational capability</strong>, requiring structural change in how banks approach AI governance, stakeholder communication and ethical oversight.</p>"
      },
      {
        "h": "The accuracy–interpretability trade-off, examined properly",
        "html": "\n        <p>The conventional claim is that more accurate models are less interpretable. The review identifies this trade-off as a genuine technical challenge — but practitioners should hold it more sceptically than the phrase suggests.</p>\n        <ul class=\"body\">\n          <li><strong>The trade-off is often smaller than assumed.</strong> On well-structured tabular credit data, a carefully built logistic regression frequently performs within a few Gini points of a gradient-boosted model. The marginal gain may not survive the explainability cost.</li>\n          <li><strong>It is largest where data is unstructured</strong> — documents, images, voice, free text. Here deep models genuinely dominate and interpretable alternatives do not exist.</li>\n          <li><strong>Constrained interpretable models</strong> — generalised additive models, monotonic gradient boosting, scorecards derived from complex models — occupy useful middle ground and are under-used in practice.</li>\n        </ul>\n        <p>The professional discipline is to <strong>measure the trade-off rather than assume it</strong>. Build the interpretable benchmark first. If the complex model cannot beat it materially, the decision is made for you.</p>"
      },
      {
        "h": "Interpretable by design versus explained after the fact",
        "html": "\n        <p>Two fundamentally different strategies, frequently conflated:</p>\n        <ul class=\"body\">\n          <li><strong>Intrinsically interpretable models.</strong> Logistic regression, scorecards, shallow decision trees, rule sets. The model <em>is</em> the explanation. Nothing can diverge, because there is no separate explanatory artefact.</li>\n          <li><strong>Post-hoc explanation.</strong> A complex model is built, then a second technique approximates why it produced a given output. SHAP, LIME and counterfactuals fall here.</li>\n        </ul>\n        <p>The critical difference is that <strong>post-hoc explanations are approximations of the model, not descriptions of it</strong>. They can be unstable — small input changes producing materially different explanations — and two methods can attribute importance differently for the same prediction. For a regulated adverse decision, that is a genuine exposure.</p>"
      },
      {
        "h": "The techniques, and what each is actually for",
        "html": "\n        <ul class=\"body\">\n          <li><strong>SHAP (Shapley Additive Explanations).</strong> Attributes a prediction to each feature using a game-theoretic allocation. Strengths: consistent, additive, supports both global and local views. Limitations: computationally expensive at scale, and correlated features can distribute credit in ways that mislead a non-technical reader.</li>\n          <li><strong>LIME.</strong> Fits a simple local surrogate around one prediction. Strengths: intuitive, model-agnostic, fast. Limitations: sensitive to sampling choices, and explanations can vary between runs — which is difficult to defend if a customer challenges a decision twice.</li>\n          <li><strong>Counterfactual explanations.</strong> \"Had your total exposure been below X, the application would have been approved.\" Strengths: directly actionable, closest to what a declined customer actually wants, and naturally aligned with adverse-action reasoning. Limitations: must be constrained to realistic, permissible changes — a counterfactual suggesting the applicant change age or district is both useless and legally hazardous.</li>\n          <li><strong>Global techniques</strong> — feature importance, partial dependence, accumulated local effects — describe overall model behaviour for validators and supervisors rather than individual decisions.</li>\n        </ul>\n        <p>For most banking purposes, <strong>counterfactuals communicate best to customers and SHAP communicates best to validators.</strong> Institutions that pick one technique for all audiences serve none of them well.</p>"
      },
      {
        "h": "The 'explaining the explanation' problem",
        "html": "\n        <p>The literature review names a failure mode that experienced practitioners recognise immediately: the explanation itself requires expertise to interpret.</p>\n        <p>A SHAP waterfall plot is meaningful to a data scientist. Presented to a branch manager, a declined customer or a supervisor unfamiliar with the method, it does not explain — it transfers the opacity one level up while creating an appearance of transparency. The institution can now say it provides explanations; nobody outside the modelling team can actually use them.</p>\n        <div class=\"callout warn\"><h4>The practical test</h4><p style=\"margin:0\">An explanation is adequate only if the intended recipient can <strong>act on it or challenge it</strong>. A declined applicant should learn what to change. A relationship manager should be able to hold a credible conversation. A validator should be able to identify an unreasonable dependency. A supervisor should be able to assess fairness. If your explanation does none of these for the person receiving it, you have documentation rather than explainability.</p></div>"
      },
      {
        "h": "Designing explanations by stakeholder",
        "html": "\n        <p>Four audiences, four requirements — this is the design discipline the literature calls <em>context-aware explanation design</em>:</p>\n        <ul class=\"body\">\n          <li><strong>The customer.</strong> Plain language, few factors, actionable. \"Your application was declined primarily because of the level of existing borrowing relative to income, and a limited repayment history with us.\" Counterfactual where possible.</li>\n          <li><strong>Front-line staff.</strong> Enough to hold a credible conversation and to recognise when the model may be wrong, plus a defined route to escalate an override.</li>\n          <li><strong>Model validators and risk.</strong> Global behaviour, feature dependencies, subgroup performance, stability of explanations, sensitivity analysis.</li>\n          <li><strong>Supervisors, including NRB.</strong> Evidence that the model is transparent, explainable, fair and accountable — the framework's stated requirements — supported by documented methodology, validation, monitoring and named accountability.</li>\n        </ul>"
      },
      {
        "h": "Why implementation fails, and what fixes it",
        "html": "\n        <p>The review is emphatic that the barriers are principally organisational. The failure patterns:</p>\n        <ul class=\"body\">\n          <li><strong>Resistance to change</strong> — explanation obligations perceived as an impediment to deployment rather than a condition of it.</li>\n          <li><strong>Misalignment between technical teams and business units</strong> — data scientists produce explanations that satisfy technical review while business users still cannot use them.</li>\n          <li><strong>No standardised evaluation framework</strong> — no agreed definition of what makes an explanation adequate, so adequacy is asserted rather than tested.</li>\n        </ul>\n        <p>The remedies the literature points toward are structural: <strong>interdisciplinary collaboration</strong> between modelling, business, risk and compliance from design onward; <strong>context-aware explanation design</strong> as described above; and <strong>human-centric governance</strong> that treats explanation as a product requirement with acceptance criteria, not a documentation task completed at the end.</p>\n        <p>Practically: define, before development begins, who must be able to understand what — and test the explanation with those people before the model goes live. An explanation that has never been shown to a branch manager should not be assumed to work for one.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: build the interpretable benchmark first",
      "text": "Before approving development of a complex model for any regulated decision, require the team to build a well-specified interpretable benchmark — a proper scorecard or constrained model — and report its performance. Two things follow. If the complex model does not beat it materially, you have avoided an unnecessary explainability burden. If it does, you have quantified exactly what you are buying with the added opacity, which is precisely the evidence a supervisor will want to see."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take one model-assisted decision at your institution and write four explanations of the same declined case: one for the customer, one for the relationship manager, one for a validator, one for a supervisor. Then test the first two on someone in that role who was not involved. Most institutions discover their existing explanation serves only the modelling team — and that discovery is the point of the exercise."
    },
    "takeaways": [
      "A 2026 systematic review of 78 studies finds XAI's barriers are principally organisational, not technical",
      "Measure the accuracy–interpretability trade-off rather than assuming it; build the interpretable benchmark first",
      "Post-hoc explanations approximate the model and can be unstable — intrinsically interpretable models cannot diverge",
      "Counterfactuals communicate best to customers; SHAP communicates best to validators",
      "The 'explaining the explanation' problem transfers opacity upward while appearing transparent",
      "An explanation is adequate only if the recipient can act on it or challenge it",
      "XAI must become an embedded organisational capability with acceptance criteria, not a documentation task"
    ],
    "quiz": [
      {
        "q": "The 2026 systematic literature review on XAI in banking concludes that the principal barriers to adoption are:",
        "opts": [
          "Organisational and cultural — resistance to change, business-technical misalignment, and no standardised evaluation frameworks",
          "Insufficient computing power",
          "Regulatory prohibition",
          "Purely technical — the algorithms do not work"
        ],
        "a": 0,
        "fb": "Technical challenges are real but the review finds they are compounded by more fundamental organisational barriers, requiring structural change."
      },
      {
        "q": "Which explanation type is generally most useful to a declined loan applicant?",
        "opts": [
          "Global feature importance rankings",
          "A counterfactual explanation stating what would need to change for approval",
          "A SHAP waterfall plot",
          "The model's AUC"
        ],
        "a": 1,
        "fb": "Counterfactuals are actionable and align naturally with adverse-action reasoning — provided they are constrained to realistic, permissible changes."
      },
      {
        "q": "The 'explaining the explanation' problem refers to:",
        "opts": [
          "Explanations written in a foreign language",
          "Models that produce no output",
          "Explanations that themselves require expertise to interpret, transferring opacity upward while appearing transparent",
          "Duplicate documentation"
        ],
        "a": 2,
        "fb": "A SHAP plot shown to a branch manager or customer creates the appearance of transparency without delivering usable understanding."
      },
      {
        "q": "A key limitation of LIME that matters for regulated decisions is:",
        "opts": [
          "It cannot be used on tabular data",
          "It only works on images",
          "It requires the source code of the model",
          "Explanations can vary between runs due to sampling, which is hard to defend if a customer challenges a decision twice"
        ],
        "a": 3,
        "fb": "Instability in post-hoc explanations is a genuine exposure where a bank must give a consistent reason for an adverse decision."
      },
      {
        "q": "Before approving a complex model for a regulated credit decision, best practice is to:",
        "opts": [
          "Build a well-specified interpretable benchmark first and quantify what the added opacity buys",
          "Skip validation to save time",
          "Approve it if the vendor's AUC is high",
          "Choose the model with the most parameters"
        ],
        "a": 0,
        "fb": "If the complex model does not beat the interpretable benchmark materially, you avoid an unnecessary explainability burden; if it does, you have evidenced the trade-off."
      },
      {
        "q": "A counterfactual explanation suggesting an applicant would have been approved 'if you lived in a different district' is:",
        "opts": [
          "Helpful and actionable",
          "Useless and legally hazardous — counterfactuals must be constrained to realistic, permissible changes",
          "Best practice for transparency",
          "Required under NRB guidelines"
        ],
        "a": 1,
        "fb": "Counterfactuals must be restricted to attributes the customer can legitimately change; otherwise they expose the institution to discrimination findings."
      }
    ]
  },
  {
    "id": "a5",
    "tag": "Module 5",
    "time": "55 min",
    "title": "Foundation Models, LLMOps & the Modern AI Stack",
    "summary": "Building on external models without losing control",
    "objectives": [
      "Distinguish foundation models from large language models and understand what pre-training implies",
      "Evaluate build, buy, customise and fine-tune as strategic options",
      "Understand the modern generative AI stack and how it differs from the predictive AI stack",
      "Design evaluation harnesses and guardrails appropriate to a regulated institution",
      "Manage foundation-model dependency, vendor concentration and version risk",
      "Understand the economics of inference and where cost actually accumulates"
    ],
    "sections": [
      {
        "h": "Foundation models and large language models — the distinction matters",
        "html": "\n        <p>BCG's <em>Banking on Generative AI</em> draws a distinction that is frequently blurred and has procurement consequences:</p>\n        <ul class=\"body\">\n          <li><strong>Foundation models (FMs)</strong> are pre-trained on large datasets with substantial compute, ready to use without additional training, and applicable to many tasks — generating text or graphics, predicting, or classifying.</li>\n          <li><strong>Large language models (LLMs)</strong> are a <em>subset</em> of foundation models that ingest and produce text.</li>\n        </ul>\n        <p>As BCG states plainly, the terms are not interchangeable. The practical significance is that an institution's generative capability may involve models handling documents, images and structured data, not only chat. Procurement, governance and risk frameworks written narrowly around \"chatbots\" will not cover what is actually deployed.</p>"
      },
      {
        "h": "A separate stack, not an extension of the old one",
        "html": "\n        <p>One of the most useful corrections in BCG's analysis is that classic predictive AI and generative AI run on <strong>largely separate technology stacks</strong>.</p>\n        <ul class=\"body\">\n          <li><strong>Predictive stack:</strong> data warehouse, feature store, model training pipelines, MLOps, model serving, monitoring. Requires mature, structured data.</li>\n          <li><strong>Generative stack:</strong> foundation models (hosted or self-run), embedding models, vector stores, caches, retrieval pipelines, prompt and agent orchestration, guardrails, model abstraction layers. Requires <em>documents</em> more than warehouses.</li>\n        </ul>\n        <p>The only major shared component is the data lake or document store. This is why the common objection — \"our data isn't ready for AI\" — is only half right. It is decisive for a new credit scorecard. It is much less binding for document processing, policy assistants or drafting support, which can proceed in parallel with data remediation.</p>"
      },
      {
        "h": "Build, buy, customise: the strategic decision",
        "html": "\n        <p>The Cambridge data shows what the industry has actually chosen: <strong>63% of industry respondents and 65% of regulators use internal workflows built on external foundation models</strong>, though many also customise or develop some systems in-house. Training a foundation model from scratch is not a realistic option for any Nepali institution, and is increasingly not one for most global banks either.</p>\n        <p>The meaningful options, in ascending order of cost and control:</p>\n        <ol class=\"body\">\n          <li><strong>Prompt engineering on a hosted model.</strong> Fastest, cheapest, no training. Surprisingly capable. The correct starting point for almost every use case.</li>\n          <li><strong>Retrieval-augmented generation.</strong> Ground responses in your own documents. Covered in the foundational programme; the default architecture for regulated knowledge work.</li>\n          <li><strong>Fine-tuning.</strong> Adapting a model's behaviour on your own examples. Useful for consistent formatting, house style or a specialised task — rarely for teaching facts, which retrieval does better and updates more easily.</li>\n          <li><strong>Self-hosted open-weight models.</strong> Full data control, no external dependency, higher infrastructure and skills cost. Increasingly viable and relevant where data residency is a hard requirement.</li>\n        </ol>\n        <div class=\"callout note\"><h4>Deeper dive: fine-tuning is usually the wrong first answer</h4><p style=\"margin:0\">Teams reach for fine-tuning because it feels like real engineering. In practice, most problems attributed to model capability are prompt or retrieval problems. Fine-tuning bakes knowledge into weights that then require re-tuning when policy changes, whereas retrieval updates the moment you update the document. Exhaust prompting and retrieval before fine-tuning, and be explicit about what fine-tuning is meant to fix.</p></div>"
      },
      {
        "h": "Evaluation harnesses — validation for systems that produce text",
        "html": "\n        <p>You cannot compute a Gini coefficient for a drafting assistant. Institutional discipline requires an <strong>evaluation harness</strong>: a fixed, versioned set of representative tasks with known-good answers, run automatically against every model or prompt change.</p>\n        <p>A workable harness for a banking deployment includes:</p>\n        <ul class=\"body\">\n          <li><strong>Golden set.</strong> 50–200 real, de-identified cases with agreed correct outputs, curated with the business.</li>\n          <li><strong>Factual grounding checks.</strong> Does the output cite retrieved source material, and does the citation genuinely support the claim?</li>\n          <li><strong>Refusal and boundary tests.</strong> Does it decline requests it should decline — advice it is not permitted to give, data it should not disclose?</li>\n          <li><strong>Adversarial prompts.</strong> Including prompt-injection attempts embedded in documents the system processes.</li>\n          <li><strong>Regression testing.</strong> Rerun on every change. Providers update models; behaviour shifts without notice.</li>\n          <li><strong>Human review sampling.</strong> A standing percentage of live outputs reviewed and scored, feeding back into the golden set.</li>\n        </ul>\n        <p>The Cambridge study identifies <strong>model hallucinations</strong> among the most-cited risks by both industry and regulators. An evaluation harness is the operational answer, and it is what a supervisor will ask to see.</p>"
      },
      {
        "h": "Guardrails and the control layer",
        "html": "\n        <p>Guardrails sit between the model and the user, and between the model and your systems:</p>\n        <ul class=\"body\">\n          <li><strong>Input filtering</strong> — blocking or redacting customer identifiers before they reach an external model.</li>\n          <li><strong>Output validation</strong> — schema checks, forbidden-content checks, and verification that cited sources exist.</li>\n          <li><strong>Tool and action constraints</strong> — an assistant able to query balances must not be able to move money.</li>\n          <li><strong>Rate and cost limits</strong> — protecting against runaway loops, particularly in agentic systems.</li>\n          <li><strong>Comprehensive logging</strong> — prompt, retrieved context, output, model version, user, timestamp. Without this you cannot investigate an incident.</li>\n        </ul>\n        <p>A model abstraction layer — a thin internal interface through which all model calls pass — is worth building early. It makes provider substitution, version pinning, logging and cost control a configuration change rather than a rewrite across dozens of applications.</p>"
      },
      {
        "h": "Vendor concentration and dependency risk",
        "html": "\n        <p>The Cambridge survey documents a genuine concentration:</p>\n        <ul class=\"body\">\n          <li><strong>OpenAI</strong> is the most-used foundation model provider — <strong>76% of industry respondents</strong> and 48% of regulators.</li>\n          <li><strong>Google</strong> follows at 57% of industry, <strong>Anthropic</strong> at 35% of industry and 33% of vendors, <strong>DeepSeek</strong> at 15% of industry.</li>\n          <li>In cloud, <strong>AWS leads industry at 46%</strong>; among regulators using cloud, Azure leads at 39%; and <strong>46% of regulators report using no cloud infrastructure at all</strong>.</li>\n        </ul>\n        <p>Concentration creates risks that belong on a risk register, not only in a procurement file: correlated outage across the sector; unilateral changes to model behaviour, pricing or terms; deprecation of a version a live process depends on; and jurisdictional exposure where processing occurs abroad.</p>\n        <p>Practical mitigations: pin model versions explicitly; maintain a tested fallback provider or self-hosted option for critical paths; keep prompts and retrieval logic portable rather than provider-specific; and negotiate notice periods for material model changes.</p>"
      },
      {
        "h": "The economics of inference",
        "html": "\n        <p>Predictive AI concentrates cost in training; generative AI concentrates it in <strong>inference</strong> — you pay per use, forever. This inverts capital planning, and pilots systematically understate it because pilot volumes are small.</p>\n        <p>Where cost accumulates, and the levers that matter:</p>\n        <ul class=\"body\">\n          <li><strong>Context length.</strong> Retrieving twenty documents when three would do multiplies cost on every call. Retrieval quality is a cost lever, not only an accuracy one.</li>\n          <li><strong>Model selection by task.</strong> Routing simple classification to a small model and reserving the largest model for genuinely hard reasoning is the single largest saving available.</li>\n          <li><strong>Caching.</strong> Repeated or near-identical queries should not trigger repeated inference.</li>\n          <li><strong>Agentic loops.</strong> An agent that reasons across multiple steps may make many calls per task — the cost driver examined in Module 6.</li>\n        </ul>\n        <p>Model the cost at realistic production volume before committing, and include it in the business case. An assistant that is delightful at 50 users per day can be indefensible at 5,000.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: build the harness before the pilot",
      "text": "Insist that any generative AI proposal arrives with its evaluation harness defined — the golden set, who curated it, and the pass thresholds — before the pilot begins. Teams resist this because it delays the demonstration by a fortnight. It is also the only thing that lets you distinguish a genuinely improved system from a differently-phrased one, and the only artefact that will satisfy a supervisor asking how you assure output quality."
    },
    "activity": {
      "title": "Workplace application",
      "text": "For one generative AI use case in your institution, specify: the four stack components it requires; whether you are prompting, retrieving, fine-tuning or self-hosting and why; twenty golden-set cases you would use to evaluate it; the three guardrails you would implement; and the estimated monthly inference cost at full production volume. If the cost estimate surprises you, that is the module working."
    },
    "takeaways": [
      "Foundation models and LLMs are not interchangeable — LLMs are the text subset of a broader class",
      "Generative AI runs on a separate stack from predictive AI; weak data warehouses do not block document-centric use cases",
      "63% of firms build internal workflows on external foundation models; training from scratch is not a realistic option",
      "Exhaust prompting and retrieval before fine-tuning; retrieval updates instantly, fine-tuning does not",
      "An evaluation harness with a golden set is the operational answer to hallucination risk and what supervisors will request",
      "Vendor concentration is real — OpenAI 76% of industry — requiring version pinning, fallback and portable logic",
      "Generative AI concentrates cost in inference; model routing and retrieval quality are the main cost levers"
    ],
    "quiz": [
      {
        "q": "The relationship between foundation models and large language models is:",
        "opts": [
          "They are unrelated technologies",
          "They are interchangeable terms",
          "LLMs are a subset of foundation models — the ones that ingest and produce text",
          "Foundation models are a subset of LLMs"
        ],
        "a": 2,
        "fb": "BCG is explicit that the terms are not interchangeable. Governance written only around chatbots will not cover document, image and classification models."
      },
      {
        "q": "An institution has a weak data warehouse. Which conclusion is correct?",
        "opts": [
          "No AI work can begin until it is fixed",
          "Only cloud providers can solve this",
          "Generative AI is impossible without a warehouse",
          "It is decisive for a new credit scorecard but much less binding for document processing or policy assistants, which use a different stack"
        ],
        "a": 3,
        "fb": "Generative AI depends on documents, embeddings, vector stores and retrieval — largely a separate stack from the predictive AI data warehouse."
      },
      {
        "q": "A team proposes fine-tuning a model so it 'knows' the bank's current lending policy. The better approach is usually:",
        "opts": [
          "Retrieval-augmented generation, because it updates the moment the policy document changes",
          "Buying a larger model",
          "Fine-tuning, as proposed",
          "Training a foundation model from scratch"
        ],
        "a": 0,
        "fb": "Fine-tuning bakes knowledge into weights requiring re-tuning when policy changes. Retrieval keeps facts external and current."
      },
      {
        "q": "The primary operational control against hallucination in a regulated deployment is:",
        "opts": [
          "Asking users to be careful",
          "An evaluation harness with a versioned golden set, grounding checks and regression testing on every change",
          "Disabling logging",
          "Choosing the largest available model"
        ],
        "a": 1,
        "fb": "You cannot compute a Gini for a text system. A harness is how you evidence output quality to yourself and to a supervisor."
      },
      {
        "q": "According to the Cambridge survey, the most-used foundation model provider among industry respondents is:",
        "opts": [
          "DeepSeek, at 15%",
          "No provider exceeds 20%",
          "OpenAI, at 76%",
          "Anthropic, at 35%"
        ],
        "a": 2,
        "fb": "OpenAI leads at 76% of industry respondents, followed by Google at 57% and Anthropic at 35% — a concentration that belongs on the risk register."
      },
      {
        "q": "Compared with predictive AI, generative AI shifts cost toward:",
        "opts": [
          "Hardware purchase only",
          "Regulatory fees",
          "One-off training",
          "Inference — paid per use, indefinitely, and systematically understated by low-volume pilots"
        ],
        "a": 3,
        "fb": "Inference cost scales with usage and context length. Model routing by task difficulty is typically the largest available saving."
      }
    ]
  },
  {
    "id": "a6",
    "tag": "Module 6",
    "time": "55 min",
    "title": "Agentic AI in Banking",
    "summary": "Systems that act, and the controls they demand",
    "objectives": [
      "Define agentic AI precisely and distinguish it from assistants and automation",
      "Understand adoption trajectory and why agentic AI is the clearest growth frontier",
      "Describe agent architecture: planning, tools, memory and orchestration",
      "Apply a levels-of-autonomy framework to banking processes",
      "Identify agent-specific failure modes and design controls for them",
      "Determine which banking processes are suitable for agentic treatment and which are not"
    ],
    "sections": [
      {
        "h": "What makes a system agentic",
        "html": "\n        <p>An assistant responds to a request. An <strong>agent pursues a goal</strong>: it plans a sequence of steps, invokes tools, observes results, adapts, and continues until the objective is met or it stops. The distinguishing capabilities are <strong>planning, tool use, memory and autonomy over multiple steps</strong>.</p>\n        <p>The distinction from traditional automation matters. Robotic process automation follows a fixed script and breaks when the screen changes. An agent determines its own path, which makes it far more capable and considerably harder to govern — because you cannot enumerate in advance every sequence it might take.</p>"
      },
      {
        "h": "The adoption picture",
        "html": "\n        <p>The Cambridge 2026 data shows unusually rapid uptake:</p>\n        <ul class=\"body\">\n          <li><strong>52% of industry respondents are already in active adoption of agentic AI</strong>, with 23% at Scaling or Transforming and 29% piloting.</li>\n          <li>Fintechs again lead traditional institutions — <strong>57% versus 45%</strong>.</li>\n          <li><strong>81% of industry respondents expect agentic AI to be meaningfully achieved by 2030</strong>, making it the clearest growth frontier in AI technology.</li>\n        </ul>\n        <p>The report also notes that GenAI and agentic AI have lower engineering barriers than traditional machine learning methods, which explains the speed: an institution can deploy an agent without the labelled datasets, feature engineering and model training that a predictive model demands. That accessibility is exactly why governance must arrive early rather than after deployment.</p>"
      },
      {
        "h": "Agent architecture",
        "html": "\n        <p>Four components, each with control implications:</p>\n        <ul class=\"body\">\n          <li><strong>The planner.</strong> Decomposes a goal into steps. Typically a language model reasoning about what to do next. Its plan is generated, not fixed, so it must be constrained and logged.</li>\n          <li><strong>Tools.</strong> The functions the agent may invoke — query a database, call an API, send an email, create a case, execute a payment. <strong>The tool list defines the agent's maximum blast radius.</strong> This is the single most important control surface.</li>\n          <li><strong>Memory.</strong> Short-term working context plus, sometimes, longer-term storage. Memory introduces a subtle risk: an error recorded early can persist and contaminate later reasoning.</li>\n          <li><strong>The orchestrator.</strong> Manages the loop, enforces limits on steps and cost, handles failure, and decides when to stop or escalate.</li>\n        </ul>\n        <p>Multi-agent systems add specialised agents coordinating with one another. Powerful, and materially harder to audit — when an outcome is wrong, determining which agent's reasoning caused it is genuinely difficult.</p>"
      },
      {
        "h": "Levels of autonomy — the governance framework",
        "html": "\n        <p>The most useful control concept is to classify each deployment by autonomy level and require approval proportionate to it:</p>\n        <ol class=\"body\">\n          <li><strong>Level 0 — Suggest.</strong> The agent proposes; a human performs the action. No system access beyond reading.</li>\n          <li><strong>Level 1 — Draft and stage.</strong> The agent prepares a complete action — a populated case, a drafted response, a proposed journal entry — which a human reviews and releases.</li>\n          <li><strong>Level 2 — Act within limits.</strong> The agent executes autonomously within tightly defined boundaries: value thresholds, customer segments, transaction types. Everything outside escalates.</li>\n          <li><strong>Level 3 — Act with exception reporting.</strong> The agent acts routinely; humans review exceptions and samples after the fact.</li>\n          <li><strong>Level 4 — Fully autonomous.</strong> Appropriate only for reversible, low-materiality, well-bounded processes with strong monitoring.</li>\n        </ol>\n        <p>For any process affecting customer funds, credit decisions, regulatory reporting or financial crime disposition, <strong>Level 1 or Level 2 with hard limits is the defensible position today</strong>. Level 2 limits should be expressed in the same terms as a delegated authority — because that is exactly what they are.</p>"
      },
      {
        "h": "Agent-specific failure modes",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Goal misinterpretation.</strong> The agent optimises what was asked rather than what was meant. An agent told to reduce open cases may close them without resolution.</li>\n          <li><strong>Compounding error.</strong> A wrong conclusion at step two becomes an assumption at steps three through nine. Small initial errors produce large final ones.</li>\n          <li><strong>Runaway loops.</strong> The agent retries indefinitely, consuming cost and, worse, repeatedly triggering downstream actions. Hard step and spend limits are mandatory.</li>\n          <li><strong>Tool misuse.</strong> Invoking a legitimate tool in an inappropriate context — the correct API, the wrong account.</li>\n          <li><strong>Prompt injection through data.</strong> The most serious agentic risk. Instructions concealed in a document, email or web page the agent processes cause it to ignore its constraints. An agent that both reads external content <em>and</em> holds powerful tools is a genuine security exposure.</li>\n          <li><strong>Attribution failure.</strong> In multi-agent systems, tracing a bad outcome to a specific decision may be impractical — which undermines both remediation and accountability.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The design rule that follows</h4><p style=\"margin:0\">Separate <strong>reading untrusted content</strong> from <strong>holding powerful tools</strong>. An agent that ingests external documents should have read-only capabilities. An agent with write or transactional authority should operate only on trusted, validated inputs. Combining both in one agent is the architectural equivalent of granting internet-sourced instructions your payment authority.</p></div>"
      },
      {
        "h": "Where agentic AI genuinely fits in banking",
        "html": "\n        <p>Strong candidates share a profile: multi-step, rule-bounded, high-volume, reversible, and with a clear definition of done.</p>\n        <ul class=\"body\">\n          <li><strong>Financial crime investigation preparation.</strong> Assembling the case file — transaction history, related parties, prior alerts, adverse media, KYC documents — so the investigator begins with a complete picture rather than assembling one. The human still decides.</li>\n          <li><strong>Credit file assembly.</strong> Gathering statements, spreads, covenant checks and portfolio context into a structured pack for the analyst.</li>\n          <li><strong>Reconciliation and exception handling.</strong> Investigating breaks, proposing resolutions, escalating what it cannot resolve.</li>\n          <li><strong>Regulatory change mapping.</strong> Reading a new circular, identifying affected policies and controls, drafting a gap list for compliance review.</li>\n          <li><strong>Customer service resolution</strong> within defined limits — the pattern from the foundational programme, with a deterministic core making any binding decision.</li>\n        </ul>\n        <p>Poor candidates: anything irreversible, anything where \"done\" is a matter of judgement, anything involving a final credit or suspicious-activity determination, and anything where the agent would need to read untrusted external content while holding transactional authority.</p>"
      },
      {
        "h": "Controls a supervisor would expect",
        "html": "\n        <ol class=\"body\">\n          <li><strong>Tool inventory per agent</strong> — documented, approved, minimal.</li>\n          <li><strong>Hard limits</strong> on steps, spend, value and volume, enforced by the orchestrator rather than requested in the prompt.</li>\n          <li><strong>Complete action logging</strong> — every tool call with inputs, outputs and the reasoning that led to it.</li>\n          <li><strong>A kill switch</strong> with named authority to use it, tested rather than assumed.</li>\n          <li><strong>Human checkpoints</strong> at defined materiality thresholds.</li>\n          <li><strong>Segregation</strong> of untrusted-input agents from privileged-tool agents.</li>\n          <li><strong>Regular sampling</strong> of completed agent work, with results feeding the evaluation harness.</li>\n        </ol>\n        <p>The Cambridge study found that respondents cite <strong>loss of human oversight</strong> among the leading AI risks. Agentic systems are where that concern becomes concrete, and where the controls above are the difference between an oversight failure and a governed capability.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the tool list is the control",
      "text": "When reviewing any agentic proposal, ask for the <em>tool list</em> before anything else — the exact functions the agent may invoke. Prompts can be circumvented; tools cannot be invoked if they were never granted. An agent that cannot call a payment API cannot make a payment, regardless of what instructions it encounters. Governing the tool list is more effective than governing the prompt, and far easier to evidence."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Select one multi-step process in your department. Specify: the goal an agent would pursue; the exact tools it would need; the autonomy level you would approve and why; the hard limits (steps, value, volume); where a human checkpoint sits; and what would trigger the kill switch. Then apply the segregation test — would this agent read any untrusted external content while holding write authority? If yes, redesign it before proceeding."
    },
    "takeaways": [
      "Agents plan, use tools, hold memory and act over multiple steps — unlike assistants or fixed-script automation",
      "52% of firms are in active agentic adoption and 81% expect it meaningfully achieved by 2030",
      "The tool list defines the agent's maximum blast radius and is the primary control surface",
      "Classify deployments by autonomy level; Level 1 or Level 2 with hard limits is defensible for material processes",
      "Prompt injection through processed content is the most serious agentic risk",
      "Never combine reading untrusted content with holding powerful tools in the same agent",
      "Good candidates are multi-step, rule-bounded, reversible and have a clear definition of done"
    ],
    "quiz": [
      {
        "q": "What distinguishes an agentic system from an AI assistant?",
        "opts": [
          "It pursues a goal across multiple steps using planning, tools and memory, adapting as it goes",
          "It requires no prompts",
          "It runs on cloud infrastructure",
          "It uses a larger model"
        ],
        "a": 0,
        "fb": "Agents determine their own path to a goal, which makes them more capable and harder to govern than fixed-script automation."
      },
      {
        "q": "The most effective control surface for an agentic deployment is:",
        "opts": [
          "The user interface design",
          "The tool list — the exact functions the agent is permitted to invoke",
          "The model's parameter count",
          "The wording of the system prompt"
        ],
        "a": 1,
        "fb": "Prompts can be circumvented; an agent cannot invoke a tool it was never granted. The tool list defines the maximum blast radius."
      },
      {
        "q": "An agent processes incoming supplier emails and also holds authority to initiate payments. This design is:",
        "opts": [
          "Efficient and appropriate",
          "Required for straight-through processing",
          "A serious exposure — reading untrusted content must be segregated from holding powerful tools",
          "Safe if the model is large enough"
        ],
        "a": 2,
        "fb": "Prompt injection concealed in processed content could direct the agent's payment authority. Segregation is the architectural rule."
      },
      {
        "q": "For a process affecting customer funds or credit decisions, the defensible autonomy level today is:",
        "opts": [
          "Level 4 — fully autonomous",
          "Level 3 with annual review",
          "No AI involvement at all",
          "Level 1 or Level 2 with hard limits expressed like a delegated authority"
        ],
        "a": 3,
        "fb": "Draft-and-stage, or act-within-tightly-defined-limits, keeps a human accountable for material outcomes while capturing efficiency."
      },
      {
        "q": "'Compounding error' in an agentic system refers to:",
        "opts": [
          "An incorrect conclusion at an early step becoming an assumption for all subsequent steps",
          "Duplicate log entries",
          "Rising licence costs",
          "Multiple agents disagreeing"
        ],
        "a": 0,
        "fb": "Because each step builds on the last, small initial errors can produce large final ones — which is why step limits and checkpoints matter."
      },
      {
        "q": "According to the Cambridge study, agentic AI adoption among industry respondents currently stands at approximately:",
        "opts": [
          "Under 1%",
          "52% in active adoption, with 81% expecting it meaningfully achieved by 2030",
          "5% with no growth expected",
          "95% fully deployed"
        ],
        "a": 1,
        "fb": "Rapid uptake reflects lower engineering barriers than traditional ML — which is precisely why governance must arrive early."
      }
    ]
  },
  {
    "id": "a7",
    "tag": "Module 7",
    "time": "55 min",
    "title": "Advanced Credit Risk & Capital",
    "summary": "IFRS 9, stress testing, fairness and the regulated credit model",
    "objectives": [
      "Apply AI across the credit risk parameter set: PD, LGD and EAD",
      "Understand IFRS 9 expected credit loss and where machine learning legitimately contributes",
      "Understand the role of models in stress testing and scenario analysis",
      "Design champion–challenger programmes that generate defensible evidence",
      "Conduct rigorous fairness testing appropriate to a regulated lender",
      "Understand reject inference, through-the-cycle versus point-in-time, and other advanced modelling considerations"
    ],
    "sections": [
      {
        "h": "The credit parameter set",
        "html": "\n        <p>Advanced credit work requires precision about which quantity is being modelled, because each has different data requirements and regulatory sensitivity:</p>\n        <ul class=\"body\">\n          <li><strong>Probability of default (PD)</strong> — the likelihood of default within a defined horizon. The most modelled and most data-rich parameter.</li>\n          <li><strong>Loss given default (LGD)</strong> — the proportion of exposure lost when default occurs. Depends on collateral, recovery process and time to recovery. Data is scarcer because only defaulted accounts contribute, and recovery outcomes take years to observe.</li>\n          <li><strong>Exposure at default (EAD)</strong> — the amount outstanding at the moment of default, which for revolving facilities requires modelling drawdown behaviour as a borrower deteriorates.</li>\n        </ul>\n        <p>Machine learning has contributed most to PD, where data is plentiful. LGD and EAD remain harder, and models there are typically simpler by necessity — a point worth remembering when a vendor claims uniform improvement across all three.</p>"
      },
      {
        "h": "IFRS 9 and expected credit loss",
        "html": "\n        <p>IFRS 9 requires <strong>forward-looking expected credit loss</strong> provisioning rather than incurred loss, with exposures allocated across three stages by change in credit risk since origination, and lifetime ECL recognised from Stage 2 onward.</p>\n        <p>This creates specific modelling demands where AI can contribute — and specific constraints:</p>\n        <ul class=\"body\">\n          <li><strong>Lifetime PD term structures</strong> rather than a twelve-month point estimate.</li>\n          <li><strong>Significant increase in credit risk (SICR)</strong> determination — the trigger for Stage 2. Behavioural models can inform this, but the criteria must be explainable and consistently applied.</li>\n          <li><strong>Forward-looking macroeconomic scenarios</strong> with probability weights, requiring the model to respond sensibly to economic inputs.</li>\n        </ul>\n        <p><strong>The constraint that matters:</strong> ECL flows directly into the financial statements and is audited. This makes <strong>calibration and explainability non-negotiable</strong>, and it is why many institutions retain interpretable models for ECL while using machine learning for early warning and origination. That is a defensible architecture, not a failure of ambition.</p>"
      },
      {
        "h": "Stress testing and scenario analysis",
        "html": "\n        <p>Stress testing asks how the portfolio behaves under adverse conditions. It exposes a structural weakness in data-driven models: <strong>a model trained on benign conditions has never observed the scenario you most need it to predict.</strong></p>\n        <p>Practical implications:</p>\n        <ul class=\"body\">\n          <li><strong>Extrapolation is unreliable.</strong> Complex models can behave erratically outside their training range. Interpretable models with economically sensible coefficients often extrapolate more defensibly, even if they fit historical data less tightly.</li>\n          <li><strong>Sensitivity must be plausible.</strong> If unemployment rises three points, default rates should move in a direction and magnitude a credit officer finds reasonable. Test this explicitly.</li>\n          <li><strong>Overlays are expected here.</strong> Where history is unrepresentative, documented judgemental adjustment is legitimate — subject to the governance in Module 3.</li>\n        </ul>\n        <p>SAS's research quotes a chief risk officer at Millennium BCP describing models developed <em>\"to help us better prepare for adverse scenarios in the next five years... so if an economic crisis arises, we can more effectively mitigate the effects of a rise in defaults.\"</em> That is the correct framing: preparation and mitigation, not prediction of the unpredictable.</p>"
      },
      {
        "h": "Champion–challenger, done properly",
        "html": "\n        <p>Champion–challenger is the mechanism that lets an institution adopt better models without unmanaged risk. Done well it requires discipline:</p>\n        <ol class=\"body\">\n          <li><strong>The champion continues to decide.</strong> The challenger runs in parallel, scoring the same applications without influencing outcomes.</li>\n          <li><strong>Compare on the same population over the same period</strong> — differences in either invalidate the comparison.</li>\n          <li><strong>Allow sufficient outcome maturity.</strong> Judging a credit model before the outcome window has elapsed measures nothing. For most retail portfolios this means twelve to eighteen months minimum.</li>\n          <li><strong>Pre-specify the promotion criteria.</strong> What improvement, on which metrics, sustained over what period, justifies switching? Agreeing this after seeing results invites motivated reasoning.</li>\n          <li><strong>Evaluate beyond discrimination</strong> — calibration, stability, fairness across segments, and explainability adequacy all form part of the decision.</li>\n        </ol>\n        <p>A rigorous champion–challenger programme is also the strongest possible evidence to a supervisor that model change is controlled rather than opportunistic.</p>"
      },
      {
        "h": "Fairness testing for a regulated lender",
        "html": "\n        <p>Module 3 of the foundational programme introduced proxy discrimination. At an advanced level, three refinements matter:</p>\n        <ul class=\"body\">\n          <li><strong>Fairness definitions conflict mathematically.</strong> Demographic parity (equal approval rates), equalised odds (equal error rates) and calibration within groups generally cannot all hold simultaneously when base rates differ. This is a proven result, not an engineering shortfall. The institution must therefore <strong>choose and justify</strong> a fairness criterion rather than claim to satisfy all of them.</li>\n          <li><strong>Test error rates, not only approval rates.</strong> Two groups can have identical approval rates while the model is markedly less accurate for one — which is a different and often more serious harm.</li>\n          <li><strong>Proxy detection is empirical.</strong> Attempt to predict the protected attribute from the model's inputs. If it is predictable with meaningful accuracy, proxies are present and must be addressed.</li>\n        </ul>\n        <p>NRB's guidelines require AI applications to be fair and non-discriminatory. Documented, repeated fairness testing with a justified criterion is how that requirement is evidenced. Testing once at build time and never again does not meet it.</p>"
      },
      {
        "h": "Advanced modelling considerations",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Reject inference.</strong> Origination models are trained only on approved applicants, whose performance is observed — a systematically biased sample, since the worst applicants were declined. Reject inference techniques attempt to correct this. They are imperfect and assumption-heavy; the honest position is to use them, document the assumptions, and remember that the model's view of rejected populations is inferred rather than observed.</li>\n          <li><strong>Through-the-cycle versus point-in-time.</strong> TTC estimates aim for stability across the economic cycle and suit capital; PIT estimates reflect current conditions and suit IFRS 9 and pricing. Confusing the two produces either volatile capital or unresponsive provisions.</li>\n          <li><strong>Survivorship and selection effects.</strong> Behavioural models built on customers who remained with the institution exclude those who left — often the dissatisfied or the refinanced.</li>\n          <li><strong>Definition consistency.</strong> \"Default\" must mean the same thing in the model, the policy, the regulatory return and the financial statements. Divergence here is a common and material finding.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: ask which fairness definition",
      "text": "When a team reports that a credit model has been \"tested for fairness\", ask which definition was used and why that one was chosen. Because demographic parity, equalised odds and within-group calibration cannot generally hold simultaneously, an unqualified claim of fairness signals that the trade-off was never confronted. A team that answers <em>\"we prioritised equalised odds because the cost of unequal error rates in this portfolio is higher, and here is the documented rationale\"</em> is one that understands the problem."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take your institution's principal credit model. Document: which parameter it estimates (PD, LGD or EAD); whether it is TTC or PIT and whether that matches its use; how SICR is determined if it feeds IFRS 9; whether reject inference was applied and on what assumptions; which fairness definition was tested, when, and with what result; and whether \"default\" is defined identically in the model, policy and regulatory return. Every gap is a finding worth raising."
    },
    "takeaways": [
      "PD, LGD and EAD have different data availability; machine learning has contributed most to PD",
      "ECL is audited and enters the financial statements, making calibration and explainability non-negotiable",
      "Models trained on benign conditions extrapolate unreliably — stress testing requires plausible sensitivity and documented overlays",
      "Champion–challenger requires the same population, mature outcomes and pre-specified promotion criteria",
      "Fairness definitions conflict mathematically; the institution must choose and justify one",
      "Test error rates across groups, not only approval rates",
      "Reject inference is assumption-heavy; TTC and PIT serve different purposes and must not be confused"
    ],
    "quiz": [
      {
        "q": "Why do many institutions retain interpretable models for IFRS 9 expected credit loss while using machine learning for early warning?",
        "opts": [
          "Regulators prohibit ML in accounting",
          "Machine learning cannot model credit",
          "ECL is audited and enters the financial statements, so calibration and explainability are non-negotiable",
          "Interpretable models are always more accurate"
        ],
        "a": 2,
        "fb": "This is a defensible architecture: the audited provision requires numerically correct, explainable output, while early warning tolerates more complexity."
      },
      {
        "q": "A team reports their credit model is 'fair'. The correct challenge is:",
        "opts": [
          "Accept the finding and move on",
          "Demand demographic parity always",
          "Ask for the model's AUC",
          "Ask which fairness definition was used and why, since demographic parity, equalised odds and within-group calibration cannot generally all hold"
        ],
        "a": 3,
        "fb": "The impossibility of simultaneously satisfying these definitions when base rates differ is a proven result. An unqualified fairness claim means the trade-off was never confronted."
      },
      {
        "q": "Reject inference addresses which problem?",
        "opts": [
          "Origination models are trained only on approved applicants, a systematically biased sample",
          "Customers rejecting marketing offers",
          "Regulators rejecting model submissions",
          "Servers rejecting API calls"
        ],
        "a": 0,
        "fb": "Performance is observed only for those approved. Reject inference attempts to correct this, but it is assumption-heavy and must be documented as inferred."
      },
      {
        "q": "Confusing through-the-cycle and point-in-time estimates typically produces:",
        "opts": [
          "Improved fairness",
          "Either volatile capital or unresponsive provisions, depending on which is misapplied",
          "Faster model training",
          "No material effect"
        ],
        "a": 1,
        "fb": "TTC suits capital because it is stable across the cycle; PIT suits IFRS 9 and pricing because it reflects current conditions."
      },
      {
        "q": "In a champion–challenger programme, promotion criteria should be:",
        "opts": [
          "Left to the vendor",
          "Based on discrimination alone",
          "Pre-specified — what improvement, on which metrics, sustained over what period",
          "Decided after reviewing the results"
        ],
        "a": 2,
        "fb": "Agreeing criteria after seeing results invites motivated reasoning. Pre-specification is also the strongest evidence to a supervisor that change is controlled."
      },
      {
        "q": "A model trained entirely on benign economic conditions is used for stress testing. The principal concern is:",
        "opts": [
          "It cannot handle missing data",
          "It will be too conservative",
          "It will run too slowly",
          "It has never observed the scenario it is being asked to predict, and complex models extrapolate unreliably"
        ],
        "a": 3,
        "fb": "Extrapolation beyond the training range is unreliable. Test that sensitivities are economically plausible and document judgemental overlays."
      }
    ]
  },
  {
    "id": "a8",
    "tag": "Module 8",
    "time": "50 min",
    "title": "Financial Crime at Scale: Graph & Network Intelligence",
    "summary": "Entity resolution, network analytics and privacy-preserving collaboration",
    "objectives": [
      "Apply graph analytics to financial crime beyond transaction-level monitoring",
      "Understand entity resolution and why it determines detection capability",
      "Understand typology discovery and unsupervised detection of unknown patterns",
      "Evaluate privacy-enhancing technologies for cross-institution collaboration",
      "Design a target financial crime architecture appropriate to a Nepali institution",
      "Understand model risk considerations specific to financial crime systems"
    ],
    "sections": [
      {
        "h": "Why the network is the unit of analysis",
        "html": "\n        <p>The foundational programme introduced graph analytics for mule networks and layering. At an advanced level, the shift is conceptual: in sophisticated financial crime, <strong>the network is the criminal artefact</strong>. Individual transactions are deliberately unremarkable — that is the design intent of structuring.</p>\n        <p>Formally, accounts and parties become <strong>nodes</strong> and transfers become <strong>edges</strong>, with attributes on both. Detection then draws on established network measures:</p>\n        <ul class=\"body\">\n          <li><strong>Centrality</strong> — accounts through which disproportionate flow passes, characteristic of collectors and hubs.</li>\n          <li><strong>Community detection</strong> — densely connected clusters transacting far more with each other than with the wider network.</li>\n          <li><strong>Path and cycle analysis</strong> — funds returning to origin through intermediaries, or moving through a chain within a compressed timeframe.</li>\n          <li><strong>Temporal patterns</strong> — synchronised behaviour across nominally unrelated accounts, a strong signal of coordination.</li>\n          <li><strong>Shared attributes</strong> — device identifiers, phone numbers, addresses, beneficiaries or employers linking supposedly independent customers.</li>\n        </ul>\n        <p>Given the scale of remittance flows and the rapid growth of digital wallets in Nepal, shared-attribute and temporal analysis are particularly productive: mule recruitment concentrates where accounts are numerous, newly opened and individually low-value.</p>"
      },
      {
        "h": "Entity resolution is the foundation",
        "html": "\n        <p>Network analytics is worthless if the same person appears as four unconnected nodes. <strong>Entity resolution</strong> — determining which records refer to the same real-world person or business — is the prerequisite capability, and it is genuinely hard in the Nepali context:</p>\n        <ul class=\"body\">\n          <li><strong>Transliteration variance</strong> between Devanagari and Roman script, with multiple valid romanisations of the same name.</li>\n          <li><strong>Name ordering and patronymics</strong> applied inconsistently across systems.</li>\n          <li><strong>Address formats</strong> that are descriptive rather than standardised.</li>\n          <li><strong>Identifier gaps</strong> where citizenship number, PAN and national ID are captured inconsistently across products and vintages.</li>\n        </ul>\n        <p>Machine learning contributes through probabilistic matching — phonetic similarity, edit distance, contextual signals such as shared addresses or devices — producing a match confidence rather than a binary answer. Institutions should hold two thresholds: a high one for automatic linkage and a lower one routing candidate matches to human review.</p>\n        <p>Entity resolution improvement typically delivers more detection uplift per rupee than any new detection model. It is unglamorous and it is where the leverage sits.</p>"
      },
      {
        "h": "Finding typologies nobody has written a rule for",
        "html": "\n        <p>Supervised models learn known patterns from labelled cases. Their structural limitation is that they cannot detect a typology absent from the training data — and novel typologies are precisely what causes losses.</p>\n        <p>Unsupervised and semi-supervised methods address this gap:</p>\n        <ul class=\"body\">\n          <li><strong>Anomaly detection</strong> — flagging behaviour that does not resemble any established pattern, whether or not it resembles known crime.</li>\n          <li><strong>Peer-group analysis</strong> — comparing a customer against genuinely similar customers rather than a portfolio average. A cash pattern normal for a retail merchant is abnormal for a salaried professional.</li>\n          <li><strong>Behavioural change detection</strong> — a dormant account suddenly transacting actively, or a stable pattern shifting abruptly, is often more informative than any absolute threshold.</li>\n          <li><strong>Graph embeddings</strong> — representing each node's network position numerically so that structurally similar accounts can be identified even when their transactions differ.</li>\n        </ul>\n        <p>These methods generate hypotheses rather than conclusions. Their proper output is a prioritised queue for skilled investigators, and their value depends entirely on investigator capacity to work it.</p>"
      },
      {
        "h": "Privacy-enhancing technologies and collaboration",
        "html": "\n        <p>Financial crime crosses institutional boundaries; detection data does not. A mule network spanning five banks is visible to none of them individually. Several technologies address this without pooling raw customer data:</p>\n        <ul class=\"body\">\n          <li><strong>Federated learning</strong> — institutions jointly train a model while data remains local; only model updates are shared.</li>\n          <li><strong>Secure multi-party computation</strong> — parties jointly compute a result without revealing their inputs.</li>\n          <li><strong>Homomorphic encryption</strong> — computation performed directly on encrypted data. Powerful, still computationally expensive.</li>\n          <li><strong>Privacy-preserving record linkage</strong> — determining whether two institutions hold records for the same entity without disclosing the underlying identifiers.</li>\n        </ul>\n        <p>These are technically mature enough to matter and, in most markets, blocked by legal and governance questions rather than by engineering. For Nepal, this is properly a <strong>sector-level conversation involving NRB and the Financial Information Unit</strong> rather than something an individual bank can resolve alone. It is worth raising precisely because the coordination barrier, not the technology, is the obstacle.</p>"
      },
      {
        "h": "A target architecture",
        "html": "\n        <p>A defensible financial crime architecture layers capabilities so that each does what it is best at:</p>\n        <ol class=\"body\">\n          <li><strong>Deterministic rules</strong> for regulatory thresholds and mandatory reporting — transparent, auditable, non-negotiable.</li>\n          <li><strong>Entity resolution</strong> beneath everything, continuously improved.</li>\n          <li><strong>Supervised models</strong> scoring and prioritising alerts against known typologies.</li>\n          <li><strong>Unsupervised detection</strong> surfacing novel behaviour the rules and supervised models would miss.</li>\n          <li><strong>Network analytics</strong> assessing structure across linked entities.</li>\n          <li><strong>Investigator workbench</strong> — enriched, assembled cases with the context already gathered (a strong agentic use case, per Module 6).</li>\n          <li><strong>Governed feedback</strong> — investigation outcomes returning as training data, with controls against reinforcing existing blind spots.</li>\n        </ol>"
      },
      {
        "h": "Model risk in financial crime systems",
        "html": "\n        <p>Financial crime models carry risk characteristics that differ from credit models and deserve explicit treatment:</p>\n        <ul class=\"body\">\n          <li><strong>The label is unreliable.</strong> \"Not reported\" does not mean \"not criminal\" — it may mean not detected. Models trained on historical dispositions learn to reproduce past detection capability, including its blind spots.</li>\n          <li><strong>Adversarial drift.</strong> Unlike credit risk, the population actively adapts to evade detection. A model's performance decays because criminals learn it, not merely because conditions change.</li>\n          <li><strong>Feedback loops.</strong> If the model directs attention to certain profiles, cases will be found there, confirming the model — while other typologies remain unexamined. Deliberate random sampling outside the model's priorities is a necessary counterweight.</li>\n          <li><strong>Suppression risk.</strong> Alert suppression reduces workload but, if wrongly calibrated, systematically hides a category of activity. Suppression rules require the same governance as detection rules, and periodic review of what they excluded.</li>\n        </ul>\n        <p>Filing decisions and customer exit remain human, accountable determinations. AI's role is directing scarce investigative capacity — which, given the false-positive burden documented in the foundational programme, is transformative enough.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: fix entity resolution first",
      "text": "Before commissioning any new detection model, measure your entity resolution quality: take 200 customers known to hold multiple relationships and check how many are correctly linked across core, cards, digital and loans. Institutions are routinely shocked by the result. Improving entity resolution typically lifts detection more than a new model would, costs less, and simultaneously improves credit, marketing and customer service."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Design a network-analytics pilot for your institution. Specify: which entities and relationships form the graph; which shared attributes you can actually link on today; which network measure you would start with and why; how a flagged network would reach an investigator; and what deliberate random sampling you would run outside the model's priorities to detect its blind spots. Note explicitly which data you would need but do not currently hold reliably."
    },
    "takeaways": [
      "In sophisticated financial crime the network is the criminal artefact; individual transactions are designed to look ordinary",
      "Entity resolution is the prerequisite capability and usually the highest-return investment",
      "Transliteration, name ordering and inconsistent identifiers make entity resolution genuinely hard in Nepal",
      "Unsupervised methods detect typologies no rule anticipated, but produce hypotheses requiring investigator capacity",
      "Privacy-enhancing technologies enable cross-institution detection; the barrier is legal and coordinative, not technical",
      "Financial crime labels are unreliable, populations adapt adversarially, and feedback loops entrench blind spots",
      "Random sampling outside model priorities is a necessary counterweight to feedback loops"
    ],
    "quiz": [
      {
        "q": "Before commissioning a new financial crime detection model, the highest-return investment is usually:",
        "opts": [
          "Improving entity resolution so the same person is correctly linked across systems",
          "A larger model",
          "More alert rules",
          "Additional cloud capacity"
        ],
        "a": 0,
        "fb": "Network analytics is worthless if one person appears as four unconnected nodes. Entity resolution also improves credit, marketing and service simultaneously."
      },
      {
        "q": "Why can supervised models alone not address novel money-laundering typologies?",
        "opts": [
          "They run too slowly",
          "They learn only patterns present in labelled training data, so they cannot detect a typology never previously observed",
          "They require cloud infrastructure",
          "They are prohibited by regulators"
        ],
        "a": 1,
        "fb": "Novel typologies are precisely what causes losses. Unsupervised and anomaly methods surface behaviour that fits no established pattern."
      },
      {
        "q": "A distinctive model risk in financial crime, compared with credit risk, is:",
        "opts": [
          "Outcomes are observed immediately",
          "Models are easier to explain",
          "Adversarial drift — the population actively adapts to evade detection, so performance decays because criminals learn the model",
          "Data volumes are smaller"
        ],
        "a": 2,
        "fb": "Credit populations change with conditions; criminal populations change deliberately in response to your controls."
      },
      {
        "q": "Federated learning allows institutions to:",
        "opts": [
          "Eliminate the need for investigators",
          "Avoid all regulatory obligations",
          "Pool all raw customer data centrally",
          "Jointly train a model while data remains local, sharing only model updates"
        ],
        "a": 3,
        "fb": "Privacy-enhancing technologies enable collaboration without pooling raw data. In most markets the barrier is legal and coordinative rather than technical."
      },
      {
        "q": "'Feedback loops' in financial crime models create the risk that:",
        "opts": [
          "Attention concentrates where the model already looks, confirming itself while other typologies go unexamined",
          "Investigators become too skilled",
          "Models become too conservative",
          "Alerts arrive too quickly"
        ],
        "a": 0,
        "fb": "Cases are found where you look. Deliberate random sampling outside the model's priorities is the counterweight that reveals blind spots."
      },
      {
        "q": "In an AML context, a historical label of 'not reported' means:",
        "opts": [
          "The alert was a false positive",
          "Possibly not detected — labels reflect past detection capability including its blind spots",
          "The customer was exited",
          "Definitively not criminal"
        ],
        "a": 1,
        "fb": "Training on historical dispositions teaches the model to reproduce previous detection capability, blind spots included."
      }
    ]
  },
  {
    "id": "a9",
    "tag": "Module 9",
    "time": "55 min",
    "title": "Enterprise Governance & the Target Operating Model",
    "summary": "Structures, decision rights and the organisation AI requires",
    "objectives": [
      "Design an AI governance structure with unambiguous decision rights",
      "Apply the three lines of defence to AI without duplicating existing risk functions",
      "Choose between centralised, federated and hub-and-spoke operating models",
      "Build the policy stack a supervisor would expect to see",
      "Understand talent composition, capability building and the Centre of Excellence",
      "Address the cultural barriers that defeat well-designed frameworks"
    ],
    "sections": [
      {
        "h": "Governance as an enabler, not a brake",
        "html": "\n        <p>The evidence is unambiguous that governance accelerates rather than impedes scaling. EY's research found that <strong>more than 70% of large global banks have integrated AI governance into their group-wide risk management frameworks</strong>, and that among banks deploying generative AI at scale, <strong>more than 80% have established cross-functional AI governance committees or \"control towers\"</strong>. Most tellingly, one global commercial bank <strong>tripled its number of AI applications without a proportional increase in model-related compliance incidents</strong> after implementing a group-level framework.</p>\n        <p>The Cambridge study reinforces the demand side: <strong>clearer regulatory guidance is ranked a top priority by 69% of industry, 67% of vendors and 79% of regulators</strong>. Institutions are not resisting governance; they are asking for clarity.</p>"
      },
      {
        "h": "Decision rights — the part most frameworks omit",
        "html": "\n        <p>Most AI policies describe principles. Few specify who may decide what. A workable scheme states, for each decision, the accountable role and the evidence required:</p>\n        <ul class=\"body\">\n          <li><strong>Approve AI strategy and risk appetite</strong> — Board, on recommendation of the executive committee.</li>\n          <li><strong>Approve a Tier 1 model into production</strong> — AI or model risk committee, on evidence of independent validation.</li>\n          <li><strong>Approve a Tier 2 model</strong> — delegated to the business owner with risk sign-off.</li>\n          <li><strong>Approve a generative AI use case involving customer data</strong> — joint approval of information governance and the business owner.</li>\n          <li><strong>Approve an agentic deployment above Level 1 autonomy</strong> — AI committee, with documented tool list and limits.</li>\n          <li><strong>Suspend a model in production</strong> — named individual, unilaterally, without waiting for a committee.</li>\n          <li><strong>Accept a validation finding as remediated</strong> — validation function, not the model owner.</li>\n        </ul>\n        <p>That last item prevents the most common governance failure: the team that built the model deciding its own findings have been addressed.</p>"
      },
      {
        "h": "Three lines of defence, applied to AI",
        "html": "\n        <p>AI risk should sit inside existing enterprise risk management rather than beside it. Oxford's research is explicit that <em>AI risk management should not be separate from enterprise risk management</em>, and that the last line of defence will remain human.</p>\n        <ul class=\"body\">\n          <li><strong>First line — business and development.</strong> Owns the model, its appropriate use, its performance and its customer outcomes. Runs day-to-day monitoring.</li>\n          <li><strong>Second line — risk and compliance.</strong> Owns the framework, tiering, independent validation, challenge and aggregate reporting. Must be resourced with people who genuinely understand the models; a second line that cannot challenge technically is ceremonial.</li>\n          <li><strong>Third line — internal audit.</strong> Assures that the framework operates as documented. Audits the process, not the mathematics.</li>\n        </ul>\n        <div class=\"callout note\"><h4>Deeper dive: the second-line capability problem</h4><p style=\"margin:0\">The binding constraint in most institutions is second-line technical capability. If validation cannot interrogate a gradient-boosted model, examine a calibration curve or evaluate an explanation's adequacy, then validation becomes documentation review and the control is nominal. Options are to recruit, to build through structured development, or to buy independent validation — but pretending the capability exists when it does not is the single most dangerous position an institution can hold.</p></div>"
      },
      {
        "h": "Centralised, federated or hub-and-spoke",
        "html": "\n        <p>Three operating models, each with a defensible use:</p>\n        <ul class=\"body\">\n          <li><strong>Centralised.</strong> A single team builds all AI. Strong consistency and control; becomes a bottleneck and drifts from business context. Appropriate at low maturity, where scarce expertise must be concentrated.</li>\n          <li><strong>Federated.</strong> Business units build their own with central standards. Fast and contextual; risks duplication, inconsistency and uneven quality. Appropriate at high maturity with strong standards.</li>\n          <li><strong>Hub-and-spoke.</strong> A central Centre of Excellence owns platforms, standards, tooling, validation and scarce specialists, while embedded practitioners sit in business units. Most institutions converge here.</li>\n        </ul>\n        <p>Oxford's research adds a caution that matters: introducing central coordination after a period of free experimentation risks <em>\"frustrating key individuals\"</em>, and notes that firms report <strong>retention of talent, not just attraction, becoming front of mind</strong>. Centralise the standards and the platform; avoid centralising all the interesting work.</p>\n        <p>EY's finding on composition remains the practical benchmark: in high-return banks, <strong>40–50% of AI team members come from business rather than purely technical backgrounds</strong>, and institutions with mature AI talent systems cut the cycle from project approval to launch by <strong>30–50%</strong>.</p>"
      },
      {
        "h": "The policy stack",
        "html": "\n        <p>A supervisor examining your institution will expect a coherent documentary hierarchy:</p>\n        <ol class=\"body\">\n          <li><strong>AI policy</strong> — board-approved. Scope, principles, risk appetite, accountability, prohibited uses.</li>\n          <li><strong>Model risk management standard</strong> — inventory, tiering, development, validation, monitoring, retirement.</li>\n          <li><strong>Acceptable use policy for generative AI</strong> — what staff may and may not do, and with which approved tools. This is the cheapest and most urgent document most institutions lack.</li>\n          <li><strong>Data and privacy standards</strong> — consent, purpose limitation, retention, cross-border transfer, aligned to the Privacy Act (2075) and NRB requirements.</li>\n          <li><strong>Third-party and outsourcing standard</strong> — due diligence, contractual minimums, exit, concentration limits.</li>\n          <li><strong>Agentic AI standard</strong> — autonomy levels, tool approval, limits, logging, kill-switch authority.</li>\n          <li><strong>Procedures and templates</strong> — validation report format, model documentation template, monitoring pack, incident process.</li>\n        </ol>\n        <p>Templates matter more than they appear to. A standard validation report format makes quality visible and comparable across models, and makes gaps obvious rather than negotiable.</p>"
      },
      {
        "h": "Building capability deliberately",
        "html": "\n        <p>Capability is built through structure rather than enthusiasm:</p>\n        <ul class=\"body\">\n          <li><strong>Segment the audience.</strong> Board and executive need enough to govern; business leaders need enough to specify and challenge; practitioners need working fluency; specialists need depth. A single training programme serves none of them well.</li>\n          <li><strong>Make AI literacy part of professional development</strong> rather than a one-off event — BCG's guidance is explicit that organisations should embed AI literacy in professional development as roles evolve.</li>\n          <li><strong>Train challenge, not just use.</strong> Staff must be able to recognise when output is wrong and be genuinely empowered to override it. This is the operational antidote to automation bias.</li>\n          <li><strong>Rotate people through the CoE</strong> so capability diffuses into the business rather than concentrating permanently.</li>\n          <li><strong>Retain deliberately.</strong> The people you train become externally marketable. Career path, interesting work and recognition matter more than incremental salary.</li>\n        </ul>"
      },
      {
        "h": "The cultural barriers that defeat good frameworks",
        "html": "\n        <p>The XAI literature review identified organisational and cultural barriers as more fundamental than technical ones. The same applies to governance generally. The recurring failures:</p>\n        <ul class=\"body\">\n          <li><strong>Governance experienced as an obstacle</strong> rather than a condition of deployment. Countered by making approval paths fast, predictable and proportionate — a Tier 3 tool should not face Tier 1 process.</li>\n          <li><strong>Business–technical misalignment</strong> — models built to technical specifications that satisfy no business need. Countered by joint accountability and the 40–50% business composition benchmark.</li>\n          <li><strong>Deployment as the only rewarded outcome.</strong> If nobody is ever thanked for stopping a project, unsafe projects proceed. Celebrate a well-reasoned stop publicly at least once.</li>\n          <li><strong>Silence on employment.</strong> The Cambridge data offers a usefully balanced position: <strong>around two-thirds of industry respondents expect a net increase in jobs</strong>, roughly 25% expect significant reskilling, and 24% expect a net reduction. Saying this plainly is better than allowing rumour to fill the vacuum.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: publish the decision-rights table",
      "text": "Produce a single page listing every AI-related decision, the accountable role, and the evidence required — then circulate it. Most governance failures are not disagreements about principle; they are ambiguity about who decides. A published decision-rights table resolves more disputes than a fifty-page policy, and it is the first artefact a supervisor can use to test whether your framework is real."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Draft the decision-rights table for your institution covering the seven decisions listed in this module. For each, name the accountable role, the required evidence, and the escalation path. Identify which of the seven currently has no clear owner — that gap is your most urgent governance action, and it costs nothing to close."
    },
    "takeaways": [
      "Governance accelerates scaling: over 70% of large global banks embed AI governance in group risk frameworks",
      "One bank tripled AI applications without proportional increase in compliance incidents after establishing group-level governance",
      "Most frameworks describe principles but omit decision rights — publish who decides what, on what evidence",
      "AI risk belongs inside enterprise risk management; second-line technical capability is the binding constraint",
      "Hub-and-spoke suits most institutions; centralise standards and platforms, not all the interesting work",
      "High-return banks have 40–50% business people on AI teams; mature talent systems cut approval-to-launch by 30–50%",
      "Address employment openly: roughly two-thirds expect net job increases, 24% expect net reduction"
    ],
    "quiz": [
      {
        "q": "Which decision should explicitly NOT rest with the team that built a model?",
        "opts": [
          "Choosing the programming language",
          "Selecting training data",
          "Accepting that a validation finding has been remediated",
          "Scheduling the project"
        ],
        "a": 2,
        "fb": "Allowing the builder to close their own validation findings is the most common governance failure and defeats independence entirely."
      },
      {
        "q": "The binding constraint on effective second-line AI oversight in most institutions is:",
        "opts": [
          "Insufficient policy documents",
          "Lack of committee meetings",
          "Too few vendors",
          "Technical capability — if validation cannot interrogate the model, the control is nominal"
        ],
        "a": 3,
        "fb": "A second line that cannot examine a calibration curve or challenge an explanation performs documentation review, not validation."
      },
      {
        "q": "EY's evidence on governance and scaling shows that a bank implementing a group-level AI governance framework:",
        "opts": [
          "Tripled its AI applications without a proportional rise in model-related compliance incidents",
          "Exited AI entirely",
          "Slowed deployment substantially",
          "Reduced its model count"
        ],
        "a": 0,
        "fb": "Governance is what enabled the institution to go faster safely — it is an enabler of scale, not a brake on it."
      },
      {
        "q": "Oxford's research warns that introducing central coordination after free experimentation risks:",
        "opts": [
          "Regulatory breach",
          "Frustrating key individuals, with talent retention becoming front of mind",
          "Higher licence costs",
          "Model drift"
        ],
        "a": 1,
        "fb": "Centralise standards and platforms, but avoid centralising all the interesting work — the people you trained are externally marketable."
      },
      {
        "q": "Which policy document is typically the cheapest and most urgent for institutions that lack it?",
        "opts": [
          "A board-approved AI strategy",
          "An agentic AI standard",
          "An acceptable use policy for generative AI tools",
          "A third-party outsourcing standard"
        ],
        "a": 2,
        "fb": "It addresses shadow AI immediately, costs nothing to produce, and closes the most common real-world exposure."
      },
      {
        "q": "On employment effects, the Cambridge study found that:",
        "opts": [
          "Job numbers are unaffected",
          "No institution has considered the question",
          "All respondents expect mass redundancy",
          "Around two-thirds expect a net increase in jobs, while 24% expect a net reduction and roughly 25% expect significant reskilling"
        ],
        "a": 3,
        "fb": "Stating this balanced position openly is better than allowing rumour to fill the vacuum and generate resistance."
      }
    ]
  },
  {
    "id": "a10",
    "tag": "Module 10",
    "time": "55 min",
    "title": "Systemic Risk, Financial Stability & the Regulatory Frontier",
    "summary": "What AI means for the financial system, and how regulation is responding",
    "objectives": [
      "Understand AI's implications for financial stability at system rather than firm level",
      "Explain model herding, uniformity and network connectedness as stability risks",
      "Understand third-party and foundation-model concentration as a systemic exposure",
      "Compare emerging regulatory models internationally",
      "Understand how supervisors themselves are adopting AI, and what that implies",
      "Apply this system-level perspective to Nepal's context and NRB's framework"
    ],
    "sections": [
      {
        "h": "From firm risk to system risk",
        "html": "\n        <p>Every preceding module has considered risk to your institution. This module considers risk to the financial system — the perspective a central bank takes, and one that senior bankers are expected to understand.</p>\n        <p>The Bank for International Settlements working paper <strong>Intelligent financial system: how AI is transforming finance</strong> (Aldasoro, Gambacorta, Korinek, Shreeti and Stein, 2024) provides the most rigorous available treatment. Its framing is elegant: the financial system exists to process dispersed information and aggregate it into price signals that coordinate the economy. Advances in information processing have repeatedly transformed finance; AI is the latest and possibly the most consequential.</p>\n        <p>The paper examines four functions — <strong>financial intermediation, insurance, asset management and payments</strong> — and assesses implications for financial stability and prudential policy.</p>"
      },
      {
        "h": "Herding, uniformity and connectedness",
        "html": "\n        <p>The BIS analysis identifies the core stability concern directly. Even early rule-based computer trading systems produced cascade effects and herding — the <strong>1987 US stock market crash</strong> being the canonical example. With machine learning, the paper argues, <strong>the risks of uniformity, model herding and network connectedness have only compounded.</strong></p>\n        <p>The mechanism is straightforward and worth stating precisely:</p>\n        <ul class=\"body\">\n          <li>Institutions increasingly use <strong>similar models</strong>, often built on the <strong>same foundation models</strong>, trained on <strong>overlapping data</strong>, procured from the <strong>same small set of vendors</strong>.</li>\n          <li>Similar models reach similar conclusions from similar inputs.</li>\n          <li>Similar conclusions produce <strong>correlated actions</strong> — tightening credit to the same segments, selling the same assets, restricting the same customers — at the same moment.</li>\n          <li>Correlated actions amplify whatever movement triggered them.</li>\n        </ul>\n        <p>The paper adds a specific generative-AI dimension: <strong>co-pilots and robo-advising can make decisions more homogeneous, potentially adding to systemic risk.</strong> If every credit analyst in a market is assisted by the same model, drafting from the same reasoning patterns, the diversity of judgement that historically dampened cycles is quietly reduced.</p>"
      },
      {
        "h": "The supervisory blind spot",
        "html": "\n        <p>A second concern in the BIS paper deserves particular attention from anyone who will interact with a supervisor: <strong>the proliferation of complex interactions and the inherent lack of explainability makes it difficult to spot market manipulation or financial stability risks in time.</strong></p>\n        <p>This inverts the usual framing of explainability. It is normally discussed as a consumer-protection and conduct issue — can you explain a decline to an applicant? The BIS point is that opacity is also a <strong>macroprudential</strong> problem. A supervisor cannot detect emerging systemic patterns if the decisions producing them cannot be interpreted, and the speed of automated decisioning removes the friction that historically gave authorities time to intervene.</p>"
      },
      {
        "h": "Concentration as systemic exposure",
        "html": "\n        <p>Module 5 discussed vendor concentration as an institutional risk. At system level it becomes something more serious. Recall the Cambridge findings: <strong>OpenAI used by 76% of industry respondents</strong>, Google by 57%, with AWS leading cloud at 46%, and <strong>63% of industry building internal workflows on external foundation models</strong>.</p>\n        <p>Concentration of this degree creates exposures that no individual institution can diversify away:</p>\n        <ul class=\"body\">\n          <li><strong>Correlated operational failure.</strong> A single provider outage simultaneously degrades many institutions.</li>\n          <li><strong>Correlated model failure.</strong> A flaw or behavioural change in a widely used model propagates across the sector at once.</li>\n          <li><strong>Cross-border dependency.</strong> Critical financial infrastructure depending on providers outside the jurisdiction, beyond the supervisor's reach.</li>\n          <li><strong>Substitutability limits.</strong> The concentration exists partly because genuine alternatives are few.</li>\n        </ul>\n        <p>For a small market such as Nepal this is sharper still: the entire banking sector could plausibly depend on two or three foreign providers, with no domestic alternative and limited negotiating power.</p>"
      },
      {
        "h": "Two scenarios for the real economy",
        "html": "\n        <p>The BIS paper also examines spillovers from the real economy, presenting two scenarios:</p>\n        <ul class=\"body\">\n          <li><strong>The benign scenario.</strong> Widespread AI adoption produces broad productivity gains with largely manageable effects — higher output, gradual labour reallocation, improved credit quality as firms become more productive.</li>\n          <li><strong>The disruptive scenario.</strong> Significant labour-market displacement occurs faster than reallocation, with consequences for household income, consumer credit performance and demand.</li>\n        </ul>\n        <p>For a bank, the second scenario is a <strong>credit risk</strong> question, not a technology one: which segments of your portfolio are exposed to occupations most susceptible to displacement? Very few institutions have examined their portfolio through this lens, and it is a legitimate and forward-looking stress scenario to propose.</p>"
      },
      {
        "h": "The regulatory frontier",
        "html": "\n        <p>The BIS paper proposes general principles for AI regulation built on <strong>social well-being, transparency, accountability, fairness, privacy protection, safety, human oversight and robustness</strong>, and compares regulatory models across the United States, the European Union and China — concluding with an urgent call for <strong>international coordination</strong> on integrating AI into the global financial system.</p>\n        <p>The broad picture practitioners should carry:</p>\n        <ul class=\"body\">\n          <li><strong>European Union.</strong> Comprehensive, risk-tiered legislation with heightened obligations for high-risk uses including credit scoring for individuals.</li>\n          <li><strong>United States.</strong> Supervisory guidance and existing law applied to AI — model risk management, fair lending, consumer protection — rather than a single AI statute.</li>\n          <li><strong>China.</strong> Directive, application-specific rules issued rapidly alongside active state promotion of adoption.</li>\n          <li><strong>Convergence.</strong> Despite differing instruments, supervisors everywhere ask the same four questions: who is accountable, can you explain it, is it fair, and are you monitoring it.</li>\n        </ul>\n        <p><strong>Nepal Rastra Bank's Artificial Intelligence Guidelines</strong> sit recognisably within this convergence — board accountability, risk classification, explainability, fairness, privacy aligned to the Privacy Act (2075), consent and opt-out, and embedded ongoing monitoring. An institution that builds to the four convergent questions will be well positioned as NRB's expectations develop. As always, work from the current published text and confirm with your compliance function.</p>"
      },
      {
        "h": "Supervisors are adopting AI too",
        "html": "\n        <p>The Cambridge study surveyed 130 central banks and financial regulators, and the findings shape what supervision will look like:</p>\n        <ul class=\"body\">\n          <li><strong>48% remain in the Exploring stage or are not engaged with AI at all</strong>; 33% are piloting and 18% scaling.</li>\n          <li>Only <strong>20% report advanced adoption</strong>, against 40% of industry.</li>\n          <li><strong>24% of regulators use no foundation models</strong>, and <strong>46% report using no cloud infrastructure at all</strong>.</li>\n          <li><strong>79% rank clearer regulatory guidance as a top priority</strong> — the highest of any group.</li>\n        </ul>\n        <p>Two implications follow. First, supervisory capability will lag industry capability for some years, which places more weight on institutions' own governance rather than less. Second, the gap is closing — and supervisory technology will eventually allow authorities to analyse far more than they can today. Institutions whose documentation is genuinely in order will find this unremarkable; others will not.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: ask the herding question",
      "text": "At your next risk committee, ask one question: <em>\"If every bank in Nepal used a model similar to ours, trained on similar data, what would happen in a downturn?\"</em> The answer is that they would tighten simultaneously, on the same segments, at the same moment — amplifying the contraction. It is not your institution's job to solve systemic risk, but it is your job to understand that your model's behaviour is correlated with your competitors', and to say so when the board asks whether AI has made the bank safer."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Conduct a concentration assessment for your institution: list every external AI dependency — foundation model providers, cloud, vendor models embedded in core systems — and for each record what happens to which business process if it becomes unavailable for 48 hours, whether a tested alternative exists, and where processing occurs geographically. Then answer the BIS displacement question: which segments of your loan portfolio are concentrated in occupations most exposed to automation?"
    },
    "takeaways": [
      "BIS analyses AI across intermediation, insurance, asset management and payments, and its stability implications",
      "Model uniformity, herding and network connectedness have compounded with machine learning; 1987 is the precedent",
      "Co-pilots and robo-advising can homogenise decisions, reducing the diversity of judgement that dampens cycles",
      "Opacity is a macroprudential problem, not only a conduct one — supervisors cannot spot risks they cannot interpret",
      "Foundation model and cloud concentration is a systemic exposure no single institution can diversify away",
      "The disruptive labour-displacement scenario is a credit risk question for your portfolio",
      "Regulatory models differ but converge on accountability, explainability, fairness and monitoring — as NRB's framework does",
      "48% of surveyed regulators are still exploring AI; 79% want clearer guidance"
    ],
    "quiz": [
      {
        "q": "The BIS working paper identifies which mechanism as a principal AI-related financial stability risk?",
        "opts": [
          "Model uniformity and herding producing correlated actions that amplify market movements",
          "Slower transaction processing",
          "Excessive documentation",
          "Rising software licence costs"
        ],
        "a": 0,
        "fb": "Similar models trained on similar data from the same vendors reach similar conclusions and act simultaneously — amplifying whatever triggered them."
      },
      {
        "q": "Why does BIS treat lack of explainability as a macroprudential issue and not only a conduct issue?",
        "opts": [
          "It is not — explainability is purely a consumer matter",
          "Supervisors cannot detect market manipulation or emerging stability risks in time if decisions cannot be interpreted",
          "It affects only retail lending",
          "Explanations slow down trading"
        ],
        "a": 1,
        "fb": "Opacity plus the speed of automated decisioning removes the friction that historically gave authorities time to intervene."
      },
      {
        "q": "Foundation model concentration — with OpenAI used by 76% of industry respondents — represents a systemic risk mainly because:",
        "opts": [
          "The models are poorly built",
          "It increases licence costs",
          "No individual institution can diversify away correlated operational or model failure across the sector",
          "It slows innovation"
        ],
        "a": 2,
        "fb": "Concentration creates sector-wide correlated exposure and, for small markets, cross-border dependency beyond the supervisor's reach."
      },
      {
        "q": "BIS's 'disruptive scenario' of significant labour-market displacement should be treated by a bank primarily as:",
        "opts": [
          "A technology question for IT",
          "A marketing opportunity",
          "An HR matter only",
          "A credit risk question — which portfolio segments are concentrated in exposed occupations"
        ],
        "a": 3,
        "fb": "Household income shocks flow directly into consumer credit performance. Very few institutions have examined their portfolio through this lens."
      },
      {
        "q": "Despite different regulatory instruments across the EU, US and China, supervisors converge on asking:",
        "opts": [
          "Who is accountable, can you explain it, is it fair, and are you monitoring it",
          "Which vendor was selected",
          "What the licence cost was",
          "How many models are deployed"
        ],
        "a": 0,
        "fb": "Building to these four convergent questions positions an institution well as NRB's expectations continue to develop."
      },
      {
        "q": "The Cambridge survey found that among 130 regulators, the proportion still in the Exploring stage or not engaged with AI is:",
        "opts": [
          "90%",
          "48%",
          "5%",
          "None — all are advanced"
        ],
        "a": 1,
        "fb": "Supervisory capability will lag industry for some years, which places more weight on institutions' own governance rather than less."
      }
    ]
  },
  {
    "id": "a11",
    "tag": "Module 11",
    "time": "50 min",
    "title": "Value Realisation: From Pilots to P&L",
    "summary": "Measuring, capturing and defending the economics of AI",
    "objectives": [
      "Understand why most institutions struggle to evidence AI value",
      "Build a value measurement framework linking AI activity to financial outcomes",
      "Use the efficiency ratio as a forward-looking indicator of AI maturity",
      "Understand the investment threshold effect and what it implies for budgeting",
      "Manage AI as a portfolio rather than a set of projects",
      "Avoid the efficiency trap and the double-counting of benefits"
    ],
    "sections": [
      {
        "h": "The measurement problem is real and widespread",
        "html": "\n        <p>The Cambridge data is candid about this. <strong>55% of industry respondents and 63% of surveyed regulators find it difficult to measure the value of AI deployment — rising to 76% among large financial institutions.</strong></p>\n        <p>Note the direction: the <em>largest</em> institutions find it hardest. Complexity, attribution across many contributing factors, and long chains between an AI intervention and a financial outcome all work against clean measurement. This is not incompetence; it is a genuinely difficult attribution problem that must nevertheless be solved, because unmeasured value cannot be defended at budget time.</p>"
      },
      {
        "h": "A value measurement framework",
        "html": "\n        <p>Work through four levels, each closer to the P&L:</p>\n        <ol class=\"body\">\n          <li><strong>Activity.</strong> Models deployed, users onboarded, queries handled. Necessary for management, worthless as value evidence. Most reporting stops here.</li>\n          <li><strong>Operational outcome.</strong> Time to decision, cost per file, alert precision, straight-through processing rate, error rate. Measurable and directly attributable, provided a baseline exists.</li>\n          <li><strong>Business outcome.</strong> Approval rates at constant risk, loss rates at constant approval, cross-sell conversion, attrition, cases investigated per analyst. Requires controlling for confounds.</li>\n          <li><strong>Financial outcome.</strong> Revenue, cost, impairment, capital, efficiency ratio. The only level a board ultimately accepts — and reachable only if the preceding levels are instrumented.</li>\n        </ol>\n        <p>The practical discipline is to define, before deployment, <strong>one metric at each level</strong> and the mechanism linking them. A project that cannot articulate that chain has not been thought through, whatever its technical merit.</p>"
      },
      {
        "h": "The efficiency ratio as an AI maturity indicator",
        "html": "\n        <p>PwC makes an argument worth adopting: the efficiency ratio — cost as a proportion of income — is evolving from a backward-looking performance measure into <em>\"the most telling forward-looking indicator of your bank's ability to leverage AI innovation to compete, grow and endure.\"</em></p>\n        <p>Their Strategy& analysis concludes that institutions fully embracing AI could achieve up to a <strong>15-percentage-point improvement in their efficiency ratio</strong>, through dual effects: revenue growth from better targeting, and cost transformation through intelligent automation.</p>\n        <p>Its value as a management metric is that it is <strong>unavoidably honest</strong>. It cannot be improved by activity, pilots or announcements. It moves only if income rises or cost falls, and it captures both sides of the AI thesis simultaneously. An institution claiming AI transformation whose efficiency ratio has not moved over three years has a claim worth examining.</p>"
      },
      {
        "h": "The investment threshold effect",
        "html": "\n        <p>One of the more actionable findings in the Cambridge study concerns the relationship between spend and outcome:</p>\n        <ul class=\"body\">\n          <li><strong>62% of organisations spending more than USD 100,000 annually on AI have reached advanced maturity</strong>, and <strong>62% of that group report increased profitability</strong> — compared with 39% among lower-spending organisations.</li>\n          <li>Overall, <strong>40% of respondents report increased profitability from AI while 43% report no change.</strong></li>\n          <li>Fintechs again outperform: <strong>56% report higher profitability versus 34% of traditional financial institutions.</strong></li>\n        </ul>\n        <p>Read alongside the earlier finding that 53% of respondents spend under USD 100,000 yet report high GenAI and agentic maturity, a nuanced picture emerges. Modest spend can buy <em>capability</em>; sustained spend above a threshold is associated with <em>profitability</em>. The gap between the two is the cost of scaling — integration, change management, governance and monitoring — which is precisely what Oxford's practitioner observed when noting that <strong>60–70% of use-case spend has nothing to do with AI itself but with foundational integration.</strong></p>\n        <p>For a Nepali institution the practical implication is encouraging: the entry threshold is low, but budget honestly for the integration layer or capability will not convert into profit.</p>"
      },
      {
        "h": "Two traps that destroy business cases",
        "html": "\n        <div class=\"callout warn\"><h4>The efficiency trap</h4><p style=\"margin:0\">Oxford's research records a practitioner describing business cases built on <em>\"incremental gains on automations, something like 5–15% of every human doing an ops job,\"</em> tallying to substantial annual savings — and then: <em>\"in the real world, we couldn't remove those humans from the system. So most people who put in an AI business case failed to deliver it.\"</em> Time saved is not money saved unless roles are redesigned or headcount actually changes. State explicitly what the freed capacity will be used for.</p></div>\n        <p><strong>The double-counting trap.</strong> When several initiatives each claim efficiency in the same function, the same saving is counted repeatedly and the aggregate becomes fictional. Oxford's recommended remedy is to <strong>evaluate AI initiatives programmatically as well as case by case</strong> — which both prevents double counting and allows enabling investments that generate no standalone return to be funded on the strength of the programme.</p>"
      },
      {
        "h": "Managing AI as a portfolio",
        "html": "\n        <p>Individual business cases produce a collection of local optima. Portfolio management produces capability. A workable structure:</p>\n        <ul class=\"body\">\n          <li><strong>Balance horizons.</strong> Roughly: 60% near-term efficiency with measurable payback, 30% capability building with indirect return, 10% exploratory. Adjust to appetite, but hold the discipline that not everything must have a standalone business case.</li>\n          <li><strong>Fund enabling infrastructure at portfolio level</strong> — data platform, feature store, model serving, monitoring, evaluation harness. These fail every individual ROI test and make everything else possible.</li>\n          <li><strong>Track reuse.</strong> EY reports an institution reaching <strong>over 50% model reuse and 30–40% lower marginal cost per use case</strong> through a centralised platform, achieving measurable returns within <strong>18–24 months</strong>. Reuse rate is the clearest single indicator that you are building capability rather than accumulating projects.</li>\n          <li><strong>Review and terminate.</strong> A portfolio requires the discipline to stop things. Institutions that never cancel are not managing a portfolio.</li>\n        </ul>"
      },
      {
        "h": "Reporting value to a board",
        "html": "\n        <p>A credible quarterly AI report to a board contains, on one page:</p>\n        <ol class=\"body\">\n          <li><strong>Portfolio position</strong> — initiatives by stage, with movement since last quarter.</li>\n          <li><strong>Financial outcomes realised</strong> — against baselines, with attribution assumptions stated.</li>\n          <li><strong>Efficiency ratio trajectory</strong>, with commentary on AI's contribution.</li>\n          <li><strong>Risk position</strong> — models by tier, validation status, incidents, monitoring exceptions.</li>\n          <li><strong>Capability indicators</strong> — reuse rate, cycle time from approval to production, trained staff.</li>\n          <li><strong>Decisions required</strong> — what the board must actually decide.</li>\n        </ol>\n        <p>What should not appear: model counts, pilot counts, or vendor names presented as achievements. Boards that receive activity reporting eventually conclude AI is expensive and unaccountable, and they are not wrong to.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: instrument the baseline before the build",
      "text": "The single highest-return four weeks in any AI programme are the four weeks spent measuring the current process before anything changes — cycle time, cost per unit, error rate, volume, and the specific decision quality metric that matters. It costs almost nothing, requires no technology, and it is the difference between a defensible business case and an anecdote. Institutions that skip it discover, eighteen months later, that they cannot prove what they achieved."
    },
    "activity": {
      "title": "Workplace application",
      "text": "For one AI initiative in your institution, construct the four-level value chain: the activity metric, the operational outcome, the business outcome, and the financial outcome — plus the mechanism linking each level to the next. Then stress-test it: is the freed capacity explicitly redirected? Is any of this benefit already claimed by another initiative? If either answer is unsatisfactory, you have found why the business case will not survive."
    },
    "takeaways": [
      "55% of industry and 76% of large institutions find AI value difficult to measure — solve it or lose the budget argument",
      "Define one metric at each of four levels — activity, operational, business, financial — and the mechanism linking them",
      "The efficiency ratio is unavoidably honest and captures both sides of the AI thesis; PwC estimates up to 15 points available",
      "62% of organisations spending over USD 100,000 annually reach advanced maturity and report higher profitability",
      "Modest spend buys capability; sustained spend buys profitability — the gap is integration and change management",
      "Time saved is not money saved unless roles are redesigned; state what freed capacity will do",
      "Evaluate programmatically to prevent double counting and to fund enabling infrastructure",
      "Model reuse rate is the clearest indicator of capability rather than project accumulation"
    ],
    "quiz": [
      {
        "q": "According to the Cambridge study, difficulty measuring AI value is:",
        "opts": [
          "Limited to small firms",
          "Only a regulator concern",
          "Widespread, affecting 55% of industry respondents and rising to 76% among large financial institutions",
          "Rare — most firms measure it well"
        ],
        "a": 2,
        "fb": "The largest institutions find it hardest, because attribution across many contributing factors is genuinely difficult — but it must still be solved."
      },
      {
        "q": "Why is the efficiency ratio a useful indicator of genuine AI maturity?",
        "opts": [
          "It is required by NRB",
          "It excludes technology costs",
          "It is easy to calculate",
          "It cannot be improved by activity or announcements — it moves only if income rises or cost falls"
        ],
        "a": 3,
        "fb": "PwC argues it is becoming a forward-looking indicator of AI capability precisely because it captures both revenue and cost effects honestly."
      },
      {
        "q": "A business case projects savings of 10% of many staff members' time. For this to become institutional benefit:",
        "opts": [
          "Roles must be redesigned or headcount must actually change — the freed capacity must be explicitly redirected",
          "The project must be centralised",
          "Nothing further is needed",
          "The savings must be reinvested in software"
        ],
        "a": 0,
        "fb": "Oxford documents this exact failure: 'we couldn't remove those humans from the system, so most people who put in an AI business case failed to deliver it.'"
      },
      {
        "q": "The Cambridge investment threshold finding shows that organisations spending over USD 100,000 annually on AI:",
        "opts": [
          "Always fail to realise value",
          "Reach advanced maturity (62%) and report higher profitability (62%) versus 39% among lower spenders",
          "Are exclusively large banks",
          "Perform no better than lower spenders"
        ],
        "a": 1,
        "fb": "Modest spend can buy capability, but sustained spend above a threshold is associated with profitability — the difference being integration and change cost."
      },
      {
        "q": "Evaluating AI initiatives programmatically rather than only case by case principally prevents:",
        "opts": [
          "Model drift",
          "Vendor lock-in",
          "Double counting of the same benefit and the underfunding of enabling infrastructure",
          "Data breaches"
        ],
        "a": 2,
        "fb": "Enabling investments fail standalone ROI tests yet make everything else possible; programme-level evaluation is how they get funded."
      },
      {
        "q": "Which indicator best signals that an institution is building capability rather than accumulating projects?",
        "opts": [
          "Number of models deployed",
          "Number of vendors engaged",
          "Size of the AI team",
          "Model reuse rate and falling marginal cost per use case"
        ],
        "a": 3,
        "fb": "EY documents over 50% reuse and 30–40% lower marginal cost per use case through a centralised platform, with returns in 18–24 months."
      }
    ]
  },
  {
    "id": "a12",
    "tag": "Module 12",
    "time": "55 min",
    "title": "Leading the AI Transformation in a Nepali Institution",
    "summary": "Strategy, sequencing and your capstone",
    "objectives": [
      "Synthesise the programme into a coherent institutional strategy",
      "Apply the emerging-market advantage realistically rather than aspirationally",
      "Sequence a credible three-horizon roadmap",
      "Anticipate the specific obstacles Nepali institutions encounter",
      "Understand the leadership behaviours that determine whether transformation succeeds",
      "Complete a defensible enterprise AI strategy for your own institution"
    ],
    "sections": [
      {
        "h": "The strategic position of a Nepali bank",
        "html": "\n        <p>Pull the evidence together honestly.</p>\n        <p><strong>Working in your favour:</strong> the Cambridge finding that EMDE institutions report higher deployment levels than advanced-economy peers; the collapse in entry cost, with 53% of respondents spending under USD 100,000 while reporting high GenAI and agentic maturity; less accumulated legacy technical debt than a two-hundred-year-old European bank; a young, digitally fluent workforce; rapid growth in digital payments generating genuinely valuable behavioural data; and NRB having issued AI Guidelines, which resolves the ambiguity that 79% of regulators globally say they want resolved.</p>\n        <p><strong>Working against you:</strong> scarce specialist talent competing against outbound migration; fragmented core systems and inconsistent customer identifiers; limited local validation capability; dependence on foreign providers with negligible negotiating power; small individual institution scale limiting investment; and thin local evidence, since almost nothing is validated on Nepali populations.</p>\n        <p>The honest conclusion is that Nepali institutions can reach <em>Scaling</em> maturity within a few years on modest budgets — but only by being disciplined about sequencing, because they cannot afford the expensive parallel experimentation that larger institutions use to find their way.</p>"
      },
      {
        "h": "Three horizons",
        "html": "\n        <p><strong>Horizon 1 — Foundations and credible wins (0–12 months).</strong></p>\n        <ul class=\"body\">\n          <li>Compile the model and AI inventory, including AI embedded in purchased software</li>\n          <li>Issue the acceptable-use policy for generative AI and provide an approved alternative tool</li>\n          <li>Establish decision rights, the AI committee, and risk tiering</li>\n          <li>Build the decision inventory (Module 2)</li>\n          <li>Fix entity resolution and the consistent customer identifier</li>\n          <li>Instrument baselines for two or three candidate processes</li>\n          <li>Deliver two internal, low-risk, measurable use cases — document processing, alert prioritisation or an internal policy assistant</li>\n        </ul>\n        <p><strong>Horizon 2 — Decisioning and scale (12–30 months).</strong></p>\n        <ul class=\"body\">\n          <li>Stand up shared platform components: feature store, model serving, monitoring, evaluation harness</li>\n          <li>Build independent validation capability, whether internal or contracted</li>\n          <li>Deploy decision-support models with humans deciding — early warning, alert scoring, a credit challenger model</li>\n          <li>Run a first agentic deployment at Level 1 autonomy on a bounded internal process</li>\n          <li>Begin measuring reuse rate and cycle time from approval to production</li>\n          <li>Report AI to the board using the value framework rather than activity counts</li>\n        </ul>\n        <p><strong>Horizon 3 — Business model (30 months onward).</strong></p>\n        <ul class=\"body\">\n          <li>Automated decisioning within defined limits, fully governed</li>\n          <li>Personalised propositions and risk-based pricing, fairness-tested</li>\n          <li>New products enabled by AI — the 51% of mature adopters piloting AI-powered products</li>\n          <li>Embedded finance and partner ecosystems</li>\n          <li>Only here does the institution begin crossing from the 86% into the 14%</li>\n        </ul>"
      },
      {
        "h": "Sequencing errors that waste years",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Starting with the most exciting use case.</strong> Customer-facing generative AI is the most visible and the least forgiving. Earn the right to it.</li>\n          <li><strong>Waiting for core replacement.</strong> Build the data layer beside the core (Module 2).</li>\n          <li><strong>Buying a platform before knowing the decisions.</strong> The decision inventory should precede the procurement.</li>\n          <li><strong>Hiring data scientists into an institution with no data foundation.</strong> They will spend two years on plumbing, become frustrated, and leave — taking the capability with them.</li>\n          <li><strong>Running pilots without baselines.</strong> Guarantees an unprovable outcome.</li>\n          <li><strong>Treating governance as a later phase.</strong> Retrofitting governance onto deployed systems costs several times more than building it in.</li>\n        </ul>"
      },
      {
        "h": "The leadership behaviours that matter",
        "html": "\n        <p>Across every source in this programme, the same behaviours recur among institutions that succeed:</p>\n        <ul class=\"body\">\n          <li><strong>Leadership from the top, explicitly.</strong> SAS quotes Banorte's Abraham Izquierdo: <em>\"Innovation and AI must be recognised as a pillar of the strategy in the institution... leadership from the top is non-negotiable.\"</em></li>\n          <li><strong>Business fluency in the AI team</strong> — the 40–50% benchmark, and AI leaders who understand banking raising use-case conversion by 20–30%.</li>\n          <li><strong>Honest measurement</strong>, including of failures, with baselines instrumented before the build.</li>\n          <li><strong>Willingness to stop projects</strong> and to say so publicly.</li>\n          <li><strong>Openness about employment effects</strong> rather than allowing rumour to fill the silence.</li>\n          <li><strong>Patience with foundations</strong> and impatience with unmeasured activity — most institutions have this precisely backwards.</li>\n        </ul>"
      },
      {
        "h": "What to do about the evidence gap",
        "html": "\n        <p>A closing point specific to institutions in markets like Nepal. Almost no AI tool sold to you has been validated on a Nepali population. That is a risk, and it is also an opportunity.</p>\n        <p>The institution that builds genuine <strong>local validation capability</strong> — the ability to evaluate any model, from any vendor, on its own customers — acquires something that does not depreciate, cannot be bought off the shelf, and improves every subsequent procurement decision. It is the highest-return capability investment available, and it is entirely achievable at modest cost.</p>\n        <p>Consider also publishing what you learn. The evidence base for AI in South Asian financial populations is thin partly because evaluations conducted here are rarely documented. A well-conducted local validation — including one showing that a tool does <em>not</em> transfer — is a genuine contribution and a reputational asset.</p>"
      },
      {
        "h": "Bringing the programme together",
        "html": "\n        <p>Twelve modules reduce to five propositions:</p>\n        <ol class=\"body\">\n          <li><strong>Adoption is not transformation.</strong> 81% are adopting; 14% are transforming. The gap is execution and business integration, and closing it is a board responsibility.</li>\n          <li><strong>Capability beats use cases.</strong> The stack performs at its weakest layer; reuse rate reveals whether you are building or accumulating.</li>\n          <li><strong>Governance enables scale.</strong> The bank that tripled applications without proportional incidents did so <em>because</em> of its framework.</li>\n          <li><strong>Value must be instrumented before it can be claimed.</strong> Baselines first; the efficiency ratio does not lie.</li>\n          <li><strong>Judgement remains accountable.</strong> Explainability, human oversight and named accountability are not constraints on advanced AI — under NRB's framework and every convergent international model, they are its licence to operate.</li>\n        </ol>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the twelve-month test",
      "text": "Whatever strategy you write, apply one test to it: <em>if we execute this perfectly for twelve months, what will be measurably different?</em> If the honest answer is \"we will have more pilots and a better understanding,\" the strategy is a research agenda rather than a plan. A good twelve-month answer names two processes with improved measured outcomes, one governance artefact in operation, and one foundational capability built — modest, specific and defensible."
    },
    "activity": {
      "title": "Capstone: your enterprise AI strategy",
      "text": "Produce a five-page enterprise AI strategy for your institution containing: (1) an honest maturity assessment against the four-stage ladder with evidence; (2) your weakest capability-stack layer and why; (3) a decision-rights table; (4) a risk-tiered model inventory summary, even if partial; (5) a three-horizon roadmap with named owners and dates; (6) the value framework for your two priority initiatives, with baselines you will instrument; (7) your concentration and dependency assessment; and (8) the twelve-month test — what will be measurably different. This is the deliverable of the programme, and it is written to be presented to your management committee or board."
    },
    "takeaways": [
      "Nepali institutions can reach Scaling maturity on modest budgets, but only with disciplined sequencing",
      "Horizon 1 is foundations and two credible internal wins; Horizon 2 is decisioning and shared platforms; Horizon 3 is business model",
      "The most common sequencing errors are starting with customer-facing GenAI, waiting for core replacement, and hiring data scientists before data foundations",
      "Leadership from the top is non-negotiable; business fluency in AI teams raises conversion by 20–30%",
      "Local validation capability is the highest-return, non-depreciating investment available",
      "Publishing local evaluations, including negative results, strengthens the regional evidence base",
      "Adoption is not transformation; capability beats use cases; governance enables scale; instrument value; judgement remains accountable"
    ],
    "quiz": [
      {
        "q": "Which sequencing error most reliably wastes an institution's first two years?",
        "opts": [
          "Hiring data scientists into an institution with no data foundation",
          "Instrumenting baselines",
          "Issuing an acceptable use policy",
          "Building a decision inventory early"
        ],
        "a": 0,
        "fb": "They spend two years on plumbing, become frustrated and leave — taking the capability with them. Fix the foundation first or hire alongside it."
      },
      {
        "q": "In the three-horizon roadmap, a first agentic deployment belongs in:",
        "opts": [
          "Horizon 3 only",
          "Horizon 2, at Level 1 autonomy on a bounded internal process",
          "Horizon 1, as an early win",
          "It should never be attempted"
        ],
        "a": 1,
        "fb": "Horizon 1 establishes foundations and low-risk wins; agentic work requires the platform, governance and evaluation capability built in Horizon 2."
      },
      {
        "q": "Why is local validation capability described as the highest-return investment for a Nepali institution?",
        "opts": [
          "It replaces the need for vendors",
          "Regulators mandate it annually",
          "It does not depreciate, cannot be bought off the shelf, and improves every subsequent procurement decision",
          "It is the cheapest option available"
        ],
        "a": 2,
        "fb": "Almost no tool sold to you has been validated on a Nepali population. The ability to evaluate any model on your own customers is permanently valuable."
      },
      {
        "q": "Applying the twelve-month test, which is a strategy rather than a research agenda?",
        "opts": [
          "\"We will have more pilots and better understanding\"",
          "\"We will monitor the market\"",
          "\"We will explore emerging technologies\"",
          "\"Two named processes will show improved measured outcomes, one governance artefact will be operating, one foundational capability will be built\""
        ],
        "a": 3,
        "fb": "A strategy names what will be measurably different. Anything else is a research agenda presented as a plan."
      },
      {
        "q": "The programme's central finding about adoption versus transformation is that:",
        "opts": [
          "81% are adopting but only 14% consider AI transformational — closing that execution gap is a board responsibility",
          "Neither matters for small institutions",
          "Adoption automatically produces transformation",
          "Transformation precedes adoption"
        ],
        "a": 0,
        "fb": "Efficiency gains accrue within existing boundaries; business-model reinvention requires the board to treat AI as a strategy question."
      },
      {
        "q": "Under NRB's framework and convergent international models, explainability, human oversight and named accountability are best understood as:",
        "opts": [
          "Optional guidance for small banks",
          "The licence to operate advanced AI in a regulated institution",
          "Requirements that expire after validation",
          "Constraints that limit advanced AI adoption"
        ],
        "a": 1,
        "fb": "They are what makes sophisticated deployment defensible to a supervisor, a customer and a board — not obstacles to it."
      }
    ]
  }
];
