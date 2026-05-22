// Single source of truth for portfolio content.
// Mirrors the data shape used by amirshetaia.com (r2/r3/r6/r8/r9/at).

export const NAME = "Mohammed Tarabay";
export const TAGLINE = "Software Engineer | AI, DevOps & Robotics";
export const LOCATION = "Cairo, Egypt";
export const TAGS = ["AI", "DevOps", "Robotics"];
export const GITHUB_URL = "https://github.com/mmtrabya";
export const LINKEDIN_URL = "https://linkedin.com/in/themohammedtarabay";
export const EMAIL = "mohammedtarabay25@outlook.com";
export const PHONE = "+201014849994";
export const RESUME_PATH = "/Mohammed_Tarabay_Resume.pdf";

export const ABOUT_HEADLINE =
  "Multidisciplinary engineer building AI-powered systems end to end";

export const ABOUT_BODY =
  "AI Engineering student at Mansoura University focused on shipping AI that actually runs on real hardware — autonomous mobility, ADAS, robotics, and cloud-native DevOps. Founder of Connectors Team (200+ students) and Octware. Track record across Banque Misr, Sprints, NTI, and university competitions, with a habit of taking systems from prototype to production.";

export const NOW_LABEL = "Now";
export const NOW_BODY =
  "B.Sc. in Artificial Intelligence Engineering from Mansoura University, with hands-on work across AI, robotics, embedded systems, and cloud-native DevOps. Available now for full-time Software / AI / DevOps roles — let’s talk.";

export const QUICK_FACTS: { label: string; value: string }[] = [
  { label: "Current Focus", value: "AI · DevOps · SDV Robotics" },
  { label: "Location", value: "Cairo, Egypt" },
  { label: "Education", value: "B.Sc. AI Engineering — Mansoura (GPA 3.47)" },
  { label: "Founder", value: "Connectors Team · Octware" },
];

// ── Skills (8 categories) ────────────────────────────────────────────
export const SKILLS: Record<string, { name: string }[]> = {
  "Main Skills": [
    { name: "AI" },
    { name: "IoT" },
    { name: "Embedded Systems" },
    { name: "Robotics" },
    { name: "DevOps" },
    { name: "Computer Vision" },
    { name: "Mobile App Development" },
  ],
  Frameworks: [{ name: "ROS2" }, { name: "Ultralytics" }],
  Libraries: [
    { name: "PyTorch" },
    { name: "TensorFlow" },
    { name: "Keras" },
    { name: "Pandas" },
    { name: "OpenCV" },
    { name: "NumPy" },
    { name: "ONNX" },
    { name: "TorchScript" },
  ],
  Languages: [
    { name: "Python" },
    { name: "C / C++" },
    { name: "Embedded C / C++" },
    { name: "Dart" },
    { name: "Flutter" },
    { name: "Java" },
  ],
  "Embedded & IoT Tools": [
    { name: "Arduino" },
    { name: "ESP32" },
    { name: "AVR" },
    { name: "Raspberry Pi" },
  ],
  "Cloud & DevOps": [
    { name: "Docker" },
    { name: "Kubernetes" },
    { name: "CI/CD" },
    { name: "Terraform" },
    { name: "GitHub Actions" },
    { name: "Azure DevOps" },
    { name: "AWS" },
    { name: "Prometheus" },
    { name: "Grafana" },
  ],
  "Autonomous Systems": [
    { name: "Perception" },
    { name: "Sensor Fusion" },
    { name: "SLAM" },
    { name: "Navigation" },
  ],
  Tooling: [
    { name: "Git" },
    { name: "GitHub" },
    { name: "GitLab" },
    { name: "MATLAB" },
    { name: "Linux" },
  ],
};

