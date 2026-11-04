export interface AdvancedCoursePrice {
  currency: "NPR";
  original: number;
  offer: number;
  vatPercent: number;
}

export interface AdvancedCourseFaculty {
  name: string;
  role: string;
  institution: string;
  focus: string;
  image: string;
}

export interface AdvancedCourseModule {
  moduleNumber: number;
  title: string;
  topics: string[];
  assignment: string;
  coreApp: string;
  outcome: string;
}

export interface AdvancedCourseIndustry {
  name: string;
  applications: string[];
}

export interface AdvancedCourseDelivery {
  title: string;
  description: string;
  image: string;
}

export interface AdvancedCourseFaq {
  question: string;
  answer: string;
}

export interface AdvancedCourseRequirements {
  items: string[];
  note: string;
}

export interface AdvancedCourseContact {
  email: string;
  phone: string;
  address: string;
}

export interface AdvancedCourse {
  slug: string;
  title: string;
  fullTitle: string;
  badge?: string;
  tagline: string;
  shortDescription: string;
  // TODO confirm: Duration flagged for administrative verification
  duration: string;
  delivery: string;
  intake: string;
  // TODO confirm: Certificate wording strictly non-degree / professional development
  certificate: string;
  // TODO confirm final: Pricing pending final institutional sign-off
  price: AdvancedCoursePrice;
  tools: string[];
  overview: string[];
  objectives: string[];
  curriculum: AdvancedCourseModule[];
  assessment: string;
  industries: AdvancedCourseIndustry[];
  targetAudience: string[];
  faculty: AdvancedCourseFaculty[];
  requirements: AdvancedCourseRequirements;
  programDelivery: AdvancedCourseDelivery[];
  faq: AdvancedCourseFaq[];
  heroImage: string;
  thumbnail: string;
  ogImage: string;
  brochureUrl?: string;
  contact: AdvancedCourseContact;
}

export function formatNprPrice(amount: number): string {
  return `NPR ${new Intl.NumberFormat("en-NP").format(amount)}`;
}

