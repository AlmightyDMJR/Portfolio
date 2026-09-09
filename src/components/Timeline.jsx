import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const Timeline = ({ data = [] }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="relative">
      {/* Vertical timeline line */}
      <div
        className="absolute left-6 md:left-[220px] top-0 bottom-0 w-0.5"
        style={{
          background: 'rgba(122, 87, 219, 0.15)',
        }}
      >
        <motion.div
          className="w-full origin-top"
          style={{
            height: lineHeight,
            opacity: lineOpacity,
            background: 'linear-gradient(to bottom, #5c33cc, #33c2cc, transparent)',
          }}
        />
      </div>

      {/* Timeline entries */}
      <div className="space-y-12">
        {data.map((entry, index) => (
          <motion.div
            key={index}
            className="relative flex flex-col md:flex-row gap-6 md:gap-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Left: Date + Role + Company */}
            <div className="md:w-48 shrink-0 pl-14 md:pl-0 md:text-right">
              <p className="text-xs text-neutral-500 mb-1 font-mono">{entry.date}</p>
              <p className="text-sm font-semibold text-white">{entry.title}</p>
              <p className="text-xs text-aqua">{entry.job}</p>
            </div>

            {/* Dot on the line */}
            <div
              className="absolute left-[19px] md:left-[215px] top-1 w-3 h-3 rounded-full border-2 z-10"
              style={{
                background: 'linear-gradient(135deg, #5c33cc, #33c2cc)',
                borderColor: '#030412',
                boxShadow: '0 0 10px rgba(92, 51, 204, 0.6)',
              }}
            />

            {/* Right: Achievement bullets */}
            <div className="flex-1 pl-14 md:pl-0">
              <ul className="space-y-2">
                {entry.contents.map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-300">
                    <span
                      className="mt-1.5 w-1 h-1 rounded-full shrink-0"
                      style={{ background: '#7a57db' }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
