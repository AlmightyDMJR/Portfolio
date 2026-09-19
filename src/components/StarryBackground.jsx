import { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star count scaled to screen size (~180-260 stars)
    const starCount = Math.floor(Math.min(260, Math.max(140, (width * height) / 6000)));

    const starColors = [
      { r: 255, g: 255, b: 255 }, // Pure white
      { r: 224, g: 242, b: 254 }, // Soft ice blue
      { r: 216, g: 180, b: 254 }, // Delicate cosmic lavender
      { r: 254, g: 243, b: 199 }, // Warm diamond gold
    ];

    // Create starry dots
    const stars = Array.from({ length: starCount }, () => {
      const colorPick = Math.random();
      const color =
        colorPick < 0.7
          ? starColors[0]
          : colorPick < 0.85
          ? starColors[1]
          : colorPick < 0.95
          ? starColors[2]
          : starColors[3];

      const sizeRand = Math.random();
      // Most stars are tiny crisp specks; a few are brighter with soft glow
      const radius = sizeRand < 0.7 ? Math.random() * 0.7 + 0.6 : sizeRand < 0.92 ? Math.random() * 0.8 + 1.2 : Math.random() * 1.0 + 2.0;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        color,
        baseAlpha: Math.random() * 0.5 + 0.3,
        twinkleSpeed: Math.random() * 0.015 + 0.006,
        phase: Math.random() * Math.PI * 2,
        hasCrossSparkle: radius > 2.2 && Math.random() > 0.4,
      };
    });

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars.forEach((star) => {
        if (star.x > width) star.x = Math.random() * width;
        if (star.y > height) star.y = Math.random() * height;
      });
    };

    window.addEventListener('resize', handleResize);

    let tick = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tick += 1;

      stars.forEach((star) => {
        // Smooth sine-wave twinkling effect
        const currentAlpha = Math.max(
          0.12,
          Math.min(1, star.baseAlpha + Math.sin(tick * star.twinkleSpeed + star.phase) * 0.35)
        );

        // Core star point
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${currentAlpha})`;
        ctx.fill();

        // Soft outer glow for medium and larger stars
        if (star.radius > 1.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${currentAlpha * 0.18})`;
          ctx.fill();
        }

        // Elegant 4-point cross diffraction sparkle for standout stars
        if (star.hasCrossSparkle && currentAlpha > 0.5) {
          const sparkleLen = star.radius * 3.5;
          const sparkleAlpha = (currentAlpha - 0.5) * 0.4;
          ctx.strokeStyle = `rgba(${star.color.r}, ${star.color.g}, ${star.color.b}, ${sparkleAlpha})`;
          ctx.lineWidth = 0.75;

          ctx.beginPath();
          // Horizontal spike
          ctx.moveTo(star.x - sparkleLen, star.y);
          ctx.lineTo(star.x + sparkleLen, star.y);
          // Vertical spike
          ctx.moveTo(star.x, star.y - sparkleLen);
          ctx.lineTo(star.x, star.y + sparkleLen);
          ctx.stroke();
        }
      });

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Deep cosmic space background matching the whole application */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 140% 100% at 50% 10%, rgba(31, 30, 57, 0.25) 0%, rgba(6, 9, 31, 0.3) 40%, #030412 85%)',
        }}
      />

      {/* Living Starry Dots Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Subtle atmospheric vignette ensuring crisp readability */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(3, 4, 18, 0.4) 100%)',
        }}
      />
    </div>
  );
};

export default StarryBackground;
