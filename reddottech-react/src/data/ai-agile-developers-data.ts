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

export const agileDevelopersLessons: Lesson[] = [
  {
    "id": "d1",
    "tag": "Module 1",
    "time": "40 min",
    "title": "Why Agile Exists",
    "summary": "The problem it was invented to solve — start here if it is all new",
    "objectives": [
      "Explain how software was built before agile, and why it often went wrong",
      "Describe what iterative delivery changes about risk",
      "Use the basic vocabulary correctly in a team conversation",
      "Recognise that agile is a family of approaches, not one method",
      "Know what this course will and will not teach you"
    ],
    "sections": [
      {
        "h": "Who this course is for",
        "html": "\n        <p>This course is for <strong>software developers, testers, and computing students</strong> who are new to agile — or who have been working in an agile team without anyone ever explaining why things are done this way.</p>\n        <p>It assumes you can write code. It assumes nothing else. Every term is defined when it first appears, and nothing here requires prior experience of Scrum, Kanban or any tool.</p>\n        <p>By the end you will understand how a sprint works, how to write and size a piece of work, how to keep quality high while moving fast, and how to be a useful member of a team rather than a person who writes code alone. There is a companion course, <em>Agile Methodologies for Managers</em>, covering funding, governance and organisational design. This one is about your daily work.</p>"
      },
      {
        "h": "How software used to be built",
        "html": "\n        <p>The traditional approach is called <strong>waterfall</strong>, because work flows downward through fixed phases and does not come back up:</p>\n        <ol class=\"body\">\n          <li><strong>Requirements.</strong> Business analysts write down everything the system must do.</li>\n          <li><strong>Design.</strong> Architects design the whole system from that document.</li>\n          <li><strong>Implementation.</strong> Developers build it.</li>\n          <li><strong>Testing.</strong> Testers check the finished system.</li>\n          <li><strong>Deployment and maintenance.</strong> It goes live and is then supported.</li>\n        </ol>\n        <p>Each phase finishes before the next begins, and each produces a document the next phase depends on. On paper this is orderly and easy to plan. It is still the correct approach for some work — building a bridge, for instance, where changing your mind after pouring concrete is genuinely expensive.</p>"
      },
      {
        "h": "Why it often failed for software",
        "html": "\n        <p>Waterfall assumes three things that are usually false in software:</p>\n        <ul class=\"body\">\n          <li><strong>That the customer knows what they want at the start.</strong> Usually they know roughly, and discover the detail by seeing something.</li>\n          <li><strong>That requirements will not change.</strong> Over a two-year project the market changes, competitors ship things, laws change and staff leave.</li>\n          <li><strong>That you can estimate accurately from a document.</strong> Software estimates made before any code exists are notoriously unreliable.</li>\n        </ul>\n        <p>The result was a recognisable pattern: a team would work for eighteen months, deliver, and find that the customer no longer wanted what was specified — or never had. All the testing happened at the end, so all the bad news arrived at once, at the point when there was no time or money left to respond.</p>\n        <div class=\"callout note\"><h4>The core insight</h4><p style=\"margin:0\">The problem was not that people made mistakes. Mistakes are unavoidable. The problem was <strong>how long it took to find out</strong>. If you are wrong in week two and discover it in week eighty, you have wasted seventy-eight weeks. If you discover it in week four, you have wasted two.</p></div>"
      },
      {
        "h": "What iterative delivery changes",
        "html": "\n        <p>Agile approaches attack that specific problem. Instead of one long cycle, you run many short ones. Each cycle — typically one to four weeks — contains a little planning, a little design, some building, some testing, and a review with whoever the software is for.</p>\n        <p>At the end of each cycle you have something that <strong>actually works</strong>. It does very little at first, but it runs, and someone can look at it and react.</p>\n        <p>Three things follow from that:</p>\n        <ul class=\"body\">\n          <li><strong>Feedback arrives constantly</strong> instead of at the end, so being wrong is cheap.</li>\n          <li><strong>Risk is retired early.</strong> If the hardest part cannot be made to work, you find out in month one.</li>\n          <li><strong>Priorities can change</strong> between cycles without the whole plan collapsing.</li>\n        </ul>\n        <p>Two words you will hear constantly. <strong>Iterative</strong> means repeating a cycle to improve something. <strong>Incremental</strong> means delivering it in finished pieces. Agile is normally both: you build a small usable piece, then improve it, then add the next.</p>"
      },
      {
        "h": "Agile is a family, not a method",
        "html": "\n        <p>There is no single thing called \"agile\". It is an umbrella term for approaches sharing a set of values. The ones you will meet:</p>\n        <ul class=\"body\">\n          <li><strong>Scrum</strong> — fixed-length cycles called sprints, with defined roles and meetings. The most widely used, and Modules 3 and 4 cover it.</li>\n          <li><strong>Kanban</strong> — continuous flow with limits on how much work is in progress at once. No sprints. Module 7.</li>\n          <li><strong>Extreme Programming (XP)</strong> — a set of technical practices such as test-driven development and pair programming. Modules 8 to 11.</li>\n          <li><strong>Scrumban</strong> — a common mix of Scrum's structure and Kanban's flexibility.</li>\n        </ul>\n        <p>Most real teams use a combination and call it Scrum. That is normal and not a failure.</p>"
      },
      {
        "h": "Vocabulary you need immediately",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Sprint / iteration</strong> — one fixed-length work cycle, usually two weeks.</li>\n          <li><strong>Backlog</strong> — the ordered list of everything the team might build.</li>\n          <li><strong>User story</strong> — one small piece of wanted behaviour, written from the user's point of view.</li>\n          <li><strong>Increment</strong> — the working software produced by a sprint.</li>\n          <li><strong>Standup</strong> — the short daily team meeting.</li>\n          <li><strong>Retrospective</strong> — the meeting where the team improves how it works.</li>\n          <li><strong>Definition of done</strong> — the shared standard a piece of work must meet before it counts as finished.</li>\n          <li><strong>Velocity</strong> — how much a team completes per sprint, used for forecasting.</li>\n        </ul>\n        <p>Each of these gets a full treatment later. For now you only need to recognise them.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: ask why, not just what",
      "text": "In your first weeks on an agile team you will be told to do things — attend this meeting, size that story, update this board. The developers who become genuinely good at this are the ones who ask what each practice is for. A standup exists so the team can spot blockers early; if yours has become a status report to a manager, it has stopped doing its job. Knowing the purpose lets you tell the difference between a practice that is working and a ritual that is being performed."
    },
    "activity": {
      "title": "Practice",
      "text": "Think of a piece of software you have built or worked on. Write down one assumption about it that turned out to be wrong. Then answer two questions: how long did it take to discover, and what would it have cost to discover in the first two weeks instead? That difference is the entire argument for iterative delivery, and you have just made it with your own example."
    },
    "takeaways": [
      "Waterfall assumes requirements are known upfront and will not change, which is rarely true in software",
      "The real problem was not making mistakes but how long it took to discover them",
      "Short cycles produce working software early, so being wrong becomes cheap",
      "Iterative means repeating to refine; incremental means delivering in finished pieces",
      "Agile is a family of approaches sharing values, not one prescribed method",
      "Most real teams blend frameworks, which is normal rather than a failure",
      "Learn the purpose of each practice, not just the mechanics"
    ],
    "quiz": [
      {
        "q": "In waterfall development, all testing typically happens:",
        "opts": [
          "At the end, so problems surface together and late",
          "Continuously throughout each phase of the project",
          "Before implementation begins on the codebase",
          "In parallel with the requirements gathering stage"
        ],
        "a": 0,
        "fb": "Bad news arrives at the point when there is least time and money left to respond to it."
      },
      {
        "q": "The core problem agile was designed to solve is:",
        "opts": [
          "That developers write too much untested code",
          "That it took too long to discover a mistake",
          "That documentation was too expensive to produce",
          "That teams were too large to coordinate well"
        ],
        "a": 1,
        "fb": "Being wrong in week two and finding out in week eighty wastes seventy-eight weeks of effort."
      },
      {
        "q": "'Incremental' delivery means:",
        "opts": [
          "Repeating a cycle to gradually refine one thing",
          "Increasing team size as the project progresses",
          "Delivering the work in finished, usable pieces",
          "Adding more detail to the requirements document"
        ],
        "a": 2,
        "fb": "Iterative means repeating to refine. Agile is usually both at once, but the two words are not interchangeable."
      },
      {
        "q": "Which statement about agile approaches is accurate?",
        "opts": [
          "Agile is a single method with defined mandatory steps",
          "Scrum and agile are two words for the same thing",
          "Only Scrum qualifies as a genuinely agile approach",
          "It is a family of approaches that share common values"
        ],
        "a": 3,
        "fb": "Scrum, Kanban and XP are all agile. Most teams blend them, which is entirely normal."
      },
      {
        "q": "Waterfall remains a reasonable choice when:",
        "opts": [
          "Requirements are genuinely stable and change is costly",
          "The technology being used is entirely unfamiliar to the team",
          "The customer wants to see progress frequently",
          "The team is inexperienced with iterative delivery"
        ],
        "a": 0,
        "fb": "Building a bridge is the standard example: changing your mind after pouring concrete is genuinely expensive."
      }
    ]
  },
  {
    "id": "d2",
    "tag": "Module 2",
    "time": "40 min",
    "title": "The Agile Manifesto in Plain Language",
    "summary": "What the four values and twelve principles actually mean for your work",
    "objectives": [
      "State the four values and explain each in your own words",
      "Avoid the common misreadings that damage teams",
      "Connect the twelve principles to daily developer practice",
      "Recognise when a team is following the words but missing the point",
      "Understand what sustainable pace means and why it is in there"
    ],
    "sections": [
      {
        "h": "Where it came from",
        "html": "\n        <p>In February 2001, seventeen software practitioners met and wrote a short document setting out what they had each found to work. It is called the Agile Manifesto. It is four value statements and twelve principles, and it is about a page long.</p>\n        <p>It is worth reading in full at some point — it takes five minutes. Almost everything in this course descends from it.</p>"
      },
      {
        "h": "The four values",
        "html": "\n        <p>Each is written as a preference between two things, both of which have value:</p>\n        <ul class=\"body\">\n          <li><strong>Individuals and interactions</strong> over processes and tools</li>\n          <li><strong>Working software</strong> over comprehensive documentation</li>\n          <li><strong>Customer collaboration</strong> over contract negotiation</li>\n          <li><strong>Responding to change</strong> over following a plan</li>\n        </ul>\n        <p>The authors added a line that is nearly always left out when people quote it: <em>\"while there is value in the items on the right, we value the items on the left more.\"</em></p>\n        <div class=\"callout warn\"><h4>The misreadings to avoid</h4><p style=\"margin:0\">\"Working software over documentation\" does <strong>not</strong> mean write no documentation. \"Responding to change over following a plan\" does <strong>not</strong> mean work without a plan. Teams that read it that way end up with no design records, no onboarding material and no forecast — and then blame agile. The statement is about which one wins when the two genuinely conflict.</p></div>"
      },
      {
        "h": "What each value means at your desk",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Individuals and interactions.</strong> If you are stuck, walk over and ask — do not spend two days working around a problem someone could explain in five minutes. A process that stops people talking is a broken process.</li>\n          <li><strong>Working software.</strong> Code that runs and is tested is the evidence of progress. A detailed design document for something not yet built proves nothing. This is why teams demonstrate working software rather than presenting slides.</li>\n          <li><strong>Customer collaboration.</strong> Talk to whoever the software is for, regularly. A developer who has never seen a user work is guessing.</li>\n          <li><strong>Responding to change.</strong> When a requirement changes, that is information, not betrayal. Your job is to make the codebase easy to change, which is what Modules 8 to 11 are about.</li>\n        </ul>"
      },
      {
        "h": "The twelve principles, grouped",
        "html": "\n        <p>The principles expand the values. Grouped by what they ask of you:</p>\n        <p><strong>About delivery:</strong></p>\n        <ul class=\"body\">\n          <li>Satisfy the customer through early and continuous delivery of valuable software.</li>\n          <li>Deliver working software frequently, from a couple of weeks to a couple of months, preferring the shorter timescale.</li>\n          <li>Working software is the primary measure of progress.</li>\n        </ul>\n        <p><strong>About change:</strong></p>\n        <ul class=\"body\">\n          <li>Welcome changing requirements, even late in development.</li>\n          <li>Business people and developers must work together daily.</li>\n        </ul>\n        <p><strong>About people:</strong></p>\n        <ul class=\"body\">\n          <li>Build projects around motivated individuals; give them the environment and support they need, and trust them.</li>\n          <li>Face-to-face conversation is the most efficient way to convey information within a team.</li>\n          <li>The best architectures, requirements and designs emerge from self-organising teams.</li>\n          <li>Sponsors, developers and users should be able to maintain a constant pace indefinitely.</li>\n        </ul>\n        <p><strong>About quality and improvement:</strong></p>\n        <ul class=\"body\">\n          <li>Continuous attention to technical excellence and good design enhances agility.</li>\n          <li>Simplicity — maximising the work not done — is essential.</li>\n          <li>At regular intervals the team reflects on how to become more effective, then adjusts.</li>\n        </ul>"
      },
      {
        "h": "Two principles developers should take personally",
        "html": "\n        <p><strong>\"Continuous attention to technical excellence and good design enhances agility.\"</strong> This is the sentence that makes agile a technical discipline rather than a meeting schedule. You can only respond to change quickly if the code is easy to change. Every shortcut you take today reduces tomorrow's agility. This is not a moral argument about craftsmanship — it is a mechanical claim about what makes fast change possible.</p>\n        <p><strong>\"Sustainable pace, indefinitely.\"</strong> Agile explicitly rejects the crunch-and-collapse cycle. The reasoning is practical rather than sentimental: tired developers write defects, and defects cost more to fix than the hours saved. If your team is regularly working weekends to make a sprint, the sprint is being over-committed and the retrospective should say so.</p>"
      },
      {
        "h": "Following the words, missing the point",
        "html": "\n        <p>You will meet teams doing all the ceremonies with none of the intent. The signs:</p>\n        <ul class=\"body\">\n          <li>The standup is a status report to a manager rather than the team coordinating itself.</li>\n          <li>Retrospectives produce actions that are never done, and nobody mentions it.</li>\n          <li>Scope and deadline are both fixed from outside, so nothing can actually adapt.</li>\n          <li>\"Working software\" is demonstrated but is not tested and cannot ship.</li>\n          <li>Estimates are treated as commitments and used to apply pressure.</li>\n        </ul>\n        <p>Naming this early in your career is useful. It does not make you cynical — it makes you accurate, and it is the first step toward being someone who improves a team rather than merely complying with it.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: the strongest principle to quote",
      "text": "When you need to argue for time to write tests, refactor a nasty module, or fix the build, quote this one: <em>\"Continuous attention to technical excellence and good design enhances agility.\"</em> It reframes quality work from a developer indulgence into the thing that makes future speed possible. Managers who would dismiss \"I want to refactor this\" will often accept \"this module is why our last three estimates were wrong.\" Say it in terms of future delivery speed, because that is genuinely what it is."
    },
    "activity": {
      "title": "Practice",
      "text": "Read the Agile Manifesto in full — it takes five minutes. Then pick the three principles your current or most recent team follows least well. For each, write one specific thing you could do yourself, without needing anyone's permission, that would move it slightly. Those three actions are within your control regardless of how your team is run."
    },
    "takeaways": [
      "The four values are preferences between two valuable things, not prohibitions",
      "Working software is the primary measure of progress, not documents or slides",
      "A changed requirement is information rather than betrayal",
      "Technical excellence is what makes fast change mechanically possible",
      "Sustainable pace is practical, not sentimental — tired developers write defects",
      "Simplicity, defined as maximising work not done, is an explicit principle",
      "Ceremonies without intent are common; naming that accurately is useful"
    ],
    "quiz": [
      {
        "q": "'Working software over comprehensive documentation' means that:",
        "opts": [
          "Only user-facing documentation has any real value",
          "Working software wins when the two genuinely conflict",
          "Documentation should not be produced by agile teams at all",
          "Documentation is written only after release"
        ],
        "a": 1,
        "fb": "The Manifesto explicitly says there is value in the items on the right. Teams that read it as elimination end up with no onboarding material."
      },
      {
        "q": "Which principle most directly supports a developer asking for time to refactor?",
        "opts": [
          "Face-to-face conversation is the most efficient method",
          "Working software is the primary measure of progress",
          "Technical excellence and good design enhance agility",
          "Business people and developers must work together daily"
        ],
        "a": 2,
        "fb": "It reframes quality work from indulgence into the mechanism that makes future change fast."
      },
      {
        "q": "The Manifesto's principle of sustainable pace exists mainly because:",
        "opts": [
          "Labour regulations in most countries require strict limits on working hours",
          "Long hours reduce the accuracy of story estimates",
          "Sponsors prefer predictable weekly resource costs",
          "Tired developers introduce defects that cost more than the hours saved"
        ],
        "a": 3,
        "fb": "The reasoning is practical rather than sentimental. Regular weekend work means sprints are being over-committed."
      },
      {
        "q": "A daily standup that has become a status report to a manager has:",
        "opts": [
          "Lost its purpose, which is the team coordinating itself",
          "Become more efficient by removing team discussion",
          "Matured into a properly governed management reporting mechanism",
          "Been correctly adapted for distributed working"
        ],
        "a": 0,
        "fb": "Knowing the purpose of each practice lets you tell a working practice from a performed ritual."
      },
      {
        "q": "The principle 'simplicity — the art of maximising the work not done' asks you to:",
        "opts": [
          "Use the simplest programming language available to you",
          "Avoid building things that are not actually needed",
          "Write code as quickly as circumstances permit",
          "Reduce the number of team meetings held"
        ],
        "a": 1,
        "fb": "The cheapest, fastest and most reliable feature is the one you correctly decided not to build."
      },
      {
        "q": "When a requirement changes late in development, the agile response is to treat it as:",
        "opts": [
          "A reason to extend the current deadline",
          "A change request requiring formal approval",
          "Information the team should incorporate",
          "A failure of the original analysis work"
        ],
        "a": 2,
        "fb": "Your job is to keep the codebase easy to change, which is what the technical practices modules are about."
      }
    ]
  },
  {
    "id": "d3",
    "tag": "Module 3",
    "time": "50 min",
    "title": "Scrum: Roles, Events and Artefacts",
    "summary": "The framework you are most likely to be working in",
    "objectives": [
      "Name the three roles and describe what each is responsible for",
      "Describe each Scrum event and what it is for",
      "Explain the three artefacts and who owns each",
      "Understand what a sprint goal is and why it matters",
      "Recognise the most common ways Scrum is done badly"
    ],
    "sections": [
      {
        "h": "The shape of Scrum",
        "html": "\n        <p>Scrum organises work into <strong>sprints</strong> — fixed-length cycles, usually one to four weeks, most commonly two. Every sprint follows the same rhythm, and the length does not change between sprints. That consistency is deliberate: it makes the team's output measurable and its forecasts meaningful.</p>\n        <p>The goal of each sprint is a <strong>potentially releasable increment</strong> — something finished enough that it could ship, whether or not it actually does.</p>"
      },
      {
        "h": "The three roles",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Product Owner.</strong> One person responsible for maximising the value of the product. They own and order the Product Backlog, decide what gets built next, and act as the voice of the customer. When you need to know whether something is in scope, you ask them. Critically, priority is <em>their</em> decision, not the team's and not a manager's.</li>\n          <li><strong>Scrum Master.</strong> Serves the team by removing impediments, facilitating the events, and protecting the team from interruption. They are not the team's boss and do not assign work. A good one makes themselves progressively less necessary.</li>\n          <li><strong>Developers.</strong> Everyone doing the building — programmers, testers, designers, anyone whose work goes into the increment. The team is <strong>self-managing</strong>: it decides how to do the work and who does what.</li>\n        </ul>\n        <p>Note what is absent: there is no team lead assigning tasks, and no separate testing department. If your team has these, it is running a hybrid — common, and worth understanding as a deliberate variation rather than assuming the book is wrong.</p>"
      },
      {
        "h": "The events",
        "html": "\n        <p><strong>Sprint Planning</strong> — at the start. The Product Owner presents the highest-priority backlog items; the team selects what it believes it can complete; together they agree a <strong>sprint goal</strong>; the team breaks the items into tasks. Typically two hours per week of sprint length.</p>\n        <p><strong>Daily Scrum (standup)</strong> — every day, 15 minutes, same time and place. Each person covers what they did yesterday, what they will do today, and what is blocking them. It is <em>for the team</em>, to coordinate and surface blockers early — not a report to management. If it regularly runs long, the detailed conversation should move to a smaller group afterwards.</p>\n        <p><strong>Sprint Review</strong> — at the end. The team demonstrates working software to stakeholders and collects feedback. This validates whether the sprint goal was met and lets the backlog be adjusted. It is a working session, not a presentation.</p>\n        <p><strong>Sprint Retrospective</strong> — after the review. The team examines <em>how it worked</em> rather than what it built: what to keep, what to fix, and what specific actions to try next sprint. Module 12 covers this in depth.</p>\n        <p><strong>Backlog Refinement</strong> — continuous rather than a formal event, but universally practised. The team reviews upcoming items, clarifies them, estimates effort, breaks large ones down, and removes or reorders items as priorities change.</p>"
      },
      {
        "h": "The artefacts",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Product Backlog.</strong> The ordered list of everything wanted — features, improvements and fixes. Owned by the Product Owner, continuously updated. It is never complete.</li>\n          <li><strong>Sprint Backlog.</strong> The items selected for this sprint, plus the tasks needed to complete them, plus the sprint goal. <strong>Owned by the developers</strong>, and it can be adjusted during the sprint as the team learns — provided the sprint goal remains the focus.</li>\n          <li><strong>Increment.</strong> The working, tested output of the sprint, meeting the definition of done.</li>\n        </ul>"
      },
      {
        "h": "The sprint goal",
        "html": "\n        <p>The most under-used part of Scrum. A sprint goal is a single sentence describing what this sprint is trying to achieve — for example, <em>\"a customer can register and log in.\"</em></p>\n        <p>It matters for a practical reason. Without a goal, a sprint is just a list of unrelated tickets, and when the team runs short of time it has no basis for deciding what to drop. With a goal, the decision is easy: anything not serving the goal goes first. It also gives the team something to say at the review beyond \"we did these fourteen things.\"</p>"
      },
      {
        "h": "How Scrum is commonly done badly",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Sprints with no goal</strong> — a list of tickets with a date attached.</li>\n          <li><strong>The standup as a status meeting</strong> where everyone reports to the Scrum Master or a manager.</li>\n          <li><strong>No definition of done</strong>, so \"finished\" means something different to each person.</li>\n          <li><strong>Work carried over every sprint</strong>, which usually means items are too large or the team is over-committing.</li>\n          <li><strong>The Product Owner is unavailable</strong>, so the team guesses at requirements and builds the wrong thing politely.</li>\n          <li><strong>Retrospective actions are never completed</strong>, which teaches the team that the meeting is theatre.</li>\n          <li><strong>Testing pushed to the last two days</strong>, recreating waterfall inside a two-week box. This is the most common and most damaging.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: know your sprint goal",
      "text": "At any point in a sprint you should be able to state the sprint goal in one sentence without looking it up. If you cannot, and nor can your teammates, your team is running sprints without goals — which means it is really running two-week batches of unrelated tickets. Raise it at the next retrospective. It is a small change that immediately improves what the team can decide when time runs short, and it is one of the few improvements a junior developer can propose without stepping on anyone's role."
    },
    "activity": {
      "title": "Practice",
      "text": "For your current or most recent sprint, write down: the sprint goal, who the Product Owner is, what your definition of done says, and how many items were carried over from the previous sprint. If you cannot answer two or more of these, you have found the most useful thing to raise at your next retrospective — and this module gives you the language to raise it constructively."
    },
    "takeaways": [
      "Sprints are fixed-length, most commonly two weeks, and the length does not change between them",
      "The Product Owner decides priority; the Scrum Master serves; the developers self-manage",
      "The Sprint Backlog belongs to the developers and can be adjusted if the goal is kept",
      "The daily standup is for the team to coordinate, not to report to a manager",
      "A sprint goal tells the team what to drop when time runs short",
      "Regular carry-over usually means items are too large or the team over-commits",
      "Pushing all testing to the final days recreates waterfall inside a two-week box"
    ],
    "quiz": [
      {
        "q": "Who decides the order of items in the Product Backlog?",
        "opts": [
          "The Scrum Master, who facilitates the process",
          "The development team, by consensus vote",
          "The delivery manager or department head",
          "The Product Owner, who owns product value"
        ],
        "a": 3,
        "fb": "Priority is the Product Owner's decision. When you need to know whether something is in scope, you ask them."
      },
      {
        "q": "The Sprint Backlog is owned by:",
        "opts": [
          "The developers who selected the work",
          "The Scrum Master who tracks progress",
          "The Product Owner who prioritised it",
          "Whoever sponsors the initiative financially"
        ],
        "a": 0,
        "fb": "It can be adjusted during the sprint as the team learns, provided the sprint goal remains the focus."
      },
      {
        "q": "The primary purpose of the daily standup is:",
        "opts": [
          "Allowing management to track sprint progress",
          "The team coordinating and surfacing blockers early",
          "Reporting individual progress to the Scrum Master",
          "Assigning the day's tasks to team members"
        ],
        "a": 1,
        "fb": "If it regularly overruns, move the detailed discussion to a smaller group immediately afterwards."
      },
      {
        "q": "A sprint goal is valuable mainly because it:",
        "opts": [
          "Provides a metric for measuring team velocity",
          "Gives the Product Owner a reporting mechanism",
          "Tells the team what to drop when time runs short",
          "Satisfies a formal requirement of the Scrum framework"
        ],
        "a": 2,
        "fb": "Without one, a sprint is a list of unrelated tickets and the team has no basis for deciding what to sacrifice."
      },
      {
        "q": "A team completes all coding by day eight and does all testing on days nine and ten. This:",
        "opts": [
          "Reduces the risk of defects reaching production",
          "Is an efficient use of specialist tester time",
          "Is standard practice in mature Scrum teams",
          "Recreates waterfall inside a two-week container"
        ],
        "a": 3,
        "fb": "It is the most common and most damaging way Scrum is done badly, because bad news still arrives at the end."
      },
      {
        "q": "Work being carried over into the next sprint every time usually indicates:",
        "opts": [
          "Items are too large, or the team is over-committing",
          "The Product Owner is prioritising incorrectly",
          "The definition of done is unnecessarily strict",
          "The sprint length should be extended to three weeks"
        ],
        "a": 0,
        "fb": "Both causes are fixable, and the retrospective is where the team should be raising it."
      }
    ]
  },
  {
    "id": "d4",
    "tag": "Module 4",
    "time": "45 min",
    "title": "Your First Sprint",
    "summary": "What actually happens, day by day, and how to be useful in it",
    "objectives": [
      "Know what to expect in each part of a sprint",
      "Participate usefully in planning, standup and review",
      "Ask for help at the right moment rather than too late",
      "Understand what 'done' means before you start work",
      "Avoid the mistakes new developers most commonly make"
    ],
    "sections": [
      {
        "h": "Day one — sprint planning",
        "html": "\n        <p>The team gathers. The Product Owner explains the highest-priority items. The team asks questions until the work is clear, then decides how much it can take on.</p>\n        <p><strong>What to do as a newcomer:</strong> ask questions, even ones you think are obvious. \"What should happen if the user enters nothing here?\" is a genuinely useful question and is frequently unanswered. Every ambiguity you surface in planning is one you will not have to guess at on day six.</p>\n        <p><strong>What to avoid:</strong> staying silent because you do not want to look inexperienced. The cost of an unasked question is paid later by the whole team.</p>\n        <p>Before the meeting ends you should know: the sprint goal, which item you are starting, and what \"done\" means for it.</p>"
      },
      {
        "h": "Picking up your first item",
        "html": "\n        <p>In most teams you <strong>pull</strong> work rather than being assigned it — you take the highest-priority item you are able to do. If you are new, it is entirely reasonable to say \"I would like to take this one, but I will need help with the database part.\"</p>\n        <p>Before writing any code:</p>\n        <ol class=\"body\">\n          <li><strong>Read the acceptance criteria.</strong> If there are none, ask for them (Module 5).</li>\n          <li><strong>Check the definition of done.</strong> Does it require tests? A code review? Documentation?</li>\n          <li><strong>Look for something similar</strong> already in the codebase and follow its patterns.</li>\n          <li><strong>Say how you plan to approach it</strong> in the standup or to one teammate. Thirty seconds here has saved a great many wasted days.</li>\n        </ol>"
      },
      {
        "h": "The daily standup",
        "html": "\n        <p>Fifteen minutes, standing, same time each day. Three things: what you did yesterday, what you will do today, what is blocking you.</p>\n        <p>A good standup contribution is specific and short: <em>\"Yesterday I finished the login form validation. Today I am starting the password reset email. I am blocked on the SMTP credentials — Anisha, could I get five minutes after this?\"</em></p>\n        <p>Two rules that matter more than they appear:</p>\n        <ul class=\"body\">\n          <li><strong>Say you are blocked, immediately.</strong> The single most common new-developer mistake is being quietly stuck for two days. Nobody is impressed by silent struggle; they are frustrated by discovering it late.</li>\n          <li><strong>Take detail offline.</strong> If two people begin debugging in the standup, someone should say \"let's take that after.\"</li>\n        </ul>\n        <div class=\"callout note\"><h4>The two-hour rule</h4><p style=\"margin:0\">A useful convention for anyone new to a codebase: if you have been stuck on the same problem for <strong>two hours</strong> with no progress, ask. You have shown you tried, and you have not yet burned a day. Most teams will tell you this is exactly the behaviour they want, and almost nobody does it without being told.</p></div>"
      },
      {
        "h": "The middle of the sprint",
        "html": "\n        <p>This is where sprints quietly go wrong. Things to watch:</p>\n        <ul class=\"body\">\n          <li><strong>Finish things before starting new ones.</strong> Three items at 80% is worth nothing at the sprint review; one item done is worth something.</li>\n          <li><strong>Update the board honestly.</strong> The board is how the team sees itself. An item sitting in \"in progress\" for eight days is a signal, and hiding it removes the team's ability to help.</li>\n          <li><strong>Raise slippage early.</strong> If by day six you know your item will not be finished, say so on day six. The team can re-plan on day six; it cannot on day ten.</li>\n          <li><strong>Do not silently expand scope.</strong> Noticing an unrelated improvement is good; adding it without telling anyone is not. Put it in the backlog.</li>\n        </ul>"
      },
      {
        "h": "The sprint review",
        "html": "\n        <p>The team demonstrates what it built to stakeholders. If you built something, you will often be asked to demo it.</p>\n        <p><strong>How to demo well:</strong> show the working software rather than slides, walk through it as a user would, keep it short, and be honest about what is not finished. Say \"this handles the main path; error handling is next sprint\" rather than avoiding the topic and hoping nobody clicks.</p>\n        <p>Feedback at a review is about the product, not about you. Stakeholders asking for changes is the process working exactly as intended — it is far cheaper to hear it now than after release.</p>"
      },
      {
        "h": "Mistakes new developers make",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Being stuck in silence.</strong> The most common and the most costly.</li>\n          <li><strong>Saying \"nearly done\" for several days running.</strong> If it has been nearly done for three days, it is not nearly done.</li>\n          <li><strong>Taking on more than one item at a time</strong> to look productive.</li>\n          <li><strong>Skipping tests to finish faster</strong>, which fails the definition of done and creates work for someone else.</li>\n          <li><strong>Not asking what \"done\" means</strong> before starting.</li>\n          <li><strong>Treating estimates as promises</strong> and then working late to protect them rather than reporting the change.</li>\n          <li><strong>Staying quiet in the retrospective.</strong> New team members notice things everyone else has stopped seeing, and that perspective has a short shelf life.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: say the uncomfortable thing on day six",
      "text": "The most valuable habit you can build in your first year is reporting bad news early. On day six of a ten-day sprint, when you first suspect your item will not be finished, say so. It feels like admitting failure and it is the opposite — it gives the team four days to respond instead of none. Developers who do this reliably become trusted very quickly, because the team learns that when you say something is on track, it is."
    },
    "activity": {
      "title": "Practice",
      "text": "For your next work item, before writing any code, write down four things: what \"done\" means for it, the acceptance criteria, one thing you are unsure about, and who you will ask. Then set yourself the two-hour rule and actually keep it. At the end of the item, note whether asking earlier would have saved time — it usually would have."
    },
    "takeaways": [
      "Ask the obvious question in planning; unasked questions are paid for later by everyone",
      "Before coding, check acceptance criteria, the definition of done, and existing patterns",
      "Say you are blocked immediately — silent struggle impresses nobody and costs days",
      "Apply the two-hour rule when new to a codebase",
      "Three items at 80% are worth nothing at the review; one finished item is worth something",
      "Raise slippage on day six, when the team can still re-plan",
      "Demo working software honestly, including what is not finished"
    ],
    "quiz": [
      {
        "q": "You have been stuck on the same problem for two hours with no progress. You should:",
        "opts": [
          "Raise it at the next scheduled retrospective",
          "Ask for help, having demonstrated a genuine attempt",
          "Continue for the rest of the day before asking",
          "Move on to a different item and return to it later"
        ],
        "a": 1,
        "fb": "You have shown you tried and have not yet burned a day. Most teams explicitly want this behaviour."
      },
      {
        "q": "On day six of a ten-day sprint you realise your item will not be finished. The right action is:",
        "opts": [
          "Wait until day nine when you are certain",
          "Work additional hours to protect the estimate",
          "Tell the team immediately so it can re-plan",
          "Quietly reduce the scope of the item"
        ],
        "a": 2,
        "fb": "The team can re-plan on day six and cannot on day ten. Reporting early is what makes a developer trusted."
      },
      {
        "q": "Having three items at 80% complete at the sprint review is:",
        "opts": [
          "A sign of good parallel working across the team",
          "Better than one finished item, since it shows broad progress",
          "Acceptable if the remaining work is documented",
          "Worth nothing, whereas one finished item is worth something"
        ],
        "a": 3,
        "fb": "Finish work before starting new work. Partial items deliver no value and cannot be demonstrated."
      },
      {
        "q": "During a sprint review, a stakeholder asks for a significant change. This means:",
        "opts": [
          "The process is working exactly as intended",
          "The requirements analysis was done poorly",
          "The team should have demonstrated less",
          "The change must wait for the next release"
        ],
        "a": 0,
        "fb": "Hearing it now is far cheaper than hearing it after release. Feedback is about the product, not about you."
      },
      {
        "q": "Before starting work on an item, you should first check:",
        "opts": [
          "How long similar items took previously",
          "What the definition of done requires",
          "Who else is available to help you",
          "Whether the item can be split further"
        ],
        "a": 1,
        "fb": "Also read the acceptance criteria and look for an existing pattern in the codebase to follow."
      },
      {
        "q": "Noticing an unrelated improvement while working on an item, you should:",
        "opts": [
          "Add it while you are already in that code",
          "Leave it entirely for someone else to find",
          "Put it in the backlog and mention it",
          "Fix it and note it in the commit message"
        ],
        "a": 2,
        "fb": "Silently expanding scope makes your work unpredictable and hides effort from the team's planning."
      }
    ]
  },
  {
    "id": "d5",
    "tag": "Module 5",
    "time": "50 min",
    "title": "User Stories and Definition of Done",
    "summary": "How work gets described, and how you know when it is finished",
    "objectives": [
      "Read and write a user story in the standard format",
      "Write acceptance criteria that remove ambiguity",
      "Apply the INVEST qualities to judge whether a story is ready",
      "Split a large story into smaller useful ones",
      "Understand what a definition of done is and why it is shared"
    ],
    "sections": [
      {
        "h": "What a user story is",
        "html": "\n        <p>A user story is a short description of something a user wants, written from their point of view. The standard format:</p>\n        <p style=\"padding-left:18px;border-left:3px solid rgba(46,111,176,.6)\"><strong>As a</strong> [type of user]<br><strong>I want</strong> [some capability]<br><strong>So that</strong> [some benefit]</p>\n        <p>For example: <em>\"As a registered customer, I want to reset my password by email, so that I can get back into my account without contacting support.\"</em></p>\n        <p>The format matters less than what it forces. It makes you name <strong>who</strong> the work is for and <strong>why</strong> it is worth doing. A ticket saying \"add password reset endpoint\" tells you what to build but not what problem it solves — which means you cannot make good decisions when the detail turns out to be ambiguous.</p>\n        <div class=\"callout note\"><h4>The most important part is the third line</h4><p style=\"margin:0\">The \"so that\" clause is what lets you push back usefully. If you cannot work out what benefit a story delivers, that is worth raising — sometimes the answer is genuinely valuable and was simply not written down, and sometimes nobody can articulate it, which is a useful discovery before you spend a week building it.</p></div>"
      },
      {
        "h": "A story is a placeholder for a conversation",
        "html": "\n        <p>This is the idea most often missed by people new to agile. A user story is deliberately <strong>not</strong> a specification. It is short because it is meant to prompt a discussion between the developer and the Product Owner, not to replace one.</p>\n        <p>Practically, this means: when you pick up a story and something is unclear, that is not a defect in the story. That is the story working as designed. Go and ask.</p>"
      },
      {
        "h": "Acceptance criteria",
        "html": "\n        <p>Acceptance criteria are the specific, checkable conditions that must be true for the story to be accepted. They turn a general intention into something testable.</p>\n        <p>For the password reset story:</p>\n        <ul class=\"body\">\n          <li>A user can request a reset link by entering a registered email address.</li>\n          <li>An unregistered email produces the same confirmation message, revealing nothing.</li>\n          <li>The link expires after one hour.</li>\n          <li>The link can only be used once.</li>\n          <li>The new password must meet the existing password policy.</li>\n          <li>The user is notified by email that their password changed.</li>\n        </ul>\n        <p>Notice that the second and sixth criteria are security requirements a developer might not have thought to ask about. Good acceptance criteria surface exactly this kind of thing before you build.</p>\n        <p>A common alternative format is <strong>Given / When / Then</strong>: <em>\"Given a registered user, when they request a password reset, then an email containing a one-hour link is sent.\"</em> Both are fine; use whichever your team uses.</p>"
      },
      {
        "h": "INVEST — is this story ready?",
        "html": "\n        <p>A widely used checklist for judging a story. A good story is:</p>\n        <ul class=\"body\">\n          <li><strong>Independent</strong> — can be built without waiting for another story where possible.</li>\n          <li><strong>Negotiable</strong> — the details can still be discussed; it is not a fixed contract.</li>\n          <li><strong>Valuable</strong> — delivers something a user or the business would recognise as worth having.</li>\n          <li><strong>Estimable</strong> — the team understands it well enough to size it. If it is not estimable, you need more information or a spike.</li>\n          <li><strong>Small</strong> — completable within a single sprint, ideally in a few days.</li>\n          <li><strong>Testable</strong> — you can demonstrate objectively that it works.</li>\n        </ul>\n        <p>As a developer, the two you will use most are <strong>estimable</strong> and <strong>testable</strong>. If you cannot size it, say so in refinement. If you cannot describe how you would prove it works, the acceptance criteria are not finished.</p>"
      },
      {
        "h": "Splitting stories",
        "html": "\n        <p>Large stories are the most common cause of work carrying over between sprints. Useful ways to split:</p>\n        <ul class=\"body\">\n          <li><strong>By workflow step.</strong> Registration, then email verification, then profile setup — rather than all of onboarding at once.</li>\n          <li><strong>By business rule.</strong> Handle the standard case first; discounts, exceptions and edge rules become separate stories.</li>\n          <li><strong>By data variation.</strong> Support one file format now, others later.</li>\n          <li><strong>Happy path first.</strong> The main success path as one story, error handling as another. Common and effective, provided the error handling is genuinely scheduled.</li>\n          <li><strong>By interface.</strong> Get it working via the API, then add the user interface.</li>\n        </ul>\n        <p><strong>The wrong way to split</strong> is by technical layer — \"build the database table\", \"build the service\", \"build the UI\". Each piece delivers nothing on its own, cannot be demonstrated, and cannot be tested end to end. If your team splits this way, none of your stories are independently valuable.</p>"
      },
      {
        "h": "Definition of done",
        "html": "\n        <p>The definition of done is a <strong>single shared checklist</strong> that applies to every story. It is not per-story; acceptance criteria are per-story. The definition of done is the team's standard for what \"finished\" means.</p>\n        <p>A typical one:</p>\n        <ul class=\"body\">\n          <li>Code written and meets the team's style standards</li>\n          <li>Unit tests written and passing</li>\n          <li>Code reviewed and approved by another developer</li>\n          <li>Integrated into the main branch with the build passing</li>\n          <li>Acceptance criteria verified</li>\n          <li>No known defects of medium severity or above</li>\n          <li>Documentation updated where the change affects it</li>\n          <li>Deployed to a test environment</li>\n        </ul>\n        <p>The reason this exists is that without it, \"done\" means different things to different people — and the difference is discovered at the sprint review, or in production. A shared definition also protects you: if the definition says tests are required, then taking the time to write them is not you being slow, it is you meeting the team's agreed standard.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: ask for the acceptance criteria",
      "text": "If you are handed a story with no acceptance criteria, ask for them before starting. The most effective way is not to complain about the ticket but to write your own understanding and check it: \"I am reading this as — reset link valid one hour, single use, same message for unknown emails. Is that right?\" This takes two minutes, it almost always surfaces at least one thing you had wrong, and it makes you look thorough rather than obstructive."
    },
    "activity": {
      "title": "Practice",
      "text": "Take a feature you have built recently and write it as a user story with the three-line format, then write at least five acceptance criteria for it. Check the story against INVEST. Finally, look at your team's definition of done — if there is not one written down, draft what you think it should be and take it to the next retrospective."
    },
    "takeaways": [
      "A user story names who the work is for and why it is worth doing",
      "The 'so that' clause is what lets you push back on work with no clear benefit",
      "A story is a placeholder for a conversation, not a specification",
      "Acceptance criteria surface security and edge-case requirements before you build",
      "INVEST: independent, negotiable, valuable, estimable, small, testable",
      "Split by workflow, business rule, data or happy path — never by technical layer",
      "The definition of done is one shared checklist, and it protects you as well as the product"
    ],
    "quiz": [
      {
        "q": "The 'so that' clause in a user story exists to:",
        "opts": [
          "Record who requested the feature originally",
          "Provide text for the release notes later",
          "Satisfy the standard user story template format correctly",
          "State the benefit, so decisions can be made sensibly"
        ],
        "a": 3,
        "fb": "If nobody can articulate the benefit, that is a useful discovery before a week is spent building it."
      },
      {
        "q": "You pick up a story and find part of it ambiguous. This means:",
        "opts": [
          "The story is working as designed — go and ask",
          "The story is defective and should be rejected",
          "The Product Owner has not done their job properly",
          "You should make a reasonable assumption and proceed"
        ],
        "a": 0,
        "fb": "A story is deliberately short because it is meant to prompt a conversation, not replace one."
      },
      {
        "q": "Which is the wrong way to split a large user story?",
        "opts": [
          "Splitting by business rule, handling the standard case first",
          "Splitting by technical layer, such as database then UI",
          "Splitting by workflow step in the user journey",
          "Splitting the happy path from error handling"
        ],
        "a": 1,
        "fb": "Each layer delivers nothing alone, cannot be demonstrated, and cannot be tested end to end."
      },
      {
        "q": "In INVEST, 'estimable' means that:",
        "opts": [
          "The work can be completed within one sprint",
          "The story has already been given a point value",
          "The team understands it well enough to size it",
          "The estimate has been approved by the Product Owner"
        ],
        "a": 2,
        "fb": "If a story is not estimable, you need more information or a time-boxed spike to investigate."
      },
      {
        "q": "The definition of done differs from acceptance criteria in that it:",
        "opts": [
          "Is written by the Product Owner for each story",
          "Is reviewed and updated during sprint planning",
          "Only applies to stories involving user interfaces",
          "Is one shared checklist applying to every story"
        ],
        "a": 3,
        "fb": "Acceptance criteria are per-story. The definition of done is the team's standard for what finished means."
      },
      {
        "q": "A well-written acceptance criterion is primarily:",
        "opts": [
          "Specific and objectively checkable",
          "Written in the Given/When/Then format",
          "Short enough to fit on one line",
          "Agreed with the whole team in planning"
        ],
        "a": 0,
        "fb": "Given/When/Then is one valid format among several. What matters is that the condition can be verified."
      }
    ]
  },
  {
    "id": "d6",
    "tag": "Module 6",
    "time": "45 min",
    "title": "Estimation and Velocity",
    "summary": "Story points, planning poker, and what estimates are actually for",
    "objectives": [
      "Explain why relative sizing is used instead of hours",
      "Participate in planning poker effectively",
      "Understand what velocity is and how it should be used",
      "Recognise when estimates are being misused as commitments",
      "Know what to do when an estimate turns out to be wrong"
    ],
    "sections": [
      {
        "h": "Why not just estimate in hours?",
        "html": "\n        <p>Humans are consistently poor at estimating absolute duration and considerably better at <strong>comparison</strong>. You may not know how long it takes to walk to the next town, but you can say with confidence that it is about twice as far as the market.</p>\n        <p>Story points use this. Instead of \"this will take 14 hours\", the team says \"this is about twice the size of that one.\" Points are a measure of overall size — combining effort, complexity and uncertainty — and they are <strong>relative to the team's own reference stories</strong>.</p>\n        <p>Two consequences worth understanding early:</p>\n        <ul class=\"body\">\n          <li><strong>Points are meaningless between teams.</strong> One team's 5 has no relationship to another's. Anyone comparing point totals across teams is misusing them.</li>\n          <li><strong>Points do not convert to hours.</strong> The moment someone declares \"a point is four hours\", you have reinvented hour estimation with an extra step.</li>\n        </ul>"
      },
      {
        "h": "The Fibonacci scale",
        "html": "\n        <p>Most teams size using 1, 2, 3, 5, 8, 13, 21 — the gaps widen as the numbers grow. This is deliberate: it reflects that large things are inherently more uncertain, and it stops unproductive arguments about whether something is a 6 or a 7.</p>\n        <p>A rough convention:</p>\n        <ul class=\"body\">\n          <li><strong>1–2</strong> — small and well understood; a day or less.</li>\n          <li><strong>3–5</strong> — a typical story; a few days.</li>\n          <li><strong>8</strong> — large; consider splitting.</li>\n          <li><strong>13 or more</strong> — too big for a sprint. Split it or run a spike first.</li>\n        </ul>\n        <p>Many teams also use <strong>?</strong> for \"we do not understand this yet\" — which is a genuinely useful answer and should trigger a conversation rather than a guess.</p>"
      },
      {
        "h": "Planning poker",
        "html": "\n        <p>The standard technique, and its design is cleverer than it appears:</p>\n        <ol class=\"body\">\n          <li>The Product Owner explains the story; the team asks questions.</li>\n          <li>Everyone privately chooses a card.</li>\n          <li>Everyone reveals <strong>at the same time</strong>.</li>\n          <li>If estimates differ widely, the highest and lowest explain their reasoning.</li>\n          <li>Discuss, then re-vote. Usually two rounds is enough.</li>\n        </ol>\n        <p>The simultaneous reveal exists to prevent anchoring — if the senior developer speaks first, everyone converges on their number and the team learns nothing.</p>\n        <p><strong>The real value is step four.</strong> When one person says 2 and another says 13, they are not disagreeing about arithmetic; they know different things. The person who said 13 may know the module has no tests. The person who said 2 may know a library already handles it. That conversation is the point, and the number produced at the end is a by-product.</p>"
      },
      {
        "h": "Velocity",
        "html": "\n        <p>Velocity is the number of story points a team completes in a sprint. After a few sprints you have an average, and that average forecasts future work: 120 points of backlog at 20 points per sprint suggests roughly six sprints.</p>\n        <p>Used properly, velocity is a <strong>forecasting tool for the team</strong>. Rules that keep it useful:</p>\n        <ul class=\"body\">\n          <li><strong>Only count finished items.</strong> Partial credit destroys the measurement.</li>\n          <li><strong>Use a rolling average</strong> of three to six sprints, not the single last figure.</li>\n          <li><strong>Expect variation.</strong> Holidays, incidents and departures all move it.</li>\n          <li><strong>Never compare between teams.</strong> The unit is not shared.</li>\n        </ul>\n        <div class=\"callout warn\"><h4>The misuse to watch for</h4><p style=\"margin:0\">If velocity becomes a <strong>target</strong> — \"we need to increase velocity by 20%\" — the team will simply estimate more generously. The number rises, delivery does not change, and the organisation has destroyed its own forecasting tool while learning nothing. If this starts happening around you, it is worth naming clearly at a retrospective.</p></div>"
      },
      {
        "h": "When an estimate turns out to be wrong",
        "html": "\n        <p>Estimates are wrong routinely. That is expected and is not a failure. What matters is what you do next.</p>\n        <ol class=\"body\">\n          <li><strong>Say so as soon as you know.</strong> Not when the sprint ends.</li>\n          <li><strong>Say why, specifically.</strong> \"The legacy module has no tests, so I have had to add them before I can change anything safely\" is useful. \"It is taking longer\" is not.</li>\n          <li><strong>Do not re-estimate the item mid-sprint.</strong> Changing the number to match reality corrupts your velocity history. Leave the estimate and let the sprint outcome reflect what happened.</li>\n          <li><strong>Take it to the retrospective.</strong> If the same category of thing is repeatedly underestimated, that is a pattern worth fixing.</li>\n        </ol>"
      },
      {
        "h": "Spikes",
        "html": "\n        <p>Sometimes you genuinely cannot estimate because you do not know enough. The answer is a <strong>spike</strong>: a time-boxed piece of investigation — \"spend one day finding out whether this library can do what we need\" — whose output is knowledge rather than shippable code.</p>\n        <p>Two rules. The time box is fixed: when the day is up, you stop and report what you found, even if the answer is \"still unclear\". And the spike's output should let the team estimate the real story afterwards, which is how you know whether it worked.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: speak up when your number is different",
      "text": "In planning poker, when your estimate is far from everyone else's, resist the urge to quietly change it. If you voted 13 and the team voted 3, you know something they do not — or you have misunderstood something. Both are worth five seconds of everyone's time. New developers routinely fold their estimate to match the group, which removes exactly the information the technique was designed to surface. The number matters far less than the reason behind it."
    },
    "activity": {
      "title": "Practice",
      "text": "Take five items your team completed recently and, without looking at the original estimates, size them relative to each other using the Fibonacci scale. Then compare with what was actually estimated and how long each really took. Note which ones you would size differently now, and why — that reasoning is the skill you are building."
    },
    "takeaways": [
      "People estimate comparison far better than absolute duration, which is why points are relative",
      "Story points are meaningless between teams and do not convert to hours",
      "The widening Fibonacci gaps reflect genuine uncertainty in larger items",
      "Simultaneous reveal in planning poker exists to prevent anchoring on a senior voice",
      "The discussion between a 2 and a 13 is the point; the number is a by-product",
      "Velocity used as a target produces estimate inflation and no delivery change",
      "Do not re-estimate mid-sprint — it corrupts the history you forecast from"
    ],
    "quiz": [
      {
        "q": "Story points measure size relative to:",
        "opts": [
          "A fixed number of hours agreed by the team",
          "The team's own previous reference stories",
          "An industry standard complexity scale",
          "The Product Owner's assessment of value"
        ],
        "a": 1,
        "fb": "This is why one team's 5 has no relationship to another team's 5, and why comparison across teams is a misuse."
      },
      {
        "q": "Everyone reveals their planning poker card simultaneously in order to:",
        "opts": [
          "Ensure the Scrum Master can record all votes",
          "Make the process feel fair to junior members",
          "Prevent anchoring on the first opinion voiced",
          "Save time during the estimation session"
        ],
        "a": 2,
        "fb": "If the senior developer speaks first, everyone converges on their number and the team learns nothing."
      },
      {
        "q": "When two team members estimate a story as 2 and 13, the valuable part is:",
        "opts": [
          "Averaging the two numbers to reach 7",
          "Asking the Product Owner to decide between the two numbers",
          "Re-reading the acceptance criteria together",
          "Their explanations, since they know different things"
        ],
        "a": 3,
        "fb": "One may know the module has no tests; the other may know a library already handles it. That is the information you want."
      },
      {
        "q": "Setting a target to increase team velocity by 20% will typically produce:",
        "opts": [
          "Estimate inflation with unchanged actual delivery",
          "More accurate sizing of large backlog items",
          "Better forecasting accuracy over several sprints",
          "A genuine improvement in delivery throughput"
        ],
        "a": 0,
        "fb": "The number rises, delivery does not change, and the organisation has destroyed its own forecasting tool."
      },
      {
        "q": "You discover mid-sprint that your item is much larger than estimated. You should:",
        "opts": [
          "Re-estimate the item to reflect the true size",
          "Report it immediately and leave the estimate alone",
          "Complete it in your own time to protect the sprint",
          "Move it to the next sprint without discussion"
        ],
        "a": 1,
        "fb": "Changing the number mid-sprint corrupts the velocity history you forecast from. Report the specific reason instead."
      },
      {
        "q": "A spike is best described as:",
        "opts": [
          "A story that exceeds thirteen story points",
          "An urgent defect requiring immediate attention",
          "A time-boxed investigation producing knowledge",
          "A sudden unplanned increase in workload"
        ],
        "a": 2,
        "fb": "When the time box expires you stop and report, even if the answer is still unclear."
      }
    ]
  },
  {
    "id": "d7",
    "tag": "Module 7",
    "time": "45 min",
    "title": "Kanban and Flow",
    "summary": "The other main approach, and why limiting work makes you faster",
    "objectives": [
      "Describe how Kanban differs from Scrum",
      "Explain why work-in-progress limits increase throughput",
      "Read a Kanban board and identify bottlenecks",
      "Understand cycle time and why it is measured",
      "Recognise which kinds of work suit Kanban better"
    ],
    "sections": [
      {
        "h": "What Kanban is",
        "html": "\n        <p>Kanban has no sprints, no fixed roles, and no timeboxes. It has three things:</p>\n        <ol class=\"body\">\n          <li><strong>A visualised workflow</strong> — a board with a column for each stage the work passes through.</li>\n          <li><strong>Work-in-progress (WIP) limits</strong> — a maximum number of items allowed in each column.</li>\n          <li><strong>A focus on flow</strong> — reducing the time an item takes to travel from request to done.</li>\n        </ol>\n        <p>Work is pulled continuously. When you finish something, you take the next item. There is no two-week commitment and no sprint boundary.</p>"
      },
      {
        "h": "Why limiting work makes you faster",
        "html": "\n        <p>This is the counter-intuitive core of Kanban, and it is worth understanding properly because it will feel wrong at first.</p>\n        <p>Imagine a team of five with fifteen items in progress. Everyone is busy, so utilisation looks excellent. But each person is switching between three things, every switch costs time to reload context, and items sit half-finished waiting for a review or an answer. Nothing finishes.</p>\n        <p>Now limit work in progress to five. People finish what they started before taking anything new. When someone is blocked, they cannot simply start something else — so they go and help unblock, or fix the underlying problem.</p>\n        <p><strong>Starting less work finishes more work.</strong> The limit converts individual busyness into team throughput, and the discomfort of an idle moment is exactly what forces the team to fix its bottleneck rather than route around it.</p>\n        <div class=\"callout note\"><h4>What a WIP limit really does</h4><p style=\"margin:0\">It makes problems visible immediately. If the \"code review\" column is permanently at its limit, the team can see that reviews are the bottleneck. Without the limit, work simply piles up there quietly and everyone starts something new instead. <strong>A board with no WIP limits is just a to-do list on a wall.</strong></p></div>"
      },
      {
        "h": "Reading a board",
        "html": "\n        <p>A simple board might have: Backlog, Ready, In Progress, Review, Testing, Done. What to look for:</p>\n        <ul class=\"body\">\n          <li><strong>A column consistently at its limit</strong> — that is your bottleneck, and it is where improvement should be focused.</li>\n          <li><strong>Items sitting still for days</strong> — usually blocked, sometimes forgotten. Either way it should be raised.</li>\n          <li><strong>Work piling up before a stage</strong> — the queue indicates the stage after it cannot keep pace.</li>\n          <li><strong>Items moving backwards</strong> — usually a quality signal; work is failing review or testing and returning.</li>\n        </ul>\n        <p>A useful team habit is to <strong>walk the board right to left</strong> in the daily meeting, focusing on getting things finished rather than reporting what each person did. Right-to-left keeps the team's attention on completion.</p>"
      },
      {
        "h": "Cycle time and lead time",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Cycle time</strong> — how long from starting an item to finishing it.</li>\n          <li><strong>Lead time</strong> — how long from the request arriving to it being finished, including waiting in the backlog.</li>\n        </ul>\n        <p>Customers experience lead time. Teams usually control cycle time most directly.</p>\n        <p>The value of measuring cycle time is that it supports honest forecasting without estimation: if 85% of your items finish within six days, you can tell someone \"this will most likely be done within six days\" without sizing anything. Many mature Kanban teams stop estimating entirely on this basis.</p>"
      },
      {
        "h": "When Kanban fits better than Scrum",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Interrupt-driven work.</strong> Support, operations and maintenance teams cannot commit to two weeks of scope, because urgent work arrives daily. Sprint commitment becomes a fiction they fail every cycle.</li>\n          <li><strong>Highly variable item sizes.</strong> When work ranges from ten minutes to three weeks, sprint planning has little meaning.</li>\n          <li><strong>Continuous delivery.</strong> Teams releasing several times a day gain little from a two-week boundary.</li>\n          <li><strong>Very small teams.</strong> Two people may find Scrum's full event set heavier than the coordination it provides.</li>\n        </ul>\n        <p>Many teams end up with <strong>Scrumban</strong>: sprint planning and retrospectives kept for rhythm and improvement, WIP limits and continuous pull adopted for the daily work. This is extremely common and entirely legitimate.</p>"
      },
      {
        "h": "What this means for you daily",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Finish before you start.</strong> The strongest single habit in this module.</li>\n          <li><strong>When blocked, do not start something new by default.</strong> First try to unblock it, or help someone finish theirs.</li>\n          <li><strong>Keep the board accurate.</strong> A board that does not reflect reality is worse than no board, because decisions get made from it.</li>\n          <li><strong>Watch your own work in progress.</strong> If you personally have three things open, you are the bottleneck.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: limit yourself to one item",
      "text": "Whatever your team does, try limiting yourself to one item at a time for two weeks. When you are blocked, resist starting something new — spend that time getting unblocked, reviewing someone's code, or helping finish work already in progress. Most developers find they complete more, not less, and the reason is that finishing has value while starting does not. It is also the easiest way to feel why WIP limits work, rather than just accepting the argument."
    },
    "activity": {
      "title": "Practice",
      "text": "For ten recently completed items, record the date work started and the date it was finished, and calculate cycle time for each. Sort them and find the value below which 85% fall. That number is your team's realistic delivery expectation for a typical item — and it is more useful for answering \"when will this be done\" than any estimate."
    },
    "takeaways": [
      "Kanban is visualised workflow, WIP limits and a focus on flow — no sprints or fixed roles",
      "Starting less work finishes more work, because switching and queueing dominate",
      "A WIP limit makes bottlenecks visible instead of letting work pile up quietly",
      "A board with no WIP limits is a to-do list on a wall",
      "Walk the board right to left to keep attention on finishing",
      "Cycle time supports forecasting without estimation",
      "Interrupt-driven and highly variable work suits Kanban better than Scrum"
    ],
    "quiz": [
      {
        "q": "Limiting work in progress increases throughput because it:",
        "opts": [
          "Allows managers to allocate the work more evenly across people",
          "Shortens the time spent in planning meetings",
          "Forces developers to work at a faster pace",
          "Reduces context switching and exposes bottlenecks"
        ],
        "a": 3,
        "fb": "The discomfort of an idle moment is what forces the team to fix its bottleneck rather than route around it."
      },
      {
        "q": "A Kanban board without work-in-progress limits is:",
        "opts": [
          "Effectively a to-do list on a wall",
          "Still valid, provided cycle time is measured",
          "Suitable only for maintenance work",
          "A correct implementation for small teams"
        ],
        "a": 0,
        "fb": "Without limits, work piles up quietly at the bottleneck and everyone simply starts something new."
      },
      {
        "q": "A column that is consistently at its WIP limit indicates:",
        "opts": [
          "Items in that column are too large",
          "That stage is the team's bottleneck",
          "The team is working at full capacity",
          "The limit has been set too low"
        ],
        "a": 1,
        "fb": "That is where improvement effort should be focused, and the limit is what made it visible."
      },
      {
        "q": "The difference between cycle time and lead time is that lead time:",
        "opts": [
          "Measures only the active working period",
          "Applies to Scrum teams rather than Kanban",
          "Includes waiting in the backlog before work starts",
          "Is measured in story points rather than in calendar days"
        ],
        "a": 2,
        "fb": "Customers experience lead time; teams most directly control cycle time."
      },
      {
        "q": "Which kind of team most clearly suits Kanban over Scrum?",
        "opts": [
          "A team of eight working on one large feature",
          "A team with a stable two-week release cycle",
          "A team building a new product from scratch",
          "A support team receiving urgent work daily"
        ],
        "a": 3,
        "fb": "Sprint commitment becomes a fiction they fail every cycle for reasons entirely outside their control."
      },
      {
        "q": "When you are blocked on your current item, the better default is to:",
        "opts": [
          "Work on unblocking it or help finish other work",
          "Start the next item to stay productive",
          "Wait until the next standup to raise it",
          "Pick up a small unrelated maintenance task instead"
        ],
        "a": 0,
        "fb": "Finishing has value; starting does not. This is the practical meaning of a WIP limit at the individual level."
      }
    ]
  },
  {
    "id": "d8",
    "tag": "Module 8",
    "time": "50 min",
    "title": "Extreme Programming: The Technical Practices",
    "summary": "The practices that make sustained iteration actually possible",
    "objectives": [
      "Explain why technical practices are essential rather than optional",
      "Describe the core XP practices and what each protects against",
      "Understand technical debt and how to talk about it",
      "Apply simple design and refactoring principles",
      "Argue for quality work in terms your team will accept"
    ],
    "sections": [
      {
        "h": "Why this module exists",
        "html": "\n        <p>Scrum and Kanban describe how work <em>flows</em>. Neither says anything about how the software is actually built. This is a genuine gap, and it is the reason many teams find that agile \"stopped working\" after a year.</p>\n        <p>Here is the mechanism. Agile promises you can respond to change. Responding to change means modifying existing code. If the code is difficult to modify — untested, tangled, poorly named — then every change is slow and risky, and the team gradually loses the ability to be agile at all. The ceremonies continue; the agility disappears.</p>\n        <p><strong>Extreme Programming</strong> is the framework that addresses this directly. Its practices are what make iteration sustainable over years rather than months.</p>"
      },
      {
        "h": "The core practices",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Test-driven development.</strong> Write a failing test, make it pass, then improve the code. Module 9 covers this in full.</li>\n          <li><strong>Continuous integration.</strong> Everyone merges to the shared main branch frequently, and every merge is automatically built and tested. Module 10.</li>\n          <li><strong>Pair programming.</strong> Two developers, one task. Module 11.</li>\n          <li><strong>Collective code ownership.</strong> Anyone may change any part of the codebase. Nobody owns a module privately.</li>\n          <li><strong>Refactoring.</strong> Continuously improving the structure of existing code without changing its behaviour.</li>\n          <li><strong>Simple design.</strong> Build the simplest thing that works now; do not build for imagined future requirements.</li>\n          <li><strong>Coding standards.</strong> A shared style so any developer can read any file without friction.</li>\n          <li><strong>Sustainable pace.</strong> No sustained overtime. Tired developers produce defects.</li>\n          <li><strong>Small releases.</strong> Ship frequently in small pieces.</li>\n        </ul>"
      },
      {
        "h": "Collective code ownership",
        "html": "\n        <p>Worth dwelling on because it is culturally difficult. In many organisations one developer \"owns\" a module, and everyone routes changes through them.</p>\n        <p>This feels safe and creates two serious problems: that person becomes a bottleneck for every change, and when they leave — or are on holiday — nobody can safely touch that code.</p>\n        <p>Collective ownership means anyone can change anything, which only works if the supporting practices exist: tests to catch mistakes, code review to spread knowledge, and standards so unfamiliar code is still readable. The practices are not independent; each makes the others safe.</p>"
      },
      {
        "h": "Simple design",
        "html": "\n        <p>The instinct to build flexibility for imagined future requirements is nearly universal and almost always wrong. The future requirement usually does not arrive, or arrives in a different shape, and meanwhile the abstraction makes every present-day change harder.</p>\n        <p>A useful ordering for \"good enough\" design — the code should:</p>\n        <ol class=\"body\">\n          <li>Pass all its tests</li>\n          <li>Reveal its intent clearly to a reader</li>\n          <li>Contain no duplication</li>\n          <li>Use the fewest elements possible</li>\n        </ol>\n        <p>You will hear <strong>YAGNI</strong> — \"you aren't gonna need it\". It is not an argument against thinking ahead; it is an argument against <em>building</em> ahead. Design so that the future change is possible; do not implement it today.</p>"
      },
      {
        "h": "Refactoring",
        "html": "\n        <p>Refactoring is changing the structure of code without changing what it does. Renaming a variable to something meaningful, extracting a long method into smaller ones, removing duplication.</p>\n        <p>Two rules matter:</p>\n        <ul class=\"body\">\n          <li><strong>You need tests first.</strong> Refactoring without tests is not refactoring; it is rewriting and hoping. The tests are what let you verify behaviour did not change.</li>\n          <li><strong>Do it continuously, in small pieces.</strong> Leave each piece of code slightly better than you found it. Refactoring saved up for a dedicated \"cleanup sprint\" never happens, because that sprint is always the one that gets cut.</li>\n        </ul>"
      },
      {
        "h": "Technical debt",
        "html": "\n        <p>Technical debt is the accumulated cost of shortcuts taken in code. The metaphor is deliberate: like financial debt, it can be a sensible choice, and like financial debt it accrues interest — every future change in that area costs more.</p>\n        <p>Two kinds worth distinguishing:</p>\n        <ul class=\"body\">\n          <li><strong>Deliberate debt.</strong> \"We are shipping this without proper error handling to make the demo; we will fix it next sprint.\" Legitimate, provided it is recorded and actually repaid.</li>\n          <li><strong>Accidental debt.</strong> Accumulated through inexperience or inattention, discovered later. Also normal.</li>\n        </ul>\n        <p><strong>How to talk about it so people listen.</strong> \"This code is ugly\" gets nowhere. \"Changes in this module take about three times longer than elsewhere because there are no tests, which is why our last three estimates in this area were wrong\" gets a hearing — because it is stated as a delivery cost, which is what it is.</p>"
      },
      {
        "h": "Why these get cut, and what to do",
        "html": "\n        <p>Under deadline pressure, technical practices are the first thing dropped: tests are skipped, review is waived, refactoring is deferred. This is understandable and it is exactly backwards, because these practices are what make the <em>next</em> deadline achievable.</p>\n        <p>What you can do as an individual developer:</p>\n        <ul class=\"body\">\n          <li><strong>Make tests part of the definition of done</strong>, so writing them is meeting the standard rather than a personal choice you must defend each time.</li>\n          <li><strong>Include the quality work in the estimate</strong> rather than treating it as extra.</li>\n          <li><strong>Refactor as you go</strong>, in small pieces, so it never needs approval.</li>\n          <li><strong>Quantify the cost</strong> when you raise it, using delivery language.</li>\n          <li><strong>Bring it to the retrospective</strong> with a specific example rather than a general complaint.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: leave it better than you found it",
      "text": "You will rarely be given permission to refactor. So do not ask for it as a separate activity — make it part of how you work. When you are already changing a file, spend five extra minutes renaming a confusing variable or extracting a long method. It is within the work you were already doing, it needs no approval, and across a team over a year it is the difference between a codebase that decays and one that improves. The large refactoring nobody ever authorises is the one you avoid needing."
    },
    "activity": {
      "title": "Practice",
      "text": "Find the file in your codebase that developers most dread changing. Write down specifically why: no tests, unclear naming, too long, too many responsibilities. Then estimate how much longer a typical change there takes compared with a well-maintained area. Bring that comparison to your next retrospective — stated as a delivery cost, not a complaint."
    },
    "takeaways": [
      "Scrum and Kanban say nothing about how software is built, which is a real gap",
      "If code is hard to change, agility disappears while the ceremonies continue",
      "Collective code ownership removes bottlenecks but requires tests, review and standards to be safe",
      "YAGNI argues against building ahead, not against thinking ahead",
      "Refactoring without tests is rewriting and hoping",
      "Technical debt accrues interest — every future change in that area costs more",
      "State quality problems as delivery costs, with numbers, and people listen"
    ],
    "quiz": [
      {
        "q": "Why do technical practices matter to a team's long-term agility?",
        "opts": [
          "They are required by the Scrum framework rules",
          "Responding to change means changing code, which must stay easy",
          "They reduce the number of meetings the team is required to hold",
          "They allow more accurate story point estimation"
        ],
        "a": 1,
        "fb": "If code is hard to modify, the ceremonies continue while the actual agility disappears."
      },
      {
        "q": "Collective code ownership requires which supporting practices to be safe?",
        "opts": [
          "Separate branches for each area of the codebase",
          "A dedicated technical lead approving all changes",
          "Tests, code review and shared coding standards",
          "Detailed design documents and architecture reviews"
        ],
        "a": 2,
        "fb": "The XP practices are not independent — each one makes the others safe to apply."
      },
      {
        "q": "'YAGNI' argues against:",
        "opts": [
          "Writing tests for code that is unlikely to change",
          "Thinking about future requirements at all",
          "Refactoring code that currently works",
          "Building for imagined future requirements today"
        ],
        "a": 3,
        "fb": "Design so the future change is possible; do not implement it now. The imagined requirement usually arrives in a different shape."
      },
      {
        "q": "Refactoring a module that has no test coverage is:",
        "opts": [
          "Rewriting and hoping, rather than refactoring",
          "Safe provided the code is reviewed afterwards",
          "Acceptable if changes are kept small",
          "The standard approach for legacy systems"
        ],
        "a": 0,
        "fb": "Tests are what let you verify that behaviour did not change, which is the definition of refactoring."
      },
      {
        "q": "The most effective way to raise a technical debt problem is to:",
        "opts": [
          "Raise it directly with senior management",
          "State it as a measurable delivery cost",
          "Refuse to make further changes to that area",
          "Describe the code quality issues in detail"
        ],
        "a": 1,
        "fb": "'Changes here take three times longer because there are no tests' gets a hearing. 'This code is ugly' does not."
      },
      {
        "q": "Technical practices are usually dropped first under deadline pressure, which is backwards because they:",
        "opts": [
          "Are required by the organisation's quality policy",
          "Improve team morale during difficult periods",
          "Are what make the next deadline achievable",
          "Take less time than most developers assume"
        ],
        "a": 2,
        "fb": "Include quality work inside the estimate rather than treating it as an optional extra to be defended."
      }
    ]
  },
  {
    "id": "d9",
    "tag": "Module 9",
    "time": "50 min",
    "title": "Testing and Test-Driven Development",
    "summary": "How to move fast without breaking things",
    "objectives": [
      "Describe the main levels of automated testing and what each is for",
      "Explain the test-driven development cycle and why the order matters",
      "Write a test that is useful rather than merely present",
      "Understand the test pyramid and why shape matters",
      "Know how to add tests to code that has none"
    ],
    "sections": [
      {
        "h": "Why developers test their own code now",
        "html": "\n        <p>In waterfall, developers wrote code and a separate testing team checked it afterwards. Agile removes that separation, and the reason is timing rather than trust: if testing happens weeks after the code was written, the feedback arrives too late to be cheap, and the developer has forgotten the context.</p>\n        <p>The practical target is that a change can be verified in <strong>minutes, automatically</strong>. That is what makes it safe to release every two weeks, and it is what makes refactoring possible at all.</p>"
      },
      {
        "h": "The levels of testing",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Unit tests.</strong> Test one small piece — usually a function or class — in isolation. Very fast, typically milliseconds. You should have many.</li>\n          <li><strong>Integration tests.</strong> Test that pieces work together, often involving a real database or an external service. Slower, and you need fewer.</li>\n          <li><strong>End-to-end tests.</strong> Drive the whole system as a user would. Slowest, most brittle, and the most valuable when they pass. Keep few.</li>\n          <li><strong>Manual and exploratory testing.</strong> A human deliberately trying to break things and noticing what automation cannot — that something is confusing, ugly or wrong in a way no assertion captures. Still essential.</li>\n        </ul>"
      },
      {
        "h": "The test pyramid",
        "html": "\n        <p>The recommended shape: <strong>many unit tests, fewer integration tests, very few end-to-end tests.</strong></p>\n        <p>The reasoning is practical. Unit tests are fast and pinpoint the failure precisely. End-to-end tests are slow and tell you only that something, somewhere, broke. A suite dominated by end-to-end tests takes an hour to run, fails intermittently for environmental reasons, and is eventually ignored — which is worse than having no suite, because the team believes it is protected.</p>\n        <p>The inverted shape — few unit tests and many end-to-end tests — is common and is called an ice-cream cone. If your build takes forty minutes and fails randomly, this is usually why.</p>"
      },
      {
        "h": "Test-driven development",
        "html": "\n        <p>TDD reverses the usual order. Instead of writing code and then testing it, you write the test first. The cycle is called <strong>red, green, refactor</strong>:</p>\n        <ol class=\"body\">\n          <li><strong>Red.</strong> Write a small failing test for behaviour that does not exist yet. Run it and watch it fail — this confirms the test actually tests something.</li>\n          <li><strong>Green.</strong> Write the simplest code that makes it pass. Not elegant code; passing code.</li>\n          <li><strong>Refactor.</strong> Now improve the structure, with the test protecting you.</li>\n        </ol>\n        <p>Then repeat, in cycles of a few minutes each.</p>\n        <p><strong>Why the order matters.</strong> Writing the test first forces you to decide what the code should do before deciding how it will do it, which usually produces a cleaner interface. It guarantees every piece of code has a test, because the test existed first. And watching the test fail proves the test works — a test written afterwards that passes immediately may be testing nothing at all.</p>\n        <div class=\"callout note\"><h4>If TDD feels slow at first</h4><p style=\"margin:0\">It is slower for the first few weeks. That is normal and everyone experiences it. What changes is the time you stop spending on debugging, on manual re-checking, and on being afraid to change things. Most developers who persist for a month do not go back — but almost nobody finds it comfortable on day three, so do not conclude anything from that.</p></div>"
      },
      {
        "h": "What makes a test useful",
        "html": "\n        <ul class=\"body\">\n          <li><strong>It tests behaviour, not implementation.</strong> A test that breaks when you rename a private method is testing the wrong thing and will make refactoring painful.</li>\n          <li><strong>It has a clear name</strong> describing what it checks. <em>calculatesDiscountForOrdersOverFiveThousand</em> tells you what broke; <em>test3</em> does not.</li>\n          <li><strong>It fails for exactly one reason.</strong> A test asserting fifteen things tells you little when it fails.</li>\n          <li><strong>It is deterministic.</strong> A test that passes sometimes is worse than no test, because it trains the team to ignore failures.</li>\n          <li><strong>It is readable.</strong> Tests are also documentation — often the most accurate documentation a codebase has.</li>\n        </ul>\n        <p>A common structure is <strong>arrange, act, assert</strong>: set up the situation, do the thing, check the result. Keeping tests in that shape makes them easy to scan.</p>"
      },
      {
        "h": "Coverage, and its limits",
        "html": "\n        <p>Test coverage measures the percentage of code executed by tests. It is useful for finding untested areas and misleading as a target.</p>\n        <p>Code can be 100% covered by tests that assert nothing meaningful. Coverage tells you what was <em>run</em>, not what was <em>checked</em>. Treat a low number as a warning and a high number as no guarantee at all.</p>\n        <p>More useful questions: are the important paths tested? Are the edge cases tested? If I broke this function deliberately, would a test catch it?</p>"
      },
      {
        "h": "Adding tests to code that has none",
        "html": "\n        <p>You will inherit untested code. Attempting to test all of it at once never works. What does:</p>\n        <ol class=\"body\">\n          <li><strong>Write a test before every bug fix.</strong> Reproduce the bug with a failing test, then fix it. Coverage grows exactly where defects actually occur.</li>\n          <li><strong>Test what you touch.</strong> When changing a function, add tests for it first.</li>\n          <li><strong>Start with characterisation tests.</strong> If you do not know what the code should do, write tests capturing what it currently does. They are your safety net for refactoring, even if some of them document bugs.</li>\n          <li><strong>Prioritise by risk.</strong> Test the payment logic before the admin report nobody runs.</li>\n        </ol>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: write the failing test for every bug",
      "text": "Make this an unbreakable personal habit: before fixing any bug, write a test that reproduces it and watch it fail. It takes a few extra minutes and gives you three things — proof you understood the bug, proof your fix actually works, and permanent protection against it returning. It is also the single easiest way to build coverage in a legacy codebase, because bugs cluster in exactly the areas that most need tests. No permission required."
    },
    "activity": {
      "title": "Practice",
      "text": "Take a small function you have written recently and build it again using strict TDD — failing test first, minimum code to pass, then refactor. Notice where it felt unnatural. Then take the next bug you fix and write the failing test first. Compare how confident you feel in each fix."
    },
    "takeaways": [
      "Testing moved to developers because late feedback is expensive feedback",
      "Many unit tests, fewer integration tests, very few end-to-end tests",
      "An inverted pyramid produces slow, flaky builds that teams learn to ignore",
      "Red, green, refactor — writing the test first shapes the interface and proves the test works",
      "Test behaviour rather than implementation, or refactoring becomes painful",
      "A flaky test is worse than no test because it trains the team to ignore failures",
      "Coverage tells you what ran, not what was checked"
    ],
    "quiz": [
      {
        "q": "In test-driven development, you watch the new test fail before writing code because it:",
        "opts": [
          "Records the defect in the build history",
          "Makes the subsequent code faster to write correctly",
          "Is required by most testing frameworks",
          "Confirms the test genuinely tests something"
        ],
        "a": 3,
        "fb": "A test written afterwards that passes immediately may be asserting nothing at all."
      },
      {
        "q": "The test pyramid recommends that a suite contains:",
        "opts": [
          "Many unit tests and very few end-to-end tests",
          "Equal numbers of each level of test",
          "Mostly end-to-end tests, since they are realistic",
          "Only integration tests, to balance speed and realism"
        ],
        "a": 0,
        "fb": "An inverted shape produces a forty-minute build that fails randomly and is eventually ignored."
      },
      {
        "q": "A test that passes sometimes and fails other times is:",
        "opts": [
          "Acceptable if the failures are rare",
          "Worse than no test, since it trains people to ignore failures",
          "A normal and expected characteristic of integration testing",
          "Useful for detecting timing-related defects"
        ],
        "a": 1,
        "fb": "Determinism is what makes a suite trustworthy. Once failures are routinely ignored, the suite has stopped working."
      },
      {
        "q": "A test that breaks when you rename a private method is:",
        "opts": [
          "A sign that the refactoring was done wrongly",
          "Evidence of good coverage in that area",
          "Testing implementation rather than behaviour",
          "Correctly detecting a breaking change"
        ],
        "a": 2,
        "fb": "Tests coupled to implementation make refactoring painful, which defeats much of their purpose."
      },
      {
        "q": "A codebase reports 100% test coverage. This tells you that:",
        "opts": [
          "Refactoring can be done entirely safely",
          "The code is unlikely to contain defects",
          "All of the important behaviour has been verified",
          "All code was executed, not that it was checked"
        ],
        "a": 3,
        "fb": "Code can be fully covered by tests that assert nothing meaningful. Treat a low number as a warning and a high number as no guarantee."
      },
      {
        "q": "The most effective way to add tests to a large untested codebase is to:",
        "opts": [
          "Write a failing test before every bug fix",
          "Begin with end-to-end tests covering main journeys",
          "Pause feature work for a dedicated testing sprint",
          "Aim for a fixed coverage percentage each sprint"
        ],
        "a": 0,
        "fb": "Bugs cluster in exactly the areas that most need tests, so coverage grows where it matters most."
      }
    ]
  },
  {
    "id": "d10",
    "tag": "Module 10",
    "time": "45 min",
    "title": "Continuous Integration and Delivery",
    "summary": "Why merging often and releasing small makes everything safer",
    "objectives": [
      "Explain what continuous integration is and what it prevents",
      "Understand why long-lived branches cause problems",
      "Describe the stages of a typical build pipeline",
      "Distinguish continuous delivery from continuous deployment",
      "Know your responsibilities when the build breaks"
    ],
    "sections": [
      {
        "h": "The problem: integration used to be an event",
        "html": "\n        <p>Historically, developers worked separately for weeks and then merged everything together near the end. That merge was a distinct, dreaded phase, because everyone had changed overlapping code and the conflicts were enormous. Teams frequently discovered that separately-working pieces did not work together at all — at the worst possible moment.</p>\n        <p><strong>Continuous integration</strong> removes the event by making it constant. Everyone merges to the shared main branch frequently — at least daily — and every merge is automatically built and tested.</p>\n        <p>The insight is the same as elsewhere in this course: if integrating is painful, do it more often, not less. Small merges are trivial; large merges are dangerous. The pain scales non-linearly with how long you wait.</p>"
      },
      {
        "h": "Why long-lived branches hurt",
        "html": "\n        <p>A branch open for three weeks accumulates conflicts every day someone else changes the same files. Worse, the code on that branch is not being tested against everyone else's changes, so problems are invisible until the merge.</p>\n        <p>Practical guidance:</p>\n        <ul class=\"body\">\n          <li><strong>Keep branches short.</strong> Hours or a day or two, not weeks.</li>\n          <li><strong>Pull from main frequently</strong> so you are integrating continuously in both directions.</li>\n          <li><strong>Break work into small pieces</strong> that can each be merged independently. This connects directly to story splitting in Module 5.</li>\n          <li><strong>Use feature flags</strong> for incomplete work: merge the code but keep it switched off. This lets you integrate continuously without releasing half-built features.</li>\n        </ul>"
      },
      {
        "h": "What a pipeline does",
        "html": "\n        <p>A build pipeline runs automatically on every push. A typical sequence:</p>\n        <ol class=\"body\">\n          <li><strong>Build</strong> — compile the code; fail fast if it does not.</li>\n          <li><strong>Unit tests</strong> — fast, run on everything.</li>\n          <li><strong>Static analysis</strong> — linting, style, common error patterns, security checks.</li>\n          <li><strong>Integration tests</strong> — slower, may need a database.</li>\n          <li><strong>Package</strong> — produce the deployable artefact.</li>\n          <li><strong>Deploy to a test environment</strong> automatically.</li>\n          <li><strong>End-to-end tests</strong> against that environment.</li>\n        </ol>\n        <p>Stages are ordered <strong>fast and cheap first</strong> so that most failures are reported within a minute or two. A pipeline where you wait twenty minutes to learn about a syntax error is badly ordered.</p>"
      },
      {
        "h": "Continuous delivery and continuous deployment",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Continuous integration</strong> — every change is merged and automatically verified.</li>\n          <li><strong>Continuous delivery</strong> — every change that passes is <em>ready</em> to release; the decision to release is a human one.</li>\n          <li><strong>Continuous deployment</strong> — every change that passes goes to production automatically, with no human step.</li>\n        </ul>\n        <p>Most organisations should target continuous delivery. Continuous deployment requires very strong automated testing, monitoring and the ability to roll back quickly — and it is not a maturity badge. Plenty of excellent teams deliberately keep a human release decision.</p>"
      },
      {
        "h": "When the build breaks",
        "html": "\n        <p>A broken main branch blocks everyone, because nobody can safely merge or release. So it takes priority over whatever you were doing.</p>\n        <p>The conventions:</p>\n        <ol class=\"body\">\n          <li><strong>If you broke it, you fix it</strong>, immediately, before starting anything else.</li>\n          <li><strong>If it cannot be fixed within a few minutes, revert.</strong> Reverting is not an admission of failure; it restores everyone else's ability to work. Fix it properly on a branch afterwards.</li>\n          <li><strong>Tell the team</strong> — do not fix it silently, because others need to know whether main is trustworthy right now.</li>\n          <li><strong>Never merge on top of a broken build.</strong> You will not know whether your change works, and you make the failure harder to diagnose.</li>\n          <li><strong>Never disable a failing test to make the build pass.</strong> If a test is genuinely wrong, fix or delete it deliberately, with the team's knowledge.</li>\n        </ol>\n        <div class=\"callout warn\"><h4>The habit that quietly kills a pipeline</h4><p style=\"margin:0\">Once a team starts tolerating a red build — \"it's just that flaky test again\" — the pipeline stops providing information. Within a few months nobody looks at it, real failures hide among the noise, and the team is back to discovering problems in production. <strong>A build that is allowed to stay red is equivalent to having no build at all</strong>, and the transition happens gradually enough that nobody notices.</p></div>"
      },
      {
        "h": "Your daily responsibilities",
        "html": "\n        <ul class=\"body\">\n          <li>Run the tests locally before pushing.</li>\n          <li>Push at least once a day.</li>\n          <li>Watch your build after pushing; do not push and walk away.</li>\n          <li>Keep the pipeline fast — if it becomes slow, that is a team problem worth raising.</li>\n          <li>Treat pipeline configuration as real code: reviewed, version-controlled and understood by more than one person.</li>\n        </ul>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: do not push and walk away",
      "text": "The most common small failure of discipline is pushing at the end of the day and leaving before the pipeline finishes. If it fails, the build is broken overnight and the whole team is blocked at nine the next morning. Wait for your build. If you genuinely have to leave, say so in the team channel so someone else can revert it. This costs you five minutes occasionally and saves the team hours regularly."
    },
    "activity": {
      "title": "Practice",
      "text": "Look at your team's pipeline and write down each stage and how long it takes. Identify the slowest stage and whether it could run later or in parallel. Then check your own branch history: how long do your branches typically live before merging? If the answer is more than two days, pick your next piece of work and deliberately split it so you can merge daily."
    },
    "takeaways": [
      "If integrating is painful, do it more often — the pain scales non-linearly with delay",
      "Long-lived branches accumulate conflicts and hide problems until the merge",
      "Feature flags let you merge incomplete work without releasing it",
      "Order pipeline stages fast and cheap first so failures report within a minute or two",
      "Continuous delivery keeps a human release decision; continuous deployment does not",
      "If you break the build, fix it or revert immediately — reverting is not failure",
      "A build allowed to stay red is equivalent to having no build at all"
    ],
    "quiz": [
      {
        "q": "Continuous integration addresses which specific problem?",
        "opts": [
          "Teams working in different time zones",
          "Integration being a large, risky, late event",
          "Developers writing code without adequate tests",
          "Releases requiring manual approval steps"
        ],
        "a": 1,
        "fb": "Small merges are trivial and large merges are dangerous, so the answer is to integrate more often rather than less."
      },
      {
        "q": "You need to merge code for a feature that is not finished. The usual solution is:",
        "opts": [
          "Ask the team to pause other merges meanwhile",
          "Keep it on a branch until fully complete",
          "Merge it behind a feature flag, switched off",
          "Merge only the tests and hold back the code"
        ],
        "a": 2,
        "fb": "This lets you integrate continuously without releasing half-built functionality to users."
      },
      {
        "q": "The difference between continuous delivery and continuous deployment is that deployment:",
        "opts": [
          "Requires significantly more automated testing",
          "Includes end-to-end tests in the pipeline",
          "Applies only to cloud-hosted applications",
          "Releases to production with no human decision"
        ],
        "a": 3,
        "fb": "Most organisations should target continuous delivery. Keeping a human release decision is not a sign of immaturity."
      },
      {
        "q": "You break the main build and cannot fix it within a few minutes. You should:",
        "opts": [
          "Revert your change to unblock the team",
          "Continue debugging until you find the cause",
          "Ask a senior developer to take over the fix",
          "Disable the failing test and fix it later"
        ],
        "a": 0,
        "fb": "Reverting is not an admission of failure. It restores everyone else's ability to work while you fix it properly on a branch."
      },
      {
        "q": "Pipeline stages should be ordered so that:",
        "opts": [
          "Static analysis runs after deployment",
          "Fast, cheap checks run first and fail early",
          "All stages execute fully in parallel",
          "End-to-end tests always run before unit tests"
        ],
        "a": 1,
        "fb": "Waiting twenty minutes to be told about a syntax error means the pipeline is badly ordered."
      },
      {
        "q": "A team that routinely tolerates a red build has effectively:",
        "opts": [
          "Improved velocity by reducing interruptions",
          "Shifted quality responsibility to testers",
          "Lost the value of having a build at all",
          "Adopted a more pragmatic release process"
        ],
        "a": 2,
        "fb": "Real failures hide among the noise, and the team returns to discovering problems in production."
      }
    ]
  },
  {
    "id": "d11",
    "tag": "Module 11",
    "time": "45 min",
    "title": "Code Review, Pairing and Working in a Team",
    "summary": "How to review well, be reviewed well, and collaborate on code",
    "objectives": [
      "Give code review feedback that improves code without damaging relationships",
      "Receive review feedback without defensiveness",
      "Understand pair programming and when it is worth the cost",
      "Communicate effectively in a team, including remotely",
      "Ask for and offer help productively"
    ],
    "sections": [
      {
        "h": "What code review is for",
        "html": "\n        <p>Code review has four purposes, and most teams only consciously pursue the first:</p>\n        <ol class=\"body\">\n          <li><strong>Catching defects</strong> before they reach production.</li>\n          <li><strong>Spreading knowledge</strong> — the reviewer learns that part of the system, which is what makes collective ownership possible.</li>\n          <li><strong>Maintaining consistency</strong> so the codebase reads as though written by one person.</li>\n          <li><strong>Teaching</strong>, in both directions.</li>\n        </ol>\n        <p>Recognising the second and third explains why review should not be concentrated in one senior person: doing so keeps knowledge exactly where it already is.</p>"
      },
      {
        "h": "How to review well",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Review promptly.</strong> A review sitting for two days blocks someone. Aim for within a few hours. This matters more than the depth of any individual comment.</li>\n          <li><strong>Comment on the code, never the person.</strong> \"This loop runs on every request\" — not \"you wrote this inefficiently.\"</li>\n          <li><strong>Distinguish severity.</strong> Mark clearly what must change, what you suggest, and what is merely an observation. A common convention is prefixes: <em>blocking</em>, <em>suggestion</em>, <em>nit</em>. Without this, authors treat every comment as mandatory and reviews become exhausting.</li>\n          <li><strong>Ask rather than assert</strong> when unsure. \"What happens if this is null?\" invites explanation; \"this will break on null\" may simply be wrong.</li>\n          <li><strong>Say what is good.</strong> Not politeness — it tells the author which choices to repeat.</li>\n          <li><strong>Do not redesign in review.</strong> If the approach is fundamentally wrong, that is a conversation, not a comment thread.</li>\n          <li><strong>Approve when it is good enough.</strong> Perfect is not the standard; better than what is there, and meeting the definition of done, is.</li>\n        </ul>"
      },
      {
        "h": "How to be reviewed well",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Keep changes small.</strong> A 50-line change gets a real review; a 2,000-line change gets approved without being read. This is the single biggest thing you control.</li>\n          <li><strong>Explain the context</strong> in the description — what and why, and anything you were unsure about.</li>\n          <li><strong>Review your own change first.</strong> You will catch the debug statement you left in.</li>\n          <li><strong>Assume good intent.</strong> Written feedback reads more harshly than it was meant, especially across cultures and languages.</li>\n          <li><strong>Respond to every comment</strong>, even if only to say you have made the change.</li>\n          <li><strong>Disagree openly when you disagree.</strong> \"I considered that, but chose this because X\" is a perfectly good response. Review is a conversation, not an instruction.</li>\n        </ul>\n        <div class=\"callout note\"><h4>The thing to internalise early</h4><p style=\"margin:0\">Comments on your code are not criticism of you. Every developer, at every level of experience, has their code reviewed and changed. The developers who improve fastest are the ones who treat review as free expert attention on their work rather than as an examination to be passed. That reframing is worth making deliberately in your first year, because the habit sticks.</p></div>"
      },
      {
        "h": "Pair programming",
        "html": "\n        <p>Two developers, one task, working together. Traditionally one <strong>drives</strong> (types) while the other <strong>navigates</strong> (thinks ahead, spots problems), swapping regularly.</p>\n        <p><strong>The obvious objection</strong> is that it halves output. The evidence is more interesting: pairs produce fewer defects and better designs, and the time saved on debugging and rework often offsets much of the cost. It is not always worth it, but it is worth it more often than the arithmetic suggests.</p>\n        <p><strong>When pairing is clearly worth it:</strong></p>\n        <ul class=\"body\">\n          <li>Complex or high-risk work where a mistake is expensive</li>\n          <li>Onboarding — far faster than documentation for transferring context</li>\n          <li>Unfamiliar parts of the system</li>\n          <li>When one person has been stuck for a while</li>\n        </ul>\n        <p><strong>When it usually is not:</strong> routine, well-understood work; tasks one person can finish in twenty minutes; and situations where the pair's working styles genuinely clash.</p>\n        <p>Practical points: swap the keyboard every twenty to thirty minutes, take breaks, and remember it is more tiring than working alone — three or four hours is a full day of pairing.</p>"
      },
      {
        "h": "Working in a team",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Write things down.</strong> Decisions made verbally are lost, and remote or absent colleagues never hear them.</li>\n          <li><strong>Over-communicate when remote.</strong> Nobody can see that you are stuck, so say so.</li>\n          <li><strong>Update the board honestly.</strong> An item stuck for five days is information the team needs.</li>\n          <li><strong>Be reachable in agreed hours</strong> and genuinely unreachable outside them.</li>\n          <li><strong>Assume good intent in writing.</strong> Terse messages usually mean the sender was busy, not annoyed.</li>\n        </ul>\n        <p>In teams spanning languages and time zones — common for developers in Nepal working with international clients — written clarity matters more than in a co-located team, and the cost of an ambiguous message is a lost day rather than a lost minute.</p>"
      },
      {
        "h": "Asking for and offering help",
        "html": "\n        <p><strong>Asking well:</strong> state what you are trying to do, what you have tried, what happened, and what you expected. This is worth doing even when nobody answers — writing it out solves the problem surprisingly often.</p>\n        <p><strong>Offering well:</strong> ask before taking the keyboard. \"Would it help to look at this together?\" respects that the person may be close to solving it and learning something in the process. Taking over and fixing it silently is faster today and teaches nothing.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: keep your changes small",
      "text": "If you improve one thing about how you work with a team, make your pull requests small. A 50-line change gets read line by line and genuinely reviewed. A 1,500-line change gets a quick scroll and an approval, which means it received no review at all — while creating the paperwork that says it did. Small changes get better feedback, merge faster, are easier to revert, and cause fewer conflicts. It is entirely within your control and it improves everything downstream of it."
    },
    "activity": {
      "title": "Practice",
      "text": "On your next three code reviews, tag every comment as blocking, suggestion or nit, and include at least one comment on something done well. Separately, look at your last five pull requests and note their size in lines changed. If any exceeded a few hundred lines, plan how you would have split that work into separately mergeable pieces."
    },
    "takeaways": [
      "Code review spreads knowledge and maintains consistency, not only catches defects",
      "Concentrating review in one senior person keeps knowledge where it already is",
      "Mark comments as blocking, suggestion or nit, or authors treat everything as mandatory",
      "Small pull requests get genuine review; large ones get approved unread",
      "Review comments are free expert attention on your work, not an examination",
      "Pairing is worth it for complex, risky, unfamiliar work and for onboarding",
      "Ask for help by stating goal, attempts, result and expectation — it often solves itself"
    ],
    "quiz": [
      {
        "q": "A 2,000-line pull request typically receives:",
        "opts": [
          "More comments than a small change",
          "A thorough review, given its importance",
          "Faster feedback from senior reviewers",
          "An approval without being genuinely read"
        ],
        "a": 3,
        "fb": "It creates the paperwork saying review happened while delivering none of the benefit."
      },
      {
        "q": "Marking review comments as blocking, suggestion or nit exists because otherwise:",
        "opts": [
          "Authors treat every comment as mandatory",
          "The tooling cannot track resolution status",
          "Junior developers ignore important issues",
          "Reviewers spend too long writing feedback"
        ],
        "a": 0,
        "fb": "Without severity signals, reviews become exhausting and authors cannot tell what actually matters."
      },
      {
        "q": "Concentrating all code review in one senior developer:",
        "opts": [
          "Is standard practice in regulated environments",
          "Keeps knowledge exactly where it already is",
          "Ensures the highest possible code quality",
          "Reduces the total time spent reviewing"
        ],
        "a": 1,
        "fb": "Spreading knowledge is one of review's main purposes, and it is what makes collective code ownership possible."
      },
      {
        "q": "Pair programming is most clearly worth the cost when the work is:",
        "opts": [
          "Routine and well understood by both people",
          "Small enough to complete in twenty minutes",
          "Complex, risky, or unfamiliar to one person",
          "Under significant deadline pressure"
        ],
        "a": 2,
        "fb": "It is also very effective for onboarding, transferring context far faster than documentation."
      },
      {
        "q": "When a colleague asks for help, the better first move is to:",
        "opts": [
          "Take the keyboard and fix it quickly",
          "Suggest that they raise it at the next standup",
          "Point them to the relevant documentation",
          "Ask whether they would like to look at it together"
        ],
        "a": 3,
        "fb": "They may be close to solving it and learning something. Taking over is faster today and teaches nothing."
      },
      {
        "q": "Writing out a help request — goal, attempts, result, expectation — is valuable because it:",
        "opts": [
          "Frequently solves the problem while writing it",
          "Demonstrates effort to your manager",
          "Reduces the number of interruptions",
          "Creates a written record for future team members"
        ],
        "a": 0,
        "fb": "It is worth doing even when nobody answers, which is why the practice is worth building as a habit."
      }
    ]
  },
  {
    "id": "d12",
    "tag": "Module 12",
    "time": "45 min",
    "title": "Retrospectives and Your First 90 Days",
    "summary": "How teams improve, and how to become good at this quickly",
    "objectives": [
      "Participate usefully in a retrospective",
      "Recognise the failure modes that make retrospectives pointless",
      "Understand psychological safety and your part in it",
      "Plan your own development as an agile practitioner",
      "Know what to do in your first three months on a team"
    ],
    "sections": [
      {
        "h": "What a retrospective is for",
        "html": "\n        <p>At the end of each sprint the team examines <strong>how it worked</strong> — not what it built. What went well and should continue, what did not, and what specific changes to try next.</p>\n        <p>This is the mechanism by which an agile team improves. Without it, a team repeats the same problems indefinitely, running the same ceremonies with the same friction. It is the only event whose subject is the team itself.</p>"
      },
      {
        "h": "A simple, effective format",
        "html": "\n        <ol class=\"body\">\n          <li><strong>Set the scene</strong> (5 min). Remind everyone this is about improving the system, not assigning blame.</li>\n          <li><strong>Gather data</strong> (15 min). Everyone writes observations — what went well, what did not — usually silently first, so the loudest voice does not anchor everyone.</li>\n          <li><strong>Generate insight</strong> (15 min). Group similar items and discuss the underlying causes rather than the symptoms.</li>\n          <li><strong>Decide actions</strong> (15 min). Choose <strong>one or two</strong> specific changes, each with a named owner and a date.</li>\n          <li><strong>Close</strong> (5 min). Confirm the actions and check how the retrospective itself felt.</li>\n        </ol>\n        <p>The silent writing step matters more than it looks. Without it, the first person to speak sets the agenda and quieter team members — often including the newest, who see the most — contribute nothing.</p>"
      },
      {
        "h": "Why retrospectives fail",
        "html": "\n        <ul class=\"body\">\n          <li><strong>No actions come out.</strong> The team discusses, feels better, changes nothing, and gradually stops taking it seriously.</li>\n          <li><strong>Actions are never done.</strong> Worse than none, because it teaches the team that the meeting is theatre. Put actions on the board like any other work.</li>\n          <li><strong>Too many actions.</strong> Twelve improvements means none. One or two, actually completed, beats a list.</li>\n          <li><strong>It becomes a complaint session.</strong> Venting has some value but is not improvement. The facilitator should push toward \"what will we do differently?\"</li>\n          <li><strong>Only safe topics are raised.</strong> If the real problem is a manager's behaviour or an unrealistic deadline and nobody says it, the retrospective is not doing its job.</li>\n          <li><strong>The same items recur every sprint.</strong> A clear signal the causes are outside the team's control and need escalating.</li>\n        </ul>"
      },
      {
        "h": "Psychological safety",
        "html": "\n        <p>Retrospectives only work if people can say uncomfortable things without cost. That condition is called psychological safety, and it is built through observable behaviour rather than assurances.</p>\n        <p>What you can contribute regardless of seniority:</p>\n        <ul class=\"body\">\n          <li><strong>Admit your own mistakes first.</strong> \"I broke the build on Tuesday and it took me too long to notice\" makes it safe for others.</li>\n          <li><strong>Never respond to a disclosure with blame</strong>, including with a joke at someone's expense.</li>\n          <li><strong>Support someone raising a difficult point</strong>, even briefly. Being the second person to say something is genuinely helpful.</li>\n          <li><strong>Ask the naive question.</strong> As a new team member you can ask \"why do we do it this way?\" in a way that nobody else can, and it frequently exposes something worth changing.</li>\n        </ul>"
      },
      {
        "h": "Your first 90 days",
        "html": "\n        <p><strong>Weeks 1–2 — learn.</strong> Get the environment running and make one tiny change end to end, however trivial. Read the definition of done, sit in every ceremony, ask what each is for, find out who to ask about what. Write down everything confusing; you will lose this perspective within a month, and it is valuable while you have it.</p>\n        <p><strong>Weeks 3–6 — contribute.</strong> Take small, well-understood items and finish them properly. Write tests. Apply the two-hour rule. Start reviewing others' code — you will learn the system faster from reading it than from writing it. Ask one question in every planning session.</p>\n        <p><strong>Weeks 7–12 — improve.</strong> Take on something slightly beyond your comfort. Raise one specific observation in a retrospective. Fix one thing that annoys everybody — a slow test, a confusing README, a broken script. Offer to pair with someone on unfamiliar work.</p>\n        <p>By the end of three months you should be able to take a story from the board and finish it without needing help at every step.</p>"
      },
      {
        "h": "Becoming good at this",
        "html": "\n        <ul class=\"body\">\n          <li><strong>Finish things.</strong> The habit that separates reliable developers from busy ones.</li>\n          <li><strong>Say bad news early.</strong> Trust is built on this more than on ability.</li>\n          <li><strong>Keep changes small</strong> — stories, commits, pull requests, releases. Small is safer at every level, and it is a single habit that pays out in five places.</li>\n          <li><strong>Write the test.</strong> Especially for bugs.</li>\n          <li><strong>Leave code better than you found it.</strong>\n          </li>\n          <li><strong>Understand why, not just what.</strong> The practices are answers to problems; knowing the problem lets you adapt sensibly when the standard answer does not fit.</li>\n          <li><strong>Read code.</strong> More than you write. It is how you learn a system and a language.</li>\n        </ul>\n        <p>None of this requires seniority or permission. All of it is available to you from your first week, and doing it consistently is what makes the difference over a career.</p>"
      }
    ],
    "practitioner": {
      "title": "Practitioner's note: keep a confusion log",
      "text": "In your first month, keep a running note of everything that confuses you — a badly named function, a step nobody explained, a document that is out of date, a process whose purpose is unclear. You will lose this perspective permanently within about six weeks, because you will have absorbed the assumptions everyone else made long ago. Before that happens, turn the list into two or three specific improvements and raise them. It is the single most valuable contribution a new team member can make, and only you can make it."
    },
    "activity": {
      "title": "Practice",
      "text": "Write down one specific thing you would raise at your next retrospective — the actual issue, why it matters, and one concrete action you would propose. Then plan your own first-90-days list: three things to learn, one thing you will fix that annoys everyone, and one person you will ask to pair with. Review it after a month."
    },
    "takeaways": [
      "The retrospective is the only event whose subject is the team itself",
      "Write observations silently first, or the loudest voice sets the agenda",
      "One or two actions with owners and dates beats a list of twelve",
      "Actions that are never done are worse than none — they teach the team it is theatre",
      "Recurring items signal causes outside the team's control that need escalating",
      "Admitting your own mistakes first is how a junior developer builds safety",
      "Small changes at every level — stories, commits, pull requests, releases — is one habit that pays out repeatedly"
    ],
    "quiz": [
      {
        "q": "A retrospective examines:",
        "opts": [
          "Whether the sprint goal was met by the team",
          "How the team worked, rather than what it built",
          "The quality of the increment for stakeholders",
          "Individual performance across the sprint"
        ],
        "a": 1,
        "fb": "The sprint review covers what was built. The retrospective is the only event whose subject is the team itself."
      },
      {
        "q": "Retrospective actions that are agreed but never completed are:",
        "opts": [
          "A sign the actions were too ambitious",
          "Best carried forward to the following sprint",
          "Worse than no actions, since they teach it is theatre",
          "Acceptable, provided the discussion itself was useful"
        ],
        "a": 2,
        "fb": "Put retrospective actions on the board and track them like any other work item."
      },
      {
        "q": "Gathering observations silently before discussion prevents:",
        "opts": [
          "The meeting from running over its allotted time box",
          "Duplicate items appearing on the board",
          "Disagreement between team members",
          "The loudest voice anchoring the whole session"
        ],
        "a": 3,
        "fb": "Quieter members — often including the newest, who notice most — otherwise contribute nothing."
      },
      {
        "q": "The same issue appears in four consecutive retrospectives. This most likely means:",
        "opts": [
          "Its causes sit outside the team and need escalating",
          "The issue is not actually important to anyone involved",
          "The team is not trying hard enough to fix it",
          "Retrospectives are being held too frequently"
        ],
        "a": 0,
        "fb": "Recurring items are a signal to raise the problem beyond the team rather than to keep re-discussing it."
      },
      {
        "q": "As a new team member, the perspective that is most valuable and most perishable is:",
        "opts": [
          "Your knowledge of the tools used at a previous employer",
          "What confuses you before you absorb the team's assumptions",
          "Your assessment of individual colleagues' abilities",
          "Your view on which framework the team should use"
        ],
        "a": 1,
        "fb": "You lose it permanently within about six weeks, so capture it and turn it into specific improvements while you can."
      },
      {
        "q": "Which habit most separates reliable developers from merely busy ones?",
        "opts": [
          "Responding quickly to messages and requests",
          "Volunteering for the most difficult stories",
          "Finishing work before starting new work",
          "Keeping detailed records of time spent"
        ],
        "a": 2,
        "fb": "Combined with saying bad news early, it is what makes a developer trusted regardless of experience level."
      }
    ]
  }
];
