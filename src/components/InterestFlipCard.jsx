import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Tv,
  Trophy,
  Headphones,
  Gamepad2,
  Sparkles,
  RotateCcw,
  Star,
  Tags,
  Radio,
} from 'lucide-react';

const iconMap = {
  Tv,
  Trophy,
  Headphones,
  Gamepad2,
};

const springConfig = { stiffness: 280, damping: 26, mass: 0.5 };
const tiltMax = 8; // degrees

const InterestFlipCard = ({ data, delay = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [tiltMax, -tiltMax]), springConfig);
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-tiltMax, tiltMax]), springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mvX.set(x);
    mvY.set(y);
  };

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    mvX.set(0);
    mvY.set(0);
  };

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const IconComponent = iconMap[data.iconName] || Sparkles;

  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[480px] cursor-pointer select-none group"
      style={{ perspective: 1100 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      aria-label={`${data.category} Card - ${isFlipped ? 'Back Face Details' : 'Front Face'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
    >
      {/* Tilting Container */}
      <motion.div
        className="w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Flipping Container */}
        <motion.div
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
          }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* ========================================================
              FRONT FACE (Initial state)
              ======================================================== */}
          <div
            className="w-full h-full pro-card-border rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-[#FAFAFA]"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-90"
              style={{ backgroundColor: data.accent.glow }}
              aria-hidden="true"
            />

            {/* Front Header */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-11 h-11 rounded-xl ${data.accent.bg} border ${data.accent.border} flex items-center justify-center ${data.accent.text} shadow-sm transition-transform duration-300 group-hover:scale-105`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 border border-neutral-200">
                  {data.category}
                </span>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block">
                {data.subtitle}
              </span>
              <h3 className="text-xl font-bold text-[#111827] tracking-tight mt-0.5">
                {data.category}
              </h3>
            </div>

            {/* Front Middle Visual & Teaser */}
            <div className="my-auto py-2">
              <div className="p-4 rounded-xl bg-white border border-neutral-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                    All-Time Classic
                  </span>
                  <span className={`w-2 h-2 rounded-full ${data.accent.dot}`} />
                </div>
                <p className="text-xs font-bold text-[#111827] leading-snug line-clamp-2">
                  {data.allTimeFavourite.title}
                </p>
                <div className="pt-2 border-t border-black/[0.06] flex items-center justify-between text-[11px] text-[#6B7280]">
                  <span>Status</span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${data.accent.badge}`}>
                    {data.currentFavourite.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Front Footer: Interactive Flip Hint */}
            <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
              <span className="text-[11px] text-[#9CA3AF] font-medium">
                Detailed profile
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 group-hover:bg-[#111827] text-[#4B5563] group-hover:text-white border border-neutral-200/80 transition-all duration-200 shadow-xs">
                <RotateCcw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-[11px] font-semibold">Hover to Flip</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              BACK FACE (Revealed on hover / flip)
              ======================================================== */}
          <div
            className="w-full h-full pro-card-border rounded-2xl p-5 md:p-6 flex flex-col justify-between overflow-hidden bg-[#FAFAFA]"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Ambient Background Glow */}
            <div
              className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full blur-3xl pointer-events-none opacity-60"
              style={{ backgroundColor: data.accent.glow }}
              aria-hidden="true"
            />

            {/* Back Header */}
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg ${data.accent.bg} border ${data.accent.border} flex items-center justify-center ${data.accent.text}`}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-sm font-bold text-[#111827] tracking-tight">
                  {data.category} Tastes
                </h4>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                <RotateCcw className="w-2.5 h-2.5" /> Flipped
              </span>
            </div>

            {/* Back Content: 3 Required Information Blocks */}
            <div className="flex flex-col gap-2.5 my-auto overflow-y-auto pr-0.5">
              {/* 1. All-Time Favourite */}
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className={`w-3.5 h-3.5 ${data.accent.text} fill-current`} />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                    All-Time Favourite
                  </span>
                </div>
                <p className="text-xs font-bold text-[#111827] leading-snug">
                  {data.allTimeFavourite.title}
                </p>
                <p className="text-[11px] text-[#6B7280] leading-tight mt-0.5">
                  {data.allTimeFavourite.detail}
                </p>
              </div>

              {/* 2. My Genre */}
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Tags className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                    My Genre
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {data.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-0.5 rounded-md bg-neutral-50 text-[10px] font-semibold text-[#374151] border border-neutral-200/80"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3. Current Favourite */}
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Radio className={`w-3.5 h-3.5 ${data.accent.text}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF]">
                      Current Favourite
                    </span>
                  </div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${data.accent.badge}`}>
                    {data.currentFavourite.status}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#111827] leading-snug">
                  {data.currentFavourite.title}
                </p>
                <p className="text-[11px] text-[#6B7280] leading-tight mt-0.5">
                  {data.currentFavourite.detail}
                </p>
              </div>
            </div>

            {/* Back Footer: Insight Quote */}
            <div className="pt-2.5 border-t border-black/[0.06]">
              <p className="text-[10.5px] text-[#6B7280] leading-snug italic line-clamp-2">
                &ldquo;{data.quote}&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default InterestFlipCard;
