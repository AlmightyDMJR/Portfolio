// =============================================================
// ALL PORTFOLIO CONTENT — Diganta Mukherjee (Version 1.0)
// =============================================================

export const myProjects = [
  {
    id: 1,
    title: 'Sportify',
    year: '2025',
    description:
      'A comprehensive sports management platform designed for live scoring, tournament management, and club dashboards.',
    subDescription: [
      'Engineered live scoring mechanics and real-time updates for tournament management',
      'Developed club dashboards with goal tracking and advanced analytics',
      'Architected a highly scalable backend to handle concurrent live event traffic',
      'Built a modern, responsive UI focused on an engaging sports fan experience',
    ],
    href: 'https://github.com/Gintoki006/Sportify',
    image: '/assets/projects/project1.png',
    tags: [
      { id: 1, name: 'Next.js', path: '/assets/logos/nextjs.svg' },
      { id: 2, name: 'TypeScript', path: '/assets/logos/typescript.svg' },
      { id: 3, name: 'Node.js', path: '/assets/logos/nodejs.svg' },
      { id: 4, name: 'Socket.IO', path: '/assets/logos/socketio.svg' },
    ],
  },
  {
    id: 2,
    title: 'TenderX',
    year: '2025',
    description:
      'An AI-powered Tender Evaluation system that automates document intelligence and scoring.',
    subDescription: [
      'Integrated OCR and Document Intelligence to extract structured data from complex tenders',
      'Implemented an Eligibility Analysis module to quickly filter unqualified bids',
      'Engineered a Scoring Engine powered by AI to evaluate and rank proposals',
      'Significantly reduced manual evaluation time from weeks to hours',
    ],
    href: 'https://github.com/Gintoki006/TenderX',
    image: '/assets/projects/project1.png',
    tags: [
      { id: 1, name: 'Python', path: '/assets/logos/python.svg' },
      { id: 2, name: 'FastAPI', path: '/assets/logos/fastapi.svg' },
      { id: 3, name: 'React', path: '/assets/logos/react.svg' },
      { id: 4, name: 'AI/ML', path: '/assets/logos/ai.svg' },
    ],
  },
  {
    id: 3,
    title: 'Crop Diagnosis',
    year: '2026',
    description:
      'An AI-powered agricultural tool for rapid crop disease detection and tailored recommendations.',
    subDescription: [
      'Trained and deployed image analysis models for accurate crop disease prediction',
      'Generated automated, actionable recommendations based on disease classification',
      'Designed a farmer-friendly UI optimized for low-bandwidth mobile devices',
      'Bridged the gap between cutting-edge AI and practical agricultural needs',
    ],
    href: 'https://github.com/AlmightyDMJR/CropCure',
    image: '/assets/projects/project1.png',
    tags: [
      { id: 1, name: 'Python', path: '/assets/logos/python.svg' },
      { id: 2, name: 'React', path: '/assets/logos/react.svg' },
      { id: 3, name: 'Tailwind', path: '/assets/logos/tailwind.svg' },
      { id: 4, name: 'TensorFlow', path: '/assets/logos/tensorflow.svg' },
    ],
  },
  {
    id: 4,
    title: 'Eventrix',
    year: '2025',
    description:
      'An AI-powered Event Management platform with a Recommendation Engine and RAG Chatbot.',
    subDescription: [
      'Built a Recommendation Engine that matches users to relevant events via Social Feed',
      'Created an innovative "Poster to JSON" feature using vision AI to auto-populate event details',
      'Implemented a RAG (Retrieval-Augmented Generation) Chatbot to answer attendee queries',
      'Developed a comprehensive Institute Dashboard for centralized event orchestration',
    ],
    href: 'https://github.com/Gintoki006/Eventrix',
    image: '/assets/projects/project1.png',
    tags: [
      { id: 1, name: 'Next.js', path: '/assets/logos/nextjs.svg' },
      { id: 2, name: 'Prisma', path: '/assets/logos/prisma.svg' },
      { id: 3, name: 'OpenAI API', path: '/assets/logos/openai.svg' },
      { id: 4, name: 'MongoDB', path: '/assets/logos/mongodb.svg' },
    ],
  },
];

