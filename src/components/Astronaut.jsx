import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D dayTexture;
  
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    // Basic day texture
    vec4 dayColor = texture2D(dayTexture, vUv);
    
    // Add a very subtle light blue rim lighting to make it pop
    float rim = 1.0 - max(dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0);
    rim = smoothstep(0.6, 1.0, rim);
    vec3 rimColor = vec3(0.6, 0.8, 1.0) * rim * 0.4;
    
    // Bright, even "light mode" presentation
    gl_FragColor = vec4(dayColor.rgb + rimColor, 1.0);
  }
`;

const atmosphereVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;
  void main() {
    // Soft, bright edge glow for the atmosphere
    float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(0.5, 0.75, 1.0, 0.8) * intensity;
  }
`;

const GlobeModel = () => {
  const globeRef = useRef();

  // Drag state — stored in refs so they never cause re-renders
  const drag = useRef({ active: false, lastX: 0, lastY: 0 });
  const rotY  = useRef(0);   // accumulated Y rotation (horizontal drag)
  const rotX  = useRef(0);   // accumulated X rotation (vertical drag)
  const velY  = useRef(0);   // inertia — horizontal
  const velX  = useRef(0);   // inertia — vertical

  // Use only the bright day texture for a simpler, "light mode" globe
  const [dayTex] = useTexture([
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
  ]);

  dayTex.colorSpace = THREE.SRGBColorSpace;

  const uniforms = useMemo(
    () => ({
      dayTexture: { value: dayTex }
    }),
    [dayTex]
  );

  // Clamp vertical tilt so the globe never flips past ±80°
  const MAX_TILT = Math.PI * 0.44;

  useFrame(() => {
    if (!globeRef.current) return;
    if (!drag.current.active) {
      // Auto-rotate horizontally + decay both axes' inertia
      rotY.current += 0.003 + velY.current;
      velY.current *= 0.92;
      rotX.current  = Math.max(-MAX_TILT, Math.min(MAX_TILT, rotX.current + velX.current));
      velX.current *= 0.92;
    }
    globeRef.current.rotation.y = rotY.current;
    globeRef.current.rotation.x = rotX.current;
  });

  // ── Pointer handlers — rotate only the globe group, camera stays fixed ──
  const onPointerDown = (e) => {
    e.stopPropagation();
    drag.current.active = true;
    drag.current.lastX  = e.clientX;
    drag.current.lastY  = e.clientY;
    velY.current = 0;
    velX.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    if (!drag.current.active) return;

    // Horizontal drag → Y rotation
    const dx   = e.clientX - drag.current.lastX;
    const stepY = dx * 0.004;
    rotY.current       += stepY;
    velY.current        = stepY;
    drag.current.lastX  = e.clientX;

    // Vertical drag → X rotation (clamped)
    const dy   = e.clientY - drag.current.lastY;
    const stepX = dy * 0.004;
    rotX.current = Math.max(-MAX_TILT, Math.min(MAX_TILT, rotX.current + stepX));
    velX.current        = stepX;
    drag.current.lastY  = e.clientY;
  };

  const onPointerUp = (e) => {
    drag.current.active = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <>
      {/* Background Stars */}
      <Stars
        radius={100}
        depth={50}
        count={6000}
        factor={5}
        saturation={0.5}
        fade
        speed={1}
      />

      {/* Globe group — only this group rotates on drag; camera never moves */}
      <group ref={globeRef} position={[0, 0, 0]}>
        {/* Earth mesh — receives pointer events for drag-spin */}
        <mesh
          scale={1.8}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{ cursor: 'grab' }}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial
            vertexShader={earthVertexShader}
            fragmentShader={earthFragmentShader}
            uniforms={uniforms}
          />
        </mesh>

        {/* Soft Atmosphere Mesh — no pointer events needed */}
        <mesh scale={1.8 * 1.06}>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial
            vertexShader={atmosphereVertexShader}
            fragmentShader={atmosphereFragmentShader}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            transparent={true}
            depthWrite={false}
          />
        </mesh>
      </group>
      
      {/* Basic ambient lighting (though shaders do most of the work) */}
      <ambientLight intensity={1.0} />
    </>
  );
};

export default GlobeModel;
