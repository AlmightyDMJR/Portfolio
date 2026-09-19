import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'motion/react';

const springConfig = { stiffness: 350, damping: 22, mass: 0.08 };
const tiltMax = 7; // subtle tilt in degrees

const glowColorThemes = {
  emerald: {
    colorFrom: '#57db96',
    colorTo: '#10b981',
    shadow: 'group-hover:shadow-[0_0_36px_rgba(87,219,150,0.36),0_12px_28px_rgba(0,0,0,0.2)]',
    baseBorder: 'border-black/30',
    frameBg: 'bg-black',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(87, 219, 150, 0.08) 0%, transparent 75%)',
  },
  amber: {
    colorFrom: '#fbbf24',
    colorTo: '#f59e0b',
    shadow: 'group-hover:shadow-[0_0_32px_rgba(245,158,11,0.32),0_12px_28px_rgba(0,0,0,0.06)]',
    baseBorder: 'border-amber-400/30',
    frameBg: 'bg-[#181105]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 75%)',
  },
  purple: {
    colorFrom: '#c084fc',
    colorTo: '#a855f7',
    shadow: 'group-hover:shadow-[0_0_32px_rgba(168,85,247,0.32),0_12px_28px_rgba(0,0,0,0.06)]',
    baseBorder: 'border-purple-400/30',
    frameBg: 'bg-[#13071c]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(168, 85, 247, 0.08) 0%, transparent 75%)',
  },
  red: {
    colorFrom: '#f87171',
    colorTo: '#ef4444',
    shadow: 'group-hover:shadow-[0_0_32px_rgba(239,68,68,0.32),0_12px_28px_rgba(0,0,0,0.06)]',
    baseBorder: 'border-red-400/30',
    frameBg: 'bg-[#180808]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(239, 68, 68, 0.08) 0%, transparent 75%)',
  },
  cyan: {
    colorFrom: '#22d3ee',
    colorTo: '#06b6d4',
    shadow: 'group-hover:shadow-[0_0_32px_rgba(6,182,212,0.32),0_12px_28px_rgba(0,0,0,0.06)]',
    baseBorder: 'border-cyan-400/30',
    frameBg: 'bg-[#051419]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 75%)',
  },
  blue: {
    colorFrom: '#60a5fa',
    colorTo: '#3b82f6',
    shadow: 'group-hover:shadow-[0_0_32px_rgba(59,130,246,0.32),0_12px_28px_rgba(0,0,0,0.06)]',
    baseBorder: 'border-blue-400/30',
    frameBg: 'bg-[#080e1a]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 75%)',
  },
  indigo: {
    colorFrom: '#818cf8',
    colorTo: '#6366f1',
    shadow: 'group-hover:shadow-[0_0_32px_rgba(99,102,241,0.32),0_12px_28px_rgba(0,0,0,0.06)]',
    baseBorder: 'border-indigo-400/30',
    frameBg: 'bg-[#0c0a1a]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 75%)',
  },
  rose: {
    colorFrom: '#fb7185',
    colorTo: '#f43f5e',
    shadow: 'group-hover:shadow-[0_0_32px_rgba(244,63,94,0.32),0_12px_28px_rgba(0,0,0,0.06)]',
    baseBorder: 'border-rose-400/30',
    frameBg: 'bg-[#18090e]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(244, 63, 94, 0.08) 0%, transparent 75%)',
  },
  slate: {
    colorFrom: '#ffffff',
    colorTo: '#94a3b8',
    shadow: 'group-hover:shadow-[0_0_32px_rgba(203,213,225,0.25),0_12px_28px_rgba(15,23,42,0.4)]',
    baseBorder: 'border-white/[0.12]',
    frameBg: 'bg-[#0c0e14]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(203, 213, 225, 0.08) 0%, transparent 75%)',
  },
  black: {
    colorFrom: '#ffffff',
    colorTo: '#111827',
    shadow: 'group-hover:shadow-[0_0_36px_rgba(0,0,0,0.65),0_12px_28px_rgba(0,0,0,0.35)]',
    baseBorder: 'border-black/40',
    frameBg: 'bg-black',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(17, 24, 39, 0.08) 0%, transparent 75%)',
  },
};

const TiltCard = ({
  children,
  className = '',
  innerClassName = '',
  delay = 0,
  glowColor = 'emerald',
}) => {
  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  // Glare position coordinates in percentages (0% to 100%) - direct transform without extra spring overhead
  const glareX = useTransform(mvX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mvY, [-0.5, 0.5], [0, 100]);

  // Snappy, zero-lag spring tilt angles (critically damped for instantaneous responsive 60fps tracking)
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [tiltMax, -tiltMax]), springConfig);
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-tiltMax, tiltMax]), springConfig);

  // Subtle radial glare gradient template (clean alpha blending, no mix-blend-mode stalls)
  const glareBg = useMotionTemplate`radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.12), transparent 75%)`;

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    setIsHovered(true);
  };

  const handleMouseMove = (e) => {
    if (!rectRef.current && cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    if (!rect || rect.width === 0 || rect.height === 0) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mvX.set(x);
    mvY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rectRef.current = null;
    mvX.set(0);
    mvY.set(0);
  };

  const theme = glowColorThemes[glowColor] || glowColorThemes.emerald;

  return (
    <motion.div
      ref={cardRef}
      className={`relative group ${className}`}
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`w-full h-full rounded-2xl relative overflow-hidden p-[3.5px] ${theme.frameBg} transition-shadow duration-300 ${theme.shadow}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          willChange: isHovered ? 'transform' : 'auto',
          transform: 'translateZ(0)',
        }}
      >
        {/* GPU-Accelerated 360° Circulating Border Beam (Active on Hover, completely tracks full perimeter) */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 card-border-mask-track"
          aria-hidden="true"
        >
          <div
            className="absolute animate-border-beam"
            style={{
              width: '360px',
              height: '360px',
              offsetPath: 'rect(0 auto auto 0 round 16px)',
              offsetAnchor: '50% 50%',
              background: `radial-gradient(circle, #ffffff 0%, ${theme.colorFrom} 30%, ${theme.colorTo} 60%, transparent 75%)`,
            }}
          />
          <div
            className="absolute animate-border-beam"
            style={{
              width: '360px',
              height: '360px',
              offsetPath: 'rect(0 auto auto 0 round 16px)',
              offsetAnchor: '50% 50%',
              animationDelay: '-2.5s',
              background: `radial-gradient(circle, #ffffff 0%, ${theme.colorFrom} 30%, ${theme.colorTo} 60%, transparent 75%)`,
            }}
          />
        </div>

        {/* Static Base Border line */}
        <div
          className={`absolute inset-0 rounded-2xl border ${theme.baseBorder} pointer-events-none z-0`}
          aria-hidden="true"
        />

        {/* Inner Pristine Card Surface with subtle ambient hover glow */}
        <div
          className={`relative z-10 w-full h-full rounded-[12.5px] bg-[#FAFAFA] border border-black/[0.06] overflow-hidden flex flex-col justify-between transition-colors duration-300 ${innerClassName}`}
          style={{
            transform: 'translateZ(0.1px)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Subtle warm ambient hover glow on card body */}
          <div
            className="absolute inset-0 rounded-[12.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            style={{ background: theme.bodyGlow }}
            aria-hidden="true"
          />

          {/* Cursor-tracked radial glare sweep (ambient behind content) */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200"
            style={{
              opacity: isHovered ? 0.2 : 0,
              background: glareBg,
            }}
          />

          <div className="relative z-10 w-full h-full flex flex-col justify-between">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