export const mySocials = [
  {
    name: 'GitHub',
    href: 'https://github.com/AlmightyDMJR',
    icon: '/assets/socials/github.svg',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/diganta-mukherjee-a1b31a323/',
    icon: '/assets/socials/linkedin.svg',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/the_almighty_dmjr/',
    icon: '/assets/socials/instagram.svg',
  },
];

export const experiences = [
  {
    title: 'Full Stack Software Engineer',
    job: 'Innovative Tech Solutions',
    date: '2024 — Present',
    contents: [
      'Led the architecture and development of scalable web platforms serving thousands of concurrent users',
      'Integrated AI-powered features across various products, enhancing user experience and automation',
      'Designed and implemented microservices using Node.js, Express, and FastAPI',
      'Mentored junior developers and established CI/CD pipelines to streamline deployment',
    ],
  },
  {
    title: 'Software Engineer',
    job: 'Tech Startup Ecosystem',
    date: '2022 — 2024',
    contents: [
      'Developed full-stack features using React, Next.js, and MongoDB for multiple startup clients',
      'Optimized backend databases (Prisma/PostgreSQL) reducing query response times by 40%',
      'Built interactive, cinematic UI components using Framer Motion and Three.js',
      'Collaborated closely with product managers to translate business requirements into technical implementations',
    ],
  },
  {
    title: 'Key Achievements & Academics',
    job: 'Continuous Learning',
    date: 'Ongoing',
    contents: [
      'Hackathon Finalist in multiple national-level coding competitions',
      'Active Open Source Contributor to high-profile React and Node.js repositories',
      'Maintained a top percentile ranking in Competitive Programming on major platforms',
      'Holds multiple certifications in Advanced Cloud Architecture and AI/ML Engineering',
    ],
  },
];

export const reviews = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Staff Frontend Engineer',
    company: 'NextLayer Labs',
    username: '@sarah_dev',
    body: 'Working with Diganta was an absolute game-changer. The quality of code and attention to performance details is unmatched. Our app is faster and more beautiful than ever.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80',
    href: 'https://linkedin.com',
  },
  {
    id: 2,
    name: 'Marcus Thompson',
    role: 'CTO & Co-Founder',
    company: 'HyperScale AI',
    username: '@marcus_cto',
    body: "I've worked with dozens of developers and Diganta stands out for both technical depth and product thinking. Delivered a complex AI integration on time and under budget.",
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    href: 'https://linkedin.com',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Principal Product Manager',
    company: 'FinFlow Systems',
    username: '@priya_pm',
    body: 'Diganta took our vague product idea and turned it into a polished, production-ready app. The UI animations alone had our investors impressed at the demo.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    href: 'https://linkedin.com',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'VP of Engineering',
    company: 'MetricLayer Data',
    username: '@dkim_eng',
    body: 'The dashboard Diganta built reduced our operational overhead by 40%. Clean system design, great documentation, and an absolute joy to maintain.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    href: 'https://linkedin.com',
  },
  {
    id: 5,
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'CloudPulse Analytics',
    username: '@elena_ceo',
    body: 'Diganta engineered our core platform from concept to launch with flawless execution. Reliable, proactive, and exceptionally skilled across the entire modern stack.',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
    href: 'https://linkedin.com',
  },
];

// Tech stack icons for the orbiting circles
export const techStack = [
  { id: 1, name: 'React', color: '#61dafb', symbol: '⚛' },
  { id: 2, name: 'TypeScript', color: '#3178c6', symbol: 'TS' },
  { id: 3, name: 'Next.js', color: '#ffffff', symbol: '▲' },
  { id: 4, name: 'Node.js', color: '#68a063', symbol: 'N' },
  { id: 5, name: 'Python', color: '#ffd43b', symbol: '🐍' },
  { id: 6, name: 'MongoDB', color: '#47A248', symbol: '🍃' },
  { id: 7, name: 'Docker', color: '#2496ed', symbol: '🐳' },
  { id: 8, name: 'Tailwind', color: '#06B6D4', symbol: '🌊' },
];

