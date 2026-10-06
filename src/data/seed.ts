import type { ContactItemRecord, EventRecord, FaqRecord, MemberRecord, QotdRecord, ResourceRecord } from "@/lib/content-types";

export const SEED_EVENTS: EventRecord[] = [
  {
    id: "seed-club-induction",
    title: "Club Induction",
    description: "Introduction to the club, its activities, and how to get involved.",
    category: "Workshop",
    venue: "NLHC G-8",
    starts_at: "2026-04-09T13:30:00.000Z",
    ends_at: "2026-04-09T14:00:00.000Z",
  },
  {
    id: "seed-integration-bee",
    title: "Integration Bee 2026",
    description: "Integration Bee Competition.",
    category: "Competition",
    venue: "NLHC G-8",
    starts_at: "2026-04-09T13:30:00.000Z",
    ends_at: "2026-04-10T15:30:00.000Z",
  },
];

export const SEED_MEMBERS: MemberRecord[] = [
  { id: "seed-faculty-tiwari", name: "Prof. S. P. Tiwari", role: "Faculty in-charge", group_type: "faculty", details: "Mathematics & Computing Department", bio: "Category Theory, and Fuzzy Automata Theory", image_url: "/team/photos/sptiwari.png", sort_order: 1 },
  { id: "seed-core-ayush", name: "Ayush Verma", role: "Coordinator", group_type: "core", details: "3rd Year, B.Tech (Mechanical)", bio: "Everyone is complex, unique and incomparable but can be equal.", image_url: "/team/photos/ayush.jpeg", sort_order: 1 },
  { id: "seed-core-abhimanyu", name: "Abhimanyu Yadav", role: "Tech Coordinator", group_type: "core", details: "3rd Year, B.Tech (Mechanical)", bio: "An idiot with a plan can beat a genius without plan", image_url: "/team/photos/abhimanyu.jpeg", sort_order: 2 },
  { id: "seed-member-subrat", name: "Subrat Panda", role: "Member", group_type: "member", details: "3rd Year, B.Tech (Electrical)", bio: "The power to constrain an adversary may depend on the power to bind oneself.", image_url: "/team/photos/subrat.jpeg", sort_order: 1 },
  { id: "seed-member-saranshh", name: "Saranshh Rastogi", role: "Member", group_type: "member", details: "3rd Year, B.Tech (Electrical)", bio: "Equations are poetry.", image_url: null, sort_order: 2 },
  { id: "seed-member-aarya", name: "Aarya Muniyavula", role: "Member", group_type: "member", details: "3rd Year, B.Tech (Mechanical)", bio: "In the Bleak Midwinter.", image_url: "/team/photos/aarya.jpeg", sort_order: 3 },
  { id: "seed-member-ansh", name: "Ansh Mathur", role: "Member", group_type: "member", details: "3rd Year, B.Tech (Mechanical)", bio: "Everything is a risk. Not doing anything is also a risk.", image_url: "/team/photos/ansh.jpeg", sort_order: 4 },
  { id: "seed-member-yash", name: "Yash Jha", role: "Member", group_type: "member", details: "3rd Year, B.Tech (Mathematics and Computing)", bio: "It is known; or is it?", image_url: "/team/photos/yash.jpeg", sort_order: 5 },
  { id: "seed-member-anukul", name: "Anukul Tiwari", role: "Member", group_type: "member", details: "3rd Year, B.Tech (Environmental)", bio: "Until I get there I won't give up.", image_url: "/team/photos/anukul.jpeg", sort_order: 6 },
  { id: "seed-member-kiran", name: "Kiran Pal", role: "Member", group_type: "member", details: "3rd Year, B.Tech (Mathematics and Computing)", bio: "Any loop can be shrunk.", image_url: "/team/photos/kiran.jpeg", sort_order: 7 },
  { id: "seed-member-sreenandan", name: "Sreenandan Shashidharan", role: "Member", group_type: "member", details: "3rd Year, B.Tech (Computer Science and Engineering)", bio: "I like Maths.", image_url: "/team/photos/sreenandan.jpeg", sort_order: 8 },
  { id: "seed-member-keshav", name: "Keshav Kumar", role: "Member", group_type: "member", details: "3rd Year, B.Tech (Chemical Engineering)", bio: "2 dimensional being.", image_url: "/team/photos/keshav.jpeg", sort_order: 9 },
];

