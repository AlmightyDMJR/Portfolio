import { useEffect, useRef } from 'react';

const Particles = ({
  className = '',
  quantity = 80,
  color = '#7a57db',
  staticity = 50,
  ease = 50,
  size = 2,
}) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particles = useRef([]);
  const animFrame = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
        : { r: 122, g: 87, b: 219 };
    };

    const rgb = hexToRgb(color);

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * size + 0.5,
      alpha: 0,
      targetAlpha: Math.random() * 0.5 + 0.1,
      magnetism: 0.1 + Math.random() * 4,
    });

    resize();
    window.addEventListener('resize', resize);

    particles.current = Array.from({ length: quantity }, createParticle);

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    canvas.parentElement.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      particles.current.forEach((p) => {
        // Fade in
        if (p.alpha < p.targetAlpha) p.alpha = Math.min(p.alpha + 0.02, p.targetAlpha);

        // Mouse magnetism
        const distX = mx - p.x;
        const distY = my - p.y;
        const dist = Math.sqrt(distX * distX + distY * distY);
        const maxDist = 100;

        if (dist < maxDist) {
          const force = (1 - dist / maxDist) * p.magnetism;
          p.x += (distX / dist) * force * (staticity / 100);
          p.y += (distY / dist) * force * (staticity / 100);
        }

        // Move
        p.x += p.dx;
        p.y += p.dy;

        // Ease back toward random position (very gently drift)
        p.dx *= 0.99;
        p.dy *= 0.99;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.alpha})`;
        ctx.fill();
      });

      animFrame.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrame.current);
    };
  }, [quantity, color, staticity, ease, size]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default Particles;