// ── Experience ───────────────────────────────────────────────────────
export type Experience = {
  company: string;
  companyUrl?: string;
  role: string;
  type?: string;
  dates: string;
  current?: boolean;
  location?: string;
  summary: string;
  bullets?: string[];
  tech?: string[];
  category?: "Engineering" | "Leadership" | "Internship";
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Learn in Depth",
    role: "Embedded Software Engineer Intern",
    dates: "Apr 2024 — Present",
    current: true,
    location: "Remote",
    summary: "Developing embedded systems and software solutions.",
    category: "Engineering",
    tech: ["Embedded C", "MCU", "RTOS"],
  },
  {
    company: "Kernel Masters",
    role: "Embedded Software Engineer & Automotive Cybersecurity Intern",
    dates: "Aug 2024 — Present",
    current: true,
    location: "Remote",
    summary: "Working on automotive cybersecurity and embedded systems.",
    bullets: [
      "Investigating attack surfaces in vehicle networks and ECU firmware.",
      "Embedded systems analysis and secure-by-design patterns.",
    ],
    category: "Engineering",
    tech: ["Automotive", "Cybersecurity", "Embedded C", "CAN"],
  },
  {
    company: "Banque Misr",
    companyUrl: "https://www.banquemisr.com",
    role: "DevOps Engineering Intern",
    type: "Internship",
    dates: "Jul 2025 — Sep 2025",
    location: "Cairo, Egypt · On-site",
    summary:
      "Assisting in DevOps practices and cloud infrastructure management in a regulated banking environment.",
    bullets: [
      "Observed Docker/Kubernetes integration and scaling in production-like setups.",
      "Analyzed real-world GitHub Actions pipelines and Azure DevOps workflows.",
      "Assisted with AWS infrastructure deployments via Terraform for reproducible provisioning.",
      "Exposure to financial-sector compliance and security practices in DevOps workflows.",
    ],
    category: "Engineering",
    tech: ["Docker", "Kubernetes", "AWS", "Terraform", "GitHub Actions", "Azure DevOps"],
  },
  {
    company: "Sprints",
    companyUrl: "https://sprints.ai",
    role: "DevOps Engineering Intern",
    type: "Internship",
    dates: "Jul 2025 — Sep 2025",
    location: "Cairo, Egypt · Remote",
    summary:
      "Hands-on training in CI/CD, containerization, cloud infrastructure, and IaC — finished with 96.17% overall productivity.",
    bullets: [
      "Built and deployed cloud-native apps with Docker + Kubernetes, automated via GitHub Actions and Azure DevOps.",
      "Provisioned and managed AWS infrastructure using Terraform for consistency and scalability.",
      "Collaborated on enterprise-simulated DevOps projects, troubleshooting pipelines.",
      "97.5% scope, 94.83% quality, 100% final-project submission rate, 96.5% overall final score.",
    ],
    category: "Engineering",
    tech: ["Docker", "Kubernetes", "Terraform", "AWS", "GitHub Actions", "ArgoCD"],
  },
  {
    company: "Connectors Team",
    role: "Founder & Team President",
    dates: "Apr 2023 — Jul 2025",
    location: "Daqahiliya, Egypt",
    summary:
      "Founded and led a 200+ student org working on AI, Robotics, IoT and Embedded Systems.",
    bullets: [
      "Directed 3+ major technical projects including the Shot-Bot 106 AI-integrated 180° camera (recognized in 2 university competitions).",
      "Established hierarchy, technical culture, and future vision as a tech startup.",
      "Coached members through hands-on learning and competition delivery.",
    ],
    category: "Leadership",
    tech: ["AI", "Robotics", "IoT", "Embedded Systems", "Team Leadership"],
  },
  {
    company: "Revive Team",
    role: "Head of Software",
    dates: "Aug 2024 — Mar 2025",
    location: "Daqahiliya, Egypt",
    summary:
      "Led software development initiatives and team management for a multidisciplinary engineering team.",
    bullets: [
      "Owned software roadmap, code review, and delivery.",
      "Mentored engineers and shipped competition-ready software builds.",
    ],
    category: "Leadership",
    tech: ["Software Architecture", "Team Leadership"],
  },
  {
    company: "Entrepreneurship Rally — Mansoura University Society",
    role: "Vice President",
    dates: "Dec 2023 — Mar 2025",
    location: "Daqahiliya, Egypt",
    summary:
      "Previously Entrepreneurs Development Director, now leading entrepreneurship initiatives.",
    bullets: [
      "Organized workshops with industry experts on strategy, innovation, and market analysis.",
      "Expanded outreach and deepened university-wide impact.",
      "Implemented performance evaluation mechanisms for continuous improvement.",
    ],
    category: "Leadership",
    tech: ["Program Management", "Workshop Facilitation"],
  },
  {
    company: "Hult Prize Mansoura University Campus",
    role: "PR/FR Director",
    dates: "Nov 2024 — Mar 2025",
    location: "Daqahiliya, Egypt",
    summary: "Managing public and foreign relations for Hult Prize events.",
    bullets: [
      "Coordinated speaker engagement, sponsorship, and external comms.",
      "Drove attendance and program visibility on campus.",
    ],
    category: "Leadership",
    tech: ["PR", "Communications"],
  },
  {
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    role: "Mobile App Development Graduate",
    dates: "Mar 2024 — Dec 2024",
    location: "Remote",
    summary:
      "Specialized training in mobile application development across native and cross-platform stacks.",
    bullets: [
      "Built cross-platform apps in Flutter/Dart and native Android.",
      "Project-based curriculum culminating in deployable apps.",
    ],
    category: "Internship",
    tech: ["Flutter", "Dart", "Java", "Kotlin"],
  },
  {
    company: "Startup Grind Mansoura Chapter",
    role: "Team Manager & People & Culture Director",
    dates: "Apr 2024 — Sep 2024",
    location: "Daqahiliya, Egypt",
    summary:
      "Led team operations and managed organizational culture for the local chapter.",
    bullets: [
      "Owned hiring funnel and onboarding for new members.",
      "Built a culture-first operating cadence across teams.",
    ],
    category: "Leadership",
    tech: ["Operations", "People Management"],
  },
  {
    company: "IMT School",
    role: "Embedded Systems Intern",
    dates: "Sep 2023 — Apr 2024",
    location: "Egypt",
    summary:
      "Hands-on experience in embedded systems development across MCUs and peripherals.",
    bullets: [
      "Worked on bare-metal C with sensor interfacing.",
      "Lab-based projects with industry-relevant tooling.",
    ],
    category: "Internship",
    tech: ["Embedded C", "MCU", "Sensors"],
  },
  {
    company: "Siemens & Eitsal NGO",
    role: "Embedded Automotive Intern",
    dates: "Oct 2023 — Dec 2023",
    location: "Egypt",
    summary: "Specialized internship in automotive embedded systems.",
    bullets: [
      "Studied AUTOSAR concepts and automotive comms (CAN/LIN).",
      "Built mini-projects mapping to real ECU patterns.",
    ],
    category: "Internship",
    tech: ["AUTOSAR", "Automotive", "CAN", "LIN"],
  },
  {
    company: "National Telecommunications Institute (NTI)",
    role: "AI & IoT Intern",
    dates: "Jan 2023 — Mar 2023",
    location: "Cairo, Egypt · Remote",
    summary:
      "Worked on artificial intelligence and Internet of Things projects.",
    bullets: [
      "Built supervised and unsupervised ML models from scratch.",
      "Developed neural network models across several applied projects.",
      "Explored IoT via Node.js and Cisco Packet Tracer.",
      "Collaborated on a deep neural network for facial emotion recognition.",
    ],
    category: "Internship",
    tech: ["Python", "TensorFlow", "Node.js", "Cisco Packet Tracer"],
  },
  {
    company: "Octware",
    role: "Founder",
    dates: "Jan 2022 — Present",
    current: true,
    location: "Egypt",
    summary:
      "Founded Octware to empower students in AI and Data Science with structured learning paths.",
    bullets: [
      "Defined program tracks and curated AI/DS learning material.",
      "Built community-first delivery model for sustained learning.",
    ],
    category: "Leadership",
    tech: ["AI", "Data Science", "Community"],
  },
];

