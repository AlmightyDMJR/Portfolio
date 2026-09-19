import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CardStack } from '@/components/ui/card-stack';
import { reviews } from '../constants';

const glowColorThemes = {
  emerald: {
    colorFrom: '#34d399',
    colorTo: '#10b981',
    shadow: 'group-hover:shadow-[0_0_36px_rgba(16,185,129,0.30),0_12px_28px_rgba(0,0,0,0.06)]',
    activeShadow: 'shadow-[0_0_28px_rgba(16,185,129,0.22),0_12px_28px_rgba(0,0,0,0.06)] group-hover:shadow-[0_0_40px_rgba(16,185,129,0.34)]',
    baseBorder: 'border-emerald-400/30',
    frameBg: 'bg-[#051811]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(52, 211, 153, 0.08) 0%, transparent 75%)',
  },
  indigo: {
    colorFrom: '#818cf8',
    colorTo: '#6366f1',
    shadow: 'group-hover:shadow-[0_0_36px_rgba(99,102,241,0.30),0_12px_28px_rgba(0,0,0,0.06)]',
    activeShadow: 'shadow-[0_0_28px_rgba(99,102,241,0.22),0_12px_28px_rgba(0,0,0,0.06)] group-hover:shadow-[0_0_40px_rgba(99,102,241,0.34)]',
    baseBorder: 'border-indigo-400/30',
    frameBg: 'bg-[#0c0a1a]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 75%)',
  },
  cyan: {
    colorFrom: '#22d3ee',
    colorTo: '#06b6d4',
    shadow: 'group-hover:shadow-[0_0_36px_rgba(6,182,212,0.30),0_12px_28px_rgba(0,0,0,0.06)]',
    activeShadow: 'shadow-[0_0_28px_rgba(6,182,212,0.22),0_12px_28px_rgba(0,0,0,0.06)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.34)]',
    baseBorder: 'border-cyan-400/30',
    frameBg: 'bg-[#051419]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(6, 182, 212, 0.08) 0%, transparent 75%)',
  },
  amber: {
    colorFrom: '#fbbf24',
    colorTo: '#f59e0b',
    shadow: 'group-hover:shadow-[0_0_36px_rgba(245,158,11,0.30),0_12px_28px_rgba(0,0,0,0.06)]',
    activeShadow: 'shadow-[0_0_28px_rgba(245,158,11,0.22),0_12px_28px_rgba(0,0,0,0.06)] group-hover:shadow-[0_0_40px_rgba(245,158,11,0.34)]',
    baseBorder: 'border-amber-400/30',
    frameBg: 'bg-[#181105]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 75%)',
  },
  purple: {
    colorFrom: '#c084fc',
    colorTo: '#a855f7',
    shadow: 'group-hover:shadow-[0_0_36px_rgba(168,85,247,0.30),0_12px_28px_rgba(0,0,0,0.06)]',
    activeShadow: 'shadow-[0_0_28px_rgba(168,85,247,0.22),0_12px_28px_rgba(0,0,0,0.06)] group-hover:shadow-[0_0_40px_rgba(168,85,247,0.34)]',
    baseBorder: 'border-purple-400/30',
    frameBg: 'bg-[#13071c]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(168, 85, 247, 0.08) 0%, transparent 75%)',
  },
  slate: {
    colorFrom: '#ffffff',
    colorTo: '#94a3b8',
    shadow: 'group-hover:shadow-[0_0_36px_rgba(203,213,225,0.25),0_12px_28px_rgba(15,23,42,0.4)]',
    activeShadow: 'shadow-[0_0_28px_rgba(203,213,225,0.20),0_12px_28px_rgba(15,23,42,0.4)] group-hover:shadow-[0_0_40px_rgba(203,213,225,0.32)]',
    baseBorder: 'border-white/[0.12]',
    frameBg: 'bg-[#0c0e14]',
    bodyGlow: 'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(203, 213, 225, 0.08) 0%, transparent 75%)',
  },
};

const reviewGlowMap = {
  1: 'emerald', // Ratnesh Jain - AiTechGen Technologies
  2: 'indigo',  // Vartika Jain - Heloix
  3: 'cyan',    // Priya Sharma - Yo Forex
};

