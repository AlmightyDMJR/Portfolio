import { useEffect, useRef, useState } from 'react';
import { useMotionValue, useSpring } from 'motion/react';

// Cobe globe wrapper with drag-to-spin and auto-rotation
const Globe = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);

  const phi = useMotionValue(0);
  const springPhi = useSpring(phi, { stiffness: 80, damping: 20 });

  const updatePointerInteraction = (value) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  };

  useEffect(() => {
    let cobeInstance;
    let animating = true;

    const loadCobe = async () => {
      try {
        const { createGlobe } = await import('cobe');
        let width = 0;
        let currentPhi = 0;
        let currentTheta = 0.3;

        const onResize = () => {
          if (canvasRef.current) {
            width = canvasRef.current.offsetWidth;
          }
        };
        window.addEventListener('resize', onResize);
        onResize();

        cobeInstance = createGlobe(canvasRef.current, {
          devicePixelRatio: 2,
          width: width * 2,
          height: width * 2,
          phi: 0,
          theta: 0.3,
          dark: 1,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 6,
          baseColor: [0.1, 0.1, 0.2],
          markerColor: [0.36, 0.19, 0.8],
          glowColor: [0, 0, 0],
          markers: [
            // Major city markers
            { location: [22.5726, 88.3639], size: 0.05 },  // Kolkata
            { location: [37.7595, -122.4367], size: 0.03 }, // SF
            { location: [40.7128, -74.006], size: 0.03 },  // NYC
            { location: [51.5074, -0.1278], size: 0.03 },  // London
            { location: [35.6762, 139.6503], size: 0.03 }, // Tokyo
            { location: [-33.8688, 151.2093], size: 0.03 },// Sydney
          ],
          onRender: (state) => {
            if (!animating) return;
            if (!pointerInteracting.current) {
              currentPhi += 0.003;
            }
            state.phi = currentPhi + r;
            state.theta = currentTheta;
            state.width = width * 2;
            state.height = width * 2;
          },
        });

        return () => {
          animating = false;
          window.removeEventListener('resize', onResize);
          cobeInstance?.destroy();
        };
      } catch (err) {
        console.warn('Could not load cobe:', err);
      }
    };

    const cleanup = loadCobe();
    return () => {
      animating = false;
      cleanup?.then((fn) => fn?.());
    };
  }, [r]);

  return (
    <div className={`relative aspect-square ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current);
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
        style={{
          width: '100%',
          height: '100%',
          cursor: 'grab',
          contain: 'layout paint size',
        }}
      />
    </div>
  );
};

export default Globe;
