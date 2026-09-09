import React from 'react';

/**
 * Marquee — infinite scrolling container.
 * 
 * Duplicates children `repeat` times for a seamless loop effect.
 * Driven by CSS animation, supports horizontal and vertical scroll,
 * pauseOnHover, and reverse direction.
 */
const Marquee = ({
  children,
  className = '',
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  gap = '1rem',
  duration = '50s',
}) => {
  const animation = vertical
    ? (reverse ? 'animate-marquee-vertical' : 'animate-marquee-vertical')
    : (reverse ? 'animate-marquee-reverse' : 'animate-marquee');

  const flexDirection = vertical ? 'flex-col' : 'flex-row';

  return (
    <div
      className={`group flex overflow-hidden ${vertical ? 'flex-col' : 'flex-row'} ${className}`}
      style={{
        '--duration': duration,
        '--gap': gap,
      }}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <div
          key={i}
          className={`flex shrink-0 ${flexDirection} items-center ${animation} ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
          aria-hidden={i > 0}
          style={{ gap }}
        >
          {children}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
