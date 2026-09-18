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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEixYEAsmPZsKFmg8awyqpUGmNlK2z8fhTinEiJrRWng4WDU3OLhqj6Sc&s=10',
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
    image: 'https://cpimg.tistatic.com/07865613/b/4/Tender-Information-Service.jpg',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp5uXJTkXW1gPopVjhFj61oV-B1H_2u5_MlBn7ff8PTQ&s=10',
    tags: [
      { id: 1, name: 'Python', path: '/assets/logos/python.svg' },
      { id: 2, name: 'React', path: '/assets/logos/react.svg' },
      { id: 3, name: 'Tailwind', path: '/assets/logos/tailwind.svg' },
      { id: 4, name: 'TensorFlow', path: '/assets/logos/tensorflow.svg' },
    ],
  },
  {
    id: 4,
    title: 'SovereignX',
    year: '2026',
    description:
      'Air-Gapped, On-Premise Agentic AI Workbench for Industrial Enterprises with Multimodal Hybrid RAG and Hardened Code Sandboxing.',
    subDescription: [
      'Architected a Multimodal Hybrid RAG pipeline combining dense text embeddings with ColSmol-500M late-interaction visual retrieval (ColBERT MaxSim) over P&IDs and technical drawings',
      'Engineered a 6-Stage Deterministic Compliance Engine featuring OCR glyph repair, unit normalization, and anti-mirroring mathematical verification across multi-band operating zones',
      'Constructed a Hardened Docker Code Sandbox with zero-egress network isolation (--network none), strict resource quotas, and self-healing retry loops for untrusted Python telemetry analysis',
      'Implemented autonomous multi-model routing with sequential VRAM swapping (<4.0 GB budget) and real-time Sentinel network surveillance guaranteeing zero cloud egress',
    ],
    href: 'https://github.com/Gintoki006/SovereignX',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX86o6mgBl2w_vcj4D_LrWPCBK4BGInX-xPJodg5j5tg&s=10',
    tags: [
      { id: 1, name: 'FastAPI', path: '/assets/logos/fastapi.svg' },
      { id: 2, name: 'Next.js', path: '/assets/logos/nextjs.svg' },
      { id: 3, name: 'Docker', path: '/assets/logos/docker.svg' },
      { id: 4, name: 'Qdrant', path: '/assets/logos/qdrant.svg' },
      { id: 5, name: 'Agentic AI', path: '/assets/logos/ai.svg' },
    ],
  },
  {
    id: 5,
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtIsGLqQhoxNh-8Cy4qPenzZ7ZoBXlrz81YJh75Ta8xA&s=10',
    tags: [
      { id: 1, name: 'Next.js', path: '/assets/logos/nextjs.svg' },
      { id: 2, name: 'Prisma', path: '/assets/logos/prisma.svg' },
      { id: 3, name: 'OpenAI API', path: '/assets/logos/openai.svg' },
      { id: 4, name: 'MongoDB', path: '/assets/logos/mongodb.svg' },
    ],
  },
  {
    id: 6,
    title: 'GetEasy',
    year: '2025',
    description:
      'A modern e-commerce marketplace featuring dynamic seller inventory management and one-click WhatsApp order dispatch.',
    subDescription: [
      'Built a full-stack e-commerce marketplace with role-based access for customers and merchant sellers using Next.js and Firebase',
      'Engineered a Seller Dashboard for real-time inventory management, Cloud Storage image uploads, and dynamic product categorization',
      'Implemented instant client-side catalog filtering, search indexing, and a responsive cart system with LocalStorage fallback',
      'Integrated one-click WhatsApp order dispatch generating structured, itemized checkout summaries for direct merchant fulfillment',
    ],
    href: 'https://github.com/AlmightyDMJR/GetEasy',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWOoHXeMdBwwjY9WEOqPLTmQgwMqCdrlLKX4DrxFwpZg&s',
    tags: [
      { id: 1, name: 'Next.js', path: '/assets/logos/nextjs.svg' },
      { id: 2, name: 'React', path: '/assets/logos/react.svg' },
      { id: 3, name: 'Firebase', path: '/assets/logos/firebase.svg' },
      { id: 4, name: 'Tailwind', path: '/assets/logos/tailwind.svg' },
    ],
  },
  {
    id: 7,
    title: 'Mental Health & Wellness',
    year: '2024',
    description:
      'A comprehensive mental health platform featuring Gemini AI mood analysis, real-time community chatrooms, and emergency crisis intervention.',
    subDescription: [
      'Integrated Google Gemini AI for context-aware natural language mood analysis across 50+ emotional indicators and daily trend tracking',
      'Engineered real-time anonymous support chatrooms and peer video spaces using Socket.IO and WebRTC',
      'Constructed an automated crisis detection system with immediate Twilio SMS alerts and localized therapist directory integration',
      'Delivered personalized wellness recommendations, interactive breathing exercises, and guided mindfulness tools',
    ],
    href: 'https://github.com/Gintoki006/Mental-health-app',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhmUQO4lwwXTdPVAGeusAQ_KgWteaMI8W4eoUl9ZG_jw&s=10',
    tags: [
      { id: 1, name: 'React', path: '/assets/logos/react.svg' },
      { id: 2, name: 'Node.js', path: '/assets/logos/nodejs.svg' },
      { id: 3, name: 'Gemini AI', path: '/assets/logos/ai.svg' },
      { id: 4, name: 'MongoDB', path: '/assets/logos/mongodb.svg' },
      { id: 5, name: 'Socket.IO', path: '/assets/logos/socketio.svg' },
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
    title: 'Software Engineer',
    job: 'AiTechGen Technologies Pvt. Ltd.',
    date: 'June 2026 - August 2026',
    contents: [
      'Developed full-stack features using React, Next.js, and MongoDB for multiple clients in Several Internships',
      'Optimized backend databases (Prisma/PostgreSQL) reducing query response times',
      'Built interactive, cinematic UI components using Framer Motion and Three.js',
      'Collaborated closely with product managers to translate business requirements into technical implementations',
    ],
  },
  {
    title: 'Full Stack Software Engineer',
    job: 'Heloix',
    date: 'Aug 2026 — Present',
    contents: [
      'Led the architecture and development of scalable web platforms serving thousands of concurrent users',
      'Integrated AI-powered features across various products, enhancing user experience and automation',
      'Designed and implemented microservices using Node.js, Express, and FastAPI',
      'Worked along with the  junior developers and learnt & established CI/CD pipelines to streamline deployment',
    ],
  },
  
  {
    title: 'Key Achievements & Academics',
    job: 'Continuous Learning',
    date: 'Ongoing',
    contents: [
      'Hackathon Finalist in multiple State-level competitions',
      'Active Open Source Contributor to high-profile React and Node.js repositories',
      'Maintained a top percentile ranking in Competitive Programming on major platforms',
      'Holds multiple certifications in Advanced Cloud Architecture, Agentic AI and Full-Stack Technologies',
    ],
  },
];

