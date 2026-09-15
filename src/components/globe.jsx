import { useEffect, useRef, useState } from 'react';

// Cobe globe wrapper with drag-to-spin, auto-rotation, and vector fallback
const Globe = ({ className = '' }) => {
  const canvasRef = useRef(null);
  const pointerInteracting = useRef(null);
  const pointerInteractionMovement = useRef(0);
  const [r, setR] = useState(0);
  const [useFallback, setUseFallback] = useState(false);

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
        if (!canvasRef.current) return;
        const gl = canvasRef.current.getContext('webgl') || canvasRef.current.getContext('experimental-webgl');
        if (!gl) {
          setUseFallback(true);
          return;
        }

        const { createGlobe } = await import('cobe');
        let width = canvasRef.current?.offsetWidth || 260;
        let currentPhi = 0;
        let currentTheta = 0.3;

        const onResize = () => {
          if (canvasRef.current && canvasRef.current.offsetWidth > 0) {
            width = canvasRef.current.offsetWidth;
          }
        };
        window.addEventListener('resize', onResize);
        onResize();
        if (!width || width === 0) width = 260;

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
        console.warn('Could not load cobe, using vector globe fallback:', err);
        setUseFallback(true);
      }
    };

    const cleanup = loadCobe();
    return () => {
      animating = false;
      cleanup?.then((fn) => fn?.());
    };
  }, [r]);

  if (useFallback) {
    return (
      <div className={`relative aspect-square w-full h-full flex items-center justify-center select-none ${className}`}>
        {/* Obsidian globe sphere */}
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#111827] shadow-[0_4px_16px_rgba(15,15,20,0.15)] border border-[rgba(255,255,255,0.08)] relative overflow-hidden flex items-center justify-center">
          {/* Latitude and longitude grid - neutral white/opacity */}
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 text-white stroke-current" fill="none" strokeWidth="0.8">
            <circle cx="50" cy="50" r="48" strokeDasharray="3 3" />
            <ellipse cx="50" cy="50" rx="48" ry="24" />
            <ellipse cx="50" cy="50" rx="48" ry="12" />
            <ellipse cx="50" cy="50" rx="24" ry="48" />
            <ellipse cx="50" cy="50" rx="12" ry="48" />
            <line x1="50" y1="2" x2="50" y2="98" />
            <line x1="2" y1="50" x2="98" y2="50" />
          </svg>

          {/* Kolkata live beacon - exact #57DB96 mint token */}
          <div className="absolute top-[38%] left-[62%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-[#57DB96] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#57DB96]" />
          </div>

          {/* Subtle spherical light specular sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.12] pointer-events-none rounded-full" />
        </div>
      </div>
    );
  }

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
