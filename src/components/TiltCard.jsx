import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react';

const springConfig = { stiffness: 260, damping: 24, mass: 0.5 };
const tiltMax = 7.5; // subtle tilt in degrees

const TiltCard = ({
  children,
  className = '',
  innerClassName = '',
  delay = 0,
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  // Glare position coordinates in percentages (0% to 100%)
  const glareX = useSpring(useTransform(mvX, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(mvY, [-0.5, 0.5], [0, 100]), springConfig);

  // Physics-based spring tilt angles:
  // Cursor moves down (mvY > 0) -> card tilts down on X axis (positive rotateX tilts back/down)
  // Cursor moves right (mvX > 0) -> card tilts right on Y axis
  const rotateX = useSpring(useTransform(mvY, [-0.5, 0.5], [tiltMax, -tiltMax]), springConfig);
  const rotateY = useSpring(useTransform(mvX, [-0.5, 0.5], [-tiltMax, tiltMax]), springConfig);

  // Subtle radial glare gradient template
  const glareBg = useMotionTemplate`radial-gradient(circle 320px at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.8), transparent 75%)`;

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
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
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
        className={`w-full h-full bg-[#FAFAFA] rounded-2xl border border-[rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(15,15,20,0.04)] hover:shadow-[0_16px_32px_rgba(15,15,20,0.12)] transition-shadow duration-300 relative overflow-hidden flex flex-col ${innerClassName}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cursor-tracked radial glare sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-200"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: glareBg,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Content container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
