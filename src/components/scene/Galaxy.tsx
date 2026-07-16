"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 1400;

// Per-star point size + soft circular falloff + independent twinkle via a
// random phase — a PointsMaterial can't vary size per star or twinkle, so
// this is a small hand-written shader instead.
const VERTEX_SHADER = `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 color;
  uniform float uTime;
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = color;
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.6 + aPhase);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (240.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    float alpha = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor * vTwinkle, alpha * vTwinkle);
  }
`;

function buildStarfield() {
  const positions = new Float32Array(STAR_COUNT * 3);
  const colors = new Float32Array(STAR_COUNT * 3);
  const sizes = new Float32Array(STAR_COUNT);
  const phases = new Float32Array(STAR_COUNT);

  const white = new THREE.Color("#eaf6ff");
  // A touch of the site's aurora teal on a minority of stars — an accent,
  // not a takeover.
  const accent = new THREE.Color("#7fe0d6");

  for (let i = 0; i < STAR_COUNT; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 90;
    positions[i3 + 1] = (Math.random() - 0.5) * 55;
    positions[i3 + 2] = -Math.random() * 70 - 5;

    const color = Math.random() < 0.1 ? accent : white;
    const brightness = 0.45 + Math.random() * 0.55;
    colors[i3] = color.r * brightness;
    colors[i3 + 1] = color.g * brightness;
    colors[i3 + 2] = color.b * brightness;

    sizes[i] = Math.random() < 0.06 ? 2.4 + Math.random() * 1.6 : 0.7 + Math.random() * 1.1;
    phases[i] = Math.random() * Math.PI * 2;
  }

  return { positions, colors, sizes, phases };
}

function Starfield() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { positions, colors, sizes, phases } = useMemo(() => buildStarfield(), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** A calm, twinkling starfield — decorative WebGL, mounted lazily and
 * client-only by GalaxyBackdrop. No large-scale rotation; stars only
 * twinkle in place. Never intercepts pointer events. */
export function Galaxy() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true }}
    >
      <Starfield />
    </Canvas>
  );
}
