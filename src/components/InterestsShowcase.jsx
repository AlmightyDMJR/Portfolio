import { motion } from 'motion/react';
import { interestsCardsData } from '../constants/index.js';
import InterestFlipCard from './InterestFlipCard';

const InterestsShowcase = () => {
  return (
    <div className="w-full mt-14 md:mt-20 mb-14 md:mb-20">
      {/* Subsection Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#57DB96]" />
          <p className="subtext uppercase tracking-widest text-xs font-semibold">
            Curated Passions
          </p>
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Anime, Sports, Music &amp; Gaming
        </h3>
        <p className="subtext mt-2 max-w-2xl text-xs md:text-sm">
          Hover or tap any card to flip and discover my all-time classics, preferred genres, and current obsessions.
        </p>
      </motion.div>

      {/* 4 Cards Side-by-Side Horizontally */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        {interestsCardsData.map((item, index) => (
          <InterestFlipCard
            key={item.id}
            data={item}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

export default InterestsShowcase;
