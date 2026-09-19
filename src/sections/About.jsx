import { motion } from 'motion/react';
import { Target, Cpu, Code2, Wrench, Layers } from 'lucide-react';

import TiltCard from '../components/TiltCard';
import Globe from '../components/globe';
import Frameworks from '../components/Frameworks';
import CopyEmailButton from '../components/CopyEmailButton';

const corePrinciplesData = [
  { name: 'SOLID', color: 'indigo' },
  { name: 'Clean Code', color: 'emerald' },
  { name: 'Design Patterns', color: 'purple' },
  { name: 'TDD', color: 'rose' },
  { name: 'Accessibility', color: 'cyan' },
  { name: 'Performance', color: 'amber' },
  { name: 'DRY', color: 'teal' },
  { name: 'Type Safety', color: 'blue' },
];

// Inside skills data categorized with tailored border-beam theme colors
const coreFocusData = [
  { name: 'Full-Stack Architecture', color: 'emerald' },
  { name: 'Agentic AI & LLMs ', color: 'cyan' },
  { name: 'Cloud Architecture & DevOps', color: 'emerald' },
  { name: 'High-Load Systems', color: 'teal' },
];

const specializationData = [
  { name: 'React & Next.js', color: 'cyan' },
  { name: 'TypeScript', color: 'blue' },
  { name: 'Node.js & Express', color: 'emerald' },
  { name: 'PostgreSQL , Supabase & MongoDB', color: 'purple' },
  { name: 'REST APIs', color: 'rose' },
  { name: 'Framer Motion', color: 'indigo' },
];

const languagesData = [
  { name: 'C', color: 'indigo' },
  { name: 'C++', color: 'blue' },
  { name: 'Python', color: 'amber' },
  { name: 'Java', color: 'rose' },
  { name: 'JavaScript', color: 'amber' },
  { name: 'TypeScript', color: 'cyan' },
];

const toolsData = [
  { name: 'Git & GitHub', color: 'rose' },
  { name: 'GitHub Actions', color: 'indigo' },
  { name: 'Docker', color: 'cyan' },
  { name: 'Kubernetes', color: 'blue' },
  { name: 'AWS', color: 'amber' },
  { name: 'Linux / Bash', color: 'emerald' },
];

// Clean, curated color themes for skill boxes without excessive glow
const colorThemes = {
  emerald: {
    bg: 'bg-emerald-500/[0.08] hover:bg-emerald-500/[0.14]',
    border: 'border-emerald-500/25 hover:border-emerald-500/45',
    text: 'text-emerald-950',
    dot: 'bg-emerald-500',
  },
  cyan: {
    bg: 'bg-cyan-500/[0.08] hover:bg-cyan-500/[0.14]',
    border: 'border-cyan-500/25 hover:border-cyan-500/45',
    text: 'text-cyan-950',
    dot: 'bg-cyan-500',
  },
  blue: {
    bg: 'bg-blue-500/[0.08] hover:bg-blue-500/[0.14]',
    border: 'border-blue-500/25 hover:border-blue-500/45',
    text: 'text-blue-950',
    dot: 'bg-blue-500',
  },
  indigo: {
    bg: 'bg-indigo-500/[0.08] hover:bg-indigo-500/[0.14]',
    border: 'border-indigo-500/25 hover:border-indigo-500/45',
    text: 'text-indigo-950',
    dot: 'bg-indigo-500',
  },
  purple: {
    bg: 'bg-purple-500/[0.08] hover:bg-purple-500/[0.14]',
    border: 'border-purple-500/25 hover:border-purple-500/45',
    text: 'text-purple-950',
    dot: 'bg-purple-500',
  },
  amber: {
    bg: 'bg-amber-500/[0.08] hover:bg-amber-500/[0.14]',
    border: 'border-amber-500/25 hover:border-amber-500/45',
    text: 'text-amber-950',
    dot: 'bg-amber-500',
  },
  rose: {
    bg: 'bg-rose-500/[0.08] hover:bg-rose-500/[0.14]',
    border: 'border-rose-500/25 hover:border-rose-500/45',
    text: 'text-rose-950',
    dot: 'bg-rose-500',
  },
  teal: {
    bg: 'bg-teal-500/[0.08] hover:bg-teal-500/[0.14]',
    border: 'border-teal-500/25 hover:border-teal-500/45',
    text: 'text-teal-950',
    dot: 'bg-teal-500',
  },
};

