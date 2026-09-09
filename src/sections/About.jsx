import { useRef } from 'react';
import { motion } from 'motion/react';

import Card from '../components/Card';
import Globe from '../components/globe';
import Frameworks from '../components/Frameworks';
import CopyEmailButton from '../components/CopyEmailButton';

const skillChips = [
  { text: 'SOLID',      icon: '🏗️', desc: 'Architecture',   style: { top: '8%',  left: '5%',  rotate: '-5deg' } },
  { text: 'Clean Code', icon: '✨', desc: 'Readability',    style: { top: '28%', left: '48%', rotate: '4deg'  } },
  { text: 'Patterns',   icon: '🔷', desc: 'Design',         style: { top: '58%', left: '12%', rotate: '-3deg' } },
  { text: 'TDD',        icon: '🧪', desc: 'Test First',     style: { top: '12%', left: '62%', rotate: '7deg'  } },
  { text: 'A11y',       icon: '♿', desc: 'Accessibility',  style: { top: '62%', left: '52%', rotate: '-4deg' } },
  { text: 'Performance',icon: '⚡', desc: 'Optimization',   style: { top: '78%', left: '8%',  rotate: '3deg'  } },
  { text: 'DRY',        icon: '🔁', desc: "Don't Repeat",   style: { top: '6%',  left: '32%', rotate: '-2deg' } },
  { text: 'Type Safety',icon: '🛡️', desc: 'TypeScript',     style: { top: '44%', left: '70%', rotate: '6deg'  } },
];

const About = () => {
  const card2Ref = useRef(null);

  return (
    <section id="about" className="section-spacing c-space">
      {/* Section header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="subtext uppercase tracking-widest mb-2">Get to know me</p>
        <h2 className="text-heading">About Me</h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[18rem] gap-4">

        {/* Cell 1 — Intro bio */}
        <motion.div
          className="grid-1 grid-default-color"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="subtext uppercase tracking-widest text-xs mb-1">Full-Stack Developer</p>
              <h3 className="headtext text-white font-bold">Hi, I&apos;m Diganta Mukherjee 👋</h3>
              <p className="subtext mt-3">
                I build world-class, production-quality software. Specializing in full-stack development, AI integration, and modern UI engineering, I turn complex problems into elegant, scalable solutions.
              </p>
              <p className="subtext mt-2">
                My mission is to create cinematic, futuristic, and unforgettable web experiences that drive real product value.
              </p>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-2 mt-4">
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: '#57db96', boxShadow: '0 0 8px #57db96' }}
              />
              <span className="text-sm text-mint font-medium">Available for hire</span>
            </div>
          </div>

          {/* Illustration image */}
          <img
            src="/assets/coding-pov.png"
            alt="Developer coding at night"
            className="absolute -bottom-6 -right-6 h-44 md:h-56 object-contain pointer-events-none opacity-80"
          />
        </motion.div>

        {/* Cell 2 — Draggable skill chips */}
        <motion.div
          ref={card2Ref}
          className="grid-2 grid-default-color"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="h-full relative">
            {/* Background label */}
            <p
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-black tracking-tight opacity-5 pointer-events-none select-none whitespace-nowrap"
            >
              CODE IS CRAFT
            </p>

            <p className="subtext text-xs uppercase tracking-widest mb-2">Drag me!</p>

            {skillChips.map((chip, i) => (
              <Card
                key={i}
                text={chip.text}
                icon={chip.icon}
                desc={chip.desc}
                containerRef={card2Ref}
                style={chip.style}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* Cell 3 — Globe / Timezone */}
        <motion.div
          className="grid-3 grid-black-color"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex gap-4 h-full">
            <div className="flex flex-col justify-center flex-1">
              <p className="subtext text-xs uppercase tracking-widest mb-1">Location</p>
              <h3 className="headtext text-white font-bold text-lg">Kolkata, West Bengal</h3>
              <p className="subtext text-xs mt-2">
                IST (UTC+5:30) — Open to remote collaboration worldwide 🌍
              </p>
              <p className="subtext text-xs mt-1">
                Flexible hours for async teams across time zones.
              </p>
            </div>

            <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 self-center">
              <Globe className="w-full h-full" />
            </div>
          </div>
        </motion.div>

        {/* Cell 4 — CTA / Copy email */}
        <motion.div
          className="grid-4 grid-special-color"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col items-center justify-center h-full text-center gap-4">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              🚀
            </div>
            <div>
              <h3 className="headtext text-white font-bold">Want to collaborate?</h3>
              <p className="text-white/70 text-sm">Let&apos;s build something amazing together.</p>
            </div>
            <CopyEmailButton email="diganta@example.com" />
          </div>
        </motion.div>

        {/* Cell 5 — Tech stack orbit */}
        <motion.div
          className="grid-5 grid-default-color"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex gap-4 h-full">
            <div className="flex flex-col justify-center flex-1 shrink-0">
              <p className="subtext text-xs uppercase tracking-widest mb-1">My Arsenal</p>
              <h3 className="headtext text-white font-bold">Tech Stack</h3>
              <p className="subtext text-xs mt-2">
                React, Next.js, TypeScript, Node.js, Python, MongoDB, and modern AI tools —
                always learning what's next.
              </p>
            </div>

            <div className="flex-1 relative" style={{ minHeight: '200px' }}>
              <Frameworks />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
