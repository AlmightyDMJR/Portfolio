/**
 * FloatingAstronautWidget.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A fully self-contained, zero-gravity floating astronaut built from primitive
 * Three.js geometries via React Three Fiber.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * PASTE THESE 2 LINES YOURSELF — this file must NOT touch any existing file.
 * ════════════════════════════════════════════════════════════════════════════
 *
 *   // [1] IMPORT — add at the top of Hero.jsx (or whichever scene file you use):
 *   import FloatingAstronaut from '../components/FloatingAstronautWidget';
 *
 *   // [2] JSX — drop inside your <Canvas> / <Suspense> block (tune position/scale to taste):
 *   <FloatingAstronaut position={[-1.8, 0.4, 0]} scale={0.38} />
 *
 *   // [3] No extra update() call needed — useFrame drives the animation automatically.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * Every variable, material, helper, and sub-component is module-scoped with an
 * _aw_ prefix — nothing can collide with names in the rest of your project.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Palette ─────────────────────────────────────────────────────────────────
const _aw_SUIT_COLOR      = new THREE.Color(0xdce8f0); // off-white suit body
const _aw_SUIT_DARK       = new THREE.Color(0xa8bcc8); // joints & seams
const _aw_VISOR_COLOR     = new THREE.Color(0x1a9fd4); // blue-tinted visor
const _aw_VISOR_EMISSIVE  = new THREE.Color(0x0d4d6b);
const _aw_BACKPACK_COLOR  = new THREE.Color(0x8899aa); // PLSS backpack
const _aw_BOOT_COLOR      = new THREE.Color(0xb0bfc8);
const _aw_GLOVE_COLOR     = new THREE.Color(0xc8d5dc);
const _aw_PANEL_COLOR     = new THREE.Color(0xf0c040); // golden chest panel
const _aw_HELMET_COLOR    = new THREE.Color(0xfaf8f4);

// ─── Material factory ────────────────────────────────────────────────────────
function _aw_mat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness:         opts.roughness         ?? 0.55,
    metalness:         opts.metalness         ?? 0.12,
    emissive:          opts.emissive          ?? new THREE.Color(0x000000),
    emissiveIntensity: opts.emissiveIntensity ?? 0,
    transparent:       opts.transparent       ?? false,
    opacity:           opts.opacity           ?? 1,
  });
}

// ─── Helmet (sphere shell + visor cap + neck ring) ────────────────────────────
function _aw_Helmet() {
  const mats = useMemo(() => ({
    helmet: _aw_mat(_aw_HELMET_COLOR, { roughness: 0.3, metalness: 0.2 }),
    visor: _aw_mat(_aw_VISOR_COLOR, {
      roughness: 0.05, metalness: 0.6,
      emissive: _aw_VISOR_EMISSIVE, emissiveIntensity: 0.4,
      transparent: true, opacity: 0.82,
    }),
    neck: _aw_mat(_aw_SUIT_DARK, { roughness: 0.6 }),
  }), []);

  return (
    <group position={[0, 0.82, 0]}>
      {/* Outer helmet shell */}
      <mesh material={mats.helmet}>
        <sphereGeometry args={[0.32, 24, 24]} />
      </mesh>

      {/* Visor — partial sphere, slightly forward */}
      <mesh position={[0, -0.02, 0.22]} rotation={[0.18, 0, 0]} material={mats.visor}>
        <sphereGeometry args={[0.22, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
      </mesh>

      {/* Neck ring */}
      <mesh position={[0, -0.29, 0]} material={mats.neck}>
        <cylinderGeometry args={[0.14, 0.16, 0.09, 16]} />
      </mesh>
    </group>
  );
}

// ─── Torso (capsule + chest panel + shoulder pads + PLSS backpack) ─────────────
function _aw_Torso() {
  const mats = useMemo(() => ({
    suit:     _aw_mat(_aw_SUIT_COLOR,     { roughness: 0.6 }),
    panel:    _aw_mat(_aw_PANEL_COLOR,    { roughness: 0.35, metalness: 0.3, emissive: new THREE.Color(0x7a5500), emissiveIntensity: 0.15 }),
    backpack: _aw_mat(_aw_BACKPACK_COLOR, { roughness: 0.5, metalness: 0.25 }),
    seam:     _aw_mat(_aw_SUIT_DARK,      { roughness: 0.7 }),
  }), []);

  return (
    <group position={[0, 0.2, 0]}>
      {/* Main torso */}
      <mesh material={mats.suit}>
        <capsuleGeometry args={[0.22, 0.38, 8, 16]} />
      </mesh>

      {/* Golden chest control panel */}
      <mesh position={[0, 0.06, 0.22]} material={mats.panel}>
        <boxGeometry args={[0.22, 0.18, 0.04]} />
      </mesh>

      {/* Shoulder ball joints */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.26, 0.26, 0]} material={mats.seam}>
          <sphereGeometry args={[0.10, 12, 12]} />
        </mesh>
      ))}

      {/* PLSS life-support backpack */}
      <mesh position={[0, 0.05, -0.26]} material={mats.backpack}>
        <boxGeometry args={[0.28, 0.34, 0.14]} />
      </mesh>

      {/* Backpack exhaust nozzle detail */}
      <mesh position={[0, -0.12, -0.32]} rotation={[Math.PI / 2, 0, 0]} material={mats.seam}>
        <cylinderGeometry args={[0.03, 0.04, 0.06, 8]} />
      </mesh>
    </group>
  );
}

