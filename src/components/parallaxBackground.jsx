import { useRef } from 'react';
import { useScroll, useSpring, useTransform, motion } from 'motion/react';

const ParallaxBackground = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();

  // Spring config for smooth parallax
  const springConfig = { stiffness: 80, damping: 30, restDelta: 0.001 };

  const smoothY = useSpring(scrollY, springConfig);

  // Different translate rates for each layer
  const skyY = useTransform(smoothY, [0, 1000], [0, -60]);
  const planetsY = useTransform(smoothY, [0, 1000], [0, -120]);
  const mountain1Y = useTransform(smoothY, [0, 1000], [0, -200]);
  const mountain2Y = useTransform(smoothY, [0, 1000], [0, -280]);

  const layers = [
    { src: '/assets/sky.png', style: { y: skyY }, zIndex: 0, opacity: 1 },
    { src: '/assets/planets.png', style: { y: planetsY }, zIndex: 1, opacity: 0.8 },
    { src: '/assets/mountain-1.png', style: { y: mountain1Y }, zIndex: 2, opacity: 0.9 },
    { src: '/assets/mountain-2.png', style: { y: mountain2Y }, zIndex: 3, opacity: 1 },
  ];

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        zIndex: 0,
        maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 95%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 95%)',
      }}
    >
      {layers.map((layer, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          style={{
            zIndex: layer.zIndex,
            ...layer.style,
          }}
        >
          <img
            src={layer.src}
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '120%',
              objectFit: 'cover',
              objectPosition: 'bottom',
              opacity: layer.opacity,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ParallaxBackground;