// ── Projects ─────────────────────────────────────────────────────────
export type Project = {
  title: string;
  shortTitle: string;
  role: string;
  tagline: string;
  description: string;
  tech: string[];
  outcomes: string;
  metrics?: string;
  repo?: string;
  demo?: string;
  featured: boolean;
  gradient: { from: string; via?: string; to: string };
  details: {
    problem: string;
    approach: string;
    results: string;
  };
};

export const PROJECTS: Project[] = [
  {
    title: "Modular Smart Transportation System using SDV",
    shortTitle: "SDV Platform",
    role: "Project Lead",
    tagline: "Software-Defined Vehicle for Smart Cities",
    description:
      "Graduation project: a Software-Defined Vehicle integrating AI, IoT, and embedded systems for autonomous urban mobility.",
    tech: ["YOLOv8", "OpenCV", "Raspberry Pi 5", "Kinect", "ESP32", "V2X", "Flutter"],
    outcomes:
      "End-to-end SDV: ADAS modules (object/lane/distance/sign), real-time perception, V2X mesh, and a ride-booking app prototype.",
    metrics: "ADAS · V2V/V2I/V2X · OTA-ready",
    repo: "https://github.com/mmtrabya",
    featured: true,
    gradient: { from: "#ef4444", via: "#f97316", to: "#fbbf24" },
    details: {
      problem:
        "Modern urban mobility needs vehicles that perceive, communicate, and update themselves — but most prototypes silo perception, comms, and apps.",
      approach:
        "Built a modular SDV on Raspberry Pi 5 with YOLOv8 + OpenCV ADAS, sensor fusion (Kinect + IMU + GPS + ultrasonic), ESP32-based V2V/V2I/V2X mesh, and a Flutter ride-booking app interfacing with transportation hubs.",
      results:
        "Demonstrated lane/object/sign/distance detection and connected-vehicle workflows. Architecture supports future EV integration, V2G, and LiDAR perception.",
    },
  },
  {
    title: "DevOps Microservices Pipeline — Voting App",
    shortTitle: "Voting App",
    role: "Team Lead (selected by Sprints)",
    tagline: "Cloud-Native Microservices on AWS EKS",
    description:
      "Cloud-native voting app with 5 microservices (Python, Redis, Node.js, .NET, Postgres) deployed via ArgoCD on AWS EKS.",
    tech: [
      "Docker",
      "Kubernetes",
      "ArgoCD",
      "Terraform",
      "AWS EKS",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
    ],
    outcomes:
      "Fault-tolerant, scalable DevOps architecture supporting 5+ microservices with observability and IaC.",
    metrics: "5 services · GitOps · IaC",
    repo: "https://github.com/mmtrabya/Voting-App-Microservices-DevOps",
    featured: true,
    gradient: { from: "#fbbf24", via: "#dc2626", to: "#7f1d1d" },
    details: {
      problem:
        "Multi-language microservices apps drift between dev and prod without proper IaC, GitOps, and observability.",
      approach:
        "Containerized each service, wrote a GitHub Actions pipeline for build/push, used ArgoCD for GitOps-style deploy on EKS, and provisioned EKS + Route53 + storage via Terraform. Added Prometheus/Grafana for SLOs.",
      results:
        "Reproducible cluster bring-up, declarative deploys, end-to-end metrics and logs across 5 services.",
    },
  },
  {
    title: "SLAM Nurse Robot — Hospital Autonomous Delivery",
    shortTitle: "Nurse Bot",
    role: "Software Lead",
    tagline: "ROS2 Mobile Robot for Clinical Settings",
    description:
      "ROS2 Humble mobile nurse robot doing real-time SLAM, path planning, and obstacle avoidance for hospital wards.",
    tech: ["ROS2 Humble", "SLAM", "Nav2", "Raspberry Pi", "Python", "C++"],
    outcomes:
      "Real-time mapping/localization and safe navigation in clinical-style environments.",
    metrics: "SLAM · Nav2 · Real-time",
    repo: "https://github.com/mmtrabya/autords",
    featured: true,
    gradient: { from: "#94a3b8", via: "#475569", to: "#ef4444" },
    details: {
      problem:
        "Hospital staff lose hours moving supplies between rooms — but robotic delivery requires safe, deterministic navigation in a dynamic environment.",
      approach:
        "Built on ROS2 Humble with SLAM for mapping + AMCL for localization, the Nav2 stack for planning, and a Raspberry Pi handling sensors and real-time control.",
      results:
        "Validated obstacle avoidance and efficient navigation across test layouts; documented for future expansion.",
    },
  },
  {
    title: "Job Harvest — Job Aggregator with NLP",
    shortTitle: "Job Harvest",
    role: "Developer",
    tagline: "Bilingual NLP Job Discovery",
    description:
      "Bilingual (AR/EN) job aggregator using web scraping + a fine-tuned T5 summarizer to rank job relevance.",
    tech: [
      "BeautifulSoup",
      "Selenium",
      "Pandas",
      "T5",
      "Google Translate API",
      "TypeScript",
      "Supabase",
    ],
    outcomes:
      "Single search surface across multiple portals with AR/EN support and relevance summarization.",
    metrics: "AR/EN · T5 fine-tune",
    repo: "https://github.com/mmtrabya/Job-Hunting-WebScraping",
    featured: false,
    gradient: { from: "#fbbf24", via: "#f59e0b", to: "#dc2626" },
    details: {
      problem:
        "Job listings are fragmented across portals and language barriers make discovery harder for bilingual users.",
      approach:
        "Scraped listings via BS4 + Selenium, ran a T5 fine-tune for summarization + relevance, integrated Google Translate API for AR/EN parity, and shipped a TS frontend on Supabase.",
      results:
        "Unified search experience with summarized job descriptions and bilingual access.",
    },
  },
  {
    title: "ResNet50 Plant Disease Detection",
    shortTitle: "PlantNet",
    role: "Developer",
    tagline: "Transfer Learning for Agritech",
    description:
      "Transfer-learned ResNet50 classifier for plant disease detection from leaf images.",
    tech: ["PyTorch", "ResNet50", "Transfer Learning", "OpenCV"],
    outcomes:
      "Solid classification baseline across multiple disease classes with reproducible training pipeline.",
    metrics: "ResNet50 · PyTorch",
    repo: "https://github.com/mmtrabya/ResNet50_Plant_Disease_Detection",
    featured: false,
    gradient: { from: "#fde047", via: "#fbbf24", to: "#b45309" },
    details: {
      problem:
        "Smallholder farmers need fast, accurate disease detection without sending samples to a lab.",
      approach:
        "Fine-tuned ResNet50 on a curated leaf-image dataset with standard augmentation and a clean training loop.",
      results:
        "Reproducible classifier with documented metrics; portable to edge inference.",
    },
  },
  {
    title: "Apache Spark Recommender (MovieLens)",
    shortTitle: "Spark Reco",
    role: "Developer",
    tagline: "Distributed ALS Recommender",
    description:
      "Movie recommender on Apache Spark using ALS over the MovieLens dataset.",
    tech: ["Apache Spark", "PySpark", "ALS", "MovieLens"],
    outcomes:
      "Scalable batch recommender with clean evaluation harness and reproducible Spark job.",
    metrics: "PySpark · ALS",
    repo: "https://github.com/mmtrabya/Apache-Recommender-MovieLens",
    featured: false,
    gradient: { from: "#ef4444", via: "#dc2626", to: "#94a3b8" },
    details: {
      problem:
        "Naive recommenders break at scale; Spark + ALS is the canonical way to handle large interaction matrices.",
      approach:
        "Built ALS-based recommender with PySpark, tuned regularization/rank, evaluated with RMSE and top-k metrics.",
      results: "Reproducible Spark job ready to scale on a real cluster.",
    },
  },
];

