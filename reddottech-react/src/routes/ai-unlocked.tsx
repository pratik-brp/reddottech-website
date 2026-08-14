import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Award,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Lock,
  ChevronRight,
  Menu,
  X,
  Printer,
  GraduationCap,
  Zap,
  Brain,
  ChevronLeft,
} from "lucide-react";
import { toast } from "sonner";
import { claimCertificate } from "@/lib/api";

export const Route = createFileRoute("/ai-unlocked")({
  head: () => ({
    meta: [
      { title: "AI Unlocked — A Red Dot Technologies Course" },
      {
        name: "description",
        content:
          "A free hands-on 5-lesson AI course created for students and professionals by Red Dot Technologies.",
      },
    ],
  }),
  component: AiUnlockedPage,
});

interface Section {
  h: string;
  html: string;
}

interface QuizItem {
  q: string;
  opts: string[];
  a: number;
  fb: string;
}

interface Lesson {
  id: string;
  tag: string;
  time: string;
  title: string;
  summary: string;
  objectives: string[];
  sections: Section[];
  activity: { title: string; text: string };
  takeaways: string[];
  quiz: QuizItem[];
}

/* ---------------- ANIMATED DIAGRAMS ---------------- */
function renderDiagramSvg(lessonId: string): string {
  if (lessonId === "l1") {
    const layers = [
      { x: 150, n: 3, c: "#31507f" },
      { x: 340, n: 4, c: "#31507f" },
      { x: 530, n: 2, c: "#C8102E" },
    ];
    const top = 34,
      bot = 176;
    const ys = (n: number) =>
      Array.from(
        { length: n },
        (_, i) => top + (n === 1 ? (bot - top) / 2 : ((bot - top) * i) / (n - 1)),
      );
    const pos = layers.map((L) => ys(L.n).map((y) => ({ x: L.x, y })));
    let lines = "",
      nodes = "";
    for (let li = 0; li < pos.length - 1; li++) {
      pos[li].forEach((a) =>
        pos[li + 1].forEach((b) => {
          lines += `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" stroke="#7FA0D0" stroke-opacity="0.25" stroke-width="1.3" stroke-dasharray="4 6"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.8s" repeatCount="indefinite"/></line>`;
        }),
      );
    }
    pos.forEach((layer, li) =>
      layer.forEach((p, i) => {
        nodes += `<circle cx="${p.x}" cy="${p.y}" r="13" fill="${layers[li].c}" stroke="#CADCFC" stroke-width="1.4"><animate attributeName="opacity" values="0.55;1;0.55" dur="${2 + (i % 3) * 0.5}s" repeatCount="indefinite"/></circle>`;
      }),
    );
    const lab = `<text x="150" y="202" fill="#9DB8E6" font-size="12" text-anchor="middle">Input</text><text x="340" y="202" fill="#9DB8E6" font-size="12" text-anchor="middle">Hidden layers</text><text x="530" y="202" fill="#9DB8E6" font-size="12" text-anchor="middle">Output</text>`;
    return `<svg viewBox="0 0 680 214" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${lines}${nodes}${lab}</svg>`;
  }

  if (lessonId === "l2") {
    const tags = ["Role", "Task", "Context", "Format", "Constraints"];
    return `<svg viewBox="0 0 680 210" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">
      <rect x="30" y="45" width="180" height="125" rx="10" fill="#22386A" stroke="#7FA0D0" stroke-opacity="0.5"/>
      <text x="120" y="70" fill="#CADCFC" font-size="13" font-weight="bold" text-anchor="middle">YOUR PROMPT</text>
      ${tags.map((t, i) => `<rect x="50" y="${83 + i * 16}" width="9" height="9" rx="2" fill="#FF6B7A"/><text x="66" y="${91 + i * 16}" fill="#AFC4E6" font-size="11">${t}</text>`).join("")}
      <path d="M214 107 h52" stroke="#7FA0D0" stroke-width="2" marker-end="url(#ar)"/>
      <rect x="272" y="72" width="132" height="72" rx="12" fill="#C8102E"><animate attributeName="opacity" values="0.82;1;0.82" dur="2.2s" repeatCount="indefinite"/></rect>
      <text x="338" y="103" fill="#fff" font-size="13" font-weight="bold" text-anchor="middle">AI MODEL</text>
      <text x="338" y="122" fill="#FFD2D7" font-size="10" text-anchor="middle">aims its knowledge</text>
      <path d="M408 107 h52" stroke="#7FA0D0" stroke-width="2" marker-end="url(#ar)"/>
      <rect x="466" y="58" width="188" height="100" rx="10" fill="#1E9E68" fill-opacity="0.16" stroke="#5FC98D" stroke-opacity="0.6"/>
      <text x="560" y="90" fill="#B9F0D0" font-size="13" font-weight="bold" text-anchor="middle">GREAT ANSWER</text>
      <text x="560" y="112" fill="#CFE9DA" font-size="10" text-anchor="middle">specific, useful, exactly</text>
      <text x="560" y="126" fill="#CFE9DA" font-size="10" text-anchor="middle">what you needed</text>
      <defs><marker id="ar" markerWidth="9" markerHeight="9" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8 z" fill="#7FA0D0"/></marker></defs>
    </svg>`;
  }

  if (lessonId === "l3") {
    const tiles = 5,
      tw = 112,
      gap = 16,
      y = 34,
      size = 112,
      x0 = 28;
    let g = "";
    for (let t = 0; t < tiles; t++) {
      const x = x0 + t * (tw + gap),
        clarity = t / (tiles - 1);
      g += `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="10" fill="#0e1b38" stroke="#3A5680"/>`;
      const dots = Math.round(64 * (1 - clarity));
      let s = t * 131 + 7;
      for (let d = 0; d < dots; d++) {
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        const px = x + 6 + (s % (size - 12));
        s = (s * 1103515245 + 12345) & 0x7fffffff;
        const py = y + 6 + (s % (size - 12));
        g += `<rect x="${px}" y="${py}" width="2.4" height="2.4" fill="#8FB0E0" fill-opacity="${(0.5 * (1 - clarity) + 0.12).toFixed(2)}"/>`;
      }
      if (clarity > 0) {
        const cx = x + size / 2,
          cy = y + size / 2,
          r = 16 * clarity + 6;
        g += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="#C8102E" fill-opacity="${clarity.toFixed(2)}"/><circle cx="${(cx - 7 * clarity).toFixed(1)}" cy="${(cy - 6 * clarity).toFixed(1)}" r="${(3 * clarity).toFixed(1)}" fill="#0e1b38" fill-opacity="${clarity.toFixed(2)}"/>`;
      }
      if (t < tiles - 1)
        g += `<path d="M${x + size + 2} ${y + size / 2} h${gap - 4}" stroke="#7FA0D0" stroke-width="1.4"/>`;
    }
    g += `<text x="${x0 + size / 2}" y="${y + size + 22}" fill="#9DB8E6" font-size="11" text-anchor="middle">pure noise</text><text x="${x0 + 4 * (tw + gap) + size / 2}" y="${y + size + 22}" fill="#9DB8E6" font-size="11" text-anchor="middle">clear image</text>`;
    return `<svg viewBox="0 0 680 190" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  if (lessonId === "l4") {
    const steps = ["Remember", "Understand", "Apply", "Analyse", "Evaluate", "Create"];
    const n = steps.length,
      x0 = 52,
      baseY = 182,
      sw = 94;
    let g = "";
    const pts: string[] = [];
    for (let i = 0; i < n; i++) {
      const x = x0 + i * sw,
        h = (i + 1) * 24,
        yy = baseY - h;
      g += `<rect x="${x}" y="${yy}" width="${sw - 8}" height="${h}" rx="4" fill="#22386A" stroke="#3A5680"/>`;
      g += `<rect x="${x}" y="${yy}" width="${sw - 8}" height="6" fill="${i >= 4 ? "#C8102E" : "#2E6FB0"}"/>`;
      g += `<text x="${x + (sw - 8) / 2}" y="${yy - 6}" fill="#CADCFC" font-size="10.5" text-anchor="middle">${steps[i]}</text>`;
      pts.push(`${x + (sw - 8) / 2},${yy - 15}`);
    }
    g += `<circle r="5" fill="#FF6B7A"><animateMotion dur="6s" repeatCount="indefinite" path="M${pts.join(" L")}"/></circle>`;
    return `<svg viewBox="0 0 680 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}<text x="52" y="196" fill="#9DB8E6" font-size="11">basic thinking →</text><text x="600" y="196" fill="#9DB8E6" font-size="11" text-anchor="end">→ deep thinking</text></svg>`;
  }

  if (lessonId === "l5") {
    const gates = [
      "Could it be wrong?",
      "Where is it from?",
      "Who might it hurt?",
      "Am I being honest?",
    ];
    const x0 = 160,
      gapx = 92,
      y = 38,
      gh = 104;
    let g = `<rect x="18" y="78" width="112" height="48" rx="8" fill="#22386A" stroke="#3A5680"/><text x="74" y="99" fill="#CADCFC" font-size="11" text-anchor="middle">AI output</text><text x="74" y="114" fill="#9DB8E6" font-size="9.5" text-anchor="middle">unverified</text>`;
    gates.forEach((t, i) => {
      const x = x0 + i * gapx;
      g += `<line x1="${x}" y1="${y}" x2="${x}" y2="${y + gh}" stroke="#7FA0D0" stroke-opacity="0.45" stroke-width="1.3"/><circle cx="${x}" cy="${y + gh / 2}" r="11" fill="none" stroke="#FFD27A" stroke-width="1.5"/><text x="${x}" y="${y + gh / 2 + 4}" fill="#FFD27A" font-size="12" text-anchor="middle">?</text><text x="${x}" y="${y + gh + 15}" fill="#AFC4E6" font-size="9" text-anchor="middle">${t}</text>`;
    });
    const outx = x0 + gates.length * gapx;
    g += `<rect x="${outx}" y="78" width="124" height="48" rx="8" fill="#1E9E68" fill-opacity="0.18" stroke="#5FC98D"/><text x="${outx + 62}" y="98" fill="#B9F0D0" font-size="11.5" font-weight="bold" text-anchor="middle">Trusted</text><text x="${outx + 62}" y="114" fill="#CFE9DA" font-size="9.5" text-anchor="middle">✓ verified</text>`;
    g += `<circle r="6" cy="102" fill="#FF6B7A"><animate attributeName="cx" from="130" to="${outx}" dur="4.5s" repeatCount="indefinite"/></circle>`;
    return `<svg viewBox="0 0 680 172" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto max-w-full block mx-auto">${g}</svg>`;
  }

  return "";
}

const DIAGRAM_CAPTIONS: Record<string, string> = {
  l1: "A neural network: data flows through weighted connections, and learning slowly tunes the weights.",
  l2: "A precise prompt steers the model to exactly the expertise you need.",
  l3: "Diffusion in action — the model starts from noise and removes it, guided by your words.",
  l4: "Bloom’s ladder: most learners stop at the bottom. AI can help you climb higher.",
  l5: "Run every AI answer through four checks before you trust it.",
};

const LESSONS: Lesson[] = [
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
        html: `<p>When your phone unlocks by looking at your face, when YouTube lines up the next video you cannot resist, when your keyboard finishes your sentence, when a bank silently blocks a fraudulent transaction — that is <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">artificial intelligence</span> quietly at work. AI is not a distant sci-fi robot. It is already woven into the apps you open a hundred times a day.</p>
        <p class="mt-3">Here is an honest, complete definition to build on:</p>
        <p class="mt-2 p-4 bg-slate-100 border-l-4 border-[#0F172A] rounded-r-xl text-slate-800 font-medium"><strong>Artificial Intelligence is software that learns patterns from data, and uses those patterns to make predictions or decisions — without a human writing step-by-step instructions for every possible situation.</strong></p>
        <p class="mt-3">Notice the key phrase: <em>learns from data</em>. That is what separates modern AI from ordinary software, and it is the idea the rest of this lesson unpacks.</p>`,
      },
      {
        h: "The nested dolls: AI, machine learning, deep learning",
        html: `<p>These three words get used interchangeably, but they actually fit inside one another like Russian dolls.</p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Artificial Intelligence</strong> is the big outer goal: machines doing things that normally need human intelligence.</li>
          <li><strong>Machine Learning (ML)</strong> is the main method we use to get there — teaching a system by showing it examples instead of writing rules. Show it thousands of emails labelled "spam" or "not spam," and it learns to sort new ones.</li>
          <li><strong>Deep Learning</strong> is a powerful kind of machine learning that uses <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">neural networks</span> with many layers. It powers almost everything you have heard of: chatbots, image generators, voice assistants, self-driving cars.</li>
        </ul>
        <p class="mt-3">So every chatbot is deep learning, which is machine learning, which is AI. But a simple rule-based thermostat can be "AI" without any learning at all. The word is broad — now you can be precise about which kind you mean.</p>`,
      },
      {
        h: "How a neural network actually learns",
        html: `<p>A <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">neural network</span> is loosely inspired by the brain. It is made of thousands or millions of tiny units ("neurons") connected together. Each connection has a number called a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">weight</span> that says how strongly one unit pushes on the next.</p>
        <p class="mt-3">Learning works like this, and it is simpler than it sounds:</p>
        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">
          <li>Show the network an example (say, a photo) and let it guess the answer ("cat" or "not cat").</li>
          <li>Compare its guess to the correct answer. The size of the mistake is called the <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">loss</span>.</li>
          <li>Nudge every weight a tiny bit in the direction that would have reduced the mistake.</li>
          <li>Repeat this millions of times, with millions of examples.</li>
        </ol>
        <p class="mt-3">Slowly, the weights settle into values that capture the real pattern — what "cat-ness" looks like. Nobody programmed the rules for whiskers or ears; the network discovered them by adjusting numbers until it stopped being wrong.</p>
        <div class="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl space-y-1">
          <h4 class="font-bold text-amber-900 text-xs uppercase tracking-wider">🔍 Deeper dive: what "parameters" really are</h4>
          <p class="text-xs text-amber-800">Those adjustable weights are called <strong>parameters</strong> — think of them as tiny dials. When you hear a model has "70 billion parameters," it means 70 billion dials were tuned during training. The automatic tuning process is called <em>gradient descent</em>: it is like finding the bottom of a valley in fog by always stepping downhill. More parameters, more data, and more downhill steps generally mean a smarter model.</p>
        </div>`,
      },
      {
        h: "Training vs. using it: the two phases",
        html: `<p>Every AI lives two very different lives.</p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Training</strong> is the school years — slow, expensive, done once. The model sees enormous amounts of data and tunes its parameters. Training a large model can cost millions of dollars and use warehouses of computers.</li>
          <li><strong>Inference</strong> is the working life — fast and cheap. This is the moment you type a question and it answers. The parameters are now frozen; it is simply applying what it already learned.</li>
        </ul>
        <p class="mt-3">This is why a chatbot answers instantly but sometimes does not know recent news: its expensive "school years" ended on a certain date, and everything after that is outside what it studied.</p>`,
      },
      {
        h: "How a chatbot 'thinks' — and what a token is",
        html: `<p>A chatbot like the one that helped build this course is a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">large language model</span> (LLM). Here is the surprising truth: at its core, it is a spectacularly good <strong>next-word predictor</strong>. Given the words so far, it predicts the most likely next piece of text, then the next, then the next — one step at a time — until the answer is complete.</p>
        <p class="mt-3">It does not work in whole words, but in <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">tokens</span> — small chunks of text. "Unbelievable" might be three tokens: "un", "believ", "able". The model juggles probabilities over tens of thousands of possible tokens at every single step. Do that fast enough, over enough knowledge, and the result feels like understanding.</p>
        <p class="mt-3">But remember what is really happening: it is pattern-based prediction, not a conscious mind with beliefs or feelings. Holding onto that one fact will make you wiser about AI than most adults.</p>`,
      },
      {
        h: "Two useful maps: narrow vs. general, predictive vs. generative",
        html: `<p>Two simple distinctions will help you classify any AI you meet.</p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Narrow AI</strong> is brilliant at one thing — translating, recommending, recognising faces. Every AI that exists today is narrow. <strong>General AI (AGI)</strong> — a system as flexible as a human across any task — does not yet exist, despite the headlines.</li>
          <li><strong>Predictive AI</strong> classifies or forecasts: spam or not, this disease or that, tomorrow's demand. <strong>Generative AI</strong> creates something new: text, images, audio, video. The generative wave is what made AI famous, and it is what you will use in the next four lessons.</li>
        </ul>`,
      },
      {
        h: "Why now? The three ingredients",
        html: `<p>AI ideas are decades old, so why did everything change so suddenly? Three ingredients finally arrived at once:</p>
        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Data</strong> — the internet created oceans of text and images to learn from.</li>
          <li><strong>Computing power</strong> — specialised chips (GPUs) made it possible to tune billions of parameters.</li>
          <li><strong>A breakthrough design</strong> — in 2017 a new neural-network architecture called the <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">transformer</span> made language models dramatically better at handling context. Almost every modern chatbot is built on it.</li>
        </ol>
        <p class="mt-3">When data, compute and the transformer met, AI leapt from "interesting" to "world-changing" in just a few years — right as you were growing up alongside it.</p>`,
      },
    ],
    activity: {
      title: "Try it yourself: See the learning happen",
      text: `Open any chatbot and ask: "Explain how you were trained, in simple terms, and what a parameter is." Then ask a follow-up: "What is something you cannot know because of when your training ended?" Notice how the answers line up with this lesson — you now understand the machine well enough to interrogate it.`,
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
        html: `<p>A <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">prompt</span> is simply what you type to an AI. Here is the secret almost nobody is taught: <strong>the quality of your prompt decides the quality of your answer.</strong> The same model can hand you something useless or something brilliant — and the difference is usually you, not the machine.</p>
        <p class="mt-3">This is a genuine, in-demand skill. Employers now list "prompting" and "working with AI" on job adverts. Learning it well is, for this decade, what knowing how to search Google was for the last one — except the payoff is far larger.</p>`,
      },
      {
        h: "Why prompting even works",
        html: `<p>A large model has absorbed an enormous amount of the world's writing. Buried inside it are the patterns of a tutor, a lawyer, a poet, a coder, a coach. Your prompt does not teach it those things — it <strong>selects</strong> which of them to bring forward. A vague prompt lands you in the bland middle of everything it knows. A precise prompt steers it to the exact corner you need.</p>
        <div class="mt-4 p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl space-y-1">
          <h4 class="font-bold text-amber-900 text-xs uppercase tracking-wider">🔍 Deeper dive: the context window</h4>
          <p class="text-xs text-amber-800">Everything in your current conversation — your prompt, pasted text, and the AI's replies — sits in a working memory called the <strong>context window</strong>, measured in tokens. It is large but finite. In very long chats the earliest details can fall out of view, which is why the AI sometimes "forgets" what you said at the start. Fix: restate key details, or start fresh for a new task.</p>
        </div>`,
      },
      {
        h: "The anatomy of a strong prompt: R-T-C-F-C",
        html: `<p>Great prompts are not luck. Most contain five ingredients. You will not need all five every time, but keep the checklist in mind:</p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Role</strong> — who the AI should be. "Act as a patient physics tutor."</li>
          <li><strong>Task</strong> — exactly what you want done. "Explain acceleration."</li>
          <li><strong>Context</strong> — your situation. "I am a Grade 10 student in Nepal preparing for exams and I find formulas confusing."</li>
          <li><strong>Format</strong> — the shape of the answer. "Give me three short points, then one worked example."</li>
          <li><strong>Constraints</strong> — the limits. "Use simple words, under 200 words, no advanced maths."</li>
        </ul>
        <p class="mt-3">Stack these together and an ordinary request becomes a precise brief the model can nail on the first try.</p>`,
      },
      {
        h: "Three named techniques the pros use",
        html: `<p>Beyond the checklist, three techniques have real names and real power:</p>
        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Zero-shot</strong> — you just ask, with no examples. Fine for simple tasks.</li>
          <li><strong>Few-shot</strong> — you give two or three examples of what "good" looks like, then ask for more of the same. Perfect for matching a style or format: paste three strong CV bullet points and say "write four more like these."</li>
          <li><strong>Chain-of-thought</strong> — you add "think step by step" or "show your reasoning before the final answer." For maths, logic and multi-step problems this dramatically improves accuracy, because it forces the model to work through the steps instead of blurting a guess.</li>
        </ol>`,
      },
      {
        h: "Weak prompt to strong prompt: a live upgrade",
        html: `<p><span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">Weak:</span> "Help me with history."</p>
        <p class="mt-2"><span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">Strong:</span> "Act as a friendly history tutor <em>(role)</em>. I am a Grade 9 student who struggles to remember dates <em>(context)</em>. Explain the three main causes of World War One <em>(task)</em> in simple language, then give me a memory trick for each <em>(format)</em>. Keep it under 250 words <em>(constraint)</em>."</p>
        <p class="mt-3">Same tool. A completely different result. That single example contains the whole skill.</p>`,
      },
      {
        h: "Iterate — the first answer is a draft, not a verdict",
        html: `<p>Amateurs accept the first reply. Professionals treat it as round one and steer: "make it shorter," "add a real-world example," "explain the second point more simply," "now turn it into five flashcards." Each nudge sharpens the result. The willingness to go three or four rounds is what separates people who get gold from AI and people who give up and call it useless.</p>`,
      },
    ],
    activity: {
      title: "Try it yourself: The five-ingredient rewrite",
      text: `Pick something you genuinely need help with this week. Write the laziest one-line prompt for it. Now rewrite it using all five ingredients — Role, Task, Context, Format, Constraints — and add "think step by step" if it involves reasoning. Run both. The gap between the two answers is the value of this lesson.`,
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
        html: `<p>You can now describe something in plain language and watch AI create it: a poster, an illustration, a logo, a voice-over, a short video, a melody, even working computer code. A single student with a laptop can produce what once needed a whole studio and a budget. This is genuinely new in human history — and you get to grow up fluent in it.</p>`,
      },
      {
        h: "The creative toolkit: five modalities",
        html: `<ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Text → Image:</strong> describe a picture, get artwork in seconds — posters, projects, concept art, logos.</li>
          <li><strong>Text → Video:</strong> describe a scene, get a short animated clip. Newer and rougher, but improving fast.</li>
          <li><strong>Text → Audio &amp; Voice:</strong> generate music, sound effects, or a natural-sounding narrator.</li>
          <li><strong>Image → Image:</strong> upload a sketch or photo and have AI restyle, extend or edit it.</li>
          <li><strong>Text → Code:</strong> describe a program and get working code — a huge productivity boost for anyone learning to build things.</li>
        </ul>`,
      },
      {
        h: "How text-to-image really works: diffusion",
        html: `<p>These tools learned from hundreds of millions of image-and-caption pairs, so they connect words to visual patterns. The clever part is how they draw, a process called <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">diffusion</span>:</p>
        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">
          <li>During training, the model repeatedly takes a real image and adds random visual "noise" until it is pure static — and learns to reverse each step.</li>
          <li>When you give a prompt, it starts from pure noise and removes it step by step, always steering toward what your words describe.</li>
        </ol>
        <p class="mt-3">Out of static, guided by your text, an image gradually emerges. You do not need the mathematics — you need to recognise that it is the same big idea from Lesson 1: patterns learned from data, applied to something new.</p>`,
      },
      {
        h: "The anatomy of a great image prompt",
        html: `<p>Weak image prompts give one or two words. Strong ones layer five elements:</p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Subject</strong> — what it is: "a red panda reading a book."</li>
          <li><strong>Style</strong> — the look: "soft watercolour illustration."</li>
          <li><strong>Composition</strong> — the framing: "close-up, centred, sitting under a tree."</li>
          <li><strong>Lighting &amp; mood</strong> — "warm evening light, cosy and calm."</li>
          <li><strong>Detail &amp; quality</strong> — "highly detailed, gentle textures."</li>
        </ul>
        <p class="mt-3">Two more professional tools: a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">negative prompt</span> tells it what to avoid ("no text, no blur"), and a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">seed</span> is the starting random pattern — keep the same seed to make small tweaks without changing everything, or change it to explore fresh variations.</p>`,
      },
      {
        h: "The ethics you must not skip",
        html: `<p>AI creation raises real, unsettled questions. Be the person who asks them:</p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Whose work trained this?</strong> Models learned from human artists. Should those artists be credited or paid? Courts and companies are still deciding.</li>
          <li><strong>Who owns the output?</strong> The law on whether an AI image can be copyrighted — and by whom — is genuinely grey and varies by country.</li>
          <li><strong>Is it honest?</strong> Entering AI art in a hand-drawn competition, or passing AI work off as your own, is deception. Always disclose when something is AI-made.</li>
          <li><strong>Could it harm?</strong> The same tools that fake a fun image can fake a damaging one of a real person. Power demands responsibility.</li>
        </ul>`,
      },
    ],
    activity: {
      title: "Try it yourself: The five-layer image brief",
      text: `Write one image prompt for a poster promoting your school's science fair, using all five layers — subject + style + composition + lighting + detail — and add a short negative prompt. If you can access an image tool, generate it, then change just one word (say, the lighting) and regenerate. Watch how a single word reshapes the whole picture.`,
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
        html: `<p>Stuck on a concept at 11pm? AI never tires, never judges, never runs out of patience. Used well, it is the most available tutor in the world. The entire skill is using it to <strong>build understanding</strong>, not to <strong>skip understanding</strong>. This lesson shows you how — using methods that learning scientists have proven actually work.</p>`,
      },
      {
        h: "Supercharge three proven learning methods",
        html: `<p>Decades of research agree on what makes learning stick. AI can drive each one on demand:</p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Active recall</strong> — testing yourself beats re-reading. Prompt: "Quiz me on this chapter, one question at a time, and tell me if I'm right before the next."</li>
          <li><strong>Spaced repetition</strong> — reviewing at growing intervals fights forgetting. Prompt: "Turn my mistakes into flashcards and make a 7-day review schedule."</li>
          <li><strong>The Feynman technique</strong> — you understand something only when you can explain it simply. Prompt: "I'll explain photosynthesis to you like you're 10. Point out anything I got wrong or left out."</li>
        </ul>`,
      },
      {
        h: "Climb the thinking ladder (Bloom's taxonomy)",
        html: `<p>Learning is not one thing — there are levels. Bloom's famous ladder runs from basic to advanced thinking, and you can prompt AI to help at every rung:</p>
        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Remember:</strong> "List the key terms in this chapter with one-line definitions."</li>
          <li><strong>Understand:</strong> "Explain the main idea using an analogy from football."</li>
          <li><strong>Apply:</strong> "Give me a new problem that uses this formula, then check my solution."</li>
          <li><strong>Analyse:</strong> "Compare these two causes of the war — which was more important, and why?"</li>
          <li><strong>Evaluate:</strong> "Here's my argument. What is its weakest point?"</li>
          <li><strong>Create:</strong> "Help me design an experiment to test this idea."</li>
        </ol>
        <p class="mt-3">Most students only ever use AI at the bottom rung. Climbing higher is where real learning — and better grades — live.</p>`,
      },
      {
        h: "Build your personal study system",
        html: `<p>Combine the above into a repeatable routine you can run before any exam:</p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Diagnose:</strong> "Ask me five questions to find what I don't understand about this topic."</li>
          <li><strong>Explain the gaps:</strong> "Explain the ones I got wrong, simply, with an example each."</li>
          <li><strong>Practise:</strong> "Generate a 10-question practice test at exam difficulty, then mark it and explain my errors."</li>
          <li><strong>Plan:</strong> "Build me a realistic 2-week revision plan for these three subjects, 1 hour a day."</li>
        </ul>`,
      },
      {
        h: "The line you must not cross",
        html: `<p>Here is the honest rule. Asking AI to <strong>explain</strong> something so you can understand it and do the work yourself is <em>learning</em>. Asking AI to <strong>do</strong> the assignment so you can hand it in as your own is <em>cheating</em> — and worse, you learn nothing, which shows up in the exam hall where no chatbot exists.</p>
        <p class="mt-3">Think of AI as a coach, never a ghostwriter. A coach drills you until you are stronger; a ghostwriter leaves you weak and dependent.</p>`,
      },
    ],
    activity: {
      title: "Try it yourself: The tutor flip",
      text: `Pick the topic you find hardest right now. Run the full loop: ask an AI to quiz you (five questions, one at a time, checking each), then ask it to turn your wrong answers into flashcards with a review schedule. Finally, explain the topic back to it and let it catch your gaps.`,
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
        html: `<p>You have seen what AI can do. Now the most important lesson of all: how to use it <strong>wisely</strong>. Powerful tools reward the people who understand their limits and quietly punish those who don't. This lesson is your defence kit.</p>`,
      },
      {
        h: "Why AI hallucinates",
        html: `<p>Remember Lesson 1: a chatbot predicts <em>plausible</em> text, not <em>true</em> text. Most of the time plausible and true line up — but not always. When they diverge, the model can produce a <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">hallucination</span>: a confident, fluent, completely made-up "fact," fake quote, or fake source.</p>
        <p class="mt-3">Hallucinations are most dangerous exactly where you are least able to catch them: niche topics, specific numbers, citations, recent events, and anything local the model barely saw in training. The defence is simple: <strong>verify anything that matters.</strong></p>`,
      },
      {
        h: "Deepfakes and the information war",
        html: `<p>AI can now fake realistic photos, voices and videos of real people — <span class="text-red-600 font-semibold bg-red-50 px-1.5 py-0.5 rounded">deepfakes</span>. A convincing fake video of a leader, a friend, or you can be made from a handful of samples. This changes a basic rule of life: <strong>seeing is no longer believing.</strong></p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Check the source</strong> — who posted it, and is it reported by trusted outlets?</li>
          <li><strong>Look for confirmation</strong> — real events show up in many independent places.</li>
          <li><strong>Pause before sharing</strong> — misinformation spreads because people react fast.</li>
        </ul>`,
      },
      {
        h: "Privacy: your data is the price",
        html: `<p>Whatever you type into a public AI tool may be stored and used to improve future models. Treat the chat box like a postcard, not a diary. Practical rules:</p>
        <ul class="list-disc pl-6 space-y-2 mt-3 text-slate-700">
          <li>Never paste passwords, ID numbers, bank details, or private information.</li>
          <li>Be careful with schoolwork or personal writing you would not want stored.</li>
          <li>Check the tool's settings to turn off training or delete history.</li>
        </ul>`,
      },
      {
        h: "The critical-thinking habit: 4 questions",
        html: `<p>Make this your reflex with any AI output. Four questions:</p>
        <ol class="list-decimal pl-6 space-y-2 mt-3 text-slate-700">
          <li><strong>Could this be wrong?</strong> (hallucination)</li>
          <li><strong>Where did it come from, and can I confirm it?</strong> (sources)</li>
          <li><strong>Who might this be unfair to?</strong> (bias)</li>
          <li><strong>Would I be comfortable if everyone knew I used AI here?</strong> (honesty)</li>
        </ol>`,
      },
    ],
    activity: {
      title: "Try it yourself: Catch the hallucination",
      text: `Ask an AI a detailed factual question about your own town, school, or a small local topic it is unlikely to know well. Study the answer for anything invented or slightly off, then verify it against a real source. You have just practised the single most important safety skill: catching a confident mistake before you trust it.`,
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

/* ── Fade-in-on-tab-change hook ── */
function useTabFade(activeTab: string) {
  const [visible, setVisible] = useState(true);
  const prevTab = useRef(activeTab);

  useEffect(() => {
    if (prevTab.current !== activeTab) {
      setVisible(false);
      const t = setTimeout(() => {
        setVisible(true);
        prevTab.current = activeTab;
      }, 160);
      return () => clearTimeout(t);
    }
  }, [activeTab]);

  return visible;
}

function AiUnlockedPage() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [mobileSideOpen, setMobileSideOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<{ [key: string]: boolean }>({});
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: { [key: number]: number } }>({});

  // Lead Form & Certificate State
  const [studentName, setStudentName] = useState("");
  const [studentEmail, setStudentEmail] = useState("");
  const [studentSchool, setStudentSchool] = useState("");
  const [certificateClaimed, setCertificateClaimed] = useState(false);

  const contentVisible = useTabFade(activeTab);

  // Calculate Progress
  const totalLessons = LESSONS.length;
  const completedCount = Object.values(completedLessons).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);
  const isCourseComplete = completedCount === totalLessons;

  // Handle Quiz Option Selection
  const handleOptionSelect = (lessonId: string, qIndex: number, optionIndex: number) => {
    const lesson = LESSONS.find((l) => l.id === lessonId);
    if (!lesson) return;

    const newAnswers = {
      ...userAnswers,
      [lessonId]: {
        ...(userAnswers[lessonId] || {}),
        [qIndex]: optionIndex,
      },
    };
    setUserAnswers(newAnswers);

    const currentLessonAnswers = newAnswers[lessonId] || {};
    const allAnswered = lesson.quiz.every((_, idx) => currentLessonAnswers[idx] !== undefined);
    const allCorrect = lesson.quiz.every((q, idx) => currentLessonAnswers[idx] === q.a);

    if (allAnswered && allCorrect) {
      setCompletedLessons((prev) => ({ ...prev, [lessonId]: true }));
      toast.success(`🎉 ${lesson.tag} Quiz Mastered! Lesson completed.`);
    }
  };

  const handleClaimCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) {
      toast.error("Please provide your full name and email address.");
      return;
    }

    try {
      await claimCertificate({
        name: studentName,
        email: studentEmail,
        school: studentSchool || "AI Unlocked Scholar",
      });
      setCertificateClaimed(true);
      toast.success("Certificate generated and saved to SQLite database successfully!");
    } catch (err) {
      setCertificateClaimed(false);
      const message =
        err instanceof Error ? err.message : "Certificate request failed. Please try again.";
      toast.error(message);
    }
  };

  const navigate = (tab: string) => {
    setActiveTab(tab);
    setMobileSideOpen(false);
  };

  return (
    <div className="min-h-screen bg-surface-elevated font-sans pt-24">
      {/* ── Main Layout: Sidebar + Content ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* ── Left Sidebar ── */}
          <aside
            className={[
              "lg:col-span-1 rounded-3xl overflow-hidden border border-slate-200/80 shadow-[var(--shadow-card)] bg-white sticky top-28",
              mobileSideOpen ? "block" : "hidden lg:block",
            ].join(" ")}
          >
            {/* Sidebar header strip */}
            <div className="px-4 py-3 bg-surface-elevated border-b border-slate-100">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400 flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Course Outline
                </p>
                {/* Mobile menu toggle */}
                <button
                  onClick={() => setMobileSideOpen(!mobileSideOpen)}
                  aria-label="Toggle lessons menu"
                  className="lg:hidden flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2 py-1 text-[10px] font-bold text-brand-ink hover:bg-slate-50 transition-colors"
                >
                  <X className="h-3 w-3" />
                  Close
                </button>
              </div>
              {/* Progress bar */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="relative flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPercent}%`,
                      background: "linear-gradient(90deg, var(--brand-red), oklch(0.62 0.2 30))",
                    }}
                  />
                </div>
                <span className="text-[10px] font-extrabold text-slate-400 shrink-0 tabular-nums">
                  {completedCount}/{LESSONS.length}
                </span>
              </div>
            </div>

            <nav className="p-3 space-y-1">
              {/* Overview */}
              <button
                onClick={() => navigate("home")}
                className={[
                  "w-full flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all text-left",
                  activeTab === "home"
                    ? "bg-brand-ink text-white shadow-md"
                    : "text-slate-600 hover:bg-surface-elevated hover:text-brand-ink",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black",
                    activeTab === "home" ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                  ].join(" ")}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">Overview</span>
              </button>

              {/* Lessons */}
              {LESSONS.map((lesson, idx) => {
                const isDone = completedLessons[lesson.id];
                const isActive = activeTab === lesson.id || activeTab === `q_${lesson.id}`;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(lesson.id)}
                    className={[
                      "w-full flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all text-left group",
                      isActive
                        ? "bg-brand-red text-white shadow-md"
                        : isDone
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-100 hover:border-emerald-200"
                          : "text-slate-600 hover:bg-surface-elevated hover:text-brand-ink",
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black transition-all",
                        isDone
                          ? "bg-emerald-500 text-white"
                          : isActive
                            ? "bg-white text-brand-red"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200",
                      ].join(" ")}
                    >
                      {isDone ? <CheckCircle className="h-3.5 w-3.5" /> : idx + 1}
                    </span>
                    <span className="truncate leading-snug">{lesson.title}</span>
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 ml-auto opacity-40" />
                  </button>
                );
              })}

              {/* Divider */}
              <div className="my-2 border-t border-slate-100" />

              {/* Certificate */}
              <button
                onClick={() => navigate("cert")}
                className={[
                  "w-full flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-xs font-bold transition-all text-left",
                  activeTab === "cert"
                    ? "bg-brand-ink text-white shadow-md"
                    : isCourseComplete
                      ? "bg-emerald-500 text-white hover:bg-emerald-600"
                      : "text-slate-400 hover:bg-surface-elevated cursor-default",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px]",
                    activeTab === "cert"
                      ? "bg-white/20"
                      : isCourseComplete
                        ? "bg-white/20"
                        : "bg-slate-100",
                  ].join(" ")}
                >
                  <Award className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">Certificate</span>
                {isCourseComplete ? (
                  <span className="ml-auto text-[9px] bg-white text-emerald-700 px-1.5 py-0.5 rounded-full font-black">
                    FREE
                  </span>
                ) : (
                  <Lock className="h-3 w-3 ml-auto opacity-40" />
                )}
              </button>
            </nav>
          </aside>

          {/* ── Right Content Area ── */}
          <div
            className={[
              "lg:col-span-3 transition-opacity duration-150",
              contentVisible ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            {/* Mobile: open sidebar button */}
            <div className="lg:hidden mb-4 flex items-center gap-3">
              <button
                onClick={() => setMobileSideOpen(true)}
                className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-xs font-bold text-brand-ink shadow-sm hover:bg-surface-elevated transition-colors"
              >
                <Menu className="h-4 w-4" />
                <span>Lessons Menu</span>
              </button>
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPercent}%`,
                      background: "linear-gradient(90deg, var(--brand-red), oklch(0.62 0.2 30))",
                    }}
                  />
                </div>
                <span className="text-[11px] font-extrabold text-slate-400 shrink-0 tabular-nums">
                  {completedCount}/{LESSONS.length} done
                </span>
              </div>
            </div>

            {/* ── WELCOME / HOME VIEW ── */}
            {activeTab === "home" && (
              <div className="space-y-6 animate-fade-in-up" style={{ animationDuration: "0.5s" }}>
                {/* Hero card */}
                <div className="relative overflow-hidden rounded-3xl bg-brand-ink p-6 sm:p-10 text-white border border-brand-ink/80 shadow-[var(--shadow-3d)] min-h-[40vh] sm:min-h-[50vh] flex flex-col justify-center">
                  {/* ambient orb */}
                  <div
                    className="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full opacity-20"
                    style={{
                      background: "radial-gradient(circle, var(--brand-red) 0%, transparent 70%)",
                    }}
                  />
                  <div className="relative z-10 space-y-5">
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-brand-red/25 border border-brand-red/40 px-3.5 py-1 text-[11px] sm:text-xs font-bold text-red-300">
                        <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" />
                        Free AI Literacy • Red Dot Technologies
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-bold text-slate-300">
                        <Zap className="h-3 w-3 text-brand-gold" />5 Lessons + Certificate
                      </span>
                    </div>

                    <h1 className="display-font text-3xl sm:text-4xl font-bold leading-tight">
                      AI <span className="text-brand-red">Unlocked</span>
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                      From &ldquo;what even is AI?&rdquo; to using it like a pro — five in-depth
                      lessons to study smarter, create amazing media, and stay safe.
                    </p>

                    <div className="pt-1">
                      <button
                        onClick={() => navigate("l1")}
                        className="btn-primary inline-flex items-center gap-2 text-xs py-3 px-6"
                      >
                        <span>Start Lesson 1</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3-stat cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      icon: "🧠",
                      color: "bg-blue-50 border-blue-100",
                      iconBg: "bg-blue-100 text-blue-600",
                      title: "Understand It",
                      desc: "Demystify neural networks and machine learning without complex mathematical jargon.",
                    },
                    {
                      icon: "⚡",
                      color: "bg-amber-50 border-amber-100",
                      iconBg: "bg-amber-100 text-amber-600",
                      title: "Prompt Like a Pro",
                      desc: "Use the R-T-C-F-C framework to turn AI into your personal tutor and media creator.",
                    },
                    {
                      icon: "🏆",
                      color: "bg-emerald-50 border-emerald-100",
                      iconBg: "bg-emerald-100 text-emerald-600",
                      title: "Earn Certificate",
                      desc: "Complete all 5 quizzes to claim your official Red Dot verified digital certificate for free.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className={`rounded-2xl border p-5 space-y-3 ${item.color}`}
                    >
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-lg ${item.iconBg}`}
                      >
                        {item.icon}
                      </div>
                      <h3 className="font-extrabold text-sm text-brand-ink">{item.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Lessons list */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[var(--shadow-card)] overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                    <Brain className="h-4 w-4 text-brand-red" />
                    <h3 className="text-sm font-extrabold text-brand-ink">Course Lessons</h3>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {LESSONS.map((lesson, idx) => {
                      const isDone = completedLessons[lesson.id];
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => navigate(lesson.id)}
                          className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-elevated transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <span
                              className={[
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black transition-colors",
                                isDone
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-slate-100 text-slate-600 group-hover:bg-brand-red group-hover:text-white",
                              ].join(" ")}
                            >
                              {isDone ? "✓" : idx + 1}
                            </span>
                            <div>
                              <p className="text-sm font-bold text-brand-ink group-hover:text-brand-red transition-colors leading-tight">
                                {lesson.title}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                {lesson.summary} • {lesson.time}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-brand-red group-hover:translate-x-0.5 transition-all shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ── LESSON VIEWS ── */}
            {LESSONS.map((lesson, idx) => {
              if (activeTab !== lesson.id && activeTab !== `q_${lesson.id}`) return null;
              const isQuizMode = activeTab === `q_${lesson.id}`;
              const lessonAnswers = userAnswers[lesson.id] || {};

              return (
                <div
                  key={lesson.id}
                  className="space-y-6 animate-fade-in-up"
                  style={{ animationDuration: "0.4s" }}
                >
                  {/* Lesson card */}
                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[var(--shadow-card)] overflow-hidden">
                    {/* Lesson header */}
                    <div className="px-8 py-6 border-b border-slate-100 bg-surface-elevated">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-red/10 border border-brand-red/20 px-3 py-1 text-xs font-bold text-brand-red">
                            {lesson.tag}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">
                            {lesson.time}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveTab(isQuizMode ? lesson.id : `q_${lesson.id}`)}
                          className={[
                            "rounded-full px-4 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5",
                            isQuizMode
                              ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              : "bg-brand-ink text-white hover:bg-brand-navy shadow-sm",
                          ].join(" ")}
                        >
                          {isQuizMode ? (
                            <>
                              <ChevronLeft className="h-3.5 w-3.5" /> Read Lesson
                            </>
                          ) : (
                            <>
                              Take Quiz <ArrowRight className="h-3.5 w-3.5" />
                            </>
                          )}
                        </button>
                      </div>

                      <h2 className="display-font mt-4 text-2xl sm:text-3xl font-bold text-brand-ink leading-tight">
                        {lesson.title}
                      </h2>
                      <p className="mt-1.5 text-sm text-slate-500">{lesson.summary}</p>
                    </div>

                    {/* Lesson body */}
                    <div className="px-8 py-8">
                      {!isQuizMode ? (
                        <div className="space-y-8">
                          {/* Learning objectives */}
                          <div className="rounded-2xl bg-surface-elevated border border-slate-200/80 p-6 space-y-3">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.12em] text-brand-red flex items-center gap-2">
                              <CheckCircle className="h-3.5 w-3.5" />
                              Learning Objectives
                            </h4>
                            <ul className="space-y-2.5">
                              {lesson.objectives.map((obj, oIdx) => (
                                <li
                                  key={oIdx}
                                  className="flex items-start gap-2.5 text-sm text-slate-700"
                                >
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-black mt-0.5">
                                    {oIdx + 1}
                                  </span>
                                  <span className="leading-relaxed">{obj}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Animated SVG diagram */}
                          <div className="rounded-2xl bg-gradient-to-br from-brand-ink to-brand-navy p-6 border border-brand-ink/60 shadow-[var(--shadow-3d)] space-y-3">
                            <div
                              dangerouslySetInnerHTML={{ __html: renderDiagramSvg(lesson.id) }}
                            />
                            <p className="text-center text-xs italic text-slate-400">
                              {DIAGRAM_CAPTIONS[lesson.id]}
                            </p>
                          </div>

                          {/* Lesson sections */}
                          <div className="space-y-8">
                            {lesson.sections.map((sec, sIdx) => (
                              <div key={sIdx}>
                                <div className="flex items-start gap-3 mb-3">
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-brand-ink text-white text-xs font-black mt-0.5">
                                    {sIdx + 1}
                                  </span>
                                  <h3 className="text-base font-bold text-brand-ink leading-snug pt-0.5">
                                    {sec.h}
                                  </h3>
                                </div>
                                <div
                                  className="text-sm text-slate-600 leading-relaxed pl-10 space-y-3"
                                  dangerouslySetInnerHTML={{ __html: sec.html }}
                                />
                              </div>
                            ))}
                          </div>

                          {/* Activity box */}
                          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 space-y-2">
                            <h4 className="text-xs font-black uppercase tracking-[0.1em] text-emerald-800 flex items-center gap-2">
                              ✏️ {lesson.activity.title}
                            </h4>
                            <p className="text-sm text-emerald-900 leading-relaxed">
                              {lesson.activity.text}
                            </p>
                          </div>

                          {/* Key takeaways */}
                          <div className="rounded-2xl bg-brand-ink p-6 text-white space-y-3 shadow-[var(--shadow-3d)]">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.12em] text-brand-red flex items-center gap-2">
                              <Zap className="h-3.5 w-3.5" />
                              Key Takeaways
                            </h4>
                            <ul className="space-y-2.5">
                              {lesson.takeaways.map((take, tIdx) => (
                                <li
                                  key={tIdx}
                                  className="flex items-start gap-3 text-sm text-slate-200"
                                >
                                  <span className="text-brand-red font-black mt-0.5">→</span>
                                  <span className="leading-relaxed">{take}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Nav buttons */}
                          <div className="flex items-center justify-between pt-2">
                            {idx > 0 ? (
                              <button
                                onClick={() => navigate(LESSONS[idx - 1].id)}
                                className="flex items-center gap-1.5 rounded-full bg-surface-elevated border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                              >
                                <ChevronLeft className="h-3.5 w-3.5" />
                                Previous
                              </button>
                            ) : (
                              <span />
                            )}

                            <button
                              onClick={() => setActiveTab(`q_${lesson.id}`)}
                              className="btn-primary inline-flex items-center gap-2 text-xs"
                            >
                              <span>Take {lesson.tag} Quiz</span>
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* ── QUIZ MODE ── */
                        <div className="space-y-6">
                          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-5 py-3.5 text-amber-900 text-xs font-semibold flex items-center gap-2">
                            <span className="text-base">📝</span>
                            Answer all questions correctly to complete this lesson and progress
                            toward your certificate!
                          </div>

                          {lesson.quiz.map((qItem, qIdx) => {
                            const selectedOption = lessonAnswers[qIdx];
                            const isCorrect = selectedOption === qItem.a;
                            const LETTERS = ["A", "B", "C", "D"];

                            return (
                              <div
                                key={qIdx}
                                className="rounded-2xl bg-surface-elevated border border-slate-200/80 p-6 space-y-4"
                              >
                                <div className="flex items-start gap-3">
                                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-ink text-white text-[11px] font-black">
                                    {qIdx + 1}
                                  </span>
                                  <h4 className="font-bold text-sm text-brand-ink leading-snug pt-0.5">
                                    {qItem.q}
                                  </h4>
                                </div>

                                <div className="space-y-2 pl-2">
                                  {qItem.opts.map((optText, oIdx) => {
                                    const isThisSelected = selectedOption === oIdx;
                                    const isThisAnswerKey = oIdx === qItem.a;
                                    const isAnswered = selectedOption !== undefined;
                                    // Only lock buttons once the correct answer is chosen
                                    const isLocked = isCorrect;

                                    let style =
                                      "bg-white border-slate-200 text-slate-700 hover:border-brand-red/40 hover:bg-brand-red/5";
                                    if (isAnswered) {
                                      if (isThisAnswerKey && isCorrect)
                                        // Correct answer — green locked state
                                        style = "bg-emerald-500 border-emerald-600 text-white";
                                      else if (isThisSelected && !isCorrect)
                                        // Wrong selection — red, but still clickable
                                        style = "bg-red-100 border-red-300 text-red-800";
                                      else if (!isLocked)
                                        // Other options when answer is still wrong — stay normal & hoverable
                                        style =
                                          "bg-white border-slate-200 text-slate-700 hover:border-brand-red/40 hover:bg-brand-red/5";
                                    }

                                    return (
                                      <button
                                        key={oIdx}
                                        onClick={() => handleOptionSelect(lesson.id, qIdx, oIdx)}
                                        disabled={isLocked}
                                        className={[
                                          "w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center gap-3",
                                          style,
                                          isLocked ? "cursor-default" : "cursor-pointer",
                                        ].join(" ")}
                                      >
                                        <span
                                          className={[
                                            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black transition-colors",
                                            isCorrect && isThisAnswerKey
                                              ? "bg-white text-emerald-600"
                                              : isAnswered && isThisSelected && !isCorrect
                                                ? "bg-red-300 text-red-700"
                                                : "bg-slate-100 text-slate-500",
                                          ].join(" ")}
                                        >
                                          {LETTERS[oIdx]}
                                        </span>
                                        <span className="flex-1">{optText}</span>
                                        {isCorrect && isThisAnswerKey && (
                                          <CheckCircle className="h-4 w-4 shrink-0" />
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>

                                {selectedOption !== undefined && (
                                  <div
                                    className={[
                                      "flex items-start gap-2 px-4 py-3 rounded-xl text-xs font-semibold animate-fade-in-up",
                                      isCorrect
                                        ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                                        : "bg-red-50 text-red-900 border border-red-200",
                                    ].join(" ")}
                                    style={{ animationDuration: "0.3s" }}
                                  >
                                    <span className="text-base">{isCorrect ? "✓" : "✗"}</span>
                                    <span>
                                      <strong>
                                        {isCorrect ? "Correct!" : "Not quite — try again!"}
                                      </strong>{" "}
                                      {isCorrect ? qItem.fb : "Select another option above."}
                                    </span>
                                  </div>
                                )}
                              </div>
                            );
                          })}

                          <div className="flex items-center justify-between pt-2">
                            <button
                              onClick={() => setActiveTab(lesson.id)}
                              className="flex items-center gap-1.5 rounded-full bg-surface-elevated border border-slate-200 px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                            >
                              <ChevronLeft className="h-3.5 w-3.5" />
                              Re-read Lesson
                            </button>

                            {idx < LESSONS.length - 1 ? (
                              <button
                                onClick={() => navigate(LESSONS[idx + 1].id)}
                                className="flex items-center gap-1.5 rounded-full bg-brand-ink text-white px-6 py-2.5 text-xs font-bold shadow-sm hover:bg-brand-navy transition-colors"
                              >
                                Next Lesson <ChevronRight className="h-3.5 w-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => navigate("cert")}
                                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold shadow-sm hover:bg-emerald-700 transition-colors"
                              >
                                <span>Claim Certificate</span>
                                <Award className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ── CERTIFICATE VIEW ── */}
            {activeTab === "cert" && (
              <div className="animate-fade-in-up" style={{ animationDuration: "0.4s" }}>
                {!isCourseComplete ? (
                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[var(--shadow-card)] p-12 text-center space-y-5">
                    <div className="mx-auto h-20 w-20 rounded-full bg-surface-elevated border border-slate-200 flex items-center justify-center text-3xl">
                      🔒
                    </div>
                    <h3 className="display-font text-2xl font-bold text-brand-ink">
                      Certificate Almost Ready
                    </h3>
                    <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
                      Complete all 5 quizzes to unlock your free certificate. You've finished{" "}
                      <span className="font-bold text-brand-ink">
                        {completedCount} of {LESSONS.length}
                      </span>{" "}
                      lessons.
                    </p>
                    {/* Progress dots */}
                    <div className="flex items-center justify-center gap-2">
                      {LESSONS.map((l) => (
                        <div
                          key={l.id}
                          className={[
                            "h-2.5 w-2.5 rounded-full transition-colors",
                            completedLessons[l.id] ? "bg-emerald-500" : "bg-slate-200",
                          ].join(" ")}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        const next = LESSONS.find((l) => !completedLessons[l.id]) || LESSONS[0];
                        navigate(next.id);
                      }}
                      className="btn-primary inline-flex items-center gap-2 text-xs"
                    >
                      Continue Learning <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : !certificateClaimed ? (
                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[var(--shadow-card)] overflow-hidden">
                    {/* Header */}
                    <div className="bg-emerald-50 border-b border-emerald-100 px-8 py-6 flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                        <Award className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[11px] font-black uppercase tracking-[0.12em] text-emerald-600">
                          Course Complete 🎉
                        </p>
                        <h2 className="text-xl font-extrabold text-brand-ink leading-tight">
                          Claim Your Free AI Certificate
                        </h2>
                      </div>
                    </div>

                    <div className="p-8">
                      <p className="text-sm text-slate-500 mb-6">
                        Enter your full name as you'd like it to appear on your official digital
                        credential.
                      </p>
                      <form onSubmit={handleClaimCertificate} className="space-y-5 max-w-md">
                        {[
                          {
                            label: "Full Name",
                            value: studentName,
                            onChange: (v: string) => setStudentName(v),
                            placeholder: "e.g. Aaditya Sharma",
                            type: "text",
                            required: true,
                          },
                          {
                            label: "Email Address",
                            value: studentEmail,
                            onChange: (v: string) => setStudentEmail(v),
                            placeholder: "you@example.com",
                            type: "email",
                            required: true,
                          },
                          {
                            label: "School / Organization",
                            value: studentSchool,
                            onChange: (v: string) => setStudentSchool(v),
                            placeholder: "e.g. Grade 11, Kathmandu",
                            type: "text",
                            required: false,
                          },
                        ].map(({ label, value, onChange, placeholder, type, required }) => (
                          <div key={label}>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                              {label} {required && <span className="text-brand-red">*</span>}
                            </label>
                            <input
                              type={type}
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                              placeholder={placeholder}
                              required={required}
                              className="w-full rounded-xl border border-slate-200 bg-surface-elevated px-4 py-2.5 text-sm text-brand-ink focus:outline-none focus:border-brand-red focus:bg-white focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--brand-red)_10%,transparent)] transition-all"
                            />
                          </div>
                        ))}
                        <button type="submit" className="btn-primary w-full text-xs py-3">
                          Generate Official Certificate →
                        </button>
                        <p className="text-center text-[11px] text-slate-400">
                          🔒 100% Free. No credit card required.
                        </p>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Actions */}
                    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[var(--shadow-card)] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                          🏆 Course Completed
                        </span>
                        <h2 className="text-lg font-extrabold text-brand-ink">Your Certificate</h2>
                      </div>
                      <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 rounded-full bg-brand-ink px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-navy transition-colors"
                      >
                        <Printer className="h-4 w-4" />
                        Print / Save PDF
                      </button>
                    </div>

                    {/* Certificate */}
                    <div
                      id="official-certificate"
                      className="relative mx-auto max-w-2xl bg-white rounded-2xl p-10 sm:p-14 text-center border-[10px] border-brand-ink shadow-[var(--shadow-3d)] space-y-6"
                      style={{ fontFamily: "'Georgia', serif" }}
                    >
                      {/* Inner border */}
                      <div className="absolute inset-3 rounded-lg border-2 border-brand-red/30 pointer-events-none" />

                      {/* Top corner ornaments */}
                      <div className="absolute top-6 left-6 h-5 w-5 border-t-2 border-l-2 border-brand-red/40 pointer-events-none" />
                      <div className="absolute top-6 right-6 h-5 w-5 border-t-2 border-r-2 border-brand-red/40 pointer-events-none" />
                      <div className="absolute bottom-6 left-6 h-5 w-5 border-b-2 border-l-2 border-brand-red/40 pointer-events-none" />
                      <div className="absolute bottom-6 right-6 h-5 w-5 border-b-2 border-r-2 border-brand-red/40 pointer-events-none" />

                      <div className="space-y-1 relative z-10">
                        <div className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-red font-sans mb-3">
                          Red Dot Technologies Pvt. Ltd.
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-ink">
                          Certificate of Completion
                        </h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest font-sans">
                          Hands-On AI Literacy • 5 Lessons
                        </p>
                      </div>

                      <div className="space-y-3 relative z-10 py-4">
                        <p className="text-xs text-slate-400 italic font-sans">
                          This certifies that
                        </p>
                        <div className="text-2xl sm:text-3xl font-bold text-brand-ink border-b-2 border-slate-200 pb-3 inline-block px-8">
                          {studentName || "Student Name"}
                        </div>
                        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed font-sans">
                          has successfully completed all five lessons of{" "}
                          <strong>AI Unlocked</strong>, demonstrating practical skills in
                          understanding, using, creating with, and responsibly navigating artificial
                          intelligence.
                        </p>
                      </div>

                      <div className="pt-6 flex items-end justify-between text-xs text-slate-400 font-sans relative z-10 border-t border-slate-100">
                        <div className="text-left">
                          <strong className="block text-slate-700 font-sans">
                            Red Dot Technologies Pvt. Ltd.
                          </strong>
                          <span>Baluwatar, Kathmandu, Nepal</span>
                        </div>
                        <div className="text-right">
                          <strong className="block text-slate-700 font-sans">
                            {new Date().toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </strong>
                          <span>Date of completion</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