// Hobbies and Interests Content Data
export const hobbiesData = {
  sports: [
    { name: 'Football', icon: 'Trophy', detail: 'Tactics & Premier League' },
    { name: 'Cricket', icon: 'Target', detail: 'Strategy & Test Matches' },
    { name: 'Volleyball', icon: 'Activity', detail: 'Agility & Team Dynamics' },
    { name: 'Formula 1', icon: 'Zap', detail: 'Aerodynamics & Race Strategy' },
    { name: 'Badminton', icon: 'Flame', detail: 'Speed & Quick Reflexes' },
    { name: 'Basketball', icon: 'Dribbble', detail: 'Pace & Spatial Awareness' },
  ],
  offTheScreen: [
    {
      title: 'Literature & Philosophy',
      desc: 'Exploring deep existential prose and philosophical fiction from Dostoevsky to Camus and Murakami.',
      tag: 'Reading',
    },
    {
      title: 'Poetry & Expressive Writing',
      desc: 'Appreciating the rhythm of classical and modern verses that condense complex human emotion into words.',
      tag: 'Poetry',
    },
    {
      title: 'Cinema as a Medium',
      desc: 'Dissecting visual storytelling, atmospheric sound design, and auteur direction across global films.',
      tag: 'Cinema',
    },
  ],
  alwaysLearning: {
    title: 'Continuous Craft & Technical Mastery',
    narrative: 'Software engineering is an ever-evolving craft. I dedicate time weekly to exploring emerging distributed paradigms, next-generation AI agent architectures, and bleeding-edge web standards to keep systems resilient and state-of-the-art.',
    chips: ['AI Agents & LLMs', 'Distributed Systems', 'WebGL & Shaders', 'Rust & Systems', 'Cloud Architecture'],
  },
  fallbackTracks: [
    {
      id: 'rL3AgkwbYgo',
      title: 'Time',
      artist: 'Pink Floyd',
      album: 'The Dark Side of the Moon',
      albumArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80',
      ytMusicUrl: 'https://music.youtube.com/watch?v=rL3AgkwbYgo',
      musicUrl: 'https://music.youtube.com/watch?v=rL3AgkwbYgo',
      isPlaying: false,
    },
    {
      id: '34Na4j8AVgA',
      title: 'Starboy',
      artist: 'The Weeknd, Daft Punk',
      album: 'Starboy',
      albumArt: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80',
      ytMusicUrl: 'https://music.youtube.com/watch?v=34Na4j8AVgA',
      musicUrl: 'https://music.youtube.com/watch?v=34Na4j8AVgA',
      isPlaying: true,
    },
    {
      id: '1Vko01DNT44',
      title: 'Cornfield Chase',
      artist: 'Hans Zimmer',
      album: 'Interstellar (Original Motion Picture Soundtrack)',
      albumArt: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80',
      ytMusicUrl: 'https://music.youtube.com/watch?v=1Vko01DNT44',
      musicUrl: 'https://music.youtube.com/watch?v=1Vko01DNT44',
      isPlaying: false,
    },
    {
      id: 'hN_q-_nGv4U',
      title: 'Experience',
      artist: 'Ludovico Einaudi',
      album: 'In a Time Lapse',
      albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=300&q=80',
      ytMusicUrl: 'https://music.youtube.com/watch?v=hN_q-_nGv4U',
      musicUrl: 'https://music.youtube.com/watch?v=hN_q-_nGv4U',
      isPlaying: false,
    },
  ],
};

// =============================================================
// PHOTO GALLERY STORIES (Easily replace images by changing URLs)
// =============================================================
export const galleryPhotos = [
  {
    id: 1,
    order: 0,
    x: "-320px",
    y: "15px",
    zIndex: 50,
    direction: "left",
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    alt: "Collaborative Engineering",
  },
  {
    id: 2,
    order: 1,
    x: "-160px",
    y: "32px",
    zIndex: 40,
    direction: "left",
    src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    alt: "System Design & Coding",
  },
  {
    id: 3,
    order: 2,
    x: "0px",
    y: "8px",
    zIndex: 30,
    direction: "right",
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    alt: "Space & High-Scale Systems",
  },
  {
    id: 4,
    order: 3,
    x: "160px",
    y: "22px",
    zIndex: 20,
    direction: "right",
    src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    alt: "Creative Flow & Music",
  },
  {
    id: 5,
    order: 4,
    x: "320px",
    y: "44px",
    zIndex: 10,
    direction: "left",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
    alt: "Visual Production & Atmosphere",
  },
];