export const reviews = [
  {
    id: 1,
    name: 'Ratnesh Jain',
    role: 'Staff Frontend Engineer',
    company: 'AiTechGen Technologies',
    username: '@ratnesh_jain',
    body: 'I have worked with dozens of interns and Diganta stands out for both technical depth and product thinking. Delivered a complex AI integration on time and under budget.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyyrcRqbt9G3vKwIuvMtkHGDzxz0x1TtZz5ftkEzH21iH_mDNnVlQzzve1&s=10',
    href: 'https://www.linkedin.com/in/diganta-mukherjee-a1b31a323/',
  },
  {
    id: 2,
    name: 'Vartika Jain',
    role: 'Senior Software Engineer',
    company: 'Heloix',
    username: '@vartika_jain',
    body: "Diganta is an exceptionally talented software engineer with a strong grasp of modern technologies. His ability to quickly learn and implement new concepts is impressive. During his internship, he consistently delivered high-quality work and demonstrated great potential.",
    img: 'https://media.licdn.com/dms/image/v2/C560BAQGt5Tjyo9V_Xg/company-logo_200_200/company-logo_200_200/0/1630651367756/crazy_for_success_foundation_logo?e=2147483647&v=beta&t=zS-BhXPM0r_c5IJqpFL5NKoLU2MffYTBmNAQ6y5m780',
    href: 'https://linkedin.com',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Principal Product Manager',
    company: 'Yo Forex',
    username: '@priya_pm',
    body: 'Diganta has a strong hold of Tech-Stacks, AI, ML, DS, and good problem-solving skills. He has a very positive attitude throughout the term.',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN8FvPjUnT-cvW-AELUtXtZZXeNTXs_xlohuckUr7AWQ&s=10',
    href: 'https://www.linkedin.com/in/diganta-mukherjee-a1b31a323/',
  }



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
    src: "/assets/leetcode.png",
    alt: "Coding Consistency & Achievement",
  }, 
  {
    id: 2,
    order: 1,
    x: "-160px",
    y: "32px",
    zIndex: 40,
    direction: "left",
    src: "/assets/skillde.png",
    alt: "Hackathon Winners",
  }, 
  {
    id: 3,
    order: 2,
    x: "0px",
    y: "8px",
    zIndex: 30,
    direction: "right",
    src: "/assets/coding-pov.png",
    alt: "Myself",
  },
  {
    id: 4,
    order: 3,
    x: "160px",
    y: "22px",
    zIndex: 20,
    direction: "right",
    src: "/assets/geekathon.png",
    alt: "Hackathon Finalist",
  },
  {
    id: 5,
    order: 4,
    x: "320px",
    y: "44px",
    zIndex: 10,
    direction: "left",
    src: "/assets/setup.png",
    alt: "My Setup",
  },
];

