import { motion } from 'motion/react';

const Card = ({ text, image, style, containerRef, index = 0 }) => {
  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      dragElastic={0.6}
      whileHover={{ scale: 1.06, zIndex: 50 }}
      whileDrag={{ scale: 1.08, cursor: 'grabbing', zIndex: 60 }}
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: index * 0.08,
        opacity: { duration: 0.3, delay: index * 0.08 },
      }}
      className="absolute cursor-grab select-none"
      style={{ ...style, touchAction: 'none' }}
    >
      {text ? (
        /* ── Text / Skill chip variant ── */
        <motion.div
          className="relative group"
          whileHover="hover"
        >
          {/* Animated border glow on hover */}
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-lg"
            variants={{
              hover: {
                boxShadow: '0 0 0 1px rgba(122,87,219,0.7), 0 4px 20px rgba(122,87,219,0.25)',
              },
            }}
            transition={{ duration: 0.2 }}
          />

          <div
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(22, 26, 49, 0.85)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            {/* Micro shimmer line at top */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(122,87,219,0.6), transparent)',
                borderRadius: '99px',
              }}
            />

            <span
              style={{
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '0.04em',
                color: 'rgba(220,220,240,0.88)',
                fontFamily: "'Funnel Display', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              {text}
            </span>
          </div>
        </motion.div>
      ) : image ? (
        /* ── Image / Icon variant ── */
        <motion.div
          className="relative group"
          whileHover="hover"
        >
          {/* Animated border glow on hover */}
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-xl"
            variants={{
              hover: {
                boxShadow: '0 0 0 1px rgba(122,87,219,0.5), 0 6px 24px rgba(92,51,204,0.3)',
              },
            }}
            transition={{ duration: 0.2 }}
          />

          <div
            style={{
              padding: '10px',
              borderRadius: '12px',
              background: 'rgba(22, 26, 49, 0.9)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Top shimmer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '15%',
                right: '15%',
                height: '1px',
                background: 'linear-gradient(to right, transparent, rgba(122,87,219,0.5), transparent)',
                borderRadius: '99px',
              }}
            />

            <motion.img
              src={image}
              alt=""
              aria-hidden="true"
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
              variants={{ hover: { scale: 1.15, rotate: 5 } }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            />
          </div>
        </motion.div>
      ) : null}
    </motion.div>
  );
};

export default Card;
