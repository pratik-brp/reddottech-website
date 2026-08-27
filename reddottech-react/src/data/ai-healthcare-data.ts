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

export const healthcareLessons: Lesson[] = [
  {
    "id": "h1",
    "tag": "Module 1",
    "time": "40 min",
    "title": "AI Foundations for Healthcare",
    "summary": "The concepts and vocabulary every clinician now needs",
    "objectives": [
      "Distinguish artificial intelligence, machine learning, deep learning and generative AI — and know where each belongs in clinical practice",
      "Explain how a model learns from data, in language you could use with a colleague or a patient",
      "Interpret the performance measures that actually matter clinically: sensitivity, specificity, positive and negative predictive value, and AUC",
      "Understand why a model's accuracy depends entirely on the population it was trained on",
      "Recognise the difference between a research result and a clinically deployable tool"
    ],
    "sections": [
      {
        "h": "Why this matters to you, now",
        "html": "\n        <p>Artificial intelligence has moved out of the research literature and into the consulting room. Ambient documentation tools are drafting clinical notes. Algorithms are reading chest X-rays for tuberculosis in district hospitals. Patients are arriving at appointments having already consulted a chatbot about their symptoms.</p>\n        <p>That last point deserves attention. OpenAI reports that more than <strong>5% of all ChatGPT messages globally are about healthcare</strong> — billions of messages each week — and that roughly <strong>one in four of its 800 million weekly users asks a health question every week</strong>. Whatever your institution decides about AI, your patients have already decided about it.</p>\n        <p>This programme is not about turning clinicians into data scientists. It is about giving healthcare professionals the vocabulary, judgement and critical instincts to evaluate these tools, use the good ones well, and refuse the bad ones with confidence.</p>"
      },
      {
        "h": "The four terms, correctly used",
        "html": "\n        <p>These words are used interchangeably in vendor brochures. Precision protects your patients.</p>\n        <ul class=\"body\">\n          <li><strong>Artificial Intelligence (AI)</strong> — the broad field of systems performing tasks that normally require human intelligence. A rules-based drug-interaction alert in your prescribing system is AI, with no learning involved.</li>\n          <li><strong>Machine Learning (ML)</strong> — systems that learn patterns from data rather than following rules a person wrote. Nearly all clinical prediction models are machine learning.</li>\n          <li><strong>Deep Learning</strong> — machine learning using multi-layered <span class=\"term\">neural networks</span>. It is what made medical image interpretation possible: radiographs, retinal photographs, histopathology slides, dermatoscopic images.</li>\n          <li><strong>Generative AI</strong> — models that produce new content: text, images, summaries. This is the large-language-model wave now entering clinical documentation and patient communication (Module 5).</li>\n        </ul>\n        <p>A useful clinical translation: <em>deep learning looks at things</em> (images, signals, waveforms); <em>machine learning predicts events</em> (deterioration, readmission, mortality); <em>generative AI writes things</em> (notes, summaries, letters). Each carries a very different risk profile and a different regulatory expectation.</p>"
      },
      {
        "h": "How a model learns — without the mathematics",
        "html": "\n        <p>A <span class=\"term\">neural network</span> contains many simple units connected together, each connection carrying a number called a <span class=\"term\">weight</span>. Learning proceeds like this:</p>\n        <ol class=\"body\">\n          <li>Show the model a case — say, a chest radiograph — and let it predict the label (\"TB\" or \"not TB\").</li>\n          <li>Compare its prediction to the confirmed answer. The size of the error is called the <span class=\"term\">loss</span>.</li>\n          <li>Adjust every weight slightly in the direction that would have reduced the error.</li>\n          <li>Repeat across tens or hundreds of thousands of labelled cases.</li>\n        </ol>\n        <p>Gradually the weights settle into a configuration that captures real radiographic patterns. Nobody programmed a rule for cavitation or upper-lobe infiltrate; the model derived the pattern statistically from examples.</p>\n        <p>This has a profound clinical implication. <strong>The model knows only what its training data contained.</strong> A model trained on radiographs from well-resourced European hospitals has never seen the film quality, the patient demographics, or the disease prevalence of a district hospital in Nepal. Its published accuracy does not travel with it.</p>\n        <div class=\"callout note\"><h4>Deeper dive: what \"parameters\" means when a vendor says it</h4><p style=\"margin:0\">Those adjustable weights are the model's <strong>parameters</strong>. A modern imaging model may have tens of millions; a large language model may have tens of billions. More parameters allow more complex patterns, but also demand more data and make the model harder to interpret. Parameter count is a specification, not a measure of clinical usefulness — never accept it as evidence of quality.</p></div>"
      },
      {
        "h": "Reading performance like a clinician, not a customer",
        "html": "\n        <p>You already have the mental model for this: it is the same reasoning you apply to any diagnostic test.</p>\n        <ul class=\"body\">\n          <li><strong>Sensitivity</strong> — of patients who truly have the condition, what proportion does the model identify? Low sensitivity means missed disease.</li>\n          <li><strong>Specificity</strong> — of patients without the condition, what proportion does it correctly clear? Low specificity means false alarms, unnecessary investigation, and patient anxiety.</li>\n          <li><strong>Positive predictive value (PPV)</strong> — of those flagged positive, how many truly have it? <strong>PPV depends on prevalence</strong>, so a model with excellent PPV in a high-prevalence referral centre may perform poorly in a low-prevalence screening population.</li>\n          <li><strong>Negative predictive value (NPV)</strong> — of those cleared, how many are genuinely disease-free? Critical when a model is used to rule out.</li>\n          <li><strong>AUC / c-statistic</strong> — overall discrimination across all thresholds. 0.5 is a coin toss; 1.0 is perfect. It is a useful summary but tells you nothing about performance at the threshold you will actually use.</li>\n        </ul>\n        <p>Two questions separate an informed buyer from a naive one. First: <em>\"At what threshold, and what are the sensitivity and specificity there?\"</em> Second: <em>\"What was the disease prevalence in the validation population, and how does it compare with mine?\"</em> A vendor who cannot answer both is selling you a research artefact.</p>"
      },
      {
        "h": "Accuracy is a property of a population, not of a model",
        "html": "\n        <p>This is the single most important idea in the module. Sensitivity and specificity are relatively stable properties of a test; <strong>predictive values are not</strong> — they shift with prevalence. A tuberculosis screening algorithm validated where prevalence is 15% will generate a very different burden of false positives where prevalence is 0.5%.</p>\n        <p>The same logic applies to every other axis of difference: age distribution, comorbidity, imaging equipment, staining protocol, skin tone, sex, nutritional status. When any of these differ between the training population and yours, published performance is a hypothesis about your setting — not a fact about it.</p>"
      },
      {
        "h": "Research result versus deployable tool",
        "html": "\n        <p>An enormous gap separates a promising paper from a safe clinical tool. The World Economic Forum notes that <strong>more than 70% of US FDA approvals in this space have centred on imaging applications, most of which have yet to be implemented at scale.</strong> Regulatory clearance is not the same as clinical adoption, and clinical adoption is not the same as demonstrated patient benefit.</p>\n        <p>Before a tool touches a patient, four questions must all be answered:</p>\n        <ol class=\"body\">\n          <li><strong>Was it validated externally</strong> — on data from institutions that did not contribute to training?</li>\n          <li><strong>Was it validated prospectively</strong> — on patients as they actually present, not on a curated retrospective set?</li>\n          <li><strong>Does it change decisions</strong> — and do those changed decisions improve outcomes?</li>\n          <li><strong>Does it work here</strong> — in this population, with this equipment, in this workflow?</li>\n        </ol>\n        <p>Most published models fail at question one.</p>"
      },
      {
        "h": "What AI is not",
        "html": "\n        <ul class=\"body\">\n          <li><strong>It is not clinical reasoning.</strong> It is pattern recognition. It has no model of physiology, no concept of the patient in front of you, and no awareness of what it does not know.</li>\n          <li><strong>It is not objective.</strong> A model trained on historical clinical decisions inherits historical clinical patterns, including inequitable ones.</li>\n          <li><strong>It is not stable over time.</strong> Populations change, protocols change, equipment changes. Performance degrades silently — a phenomenon called <span class=\"term\">dataset shift</span>, covered in Module 6.</li>\n          <li><strong>It is not accountable.</strong> Under every framework that currently exists, the registered health professional remains responsible for the clinical decision.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the question that reframes any demonstration",
      "text": "When a vendor demonstrates a diagnostic tool, ask: <em>\"Which hospitals contributed the training data, and what were the patient demographics and disease prevalence?\"</em> If the answer is a well-resourced tertiary centre in a high-income country and your setting is a district hospital in South Asia, treat the quoted accuracy as unproven in your context until you validate it locally. Performance is not portable."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take one diagnostic or triage decision made repeatedly in your department. Write down: (a) the outcome an algorithm would need to predict, (b) roughly what proportion of your patients have that outcome (the prevalence), and (c) which error would harm the patient more — a missed case or a false alarm. Your answer to (c) determines the threshold the tool should be set at, and that is a clinical decision, not a technical one."
    },
    "takeaways": [
      "Deep learning interprets images; machine learning predicts events; generative AI produces text — different risks, different governance",
      "A model learns statistical patterns from its training data and knows nothing beyond them",
      "Judge tools on sensitivity, specificity, PPV and NPV at the operating threshold — not on AUC or accuracy alone",
      "Predictive values shift with prevalence, so performance does not transfer between populations",
      "Regulatory clearance is not evidence of patient benefit; external and prospective validation are what matter",
      "The registered health professional remains accountable for every clinical decision"
    ],
    "quiz": [
      {
        "q": "A tuberculosis screening algorithm reports 94% accuracy. Before accepting this, your most important question is:",
        "opts": [
          "\"What were the sensitivity, specificity and disease prevalence in the validation population?\"",
          "\"How fast does it run?\"",
          "\"Which programming language was used?\"",
          "\"How many parameters does the model have?\""
        ],
        "a": 0,
        "fb": "Accuracy is nearly meaningless without knowing the threshold performance and the prevalence of the validation population — predictive values shift with prevalence."
      },
      {
        "q": "A model is used to RULE OUT a serious condition. Which measure matters most?",
        "opts": [
          "Positive predictive value",
          "Negative predictive value and sensitivity",
          "Parameter count",
          "Processing speed"
        ],
        "a": 1,
        "fb": "To safely rule out disease you need high sensitivity and high negative predictive value — otherwise cases are missed and falsely reassured."
      },
      {
        "q": "Why may a model validated in a European tertiary centre underperform in a Nepali district hospital?",
        "opts": [
          "Software cannot cross borders",
          "European models are poorly built",
          "Differences in patient population, disease prevalence, equipment and image quality mean performance does not transfer",
          "Because of the time zone"
        ],
        "a": 2,
        "fb": "Model performance is a property of the population and conditions it was trained and validated on — it must be revalidated locally."
      },
      {
        "q": "'Dataset shift' describes:",
        "opts": [
          "A type of encryption",
          "Transferring data to the cloud",
          "Moving files between computers",
          "Silent degradation of model performance as populations, protocols or equipment change over time"
        ],
        "a": 3,
        "fb": "Dataset shift is gradual and produces no error message — which is precisely why ongoing monitoring is mandatory."
      },
      {
        "q": "Which statement about accountability is correct under current frameworks?",
        "opts": [
          "The registered health professional remains accountable for the clinical decision",
          "No one is accountable when AI is involved",
          "The AI vendor is legally responsible for clinical outcomes",
          "Accountability transfers to the hospital's IT department"
        ],
        "a": 0,
        "fb": "AI is a decision-support tool. Clinical and legal accountability continues to rest with the responsible health professional."
      }
    ]
  },
  {
    "id": "h2",
    "tag": "Module 2",
    "time": "45 min",
    "title": "Health Data: The Foundation and the Bottleneck",
    "summary": "Why data quality decides whether clinical AI succeeds or fails",
    "objectives": [
      "Explain why data quality — not algorithm sophistication — determines the success of clinical AI",
      "Identify the data realities of health systems in Nepal and comparable settings: paper records, fragmented systems, incomplete registries",
      "Understand labelling, ground truth and why they are harder in medicine than in any other domain",
      "Recognise class imbalance, data leakage and unrepresentative training data",
      "Understand interoperability standards and why they determine what is possible",
      "Apply privacy and consent principles to health data used for AI"
    ],
    "sections": [],
    "activity": {
      "title": "",
      "text": ""
    },
    "takeaways": [],
    "quiz": []
  },
  {
    "id": "h3",
    "tag": "Module 3",
    "time": "55 min",
    "title": "AI in Diagnosis & Clinical Decision Support",
    "summary": "Imaging, triage, early warning and the limits of the evidence",
    "objectives": [
      "Map where AI is genuinely established in diagnosis today and where claims outrun evidence",
      "Understand medical imaging AI: radiology, pathology, ophthalmology and dermatology",
      "Understand clinical deterioration and early-warning models, and why they often disappoint",
      "Apply the concepts of assistive, autonomous and triage modes of deployment",
      "Evaluate explainability tools and understand their real limits",
      "Integrate AI output into clinical reasoning without succumbing to automation bias"
    ],
    "sections": [],
    "activity": {
      "title": "",
      "text": ""
    },
    "takeaways": [],
    "quiz": []
  },
  {
    "id": "h4",
    "tag": "Module 4",
    "time": "60 min",
    "title": "AI in Practice: Real-World Use Cases Today",
    "summary": "What is actually deployed and improving patient care right now",
    "objectives": [
      "Describe concrete, documented deployments of AI improving patient care today",
      "Identify which of these are directly relevant and transferable to Nepal and similar health systems",
      "Understand what made each deployment work — and what limited it",
      "Distinguish genuinely operational applications from pilots and marketing claims",
      "Build a realistic picture of what your own institution could implement within twelve months"
    ],
    "sections": [],
    "activity": {
      "title": "",
      "text": ""
    },
    "takeaways": [],
    "quiz": []
  },
  {
    "id": "h5",
    "tag": "Module 5",
    "time": "55 min",
    "title": "Generative AI in Clinical Practice",
    "summary": "Documentation, communication and safe professional use of language models",
    "objectives": [
      "Understand what a large language model is and how it differs from a clinical prediction model",
      "Identify high-value generative AI applications in clinical and administrative work",
      "Explain retrieval-augmented generation and why it is the safe pattern for clinical knowledge tools",
      "Write effective prompts for clinical and academic tasks",
      "Know exactly what must never be entered into a public AI tool",
      "Design human review proportionate to clinical risk"
    ],
    "sections": [],
    "activity": {
      "title": "",
      "text": ""
    },
    "takeaways": [],
    "quiz": []
  },
  {
    "id": "h6",
    "tag": "Module 6",
    "time": "60 min",
    "title": "The Dangers: Risks of AI in Healthcare",
    "summary": "Patient safety, bias, privacy and the risks that matter clinically",
    "objectives": [
      "Apply a structured taxonomy of AI risk specific to clinical care",
      "Understand how AI can cause direct patient harm, and through which mechanisms",
      "Recognise algorithmic bias as a health-equity and patient-safety issue",
      "Understand dataset shift, silent failure and why monitoring is mandatory",
      "Assess privacy, cybersecurity and third-party risks in a clinical context",
      "Understand deskilling, liability and the risk of widening the digital divide"
    ],
    "sections": [],
    "activity": {
      "title": "",
      "text": ""
    },
    "takeaways": [],
    "quiz": []
  },
  {
    "id": "h7",
    "tag": "Module 7",
    "time": "55 min",
    "title": "AI for Health Systems in Nepal & Developing Countries",
    "summary": "Leapfrogging, workforce shortage and building for constraint",
    "objectives": [
      "Quantify the health workforce and access gap that AI is often proposed to address",
      "Understand what 'leapfrogging' realistically means — and what it requires",
      "Apply the WHO-ITU RISE framework for equitable AI adoption",
      "Identify the specific opportunities most relevant to Nepal and comparable systems",
      "Recognise the failure patterns that repeatedly defeat health technology projects in these settings",
      "Understand why locally-owned priorities outperform imported solutions"
    ],
    "sections": [],
    "activity": {
      "title": "",
      "text": ""
    },
    "takeaways": [],
    "quiz": []
  },
  {
    "id": "h8",
    "tag": "Module 8",
    "time": "55 min",
    "title": "Ethics, Governance & Regulation",
    "summary": "Consent, oversight, regulatory frameworks and clinical governance",
    "objectives": [
      "Apply core ethical principles to AI in clinical care",
      "Understand how AI-enabled medical devices are regulated internationally and what that implies locally",
      "Understand WHO guidance and the global governance landscape",
      "Build a clinical AI governance structure with clear accountability",
      "Handle consent, transparency and disclosure to patients",
      "Design validation, monitoring and incident procedures for deployed AI"
    ],
    "sections": [],
    "activity": {
      "title": "",
      "text": ""
    },
    "takeaways": [],
    "quiz": []
  },
  {
    "id": "h9",
    "tag": "Module 9",
    "time": "50 min",
    "title": "Implementation: From Pilot to Practice",
    "summary": "Making it work, making it last, and building your proposal",
    "objectives": [
      "Understand why most healthcare AI initiatives fail to scale beyond pilot",
      "Apply the 10-20-70 rule and prioritise change management appropriately",
      "Build a credible business case with a measured baseline and full lifetime cost",
      "Conduct meaningful vendor due diligence for clinical software",
      "Design a pilot with defined success criteria and a stopping rule",
      "Lead clinical colleagues through adoption",
      "Complete a defensible AI use-case proposal for your own institution"
    ],
    "sections": [],
    "activity": {
      "title": "",
      "text": ""
    },
    "takeaways": [],
    "quiz": []
  }
];