// ── Education ────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    school: "Mansoura University",
    schoolUrl: "https://www.mans.edu.eg/en",
    degree: "B.Sc. in Artificial Intelligence Engineering",
    year: "Sep 2021 — Feb 2026",
    gpa: "3.47/4.00 (B+)",
    details:
      "Coursework: ML Specialization, Neural Networks & Deep Learning, Embedded Systems Diploma, MATLAB Onramp.",
  },
];

// ── Awards / Achievements ───────────────────────────────────────────
export type Award = {
  title: string;
  issuer: string;
  year: string;
  details: string;
  category: "Competition" | "Student Activities" | "Award";
};

export const AWARDS: Award[] = [
  {
    title: "1st Place — MOYS Incubation",
    issuer: "Ministry of Youth & Sports (Egypt)",
    year: "2024",
    details:
      "Continuing the Shot-Bot 106 journey, the team qualified among 20 finalists from 87 applicants in an incubation sponsored by the Minister of Youth & Sports. Won 1st place + 200K EGP grand prize to develop and fabricate a basketball-game-changing system. Project delivered under student activity teams Connectors & Luminous.",
    category: "Competition",
  },
  {
    title: "1st Place — Faculty Ideal Student 2025–2026",
    issuer: "Faculty of Engineering, Mansoura University",
    year: "2025",
    details:
      "Earned first place at the faculty’s Ideal Student competition and qualified for the University Ideal Student Finals.",
    category: "Award",
  },
  {
    title: "2nd Place — University Ideal Student 2025–2026",
    issuer: "Mansoura University",
    year: "2025",
    details:
      "Placed 2nd at the university-wide Ideal Student finals — recognized for academic excellence and leadership impact across multiple student bodies.",
    category: "Award",
  },
  {
    title: "3rd Place — Benha University Hackathon",
    issuer: "Benha University",
    year: "2024",
    details:
      "Team-led the Shot-Bot 106 project (Connectors & Luminous) and finished 3rd out of 30 finalist teams (filtered from 195 applicants). Took 3rd in the Health & Sports track and 3rd overall, in “Empowering People of Determination”.",
    category: "Competition",
  },
  {
    title: "Two-Time Best Student in Student Activities",
    issuer: "Mansoura University",
    year: "2022 & 2023",
    details:
      "Recognized two consecutive years for impact and leadership across student activity teams.",
    category: "Student Activities",
  },
];