// Interactive Box Component with simple, clean hovering motion (no excessive glow)
const SkillBox = ({ item, isMono = false, fontClass = '', boxClass = '' }) => {
  const theme = colorThemes[item.color] || colorThemes.emerald;

  const fontStyle = fontClass
    ? fontClass
    : isMono
    ? 'font-mono font-semibold tracking-tight text-[11.5px]'
    : 'font-semibold tracking-tight text-xs';

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -1.5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium cursor-pointer select-none transition-colors duration-200 ${theme.bg} ${theme.border} ${theme.text} ${boxClass}`}
    >
      {/* Clean solid indicator dot */}
      <span
        className={`w-1.5 h-1.5 rounded-full shrink-0 ${theme.dot}`}
      />

      {/* Text label with interactive font */}
      <span className={fontStyle}>
        {item.name.trim()}
      </span>
    </motion.div>
  );
};

const About = () => {
  return (
    <section id="about" className="section-spacing c-space">
      {/* Section header on dark page */}
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
      <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[minmax(19.5rem,auto)] gap-4">

        {/* Cell 1 — Intro bio & Interactive Skill Matrix */}
        <TiltCard
          className="grid-1"
          innerClassName="p-5 md:p-6 justify-between"
          delay={0}
          glowColor="emerald"
        >
          <div className="flex flex-col">
            {/* Header: Avatar initials + Role + Name */}
            <div className="flex items-start gap-3.5 mb-2.5">
              <div
                className="w-11 h-11 shrink-0 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-[0_2px_8px_rgba(15,15,20,0.12)] border border-[#111827] select-none"
                aria-hidden="true"
              >
                DM
              </div>
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Full-Stack Developer</p>
                <h3 className="text-lg md:text-xl font-bold text-[#111827] tracking-tight mt-0.5">Diganta Mukherjee</h3>
              </div>
            </div>

            {/* Tight concrete copy */}
            <p className="text-[#4B5563] text-xs leading-relaxed">
              I build production-grade web applications with scalable architecture, clean code, and intuitive user experiences across modern cloud platforms.
            </p>

            {/* 4 Distinct Category Boxes with Clean Black Borders (No Glow / No Blur) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3.5 border-t border-[rgba(0,0,0,0.06)]">
              {/* Box 1: Core Focus */}
              <div className="rounded-xl border border-black/15 bg-white/70 hover:bg-white hover:border-black p-3 transition-colors duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#111827] mb-2">
                    <Target className="w-3.5 h-3.5 text-[#111827]" />
                    <span>Core Focus</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {coreFocusData.map((item) => (
                      <SkillBox key={item.name} item={item} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Box 2: Specialization */}
              <div className="rounded-xl border border-black/15 bg-white/70 hover:bg-white hover:border-black p-3 transition-colors duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#111827] mb-2">
                    <Cpu className="w-3.5 h-3.5 text-[#111827]" />
                    <span>Specialization</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {specializationData.map((item) => (
                      <SkillBox key={item.name} item={item} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Box 3: Languages */}
              <div className="rounded-xl border border-black/15 bg-white/70 hover:bg-white hover:border-black p-3 transition-colors duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#111827] mb-2">
                    <Code2 className="w-3.5 h-3.5 text-[#111827]" />
                    <span>Languages</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {languagesData.map((item) => (
                      <SkillBox key={item.name} item={item} isMono={true} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Box 4: Tools & DevOps */}
              <div className="rounded-xl border border-black/15 bg-white/70 hover:bg-white hover:border-black p-3 transition-colors duration-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-[#111827] mb-2">
                    <Wrench className="w-3.5 h-3.5 text-[#111827]" />
                    <span>Tools & DevOps</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {toolsData.map((item) => (
                      <SkillBox key={item.name} item={item} isMono={true} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status badge - Single mint accent #57DB96 */}
          <div className="flex items-center gap-2.5 mt-3 pt-2.5 border-t border-[rgba(0,0,0,0.06)]">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: '#57DB96' }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: '#57DB96' }}
              />
            </span>
            <span className="text-[11.5px] font-medium text-[#111827]">Available for hire & select projects</span>
          </div>
        </TiltCard>

        {/* Cell 2 — Core principles badges (Interactive with previous card design) */}
        <TiltCard
          className="grid-2"
          innerClassName="p-5 md:p-6 justify-between flex flex-col"
          delay={0.1}
          glowColor="indigo"
        >
          <div className="flex flex-col">
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <p className="text-[10.5px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Methodology</p>
                <h3 className="text-lg md:text-xl font-bold text-[#111827] tracking-tight mt-0.5">Core Principles</h3>
              </div>
              <div
                className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 flex items-center justify-center shrink-0 shadow-sm"
                aria-hidden="true"
              >
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[#4B5563] text-xs leading-relaxed mb-4">
              Engineering standards and architectural practices that keep production codebases maintainable, testable, and resilient.
            </p>

            {/* Small interactive boxes directly (no outer box) */}
            <div className="flex flex-wrap gap-2.5">
              {corePrinciplesData.map((item) => (
                <SkillBox
                  key={item.name}
                  item={item}
                  fontClass="font-space font-semibold tracking-tight text-[12px]"
                />
              ))}
            </div>
          </div>

          {/* Bottom subtle indicator */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[rgba(0,0,0,0.06)] text-[11px] font-medium text-[#6B7280]">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span>Built for high maintainability & scalable teamwork</span>
          </div>
        </TiltCard>

        {/* Cell 3 — Location / Globe */}
        <TiltCard
          className="grid-3"
          innerClassName="p-6 md:p-7 justify-between"
          delay={0.2}
          glowColor="cyan"
        >
          <div className="flex gap-4 h-full items-center">
            <div className="flex flex-col justify-center flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-1">Location</p>
              <h3 className="text-lg md:text-xl font-bold text-[#111827] tracking-tight">Kolkata, West Bengal</h3>
              <p className="text-xs text-[#4B5563] mt-2 font-medium">
                IST (UTC+5:30) • Remote First
              </p>
              <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                Flexible hours with dedicated async overlap for teams worldwide.
              </p>
            </div>

            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 shrink-0 flex items-center justify-center">
              <Globe className="w-full h-full" />
            </div>
          </div>
        </TiltCard>

        {/* Cell 4 — CTA / Copy email */}
        <TiltCard
          className="grid-4"
          innerClassName="p-6 md:p-7 justify-center items-center text-center"
          delay={0.3}
          glowColor="purple"
        >
          <div className="flex flex-col items-center justify-center gap-3 w-full">
            <div
              className="w-10 h-10 rounded-xl bg-[#111827] text-white flex items-center justify-center shadow-[0_2px_8px_rgba(15,15,20,0.12)] border border-[#111827]"
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#111827]">Want to collaborate?</h3>
              <p className="text-xs text-[#6B7280] mt-1">Let&apos;s build something great together.</p>
            </div>
            <CopyEmailButton email="goddmjr@gmail.com" />
          </div>
        </TiltCard>

        {/* Cell 5 — Tech stack orbit */}
        <TiltCard
          className="grid-5"
          innerClassName="p-6 md:p-7 justify-between"
          delay={0.4}
          glowColor="blue"
        >
          <div className="flex flex-col md:flex-row gap-4 h-full items-center">
            <div className="flex flex-col justify-center flex-1 shrink-0">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-1">Ecosystem</p>
              <h3 className="text-lg md:text-xl font-bold text-[#111827] tracking-tight">Tech Stack</h3>
              <p className="text-xs text-[#4B5563] mt-2 leading-relaxed">
                React, Next.js, TypeScript, Node.js, and cloud ecosystems for reliable end-to-end applications.
              </p>
              <p className="text-xs text-[#6B7280] mt-1 leading-relaxed">
                Continuous adoption of performant tools and modern web standards.
              </p>
            </div>

            <div className="flex-1 relative w-full" style={{ minHeight: '180px' }}>
              <Frameworks />
            </div>
          </div>
        </TiltCard>

      </div>
    </section>
  );
};

export default About;
