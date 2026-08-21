/* =============================================================
   COURSE CONTENT — AI for Financial Professionals
   -------------------------------------------------------------
   Edit module titles, durations, objectives, sections, activities
   and assessments here.  Each section's "html" accepts normal HTML.

   IMPORTANT: quiz "a" is the ZERO-BASED index of the correct answer
   within that question's "opts" array. If you reorder options you
   must update "a" to match.
   ============================================================= */

const COURSE = {
  "title": "AI for Financial Professionals",
  "lessons": [
    {
      "id": "m1",
      "tag": "Module 1",
      "time": "40 min",
      "title": "AI Foundations for Banking",
      "summary": "The concepts and vocabulary every banker now needs",
      "objectives": [
        "Distinguish artificial intelligence, machine learning, deep learning and generative AI — and know which matters where in a bank",
        "Explain supervised, unsupervised and reinforcement learning using banking examples",
        "Understand how a machine-learning model differs from the statistical scorecards banks have used for decades",
        "Read and interpret the core performance metrics used to judge financial models: accuracy, precision, recall, AUC and the Gini coefficient",
        "Speak credibly with vendors, IT teams and regulators using correct terminology"
      ],
      "sections": [
        {
          "h": "Why this matters now, and to you",
          "html": "\n        <p>Artificial intelligence has moved from a technology conversation to a governance conversation. Nepal Rastra Bank has issued Artificial Intelligence Guidelines covering licensed institutions — Class A through D, along with payment system operators and payment service providers — and those guidelines place ultimate accountability for AI outcomes on the <strong>board and senior management</strong>, not on the IT department.</p>\n        <p>That single fact changes who needs to understand this material. A credit officer approving a model-assisted decision, a compliance officer signing off on transaction monitoring, a branch manager explaining a declined loan to a customer — each is now operating inside an AI-governed process. This module builds the vocabulary and the mental models that make the rest of the programme possible.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · SAS / Juniper</span></div><p>This is not a distant trend. Juniper Research projects that AI spending in the banking industry will reach <b>US$85 billion by 2030</b>, implying a compound annual growth rate of around 55%. SAS research finds that <b>60% of banking organisations have already deployed generative AI use cases</b>, with a further 38% expecting to do so within two years.</p><p class=\"quote\">“Trust is earned in drops and lost in buckets.”<br><span class=\"who\">— SAS, <i>From Algorithms to Impact: Banking's AI Future</i></span></p></div>"
        },
        {
          "h": "The four terms, correctly used",
          "html": "\n        <p>These words are used loosely in vendor presentations. Precision protects you.</p>\n        <ul class=\"body\">\n          <li><strong>Artificial Intelligence (AI)</strong> — the broad field of systems performing tasks that normally require human intelligence. A rules-based fraud engine is AI, even without learning.</li>\n          <li><strong>Machine Learning (ML)</strong> — systems that learn patterns from historical data rather than following rules a person wrote. This is what powers modern credit scoring and fraud detection.</li>\n          <li><strong>Deep Learning</strong> — ML using multi-layered <span class=\"term\">neural networks</span>. Strong on unstructured data: images, documents, voice, natural language.</li>\n          <li><strong>Generative AI</strong> — models that produce new content: text, summaries, code, images. This is the large-language-model wave now entering banking operations (Module 5).</li>\n        </ul>\n        <p>A practical translation: most <em>decisioning</em> in banks (credit, fraud, pricing) is machine learning. Most <em>productivity</em> use (drafting, summarising, searching policy) is generative AI. They carry different risks and different regulatory expectations.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · FIS</span></div><p>FIS draws the same three-way distinction in <i>AI Alchemy</i>: <b>machine learning</b> develops algorithms that find patterns in data; <b>predictive AI</b> forecasts future outcomes and underpins process automation; and <b>generative AI</b> creates new content from prompts using large language models. Machine learning is the broader concept that contains both of the others — precision in these terms is what allows you to ask a vendor the right question.</p></div>"
        },
        {
          "h": "Three ways a model learns — with banking examples",
          "html": "\n        <ul class=\"body\">\n          <li><strong>Supervised learning</strong> — learns from labelled historical outcomes. You show it thousands of past loans marked \"defaulted\" or \"repaid\", and it learns to estimate default probability on new applications. Nearly all credit and fraud models are supervised.</li>\n          <li><strong>Unsupervised learning</strong> — finds structure without labels. Used to segment customers into behavioural groups, or to flag transactions that simply do not resemble anything normal — valuable in AML where you do not know every fraud pattern in advance.</li>\n          <li><strong>Reinforcement learning</strong> — learns by trial, error and reward. Used in areas like collections strategy optimisation, dynamic pricing and algorithmic execution. Rare in Nepali banks today, but relevant as sophistication grows.</li>\n        </ul>"
        },
        {
          "h": "How this differs from the scorecard you already know",
          "html": "\n        <p>Banks have used statistical models for decades. A traditional <span class=\"term\">credit scorecard</span> is typically a logistic regression: a modest number of variables, each with a transparent weight, producing points that sum to a score. Its great virtue is that it is <em>interpretable</em> — you can tell an applicant exactly which factors counted against them.</p>\n        <p>A modern machine-learning model may consider hundreds of variables and capture non-linear interactions a scorecard cannot. It typically predicts better. Its weakness is opacity: the reasoning is distributed across the model rather than readable from a table.</p>\n        <p>This is the central trade-off of AI in regulated finance, and you will meet it repeatedly in this programme: <strong>predictive power versus explainability</strong>. NRB's guidelines require AI applications to be transparent, explainable, fair and accountable — which means the more powerful model is not automatically the permissible one.</p>\n        <div class=\"callout note\"><h4>Deeper dive: why \"the model is more accurate\" is an incomplete argument</h4><p style=\"margin:0\">A vendor demonstrating a two-point Gini improvement is describing a benefit. The relevant questions are: can we explain individual decisions to customers and supervisors; can we evidence that it does not discriminate; can we monitor it for drift; and who is accountable when it errs. A model that cannot satisfy those is a liability regardless of its accuracy.</p></div>"
        },
        {
          "h": "Reading model performance like a banker",
          "html": "\n        <p>You do not need to build models, but you must be able to challenge the numbers put in front of you.</p>\n        <ul class=\"body\">\n          <li><strong>Accuracy</strong> — share of all predictions that were correct. Dangerously misleading for rare events: if 0.5% of transactions are fraudulent, a model that approves everything is 99.5% \"accurate\" and catches nothing.</li>\n          <li><strong>Precision</strong> — of the cases the model flagged, how many were genuine. Low precision means your investigation team drowns in false positives.</li>\n          <li><strong>Recall (sensitivity)</strong> — of all genuine cases, how many the model caught. Low recall means real fraud or real defaults slipping through.</li>\n          <li><strong>AUC / ROC</strong> — a single measure (0.5 = random, 1.0 = perfect) of how well the model separates good from bad across all thresholds.</li>\n          <li><strong>Gini coefficient</strong> — the credit industry's preferred cousin of AUC (Gini = 2 × AUC − 1). A retail scorecard with a Gini around 0.4–0.6 is typically considered workable, though this varies by portfolio and market.</li>\n        </ul>\n        <p>Precision and recall pull against each other. Tightening a fraud model to catch more crime inevitably inconveniences more honest customers. That balance is a <strong>business decision, not a technical one</strong> — and it belongs to you, not to the data scientist.</p>"
        },
        {
          "h": "Structured and unstructured data",
          "html": "\n        <p><span class=\"term\">Structured data</span> sits in neat rows and columns: account balances, transaction amounts, repayment histories, demographics. It is what core banking systems produce and what traditional models consume.</p>\n        <p><span class=\"term\">Unstructured data</span> is everything else: scanned loan files, letters of credit, KYC documents, call recordings, emails, customer complaints. Industry estimates commonly put the majority of institutional data in this category, and until recently banks could not use it at scale. Deep learning and generative AI change that — which is precisely why document-heavy Nepali banking processes are such fertile ground for automation.</p>"
        },
        {
          "h": "What AI is not",
          "html": "\n        <p>Three corrections worth carrying into every vendor meeting:</p>\n        <ul class=\"body\">\n          <li><strong>It is not reasoning like a human.</strong> It is high-dimensional pattern recognition. It has no understanding of your credit policy unless that policy is represented in its data or instructions.</li>\n          <li><strong>It is not objective.</strong> A model trained on your historical decisions inherits your historical preferences, including the ones you would not defend publicly.</li>\n          <li><strong>It is not self-maintaining.</strong> Economies shift, customer behaviour shifts, fraud typologies shift. A model left unmonitored degrades — a phenomenon called <span class=\"term\">drift</span>, covered in Module 8.</li>\n        </ul>"
        }
      ],
      "practitioner": {
        "title": "Practitioner's note: the question that reframes a vendor pitch",
        "text": "When a vendor presents an AI solution, ask: <em>\"What data was this model trained on, and how similar is that population to our customers?\"</em> A fraud model trained on urban card transactions in another market may perform poorly on remittance-driven, mobile-first Nepali customers. Model performance is not portable — it is a property of the data it learned from."
      },
      "activity": {
        "title": "Workplace application",
        "text": "Identify one decision in your own department that currently relies on judgement or a simple rule — a limit approval, a flag for review, a customer segmentation. Write down: (a) what outcome you would want a model to predict, (b) what historical data would be needed to train it, and (c) whether a wrong prediction would be more costly as a false positive or a false negative. You have just written the opening of a model specification."
      },
      "takeaways": [
        "AI is the field, ML learns from data, deep learning handles unstructured data, generative AI creates content — each carries different risk",
        "Supervised learning dominates credit and fraud; unsupervised learning finds unknown patterns in AML",
        "Machine learning usually predicts better than scorecards but is harder to explain — and NRB requires explainability",
        "Accuracy is misleading for rare events; precision, recall, AUC and Gini are the meaningful measures",
        "The precision–recall trade-off is a business decision owned by the business, not by the data team"
      ],
      "quiz": [
        {
          "q": "A fraud model reports 99.4% accuracy on a portfolio where 0.6% of transactions are fraudulent. What should your first reaction be?",
          "opts": [
            "Accuracy is misleading here; ask for precision and recall",
            "Accuracy is the only metric that matters",
            "Ask them to raise accuracy to 100%",
            "Excellent — approve deployment"
          ],
          "a": 0,
          "fb": "With rare events, a model that flags nothing still scores ~99.4%. Precision and recall reveal whether it actually catches fraud."
        },
        {
          "q": "Which learning type is best suited to detecting entirely new, previously unseen money-laundering patterns?",
          "opts": [
            "Supervised learning on labelled past cases",
            "Unsupervised learning that flags abnormal behaviour",
            "No AI can assist here",
            "Reinforcement learning"
          ],
          "a": 1,
          "fb": "Unsupervised methods find what does not fit normal patterns — valuable when you cannot label typologies you have never seen."
        },
        {
          "q": "The central trade-off when replacing a logistic-regression scorecard with a complex ML model is…",
          "opts": [
            "Speed versus cost",
            "Onshore versus offshore hosting",
            "Predictive power versus explainability",
            "Retail versus corporate"
          ],
          "a": 2,
          "fb": "ML often predicts better but is harder to explain — and NRB's guidelines require transparency, explainability, fairness and accountability."
        },
        {
          "q": "Under NRB's AI Guidelines, ultimate accountability for outcomes produced by a bank's AI systems rests with…",
          "opts": [
            "The individual customer",
            "The IT department",
            "The software vendor",
            "The board of directors and senior management"
          ],
          "a": 3,
          "fb": "Accountability sits with the board and senior management — which is why business leaders, not just technologists, must understand these systems."
        },
        {
          "q": "'Recall' in a credit or fraud model measures…",
          "opts": [
            "What proportion of genuine cases the model successfully caught",
            "How much memory it uses",
            "How fast the model runs",
            "How many flagged cases were genuine"
          ],
          "a": 0,
          "fb": "Recall = of all true cases, how many were caught. Precision = of those flagged, how many were true. Low recall means real losses slipping through."
        }
      ]
    },
    {
      "id": "m2",
      "tag": "Module 2",
      "time": "45 min",
      "title": "The Data Foundation: Why Most Bank AI Projects Fail",
      "summary": "Data readiness, quality and the traps that sink models",
      "objectives": [
        "Explain why data quality — not algorithm choice — determines the success of most banking AI projects",
        "Identify the principal data problems in Nepali banking: silos, legacy core systems, paper records and inconsistent KYC",
        "Understand training, validation and test splits, and why they protect the bank",
        "Recognise the two most damaging technical traps: data leakage and class imbalance",
        "Assess whether a proposed use case is realistically supported by the data your institution actually holds"
      ],
      "sections": [
        {
          "h": "The uncomfortable industry truth",
          "html": "\n        <p>A large share of enterprise AI initiatives fail to reach production or deliver their expected value — a pattern consistently reported across industry studies. In banking, the cause is rarely the algorithm. It is almost always the data: fragmented, inconsistent, undocumented, or simply insufficient for the question being asked.</p>\n        <p>Practitioners routinely describe spending the majority of a project's effort on locating, cleaning and reconciling data rather than modelling it. Any vendor or internal team that glosses over data readiness is describing a demonstration, not a deployment.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · EY &amp; IIF</span></div><p>Research by Ernst &amp; Young and the Institute of International Finance identifies <b>data quality as the single most fundamental bottleneck</b> for financial institutions advancing AI, cited by the vast majority of firms. Data availability and the adaptability of training data rank second.</p><p>Almost all institutions surveyed pointed to <b>“noisy, outdated, inaccurate and poorly adaptable unstructured data”</b> as the primary barrier to deployment, with the shortage of labelled data a major constraint on technical implementation. Organisational factors — weak internal stakeholder support and immature technical infrastructure — follow closely behind.</p></div>"
        },
        {
          "h": "Where banking data actually lives — and why that hurts",
          "html": "\n        <p>A typical bank's information is scattered across systems that were never designed to speak to one another:</p>\n        <ul class=\"body\">\n          <li>The <strong>core banking system</strong> holds accounts, balances and transactions.</li>\n          <li>The <strong>loan origination system</strong> holds application data — often separately from performance data.</li>\n          <li><strong>Card and digital channels</strong> hold their own transaction streams.</li>\n          <li><strong>KYC and customer files</strong> may be part-digital, part-scanned, part-physical.</li>\n          <li><strong>Branch knowledge</strong> — the informal assessment of a borrower — is frequently unrecorded entirely.</li>\n        </ul>\n        <p>To build a credit model you must join application data to subsequent repayment behaviour for the same customer across several of these systems. If customer identification is inconsistent — a national ID recorded differently in two systems, or a customer holding relationships under slightly different names — that join fails silently, and the resulting dataset is quietly wrong.</p>"
        },
        {
          "h": "The Nepali context: specific, solvable constraints",
          "html": "\n        <p>Institutions in Nepal face a recognisable set of conditions:</p>\n        <ul class=\"body\">\n          <li><strong>Legacy core systems</strong> with limited data-extraction capability and short retention of historical states.</li>\n          <li><strong>Paper and scanned records</strong>, particularly in older loan files and rural branches — a genuine opportunity for document AI (Module 5), but a barrier for structured modelling today.</li>\n          <li><strong>Thin credit histories.</strong> Many customers, especially MSMEs and the newly banked, have limited formal borrowing records, which weakens traditional scoring and makes alternative data attractive — with the fairness cautions covered in Module 3.</li>\n          <li><strong>Rapidly growing digital transaction data</strong> from mobile wallets and QR payments, which is often the richest and most under-used asset a bank holds.</li>\n          <li><strong>Language and script inconsistency</strong> — Nepali and English, Devanagari and Roman transliteration in names and addresses, which complicates matching and screening.</li>\n        </ul>"
        },
        {
          "h": "How a model is actually trained: the three-way split",
          "html": "\n        <p>Data is divided before modelling begins:</p>\n        <ol class=\"body\">\n          <li><strong>Training set</strong> — the majority of the data; the model learns its parameters here.</li>\n          <li><strong>Validation set</strong> — used to tune settings and compare candidate models.</li>\n          <li><strong>Test set</strong> — held back, untouched, and used once to estimate real-world performance.</li>\n        </ol>\n        <p>In credit, an <strong>out-of-time</strong> test is stronger still: train on earlier years, test on a later year the model has never seen. This is the only honest way to know whether a model will hold up as conditions change.</p>\n        <div class=\"callout note\"><h4>Deeper dive: overfitting, in one sentence</h4><p style=\"margin:0\">A model that memorises the peculiarities of its training data rather than learning generalisable patterns is <strong>overfitted</strong> — it looks superb in development and disappoints in production. The gap between training performance and hold-out test performance is your early warning, and it is a fair question to put to any model developer or vendor.</p></div>"
        },
        {
          "h": "Trap one: data leakage",
          "html": "\n        <p><span class=\"term\">Data leakage</span> occurs when information that would not be available at the moment of decision leaks into the training data. It produces spectacular, entirely fictitious performance.</p>\n        <p>A classic banking example: including a \"days past due\" field, or the existence of a collections note, when predicting default at application. Both are consequences of default, not predictors available at underwriting. The model appears to achieve extraordinary accuracy, is deployed, and immediately fails — because at the moment a real application arrives, those fields are empty.</p>\n        <p><strong>The test to apply:</strong> for every variable, ask \"would we genuinely possess this value, in this form, at the exact moment the decision is made?\" If not, it must be removed.</p>"
        },
        {
          "h": "Trap two: class imbalance",
          "html": "\n        <p>Fraud is rare. Default, in a healthy portfolio, is uncommon. When one outcome represents a very small share of cases, a model can achieve excellent headline accuracy by simply predicting \"no\" every time.</p>\n        <p>Practitioners address this with resampling techniques, class weighting, and — critically — by evaluating on precision, recall and related measures rather than accuracy. As a business reviewer, your role is to insist on the right metric and to specify the cost asymmetry: what does a missed fraud cost the bank, versus a false alarm inflicted on a good customer?</p>"
        },
        {
          "h": "Governance of the data itself",
          "html": "\n        <p>NRB's guidelines require compliance with privacy law, including Nepal's Privacy Act (2075), explicit customer consent for the use of personal data, and a customer right to opt out of AI-driven services. That has direct data implications:</p>\n        <ul class=\"body\">\n          <li><strong>Lineage</strong> — you must be able to trace where each data element came from.</li>\n          <li><strong>Purpose limitation</strong> — data gathered for account opening cannot be silently repurposed for unrelated profiling.</li>\n          <li><strong>Consent records</strong> — must be maintained and auditable.</li>\n          <li><strong>Retention and access control</strong> — training datasets containing customer information are themselves a security asset requiring protection.</li>\n        </ul>\n        <p>Institutions should always work from the current version of NRB's guidelines and circulars, as regulatory expectations in this area continue to evolve.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · BCG</span></div><p>One important nuance from BCG's <i>Generative AI in Banking</i>: classic predictive AI and generative AI run on <b>largely separate technology stacks</b>. Predictive models depend on a mature data warehouse, feature stores and model training pipelines. Generative AI depends instead on pre-trained foundation models, vector stores, caches and retrieval components — and requires no additional model training.</p><p>The practical implication for an institution with imperfect data: a weak data warehouse is a genuine blocker for a new credit scorecard, but it is <b>not necessarily a blocker for a document-processing or policy-assistant use case</b>. Data remediation and generative AI pilots can proceed in parallel.</p></div>"
        }
      ],
      "practitioner": {
        "title": "Practitioner's note: the six-month rule",
        "text": "Before approving any AI initiative, ask a single grounding question: <em>\"Can we assemble a clean, joined dataset for this use case within six months, and do we have at least two to three years of relevant outcome history?\"</em> If the honest answer is no, the correct first project is data remediation — not AI. Institutions that skip this step typically spend far more discovering it later."
      },
      "activity": {
        "title": "Workplace application",
        "text": "Pick one use case from your department. List every data field the model would need. Beside each, mark: <strong>(A)</strong> available and reliable today, <strong>(B)</strong> exists but is unclean or in another system, <strong>(C)</strong> not captured at all. If more than a third of your fields fall into B or C, you have just built the business case for a data project — which is a more valuable finding than a failed model."
      },
      "takeaways": [
        "Most banking AI failures are data failures, not algorithm failures",
        "Fragmented core, origination, channel and KYC systems make joining data the hardest step",
        "Train / validation / test splits — ideally out-of-time — are what prove a model will generalise",
        "Data leakage produces fake accuracy; ask whether each field truly exists at the moment of decision",
        "Rare outcomes demand precision and recall, plus an explicit view of the cost of each error type",
        "Consent, lineage, purpose limitation and retention are regulatory requirements, not IT housekeeping"
      ],
      "quiz": [
        {
          "q": "A default-prediction model includes 'number of collection calls made' as a variable and shows remarkable accuracy. What is wrong?",
          "opts": [
            "Nothing — it is a strong predictor",
            "Data leakage: that information does not exist at the moment of underwriting",
            "Collection calls should be counted monthly",
            "The variable should be weighted higher"
          ],
          "a": 1,
          "fb": "Collection calls are a consequence of default, unavailable at application. This is textbook leakage — impressive in testing, useless in production."
        },
        {
          "q": "Why is an out-of-time test set particularly valuable in credit modelling?",
          "opts": [
            "It is faster to compute",
            "It reduces storage costs",
            "It shows whether the model holds up on a later period it never saw",
            "It is required for all marketing models"
          ],
          "a": 2,
          "fb": "Training on earlier periods and testing on a later one is the honest test of whether performance survives changing conditions."
        },
        {
          "q": "Which is the most realistic first project for a bank whose customer identifiers are inconsistent across core, cards and origination systems?",
          "opts": [
            "Buy a larger server",
            "Skip validation to save time",
            "Deploy a deep-learning credit model immediately",
            "Remediate and reconcile the data foundation"
          ],
          "a": 3,
          "fb": "Models built on a broken join are quietly wrong. Data remediation is unglamorous but is the genuine prerequisite."
        },
        {
          "q": "NRB's guidelines require, among other things, that banks…",
          "opts": [
            "Obtain explicit customer consent for personal-data use and allow opt-out of AI-driven services",
            "Publish their model source code",
            "Use only foreign-built models",
            "Avoid AI in customer service entirely"
          ],
          "a": 0,
          "fb": "Explicit consent, privacy compliance aligned with the Privacy Act, and a customer right to opt out are core requirements."
        },
        {
          "q": "In a portfolio where 0.3% of transactions are fraudulent, the biggest modelling danger is…",
          "opts": [
            "The model will be too slow",
            "Class imbalance — high accuracy achieved by predicting 'not fraud' every time",
            "Excessive explainability",
            "Too much customer consent"
          ],
          "a": 1,
          "fb": "Severe class imbalance makes accuracy meaningless; evaluation must use precision, recall and the business cost of each error."
        }
      ]
    },
    {
      "id": "m3",
      "tag": "Module 3",
      "time": "50 min",
      "title": "AI in Credit Risk & Lending",
      "summary": "Scoring, alternative data, early warning and fair lending",
      "objectives": [
        "Map where AI is applied across the full credit lifecycle, from origination to collections",
        "Compare traditional scorecards with machine-learning approaches on the dimensions that matter to a credit committee",
        "Evaluate alternative data responsibly, including its financial-inclusion promise and its fairness risks",
        "Understand explainability techniques that make model decisions defensible to customers and supervisors",
        "Recognise and test for discriminatory outcomes, including proxy discrimination",
        "Understand how AI strengthens early-warning systems and portfolio monitoring"
      ],
      "sections": [
        {
          "h": "AI across the credit lifecycle",
          "html": "\n        <p>Credit is the most mature application of AI in banking, and NRB explicitly contemplates credit assessment as a permitted use. The opportunity spans the whole lifecycle:</p>\n        <ul class=\"body\">\n          <li><strong>Origination</strong> — application scoring, automated document verification, income estimation, limit setting.</li>\n          <li><strong>Underwriting support</strong> — risk-based pricing, condition setting, exception flagging for human review.</li>\n          <li><strong>Monitoring</strong> — behavioural scoring, early-warning signals, covenant and cash-flow surveillance.</li>\n          <li><strong>Collections</strong> — prioritising accounts, selecting contact channel and timing, predicting cure likelihood.</li>\n          <li><strong>Portfolio and capital</strong> — PD, LGD and EAD estimation, stress testing, concentration analysis, IFRS 9 expected-credit-loss inputs.</li>\n        </ul>\n        <p>The highest near-term value in many institutions is not a better origination score. It is <strong>monitoring</strong> — catching deterioration months earlier than a quarterly review cycle would.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · EY / BCG</span></div><p>Documented results from banks applying AI across the credit process:</p><ul><li>One bank applying large models across end-to-end credit approval reduced <b>manual data entry by nearly 80%</b> and <b>halved the overall approval cycle</b>; intelligent text review cut review time per file by around 15% (EY).</li><li>BCG reports institutions processing loan-application documents <b>in minutes rather than days</b>, and using generative AI to monitor SME credit portfolios <b>continuously rather than by periodic sampling</b>.</li></ul><p>Note what these have in common: the gains come from removing manual handling and shortening cycle time — not from a marginally better score.</p></div>"
        },
        {
          "h": "Scorecard versus machine learning: an honest comparison",
          "html": "\n        <p>Both approaches remain legitimate. The choice depends on portfolio, data and regulatory posture.</p>\n        <ul class=\"body\">\n          <li><strong>Traditional scorecard (logistic regression).</strong> Transparent, stable, well understood by regulators, easy to explain to a declined applicant, straightforward to validate. Limited in capturing complex interactions.</li>\n          <li><strong>Machine learning (gradient boosting, random forests, neural networks).</strong> Typically superior discrimination, especially with many variables or non-linear relationships; handles alternative data well. Harder to explain, more prone to overfitting, requires more rigorous monitoring.</li>\n        </ul>\n        <p>Many institutions adopt a pragmatic middle path: a machine-learning model used as a <strong>challenger</strong> alongside the incumbent scorecard, or ML used for prioritisation and early warning while the binding credit decision remains on an explainable model. This preserves auditability while capturing much of the analytical benefit.</p>"
        },
        {
          "h": "Alternative data: promise and peril",
          "html": "\n        <p>Where formal credit histories are thin — a defining feature of MSME and newly banked segments in Nepal — <span class=\"term\">alternative data</span> can extend credit to viable borrowers who are invisible to conventional scoring:</p>\n        <ul class=\"body\">\n          <li>Transaction and cash-flow behaviour from accounts and digital wallets</li>\n          <li>Remittance inflow regularity — a genuinely informative signal in the Nepali economy</li>\n          <li>Utility, telecom and rent payment records</li>\n          <li>Merchant QR and point-of-sale turnover for small businesses</li>\n          <li>Supply-chain and invoice data for SMEs</li>\n        </ul>\n        <p>This is one of the most powerful financial-inclusion levers available to Nepali banks. It is also where fairness risk concentrates. Some data sources correlate with geography, ethnicity, gender or caste. A model that uses them may produce systematically different outcomes for protected groups without any variable explicitly naming those groups — the phenomenon known as <span class=\"term\">proxy discrimination</span>.</p>\n        <div class=\"callout warn\"><h4>Caution: the inclusion paradox</h4><p style=\"margin:0\">Alternative data can simultaneously widen access and encode disadvantage. A borrower in a district with weaker digital infrastructure may present a thinner data footprint and be scored worse for reasons unrelated to creditworthiness. Testing outcomes across regions and segments is not optional — it is how you avoid building exclusion into an inclusion initiative.</p></div>"
        },
        {
          "h": "Making the black box explainable",
          "html": "\n        <p>NRB requires explainable, transparent and fair AI. Two techniques dominate practice:</p>\n        <ul class=\"body\">\n          <li><strong>SHAP values</strong> — quantify how much each variable contributed to an individual prediction, allowing a statement such as \"this application scored lower principally because of irregular cash-flow patterns and short account tenure.\"</li>\n          <li><strong>LIME</strong> — builds a simple, interpretable approximation of the model around a single case to show which factors drove that decision.</li>\n        </ul>\n        <p>Two distinct obligations follow. <strong>Global explainability</strong> tells your risk committee and supervisor how the model behaves overall. <strong>Local explainability</strong> tells an individual customer why <em>their</em> application was declined. A model that cannot deliver the second creates real conduct and reputational exposure.</p>"
        },
        {
          "h": "Testing for discriminatory outcomes",
          "html": "\n        <p>Fairness must be measured, not assumed. Practical steps for a credit function:</p>\n        <ol class=\"body\">\n          <li><strong>Segment the outcomes.</strong> Compare approval rates, average scores and pricing across gender, geography, age band and any locally relevant protected characteristic.</li>\n          <li><strong>Test the proxies.</strong> Check whether excluded protected attributes can be predicted from the variables you did include — if they can, the model may be using them indirectly.</li>\n          <li><strong>Compare error rates, not just approvals.</strong> A model can approve two groups equally while being far less accurate for one of them.</li>\n          <li><strong>Document the review.</strong> Under a board-accountable regime, evidencing that you tested is as important as the result.</li>\n        </ol>"
        },
        {
          "h": "Early-warning systems: the underrated win",
          "html": "\n        <p>Traditional credit review is periodic and backward-looking. A machine-learning early-warning system observes behavioural signals continuously — declining account turnover, changing payment timing, increasing reliance on overdraft, deteriorating supplier payments, external news — and ranks the portfolio by probability of deterioration.</p>\n        <p>The value is time. Identifying a struggling borrower months before the first missed payment expands the range of workable interventions: restructuring, additional security, tightened monitoring, or an orderly exit. For portfolio quality, early detection is frequently worth more than marginal improvement in origination scoring.</p>"
        },
        {
          "h": "Keeping the human in the loop",
          "html": "\n        <p>A defensible operating model in a regulated environment usually looks like this:</p>\n        <ul class=\"body\">\n          <li><strong>Automate the clear cases</strong> — strong applications approved and weak ones declined by rule, with full audit trail.</li>\n          <li><strong>Route the grey zone to humans</strong> — where model confidence is low or the exposure is material.</li>\n          <li><strong>Preserve override authority</strong> — with mandatory documented justification, since overrides are themselves valuable training data and a governance signal.</li>\n          <li><strong>Monitor the humans too</strong> — persistent override patterns may indicate a model problem, a policy problem, or a conduct problem.</li>\n        </ul>"
        }
      ],
      "practitioner": {
        "title": "Practitioner's note: the decline letter test",
        "text": "Before approving any credit model for production, apply this test: <em>take three declined applications and write the explanation you would give each customer, and the one you would give a supervisor.</em> If your team cannot produce clear, specific, accurate reasons from the model's output, the model is not ready for a regulated credit decision — however strong its Gini."
      },
      "activity": {
        "title": "Workplace application",
        "text": "Take a segment your institution currently finds difficult to lend to — thin-file MSMEs, first-time borrowers, or remittance-dependent households. Draft a one-page outline: which alternative data signals could responsibly inform the decision; which fairness tests you would run before launch; and how you would explain a decline. This is the skeleton of a genuine, defensible inclusion proposal."
      },
      "takeaways": [
        "AI spans the credit lifecycle; early-warning monitoring is often the highest-value starting point",
        "Scorecards remain defensible; ML often predicts better — a challenger-model approach captures both",
        "Alternative data can expand inclusion but concentrates fairness risk through proxy discrimination",
        "SHAP and LIME provide the local explanations regulators and customers require",
        "Fairness must be tested across segments, on both approval rates and error rates, and documented",
        "Automate the clear cases, route the grey zone to humans, and monitor overrides"
      ],
      "quiz": [
        {
          "q": "A model excludes gender entirely, yet approves women at a materially lower rate. The most likely explanation is…",
          "opts": [
            "Coincidence; no action needed",
            "Gender must be added back as a variable",
            "Proxy discrimination — included variables correlate with gender",
            "The model is broken and must be deleted"
          ],
          "a": 2,
          "fb": "Removing a protected attribute does not remove its influence; correlated variables can act as proxies. This must be tested for and addressed."
        },
        {
          "q": "Which explainability requirement matters most when declining an individual applicant?",
          "opts": [
            "The size of the training dataset",
            "Global explainability of overall model behaviour",
            "The vendor's marketing material",
            "Local explainability of that specific decision"
          ],
          "a": 3,
          "fb": "Local explanation — via SHAP or LIME — is what allows you to tell that customer why their application was declined."
        },
        {
          "q": "For many portfolios, the highest near-term value from AI in credit is…",
          "opts": [
            "Early-warning monitoring that detects deterioration months earlier",
            "Faster printing of loan documents",
            "Marginally better origination scoring",
            "Replacing all credit officers"
          ],
          "a": 0,
          "fb": "Continuous behavioural monitoring buys time — and time expands the set of workable interventions."
        },
        {
          "q": "A 'challenger model' approach means…",
          "opts": [
            "Challenging the regulator",
            "Running an ML model alongside the incumbent scorecard to compare performance before relying on it",
            "Letting two banks compete",
            "Removing human review"
          ],
          "a": 1,
          "fb": "Champion/challenger lets you evidence performance safely while keeping an explainable model in the binding decision."
        },
        {
          "q": "Which of these is a genuine fairness test for a credit model?",
          "opts": [
            "Checking whether the model runs quickly",
            "Verifying the model uses at least 100 variables",
            "Comparing approval rates AND error rates across gender, geography and age bands",
            "Confirming the vendor is reputable"
          ],
          "a": 2,
          "fb": "Equal approval rates can still mask unequal accuracy. Fairness testing must examine both, and be documented."
        }
      ]
    },
    {
      "id": "m4",
      "tag": "Module 4",
      "time": "50 min",
      "title": "AI in Fraud, AML & Financial Crime",
      "summary": "Detection, false positives, networks and the new AI-enabled threats",
      "objectives": [
        "Explain how machine learning improves on rules-based transaction monitoring — and why rules still matter",
        "Address the false-positive burden that dominates AML operations",
        "Understand network and graph analytics for detecting mule accounts and layering",
        "Apply AI appropriately to sanctions screening, name matching and eKYC",
        "Recognise AI-enabled attacks against banks: deepfake authorisation fraud, voice cloning, synthetic identity and adversarial evasion",
        "Design a defensible hybrid monitoring architecture"
      ],
      "sections": [
        {
          "h": "Why rules alone no longer suffice",
          "html": "\n        <p>Traditional transaction monitoring applies deterministic thresholds: flag cash deposits above a value, flag rapid movement in and out, flag transfers to high-risk jurisdictions. Rules are transparent, explainable and easy to evidence to a supervisor — genuine virtues.</p>\n        <p>They are also predictable, and predictability is exploitable. Criminals learn the thresholds and structure activity beneath them. Rules generate high alert volumes with poor precision, and they cannot detect a typology nobody has yet written a rule for.</p>\n        <p>Machine learning complements rules by scoring behaviour against learned patterns rather than fixed limits, adapting as behaviour changes and identifying anomalies that no threshold anticipated.</p>"
        },
        {
          "h": "The false-positive problem — the real operational pain",
          "html": "\n        <p>In conventional AML monitoring, the overwhelming majority of alerts are not suspicious activity. Industry commentary regularly describes false-positive rates in the very high range, meaning investigators spend most of their working lives clearing legitimate customers.</p>\n        <p>This is not merely inefficient — it is a <strong>detection risk</strong>. An overwhelmed team triages superficially, and genuine cases are cleared in the flood. Reducing false positives is therefore a compliance improvement, not just a cost saving.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · EY · Salesforce</span></div><p>EY reports banks that implemented end-to-end AI-powered AML detection <b>reduced screening workloads while significantly increasing AML reporting rates</b> — better detection and lower effort simultaneously, which is the outcome that justifies the investment to a board.</p><p>Salesforce, drawing on industry analysis, estimates AI could <b>cut compliance costs by 6–10%</b> by streamlining identification, verification and risk screening. Separately, <b>77% of consumers</b> say they are interested in AI that prevents and detects fraud — this is one of the few AI applications customers actively want.</p></div>\n        <p>Machine learning contributes in three practical ways:</p>\n        <ul class=\"body\">\n          <li><strong>Alert scoring</strong> — ranking alerts so investigators address the most probable cases first.</li>\n          <li><strong>Alert suppression</strong> — learning from historically closed alerts which patterns reliably prove benign, with governance and periodic review.</li>\n          <li><strong>Contextual enrichment</strong> — automatically assembling customer history, related parties and prior alerts so an investigator begins with a complete picture rather than assembling one.</li>\n        </ul>"
        },
        {
          "h": "Network analytics: seeing the structure, not the transaction",
          "html": "\n        <p>Sophisticated financial crime is structural. A single transaction may look ordinary; the <em>shape</em> of the network reveals the scheme. <span class=\"term\">Graph analytics</span> models customers and accounts as nodes and transfers as edges, exposing:</p>\n        <ul class=\"body\">\n          <li><strong>Mule networks</strong> — many accounts funnelling into a small number of collectors.</li>\n          <li><strong>Layering chains</strong> — funds moved through several accounts in rapid succession to obscure origin.</li>\n          <li><strong>Circular flows</strong> — money returning to its source through intermediaries.</li>\n          <li><strong>Shared-attribute clusters</strong> — distinct customers sharing a device, phone number, address or beneficiary.</li>\n        </ul>\n        <p>Given the scale and importance of remittance flows in Nepal, and the rapid growth of digital wallets, network-level visibility is especially relevant — mule recruitment tends to concentrate where accounts are numerous, new and low-value.</p>"
        },
        {
          "h": "Screening, name matching and eKYC",
          "html": "\n        <p>Sanctions and PEP screening is a persistent source of friction, largely because of names. Transliteration between Devanagari and Roman script, inconsistent ordering, honorifics and spelling variants generate both false matches and missed matches.</p>\n        <p>Machine-learning name matching handles phonetic similarity and transliteration variance far better than exact or simple fuzzy matching. In <span class=\"term\">eKYC</span>, AI supports document authenticity checks, optical character recognition of identity documents, and biometric face matching against a submitted document.</p>\n        <p>Two cautions. First, biometric and identity data is among the most sensitive information a bank holds and attracts the strictest privacy obligations. Second, presentation attacks — printed photographs, replayed video, deepfake imagery — are advancing, so liveness detection and layered verification are essential rather than optional.</p>"
        },
        {
          "h": "The new threat: AI used against the bank",
          "html": "\n        <p>This deserves the attention of every professional in the room. The same technologies described in this programme are available to attackers.</p>\n        <ul class=\"body\">\n          <li><strong>Deepfake authorisation fraud.</strong> Synthetic video and audio have been used internationally to impersonate senior executives and authorise fraudulent transfers, including in reported cases involving video calls with multiple fabricated participants. Any control that relies on recognising a familiar face or voice is now weak.</li>\n          <li><strong>Voice cloning.</strong> A short sample of speech can be sufficient to generate convincing synthetic audio — a direct threat to voice-based authentication and to telephone instruction processes. FIS specifically flags the rise of <b>spear-phishing attacks using AI voice cloning</b>, including fraudsters impersonating a family member in an emergency to trigger an urgent transfer — a technique equally effective against a relationship manager.</li>\n          <li><strong>Synthetic identity fraud.</strong> Fabricated identities combining real and invented attributes, patiently built into good credit behaviour before a coordinated \"bust-out\".</li>\n          <li><strong>Industrialised social engineering.</strong> Generative models produce fluent, personalised phishing at scale, eliminating the clumsy language that once made fraudulent messages easy to spot.</li>\n          <li><strong>Adversarial evasion.</strong> Attackers probe a detection model's boundaries and shape activity to remain just beneath them.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The control implication</h4><p style=\"margin:0\">Authentication must shift from \"do I recognise this person?\" to verification through independent channels: call-backs to registered numbers, dual authorisation for material payments, agreed challenge procedures for high-value instructions, and staff training that explicitly assumes voice and video can be fabricated. Communicate this to relationship managers and treasury staff — they are the targets.</p></div>"
        },
        {
          "h": "Designing a defensible hybrid architecture",
          "html": "\n        <p>Regulators expect explainable controls; criminals exploit predictable ones. A layered design satisfies both:</p>\n        <ol class=\"body\">\n          <li><strong>Retain deterministic rules</strong> for regulatory thresholds and reporting obligations — clear, auditable, non-negotiable.</li>\n          <li><strong>Add ML scoring</strong> above the rules to prioritise alerts and surface anomalies rules would miss.</li>\n          <li><strong>Add network analytics</strong> to detect structures invisible at the transaction level.</li>\n          <li><strong>Keep investigators central</strong> — AI directs attention; humans reach conclusions and file reports.</li>\n          <li><strong>Feed outcomes back</strong> — confirmed and dismissed cases become training data, provided feedback is governed rather than automatic.</li>\n        </ol>"
        },
        {
          "h": "What must remain human",
          "html": "\n        <p>The decision to file a suspicious transaction report, to exit a customer relationship, or to restrict an account carries legal and conduct consequences. These belong to accountable individuals. AI's proper role in financial crime is to <strong>direct scarce investigative attention to where it is most likely to matter</strong> — a genuinely transformative contribution that does not require ceding judgement.</p>"
        }
      ],
      "practitioner": {
        "title": "Practitioner's note: the call-back rule",
        "text": "The single most effective control against deepfake and voice-cloning fraud costs nothing: <em>for any payment instruction above a defined threshold, verify through an independently sourced channel</em> — a phone number from your records, never one supplied in the request itself. Institutions that have adopted a strict, no-exceptions call-back policy have prevented losses that no detection model would have caught in time."
      },
      "activity": {
        "title": "Workplace application",
        "text": "Map your institution's current process for authorising a high-value payment instruction received remotely. Identify every point at which the control depends on someone recognising a voice, a face, an email address or a signature. For each, write what an independent verification step would look like. Present the result to your operational risk or compliance colleagues — this exercise regularly uncovers a live exposure."
      },
      "takeaways": [
        "Rules are explainable but predictable; ML adds adaptive detection — use both",
        "False positives are a detection risk, not merely a cost; alert scoring and enrichment materially help",
        "Graph analytics exposes mule networks and layering that transaction-level review cannot see",
        "AI improves name matching and eKYC, but biometric data carries the strictest privacy duties",
        "Deepfakes, voice cloning, synthetic identity and industrialised phishing are active threats — verify through independent channels",
        "AI directs investigative attention; filing and exit decisions remain human and accountable"
      ],
      "quiz": [
        {
          "q": "Why is a very high AML false-positive rate a compliance risk rather than just a cost problem?",
          "opts": [
            "It is not a risk at all",
            "It increases server costs",
            "Regulators reward high alert volumes",
            "Overwhelmed investigators triage superficially, so genuine cases get cleared in the flood"
          ],
          "a": 3,
          "fb": "Alert overload degrades investigation quality. Reducing false positives improves genuine detection."
        },
        {
          "q": "Graph or network analytics is most useful for detecting…",
          "opts": [
            "Mule networks, layering chains and circular flows across many accounts",
            "Interest rate errors",
            "Branch queue lengths",
            "A single large cash deposit"
          ],
          "a": 0,
          "fb": "Individually ordinary transactions can form a revealing structure. Networks make that structure visible."
        },
        {
          "q": "A relationship manager receives a video call from a client who looks and sounds correct, instructing an urgent large transfer. Best response?",
          "opts": [
            "Proceed — video confirms identity",
            "Verify via a call-back to the number held in bank records before acting",
            "Email the address given during the call",
            "Ask the caller to repeat the request"
          ],
          "a": 1,
          "fb": "Deepfake video and cloned voice make recognition unreliable. Independent-channel verification is the effective control."
        },
        {
          "q": "In a defensible hybrid monitoring architecture, deterministic rules are retained mainly because…",
          "opts": [
            "They are cheaper",
            "Regulators forbid machine learning",
            "They are transparent, auditable and tied to regulatory thresholds and reporting duties",
            "They catch all fraud"
          ],
          "a": 2,
          "fb": "Rules provide clear regulatory auditability; ML adds adaptive detection on top. The combination satisfies both supervisor and threat."
        },
        {
          "q": "Which decision should remain with an accountable human?",
          "opts": [
            "Ranking alerts by risk",
            "Enriching an alert with customer history",
            "Sorting the investigation queue",
            "Filing a suspicious transaction report or exiting a customer"
          ],
          "a": 3,
          "fb": "Reporting and relationship-exit decisions carry legal and conduct consequences and must rest with accountable individuals."
        }
      ]
    },
    {
      "id": "m5",
      "tag": "Module 5",
      "time": "55 min",
      "title": "Generative AI in Banking Operations",
      "summary": "Large language models, document automation and safe professional use",
      "objectives": [
        "Understand what a large language model is, how it differs from a predictive model, and where it belongs in a bank",
        "Identify high-value generative AI use cases in banking operations, credit and compliance",
        "Explain retrieval-augmented generation (RAG) and why it is the preferred pattern for regulated institutions",
        "Apply professional-grade prompting techniques to banking tasks",
        "Know precisely what must never be entered into a public AI tool",
        "Design human-in-the-loop review appropriate to the risk of each use case"
      ],
      "sections": [
        {
          "h": "A different kind of model, a different kind of risk",
          "html": "\n        <p>The models in Modules 3 and 4 are <em>predictive</em>: they output a probability. A <span class=\"term\">large language model</span> (LLM) is <em>generative</em>: it produces text. It works by repeatedly predicting the next fragment of language, having learned statistical patterns from an enormous body of text.</p>\n        <p>The consequence matters enormously in finance. A predictive model can be wrong in measurable, monitorable ways. A generative model can be wrong <strong>fluently and confidently</strong> — producing a well-formatted, professional-sounding paragraph containing an invented figure, a misquoted regulation or a non-existent precedent. This is <span class=\"term\">hallucination</span>, and it is the defining control problem of generative AI in banking.</p>"
        },
        {
          "h": "Where generative AI earns its place in a bank",
          "html": "\n        <p>The strongest early use cases share a common shape: high volume, language-heavy, and reviewable by a competent human.</p>\n        <ul class=\"body\">\n          <li><strong>Document processing.</strong> Extracting structured data from loan files, financial statements, letters of credit, invoices, board minutes and KYC documents. Given how much Nepali banking documentation is scanned or paper-based, this is frequently the largest available efficiency gain.</li>\n          <li><strong>Credit memo drafting.</strong> Assembling a first draft of a credit note from financial spreads, account behaviour and policy templates, which the analyst then verifies and sharpens.</li>\n          <li><strong>Policy and procedure Q&A.</strong> Allowing staff to ask \"what is our documentation requirement for an MSME term loan above this threshold?\" and receive a cited answer drawn from the bank's own approved documents.</li>\n          <li><strong>Customer service support.</strong> Drafting responses for agent review, summarising a customer's history before a call, translating between Nepali and English.</li>\n          <li><strong>Compliance and audit support.</strong> Summarising regulatory circulars, mapping obligations to internal controls, drafting first-pass audit narratives.</li>\n          <li><strong>Investigation summaries.</strong> Condensing lengthy transaction histories and prior alerts into a coherent case narrative for an investigator.</li>\n        </ul>"
        },
        {
          "h": "Retrieval-augmented generation: the pattern that makes this safe",
          "html": "\n        <p>A general LLM answers from its training data — which does not include your credit policy, your NRB circular file, or your product terms, and which may be out of date. <span class=\"term\">Retrieval-augmented generation (RAG)</span> solves this.</p>\n        <p>The mechanism is straightforward:</p>\n        <ol class=\"body\">\n          <li>The bank's approved documents are indexed into a searchable store.</li>\n          <li>When a user asks a question, the system first <strong>retrieves</strong> the most relevant passages from that store.</li>\n          <li>Those passages are supplied to the model along with the question, with an instruction to answer only from the provided material.</li>\n          <li>The answer is returned <strong>with citations</strong> to the source documents.</li>\n        </ol>\n        <p>Three benefits make RAG the default architecture for regulated institutions: answers are grounded in your own authoritative content; hallucination is substantially constrained; and every answer is traceable to a source a reviewer or auditor can check. When a vendor proposes an internal \"AI assistant\", ask immediately whether it is a RAG design and how citations are surfaced.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · BCG</span></div><p>A critical procurement warning from BCG: <b>production-grade RAG does not come off the shelf.</b> A basic RAG extracts text, splits it into chunks and searches them. A real banking implementation must additionally handle document layout, tables and figures, headings and hierarchy, hybrid keyword-and-vector search, re-ranking, multi-step retrieval, conversation management and topic changes.</p><p>BCG's conclusion is that live implementations follow one of two routes: an internal team building to measure, or <b>external vendor support accompanied by knowledge transfer and well-documented source code the bank can maintain if the vendor departs</b>. Write that requirement into the contract.</p></div>"
        },
        {
          "h": "Professional prompting for banking tasks",
          "html": "\n        <p>Output quality depends heavily on instruction quality. A dependable structure for professional work:</p>\n        <ul class=\"body\">\n          <li><strong>Role</strong> — \"You are a credit analyst at a commercial bank.\"</li>\n          <li><strong>Task</strong> — \"Summarise the borrower's liquidity position.\"</li>\n          <li><strong>Source</strong> — \"Use only the financial statements provided below.\"</li>\n          <li><strong>Format</strong> — \"Produce five bullet points, each citing the figure it relies on.\"</li>\n          <li><strong>Constraints</strong> — \"Do not infer any figure not present. Where data is missing, state that explicitly.\"</li>\n        </ul>\n        <p>That final constraint is the professional's habit. Instructing the model to <strong>declare gaps rather than fill them</strong> converts its most dangerous tendency into a useful one. Two further techniques: ask it to \"show the reasoning before the conclusion\" for analytical work, and provide two or three examples of a well-written output when you need it to match an internal house style.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · BCG / SAS</span></div><p>BCG observes that generative AI enables staff to respond roughly <b>three times faster</b> than when relying on traditional CRM systems and knowledge bases, and reports institutions where <b>as much as 95% of service requests</b> are handled by generative AI–powered bots.</p><p>SAS finds that among banks which successfully implemented generative AI, <b>90% saw improved employee satisfaction</b>, 88% enhanced risk management and compliance, 85% greater operational efficiency and 82% improved customer satisfaction — a reminder that the staff-experience benefit is often the one that wins internal support.</p></div>"
        },
        {
          "h": "Two ways to deploy a language model — and why it matters for compliance",
          "html": "\n        <p>Perhaps the most useful distinction in this entire module comes from BCG, which separates generative AI deployments into two fundamentally different archetypes. Confusing them is the source of a great deal of unnecessary regulatory anxiety.</p>\n        <ul class=\"body\">\n          <li><strong>Archetype 1 — the model as expert.</strong> The language model handles the whole task: understanding the question, reasoning, and expressing the answer. Suitable for <em>internal, expert-facing</em> work — ideation, structuring analysis, drafting, forming hypotheses. It is acceptable precisely because a qualified human verifies the output before it is used.</li>\n          <li><strong>Archetype 2 — the model as a tool around a deterministic core.</strong> The language model is used only at the edges: to interpret the customer's request and extract data from their words or documents, and then at the end to explain the outcome in natural language. <strong>The decision itself is made by the same rules, models and algorithms the bank used before generative AI existed.</strong> Suitable for customer-facing work where answers are used without further verification.</li>\n        </ul>\n        <p>This resolves the objection that generative AI is \"too unpredictable for banking\". In Archetype 2 the model never decides anything. It translates and it wordsmiths; the lending rule, the pricing model or the eligibility algorithm remains fully deterministic, testable and explainable. A customer-facing assistant built this way is <em>transparent in the context in which it operates</em>, which is exactly what a supervisor needs to see.</p>\n        <div class=\"callout note\"><h4>Applying this in practice</h4><p style=\"margin:0\">When a vendor proposes a customer-facing assistant, ask one question: <b>\"Does the language model make any decision, or does it only interpret input and explain the output of our existing rules?\"</b> If the model decides, you have inherited an explainability problem. If it translates, you have kept your existing controls and added a better interface.</p></div>\n        <p>BCG makes a parallel point about chatbot design. Approaches range from fully scripted flows (rigid but controlled), through core-flow-driven and meta-prompt-driven designs, to conversing directly with a raw model (fluent but uncontrolled). The <strong>optimal balance for banking sits in the middle</strong>: key conversation stages and transitions are scripted or managed by the model, while answers are generated under full control.</p>"
        },
        {
          "h": "What must never be entered into a public AI tool",
          "html": "\n        <p>Text submitted to a public consumer AI service may be stored and, depending on the provider and settings, used to improve future models. In a bank this is a data-loss vector and a privacy breach risk under the Privacy Act and NRB's requirements.</p>\n        <p><strong>Never enter into a public tool:</strong></p>\n        <ul class=\"body\">\n          <li>Customer names, account numbers, national ID or citizenship numbers, addresses or contact details</li>\n          <li>Any customer financial data, statements or transaction records</li>\n          <li>Credit files, internal ratings, or details of specific applications</li>\n          <li>Employee personal data</li>\n          <li>Unpublished financial results, strategy documents or board material</li>\n          <li>Security architecture, credentials, source code or system configuration</li>\n          <li>Suspicious activity information — which additionally raises tipping-off concerns</li>\n        </ul>\n        <p>The workable alternatives are an enterprise deployment with contractual guarantees that data is not used for training, a private or in-tenancy deployment, or a strict practice of anonymising and generalising before use. Every institution should hold a written, circulated acceptable-use policy on this point; if yours does not, that is a concrete action item from this module.</p>"
        },
        {
          "h": "Human-in-the-loop, calibrated to risk",
          "html": "\n        <p>Review intensity should follow consequence, not uniformity:</p>\n        <ul class=\"body\">\n          <li><strong>Low risk — light review.</strong> Internal meeting summaries, first-draft internal emails, brainstorming.</li>\n          <li><strong>Medium risk — substantive review by a competent person.</strong> Credit memo drafts, customer correspondence, policy answers, translated material.</li>\n          <li><strong>High risk — full verification against source, plus a second reviewer.</strong> Anything customer-facing that states obligations or figures; anything submitted to a regulator; anything entering a credit or compliance decision record.</li>\n          <li><strong>Prohibited without specific governance</strong> — autonomous customer-facing financial advice, automated adverse credit decisions without explainability, or any unreviewed regulatory submission.</li>\n        </ul>\n        <p>The accountability principle is simple and worth stating plainly to your teams: <strong>the professional who signs the work owns the work.</strong> \"The AI produced it\" is not a defence to a customer, an auditor or a supervisor.</p>"
        },
        {
          "h": "Measuring whether it is actually working",
          "html": "\n        <p>Generative AI pilots frequently generate enthusiasm and no evidence. Define the measure before you begin — time per document, error rate at review, first-contact resolution, days to credit decision — and capture a baseline. If a pilot cannot demonstrate improvement against a pre-agreed metric within a defined window, it should be stopped or redesigned rather than quietly continued.</p>"
        }
      ],
      "practitioner": {
        "title": "Practitioner's note: the citation test",
        "text": "Whenever an internal AI assistant answers a policy or regulatory question, require it to cite the specific document and clause — and then <em>actually open one citation at random each week</em>. Teams that perform this simple spot-check discover grounding failures early. Teams that trust the fluent formatting discover them in an audit finding."
      },
      "activity": {
        "title": "Workplace application",
        "text": "Select one recurring document your team produces — a credit summary, a customer letter, a compliance note. Write a full professional prompt for it using Role, Task, Source, Format and Constraints, including an explicit instruction to declare missing information rather than assume it. Then define the review step: who checks it, against what, before it leaves the department."
      },
      "takeaways": [
        "Generative models produce fluent text and can be confidently wrong — hallucination is the core control problem",
        "The best banking use cases are high-volume, language-heavy and human-reviewable",
        "RAG grounds answers in your own approved documents and supplies citations — the default safe pattern",
        "Structure prompts with Role, Task, Source, Format and Constraints; instruct the model to declare gaps",
        "Customer, credit, employee and security data must never enter a public AI tool",
        "Calibrate human review to risk; the professional who signs the work owns the work"
      ],
      "quiz": [
        {
          "q": "Why is retrieval-augmented generation (RAG) the preferred pattern for a bank's internal AI assistant?",
          "opts": [
            "It grounds answers in the bank's own approved documents and provides checkable citations",
            "It is cheaper to license",
            "It removes the need for human review",
            "It works without any data"
          ],
          "a": 0,
          "fb": "RAG retrieves your authoritative content first, constraining hallucination and making every answer traceable."
        },
        {
          "q": "Which prompt instruction most directly reduces the risk of fabricated figures?",
          "opts": [
            "\"Be creative.\"",
            "\"Use only the data provided; where information is missing, state that explicitly.\"",
            "\"Make it sound confident.\"",
            "\"Answer as fast as possible.\""
          ],
          "a": 1,
          "fb": "Instructing the model to declare gaps rather than fill them converts its most dangerous habit into a useful signal."
        },
        {
          "q": "A colleague pastes a customer's statement into a free public chatbot to summarise it. This is…",
          "opts": [
            "Acceptable if they delete the chat afterwards",
            "Efficient and acceptable",
            "A privacy and data-loss incident under the bank's obligations",
            "Fine if the customer is small"
          ],
          "a": 2,
          "fb": "Customer data must never enter public tools; submitted text may be retained and used for training. Use enterprise or private deployments."
        },
        {
          "q": "Which task warrants the HIGHEST level of human verification?",
          "opts": [
            "Brainstorming names for an internal project",
            "Drafting an informal note to a colleague",
            "Summarising an internal team meeting",
            "A customer-facing letter stating fees and contractual obligations"
          ],
          "a": 3,
          "fb": "Customer-facing statements of obligations and figures carry conduct and legal consequence — full verification plus second review."
        },
        {
          "q": "The fundamental difference between a predictive model and a generative model, from a risk perspective, is that…",
          "opts": [
            "Generative models can be wrong fluently and confidently, producing plausible but fabricated content",
            "There is no meaningful difference",
            "Predictive models cannot be monitored",
            "Generative models are always more accurate"
          ],
          "a": 0,
          "fb": "Predictive errors are measurable probabilities; generative errors arrive as polished, professional-sounding prose that reads as authoritative."
        }
      ]
    },
    {
      "id": "m6",
      "tag": "Module 6",
      "time": "60 min",
      "title": "The Dangers: AI Risk in the Banking Sector",
      "summary": "Model risk, bias, privacy, concentration and systemic exposure",
      "objectives": [
        "Apply a structured taxonomy of AI risk specific to financial institutions",
        "Understand model risk and why it is a recognised category of banking risk in its own right",
        "Assess discriminatory, privacy, cyber, third-party and concentration exposures",
        "Recognise systemic dangers: herding, procyclicality and correlated model failure",
        "Understand the human risks — over-reliance, automation bias and skill erosion",
        "Understand the legal, regulatory and reputational consequences of AI failure in a supervised institution"
      ],
      "sections": [
        {
          "h": "Why this module exists",
          "html": "\n        <p>Every previous module described capability. This one describes consequence. In a regulated financial institution, an AI failure is not a technology incident — it is a credit event, a conduct breach, a privacy violation, a supervisory finding, or all four simultaneously. Boards are accountable for these outcomes under NRB's guidelines, which means understanding failure modes is a governance competency, not a technical curiosity.</p>\n        <p>The purpose here is not to discourage adoption. It is to ensure that adoption is <strong>survivable</strong>.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · FIS</span></div><p>FIS sets out six core risk and ethical implications that financial institutions must weigh before deploying generative AI. They map closely to the categories in this module and are worth using as a checklist:</p><ul><li><b>Transparency and fairness</b> — bias is nearly impossible to eliminate entirely, so a person must vet outputs</li><li><b>Data privacy and security</b> — including consent, opt-in and opt-out mechanisms</li><li><b>Regulatory compliance</b> — the novelty of AI creates genuine ambiguity</li><li><b>Market manipulation and fraud</b> — notably AI voice-cloning attacks</li><li><b>Overreliance on AI</b> — outputs used without verification of inputs or results</li><li><b>Cost of AI ownership</b> — in-house operation is expensive; third-party reliance introduces vendor risk</li></ul></div>"
        },
        {
          "h": "1. Model risk: the foundational category",
          "html": "\n        <p><span class=\"term\">Model risk</span> — the risk of adverse consequences from decisions based on incorrect or misused model output — is a long-established discipline in banking supervision, articulated most influentially in the US Federal Reserve and OCC guidance known as <strong>SR 11-7</strong>, which frames model risk management around robust development, independent validation, and ongoing monitoring and governance.</p>\n        <p>The principal failure modes:</p>\n        <ul class=\"body\">\n          <li><strong>Model drift.</strong> The world changes; the model does not. A credit model calibrated on pre-shock conditions systematically misprices risk afterwards. Drift is silent — performance degrades without any error message.</li>\n          <li><strong>Overfitting.</strong> Impressive in development, unreliable in production.</li>\n          <li><strong>Specification error.</strong> The model answers a subtly different question from the business one — predicting 90-day delinquency when the decision actually depends on ultimate loss.</li>\n          <li><strong>Misuse.</strong> A model built for one portfolio applied to another; a screening tool used as an approval tool.</li>\n          <li><strong>Cascade risk.</strong> One model's output feeds another; an error propagates and amplifies invisibly.</li>\n        </ul>"
        },
        {
          "h": "2. Discriminatory and unfair outcomes",
          "html": "\n        <p>Covered analytically in Module 3; here the concern is consequence. A model that systematically disadvantages a group — by gender, geography, ethnicity, caste or age — creates conduct risk, legal exposure, supervisory censure and severe reputational harm, and it does so at <strong>scale and speed</strong> that no individual loan officer could match.</p>\n        <p>Three aggravating features specific to AI:</p>\n        <ul class=\"body\">\n          <li><strong>It is invisible without testing.</strong> No variable is labelled \"discriminate here\"; the effect emerges statistically.</li>\n          <li><strong>It is systematic.</strong> A biased officer affects their own caseload; a biased model affects every application, consistently.</li>\n          <li><strong>It compounds.</strong> Declined groups generate no repayment history, thin data persists, and future models learn the same exclusion — a self-reinforcing loop.</li>\n        </ul>"
        },
        {
          "h": "3. Privacy, data protection and consent failure",
          "html": "\n        <p>AI systems concentrate personal data, and concentration multiplies consequence. Specific exposures:</p>\n        <ul class=\"body\">\n          <li><strong>Purpose creep</strong> — data collected for account opening later used for unrelated profiling without fresh consent.</li>\n          <li><strong>Training-data leakage</strong> — models can, under certain conditions, reproduce fragments of the data they were trained on.</li>\n          <li><strong>Third-party transmission</strong> — customer data flowing to an external AI provider, sometimes across borders, frequently without adequate contractual protection.</li>\n          <li><strong>Shadow AI</strong> — staff using unapproved public tools with real customer data. This is, in practice, one of the most common and least detected exposures in institutions today. Oxford's research found this is frequently the <em>trigger</em> for governance: the discovery that a public tool was being used on company data typically causes a firm to block access and issue an enterprise-wide AI use policy. Acting before that discovery is materially better than acting after it.</li>\n          <li><strong>Consent and opt-out failure</strong> — NRB requires explicit consent for personal data use and a customer right to opt out of AI-driven services; systems must be built to honour that operationally, not merely to state it in a policy.</li>\n        </ul>"
        },
        {
          "h": "4. Cyber and adversarial risk",
          "html": "\n        <p>AI expands the attack surface in ways conventional security controls do not fully address:</p>\n        <ul class=\"body\">\n          <li><strong>Data poisoning</strong> — corrupting training data so the model learns an exploitable blind spot.</li>\n          <li><strong>Adversarial evasion</strong> — probing a detection model and shaping activity to remain just below its threshold.</li>\n          <li><strong>Model inversion and extraction</strong> — inferring sensitive training data, or reconstructing a proprietary model, through systematic querying.</li>\n          <li><strong>Prompt injection</strong> — hostile instructions concealed within a document or webpage that an AI assistant processes, causing it to ignore its guardrails or disclose information. This is a live and under-appreciated risk for any assistant that reads external content.</li>\n          <li><strong>Deepfake-enabled fraud</strong> — as detailed in Module 4, now an operational reality rather than a theoretical concern.</li>\n        </ul>"
        },
        {
          "h": "5. Third-party, vendor and concentration risk",
          "html": "\n        <p>Most institutions will buy rather than build. That transfers execution but not accountability — the board remains answerable for outcomes.</p>\n        <ul class=\"body\">\n          <li><strong>Opacity.</strong> A vendor may decline to disclose model internals as proprietary, leaving you unable to evidence explainability to a supervisor.</li>\n          <li><strong>Lock-in.</strong> Deep integration makes exit expensive, weakening your negotiating position and your ability to remediate.</li>\n          <li><strong>Concentration.</strong> If most institutions in a market rely on the same handful of model providers, a single provider's flaw or outage becomes a sector-wide event.</li>\n          <li><strong>Sub-processor chains.</strong> Your vendor's vendor may be processing your customers' data in a jurisdiction you have not assessed.</li>\n          <li><strong>Continuity.</strong> Vendor failure, acquisition or withdrawal can strand a critical process.</li>\n        </ul>"
        },
        {
          "h": "6. Systemic risk: herding and procyclicality",
          "html": "\n        <p>The risks above are institutional. This one is sectoral, and it is the concern that most occupies central banks.</p>\n        <ul class=\"body\">\n          <li><strong>Herding.</strong> If many banks use similar models trained on similar data, they reach similar conclusions simultaneously — tightening credit to the same segments at the same moment, amplifying a downturn.</li>\n          <li><strong>Procyclicality.</strong> Models trained on benign conditions under-predict stress and over-lend in good times, then over-tighten when conditions deteriorate, deepening the cycle.</li>\n          <li><strong>Correlated failure.</strong> Shared vendors, shared data sources and shared architectures mean a single flaw can manifest across institutions at once.</li>\n          <li><strong>Speed.</strong> Automated decisioning removes the natural friction that historically gave supervisors and management time to intervene.</li>\n        </ul>"
        },
        {
          "h": "7. Human risk: over-reliance and skill erosion",
          "html": "\n        <p>The subtlest danger is what happens to your people.</p>\n        <ul class=\"body\">\n          <li><strong>Automation bias</strong> — the well-documented human tendency to defer to a machine recommendation even when independent evidence contradicts it. A \"human in the loop\" who approves whatever the model suggests provides governance in form only. Oxford's research is blunt on the requirement here: because generative AI is <em>probabilistic rather than deterministic</em>, the people holding control responsibilities need genuine capability and training, and a deep understanding of model intent and outcomes in their specific business context.</li>\n          <li><strong>Skill erosion</strong> — if junior analysts never build a credit assessment unaided, the institution loses the capability to challenge the model, and eventually the capability to operate without it.</li>\n          <li><strong>Accountability diffusion</strong> — when a decision emerges from a model, responsibility becomes easy to disclaim. Regulators do not accept this, and neither should management.</li>\n          <li><strong>Loss of the qualitative signal</strong> — the relationship manager's unease about a borrower is information a model cannot see. Processes must preserve a route for it.</li>\n        </ul>"
        },
        {
          "h": "8. Legal, regulatory and reputational consequence",
          "html": "\n        <p>The realistic outcomes of an AI failure in a supervised institution include supervisory action and remediation directives, customer redress and compensation, litigation, invalidated decisions requiring reprocessing, and public reporting of discriminatory or privacy failures. Reputational damage in a market the size of Nepal's — where institutional trust is closely held and news travels quickly — can outlast the operational fix by years.</p>\n        <div class=\"callout warn\"><h4>The governing principle</h4><p style=\"margin:0\">You can outsource the model. You cannot outsource the accountability. Under NRB's guidelines the board and senior management remain answerable for AI outcomes — so every adoption decision should be tested against a single question: <strong>if this system fails publicly, can we explain what it did, why we believed it was safe, and what controls we had in place?</strong> If not, it is not ready.</p></div>"
        }
      ],
      "practitioner": {
        "title": "Practitioner's note: the pre-mortem",
        "text": "Before approving any AI deployment, run a fifteen-minute pre-mortem with the business, risk and technology owners: <em>\"It is one year from now and this system has failed badly enough to reach the regulator and the press. What happened?\"</em> Teams consistently surface risks in this exercise that no checklist elicited — because it grants permission to voice doubts that formal approval processes discourage."
      },
      "activity": {
        "title": "Workplace application",
        "text": "Take one AI system your institution uses or is considering. Score it 1–5 on each of the eight risk categories in this module, and for the three highest scores write the specific control that would reduce them. Bring the result to your risk committee. You have produced a defensible first-pass AI risk assessment — precisely the artefact a supervisor will ask to see."
      },
      "takeaways": [
        "Model risk — drift, overfitting, misspecification, misuse, cascade — is the foundational category, per SR 11-7 principles",
        "AI bias is invisible without testing, systematic in effect, and self-reinforcing over time",
        "Shadow AI and third-party data flows are among the most common live privacy exposures",
        "Prompt injection, data poisoning and adversarial evasion expand the cyber attack surface",
        "Vendor opacity, lock-in and market concentration transfer execution but never accountability",
        "Herding and procyclicality make correlated model failure a genuine systemic concern",
        "Automation bias makes a passive human reviewer governance in form only"
      ],
      "quiz": [
        {
          "q": "A credit model performs well for two years, then quietly deteriorates as economic conditions change. This is…",
          "opts": [
            "Prompt injection",
            "Model drift",
            "Overfitting",
            "Data leakage"
          ],
          "a": 1,
          "fb": "Drift is silent degradation as the world moves away from the training conditions — which is why ongoing monitoring is mandatory, not optional."
        },
        {
          "q": "Why is AI bias considered more dangerous than an individual officer's bias?",
          "opts": [
            "Models are always more biased than people",
            "It only affects large loans",
            "It applies systematically to every decision, is invisible without testing, and compounds over time",
            "It is not — it is identical"
          ],
          "a": 2,
          "fb": "Scale, invisibility and the self-reinforcing data loop distinguish model bias from individual bias."
        },
        {
          "q": "'Prompt injection' refers to…",
          "opts": [
            "A database procedure",
            "Injecting more data into training",
            "Typing too quickly",
            "Hostile instructions hidden in content an AI assistant reads, causing it to bypass its guardrails"
          ],
          "a": 3,
          "fb": "Any assistant that processes external documents or web content can be manipulated by instructions concealed within them."
        },
        {
          "q": "If many banks in one market use similar models trained on similar data, the systemic concern is…",
          "opts": [
            "Herding and procyclicality — simultaneous tightening that amplifies downturns",
            "Better customer service",
            "Lower software costs",
            "Increased competition"
          ],
          "a": 0,
          "fb": "Correlated models produce correlated behaviour, amplifying credit cycles and creating sector-wide correlated failure risk."
        },
        {
          "q": "A 'human in the loop' who approves nearly every model recommendation without independent assessment illustrates…",
          "opts": [
            "Efficient processing",
            "Automation bias — governance in form but not in substance",
            "Correct delegation",
            "Good use of AI"
          ],
          "a": 1,
          "fb": "Automation bias is the documented tendency to defer to machine output. Rubber-stamp review provides no genuine control."
        },
        {
          "q": "Under NRB's framework, engaging a vendor to build and run a credit model means…",
          "opts": [
            "Accountability is shared equally by contract",
            "The vendor becomes accountable for outcomes",
            "The bank's board and senior management remain accountable for AI outcomes",
            "No one is accountable"
          ],
          "a": 2,
          "fb": "Execution can be outsourced; accountability cannot. The board remains answerable to the supervisor."
        }
      ]
    },
    {
      "id": "m7",
      "tag": "Module 7",
      "time": "60 min",
      "title": "The Possibilities: Where AI Creates Value in Finance",
      "summary": "Revenue, efficiency, risk and financial inclusion in the Nepali market",
      "objectives": [
        "Map AI value across four levers: revenue growth, cost efficiency, risk reduction and customer experience",
        "Identify the opportunities most specific to Nepal — remittances, MSME credit, financial inclusion and Nepali-language service",
        "Understand emerging models: hyper-personalisation, embedded finance, conversational banking and agentic automation",
        "Build a credible business case with realistic value estimation and a defined baseline",
        "Sequence adoption sensibly, from quick wins to transformational initiatives",
        "Understand NRB's regulatory sandbox as a route to supervised innovation"
      ],
      "sections": [
        {
          "h": "Four levers, not one",
          "html": "\n        <p>AI initiatives fail commercially when they are justified vaguely. Every proposal should state which lever it pulls and how the benefit will be measured.</p>\n        <ul class=\"body\">\n          <li><strong>Revenue growth</strong> — better targeting, personalised offers, expanded addressable market, improved pricing.</li>\n          <li><strong>Cost efficiency</strong> — straight-through processing, document automation, reduced manual handling, lower cost-to-serve.</li>\n          <li><strong>Risk reduction</strong> — earlier default detection, better fraud interception, fewer compliance failures, lower provisioning.</li>\n          <li><strong>Customer experience</strong> — faster decisions, always-available service, service in the customer's own language.</li>\n        </ul>\n        <p>Risk reduction and cost efficiency generally deliver the fastest, most measurable returns and are the sensible starting point for most institutions.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · McKinsey via Salesforce · BCG</span></div><p>On the scale of the prize: McKinsey estimates AI could add <b>US$200–340 billion annually</b> to the banking industry — a 3–5% revenue uplift. <b>86% of financial services AI adopters</b> say AI will be very or critically important to their success within two years.</p><p>BCG's client work documents concrete gains including a <b>30% increase in sales</b>, a doubling of generative-AI-driven retargeting conversions, and a <b>10% gain in assets under management</b> — evidence that the value is not confined to cost-cutting.</p><p>Salesforce reports AI reducing <b>service costs by around 25%</b>, and notes that <b>54% of consumers</b> currently trust the use of AI agents in financial services — a figure that makes trust-building a commercial priority, not merely an ethical one.</p></div>"
        },
        {
          "h": "Nepal-specific opportunity one: the remittance economy",
          "html": "\n        <p>Remittances constitute an exceptionally large share of Nepal's economy — on the order of a quarter of GDP — and flow through the banking and payment system in enormous volume. Most institutions treat these flows as a transaction service. They are, in fact, one of the richest behavioural datasets in the country.</p>\n        <p>Applied intelligently, remittance data supports:</p>\n        <ul class=\"body\">\n          <li><strong>Cash-flow-based lending</strong> to recipient households with no formal credit history — regular, verifiable inflows are a legitimate repayment-capacity signal.</li>\n          <li><strong>Savings and investment products</strong> timed to inflow patterns, converting transient balances into retained deposits.</li>\n          <li><strong>Insurance and pension propositions</strong> for migrant families, targeted by observed need.</li>\n          <li><strong>Retention analytics</strong> identifying which recipients are likely to move to a competitor or an informal channel.</li>\n        </ul>\n        <p>Converting remittance recipients from transaction users into full banking relationships is arguably the single largest commercial opportunity AI can unlock in this market.</p>"
        },
        {
          "h": "Nepal-specific opportunity two: the MSME credit gap",
          "html": "\n        <p>Micro, small and medium enterprises across South Asia face a persistent financing gap, constrained less by lender appetite than by assessment cost and data scarcity. Traditional appraisal of a small enterprise is labour-intensive relative to ticket size, and formal financial statements are frequently absent or unreliable.</p>\n        <p>AI changes that arithmetic:</p>\n        <ul class=\"body\">\n          <li><strong>Digital payment turnover</strong> — QR and wallet transaction records provide a verifiable proxy for revenue.</li>\n          <li><strong>Bank account behaviour</strong> — deposit regularity, balance volatility and counterparty diversity indicate business health.</li>\n          <li><strong>Document AI</strong> — extracting usable data from informal ledgers, invoices and photographed records.</li>\n          <li><strong>Supply-chain signals</strong> — relationships with larger, well-rated counterparties support inference about stability.</li>\n        </ul>\n        <p>The result is a viable route to lending profitably at smaller ticket sizes — expanding the market rather than competing harder for the existing one.</p>"
        },
        {
          "h": "Nepal-specific opportunity three: inclusion and Nepali-language service",
          "html": "\n        <p>Meaningful portions of the population remain outside full formal financial services, particularly in rural districts and among women. Two AI capabilities address this directly:</p>\n        <ul class=\"body\">\n          <li><strong>Nepali-language conversational service.</strong> Modern language models handle Nepali far better than earlier systems. A customer able to ask questions and receive guidance in their own language, at any hour, without visiting a branch, is a genuine expansion of access — not merely a cost saving.</li>\n          <li><strong>Voice interfaces</strong> that serve customers with limited literacy, who are currently underserved by text-driven digital banking.</li>\n        </ul>\n        <p>Institutions that build genuine Nepali-language capability will hold an advantage that global providers are unlikely to prioritise.</p>"
        },
        {
          "h": "Emerging models worth understanding",
          "html": "\n        <ul class=\"body\">\n          <li><strong>Hyper-personalisation.</strong> Moving from broad segments to individual-level relevance — the right product, at the moment of need, through the preferred channel.</li>\n          <li><strong>Conversational banking.</strong> Assistants that handle balance and transaction queries, guide applications, and escalate intelligently — with the human-review discipline of Module 5.</li>\n          <li><strong>Embedded finance.</strong> Credit and payments offered inside non-bank platforms — commerce, logistics, agriculture — with AI performing real-time assessment at the point of need.</li>\n          <li><strong>Agentic automation.</strong> Systems that execute multi-step processes rather than answer single questions — assembling a reconciliation, preparing a complete loan file. Powerful, and requiring correspondingly stronger controls and clear stopping points.</li>\n          <li><strong>Dynamic risk-based pricing.</strong> Pricing calibrated to assessed risk rather than broad category, subject to fairness testing and regulatory limits.</li>\n          <li><strong>Regulatory technology.</strong> Automated mapping of circulars to internal obligations, and continuous rather than periodic compliance monitoring.</li>\n        </ul>"
        },
        {
          "h": "The paradox of caution — why careful institutions still fail",
          "html": "\n        <p>Research from the Oxford Future of Finance and Technology Initiative at Saïd Business School identifies a trap that should concern every conservative institution — which, in banking, means all of them.</p>\n        <p>Caution is entirely rational. Regulatory and reputational concerns are real, upfront costs are considerable, and competing priorities are many. So the typical institution takes small initial steps: internal rather than customer-facing use cases, cost reduction rather than growth, improvements to specific steps within existing processes. This is sensible, and it builds AI literacy safely.</p>\n        <p><strong>But the cautious approach carries its own risk.</strong> Oxford's researchers found that narrow, inward-facing first projects frequently produce underwhelming results — and underwhelming results poison the well for everything that follows:</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Oxford Future of Finance &amp; Technology Initiative</span></div>\n          <p class=\"quote\">“The business cases were on incremental gains on automations, something like 5–15% of every human doing an ops job, it tallied up to a million or two savings by the end of the year. But actually, in the real world, we couldn't remove those humans from the system. So most people who put in an AI business case failed to deliver it.”<span class=\"who\">— Interview participant, established financial services firm</span></p>\n          <p class=\"quote\">“First time trying and getting it wrong will be a big problem, the ones who spoiled it for others… it's difficult to get the adoption because they've been burnt once and aren't biting twice.”<span class=\"who\">— Interview participant, established financial services firm</span></p>\n        </div>\n        <p>Two hard lessons follow. First, <strong>efficiency benefits are only real if the organisation can act on them.</strong> Saving 10% of many people's time is not a saving unless roles are genuinely redesigned to absorb higher-value work, or headcount actually changes. A business case built on time saved, with no plan for what that time becomes, will not survive contact with reality.</p>\n        <p>Second, <strong>a failed first attempt is expensive beyond its own budget</strong>, because it hardens the organisation against the next attempt. This argues for making the first project small enough to control but meaningful enough to matter.</p>\n        <div class=\"callout note\"><h4>Oxford's recommended practices</h4><p style=\"margin:0\">Their research points to four: <b>alignment of effort from the top down</b>, with formal objectives linking AI to business goals; an <b>organisationally coordinated approach</b> emphasising reusable components rather than one-off builds; <b>calculated risk-taking with explicit permission to learn from failure</b> — with AI risk management embedded inside enterprise risk management, not run separately; and <b>evaluating AI initiatives programmatically</b> rather than only case by case, so that enabling infrastructure gets funded even though it generates no direct return of its own.</p></div>\n        <p>One further finding deserves emphasis when you cost a proposal. Oxford records a practitioner observing that <strong>“60–70% of spend on the use case has got nothing to do with AI. It's the basic foundational middleware integration.”</strong> Budget accordingly — and treat any proposal whose costs are dominated by licence fees as incomplete.</p>"
        },
        {
          "h": "Building a business case that survives scrutiny",
          "html": "\n        <p>A credible proposal contains six elements:</p>\n        <ol class=\"body\">\n          <li><strong>The problem in business terms</strong> — \"MSME loan assessment takes 11 days and costs X per file, limiting viable ticket size.\"</li>\n          <li><strong>The measured baseline</strong> — current performance, quantified before anything changes.</li>\n          <li><strong>The intervention</strong> — specifically what the system will do, and where a human remains in the loop.</li>\n          <li><strong>The value estimate</strong> — conservative, ranged, and explicit about assumptions.</li>\n          <li><strong>The full cost</strong> — including data preparation, integration, validation, monitoring, training and ongoing model maintenance, which together typically exceed licence cost.</li>\n          <li><strong>The risk and control assessment</strong> — drawn directly from Module 6, with the governance path identified.</li>\n        </ol>\n        <p>Beware the two familiar failure patterns: the pilot that succeeds on curated data and cannot scale, and the \"innovation\" project with no baseline, so success can never be demonstrated or disproved.</p>"
        },
        {
          "h": "Sequencing: crawl, walk, run",
          "html": "\n        <ul class=\"body\">\n          <li><strong>Phase one — internal, low-risk, measurable.</strong> Document processing, alert prioritisation, internal policy assistants. No customer-facing decisions; builds capability, data discipline and credibility.</li>\n          <li><strong>Phase two — decision support with humans in charge.</strong> Early-warning systems, challenger credit models, investigator enrichment, agent-assist tools.</li>\n          <li><strong>Phase three — customer-facing and automated, under full governance.</strong> Automated decisioning within defined limits, conversational service, personalised offers, embedded lending.</li>\n        </ul>\n        <p>Institutions that attempt phase three first typically encounter the governance, data and trust obstacles that phases one and two exist to resolve.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · Salesforce</span></div><p>Salesforce frames the same progression as three implementation choices, which map cleanly onto the phases above: <b>automating existing workflows</b> (fastest value, builds trust with staff and customers), <b>reimagining operations</b> (redesigning core processes so decisions move from reactive to proactive), and <b>powering new business models</b> (hyper-personalised services, embedded finance, AI-driven digital experiences).</p><p>The sequencing matters more than the ambition. Each stage builds the organisational credibility required to attempt the next.</p></div>"
        },
        {
          "h": "The regulatory sandbox as an asset",
          "html": "\n        <p>Nepal Rastra Bank has established a regulatory sandbox to support supervised financial innovation. For an institution planning a novel AI-enabled proposition, this is a valuable route: it allows controlled testing with regulatory visibility, builds a constructive supervisory relationship early, and surfaces objections while a design can still be changed cheaply. Engaging the supervisor at the design stage is materially better than defending a completed build.</p>"
        }
      ],
      "practitioner": {
        "title": "Practitioner's note: measure before you build",
        "text": "The most common reason a promising AI initiative cannot be scaled is that nobody recorded what performance looked like beforehand. Before writing a requirement or engaging a vendor, spend two weeks measuring the current process — time, cost, error rate, volume. That baseline is what converts a subjective impression into a defensible business case, and it is the cheapest work in the entire programme."
      },
      "activity": {
        "title": "Workplace application",
        "text": "Draft a one-page AI opportunity note for your department using the six-element structure: problem in business terms, measured baseline, proposed intervention, ranged value estimate, full cost, and risk and control assessment. Choose a genuine phase-one opportunity — internal, low-risk, measurable. This note is your capstone deliverable and should be written as though it were going to your management committee."
      },
      "takeaways": [
        "Every proposal should name its lever: revenue, efficiency, risk or experience — and state how it will be measured",
        "Remittance data is Nepal's most under-used behavioural asset and a route to deepening relationships",
        "Digital payment turnover and document AI make small-ticket MSME lending economically viable",
        "Nepali-language and voice interfaces are genuine inclusion levers and a durable local advantage",
        "Credible business cases need a measured baseline and full lifetime cost, not just licence fees",
        "Sequence internal and low-risk first; NRB's sandbox is a constructive route for novel propositions"
      ],
      "quiz": [
        {
          "q": "Which lever typically delivers the fastest, most measurable early return for a bank adopting AI?",
          "opts": [
            "Customer experience redesign",
            "Brand advertising",
            "Branch expansion",
            "Risk reduction and cost efficiency"
          ],
          "a": 3,
          "fb": "Risk and efficiency gains are measurable against existing baselines and require the least customer-facing governance."
        },
        {
          "q": "Why is remittance data particularly valuable for Nepali banks?",
          "opts": [
            "Regular verifiable inflows support cash-flow lending to households without formal credit histories",
            "It is exempt from privacy rules",
            "It is easier to store",
            "It has no analytical value"
          ],
          "a": 0,
          "fb": "Remittances are a large share of the economy and provide a legitimate repayment-capacity signal for thin-file customers."
        },
        {
          "q": "What most often makes small-ticket MSME lending uneconomic without AI?",
          "opts": [
            "Regulatory prohibition",
            "Assessment cost and data scarcity relative to ticket size",
            "Insufficient branch space",
            "Lack of borrower demand"
          ],
          "a": 1,
          "fb": "Manual appraisal costs too much relative to a small loan; digital turnover data and document AI change that arithmetic."
        },
        {
          "q": "A business case that omits a measured baseline is problematic because…",
          "opts": [
            "It delays the project",
            "It looks unprofessional",
            "Success can never be demonstrated or disproved",
            "Regulators require baselines by law"
          ],
          "a": 2,
          "fb": "Without a pre-measured baseline, improvement is unprovable — the most common reason good pilots fail to scale."
        },
        {
          "q": "Which is the appropriate phase-one AI initiative for an institution beginning its journey?",
          "opts": [
            "Fully automated customer-facing credit decisions",
            "Replacing the credit committee",
            "Autonomous investment advice",
            "Internal document processing and alert prioritisation"
          ],
          "a": 3,
          "fb": "Internal, low-risk, measurable work builds data discipline, capability and governance credibility before customer-facing automation."
        },
        {
          "q": "NRB's regulatory sandbox is best understood as…",
          "opts": [
            "A supervised route to test novel propositions with regulatory visibility early",
            "A mandatory certification",
            "A software product",
            "A penalty mechanism"
          ],
          "a": 0,
          "fb": "Engaging the supervisor at design stage — while the build can still change cheaply — is far better than defending a finished system."
        }
      ]
    },
    {
      "id": "m8",
      "tag": "Module 8",
      "time": "65 min",
      "title": "Governance, Compliance & Implementation",
      "summary": "NRB requirements, model risk management and leading adoption",
      "objectives": [
        "Apply the core requirements of NRB's Artificial Intelligence Guidelines to a proposed use case",
        "Build an AI governance structure with clear board, management and operational accountability",
        "Understand the model risk management lifecycle: development, independent validation, approval, monitoring and retirement",
        "Conduct meaningful vendor due diligence and negotiate the contractual terms that matter",
        "Design a controlled pilot with defined success criteria and a stopping rule",
        "Lead adoption through the human and cultural obstacles that determine success"
      ],
      "sections": [
        {
          "h": "The regulatory foundation in Nepal",
          "html": "\n        <p>Nepal Rastra Bank's Artificial Intelligence Guidelines apply across licensed institutions — commercial banks, development banks, finance companies, microfinance institutions, the infrastructure bank, and payment system operators and providers. The framework rests on a recognisable set of pillars:</p>\n        <ul class=\"body\">\n          <li><strong>Governance and board accountability.</strong> The board and senior management remain ultimately accountable for AI outcomes, must define AI-related risk tolerance within the overall risk framework, and must set the strategic direction for adoption.</li>\n          <li><strong>Risk classification.</strong> Institutions classify AI systems by risk — high-risk versus lower-risk — and apply proportionate controls and cybersecurity measures.</li>\n          <li><strong>Transparency, explainability, fairness and accountability</strong> in AI applications.</li>\n          <li><strong>Privacy and customer rights.</strong> Compliance with privacy law including the Privacy Act (2075), explicit customer consent for personal data use, and a customer right to opt out of AI-driven services.</li>\n          <li><strong>Embedded risk management.</strong> AI risk sits inside existing risk management and internal control frameworks, with regular, updated risk assessments — not as a separate silo.</li>\n          <li><strong>Ongoing monitoring</strong> of deployed systems.</li>\n        </ul>\n        <p>Permitted applications explicitly contemplated include credit assessment and scoring, fraud detection, risk management and analysis, customer service and support, and compliance and supervisory functions.</p>\n        <div class=\"callout note\"><h4>Important practice point</h4><p style=\"margin:0\">Regulatory expectations in this area are evolving quickly, in Nepal and internationally. Always work from the <strong>current</strong> NRB guideline text and circulars, and confirm the latest position with your compliance function before finalising any design. This programme teaches the framework and the reasoning; it does not substitute for the live regulatory instrument or for professional legal advice.</p></div>"
        },
        {
          "h": "How this compares internationally",
          "html": "\n        <p>Context helps when benchmarking your framework:</p>\n        <ul class=\"body\">\n          <li><strong>Model risk management (SR 11-7).</strong> The US supervisory standard built on three pillars — sound development and implementation, <em>independent</em> validation, and governance with ongoing monitoring. Its logic underpins most global bank model governance.</li>\n          <li><strong>EU AI Act.</strong> A risk-tiered approach, with credit scoring for natural persons treated as high-risk and subject to heightened obligations — a structure conceptually similar to NRB's high-risk classification.</li>\n          <li><strong>Basel principles.</strong> Operational resilience and third-party risk expectations apply directly to AI dependencies.</li>\n        </ul>\n        <p>The convergence is notable: everywhere, supervisors are asking the same four questions — who is accountable, can you explain it, is it fair, and are you monitoring it?</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · EY</span></div><p>EY's research on global practice shows governance has become the precondition for scale, not an afterthought:</p><ul><li><b>More than 70%</b> of large global banks have integrated AI governance into their group-wide risk management frameworks.</li><li>Among banks that have deployed generative AI at scale, <b>more than 80%</b> have established cross-functional AI governance committees or “control towers”.</li><li>Governance focus has widened beyond model performance to <b>interpretability, fairness, data traceability and decision accountability</b>.</li></ul><p>The commercial argument is compelling: after implementing a group-level AI governance framework, one global commercial bank <b>tripled its number of AI applications without a proportional increase in model-related compliance incidents</b>. Governance did not slow it down — it is what allowed it to go faster.</p></div>"
        },
        {
          "h": "Where are you on the curve? A maturity model for AI in banking",
          "html": "\n        <p>Institutions need an honest answer to a simple question: how advanced are we, really? EY's AI Bank Maturity Assessment Scheme provides a five-stage ladder that is useful precisely because it is unflattering — most institutions, globally and in Nepal, sit at the bottom two rungs.</p>\n        <ol class=\"ladder\">\n          <li><span class=\"lv\">L1</span><b>Pilot exploration</b>Point solutions tested in isolation; value ambiguous. AI executes fixed rules with no independent reasoning — a mechanical tool attached to a single step.</li>\n          <li><span class=\"lv\">L2</span><b>Scenario application</b>AI works as a professional assistant in specific scenarios — preliminary credit review, wealth recommendations — reducing manual workload. Cross-scenario decisions still rely on humans.</li>\n          <li><span class=\"lv\">L3</span><b>Process reconstruction</b>An intelligent closed loop is achieved within core processes such as credit, driving end-to-end automation and measurable improvement in both growth and risk control.</li>\n          <li><span class=\"lv\">L4</span><b>Business integration</b>AI-native products and services emerge; the organisation itself is reconstructed around them, and AI drives new revenue rather than only efficiency.</li>\n          <li><span class=\"lv\">L5</span><b>Superintelligent prototype</b>Decision-making, risk control and service are dominated by advanced AI capable of perceiving market change and shaping financial needs. Largely aspirational today.</li>\n        </ol>\n        <p>EY assesses progression across five dimensions, which together make a useful self-audit for any institution: <strong>agent maturity, data and model ecosystem, organisation and talent, technology architecture, and value and governance.</strong> Weakness in any one of them caps overall progress — which is why buying a sophisticated model without addressing talent or governance rarely moves an institution up the ladder.</p>\n        <div class=\"callout note\"><h4>Why most institutions stall between L1 and L2</h4><p style=\"margin:0\">EY's global findings are sobering. <b>More than half of AI projects stall in the pilot phase</b>, principally because of disconnection between business and technology. And roughly <b>60–70% of banks still struggle to replicate AI applications across business lines even after completing more than ten pilots.</b> The bottleneck is rarely the model. It is the absence of a unified platform, an agreed method for evaluating use-case value, and a cross-functional AI Center of Excellence.</p></div>\n        <p>The evidence on what breaks the deadlock is unusually practical. EY reports that one bank managing more than twenty use cases through a centralised AI operations platform <strong>raised model reuse above 50%, reduced the marginal cost per use case by 30–40%, and achieved measurable returns within 18–24 months.</strong> Reusability is what converts a series of expensive experiments into a capability.</p>\n        <p>Talent structure matters just as much as technology. In high-return banks, <strong>40–50% of AI team members come from business rather than purely technical backgrounds</strong>; institutions with mature AI talent systems cut the cycle from project approval to launch by 30–50%; and cultivating AI leaders who genuinely understand the business raised the business conversion rate of AI use cases by 20–30%. The conclusion EY draws is one worth carrying into your own institution: <em>success depends less on algorithmic advances than on who applies the technology, who is responsible for it, and who realises the value.</em></p>"
        },
        {
          "h": "An AI governance structure that works",
          "html": "\n        <ul class=\"body\">\n          <li><strong>Board</strong> — approves AI strategy and risk appetite; receives regular reporting on the AI inventory, incidents and model performance; retains ultimate accountability.</li>\n          <li><strong>AI or model risk committee</strong> — cross-functional (risk, compliance, technology, business, legal, internal audit); approves high-risk use cases; reviews validation outcomes.</li>\n          <li><strong>Model owner (business)</strong> — accountable for appropriate use, performance and customer outcomes of a specific model.</li>\n          <li><strong>Independent validation</strong> — reviews models separately from the developers. Independence is the point; a team validating its own work is not validation.</li>\n          <li><strong>Internal audit</strong> — provides third-line assurance that the framework operates as documented.</li>\n          <li><strong>AI inventory</strong> — a single register of every AI system in use, its risk classification, owner, validation date and monitoring status. Institutions consistently discover more systems than expected when they first compile this; it is the practical starting point for governance.</li>\n        </ul>"
        },
        {
          "h": "The model lifecycle",
          "html": "\n        <ol class=\"body\">\n          <li><strong>Define</strong> — the business problem, the decision affected, the risk classification, the success measures.</li>\n          <li><strong>Develop</strong> — with documented data lineage, feature rationale, and design choices recorded as they are made.</li>\n          <li><strong>Validate independently</strong> — conceptual soundness, data quality, performance on hold-out and out-of-time samples, fairness testing, stability, and explainability adequacy.</li>\n          <li><strong>Approve</strong> — at the governance level appropriate to the risk classification, with conditions and limitations stated explicitly.</li>\n          <li><strong>Deploy</strong> — with defined operating limits, override procedures and rollback capability.</li>\n          <li><strong>Monitor</strong> — performance, drift, override rates, fairness metrics and customer complaints, on a defined schedule with pre-agreed escalation triggers.</li>\n          <li><strong>Review and retire</strong> — periodic revalidation; decommission when the model no longer performs or the use case changes.</li>\n        </ol>\n        <p>Documentation is not bureaucracy here. If you cannot evidence how a model was built, validated and monitored, you cannot demonstrate control to a supervisor — regardless of how well the model performs.</p>"
        },
        {
          "h": "Vendor due diligence: the questions that matter",
          "html": "\n        <p>Most institutions will buy. Ask these before signing:</p>\n        <ul class=\"body\">\n          <li>What data was the model trained on, and how comparable is that population to our customers?</li>\n          <li>What explainability does it provide at the level of an individual decision?</li>\n          <li>What fairness testing has been performed, and can we run our own?</li>\n          <li>Will our customer data be used to train models serving other clients?</li>\n          <li>Where is data processed and stored, and who are the sub-processors?</li>\n          <li>What performance monitoring and drift alerting is included?</li>\n          <li>What are our audit and regulator inspection rights?</li>\n          <li>What are the exit provisions — can we retrieve our data and models in usable form?</li>\n          <li>What happens on vendor failure, acquisition or product withdrawal?</li>\n        </ul>\n        <p>Insist that the right to explain decisions to your regulator survives any claim of proprietary confidentiality. If a vendor cannot accept that, the product is not suitable for a regulated decision.</p>"
        },
        {
          "h": "Designing a pilot that produces a real answer",
          "html": "\n        <ol class=\"body\">\n          <li><strong>Choose a narrow, meaningful scope</strong> — one process, one segment, one measurable outcome.</li>\n          <li><strong>Record the baseline first.</strong></li>\n          <li><strong>Define success and failure numerically, in advance</strong> — including the threshold at which you will stop.</li>\n          <li><strong>Run in parallel</strong> where possible — model alongside existing process, comparing outcomes without customer impact.</li>\n          <li><strong>Set a time limit</strong> — pilots without end dates become permanent unevaluated systems.</li>\n          <li><strong>Decide honestly</strong> — scale, redesign, or stop. A well-run pilot that concludes \"no\" has delivered value by preventing a costly mistake.</li>\n        </ol>"
        },
        {
          "h": "Leading people through adoption",
          "html": "\n        <p>The binding constraint is rarely technical.</p>\n        <div class=\"evid\"><div class=\"src\"><span class=\"tag\">Industry evidence · Oxford · HKMA · SAS</span></div><p>Oxford's research finds that <b>mandatory AI training for all employees</b> — not only technical specialists — increases familiarity and allows AI-enabled change to be embraced across the organisation. Training the senior team, they note, is what makes AI adoption <em>business-led rather than technology-driven</em>.</p><p>The Hong Kong Monetary Authority's <i>Future Bank Capacity Building 2026–2030</i> report identifies three core future skill domains for banking professionals: <b>technical skills</b> in AI, data and cybersecurity; <b>soft skills</b> in human-machine collaboration and human-centred service; and <b>banking knowledge</b> in areas such as sustainable finance risk management and emerging markets.</p><p class=\"quote\">“Innovation and AI must be recognised as a pillar of the strategy in the institution… leadership from the top is non-negotiable.”<span class=\"who\">— Abraham M. Izquierdo, Managing Director, Trading and Treasury Risks, Banorte (via SAS)</span></p></div>\n        <ul class=\"body\">\n          <li><strong>Address the employment question directly.</strong> Staff will assume AI threatens their roles. Silence breeds resistance and quiet sabotage. Be specific about what changes, what does not, and how people will be retrained.</li>\n          <li><strong>Involve practitioners in design.</strong> The credit officer and the AML investigator know the edge cases your vendor does not. Their involvement improves the system and converts them into advocates.</li>\n          <li><strong>Train the challenge, not just the tool.</strong> Staff must be able to identify when output is wrong and be genuinely empowered to override it — the antidote to automation bias.</li>\n          <li><strong>Preserve the escalation route.</strong> Ensure a relationship manager's qualitative concern can still reach a decision-maker.</li>\n          <li><strong>Celebrate a stopped project.</strong> If the only rewarded outcome is deployment, teams will deploy systems that should have been abandoned.</li>\n        </ul>"
        },
        {
          "h": "Where to begin, concretely",
          "html": "\n        <p>If your institution is early in this journey, a defensible first ninety days:</p>\n        <ol class=\"body\">\n          <li><strong>Compile the AI inventory</strong> — including systems already embedded in vendor products. Most institutions are surprised.</li>\n          <li><strong>Issue an acceptable-use policy</strong> for generative AI tools, addressing the shadow-AI exposure immediately and at no cost.</li>\n          <li><strong>Assign accountability</strong> — name the executive owner and stand up the cross-functional committee.</li>\n          <li><strong>Assess against the current NRB guidelines</strong> — identify gaps in governance, classification, explainability, consent and monitoring.</li>\n          <li><strong>Select one phase-one pilot</strong> with a measured baseline and a stopping rule.</li>\n          <li><strong>Build capability</strong> — this programme is a starting point; sustained competence requires ongoing structured development.</li>\n        </ol>"
        }
      ],
      "practitioner": {
        "title": "Practitioner's note: start with the inventory",
        "text": "Before writing a strategy, compile a list of every system in your institution that uses AI or machine learning — including features embedded inside vendor platforms you already licence. Institutions routinely find AI operating in production that was never assessed, classified or approved. That inventory, produced in a fortnight, is usually the most valuable governance artefact a bank creates in its first year of AI oversight."
      },
      "activity": {
        "title": "Capstone: your AI use-case proposal",
        "text": "Complete the one-page proposal you began in Module 7 by adding the governance section: the risk classification you would assign under NRB's framework and why; the explainability approach; the fairness tests; the monitoring plan with escalation triggers; the human-in-the-loop design; and the pilot's success criteria and stopping rule. The finished document is a genuine, defensible internal proposal — and the practical outcome of this programme."
      },
      "takeaways": [
        "NRB's guidelines rest on board accountability, risk classification, explainability, privacy and consent, embedded risk management and ongoing monitoring",
        "Always work from the current NRB text and confirm with compliance — expectations are evolving",
        "Independent validation is the pillar institutions most often weaken, and the one supervisors examine",
        "An AI inventory is the practical first governance artefact — and usually reveals unassessed systems",
        "Vendor contracts must preserve explainability, audit rights, data protection and viable exit",
        "Pilots need a baseline, numeric success criteria and a stopping rule agreed in advance",
        "Adoption succeeds or fails on people: address job fears, involve practitioners, and train genuine challenge"
      ],
      "quiz": [
        {
          "q": "Under NRB's guidelines, institutions are expected to classify AI systems by…",
          "opts": [
            "Vendor nationality",
            "Risk level, such as high-risk versus lower-risk, with proportionate controls",
            "Cost",
            "Programming language"
          ],
          "a": 1,
          "fb": "Risk classification drives proportionate controls and cybersecurity measures — mirroring risk-tiered approaches internationally."
        },
        {
          "q": "Why must model validation be performed independently of the development team?",
          "opts": [
            "Regulators prefer larger teams",
            "To slow the project down",
            "Because a team reviewing its own work cannot provide genuine challenge",
            "To reduce cost"
          ],
          "a": 2,
          "fb": "Independent validation is a core pillar of model risk management and among the first things a supervisor will test."
        },
        {
          "q": "Which vendor contract term is most critical for a regulated credit decision?",
          "opts": [
            "Free training seats",
            "A discount for early payment",
            "Quarterly newsletters",
            "That the right to explain decisions to your regulator survives claims of proprietary confidentiality"
          ],
          "a": 3,
          "fb": "If proprietary claims prevent you evidencing explainability to your supervisor, the product is unsuitable for regulated decisions."
        },
        {
          "q": "A pilot without a pre-agreed stopping rule tends to…",
          "opts": [
            "Become a permanent, unevaluated system",
            "Cost less",
            "Finish faster",
            "Improve accuracy"
          ],
          "a": 0,
          "fb": "Pilots without defined end points and failure thresholds quietly become production systems no one ever assessed."
        },
        {
          "q": "The most valuable first governance artefact for an institution beginning AI oversight is…",
          "opts": [
            "A press release",
            "A complete AI inventory, including AI embedded in existing vendor products",
            "A new server",
            "A vendor shortlist"
          ],
          "a": 1,
          "fb": "You cannot govern what you have not catalogued — and institutions routinely discover unassessed AI already in production."
        },
        {
          "q": "Which action most directly addresses 'shadow AI' risk at no cost?",
          "opts": [
            "Hiring data scientists",
            "Building a data warehouse",
            "Issuing and communicating an acceptable-use policy for generative AI tools",
            "Buying an enterprise AI platform"
          ],
          "a": 2,
          "fb": "A clear, communicated acceptable-use policy immediately addresses staff using public tools with customer data."
        }
      ]
    }
  ]
};
