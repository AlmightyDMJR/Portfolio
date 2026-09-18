import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const springConfig = { stiffness: 260, damping: 24, mass: 0.5 };
const tiltMax = 7.5; // subtle tilt in degrees

const TiltCard = ({
  children,
  className = '',
  innerClassName = '',
  delay = 0,
}) => {
  const cardRef = useRef(null);

  // Normalized mouse coordinates (-0.5 to 0.5)
  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  // Physics-based spring tilt angles:
  // Cursor moves down (mvY > 0) -> card tilts down on X axis (positive rotateX tilts back/down)
  // Cursor moves right (mvX > 0) -> card tilts right on Y axis
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

  const handleMouseLeave = () => {
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
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`w-full h-full pro-card-border rounded-2xl relative overflow-hidden flex flex-col ${innerClassName}`}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Content container */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TiltCard;