// =============================================================
// INTERESTS & PASSIONS SHOWCASE (Flip & Tilt Cards)
// =============================================================
export const interestsCardsData = [
  {
    id: 'anime',
    category: 'Anime & Movies',
    subtitle: 'Narratives & Artistry',
    iconName: 'Tv',
    accent: {
      bg: 'bg-rose-50',
      border: 'border-rose-200/60',
      text: 'text-rose-600',
      dot: 'bg-rose-500',
      badge: 'bg-rose-50 text-rose-700 border-rose-100',
      glow: 'rgba(244, 63, 94, 0.12)',
    },
    allTimeFavourite: {
      title: 'Attack on Titan & Interstellar',
      detail: 'Intricate storytelling, moral complexity & mind-bending thrillers.',
    },
    genres: ['Psychological Thriller', 'Science Fiction', 'Fantasy - Drama','Slice Of Life', 'Mystery'],
    currentFavourite: {
      title: 'Bleach TYBW',
      
      status: 'Currently Watching',
    },
    quote: 'Drawn to layered narratives, moral ambiguity, and cinematic animation craft.',
  },
  {
    id: 'sports',
    category: 'Sports',
    subtitle: 'Tactics & Endurance',
    iconName: 'Trophy',
    accent: {
      bg: 'bg-amber-50',
      border: 'border-amber-200/60',
      text: 'text-amber-600',
      dot: 'bg-amber-500',
      badge: 'bg-amber-50 text-amber-700 border-amber-100',
      glow: 'rgba(245, 158, 11, 0.12)',
    },
    allTimeFavourite: {
      title: 'Football & Test Cricket',
      detail: `CR7's legacy , Premier League tactical battles and the slow-burn psychological grit of Test cricket.`,
    },
    genres: ['Tactical Football', 'Test Cricket', 'Formula 1', 'Volleyball'],
    currentFavourite: {
      title: 'Formula 1 & UCL',
      
      status: 'Season Active',
    },
    quote: 'Whether on pitch,court,or track - strategy, stamina, and reflexes fuel my energy.',
  },
  {
    id: 'music',
    category: 'Music',
    subtitle: 'Rhythm & Soundscapes',
    iconName: 'Headphones',
    accent: {
      bg: 'bg-cyan-50',
      border: 'border-cyan-200/60',
      text: 'text-cyan-600',
      dot: 'bg-cyan-500',
      badge: 'bg-cyan-50 text-cyan-700 border-cyan-100',
      glow: 'rgba(6, 182, 212, 0.12)',
    },
    allTimeFavourite: {
      title: 'Bruno Mars & Anuv Jain',
      detail: 'Mind-expanding progressive genre-blending concept albums and monumental cinematic scores.',
    },
    genres: ['Hiphop','Progressive Rock', 'Pop - RnB', 'Ambient & Metal'],
    currentFavourite: {
      title: 'Talha Anjum & Joji',
      detail: 'Deep heartbroken and soulful lyricism with eargasmic melodies & production.',
      status: 'On Heavy Repeat',
    },
    quote: 'The sonic architecture setting rhythm and deep mental focus for building systems.',
  },
  {
    id: 'gaming',
    category: 'Gaming',
    subtitle: 'Immersion & Strategy',
    iconName: 'Gamepad2',
    accent: {
      bg: 'bg-purple-50',
      border: 'border-purple-200/60',
      text: 'text-purple-600',
      dot: 'bg-purple-500',
      badge: 'bg-purple-50 text-purple-700 border-purple-100',
      glow: 'rgba(168, 85, 247, 0.12)',
    },
    allTimeFavourite: {
      title: 'Ghost Of Tsushima & Far Cry 3',
      detail: 'Living open worlds, uncompromising character arcs, and cinematic storytelling.',
    },
    genres: ['Story-Driven RPGs', 'Tactical Shooters',  'Open World Builders', 'FPS'],
    currentFavourite: {
      title: 'FC 26 & Valorant',
      
      status: 'Active Quest',
    },
    quote: 'Game design is the highest synergy of software architecture, art & storytelling.',
  },
];

