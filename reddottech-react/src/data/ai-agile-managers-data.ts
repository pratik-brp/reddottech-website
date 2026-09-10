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

export const agileManagersLessons: Lesson[] = [
  {
    "id": "n1",
    "tag": "Module 1",
    "time": "45 min",
    "title": "What Agile Actually Is — and What It Is Not",
    "summary": "Separating the mindset from the ceremonies, and both from the marketing",
    "objectives": [
      "State what the Agile Manifesto actually says, and what it deliberately does not say",
      "Distinguish an agile mindset from agile mechanics, and know why the difference decides outcomes",
      "Recognise the most common misreadings of agile that managers act on",
      "Understand where agile came from and why it spread beyond software",
      "Judge whether your organisation is doing agile or being agile"
    ],
    "sections": [
      {
        "h": "Who this programme is for",
        "html": "\n        <p>This programme is written for <strong>managers, heads of function, programme and portfolio leads, and executives</strong> — people who fund agile work, govern it, staff it and answer for it, but who do not run a daily standup.</p>\n        <p>It assumes you are experienced. It will not teach you to write a user story or facilitate a retrospective; the companion programme <em>Agile Methodologies for Software Developers</em> does that. This one is about the decisions that sit above the team: which approach fits which work, how to fund it, how to structure teams around it, what to measure, how to govern it, whether to scale it, and how to lead the change without becoming one of the majority of transformations that quietly fail.</p>\n        <p>It also takes a position: <strong>agile is a means, not an end.</strong> A great deal of what is sold as agile transformation is ceremony without consequence. The programme is built to help you tell the difference.</p>"
      },
      {
        "h": "What the Manifesto says",
        "html": "\n        <p>In 2001, seventeen software practitioners published the Agile Manifesto. It is four value statements and twelve principles, and its structure is more important than most managers realise. The four values are expressed as <strong>preferences, not prohibitions</strong>:</p>\n        <ul class=\"body\">\n          <li><strong>Individuals and interactions</strong> over processes and tools</li>\n          <li><strong>Working software</strong> over comprehensive documentation</li>\n          <li><strong>Customer collaboration</strong> over contract negotiation</li>\n          <li><strong>Responding to change</strong> over following a plan</li>\n        </ul>\n        <p>The authors added a sentence that is almost always dropped when the values are quoted: <em>\"while there is value in the items on the right, we value the items on the left more.\"</em></p>\n        <div class=\"callout warn\"><h4>The misreading that causes the most damage</h4><p style=\"margin:0\">\"Working software over comprehensive documentation\" does not mean <strong>no</strong> documentation. \"Responding to change over following a plan\" does not mean <strong>no</strong> plan. Managers who read the Manifesto as a licence to abandon the right-hand column produce projects with no records, no architecture, no forecast and no accountability — and then conclude that agile does not work. It was a statement about relative weight, and it has been read for twenty years as a statement about elimination.</p></div>"
      },
      {
        "h": "Mindset versus mechanics",
        "html": "\n        <p>The single most useful distinction in this programme. Organisations adopt agile at two very different depths:</p>\n        <ul class=\"body\">\n          <li><strong>Mechanics — \"doing agile.\"</strong> The team holds standups, works in two-week sprints, keeps a backlog and runs retrospectives. The visible practices are present.</li>\n          <li><strong>Mindset — \"being agile.\"</strong> Decisions move to the people closest to the work. Plans are treated as forecasts to be revised rather than promises to be defended. Change is treated as information rather than failure. Work is measured by value delivered rather than effort expended.</li>\n        </ul>\n        <p>Mechanics without mindset is the most common outcome of an agile transformation, and it is worse than not starting. The team now attends four additional meetings a week, still receives fixed scope on a fixed date from above, still cannot change anything, and has learned that \"agile\" is a word management uses when it wants more work in less time. Cynicism follows, and it is durable.</p>\n        <p>Your practical test as a manager: <strong>when the team learns something that invalidates the plan, what happens?</strong> If the plan changes, you have the mindset. If the team is asked to catch up, you have the mechanics only.</p>"
      },
      {
        "h": "Where it came from, and why it spread",
        "html": "\n        <p>Agile originated in software in the early 2000s as a response to a specific failure: large sequential projects that specified everything in advance, built for a year or more, and delivered something the customer no longer wanted. The core insight was not about software. It was about <strong>the cost of being wrong for a long time without finding out.</strong></p>\n        <p>That is why it spread. Organisations in manufacturing, education, healthcare, financial services and government have adopted agile approaches, seeking to become quicker, more responsive and more flexible in fast-moving and complex environments. The Project Management Institute, working with the Agile Alliance, published the <em>Agile Practice Guide</em> specifically for practitioners moving from traditional environments — a signal that agile had become mainstream rather than fringe.</p>\n        <p>The World Economic Forum has gone further, applying the concept to public policy itself. Its 2018 white paper <em>Agile Governance</em> argues that as traditional policy development lags behind the pace of technological change, governance must become more iterative, more experimental and more collaborative with non-government actors. If the idea now applies to lawmaking, it is not merely a software fashion.</p>"
      },
      {
        "h": "What agile is not",
        "html": "\n        <p>Five claims you will hear that are not true, and that you should be prepared to correct:</p>\n        <ul class=\"body\">\n          <li><strong>It is not faster by default.</strong> It shortens the time to <em>feedback</em>, not necessarily the time to completion. A project may take just as long and simply be wrong less often.</li>\n          <li><strong>It is not cheaper by default.</strong> It changes when money is spent and what you get for it. It is not a cost-reduction programme, and presenting it as one sets a trap you will fall into at the first budget review.</li>\n          <li><strong>It is not a substitute for planning.</strong> Research comparing agile and traditional projects has found no difference in the amount of upfront planning; agile projects that plan substantially during execution end up planning <em>more</em> in total.</li>\n          <li><strong>It is not undisciplined.</strong> Done properly it demands more discipline than a stage-gated approach, because there is no long quiet period in which problems can hide.</li>\n          <li><strong>It is not universally applicable.</strong> This is the most important, and Module 2 gives you the evidence. There are conditions under which agile outperforms and conditions under which it does not.</li>\n        </ul>"
      },
      {
        "h": "The vocabulary you need to be precise about",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Iterative</strong> — repeating a cycle to refine the same thing. <strong>Incremental</strong> — delivering finished pieces one at a time. Agile is usually both; they are not synonyms.</li>\n          <li><strong>Predictive (waterfall)</strong> — scope fixed early, time and cost estimated from it.</li>\n          <li><strong>Adaptive</strong> — time and cost fixed, scope varies. This inversion is the heart of the model.</li>\n          <li><strong>Hybrid</strong> — a deliberate combination of predictive and adaptive elements in one initiative. Very common and entirely legitimate.</li>\n          <li><strong>Framework</strong> — Scrum, Kanban, XP, SAFe. A structure, not a methodology in the older sense.</li>\n          <li><strong>Business agility</strong> — the whole organisation's ability to sense and respond, extending beyond delivery teams to finance, HR, marketing and operations.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: ask what happens when the plan is wrong",
      "text": "When you want to know how agile an organisation genuinely is, do not count its ceremonies. Ask one question of a team: \"The last time you discovered something that meant the plan was wrong — what happened?\" The answer tells you everything. Teams in genuinely adaptive organisations describe a conversation, a re-prioritisation and a changed forecast. Teams in ceremonial organisations describe overtime. The ceremonies are identical in both cases, which is why counting them tells you nothing."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Write down the four Manifesto values, then, for each, note honestly what your organisation actually rewards when the two sides conflict. Where the right-hand item wins in practice, name the mechanism that makes it win — a contract clause, a reporting requirement, an approval gate, a bonus scheme. Those mechanisms, not the team's habits, are what you will need to change."
    },
    "takeaways": [
      "The Manifesto states preferences, not prohibitions — the right-hand column still has value",
      "Mechanics without mindset is worse than not starting, because it produces durable cynicism",
      "The diagnostic question is what happens when the team learns the plan is wrong",
      "Agile shortens time to feedback rather than time to completion",
      "Agile projects do not plan less; those planning during execution plan more overall",
      "Adaptive approaches fix time and cost and let scope vary — the inversion of predictive work",
      "The approach is not universally applicable, and Module 2 sets out the conditions"
    ],
    "quiz": [
      {
        "q": "The Agile Manifesto values 'working software over comprehensive documentation'. This means that:",
        "opts": [
          "Documentation still has value but carries less weight in a conflict",
          "Documentation should be eliminated entirely from all agile projects",
          "Documentation is the responsibility of a separate team",
          "Documentation is produced only after the software ships"
        ],
        "a": 0,
        "fb": "The Manifesto explicitly states there is value in the items on the right. Reading it as elimination produces projects with no records and no accountability."
      },
      {
        "q": "An organisation runs standups, sprints and retrospectives, but scope and deadlines are still fixed from above. This is best described as:",
        "opts": [
          "A mature agile implementation at scale",
          "Mechanics without mindset, which tends to produce cynicism",
          "Normal early-stage adoption that tends to resolve itself over time",
          "A hybrid approach combining agile and predictive"
        ],
        "a": 1,
        "fb": "The team gains meetings without gaining the ability to adapt, and learns that agile is a word used to request more work."
      },
      {
        "q": "Research comparing upfront planning in agile and traditional projects has found that:",
        "opts": [
          "Traditional projects skip planning more often than agile",
          "Agile projects consistently plan far less than traditional ones",
          "There is no difference in mean upfront planning between them",
          "Planning has no measurable effect on either type"
        ],
        "a": 2,
        "fb": "And where substantial planning happens during execution, agile projects end up doing more planning overall, not less."
      },
      {
        "q": "In an adaptive approach, which variables are typically fixed and which varies?",
        "opts": [
          "Scope is fixed; time and cost are estimated from it",
          "All three are fixed at the start of the work",
          "Cost is fixed; scope and time both vary freely",
          "Time and cost are fixed; scope is allowed to vary"
        ],
        "a": 3,
        "fb": "This inversion of the predictive model is the structural heart of adaptive delivery, and it drives the funding questions in Module 7."
      },
      {
        "q": "'Iterative' and 'incremental' describe:",
        "opts": [
          "Repeating a cycle to refine, versus delivering finished pieces",
          "The same practice under two different names",
          "Planning styles used only in scaled frameworks",
          "Two competing schools of thought within the broader agile community"
        ],
        "a": 0,
        "fb": "Agile approaches are usually both at once, but the terms are not interchangeable and precision matters in governance discussions."
      },
      {
        "q": "The World Economic Forum's 2018 work on agile governance argues that:",
        "opts": [
          "Public sector agility requires new legislation first",
          "Policy-making must become more iterative as technology outpaces it",
          "Agile methods are fundamentally unsuitable for regulated environments",
          "Governments should adopt Scrum for internal projects"
        ],
        "a": 1,
        "fb": "Traditional policy development lags the pace of innovation, prompting more experimental and collaborative governance approaches."
      }
    ]
  },
  {
    "id": "n2",
    "tag": "Module 2",
    "time": "55 min",
    "title": "When Agile Works — and When It Does Not",
    "summary": "The empirical evidence, including the conditions under which it underperforms",
    "objectives": [
      "Understand what large-sample research actually shows about agile and project success",
      "Identify the project conditions that favour or disfavour adaptive approaches",
      "Apply a suitability assessment before committing to an approach",
      "Recognise when a hybrid approach is the correct answer",
      "Avoid the two opposite errors of universal adoption and blanket rejection"
    ],
    "sections": [
      {
        "h": "The evidence base, and why it is thin",
        "html": "\n        <p>Agile is advocated across the professional and academic literature as a superior approach, but empirical evidence substantiating the claim has been notably sparse. Most of what managers are shown is vendor case studies and consultancy surveys with obvious selection effects.</p>\n        <p>A 2025 study published in the <em>Engineering Management Journal</em> by Serrador and Zadeh is among the more useful correctives. The authors analysed <strong>1,002 projects across multiple industries and countries</strong>, of which roughly 935 reported incorporating some form of agile or iterative component. Their headline result supports the general claim — <strong>a higher proportion of agile or iterative usage is associated with higher ratings for stakeholder success and overall project success</strong> — but the conditional findings are the reason to read it.</p>"
      },
      {
        "h": "Where agile outperforms",
        "html": "\n        <p>The study found agile methods more successful than traditional methods particularly under these conditions:</p>\n        <ul class=\"body\">\n          <li><strong>Experienced teams.</strong> A significant proportion of experienced members improves outcomes materially.</li>\n          <li><strong>Smaller teams.</strong> Benefits diminish as team size grows.</li>\n          <li><strong>Medium to low stakeholder engagement.</strong> Counter-intuitive, and discussed below.</li>\n          <li><strong>Unclear goals.</strong> Where the objective is genuinely uncertain at the outset, adaptive approaches earn their cost.</li>\n          <li><strong>Medium to high complexity.</strong> The harder the problem, the more valuable frequent feedback becomes.</li>\n        </ul>"
      },
      {
        "h": "Where it underperforms",
        "html": "\n        <p>The same study found the effectiveness of agile methods <strong>limited</strong> in:</p>\n        <ul class=\"body\">\n          <li><strong>Low-complexity projects with clear goals.</strong> If you know exactly what is needed and it is not difficult, the overhead of iteration buys little.</li>\n          <li><strong>Large teams.</strong> Coordination costs rise faster than the benefit.</li>\n          <li><strong>High stakeholder engagement.</strong> Where stakeholders are already deeply involved, agile's feedback machinery adds less that was not already present.</li>\n          <li><strong>Inexperienced teams.</strong> Self-organisation assumes judgement the team may not yet have.</li>\n        </ul>\n        <div class=\"callout note\"><h4>The finding that should temper the sales pitch</h4><p style=\"margin:0\">The authors conclude that these results <strong>challenge assumptions about agile's universal applicability</strong>, and emphasise the benefit of carefully evaluating project-specific factors before implementation. They also note, in fairness, that teams appear to benefit from adopting agile methods <em>even where the project does not fit the ideal use case</em> — which is why they regard the growth of agile as justified. Both halves of that finding matter.</p></div>"
      },
      {
        "h": "The inexperienced team problem",
        "html": "\n        <p>This deserves separate treatment because it is the condition managers most often get wrong, and it is directly relevant to organisations building capability from a standing start.</p>\n        <p>Agile frameworks deliberately remove structure: no detailed upfront specification, no assigned tasks, no supervisor allocating work. That absence is productive for a team with the judgement to fill it and destructive for a team without. An inexperienced team given autonomy and no guidance does not self-organise; it stalls, or it builds the wrong thing confidently.</p>\n        <p>The managerial implication is not to withhold agile from junior teams. It is to <strong>supply the structure the framework removed</strong>, through a strong technical lead, explicit engineering standards, a definition of done that is actually enforced, and closer coaching than a mature team requires. The teams that fail are the ones given the autonomy without the scaffolding.</p>"
      },
      {
        "h": "A practical suitability assessment",
        "html": "\n        <p>Various assessment models exist to determine likely fit or gaps for agile approaches, scoring project and organisational factors to indicate alignment or risk. A workable short version — rate each 1 to 5:</p>\n        <ol class=\"body\">\n          <li><strong>Requirement uncertainty.</strong> How likely is it that what is needed will change? <em>High favours adaptive.</em></li>\n          <li><strong>Feedback availability.</strong> Can we show something to a real user or customer every few weeks? <em>If not, iteration loses much of its value.</em></li>\n          <li><strong>Team experience.</strong> Have these people delivered this kind of work before?</li>\n          <li><strong>Team size and dedication.</strong> Small and dedicated, or large and fragmented across other work?</li>\n          <li><strong>Cost of change late.</strong> High cost of late change favours more upfront definition.</li>\n          <li><strong>Organisational tolerance.</strong> Can funding, governance and contracts actually accommodate varying scope?</li>\n        </ol>\n        <p>Item 6 is the one that fails most often, and it fails at the organisation's level rather than the team's. A team can be perfectly suited to adaptive delivery inside an organisation that cannot fund it, govern it or contract for it. Modules 7 and 9 address this directly.</p>"
      },
      {
        "h": "Hybrid is normal, not a compromise",
        "html": "\n        <p>It is not necessary to use a single approach for an entire initiative, and combining predictive, iterative, incremental and adaptive elements produces a hybrid approach that is often the correct answer rather than a failure of nerve.</p>\n        <p>Common and defensible patterns:</p>\n        <ul class=\"body\">\n          <li><strong>Agile development, predictive rollout.</strong> Iterative build followed by a sequenced deployment — standard where regulatory approval, physical logistics or training gate the release.</li>\n          <li><strong>Predictive front end, agile delivery.</strong> Architecture, procurement or regulatory groundwork settled first, then adaptive build.</li>\n          <li><strong>Agile core, predictive dependencies.</strong> The team works adaptively while integrating with vendors and functions that cannot.</li>\n        </ul>\n        <p>Presenting hybrid honestly matters politically. Teams that describe a hybrid approach as \"agile\" invite the criticism that they are not doing it properly; teams that name it as a deliberate hybrid, with reasons, are much harder to argue with.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: run the suitability filter before the kickoff",
      "text": "Before committing an initiative to an approach, score it on the six factors with the sponsor, the delivery lead and someone from finance in the room. It takes forty minutes. The value is rarely the score — it is that the disagreements surface immediately. When the delivery lead rates requirement uncertainty at 5 and the sponsor rates it at 1, you have found the argument you were otherwise going to have in month seven, at far greater cost."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take two current initiatives — ideally one you believe suits agile and one you suspect does not. Score both across the six suitability factors. For the weaker fit, decide specifically what you would do: run it predictively, run a hybrid with named boundaries, or fix the organisational constraint that is causing the low score. Write the reasoning down; it is the argument you will need at the next steering meeting."
    },
    "takeaways": [
      "A 1,002-project study associates higher agile usage with higher stakeholder and overall success",
      "Agile outperforms with experienced teams, smaller teams, unclear goals and higher complexity",
      "Its benefits are limited in low-complexity work with clear goals, large teams and inexperienced teams",
      "Teams still appear to benefit even outside the ideal use case, which justifies the general growth",
      "Inexperienced teams need the structure the framework removed, not less guidance",
      "Organisational tolerance for varying scope is the suitability factor that most often fails",
      "Hybrid approaches are legitimate; name them honestly rather than calling them agile"
    ],
    "quiz": [
      {
        "q": "The Serrador and Zadeh study of 1,002 projects found agile methods to be MOST effective in projects with:",
        "opts": [
          "Low complexity with clearly specified and stable requirements",
          "Large teams and highly engaged stakeholders",
          "Experienced teams, smaller size and unclear goals",
          "Fixed budgets and externally mandated deadlines"
        ],
        "a": 2,
        "fb": "The same study found benefits limited in low-complexity work with clear goals, large teams, or high stakeholder engagement."
      },
      {
        "q": "Why do inexperienced teams often struggle with agile approaches?",
        "opts": [
          "They lack the tools required by most frameworks",
          "Agile frameworks explicitly exclude junior practitioners from team roles",
          "They are usually assigned to lower-priority initiatives",
          "Frameworks remove structure they do not yet have judgement to replace"
        ],
        "a": 3,
        "fb": "The answer is to supply the removed structure through technical leadership and an enforced definition of done, not to withhold agile."
      },
      {
        "q": "Which suitability factor most often fails at the organisational rather than the team level?",
        "opts": [
          "Whether funding, governance and contracts can accommodate varying scope",
          "Whether feedback can be gathered every few weeks",
          "Whether the team has delivered similar work before",
          "Whether the requirements are likely to change materially during delivery"
        ],
        "a": 0,
        "fb": "A team can be perfectly suited to adaptive delivery inside an organisation that cannot fund it, govern it or contract for it."
      },
      {
        "q": "An initiative uses iterative development followed by a sequenced regulatory rollout. This should be described as:",
        "opts": [
          "A failed agile implementation needing correction",
          "A deliberate hybrid approach, named and justified",
          "An immature stage on the way to full agility",
          "A predictive project with agile terminology applied"
        ],
        "a": 1,
        "fb": "Naming a hybrid honestly, with reasons, is far more defensible than describing it as agile and inviting the charge of doing it badly."
      },
      {
        "q": "The study's finding on stakeholder engagement was that agile benefits were greater with:",
        "opts": [
          "Consistently high stakeholder engagement",
          "Engagement limited to the sponsor alone",
          "Medium to low stakeholder engagement",
          "No stakeholder engagement whatsoever"
        ],
        "a": 2,
        "fb": "Where stakeholders are already deeply involved, agile's feedback machinery adds less that was not already present."
      },
      {
        "q": "What did the authors conclude about agile's universal applicability?",
        "opts": [
          "It should be restricted to software development only",
          "It applies equally well across all project types",
          "Universal adoption remains fully justified despite the mixed empirical results",
          "Their findings challenge that assumption and favour case-by-case evaluation"
        ],
        "a": 3,
        "fb": "They nonetheless note teams benefit even outside the ideal use case, so the growth of agile is justified. Both halves matter."
      }
    ]
  },
  {
    "id": "n3",
    "tag": "Module 3",
    "time": "55 min",
    "title": "Choosing an Approach: Scrum, Kanban, XP and Hybrids",
    "summary": "What each framework is actually for, and how to select between them",
    "objectives": [
      "Describe what Scrum, Kanban and XP each optimise for",
      "Match a framework to the characteristics of the work and the team",
      "Understand when combining frameworks is appropriate",
      "Recognise the failure modes specific to each approach",
      "Make and defend a framework selection decision"
    ],
    "sections": [
      {
        "h": "Scrum — cadence and commitment",
        "html": "\n        <p>Scrum organises work into short fixed cycles called <strong>sprints</strong>, usually one to four weeks, each ending in a potentially releasable increment. It is the most widely adopted framework and the one most managers will encounter first.</p>\n        <p><strong>Three roles.</strong> The <em>Product Owner</em> maximises product value by managing and prioritising the backlog, acting as the voice of the customer. The <em>Scrum Master</em> serves the team by removing impediments and upholding the process. The <em>Development Team</em> builds the increment and is self-managing.</p>\n        <p><strong>Five events.</strong> Sprint Planning selects work and sets a goal; the Daily Scrum is a short alignment meeting; the Sprint Review demonstrates the increment to stakeholders and gathers feedback; the Sprint Retrospective examines how the team worked; and the Sprint itself contains the others. Backlog refinement is a continuous activity widely adopted alongside these.</p>\n        <p><strong>Three artefacts.</strong> The Product Backlog is the prioritised list of everything wanted. The Sprint Backlog is the subset selected for this sprint, and it belongs to the team. The Increment is the working output.</p>\n        <p><strong>Scrum suits</strong> work that can be sliced into two-week chunks, teams that benefit from rhythm, and situations where a regular demonstration to stakeholders is valuable. <strong>Its failure mode</strong> is the sprint becoming a treadmill — the cadence is kept, the goal is not, and the retrospective becomes a ritual with no consequences.</p>"
      },
      {
        "h": "Kanban — flow and limits",
        "html": "\n        <p>Kanban has no sprints, no fixed roles and no timeboxes. It has a visualised workflow, explicit <strong>work-in-progress limits</strong>, and a focus on reducing the time an item takes to travel from request to done.</p>\n        <p>The central mechanism is the WIP limit, and it is genuinely counter-intuitive to most managers: <strong>constraining how many items may be in progress at once increases throughput.</strong> Starting less work finishes more work, because context switching and queueing are the dominant costs in knowledge work.</p>\n        <p><strong>Kanban suits</strong> work that arrives unpredictably and cannot be batched into sprints — support, operations, maintenance, small change requests, and any team that is interrupt-driven. It also suits teams whose work items vary enormously in size, where sprint commitment is meaningless.</p>\n        <p><strong>Its failure mode</strong> is a board with no limits, which is simply a visible to-do list. If the WIP limits are absent or routinely ignored, the team is not doing Kanban.</p>"
      },
      {
        "h": "Extreme Programming — technical discipline",
        "html": "\n        <p>XP is the framework concerned with <em>how the work is done technically</em> rather than how it is organised. Its practices include test-driven development, pair programming, continuous integration, collective code ownership, refactoring and a sustainable pace.</p>\n        <p>XP matters to managers for a reason that is easy to miss. Scrum and Kanban describe how work flows; neither says anything about engineering quality. <strong>A team can run flawless Scrum and produce software that becomes unmaintainable within two years.</strong> The technical practices are what make sustained iteration possible, and they are the first thing dropped under delivery pressure.</p>\n        <p><strong>XP suits</strong> technically demanding products where quality and frequent release matter. <strong>Its failure mode</strong> is that its practices are seen as optional developer preferences and cut when a deadline approaches — which is precisely when they are load-bearing.</p>"
      },
      {
        "h": "Selecting between them",
        "html": "\n        <p>Selection is a strategic decision based on context, objectives, people and agile maturity, and there is no one-size-fits-all answer. What works for a technology start-up may be wholly inappropriate for a large industrial organisation. Factors to weigh:</p>\n        <ul class=\"body\">\n          <li><strong>Team size.</strong> Small teams work well with Scrum or XP; large efforts may require a scaling framework (Module 10).</li>\n          <li><strong>Nature of the product.</strong> Highly technical products where quality and frequent delivery matter benefit from XP; products with continuous, varied inbound change suit Kanban.</li>\n          <li><strong>Company culture.</strong> Hierarchical organisations resistant to change may need a progressive, educational approach before attempting complex frameworks.</li>\n          <li><strong>Level of uncertainty.</strong> The more volatile the environment, the more a lightweight iterative approach is warranted.</li>\n          <li><strong>Team maturity.</strong> Not all teams are ready to self-organise or apply advanced practices.</li>\n        </ul>\n        <p>Then define the purpose. Speeding time to market, improving business–technology collaboration, raising technical quality and building a customer-centric culture are different goals that point to different answers. If the aim is continuous delivery without blockage, Kanban fits. If the aim is a cohesive team producing iterative deliverables, Scrum is a strong start. If engineering practices are the weakness, XP is the answer.</p>"
      },
      {
        "h": "Combining frameworks",
        "html": "\n        <p>Combination is common and often better than purity:</p>\n        <ul class=\"body\">\n          <li><strong>Scrumban.</strong> Scrum's structure with Kanban's flexibility. Useful for teams that need regular delivery but cannot commit to fixed sprint scope — a very common situation in organisations with significant operational load.</li>\n          <li><strong>Scrum plus XP.</strong> Scrum's product and team management with XP's technical rigour. Arguably the strongest default for a software product team, and the combination most often missing when quality problems appear.</li>\n          <li><strong>Kanban plus Design Thinking.</strong> Suited to discovery phases where the problem itself is still being defined.</li>\n        </ul>"
      },
      {
        "h": "The manager's actual decision",
        "html": "\n        <p>You will rarely choose a framework in the abstract. What you will decide is:</p>\n        <ol class=\"body\">\n          <li><strong>Whether this team gets to choose its own.</strong> Usually it should. Imposed frameworks are complied with rather than used.</li>\n          <li><strong>Whether consistency across teams is worth the cost.</strong> There is real value in a common language for governance and mobility, and real cost in forcing a support team into sprints.</li>\n          <li><strong>Whether the technical practices are in place.</strong> This is the decision most managers neglect and the one with the longest-lasting consequences.</li>\n          <li><strong>What you will do when the framework and a deadline conflict.</strong> Decide before it happens, because in the moment you will decide badly.</li>\n        </ol>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the interrupt test",
      "text": "If you are unsure whether a team should run Scrum or Kanban, count its interruptions. Ask the team to log, for two weeks, every piece of unplanned work that arrives and must be handled within days. If unplanned work regularly exceeds roughly a quarter of capacity, sprint commitment is a fiction and the team will fail its sprint goal every cycle for reasons outside its control. Put that team on Kanban with WIP limits and stop asking it to commit to two weeks of scope it does not control."
    },
    "activity": {
      "title": "Workplace application",
      "text": "For one team you are responsible for, work through the five selection factors and state which framework you would choose and why. Then answer the fourth manager's decision explicitly: write down what you will do when the framework and a deadline conflict, and share it with the team before it happens. Finally, check whether the technical practices in Module 3's XP section are present — and if not, note what it would take to establish them."
    },
    "takeaways": [
      "Scrum provides cadence and commitment; its failure mode is a treadmill with no goal",
      "Kanban limits work in progress; starting less work finishes more work",
      "A board without WIP limits is a visible to-do list, not Kanban",
      "XP governs technical quality, which neither Scrum nor Kanban addresses at all",
      "A team can run flawless Scrum and still produce unmaintainable software",
      "Selection depends on team size, product nature, culture, uncertainty and maturity",
      "Scrumban and Scrum-plus-XP are common and often better than framework purity"
    ],
    "quiz": [
      {
        "q": "Limiting work in progress in a Kanban system typically results in:",
        "opts": [
          "Higher throughput, because queueing and switching costs fall",
          "Longer cycle times overall but noticeably more predictable delivery",
          "No measurable change to delivery performance",
          "Lower throughput, since fewer items are being worked"
        ],
        "a": 0,
        "fb": "Starting less work finishes more work. Context switching and queueing are the dominant costs in knowledge work."
      },
      {
        "q": "Which framework addresses engineering quality practices directly?",
        "opts": [
          "Scrum, through its sprint review event",
          "Extreme Programming, through its technical practices",
          "Kanban, through its work-in-progress limits",
          "All three address engineering quality to a broadly similar degree"
        ],
        "a": 1,
        "fb": "Scrum and Kanban describe how work flows. Neither says anything about whether the code will be maintainable in two years."
      },
      {
        "q": "A team is interrupted by unplanned urgent work exceeding a quarter of its capacity. The better fit is:",
        "opts": [
          "Extreme Programming, to raise the team's technical quality",
          "Scrum, to impose discipline on the interruptions",
          "Kanban, since sprint commitment would be fiction",
          "A scaling framework to coordinate the demand"
        ],
        "a": 2,
        "fb": "That team will miss its sprint goal every cycle for reasons outside its control, which destroys the meaning of commitment."
      },
      {
        "q": "In Scrum, who owns the Sprint Backlog?",
        "opts": [
          "The Scrum Master, who protects the process",
          "The Product Owner, who prioritises all of the work",
          "The sponsor funding the initiative",
          "The development team that selected the work"
        ],
        "a": 3,
        "fb": "It can be adjusted during the sprint as new learning arises, provided the sprint goal remains the focus."
      },
      {
        "q": "'Scrumban' is best described as:",
        "opts": [
          "Scrum's structure combined with Kanban's flexibility",
          "A certification level above Scrum Master",
          "Scrum applied to more than one team at once",
          "Kanban operated with fixed two-week planning cycles throughout"
        ],
        "a": 0,
        "fb": "Useful for teams needing regular delivery that cannot commit to fixed sprint scope — common where operational load is significant."
      },
      {
        "q": "The framework decision managers most often neglect is:",
        "opts": [
          "Which agile certifications the Scrum Master currently holds",
          "Whether the technical practices are actually in place",
          "How long the sprint should be",
          "Which tool the team uses to track work"
        ],
        "a": 1,
        "fb": "It is the decision with the longest-lasting consequences, and the practices are first to be cut under delivery pressure."
      }
    ]
  },
  {
    "id": "n4",
    "tag": "Module 4",
    "time": "55 min",
    "title": "The Manager's New Role",
    "summary": "From coordinator to servant leader, and what that actually requires",
    "objectives": [
      "Understand what servant leadership means in operational terms",
      "Know what happens to the traditional project manager role",
      "Identify which of your current activities to stop, keep and start",
      "Remove organisational impediments as a primary function",
      "Delegate decisions without abdicating accountability"
    ],
    "sections": [
      {
        "h": "Why the role changes",
        "html": "\n        <p>Many managers are accustomed to sitting at the centre of coordination — tracking progress, resolving dependencies and representing the team's status to the rest of the organisation. That model worked when projects were decomposed into siloed functions and information flowed through a single point.</p>\n        <p>In high-change work there is more complexity than one person can hold. Cross-functional teams coordinate their own work and collaborate with stakeholders directly. The centre of coordination becomes a bottleneck, and the manager's value has to come from somewhere else.</p>\n        <p>The <em>Agile Practice Guide</em> puts the reframing in a single sentence worth remembering: <strong>the value of project managers is not in their position, but in their ability to make everyone else better.</strong></p>"
      },
      {
        "h": "Servant leadership, defined operationally",
        "html": "\n        <p>Servant leadership is the practice of leading through service to the team — understanding and addressing the needs and development of team members to enable the highest possible performance. It is often described in soft terms; it is better understood as a sequence of concrete priorities.</p>\n        <p>Servant leaders approach the work in this order:</p>\n        <ol class=\"body\">\n          <li><strong>Purpose.</strong> Work with the team to define the <em>why</em>, so people can engage and coalesce around the goal. The team optimises at the level of the initiative, not the individual.</li>\n          <li><strong>People.</strong> Once purpose is established, create an environment in which everyone can succeed, and ask each member to contribute across the work rather than only within their speciality.</li>\n          <li><strong>Process.</strong> Do not aim to follow a perfect agile process. Look for results, and let the process serve them.</li>\n        </ol>\n        <p>Note the ordering. Managers who begin with process — which framework, which tool, which ceremony cadence — have started at the third priority and will be puzzled when engagement does not follow.</p>"
      },
      {
        "h": "Removing impediments is the job",
        "html": "\n        <p>Among a servant leader's responsibilities, removing organisational impediments is the one that most directly uses managerial authority — and the one teams most need from you. A team can solve its own technical problems. It cannot get itself a licence approved, a second environment provisioned, a dependency reprioritised in another department, or a security review scheduled before next quarter.</p>\n        <p>Practically:</p>\n        <ul class=\"body\">\n          <li><strong>Maintain a visible impediment list</strong> with owners and dates, exactly as you would a risk register.</li>\n          <li><strong>Take the organisational ones yourself.</strong> If a blocker requires authority the team does not have, it is yours by definition.</li>\n          <li><strong>Measure how long they persist.</strong> Impediment age is one of the most honest metrics of managerial performance in an agile setting.</li>\n          <li><strong>Escalate visibly.</strong> Teams lose faith quickly when blockers disappear into management without a trace.</li>\n        </ul>"
      },
      {
        "h": "Stop, keep, start",
        "html": "\n        <p><strong>Stop:</strong></p>\n        <ul class=\"body\">\n          <li>Assigning individual tasks to individual people. The team pulls work.</li>\n          <li>Being the single channel through which the team talks to stakeholders.</li>\n          <li>Requesting status updates the team's own artefacts already show.</li>\n          <li>Approving technical decisions you are not best placed to judge.</li>\n          <li>Managing utilisation. Busy is not the objective; finished is.</li>\n        </ul>\n        <p><strong>Keep:</strong></p>\n        <ul class=\"body\">\n          <li>Accountability for outcomes. This does not transfer, and pretending it has is how transformations lose executive support.</li>\n          <li>Setting and defending priorities, and saying no on the team's behalf.</li>\n          <li>Managing budget, contracts and vendors.</li>\n          <li>Developing people, handling performance, and hiring.</li>\n        </ul>\n        <p><strong>Start:</strong></p>\n        <ul class=\"body\">\n          <li>Clearing organisational blockers as a primary activity rather than an interruption.</li>\n          <li>Protecting the team from mid-sprint scope injection, including your own.</li>\n          <li>Making the strategic context visible so the team can make good local decisions.</li>\n          <li>Creating the conditions in which bad news travels fast and without punishment.</li>\n        </ul>"
      },
      {
        "h": "Delegating decisions without abdicating",
        "html": "\n        <p>The most common failure among experienced managers adopting agile is one of two extremes: retaining every decision, or announcing that the team is empowered and then disappearing.</p>\n        <p>The workable middle is an explicit decision-rights map. For each recurring decision type, state who decides and who must be consulted:</p>\n        <ul class=\"body\">\n          <li><strong>Team decides:</strong> technical design, task breakdown, estimates, internal process, how work is allocated within the sprint.</li>\n          <li><strong>Product Owner decides:</strong> priority order, what is in scope, acceptance of completed work.</li>\n          <li><strong>Manager decides:</strong> budget, team composition, vendor selection, escalation to senior leadership, whether the initiative continues.</li>\n          <li><strong>Jointly decided:</strong> release dates, definition of done, quality thresholds, anything with both technical and commercial consequences.</li>\n        </ul>\n        <p>Write it on one page and circulate it. Most disputes described as cultural resistance are in fact unresolved ambiguity about who decides.</p>"
      },
      {
        "h": "What senior leaders get wrong",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Treating agile as something the team does.</strong> If governance, funding and reporting are unchanged, the team's autonomy is nominal.</li>\n          <li><strong>Asking for a date and a fixed scope while calling it agile.</strong> You may fix one. Fixing both restores the predictive model with extra meetings.</li>\n          <li><strong>Attending the retrospective.</strong> Your presence changes what is said. Ask for outcomes, not attendance.</li>\n          <li><strong>Rewarding heroics.</strong> Publicly praising the team that worked the weekend teaches everyone that sustainable pace is for people who do not care.</li>\n          <li><strong>Punishing the first honest bad forecast.</strong> You will get one honest forecast, and after that you will get comfortable ones.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: track impediment age",
      "text": "Add one number to your own reporting: the age of the oldest unresolved impediment the team has raised. Not the count — the age. It is the single clearest measure of whether management is functioning as a service to delivery or as an obstacle to it, and unlike velocity it cannot be gamed by the team. If that number is climbing while you are reporting green status, the status is wrong."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Write your decision-rights map on one page using the four categories, then take it to the team and ask where they disagree. The disagreements are the useful part. Separately, list every organisational impediment your teams currently face, mark the ones that require your authority to clear, and put a date against each. Review it weekly for a month and see how many were genuinely blocked on you."
    },
    "takeaways": [
      "The manager's value is not positional but lies in making everyone else better",
      "Servant leadership sequences purpose, then people, then process — in that order",
      "Removing organisational impediments is the primary use of managerial authority",
      "Impediment age is an honest measure of managerial performance that teams cannot game",
      "Accountability for outcomes does not transfer to the team",
      "Most disputes labelled cultural resistance are unresolved ambiguity about who decides",
      "Fixing both scope and date restores the predictive model with additional meetings"
    ],
    "quiz": [
      {
        "q": "In an agile environment, a servant leader addresses which sequence first?",
        "opts": [
          "People, then process, then purpose",
          "Process, then purpose, then people",
          "Purpose, then people, then process",
          "Process and people simultaneously"
        ],
        "a": 2,
        "fb": "Managers who begin with framework and tooling have started at the third priority and are then puzzled when engagement does not follow."
      },
      {
        "q": "Which responsibility clearly remains with the manager rather than the team?",
        "opts": [
          "Estimating how long each item will take",
          "Deciding the technical design of the solution",
          "Breaking the work into individual tasks",
          "Accountability for the initiative's outcomes"
        ],
        "a": 3,
        "fb": "Pretending accountability has transferred to a self-organising team is how transformations lose executive support at the first problem."
      },
      {
        "q": "Why is impediment age a useful managerial metric?",
        "opts": [
          "It shows whether management serves or obstructs delivery",
          "It correlates directly with team velocity and throughput",
          "It is easy to collect from existing tooling",
          "It is required by most agile frameworks"
        ],
        "a": 0,
        "fb": "If that number climbs while status is reported as green, the status is wrong."
      },
      {
        "q": "A senior leader asks for both fixed scope and a fixed date, describing the work as agile. This:",
        "opts": [
          "Is standard practice in mature implementations",
          "Restores the predictive model with extra meetings added",
          "Is acceptable provided the team agrees to it",
          "Improves accountability without harming the team's agility"
        ],
        "a": 1,
        "fb": "You may fix one of the two. Fixing both removes the variable that adaptive delivery depends on."
      },
      {
        "q": "Publicly praising a team for working through a weekend teaches the organisation that:",
        "opts": [
          "Overtime should be formally compensated",
          "Recognition properly follows measurable business outcomes",
          "Sustainable pace applies only to less committed people",
          "The team is well managed and properly resourced"
        ],
        "a": 2,
        "fb": "Rewarding heroics quietly destroys the sustainable pace that makes long-run iteration possible."
      },
      {
        "q": "Most conflict described as 'cultural resistance' to agile is more accurately:",
        "opts": [
          "A generational difference in working styles",
          "Insufficient training in the chosen framework",
          "Deliberate obstruction by middle management",
          "Unresolved ambiguity about who decides what"
        ],
        "a": 3,
        "fb": "A one-page decision-rights map resolves a surprising proportion of it at almost no cost."
      }
    ]
  },
  {
    "id": "n5",
    "tag": "Module 5",
    "time": "55 min",
    "title": "Team Design, Structure and Dedication",
    "summary": "The structural decisions that determine whether any framework can work",
    "objectives": [
      "Design cross-functional teams around value rather than function",
      "Understand why dedicated team members outperform shared ones",
      "Choose an appropriate team size and know why it matters",
      "Manage distributed and co-located teams realistically",
      "Recognise how organisational structure constrains system design"
    ],
    "sections": [
      {
        "h": "Cross-functional means able to finish",
        "html": "\n        <p>A cross-functional team contains all the skills needed to take an item from idea to done without handing it to another group. The test is not whether the team has varied job titles. The test is whether an item can be finished inside the team.</p>\n        <p>If completing a story requires a hand-off to a separate database group, a separate testing group and a separate release group, the team is not cross-functional regardless of what the org chart says. Each hand-off adds a queue, and queues dominate delivery time in knowledge work far more than execution speed does.</p>\n        <p>The managerial implication is uncomfortable: <strong>the reason your teams are slow is usually the shape of the organisation, not the effort of the people.</strong> No framework fixes a structural hand-off. You do.</p>"
      },
      {
        "h": "Dedication beats allocation",
        "html": "\n        <p>The <em>Agile Practice Guide</em> is explicit about dedicated team members, and the reasoning is worth understanding rather than merely accepting.</p>\n        <p>A person allocated 50% to two initiatives does not deliver 50% to each. They deliver materially less, because every switch carries a reload cost, because they cannot be relied on for either team's commitments, and because they attend both sets of meetings while belonging to neither. Fragmenting people across three or four initiatives — common in organisations that measure utilisation — reduces total throughput while appearing on paper to maximise it.</p>\n        <div class=\"callout warn\"><h4>The utilisation trap</h4><p style=\"margin:0\">Managers are frequently measured on resource utilisation, which rewards keeping everyone busy. Agile delivery is optimised for <strong>throughput</strong>, which requires slack. These two objectives are in direct conflict, and the utilisation measure usually wins because it is the one reported upward. If you change nothing else after this programme, stop managing to utilisation.</p></div>"
      },
      {
        "h": "Team size",
        "html": "\n        <p>Empirical work associates <strong>smaller teams with better agile outcomes</strong>, and the effectiveness of agile methods is limited in large teams. The mechanism is communication overhead: the number of pairwise channels grows quadratically with headcount, so a team of twelve carries roughly four times the coordination burden of a team of six.</p>\n        <p>Practical guidance:</p>\n        <ul class=\"body\">\n          <li><strong>Three to nine delivery members</strong> is the conventional band, and it is conventional because it works.</li>\n          <li><strong>Below three</strong>, the team lacks resilience and skill coverage.</li>\n          <li><strong>Above nine</strong>, split by value stream rather than by function. Two cross-functional teams of six outperform one team of twelve.</li>\n          <li><strong>Adding people to a late initiative</strong> slows it further. This has been known for fifty years and is still done every quarter.</li>\n        </ul>"
      },
      {
        "h": "Generalising specialists",
        "html": "\n        <p>The ideal agile team member has depth in one area and working competence in several — sometimes described as T-shaped. This matters because a team of narrow specialists cannot balance load. When the work in a sprint is 70% front-end, a team with one front-end specialist and four others is blocked regardless of total capacity.</p>\n        <p>You cannot hire your way to this quickly, but you can build it: pair people across specialities, rotate work deliberately, make cross-skilling an explicit objective in development conversations, and resist the efficiency argument for always giving work to whoever is fastest at it. That argument is correct for this sprint and wrong for this year.</p>"
      },
      {
        "h": "Distributed teams",
        "html": "\n        <p>Co-location is widely recognised as significant for team effectiveness, and the research is reasonably consistent that it helps. But the finding managers should act on is more nuanced: with the right systems and practices, distributed teams can be effective — collocation and knowledge-transfer systems matter, and their absence can be partially compensated.</p>\n        <p>What actually compensates:</p>\n        <ul class=\"body\">\n          <li><strong>Overlapping hours.</strong> Four hours of genuine overlap is worth more than any tool. Below two, treat the groups as separate teams with a defined interface.</li>\n          <li><strong>Written decision records.</strong> Distributed teams that rely on conversation lose decisions; those that write them down do not.</li>\n          <li><strong>Deliberate informal contact.</strong> The corridor conversation has to be scheduled, which feels artificial and works anyway.</li>\n          <li><strong>Occasional physical co-location.</strong> Bringing a distributed team together at the start and periodically thereafter has a durable effect on trust.</li>\n        </ul>\n        <p>For organisations in Nepal working with international clients, the practical constraint is usually time-zone overlap rather than technology, and it is worth negotiating explicitly in the contract rather than absorbing silently.</p>"
      },
      {
        "h": "Structure shapes the product",
        "html": "\n        <p>Conway's observation — that organisations produce designs which mirror their own communication structures — is one of the more reliable regularities in systems work. A product built by four teams organised by technical layer will have four technical layers and painful seams between them. A product built by teams organised around customer journeys will be structured around customer journeys.</p>\n        <p>The managerial consequence is that <strong>team design is architecture</strong>. You are making a technical decision when you draw the team boundaries, whether or not you intend to. Organise teams around slices of value that a customer would recognise, and the architecture that emerges will be one you can change. Organise them by function, and you will be paying integration costs for the life of the product.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: count the hand-offs",
      "text": "Take one recent item that took much longer than expected and map its actual journey — every team, queue and approval it passed through from request to live. Do not map the process as documented; map what happened. Most managers running this exercise for the first time find that actual work occupied a small fraction of elapsed time and that everything else was waiting. That map is a far more actionable improvement plan than any framework adoption, and it usually points at structure rather than effort."
    },
    "activity": {
      "title": "Workplace application",
      "text": "For one team, list every skill required to take an item from request to production. Mark which sit inside the team and which require a hand-off. For each hand-off, estimate the typical wait. Then decide: can the skill be brought into the team, can the wait be reduced, or must the dependency be managed explicitly? Separately, list every person allocated part-time across initiatives and calculate what full dedication would require."
    },
    "takeaways": [
      "Cross-functional means an item can be finished inside the team without hand-offs",
      "Queues, not execution speed, dominate delivery time in knowledge work",
      "Part-time allocation across initiatives reduces throughput while appearing to maximise it",
      "Utilisation and throughput are in direct conflict; utilisation usually wins because it is reported",
      "Communication channels grow quadratically, so split above nine rather than growing the team",
      "Distributed teams can work, but overlapping hours and written decisions are what compensate",
      "Team design is architecture — boundaries you draw will appear in the product"
    ],
    "quiz": [
      {
        "q": "A team must hand work to a separate testing group before release. This means the team is:",
        "opts": [
          "Not cross-functional, since it cannot finish an item alone",
          "Following standard practice for regulated environments",
          "Cross-functional, provided that the hand-off is well managed",
          "Correctly structured for quality assurance independence"
        ],
        "a": 0,
        "fb": "The test is whether an item can be finished inside the team, not whether the team contains varied job titles."
      },
      {
        "q": "Allocating a person 50% to each of two initiatives typically delivers:",
        "opts": [
          "The same output as full dedication to one team",
          "Materially less than half to each, due to switching costs",
          "Slightly more than half, through cross-pollination effects",
          "Exactly half their capacity to each initiative"
        ],
        "a": 1,
        "fb": "They cannot be relied on for either team's commitments and attend both sets of meetings while belonging to neither."
      },
      {
        "q": "Why do utilisation targets conflict with agile delivery?",
        "opts": [
          "Utilisation is difficult to measure accurately in agile teams",
          "Frameworks prohibit measuring individual productivity",
          "Agile is optimised for throughput, which requires slack",
          "Utilisation applies only to predictive project management"
        ],
        "a": 2,
        "fb": "The conflict is real and the utilisation measure usually wins, because it is the one reported upward."
      },
      {
        "q": "A team has grown to fourteen people. The better response is to:",
        "opts": [
          "Extend sprints to four weeks to reduce planning overhead",
          "Add a second Scrum Master to share the coordination load",
          "Divide it into functional sub-teams each reporting to one lead",
          "Split it into smaller teams organised around value streams"
        ],
        "a": 3,
        "fb": "Communication channels grow quadratically with headcount. Two cross-functional teams of six outperform one team of twelve."
      },
      {
        "q": "For a distributed team, the factor that most compensates for lack of co-location is:",
        "opts": [
          "Several hours of genuine working-hours overlap each day",
          "Investment in higher-quality video conferencing technology",
          "Assigning a dedicated coordinator in each location",
          "Increasing the frequency of written status reporting"
        ],
        "a": 0,
        "fb": "Below about two hours of overlap, the groups are better treated as separate teams with a defined interface between them."
      },
      {
        "q": "Conway's observation implies that a product built by teams organised by technical layer will:",
        "opts": [
          "Be more maintainable due to clear separation of concerns",
          "Mirror that structure, with painful seams between the layers",
          "Deliver faster because specialists work within their expertise",
          "Require fewer integration tests than other structures"
        ],
        "a": 1,
        "fb": "Team design is architecture. You make a technical decision when you draw team boundaries, whether or not you intend to."
      }
    ]
  },
  {
    "id": "n6",
    "tag": "Module 6",
    "time": "55 min",
    "title": "Planning, Estimation and Forecasting",
    "summary": "How to answer 'when will it be done' without lying",
    "objectives": [
      "Explain the relationship between estimates, forecasts and commitments",
      "Use empirical data rather than opinion to forecast delivery",
      "Communicate uncertainty to stakeholders in a defensible way",
      "Plan releases and roadmaps that survive contact with reality",
      "Avoid the estimation behaviours that destroy trust in both directions"
    ],
    "sections": [
      {
        "h": "Three different things that get called an estimate",
        "html": "\n        <p>Most conflict between managers and teams about dates comes from conflating three distinct concepts. Separate them and much of the conflict disappears.</p>\n        <ul class=\"body\">\n          <li><strong>An estimate</strong> is a team's best judgement of relative effort for a piece of work. It is uncertain by definition, and it is not a promise.</li>\n          <li><strong>A forecast</strong> is a projection of completion derived from estimates plus observed delivery rate, expressed as a range with a confidence level.</li>\n          <li><strong>A commitment</strong> is an organisational promise to deliver something by a date. It is a management decision, not a technical output.</li>\n        </ul>\n        <p>Teams produce estimates. Managers convert forecasts into commitments and own the consequences. When a manager treats a team's estimate as a commitment, two things happen: the team learns to inflate estimates, and the manager loses the information the estimate carried. Both are irreversible within an organisation's memory.</p>"
      },
      {
        "h": "Forecasting from data, not opinion",
        "html": "\n        <p>The most useful shift available to a manager is from asking \"how long will this take?\" to measuring \"how much have we historically completed?\"</p>\n        <p>After a few iterations a team has real throughput data — items completed per sprint, or cycle time per item. That data forecasts far better than judgement, because it already contains all the interruptions, holidays, defects and surprises that estimates systematically omit.</p>\n        <p>The practical method:</p>\n        <ol class=\"body\">\n          <li>Count remaining backlog items, sized roughly.</li>\n          <li>Take the team's completed-items-per-sprint over the last six to ten sprints.</li>\n          <li>Divide the remainder by the <strong>slowest</strong>, <strong>median</strong> and <strong>fastest</strong> observed rates.</li>\n          <li>Report the three resulting dates as a range, not the middle one as an answer.</li>\n        </ol>\n        <p>This takes fifteen minutes and outperforms elaborate estimation exercises. It also has a political advantage: the forecast is derived from the organisation's own observed behaviour, which is much harder to argue with than a team's opinion.</p>"
      },
      {
        "h": "Communicating uncertainty upward",
        "html": "\n        <p>Senior stakeholders are usually accused of demanding false certainty. In practice they demand certainty because they have never been offered a usable alternative, and \"it depends\" is not one.</p>\n        <p>What works:</p>\n        <ul class=\"body\">\n          <li><strong>Offer a range with a confidence level.</strong> \"We are highly confident of March, and it could be February if the integration is straightforward.\" Ranges are accepted far more often than managers expect.</li>\n          <li><strong>Name the specific uncertainties.</strong> \"The range is wide because we do not yet know whether the vendor's API supports bulk operations. We will know in three weeks and can narrow it then.\"</li>\n          <li><strong>Commit to a review point rather than a date.</strong> Converting \"when will it be done\" into \"when will we know more\" is often the honest and acceptable answer.</li>\n          <li><strong>Narrow the range publicly as you learn.</strong> This builds the credibility that lets you use ranges again.</li>\n        </ul>\n        <div class=\"callout note\"><h4>The single-number trap</h4><p style=\"margin:0\">A single date communicates a precision that does not exist, and it is remembered as a promise regardless of the caveats attached. Once it is in a slide it will outlive every qualification you gave verbally. If you must give one number, give the pessimistic end of the range — you can only improve on it.</p></div>"
      },
      {
        "h": "Release planning and roadmaps",
        "html": "\n        <p>Adaptive delivery does not mean no roadmap. It means a roadmap with honest resolution: specific in the near term, thematic in the medium term, directional in the long term.</p>\n        <ul class=\"body\">\n          <li><strong>Next quarter:</strong> specific items, forecast dates, high confidence.</li>\n          <li><strong>Following two quarters:</strong> themes and outcomes, no committed dates.</li>\n          <li><strong>Beyond:</strong> direction and intent only.</li>\n        </ul>\n        <p>Roadmaps that show equal specificity eighteen months out are fiction, and everyone reading them knows it, which is why they are ignored. A roadmap that visibly degrades in precision with distance is more useful and more credible, and it makes the argument for adaptive delivery without your having to make it.</p>"
      },
      {
        "h": "The estimation behaviours that destroy trust",
        "html": "\n        <p><strong>From management:</strong></p>\n        <ul class=\"body\">\n          <li>Treating an estimate as a commitment, then citing it when the date slips.</li>\n          <li>Negotiating estimates downward. An estimate is a judgement, not an opening offer.</li>\n          <li>Asking for a re-estimate until the answer is acceptable.</li>\n          <li>Comparing velocity between teams, which converts a planning tool into a performance metric and destroys it within one quarter.</li>\n        </ul>\n        <p><strong>From teams:</strong></p>\n        <ul class=\"body\">\n          <li>Padding every estimate, which hides real risk inside general caution.</li>\n          <li>Refusing to give any forecast, which is not principled and is not tenable in an organisation with a budget cycle.</li>\n          <li>Reporting an item as nearly done for several weeks running.</li>\n        </ul>\n        <p>Both lists describe rational responses to the other side's behaviour, which is why estimation disputes escalate. Breaking the cycle requires the manager to move first, because the manager holds the power asymmetry.</p>"
      },
      {
        "h": "When estimation is not worth doing",
        "html": "\n        <p>A view worth taking seriously: for teams with a stable flow of similarly-sized items, detailed estimation adds little that counting does not. If a team completes eight to twelve items per sprint regardless of estimated size, the estimates are not adding forecasting value and the effort is better spent on refinement — making items smaller and clearer.</p>\n        <p>The test is simple: <strong>compare your estimate-based forecasts with a simple item count over the last six sprints.</strong> If the count forecasts as well, you have found a meeting you can stop holding.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: forecast with three numbers",
      "text": "Next time you are asked for a date, take the team's completed items per sprint for the last eight sprints, and divide the remaining backlog by the slowest, median and fastest rates. Present all three. It takes fifteen minutes, it is grounded in the organisation's own observed behaviour rather than opinion, and it reframes the conversation from \"is this date right\" to \"which of these three do we plan against\". That reframing is worth more than the accuracy."
    },
    "activity": {
      "title": "Workplace application",
      "text": "For one initiative, build the three-point forecast from actual throughput data. Compare it to whatever date is currently being reported to stakeholders. If they differ materially, decide how you will correct the record — and note what made the original number wrong, since that mechanism is probably still operating."
    },
    "takeaways": [
      "Estimates, forecasts and commitments are three different things and conflating them causes most date conflicts",
      "Teams produce estimates; managers convert forecasts into commitments and own them",
      "Historical throughput forecasts better than judgement because it contains the interruptions",
      "Divide remaining work by slowest, median and fastest observed rates and report the range",
      "A single date is remembered as a promise regardless of the caveats attached",
      "Roadmaps should visibly degrade in precision with distance",
      "Comparing velocity between teams destroys it as a planning tool within a quarter"
    ],
    "quiz": [
      {
        "q": "A team's estimate and an organisational commitment differ in that a commitment is:",
        "opts": [
          "Required only for externally contracted work",
          "A more precise version of the same underlying technical judgement",
          "A management decision that carries organisational consequence",
          "Produced by the team once refinement is complete"
        ],
        "a": 2,
        "fb": "When a manager treats an estimate as a commitment, teams learn to inflate and the manager loses the information the estimate carried."
      },
      {
        "q": "The most reliable basis for forecasting a delivery date is:",
        "opts": [
          "A detailed bottom-up estimate produced by the team",
          "The sponsor's required date worked backwards",
          "A comparison with similar past projects in other organisations",
          "The team's observed historical throughput over recent sprints"
        ],
        "a": 3,
        "fb": "Historical data already contains the interruptions, holidays, defects and surprises that estimates systematically omit."
      },
      {
        "q": "When forecasting, you should report:",
        "opts": [
          "A range derived from slowest, median and fastest rates",
          "The optimistic date, to maintain team motivation",
          "The median date, presented as the single most likely outcome",
          "Whichever date the steering committee expects"
        ],
        "a": 0,
        "fb": "A single number communicates a precision that does not exist and will outlive every verbal qualification attached to it."
      },
      {
        "q": "Comparing velocity between two teams typically results in:",
        "opts": [
          "Healthy competition that raises overall throughput",
          "The metric being gamed and losing its planning value",
          "Useful benchmarking that identifies improvement opportunities",
          "More accurate organisational capacity planning"
        ],
        "a": 1,
        "fb": "It converts a planning tool into a performance metric, and the tool is usually destroyed within one quarter."
      },
      {
        "q": "A credible roadmap should:",
        "opts": [
          "Be revised only at annual planning checkpoints",
          "Show equal detail across the full eighteen-month horizon",
          "Degrade visibly in precision as the horizon extends",
          "Contain only themes, with no dates at any point"
        ],
        "a": 2,
        "fb": "Roadmaps showing equal specificity far out are fiction, everyone knows it, and that is why they are ignored."
      },
      {
        "q": "For a team completing a consistent number of similarly-sized items each sprint, detailed estimation:",
        "opts": [
          "Is required by all major agile frameworks",
          "Should be replaced with management-set delivery targets",
          "Becomes more important as the backlog grows",
          "May add little that simple item counting does not"
        ],
        "a": 3,
        "fb": "Compare estimate-based forecasts with a plain item count over six sprints. If the count does as well, you have found a meeting to stop holding."
      }
    ]
  },
  {
    "id": "n7",
    "tag": "Module 7",
    "time": "55 min",
    "title": "Funding, Budgeting and Contracts",
    "summary": "The organisational machinery that most often blocks agile delivery",
    "objectives": [
      "Understand why annual project funding conflicts with adaptive delivery",
      "Apply incremental and product-based funding models",
      "Structure contracts that permit changing scope",
      "Handle procurement and vendor relationships in an agile context",
      "Make the business case to finance in terms they accept"
    ],
    "sections": [
      {
        "h": "Why funding is the real constraint",
        "html": "\n        <p>Module 2 identified organisational tolerance as the suitability factor that most often fails. Funding is usually the specific mechanism.</p>\n        <p>The conventional model works like this: a business case is written specifying scope, cost and benefit; funding is approved annually against that scope; and variance from it is reported as a problem. Every element of that sequence assumes scope is known in advance and should not change.</p>\n        <p>Adaptive delivery inverts exactly this. Time and cost are fixed; scope varies. An organisation that funds by fixed scope while asking teams to work adaptively has created a contradiction that the team cannot resolve, and the team will resolve it in the only way available — by pretending the scope did not change.</p>"
      },
      {
        "h": "Funding models that work",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Incremental funding.</strong> Release money in tranches at defined review points. Each tranche buys a period of delivery and the right to review. This is the closest analogue to venture staging and it fits adaptive work naturally.</li>\n          <li><strong>Product or capability funding.</strong> Fund a persistent team against an outcome for a year, rather than funding a project. The team's cost is stable and predictable; what it builds is decided continuously. This is the model most large agile organisations converge on.</li>\n          <li><strong>Capacity-based funding.</strong> Fund a fixed number of teams; allocate their capacity to initiatives quarterly. Makes prioritisation explicit, because adding something requires removing something.</li>\n          <li><strong>Fixed-envelope, variable-scope.</strong> The budget and date are fixed and committed; the scope is prioritised and delivered in value order, with the least valuable items dropping out. Works well for externally visible deadlines.</li>\n        </ul>\n        <p>All four share one property: <strong>they commit to a level of investment rather than to a list of features.</strong> That single change removes most of the friction between finance and adaptive delivery.</p>"
      },
      {
        "h": "Talking to finance",
        "html": "\n        <p>Finance functions are rarely obstructive when they understand the shape of the risk. They become obstructive when presented with a request that appears to be for unbounded spending against undefined deliverables — which is exactly how an unprepared agile funding request sounds.</p>\n        <p>What lands:</p>\n        <ul class=\"body\">\n          <li><strong>Cap the downside explicitly.</strong> \"The maximum exposure is one quarter of team cost, and we can stop at the review point.\" Finance responds well to bounded risk.</li>\n          <li><strong>Offer more control, not less.</strong> Quarterly review with a genuine stop option is <em>tighter</em> control than an annual approval that cannot practically be reversed. Make this argument explicitly; it is true and it is rarely made.</li>\n          <li><strong>Report value delivered, not budget consumed.</strong> Bring evidence of what shipped, not a percentage-complete figure.</li>\n          <li><strong>Be honest about capitalisation.</strong> Accounting treatment of development spend differs between models and your finance colleagues will need to work it through. Raise it early rather than being surprised by it.</li>\n        </ul>"
      },
      {
        "h": "Contracting for adaptive work",
        "html": "\n        <p>The Manifesto's \"customer collaboration over contract negotiation\" is frequently read as anti-contract. It is not, and organisations that treat it that way expose themselves. The point is that a contract should not become a substitute for the relationship.</p>\n        <p>Contract structures, from least to most adaptive:</p>\n        <ul class=\"body\">\n          <li><strong>Fixed price, fixed scope.</strong> Transfers risk to the supplier, who prices for it and then defends scope rigidly. Produces adversarial change control. Appropriate only where scope genuinely is certain.</li>\n          <li><strong>Time and materials.</strong> Maximum flexibility, minimum cost certainty. The customer carries the risk and needs the capability to manage it actively.</li>\n          <li><strong>Capped time and materials.</strong> Flexible within a ceiling. A reasonable middle ground and the most common workable compromise.</li>\n          <li><strong>Fixed price per increment.</strong> Each sprint or release is separately priced. Combines cost certainty with the ability to change direction.</li>\n          <li><strong>Incremental delivery with early termination.</strong> The customer may stop at defined points, often with a modest termination payment. Strongly aligns both parties toward delivering value early.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The clause that matters most</h4><p style=\"margin:0\">Whatever the structure, the clause to negotiate hardest is <strong>how scope changes are handled</strong>. A contract permitting scope exchange at equivalent effort — adding an item by removing another of similar size, without a formal variation — removes most of the friction in a supplier relationship. Without it, every discovery becomes a commercial negotiation, and the supplier's incentive is to deliver the letter of the specification rather than a working outcome.</p></div>"
      },
      {
        "h": "Procurement and vendor management",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Do not procure a specification.</strong> If the tender document is a fixed requirements list, you have committed to predictive delivery before selecting a supplier, whatever the contract later says.</li>\n          <li><strong>Evaluate on demonstrated capability.</strong> Ask to see a supplier's actual working practices — their test coverage, their release frequency, their retrospective outputs — rather than their proposal document.</li>\n          <li><strong>Insist on integrated teams where possible.</strong> A supplier team working separately and delivering periodically reproduces every hand-off problem from Module 5.</li>\n          <li><strong>Own the definition of done.</strong> It is the single most important quality control in a vendor relationship and the one most often left to the supplier.</li>\n          <li><strong>Plan for knowledge transfer from the start.</strong> Otherwise you have purchased delivery and rented understanding.</li>\n        </ul>"
      },
      {
        "h": "The business case that survives",
        "html": "\n        <p>Six elements, in the language finance uses:</p>\n        <ol class=\"body\">\n          <li><strong>The outcome sought</strong>, in business terms, with the measure that will move.</li>\n          <li><strong>The investment per period</strong> and the total exposure before the next decision point.</li>\n          <li><strong>What will be demonstrable at each review</strong>, so the decision is evidenced.</li>\n          <li><strong>The stop criteria.</strong> Naming the conditions under which you would recommend cancellation is the single most credibility-building element available, and almost nobody includes it.</li>\n          <li><strong>The benefit realisation path</strong> — who will act on the output, and when the benefit appears in the accounts.</li>\n          <li><strong>The risk of not doing it</strong>, which is frequently the strongest argument and the one most often left out.</li>\n        </ol>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: sell control, not flexibility",
      "text": "When you take an incremental funding proposal to finance or a board, do not lead with flexibility — it sounds like a request for looser oversight. Lead with control: \"You will have four opportunities to stop this, instead of one, and the maximum you can lose is a quarter's cost.\" That is a genuinely tighter control regime than annual approval, it is true, and it is almost never how the case is presented. Finance directors who reject \"agile funding\" will frequently approve the identical arrangement described this way."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Take one initiative and rewrite its funding request using an incremental model: state the per-period investment, the maximum exposure before the next decision, what will be demonstrable at that decision, and the stop criteria. Separately, review one live supplier contract for how scope changes are handled, and draft the clause you would want instead."
    },
    "takeaways": [
      "Funding by fixed scope while asking teams to work adaptively creates a contradiction teams resolve by pretending",
      "Workable models commit to a level of investment rather than to a list of features",
      "Present incremental funding as tighter control, not greater flexibility",
      "Report value delivered rather than budget consumed or percentage complete",
      "The contract clause that matters most governs how scope changes are handled",
      "A tender written as a fixed requirements list commits you to predictive delivery",
      "Naming your own stop criteria is the most credibility-building element of a business case"
    ],
    "quiz": [
      {
        "q": "Funding an initiative against a fixed scope while asking the team to work adaptively usually results in:",
        "opts": [
          "The team concealing scope changes to avoid variance reporting",
          "A well-controlled hybrid delivery approach",
          "Finance gaining better visibility of progress",
          "Faster delivery, due to clearer accountability for scope"
        ],
        "a": 0,
        "fb": "The contradiction cannot be resolved by the team, so it is resolved in the only way available to them."
      },
      {
        "q": "What do incremental, product, capacity and fixed-envelope funding models have in common?",
        "opts": [
          "They eliminate the need for a formal business case",
          "They commit to a level of investment rather than a feature list",
          "They all require quarterly board approval before they can operate",
          "They transfer delivery risk entirely to the supplier"
        ],
        "a": 1,
        "fb": "That single change removes most of the friction between finance functions and adaptive delivery."
      },
      {
        "q": "The most effective framing when proposing incremental funding to a finance director is:",
        "opts": [
          "It provides the team with greater delivery flexibility",
          "It reduces the total cost of the initiative",
          "It offers tighter control, with more chances to stop",
          "It aligns the organisation with industry best practice"
        ],
        "a": 2,
        "fb": "Quarterly review with a genuine stop option is tighter control than an annual approval that cannot practically be reversed."
      },
      {
        "q": "In a supplier contract for adaptive work, the clause deserving hardest negotiation covers:",
        "opts": [
          "Intellectual property ownership of deliverables",
          "Liability caps and professional indemnity levels",
          "Payment terms and invoicing schedules",
          "How scope changes are handled during delivery"
        ],
        "a": 3,
        "fb": "Without scope exchange at equivalent effort, every discovery becomes a commercial negotiation and the supplier delivers the specification rather than the outcome."
      },
      {
        "q": "Issuing a tender document containing a fixed requirements list means you have:",
        "opts": [
          "Committed to predictive delivery before selecting a supplier",
          "Satisfied the standard public procurement requirements in full",
          "Protected the organisation against scope creep",
          "Ensured suppliers can be compared on equal terms"
        ],
        "a": 0,
        "fb": "Whatever the contract subsequently says about agility, the procurement has already fixed the scope."
      },
      {
        "q": "Which business case element most builds credibility and is most often omitted?",
        "opts": [
          "The internal rate of return over five years",
          "The conditions under which you would recommend stopping",
          "A detailed breakdown of the technology platform to be used",
          "A comparison against three alternative suppliers"
        ],
        "a": 1,
        "fb": "Naming your own stop criteria signals that the request is a genuine investment proposal rather than an advocacy exercise."
      }
    ]
  },
  {
    "id": "n8",
    "tag": "Module 8",
    "time": "55 min",
    "title": "Metrics That Matter — and Metrics That Destroy",
    "summary": "What to measure, what to report, and what to stop counting",
    "objectives": [
      "Distinguish activity metrics from outcome metrics",
      "Use flow metrics to understand and improve delivery",
      "Recognise how measurement changes the behaviour being measured",
      "Choose what to report upward without corrupting the team's tools",
      "Build a small, honest measurement set you can defend"
    ],
    "sections": [
      {
        "h": "The four levels of measurement",
        "html": "\n        <p>Order any proposed metric into one of these levels. The level tells you what the metric is worth.</p>\n        <ol class=\"body\">\n          <li><strong>Activity.</strong> Story points completed, sprints run, tickets closed, people trained. Easy to collect, useful to the team, and worthless as evidence of value. Most reporting stops here.</li>\n          <li><strong>Flow.</strong> Cycle time, throughput, work in progress, blocked time. Describes how well the delivery system is working, and is where most improvement is actually found.</li>\n          <li><strong>Outcome.</strong> Adoption, error rates, customer satisfaction, task completion, time saved by users. What changed for the people the work was for.</li>\n          <li><strong>Impact.</strong> Revenue, cost, retention, market share. The only level a board ultimately accepts.</li>\n        </ol>\n        <p>A team should live at levels one and two. A manager should report at levels three and four. The most common reporting failure is a manager presenting level-one data to an audience that needs level three, which is why so many steering committees feel simultaneously over-informed and unable to decide anything.</p>"
      },
      {
        "h": "Flow metrics, and why they are the useful ones",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Cycle time</strong> — elapsed time from starting an item to finishing it. The single most useful delivery metric, because it is what a customer experiences and it cannot be improved by working harder, only by improving the system.</li>\n          <li><strong>Throughput</strong> — items finished per period. Forecasts well (Module 6).</li>\n          <li><strong>Work in progress</strong> — items started and not finished. Rising WIP is the earliest warning of trouble, usually preceding a missed date by weeks.</li>\n          <li><strong>Blocked time</strong> — how long items spend waiting. Points directly at organisational impediments and is the metric that most often implicates management rather than the team.</li>\n          <li><strong>Flow efficiency</strong> — active time as a proportion of elapsed time. Frequently under 20% in organisations measuring it for the first time, which is a shock worth having.</li>\n        </ul>\n        <p>These metrics share a valuable property: <strong>they describe the system, not the people.</strong> That makes them harder to weaponise and more likely to survive contact with an organisation.</p>"
      },
      {
        "h": "Metrics that destroy",
        "html": "\n        <p>Measurement changes behaviour, and any measure used for evaluation will eventually be gamed. Specific cases:</p>\n        <ul class=\"body\">\n          <li><strong>Velocity as a performance target.</strong> The most common and most damaging. Velocity is a planning input using an arbitrary unit that differs between teams. Target it and estimates inflate immediately, the number rises, and delivery does not change. You have destroyed a forecasting tool and learned nothing.</li>\n          <li><strong>Individual utilisation.</strong> Rewards being busy over finishing, and directly opposes flow (Module 5).</li>\n          <li><strong>Lines of code or commits.</strong> Measures typing.</li>\n          <li><strong>Defects found by testers.</strong> Punished, testers report fewer; rewarded, they report trivia.</li>\n          <li><strong>Story points per person.</strong> Destroys the collective ownership that makes teams work.</li>\n          <li><strong>Percentage complete.</strong> Meaningless in adaptive delivery and unfalsifiable — which is precisely why it survives.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The rule to hold</h4><p style=\"margin:0\">Any metric that a team can improve without improving the outcome will be improved without improving the outcome. This is not dishonesty; it is a rational response to incentives. The defence is to <strong>use team-level metrics for improvement and never for evaluation</strong>, and to say so explicitly and repeatedly, because teams will assume otherwise until convinced.</p></div>"
      },
      {
        "h": "What to report upward",
        "html": "\n        <p>A one-page report that works for most executive audiences:</p>\n        <ol class=\"body\">\n          <li><strong>What shipped since last time</strong>, in user-recognisable terms.</li>\n          <li><strong>What it changed</strong> — the outcome measure, with the baseline.</li>\n          <li><strong>Forecast for the next period</strong>, as a range with named uncertainties.</li>\n          <li><strong>Decisions required</strong> from this audience.</li>\n          <li><strong>Impediments outstanding</strong>, with age and owner (Module 4).</li>\n        </ol>\n        <p>Note what is absent: velocity, story points, sprint burndown and percentage complete. None of it belongs in an executive report, and including it invites questions that consume the meeting without improving any decision.</p>"
      },
      {
        "h": "Measuring value, honestly",
        "html": "\n        <p>The hardest and most important measurement problem. Three disciplines that make it tractable:</p>\n        <ul class=\"body\">\n          <li><strong>Baseline before you build.</strong> Without a measured \"before\", no \"after\" is defensible. This is the most commonly skipped step and its absence makes benefit claims unfalsifiable in either direction.</li>\n          <li><strong>Name the beneficiary.</strong> \"Who is better off, and how would they notice?\" If the answer is only internal, the value claim is weaker than it appears.</li>\n          <li><strong>Check whether the benefit was realised, not just whether the feature shipped.</strong> Most organisations track delivery and never revisit the business case, which is why benefit claims persist unchallenged for years.</li>\n        </ul>\n        <p>A quarterly review comparing claimed benefits to observed outcomes across the portfolio is uncomfortable the first time and rapidly improves the quality of every subsequent business case.</p>"
      },
      {
        "h": "A defensible measurement set",
        "html": "\n        <p>Five numbers are enough for most organisations:</p>\n        <ol class=\"body\">\n          <li><strong>Cycle time</strong> (median and 85th percentile) — how quickly the system delivers</li>\n          <li><strong>Throughput</strong> — how much it delivers</li>\n          <li><strong>One outcome measure per initiative</strong> — whether it mattered</li>\n          <li><strong>Impediment age</strong> — whether management is helping</li>\n          <li><strong>A team health signal</strong>, collected from the team and never used punitively</li>\n        </ol>\n        <p>Adding a sixth is usually a request for reassurance rather than a need for information, and each addition dilutes attention to the first five.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: measure flow efficiency once",
      "text": "Pick ten recently completed items and, for each, estimate how many working days elapsed from start to finish and how many of those days someone was actively working on it. Divide the second by the first. Most organisations doing this for the first time find a figure below 20%, and some below 10%. It reframes every improvement conversation, because it demonstrates that the opportunity is in the waiting rather than in the working — and it does so with the organisation's own data, which is much harder to dismiss than an external benchmark."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Audit every metric currently collected from your teams. For each, mark its level (activity, flow, outcome, impact) and whether it is used for improvement or evaluation. Stop collecting anything at activity level that is reported upward. Then build the five-number set for one team and produce one executive report in the recommended format."
    },
    "takeaways": [
      "Teams should live at activity and flow level; managers should report at outcome and impact level",
      "Cycle time cannot be improved by working harder, only by improving the system",
      "Rising work in progress is the earliest warning of trouble, often preceding a missed date by weeks",
      "Any metric a team can improve without improving the outcome will be",
      "Use team-level metrics for improvement and never for evaluation, and say so repeatedly",
      "Velocity, story points and percentage complete do not belong in an executive report",
      "Without a measured baseline, benefit claims are unfalsifiable in either direction"
    ],
    "quiz": [
      {
        "q": "Setting velocity as a performance target for a team typically produces:",
        "opts": [
          "More accurate forecasting at the portfolio level",
          "Better comparability between the teams in the same portfolio",
          "Estimate inflation, a rising number and unchanged delivery",
          "Sustained improvement in delivery throughput"
        ],
        "a": 2,
        "fb": "You destroy a forecasting tool and learn nothing. Velocity uses an arbitrary unit that differs between teams."
      },
      {
        "q": "Cycle time is described as the most useful delivery metric because it:",
        "opts": [
          "Correlates strongly with individual developer productivity levels",
          "Allows direct comparison between different delivery teams",
          "Is the easiest measure to collect from existing tooling",
          "Reflects customer experience and improves only through system change"
        ],
        "a": 3,
        "fb": "It cannot be improved by working harder, which is exactly what makes it honest."
      },
      {
        "q": "Which metric most often implicates management rather than the delivery team?",
        "opts": [
          "Blocked time, showing how long items spend waiting",
          "Story points completed by the team within each sprint",
          "Number of defects raised during testing",
          "Individual utilisation across the team"
        ],
        "a": 0,
        "fb": "It points directly at organisational impediments, which are the manager's responsibility to clear."
      },
      {
        "q": "Flow efficiency measured for the first time in most organisations is typically:",
        "opts": [
          "Above 80%, indicating well-optimised delivery",
          "Below 20%, showing most elapsed time is waiting",
          "Impossible to calculate without specialist tooling",
          "Around 50%, evenly split between work and waiting"
        ],
        "a": 1,
        "fb": "It reframes improvement conversations, because it shows the opportunity is in the waiting rather than the working."
      },
      {
        "q": "Which of these belongs in an executive-level report?",
        "opts": [
          "The sprint burndown chart for the current iteration",
          "Percentage complete against the original plan",
          "What shipped and what outcome measure it moved",
          "Story points completed per team member"
        ],
        "a": 2,
        "fb": "Activity-level data invites questions that consume the meeting without improving any decision."
      },
      {
        "q": "The defence against metric gaming is to:",
        "opts": [
          "Automate the collection so that teams cannot influence the data",
          "Change the metrics each quarter to prevent adaptation",
          "Collect a wider range of metrics to cross-check",
          "Use team-level metrics for improvement and never evaluation"
        ],
        "a": 3,
        "fb": "Teams will assume metrics are evaluative until convinced otherwise, so this has to be said explicitly and repeatedly."
      }
    ]
  },
  {
    "id": "n9",
    "tag": "Module 9",
    "time": "55 min",
    "title": "Governance, Risk and Compliance",
    "summary": "Running adaptive delivery inside an organisation that must answer to auditors",
    "objectives": [
      "Adapt governance from stage gates to continuous oversight",
      "Satisfy audit and regulatory requirements without abandoning agility",
      "Understand what an agile PMO does differently",
      "Manage risk continuously rather than at review points",
      "Apply agile governance thinking beyond delivery"
    ],
    "sections": [
      {
        "h": "Why traditional governance fights adaptive delivery",
        "html": "\n        <p>Conventional project governance is built on stage gates: a phase completes, evidence is assembled, a board approves, the next phase begins. The model assumes that phases are distinct, that completion is verifiable, and that the plan approved at gate two remains valid at gate four.</p>\n        <p>Adaptive delivery has none of these properties. There are no phases, work is continuously in flight, and the plan is expected to change. Applying stage-gate governance produces two predictable outcomes: teams manufacture artefacts for gates that no longer describe their work, and governance receives information that is formally correct and substantively useless.</p>\n        <p>The answer is not less governance. It is <strong>governance at a different frequency and against different evidence.</strong></p>"
      },
      {
        "h": "Continuous governance",
        "html": "\n        <p>Four substitutions convert stage-gate oversight into something that works:</p>\n        <ul class=\"body\">\n          <li><strong>Frequent small decisions replace infrequent large ones.</strong> Quarterly funding review with a real stop option gives more control than annual approval (Module 7).</li>\n          <li><strong>Working output replaces documented status.</strong> The strongest governance evidence available is a demonstration of what actually works. A sprint review attended by a governance representative is worth more than any report.</li>\n          <li><strong>Trends replace snapshots.</strong> Cycle time and throughput over eight sprints tell you more about likely delivery than any point-in-time percentage.</li>\n          <li><strong>Named risks with owners replace RAG status.</strong> A green status conveys nothing; a specific risk with a named owner and a mitigation date can be acted upon.</li>\n        </ul>"
      },
      {
        "h": "Audit and regulated environments",
        "html": "\n        <p>The frequent claim that agile cannot work in regulated environments is not correct, but it requires deliberate design. What auditors typically need is evidence of <strong>authorisation, traceability, testing, segregation of duties and change control</strong>. None of these requires a waterfall.</p>\n        <ul class=\"body\">\n          <li><strong>Authorisation.</strong> Backlog prioritisation by a named Product Owner, recorded in the tool, is an authorisation trail — often a better one than a signed document, because it is timestamped and attributable.</li>\n          <li><strong>Traceability.</strong> Link requirement to story to commit to test to release. Modern tooling does this automatically and produces traceability superior to most document-based approaches.</li>\n          <li><strong>Testing evidence.</strong> Automated test results per build are stronger evidence than a signed-off test phase, because they are continuous and reproducible.</li>\n          <li><strong>Segregation of duties.</strong> Achieved through review and approval rules in the pipeline rather than through organisational separation.</li>\n          <li><strong>Change control.</strong> Every change is recorded, reviewed and releasable. The record is finer-grained than a change advisory board's minutes.</li>\n        </ul>\n        <div class=\"callout note\"><h4>The argument to make to your auditors</h4><p style=\"margin:0\">Bring them in early rather than presenting a completed approach for approval. Most audit objections to agile are objections to <em>undocumented</em> agile, and they are usually correct. A well-instrumented adaptive delivery pipeline generates more evidence, more granularly, and more reliably than a document-based process — but only if someone has deliberately designed for it. Auditors who are consulted tend to become allies; auditors presented with a fait accompli do not.</p></div>"
      },
      {
        "h": "The agile PMO",
        "html": "\n        <p>The traditional project management office enforces method compliance, collects status and gates progress. In an adaptive setting that role becomes an impediment factory.</p>\n        <p>The <em>Agile Practice Guide</em> characterises an agile PMO differently, and two of its properties are worth adopting directly:</p>\n        <ul class=\"body\">\n          <li><strong>It is value-driven.</strong> Its purpose is to help the organisation deliver value, not to enforce a standard. Every service it offers should be justifiable in those terms.</li>\n          <li><strong>It is invitation-oriented.</strong> Teams request its help rather than being subjected to it. This is a genuine structural change and a good test of whether the PMO is delivering value — a PMO nobody invites is not.</li>\n        </ul>\n        <p>The useful functions of such a PMO: building capability and coaching; providing tooling and data; making cross-team dependencies visible; running portfolio-level prioritisation; and maintaining the small set of standards that genuinely need to be common. What it stops doing is collecting status the tools already show and enforcing method uniformity across teams with different work.</p>"
      },
      {
        "h": "Risk management, continuously",
        "html": "\n        <p>Adaptive delivery changes risk management in a way that is easy to miss: <strong>iteration is itself a risk-reduction mechanism.</strong> Delivering something working every two weeks continuously retires the largest risk in most initiatives — that the thing being built does not work or is not wanted.</p>\n        <p>Practically:</p>\n        <ul class=\"body\">\n          <li><strong>Sequence by risk, not only by value.</strong> Do the frightening, uncertain, technically unproven item early, when there is still time to respond. Teams naturally sequence easy work first; managers should push against this.</li>\n          <li><strong>Treat the backlog as a risk register.</strong> High-uncertainty items should carry explicit spikes or experiments before commitment.</li>\n          <li><strong>Review risk at every sprint boundary</strong>, not at quarterly checkpoints.</li>\n          <li><strong>Watch the specific signals:</strong> rising work in progress, lengthening cycle time, an item repeatedly carried over, and a growing gap between what is demonstrated and what is claimed complete.</li>\n        </ul>"
      },
      {
        "h": "Agile governance beyond delivery",
        "html": "\n        <p>The World Economic Forum's <em>Agile Governance</em> work extends the concept to policy-making itself, arguing that traditional processes lag behind the pace of technological change and that citizens increasingly look to non-government actors as a result.</p>\n        <p>The methods it proposes translate usefully to any large organisation making rules for itself:</p>\n        <ul class=\"body\">\n          <li><strong>Experiment before mandating.</strong> Pilot a policy in a bounded area, learn, then extend — rather than issuing an organisation-wide standard and discovering its flaws at scale.</li>\n          <li><strong>Involve those governed in designing the governance.</strong> Rules co-designed with delivery teams are complied with; rules imposed on them are worked around.</li>\n          <li><strong>Build in review by default.</strong> Every policy should carry an expiry or review date, or the rule set only ever grows.</li>\n          <li><strong>Accept that some rules will be wrong.</strong> The alternative to occasional wrong rules is no rules or permanently outdated ones.</li>\n        </ul>\n        <p>For a manager, the immediate application is your own internal standards. Most organisations accumulate delivery policies and never remove one. An annual review that retires rules whose purpose has passed is a small piece of governance hygiene with a disproportionate effect on delivery speed.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: invite governance to a sprint review",
      "text": "Invite whoever governs your initiative — the sponsor, the PMO lead, internal audit — to an actual sprint review, once. Not a briefing about agile; the real event, where working output is demonstrated and stakeholders react. It is the single most effective thing you can do to change how your initiative is governed, because it replaces an abstract argument about methodology with direct evidence of what exists. Governance functions that have seen working software behave differently toward the team that produced it."
    },
    "activity": {
      "title": "Workplace application",
      "text": "List every governance artefact your teams currently produce. For each, identify who reads it and what decision it informs. Anything that fails both tests should be proposed for removal. Then take your organisation's audit or compliance requirements and map each one to the adaptive evidence that could satisfy it, using the five categories in this module."
    },
    "takeaways": [
      "Stage-gate governance applied to adaptive delivery produces formally correct, substantively useless information",
      "Substitute frequent small decisions, working output, trends and named risks for gates, reports, snapshots and RAG",
      "Most audit objections to agile are objections to undocumented agile, and they are usually correct",
      "A well-instrumented pipeline produces finer-grained evidence than a document-based process",
      "An agile PMO is value-driven and invitation-oriented; a PMO nobody invites is not delivering value",
      "Iteration is itself a risk-reduction mechanism — sequence frightening work early",
      "Every internal policy should carry a review date, or the rule set only ever grows"
    ],
    "quiz": [
      {
        "q": "Applying stage-gate governance to adaptive delivery typically causes teams to:",
        "opts": [
          "Produce artefacts for gates that no longer describe their work",
          "Deliver more predictably against the originally approved baseline",
          "Improve their forecasting accuracy over time",
          "Reduce the number of defects reaching production"
        ],
        "a": 0,
        "fb": "Governance then receives information that is formally correct and substantively useless."
      },
      {
        "q": "Most audit objections to agile delivery are, on examination, objections to:",
        "opts": [
          "The absence of a named project manager role",
          "Undocumented agile, and they are usually correct",
          "Iterative development as a concept in principle",
          "Frameworks that lack formal certification schemes"
        ],
        "a": 1,
        "fb": "A well-instrumented pipeline generates more evidence, more granularly, than a document-based process — if designed for it."
      },
      {
        "q": "An agile PMO is described as 'invitation-oriented', meaning that:",
        "opts": [
          "It publishes an annual calendar of its available services",
          "It reports directly to the executive committee",
          "Teams request its help rather than being subjected to it",
          "Its staff rotate through delivery teams periodically"
        ],
        "a": 2,
        "fb": "It is a genuine structural change and a good test of value: a PMO nobody invites is not delivering any."
      },
      {
        "q": "When sequencing work, managers should push teams to tackle uncertain, technically unproven items:",
        "opts": [
          "Only after the architecture is fully settled",
          "Last, once the team has built confidence",
          "In parallel with routine delivery work",
          "Early, while there is still time to respond"
        ],
        "a": 3,
        "fb": "Teams naturally sequence easy work first. Iteration is a risk-reduction mechanism only if the risky work is actually done early."
      },
      {
        "q": "Which is a stronger governance evidence source than a written status report?",
        "opts": [
          "A demonstration of working output at a sprint review",
          "A resource utilisation summary for the reporting period",
          "A percentage-complete figure against the baseline plan",
          "A detailed RAG assessment signed by the delivery lead"
        ],
        "a": 0,
        "fb": "Inviting a governance representative to an actual sprint review is the most effective way to change how an initiative is governed."
      },
      {
        "q": "The WEF's agile governance work suggests that internal policies should:",
        "opts": [
          "Remain stable for at least three years once agreed",
          "Carry a review or expiry date by default",
          "Be issued organisation-wide to ensure consistency",
          "Be set exclusively by the compliance function"
        ],
        "a": 1,
        "fb": "Without it the rule set only ever grows, and delivery speed degrades quietly year on year."
      }
    ]
  },
  {
    "id": "n10",
    "tag": "Module 10",
    "time": "55 min",
    "title": "Scaling: Frameworks, Trade-offs and Traps",
    "summary": "When to scale, what the options cost, and when descaling is the better answer",
    "objectives": [
      "Recognise when scaling is genuinely required and when it is avoidable",
      "Compare the main scaling frameworks and what each optimises for",
      "Understand the costs that scaling frameworks impose",
      "Apply descaling as an alternative to adding coordination",
      "Manage dependencies between teams"
    ],
    "sections": [
      {
        "h": "First, ask whether you need to scale",
        "html": "\n        <p>Scaling frameworks exist to coordinate many teams working on one product. Before adopting one, establish that this is genuinely your situation — because the most common reason organisations scale is not that the product requires many teams, but that the organisation has many people and has assigned them all to it.</p>\n        <p>Three questions:</p>\n        <ol class=\"body\">\n          <li><strong>Do these teams actually work on the same product?</strong> If they work on separable products, they need alignment on strategy and almost no operational coordination. Do not buy a coordination framework for a problem you do not have.</li>\n          <li><strong>Are the dependencies inherent or structural?</strong> Dependencies caused by teams organised around technical layers are self-inflicted and can be removed by reorganising (Module 5). Scaling frameworks are very good at managing dependencies and much less good at removing them.</li>\n          <li><strong>Would fewer people deliver faster?</strong> Frequently yes. Empirical evidence associates smaller teams with better agile outcomes, and adding people to late work makes it later.</li>\n        </ol>\n        <div class=\"callout warn\"><h4>The trap</h4><p style=\"margin:0\">Adopting a scaling framework to manage dependencies that better team design would eliminate is the most expensive common mistake in this area. You institutionalise the coordination cost permanently — new roles, new events, new artefacts — instead of removing its cause once. The framework then makes the situation tolerable, which removes the pressure to fix it.</p></div>"
      },
      {
        "h": "The main options",
        "html": "\n        <ul class=\"body\">\n          <li><strong>SAFe (Scaled Agile Framework).</strong> The most prescriptive and most widely adopted in large enterprises. Provides defined roles, a planning cadence, and portfolio-level structures. <em>Optimises for:</em> predictability and alignment across many teams in a traditional enterprise. <em>Costs:</em> substantial overhead, and a common criticism that it reintroduces the hierarchy agile was meant to flatten. It is chosen frequently because it is legible to executives who need a picture of how everything connects.</li>\n          <li><strong>LeSS (Large-Scale Scrum).</strong> Deliberately minimal — Scrum applied to many teams with as little addition as possible. <em>Optimises for:</em> keeping the simplicity of Scrum at scale. <em>Costs:</em> demands considerable organisational change and maturity, and offers less scaffolding for organisations that need it.</li>\n          <li><strong>Scrum@Scale.</strong> Scales through networks of Scrum teams with a Scrum of Scrums. <em>Optimises for:</em> modular, incremental scaling. <em>Costs:</em> relies on strong existing Scrum practice.</li>\n          <li><strong>The Spotify model.</strong> Squads, tribes, chapters and guilds. <em>Important caveat:</em> this was a description of one company's structure at one moment, never intended as a framework, and Spotify itself has moved on. Organisations adopting it typically copy the vocabulary and not the underlying autonomy, which produces new team names and no change.</li>\n        </ul>\n        <p>Related structures worth knowing: <strong>chapters</strong> group people of the same discipline across teams for skill development; <strong>guilds</strong> and <strong>communities of practice</strong> are voluntary interest groups. Both are cheap, useful and available without adopting any framework.</p>"
      },
      {
        "h": "What scaling frameworks actually cost",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Coordination overhead.</strong> Large planning events consume significant capacity. Whether that is worth it depends entirely on whether the dependencies are real.</li>\n          <li><strong>Reduced team autonomy.</strong> Alignment across teams necessarily constrains individual team choices. This is a real trade-off, not a flaw, but it must be acknowledged rather than denied.</li>\n          <li><strong>New roles and structures</strong> that acquire their own interests and become difficult to remove.</li>\n          <li><strong>Certification and consultancy cost</strong>, which is substantial and recurring for the more prescriptive frameworks.</li>\n          <li><strong>The appearance of transformation.</strong> The most insidious cost. A large framework rollout looks decisive and generates activity, which can substitute for the harder structural work of removing dependencies and fixing funding.</li>\n        </ul>"
      },
      {
        "h": "Descaling as an alternative",
        "html": "\n        <p>Before scaling coordination, consider reducing the need for it:</p>\n        <ul class=\"body\">\n          <li><strong>Reorganise around value streams.</strong> Teams aligned to a customer journey have far fewer cross-team dependencies than teams aligned to technical layers.</li>\n          <li><strong>Decouple the architecture.</strong> Many team dependencies are architectural. Modular systems permit independent release, which removes coordination at source.</li>\n          <li><strong>Reduce work in progress at portfolio level.</strong> Running four initiatives sequentially rather than twelve concurrently removes most contention and finishes the first ones sooner.</li>\n          <li><strong>Give teams end-to-end ownership</strong>, including deployment and support. Dependencies on a separate operations function are among the most common and most removable.</li>\n        </ul>\n        <p>Descaling is harder than adopting a framework because it requires changing structure rather than adding process. It is also the change with the larger and more durable effect.</p>"
      },
      {
        "h": "Managing dependencies you cannot remove",
        "html": "\n        <ol class=\"body\">\n          <li><strong>Make them visible.</strong> A simple dependency board showing which team needs what from whom, by when, resolves a surprising amount without further machinery.</li>\n          <li><strong>Make them explicit commitments</strong> with named owners and dates, not assumptions.</li>\n          <li><strong>Sequence to minimise waiting.</strong> The team that produces should deliver before the team that consumes needs it.</li>\n          <li><strong>Track blocked time</strong> caused by each dependency (Module 8). It builds the evidence for structural change.</li>\n          <li><strong>Escalate at the boundary.</strong> Cross-team dependencies are a management responsibility; teams cannot resolve conflicting priorities set by different managers.</li>\n        </ol>"
      },
      {
        "h": "A staged approach",
        "html": "\n        <p>If you conclude scaling is genuinely required:</p>\n        <ol class=\"body\">\n          <li><strong>Get single-team delivery working first.</strong> Scaling dysfunction multiplies it. This is the most commonly skipped step and the most expensive to skip.</li>\n          <li><strong>Start with the lightest coordination that works</strong> — a shared backlog, a regular cross-team sync, a visible dependency board. Many organisations need nothing more.</li>\n          <li><strong>Add structure only where a specific problem demands it</strong>, and name the problem each addition solves.</li>\n          <li><strong>Adopt a full framework only if the lightweight approach has demonstrably failed</strong>, and then adapt it rather than implementing it wholesale.</li>\n          <li><strong>Review annually whether the coordination is still needed.</strong> Structure added for a problem that has since been solved is pure cost.</li>\n        </ol>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: map dependencies before choosing a framework",
      "text": "Spend two weeks recording every cross-team dependency your teams actually hit — what was needed, from whom, how long it blocked. Then sort them into inherent and structural. In most organisations the majority turn out to be structural: caused by how teams are organised or how the architecture is layered. That map tells you whether you have a coordination problem, which a framework addresses, or an organisation-design problem, which it does not. Buying a framework for the second is the most expensive mistake in this module."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Answer the three scaling questions honestly for your largest multi-team initiative. Then map its dependencies for two weeks and classify each as inherent or structural. For every structural one, note what organisational or architectural change would remove it. Decide whether your genuine next step is a scaling framework, a reorganisation, or simply reducing the number of concurrent initiatives."
    },
    "takeaways": [
      "The most common reason organisations scale is having many people, not a product requiring many teams",
      "Scaling frameworks manage dependencies well and remove them poorly",
      "SAFe is chosen frequently because it is legible to executives, and it carries substantial overhead",
      "The Spotify model was a description of one company at one moment, not a framework",
      "The most insidious cost of scaling is the appearance of transformation substituting for structural work",
      "Descaling — value-stream teams, decoupled architecture, less concurrent work — has the more durable effect",
      "Get single-team delivery working first, because scaling dysfunction multiplies it"
    ],
    "quiz": [
      {
        "q": "Before adopting a scaling framework, the most important question is whether:",
        "opts": [
          "Executives support the transformation publicly",
          "Teams have completed foundational agile training",
          "The dependencies are inherent or self-inflicted by structure",
          "The organisation can afford to fund the required certifications"
        ],
        "a": 2,
        "fb": "Scaling frameworks are very good at managing dependencies and much less good at removing them."
      },
      {
        "q": "The 'Spotify model' should be understood as:",
        "opts": [
          "A rigorously defined framework with formal certification available",
          "A lightweight alternative developed to compete with SAFe",
          "The recommended starting point for scaling Scrum",
          "A description of one company at one moment, not a framework"
        ],
        "a": 3,
        "fb": "Organisations adopting it typically copy the vocabulary without the underlying autonomy, producing new team names and no change."
      },
      {
        "q": "The most insidious cost of a large scaling framework rollout is that it:",
        "opts": [
          "Looks decisive and can substitute for harder structural work",
          "Reduces the autonomy of individual delivery teams",
          "Consumes significant capacity in planning events",
          "Requires substantial ongoing consultancy and certification spend"
        ],
        "a": 0,
        "fb": "Framework rollouts generate visible activity, which relieves the pressure to fix dependencies and funding."
      },
      {
        "q": "Which is an example of descaling rather than scaling?",
        "opts": [
          "Introducing a Scrum of Scrums coordination meeting",
          "Reorganising teams around customer value streams",
          "Adding a release train engineer role to the programme",
          "Running a quarterly multi-team planning event"
        ],
        "a": 1,
        "fb": "Teams aligned to a customer journey have far fewer cross-team dependencies than teams aligned to technical layers."
      },
      {
        "q": "What is the most commonly skipped step when scaling?",
        "opts": [
          "Selecting the framework that best fits the existing culture",
          "Training all staff in the chosen framework",
          "Getting single-team delivery working properly first",
          "Securing executive sponsorship before the rollout"
        ],
        "a": 2,
        "fb": "Scaling multiplies dysfunction. Skipping this step is the most expensive omission in the sequence."
      },
      {
        "q": "Chapters and guilds are best described as:",
        "opts": [
          "Mandatory structures within the SAFe framework",
          "Alternatives to cross-functional delivery teams",
          "Governance bodies that formally approve architectural decisions",
          "Cheap, useful groupings available without adopting any framework"
        ],
        "a": 3,
        "fb": "Chapters group a discipline across teams for skill development; guilds are voluntary interest communities. Neither requires a framework."
      }
    ]
  },
  {
    "id": "n11",
    "tag": "Module 11",
    "time": "55 min",
    "title": "Leading the Change",
    "summary": "Why most transformations fail, and what the ones that work do differently",
    "objectives": [
      "Understand the failure rate of change initiatives and its causes",
      "Assess organisational readiness before committing",
      "Create the psychological safety adaptive delivery depends on",
      "Handle resistance without treating it as an obstacle to overcome",
      "Sustain change beyond initial enthusiasm"
    ],
    "sections": [
      {
        "h": "The base rate",
        "html": "\n        <p>Begin with the number that should govern your expectations. A WTW study found that <strong>70% of change initiatives fail</strong>, and a LeadershipIQ survey reported that <strong>31% of chief executives are dismissed for poor change management.</strong></p>\n        <p>Agile transformations are change initiatives and are subject to the same base rate. Any plan that does not explicitly address why yours will be in the successful 30% is, statistically, a plan to fail. That is not pessimism; it is the appropriate starting assumption, and it should make you more interested in the failure modes than in the target state.</p>"
      },
      {
        "h": "Why agile transformations fail specifically",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Only the teams change.</strong> Funding, governance, contracts, reporting and incentives remain untouched, so the team's new autonomy is nominal. This is the dominant failure mode and Modules 7 to 9 exist because of it.</li>\n          <li><strong>It is a cost-reduction programme in disguise.</strong> If staff believe the real objective is fewer people, nothing else you say matters.</li>\n          <li><strong>Ceremonies are mandated and mindset is not.</strong> Compliance without belief (Module 1).</li>\n          <li><strong>Middle management is bypassed.</strong> The layer whose role changes most is often the layer least consulted, and it is entirely capable of stopping the change quietly.</li>\n          <li><strong>The first failure is punished.</strong> One public punishment for an honest problem ends candid reporting for years.</li>\n          <li><strong>Success is never defined.</strong> Without a stated outcome, the transformation becomes permanent and unfalsifiable.</li>\n        </ul>"
      },
      {
        "h": "Readiness before commitment",
        "html": "\n        <p>Assess honestly, and be willing to conclude that now is not the time:</p>\n        <ol class=\"body\">\n          <li><strong>Is there a real problem this solves?</strong> Named, felt by people who are not the sponsor. Transformations launched because the approach is fashionable do not survive their first difficulty.</li>\n          <li><strong>Is leadership prepared to change its own behaviour?</strong> Specifically: to fund differently, to accept range-based forecasts, and to stop asking for fixed scope on fixed dates.</li>\n          <li><strong>Is there capacity to absorb the disruption?</strong> An organisation at full stretch cannot learn. Change requires slack.</li>\n          <li><strong>Can the organisation tolerate a visible failure?</strong> If the first failed experiment will end the programme, you cannot run experiments.</li>\n          <li><strong>Is there someone senior who will still be here in two years?</strong> Transformations that lose their sponsor rarely survive the succession.</li>\n        </ol>"
      },
      {
        "h": "Psychological safety",
        "html": "\n        <p>Adaptive delivery depends on information travelling upward quickly and accurately: that an estimate was wrong, that an approach is not working, that a date will be missed. Every one of these is bad news, and organisations vary enormously in how safe it is to deliver.</p>\n        <p>Safety is not created by saying it exists. It is created by observable behaviour at the moment it is tested:</p>\n        <ul class=\"body\">\n          <li><strong>The first honest bad forecast is the test.</strong> How you respond determines whether you receive another. There is no second chance at this.</li>\n          <li><strong>Thank the messenger explicitly and publicly.</strong> Not the outcome — the disclosure.</li>\n          <li><strong>Separate blameless learning from accountability for outcomes.</strong> Both are legitimate; conflating them destroys the first.</li>\n          <li><strong>Model it yourself.</strong> A manager who describes their own mistakes in a team meeting changes what is sayable more than any policy.</li>\n        </ul>\n        <p>Where mistakes are treated as useful information rather than evidence of failure, people take the intellectual risks that adaptive work requires. Where they are not, teams optimise for defensibility, and you will receive accurate-looking reports until the week before the deadline.</p>"
      },
      {
        "h": "Resistance",
        "html": "\n        <p>Resistance is usually treated as an obstacle to overcome. It is more usefully treated as information.</p>\n        <p>The common sources, and what each requires:</p>\n        <ul class=\"body\">\n          <li><strong>Fear for the job.</strong> Particularly among project managers and middle managers whose role visibly changes. Requires a specific, honest answer about what their role becomes — and Module 4 provides it. Vagueness here guarantees opposition.</li>\n          <li><strong>Prior experience of a failed change.</strong> The organisation remembers. Acknowledge the previous attempt and say specifically what is different.</li>\n          <li><strong>Legitimate technical objection.</strong> Sometimes the resistor is right. A regulated process genuinely may not permit what you are proposing. Listen before dismissing.</li>\n          <li><strong>Loss of status.</strong> Rarely stated openly. Look for people whose expertise or gatekeeping role is being removed and find them a genuine new one.</li>\n          <li><strong>Change fatigue.</strong> The organisation has absorbed three restructures in four years. This is real, and the answer is usually to go slower.</li>\n        </ul>\n        <p>The most reliable predictor of whether resistance is overcome is whether the resistors were consulted before the decision or informed after it.</p>"
      },
      {
        "h": "Sustaining it",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Start where it is wanted.</strong> Volunteer teams first. Their success recruits sceptics far more effectively than mandate.</li>\n          <li><strong>Change the system, not only the teams.</strong> Pick one organisational mechanism — funding, reporting, or contracts — and change it in the first six months, or the transformation will be understood as optional.</li>\n          <li><strong>Communicate failures as well as wins.</strong> An organisation that only hears success stories stops believing them.</li>\n          <li><strong>Define what done looks like.</strong> A transformation without an end state becomes a permanent department with an interest in its own continuation.</li>\n          <li><strong>Protect the change through leadership succession.</strong> Document why decisions were made, so a new leader inherits reasoning rather than rituals.</li>\n          <li><strong>Expect a performance dip.</strong> Teams learning a new way of working get slower before they get faster. Say this in advance, or the dip will be read as evidence of failure by people looking for it.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: change one system mechanism early",
      "text": "Within the first six months, change one thing outside the teams — how initiatives are funded, what the monthly report contains, or how a contract handles scope. Teams read organisational seriousness from these signals far more accurately than from communications. A transformation in which only team behaviour changes is understood, correctly, as something being done to teams rather than to the organisation, and it will be waited out. Middle managers in particular are expert at identifying which changes are real."
    },
    "activity": {
      "title": "Workplace application",
      "text": "Score your organisation against the five readiness questions and write one line of evidence for each. If you score poorly on leadership behaviour or capacity, write down what would need to change first. Then identify the three individuals most likely to resist, work out which of the five sources applies to each, and plan a conversation with each of them before the next decision rather than after it."
    },
    "takeaways": [
      "Roughly 70% of change initiatives fail; assume you are in that population until you have addressed why not",
      "The dominant agile failure mode is that only the teams change while the system does not",
      "Middle management's role changes most and is consulted least, and it can stop the change quietly",
      "The first honest bad forecast is the test of psychological safety, and there is no second chance",
      "Treat resistance as information; the strongest predictor of overcoming it is consultation before the decision",
      "Change one organisational mechanism within six months or the change is read as optional",
      "Expect and announce a performance dip, or it will be read as evidence of failure"
    ],
    "quiz": [
      {
        "q": "Research cited in this module found that the proportion of change initiatives that fail is approximately:",
        "opts": [
          "70%",
          "20%",
          "45%",
          "90%"
        ],
        "a": 0,
        "fb": "A related survey found 31% of CEOs are dismissed for poor change management. Agile transformations share this base rate."
      },
      {
        "q": "The dominant reason agile transformations fail is that:",
        "opts": [
          "Frameworks are selected without adequate comparison",
          "Only the teams change while funding and governance do not",
          "Teams resist adopting the new ceremonies",
          "Insufficient training budget is allocated to support the rollout"
        ],
        "a": 1,
        "fb": "The team's new autonomy is nominal if the organisational system around it is untouched."
      },
      {
        "q": "Which group typically experiences the largest role change while being consulted least?",
        "opts": [
          "External suppliers and contractors",
          "Senior executives who are sponsoring the transformation",
          "Middle managers and traditional project managers",
          "Front-line delivery team members"
        ],
        "a": 2,
        "fb": "They are entirely capable of stopping a change quietly, and vagueness about their future role guarantees opposition."
      },
      {
        "q": "Psychological safety in an agile setting is established primarily by:",
        "opts": [
          "Stating clearly in team charters that it exists",
          "Running anonymous engagement surveys each quarter",
          "Separating the delivery teams from performance management",
          "How leadership responds the first time bad news arrives"
        ],
        "a": 3,
        "fb": "There is no second chance at this. After one punished disclosure you will receive comfortable reports until the week before the deadline."
      },
      {
        "q": "The strongest predictor of whether resistance to change is overcome is whether resistors were:",
        "opts": [
          "Consulted before the decision rather than informed after",
          "Moved into different roles during the transition",
          "Provided with formally certified training in the new methods",
          "Offered financial incentives to support the change"
        ],
        "a": 0,
        "fb": "Resistance is more usefully treated as information than as an obstacle, and its sources each require a different response."
      },
      {
        "q": "Teams learning a new way of working typically:",
        "opts": [
          "Show gains only after eighteen months of practice",
          "Get slower before they get faster, so announce it",
          "Improve steadily from the first iteration onward",
          "Maintain their prior performance during transition"
        ],
        "a": 1,
        "fb": "If the dip is not announced in advance it will be read as evidence of failure by people already looking for it."
      }
    ]
  },
  {
    "id": "n12",
    "tag": "Module 12",
    "time": "55 min",
    "title": "Your Adoption Plan",
    "summary": "Turning the programme into a decision you can defend",
    "objectives": [
      "Synthesise the programme into a sequenced adoption plan",
      "Set realistic expectations with your board or executive team",
      "Apply the considerations specific to organisations in Nepal and similar markets",
      "Build the leadership habits that sustain adaptive delivery",
      "Complete your capstone adoption plan"
    ],
    "sections": [
      {
        "h": "What the evidence collectively supports",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Agile generally outperforms</strong> — higher agile usage is associated with higher stakeholder and overall project success across a 1,002-project sample.</li>\n          <li><strong>But conditionally.</strong> It performs best with experienced teams, smaller teams, higher complexity and unclear goals; its benefits are limited with large teams, inexperienced teams, low complexity and clear goals.</li>\n          <li><strong>The constraint is usually organisational.</strong> Funding, governance, contracts and structure block adaptive delivery far more often than team capability does.</li>\n          <li><strong>Hybrid is legitimate.</strong> Combining predictive and adaptive elements is common and frequently correct.</li>\n          <li><strong>Transformation is change management.</strong> The base rate for change initiatives applies, and the failure modes are organisational rather than methodological.</li>\n        </ul>\n        <p>The through-line: <strong>almost every constraint identified in this programme is one a manager controls.</strong> None requires a framework purchase, and most require no budget at all.</p>"
      },
      {
        "h": "A twelve-month sequence",
        "html": "\n        <p><strong>Months 1–3: assess and decide.</strong></p>\n        <ul class=\"body\">\n          <li>Run the suitability filter on your current portfolio (Module 2); classify each initiative as adaptive, predictive or hybrid</li>\n          <li>Map dependencies and hand-offs for two weeks (Modules 5 and 10)</li>\n          <li>Write the decision-rights map and circulate it (Module 4)</li>\n          <li>Audit your metrics and stop reporting activity data upward (Module 8)</li>\n          <li>Assess readiness honestly and be willing to defer (Module 11)</li>\n        </ul>\n        <p><strong>Months 4–6: change one system mechanism.</strong></p>\n        <ul class=\"body\">\n          <li>Convert one initiative to incremental funding with real stop points (Module 7)</li>\n          <li>Replace one governance artefact with a demonstration (Module 9)</li>\n          <li>Start the impediment list and report its age (Module 4)</li>\n          <li>Make one structural change: dedicate members, or remove one hand-off (Module 5)</li>\n          <li>Begin three-point forecasting from actual throughput (Module 6)</li>\n        </ul>\n        <p><strong>Months 7–9: extend and measure.</strong></p>\n        <ul class=\"body\">\n          <li>Extend to a second team, chosen for willingness rather than importance</li>\n          <li>Renegotiate one contract's scope-change clause (Module 7)</li>\n          <li>Publish the five-number measurement set (Module 8)</li>\n          <li>Review honestly, including what has not worked (Module 11)</li>\n        </ul>\n        <p><strong>Months 10–12: consolidate.</strong></p>\n        <ul class=\"body\">\n          <li>Compare claimed benefits to observed outcomes across the portfolio</li>\n          <li>Decide on scaling only if the dependency map justifies it (Module 10)</li>\n          <li>Retire internal policies whose purpose has passed (Module 9)</li>\n          <li>Set next year's approach on evidence rather than enthusiasm</li>\n        </ul>"
      },
      {
        "h": "Setting expectations with your board",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Year one builds capability.</strong> Expect measurable improvement in cycle time and predictability on two or three initiatives, not a step change in business results.</li>\n          <li><strong>There will be a performance dip</strong> before improvement. Say so now.</li>\n          <li><strong>Some initiatives will be stopped.</strong> That is the funding model working, not a failure.</li>\n          <li><strong>The organisation will have to change, not only the teams.</strong> Name which mechanism you will change first.</li>\n          <li><strong>This is not a cost programme.</strong> Say it explicitly and early, because someone will assume otherwise and the assumption is very hard to correct later.</li>\n        </ul>"
      },
      {
        "h": "Considerations for Nepal and comparable markets",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Team experience is the binding constraint.</strong> Evidence is clear that agile underperforms with inexperienced teams. In a market with a young technology workforce and high attrition, this matters more than framework selection. Invest in technical leadership and enforced standards before adopting more ceremony.</li>\n          <li><strong>Outsourced and client-driven work often arrives with fixed scope and price.</strong> The contracting module is therefore more important here than in markets with more product work. Capped time-and-materials and fixed-price-per-increment are the realistic negotiating positions.</li>\n          <li><strong>Time-zone overlap with international clients is a structural constraint</strong>, not a communication problem. Negotiate it explicitly at contract stage.</li>\n          <li><strong>Hierarchy is a genuine cultural factor.</strong> Teams accustomed to deference will not self-organise because they have been told to. Servant leadership requires visible, repeated demonstration before it is believed.</li>\n          <li><strong>Attrition erodes accumulated practice.</strong> Document decisions and reasoning, or each departure resets the team.</li>\n          <li><strong>The advantage:</strong> smaller organisations have less legacy governance to dismantle. A twenty-person company can change its funding model in a meeting. That is not available to an enterprise.</li>\n        </ul>"
      },
      {
        "h": "The habits that sustain it",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Ask what happened when the plan was wrong.</strong> The diagnostic from Module 1, useful indefinitely.</li>\n          <li><strong>Report ranges, never single dates.</strong></li>\n          <li><strong>Track impediment age</strong> and treat it as a measure of your own performance.</li>\n          <li><strong>Protect team-level metrics from evaluation.</strong> Say it repeatedly; teams assume otherwise.</li>\n          <li><strong>Keep stopping things.</strong> A portfolio in which nothing is ever cancelled is not being managed.</li>\n          <li><strong>Change one system mechanism a year.</strong> Structure outlasts enthusiasm.</li>\n          <li><strong>Say the uncomfortable number first.</strong> Credibility compounds, and it is the only asset that lets you use ranges and stop criteria at all.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: pick the system change first",
      "text": "The instinct is to start with the teams, because that is visible and feels like progress. Start instead with one organisational mechanism — the funding model for a single initiative, or the contents of the monthly report. It is slower, less visible and far more durable, because team practices decay back toward what the surrounding system rewards. Change the system and team behaviour follows without being managed. Change only the teams and you will be managing it forever."
    },
    "activity": {
      "title": "Capstone: your adoption plan",
      "text": "Write a plan of no more than five pages for your executive team: <strong>(1)</strong> the named problem this addresses and the measure that will move; <strong>(2)</strong> your portfolio classified as adaptive, predictive or hybrid with reasoning; <strong>(3)</strong> the one organisational mechanism you will change in the first six months; <strong>(4)</strong> your decision-rights map; <strong>(5)</strong> the five-number measurement set and what you will stop reporting; and <strong>(6)</strong> the readiness assessment, including what would make you recommend deferring. Then present it, and keep the deferral option genuinely open."
    },
    "takeaways": [
      "Agile outperforms conditionally, and the conditions are knowable in advance",
      "The binding constraint is usually organisational rather than team capability",
      "Almost every constraint in this programme is one a manager controls without budget",
      "Change one system mechanism in the first six months or the change is read as optional",
      "Tell the board that year one builds capability and that there will be a dip",
      "In markets with young workforces, team experience matters more than framework selection",
      "Team practices decay back toward whatever the surrounding system rewards"
    ],
    "quiz": [
      {
        "q": "The evidence in this programme suggests the most common constraint on adaptive delivery is:",
        "opts": [
          "The particular delivery framework the organisation selected",
          "Insufficient tooling and automation investment",
          "Organisational funding, governance and contracting",
          "The technical skill of the delivery teams"
        ],
        "a": 2,
        "fb": "Almost every constraint identified is one a manager controls, and most require no budget at all."
      },
      {
        "q": "When beginning an adoption, the more durable starting point is to change:",
        "opts": [
          "Team-level practices, since the results appear more quickly",
          "The project management tooling used across teams",
          "The job titles and reporting lines within delivery",
          "One organisational mechanism such as funding or reporting"
        ],
        "a": 3,
        "fb": "Team practices decay back toward whatever the surrounding system rewards. Change the system and behaviour follows."
      },
      {
        "q": "For organisations in markets with a young technology workforce, the priority should be:",
        "opts": [
          "Technical leadership and enforced standards before more ceremony",
          "Outsourcing delivery until internal capability matures",
          "Selecting the most widely certified framework that is available",
          "Adopting a scaling framework early for consistency"
        ],
        "a": 0,
        "fb": "The evidence is clear that agile underperforms with inexperienced teams, and structure must replace what the framework removes."
      },
      {
        "q": "What should a manager tell the board about year one?",
        "opts": [
          "It will reduce delivery costs across the portfolio",
          "It builds capability and will include a performance dip",
          "It requires no change to existing governance",
          "It will deliver measurable business results within two quarters"
        ],
        "a": 1,
        "fb": "Stating that this is not a cost programme, explicitly and early, is also necessary, because someone will assume otherwise."
      },
      {
        "q": "A portfolio in which no initiative is ever cancelled indicates that:",
        "opts": [
          "Business cases are being prepared rigorously",
          "Teams are consistently meeting their commitments",
          "The portfolio is not actually being managed",
          "Prioritisation at intake is working effectively"
        ],
        "a": 2,
        "fb": "Incremental funding only creates control if the stop option is genuinely exercised from time to time."
      },
      {
        "q": "A structural advantage smaller organisations hold over large enterprises is that they:",
        "opts": [
          "Attract more experienced agile practitioners",
          "Face lower client expectations on delivery dates",
          "Require fewer cross-team dependencies by nature",
          "Have less legacy governance to dismantle"
        ],
        "a": 3,
        "fb": "A twenty-person company can change its funding model in a single meeting. That option is not available to an enterprise."
      }
    ]
  }
];
