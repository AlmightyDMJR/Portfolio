import { motion } from 'motion/react';
import {
  Trophy,
  Target,
  Volleyball,
  Zap,
  Flame,
  CircleDot,
  BookOpen,
  Feather,
  Film,
  Sparkles,
} from 'lucide-react';
import { hobbiesData } from '../constants/index.js';
import TiltCard from '../components/TiltCard';
import YouTubeMusicNowPlaying from '../components/YouTubeMusicNowPlaying';
import InterestsShowcase from '../components/InterestsShowcase';

// Icon map for sports
const sportIconMap = {
  Football: Trophy,
  Cricket: Target,
  Volleyball: Volleyball,
  'Formula 1': Zap,
  Badminton: Flame,
  Basketball: CircleDot,
};

// Icon map for off-the-screen items
const offScreenIconMap = {
  Reading: BookOpen,
  Poetry: Feather,
  Cinema: Film,
};

const Hobbies = () => {
  const { sports, offTheScreen, alwaysLearning } = hobbiesData;

  return (
    <section id="hobbies" className="section-spacing c-space">
      {/* Section Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="subtext uppercase tracking-widest mb-2">Beyond the Terminal</p>
        <h2 className="text-heading">Hobbies &amp; Interests</h2>
        <p className="subtext mt-3 max-w-xl">
          What keeps me curious, grounded, and driven when I step away from the keyboard.
        </p>
      </motion.div>

      {/* Bento Grid: Three Hobby Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Sports */}
        <TiltCard
          className="w-full flex"
          innerClassName="p-6 md:p-8 flex-col justify-between"
          delay={0}
          glowColor="amber"
        >
          <div>
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shadow-sm">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block">
                  Competitive &amp; Active
                </span>
                <h3 className="text-xl font-bold text-[#111827] tracking-tight">
                  Sports &amp; Athletics
                </h3>
              </div>
            </div>

            {/* Sports Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {sports.map((sport) => {
                const IconComponent = sportIconMap[sport.name] || Trophy;
                return (
                  <div
                    key={sport.name}
                    className="p-3 rounded-xl bg-white border border-neutral-200/90 hover:border-neutral-400/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-[#111827]">
                        {sport.name}
                      </span>
                      <IconComponent className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#111827] transition-colors" />
                    </div>
                    <span className="text-[11px] text-[#6B7280] leading-tight">
                      {sport.detail}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-[#9CA3AF] mt-6 pt-4 border-t border-black/[0.06]">
            Whether on the pitch, court, or track — strategy, stamina, and quick reflexes fuel my energy.
          </p>
        </TiltCard>

        {/* Card 2: Off the Screen */}
        <TiltCard
          className="w-full flex"
          innerClassName="p-6 md:p-8 flex-col justify-between"
          delay={0.1}
          glowColor="purple"
        >
          <div>
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-600 shadow-sm">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block">
                  Mind &amp; Reflection
                </span>
                <h3 className="text-xl font-bold text-[#111827] tracking-tight">
                  Off the Screen
                </h3>
              </div>
            </div>

            {/* Content list */}
            <div className="flex flex-col gap-3">
              {offTheScreen.map((item) => {
                const IconComponent = offScreenIconMap[item.tag] || BookOpen;
                return (
                  <div
                    key={item.title}
                    className="p-3.5 rounded-xl bg-white border border-neutral-200/90 hover:border-neutral-400/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-[#111827] flex items-center gap-1.5">
                        <IconComponent className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100 shrink-0">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-[#9CA3AF] mt-6 pt-4 border-t border-black/[0.06]">
            Stepping back to ponder philosophical narratives, cinematic craft, and lyrical rhythm.
          </p>
        </TiltCard>

        {/* Card 3: Always Learning */}
        <TiltCard
          className="w-full flex"
          innerClassName="p-6 md:p-8 flex-col justify-between"
          delay={0.2}
          glowColor="emerald"
        >
          <div>
            {/* Card Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF] block">
                  Continuous Evolution
                </span>
                <h3 className="text-xl font-bold text-[#111827] tracking-tight">
                  {alwaysLearning.title}
                </h3>
              </div>
            </div>

            {/* Narrative text */}
            <p className="text-sm text-[#4B5563] leading-relaxed mb-6">
              {alwaysLearning.narrative}
            </p>

            {/* Tech Chips */}
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#9CA3AF] block mb-2.5">
                Current Focus Areas
              </span>
              <div className="flex flex-wrap gap-2">
                {alwaysLearning.chips.map((chip) => (
                  <span
                    key={chip}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white text-[#111827] border border-black/[0.08] shadow-[0_1px_4px_rgba(0,0,0,0.03)] hover:border-emerald-400/50 hover:bg-emerald-50/40 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs text-[#9CA3AF] mt-6 pt-4 border-t border-black/[0.06]">
            Staying at the bleeding edge ensures architectural decisions are future-proof and resilient.
          </p>
        </TiltCard>
      </div>

      {/* YouTube Music Subsection */}
      <YouTubeMusicNowPlaying />

      {/* 4 Interests Flip & Tilt Cards: Anime, Sports, Music, Gaming */}
      <InterestsShowcase />
    </section>
  );
};

export default Hobbies;
