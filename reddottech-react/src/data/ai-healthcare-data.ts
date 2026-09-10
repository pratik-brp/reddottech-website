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
    "sections": [
      {
        "h": "The uncomfortable truth about clinical AI projects",
        "html": "\n        <p>Across industries, roughly <strong>a quarter of organisations report extracting meaningful value from generative AI</strong>, according to BCG — and healthcare providers sit close to that benchmark at around 29%. The reason so many initiatives stall is rarely the algorithm. It is the data underneath it.</p>\n        <p>Healthcare has a specific problem the technology industry underestimates: <strong>medicine's ground truth is genuinely uncertain</strong>. In most domains the label is obvious — a transaction was fraudulent or it was not. In medicine, two experienced radiologists may disagree on the same film. The \"correct answer\" a model learns from is itself a human judgement with its own error rate.</p>"
      },
      {
        "h": "Where health data actually lives in a typical system",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Paper case notes and registers</strong> — still the primary clinical record in many facilities, particularly at district and primary level.</li>\n          <li><strong>Hospital information systems</strong> — often covering admissions, billing and pharmacy but not clinical detail.</li>\n          <li><strong>Laboratory and imaging systems</strong> — frequently standalone, with results returned as printed reports or PDF images rather than structured data.</li>\n          <li><strong>Vertical programme systems</strong> — separate registries for tuberculosis, HIV, immunisation, maternal health, each with its own identifiers.</li>\n          <li><strong>Community health worker records</strong> — often paper-based, held at the community level and aggregated only in summary.</li>\n        </ul>\n        <p>To train a model predicting, say, treatment outcome in tuberculosis, you must link a patient's presentation, radiograph, laboratory confirmation, treatment record and final outcome — data that may sit in five systems with no shared patient identifier. When the linkage fails silently, the resulting dataset is quietly wrong, and no amount of modelling sophistication will rescue it.</p>"
      },
      {
        "h": "Labelling and ground truth: medicine's hardest problem",
        "html": "\n        <p>Supervised learning requires labelled examples. In healthcare, obtaining that label is expensive and often ambiguous.</p>\n        <ul class=\"body\">\n          <li><strong>Expert time is scarce.</strong> Labelling ten thousand radiographs requires radiologist hours that most systems cannot spare.</li>\n          <li><strong>Experts disagree.</strong> Inter-observer variation is a well-documented reality in radiology, pathology and dermatology. A model trained on one reader's labels learns that reader's idiosyncrasies.</li>\n          <li><strong>The best label may arrive late.</strong> Confirmed diagnosis may only emerge after culture results, biopsy or clinical course — sometimes months later.</li>\n          <li><strong>Proxy labels mislead.</strong> Using \"was treated for X\" as a proxy for \"had X\" encodes clinical decision-making patterns, including the tendency to under-investigate certain patient groups.</li>\n        </ul>\n        <div class=\"callout note\"><h4>Deeper dive: why proxy labels are dangerous in health equity terms</h4><p style=\"margin:0\">If a model is trained to predict \"patients who received specialist referral\" as a proxy for \"patients who needed specialist referral,\" it will faithfully reproduce whatever referral inequities already exist. Groups historically under-referred will be predicted to need less care — and the model will appear to perform well, because it accurately predicts what happened. This is one of the most consequential and least visible errors in clinical AI.</p></div>"
      },
      {
        "h": "Three technical traps with clinical consequences",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Class imbalance.</strong> Serious outcomes are usually rare. A model predicting in-hospital mortality where mortality is 2% can achieve 98% accuracy by predicting survival for everyone — and be clinically useless. Always ask for sensitivity and PPV, never accuracy.</li>\n          <li><strong>Data leakage.</strong> Information that would not exist at the moment of decision creeps into training. A sepsis model that includes \"antibiotics administered\" appears extraordinary and fails immediately in prospective use, because at the moment of prediction that field is empty. The test: <em>would this value genuinely exist, in this form, at the moment the clinician needs the prediction?</em></li>\n          <li><strong>Unrepresentative training data.</strong> If a dermatology model was trained overwhelmingly on lighter skin tones, its performance on darker skin may be substantially worse. If a model was trained only on adults, it should not be used in paediatrics. Representation is a safety issue, not a diversity gesture.</li>\n        </ul>"
      },
      {
        "h": "Interoperability: the standards that decide what is possible",
        "html": "\n        <p>Two standards dominate:</p>\n        <ul class=\"body\">\n          <li><strong>HL7 FHIR</strong> — the modern standard for exchanging structured clinical data between systems.</li>\n          <li><strong>DICOM</strong> — the universal standard for medical imaging, which is why imaging AI has advanced faster than almost any other clinical application: the data was already standardised.</li>\n        </ul>\n        <p>This is not a technical footnote. It is strategy. The World Economic Forum urges health systems to move <em>\"from fighting on infrastructure to winning on services\"</em> — prioritising shared digital public infrastructure rather than each institution building its own incompatible stack. For a country still building its digital health foundations, choosing interoperable standards now is far cheaper than retrofitting them later.</p>"
      },
      {
        "h": "Privacy, consent and the special status of health data",
        "html": "\n        <p>Health data attracts the strictest protection in nearly every legal system, and for good reason: it is intimate, permanent, and capable of causing discrimination in employment, insurance and social standing.</p>\n        <p>Practical obligations that apply regardless of jurisdiction:</p>\n        <ul class=\"body\">\n          <li><strong>Lawful basis and consent</strong> — patients must understand how their data may be used, including for developing or improving AI.</li>\n          <li><strong>De-identification is not absolute.</strong> Removing names is insufficient; rare diagnoses, precise dates and geography can re-identify individuals. Imaging carries particular risk — facial reconstruction from head CT and MRI is demonstrably possible.</li>\n          <li><strong>Purpose limitation</strong> — data collected for clinical care cannot be silently repurposed for commercial model development.</li>\n          <li><strong>Cross-border transfer</strong> — sending patient data to an overseas cloud service is a governance decision requiring explicit assessment, not an IT convenience.</li>\n          <li><strong>Data sovereignty</strong> — the WEF frames the goal as <em>\"local control of data within a globally connected and patient-centred system.\"</em></li>\n        </ul>\n        <p>Nepal's Privacy Act (2075) and associated regulations, together with institutional research ethics requirements, govern this domain locally. Always confirm current requirements with your institution's ethics committee or legal adviser before any data leaves clinical control.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the linkage test",
      "text": "Before endorsing any AI proposal in your institution, ask a single question: <em>\"Can we reliably link this patient's record across the systems this model needs, using a consistent identifier?\"</em> If the answer is no, the first project is not AI — it is patient identification and record linkage. That is unglamorous, but it is the foundation everything else stands on, and it delivers value even if no model is ever built."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Choose one clinical question in your department that AI might help with. List every data element a model would need. Mark each as: <strong>(A)</strong> reliably recorded in digital form today, <strong>(B)</strong> recorded but on paper or in a separate system, <strong>(C)</strong> not captured at all. Then ask: who would provide the labels, and how confident are we that those labels are correct? This is the honest feasibility assessment most proposals skip."
    },
    "takeaways": [
      "Clinical AI projects fail on data far more often than on algorithms",
      "Ground truth in medicine is itself uncertain — experts disagree, and labels are expensive and often delayed",
      "Proxy labels reproduce existing inequities while appearing to perform well",
      "Class imbalance makes accuracy meaningless; leakage produces spectacular but fake performance",
      "Unrepresentative training data is a patient-safety issue",
      "FHIR and DICOM interoperability determine what is buildable; shared infrastructure beats fragmented systems",
      "Health data demands the strictest privacy discipline — de-identification alone is not protection"
    ],
    "quiz": [
      {
        "q": "A sepsis prediction model includes 'broad-spectrum antibiotics administered' as an input and performs extraordinarily well. What is wrong?",
        "opts": [
          "The antibiotics should be weighted lower",
          "Data leakage: that information does not exist at the moment the prediction is needed",
          "Nothing — antibiotics are a valid predictor",
          "It should also include antifungals"
        ],
        "a": 1,
        "fb": "Antibiotic administration follows the clinical suspicion of sepsis. Including it leaks the outcome into the prediction — impressive in testing, useless prospectively."
      },
      {
        "q": "A model trained to predict 'patients who received specialist referral' as a proxy for clinical need will most likely:",
        "opts": [
          "Eliminate bias from referral decisions",
          "Fail immediately and obviously",
          "Reproduce existing referral inequities while appearing to perform well",
          "Improve access for under-served groups automatically"
        ],
        "a": 2,
        "fb": "Proxy labels encode historical decision patterns. Groups previously under-referred will be predicted to need less care — and the model will look accurate."
      },
      {
        "q": "Why has imaging AI advanced faster than most other clinical applications?",
        "opts": [
          "Images require less storage",
          "Images are simpler than text",
          "Radiologists are more cooperative",
          "Imaging data was already standardised through DICOM"
        ],
        "a": 3,
        "fb": "DICOM gave imaging a universal standard long before other clinical data was structured, making large training datasets feasible."
      },
      {
        "q": "Removing patient names from a dataset before sharing it:",
        "opts": [
          "Is insufficient — rare diagnoses, dates, geography and imaging can enable re-identification",
          "Guarantees anonymity",
          "Makes the data useless",
          "Is required only for research"
        ],
        "a": 0,
        "fb": "De-identification is a spectrum, not a guarantee. Head imaging in particular carries demonstrated re-identification risk."
      },
      {
        "q": "In a population where an outcome occurs in 2% of patients, a model reporting 98% accuracy:",
        "opts": [
          "Is performing excellently",
          "May be predicting 'no' for everyone and be clinically useless",
          "Is safe to deploy",
          "Has been externally validated"
        ],
        "a": 1,
        "fb": "Severe class imbalance makes accuracy misleading. Sensitivity, PPV and the clinical cost of each error type are what matter."
      }
    ]
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
    "sections": [
      {
        "h": "Where the evidence is strongest",
        "html": "\n        <p>AI in diagnosis is not uniformly mature. Evidence is strongest where the input is a standardised image, the question is narrow and binary, and large labelled datasets exist:</p>\n        <ul class=\"body\">\n          <li><strong>Diabetic retinopathy screening</strong> from retinal photographs — among the most validated applications, with several systems approved for use in screening programmes internationally.</li>\n          <li><strong>Tuberculosis screening</strong> from chest radiographs — of direct relevance to Nepal and much of South Asia, and covered in detail in Module 4.</li>\n          <li><strong>Mammography and lung nodule detection</strong> — well studied, increasingly deployed as a second reader.</li>\n          <li><strong>Histopathology</strong> — detection and grading tasks on digitised slides.</li>\n          <li><strong>Stroke imaging triage</strong> — flagging large-vessel occlusion to accelerate time-critical pathways.</li>\n        </ul>\n        <p>Evidence is considerably weaker for broad diagnostic reasoning across undifferentiated presentations — precisely the task clinicians find hardest and where a tool would be most valuable. Be sceptical of any product claiming general diagnostic capability.</p>"
      },
      {
        "h": "Three modes of deployment — and why the distinction matters",
        "html": "\n        <p>The same algorithm carries entirely different risk depending on how it is used:</p>\n        <ul class=\"body\">\n          <li><strong>Assistive.</strong> The model offers a second opinion; a clinician reads independently and decides. Lowest risk, and the appropriate default. The main hazard is automation bias.</li>\n          <li><strong>Triage or prioritisation.</strong> The model reorders the worklist so urgent cases are read first, but every case is still read by a human. This is often the highest value-to-risk ratio in a resource-constrained system — nothing is missed that would otherwise have been caught, and time-critical findings surface sooner.</li>\n          <li><strong>Autonomous.</strong> The model issues a result without human review. Appropriate only in narrowly defined, heavily validated, regulator-approved circumstances, and requiring explicit clinical governance and a clear safety net for the cases it clears.</li>\n        </ul>\n        <p>When evaluating a proposal, establish which mode is intended before discussing anything else. Many disagreements about clinical AI dissolve once this is clarified.</p>"
      },
      {
        "h": "Clinical deterioration and early-warning models",
        "html": "\n        <p>Predicting which ward patient will deteriorate is enormously attractive — and historically disappointing. Well-documented problems in the literature include poor external validity when models move between institutions, alarm burden that produces fatigue and dismissal, and models that predict deterioration only marginally earlier than an attentive nurse.</p>\n        <p>The lesson is not that these models are useless, but that the intervention matters more than the prediction. <strong>A prediction that does not trigger a defined, resourced clinical response changes nothing.</strong> Before deploying any early-warning system, agree exactly what happens when it fires, who responds, and within what time — and measure whether that response actually occurs.</p>"
      },
      {
        "h": "Explainability: useful, but frequently oversold",
        "html": "\n        <p>Deep learning models are not directly interpretable, so several techniques attempt to explain their outputs:</p>\n        <ul class=\"body\">\n          <li><strong>Saliency and heat maps</strong> highlight image regions that most influenced the output. Genuinely useful for spotting gross errors — a model attending to a scanner artefact or a laterality marker rather than pathology.</li>\n          <li><strong>SHAP and similar methods</strong> quantify each variable's contribution to an individual prediction, which suits tabular clinical models.</li>\n          <li><strong>Case-based explanation</strong> shows similar training examples, which clinicians often find more intuitive than either of the above.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The honest caveat</h4><p style=\"margin:0\">A heat map shows where the model looked, not <em>why</em> it concluded what it concluded. It can create a comfortable but false sense of understanding. Explainability tools are quality-assurance instruments for catching obvious failures — they are not a substitute for external validation, and they should never be the primary evidence that a model is safe.</p></div>"
      },
      {
        "h": "Automation bias: the clinical risk you are most likely to underestimate",
        "html": "\n        <p><span class=\"term\">Automation bias</span> is the documented human tendency to accept a machine recommendation even when independent evidence contradicts it. In clinical settings this cuts both ways: clinicians may over-call findings the model flags, and — more dangerously — may under-call findings the model missed.</p>\n        <p>The effect is strongest in exactly the conditions where AI is most deployed: high volume, time pressure, fatigue, and junior staff working beyond their comfort zone. It is also self-reinforcing, because a model that is usually right trains you to stop checking.</p>\n        <p>Practical mitigations that have some support in practice:</p>\n        <ul class=\"body\">\n          <li><strong>Read before you look.</strong> Where feasible, form your own impression before revealing the AI output.</li>\n          <li><strong>Treat disagreement as a signal to slow down,</strong> not as a prompt to defer.</li>\n          <li><strong>Track override rates.</strong> If clinicians almost never disagree with the model, that is a governance warning, not a success metric.</li>\n          <li><strong>Preserve the right to disagree</strong> without administrative penalty, and record the reasoning.</li>\n        </ul>"
      },
      {
        "h": "How to appraise a clinical AI study",
        "html": "\n        <p>You already know how to appraise a diagnostic accuracy study. Apply the same rigour, plus four AI-specific questions:</p>\n        <ol class=\"body\">\n          <li><strong>Was validation external and prospective?</strong> Retrospective internal validation is the weakest evidence and the most commonly reported.</li>\n          <li><strong>What was the comparator?</strong> \"Better than a junior trainee\" and \"better than an experienced consultant\" are very different claims.</li>\n          <li><strong>Were failure cases published?</strong> A study reporting no analysis of errors is incomplete.</li>\n          <li><strong>Was any patient outcome measured</strong> — or only diagnostic concordance? Improved detection that does not change management or outcome is not yet clinical value.</li>\n        </ol>\n        <p>Reporting guidelines now exist for AI studies — including the CONSORT-AI and SPIRIT-AI extensions for trials and STARD-AI for diagnostic accuracy — and are a reasonable benchmark to expect from any serious vendor evidence pack.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: start with triage, not autonomy",
      "text": "In a resource-constrained service, the safest and highest-value first deployment is almost always <strong>worklist prioritisation</strong>. Every study is still read by a human, so nothing can be missed that would otherwise have been caught — but urgent findings surface hours or days earlier. The clinical benefit is real, the risk profile is modest, and it builds institutional confidence before anything more ambitious is attempted."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Identify one imaging or test-reporting backlog in your institution. Estimate the current time from acquisition to clinical action. Then specify what a triage-mode AI would need to achieve to be worth adopting: what sensitivity would you require, what would happen to a flagged case, who would act, and how would you measure whether time-to-action actually improved? You have just written a deployable evaluation protocol."
    },
    "takeaways": [
      "Evidence is strongest for narrow, image-based, binary tasks — weakest for broad diagnostic reasoning",
      "Assistive, triage and autonomous deployment carry very different risks; clarify the mode first",
      "A prediction without a defined, resourced clinical response changes nothing",
      "Heat maps show where a model looked, not why it decided — explainability is QA, not proof of safety",
      "Automation bias is strongest under fatigue and time pressure; low override rates are a warning sign",
      "Demand external, prospective validation and outcome measures — not retrospective concordance"
    ],
    "quiz": [
      {
        "q": "Which deployment mode generally offers the best value-to-risk ratio for a first clinical AI project in a busy, under-resourced service?",
        "opts": [
          "Replacing the on-call clinician",
          "Fully automated discharge decisions",
          "Triage or worklist prioritisation, with every case still read by a human",
          "Autonomous reporting without human review"
        ],
        "a": 2,
        "fb": "Triage surfaces urgent findings sooner while a human still reviews everything, so nothing can be missed that would otherwise have been caught."
      },
      {
        "q": "An early-warning model accurately predicts deterioration but outcomes do not improve. The most likely explanation is:",
        "opts": [
          "The nurses ignored the patients",
          "The model needs more parameters",
          "Predictions are inherently useless",
          "No defined, resourced clinical response was attached to the alert"
        ],
        "a": 3,
        "fb": "Prediction without a specified, staffed intervention changes nothing. Define who responds, how, and within what time — then measure it."
      },
      {
        "q": "A saliency heat map over a chest radiograph tells you:",
        "opts": [
          "Which image regions most influenced the output — useful for catching gross errors, but not a causal explanation",
          "Why the model reached its conclusion",
          "The patient's diagnosis with certainty",
          "That the model is safe to deploy"
        ],
        "a": 0,
        "fb": "Heat maps localise influence, not reasoning. They are a quality-assurance tool, not evidence of safety."
      },
      {
        "q": "Clinicians in your department almost never disagree with the AI's output. This is:",
        "opts": [
          "Irrelevant",
          "A governance warning sign suggesting possible automation bias",
          "Proof that training worked",
          "Evidence the model is excellent"
        ],
        "a": 1,
        "fb": "Near-zero override rates suggest deference rather than independent judgement — a hallmark of automation bias."
      },
      {
        "q": "Which is the strongest form of evidence for a diagnostic AI tool?",
        "opts": [
          "High AUC on the training set",
          "A vendor case study",
          "External, prospective validation with patient outcome measures",
          "Retrospective internal validation"
        ],
        "a": 2,
        "fb": "External and prospective validation, ideally with outcomes rather than concordance alone, is the standard to demand."
      }
    ]
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
    "sections": [
      {
        "h": "How to read this module",
        "html": "\n        <p>Every example below is drawn from documented deployments or published research reported in the sources for this programme. For each, we note what it does, what evidence supports it, and — most importantly for our purposes — <strong>how transferable it is to a resource-constrained setting</strong>.</p>\n        <p>A caution before we begin. The gap between \"demonstrated in a study\" and \"working reliably in a district hospital\" is wide. The World Economic Forum observes that although more than 70% of FDA approvals in this field concern imaging, most have yet to be implemented at scale. Read what follows as evidence of what is possible, not as a procurement list.</p>"
      },
      {
        "h": "1. Tuberculosis screening from chest X-rays",
        "html": "\n        <p><strong>What it does.</strong> Computer-aided detection software analyses a chest radiograph and returns an abnormality score indicating the likelihood of tuberculosis, allowing triage of who needs confirmatory molecular testing.</p>\n        <p><strong>The evidence.</strong> The UNDP background paper on AI in developing-country health systems documents pilot studies of the Delft Institute's <strong>CAD4TB</strong> software for computer-aided diagnosis of pulmonary tuberculosis from chest radiographs in <strong>Tanzania and Zambia</strong>, where performance compared well with that of human experts. WHO has separately examined AI-supported radiograph interpretation as a triage and screening tool in high-burden settings.</p>\n        <p><strong>Why it matters here.</strong> This is arguably the single most relevant clinical AI application for Nepal. Tuberculosis remains a major public health burden across South Asia; chest radiography is widely available even at district level; and the binding constraint is not equipment but the availability of someone qualified to interpret the film promptly. An algorithm that triages radiographs so that likely-positive cases reach molecular testing faster addresses a genuine bottleneck rather than an imagined one.</p>\n        <p><strong>Limits.</strong> Performance varies with population, prevalence and image quality, and requires local threshold-setting. It is a triage tool, not a diagnosis — bacteriological confirmation remains essential.</p>"
      },
      {
        "h": "2. Diabetic retinopathy screening",
        "html": "\n        <p><strong>What it does.</strong> Software analyses retinal photographs to identify referable diabetic retinopathy, allowing screening to occur without an ophthalmologist reading every image.</p>\n        <p><strong>The evidence.</strong> The UNDP paper cites work by Bellemo and colleagues deploying AI for diabetic retinopathy screening in <strong>Zambia</strong>, which showed clinically acceptable performance in detecting referable disease when compared with human assessment. This is among the most extensively validated applications of clinical AI globally.</p>\n        <p><strong>Why it matters here.</strong> Diabetes prevalence is rising rapidly across South Asia. Retinopathy is asymptomatic until late, is detectable, and is treatable — the classic profile of a condition where screening saves sight. The constraint everywhere is ophthalmologist time. A screening programme where trained technicians capture images and AI triages them extends specialist reach dramatically.</p>\n        <p><strong>Limits.</strong> Requires a functioning referral pathway. Screening that identifies disease no one can treat is not a service — it is an audit of your own inaccessibility. Build the treatment pathway first.</p>"
      },
      {
        "h": "3. Detecting birth asphyxia from an infant's cry",
        "html": "\n        <p><strong>What it does.</strong> <strong>Ubenwa</strong>, developed in Nigeria and documented in the UNDP paper, applies signal processing and machine learning to the sound of a newborn's cry to help identify birth asphyxia in low-resource settings.</p>\n        <p><strong>Why it matters here.</strong> This example is worth dwelling on because it demonstrates a principle that matters more than any single product: <strong>the most transferable innovations are those designed for constraint from the outset.</strong> It requires no imaging, no laboratory, no reliable electricity — only a microphone. Birth asphyxia is a leading contributor to neonatal mortality, and the settings where it is most lethal are precisely those with no specialist present at delivery.</p>\n        <p><strong>The lesson.</strong> Solutions built in high-resource settings and exported downward often fail. Solutions built for low-resource settings frequently transfer both ways. When scanning for what to adopt, look first at what was designed for conditions resembling yours.</p>"
      },
      {
        "h": "4. Ambient documentation — AI scribes",
        "html": "\n        <p><strong>What it does.</strong> The system listens to the clinical encounter and drafts the note, which the clinician reviews, edits and signs.</p>\n        <p><strong>The evidence.</strong> BCG's outlook on digital health reports that electronic health records increasingly incorporate ambient AI scribes that record and summarise patient conversations, reducing the time physicians spend documenting encounters, drafting notes and responding to messages — with the stated benefit that a lighter administrative load returns time to patient care.</p>\n        <p><strong>Why it matters.</strong> Documentation burden is a leading driver of clinician burnout worldwide, and burnout is a workforce-retention issue in systems that can least afford to lose staff. This is one of the few applications where the primary beneficiary is the clinician, which is also why adoption tends to be enthusiastic rather than resisted.</p>\n        <p><strong>Limits for our setting.</strong> Current tools are optimised for English and a handful of major languages, and assume reliable connectivity and an electronic record to write into. Multilingual consultations — routine in Nepal — remain a genuine technical challenge. This is an application to watch closely rather than adopt immediately, and a strong candidate for local language development.</p>"
      },
      {
        "h": "5. Patients using AI to navigate care — already happening",
        "html": "\n        <p><strong>What is happening.</strong> OpenAI's analysis of anonymised usage reports that healthcare accounts for more than 5% of all ChatGPT messages globally, that around one in four weekly users asks a health question each week, and that more than 40 million people ask health questions daily. Strikingly, <strong>seven in ten health conversations occur outside normal clinic hours</strong>, and users in underserved rural areas send roughly 600,000 healthcare-related messages weekly.</p>\n        <p><strong>A documented case.</strong> The report describes a user in San Francisco who used ChatGPT to help coordinate urgent care for her mother in <strong>Indonesia</strong> after sudden vision loss the family had attributed to fatigue. The model warned that the presentation could signal a hypertensive crisis and possible stroke; the family measured her blood pressure, which confirmed the concern, and she was admitted. The guidance was subsequently confirmed by a doctor in Indonesia, and her vision substantially recovered.</p>\n        <p><strong>Why this matters to you.</strong> Note what actually happened: AI did not diagnose or treat. It <strong>escalated appropriately and got the patient to a clinician faster</strong>. That is the realistic and genuinely valuable role for consumer AI in health — triage and navigation, particularly where distance, cost or hours delay presentation.</p>\n        <div class=\"callout warn\"><h4>The clinical implication you cannot ignore</h4><p style=\"margin:0\">Patients are arriving having already consulted AI. Dismissing this is neither realistic nor helpful. The constructive response is to ask what they were told, correct it where it is wrong, and use it as an opening for shared decision-making. OpenAI's own observation is instructive: <em>reliability improves when answers are grounded in the right patient-specific context</em> — which is precisely what you, and not the chatbot, possess.</p></div>"
      },
      {
        "h": "6. Telemedicine, triage and reaching the unreached",
        "html": "\n        <p><strong>What it does.</strong> Intelligent triage systems assess presenting symptoms and route patients to the appropriate level of care, escalating urgent cases. KPMG's work with FICCI in India describes AI transforming remote care and telemedicine by enabling continuous monitoring and ensuring timely escalation of cases.</p>\n        <p><strong>Why it matters here.</strong> Nepal's geography makes this compelling. Where a patient is a day's travel from a district hospital, the decision of <em>whether</em> to travel is itself a high-stakes clinical judgement — usually made with no clinical input. AI-supported triage delivered through a health worker's phone can improve that decision without requiring the patient to move.</p>\n        <p><strong>Limits.</strong> Triage tools inherit the safety profile of their thresholds. Set them to minimise unnecessary travel and you will miss cases; set them to catch everything and you will overwhelm referral centres. This calibration is a health-system policy decision, not a vendor setting.</p>"
      },
      {
        "h": "7. Public health surveillance and programme management",
        "html": "\n        <p><strong>What it does.</strong> Predictive models analyse routine surveillance data to detect outbreak signals earlier, forecast demand, and target interventions geographically.</p>\n        <p><strong>The evidence and framing.</strong> The KPMG–FICCI paper describes AI enhancing disease surveillance, optimising resource allocation and enabling targeted interventions for non-communicable diseases and maternal and child health, alongside fraud detection and monitoring in public health schemes. The WEF similarly identifies public health surveillance and resource allocation as core public-sector applications.</p>\n        <p><strong>Why it matters here.</strong> This may be the highest-leverage application for a ministry of health, because it operates on data that <em>already exists</em> in routine reporting systems and does not require new devices at the point of care. It is also where weak data quality bites hardest — the output can only be as good as the completeness and timeliness of routine reporting.</p>"
      },
      {
        "h": "8. Drug discovery and the science pipeline",
        "html": "\n        <p><strong>What it does.</strong> AI accelerates target identification, molecular design and clinical trial planning. The UNDP paper notes DeepMind's <strong>AlphaFold</strong> reliably predicting three-dimensional protein structures — a genuine scientific milestone — and the use of AI to identify potential treatments for Ebola virus disease.</p>\n        <p><strong>Why it matters here — with an important caveat.</strong> Nepal is unlikely to conduct frontier drug discovery. But the UNDP paper raises a question that matters enormously for developing countries: <em>how appropriate is it for a small number of private actors to control intellectual property for technologies with the potential to be public goods</em>, particularly where the underlying research was publicly funded? In developing-country settings, access may be constrained by restrictive licensing rather than by science. That is a policy conversation your health leadership should be part of.</p>"
      },
      {
        "h": "9. Hospital operations and the administrative layer",
        "html": "\n        <p><strong>What it does.</strong> Scheduling optimisation, bed and theatre management, supply chain and inventory forecasting, claims and billing automation, and patient engagement platforms. KPMG India documents deployments including AI-powered patient engagement systems in large multispecialty hospitals and generative-AI conversational platforms operating across hospital chains with location-specific responses.</p>\n        <p><strong>Why it matters here.</strong> This is the least glamorous category and frequently the most immediately valuable. It carries lower clinical risk, produces measurable results quickly, and builds institutional confidence and data discipline before anything touches a diagnosis. For most hospitals, <strong>this is where a sensible AI programme starts.</strong></p>"
      },
      {
        "h": "What these examples have in common",
        "html": "\n        <p>Across every successful deployment above, four features recur:</p>\n        <ol class=\"body\">\n          <li><strong>They address a real bottleneck</strong> — a shortage of interpreters, of specialist time, of access — rather than demonstrating a capability.</li>\n          <li><strong>They keep a human in the decision loop</strong>, with AI triaging, drafting or prioritising rather than concluding.</li>\n          <li><strong>They fit an existing workflow</strong> and existing infrastructure, rather than requiring the workflow to be rebuilt around them.</li>\n          <li><strong>They connect to an actionable pathway.</strong> Detection without treatment capacity is not a service.</li>\n        </ol>\n        <p>Any proposal you are shown that lacks all four deserves careful scepticism, however impressive the technology.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: pick the bottleneck, not the technology",
      "text": "The most reliable way to choose a first project is to ignore technology entirely for an hour. Ask instead: <em>where do patients in our service wait longest, travel furthest, or get missed most often — and why?</em> Then ask whether any of the applications in this module addresses that specific cause. Projects chosen this way survive; projects chosen because a tool was impressive rarely do."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Choose the ONE example from this module most relevant to your institution. Write half a page covering: the specific bottleneck it would address; roughly how many patients are affected each month; what data and equipment you already have; what the referral or treatment pathway would be for a positive finding; and what single measure would tell you within six months whether it worked. Keep this — it becomes the core of your capstone proposal in Module 9."
    },
    "takeaways": [
      "TB radiograph triage and diabetic retinopathy screening are the most directly relevant validated applications for Nepal",
      "Ubenwa shows that tools designed for constrained settings transfer better than tools exported downward",
      "Ambient AI scribes address clinician burnout but currently assume English and reliable connectivity",
      "Patients already use AI for health — seven in ten such conversations happen outside clinic hours",
      "Consumer AI's realistic value is escalation and navigation, not diagnosis",
      "Operations and surveillance applications often deliver faster, safer value than clinical tools",
      "Successful deployments address a real bottleneck, keep humans deciding, fit the workflow, and connect to an actionable pathway"
    ],
    "quiz": [
      {
        "q": "Which application is most directly relevant to Nepal's disease burden and existing infrastructure?",
        "opts": [
          "Robotic surgery",
          "Autonomous ambulances",
          "Genomic newborn screening at population scale",
          "AI triage of chest radiographs for tuberculosis"
        ],
        "a": 3,
        "fb": "Chest radiography is widely available; the constraint is timely expert interpretation. TB triage addresses a genuine bottleneck with existing equipment."
      },
      {
        "q": "The Ubenwa example from Nigeria illustrates which principle?",
        "opts": [
          "Tools designed for low-resource constraints from the outset transfer better than tools exported downward",
          "Neonatal care cannot benefit from AI",
          "Audio analysis is superior to imaging",
          "Only wealthy countries can build useful AI"
        ],
        "a": 0,
        "fb": "Requiring only a microphone, it was designed for the constraints it serves — which is why it transfers. Imported high-resource solutions frequently fail."
      },
      {
        "q": "Before launching a retinopathy screening programme, the most important prerequisite is:",
        "opts": [
          "Cloud storage",
          "A functioning referral and treatment pathway for positive findings",
          "The newest camera model",
          "A press release"
        ],
        "a": 1,
        "fb": "Screening that detects disease no one can treat is not a service. Build the treatment pathway before the detection capability."
      },
      {
        "q": "In the documented case where AI helped a family in Indonesia, what did the AI actually contribute?",
        "opts": [
          "It prescribed medication",
          "It replaced the treating doctor",
          "It escalated appropriately, prompting urgent assessment that led to hospital admission",
          "It diagnosed and treated the condition"
        ],
        "a": 2,
        "fb": "The realistic and valuable role of consumer AI in health is triage and navigation — getting the patient to a clinician faster, not replacing one."
      },
      {
        "q": "For most hospitals, the safest place to begin an AI programme is:",
        "opts": [
          "Replacing radiologists",
          "Genomic medicine",
          "Autonomous diagnosis",
          "Operational and administrative applications such as scheduling and documentation"
        ],
        "a": 3,
        "fb": "Operational applications carry lower clinical risk, deliver measurable results quickly, and build the data discipline and confidence needed for clinical work later."
      },
      {
        "q": "Detection capability without treatment capacity amounts to:",
        "opts": [
          "An audit of your own inaccessibility rather than a service",
          "A regulatory requirement",
          "A complete health programme",
          "Sufficient clinical value"
        ],
        "a": 0,
        "fb": "Identifying disease you cannot treat does not improve outcomes and may erode trust. The pathway matters as much as the detection."
      }
    ]
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
    "sections": [
      {
        "h": "A different technology, a different failure mode",
        "html": "\n        <p>The models in Modules 3 and 4 output a probability. A <span class=\"term\">large language model</span> (LLM) outputs text, generated by repeatedly predicting the next fragment of language.</p>\n        <p>The clinical consequence is critical. A diagnostic model can be wrong in ways you can measure and monitor. A language model can be wrong <strong>fluently, confidently and plausibly</strong> — producing a well-structured paragraph containing a fabricated drug interaction, an invented guideline recommendation, or a citation to a paper that does not exist. This is <span class=\"term\">hallucination</span>, and in medicine it is the defining safety problem of generative AI.</p>\n        <p>The danger is amplified by presentation. Fluent, confident, correctly formatted clinical prose reads as authoritative. Your instinct for detecting an unreliable source — hesitancy, poor grammar, vagueness — does not fire.</p>"
      },
      {
        "h": "Where generative AI genuinely helps",
        "html": "\n        <p>The strongest applications share a shape: language-heavy, high-volume, and verifiable by a competent professional.</p>\n        <ul class=\"body\">\n          <li><strong>Clinical documentation.</strong> Drafting notes, discharge summaries, referral letters and operation notes for clinician review.</li>\n          <li><strong>Patient communication.</strong> Translating discharge instructions into plain language, and into the patient's own language — of real significance in a multilingual country.</li>\n          <li><strong>Guideline and protocol lookup.</strong> Answering \"what does our protocol say about X?\" with citations to your institution's approved documents.</li>\n          <li><strong>Literature synthesis.</strong> Summarising evidence for a journal club, teaching session or audit — with sources verified.</li>\n          <li><strong>Administrative correspondence.</strong> Insurance documentation, referral paperwork, committee minutes.</li>\n          <li><strong>Coding support.</strong> Suggesting diagnostic and procedure codes from a clinical narrative for human confirmation.</li>\n          <li><strong>Teaching and assessment.</strong> Generating case vignettes and examination questions for faculty review.</li>\n        </ul>\n        <p>Notice that most of these are <em>administrative and communicative</em> rather than diagnostic. That is where the risk-adjusted value currently sits.</p>"
      },
      {
        "h": "Retrieval-augmented generation: the safe clinical pattern",
        "html": "\n        <p>A general language model answers from its training data, which does not include your hospital's formulary, your national treatment protocols, or this year's guideline revision. <span class=\"term\">Retrieval-augmented generation (RAG)</span> corrects this:</p>\n        <ol class=\"body\">\n          <li>Your approved documents — protocols, formulary, national guidelines — are indexed.</li>\n          <li>A question first triggers a <strong>search</strong> of that indexed content.</li>\n          <li>The retrieved passages are given to the model with an instruction to answer only from them.</li>\n          <li>The answer is returned <strong>with citations</strong> to the source document and section.</li>\n        </ol>\n        <p>Three properties make this the appropriate architecture for clinical knowledge tools: answers reflect <em>your</em> approved practice rather than generic or foreign guidance; hallucination is substantially constrained; and every answer is checkable. When a vendor offers a clinical assistant, the first question is whether it is grounded in your documents and whether it cites them.</p>\n        <div class=\"callout note\"><h4>Deeper dive: production-grade retrieval is harder than it looks</h4><p style=\"margin:0\">BCG cautions that real-world retrieval systems are not off-the-shelf components. Clinical documents contain tables, dosing charts, algorithms and cross-references that naive text-chunking destroys — and a dosing table split across two chunks can produce a confidently wrong answer. Ask any vendor specifically how their system handles tables, figures and document structure, and test it against your own protocols before trusting it.</p></div>"
      },
      {
        "h": "Prompting for clinical and academic work",
        "html": "\n        <p>Output quality tracks instruction quality. A dependable structure:</p>\n        <ul class=\"body\">\n          <li><strong>Role</strong> — \"You are assisting a physician preparing a discharge summary.\"</li>\n          <li><strong>Task</strong> — \"Summarise this admission.\"</li>\n          <li><strong>Source</strong> — \"Use only the clinical notes provided below.\"</li>\n          <li><strong>Format</strong> — \"Structure as: presenting complaint, course, procedures, discharge medications, follow-up.\"</li>\n          <li><strong>Constraints</strong> — \"Do not infer any diagnosis, dose or finding not explicitly documented. Where information is missing, write MISSING rather than estimating.\"</li>\n        </ul>\n        <p>That last constraint is the clinical professional's habit and it deserves emphasis. Instructing the model to <strong>flag gaps rather than fill them</strong> converts its most dangerous tendency into a safety feature. A summary containing three \"MISSING\" markers is far safer than one that quietly invented three plausible values.</p>\n        <p>Two further techniques: ask for reasoning before conclusions on analytical tasks, and supply two or three examples when you need output matched to a house format.</p>"
      },
      {
        "h": "What must never be entered into a public AI tool",
        "html": "\n        <p>Text entered into a public consumer AI service may be stored and, depending on the provider and settings, used to improve future models. With health data this is a serious breach of confidentiality and, in most jurisdictions, of law.</p>\n        <p><strong>Never enter into a public tool:</strong></p>\n        <ul class=\"body\">\n          <li>Patient names, hospital numbers, national ID numbers, addresses or contact details</li>\n          <li>Dates of birth, admission or procedure combined with any other identifying detail</li>\n          <li>Clinical narratives containing identifiable information — including rare diagnoses that identify a person in a small community</li>\n          <li>Photographs, scans or documents containing patient identifiers or faces</li>\n          <li>Staff personal data, or unpublished institutional or research data</li>\n        </ul>\n        <p>Legitimate alternatives: an enterprise deployment with contractual guarantees that data is not retained for training; a private or on-premise deployment; or rigorous de-identification before use. Every institution should hold a written, circulated acceptable-use policy. If yours does not, that is a concrete and immediate action from this module.</p>\n        <div class=\"callout warn\"><h4>The realistic risk in most hospitals</h4><p style=\"margin:0\">The greatest exposure is not a sophisticated attack. It is a tired junior doctor at 2am pasting a patient's clinical summary into a free chatbot to help draft a discharge letter — with no intent to do harm and no idea a policy was breached. This is addressed by clear guidance and accessible approved alternatives, not by disciplinary action after the fact.</p></div>"
      },
      {
        "h": "Human review proportionate to risk",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Low risk — light review.</strong> Internal meeting notes, teaching material drafts, literature summaries for personal use.</li>\n          <li><strong>Medium risk — substantive review by a competent professional.</strong> Referral letters, patient information leaflets, translated instructions, coding suggestions.</li>\n          <li><strong>High risk — full verification against source, plus second review.</strong> Anything entering the medical record; anything stating a diagnosis, dose or contraindication; anything given directly to a patient.</li>\n          <li><strong>Not appropriate without specific institutional governance</strong> — autonomous clinical advice to patients without clinician review, or unreviewed AI-generated content entering the record.</li>\n        </ul>\n        <p>The accountability principle is unchanged and worth stating plainly to your teams: <strong>the professional who signs the note owns the note.</strong> \"The AI wrote it\" is not a defence to a patient, a coroner, or a regulator.</p>"
      },
      {
        "h": "Language, translation and equity",
        "html": "\n        <p>One application deserves particular attention in our context. Modern language models handle Nepali and other South Asian languages far better than earlier systems, which creates a genuine opportunity: discharge instructions, medication guidance and consent materials produced in the language the patient actually speaks.</p>\n        <p>The equity gain is real — comprehension drives adherence, and adherence drives outcomes. But two cautions apply. Translation quality is materially better for widely written languages than for those with less digital text, so performance across Nepal's languages will be uneven. And <strong>clinical translation must be verified by a competent speaker</strong> before it reaches a patient. A confidently mistranslated dosing instruction is a patient-safety event.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the MISSING rule",
      "text": "Add one line to every clinical prompt you write: <em>\"Where information is not explicitly present in the source, write MISSING — do not infer or estimate.\"</em> This single instruction converts the model's most dangerous habit into a visible safety signal, and it takes two seconds. Teach it to every junior member of your team as their first lesson in using these tools."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take one document your team produces repeatedly — a discharge summary, a referral letter, patient instructions. Write a complete prompt using Role, Task, Source, Format and Constraints, including the MISSING rule. Then define the review step: who verifies it, against what source, before it enters the record or reaches the patient. Finally, identify which approved tool your institution actually permits for this — and if none exists, that is your finding."
    },
    "takeaways": [
      "Language models fail fluently and confidently — hallucination is the core clinical safety problem",
      "Best current value is documentation, communication and administration, not diagnosis",
      "RAG grounds answers in your own approved protocols and provides citations — demand it and test it on tables",
      "Structure prompts with Role, Task, Source, Format and Constraints, and always include the MISSING rule",
      "Patient-identifiable information must never enter a public AI tool; provide an approved alternative",
      "Scale review to risk; the professional who signs the note owns the note",
      "Translation offers real equity gains but must be verified by a competent speaker"
    ],
    "quiz": [
      {
        "q": "Why is retrieval-augmented generation the preferred architecture for a clinical knowledge assistant?",
        "opts": [
          "It removes the need for clinician review",
          "It grounds answers in your own approved protocols and provides checkable citations",
          "It is cheaper to license",
          "It works without any documents"
        ],
        "a": 1,
        "fb": "RAG retrieves your authoritative content first, constraining hallucination and making every answer traceable to a source."
      },
      {
        "q": "Which prompt instruction most directly reduces the risk of fabricated clinical detail?",
        "opts": [
          "\"Sound confident.\"",
          "\"Be concise.\"",
          "\"Where information is not explicitly present in the source, write MISSING — do not infer.\"",
          "\"Answer quickly.\""
        ],
        "a": 2,
        "fb": "Instructing the model to flag gaps rather than fill them converts its most dangerous tendency into a visible safety signal."
      },
      {
        "q": "A junior doctor pastes a patient's clinical summary into a free public chatbot to draft a discharge letter. This is:",
        "opts": [
          "Acceptable if the patient is not named in the first line",
          "Efficient and acceptable practice",
          "Fine if the chat is deleted afterwards",
          "A breach of patient confidentiality and likely of data protection law"
        ],
        "a": 3,
        "fb": "Public tools may retain and train on submitted text. Identifiable clinical information must never be entered — and institutions must provide an approved alternative."
      },
      {
        "q": "Which task requires the HIGHEST level of verification?",
        "opts": [
          "AI-drafted content entering the medical record or stating a dose",
          "Generating a teaching case for faculty review",
          "Summarising a journal article for personal reading",
          "Drafting an internal team email"
        ],
        "a": 0,
        "fb": "Anything entering the record or specifying a diagnosis, dose or contraindication requires full verification against source plus second review."
      },
      {
        "q": "AI-generated translation of discharge instructions into a patient's language should be:",
        "opts": [
          "Used only for English speakers",
          "Verified by a competent speaker before it reaches the patient",
          "Avoided entirely",
          "Given directly to the patient to save time"
        ],
        "a": 1,
        "fb": "The equity benefit is real, but a confidently mistranslated dosing instruction is a patient-safety event. Verification is mandatory."
      }
    ]
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
    "sections": [
      {
        "h": "Why this module carries more weight in medicine",
        "html": "\n        <p>In most industries an AI failure is a financial or reputational event. In healthcare it can be a death. That single fact should shape how every professional in this programme evaluates these tools.</p>\n        <p>The World Economic Forum is direct about the tension: health is <em>\"inherently sensitive... leading to a highly risk-averse environment,\"</em> compounded by public scepticism toward AI. That caution is legitimate and protective. The purpose of this module is not to discourage adoption but to ensure adoption is <strong>safe, and survivable when something goes wrong</strong> — because eventually something will.</p>"
      },
      {
        "h": "1. Direct patient harm — the mechanisms",
        "html": "\n        <ul class=\"body\">\n          <li><strong>False negatives.</strong> Missed disease. A screening tool that fails to flag a malignancy, particularly where it has replaced rather than supplemented human review.</li>\n          <li><strong>False positives.</strong> Unnecessary investigation, invasive procedures, treatment toxicity, and genuine psychological harm. In screening programmes this is the dominant harm at scale.</li>\n          <li><strong>Hallucinated clinical content.</strong> A fabricated dose, interaction or guideline recommendation that reads authoritatively (Module 5).</li>\n          <li><strong>Alert fatigue.</strong> Excessive alerting causes clinicians to dismiss alerts reflexively — including the true ones. A system that over-alerts can reduce safety below the no-system baseline.</li>\n          <li><strong>Workflow harm.</strong> A tool that adds clicks, delays discharge or fragments attention can worsen care even when its predictions are accurate.</li>\n          <li><strong>Inappropriate autonomy.</strong> Deploying in autonomous mode a model validated only for assistive use.</li>\n        </ul>"
      },
      {
        "h": "2. Algorithmic bias — a safety issue, not a compliance issue",
        "html": "\n        <p>AI learns from historical clinical data, and historical clinical data reflects historical inequities in access, investigation and treatment. Three mechanisms recur:</p>\n        <ul class=\"body\">\n          <li><strong>Under-representation in training data.</strong> If a population was scarce in the training set, performance for that population is unproven and often worse — by skin tone, sex, age, body habitus, ethnicity or comorbidity.</li>\n          <li><strong>Proxy labels.</strong> As covered in Module 2, training on \"who received care\" rather than \"who needed care\" faithfully reproduces existing inequity while appearing accurate.</li>\n          <li><strong>Measurement bias.</strong> Where the underlying measurement performs differently across groups, any model built on it inherits that distortion.</li>\n        </ul>\n        <p>Three features make algorithmic bias more dangerous than individual clinician bias: it is <strong>invisible without deliberate testing</strong>, it is <strong>systematic</strong> — applied identically to every patient rather than varying by clinician — and it <strong>compounds</strong>, because under-served groups generate less data and so remain poorly modelled.</p>\n        <div class=\"callout warn\"><h4>The equity stake for developing countries</h4><p style=\"margin:0\">The UNDP background paper warns plainly that <em>\"it is challenging to take disruptive technology innovations from developed countries and replicate them to address the unique needs of the developing world.\"</em> A tool trained on populations unlike yours may not merely underperform — it may systematically underperform for your patients while carrying published accuracy figures that suggest otherwise. Local validation is not bureaucratic caution. It is the only way to know whether a tool is safe for the people in front of you.</p></div>"
      },
      {
        "h": "3. Dataset shift and silent failure",
        "html": "\n        <p>A model's performance is anchored to the conditions under which it was trained. Those conditions move:</p>\n        <ul class=\"body\">\n          <li>Disease prevalence changes — seasonally, epidemiologically, after a new vaccination programme</li>\n          <li>Equipment is replaced or protocols are updated</li>\n          <li>Referral patterns change, altering the case mix reaching the model</li>\n          <li>Coding or documentation practices change, shifting the meaning of input variables</li>\n        </ul>\n        <p>The defining danger is that <strong>degradation is silent</strong>. There is no error message. A model quietly becomes less accurate while continuing to produce confident outputs in a familiar format. Only active monitoring detects it — which is why continuous performance surveillance is a clinical-governance obligation rather than an IT task.</p>"
      },
      {
        "h": "4. Automation bias and deskilling",
        "html": "\n        <p>Covered in Module 3 as a diagnostic risk; here we consider it as an institutional one.</p>\n        <ul class=\"body\">\n          <li><strong>Automation bias.</strong> Deferring to the machine against one's own judgement. The UNDP paper explicitly warns that if AI substituted for clinical due diligence, <em>\"clinicians might engage in 'automation bias' and not consider whether an AI technology meets their needs or those of the patient.\"</em></li>\n          <li><strong>Deskilling.</strong> The longer-term concern. If trainees never interpret films unaided because software always offers a preliminary read, the profession's independent capability erodes — and with it, the ability to detect when the software is wrong.</li>\n          <li><strong>Loss of the clinical signal.</strong> The uneasy feeling about a patient who \"looks unwell\" is real information a model cannot access. Systems must preserve a route for it to override an algorithmic reassurance.</li>\n          <li><strong>Accountability diffusion.</strong> When a decision emerges partly from an algorithm, responsibility becomes easy to disclaim. No regulator or coroner accepts this.</li>\n        </ul>"
      },
      {
        "h": "5. Privacy, confidentiality and cybersecurity",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Shadow AI.</strong> Staff using unapproved public tools with identifiable patient data — in practice the most common and least detected breach in hospitals today.</li>\n          <li><strong>Re-identification.</strong> De-identified datasets can often be re-linked, particularly with rare conditions, precise dates or imaging.</li>\n          <li><strong>Cross-border data flows.</strong> Patient data leaving the country to an overseas cloud provider, frequently without adequate contractual protection or institutional awareness.</li>\n          <li><strong>Ransomware and system dependency.</strong> As clinical workflow becomes dependent on AI systems, their unavailability becomes a patient-safety issue. Every deployment needs a documented downtime procedure.</li>\n          <li><strong>Prompt injection.</strong> Hostile instructions concealed in a document an AI assistant processes, causing it to ignore safeguards or disclose information — an emerging and under-appreciated risk for any assistant that reads external content.</li>\n        </ul>"
      },
      {
        "h": "6. Vendor, sustainability and dependency risk",
        "html": "\n        <p>Most institutions will buy rather than build. That transfers execution but not accountability.</p>\n        <ul class=\"body\">\n          <li><strong>Opacity.</strong> Vendors may decline to disclose training data or model behaviour as proprietary, leaving you unable to assess suitability for your population.</li>\n          <li><strong>The pilot graveyard.</strong> Donor-funded or vendor-subsidised pilots that end when funding ends, leaving staff trained on a tool they no longer have — and more cynical about the next one.</li>\n          <li><strong>Lock-in and cost escalation.</strong> Deep integration makes exit expensive and weakens your negotiating position at renewal.</li>\n          <li><strong>Licensing and access.</strong> The UNDP paper raises the concern that in developing-country settings AI use <em>\"may be contingent upon restrictive contractual licensing terms that further limit its diffusion and use.\"</em></li>\n          <li><strong>Model withdrawal.</strong> A vendor may discontinue or materially change a model you have built a clinical pathway around.</li>\n        </ul>"
      },
      {
        "h": "7. Widening the digital divide",
        "html": "\n        <p>A risk specific to our context and easy to overlook. AI could reduce inequity by extending scarce expertise — or entrench it, if benefits accrue only where connectivity, electricity, devices and digital literacy already exist.</p>\n        <p>The pattern to guard against: an urban tertiary hospital acquires sophisticated AI while rural facilities lack basic diagnostics, and the outcome gap widens. The WEF's vision explicitly includes <em>\"leapfrogging by low- or middle-income countries\"</em> — but leapfrogging is a possibility, not a promise. It requires deliberate design choices about where tools are deployed and who they are built to serve.</p>"
      },
      {
        "h": "8. Regulatory, legal and professional exposure",
        "html": "\n        <p>Realistic consequences of an AI-related clinical failure include patient harm and complaint, professional regulatory investigation of the clinician who signed the decision, institutional liability, and — where AI use was not disclosed — a serious breach of trust with patients and the public.</p>\n        <p>An honest legal reality: liability frameworks for clinical AI remain unsettled in most jurisdictions. In practice this means <strong>the clinician and the institution carry the risk</strong> while the vendor's exposure is limited by contract. Read the indemnity clauses before deployment, not afterwards.</p>\n        <div class=\"callout warn\"><h4>The governing principle</h4><p style=\"margin:0\">You may delegate a task to an algorithm. You cannot delegate responsibility for the patient. Before any deployment, test it against one question: <strong>if this system contributes to a patient being harmed, can we explain what it did, why we believed it was safe here, what we monitored, and what a clinician was expected to check?</strong> If you cannot answer all four, it is not ready.</p></div>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the pre-mortem",
      "text": "Before approving any clinical AI deployment, hold a fifteen-minute pre-mortem with clinical, nursing, IT and governance colleagues: <em>\"It is one year from now. This system contributed to a serious patient safety incident. What happened?\"</em> Teams surface risks in this exercise that no checklist elicits — because it gives permission to voice doubts that formal approval processes discourage. Record the answers and address the top three before going live."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take one AI tool your institution uses or is considering. Score it 1–5 on each of the eight risk categories in this module. For your three highest scores, write the specific control that would reduce them — who checks what, how often, and what triggers withdrawal of the tool. Bring this to your clinical governance or quality committee. You have produced a defensible first-pass clinical AI risk assessment."
    },
    "takeaways": [
      "In healthcare, AI failure can mean patient harm — false negatives, false positives, alert fatigue and workflow harm are all real mechanisms",
      "Algorithmic bias is invisible without testing, systematic in effect, and self-reinforcing over time",
      "Tools trained on unlike populations may systematically underperform for your patients despite impressive published figures",
      "Dataset shift causes silent degradation — only active monitoring detects it",
      "Automation bias and deskilling erode the profession's ability to detect when the machine is wrong",
      "Shadow AI is the most common real-world confidentiality breach in hospitals",
      "Liability frameworks remain unsettled; in practice clinicians and institutions carry the risk",
      "AI can narrow or widen the digital divide depending on deliberate deployment choices"
    ],
    "quiz": [
      {
        "q": "A screening model's performance declines gradually over two years as local disease prevalence and imaging equipment change. This is:",
        "opts": [
          "A cybersecurity incident",
          "Normal and requires no action",
          "Dataset shift — silent degradation requiring active monitoring to detect",
          "A software bug"
        ],
        "a": 2,
        "fb": "Dataset shift produces no error message. Continuous performance monitoring is a clinical governance obligation, not an IT nicety."
      },
      {
        "q": "Why is algorithmic bias more dangerous than an individual clinician's bias?",
        "opts": [
          "It is not — they are equivalent",
          "It only affects rare diseases",
          "Algorithms are always more prejudiced",
          "It is invisible without testing, applied systematically to every patient, and compounds over time"
        ],
        "a": 3,
        "fb": "Scale, invisibility and the self-reinforcing data loop distinguish algorithmic bias from individual bias."
      },
      {
        "q": "A system generates a very high volume of alerts, most of which are not clinically significant. The principal danger is:",
        "opts": [
          "Alert fatigue — clinicians dismiss alerts reflexively, including true ones, potentially reducing safety below baseline",
          "Slower software performance",
          "Higher licensing costs",
          "Increased electricity consumption"
        ],
        "a": 0,
        "fb": "Over-alerting can make a system net-harmful. Alert burden must be measured and managed as a safety parameter."
      },
      {
        "q": "'Deskilling' in the context of clinical AI refers to:",
        "opts": [
          "Staff forgetting to use the software",
          "Erosion of independent professional capability, reducing the ability to detect when the AI is wrong",
          "Reduced typing speed",
          "Loss of administrative staff"
        ],
        "a": 1,
        "fb": "If trainees never practise unaided interpretation, the profession loses the expertise needed to catch algorithmic errors."
      },
      {
        "q": "Under current liability frameworks in most jurisdictions, when AI contributes to a clinical error:",
        "opts": [
          "The regulator assumes liability",
          "No one is responsible",
          "The clinician and institution generally carry the risk while vendor exposure is limited by contract",
          "The vendor automatically assumes legal responsibility"
        ],
        "a": 2,
        "fb": "Liability for clinical AI is unsettled, but in practice responsibility rests with the professional and institution. Read indemnity clauses before deployment."
      },
      {
        "q": "The most common real-world confidentiality breach involving AI in hospitals today is:",
        "opts": [
          "Stolen server hardware",
          "Sophisticated external cyberattacks",
          "Fax machine misdirection",
          "Staff entering identifiable patient information into unapproved public AI tools"
        ],
        "a": 3,
        "fb": "Shadow AI is widespread, usually well-intentioned, and best addressed with clear policy plus an accessible approved alternative."
      }
    ]
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
    "sections": [
      {
        "h": "The gap that defines the opportunity",
        "html": "\n        <p>The case for AI in developing-country health systems begins with arithmetic. Citing WHO data, the UNDP background paper reports that:</p>\n        <ul class=\"body\">\n          <li><strong>More than 40% of all countries have fewer than 10 medical doctors per 10,000 people.</strong></li>\n          <li><strong>Over 55% have fewer than 40 nursing and midwifery personnel per 10,000 people.</strong></li>\n          <li><strong>Only a third to a half of the global population could obtain essential health services</strong> as of 2017.</li>\n        </ul>\n        <p>Looking forward, BCG cites an estimated global shortfall of approximately <strong>10 million health workers by 2030</strong>. This shortage cannot be trained away within the timeframe in which the need exists.</p>\n        <p>That is the honest premise of this module. AI is not attractive here because it is modern. It is attractive because <strong>the expertise required does not exist in sufficient quantity and will not for decades</strong> — and tools that extend the reach of the expertise that does exist may be the only realistic path to broadened access.</p>"
      },
      {
        "h": "What leapfrogging actually means",
        "html": "\n        <p>The World Economic Forum explicitly includes <em>\"leapfrogging by low- or middle-income countries\"</em> among the outcomes AI could enable, noting that in LMICs the focus will be on <em>\"establishing foundational technology and expanding access to quality care in order to address ongoing challenges such as high disease burden and weak health information systems.\"</em></p>\n        <p>The mobile-phone analogy is instructive but frequently misused. Nepal did not build a national copper telephone network and then replace it — it moved directly to mobile. The analogous health opportunity is to avoid replicating a decade of fragmented, non-interoperable hospital IT and move directly to shared, standards-based digital infrastructure.</p>\n        <p><strong>But leapfrogging has preconditions.</strong> Mobile telephony leapfrogged because handsets became cheap, networks were commercially viable, and no literacy or institutional change was required to make a call. Clinical AI requires data, connectivity, electricity, trained staff, governance and a referral pathway. Where those are absent, there is nothing to leap from. Leapfrogging is a possibility to be engineered, not a phenomenon to be awaited.</p>"
      },
      {
        "h": "The RISE framework — a practical guide for LMIC adoption",
        "html": "\n        <p>The Global Initiative on AI for Health (GI-AI4H) — led by the <strong>World Health Organization</strong> with the <strong>International Telecommunication Union</strong> and the <strong>World Intellectual Property Organization</strong> — proposes the <span class=\"term\">RISE framework</span> as a pragmatic approach for responsible AI across diverse health systems. It is the most directly applicable framework in this programme for a country in Nepal's position.</p>\n        <ul class=\"body\">\n          <li><strong>R — Robust Capacity Building.</strong> Empower local professionals through training and knowledge sharing: specialised training on AI development, evaluation and ethics for healthcare professionals; open knowledge repositories; mentorship pairing LMIC and global experts; and research partnerships that build in-country expertise.</li>\n          <li><strong>I — Inclusive Research Agenda.</strong> Ensure research addresses local priorities. Countries including South Africa and Mozambique stressed <strong>localisation over one-size-fits-all approaches</strong>, calling for a research agenda driven by LMIC needs and aligned with cultural context and health priorities.</li>\n          <li><strong>S — Smart and Accessible Infrastructure.</strong> Build affordable, interoperable systems suited to resource-constrained environments — shared repositories, open standards for quality and benchmarking, and context-appropriate system design.</li>\n          <li><strong>E — Equitable and Secure Data Practices.</strong> Fair, safe, transparent data collection so models are accurate for diverse populations — including algorithm audits, bias checks, inclusive data governance committees, and policies enabling model training on under-resourced populations.</li>\n        </ul>\n        <p>The authors stress that these components are <strong>modular and mutually reinforcing rather than sequential</strong> — countries prioritise and phase them according to existing capacity, regulatory maturity and health system needs. The underlying initiative rests on three pillars: <strong>ENABLE</strong> (governance standards and technical guidance), <strong>FACILITATE</strong> (global community and pooled resources) and <strong>IMPLEMENT</strong> (sustainable country-level models).</p>"
      },
      {
        "h": "Priority opportunities for Nepal",
        "html": "\n        <p>Drawing together the evidence from Module 4 and the constraints described above, the applications with the strongest case in Nepal and comparable systems are:</p>\n        <ol class=\"body\">\n          <li><strong>Tuberculosis radiograph triage.</strong> High disease burden, radiography already available at district level, and the binding constraint is interpretation capacity rather than equipment.</li>\n          <li><strong>Diabetic retinopathy screening.</strong> Rising diabetes prevalence, severe ophthalmologist scarcity, well-validated technology, and a treatable outcome — provided the treatment pathway exists.</li>\n          <li><strong>Decision support for frontline and community health workers.</strong> Extending safe practice further down the workforce pyramid is arguably the highest-leverage application in a country where community health volunteers are the first and often only point of contact.</li>\n          <li><strong>Triage and referral support.</strong> Where travel to care is costly and difficult, improving the decision about <em>whether and where</em> to travel has direct clinical and economic value.</li>\n          <li><strong>Nepali-language patient communication.</strong> Instructions, consent and health information in the language the patient actually speaks — a genuine equity gain.</li>\n          <li><strong>Public health surveillance.</strong> Operating on data that already exists in routine reporting, with no new devices required at the point of care.</li>\n          <li><strong>Administrative and operational efficiency.</strong> Scheduling, records, supply chain — lower risk, faster measurable return, and it builds the data discipline everything else depends on.</li>\n        </ol>"
      },
      {
        "h": "Why health technology projects fail here — the recurring patterns",
        "html": "\n        <ul class=\"body\">\n          <li><strong>The pilot that never scales.</strong> Donor-funded, externally staffed, ends with the grant. The UNDP paper is clear that adoption <em>\"should strengthen local health systems and be owned and driven by the needs and priorities of developing country governments and stakeholders.\"</em> Ownership is the variable that predicts survival.</li>\n          <li><strong>The imported solution.</strong> Built for a different population, disease profile, equipment standard and workflow — and never revalidated locally.</li>\n          <li><strong>Infrastructure assumptions.</strong> Reliable electricity, connectivity and device availability assumed rather than verified. A tool requiring continuous cloud connectivity is unusable in facilities where it matters most.</li>\n          <li><strong>The missing pathway.</strong> Detection deployed without treatment capacity.</li>\n          <li><strong>The data foundation that was never built.</strong> Models proposed on data that does not exist, is not linked, or is not reliable.</li>\n          <li><strong>Workforce readiness overlooked.</strong> Tools introduced without the training, time or authority for staff to use them well — or to override them.</li>\n        </ul>\n        <div class=\"callout note\"><h4>The design principle that follows</h4><p style=\"margin:0\">Prefer tools that <strong>degrade gracefully</strong>: work offline or with intermittent connectivity, run on modest hardware, tolerate imperfect data, and fail visibly rather than silently. In a well-resourced hospital these are conveniences. In a district facility they determine whether the tool is used at all. Ask every vendor directly: <em>\"What happens when the internet is down for six hours?\"</em></p></div>"
      },
      {
        "h": "Building local capability, not dependency",
        "html": "\n        <p>The strategic question for any developing country is whether AI adoption builds domestic capability or deepens dependence on external providers. The RISE framework's emphasis on capacity building and in-country expertise is a direct answer.</p>\n        <p>Practical implications for institutions and individuals:</p>\n        <ul class=\"body\">\n          <li><strong>Insist on knowledge transfer</strong> in every vendor contract — documented, with named local staff trained and able to maintain the system.</li>\n          <li><strong>Retain your data and the right to use it.</strong> A contract permitting a vendor to train on your patients' data while restricting your own access is a bad bargain, however low the licence fee.</li>\n          <li><strong>Invest in local validation capability.</strong> The ability to independently evaluate a model on your own population is the single most valuable institutional capability in this field.</li>\n          <li><strong>Support local research and datasets</strong> that represent your population — no one else will build them for you.</li>\n          <li><strong>Develop the professionals.</strong> This programme is a starting point; sustained capability requires structured, continuing development.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the six-hour question",
      "text": "When any vendor presents to your institution, ask one question early: <em>\"What happens to this system when the internet is down for six hours, or the power fails?\"</em> The answer tells you immediately whether the product was designed for a setting like yours or for a well-connected teaching hospital elsewhere. It is also the fastest way to identify which vendors have genuinely worked in comparable environments."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Apply the RISE framework to your own institution. Under each of the four components — Robust capacity building, Inclusive research, Smart infrastructure, Equitable data — write one honest sentence on where you stand today and one specific action that would strengthen it within twelve months. Be candid: this is a self-assessment, not a funding application. The gaps you identify are the real starting point for your AI strategy."
    },
    "takeaways": [
      "Over 40% of countries have fewer than 10 doctors per 10,000 people; a global shortfall of ~10 million health workers is projected by 2030",
      "AI matters here because expertise is scarce and cannot be trained fast enough — not because it is modern",
      "Leapfrogging is possible but has preconditions: data, connectivity, power, skills, governance and pathways",
      "The WHO-ITU-WIPO RISE framework — capacity, inclusive research, smart infrastructure, equitable data — is the most applicable model",
      "Priority applications: TB triage, retinopathy screening, frontline worker decision support, referral triage, Nepali-language communication, surveillance",
      "Projects fail through unowned pilots, imported solutions, infrastructure assumptions and missing pathways",
      "Prefer tools that degrade gracefully; insist on knowledge transfer and data rights to build capability rather than dependency"
    ],
    "quiz": [
      {
        "q": "According to WHO data cited in the UNDP paper, more than 40% of all countries have:",
        "opts": [
          "Fewer than 10 medical doctors per 10,000 people",
          "Universal health coverage",
          "National AI strategies",
          "Complete electronic health records"
        ],
        "a": 0,
        "fb": "This workforce scarcity — alongside fewer than 40 nurses/midwives per 10,000 in over 55% of countries — is the core premise for AI in these settings."
      },
      {
        "q": "The 'S' in the WHO-ITU RISE framework stands for:",
        "opts": [
          "Secure servers only",
          "Smart and Accessible Infrastructure",
          "Statistical significance",
          "Standardised software"
        ],
        "a": 1,
        "fb": "RISE = Robust capacity building, Inclusive research agenda, Smart and accessible infrastructure, Equitable and secure data practices."
      },
      {
        "q": "Countries such as South Africa and Mozambique emphasised which principle in WHO-ITU consultations?",
        "opts": [
          "Avoiding AI entirely",
          "Adopting global solutions unchanged",
          "Localisation over one-size-fits-all approaches, driven by local needs and context",
          "Prioritising cost above all"
        ],
        "a": 2,
        "fb": "An inclusive research agenda driven by LMIC priorities and aligned with local cultural and health contexts was a consistent theme."
      },
      {
        "q": "Which design property matters most for a tool intended for district-level facilities?",
        "opts": [
          "The most advanced model architecture",
          "Integration with luxury hardware",
          "The largest possible parameter count",
          "Graceful degradation — working offline, on modest hardware, failing visibly"
        ],
        "a": 3,
        "fb": "In well-resourced hospitals these are conveniences; in district facilities they determine whether the tool can be used at all."
      },
      {
        "q": "The UNDP paper argues that AI adoption in developing countries should be:",
        "opts": [
          "Owned and driven by the needs and priorities of local governments and stakeholders",
          "Limited to private hospitals",
          "Driven by international vendors",
          "Postponed until infrastructure is perfect"
        ],
        "a": 0,
        "fb": "Local ownership is the variable that most reliably predicts whether a health technology project survives beyond its pilot funding."
      },
      {
        "q": "A vendor contract allows the supplier to train models on your patients' data but restricts your own access to it. This is:",
        "opts": [
          "Required by international law",
          "A bad bargain that builds dependency rather than local capability",
          "Standard and acceptable",
          "Beneficial to the institution"
        ],
        "a": 1,
        "fb": "Retaining data rights and insisting on knowledge transfer are how institutions build capability instead of deepening dependence."
      }
    ]
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
    "sections": [
      {
        "h": "The ethical foundation",
        "html": "\n        <p>Clinical AI raises no genuinely new ethical principles. It applies familiar ones under unfamiliar conditions:</p>\n        <ul class=\"body\">\n          <li><strong>Beneficence and non-maleficence.</strong> Does this tool improve outcomes, and what harms does it introduce? Both must be measured, not assumed.</li>\n          <li><strong>Autonomy.</strong> Does the patient understand that AI is involved, and can they decline?</li>\n          <li><strong>Justice.</strong> Does it narrow or widen inequity? Who benefits, and who is left out?</li>\n          <li><strong>Confidentiality.</strong> Health information carries the strongest duty of protection in professional practice.</li>\n          <li><strong>Accountability.</strong> A named professional remains answerable for every clinical decision.</li>\n        </ul>\n        <p>The WHO has articulated ethical principles for AI in health emphasising protecting autonomy, promoting human well-being and safety, ensuring transparency and explainability, fostering responsibility and accountability, ensuring inclusiveness and equity, and promoting responsive and sustainable AI. These map directly onto the principles above.</p>"
      },
      {
        "h": "How AI in medicine is regulated",
        "html": "\n        <p>Most clinical AI falls under medical device regulation as <span class=\"term\">Software as a Medical Device (SaMD)</span>. Key international reference points:</p>\n        <ul class=\"body\">\n          <li><strong>Risk-based classification.</strong> Regulatory burden scales with potential harm. A tool that informs a clinician is treated differently from one that drives treatment directly.</li>\n          <li><strong>EU AI Act.</strong> Establishes a risk-tiered approach, with many healthcare applications falling into higher-risk categories carrying heightened obligations.</li>\n          <li><strong>US FDA.</strong> Clears AI-enabled devices, predominantly in imaging — the WEF notes more than 70% of approvals are imaging-related.</li>\n          <li><strong>Post-market surveillance.</strong> Increasingly central, because models change and populations drift. The WEF calls for moving <em>\"from waiting for guidelines to proactively building trust\"</em> through improved post-market surveillance and AI ethics committees.</li>\n        </ul>\n        <p>The npj Health Systems paper notes the diversity of approaches globally — from HIPAA in the United States to Saudi Arabia's PDPL, India's DPDP Act, Zambia's National AI Strategy and Malawi's Data Protection Act — concluding that what is needed are <strong>\"globally coordinated yet locally adaptable governance frameworks.\"</strong></p>\n        <div class=\"callout note\"><h4>The Nepal position — verify before you rely</h4><p style=\"margin:0\">Nepal's framework for AI-enabled medical software continues to develop, alongside the Privacy Act (2075), national digital health initiatives, and the oversight roles of the Department of Drug Administration and the Nepal Health Research Council for research involving human subjects and health data. Regulatory expectations in this area are evolving quickly. <strong>Always confirm current requirements with your institution's ethics committee, the relevant national authority, and qualified legal advice before deploying any clinical AI or sharing patient data.</strong> This programme teaches the framework and reasoning; it does not substitute for the current regulatory instrument.</p></div>"
      },
      {
        "h": "The regulatory gap in developing countries",
        "html": "\n        <p>The UNDP paper observes that regulation of AI in healthcare <em>\"is still in its infancy,\"</em> with many countries issuing plans, guidelines or codes highlighting ethical principles <em>\"without passing much substantive law.\"</em> The npj paper similarly warns that rapid adoption <em>\"can heighten risks and widen existing inequalities due to the lack of standardized governance and the regulatory lag in many countries.\"</em></p>\n        <p>This creates a practical dilemma. Waiting for complete regulation means forgoing benefit; proceeding without it means bearing risk. The workable middle path is <strong>institutional governance that anticipates regulation</strong> — adopting recognised international standards voluntarily, documenting decisions as though they will be scrutinised, and building the evidence a future regulator would require. Institutions that do this are not slowed down; they are the ones able to move when rules arrive.</p>"
      },
      {
        "h": "A clinical AI governance structure",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Board or executive.</strong> Approves AI strategy and risk appetite; receives regular reporting on deployed systems, performance and incidents; retains ultimate accountability.</li>\n          <li><strong>Clinical AI committee.</strong> Multidisciplinary — clinicians, nursing, pharmacy, IT, information governance, ethics, quality and patient representation. Approves clinical deployments and reviews performance.</li>\n          <li><strong>Clinical owner.</strong> A named senior clinician accountable for each deployed tool: appropriate use, monitoring, and patient outcomes.</li>\n          <li><strong>Independent validation.</strong> Assessment by people who did not procure or build the system. Independence is the point.</li>\n          <li><strong>Information governance.</strong> Data flows, consent, contracts, cross-border transfer.</li>\n          <li><strong>An AI register.</strong> A single inventory of every AI system in clinical or administrative use — including features embedded in software you already own. Institutions consistently discover more than expected, and this is the practical first governance artefact.</li>\n        </ul>"
      },
      {
        "h": "Consent, transparency and telling patients",
        "html": "\n        <p>Three distinct questions, often conflated:</p>\n        <ol class=\"body\">\n          <li><strong>Consent to care involving AI.</strong> Where AI materially influences a clinical decision, patients should be able to know and to decline. Practice varies for background tools, but the direction of travel is toward disclosure.</li>\n          <li><strong>Consent for data use.</strong> Using patient data to develop or improve models is a separate purpose requiring its own basis — clinical consent does not cover it.</li>\n          <li><strong>Transparency about AI-generated communication.</strong> If material given to a patient was AI-drafted, honesty is the safe position.</li>\n        </ol>\n        <p>A practical standard: <strong>would this patient be surprised, or feel deceived, if they later learned how AI was used in their care?</strong> If yes, disclose in advance. Trust, once lost across a community, is extraordinarily expensive to rebuild — and in health systems that depend on community confidence, that cost is measured in people who stop attending.</p>"
      },
      {
        "h": "Validation, monitoring and incidents",
        "html": "\n        <ol class=\"body\">\n          <li><strong>Pre-deployment validation.</strong> Assess performance on <em>your</em> population before go-live wherever feasible. Where a full local study is impossible, run a silent period — the model runs without influencing decisions while its outputs are compared against clinical outcomes.</li>\n          <li><strong>Define the operating threshold clinically.</strong> Sensitivity–specificity trade-offs must be set by clinicians who understand the consequences of each error, not accepted as vendor defaults.</li>\n          <li><strong>Monitor continuously.</strong> Performance, alert volume, override rates, subgroup performance and complaints — with pre-agreed escalation triggers.</li>\n          <li><strong>Report incidents.</strong> AI-related safety events must enter the same incident system as any other clinical incident, and be reviewable.</li>\n          <li><strong>Define withdrawal criteria in advance.</strong> Agree before deployment what performance would cause you to switch the system off — and who has authority to do it, without needing a committee meeting.</li>\n        </ol>"
      },
      {
        "h": "Research, publication and the evidence base",
        "html": "\n        <p>If your institution evaluates a tool, that evaluation is research and requires ethics approval. Two obligations follow.</p>\n        <p>First, use recognised reporting standards — CONSORT-AI, SPIRIT-AI and STARD-AI exist precisely to make AI studies comparable and honest.</p>\n        <p>Second, and importantly for global equity: <strong>publish, including negative results.</strong> The evidence base for clinical AI in South Asian and African populations is thin, and it is thin partly because evaluations conducted in these settings are rarely written up. A well-conducted local validation showing that a tool does <em>not</em> transfer is a genuine contribution to global knowledge — and protects other institutions from repeating an expensive mistake.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: start the register today",
      "text": "Before writing any AI strategy, compile a list of every system in your institution using AI or machine learning — including features already embedded in software you licence, such as imaging post-processing, transcription or triage modules. This takes a fortnight and consistently reveals tools operating in clinical use that were never assessed, approved or monitored. That register is the single most valuable governance document a hospital produces in its first year of AI oversight."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Draft a one-page clinical AI governance note for your institution covering: who approves clinical AI deployments; who the named clinical owner would be; what pre-deployment validation you would require; what you would monitor monthly; what triggers withdrawal and who can authorise it; and how AI involvement would be disclosed to patients. If your institution has none of this, your note is the first draft of its policy."
    },
    "takeaways": [
      "Clinical AI raises familiar ethical principles under unfamiliar conditions — beneficence, autonomy, justice, confidentiality, accountability",
      "Most clinical AI is regulated as Software as a Medical Device on a risk-based basis; post-market surveillance is increasingly central",
      "Regulation lags in many countries — institutional governance that anticipates regulation is the workable path",
      "An AI register is the practical first governance artefact and usually reveals unassessed systems",
      "Consent to care involving AI and consent for data use are separate; disclose if a patient would feel deceived to learn later",
      "Validate locally or run a silent period; set thresholds clinically; monitor subgroups; define withdrawal criteria in advance",
      "Publish local evaluations including negative results — the evidence base for our populations depends on it"
    ],
    "quiz": [
      {
        "q": "Most clinical AI tools are regulated internationally as:",
        "opts": [
          "Consumer electronics",
          "Unregulated software",
          "Software as a Medical Device, on a risk-based classification",
          "Pharmaceuticals"
        ],
        "a": 2,
        "fb": "SaMD frameworks scale regulatory requirements to potential harm, and increasingly emphasise post-market surveillance."
      },
      {
        "q": "Your institution wants to deploy a model but cannot conduct a full local validation study. The best alternative is:",
        "opts": [
          "Deploy immediately and monitor complaints",
          "Rely solely on the vendor's published figures",
          "Abandon the project permanently",
          "Run a silent period where the model operates without influencing decisions while outputs are compared to outcomes"
        ],
        "a": 3,
        "fb": "A silent period generates local performance evidence without exposing patients to an unvalidated tool."
      },
      {
        "q": "Consent for clinical care involving AI and consent for using patient data to train models are:",
        "opts": [
          "Separate purposes each requiring their own basis",
          "Both unnecessary",
          "Only relevant in Europe",
          "The same thing"
        ],
        "a": 0,
        "fb": "Clinical consent does not extend to model development. Data use for AI is a distinct purpose requiring its own lawful basis."
      },
      {
        "q": "Why does the npj Health Systems paper argue governance frameworks must be 'globally coordinated yet locally adaptable'?",
        "opts": [
          "To simplify vendor marketing",
          "Because approaches differ across jurisdictions while risks are shared, and local health system contexts vary",
          "To slow down adoption",
          "Because global rules are impossible"
        ],
        "a": 1,
        "fb": "Frameworks such as HIPAA, PDPL, India's DPDP Act and others reflect different legal traditions, but the underlying risks require coordination."
      },
      {
        "q": "Publishing a local validation showing a tool does NOT transfer to your population is:",
        "opts": [
          "Prohibited by vendor contracts",
          "Only worthwhile if results are positive",
          "A genuine contribution that strengthens the evidence base and protects other institutions",
          "Embarrassing and best avoided"
        ],
        "a": 2,
        "fb": "Negative results are scarce and valuable — especially for South Asian and African populations where the evidence base is thin."
      },
      {
        "q": "Withdrawal criteria for a deployed clinical AI tool should be:",
        "opts": [
          "Set by the vendor",
          "Never defined",
          "Decided after problems emerge",
          "Agreed in advance, with named authority to act without waiting for a committee"
        ],
        "a": 3,
        "fb": "Deciding in advance what performance would cause you to switch a system off — and who can do it immediately — is basic clinical safety governance."
      }
    ]
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
    "sections": [
      {
        "h": "Why initiatives stall",
        "html": "\n        <p>BCG's analysis of generative AI in healthcare finds that only around <strong>24% of companies across industries have extracted meaningful value</strong>, with healthcare providers at roughly 29% and medtech far behind at 10%. The reasons given are consistent: fragmented initiatives that never reach core processes, no clear link between activity and measurable impact, and low user adoption.</p>\n        <p>Their prescription is equally consistent. Leading organisations <strong>dedicate over 80% of AI investment to reshaping core functions</strong> rather than running scattered experiments; they tie AI explicitly to measurable outcomes; and they invest in structured change management, which BCG reports can raise adoption rates <strong>from 30% to 60%</strong>.</p>"
      },
      {
        "h": "The 10-20-70 rule",
        "html": "\n        <p>BCG's guidance for healthcare AI in 2026 states the rule plainly: successful innovators dedicate <strong>10% of effort to algorithms, 20% to technology and data, and 70% to people and processes.</strong></p>\n        <p>This should reorder how you plan. If your implementation plan is mostly about the model and the integration, with training and workflow redesign as a final line item, it is inverted — and it will likely join the 70% of healthcare AI projects that never reach sustained use.</p>\n        <p>In clinical settings the \"70%\" means specific things: redesigning the workflow so the tool sits where the decision is made; training staff not only to use it but to challenge it; agreeing who acts on outputs; protecting time for the change; and identifying credible clinical champions. None of this is technology work, and all of it determines success.</p>"
      },
      {
        "h": "Building a business case that survives scrutiny",
        "html": "\n        <p>Six elements, and clinical proposals commonly omit two of them:</p>\n        <ol class=\"body\">\n          <li><strong>The problem in operational terms.</strong> \"Chest radiographs wait an average of nine days for reporting, and 12% of TB diagnoses are delayed beyond four weeks.\"</li>\n          <li><strong>The measured baseline.</strong> Current performance, quantified <em>before</em> anything changes. This is the element most often skipped, and its absence makes success unprovable.</li>\n          <li><strong>The intervention.</strong> Precisely what the system does, in which mode (assistive, triage, autonomous), and where the human decision sits.</li>\n          <li><strong>The expected benefit.</strong> Conservative, ranged, and expressed in clinical terms — time to treatment, cases detected, avoided travel — not only cost.</li>\n          <li><strong>The full lifetime cost.</strong> Licence, integration, hardware, connectivity, training, validation, monitoring, and clinician time. Licence fees are usually a minority of the total.</li>\n          <li><strong>Risk and governance.</strong> Drawn from Modules 6 and 8, with named owner, monitoring plan and withdrawal criteria.</li>\n        </ol>\n        <div class=\"callout note\"><h4>The efficiency trap</h4><p style=\"margin:0\">Be careful with business cases built on saving clinician minutes. Ten minutes saved per clinician per day is real for the individual, but it does not become an institutional saving unless the freed time is deliberately redirected to a defined activity — more patients seen, a clinic reopened, backlog cleared. State explicitly what the saved time will be used for, or the benefit will never materialise on paper.</p></div>"
      },
      {
        "h": "Vendor due diligence for clinical software",
        "html": "\n        <p>Ask these before signing:</p>\n        <ul class=\"body\">\n          <li>What population was the model trained on — geography, demographics, equipment, disease prevalence?</li>\n          <li>What external, prospective validation exists, and can we see the failure cases?</li>\n          <li>What performance do you commit to in a population like ours, and what happens if it is not met?</li>\n          <li>Can we conduct our own independent validation before and after deployment?</li>\n          <li>Where is patient data processed and stored, and does it leave the country?</li>\n          <li>Will our patients' data be used to train models for other customers?</li>\n          <li>What monitoring, drift detection and alerting are included?</li>\n          <li>What happens when connectivity or power fails?</li>\n          <li>What are the exit terms — can we retrieve our data in a usable form?</li>\n          <li>What indemnity applies if the model contributes to patient harm?</li>\n          <li>What knowledge transfer and local training are included?</li>\n        </ul>\n        <p>A vendor unwilling to answer the validation, data-rights and indemnity questions in writing is not suitable for clinical deployment, whatever the demonstration showed.</p>"
      },
      {
        "h": "Designing a pilot that gives you a real answer",
        "html": "\n        <ol class=\"body\">\n          <li><strong>Narrow scope.</strong> One department, one pathway, one measurable outcome.</li>\n          <li><strong>Measure the baseline first</strong> — for at least four weeks before anything changes.</li>\n          <li><strong>Define success and failure numerically in advance</strong>, including the threshold at which you stop.</li>\n          <li><strong>Run silently or in parallel first</strong> where patient safety permits.</li>\n          <li><strong>Set an end date.</strong> Pilots without one become permanent unevaluated systems.</li>\n          <li><strong>Include the people who will use it</strong> in design — clinicians and nurses know the edge cases the vendor does not.</li>\n          <li><strong>Decide honestly.</strong> Scale, redesign, or stop. A well-run pilot concluding \"no\" has prevented a costly, potentially unsafe mistake.</li>\n        </ol>"
      },
      {
        "h": "Leading clinical colleagues through adoption",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Address the job question directly.</strong> Clinical staff will wonder whether this replaces them. BCG's outlook frames the realistic answer: AI agents should <em>augment</em> the workforce, with organisations upskilling current workers and redesigning roles. Say this plainly and early — silence breeds resistance.</li>\n          <li><strong>Recruit credible clinical champions.</strong> Adoption follows respected clinicians, not administrators or vendors.</li>\n          <li><strong>Train the challenge, not just the click.</strong> Staff must be able to recognise when output is wrong and be genuinely empowered to override it — the direct antidote to automation bias.</li>\n          <li><strong>Protect time for learning.</strong> Change introduced without protected time is change that does not happen.</li>\n          <li><strong>Embed AI literacy in professional development,</strong> as BCG recommends — this is a durable capability, not a one-off training event.</li>\n          <li><strong>Close the loop.</strong> Show staff what changed as a result of their use of the tool. Nothing sustains adoption like visible patient benefit.</li>\n        </ul>"
      },
      {
        "h": "Where to begin — a realistic first year",
        "html": "\n        <ol class=\"body\">\n          <li><strong>Compile the AI register</strong> (Module 8) — two weeks, high value.</li>\n          <li><strong>Issue an acceptable-use policy</strong> for generative AI tools, addressing shadow AI immediately at no cost.</li>\n          <li><strong>Name accountability</strong> — an executive owner and a multidisciplinary clinical AI committee.</li>\n          <li><strong>Assess against RISE</strong> (Module 7) and identify your weakest component.</li>\n          <li><strong>Choose one low-risk operational project</strong> with a measured baseline and a stopping rule.</li>\n          <li><strong>Build validation capability</strong> — the ability to evaluate a model on your own population is your most valuable long-term asset.</li>\n          <li><strong>Develop your people.</strong> This programme is a start; sustained competence requires structured continuing development.</li>\n        </ol>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: measure before you build",
      "text": "The most common reason a promising clinical AI project cannot be scaled is that nobody recorded what performance looked like beforehand. Before writing a specification or meeting a vendor, spend four weeks measuring the current pathway — time to report, time to treatment, volumes, error rates. That baseline is the cheapest work in the entire programme and the only thing that converts an impression into evidence."
    },
    "activity": {
      "title": "Capstone: your AI use-case proposal",
      "text": "Complete the proposal you began in Module 4 by adding: the deployment mode (assistive, triage or autonomous) and where the human decision sits; the local validation or silent-period plan; the fairness and subgroup checks you would run; the monitoring plan with escalation triggers; the full lifetime cost including training and monitoring; the named clinical owner; and the pilot's numeric success criteria, end date and withdrawal threshold. The finished document is a genuine, defensible proposal for your institution — and the practical outcome of this programme."
    },
    "takeaways": [
      "Only about a quarter of organisations extract meaningful value from GenAI; healthcare providers sit near that benchmark",
      "Apply 10-20-70 — most of the effort is people and process, not algorithms",
      "Structured change management can lift adoption from roughly 30% to 60%",
      "Business cases need a measured baseline and full lifetime cost; state explicitly how saved time will be used",
      "Demand written answers on validation, data rights and indemnity before signing",
      "Pilots need numeric success criteria, an end date and a stopping rule agreed in advance",
      "Address job fears directly, recruit clinical champions, and train staff to challenge the tool",
      "Local validation capability is the most valuable long-term institutional asset"
    ],
    "quiz": [
      {
        "q": "The 10-20-70 rule for successful AI implementation allocates effort as:",
        "opts": [
          "10% algorithms, 20% technology and data, 70% people and processes",
          "70% algorithms, 20% data, 10% people",
          "Equal thirds",
          "70% procurement, 30% training"
        ],
        "a": 0,
        "fb": "The overwhelming majority of effort belongs to people and process. Plans weighted toward the model are inverted and usually fail to sustain."
      },
      {
        "q": "BCG reports that structured change management can raise user adoption rates:",
        "opts": [
          "From 90% to 95%",
          "From roughly 30% to 60%",
          "From 5% to 10%",
          "It has no measurable effect"
        ],
        "a": 1,
        "fb": "Low adoption is a leading reason healthcare AI fails to scale, and structured change management roughly doubles it."
      },
      {
        "q": "A business case built on saving each clinician ten minutes per day will only deliver institutional benefit if:",
        "opts": [
          "Adoption exceeds 90%",
          "The software is cheap enough",
          "The freed time is deliberately redirected to a defined activity such as clearing backlog",
          "The vendor guarantees it"
        ],
        "a": 2,
        "fb": "Time saved that is not explicitly redirected never appears as institutional benefit — state the intended use in the proposal."
      },
      {
        "q": "Which vendor answer should be treated as disqualifying for clinical deployment?",
        "opts": [
          "Being a new company",
          "Declining to provide a discount",
          "Having a small support team",
          "Refusing to answer validation, data-rights and indemnity questions in writing"
        ],
        "a": 3,
        "fb": "Written commitments on validation evidence, data rights and indemnity are minimum requirements for software influencing patient care."
      },
      {
        "q": "A pilot without a pre-agreed end date and stopping rule typically:",
        "opts": [
          "Becomes a permanent, never-properly-evaluated system",
          "Costs less",
          "Finishes faster",
          "Produces better evidence"
        ],
        "a": 0,
        "fb": "Undefined pilots quietly become production systems that nobody ever formally assessed or approved."
      },
      {
        "q": "The most valuable long-term institutional capability in clinical AI is:",
        "opts": [
          "Owning the largest models",
          "The ability to independently validate a model on your own population",
          "Having the newest hardware",
          "Employing the most vendors"
        ],
        "a": 1,
        "fb": "Independent local validation capability is what lets you judge any tool, from any vendor, for your own patients — permanently."
      }
    ]
  }
];
