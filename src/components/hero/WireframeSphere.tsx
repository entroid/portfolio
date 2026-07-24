"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useHasWebGL } from "./useHasWebGL";
import { WireframeSphereFallback } from "./WireframeSphereFallback";

// Design file's own `rotationSpeed` control defaults to 0.22 — used as the
// idle angular speed (radians/sec) rather than guessing a value from scratch.
const IDLE_ROTATION_SPEED = 0.22;
const PARALLAX_RANGE = 0.15;
const PARALLAX_EASE = 0.05;

function Sphere({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (reducedMotion || !meshRef.current || !groupRef.current) return;

    meshRef.current.rotation.y += delta * IDLE_ROTATION_SPEED;

    const targetX = state.pointer.y * PARALLAX_RANGE;
    const targetY = state.pointer.x * PARALLAX_RANGE;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      PARALLAX_EASE,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY,
      PARALLAX_EASE,
    );
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.6, 24, 16]} />
        <meshBasicMaterial
          color="#9eff3d"
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
}

/**
 * WebGL wireframe sphere: idle rotation + mouse parallax, per
 * DESIGN_SYSTEM.md's "Hero: wireframe sphere" spec. Loaded via
 * `next/dynamic({ ssr: false })` from `HeroSphere`, so this module (and its
 * three.js/r3f dependency weight) never blocks first paint of the hero text.
 */
export function WireframeSphere() {
  const reducedMotion = useReducedMotion();
  const hasWebGL = useHasWebGL();

  if (!hasWebGL) {
    return <WireframeSphereFallback />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 2]}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <Sphere reducedMotion={reducedMotion} />
    </Canvas>
  );
}
