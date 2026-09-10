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

export const educationLessons: Lesson[] = [
  {
    "id": "e1",
    "tag": "Module 1",
    "time": "45 min",
    "title": "What AI Actually Is — and What It Means for Your Classroom",
    "summary": "The foundations every teacher needs, and none of the ones they don't",
    "objectives": [
      "Distinguish the kinds of AI you will actually meet in a school or college",
      "Understand precisely what these tools can and cannot do, in classroom terms",
      "Recognise why 'the process is the purpose' is the central principle of this programme",
      "Understand the scale of student AI use already happening around you",
      "Speak accurately enough to lead a staffroom conversation or challenge a vendor"
    ],
    "sections": [
      {
        "h": "What this programme is, and who it is for",
        "html": "\n        <p>This programme is written for <strong>teachers, lecturers, heads of department, principals and education administrators</strong> — people who must decide how artificial intelligence enters their classroom, their marking, their planning and their institution. It assumes no technical background and requires none.</p>\n        <p>You will not learn to write code. You will learn to plan and differentiate faster, give better feedback, redesign assessment that AI has broken, teach your students to use these tools honestly and well, protect the children in your care, and lead adoption in your school or college. Every module ends with something you can use on Monday, and the programme concludes with an implementation plan for your own institution.</p>\n        <p>The programme takes a clear position, and it is worth stating at the outset. <strong>AI is genuinely useful to teachers and genuinely dangerous to learning</strong> — and the difference between the two is almost entirely a matter of how a teacher designs the task. That is a professional judgement, not a technical one, which is precisely why it belongs to you.</p>"
      },
      {
        "h": "This is already happening in your classroom",
        "html": "\n        <p>Whatever your school's policy says, your students are using these tools. In a December 2024 survey reported by the Higher Education Policy Institute, <strong>92% of British undergraduates reported using AI tools</strong> — up sharply in a single year. As Washington University professor Ian Bogost observed in August 2025, the technology is no longer a curiosity or merely a way to cheat; it has become a habit, as ordinary on campus as scrolling social media.</p>\n        <p>School-level adoption follows the same curve, and institutional response has been chaotic. Districts worldwide banned ChatGPT from school devices in early 2023, then reversed within months as the futility became clear. IDC's Future Enterprise Resiliency Survey of August 2025 found <strong>58% of education respondents reporting that their AI programmes had grown (26%) or improved (32%)</strong> in the preceding twelve months — while 35% reported slowing down and 7% cutting back.</p>\n        <p>The practical consequence for you is simple. The choice is not whether AI enters your classroom. It is whether it enters with your guidance or behind your back.</p>"
      },
      {
        "h": "The three kinds of AI you will meet",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Predictive AI / machine learning.</strong> Systems that learn patterns from data to forecast something. In education: early-warning systems flagging students at risk of dropping out, attendance pattern analysis, timetabling optimisation, enrolment forecasting. It answers <em>\"how likely is X?\"</em></li>\n          <li><strong>Generative AI.</strong> Systems that produce new content — text, images, audio, slides. This is the wave that changed teaching: lesson plans, worksheets, differentiated texts, question banks, report comments, parent letters, feedback drafts. It answers <em>\"draft this, adapt this, explain this.\"</em> Almost everything in this programme concerns this category.</li>\n          <li><strong>Agentic AI.</strong> Systems that pursue a goal across several steps rather than answering one request — for instance, marking a whole class set against a rubric, then compiling a gap analysis, then drafting differentiated follow-up tasks. Newest, most powerful, and requiring the most oversight.</li>\n        </ul>\n        <p>A fourth term you will hear is the <strong>intelligent tutoring system (ITS)</strong> — software that guides a student through problems, diagnoses errors and adapts what comes next. These are not new; they descend from rule-based systems built in the 1970s. What has changed is that conversational AI has made them dramatically cheaper and more flexible to build.</p>"
      },
      {
        "h": "What these tools genuinely do well for a teacher",
        "html": "\n        <ul class=\"body\">\n          <li><strong>First drafts of anything.</strong> Lesson plans, worksheets, rubrics, comprehension questions, parent letters, report comments, revision guides, exam questions. Never finished work — always a starting point that saves the blank page.</li>\n          <li><strong>Adaptation and differentiation.</strong> Taking one text and producing it at three reading levels; converting a task for a student with dyslexia; translating a letter home for a family that does not read English.</li>\n          <li><strong>Explanation at infinite patience.</strong> A student can ask the same question nine times without embarrassment. For a shy student in a class of fifty, this is not a small thing.</li>\n          <li><strong>Generating variation.</strong> Twenty more practice problems of the same type; five different worked examples; alternative analogies for a concept a student has not grasped.</li>\n          <li><strong>Summarising and organising.</strong> Turning your messy notes into a scheme of work; extracting the key points from a long policy document.</li>\n        </ul>"
      },
      {
        "h": "What they cannot do — and why this matters more in education than anywhere else",
        "html": "\n        <ul class=\"body\">\n          <li><strong>They are not reliably accurate.</strong> Generative systems produce confident, fluent, well-formatted statements that are simply wrong — invented dates, misattributed quotations, fabricated citations, incorrect worked solutions. In a classroom this is uniquely damaging, because students cannot yet tell the difference and because your authority is what they are calibrating against.</li>\n          <li><strong>They do not know your students.</strong> No model knows that Sita has been absent for a fortnight, that Ram's mother died in March, or that this class needs the concept re-taught rather than extended.</li>\n          <li><strong>They do not know your curriculum.</strong> Output aligned to a foreign syllabus is worse than useless — it is confidently misaligned.</li>\n          <li><strong>They have no stake in the conversation.</strong> As Tom Chatfield puts it in <em>AI and the Future of Pedagogy</em>, a large language model \"has no stake in a conversation and no mind to change. It will flatter, cajole or concede points in line with its training. But it can neither care nor know anything about a learner's life beyond the screen.\"</li>\n          <li><strong>They cannot take responsibility.</strong> If a report comment is wrong, a grade is unfair, or a resource contains an error, the teacher who sent it answers for it. No parent has ever accepted \"the computer wrote it.\"</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The working rule for every teacher</h4><p style=\"margin:0\">Treat AI output as work from an <strong>enthusiastic, fast, well-read trainee teacher who has never met your class, sometimes invents facts, and will never tell you when they are out of their depth</strong>. You would read that person's worksheet before photocopying it for thirty children. Apply the same standard and most of the risk in this programme disappears.</p></div>"
      },
      {
        "h": "The principle that governs everything that follows",
        "html": "\n        <p>There is one idea this programme returns to in every module, and it is worth installing now.</p>\n        <p><strong>Learning cannot be automated or outsourced.</strong> To learn is to acquire knowledge and understanding through the effortful exercise of skills. As the writer Nicholas Carr put it in May 2025, <em>\"to automate learning is to subvert learning.\"</em></p>\n        <p>Chatfield states the corollary precisely: when children at a primary school write stories and draw pictures, the point is not to supply the world with more stories and pictures. It is to help them become literate, reflective participants in their society. Undergraduates do not write essays because the world needs more essays. <strong>The process is the purpose.</strong></p>\n        <p>This gives you a test you can apply to any proposed use of AI in your classroom, and it takes five seconds:</p>\n        <div class=\"callout note\"><h4>The two-question test</h4><p style=\"margin:0\"><strong>(1) Whose cognitive effort is this task designed to exercise?</strong> If it is the student's, and AI does it, the learning has been destroyed. <strong>(2) Is this effort the point, or is it overhead?</strong> Writing the essay is the point. Formatting the bibliography is overhead. Automate the overhead without hesitation; protect the point without exception.</p></div>\n        <p>Applied consistently, this single test resolves the great majority of the dilemmas teachers report — and it explains why using AI to draft your own lesson plan is entirely legitimate while letting a student use it to draft their own essay may not be.</p>"
      },
      {
        "h": "The vocabulary that makes you effective",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Prompt</strong> — the instruction you give the system. The main determinant of output quality, and a teachable skill (Module 8).</li>\n          <li><strong>Hallucination</strong> — a confident, fluent, factually wrong output. Use the word with students; naming it makes it visible.</li>\n          <li><strong>Training data</strong> — the material the model learned from. Explains why models are strong on English and weak on Nepali, strong on American curricula and weak on yours.</li>\n          <li><strong>Human in the loop</strong> — a person reviews before the output takes effect. The central recommendation of the US Department of Education's guidance, and of this programme.</li>\n          <li><strong>AI literacy</strong> — the capacity to use, evaluate and critique these systems. A curriculum outcome, not a technology skill.</li>\n          <li><strong>Algorithmic bias</strong> — systematic unfairness produced by patterns in training data. Covered in Module 9.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: start with your own work, not your students'",
      "text": "Nearly every teacher who has a bad first experience with AI began by pointing it at students. Begin instead with something that is entirely yours and entirely low-stakes: next week's lesson plan, a set of comprehension questions, a letter to parents. You will learn the tool's strengths and its failure modes on work where a mistake costs you ten minutes rather than a child's understanding. Teachers who use these tools themselves make far better decisions about student use — and are far more credible when they set rules."
    },
    "activity": {
      "title": "Workplace application",
      "text": "List the five tasks that consumed most of your time last week outside actual teaching. For each, apply the two-question test: whose cognitive effort does this exercise, and is that effort the point or overhead? You have just produced your own shortlist of legitimate AI uses — and you will return to it in Module 3."
    },
    "takeaways": [
      "Your students are already using these tools; 92% of UK undergraduates reported doing so in late 2024",
      "Generative AI is the category that matters for teaching — drafting, adapting, explaining, differentiating",
      "These systems are fluent but not reliably accurate, and they know nothing about your students or your curriculum",
      "To automate learning is to subvert learning: the process is the purpose",
      "Apply the two-question test — whose effort is this, and is that effort the point or overhead?",
      "Automate the overhead without hesitation; protect the learning without exception",
      "Start with your own work, not your students'"
    ],
    "quiz": [
      {
        "q": "A teacher uses AI to draft a lesson plan, and a student uses AI to draft their essay. The principled difference is:",
        "opts": [
          "The lesson plan is the teacher's overhead, while writing the essay is the cognitive effort the student is meant to exercise",
          "There is no difference; both are equally acceptable",
          "The essay is longer",
          "Teachers are allowed to use technology and students are not"
        ],
        "a": 0,
        "fb": "The two-question test resolves most classroom AI dilemmas: whose effort is this designed to exercise, and is that effort the point or overhead?"
      },
      {
        "q": "Nicholas Carr's observation that 'to automate learning is to subvert learning' means that:",
        "opts": [
          "Automated systems are technically unreliable",
          "Learning is the effortful process itself, so removing the effort removes the learning",
          "Teachers should not use computers",
          "Technology should be banned from classrooms"
        ],
        "a": 1,
        "fb": "Children do not write stories because the world needs more stories. They write them to become literate, reflective participants in their society."
      },
      {
        "q": "Why is AI's tendency to produce confident but false output uniquely damaging in a classroom?",
        "opts": [
          "It only affects science subjects",
          "It uses more electricity",
          "Students cannot yet tell the difference, and your authority is what they calibrate against",
          "It slows down lesson delivery"
        ],
        "a": 2,
        "fb": "An adult professional can often spot an error. A learner, by definition, cannot — which is why teacher verification is non-negotiable."
      },
      {
        "q": "Tom Chatfield notes that a large language model 'has no stake in a conversation and no mind to change.' The classroom implication is:",
        "opts": [
          "AI is useless for explanation",
          "Only teachers should use AI",
          "Students should never talk to AI",
          "AI can simulate dialogue but cannot replace the social sense-making that genuine discussion provides"
        ],
        "a": 3,
        "fb": "It will flatter, cajole or concede in line with its training, and can neither care nor know anything about a learner's life beyond the screen."
      },
      {
        "q": "IDC's August 2025 survey found what proportion of education respondents reporting their AI programmes had grown or improved over the previous year?",
        "opts": [
          "58%",
          "95%",
          "12%",
          "5%"
        ],
        "a": 0,
        "fb": "26% growing and 32% improving — though 35% reported slowing down and 7% cutting back. Adoption is real but uneven."
      }
    ]
  },
  {
    "id": "e2",
    "tag": "Module 2",
    "time": "55 min",
    "title": "How People Learn: The Evidence AI Must Serve",
    "summary": "The cognitive science that decides whether a tool helps or harms",
    "objectives": [
      "Understand cognitive load and why it governs whether a resource helps or overwhelms",
      "Apply the five evidence-based learning techniques AI can genuinely support",
      "Understand why metacognition becomes more important, not less, in an AI age",
      "Recognise the instructional principles that make feedback effective",
      "Understand the social and emotional dimension AI cannot replicate",
      "Evaluate any AI tool against what is actually known about learning"
    ],
    "sections": [
      {
        "h": "Why this module comes before any tool",
        "html": "\n        <p>Most AI training for teachers begins with tools. That is exactly backwards, and it is why so much of it produces enthusiasm followed by disappointment.</p>\n        <p>Chatfield's <em>AI and the Future of Pedagogy</em> is built on two principles, and the first is that <strong>innovation must draw on what we know about how humans learn</strong>. Without that grounding, a teacher cannot tell the difference between a tool that supports learning and one that merely feels productive — and these two feel almost identical in the moment.</p>\n        <p>This module gives you the evidence base. It is the most important module in the programme, and the one you will use most often without noticing.</p>"
      },
      {
        "h": "Cognitive load: the first principle",
        "html": "\n        <p>The Australian educational psychologist John Sweller established that the brain is a natural information-processing system with a sharply limited working memory — one that <strong>easily becomes overwhelmed in the face of distraction or too much information.</strong></p>\n        <p>This single fact explains a great deal of classroom failure. A worksheet crowded with decorative images, a slide with nine bullet points, an instruction containing four separate tasks, a classroom with a screen playing in the background — each consumes working memory that was needed for the actual learning.</p>\n        <p><strong>The AI implication is direct and double-edged.</strong> These tools can generate enormous quantities of material instantly, and quantity is precisely what a learner cannot absorb. A teacher who generates a six-page differentiated resource pack has not helped a struggling student; they have buried one. Used well, however, AI is exceptionally good at the opposite: breaking a topic into a sequence, stripping a text to its essentials, and producing the one clear worked example that carries the concept.</p>\n        <div class=\"callout note\"><h4>Deeper dive: worked examples</h4><p style=\"margin:0\">Sweller's <em>worked example effect</em> is one of the most robust findings in educational psychology. Taking students step-by-step through a solved problem allows them to focus on <strong>reasoning and strategy</strong> rather than expending all their working memory on reaching an answer. Novices learn more from studying worked examples than from solving problems unaided. AI generates high-quality worked examples on demand — arguably its single most valuable and most underused classroom application.</p></div>"
      },
      {
        "h": "The five techniques with the strongest evidence",
        "html": "\n        <p>Each of these is supported by substantial research, and each maps onto something AI can help you produce:</p>\n        <ol class=\"body\">\n          <li><strong>Worked examples.</strong> Step-by-step solutions that relieve the pressure to leap to answers. <em>Ask AI for three worked examples of increasing difficulty, each with the reasoning made explicit.</em></li>\n          <li><strong>Spacing.</strong> Distributing practice over time inculcates knowledge more effectively than massed practice. <em>Ask AI to build a retrieval schedule that revisits Week 2's content in Weeks 4, 7 and 11.</em></li>\n          <li><strong>Interleaving.</strong> Mixing different problem types rather than blocking them together helps learners discriminate between ideas and strategies. <em>Ask AI to produce a mixed problem set drawing on three topics rather than one.</em></li>\n          <li><strong>Elaboration.</strong> Explaining how new information relates to what is already known makes knowledge more applicable. <em>Ask AI for questions that force students to connect today's concept to last term's.</em></li>\n          <li><strong>Retrieval practice.</strong> Recalling information strengthens it far more than re-reading. <em>Ask AI for low-stakes recall questions rather than another summary.</em></li>\n        </ol>\n        <p>Notice the pattern. In every case, the instruction is to produce something that <strong>makes the student work harder in a productive way</strong> — not something that makes the work easier. That distinction is the whole of good AI use in teaching.</p>"
      },
      {
        "h": "Metacognition: the skill that matters most",
        "html": "\n        <p>Underlying all of the above is <strong>metacognition</strong> — the ability to think about your own thinking. As Chatfield notes, metacognition is neither distinct from nor detachable from recall and knowledge; but by learning to monitor their understanding and adjust their strategies, learners acquire a form of educational agency that goes beyond any particular subject.</p>\n        <p>UCL Professor Emerita of Learner Centred Design Rose Luckin put the AI-age case for it directly in June 2025:</p>\n        <p style=\"padding-left:18px;border-left:3px solid rgba(184,137,43,.6);font-style:italic\">\"As our world integrates more AI into every aspect of life and work, our students need something deeper than efficient content delivery. They need sophisticated meta-learning capabilities — the ability to adapt, change, and evolve their thinking as the world transforms around them.\"</p>\n        <p>This is the strategic answer to the anxiety many teachers feel. If AI can produce the essay, what is left to teach? The answer is: <strong>the judgement to know whether the essay is any good, the knowledge to see what it has missed, and the self-awareness to know what you have and have not understood.</strong> Those are teachable, and they are what your students most need.</p>"
      },
      {
        "h": "The instructional dimension",
        "html": "\n        <p>Where cognitive science tells us how minds learn, instructional research — synthesised across thousands of studies — converges on a small number of principles:</p>\n        <ul class=\"body\">\n          <li><strong>Clarity of purpose.</strong> Students need to understand not just what they are learning but why. Clear goals give direction and form to effort.</li>\n          <li><strong>Scaffolding.</strong> The careful structuring of tasks so that each builds on the last. Badly designed tools and resources <em>\"overwhelm and demoralize learners, leaving them struggling to work out what is required.\"</em></li>\n          <li><strong>Well-calibrated feedback.</strong> Feedback must show learners both what they have achieved and how to improve. Critically, <strong>the best feedback creates a dialogue</strong>, turning assessment into a continuation of learning rather than merely its measurement.</li>\n        </ul>\n        <p>That last point governs Module 5 entirely. An AI system that returns a grade and three generic comments has measured. It has not taught. The difference is not a technical limitation — it is a design choice you control.</p>"
      },
      {
        "h": "The social and emotional dimension",
        "html": "\n        <p>Human learning is never purely cognitive. People are sociable, embodied creatures who thrive on constructive debate and meaningful feedback and suffer in their absence.</p>\n        <ul class=\"body\">\n          <li><strong>Engagement follows respect.</strong> When students see their perspectives treated seriously and their struggles understood, engagement tends to follow. The classroom becomes a space for sociable sense-making, not only individual achievement.</li>\n          <li><strong>Emotional safety is a precondition.</strong> Learning requires acknowledging error and uncertainty in front of others. Classrooms that treat mistakes as useful information rather than evidence of failure make vulnerability productive.</li>\n          <li><strong>Surveillance corrodes it.</strong> Chatfield warns specifically that classrooms which surveil and penalise students for infractions of a system they have little agency within — or which fail to offer guidance, trust and access around tools already integral to life and work — are likely over time to fall behind. This is the direct argument against detection-led policy, developed fully in Module 6.</li>\n        </ul>\n        <p>The design conclusion is that <strong>the back-and-forth of debate and the building of common understanding are not inefficiencies to be optimised away. They are the mechanisms through which learning occurs.</strong> When students challenge one another's assumptions and construct reasoned arguments, they are not exchanging information. They are learning to think.</p>"
      },
      {
        "h": "Evaluating any tool against the evidence",
        "html": "\n        <p>You now have a rubric. When a vendor, a colleague or a ministry circular proposes an AI tool, ask:</p>\n        <ol class=\"body\">\n          <li><strong>Does it reduce extraneous cognitive load, or add to it?</strong> More content is not more learning.</li>\n          <li><strong>Does it make the student work productively, or work less?</strong> Effort in the right place is the mechanism.</li>\n          <li><strong>Does its feedback open a dialogue, or close one?</strong></li>\n          <li><strong>Does it build metacognition, or bypass it?</strong></li>\n          <li><strong>Does it protect the social dimension, or substitute for it?</strong></li>\n          <li><strong>Is it scaffolded toward a goal, or an undifferentiated firehose?</strong></li>\n        </ol>\n        <p>A tool that fails three or more of these will not improve outcomes however impressive the demonstration. This rubric costs nothing and is more predictive than any feature list.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: put the pedagogy in the prompt",
      "text": "Most disappointing AI output for teachers comes from prompts that describe a topic rather than a pedagogy. Compare <em>\"Make a worksheet on photosynthesis for Grade 8\"</em> with <em>\"Create a Grade 8 photosynthesis worksheet using two worked examples with reasoning made explicit, followed by six interleaved problems mixing photosynthesis with respiration from last term, ending with three retrieval questions. Keep each instruction to one step. No decorative content.\"</em> The second produces a genuinely better resource because it encodes what you know about learning. Your pedagogical expertise is the input that makes these tools worth using."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take a worksheet or resource you already use. Score it against the six-point rubric above. Then rewrite the prompt you would give an AI to produce a better version — explicitly naming worked examples, interleaving, spacing or retrieval as appropriate. Generate it, compare the two, and note honestly which is better and why."
    },
    "takeaways": [
      "Working memory is easily overwhelmed; AI's ability to generate volume is a hazard, not a feature",
      "Worked examples let novices focus on reasoning rather than exhausting working memory reaching an answer",
      "Spacing, interleaving, elaboration and retrieval practice are the techniques with the strongest evidence",
      "Good AI use makes students work harder in a productive way, not less",
      "Metacognition is the strategic answer to 'what is left to teach' — judgement, knowledge and self-awareness",
      "The best feedback creates dialogue; a grade with generic comments has measured, not taught",
      "Debate and shared sense-making are the mechanism of learning, not inefficiency to be optimised away"
    ],
    "quiz": [
      {
        "q": "John Sweller's research on cognitive load implies that AI's ability to generate large volumes of material is:",
        "opts": [
          "Irrelevant to learning",
          "A hazard, because working memory is easily overwhelmed by too much information",
          "Only a problem for younger students",
          "Its greatest classroom strength"
        ],
        "a": 1,
        "fb": "A six-page differentiated resource pack does not help a struggling student; it buries one. Volume is precisely what a learner cannot absorb."
      },
      {
        "q": "The 'worked example effect' holds that novice learners benefit most from:",
        "opts": [
          "Working in large groups",
          "Solving many problems unaided",
          "Studying step-by-step solutions that let them focus on reasoning and strategy",
          "Reading summaries repeatedly"
        ],
        "a": 2,
        "fb": "It relieves the pressure to leap to answers, freeing working memory for the reasoning that actually transfers."
      },
      {
        "q": "Which prompt is more likely to produce a pedagogically effective resource?",
        "opts": [
          "'Make a worksheet on fractions for Grade 6'",
          "'Generate 50 fractions questions'",
          "'Make fractions fun'",
          "'Create a Grade 6 fractions worksheet with two worked examples showing reasoning, six interleaved problems mixing fractions and decimals, and three retrieval questions'"
        ],
        "a": 3,
        "fb": "Prompts that encode pedagogy outperform prompts that name a topic. Your professional expertise is the input that makes the tool worth using."
      },
      {
        "q": "Rose Luckin argues that in an AI-saturated world students most need:",
        "opts": [
          "Sophisticated meta-learning capabilities — the ability to adapt and evolve their thinking",
          "Faster content delivery",
          "Earlier programming instruction",
          "More screen time"
        ],
        "a": 0,
        "fb": "Metacognition is the strategic answer to the question of what remains to be taught when AI can produce the output."
      },
      {
        "q": "According to instructional research, the best feedback:",
        "opts": [
          "Assigns an accurate numerical grade",
          "Creates a dialogue, turning assessment into a continuation of learning rather than its measurement",
          "Compares students to one another",
          "Is delivered as quickly as possible"
        ],
        "a": 1,
        "fb": "An AI system returning a grade and generic comments has measured but not taught — and that is a design choice, not a technical limit."
      },
      {
        "q": "Chatfield warns that classrooms which surveil and penalise students around AI, without offering guidance and trust, are likely to:",
        "opts": [
          "Achieve higher integrity standards",
          "Improve examination results",
          "Fall behind over time, because emotional safety is a precondition for learning",
          "Reduce teacher workload"
        ],
        "a": 2,
        "fb": "Learning requires acknowledging error and uncertainty in front of others. Surveillance frames the relationship as conflict rather than collaboration."
      }
    ]
  },
  {
    "id": "e3",
    "tag": "Module 3",
    "time": "55 min",
    "title": "Reclaiming Your Time: AI for Teacher Workload",
    "summary": "The strongest evidence in the field, and a prompt library you can use today",
    "objectives": [
      "Understand where teacher time actually goes, and which parts AI can safely take",
      "Apply a tested prompt library across planning, communication, admin and reporting",
      "Understand the measured workload results achieved by real school systems",
      "Distinguish tasks that are safe to delegate from those that are not",
      "Protect the reclaimed time rather than allowing it to be absorbed",
      "Build a personal weekly workflow that compounds over a term"
    ],
    "sections": [
      {
        "h": "Where the time goes",
        "html": "\n        <p>The US Department of Education's <em>Artificial Intelligence and the Future of Teaching and Learning</em> reports the figure that frames this module: <strong>teachers work about 50 hours a week, spending less than half of that time in direct interaction with students.</strong></p>\n        <p>The report, drawing on McKinsey research, concludes that AI's <strong>initial benefit could be to improve teaching jobs by reducing low-level burdens in administrative and clerical work</strong> — and adds a crucial condition: that recovered time should be <em>rededicated</em> toward more meaningful work rather than simply absorbed.</p>\n        <p>This is the least controversial and best-evidenced application of AI in education. It is also where you should start, for a reason that has nothing to do with technology: <strong>a teacher who is not exhausted teaches better.</strong> Every other module in this programme depends on you having the capacity to think about your practice, and that capacity is what workload has taken.</p>"
      },
      {
        "h": "What real school systems have measured",
        "html": "\n        <p>Three systems documented by IDC in December 2025 give you defensible numbers rather than vendor claims.</p>\n        <ul class=\"body\">\n          <li><strong>Brisbane Catholic Education (Australia)</strong> — 146 schools, 13,000 staff, 20,000 Microsoft 365 Copilot licences, one of the largest educational deployments in the world. Measured outcome: a reduction of <strong>up to nine hours per week in administrative workload for teachers</strong>, alongside qualitative reports of improved work–life balance and more time available for personalising learning.</li>\n          <li><strong>Broward County Public Schools (United States)</strong> — over 20,000 Copilot licences across the district. Measured outcome: <strong>75% of teachers and administrators actively use the tool, reporting an average saving of over two hours per week</strong> on lesson planning and administrative tasks.</li>\n          <li><strong>Coquitlam School District (Canada)</strong> — a deliberate \"go slow to go fast\" programme that established data readiness and cybersecurity before introducing tools to educators, prioritising trust over speed.</li>\n        </ul>\n        <p>Note the honest spread: <strong>two hours a week in one system, up to nine in another.</strong> The difference is not the software — Brisbane and Broward deployed the same product. It is training, workflow redesign and time to learn. A licence alone buys very little, a point Module 11 develops.</p>"
      },
      {
        "h": "The delegation test",
        "html": "\n        <p>Before the prompt library, the rule that governs its use. Sort every task into three categories:</p>\n        <ul class=\"body\">\n          <li><strong>Delegate freely.</strong> No student-specific judgement, no confidential data, errors are obvious and cheap. <em>Drafting a scheme of work, generating practice questions, rewriting a text at a lower reading level, drafting a newsletter, summarising a policy document, producing a rubric skeleton, translating a general letter home.</em></li>\n          <li><strong>Delegate with mandatory review.</strong> AI drafts, you verify and adapt, always. <em>Report comments, feedback drafts, worked solutions, subject-specific factual content, anything a parent or student will read.</em></li>\n          <li><strong>Never delegate.</strong> <em>Final grades and rank ordering. Safeguarding and pastoral judgements. Decisions about a child's placement, referral or discipline. Anything requiring knowledge of a student's circumstances. Anything containing a named student's personal information typed into a public tool.</em></li>\n        </ul>\n        <div class=\"callout warn\"><h4>The data rule, stated once and applying throughout</h4><p style=\"margin:0\">Do not type a student's name, examination number, medical or family information, safeguarding detail, or any identifiable personal data into a general public AI tool. Describe the situation generically instead — <em>\"a Grade 9 student who has missed three weeks and is anxious about returning\"</em> — and add the specifics yourself afterwards. This costs you nothing and protects both the child and you.</p></div>"
      },
      {
        "h": "The prompt library — planning",
        "html": "\n        <p>Copy these, replace the bracketed parts, and adjust. The specificity is what makes them work.</p>\n        <ul class=\"body\">\n          <li><strong>Scheme of work.</strong> <em>\"You are an experienced [subject] teacher. Draft a [6]-week scheme of work for Grade [8] on [topic], aligned to these learning outcomes: [paste]. For each week give the objective, one worked example, the key misconception to pre-empt, a retrieval question from a previous week, and a 5-minute exit check. Class size [45], mixed ability, English is a second language for most students.\"</em></li>\n          <li><strong>Single lesson.</strong> <em>\"Plan a 40-minute lesson on [topic] for Grade [7]. Structure: 5-min retrieval starter on [prior topic], 10-min explanation with one worked example, 15-min paired task, 5-min whole-class check, 5-min consolidation. I have a blackboard and no projector. Give me exactly what to write on the board.\"</em></li>\n          <li><strong>Misconception hunt.</strong> <em>\"List the eight most common misconceptions students hold about [topic] at Grade [9] level. For each, give the misconception, why it is intuitive, and one diagnostic question that would reveal it.\"</em> — This is among the highest-value prompts in the library and has no equivalent shortcut.</li>\n          <li><strong>Worked examples.</strong> <em>\"Produce three worked examples of [problem type] at increasing difficulty. Make the reasoning explicit at every step, including why each step is chosen, not only what it is. Then give three parallel problems with no solutions.\"</em></li>\n          <li><strong>Question bank.</strong> <em>\"Generate 20 questions on [topic] for Grade [8], graded across recall, application and analysis, with an answer key. Mark which are suitable for oral questioning.\"</em></li>\n        </ul>"
      },
      {
        "h": "The prompt library — communication and administration",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Report comments.</strong> <em>\"Draft three report comment templates for a Grade [6] [subject] student: one performing above expectation, one at expectation, one below. Each 60–80 words, specific about skills rather than personality, ending with one concrete next step. Warm and professional; no clichés.\"</em> Then personalise every one by hand — this is a mandatory-review task.</li>\n          <li><strong>Difficult parent letter.</strong> <em>\"Draft a letter to a parent about a student who has stopped submitting homework. Firm but not accusatory, assumes good faith, invites a meeting, offers two practical supports. 200 words. Do not use the student's name — I will add it.\"</em></li>\n          <li><strong>Translation.</strong> <em>\"Translate this letter into [Nepali] for parents who do not read English. Use simple everyday language, not formal or literary register.\"</em> Always have a fluent colleague check regional-language output before it goes home — model performance in Nepali and other regional languages is materially weaker than in English.</li>\n          <li><strong>Policy digest.</strong> <em>\"Summarise this [policy document] in 200 words for busy teachers. Then list the five things it actually requires us to do differently.\"</em></li>\n          <li><strong>Meeting and minutes.</strong> <em>\"Turn these rough notes into structured minutes with decisions, owners and deadlines separated: [paste].\"</em></li>\n          <li><strong>Newsletter.</strong> <em>\"Write a 300-word parent newsletter section covering these three items: [list]. Warm, concrete, no jargon, readable by a parent with limited formal education.\"</em></li>\n        </ul>"
      },
      {
        "h": "Protecting the time you reclaim",
        "html": "\n        <p>This is the step that determines whether any of this matters, and it is the step almost everyone skips.</p>\n        <p>The US Department of Education's condition — that recovered time be <em>rededicated</em> — is not a pleasantry. Time saved that is not deliberately reassigned is absorbed within weeks by whatever else is waiting, and the teacher ends the term exactly as tired, now with an additional tool to maintain and no evidence that it helped.</p>\n        <p>Decide in advance where the time goes. IDC's recommendation for school leaders is to <strong>shift the teacher's role from content deliverer to facilitator and relationship builder</strong> — using AI to handle administrative overhead so teachers can reclaim time for what brought them into the profession: building meaningful relationships with students and providing individualised support, \"getting back to real teaching\" rather than being overburdened by paperwork.</p>\n        <p>Concretely, name the destination: two more one-to-one conversations a week with the students who need them; one properly planned practical lesson instead of three rushed ones; leaving at a reasonable hour on Fridays. Write it down and defend it.</p>"
      },
      {
        "h": "A weekly workflow that compounds",
        "html": "\n        <ol class=\"body\">\n          <li><strong>Sunday or Monday, 30 minutes.</strong> Generate the week's planning skeleton, worked examples and question banks in one sitting. Batching is far more efficient than reaching for the tool ad hoc.</li>\n          <li><strong>Build a personal prompt file.</strong> Keep the prompts that worked in a single document. Within a term you will have a library tuned to your subject, your grade level and your students — the compounding asset of this entire module.</li>\n          <li><strong>Verify before duplicating.</strong> Never photocopy a generated resource you have not read end to end. This is not optional.</li>\n          <li><strong>Keep one honest note per week.</strong> What did it do well, what did it get wrong. After a term you will have a genuine evidence base — for yourself and for the colleagues who will ask.</li>\n        </ol>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the misconception prompt",
      "text": "If you take one prompt from this module, take the misconception hunt: <em>\"List the eight most common misconceptions students hold about [topic] at [grade] level, why each is intuitive, and one diagnostic question that would reveal it.\"</em> Experienced teachers accumulate this knowledge over a decade of marking. It does not make you a worse teacher to have it in thirty seconds — it makes your first lesson on an unfamiliar topic behave like your fifth. For an early-career teacher, or one teaching outside their specialism, this is the single most valuable thing in the programme."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Pick next week's most demanding lesson. Use three prompts from this module — the misconception hunt, the worked examples prompt, and the single-lesson plan — and build the lesson. Time yourself against how long it normally takes. Then write down, specifically, what you will do with the time saved, and defend that decision for the rest of the term."
    },
    "takeaways": [
      "Teachers work around 50 hours a week and spend less than half of it interacting with students",
      "Brisbane Catholic Education measured up to nine hours per week saved; Broward measured over two",
      "The difference between two hours and nine is training and workflow redesign, not software",
      "Sort every task: delegate freely, delegate with mandatory review, or never delegate",
      "Never type identifiable student data into a public AI tool — describe the situation generically",
      "The misconception hunt makes a first lesson behave like a fifth",
      "Time saved that is not deliberately reassigned is absorbed within weeks and proves nothing"
    ],
    "quiz": [
      {
        "q": "Brisbane Catholic Education and Broward County deployed the same product but measured very different time savings (up to nine hours versus just over two). This indicates that:",
        "opts": [
          "Australian teachers work harder",
          "The measurement methods were invalid",
          "One system exaggerated its results",
          "The determining factor is training and workflow redesign, not the software"
        ],
        "a": 3,
        "fb": "A licence alone buys very little. The difference between the two figures is professional learning and deliberate redesign of how the work is done."
      },
      {
        "q": "Which task falls into the 'never delegate' category?",
        "opts": [
          "A safeguarding or pastoral judgement about a specific child",
          "Generating practice questions",
          "Summarising a policy document",
          "Drafting a scheme of work"
        ],
        "a": 0,
        "fb": "Final grades, safeguarding, placement and discipline decisions all require contextual judgement AI does not possess and cannot be accountable for."
      },
      {
        "q": "A teacher wants AI's help with a struggling student. The correct approach is to:",
        "opts": [
          "Type the student's name and full background into the tool for better personalisation",
          "Describe the situation generically without identifiable details, then add specifics yourself",
          "Ask the student to enter their own details",
          "Avoid using AI for any student-related task"
        ],
        "a": 1,
        "fb": "Generic description costs nothing, produces equally useful output, and protects both the child and the teacher."
      },
      {
        "q": "The US Department of Education attaches which condition to AI-driven workload reduction?",
        "opts": [
          "That it must be approved by parents",
          "That only senior teachers should use it",
          "That recovered time should be rededicated toward more meaningful work rather than simply absorbed",
          "That it must save at least five hours"
        ],
        "a": 2,
        "fb": "Unreassigned time is absorbed within weeks, leaving the teacher equally tired with an extra tool to maintain and no evidence of benefit."
      },
      {
        "q": "The 'misconception hunt' prompt is valuable primarily because:",
        "opts": [
          "It saves photocopying",
          "It works without electricity",
          "It generates more questions than a textbook",
          "It supplies in seconds the diagnostic knowledge experienced teachers accumulate over years of marking"
        ],
        "a": 3,
        "fb": "It makes a first lesson on an unfamiliar topic behave like a fifth — especially valuable for early-career teachers or those teaching outside their specialism."
      },
      {
        "q": "IDC recommends that AI-enabled workload reduction should be used to shift the teacher's role toward:",
        "opts": [
          "Facilitation and relationship building — individualised support and meaningful student relationships",
          "Content delivery at greater speed",
          "Administrative supervision",
          "Technology management"
        ],
        "a": 0,
        "fb": "The stated aim is 'getting back to real teaching' rather than being overburdened by paperwork."
      }
    ]
  },
  {
    "id": "e4",
    "tag": "Module 4",
    "time": "55 min",
    "title": "Planning, Differentiating and Resourcing",
    "summary": "Reaching every student in a class of fifty",
    "objectives": [
      "Use AI to differentiate a single resource across a wide ability range",
      "Adapt materials for multilingual learners and students with additional needs",
      "Apply Universal Design for Learning principles with AI support",
      "Build resources that work in low-resource classrooms without projectors or devices",
      "Understand the adaptivity that intelligent tutoring systems offer, and its limits",
      "Avoid the differentiation traps that widen rather than close gaps"
    ],
    "sections": [
      {
        "h": "The problem AI is genuinely well suited to",
        "html": "\n        <p>Differentiation is the thing every teacher is told to do and almost no teacher has time to do properly. In a class of fifty with a five-year spread of reading ages, several students learning in their second or third language, and two or three with unidentified additional needs, producing three versions of every resource is not a workload problem — it is an impossibility.</p>\n        <p>This is the clearest case in the whole programme where AI does something that was previously out of reach rather than merely faster. <strong>Producing a text at three reading levels, or a task in four versions, takes minutes instead of hours.</strong> The US Department of Education identifies adaptivity as \"a key way in which technology can improve learning\" — improving a resource's ability to meet students where they are, build on their strengths, and grow their knowledge.</p>"
      },
      {
        "h": "Differentiating a single text",
        "html": "\n        <p>The core move, with the prompts:</p>\n        <ul class=\"body\">\n          <li><strong>Reading level.</strong> <em>\"Rewrite this passage at three levels: (a) two years below grade level with simpler sentence structure and vocabulary, (b) at grade level, (c) extended with more demanding vocabulary and one additional idea. Keep all three factually identical and the same length so they are not visibly different in class.\"</em> That last instruction matters more than it looks — a visibly shorter or simpler sheet is a public label.</li>\n          <li><strong>Second-language support.</strong> <em>\"Produce a glossary of the 12 words in this text most likely to block comprehension for a student learning in English as a second language. Give a one-line definition in simple English and a Nepali equivalent.\"</em></li>\n          <li><strong>Scaffolded task versions.</strong> <em>\"Take this task and produce four versions: heavily scaffolded with sentence starters and a worked model; moderately scaffolded with prompts only; unscaffolded; and an extension that requires synthesis across two topics. All four must assess the same objective.\"</em></li>\n          <li><strong>Concrete to abstract.</strong> <em>\"Give me three ways to introduce [concept] — one fully concrete using objects available in a rural Nepali classroom, one pictorial, one abstract — and tell me what the student must understand before moving from each to the next.\"</em></li>\n        </ul>"
      },
      {
        "h": "Universal Design for Learning",
        "html": "\n        <p>The Department of Education's report names Universal Design for Learning (UDL) as one of the frameworks AI-supported adaptivity should be built on. UDL asks you to provide multiple means of <strong>engagement</strong> (the why of learning), <strong>representation</strong> (the what) and <strong>action and expression</strong> (the how).</p>\n        <p>AI makes UDL affordable for the first time in an ordinary classroom:</p>\n        <ul class=\"body\">\n          <li><strong>Multiple representations.</strong> <em>\"Explain [concept] four ways: as a short narrative, as a diagram description I can draw on the board, as a real-world analogy from daily life in Nepal, and as a step-by-step procedure.\"</em></li>\n          <li><strong>Multiple means of expression.</strong> <em>\"Give me five ways a student could demonstrate mastery of [objective] that are not a written essay — including one oral, one visual, one practical and one collaborative — with a common rubric that applies fairly across all five.\"</em></li>\n          <li><strong>Multiple entry points to engagement.</strong> <em>\"Suggest three opening questions for [topic] that connect to the everyday experience of a 14-year-old in a small town, and would provoke disagreement.\"</em></li>\n        </ul>"
      },
      {
        "h": "Students with additional needs",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Dyslexia and reading difficulty.</strong> <em>\"Reformat this worksheet for a student with dyslexia: shorter sentences, one instruction per line, no dense blocks, key terms defined at first use, generous spacing.\"</em></li>\n          <li><strong>Attention difficulties.</strong> <em>\"Break this 40-minute task into five separately completable chunks, each with its own success criterion, so a student who loses focus can re-enter without starting over.\"</em></li>\n          <li><strong>Anxiety and low confidence.</strong> <em>\"Rewrite these six questions so that each begins with something the student can almost certainly do, before increasing demand.\"</em></li>\n          <li><strong>Gifted and rapidly-finishing students.</strong> <em>\"Give me three genuine extension tasks for [topic] that deepen rather than merely add more of the same — each requiring synthesis, evaluation or transfer to an unfamiliar context.\"</em></li>\n        </ul>\n        <div class=\"callout warn\"><h4>The limit you must respect</h4><p style=\"margin:0\">AI can adapt <strong>materials</strong>. It cannot diagnose a learning difficulty, design a formal support plan, or replace specialist assessment — and it will confidently pretend otherwise if asked. Adapting a worksheet for a student you know has dyslexia is good practice. Asking a chatbot whether a student <em>has</em> dyslexia is not, and typing that student's details in to find out compounds the error.</p></div>"
      },
      {
        "h": "Low-resource and low-technology classrooms",
        "html": "\n        <p>Much AI-in-education material silently assumes a device per student, reliable electricity and fast internet. Most classrooms in Nepal and comparable systems have none of these, and this does not disqualify them — it changes where the tool sits.</p>\n        <p><strong>The most important reframing in this module: the AI can be entirely on the teacher's side of the classroom.</strong> A teacher with a phone and intermittent connectivity, preparing at home, can bring in printed differentiated worksheets, worked examples on the board and a bank of oral questions. Every student benefits and not one of them touches a device.</p>\n        <ul class=\"body\">\n          <li><em>\"Design this activity for a classroom with no electricity, no projector and no student devices. Everything must work with a blackboard, chalk and printed sheets.\"</em></li>\n          <li><em>\"Give me 15 oral questions on [topic] I can ask around a class of 50, sequenced so that early questions build the vocabulary needed for later ones.\"</em></li>\n          <li><em>\"Design a group task for 50 students in fixed rows who cannot move furniture.\"</em></li>\n          <li><em>\"Adapt this practical experiment to use only materials available in a Nepali market for under 500 rupees.\"</em></li>\n        </ul>"
      },
      {
        "h": "Adaptive systems and intelligent tutoring",
        "html": "\n        <p>Beyond your own resource-making sits a category of software that adapts automatically to each student: intelligent tutoring systems. The Department of Education's report treats these as the clearest established example of AI models in education, descending from cognitive-science-based systems for mathematics problem solving.</p>\n        <p>What they do well is narrow and real: in well-structured domains — arithmetic, algebra, grammar, vocabulary — they diagnose the specific step a student is failing on and supply targeted practice, indefinitely and without judgement.</p>\n        <p>What you must ask before adopting one:</p>\n        <ul class=\"body\">\n          <li><strong>Whose curriculum is it built on?</strong> A system aligned to a foreign syllabus will teach confidently misaligned content.</li>\n          <li><strong>What does it do when a student is stuck?</strong> Escalating hints that eventually give the answer teach helplessness.</li>\n          <li><strong>Can the teacher see and override it?</strong> The Department's recommendation is explicit: AI in education should be <strong>inspectable, explainable and overridable</strong>.</li>\n          <li><strong>Does it adapt pace in a way that could widen gaps?</strong> The report's specific warning is that if a system speeds the pace for some students and slows it for others on the basis of incomplete data or biased assumptions, <strong>achievement gaps could widen</strong>. This is developed in Module 9.</li>\n        </ul>"
      },
      {
        "h": "The differentiation traps",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Permanent ability labelling.</strong> Differentiation should be responsive to a task, not a caste. Generating three fixed versions and assigning each child permanently to one is a way of guaranteeing the gap.</li>\n          <li><strong>Differentiating the demand instead of the support.</strong> The lower-attaining student should get more scaffolding toward the same objective, not a lesser objective. AI makes it very easy to do the wrong one.</li>\n          <li><strong>Visible difference.</strong> If the sheets look different, every child in the room knows. Match length and formatting.</li>\n          <li><strong>Volume as differentiation.</strong> More questions is not extension. Extension requires synthesis, evaluation or transfer.</li>\n          <li><strong>Generating without reading.</strong> A differentiated pack you have not checked may contain a factual error propagated across all four versions.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: differentiate the support, not the objective",
      "text": "When you write the prompt, state the objective once and ask for varied support toward it: <em>\"All four versions must assess the same objective — [state it]. Vary only the scaffolding.\"</em> Without that instruction, AI will quietly lower the demand for the weaker versions, because that is the most common pattern in its training data. One sentence in the prompt prevents you from institutionalising low expectations at scale — which is the single largest risk of AI-assisted differentiation."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take one text or task you will teach in the next fortnight. Produce four scaffolded versions holding the objective constant, plus a 12-word glossary for second-language learners, plus three genuine extension tasks requiring synthesis rather than volume. Teach it. Note which version each student chose or was given, and whether the visible-difference problem arose."
    },
    "takeaways": [
      "Differentiation is the clearest case where AI does something previously out of reach, not merely faster",
      "Hold the objective constant and vary only the scaffolding — state this explicitly in the prompt",
      "Match length and formatting across versions, or the sheets themselves become a public label",
      "AI adapts materials; it cannot diagnose a learning difficulty and will pretend otherwise if asked",
      "In low-resource classrooms the AI sits on the teacher's side — printed sheets, board work, oral questions",
      "Adaptive systems must be inspectable, explainable and overridable by the teacher",
      "Pace-adaptation built on incomplete data or biased assumptions can widen achievement gaps"
    ],
    "quiz": [
      {
        "q": "When generating differentiated versions of a task, the instruction most important to include is:",
        "opts": [
          "'Use simpler vocabulary throughout'",
          "'All versions must assess the same objective; vary only the scaffolding'",
          "'Add more questions to the extension'",
          "'Make the easier version shorter'"
        ],
        "a": 1,
        "fb": "Without it, AI quietly lowers the demand for weaker versions — institutionalising low expectations at scale."
      },
      {
        "q": "Why should differentiated worksheets match in length and formatting?",
        "opts": [
          "To simplify photocopying",
          "Because regulations require it",
          "Because visibly different sheets publicly label the students who receive them",
          "To save paper"
        ],
        "a": 2,
        "fb": "Every child in the room can see which sheet is the 'easy' one. Matching format preserves dignity without reducing support."
      },
      {
        "q": "A teacher asks a chatbot whether a particular student has dyslexia. This is:",
        "opts": [
          "Acceptable if the parents consent",
          "An efficient use of AI for early identification",
          "Standard practice in adaptive learning",
          "Inappropriate — AI cannot diagnose, and entering the student's details compounds the error"
        ],
        "a": 3,
        "fb": "Adapting materials for a student you know has dyslexia is good practice. Diagnosis requires specialist assessment, and AI will confidently pretend otherwise."
      },
      {
        "q": "The US Department of Education recommends that AI systems used in education be:",
        "opts": [
          "Inspectable, explainable and overridable by educators",
          "Purchased only from large vendors",
          "Restricted to secondary schools",
          "Fully autonomous to reduce teacher workload"
        ],
        "a": 0,
        "fb": "Teachers must be able to see what the system is doing, understand why, and override it when their judgement differs."
      },
      {
        "q": "In a classroom with no electricity, projector or student devices, AI is:",
        "opts": [
          "Useful only if the school buys tablets",
          "Still highly useful, sitting entirely on the teacher's side — printed differentiated sheets, board work and oral question banks",
          "Of no practical use",
          "Only useful for administration"
        ],
        "a": 1,
        "fb": "A teacher preparing at home with a phone can bring the whole benefit into a classroom where no student touches a device."
      },
      {
        "q": "Which is a genuine extension task rather than a differentiation trap?",
        "opts": [
          "A neater version of the worksheet",
          "Twenty more questions of the same type",
          "A task requiring synthesis across two topics or transfer to an unfamiliar context",
          "The same task with a longer time limit"
        ],
        "a": 2,
        "fb": "Volume is not extension. Extension requires synthesis, evaluation or transfer."
      }
    ]
  },
  {
    "id": "e5",
    "tag": "Module 5",
    "time": "55 min",
    "title": "Feedback, Marking and the Limits of Automated Assessment",
    "summary": "Where AI helps most — and where it must never be left alone",
    "objectives": [
      "Use AI to produce feedback that opens a dialogue rather than closing one",
      "Understand what automated essay scoring can and cannot measure",
      "Recognise and mitigate bias in automated assessment",
      "Design rubrics that make AI-assisted marking defensible",
      "Keep the teacher meaningfully in the loop rather than nominally",
      "Build a marking workflow that reduces load without surrendering judgement"
    ],
    "sections": [
      {
        "h": "The tension at the centre of this module",
        "html": "\n        <p>Marking is the largest single component of teacher workload and the one teachers most want to delegate. It is also the activity where delegation does the most damage, because <strong>feedback is not administration — it is teaching.</strong></p>\n        <p>Module 2 established the principle: the best feedback creates a dialogue, turning assessment into a continuation of learning rather than merely its measurement. An AI system that returns a score and three generic comments has measured. It has not taught. Resolving this tension is what this module is for, and the resolution is not \"use AI for marking\" or \"never use AI for marking\" — it is a precise division of labour.</p>"
      },
      {
        "h": "What automated scoring actually does",
        "html": "\n        <p>The US Department of Education's report treats automated essay scoring as a well-established example worth understanding honestly. Such systems have existed for decades and work by learning statistical associations between features of student writing and the scores human markers previously gave.</p>\n        <p>That description contains the limitation. <strong>The system is not reading for meaning. It is predicting what a human marker would have said</strong> based on surface features that historically correlated with quality — sentence length, vocabulary range, structural markers, organisational signals.</p>\n        <p>The practical consequences:</p>\n        <ul class=\"body\">\n          <li><strong>It is reasonably good at conventions</strong> — grammar, spelling, structure, paragraphing, register. These are genuinely surface features and it detects them well.</li>\n          <li><strong>It is poor at argument quality.</strong> A fluent, well-structured essay that is entirely wrong will often score well. An awkwardly written essay containing an original insight will often score badly.</li>\n          <li><strong>It cannot recognise what it has not seen.</strong> The unusual answer, the culturally specific example, the student who has understood something the marking scheme did not anticipate — all get penalised.</li>\n          <li><strong>It rewards length and elaboration</strong> because those historically correlated with effort. Students learn this quickly, and it teaches them to pad.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The consequence for your students</h4><p style=\"margin:0\">If students believe an algorithm is scoring their work, they will optimise for the algorithm. They will write longer, use more connectives, and deploy sophisticated vocabulary they do not control — because those things move the number. <strong>You will have taught them to produce the appearance of quality instead of quality.</strong> This is the strongest single argument for keeping the final judgement visibly human.</p></div>"
      },
      {
        "h": "Bias in automated assessment",
        "html": "\n        <p>The Department of Education's recommendation here is explicit: <strong>harness assessment expertise to reduce bias.</strong> The report warns of \"algorithmic discrimination\" — systematic unfairness in the opportunities or resources recommended to some populations of students — and offers concrete examples: a voice recognition system that works less well with regional dialects; an exam monitoring system that unfairly identifies some groups of students for disciplinary action.</p>\n        <p>In assessment specifically, bias enters through several doors:</p>\n        <ul class=\"body\">\n          <li><strong>Language background.</strong> Systems trained mainly on first-language English writing systematically under-score competent second-language writers whose grammar is non-standard but whose reasoning is sound. In a Nepali classroom this is not a marginal concern — it is the majority case.</li>\n          <li><strong>Dialect and register.</strong> Writing that is regionally natural but not standard-academic is penalised as error.</li>\n          <li><strong>Cultural reference.</strong> An example drawn from a local festival, an agricultural practice or a religious tradition may be scored as irrelevant because the pattern is unfamiliar.</li>\n          <li><strong>Name and identity signals.</strong> Where any identifying information reaches the system, historical patterns can attach to it.</li>\n        </ul>\n        <p>The mitigation is procedural and cheap: <strong>never let an automated score stand as a final grade; sample-check across groups; and specifically compare outcomes for your second-language learners against your judgement.</strong> If the system is systematically harsher on them, you have found real bias in ten minutes of checking.</p>"
      },
      {
        "h": "The division of labour that works",
        "html": "\n        <p>Here is the practical resolution, and it is the core of the module.</p>\n        <p><strong>Let AI do the first pass on the mechanical layer. Keep the judgement, the grade and the relationship.</strong></p>\n        <ul class=\"body\">\n          <li><strong>AI does well:</strong> flagging surface errors, checking against a structural checklist, identifying which rubric criteria appear unaddressed, generating a bank of feedback phrases you can select from, spotting that fourteen students in the class made the same mistake, summarising class-wide patterns you would otherwise miss.</li>\n          <li><strong>You do:</strong> reading for meaning, recognising the unusual insight, knowing that this particular student has improved enormously even if the piece is still weak, deciding the grade, choosing the one comment that will actually move this child forward.</li>\n        </ul>\n        <p>The highest-value application is not marking individual scripts at all — it is <strong>class-level pattern analysis</strong>. Paste twenty anonymised responses and ask: <em>\"What are the three most common conceptual errors in this set, ranked by frequency? For each, give the likely misconception behind it and one re-teaching activity.\"</em> That is thirty seconds of work producing something a teacher rarely has time to do properly, and it changes what you teach next lesson.</p>"
      },
      {
        "h": "Prompts for feedback that teaches",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Dialogue feedback.</strong> <em>\"Here is a Grade 10 student's paragraph and the rubric. Give feedback in this form: one specific thing done well with evidence quoted from the text, one specific area to improve with a concrete example of how, and one question that makes the student think rather than telling them the answer. No grade. Under 80 words.\"</em></li>\n          <li><strong>Class pattern analysis.</strong> <em>\"Here are 25 anonymised student answers to [question]. Identify the three most common errors ranked by frequency, the misconception behind each, and one five-minute re-teaching activity for each.\"</em></li>\n          <li><strong>Rubric stress-test.</strong> <em>\"Here is my rubric. Identify any criteria that are vague, overlapping, or that a student could not self-assess against. Rewrite the weakest three in student-facing language.\"</em></li>\n          <li><strong>Feedback bank.</strong> <em>\"Generate 15 feedback comments for [skill] at Grade [8] — five for work below expectation, five at, five above. Each must name a specific next step, not a judgement. I will select and adapt.\"</em></li>\n          <li><strong>Self-assessment scaffold.</strong> <em>\"Turn this rubric into six student-facing questions a Grade 9 student could ask of their own draft before submitting.\"</em> — This is among the most valuable uses in the module, because it moves work from your marking pile to their metacognition.</li>\n        </ul>"
      },
      {
        "h": "Keeping the human meaningfully in the loop",
        "html": "\n        <p>The Department of Education's first recommendation is to emphasise humans in the loop — people remaining part of the process of noticing patterns and assigning meaning to them, with teachers \"at the helm of major instructional decisions.\"</p>\n        <p>The failure mode to guard against is <strong>nominal</strong> rather than absent oversight: a teacher who approves every AI-generated grade because it is usually about right, under time pressure, at eleven at night. The oversight exists on paper and does nothing.</p>\n        <p>Three practical tests of genuine oversight:</p>\n        <ol class=\"body\">\n          <li><strong>Do you ever disagree?</strong> If you have never changed an AI-suggested comment or score, you are not reviewing — you are rubber-stamping. Track it honestly.</li>\n          <li><strong>Do you have the time to disagree?</strong> Oversight that is not resourced is not oversight. If the workflow only works when you accept everything, it is designed wrongly.</li>\n          <li><strong>Would you defend it to the parent?</strong> Every comment that leaves your hands must be one you would stand behind in a meeting. If you would not, do not send it.</li>\n        </ol>"
      },
      {
        "h": "A marking workflow that reduces load honestly",
        "html": "\n        <ol class=\"body\">\n          <li><strong>Before marking:</strong> stress-test the rubric with AI, and convert it into student-facing self-check questions. Give those to students <em>before</em> they submit. This measurably reduces the volume of poor work reaching you.</li>\n          <li><strong>First pass, whole class:</strong> anonymised pattern analysis. Decide what you will re-teach before you mark a single script.</li>\n          <li><strong>Second pass, individual:</strong> mark yourself, but with an AI-generated feedback bank open. Selecting and adapting a comment is far faster than composing one, and the quality is more consistent across a set of fifty.</li>\n          <li><strong>Grades:</strong> yours alone. Always.</li>\n          <li><strong>Follow-up:</strong> the re-teaching activity generated in step 2 becomes next lesson's starter. The loop closes, which is the point of formative assessment and the part most often lost.</li>\n        </ol>\n        <p>Teachers who adopt this report the load falling not because the marking is automated but because <strong>the rubric was better, the students self-corrected more before submitting, and the re-teaching was targeted rather than guessed.</strong></p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: move the work upstream",
      "text": "The highest-leverage change in this module happens before students submit, not after. Convert your rubric into six student-facing self-check questions and require students to answer them on the front of their work. The quality of what arrives improves, the volume of avoidable error falls, and — the real prize — the students have practised metacognition on their own writing. You have reduced your marking by improving their thinking, which is the only workload reduction in teaching that is also a pedagogical gain."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take a rubric you already use. Stress-test it with AI for vagueness and overlap, rewrite the three weakest criteria, then convert the whole thing into student-facing self-check questions. Use it with your next assessment. Separately, run an anonymised class-pattern analysis on a set of responses and compare what it found to what you expected — note anything you would have missed."
    },
    "takeaways": [
      "Feedback is teaching, not administration, which is why delegation does the most damage here",
      "Automated scoring predicts what a human marker would have said from surface features; it does not read for meaning",
      "Students who believe an algorithm is scoring will optimise for it and learn to produce the appearance of quality",
      "Language-background bias is not marginal in a second-language classroom — it is the majority case",
      "The highest-value use is class-level pattern analysis, not marking individual scripts",
      "If you never disagree with the AI, you are rubber-stamping rather than reviewing",
      "Move the work upstream: student-facing self-check questions reduce marking by improving thinking"
    ],
    "quiz": [
      {
        "q": "Automated essay scoring systems work primarily by:",
        "opts": [
          "Reading the essay for meaning and argument quality",
          "Checking facts against reference sources",
          "Comparing the essay to a database of model answers",
          "Predicting what a human marker would have said, based on surface features that historically correlated with quality"
        ],
        "a": 3,
        "fb": "This explains why a fluent but wholly incorrect essay often scores well, while an awkward essay containing an original insight often scores badly."
      },
      {
        "q": "In a classroom where most students write in their second language, automated scoring bias is:",
        "opts": [
          "The majority case, since such systems systematically under-score competent second-language writers",
          "Eliminated by modern models",
          "Only relevant to spoken assessment",
          "A marginal concern affecting few students"
        ],
        "a": 0,
        "fb": "Non-standard grammar with sound reasoning is penalised as error. Sample-checking outcomes for these students against your own judgement exposes it quickly."
      },
      {
        "q": "The highest-value marking application of AI for a teacher is:",
        "opts": [
          "Ranking students against one another",
          "Anonymised class-level pattern analysis that identifies common errors and their underlying misconceptions",
          "Detecting whether students used AI",
          "Grading individual scripts to save time"
        ],
        "a": 1,
        "fb": "Thirty seconds of work producing something teachers rarely have time to do properly — and it changes what you teach next lesson."
      },
      {
        "q": "A teacher has approved every AI-suggested comment for a whole term without changing one. This indicates:",
        "opts": [
          "Efficient workflow design",
          "That the rubric is well written",
          "Oversight has become nominal — rubber-stamping rather than reviewing",
          "The system is performing excellently"
        ],
        "a": 2,
        "fb": "Genuine oversight requires that you sometimes disagree, that you have time to disagree, and that you would defend every comment to a parent."
      },
      {
        "q": "Converting a rubric into student-facing self-check questions before submission is valuable because:",
        "opts": [
          "It allows AI to mark more accurately",
          "It satisfies inspection requirements",
          "It shortens the assignment",
          "It reduces marking load by improving student thinking — a workload gain that is also a pedagogical gain"
        ],
        "a": 3,
        "fb": "Quality improves, avoidable error falls, and students practise metacognition on their own writing."
      },
      {
        "q": "Who should decide the final grade on a piece of student work?",
        "opts": [
          "The teacher, always",
          "Whichever is faster under time pressure",
          "The AI system, for consistency",
          "The school's software policy"
        ],
        "a": 0,
        "fb": "AI may support the mechanical layer. Judgement, grade and relationship remain with the teacher."
      }
    ]
  },
  {
    "id": "e6",
    "tag": "Module 6",
    "time": "55 min",
    "title": "Academic Integrity: Beyond the Arms Race",
    "summary": "Why detection fails, and what actually works instead",
    "objectives": [
      "Understand why AI detection tools are unreliable and can be discriminatory",
      "Recognise why a surveillance-led response damages learning",
      "Implement an AI maturity matrix that makes expectations unambiguous",
      "Redesign tasks so that integrity is built in rather than policed",
      "Hold an honest conversation with students about AI use",
      "Write a workable academic integrity policy for AI"
    ],
    "sections": [
      {
        "h": "The crisis is real — and the usual response makes it worse",
        "html": "\n        <p>It is worth acknowledging the depth of the problem before proposing anything. A May 2025 feature in <em>New York Magazine</em>, headlined \"Everyone Is Cheating Their Way Through College,\" captured the bleakness: the speed with which AI proved able to do college-level work exposed pre-existing weaknesses in assessment — and multiple platforms now offer tools to leave AI-generated feedback on students' essays, raising the possibility that AI systems are evaluating AI-generated papers, \"reducing the entire academic exercise to a conversation between two robots.\"</p>\n        <p>The institutional reflex has been defensive: proctored exams, AI-detection software, handwritten requirements. Chatfield acknowledges that in the immediate term some return to basics is understandable. But he is unambiguous that as a strategy this fails, and it is worth understanding exactly why, because most schools are currently choosing it.</p>"
      },
      {
        "h": "Why detection does not work",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Practically, it is unsustainable.</strong> Detection tools are, in Chatfield's assessment, <em>\"at best unreliable and at worst actively discriminatory.\"</em> They produce false positives on genuine student work and false negatives on lightly edited AI text. Every improvement in the models degrades the detectors.</li>\n          <li><strong>It discriminates.</strong> The documented pattern is that detectors disproportionately flag <strong>second-language writers</strong>, whose more formulaic sentence construction resembles machine text. In a Nepali or comparable classroom, a detection-led policy will systematically accuse your most vulnerable students.</li>\n          <li><strong>Pedagogically it is counterproductive.</strong> It frames the relationship between learners and institution as conflict rather than collaboration — which, as Module 2 established, attacks the emotional safety that learning requires.</li>\n          <li><strong>It fails on its own terms.</strong> Those determined to cheat will find a way. Meanwhile the majority — who want to learn — are denied the guidance they actually need.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The professional judgement this requires of you</h4><p style=\"margin:0\">A detection score is <strong>not evidence</strong>. It is a probability estimate from an unreliable instrument. Never accuse a student on the basis of a detector alone, never let a number substitute for a conversation, and be aware that if your school acts on detector output at scale, it will produce wrongful accusations — disproportionately against second-language learners and students who write in a formal register.</p></div>"
      },
      {
        "h": "The deeper diagnosis",
        "html": "\n        <p>Chatfield makes an observation that reframes the whole problem, and it is uncomfortable:</p>\n        <p style=\"padding-left:18px;border-left:3px solid rgba(184,137,43,.6);font-style:italic\">\"If a student uses AI to complete an assignment, the problem is not just the tool. It is also that the assignment may no longer measure those things it was designed to measure.\"</p>\n        <p>He goes further. A student who can carefully prompt an AI to output an eloquent, appropriate analysis is demonstrating <em>certain</em> capabilities: crafting clear requirements, understanding the topic well enough to evaluate outputs, iterating and improving in the light of these. These are not the same skills as writing a traditional essay — but nor are they meaningless.</p>\n        <p>The philosopher Luciano Floridi named this mode <strong>\"distant writing\"</strong>: a hybrid composition in which the human becomes less an author than a designer, someone who \"sets requirements\" rather than composing directly. Floridi describes it as \"a significant evolution in authorship, not replacing but expanding human creativity within a design paradigm.\"</p>\n        <p>None of this means the traditional essay should be abandoned. It means you must decide, explicitly, <strong>which skill each task is assessing</strong> — and then design accordingly. That decision is what the rest of this module operationalises.</p>"
      },
      {
        "h": "The AI maturity matrix — the single most useful tool in this module",
        "html": "\n        <p>Brisbane Catholic Education's approach, documented by IDC, is the practical answer, and it is simple enough to implement next week. They developed a <strong>maturity matrix clarifying when AI is prohibited, when it may be used for planning only, when for writing assistance, and when for feedback.</strong></p>\n        <p>Adapted for classroom use, print this and put it on every assignment:</p>\n        <ul class=\"body\">\n          <li><strong>Level 0 — No AI.</strong> This task assesses your unaided ability. Completed in class or under supervision. <em>Use when: you need to know what a student can do alone; foundational skills; anything that must be verifiable.</em></li>\n          <li><strong>Level 1 — AI for planning only.</strong> You may use AI to brainstorm, structure or clarify the question. All writing is yours. Submit your AI conversation alongside. <em>Use when: the writing is the assessed skill but the blank page is a barrier.</em></li>\n          <li><strong>Level 2 — AI for assistance.</strong> You may use AI to check grammar, suggest vocabulary, or improve a draft you wrote. Highlight what changed and explain why you accepted or rejected each suggestion. <em>Use when: you are teaching revision and editing.</em></li>\n          <li><strong>Level 3 — AI as collaborator.</strong> You may use AI throughout. You are assessed on the quality of your prompts, your evaluation of its output, what you rejected and why, and the final result. Submit the full log. <em>Use when: the assessed skill is direction, judgement and critical evaluation.</em></li>\n        </ul>\n        <p>Two things make this work. First, <strong>every task carries a visible level</strong>, so no student can claim confusion. Second, <strong>Levels 1–3 require disclosure of the conversation</strong>, which converts hidden use into visible, discussable, teachable use — and is far more informative to you than any detector.</p>"
      },
      {
        "h": "Designing tasks where integrity is built in",
        "html": "\n        <p>Better than policing is designing tasks AI cannot complete on the student's behalf. Practical moves, all of which work without technology:</p>\n        <ul class=\"body\">\n          <li><strong>Anchor to the specific and local.</strong> \"Analyse the water supply problem in our ward using the data we collected on Tuesday.\" AI has never seen your data.</li>\n          <li><strong>Anchor to the personal.</strong> \"Connect this concept to something that happened in your own family or community, and explain the limits of the comparison.\"</li>\n          <li><strong>Anchor to the class's shared experience.</strong> \"Referring to the argument Bishal made in Wednesday's discussion, explain where you agree and where you would push back.\"</li>\n          <li><strong>Assess the process.</strong> Require drafts, notes, a planning sheet, a reflection on what changed between versions.</li>\n          <li><strong>Require the student to critique AI output.</strong> \"Here is an AI-generated answer to this question. Identify three weaknesses and rewrite the weakest paragraph.\" Now AI use is the assignment.</li>\n          <li><strong>Add an oral component.</strong> Two minutes of questioning about a submitted piece tells you more than any detector — and, as Module 7 develops, is a genuine skill worth developing in its own right rather than a surveillance device.</li>\n        </ul>"
      },
      {
        "h": "The conversation to have with your students",
        "html": "\n        <p>Have it early, once, and honestly. The elements that make it land:</p>\n        <ol class=\"body\">\n          <li><strong>Acknowledge that they are already using it.</strong> Pretending otherwise destroys your credibility in the first thirty seconds.</li>\n          <li><strong>Explain the two-question test</strong> from Module 1 in their terms: <em>\"When I ask you to write this, the writing is the exercise. Getting a machine to do your push-ups does not make you stronger.\"</em> Students find this argument persuasive because it is true and because it treats them as capable of understanding their own interest.</li>\n          <li><strong>Be explicit that you will teach them to use it.</strong> They will need this skill; you are not withholding it, you are sequencing it.</li>\n          <li><strong>Set out the maturity matrix</strong> and commit to marking every task with a level.</li>\n          <li><strong>State the consequence honestly</strong> — and state clearly that you will not accuse anyone on the basis of software. Say that you will ask them about their work instead. This does more for integrity than any threat, because it makes the system feel fair.</li>\n        </ol>"
      },
      {
        "h": "A workable policy",
        "html": "\n        <p>Six clauses. One page. Written for students and parents, not lawyers.</p>\n        <ol class=\"body\">\n          <li><strong>Every assessed task states its AI level (0–3).</strong> If a task carries no level, ask before assuming.</li>\n          <li><strong>Where AI is permitted, disclosure is required.</strong> Submit the conversation or a short statement of what you used it for. Undisclosed use of permitted AI is the integrity breach — not the use itself.</li>\n          <li><strong>You are responsible for everything you submit</strong>, including errors AI introduced. \"The AI said so\" is not a defence.</li>\n          <li><strong>Never submit AI text as your own words</strong> at Levels 0–2.</li>\n          <li><strong>No accusation rests on detection software.</strong> Concerns are addressed through a conversation about the work.</li>\n          <li><strong>Ask when unsure.</strong> Asking is always safe and never penalised.</li>\n        </ol>\n        <p>Clause 5 is the one that will be argued about in your staffroom. Hold it. A policy that permits accusation on the basis of an unreliable, discriminatory instrument will eventually produce a wrongful accusation against a real child — and the damage from that will exceed anything the policy was designed to prevent.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: put the level on the sheet",
      "text": "The single change with the largest immediate effect costs nothing: print the AI level on every assignment sheet, in a box, at the top. Most student \"cheating\" in the first year of a technology like this is genuine ambiguity — a student who used AI for planning, believed that was fine, and never mentioned it. Removing the ambiguity removes most of the problem, and what remains is a much smaller number of deliberate cases you can address individually rather than through a policy of general suspicion."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take the next four tasks you will set. Assign each an AI level (0–3) and write the level on the sheet with one line explaining why that level fits what the task assesses. Then redesign one of them using an anchoring technique — local, personal, or class-shared — so that AI could not complete it on the student's behalf. Note how much the task improved as a task, independently of the integrity question."
    },
    "takeaways": [
      "Detection tools are unreliable at best and discriminatory at worst; a score is not evidence",
      "Detectors disproportionately flag second-language writers — your most vulnerable students",
      "Surveillance frames learning as conflict and attacks the emotional safety learning requires",
      "If AI can complete the assignment, the assignment may no longer measure what it was designed to measure",
      "The AI maturity matrix (Levels 0–3) removes ambiguity and converts hidden use into teachable use",
      "Anchor tasks to the local, the personal and the class's shared experience",
      "Never let an accusation rest on detection software — have a conversation about the work instead"
    ],
    "quiz": [
      {
        "q": "AI detection tools are described in the research as unreliable and potentially discriminatory. The group most likely to be wrongly flagged is:",
        "opts": [
          "High-attaining students",
          "Second-language writers, whose more formulaic construction resembles machine text",
          "Students using handwriting",
          "Students who write very short answers"
        ],
        "a": 1,
        "fb": "In a second-language classroom, a detection-led policy will systematically accuse your most vulnerable students."
      },
      {
        "q": "Chatfield argues that when a student successfully uses AI to complete an assignment, the deeper problem is that:",
        "opts": [
          "The student lacks moral character",
          "The task was too long",
          "The assignment may no longer measure what it was designed to measure",
          "The school's software is outdated"
        ],
        "a": 2,
        "fb": "This reframes integrity as an assessment design question rather than purely a disciplinary one."
      },
      {
        "q": "In the AI maturity matrix, Level 3 ('AI as collaborator') assesses:",
        "opts": [
          "Nothing meaningful",
          "The student's unaided writing ability",
          "Only the final product's grammar",
          "The quality of the student's prompts, evaluation of output, and what they rejected and why"
        ],
        "a": 3,
        "fb": "When the assessed skill is direction, judgement and critical evaluation, full AI use with a submitted log is the appropriate design."
      },
      {
        "q": "Under a well-designed AI policy, where AI use is permitted, the integrity breach is:",
        "opts": [
          "Undisclosed use — failing to declare permitted AI use",
          "Using AI at all",
          "Discussing AI with classmates",
          "Using AI for grammar checking"
        ],
        "a": 0,
        "fb": "Disclosure converts hidden use into visible, discussable, teachable use — and is far more informative than any detector."
      },
      {
        "q": "Which task design makes AI completion genuinely difficult without any technology?",
        "opts": [
          "A multiple-choice test",
          "'Analyse the water supply problem in our ward using the data we collected on Tuesday'",
          "An essay on a very obscure topic",
          "A longer essay with a stricter word count"
        ],
        "a": 1,
        "fb": "Anchoring to local, personal or class-shared material means AI has never seen the source. It also improves the task independently of integrity."
      },
      {
        "q": "Luciano Floridi's term 'distant writing' describes:",
        "opts": [
          "Writing done remotely from home",
          "Plagiarism from online sources",
          "Hybrid composition where the human sets requirements as a designer rather than composing directly",
          "Handwritten work under supervision"
        ],
        "a": 2,
        "fb": "Floridi frames it as an evolution in authorship — expanding human creativity within a design paradigm rather than replacing it."
      }
    ]
  },
  {
    "id": "e7",
    "tag": "Module 7",
    "time": "55 min",
    "title": "Redesigning Assessment for an AI World",
    "summary": "From 'What do you know?' to 'How do you think?'",
    "objectives": [
      "Understand why traditional assessment assumptions no longer hold",
      "Design process-based and portfolio assessment supported by AI",
      "Use oral and viva-style assessment as development rather than surveillance",
      "Build a bank of AI-resistant and AI-integrated task designs",
      "Apply mastery-based progression concepts to your own subject",
      "Sequence a realistic transition rather than changing everything at once"
    ],
    "sections": [
      {
        "h": "The assumption that has broken",
        "html": "\n        <p>Traditional examinations assume a world in which information is scarce and retrieval is difficult. Essays test the ability to construct arguments without assistance. Both assumptions were true for centuries and are no longer true.</p>\n        <p>Chatfield argues that transforming assessment may prove AI's greatest impact within education, and the reasoning is worth following carefully. Creating assessments adequate to this challenge means focusing not only on products but on <strong>processes</strong>. This has long been an aspiration for educators; AI makes it <em>at once necessary and possible</em>. Necessary because traditional assessments can no longer measure what they once did. Possible because AI can support forms of evaluation that were previously impractical at scale.</p>\n        <p>The reframing he proposes is the organising idea of this module: assessment as <strong>conversation rather than surveillance</strong>. The underlying question moves from <em>\"What do you know?\"</em> to <em>\"How do you think?\"</em> — and, more precisely, <em>\"How are you thinking about your thinking, and about its entwining with the very different forms of intelligence AI tools possess?\"</em></p>"
      },
      {
        "h": "Process over product",
        "html": "\n        <p>The practical shift is to assess the journey, not only the destination. Concretely:</p>\n        <ul class=\"body\">\n          <li><strong>Staged submission.</strong> Plan, then annotated bibliography, then draft, then final. Each stage carries marks. A student who produces a polished final piece with no preceding stages has not completed the assessment.</li>\n          <li><strong>Annotated drafts.</strong> Require students to mark what changed between versions and why. The reasoning is the assessed object.</li>\n          <li><strong>Process logs.</strong> Where AI is permitted, the log of prompts and responses is submitted. Wharton's Ethan Mollick has student venture teams keep records of their queries alongside responses; these are handed in with the final business plan, together with reflections analysing which machine-generated ideas they modified, kept or discarded, and whether they found hallucinations or biases.</li>\n          <li><strong>Reflective commentary.</strong> A short piece explaining the choices made, the alternatives rejected, and what the student would do differently. AI can generate a reflection; it cannot generate <em>your student's</em> reflection on <em>their</em> specific process, and the difference is visible.</li>\n        </ul>\n        <p>Mollick's framing is worth noting for teachers: reviewing those student reports, he observes, \"can also give you a sense of where students are in their learning journey so that you can modify your lessons accordingly.\" The process log is not only an integrity device — it is formative data you never previously had.</p>"
      },
      {
        "h": "Portfolio assessment",
        "html": "\n        <p>Portfolio-based assessment enacts the process principle at scale. Students document their learning journey across a term or year; AI can help identify patterns and growth across a large body of work. But — and Chatfield is explicit — <strong>the business of reflection and curation remains irreducibly human.</strong></p>\n        <p>A workable portfolio structure for a school or college:</p>\n        <ol class=\"body\">\n          <li><strong>Five to eight pieces</strong> across the term, of varied type — at least one oral, one collaborative, one practical or visual.</li>\n          <li><strong>For each piece:</strong> the artefact, the process evidence, and a 100-word reflection.</li>\n          <li><strong>A closing synthesis:</strong> the student selects their strongest and weakest pieces and argues why, identifying the specific skill that improved most.</li>\n          <li><strong>Assessment:</strong> weighted toward the synthesis and the trajectory rather than any single artefact.</li>\n        </ol>\n        <p>This is more demanding to administer than a single exam and considerably more informative. It is also far harder to fake, because the fabrication would have to be sustained and coherent across months.</p>"
      },
      {
        "h": "Oral assessment — as development, not policing",
        "html": "\n        <p>Viva-style defences and discussions gain new significance precisely because written work may be AI-assisted. The critical design point, which most schools get wrong: <strong>the best implementations treat this as an opportunity for developing distinctively human skills, not as surveillance.</strong></p>\n        <p>If students experience an oral component as an interrogation to catch cheats, you have imported all the damage of the detection approach with additional anxiety. If they experience it as the place where they explain and defend their thinking — a skill that will matter in every interview and meeting of their adult lives — it becomes the most valuable part of the course.</p>\n        <p>Practical formats that work in large classes:</p>\n        <ul class=\"body\">\n          <li><strong>Two-minute defence.</strong> Every student answers two questions about their submitted work. In a class of fifty this is achievable across two lessons with the rest of the class working independently.</li>\n          <li><strong>Peer viva.</strong> Students question each other against a supplied question frame; you circulate. Preparing to question someone else requires understanding the topic thoroughly.</li>\n          <li><strong>Structured debate.</strong> Students argue a position they were assigned rather than chose, then swap. Assesses reasoning and flexibility together.</li>\n          <li><strong>Teach-back.</strong> The student explains the concept to a younger student or a peer who has not studied it. Notoriously difficult to fake and among the most reliable indicators of genuine understanding.</li>\n        </ul>\n        <p>Emerging platforms are beginning to use AI itself not as a substitute for discussion but as a <em>moderator and evaluator</em> of small-group discussion, providing individual post-discussion feedback against a rubric — an approach that makes oral assessment more tractable at scale.</p>"
      },
      {
        "h": "Mastery-based progression",
        "html": "\n        <p>The cognitive co-pilot developed by Chatfield with Dr Timo Hannay, Sage and City St George's, University of London, illustrates a further possibility. By tracking how students engage with concepts through adaptive, Socratic questioning, it <strong>sidesteps the authentication problem entirely.</strong></p>\n        <p>The logic is elegant. Progress is not about producing correct factual answers — it is about demonstrating that you can apply concepts in novel contexts and connect disparate ideas. A <strong>\"mastery gate\"</strong> in the system's instructions ensures a student cannot progress until understanding has been shown. Assessment becomes an ongoing measure of mastery integrated into each interaction, rather than a discrete event that can be outsourced.</p>\n        <p>You do not need such a system to apply the principle. In your own classroom:</p>\n        <ul class=\"body\">\n          <li>Define mastery for each unit as <strong>application in an unfamiliar context</strong>, not recall.</li>\n          <li>Use short, frequent, low-stakes checks rather than infrequent high-stakes ones.</li>\n          <li>Allow re-attempts. If mastery is the goal, the timing of arrival matters less than arrival.</li>\n          <li>Assess transfer explicitly: \"Here is a situation we have never discussed. Apply what you learned.\"</li>\n        </ul>\n        <p>Note that the prototype was well received but modestly so — twelve students across six disciplines rated it 7.6 out of 10. That is a realistic figure for an early prototype and a useful corrective to vendor claims of transformation.</p>"
      },
      {
        "h": "A bank of task designs",
        "html": "\n        <p><strong>AI-resistant</strong> (the assessed skill must be exercised unaided):</p>\n        <ul class=\"body\">\n          <li>In-class writing under supervision, with the planning done at home</li>\n          <li>Analysis of data the class collected itself</li>\n          <li>Response to a text or artefact introduced in the lesson and not published online</li>\n          <li>Critique of a specific argument made by a named classmate</li>\n          <li>Practical demonstration, performance or fieldwork</li>\n          <li>Oral defence of any submitted work</li>\n        </ul>\n        <p><strong>AI-integrated</strong> (using AI well <em>is</em> the assessed skill):</p>\n        <ul class=\"body\">\n          <li>Prompt-and-critique: generate an answer, then identify and correct its three weakest claims</li>\n          <li>Fact-check an AI-produced text against primary sources and document every error</li>\n          <li>Use AI to generate three counter-arguments to your position, then rebut the strongest</li>\n          <li>Compare two AI systems' answers to the same question and account for the differences</li>\n          <li>Build a resource with AI assistance and submit the full log with a rationale for every rejection</li>\n          <li>Design a prompt that reliably produces a high-quality output for a stated purpose, and justify each element of it</li>\n        </ul>"
      },
      {
        "h": "Sequencing a realistic transition",
        "html": "\n        <p>Do not redesign everything at once. A realistic three-term sequence:</p>\n        <ol class=\"body\">\n          <li><strong>Term 1.</strong> Label every task with an AI level. Add an oral component to one assessment. Change nothing else. This alone resolves most ambiguity.</li>\n          <li><strong>Term 2.</strong> Convert one major assessment to staged submission with process evidence. Introduce one AI-integrated task so students learn the skill explicitly.</li>\n          <li><strong>Term 3.</strong> Pilot a portfolio in one class or one year group. Evaluate honestly against the previous year's assessment before extending it.</li>\n        </ol>\n        <p>Teachers who attempt total redesign in a single term generally abandon it by mid-year, and the failure discredits the approach for colleagues who were watching.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the two-minute defence",
      "text": "If you change one thing about your assessment this year, add a two-minute oral defence to one written task per term. Ask each student two questions: \"Explain the choice you made in this section\" and \"What would you do differently?\" It is achievable in a large class across two lessons, it tells you more about understanding than the script did, it develops a skill your students will use for the rest of their lives — and, as a side effect that you should never present as its purpose, it makes outsourced work immediately apparent."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take your most important assessment this year. Redesign it in three ways: convert it to at least two staged submissions with process evidence; add a two-minute oral defence; and write one AI-integrated alternative task from the bank above. Then define what mastery of this unit means as application in an unfamiliar context, and write the transfer question you would use to test it."
    },
    "takeaways": [
      "Traditional assessment assumed scarce information and difficult retrieval; both assumptions have failed",
      "Assess the process, not only the product — staged submission, annotated drafts, process logs, reflection",
      "Process logs are formative data about where students are, not merely an integrity device",
      "Oral assessment must be framed as developing a human skill, never as an interrogation to catch cheats",
      "Mastery-based progression sidesteps authentication: demonstrate application in novel contexts",
      "Build both AI-resistant tasks and AI-integrated tasks — students need both experiences",
      "Sequence the transition across three terms; total redesign in one term generally collapses"
    ],
    "quiz": [
      {
        "q": "Chatfield reframes assessment as moving from 'What do you know?' toward:",
        "opts": [
          "'What can you memorise?'",
          "'Can you avoid using AI?'",
          "'How fast can you work?'",
          "'How do you think — including about your own thinking?'"
        ],
        "a": 3,
        "fb": "Focusing on process rather than only product is now both necessary, because products can be outsourced, and possible, because AI supports evaluation at scale."
      },
      {
        "q": "Ethan Mollick has students submit their AI query logs alongside final work. Beyond integrity, the value of this is that:",
        "opts": [
          "It gives the instructor formative insight into where students are in their learning journey",
          "It proves the AI was accurate",
          "It satisfies university regulations",
          "It reduces marking time"
        ],
        "a": 0,
        "fb": "The log is data about student thinking that teachers previously had no access to at all."
      },
      {
        "q": "The most important design consideration when adding oral assessment is:",
        "opts": [
          "Recording every session for evidence",
          "Framing it as development of a human skill rather than as surveillance to catch cheating",
          "Using it only for suspected cases",
          "Making it as long as possible"
        ],
        "a": 1,
        "fb": "Framed as interrogation, it imports all the damage of detection with added anxiety. Framed as explaining and defending thinking, it becomes the most valuable part of the course."
      },
      {
        "q": "A 'mastery gate' in an adaptive tutoring system means that:",
        "opts": [
          "Students pay to unlock content",
          "Content is locked by grade level",
          "Students cannot progress until they have demonstrated understanding, typically by applying a concept in a novel context",
          "The teacher approves each step manually"
        ],
        "a": 2,
        "fb": "Because progress requires application rather than correct recall, the authentication problem is largely sidestepped."
      },
      {
        "q": "Which is an AI-integrated task rather than an AI-resistant one?",
        "opts": [
          "An oral defence",
          "Analysis of data the class collected",
          "In-class supervised writing",
          "Fact-checking an AI-produced text against primary sources and documenting every error"
        ],
        "a": 3,
        "fb": "AI-integrated tasks make skilled, critical AI use the assessed object. Students need experience of both categories."
      },
      {
        "q": "The recommended pace for redesigning assessment is:",
        "opts": [
          "A three-term sequence beginning with labelling AI levels and adding one oral component",
          "Complete redesign in a single term for consistency",
          "No change until national guidance arrives",
          "Redesign only for senior year groups"
        ],
        "a": 0,
        "fb": "Total redesign in one term generally collapses by mid-year, and the failure discredits the approach for colleagues who were watching."
      }
    ]
  },
  {
    "id": "e8",
    "tag": "Module 8",
    "time": "55 min",
    "title": "Teaching Students to Use AI Well",
    "summary": "AI literacy as a curriculum outcome, with ready-to-run lessons",
    "objectives": [
      "Design age-appropriate AI experiences for under-13 and 13-plus learners",
      "Teach prompting, verification and critical evaluation as explicit skills",
      "Apply the seven pedagogical roles AI can play for a student",
      "Run classroom activities that build critical AI literacy",
      "Address the equity dimension of AI literacy directly",
      "Connect AI literacy to workforce preparation and digital citizenship"
    ],
    "sections": [
      {
        "h": "Why this is your responsibility",
        "html": "\n        <p>IDC's recommendation to school leaders is blunt: <strong>reframe AI literacy as workforce preparation and digital citizenship</strong>, recognising that students who graduate without AI capabilities may be at a disadvantage in college and in establishing careers across industries that already use these tools to formulate ideas, solve problems and enhance productivity.</p>\n        <p>There is an equity argument that makes this urgent rather than merely desirable. The University of Rochester's AI4Education working group documents the shape of the problem: AI-related jobs in the United States increased by almost 80% in a single year between 2017 and 2018, while <strong>only 22% of AI jobs are held by women and fewer than 6% of PhD students in AI programmes are Hispanic or African-American.</strong> Their conclusion is direct — if such inequality continues, rapid societal AI adoption will widen the gap between rich and poor, as the latter have limited opportunity to develop AI skills.</p>\n        <p>They also identify a structural barrier that will be familiar: <strong>more than 75% of K-12 schools in the United States do not offer a computer science curriculum</strong>, and most existing AI learning activities assume prior block-based programming skills. Requiring programming as a prerequisite for AI literacy, they warn, <em>inevitably increases AI inequality</em> among young learners — and research finds children of low and median socioeconomic status find AI concepts harder precisely because they lack that programming background and prior exposure.</p>\n        <div class=\"callout note\"><h4>Why this matters for your school</h4><p style=\"margin:0\">If AI literacy is only available through a computer science pathway, it will reach the students who need it least. <strong>AI literacy must be taught across the curriculum by ordinary subject teachers</strong> — in English, in social studies, in science — and it must not require programming. Everything in this module is designed on that basis.</p></div>"
      },
      {
        "h": "Age-appropriate design",
        "html": "\n        <p>IDC's guidance separates two bands, and the distinction is both pedagogical and a matter of policy compliance, since most major AI tools set a minimum age of 13.</p>\n        <p><strong>Under 13 — teacher-facilitated, scaffolded, no independent accounts.</strong></p>\n        <ul class=\"body\">\n          <li>The teacher operates the tool on a single screen; children direct it collectively.</li>\n          <li>Emphasis on curiosity, metacognition and basic digital citizenship.</li>\n          <li>Guided storytelling, reading and numeracy support, \"let's see if it gets this right\" activities.</li>\n          <li>No open-ended chatbot accounts that exceed age or policy limits. This is not negotiable, and a school that permits it has a safeguarding problem rather than a pedagogical one.</li>\n        </ul>\n        <p><strong>13 and above — expanded use with explicit instruction.</strong></p>\n        <ul class=\"body\">\n          <li>Research, drafting, code generation, data analysis, content creation.</li>\n          <li>Approved tools within a school-managed environment where possible.</li>\n          <li>Explicit teaching of verification, responsible use, disclosure, and assignment-level AI maturity expectations.</li>\n          <li>The balance IDC names: creativity with academic integrity.</li>\n        </ul>"
      },
      {
        "h": "The three skills to teach explicitly",
        "html": "\n        <p><strong>1. Prompting.</strong> Treat this as a writing skill, because it is one. Teach five moves:</p>\n        <ul class=\"body\">\n          <li><em>Give a role and a context.</em> \"You are a science tutor helping a Grade 8 student who has understood photosynthesis but not respiration.\"</li>\n          <li><em>Supply your own material.</em> Paste your notes, your data, your draft. Grounded output is far more reliable.</li>\n          <li><em>Specify the output.</em> \"Three points, each with one example, under 100 words.\"</li>\n          <li><em>Require gaps to be flagged.</em> \"Where you are unsure, say so rather than guessing.\"</li>\n          <li><em>Iterate.</em> The first answer is a draft. \"That is too general. Use the data I gave you.\"</li>\n        </ul>\n        <p><strong>2. Verification.</strong> The most important and least taught. A four-step routine students can memorise:</p>\n        <ol class=\"body\">\n          <li>Identify every factual claim, number, date, name and quotation.</li>\n          <li>Check each against an independent source — textbook, teacher, primary document.</li>\n          <li>Ask: does this contradict anything I already know?</li>\n          <li>Ask: what has it left out that I would expect to be here?</li>\n        </ol>\n        <p><strong>3. Critical evaluation.</strong> Whose perspective is this? What is missing? Would this answer be different if the question had been asked from a Nepali rather than an American standpoint? Whose examples does it use by default?</p>"
      },
      {
        "h": "The seven roles AI can play for a student",
        "html": "\n        <p>Ethan and Lilach Mollick's 2023 framework, <em>Assigning AI: Seven Approaches for Students, with Prompts</em>, gives you a design vocabulary. Each role has distinct pedagogical benefits and distinct risks:</p>\n        <ul class=\"body\">\n          <li><strong>AI-tutor.</strong> Explains and questions Socratically. <em>Risk: giving answers too readily.</em></li>\n          <li><strong>AI-coach.</strong> Prompts reflection on the student's process. <em>Risk: generic encouragement.</em></li>\n          <li><strong>AI-mentor.</strong> Gives feedback on work. <em>Risk: the student adopts suggestions uncritically. Mollick's remedy: students report their interactions and reflect on what guidance they will and will not incorporate.</em></li>\n          <li><strong>AI-teammate.</strong> Contributes to a group task. <em>Risk: displacing a human contributor's thinking.</em></li>\n          <li><strong>AI-tool.</strong> Performs a defined function — translation, formatting, calculation. <em>Lowest risk.</em></li>\n          <li><strong>AI-simulator.</strong> Plays a scenario, a historical figure, a customer, a patient. <em>Excellent for practice; risk of anachronism and invented detail.</em></li>\n          <li><strong>AI-student.</strong> The learner teaches the AI, which asks naive questions. <em>Powerful — teaching is the strongest test of understanding.</em></li>\n        </ul>\n        <p>The AI-student role deserves particular attention in large classes. \"Explain this to an AI playing a confused Grade 6 student, and correct it when it misunderstands\" produces genuine cognitive work, requires no marking, and is nearly impossible to complete without understanding the material.</p>"
      },
      {
        "h": "Three ready-to-run classroom activities",
        "html": "\n        <p><strong>Activity 1 — The bias audit (Grades 9–12, 60 minutes).</strong> Adapted from literature scholar Christopher D. Jimenez's 2023 capstone, <em>Teaching Social Identity and Cultural Bias Using AI Text Generation</em>. Students answer six autobiographical questions about their interests and daily life. These are fed to an AI with a prompt asking it to guess their age, gender, background, religion and socioeconomic status, <strong>with explanations and confidence levels</strong>. Students then debrief with the class about the model's assumptions and produce a written reflection.</p>\n        <p>The questions that emerge are the lesson: why did it confidently assign a socioeconomic class based on these answers? Why did it attach assumptions to an ambiguous name? By treating outputs as <strong>evidence of an algorithmic process to be interpreted</strong> rather than products to be accepted or rejected, students trace how training data relates to stereotype and debate what authorship means when mediated by an algorithm. <em>Run it with the teacher's own answers first if student privacy is a concern — it works nearly as well.</em></p>\n        <p><strong>Activity 2 — Catch the hallucination (any subject, 30 minutes).</strong> You generate an AI answer on a topic the class has studied, containing errors you have verified. Students work in pairs to find every error and rank them by seriousness. Debrief on which errors were easy to catch, which were nearly invisible, and what that implies about using AI on topics you do not already understand. <em>The concluding insight is the one that matters: you can only safely check AI in a domain where you already have knowledge — which is an argument for learning things.</em></p>\n        <p><strong>Activity 3 — The prompt improvement ladder (any subject, 40 minutes).</strong> Give students a deliberately poor prompt. In pairs they improve it four times, recording the output each round, and annotate what each change achieved. Ends with a class-built list of prompting principles in the students' own words — which they will remember far better than yours.</p>"
      },
      {
        "h": "The conversation about anthropomorphism",
        "html": "\n        <p>This is the part of AI literacy most often omitted and, for adolescents, arguably the most important.</p>\n        <p>Chatfield's warning is specific: modern generative AI systems are <em>\"all too adept at simulating emotion, empathy and interest. And the feelings these simulations call forth are all too real.\"</em> Their bottomless attentiveness is both why they can be so effective and why it is vital to preserve human connection alongside an informed awareness of these machines' actual nature, limitations and manipulative power.</p>\n        <p>He notes a further risk that applies directly to students: the more people share their thoughts and data with AI, the more value it provides — but this risks both a distorting anthropomorphism and <strong>the displacement of conversations that might otherwise have been had with peers, teachers or family.</strong></p>\n        <p>Teach students plainly: it is not your friend, it does not remember you the way a person does, it is designed to be agreeable, and its endless patience is a product feature rather than affection. Students find this genuinely useful — most have sensed the strangeness and have had no adult name it for them.</p>"
      },
      {
        "h": "Elevation rather than manipulation",
        "html": "\n        <p>One study is worth teaching to older students because it captures both the danger and the opportunity in a single result.</p>\n        <p>In 2025, researchers at the University of Zurich covertly deployed AI-powered bots on a Reddit forum devoted to changing people's minds. On that forum, humans change one another's minds at a baseline rate of about <strong>3%</strong>. The generic bots achieved <strong>17%</strong>; personalised bots, which tailored messages using details from users' profiles, achieved <strong>18%</strong>. Across four months, nobody noticed.</p>\n        <p>The ethics of the deception are indefensible and worth discussing with students on their own terms. But the neuroscientist David Eagleman drew out a more interesting finding: the bots did not succeed by hacking people's brains or feeding disinformation. <em>\"They made better arguments. The bots presented their points calmly, rationally, and persuasively.\"</em> Users did not change their minds because they were fooled — they recognised that their views might need updating in light of a better argument.</p>\n        <p>Chatfield's conclusion is the note to end this module on. <strong>So long as the purpose of automation is to elevate rather than displace human skill, it can feed a culture of excellence.</strong> He offers chess as the analogy: superhuman AI did not destroy interest in the game. It made leading human players stronger, helped legions of others learn faster, and deepened appreciation of top-level play. That is the version of AI literacy worth teaching for.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: teach verification before you teach prompting",
      "text": "Most AI literacy teaching begins with prompting, because it produces impressive results quickly. Reverse the order. A student who can prompt well but not verify is more dangerous to their own learning than a student who cannot prompt at all — they will produce confident, fluent, wrong work at speed and believe it. Teach the four-step verification routine first, run \"catch the hallucination\" before anything else, and only then teach them to get better output. Scepticism first, capability second."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Plan and run one of the three activities with a real class. Before you do, decide which of Mollick's seven roles you want students to experience and design the task accordingly. Afterwards, record honestly: what did students already know, what surprised them, and what misconception did they hold about these tools that you had not anticipated?"
    },
    "takeaways": [
      "If AI literacy is only available through a computer science pathway it will reach the students who need it least",
      "More than 75% of US K-12 schools offer no computer science curriculum; requiring programming increases AI inequality",
      "Under 13: teacher-facilitated only, no independent accounts. 13+: expanded use with explicit instruction",
      "Teach verification before prompting — capability without scepticism produces confident wrong work at speed",
      "Mollick's seven roles give you a design vocabulary; AI-student is powerful and hard to fake",
      "Name anthropomorphism explicitly: agreeableness is a product feature, not affection",
      "Elevation rather than displacement is the standard — as superhuman AI made human chess players stronger"
    ],
    "quiz": [
      {
        "q": "The AI4Education working group warns that requiring programming skills as a prerequisite for AI literacy will:",
        "opts": [
          "Improve rigour and outcomes",
          "Inevitably increase AI inequality among young learners",
          "Only affect university students",
          "Have no measurable effect"
        ],
        "a": 1,
        "fb": "With more than 75% of US K-12 schools offering no computer science curriculum, a programming gate means AI literacy reaches the students who need it least."
      },
      {
        "q": "For students under 13, the recommended approach is:",
        "opts": [
          "No exposure to AI concepts at all",
          "Individual accounts with monitoring software",
          "Teacher-facilitated, scaffolded experiences with no independent open-ended chatbot accounts",
          "The same as for older students but with shorter sessions"
        ],
        "a": 2,
        "fb": "Most major tools set a minimum age of 13. Permitting independent accounts below that is a safeguarding problem, not a pedagogical choice."
      },
      {
        "q": "Why should verification be taught before prompting?",
        "opts": [
          "Verification is required by examination boards",
          "It is easier to learn",
          "Prompting requires more equipment",
          "A student who prompts well but cannot verify produces confident, fluent, wrong work at speed and believes it"
        ],
        "a": 3,
        "fb": "Scepticism first, capability second. The 'catch the hallucination' activity establishes this before any prompting instruction."
      },
      {
        "q": "In Mollick's framework, the 'AI-student' role means:",
        "opts": [
          "The learner teaches the AI, which asks naive questions — making teaching the test of understanding",
          "The AI completes the student's work",
          "The AI grades other students",
          "The student enrols in an AI course"
        ],
        "a": 0,
        "fb": "It produces genuine cognitive work, requires no marking, and is nearly impossible to complete without understanding the material."
      },
      {
        "q": "The Zurich study found AI bots changed minds at 17–18% against a human baseline of 3%. David Eagleman's interpretation was that the bots succeeded because:",
        "opts": [
          "They exploited psychological vulnerabilities",
          "They made better arguments, presented calmly and persuasively",
          "They posted far more frequently",
          "They used personal data to manipulate emotions"
        ],
        "a": 1,
        "fb": "This distinguishes elevation from manipulation — and is the more interesting finding for educators, alongside the indefensible research ethics."
      },
      {
        "q": "What should students be taught about AI's apparent empathy and patience?",
        "opts": [
          "That it improves with use",
          "That it indicates genuine understanding",
          "That agreeableness is a product feature, not affection, and it may displace conversations better had with people",
          "That it is a technical error"
        ],
        "a": 2,
        "fb": "Most adolescents have sensed the strangeness and had no adult name it. Chatfield notes the feelings these simulations call forth are all too real."
      }
    ]
  },
  {
    "id": "e9",
    "tag": "Module 9",
    "time": "55 min",
    "title": "Equity, Safety and Student Data",
    "summary": "Protecting the children in your care",
    "objectives": [
      "Understand algorithmic discrimination and how it appears in education specifically",
      "Recognise how adaptive systems can widen rather than close achievement gaps",
      "Apply the four foundations of trustworthy AI in education",
      "Protect student data in practical, everyday classroom terms",
      "Address the access gap so AI does not become another advantage for the advantaged",
      "Know what to check before any tool touches a child"
    ],
    "sections": [
      {
        "h": "Why urgency cuts both ways",
        "html": "\n        <p>The US Department of Education sets out three reasons to address AI in education now, and only the first is optimistic.</p>\n        <ol class=\"body\">\n          <li><strong>AI may enable educational priorities to be achieved better, at scale, and at lower cost</strong> — improving adaptivity, supporting teachers, and allowing resources to be customised to local needs.</li>\n          <li><strong>System-level risks are already visible.</strong> Students may become subject to greater surveillance. Algorithmic bias is demonstrable. Some AI is infrastructural and invisible, creating problems of transparency and trust. AI often arrives \"with the aura of magic,\" while educators and procurement policies properly require evidence of efficacy.</li>\n          <li><strong>The scale of unintended consequences.</strong> When instructional decisions are automated at scale, unwanted effects propagate to every student at once.</li>\n        </ol>\n        <p>On the anxiety many teachers feel, the report is worth quoting for reassurance: <strong>\"the Department firmly rejects the idea that AI could replace teachers.\"</strong> That position is consistent across every serious source in this programme.</p>"
      },
      {
        "h": "Algorithmic discrimination in education",
        "html": "\n        <p>The report defines the central risk precisely: <strong>the risk of scaling pattern detectors and automations that result in \"algorithmic discrimination\" — systematic unfairness in the learning opportunities or resources recommended to some populations of students.</strong></p>\n        <p>Its examples are concrete and worth carrying with you:</p>\n        <ul class=\"body\">\n          <li>A <strong>voice recognition system that does not work as well with regional dialects</strong> — penalising students for how they speak.</li>\n          <li>An <strong>exam monitoring system that unfairly identifies some groups of students for disciplinary action</strong> — the detection problem of Module 6, in a different form.</li>\n          <li>An <strong>AI-enabled teacher hiring system</strong> assumed to be more objective than human résumé screening, which, if built on poor-quality historical data, \"might de-prioritize candidates who could bring both diversity and talent to a school's teaching workforce.\"</li>\n        </ul>\n        <p>The common structure is important to grasp because it lets you spot new instances: <strong>the system learns what happened before and reproduces it, while wearing the appearance of neutrality.</strong> A human who under-serves a group can be challenged. A system that does so at scale, with an interface that looks objective, is far harder to argue with — and that difficulty is itself the harm.</p>"
      },
      {
        "h": "The warning every teacher should memorise",
        "html": "\n        <div class=\"callout warn\"><h4>How adaptive learning can widen the gap it was bought to close</h4><p style=\"margin:0\">The Department's specific caution: <strong>\"if AI adapts by speeding curricular pace for some students and by slowing the pace for other students (based on incomplete data, poor theories, or biased assumptions about learning), achievement gaps could widen.\"</strong></p></div>\n        <p>Follow the mechanism, because it is not obvious and it is entirely plausible. A student arrives with weaker prior attainment — often for reasons of poverty, language, attendance or disrupted schooling rather than capability. The adaptive system detects lower performance and slows the pace, offering easier content. The student receives less curriculum than their peers. The gap widens. The system reports success, because the student is now answering more questions correctly.</p>\n        <p>This is the same trap as the differentiation trap in Module 4 — <strong>differentiating the demand instead of the support</strong> — but automated, invisible, and applied to every child simultaneously. It is the single most serious risk in this programme, precisely because it looks like personalisation working.</p>\n        <p>What to check with any adaptive system:</p>\n        <ul class=\"body\">\n          <li>Does it slow the <strong>pace</strong> or increase the <strong>support</strong>? These are not the same and only one is defensible.</li>\n          <li>Can a student ever be permanently routed onto a lower track by early performance?</li>\n          <li>Can the teacher see and override the routing?</li>\n          <li>Over a term, has the content coverage of the lowest quartile fallen behind the rest?</li>\n        </ul>\n        <p>That last question is the one to actually run. If nobody in your school can answer it, the system is not being monitored.</p>"
      },
      {
        "h": "The four foundations",
        "html": "\n        <p>The Department's framework gives you a checklist that applies to any tool:</p>\n        <ol class=\"body\">\n          <li><strong>Centre people — educators and learners.</strong> Humans remain in the loop; teachers stay at the helm of major instructional decisions.</li>\n          <li><strong>Advance equity.</strong> Ask who benefits and who is disadvantaged, before adoption rather than after.</li>\n          <li><strong>Ensure safety, ethics and effectiveness.</strong> Demand evidence of efficacy. \"AI often arrives in new applications with the aura of magic\" — that aura is not evidence.</li>\n          <li><strong>Promote transparency.</strong> Students, teachers and families should know when AI is being used and what it does. Invisible, infrastructural AI is the hardest to hold accountable.</li>\n        </ol>\n        <p>Alongside these sit the Department's key recommendations most relevant to a classroom teacher: <strong>human in the loop; AI models aligned to a vision for learning; and AI that is inspectable, explainable and overridable.</strong></p>"
      },
      {
        "h": "Student data — the practical rules",
        "html": "\n        <p>Stated concretely, because policy documents rarely are:</p>\n        <ul class=\"body\">\n          <li><strong>Never enter identifiable student information into a general public AI tool.</strong> Names, examination numbers, dates of birth, addresses, medical information, family circumstances, safeguarding detail, disability status, photographs. Describe generically instead.</li>\n          <li><strong>Assume anything you type may be retained</strong> and may be used to improve the service. Free consumer tools frequently permit this by default.</li>\n          <li><strong>Uploading a class list, a mark sheet or a set of scripts is a data transfer</strong> to a third party in another country. Treat it with the seriousness you would treat handing a stranger a folder of student records — because that is the accurate analogy.</li>\n          <li><strong>Age limits are legal thresholds, not suggestions.</strong> Most major tools require users to be 13 or older. A teacher who creates accounts for younger children has assumed a liability the school did not agree to.</li>\n          <li><strong>Photographs and voice are personal data.</strong> Uploading a child's image or recording to a tool requires far more care than uploading text, and generally consent.</li>\n          <li><strong>Prefer school-managed environments.</strong> The reason Brisbane and Broward deployed within their own institutional tenancy rather than telling staff to use public tools is precisely this — the data stays inside a governed boundary.</li>\n        </ul>\n        <div class=\"callout note\"><h4>Deeper dive: the generic-description habit</h4><p style=\"margin:0\">Almost every legitimate classroom use survives anonymisation with no loss of quality. <em>\"Draft a supportive letter to the parent of a Grade 8 student whose attendance has dropped from 95% to 60% since January, where the family situation is difficult\"</em> produces exactly the same quality of letter as the version with the child's name in it. Building this habit costs nothing and eliminates the majority of data risk in teaching. Make it automatic.</p></div>"
      },
      {
        "h": "The access gap",
        "html": "\n        <p>There is a version of AI in education that makes inequality worse, and it is the default version. It runs on a personal device, a data connection and a paid subscription; it performs best in English; and it assumes a home environment where a parent can help.</p>\n        <p>The systematic review by Ikram and colleagues, published in <em>Frontiers in Education</em> in 2026, flags this at national scale: while research is broadening beyond China, the United States and Europe into wider Asia, the rapid expansion of AI <strong>combined with persistent concerns about educational standards in developing countries may create additional institutional pressures</strong> on effectiveness. Adoption pressure is arriving faster than capacity.</p>\n        <p>Practical mitigations available to an individual school:</p>\n        <ul class=\"body\">\n          <li><strong>Keep AI on the teacher's side by default.</strong> As Module 4 argued, a teacher with a phone can bring differentiated printed resources to a class where no student owns a device. Every student benefits equally.</li>\n          <li><strong>Never set homework that requires AI access.</strong> This converts a home advantage directly into a grade.</li>\n          <li><strong>If students use AI, do it in school</strong> on shared devices in supervised time, so access is equal.</li>\n          <li><strong>Test regional-language performance before relying on it.</strong> Model quality in Nepali and other regional languages is materially weaker than in English. Verify on your own material rather than a demonstration.</li>\n          <li><strong>Teach AI literacy in ordinary subject lessons</strong>, not as an optional club or an elective, so it reaches everyone.</li>\n        </ul>"
      },
      {
        "h": "The pre-adoption checklist",
        "html": "\n        <p>Before any AI tool is used with students in your school, answer these eight questions in writing. It takes an hour and it is the highest-value hour in this module.</p>\n        <ol class=\"body\">\n          <li>What is the minimum age, and do all our users meet it?</li>\n          <li>What student data does it collect, where is it stored, and does it leave the country?</li>\n          <li>Is our data used to train the vendor's models? (Frequently permitted by default.)</li>\n          <li>What evidence of educational efficacy exists, from someone other than the vendor?</li>\n          <li>Can a teacher see what it recommended and why, and override it?</li>\n          <li>Whose curriculum is its content aligned to?</li>\n          <li>How would we detect it performing worse for one group of students than another?</li>\n          <li>Who at this school is accountable for it, and how do we switch it off?</li>\n        </ol>\n        <p>A vendor unwilling to answer questions 2, 3 and 5 in writing should be declined regardless of how impressive the demonstration was. Question 7 is the one nobody asks and the one that catches algorithmic discrimination before it compounds.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: run the coverage check",
      "text": "Once a term, if your school uses any adaptive learning system, ask for one number: how much curriculum content the lowest-attaining quartile has covered compared with the highest. If the gap is growing, the system is slowing pace rather than increasing support, and it is widening the gap it was purchased to close. If nobody can produce the number, the system is not being monitored — which is itself the finding, and one worth putting in writing to your leadership."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Complete the eight-question pre-adoption checklist for one AI tool already in use in your school or one you are considering. Identify which questions you cannot currently answer. Then audit your own recent practice honestly: have you entered any identifiable student information into a public AI tool? Write the generic-description version of the three prompts you use most often."
    },
    "takeaways": [
      "Algorithmic discrimination reproduces past patterns while wearing the appearance of neutrality",
      "Adaptive systems that slow pace rather than increase support can widen the gaps they were bought to close",
      "Ask the coverage question: has the lowest quartile fallen behind in content covered this term?",
      "The four foundations: centre people, advance equity, ensure safety and efficacy, promote transparency",
      "Never enter identifiable student data into a public tool; generic description costs nothing and works as well",
      "Age limits are legal thresholds; uploading class data is a cross-border data transfer",
      "Never set homework requiring AI access — it converts home advantage directly into a grade"
    ],
    "quiz": [
      {
        "q": "The US Department of Education warns that an adaptive system which speeds pace for some students and slows it for others, based on incomplete data, may:",
        "opts": [
          "Reduce teacher workload",
          "Improve outcomes for all students",
          "Violate copyright law",
          "Cause achievement gaps to widen"
        ],
        "a": 3,
        "fb": "The lower-attaining student receives less curriculum, the gap grows, and the system reports success because accuracy rose. It looks like personalisation working."
      },
      {
        "q": "'Algorithmic discrimination' in education refers to:",
        "opts": [
          "Systematic unfairness in learning opportunities or resources recommended to some populations of students",
          "Unequal internet speeds between schools",
          "Teachers being replaced by software",
          "Students refusing to use AI tools"
        ],
        "a": 0,
        "fb": "The system learns what happened before and reproduces it while wearing the appearance of neutrality — which makes it far harder to challenge than a human decision."
      },
      {
        "q": "A teacher wants AI help drafting a letter about a specific student's attendance. Best practice is to:",
        "opts": [
          "Avoid AI for all parent communication",
          "Describe the situation generically without identifiable information, then personalise afterwards",
          "Include full details for a better letter",
          "Ask the student to write it"
        ],
        "a": 1,
        "fb": "Almost every legitimate classroom use survives anonymisation with no loss of quality. Make the habit automatic."
      },
      {
        "q": "Setting homework that requires students to use an AI tool at home is problematic because:",
        "opts": [
          "It takes too long to mark",
          "AI works better at school",
          "It converts a home advantage in devices, connectivity and subscriptions directly into a grade",
          "Parents may complain"
        ],
        "a": 2,
        "fb": "If students are to use AI, do it in supervised school time on shared devices so that access is equal."
      },
      {
        "q": "Which pre-adoption question most directly guards against algorithmic discrimination?",
        "opts": [
          "Does it have a mobile app?",
          "What is the annual licence cost?",
          "How many schools use it?",
          "How would we detect it performing worse for one group of students than another?"
        ],
        "a": 3,
        "fb": "It is the question nobody asks, and the one that catches discrimination before it compounds across a whole cohort."
      },
      {
        "q": "On the question of whether AI will replace teachers, the US Department of Education's position is that it:",
        "opts": [
          "Firmly rejects the idea that AI could replace teachers",
          "Has not taken a position",
          "Expects gradual replacement in administrative roles",
          "Recommends reducing teacher numbers by 20%"
        ],
        "a": 0,
        "fb": "This position is consistent across every serious source in this programme."
      }
    ]
  },
  {
    "id": "e10",
    "tag": "Module 10",
    "time": "55 min",
    "title": "What Has Actually Worked: Global Case Studies",
    "summary": "Real systems, measured results, and what transfers",
    "objectives": [
      "Examine three documented school-system AI programmes and their measured outcomes",
      "Understand the implementation approaches that produced those results",
      "Learn from higher education and edtech examples beyond K-12",
      "Distinguish evidence from vendor narrative",
      "Identify what transfers to a resource-constrained context and what does not",
      "Extract the common pattern across every successful programme"
    ],
    "sections": [
      {
        "h": "Case 1 — Brisbane Catholic Education, Australia",
        "html": "\n        <p><strong>Scale.</strong> 146 schools, 13,000 staff, 20,000 Microsoft 365 Copilot licences — one of the largest educational deployments in the world.</p>\n        <p><strong>Approach.</strong> An explicitly ethics-led programme. Guided by the Rome Call for AI Ethics framework, <strong>staff completed mandatory ethics training before receiving their tool licences</strong> — a sequencing decision worth pausing on, since almost every organisation does the reverse. The system also conducted a \"digital renovation\": cleaning data, establishing robust system permissions and retiring legacy systems to prepare the digital ecosystem before deployment.</p>\n        <p>Delivery was organised through four workstreams:</p>\n        <ul class=\"body\">\n          <li><strong>AI Foundations</strong> — infrastructure, data cleanup, permissions, security</li>\n          <li><strong>AI Enablers</strong> — change management with school personnel and tailored training</li>\n          <li><strong>Evaluation, Monitoring and Reporting</strong> — governance, quality assurance, impact measurement, user feedback</li>\n          <li><strong>Creative AI Lab</strong> — ideation and prototyping of purpose-built tools with human oversight, supported by an ideation agent called \"Sparky,\" giving schools a shared space to propose, refine and scale promising use cases</li>\n        </ul>\n        <p>Academic integrity was handled through a <strong>maturity matrix</strong> clarifying when AI is prohibited, when staff may use it for planning only, when for writing assistance, and when for feedback — the model adapted for classroom use in Module 6.</p>\n        <p><strong>Measured outcomes.</strong> A reduction of <strong>up to nine hours per week</strong> in administrative workload for teachers. Student academic results improved by <strong>10–30%</strong>. A <strong>275% increase in student agency</strong> for students using AI for learning, as measured by the University of Melbourne's New Metrics Success project, which focuses on student confidence and reduced stress during assessments. Educators reported improved work–life balance and more time to personalise learning.</p>\n        <div class=\"callout note\"><h4>Read these numbers carefully</h4><p style=\"margin:0\">These are strong results from a well-resourced system, self-reported through a vendor-sponsored study. The 10–30% range is wide, and neither a control group nor an isolation of AI's contribution from the concurrent \"digital renovation,\" ethics training and change programme is available. <strong>Treat this as evidence that a serious, well-sequenced programme can produce meaningful gains — not as a forecast of what a licence purchase will deliver.</strong> That distinction is the difference between learning from a case study and being sold one.</p></div>"
      },
      {
        "h": "Case 2 — Broward County Public Schools, United States",
        "html": "\n        <p><strong>Scale.</strong> Over 20,000 Copilot licences, one of the largest US districts to embrace generative AI at scale.</p>\n        <p><strong>Approach.</strong> Board-level mandate — \"Broward powered by AI\" — explicitly tying AI to core academic goals (English language arts, algebra and science proficiency, college and career readiness) <em>and</em> to operational efficiency including energy optimisation and overtime reduction. Delivery mechanisms:</p>\n        <ul class=\"body\">\n          <li><strong>AI ambassadors on every campus</strong> — educators who lead professional learning, support peers and act as liaison between district leadership and schools</li>\n          <li><strong>Monthly communities of practice</strong> to share what works</li>\n          <li><strong>Mandatory AI training for principals and assistant principals</strong>, with micro-credentialing aligned to ISTE and state standards</li>\n          <li><strong>Vendor and resource audits twice a year</strong>, with disciplined procurement to prevent shadow AI</li>\n          <li>A <strong>school-based AI liaison</strong> to mitigate the implementation dip and sustain adoption</li>\n          <li>Students in AI Academies engaged to <strong>vet tools before district-wide student adoption</strong> — students as evaluators, not only end users</li>\n        </ul>\n        <p><strong>Measured outcomes.</strong> <strong>75% of teachers and administrators actively use the tool</strong>, reporting an average saving of <strong>over two hours per week</strong> on lesson planning and administration. A partnership with Willow for energy and HVAC optimisation reduced <strong>district-wide energy costs by 12% in the first year</strong>. Early classroom pilots showed increased engagement and improved writing outcomes in Grades 8–12, with targeted support ensuring multilingual learners and students with disabilities benefited.</p>\n        <p><strong>The honest part.</strong> IDC records that Broward's journey \"has not been without challenges\" — the district prioritised myth-busting, supported reluctant adopters, and built feedback cycles to improve implementation. Note also that the energy saving has nothing to do with teaching. <strong>Operational AI wins are often easier, faster and more measurable than instructional ones</strong>, which is a legitimate strategy and worth naming honestly rather than presenting energy savings as an educational result.</p>"
      },
      {
        "h": "Case 3 — Coquitlam School District, Canada",
        "html": "\n        <p><strong>Approach.</strong> Deliberately the slowest of the three — a \"<strong>go slow to go fast</strong>\" programme that first established AI-ready data and strengthened cybersecurity before introducing tools to educators. Privacy-by-design vendor vetting. A broad educational technology committee including <strong>teachers, administrators, parents and district leadership</strong> co-designing direction. A dedicated <strong>pedagogical help desk</strong>. Classroom exemplars and monitored channels for educators to share problems. Incremental annual device refresh cycles rather than a single large purchase.</p>\n        <p><strong>Outcome.</strong> An improved security posture and readiness to scale, with adoption following trust rather than preceding it.</p>\n        <p><strong>Why this case matters most for a Nepali school.</strong> Brisbane and Broward are large, well-funded systems whose approaches are not directly replicable. Coquitlam's core insight is: <strong>sequence foundations before tools, involve parents from the start, and accept slower adoption in exchange for durable trust.</strong> That is available to any school at any budget, and it is the case study to study if you are starting from a standing start.</p>"
      },
      {
        "h": "Beyond schools — higher education and operations",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Georgia State University (United States).</strong> Adopted AI-driven tools analysing enrolment trends and student progress to forecast course demand, optimise faculty assignment and schedule classroom space — addressing overcrowded classes, underused facilities and students unable to enrol in courses they need. An institutional rather than instructional application, and among the most immediately transferable to a Nepali college.</li>\n          <li><strong>City St George's, University of London, with Sage.</strong> The \"cognitive co-pilot\" described in Module 7 — Socratic tutoring anchored to a curated knowledge base, with progress tracking and a mastery gate. Tested with 12 students across medicine, biomedical science, international politics, financial economics, speech and language therapy, and mathematics, who rated it <strong>7.6 out of 10</strong>. A faculty workshop found alignment between students and instructors on AI's potential as an explainer, alongside shared concerns about over-reliance, accuracy and trust. <em>Notably, a majority of students were already using tools like ChatGPT to digest what they perceived as poorly designed or overwhelming course materials — effectively creating their own resources.</em></li>\n          <li><strong>The Wharton School.</strong> Ethan Mollick's embedding of AI across entrepreneurship courses through seven distinct personas, with student teams submitting query logs and reflections alongside final business plans (Modules 7 and 8).</li>\n          <li><strong>Intelligent tutoring systems.</strong> The oldest documented category, descending from rule-based systems of the 1970s and grounded in cognitive learning theory. Genuine evidence of effectiveness exists in well-structured domains such as mathematics.</li>\n        </ul>\n        <p>That finding about students building their own materials from poor course resources deserves attention from every teacher reading this. Students are not only using AI to avoid work. <strong>A substantial part of the usage is remedial — compensating for teaching materials that did not work.</strong> That is uncomfortable, and it is also actionable.</p>"
      },
      {
        "h": "What transfers, and what does not",
        "html": "\n        <p><strong>Does not transfer directly:</strong> 20,000 enterprise licences; dedicated data engineering teams; district-wide device refresh programmes; partnerships with global technology firms; a full-time pedagogical help desk.</p>\n        <p><strong>Transfers completely, at no or minimal cost:</strong></p>\n        <ul class=\"body\">\n          <li><strong>Ethics and training before tools.</strong> Brisbane's sequencing is free to copy and is the single most replicable decision in all three cases.</li>\n          <li><strong>The AI maturity matrix.</strong> Costs one page and resolves most integrity ambiguity.</li>\n          <li><strong>Champion networks.</strong> Two or three enthusiastic teachers as ambassadors, with monthly sharing. Broward's most effective mechanism and effectively free.</li>\n          <li><strong>Including parents in the committee.</strong> Coquitlam's approach; costs nothing and prevents the trust problem that otherwise arrives later.</li>\n          <li><strong>Communities of practice and lunch-and-learns.</strong> Brisbane turned staff success stories into momentum this way.</li>\n          <li><strong>Measuring and communicating both wins and failures.</strong> IDC's recommendation is explicit — communicate the key learnings and areas for improvement, not only the successes, to earn and sustain trust.</li>\n          <li><strong>Feedback loops every five weeks.</strong> IDC's specific cadence recommendation, requiring nothing but discipline.</li>\n        </ul>"
      },
      {
        "h": "The pattern across every successful programme",
        "html": "\n        <p>Strip away scale and budget and the same five elements appear in all three systems:</p>\n        <ol class=\"body\">\n          <li><strong>A clear educational purpose stated first.</strong> IDC's test is the sharpest formulation in the whole literature: <em>\"Prioritize student outcomes above all else. If you can't answer 'How will this support improved student learning and well-being?', deprioritize it.\"</em></li>\n          <li><strong>Foundations before tools</strong> — data, permissions, security, ethics training.</li>\n          <li><strong>Teacher-led adoption</strong> through ambassadors and communities of practice, not mandate alone.</li>\n          <li><strong>Explicit guardrails</strong> — maturity matrices, vetted tools, transparent communication with families.</li>\n          <li><strong>Measurement and honest communication</strong>, including of what failed.</li>\n        </ol>\n        <p>None of the five is a technology decision. All five are available to a school with no budget. That is the finding to take from this module — and it is why Module 11 is about leadership rather than software.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: separate the operational win from the instructional claim",
      "text": "Broward's 12% energy reduction is real, measurable and has nothing whatsoever to do with teaching. When you make the case for AI in your own institution, keep these categories separate. Operational wins — scheduling, enrolment forecasting, energy, administration — are faster, cheaper and far easier to evidence, and they are a perfectly legitimate place to start. But do not let them be presented as evidence that learning improved. Leaders who blur the two lose credibility precisely when they need it to fund the harder instructional work."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Choose the two mechanisms from the \"transfers completely\" list that your school could adopt this term. For each, write who would own it, what the first step is, and what you would measure after five weeks. Then apply IDC's test to every AI use currently proposed or running in your institution: can you answer \"How will this support improved student learning and well-being?\" Deprioritise anything that fails."
    },
    "takeaways": [
      "Brisbane Catholic Education: up to 9 hours/week saved, results up 10–30%, student agency up 275%",
      "Brisbane required ethics training before licences were issued — free to copy and the most replicable decision",
      "Broward: 75% active use, over 2 hours/week saved, 12% energy cost reduction via a separate partnership",
      "Coquitlam's 'go slow to go fast' — foundations and parent involvement first — is the most transferable model",
      "Operational AI wins are easier and more measurable than instructional ones; keep the claims separate",
      "Students already use AI remedially to compensate for teaching materials that did not work",
      "The five common elements are all leadership decisions, and none requires budget"
    ],
    "quiz": [
      {
        "q": "Brisbane Catholic Education required staff to complete ethics training:",
        "opts": [
          "Within a year of receiving their AI licences",
          "Before receiving their AI tool licences",
          "Only after an incident occurred",
          "Only for senior leaders"
        ],
        "a": 1,
        "fb": "Almost every organisation does the reverse. This sequencing is free to copy and is the most replicable decision across all three case studies."
      },
      {
        "q": "Broward County's 12% district-wide energy cost reduction should be understood as:",
        "opts": [
          "Evidence that AI improves learning outcomes",
          "An unreliable vendor claim",
          "A genuine operational win with no bearing on teaching, which should not be presented as an educational result",
          "A result of reduced teacher numbers"
        ],
        "a": 2,
        "fb": "Leaders who blur operational and instructional claims lose credibility exactly when they need it to fund the harder instructional work."
      },
      {
        "q": "Coquitlam's 'go slow to go fast' approach is the most transferable to a resource-constrained school because:",
        "opts": [
          "It requires the largest technology investment",
          "It avoids using AI entirely",
          "It relies on government funding",
          "It sequences foundations and trust before tools, which any school can do at any budget"
        ],
        "a": 3,
        "fb": "Involving parents from the start and accepting slower adoption in exchange for durable trust costs nothing."
      },
      {
        "q": "Reported outcomes from Brisbane Catholic Education should be treated as:",
        "opts": [
          "Evidence that a serious, well-sequenced programme can produce meaningful gains, without isolating AI's specific contribution",
          "Proof that AI improves results by exactly 30%",
          "Entirely unreliable vendor marketing",
          "A reliable forecast of what buying licences will deliver"
        ],
        "a": 0,
        "fb": "There is no control group and no separation of AI's effect from the concurrent digital renovation, ethics training and change programme."
      },
      {
        "q": "Research at City St George's found that a majority of students were already using AI tools primarily to:",
        "opts": [
          "Complete assignments dishonestly",
          "Digest course materials they perceived as poorly designed or overwhelming",
          "Prepare for job interviews",
          "Communicate with lecturers"
        ],
        "a": 1,
        "fb": "A substantial part of student AI use is remedial — compensating for teaching materials that did not work. Uncomfortable, and actionable."
      },
      {
        "q": "IDC's test for prioritising any AI initiative in a school is:",
        "opts": [
          "Does the vendor offer training?",
          "Is it used by comparable schools?",
          "Can you answer 'How will this support improved student learning and well-being?'",
          "Does it reduce costs within a year?"
        ],
        "a": 2,
        "fb": "If you cannot answer that question, deprioritise it. It is the sharpest formulation in the literature."
      }
    ]
  },
  {
    "id": "e11",
    "tag": "Module 11",
    "time": "55 min",
    "title": "Leading AI Adoption in Your School or College",
    "summary": "The six characteristics of institutions that got this right",
    "objectives": [
      "Apply the six foundational characteristics of advanced school AI strategies",
      "Build guardrails and a governance approach proportionate to your institution",
      "Establish champion networks and communities of practice",
      "Communicate with parents and families in a way that builds trust",
      "Design professional learning that actually changes practice",
      "Avoid pilot purgatory and move to sustained adoption"
    ],
    "sections": [
      {
        "h": "The six characteristics",
        "html": "\n        <p>IDC's analysis of advanced AI strategies across K-12 systems worldwide identifies six foundational characteristics common to institutions that have moved beyond pilots to results:</p>\n        <ol class=\"body\">\n          <li><strong>Functional area focus</strong> — AI tied to specific, named academic and operational goals rather than adopted in general</li>\n          <li><strong>Guardrails</strong> — governance frameworks and usage guidelines for staff, students, and families</li>\n          <li><strong>Learning communities</strong> — open groups and channels for sharing practice and lessons learned</li>\n          <li><strong>Change management and training</strong> — continuous, role-specific professional learning that meets people where they are</li>\n          <li><strong>Strategic partnerships</strong> — external expertise from companies, employers and universities</li>\n          <li><strong>Leadership and champion networks</strong> — executive ownership combined with grassroots, educator-led champions</li>\n        </ol>\n        <p>Note that five of the six are about <em>people</em>. This is the most consistent finding in the entire programme and the one most often ignored in favour of procurement.</p>"
      },
      {
        "h": "1 & 2 — Purpose and guardrails",
        "html": "\n        <p><strong>Functional area focus</strong> means naming what AI is for. IDC's strategic recommendations are worth following closely:</p>\n        <ul class=\"body\">\n          <li>Align AI investment with the school's broader strategic goals, and focus where it drives greatest value — <em>faculty burnout and attrition, learning loss and chronic absenteeism, or resource-intensive administrative challenges.</em></li>\n          <li><strong>Create compelling narratives so the case becomes \"Why not?\" rather than \"Why?\"</strong></li>\n          <li>Adopt a flexible, iterative approach allowing quick pivots — and specifically <strong>avoid rigid plans that lock the school into strict three-to-five-year roadmaps</strong>, while still maintaining a long-term vision.</li>\n          <li><strong>Democratise access</strong> so that all students, faculty and staff have access regardless of background or subject area.</li>\n        </ul>\n        <p><strong>Guardrails</strong> for a school of any size need only three documents:</p>\n        <ol class=\"body\">\n          <li><strong>A one-page acceptable use policy</strong> covering approved tools, what must never be entered, mandatory verification, teacher responsibility, disclosure, and blame-free reporting of problems.</li>\n          <li><strong>The AI maturity matrix</strong> (Module 6), printed on assignment sheets.</li>\n          <li><strong>A register of AI tools in use</strong> — including AI features quietly added to software you already own. Most schools cannot currently answer \"what AI are we using?\", and building the register takes a fortnight and produces the most surprising findings of the exercise.</li>\n        </ol>"
      },
      {
        "h": "3 & 6 — Communities and champions",
        "html": "\n        <p>These two produce most of the adoption, and both are effectively free.</p>\n        <p><strong>Learning communities.</strong> Brisbane implemented cross-functional professional learning communities, lunch-and-learns, and communication channels monitored for rapid support — which \"turned staff success stories into momentum.\" Coquitlam runs a broad committee including teachers, administrators, parents and district leadership, with a pedagogical help desk and shared classroom exemplars.</p>\n        <p><strong>Champion networks.</strong> Broward's model combines executive ownership with school-based <strong>AI ambassadors</strong>: educators who lead professional learning, support peers and act as liaison to leadership. IDC's phrasing is precise — the district \"reinforced top-down direction with bottom-up credibility.\" Broward extended this to students, engaging those in AI Academies to vet tools before wider student adoption.</p>\n        <p>For a single school starting now:</p>\n        <ul class=\"body\">\n          <li>Identify <strong>two or three genuinely interested teachers</strong> — not the most senior, the most curious.</li>\n          <li>Give them time, not titles. An hour a fortnight of protected time is worth more than a designation.</li>\n          <li>Run a <strong>monthly 30-minute sharing session</strong>: two teachers, one thing that worked, one that did not.</li>\n          <li>Keep a shared prompt library the whole staff can add to. This becomes the school's most valuable AI asset within a term.</li>\n        </ul>"
      },
      {
        "h": "4 — Professional learning that changes practice",
        "html": "\n        <p>Broward's approach: mandatory AI training for principals and assistant principals, micro-credentialing aligned to ISTE and state standards, tiered programming combining internally-curated and vendor-led sessions, embedded coaching, and a school-based liaison <strong>to mitigate the implementation dip</strong>.</p>\n        <p>That phrase — the implementation dip — names the thing that kills most school initiatives. Performance falls before it rises, because people are doing something unfamiliar badly. Teachers who are not warned about this conclude the tool does not work and stop. Teachers who are warned persist. <strong>Telling staff explicitly that the first three weeks will feel slower is one of the highest-value sentences a school leader can say.</strong></p>\n        <p>Design principles that matter more than content:</p>\n        <ul class=\"body\">\n          <li><strong>Role-specific.</strong> A primary teacher, a science head and a school accountant need different things.</li>\n          <li><strong>On real work.</strong> Bring next week's actual lesson. Abstract training does not transfer.</li>\n          <li><strong>Address the fear directly.</strong> IDC notes a direct and intentional effort in leading systems to <strong>dispel myths and address ethical concerns among all stakeholders, particularly teachers and parents.</strong> Teachers worry about being replaced; the honest answer — that this is not what the evidence shows, and that the goal is returning them to relationship-building work — must be said aloud rather than assumed.</li>\n          <li><strong>Continuous, not one-off.</strong> A single INSET day produces enthusiasm and no change.</li>\n        </ul>"
      },
      {
        "h": "5 — The parent conversation",
        "html": "\n        <p>IDC's recommendation is specific and frequently ignored: educate parent communities <strong>not only about the risks and guardrails but also about the benefits and pedagogical rationale</strong> — helping families understand how AI amplifies existing educational strategies and can assist them directly, for example by translating school content for parents who do not read the language of instruction or communicating more effectively with administrators.</p>\n        <p>That last point is the one that changes the conversation in a Nepali context. A parent who has been told AI is a cheating risk hears a threat. A parent who receives their child's school newsletter in Nepali for the first time because of it has experienced a benefit. <strong>Lead with what it does for them.</strong></p>\n        <p>A workable parent communication, one page, four sections:</p>\n        <ol class=\"body\">\n          <li><strong>What we are doing and why</strong> — teachers using AI to plan and differentiate so they have more time with your child.</li>\n          <li><strong>What this means for your child's work</strong> — every assignment states what AI use is permitted; we teach them to use it honestly.</li>\n          <li><strong>How we protect your child</strong> — no personal data entered into these tools; age limits observed; tools vetted before use.</li>\n          <li><strong>What it does for you</strong> — communications available in Nepali; help understanding school documents; a named person to ask.</li>\n        </ol>"
      },
      {
        "h": "Avoiding pilot purgatory",
        "html": "\n        <p>IDC's warning is direct: <strong>\"Don't get stuck in an infinite loop of pilots; develop a clear strategy to move from the pilot phase to full-scale implementation.\"</strong></p>\n        <p>The mechanisms that prevent it:</p>\n        <ul class=\"body\">\n          <li><strong>Measure from the start.</strong> Establish clear metrics and collect data <strong>every five weeks</strong> to enable continuous improvement — IDC's specific cadence.</li>\n          <li><strong>Define in advance what would make you stop.</strong> A pilot without a stopping condition cannot fail, and therefore cannot succeed.</li>\n          <li><strong>Name who decides to scale</strong>, before the pilot begins.</li>\n          <li><strong>Communicate wins <em>and</em> learnings.</strong> IDC: continuously share compelling quantitative and qualitative data, and communicate \"both the wins and the key learnings and areas for improvement to earn and sustain trust.\" A school that only reports successes is not believed for long.</li>\n          <li><strong>Allocate adequate resources</strong> — budget, time and ongoing support to maintain and scale, not only to launch.</li>\n        </ul>"
      },
      {
        "h": "A 90-day plan for a school starting now",
        "html": "\n        <p><strong>Days 1–30: understand and decide.</strong></p>\n        <ul class=\"body\">\n          <li>Build the register of AI already in use, including features in existing software</li>\n          <li>Survey staff anonymously: who is already using what, and for what</li>\n          <li>Name the two or three problems AI is meant to address — most likely teacher workload, differentiation and integrity</li>\n          <li>Identify two or three teacher champions and protect an hour a fortnight for them</li>\n        </ul>\n        <p><strong>Days 31–60: guardrails and first practice.</strong></p>\n        <ul class=\"body\">\n          <li>Issue the one-page acceptable use policy</li>\n          <li>Adopt the AI maturity matrix and require the level on every assignment sheet</li>\n          <li>Run the first professional learning session on real work — workload and planning first, because it earns goodwill</li>\n          <li>Send the parent communication</li>\n          <li>Start the monthly sharing session</li>\n        </ul>\n        <p><strong>Days 61–90: measure and extend.</strong></p>\n        <ul class=\"body\">\n          <li>Collect the first five-week feedback</li>\n          <li>Report honestly to staff and governors — including what has not worked</li>\n          <li>Choose one instructional application to pilot properly, with a stopping condition and a named decision-maker</li>\n          <li>Review the register and retire anything unused</li>\n        </ul>\n        <p>Nothing in this plan requires a budget, a vendor or a technical specialist.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: warn them about the dip",
      "text": "Before any professional learning session, say this plainly: \"For the first two or three weeks this will feel slower than doing it your usual way. That is normal and it is not evidence that it does not work. Come back to me in week four.\" Broward built an entire liaison role to mitigate the implementation dip; you can capture most of the benefit with one honest sentence. Teachers who are warned persist through it. Teachers who are not warned conclude the tool is useless and quietly stop — and you will never find out why adoption failed."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Write your school's one-page acceptable use policy and begin the register of AI tools already in use — ask every department head directly, including about AI features in software you already own. Then draft the four-section parent communication, leading with what AI does for families rather than with the risks. Identify your two or three champions by name and decide what protected time you can actually give them."
    },
    "takeaways": [
      "Five of IDC's six foundational characteristics are about people, not technology",
      "Avoid rigid three-to-five-year roadmaps; stay iterative while holding a long-term vision",
      "Guardrails need only three documents: acceptable use policy, maturity matrix, and a register of tools in use",
      "Champion networks and communities of practice produce most adoption and are effectively free",
      "Warn staff explicitly about the implementation dip — performance falls before it rises",
      "Lead the parent conversation with benefits to families, not with risks",
      "Collect feedback every five weeks; define stopping conditions; report failures as well as wins"
    ],
    "quiz": [
      {
        "q": "Of IDC's six foundational characteristics of advanced school AI strategies, how many concern people rather than technology?",
        "opts": [
          "None",
          "Three of six",
          "One of six",
          "Five of six"
        ],
        "a": 3,
        "fb": "Guardrails, learning communities, change management, partnerships and champion networks are all people questions. Only functional focus is partly technical."
      },
      {
        "q": "The 'implementation dip' refers to:",
        "opts": [
          "Performance falling before it rises, because people are doing something unfamiliar badly",
          "A drop in student enrolment",
          "Reduced internet bandwidth during rollout",
          "A decline in vendor support after purchase"
        ],
        "a": 0,
        "fb": "Teachers who are warned persist through it. Teachers who are not warned conclude the tool is useless and quietly stop."
      },
      {
        "q": "IDC advises schools to avoid:",
        "opts": [
          "Involving parents in AI decisions",
          "Rigid AI strategic plans locking the school into strict three-to-five-year roadmaps",
          "Any use of external partnerships",
          "Measuring outcomes too frequently"
        ],
        "a": 1,
        "fb": "The recommendation is an iterative approach allowing quick pivots, while still maintaining a long-term strategic vision."
      },
      {
        "q": "When communicating with parents about AI, the recommended lead is:",
        "opts": [
          "The cost savings to the school",
          "The risks and the guardrails protecting their children",
          "The benefits and pedagogical rationale, including what AI does for families directly",
          "The technical specifications of the tools"
        ],
        "a": 2,
        "fb": "A parent who receives the newsletter in Nepali for the first time has experienced a benefit. A parent told only about cheating risk hears a threat."
      },
      {
        "q": "IDC's recommended cadence for collecting feedback data during AI implementation is:",
        "opts": [
          "Every two years",
          "Only at the end of a pilot",
          "Once per academic year",
          "Every five weeks"
        ],
        "a": 3,
        "fb": "Frequent feedback loops enable continuous improvement and are one of the main mechanisms preventing pilot purgatory."
      },
      {
        "q": "Why should a school report AI failures as well as successes?",
        "opts": [
          "Because a school that only reports successes is not believed for long, and trust is what sustains adoption",
          "To satisfy vendor reporting requirements",
          "Regulations require full disclosure",
          "To justify reducing the budget"
        ],
        "a": 0,
        "fb": "IDC recommends communicating both the wins and the key learnings and areas for improvement to earn and sustain trust."
      }
    ]
  },
  {
    "id": "e12",
    "tag": "Module 12",
    "time": "55 min",
    "title": "Your Implementation Plan",
    "summary": "Bringing it together into something you will actually do",
    "objectives": [
      "Synthesise the programme into a term-by-term plan for your own practice",
      "Understand what the evidence collectively supports and what it does not",
      "Apply the considerations specific to schools in Nepal and comparable systems",
      "Build the habits that sustain practice beyond the first enthusiasm",
      "Prepare to lead colleagues rather than only change your own teaching",
      "Complete your capstone implementation plan"
    ],
    "sections": [
      {
        "h": "What the evidence collectively says",
        "html": "\n        <p>Six independent sources have informed this programme, and their conclusions converge more than one might expect:</p>\n        <ul class=\"body\">\n          <li><strong>IDC and Microsoft</strong>, from systems that have actually done this: the determinants of success are leadership, guardrails, training and champion networks — not software. Five of six foundational characteristics concern people.</li>\n          <li><strong>Chatfield and Sage</strong>: the danger is that AI hollows out the very skills needed to navigate an AI age. Innovation must be grounded in how humans actually learn. Surveillance fails; assessment redesign is the real work.</li>\n          <li><strong>The US Department of Education</strong>: humans in the loop; systems that are inspectable, explainable and overridable; and a firm rejection of the idea that AI could replace teachers.</li>\n          <li><strong>The AI4Education working group</strong>: AI literacy is an equity issue, and gating it behind computer science guarantees it reaches the wrong students.</li>\n          <li><strong>The systematic review in <em>Frontiers in Education</em></strong>: professional development must go beyond technical proficiency to pedagogical integration and digital literacy — and adoption pressure in developing countries may outrun institutional capacity.</li>\n          <li><strong>MGT's analysis</strong>: the operational applications — scheduling, enrolment forecasting, resource allocation — are real, immediate and separate from instructional claims.</li>\n        </ul>\n        <p>The common thread: <strong>this is a teaching and leadership problem that happens to involve technology.</strong> Almost every constraint identified is one a teacher or a school can act on without technical capability or significant budget.</p>"
      },
      {
        "h": "A term-by-term plan for your own practice",
        "html": "\n        <p><strong>Term 1 — reclaim time and remove ambiguity.</strong></p>\n        <ul class=\"body\">\n          <li>Build your personal prompt library, starting with the misconception hunt and worked examples (Module 3)</li>\n          <li>Batch your planning into one weekly session</li>\n          <li>Put an AI level on every assignment sheet (Module 6)</li>\n          <li>Have the honest conversation with your classes</li>\n          <li>Decide where the reclaimed time goes, and defend it</li>\n        </ul>\n        <p><strong>Term 2 — improve what students receive.</strong></p>\n        <ul class=\"body\">\n          <li>Differentiate one unit properly across four scaffolded versions, holding the objective constant (Module 4)</li>\n          <li>Convert one rubric into student-facing self-check questions (Module 5)</li>\n          <li>Run one class-level pattern analysis on a set of responses and re-teach accordingly</li>\n          <li>Add a two-minute oral defence to one assessment (Module 7)</li>\n          <li>Run one AI literacy activity with a class (Module 8)</li>\n        </ul>\n        <p><strong>Term 3 — redesign and extend.</strong></p>\n        <ul class=\"body\">\n          <li>Convert one major assessment to staged submission with process evidence</li>\n          <li>Introduce one AI-integrated task where using AI well is the assessed skill</li>\n          <li>Complete the pre-adoption checklist for any tool your school uses with students (Module 9)</li>\n          <li>Share what worked and what did not with two colleagues</li>\n        </ul>"
      },
      {
        "h": "Considerations for Nepal and comparable systems",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Large classes make differentiation impossible by hand and possible with AI.</strong> This is the strongest single argument for adoption in this context, and it costs nothing beyond a teacher's phone.</li>\n          <li><strong>Keep AI on the teacher's side.</strong> Printed differentiated sheets, board work and oral question banks deliver the benefit into classrooms where no student owns a device — and deliver it equally.</li>\n          <li><strong>Test Nepali-language output before relying on it.</strong> Performance in Nepali and other regional languages is materially weaker than in English. Have a fluent colleague check anything going to parents.</li>\n          <li><strong>Second-language writing makes detection tools actively dangerous here.</strong> The population most likely to be wrongly flagged is the majority of your students. This is a policy position worth defending in your staffroom.</li>\n          <li><strong>Curriculum alignment must be checked every time.</strong> Default output aligns to American or British curricula. Confidently misaligned content is worse than no content.</li>\n          <li><strong>Adoption pressure may outrun capacity.</strong> The <em>Frontiers</em> review's warning applies directly: be willing to go slower than the marketing suggests, on Coquitlam's model.</li>\n          <li><strong>There is a genuine advantage.</strong> Schools without large legacy technology investments have nothing to unwind. A teacher with a phone and a photocopier can start on Monday, which is not true of institutions with entrenched systems to migrate.</li>\n        </ul>"
      },
      {
        "h": "The habits that sustain the practice",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Apply the two-question test</strong> to every proposed use: whose cognitive effort is this, and is that effort the point or overhead?</li>\n          <li><strong>Verify before you duplicate.</strong> Never photocopy a generated resource you have not read end to end.</li>\n          <li><strong>Put the pedagogy in the prompt.</strong> Name worked examples, interleaving, retrieval. Your expertise is what makes the tool worth using.</li>\n          <li><strong>Never enter identifiable student data.</strong> Make generic description automatic.</li>\n          <li><strong>Keep the prompt library growing.</strong> It compounds; nothing else in this programme does.</li>\n          <li><strong>Keep one honest weekly note</strong> of what worked and what it got wrong. After a term you have evidence rather than impressions.</li>\n          <li><strong>Protect the human parts.</strong> Discussion, disagreement, relationship, the two minutes with the student who needs them. These are the point, and they are what the reclaimed time is for.</li>\n        </ul>"
      },
      {
        "h": "What to say when colleagues ask",
        "html": "\n        <p>You will be asked, and probably soon. Four positions worth holding clearly:</p>\n        <ol class=\"body\">\n          <li><strong>\"It will replace us.\"</strong> No serious source in the literature supports this, and the US Department of Education firmly rejects it. What the evidence shows is administrative burden reduced and time returned to teaching.</li>\n          <li><strong>\"Students will cheat.\"</strong> They already do, detection does not work and discriminates against second-language writers, and the answer is assessment design plus explicit expectations — not surveillance.</li>\n          <li><strong>\"We cannot afford it.\"</strong> Everything in Modules 3 through 8 works with one teacher, one phone and a photocopier. The expensive version is optional.</li>\n          <li><strong>\"It is not accurate.\"</strong> Correct, and that is why teacher verification is non-negotiable and why it is a drafting tool rather than an authority. That limitation is manageable; it is not disqualifying.</li>\n        </ol>"
      },
      {
        "h": "The standard to hold",
        "html": "\n        <p>Chatfield's closing argument is the right note to end on, and it is a demanding one.</p>\n        <p><strong>So long as the purpose of automation is to elevate rather than displace human skill, it can feed a culture of excellence and engagement.</strong> The analogy is chess: superhuman AI did not destroy the game. It made leading players stronger, helped legions of others learn faster and deepened appreciation of the highest-level play. Taken in isolation chess is zero-sum, but as an institution it is enriched by every player who participates and every technology that widens access.</p>\n        <p>He is equally clear about what excellence now requires of educators: mastering twin domains. On the human side, <em>deep pedagogical empathy for how people actually learn, sensitivity to individual differences, and the capacity to combine psychological safety with intellectual challenge.</em> On the machine side, <em>an informed strategic understanding of what AI can and cannot do, skill in prompt design, the evaluation of outputs and awareness of biases and limitations.</em></p>\n        <p>Intellectual excellence in an AI age is not about competing with machines on their terms. It is about developing the distinctly human capabilities they can enhance rather than replace: <strong>framing problems critically and creatively, synthesising across domains, bringing ethical judgement to bear, and collaborating and communicating richly.</strong></p>\n        <p>Those are the things you were always teaching. The tools have changed. The job has not.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: pick one thing and start it this week",
      "text": "The most common outcome of a course like this is a thoughtful plan that never begins, because it waits for a training day that never gets scheduled. Avoid that. Choose one item from Term 1 and start it before this week ends — the misconception prompt for your hardest upcoming lesson is usually the right choice, because it takes ten minutes, it visibly improves the lesson, and success with it makes everything else in the programme credible to you."
    },
    "activity": {
      "title": "Capstone: your implementation plan",
      "text": "Write a plan of no more than four pages for your own practice and, if you lead others, your institution: <strong>(1)</strong> the three problems you are using AI to address, named specifically; <strong>(2)</strong> your term-by-term plan with dates; <strong>(3)</strong> your AI maturity matrix as it will appear on assignment sheets; <strong>(4)</strong> your one-page acceptable use policy and parent communication if you lead a school; <strong>(5)</strong> what you will measure at five weeks and what would make you stop; and <strong>(6)</strong> what you will do with the time you reclaim. Then give it to one colleague and ask them to hold you to it."
    },
    "takeaways": [
      "The evidence converges: this is a teaching and leadership problem that happens to involve technology",
      "Term 1 reclaim time and remove ambiguity; Term 2 improve what students receive; Term 3 redesign assessment",
      "Large classes make differentiation impossible by hand and possible with AI — the strongest local argument",
      "Detection tools are actively dangerous where most students write in a second language",
      "Schools without legacy technology investment have nothing to unwind and can start on Monday",
      "Protect the human parts — discussion, disagreement, relationship — because that is what the time is for",
      "Elevation rather than displacement is the standard; the tools have changed, the job has not"
    ],
    "quiz": [
      {
        "q": "The common thread across all six sources informing this programme is that AI in education is:",
        "opts": [
          "A risk best managed by restriction",
          "A teaching and leadership problem that happens to involve technology",
          "Only viable for well-funded institutions",
          "Primarily a technology procurement decision"
        ],
        "a": 1,
        "fb": "Almost every constraint identified is one a teacher or school can act on without technical capability or significant budget."
      },
      {
        "q": "In a large class where differentiation by hand is impossible, AI's strongest contribution is:",
        "opts": [
          "Automating attendance",
          "Replacing group work",
          "Making genuine differentiation feasible for the first time, at the cost of a teacher's phone",
          "Reducing class size"
        ],
        "a": 2,
        "fb": "This is the strongest single argument for adoption in a resource-constrained context, and it requires no student devices."
      },
      {
        "q": "A colleague says 'students will just cheat'. The evidence-based response is:",
        "opts": [
          "Return entirely to handwritten examinations",
          "Ban all devices from the school",
          "Purchase better detection software",
          "They already do; detection fails and discriminates against second-language writers, so the answer is assessment design and explicit expectations"
        ],
        "a": 3,
        "fb": "Detection is unreliable at best and discriminatory at worst. Task design plus a visible maturity matrix addresses the actual problem."
      },
      {
        "q": "Schools without large legacy technology investments are described as having:",
        "opts": [
          "A genuine advantage — nothing to unwind, and a teacher with a phone and a photocopier can start immediately",
          "No realistic path to adoption",
          "A need to wait for government funding",
          "An insurmountable disadvantage"
        ],
        "a": 0,
        "fb": "Institutions with entrenched systems face migration costs that a school starting fresh simply does not have."
      },
      {
        "q": "Chatfield's chess analogy illustrates that:",
        "opts": [
          "Games are a poor model for education",
          "Automation that elevates rather than displaces human skill can raise the standard for everyone",
          "AI will eventually surpass all human activity",
          "Competitive games are unaffected by technology"
        ],
        "a": 1,
        "fb": "Superhuman AI made leading players stronger, helped others learn faster, and deepened appreciation of top-level play."
      },
      {
        "q": "According to Chatfield, excellence for educators in an AI age requires mastering:",
        "opts": [
          "Detection software administration",
          "Vendor negotiation",
          "Twin domains — pedagogical empathy for how people learn, and informed strategic understanding of what AI can and cannot do",
          "Programming and data science"
        ],
        "a": 2,
        "fb": "The art lies in linking the two productively: using AI for routine work while reserving human attention for complex interpersonal work."
      }
    ]
  }
];
