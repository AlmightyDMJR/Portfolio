import { motion } from 'motion/react';
import FlipWords from './FlipWords';

const words = ['Scalable', 'Modern', 'Secure'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.7, ease: 'easeOut' },
});

const HeroText = () => {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col items-start gap-2 absolute left-0 top-1/2 -translate-y-1/2 z-10 max-w-xl">
        <motion.p
          className="text-neutral-400 text-lg font-light tracking-widest uppercase"
          {...fadeUp(1.0)}
        >
          Hi, I&apos;m Diganta Mukherjee
        </motion.p>

        <motion.h1
          className="text-heading text-white leading-tight"
          {...fadeUp(1.2)}
        >
          A Full Stack Software Engineer
        </motion.h1>

        <motion.div
          className="text-heading font-bold leading-tight"
          style={{
            background: 'linear-gradient(135deg, #7a57db, #33c2cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          {...fadeUp(1.4)}
        >
          <FlipWords words={words} duration={3000} />
        </motion.div>

        <motion.p
          className="text-heading text-white leading-tight"
          {...fadeUp(1.6)}
        >
          Web Solutions
        </motion.p>

        <motion.p
          className="subtext max-w-sm mt-2"
          {...fadeUp(1.8)}
        >
          Specializing in AI-powered applications, scalable web platforms, and modern user experiences.
        </motion.p>

        <motion.div
          className="flex gap-4 mt-4"
          {...fadeUp(2.0)}
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(135deg, #5c33cc, #7a57db)',
              boxShadow: '0 0 20px rgba(92, 51, 204, 0.4)',
            }}
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full text-sm font-semibold text-neutral-300 border border-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-1"
          >
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Mobile Layout */}
      <div className="flex md:hidden flex-col items-center text-center gap-2 absolute bottom-28 left-0 right-0 z-10 px-5">
        <motion.p
          className="text-neutral-400 text-sm font-light tracking-widest uppercase"
          {...fadeUp(0.5)}
        >
          Hi, I&apos;m Diganta Mukherjee
        </motion.p>

        <motion.h1
          className="text-2xl font-bold text-white leading-tight"
          {...fadeUp(0.7)}
        >
          A Full Stack Software Engineer
        </motion.h1>

        <motion.div
          className="text-2xl font-bold leading-tight"
          style={{
            background: 'linear-gradient(135deg, #7a57db, #33c2cc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
          {...fadeUp(0.9)}
        >
          <FlipWords words={words} duration={3000} />
        </motion.div>

        <motion.p
          className="text-2xl font-bold text-white leading-tight"
          {...fadeUp(1.1)}
        >
          Web Solutions
        </motion.p>

        <motion.div
          className="flex gap-3 mt-3"
          {...fadeUp(1.3)}
        >
          <a
            href="#projects"
            className="px-5 py-2 rounded-full text-xs font-semibold text-white"
            style={{ background: 'linear-gradient(135deg, #5c33cc, #7a57db)' }}
          >
            Projects
          </a>
          <a
            href="#contact"
            className="px-5 py-2 rounded-full text-xs font-semibold text-neutral-300 border border-white/20"
          >
            Contact
          </a>
        </motion.div>
      </div>
    </>
  );
};

export default HeroText;
