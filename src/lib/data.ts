/**
 * Single source of truth. Every string here comes from resume.pdf.
 * Components only read from this file.
 */
export const PROFILE = {
  name: "Divyapriya S",
  firstName: "Divyapriya",
  initials: "DS",
  role: "Aspiring Software Developer",
  email: "divyapriyait2026@gmail.com",
  phone: "+91 6382799556",
  phoneHref: "tel:+916382799556",
  github: "https://github.com/DivyaPriya250413",
  linkedin: "https://www.linkedin.com/in/divya-priya2026",
  resume: "/resume.pdf",
  resumeSummary:
    "Aspiring Software Developer with a basic foundation in Java, SQL, HTML, CSS, JavaScript, React, Node.js, and MongoDB. Hands-on experience developing android application and web applications through academic projects and internships. Familiar with application development, debugging, database management, responsive web design, and Git/GitHub. Seeking to apply technical roles and contribute to real world projects.",
  degree: "B.Tech Information Technology",
  college: "EGS Pillay Engineering College",
  cgpa: "8.5",
  gradYear: "2026",
} as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type Skill = { name: string; sym: string; family: string; logo: string; uses: string[] };

export const SKILL_GROUPS: { family: string; skills: { name: string; sym: string; logo: string }[] }[] = [
  { family: "Languages", skills: [
    { name: "Java", sym: "Jv", logo: "java" }, { name: "C", sym: "C", logo: "c" } ] },
  { family: "Frontend", skills: [
    { name: "HTML5", sym: "Ht", logo: "html5" }, { name: "CSS3", sym: "Cs", logo: "css3" },
    { name: "JavaScript", sym: "Js", logo: "javascript" }, { name: "React.js", sym: "Re", logo: "react" },
  ] },
  { family: "Backend", skills: [ { name: "Node.js", sym: "No", logo: "nodejs" } ] },
  { family: "Databases", skills: [
    { name: "SQL", sym: "Sq", logo: "sql" }, { name: "MySQL", sym: "My", logo: "mysql" }, { name: "MongoDB", sym: "Mo", logo: "mongodb" } ] },
  { family: "Tools", skills: [
    { name: "Git", sym: "Gi", logo: "git" }, { name: "GitHub", sym: "Gh", logo: "github" },
    { name: "VS Code", sym: "Vs", logo: "vscode" }, { name: "Android Studio", sym: "As", logo: "androidstudio" } ] },
  { family: "Design", skills: [ { name: "Figma", sym: "Fi", logo: "figma" }, { name: "Canva", sym: "Ca", logo: "canva" } ] },
  { family: "Concepts", skills: [
    { name: "OOP", sym: "Oo", logo: "oop" }, { name: "Exception Handling", sym: "Ex", logo: "exception" },
    { name: "Basic DSA", sym: "Ds", logo: "dsa" } ] },
  { family: "Soft skills", skills: [
    { name: "Problem-Solving", sym: "Ps", logo: "problem" }, { name: "Adaptability", sym: "Ad", logo: "adapt" },
    { name: "Teamwork", sym: "Tw", logo: "team" }, { name: "Communication", sym: "Cm", logo: "comm" } ] },
];

export type Project = {
  id: string; index: string; title: string; kicker: string; date: string;
  description: string; features: string[]; tech: string[]; github?: string;
  ui: "map" | "shop" | "order";
};

export const PROJECTS: Project[] = [
  {
    id: "campus-bus-tracker", index: "01", title: "Campus Bus Tracker", kicker: "Android App · Jan 2026", date: "Jan 2026",
    description: "Developed a real-time college bus tracking application enabling students to view live bus locations and search available buses.",
    features: [
      "Firebase Authentication", "Realtime Database", "Google Maps integration", "FCM-based arrival/delay notifications",
      "Student and admin modules", "Bus management & location updates", "Transport announcements", "Secure access" ],
    tech: ["Java", "Android Studio", "XML", "Firebase", "Google Maps API"], ui: "map",
  },
  {
    id: "the-coffee-and-me", index: "02", title: "The Coffee & Me", kicker: "Full-Stack Web App · Jul 2025", date: "Jul 2025",
    description: "Developed a full-stack coffee shop web application with separate admin and customer functionality.",
    features: [
      "Admin and customer functionality", "Product management", "Online order placement", "RESTful APIs with Node.js & Express.js",
      "MongoDB data management", "Responsive interfaces" ],
    tech: ["Node.js", "MongoDB", "HTML5", "CSS3", "JavaScript"], ui: "shop",
  },
  {
    id: "train-food-delivery", index: "03", title: "Train Food Delivery Application", kicker: "Android App · Jan 2025", date: "Jan 2025",
    description: "Implemented user authentication, food menu management, order placement, and order tracking functionalities.",
    features: [
      "User authentication", "Food menu management", "Order placement", "Order tracking",
      "Real-time database", "Order status updates", "Delivery tracking", "Responsive Android UI" ],
    tech: ["Java", "Android Studio", "Google Maps API"], ui: "order",
  },
];

export const CERTIFICATIONS = [
  { title: "Java bootcamp and basic of Java", issuer: "Lets Upgrade" },
  { title: "DBMS part-1, HTML5, CSS3, JavaScript, Networking and Web Technology, and Prompt Engineering", issuer: "Infosys Springboard" },
  { title: "Python 3.x and Java", issuer: "Skill Rack" },
];

export type Stop = { year: string; title: string; place: string; detail: string; kind: "Education" | "Internship" };

export const EDUCATION = [
  { year: "2019 – 2020", title: "SSLC — 66%", place: "Municipal Girls Hr.Sec School", detail: "Secondary school" },
  { year: "2020 – 2022", title: "HSC — 72%", place: "Municipal Girls Hr.Sec School", detail: "Higher secondary" },
  { year: "2022 – 2026", title: "B.Tech Information Technology", place: "EGS Pillay Engineering College", detail: "CGPA 8.5" },
];

export const EXPERIENCE = [
  { year: "Jul – Sep 2024", title: "Android Development Intern", place: "Google · Virtual",
    detail: "Completed a 10-week virtual internship focused on Java fundamentals and Android application development. Applied Java programming concepts to develop a working mobile application." },
  { year: "Apr – Jun 2025", title: "Web Full Stack Developer Intern", place: "AICTE · Virtual",
    detail: "Completed a 10-week virtual internship focused on web development and frontend fundamentals. Developed a working web application using HTML, CSS, and JavaScript." },
];

/** Résumé lists no achievements, rankings or coding-platform profiles, so the section is omitted. */
export const ACHIEVEMENTS: never[] = [];

export const TIMELINE: Stop[] = [
  { ...EDUCATION[0], kind: "Education" }, { ...EDUCATION[1], kind: "Education" }, { ...EDUCATION[2], kind: "Education" },
  { ...EXPERIENCE[0], kind: "Internship" }, { ...EXPERIENCE[1], kind: "Internship" },
];