// ── Certifications (full canonical list) ────────────────────────────
export type Certification = {
  title: string;
  issuer: string;
  certificateId?: string;
  issueDate?: string;
  expiryDate?: string;
  url?: string;
};

export const CERTIFICATIONS: Certification[] = [
  {
    title: "AI Engineer for Developers Associate",
    issuer: "DataCamp",
    certificateId: "AIEDA0010823571054",
    issueDate: "Nov 2025",
    expiryDate: "Nov 2027",
    url: "https://www.datacamp.com/certificate/AIEDA0010823571054",
  },
  {
    title: "OCI 2025 Certified Data Science Professional",
    issuer: "Oracle",
    certificateId: "102243857OCI25DSOCP",
    issueDate: "Oct 2025",
    expiryDate: "Oct 2027",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=81FB40829F4C7EEF56E6C38C7A23986A572F816ED5123BE8B992CE4F9A6C61F3",
  },
  {
    title: "OCI 2025 Certified DevOps Professional",
    issuer: "Oracle",
    certificateId: "102243857OCI25DOPOCP",
    issueDate: "Oct 2025",
    expiryDate: "Oct 2027",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=81FB40829F4C7EEF56E6C38C7A23986A8D78445669041E2FCB338E4332F9ABE1",
  },
  {
    title: "Rowad 2025 Internship Program — DevOps Engineering",
    issuer: "Sprints",
    certificateId: "ID - SPR - B88G97",
    issueDate: "Sep 2025",
    url: "https://sprints.ai/en-eg/journeys/learning/1344/90179401/view-certificate",
  },
  {
    title: "OCI 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    certificateId: "102243857OCI25AICFA",
    issueDate: "Aug 2025",
    expiryDate: "Aug 2027",
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=B14FB52D0DD5584D2F269DE2563087414AA1A2C3570F7CC37E6D0FA52CBFD455",
  },
  {
    title: "Delivering Quality Work with Agility",
    issuer: "IBM",
    certificateId: "WZL56QUCW4SX",
    url: "https://www.coursera.org/account/accomplishments/verify/WZL56QUCW4SX",
  },
  {
    title: "Process Data from Dirty to Clean",
    issuer: "Google",
    certificateId: "D535FCSSH6XV",
    url: "https://www.coursera.org/account/accomplishments/certificate/D535FCSSH6XV",
  },
  {
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    certificateId: "B24SQFG7QHNA",
    url: "https://www.coursera.org/account/accomplishments/certificate/B24SQFG7QHNA",
  },
  {
    title: "Ask Questions to Make Data-Driven Decisions",
    issuer: "Google",
    certificateId: "AFXKTVJWMUPB",
    url: "https://www.coursera.org/account/accomplishments/certificate/AFXKTVJWMUPB",
  },
  {
    title: "Foundations: Data, Data, Everywhere",
    issuer: "Google",
    certificateId: "S95Z4CZB25DK",
    url: "https://www.coursera.org/account/accomplishments/certificate/S95Z4CZB25DK",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI",
    certificateId: "AFY4A5CCEYPL",
    url: "https://www.coursera.org/account/accomplishments/specialization/certificate/AFY4A5CCEYPL",
  },
  {
    title: "Unsupervised Learning, Recommenders, Reinforcement Learning",
    issuer: "DeepLearning.AI",
    certificateId: "EZQEF78NXEGD",
    url: "https://www.coursera.org/account/accomplishments/certificate/EZQEF78NXEGD",
  },
  {
    title: "AI & IoT",
    issuer: "NTI",
    certificateId: "99362",
    url: "https://drive.google.com/file/d/11HnEeAn_oEbjjsR3tSdy8yFZiYtjemdj/view",
  },
  {
    title: "Advanced Learning Algorithms",
    issuer: "DeepLearning.AI",
    certificateId: "W3JWRXYCHVL6",
    url: "https://www.coursera.org/account/accomplishments/certificate/W3JWRXYCHVL6",
  },
  {
    title: "Python Problem Solving (Basic)",
    issuer: "HackerRank",
    certificateId: "11dde0b20397",
    url: "https://www.hackerrank.com/Certificates/11dde0b20397",
  },
  {
    title: "Supervised Machine Learning: Regression and Classification",
    issuer: "DeepLearning.AI",
    certificateId: "N8W9TU7DX3LY",
    url: "https://www.coursera.org/account/accomplishments/certificate/N8W9TU7DX3LY",
  },
  {
    title: "MATLAB Fundamentals",
    issuer: "MATLAB Academy",
    certificateId: "81bee6e8-ce51-4699-91d8-13c810a1e459",
    url: "https://matlabacademy.mathworks.com/progress/share/certificate.html?id=81bee6e8-ce51-4699-91d8-13c810a1e459&",
  },
  {
    title: "Data Analysis Challenger Track",
    issuer: "Udacity",
    certificateId: "GTKUZKPU",
    url: "https://drive.google.com/file/d/1Vid8RjyOg_47Onnk3rJiMIm6EiWRFfFq/view",
  },
  {
    title: "Embedded Automotive & Electronics",
    issuer: "Siemens & Eitsal",
    url: "https://drive.google.com/file/d/1-oCmtE1rDb392pfimXRo4nRD9CIBEIew/view",
  },
  {
    title: "Machine Learning Nanodegree",
    issuer: "Udemy",
    certificateId: "UC-703d4974-f3ea-425b-89c1-dae173f125cc",
    url: "https://www.udemy.com/certificate/UC-703d4974-f3ea-425b-89c1-dae173f125cc/",
  },
  {
    title: "IELTS Academic — Band 7.0",
    issuer: "British Council",
    issueDate: "2024",
  },
];