const Testimonial = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stackItems = reviews.map((review, idx) => ({
    id: review.id,
    title: review.name,
    description: review.body,
    imageSrc: review.img,
    href: review.href,
    role: review.role,
    company: review.company,
    username: review.username,
    glowColor: review.glowColor || reviewGlowMap[review.id] || ['indigo', 'emerald', 'cyan'][idx % 3],
  }));

  return (
    <section id="testimonials" className="overflow-hidden py-8 md:py-12 mt-6 md:mt-10">
      {/* Section header */}
      <motion.div
        className="c-space mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="subtext uppercase tracking-widest mb-1 text-xs text-[#9CA3AF]">
          Kind words
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          What People Say
        </h2>
        <p className="text-sm text-neutral-400 mt-2 max-w-md mx-auto">
          Feedback from technical leaders and product partners on delivery, architecture, and collaboration.
        </p>
      </motion.div>

      {/* 3D Interactive CardStack Stage */}
      <div className="w-full max-w-4xl mx-auto px-4">
        <CardStack
          items={stackItems}
          initialIndex={0}
          cardWidth={isMobile ? Math.min(340, typeof window !== 'undefined' ? window.innerWidth - 32 : 340) : 560}
          cardHeight={isMobile ? 330 : 295}
          overlap={isMobile ? 0.38 : 0.46}
          spreadDeg={isMobile ? 22 : 36}
          perspectivePx={1200}
          depthPx={isMobile ? 80 : 110}
          tiltXDeg={isMobile ? 5 : 9}
          activeLiftPx={18}
          activeScale={1.02}
          inactiveScale={0.93}
          springStiffness={260}
          springDamping={26}
          loop
          autoAdvance
          intervalMs={3600}
          pauseOnHover
          showDots
          renderCard={(item, { active }) => {
            const theme = glowColorThemes[item.glowColor] || glowColorThemes.indigo;
            return (
              <div
                className={`group relative h-full w-full rounded-2xl p-[3.5px] ${theme.frameBg} transition-all duration-300 ${
                  active ? theme.activeShadow : theme.shadow
                }`}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* GPU-Accelerated 360° Circulating Border Beam (Smooth track around perimeter) */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl overflow-hidden ${
                    active ? 'opacity-90 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-300 z-20 card-border-mask-track`}
                  aria-hidden="true"
                >
                  <div
                    className="absolute animate-border-beam"
                    style={{
                      width: '380px',
                      height: '380px',
                      offsetPath: 'rect(0 auto auto 0 round 16px)',
                      offsetAnchor: '50% 50%',
                      background: `radial-gradient(circle, #ffffff 0%, ${theme.colorFrom} 30%, ${theme.colorTo} 60%, transparent 75%)`,
                    }}
                  />
                  <div
                    className="absolute animate-border-beam"
                    style={{
                      width: '380px',
                      height: '380px',
                      offsetPath: 'rect(0 auto auto 0 round 16px)',
                      offsetAnchor: '50% 50%',
                      animationDelay: '-2.5s',
                      background: `radial-gradient(circle, #ffffff 0%, ${theme.colorFrom} 30%, ${theme.colorTo} 60%, transparent 75%)`,
                    }}
                  />
                </div>

                {/* Static Base Border line in designated theme color */}
                <div
                  className={`absolute inset-0 rounded-2xl border ${theme.baseBorder} pointer-events-none z-0`}
                  aria-hidden="true"
                />

                {/* Inner Pristine Card Surface with subtle ambient hover glow */}
                <div
                  className="relative z-10 w-full h-full rounded-[12.5px] bg-[#FAFAFA] border border-black/[0.06] p-6 md:p-8 flex flex-col justify-between overflow-hidden text-[#111827] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-colors duration-300"
                  style={{
                    transform: 'translateZ(0.1px)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  {/* Subtle warm ambient hover glow on card body */}
                  <div
                    className={`absolute inset-0 rounded-[12.5px] ${
                      active ? 'opacity-60 group-hover:opacity-100' : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity duration-500 pointer-events-none z-0`}
                    style={{ background: theme.bodyGlow }}
                    aria-hidden="true"
                  />

                  {/* Top Row: Author details + Quote mark */}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={item.imageSrc}
                        alt={item.title}
                        className="w-12 h-12 rounded-full object-cover border border-black/[0.08] shadow-[0_2px_6px_rgba(15,15,20,0.06)]"
                        loading="eager"
                      />
                      <div>
                        <h3 className="text-base md:text-lg font-bold text-[#111827] leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs font-medium text-[#6B7280] mt-0.5">
                          {item.role} • {item.company}
                        </p>
                      </div>
                    </div>

                    {/* Quotation icon */}
                    <div
                      className="w-8 h-8 rounded-full bg-black/[0.04] text-[#9CA3AF] flex items-center justify-center shrink-0"
                      aria-hidden="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                    </div>
                  </div>

                  {/* Middle: Testimonial body */}
                  <blockquote className="relative z-10 my-3 text-sm md:text-[15px] leading-relaxed text-[#374151] font-normal">
                    &ldquo;{item.description}&rdquo;
                  </blockquote>

                  {/* Bottom Row: Verified collaboration badge + 5-star rating */}
                  <div className="relative z-10 pt-3 border-t border-[rgba(0,0,0,0.06)] flex items-center justify-between text-xs text-[#9CA3AF]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#57DB96]" />
                      <span className="font-medium text-[#4B5563]">Verified Project Delivery</span>
                    </div>

                    {/* Rating stars */}
                    <div className="flex items-center gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
};

export default Testimonial;
