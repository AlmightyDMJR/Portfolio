import React from 'react';

/**
 * OrbitingCircles — arranges children evenly around a circle using CSS animations.
 * 
 * Each child gets an `--angle` and `--radius` CSS var, driven by the `orbit` keyframe.
 * This is a pure CSS animation primitive — no JS animation overhead.
 */
const OrbitingCircles = ({
  children,
  radius = 80,
  duration = 20,
  reverse = false,
  iconSize = 32,
  showGuide = true,
  stroke = 'rgba(0, 0, 0, 0.08)',
}) => {
  const items = React.Children.toArray(children);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Faint circular guide track */}
      {showGuide && (
        <svg
          className="absolute pointer-events-none"
          style={{
            width: radius * 2 + iconSize,
            height: radius * 2 + iconSize,
          }}
        >
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            stroke={stroke}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      {/* Orbiting items */}
      {items.map((child, index) => {
        const angle = (360 / items.length) * index;
        const animationDuration = `${duration}s`;
        const dir = reverse ? 'reverse' : 'normal';

        return (
          <div
            key={index}
            className="absolute flex items-center justify-center rounded-full"
            style={{
              width: iconSize,
              height: iconSize,
              '--angle': angle,
              '--radius': `${radius}px`,
              animation: `orbit ${animationDuration} linear infinite ${dir}`,
              willChange: 'transform',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
};

export default OrbitingCircles;