// ── Testimonials (real, from your data) ─────────────────────────────
export type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I have had the opportunity to observe Mohammed Tarabay’s work in Machine Learning, Embedded Systems, and Mobile Application Development. His deep understanding of these fields, coupled with his evident passion and dedication, is truly remarkable. He consistently demonstrates a strong work ethic and a commitment to producing high-quality results. I am confident that Mohammed Tarabay would be a valuable asset to any team.",
    name: "Mohammed Wael Elsamman",
    title: "Data Engineer, DEPI Graduate",
  },
  {
    quote:
      "During the Benha University Hackathon, despite being a competitor, his technical expertise and collaborative spirit stood out. Mohammed supported us in our project, Roaia, providing valuable insights into Embedded Systems that helped us integrate hardware like the Raspberry Pi and sensors effectively. Achieving third place out of two hundred teams highlights his exceptional skills and dedication to innovation. We were truly delighted and honored to work with him.",
    name: "Shehab Lotfallah",
    title: "Software Engineer · .NET / ASP.NET Core / MVC / API",
  },
  {
    quote:
      "Mohammed has helped us at Startup Grind building our community, organized our team and circles properly as People & Culture Director and Team Manager. He is a great leader and high-value person, helping the members and directors connect better and understand each other.",
    name: "Alaa Fawzy",
    title: "Video Editor · Media Director @ Startup Grind Mansoura Chapter",
  },
  {
    quote:
      "You have shown remarkable dedication and effort in your studies — it’s truly inspiring. You have such a creative mind. Your input is always valuable, your collaboration skills are outstanding, and you never give up, even when things get tough. Wishing you a thriving career and endless opportunities for growth.",
    name: "Hager Hamdy",
    title: "Teaching Assistant",
  },
  {
    quote:
      "I had the pleasure of working with Mohammed Tarabay during my second graduation project (Nixbot), where his dedication and technical skills in ROS2 and Ubuntu were truly remarkable. He worked with us during a stressful, challenging period, consistently going above and beyond to support the team. His contributions were instrumental in helping us navigate areas we were unfamiliar with.",
    name: "Rouida Elmorshidy",
    title: "Biomedical Engineer",
  },
  {
    quote:
      "Tarabay is truly exceptional. His professionalism, dedication, and expertise consistently exceed expectations. He has a remarkable ability to deliver results with both precision and creativity. What stands out most is his genuine passion for problem-solving, which inspires everyone around him. I wholeheartedly recommend him to anyone seeking a visionary leader, dependable collaborator, and innovative thinker.",
    name: "Mostafa Nasser",
    title: "Mechanical Engineer · Startup Grind Mansoura Chapter Director",
  },
];

// ── Navigation order (mirrors rW) ────────────────────────────────────
export const NAV_ITEMS: { id: string; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub" },
  { id: "education", label: "Education" },
  { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact" },
];
