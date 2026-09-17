import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import { useMediaQuery } from 'react-responsive';
import * as easing from 'maath/easing';

import Astronaut from '../components/Astronaut';
import FloatingAstronaut from '../components/FloatingAstronautWidget';
import Loader from '../components/Loader';
import HeroText from '../components/HeroText';
import ParallaxBackground from '../components/parallaxBackground';

// Camera rig that smoothly follows mouse position
const Rig = ({ isMobile }) => {
  useFrame((state) => {
    const { x, y } = state.pointer;
    const targetX = isMobile ? 0 : x * 0.5;
    const targetY = isMobile ? 0 : y * 0.3;

    easing.damp3(
      state.camera.position,
      [targetX, targetY, isMobile ? 4 : 5],
      0.25,
      state.delta
    );
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 850 });

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax background layers */}
      <ParallaxBackground />

      {/* 3D Canvas */}
      <div
        className="absolute inset-0 pointer-events-none md:pointer-events-auto"
        style={{ zIndex: 1 }}
      >
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, isMobile ? 4 : 5]} fov={45} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} color="#7a57db" />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#33c2cc" />

          <Suspense fallback={<Loader />}>
            <group position={isMobile ? [0, 0.35, 0] : [1.5, 0, 0]}>
              <Astronaut />
            </group>
            <FloatingAstronaut
              position={isMobile ? [-0.85, 0.85, 0] : [-1.8, 0.4, 0]}
              scale={isMobile ? 0.24 : 0.36}
            />
          </Suspense>

          <Rig isMobile={isMobile} />
        </Canvas>
      </div>

      {/* Text overlay */}
      <div
        className="relative container mx-auto max-w-7xl c-space w-full"
        style={{ zIndex: 2 }}
      >
        <HeroText />
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 5 }}
      >
        <span className="text-xs text-neutral-500 tracking-widest uppercase">Scroll</span>
        <div
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <div
            className="w-1 h-2 rounded-full bg-white/40"
            style={{ animation: 'float 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
