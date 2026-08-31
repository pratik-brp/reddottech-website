import type { Lesson } from "./ai-healthcare-data";

export const foundationsLessons: Lesson[] = [
  {
    id: "l1",
    tag: "Lesson 1",
    time: "~22 min read",
    title: "What Is AI, Really?",
    summary: "From buzzword to real understanding",
    objectives: [
      "Define artificial intelligence, machine learning and deep learning — and see how they nest inside each other",
      "Explain, in plain language, how a neural network learns from data",
      "Understand the two phases every AI goes through: training and inference",
      "Know the key vocabulary: model, parameters, tokens, and neural network",
      "Tell the difference between narrow and general AI, and predictive and generative AI",
      "Understand why AI suddenly exploded in the last few years",
    ],
    sections: [
      {
        h: "AI is everywhere — you just stopped noticing",
        html: '<p>When your phone unlocks by looking at your face, when YouTube lines up the next video you cannot resist, when your keyboard finishes your sentence, when a bank silently blocks a fraudulent transaction — that is <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">artificial intelligence</span> quietly at work. AI is not a distant sci-fi robot. It is already woven into the apps you open a hundred times a day.</p>\n        <p class="mt-3">Here is an honest, complete definition to build on:</p>\n        <p class="mt-2 p-4 bg-slate-100 border-l-4 border-slate-900 rounded-r-xl text-slate-800 font-medium"><strong>Artificial Intelligence is software that learns patterns from data, and uses those patterns to make predictions or decisions — without a human writing step-by-step instructions for every possible situation.</strong></p>\n        <p class="mt-3">Notice the key phrase: <em>learns from data</em>. That is what separates modern AI from ordinary software, and it is the idea the rest of this lesson unpacks.</p>',
      },
      {
        h: "The nested dolls: AI, machine learning, deep learning",
        html: '<p>These three words get used interchangeably, but they actually fit inside one another like Russian dolls.</p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Artificial Intelligence</strong> is the big outer goal: machines doing things that normally need human intelligence.</li>\n          <li><strong>Machine Learning (ML)</strong> is the main method we use to get there — teaching a system by showing it examples instead of writing rules. Show it thousands of emails labelled "spam" or "not spam," and it learns to sort new ones.</li>\n          <li><strong>Deep Learning</strong> is a powerful kind of machine learning that uses <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">neural networks</span> with many layers. It powers almost everything you have heard of: chatbots, image generators, voice assistants, self-driving cars.</li>\n          <li><strong>Generative AI</strong> is the newest layer inside deep learning — models that produce brand-new text, images, code, and audio from human prompts.</li>\n        </ul>\n        <div class="my-4 rounded-2xl bg-slate-950 p-4 border border-slate-800 text-center overflow-x-auto shadow-inner">\n          <svg viewBox="0 0 690 230" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">\n            <ellipse cx="250" cy="112" rx="210" ry="98.7" fill="#1c3563" fill-opacity="0.35" stroke="#8FB0E0" stroke-opacity="0.35"/>\n            <ellipse cx="250" cy="112" rx="160" ry="75.2" fill="#24406F" fill-opacity="0.51" stroke="#8FB0E0" stroke-opacity="0.35"/>\n            <ellipse cx="250" cy="112" rx="112" ry="52.6" fill="#2E6FB0" fill-opacity="0.67" stroke="#8FB0E0" stroke-opacity="0.35"/>\n            <ellipse cx="250" cy="112" rx="64" ry="30.08" fill="#C8102E" fill-opacity="0.83" stroke="#8FB0E0" stroke-opacity="0.35"/>\n            <text x="250" y="40" fill="#CFDCEF" font-size="11.5" text-anchor="middle" font-weight="bold">ARTIFICIAL INTELLIGENCE</text>\n            <text x="250" y="66" fill="#CFDCEF" font-size="11" text-anchor="middle">Machine Learning</text>\n            <text x="250" y="90" fill="#DDE8F6" font-size="10.5" text-anchor="middle">Deep Learning</text>\n            <text x="250" y="118" fill="#fff" font-size="11" text-anchor="middle" font-weight="bold">Generative AI</text>\n            <line x1="480" y1="42" x2="520" y2="42" stroke="#8FB0E0" stroke-width="1.2"/>\n            <rect x="500" y="26" width="176" height="26" rx="4" fill="#22386A" stroke="#3A5680"/>\n            <text x="510" y="43" fill="#CFDCEF" font-size="10"><tspan font-weight="bold" fill="#F0DCB4">AI</tspan>  Rules-based expert systems</text>\n            <rect x="500" y="58" width="176" height="26" rx="4" fill="#22386A" stroke="#3A5680"/>\n            <text x="510" y="75" fill="#CFDCEF" font-size="10"><tspan font-weight="bold" fill="#F0DCB4">ML</tspan>  Spam filters, recommendation feeds</text>\n            <rect x="500" y="90" width="176" height="26" rx="4" fill="#22386A" stroke="#3A5680"/>\n            <text x="510" y="107" fill="#CFDCEF" font-size="10"><tspan font-weight="bold" fill="#F0DCB4">DL</tspan>  Computer vision, speech, transformers</text>\n            <rect x="500" y="122" width="176" height="26" rx="4" fill="#22386A" stroke="#3A5680"/>\n            <text x="510" y="139" fill="#CFDCEF" font-size="10"><tspan font-weight="bold" fill="#F0DCB4">GenAI</tspan>  Drafting, media synthesis, RAG</text>\n          </svg>\n          <p class="mt-2 text-center text-xs text-slate-400 font-medium italic">AI, machine learning, deep learning and generative AI — nested, not interchangeable.</p>\n        </div>\n        <p class="mt-3">So every chatbot is deep learning, which is machine learning, which is AI. But a simple rule-based thermostat can be "AI" without any learning at all. The word is broad — now you can be precise about which kind you mean.</p>',
      },
      {
        h: "How a neural network actually learns",
        html: '<p>A <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">neural network</span> is loosely inspired by the brain. It is made of thousands or millions of tiny units ("neurons") connected together. Each connection has a number called a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">weight</span> that says how strongly one unit pushes on the next.</p>\n        <p class="mt-3">Learning works like this, and it is simpler than it sounds:</p>\n        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">\n          <li>Show the network an example (say, a photo) and let it guess the answer ("cat" or "not cat").</li>\n          <li>Compare its guess to the correct answer. The size of the mistake is called the <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">loss</span>.</li>\n          <li>Nudge every weight a tiny bit in the direction that would have reduced the mistake.</li>\n          <li>Repeat this millions of times, with millions of examples.</li>\n        </ol>\n        <p class="mt-3">Slowly, the weights settle into values that capture the real pattern — what "cat-ness" looks like. Nobody programmed the rules for whiskers or ears; the network discovered them by adjusting numbers until it stopped being wrong.</p>\n        <div class="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl space-y-1">\n          <h4 class="font-bold text-amber-900 text-xs uppercase tracking-wider">🔍 Deeper dive: what "parameters" really are</h4>\n          <p class="text-xs text-amber-800">Those adjustable weights are called <strong>parameters</strong> — think of them as tiny dials. When you hear a model has "70 billion parameters," it means 70 billion dials were tuned during training. The automatic tuning process is called <em>gradient descent</em>: it is like finding the bottom of a valley in fog by always stepping downhill. More parameters, more data, and more downhill steps generally mean a smarter model.</p>\n        </div>',
      },
      {
        h: "Training vs. using it: the two phases",
        html: '<p>Every AI lives two very different lives.</p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Training</strong> is the school years — slow, expensive, done once. The model sees enormous amounts of data and tunes its parameters. Training a large model can cost millions of dollars and use warehouses of computers.</li>\n          <li><strong>Inference</strong> is the working life — fast and cheap. This is the moment you type a question and it answers. The parameters are now frozen; it is simply applying what it already learned.</li>\n        </ul>\n        <p class="mt-3">This is why a chatbot answers instantly but sometimes does not know recent news: its expensive "school years" ended on a certain date, and everything after that is outside what it studied.</p>',
      },
      {
        h: "How a chatbot 'thinks' — and what a token is",
        html: '<p>A chatbot like the one that helped build this course is a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">large language model</span> (LLM). Here is the surprising truth: at its core, it is a spectacularly good <strong>next-word predictor</strong>. Given the words so far, it predicts the most likely next piece of text, then the next, then the next — one step at a time — until the answer is complete.</p>\n        <p class="mt-3">It does not work in whole words, but in <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">tokens</span> — small chunks of text. "Unbelievable" might be three tokens: "un", "believ", "able". The model juggles probabilities over tens of thousands of possible tokens at every single step. Do that fast enough, over enough knowledge, and the result feels like understanding.</p>\n        <p class="mt-3">But remember what is really happening: it is pattern-based prediction, not a conscious mind with beliefs or feelings. Holding onto that one fact will make you wiser about AI than most adults.</p>',
      },
      {
        h: "Two useful maps: narrow vs. general, predictive vs. generative",
        html: '<p>Two simple distinctions will help you classify any AI you meet.</p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Narrow AI</strong> is brilliant at one thing — translating, recommending, recognising faces. Every AI that exists today is narrow. <strong>General AI (AGI)</strong> — a system as flexible as a human across any task — does not yet exist, despite the headlines.</li>\n          <li><strong>Predictive AI</strong> classifies or forecasts: spam or not, this disease or that, tomorrow\'s demand. <strong>Generative AI</strong> creates something new: text, images, audio, video. The generative wave is what made AI famous, and it is what you will use in the next four lessons.</li>\n        </ul>',
      },
      {
        h: "Why now? The three ingredients",
        html: '<p>AI ideas are decades old, so why did everything change so suddenly? Three ingredients finally arrived at once:</p>\n        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Data</strong> — the internet created oceans of text and images to learn from.</li>\n          <li><strong>Computing power</strong> — specialised chips (GPUs) made it possible to tune billions of parameters.</li>\n          <li><strong>A breakthrough design</strong> — in 2017 a new neural-network architecture called the <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">transformer</span> made language models dramatically better at handling context. Almost every modern chatbot is built on it.</li>\n        </ol>\n        <p class="mt-3">When data, compute and the transformer met, AI leapt from "interesting" to "world-changing" in just a few years — right as you were growing up alongside it.</p>',
      },
    ],
    activity: {
      title: "Try it yourself: See the learning happen",
      text: 'Open any chatbot and ask: "Explain how you were trained, in simple terms, and what a parameter is." Then ask a follow-up: "What is something you cannot know because of when your training ended?" Notice how the answers line up with this lesson — you now understand the machine well enough to interrogate it.',
    },
    takeaways: [
      "AI contains machine learning, which contains deep learning (neural networks) — nested dolls",
      "Neural networks learn by adjusting millions of 'dials' (parameters) to reduce their mistakes",
      "Every model has two phases: expensive training, then fast, frozen inference",
      "A chatbot predicts text one token at a time — powerful pattern prediction, not consciousness",
      "Today's AI is all narrow; data + compute + the 2017 transformer caused the recent explosion",
    ],
    quiz: [
      {
        q: "How do machine-learning systems mainly gain their abilities?",
        opts: [
          "A programmer writes a rule for every case",
          "They adjust internal parameters to reduce mistakes on many examples",
          "They copy answers from a fixed list",
          "They are manufactured already knowing everything",
        ],
        a: 1,
        fb: "Learning = tuning parameters (weights) over many examples until the errors shrink. No hand-written rules for each case.",
      },
      {
        q: "A model's 'parameters' are best described as…",
        opts: [
          "The questions you type",
          "Millions of adjustable dials tuned during training",
          "The chatbot's opinions",
          "The websites it searches",
        ],
        a: 1,
        fb: "Parameters are the tunable weights. '70 billion parameters' means 70 billion dials were set during training.",
      },
      {
        q: "Why can a chatbot answer instantly but not know last week's news?",
        opts: [
          "It is lazy",
          "Answering is 'inference' (fast); its expensive 'training' ended on a past date",
          "The internet is too slow",
          "It forgets on purpose",
        ],
        a: 1,
        fb: "Training is the one-time, costly learning phase; inference is fast use of frozen knowledge — so anything after the training cutoff is unknown.",
      },
      {
        q: "Which statement is true today?",
        opts: [
          "General AI (as flexible as a human) is already common",
          "All current AI is 'narrow' — great at specific tasks",
          "Chatbots are conscious",
          "Generative AI only predicts spam",
        ],
        a: 1,
        fb: "Every AI in use today is narrow. General AI does not yet exist, and current systems are not conscious.",
      },
    ],
  },
  {
    id: "l2",
    tag: "Lesson 2",
    time: "~24 min read",
    title: "Talking to AI: The Art & Science of Prompting",
    summary: "Turn any AI into an expert on demand",
    objectives: [
      "Understand what a prompt is and why it controls the quality of every answer",
      "Use a repeatable framework — Role, Task, Context, Format, Constraints — to structure prompts",
      "Apply named techniques: zero-shot, few-shot, and chain-of-thought prompting",
      "Understand the 'context window' and why long conversations sometimes drift",
      "Diagnose and fix a weak prompt like a professional",
    ],
    sections: [
      {
        h: "The prompt is the steering wheel",
        html: '<p>A <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">prompt</span> is simply what you type to an AI. Here is the secret almost nobody is taught: <strong>the quality of your prompt decides the quality of your answer.</strong> The same model can hand you something useless or something brilliant — and the difference is usually you, not the machine.</p>\n        <p class="mt-3">This is a genuine, in-demand skill. Employers now list "prompting" and "working with AI" on job adverts. Learning it well is, for this decade, what knowing how to search Google was for the last one — except the payoff is far larger.</p>',
      },
      {
        h: "Why prompting even works",
        html: '<p>A large model has absorbed an enormous amount of the world\'s writing. Buried inside it are the patterns of a tutor, a lawyer, a poet, a coder, a coach. Your prompt does not teach it those things — it <strong>selects</strong> which of them to bring forward. A vague prompt lands you in the bland middle of everything it knows. A precise prompt steers it to the exact corner you need.</p>\n        <div class="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl space-y-1">\n          <h4 class="font-bold text-amber-900 text-xs uppercase tracking-wider">🔍 Deeper dive: the context window</h4>\n          <p class="text-xs text-amber-800">Everything in your current conversation — your prompt, pasted text, and the AI\'s replies — sits in a working memory called the <strong>context window</strong>, measured in tokens. It is large but finite. In very long chats the earliest details can fall out of view, which is why the AI sometimes "forgets" what you said at the start. Fix: restate key details, or start fresh for a new task.</p>\n        </div>',
      },
      {
        h: "The anatomy of a strong prompt: R-T-C-F-C",
        html: '<p>Great prompts are not luck. Most contain five ingredients. You will not need all five every time, but keep the checklist in mind:</p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Role</strong> — who the AI should be. "Act as a patient physics tutor."</li>\n          <li><strong>Task</strong> — exactly what you want done. "Explain acceleration."</li>\n          <li><strong>Context</strong> — your situation. "I am a Grade 10 student in Nepal preparing for exams and I find formulas confusing."</li>\n          <li><strong>Format</strong> — the shape of the answer. "Give me three short points, then one worked example."</li>\n          <li><strong>Constraints</strong> — the limits. "Use simple words, under 200 words, no advanced maths."</li>\n        </ul>\n        <p class="mt-3">Stack these together and an ordinary request becomes a precise brief the model can nail on the first try.</p>',
      },
      {
        h: "Three named techniques the pros use",
        html: '<p>Beyond the checklist, three techniques have real names and real power:</p>\n        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Zero-shot</strong> — you just ask, with no examples. Fine for simple tasks.</li>\n          <li><strong>Few-shot</strong> — you give two or three examples of what "good" looks like, then ask for more of the same. Perfect for matching a style or format: paste three strong CV bullet points and say "write four more like these."</li>\n          <li><strong>Chain-of-thought</strong> — you add "think step by step" or "show your reasoning before the final answer." For maths, logic and multi-step problems this dramatically improves accuracy, because it forces the model to work through the steps instead of blurting a guess.</li>\n        </ol>',
      },
      {
        h: "Weak prompt to strong prompt: a live upgrade",
        html: '<p><span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">Weak:</span> "Help me with history."</p>\n        <p class="mt-2"><span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">Strong:</span> "Act as a friendly history tutor <em>(role)</em>. I am a Grade 9 student who struggles to remember dates <em>(context)</em>. Explain the three main causes of World War One <em>(task)</em> in simple language, then give me a memory trick for each <em>(format)</em>. Keep it under 250 words <em>(constraint)</em>."</p>\n        <p class="mt-3">Same tool. A completely different result. That single example contains the whole skill.</p>',
      },
      {
        h: "Iterate — the first answer is a draft, not a verdict",
        html: '<p>Amateurs accept the first reply. Professionals treat it as round one and steer: "make it shorter," "add a real-world example," "explain the second point more simply," "now turn it into five flashcards." Each nudge sharpens the result. The willingness to go three or four rounds is what separates people who get gold from AI and people who give up and call it useless.</p>',
      },
    ],
    activity: {
      title: "Try it yourself: The five-ingredient rewrite",
      text: 'Pick something you genuinely need help with this week. Write the laziest one-line prompt for it. Now rewrite it using all five ingredients — Role, Task, Context, Format, Constraints — and add "think step by step" if it involves reasoning. Run both. The gap between the two answers is the value of this lesson.',
    },
    takeaways: [
      "The prompt controls the result; it 'aims' the model at the expertise you need",
      "Structure prompts with Role, Task, Context, Format and Constraints",
      "Use few-shot (give examples) for style, and chain-of-thought ('think step by step') for reasoning",
      "The context window is finite — restate key details in long chats or start fresh",
      "Iterate: treat the first answer as a draft and keep steering",
    ],
    quiz: [
      {
        q: "Which prompt is strongest?",
        opts: [
          "'Tell me about the heart.'",
          "'heart info'",
          "'Act as a biology tutor. I'm a Grade 8 student who finds diagrams confusing. Explain how the heart pumps blood in 4 simple steps, then give one everyday analogy.'",
          "'heart???'",
        ],
        a: 2,
        fb: "It carries role, context, task, format and a constraint — the full R-T-C-F-C recipe.",
      },
      {
        q: "'Chain-of-thought' prompting means…",
        opts: [
          "Sending many prompts in a chain",
          "Asking the AI to reason step by step before answering",
          "Chaining several chatbots together",
          "Using only one word",
        ],
        a: 1,
        fb: "Asking it to 'think step by step' improves accuracy on maths and logic by forcing it to work through the steps.",
      },
      {
        q: "You want answers to match a very specific style. Best technique?",
        opts: [
          "Zero-shot with no examples",
          "Few-shot: give 2–3 examples of the style, then ask for more",
          "Type in ALL CAPS",
          "Ask once and give up",
        ],
        a: 1,
        fb: "Few-shot prompting — show examples of 'good' — is the fastest way to lock in a style or format.",
      },
      {
        q: "Why can an AI seem to 'forget' details from early in a long chat?",
        opts: [
          "It gets bored",
          "Early details can fall out of the finite context window",
          "It deletes your messages on purpose",
          "The internet reset",
        ],
        a: 1,
        fb: "The context window (working memory) is large but limited; in long chats, restate key details or start fresh.",
      },
    ],
  },
  {
    id: "l3",
    tag: "Lesson 3",
    time: "~24 min read",
    title: "Creating with AI: Images, Video, Audio & Code",
    summary: "Become a one-person studio",
    objectives: [
      "Map the main types of generative tools — image, video, audio, voice, and code",
      "Explain, in plain language, how text-to-image tools turn words into pictures (diffusion)",
      "Write a professional image prompt using subject, style, composition, lighting and detail",
      "Understand negative prompts, seeds and iteration",
      "Reason clearly about copyright, deepfakes and the ethics of AI creation",
    ],
    sections: [
      {
        h: "From words to worlds",
        html: "<p>You can now describe something in plain language and watch AI create it: a poster, an illustration, a logo, a voice-over, a short video, a melody, even working computer code. A single student with a laptop can produce what once needed a whole studio and a budget. This is genuinely new in human history — and you get to grow up fluent in it.</p>",
      },
      {
        h: "The creative toolkit: five modalities",
        html: '<ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Text → Image:</strong> describe a picture, get artwork in seconds — posters, projects, concept art, logos.</li>\n          <li><strong>Text → Video:</strong> describe a scene, get a short animated clip. Newer and rougher, but improving fast.</li>\n          <li><strong>Text → Audio &amp; Voice:</strong> generate music, sound effects, or a natural-sounding narrator.</li>\n          <li><strong>Image → Image:</strong> upload a sketch or photo and have AI restyle, extend or edit it.</li>\n          <li><strong>Text → Code:</strong> describe a program and get working code — a huge productivity boost for anyone learning to build things.</li>\n        </ul>',
      },
      {
        h: "How text-to-image really works: diffusion",
        html: '<p>These tools learned from hundreds of millions of image-and-caption pairs, so they connect words to visual patterns. The clever part is how they draw, a process called <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">diffusion</span>:</p>\n        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">\n          <li>During training, the model repeatedly takes a real image and adds random visual "noise" until it is pure static — and learns to reverse each step.</li>\n          <li>When you give a prompt, it starts from pure noise and removes it step by step, always steering toward what your words describe.</li>\n        </ol>\n        <p class="mt-3">Out of static, guided by your text, an image gradually emerges. You do not need the mathematics — you need to recognise that it is the same big idea from Lesson 1: patterns learned from data, applied to something new.</p>',
      },
      {
        h: "The anatomy of a great image prompt",
        html: '<p>Weak image prompts give one or two words. Strong ones layer five elements:</p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Subject</strong> — what it is: "a red panda reading a book."</li>\n          <li><strong>Style</strong> — the look: "soft watercolour illustration."</li>\n          <li><strong>Composition</strong> — the framing: "close-up, centred, sitting under a tree."</li>\n          <li><strong>Lighting &amp; mood</strong> — "warm evening light, cosy and calm."</li>\n          <li><strong>Detail &amp; quality</strong> — "highly detailed, gentle textures."</li>\n        </ul>\n        <p class="mt-3">Two more professional tools: a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">negative prompt</span> tells it what to avoid ("no text, no blur"), and a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">seed</span> is the starting random pattern — keep the same seed to make small tweaks without changing everything, or change it to explore fresh variations.</p>',
      },
      {
        h: "The ethics you must not skip",
        html: '<p>AI creation raises real, unsettled questions. Be the person who asks them:</p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Whose work trained this?</strong> Models learned from human artists. Should those artists be credited or paid? Courts and companies are still deciding.</li>\n          <li><strong>Who owns the output?</strong> The law on whether an AI image can be copyrighted — and by whom — is genuinely grey and varies by country.</li>\n          <li><strong>Is it honest?</strong> Entering AI art in a hand-drawn competition, or passing AI work off as your own, is deception. Always disclose when something is AI-made.</li>\n          <li><strong>Could it harm?</strong> The same tools that fake a fun image can fake a damaging one of a real person. Power demands responsibility.</li>\n        </ul>',
      },
    ],
    activity: {
      title: "Try it yourself: The five-layer image brief",
      text: "Write one image prompt for a poster promoting your school's science fair, using all five layers — subject + style + composition + lighting + detail — and add a short negative prompt. If you can access an image tool, generate it, then change just one word (say, the lighting) and regenerate. Watch how a single word reshapes the whole picture.",
    },
    takeaways: [
      "Generative tools now span image, video, audio/voice, image-editing and code",
      "Text-to-image works by diffusion: start from noise and remove it, steered by the meaning of your words",
      "Strong image prompts layer subject, style, composition, lighting and detail — plus negative prompts and seeds",
      "Video and voice extend the same pattern-learning idea, which is why they are powerful and easy to misuse",
      "Always disclose AI-made work and think about artists, ownership and potential harm",
    ],
    quiz: [
      {
        q: "Text-to-image tools mainly create pictures by…",
        opts: [
          "Copying one existing photo exactly",
          "Starting from random noise and removing it step by step toward your description",
          "Searching the web for a match",
          "Drawing with a robotic arm",
        ],
        a: 1,
        fb: "That guided denoising is diffusion — combining learned concepts into something new, not copying a file.",
      },
      {
        q: "A 'negative prompt' is used to…",
        opts: [
          "Insult the AI",
          "Tell the tool what to leave out of the image",
          "Make the image black and white",
          "Lower the price",
        ],
        a: 1,
        fb: "Negative prompts specify what to avoid, e.g. 'no text, no blur' — a key professional control.",
      },
      {
        q: "A strong image prompt usually layers…",
        opts: [
          "Just one keyword",
          "Subject + style + composition + lighting + detail",
          "Only the colour",
          "A website link",
        ],
        a: 1,
        fb: "Layering these five elements gives the tool everything it needs to aim the result precisely.",
      },
      {
        q: "The responsible way to share AI-made art is to…",
        opts: [
          "Pretend you drew it by hand",
          "Be honest it's AI-made and consider artists, ownership and harm",
          "Never mention it",
          "Only use it in secret",
        ],
        a: 1,
        fb: "Disclosure and ethical awareness are the marks of a responsible creator.",
      },
    ],
  },
  {
    id: "l4",
    tag: "Lesson 4",
    time: "~22 min read",
    title: "AI as Your Study Partner",
    summary: "Learn faster, and actually remember it",
    objectives: [
      "Use AI to power proven learning methods: active recall, spaced repetition and the Feynman technique",
      "Climb Bloom's levels of thinking — from remembering to creating — with AI's help",
      "Build a personal study system: practice tests, flashcards and study plans on demand",
      "Understand the integrity line between learning with AI and cheating yourself",
      "Run a simple verification workflow so you never trust a wrong answer",
    ],
    sections: [
      {
        h: "The most patient tutor you will ever have",
        html: "<p>Stuck on a concept at 11pm? AI never tires, never judges, never runs out of patience. Used well, it is the most available tutor in the world. The entire skill is using it to <strong>build understanding</strong>, not to <strong>skip understanding</strong>. This lesson shows you how — using methods that learning scientists have proven actually work.</p>",
      },
      {
        h: "Supercharge three proven learning methods",
        html: '<p>Decades of research agree on what makes learning stick. AI can drive each one on demand:</p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Active recall</strong> — testing yourself beats re-reading. Prompt: "Quiz me on this chapter, one question at a time, and tell me if I\'m right before the next."</li>\n          <li><strong>Spaced repetition</strong> — reviewing at growing intervals fights forgetting. Prompt: "Turn my mistakes into flashcards and make a 7-day review schedule."</li>\n          <li><strong>The Feynman technique</strong> — you understand something only when you can explain it simply. Prompt: "I\'ll explain photosynthesis to you like you\'re 10. Point out anything I got wrong or left out."</li>\n        </ul>',
      },
      {
        h: "Climb the thinking ladder (Bloom's taxonomy)",
        html: '<p>Learning is not one thing — there are levels. Bloom\'s famous ladder runs from basic to advanced thinking, and you can prompt AI to help at every rung:</p>\n        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Remember:</strong> "List the key terms in this chapter with one-line definitions."</li>\n          <li><strong>Understand:</strong> "Explain the main idea using an analogy from football."</li>\n          <li><strong>Apply:</strong> "Give me a new problem that uses this formula, then check my solution."</li>\n          <li><strong>Analyse:</strong> "Compare these two causes of the war — which was more important, and why?"</li>\n          <li><strong>Evaluate:</strong> "Here\'s my argument. What is its weakest point?"</li>\n          <li><strong>Create:</strong> "Help me design an experiment to test this idea."</li>\n        </ol>\n        <p class="mt-3">Most students only ever use AI at the bottom rung. Climbing higher is where real learning — and better grades — live.</p>',
      },
      {
        h: "Build your personal study system",
        html: '<p>Combine the above into a repeatable routine you can run before any exam:</p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Diagnose:</strong> "Ask me five questions to find what I don\'t understand about this topic."</li>\n          <li><strong>Explain the gaps:</strong> "Explain the ones I got wrong, simply, with an example each."</li>\n          <li><strong>Practise:</strong> "Generate a 10-question practice test at exam difficulty, then mark it and explain my errors."</li>\n          <li><strong>Plan:</strong> "Build me a realistic 2-week revision plan for these three subjects, 1 hour a day."</li>\n        </ul>',
      },
      {
        h: "The line you must not cross",
        html: '<p>Here is the honest rule. Asking AI to <strong>explain</strong> something so you can understand it and do the work yourself is <em>learning</em>. Asking AI to <strong>do</strong> the assignment so you can hand it in as your own is <em>cheating</em> — and worse, you learn nothing, which shows up in the exam hall where no chatbot exists.</p>\n        <p class="mt-3">Think of AI as a coach, never a ghostwriter. A coach drills you until you are stronger; a ghostwriter leaves you weak and dependent.</p>',
      },
    ],
    activity: {
      title: "Try it yourself: The tutor flip",
      text: "Pick the topic you find hardest right now. Run the full loop: ask an AI to quiz you (five questions, one at a time, checking each), then ask it to turn your wrong answers into flashcards with a review schedule. Finally, explain the topic back to it and let it catch your gaps.",
    },
    takeaways: [
      "AI can power active recall, spaced repetition and the Feynman technique on demand",
      "Testing yourself beats re-reading — struggling to recall strengthens memory (the testing effect)",
      "Use Bloom's ladder to push past 'remember' into apply, analyse, evaluate and create",
      "Explaining and practising = learning; handing in AI's work = cheating yourself",
      "Verify anything important — AI can be confidently wrong",
    ],
    quiz: [
      {
        q: "Which study method does research say is most effective?",
        opts: [
          "Re-reading notes many times",
          "Highlighting in bright colours",
          "Active recall — testing yourself on the material",
          "Copying the textbook by hand",
        ],
        a: 2,
        fb: "The 'testing effect': struggling to retrieve answers strengthens memory far more than re-reading.",
      },
      {
        q: "Using AI at the 'analyse' or 'create' level of Bloom's ladder means…",
        opts: [
          "Asking only for definitions",
          "Comparing ideas, critiquing arguments, or designing something new with its help",
          "Letting it write your essay",
          "Ignoring the topic",
        ],
        a: 1,
        fb: "Most students stay at 'remember'. Real learning happens higher up — analysing, evaluating and creating.",
      },
      {
        q: "Which use of AI is genuine learning, not cheating?",
        opts: [
          "Submitting an AI-written essay as your own",
          "Having it explain a concept so you can then do the work yourself",
          "Copying its answer onto your exam",
          "Letting it do every assignment",
        ],
        a: 1,
        fb: "Understanding with AI's help, then doing the work yourself, is learning. Handing in its work teaches you nothing.",
      },
      {
        q: "'Productive struggle' means…",
        opts: [
          "Suffering for no reason",
          "Wrestling with a problem before seeing the answer, which builds understanding",
          "Struggling with slow internet",
          "Giving up quickly",
        ],
        a: 1,
        fb: "Some difficulty is desirable — it's what makes learning stick. Letting AI remove all struggle removes the learning.",
      },
    ],
  },
  {
    id: "l5",
    tag: "Lesson 5",
    time: "~24 min read",
    title: "Being Smart & Safe with AI",
    summary: "Become a responsible AI citizen",
    objectives: [
      "Explain why AI hallucinates and where it is most dangerous",
      "Understand how bias enters AI systems, with real examples",
      "Recognise deepfakes and defend yourself against AI-driven misinformation",
      "Protect your privacy and personal data when using AI tools",
      "Understand how AI is made safer (guardrails, RLHF) — and why it is still imperfect",
      "See how AI will reshape careers, and which human skills keep you ahead",
    ],
    sections: [
      {
        h: "Powerful — and imperfect",
        html: "<p>You have seen what AI can do. Now the most important lesson of all: how to use it <strong>wisely</strong>. Powerful tools reward the people who understand their limits and quietly punish those who don't. This lesson is your defence kit.</p>",
      },
      {
        h: "Why AI hallucinates",
        html: '<p>Remember Lesson 1: a chatbot predicts <em>plausible</em> text, not <em>true</em> text. Most of the time plausible and true line up — but not always. When they diverge, the model can produce a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">hallucination</span>: a confident, fluent, completely made-up "fact," fake quote, or fake source.</p>\n        <p class="mt-3">Hallucinations are most dangerous exactly where you are least able to catch them: niche topics, specific numbers, citations, recent events, and anything local the model barely saw in training. The defence is simple: <strong>verify anything that matters.</strong></p>',
      },
      {
        h: "Deepfakes and the information war",
        html: '<p>AI can now fake realistic photos, voices and videos of real people — <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">deepfakes</span>. A convincing fake video of a leader, a friend, or you can be made from a handful of samples. This changes a basic rule of life: <strong>seeing is no longer believing.</strong></p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Check the source</strong> — who posted it, and is it reported by trusted outlets?</li>\n          <li><strong>Look for confirmation</strong> — real events show up in many independent places.</li>\n          <li><strong>Pause before sharing</strong> — misinformation spreads because people react fast.</li>\n        </ul>',
      },
      {
        h: "Privacy: your data is the price",
        html: '<p>Whatever you type into a public AI tool may be stored and used to improve future models. Treat the chat box like a postcard, not a diary. Practical rules:</p>\n        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">\n          <li>Never paste passwords, ID numbers, bank details, or private information.</li>\n          <li>Be careful with schoolwork or personal writing you would not want stored.</li>\n          <li>Check the tool\'s settings to turn off training or delete history.</li>\n        </ul>',
      },
      {
        h: "The critical-thinking habit: 4 questions",
        html: '<p>Make this your reflex with any AI output. Four questions:</p>\n        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">\n          <li><strong>Could this be wrong?</strong> (hallucination)</li>\n          <li><strong>Where did it come from, and can I confirm it?</strong> (sources)</li>\n          <li><strong>Who might this be unfair to?</strong> (bias)</li>\n          <li><strong>Would I be comfortable if everyone knew I used AI here?</strong> (honesty)</li>\n        </ol>',
      },
    ],
    activity: {
      title: "Try it yourself: Catch the hallucination",
      text: "Ask an AI a detailed factual question about your own town, school, or a small local topic it is unlikely to know well. Study the answer for anything invented or slightly off, then verify it against a real source. You have just practised the single most important safety skill: catching a confident mistake before you trust it.",
    },
    takeaways: [
      "Hallucinations happen because AI predicts plausible text, not true text — verify what matters",
      "Bias enters through training data and can be magnified at scale — stay alert to unequal treatment",
      "Deepfakes mean 'seeing is no longer believing' — check sources and pause before sharing",
      "Never give public AI tools your passwords or private data; check the privacy settings",
      "Safety training (RLHF, guardrails) helps but is imperfect — your critical thinking is the final layer",
      "Your edge in an AI world is judgement, creativity, ethics, communication and adaptability",
    ],
    quiz: [
      {
        q: "Why do AI chatbots sometimes 'hallucinate'?",
        opts: [
          "They are infected by a virus",
          "They predict plausible-sounding text, which is not always true",
          "They are tired",
          "They copy Wikipedia word for word",
        ],
        a: 1,
        fb: "A model predicts what usually comes next, not what is true — so it can be confidently, fluently wrong.",
      },
      {
        q: "Where does AI bias mainly come from?",
        opts: [
          "The AI choosing to be unfair",
          "Patterns in the human data it was trained on",
          "The colour of the app",
          "Random electrical noise",
        ],
        a: 1,
        fb: "Bias reflects the training data — and can be magnified when a model is used by millions.",
      },
      {
        q: "The safest habit with public AI tools is to…",
        opts: [
          "Paste your passwords so it remembers you",
          "Share friends' private details",
          "Never enter passwords or private personal data, and check the settings",
          "Type your bank PIN for convenience",
        ],
        a: 2,
        fb: "Treat the chat box like a postcard. Keep passwords and private data out, and use privacy settings.",
      },
      {
        q: "What gives a person the real edge in an AI-powered future?",
        opts: [
          "Avoiding AI completely",
          "Letting AI make every decision",
          "Pairing AI's speed with human judgement, creativity and adaptability",
          "Memorising more facts than the AI",
        ],
        a: 2,
        fb: "AI handles speed and scale; your judgement, creativity, ethics and adaptability are what keep you ahead.",
      },
    ],
  },
];