export const SEED_RESOURCES: ResourceRecord[] = [
  { id: "seed-book-game-theory", kind: "book", title: "Game Theory", subtitle: "Michael Maschler, Shmuel Zamir, Eilon Solan", description: "", url: null, topic: "Game Theory", level: "Advanced", sort_order: 1 },
  { id: "seed-book-algebra", kind: "book", title: "Abstract Algebra", subtitle: "Dummit & Foote", description: "", url: null, topic: "Algebra", level: "Intermediate", sort_order: 2 },
  { id: "seed-book-topology", kind: "book", title: "Topology", subtitle: "James Munkres", description: "", url: null, topic: "Topology", level: "Intermediate", sort_order: 3 },
  { id: "seed-book-numbers", kind: "book", title: "Introduction to the Theory of Numbers", subtitle: "Hardy & Wright", description: "", url: null, topic: "Number Theory", level: "Intermediate", sort_order: 4 },
  { id: "seed-book-linear", kind: "book", title: "Linear Algebra Done Right", subtitle: "Sheldon Axler", description: "", url: null, topic: "Linear Algebra", level: "Beginner", sort_order: 5 },
  { id: "seed-book-aops", kind: "book", title: "The Art of Problem Solving Vol. 1 & 2", subtitle: "Sandor Lehoczky", description: "", url: null, topic: "Olympiad", level: "Beginner", sort_order: 6 },
  { id: "seed-book-probability", kind: "book", title: "A First Course in Probability", subtitle: "Sheldon Ross", description: "", url: null, topic: "Probability", level: "Intermediate", sort_order: 7 },
  { id: "seed-book-geometry", kind: "book", title: "Algebraic Geometry", subtitle: "Hartshorne", description: "", url: null, topic: "Geometry", level: "Expert", sort_order: 8 },
  { id: "seed-link-mit", kind: "link", title: "MIT OpenCourseWare", subtitle: "", description: "Free lecture notes and problem sets from MIT's math department.", url: "https://ocw.mit.edu/courses/mathematics/", topic: "", level: "", sort_order: 1 },
  { id: "seed-link-aops", kind: "link", title: "Art of Problem Solving", subtitle: "", description: "Forum, resources and courses for olympiad mathematics.", url: "https://artofproblemsolving.com", topic: "", level: "", sort_order: 2 },
  { id: "seed-link-3b1b", kind: "link", title: "3Blue1Brown", subtitle: "", description: "Visual intuition for deep mathematical ideas.", url: "https://www.3blue1brown.com", topic: "", level: "", sort_order: 3 },
  { id: "seed-link-euler", kind: "link", title: "Project Euler", subtitle: "", description: "Challenging mathematical programming problems.", url: "https://projecteuler.net", topic: "", level: "", sort_order: 4 },
  { id: "seed-link-khan", kind: "link", title: "Khan Academy", subtitle: "", description: "From arithmetic to multivariable calculus - free and excellent.", url: "https://www.khanacademy.org/math", topic: "", level: "", sort_order: 5 },
  { id: "seed-link-mathworld", kind: "link", title: "Wolfram MathWorld", subtitle: "", description: "Comprehensive online encyclopedia of mathematics.", url: "https://mathworld.wolfram.com", topic: "", level: "", sort_order: 6 },
  { id: "seed-archive-imo", kind: "archive", title: "IMO Problems Archive", subtitle: "", description: "Every International Math Olympiad problem from 1959 onwards.", url: "https://www.imo-official.org/problems.aspx", topic: "", level: "", sort_order: 1 },
  { id: "seed-archive-cmi", kind: "archive", title: "CMI Entrance Paper Collection", subtitle: "", description: "Past papers for Chennai Mathematical Institute entrance exam.", url: "https://www.cmi.ac.in/admissions/", topic: "", level: "", sort_order: 2 },
  { id: "seed-archive-nbhm", kind: "archive", title: "NBHM Written Test Papers", subtitle: "", description: "National Board for Higher Mathematics scholarship exam papers.", url: "https://www.nbhm.dae.gov.in/", topic: "", level: "", sort_order: 3 },
  { id: "seed-archive-tifr", kind: "archive", title: "TIFR GS Mathematics", subtitle: "", description: "TIFR Graduate School admission test papers in mathematics.", url: "https://www.tifr.res.in/academics/past_question_papers.php", topic: "", level: "", sort_order: 4 },
];

export const SEED_CONTACT_ITEMS: ContactItemRecord[] = [
  { id: "seed-contact-location", icon: "📍", label: "Location", value: "Mathematics Department, IIT(ISM) Dhanbad, Jharkhand - 826 004", url: null, sort_order: 1 },
  { id: "seed-contact-email", icon: "✉️", label: "Email", value: "mathsclub@iitism.ac.in", url: "mailto:mathsclub@iitism.ac.in", sort_order: 2 },
  { id: "seed-contact-social", icon: "🌐", label: "Social Media", value: "@mathsclub.iitism on Instagram", url: null, sort_order: 3 },
];

export const SEED_FAQS: FaqRecord[] = [
  { id: "seed-faq-join", question: "Who can join?", answer: "Any student of IIT(ISM) Dhanbad - any year, any branch.", sort_order: 1 },
  { id: "seed-faq-fee", question: "Is there a membership fee?", answer: "No fee. All activities are free for registered members.", sort_order: 2 },
  { id: "seed-faq-how", question: "How do I join?", answer: "Fill the form above or reach out via email.", sort_order: 3 },
];

export const SEED_QOTD: QotdRecord[] = [];