export const advancedCourses: AdvancedCourse[] = [
  {
    slug: "analyzing-and-presenting-data",
    title: "Analyzing and Presenting Data",
    fullTitle: "Analyzing and Presenting Data Using Microsoft Applications",
    badge: "PECP Hallmark Course",
    tagline: "A PECP Hallmark Course | Red Dot Technologies × University of South Carolina Upstate",
    shortDescription:
      "Practical, faculty-led online course in Microsoft Excel, Power BI, Copilot and PowerPoint, delivered with USC Upstate faculty through Blackboard Ultra.",
    // TODO confirm
    duration: "Approx. 6 weeks",
    delivery:
      "Online, faculty-led, on USC Upstate's Blackboard Ultra, with a live Zoom closing session",
    intake:
      "New sessions start every month (fixed intake cycles; customized intakes subject to faculty availability and institutional scheduling)",
    // TODO confirm
    certificate: "Professional certificate on completion",
    // TODO confirm final
    price: {
      currency: "NPR",
      original: 24999,
      offer: 19999,
      vatPercent: 13,
    },
    tools: [
      "Microsoft Excel",
      "Power BI",
      "Microsoft Copilot",
      "PowerPoint",
      "Zoom",
      "Blackboard Ultra",
    ],
    overview: [
      "In today's data-driven workplace, organizing, analyzing and communicating information is an essential professional competency.",
      "This course takes learners from spreadsheet fundamentals through formulas and functions, data analysis and dashboards, AI-assisted data storytelling with Copilot, and professional PowerPoint presentations, through hands-on assignments with individual feedback from USC Upstate faculty.",
    ],
    objectives: [
      "Organize and manage data in Excel",
      "Perform calculations and analysis with formulas and functions",
      "Use Microsoft Copilot for analysis and productivity",
      "Visualize information with Excel and Power BI",
      "Present insights through clear PowerPoint presentations",
      "Apply skills to practical, workplace-style assignments",
      "Build confidence interpreting and communicating data",
    ],
    curriculum: [
      {
        moduleNumber: 0,
        title: "Welcome and Orientation",
        topics: [
          "Course overview and academic expectations",
          "USC Upstate faculty introductions",
          "Software prerequisites & licensing setup",
          "Blackboard Ultra navigation and learning tools",
        ],
        assignment: "Environment Setup & Blackboard Orientation",
        coreApp: "Blackboard Ultra",
        outcome:
          "Full operational readiness to navigate learning modules, access resources, and submit work on Blackboard Ultra.",
      },
      {
        moduleNumber: 1,
        title: "Excel Fundamentals",
        topics: [
          "Excel interface and ribbon navigation",
          "Rows, columns, and cell properties",
          "Data entry standards and cell formatting",
          "Basic arithmetic operations and SUM function",
          "Building structured monthly budget summaries",
        ],
        assignment: "Personal Budget Spreadsheet",
        coreApp: "Microsoft Excel",
        outcome:
          "A structured, formatted personal budget spreadsheet applying basic calculations and cell design principles.",
      },
      {
        moduleNumber: 2,
        title: "Excel Functions and Formulas",
        topics: [
          "Formula syntax and logical operator structure",
          "Relative, absolute, and mixed cell references",
          "Built-in statistical, lookup, and financial functions",
          "Applying formulas systematically across large datasets",
        ],
        assignment: "Course Gradebook",
        coreApp: "Microsoft Excel",
        outcome:
          "A dynamic grade calculation model executing automated weighted computations and performance evaluations.",
      },
      {
        moduleNumber: 3,
        title: "Analyzing Data with Excel and Power BI",
        topics: [
          "The modern business analytics workflow",
          "Importing, transforming, and modeling data in Power BI",
          "Designing charts, visual hierarchies, and interactive slicers",
          "Building executive performance dashboards",
        ],
        assignment: "Interactive Performance Dashboard",
        coreApp: "Power BI & Excel",
        outcome:
          "An interactive multi-metric dashboard communicating trends, ratios, and critical performance indicators.",
      },
      {
        moduleNumber: 4,
        title: "Using Copilot in Data Storytelling",
        topics: [
          "AI-assisted data discovery and pattern recognition",
          "Prompt engineering for data interpretation",
          "Extracting qualitative insights from quantitative records",
          "Building coherent data-backed strategic narratives",
        ],
        assignment: "Family Budget Planning with Copilot",
        coreApp: "Microsoft Copilot",
        outcome:
          "An AI-synthesized narrative report extracting contextual trends, variances, and strategic recommendations.",
      },
      {
        moduleNumber: 5,
        title: "Best Practices in Presenting Data with PowerPoint",
        topics: [
          "Foundational principles of executive presentation",
          "Structuring narrative flow and audience takeaways",
          "Choosing the right chart types for decision makers",
          "Visual hierarchy, typography, and contrast rules",
          "Generating data presentation outlines with Copilot",
        ],
        assignment: "Build a Data Presentation Using Copilot",
        coreApp: "Microsoft PowerPoint & Copilot",
        outcome:
          "An executive presentation deck delivering structured narrative flow, professional chart visuals, and impactful takeaways.",
      },
      {
        moduleNumber: 6,
        title: "Final Resources and Discussion",
        topics: [
          "Professional resume resources and competency highlighting",
          "Portfolio curation and career guidance pathways",
          "Live faculty-led Zoom closing session",
          "Interactive open discussion and cohort graduation Q&A",
        ],
        assignment: "Executive Capstone Review & Closing Session",
        coreApp: "Zoom & Blackboard Ultra",
        outcome:
          "Direct faculty feedback on portfolio work, strategic career positioning, and completion certificate award.",
      },
    ],
    assessment:
      "5 practical assignments, each with individual faculty feedback via Blackboard. No final exam.",
    industries: [
      {
        name: "Banking & Financial Services",
        applications: [
          "Budgeting, variance reporting, and financial forecasting",
          "Credit risk tracking and compliance metrics",
          "Portfolio analysis and investment return models",
        ],
      },
      {
        name: "Business & Management",
        applications: [
          "Operational KPI dashboards and executive scorecards",
          "Resource allocation and project performance tracking",
          "Strategic growth modeling and board presentations",
        ],
      },
      {
        name: "Information Technology",
        applications: [
          "Sprint velocity, defect metrics, and capacity planning",
          "Infrastructure uptime and incident trend analysis",
          "IT budgeting and vendor SLA reporting",
        ],
      },
      {
        name: "Healthcare & Pharmaceuticals",
        applications: [
          "Patient census tracking and clinical operational metrics",
          "Inventory and pharmaceutical supply chain reporting",
          "Healthcare quality benchmarks and audit presentations",
        ],
      },
      {
        name: "Sales, Marketing & Retail",
        applications: [
          "Sales pipeline, quota attainment, and revenue forecasting",
          "Campaign ROI and multi-channel attribution analysis",
          "Customer segmentation and churn trend storytelling",
        ],
      },
      {
        name: "Students & Early Professionals",
        applications: [
          "Academic gradebooks and empirical research models",
          "Internship portfolio presentations and data case competitions",
          "Personal financial planning and career milestone tracking",
        ],
      },
    ],
    targetAudience: [
      "Students and recent university graduates",
      "Business and management professionals",
      "Finance and accounting specialists",
      "Human resources (HR) professionals",
      "Marketing and business development managers",
      "Reporting, operations, and data professionals",
      "Entrepreneurs and business owners",
    ],
    faculty: [
      {
        name: "Dr. Michele Covington",
        role: "Professor of Criminal Justice | Executive Director of Greenville Programs",
        institution: "USC Upstate",
        focus:
          "Nontraditional learners, problem-solving, quantitative research methods and statistics.",
        image: "/images/courses/apd/faculty-covington.jpg",
      },
      {
        name: "Dr. Carrie Silver",
        role: "Higher Education and Professional Learning",
        institution: "USC Upstate Greenville",
        focus: "Communication, strategic planning, qualitative research, learner development.",
        image: "/images/courses/apd/faculty-silver.jpg",
      },
    ],
    requirements: {
      items: [
        "Microsoft 365 with Microsoft Excel installed",
        "Verify access to Power BI and Copilot, since availability depends on subscription and licensing",
        "A desktop or laptop computer is recommended for hands-on assignments",
        "Stable broadband internet connection",
        "Active email access for Blackboard Ultra communication",
      ],
      note: "Login credentials are personal and must not be shared.",
    },
    programDelivery: [
      {
        title: "Faculty-Guided Online Learning",
        description:
          "Learn under the guidance of experienced USC Upstate faculty who review assignments, provide individualized qualitative feedback, and host the live closing session.",
        image: "/images/courses/apd/delivery-1.webp",
      },
      {
        title: "Practical, Assignment-Based Learning",
        description:
          "Work through 5 workplace-simulated assignments without the stress of high-stakes examinations. Your hands-on work serves as your practical portfolio.",
        image: "/images/courses/apd/delivery-2.webp",
      },
      {
        title: "Flexible Digital Learning Environment",
        description:
          "Access course modules 24/7 on USC Upstate's modern Blackboard Ultra platform with self-paced flexibility designed for working professionals.",
        image: "/images/courses/apd/delivery-3.webp",
      },
    ],
    faq: [
      {
        question: "What certificate will I receive?",
        answer:
          "Upon satisfactory completion of all course assignments, learners receive a professional certificate associated with the program, subject to completion requirements. Please note that this is a professional development certificate and is not an academic degree, university credit, accreditation, or professional licence.",
      },
      {
        question: "Do I need Microsoft 365?",
        answer:
          "Yes. Learners need an active Microsoft 365 subscription with Microsoft Excel installed. You should also verify access to Power BI and Microsoft Copilot, as feature availability depends on your specific Microsoft licensing plan.",
      },
      {
        question: "Is there a final exam?",
        answer:
          "No, there is no final exam. The course assessment is 100% practical and based on 5 workplace-simulated assignments submitted through Blackboard Ultra, each evaluated with individual faculty feedback.",
      },
      {
        question: "When do new batches start?",
        answer:
          "New sessions start every month following fixed intake cycles. Customized intakes for corporate or institutional groups are also available, subject to faculty availability and institutional scheduling.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Click the 'Enroll Now' button to submit your enrollment request on our Contact page with your details. Our admissions advisory team will contact you to verify your enrollment and guide you through batch onboarding.",
      },
    ],
    heroImage: "/images/courses/apd/hero.webp",
    thumbnail: "/images/courses/apd/thumbnail.webp",
    ogImage: "/images/courses/apd/og.jpg",
    contact: {
      email: "info@reddottech.com.np",
      phone: "+977 9823048347",
      address: "Baluwatar-04, Kathmandu, Nepal",
    },
  },
];

export function getAdvancedCourseBySlug(slug: string): AdvancedCourse | undefined {
  return advancedCourses.find((course) => course.slug === slug);
}