// ─── One arm (upper capsule + elbow sphere + lower capsule + glove sphere) ────
function _aw_Arm({ side }) {
  const armRef = useRef();
  const mats = useMemo(() => ({
    suit:  _aw_mat(_aw_SUIT_COLOR,  { roughness: 0.6 }),
    joint: _aw_mat(_aw_SUIT_DARK,   { roughness: 0.5, metalness: 0.2 }),
    glove: _aw_mat(_aw_GLOVE_COLOR, { roughness: 0.4 }),
  }), []);
  const _phase = side * 0.9;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!armRef.current) return;
    armRef.current.rotation.z = side * (0.55 + Math.sin(t * 0.7 + _phase) * 0.18);
    armRef.current.rotation.x = Math.sin(t * 0.5 + _phase * 0.5) * 0.12;
  });

  return (
    <group ref={armRef} position={[side * 0.36, 0.36, 0]}>
      <mesh position={[0, -0.15, 0]} material={mats.suit}>
        <capsuleGeometry args={[0.075, 0.22, 6, 12]} />
      </mesh>
      <mesh position={[0, -0.31, 0]} material={mats.joint}>
        <sphereGeometry args={[0.08, 10, 10]} />
      </mesh>
      <mesh position={[0, -0.48, 0]} material={mats.suit}>
        <capsuleGeometry args={[0.065, 0.18, 6, 12]} />
      </mesh>
      <mesh position={[0, -0.64, 0]} material={mats.glove}>
        <sphereGeometry args={[0.085, 10, 10]} />
      </mesh>
    </group>
  );
}

// ─── One leg (upper capsule + knee sphere + lower capsule + boot box) ─────────
function _aw_Leg({ side }) {
  const legRef = useRef();
  const mats = useMemo(() => ({
    suit: _aw_mat(_aw_SUIT_COLOR, { roughness: 0.6 }),
    knee: _aw_mat(_aw_SUIT_DARK,  { roughness: 0.5 }),
    boot: _aw_mat(_aw_BOOT_COLOR, { roughness: 0.45, metalness: 0.15 }),
  }), []);
  const _phase = side * 1.3;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!legRef.current) return;
    legRef.current.rotation.x = Math.sin(t * 0.6 + _phase) * 0.14;
    legRef.current.rotation.z = side * Math.sin(t * 0.4 + _phase) * 0.06;
  });

  return (
    <group ref={legRef} position={[side * 0.14, -0.18, 0]}>
      <mesh position={[0, -0.18, 0]} material={mats.suit}>
        <capsuleGeometry args={[0.085, 0.22, 6, 12]} />
      </mesh>
      <mesh position={[0, -0.34, 0]} material={mats.knee}>
        <sphereGeometry args={[0.09, 10, 10]} />
      </mesh>
      <mesh position={[0, -0.50, 0]} material={mats.suit}>
        <capsuleGeometry args={[0.075, 0.20, 6, 12]} />
      </mesh>
      <mesh position={[0, -0.68, 0]} material={mats.boot}>
        <boxGeometry args={[0.15, 0.10, 0.20]} />
      </mesh>
    </group>
  );
}

// ─── Root floating group (vertical bob + horizontal drift + tumble) ───────────
function _aw_FloatingGroup({ children }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;
    // Slow vertical bob (zero-gravity sway)
    ref.current.position.y = Math.sin(t * 0.55) * 0.14;
    // Subtle horizontal drift
    ref.current.position.x = Math.sin(t * 0.28 + 1.0) * 0.06;
    // Multi-axis tumble — slow & peaceful
    ref.current.rotation.y = Math.sin(t * 0.22)        * 0.30;
    ref.current.rotation.z = Math.sin(t * 0.18 + 2.0)  * 0.12;
    ref.current.rotation.x = Math.sin(t * 0.15 + 0.8)  * 0.08;
  });

  return <group ref={ref}>{children}</group>;
}

// ─── Public component ─────────────────────────────────────────────────────────
/**
 * <FloatingAstronaut />
 *
 * Place inside any <Canvas>. Accepts all standard Three.js Group props.
 *
 * Suggested values for Hero.jsx:
 *   position={[-1.8, 0.4, 0]}  scale={0.38}
 */
const FloatingAstronaut = (props) => (
  <group {...props}>
    <_aw_FloatingGroup>
      <_aw_Helmet />
      <_aw_Torso />
      <_aw_Arm side={-1} />
      <_aw_Arm side={1} />
      <_aw_Leg side={-1} />
      <_aw_Leg side={1} />
    </_aw_FloatingGroup>
  </group>
);

export default FloatingAstronaut;
