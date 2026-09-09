import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const FlipWords = ({ words = [], duration = 3000 }) => {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(words[0] || '');

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);

  useEffect(() => {
    setDisplay(words[index]);
  }, [index, words]);

  const letters = display ? display.split('') : [];

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={display}
          className="inline-flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)', scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {letters.map((letter, i) => (
            <motion.span
              key={`${display}-${i}`}
              className="inline-block"
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: i * 0.04,
                duration: 0.3,
                ease: 'easeOut',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default FlipWords;
