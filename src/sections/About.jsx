import { motion } from 'motion/react';

import TiltCard from '../components/TiltCard';
import Globe from '../components/globe';
import Frameworks from '../components/Frameworks';
import CopyEmailButton from '../components/CopyEmailButton';

const corePrinciples = [
  'SOLID',
  'Clean Code',
  'Design Patterns',
  'TDD',
  'Accessibility',
  'Performance',
  'DRY',
  'Type Safety',
];

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
      <div className="grid grid-cols-1 md:grid-cols-6 md:auto-rows-[18.5rem] gap-4">

        {/* Cell 1 — Intro bio */}
        <TiltCard
          className="grid-1"
          innerClassName="p-6 md:p-8 justify-between"
          delay={0}
        >
          <div className="flex flex-col">
            {/* Header: Avatar initials + Role + Name */}
            <div className="flex items-start gap-4 mb-3">
              <div
                className="w-12 h-12 shrink-0 rounded-full bg-[#111827] text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-[0_2px_8px_rgba(15,15,20,0.12)] border border-[#111827] select-none"
                aria-hidden="true"
              >
                DM
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Full-Stack Developer</p>
                <h3 className="text-xl md:text-2xl font-bold text-[#111827] tracking-tight mt-0.5">Diganta Mukherjee</h3>
              </div>
            </div>

            {/* Tight concrete copy (no AI fluff) */}
            <p className="text-[#4B5563] text-sm leading-relaxed mt-2">
              I build production-grade web applications with an emphasis on scalable architecture, clean code, and intuitive user interfaces.
            </p>
            <p className="text-[#4B5563] text-sm leading-relaxed mt-3">
              Specializing in full-stack TypeScript, React, and modern cloud services, I turn complex business requirements into dependable software.
            </p>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-[rgba(0,0,0,0.06)]">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Core Focus</p>
                <p className="text-sm font-semibold text-[#111827] mt-0.5">
                  Full-Stack Architecture <br />
                  Agentic AI <br />
                  DevOps
                </p>
                
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#9CA3AF]">Specialization</p>
                <p className="text-sm font-semibold text-[#111827] mt-0.5">
                  React <br />
                  Next.js <br />
                  TypeScript <br />
                  Node.js <br />
                  MongoDB <br />
                  PostgreSQL <br />
                  Git & GitHub <br />
                  Framer Motion <br />
                  Docker <br />
                  CI/CD Pipelines <br />
                  AWS <br />
                  Kubernetes <br />
                  
                  
                  
                  </p>
              </div>
            </div>
          </div>

          {/* Status badge - Single mint accent #57DB96 */}
          <div className="flex items-center gap-2.5 mt-6 pt-4 border-t border-[rgba(0,0,0,0.06)]">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: '#57DB96' }}
              />
              <span
                className="relative inline-flex rounded-full h-2.5 w-2.5"
                style={{ backgroundColor: '#57DB96' }}
              />
            </span>
            <span className="text-xs font-medium text-[#111827]">Available for hire & select projects</span>
          </div>
        </TiltCard>

        {/* Cell 2 — Core principles badges (Neutral palette) */}
        <TiltCard
          className="grid-2"
          innerClassName="p-6 md:p-7 justify-between"
          delay={0.1}
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-1">Methodology</p>
            <h3 className="text-lg md:text-xl font-bold text-[#111827] tracking-tight">Core Principles</h3>
            <p className="text-xs text-[#6B7280] mt-1 mb-4">Engineering standards that keep codebases maintainable.</p>

            <div className="flex flex-wrap gap-2">
              {corePrinciples.map((label) => (
                <div
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[rgba(0,0,0,0.08)] text-[#374151] text-xs font-medium shadow-[0_1px_2px_rgba(15,15,20,0.03)] hover:border-[rgba(0,0,0,0.18)] hover:text-[#111827] transition-colors select-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </TiltCard>

        {/* Cell 3 — Location / Globe */}
        <TiltCard
          className="grid-3"
          innerClassName="p-6 md:p-7 justify-between"
          delay={0.2}
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
            <CopyEmailButton email="digantamukherjee6@gmail.com" />
          </div>
        </TiltCard>

        {/* Cell 5 — Tech stack orbit */}
        <TiltCard
          className="grid-5"
          innerClassName="p-6 md:p-7 justify-between"
          delay={0.4}
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
