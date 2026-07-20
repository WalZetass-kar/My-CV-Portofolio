"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function ShaderPlane() {
  const ref = useRef<THREE.Mesh>(null!);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#ef4444") },
      uColor2: { value: new THREE.Color("#0f172a") },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;
  });

  const vertexShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform float uTime;

    void main() {
      vUv = uv;
      vec3 pos = position;
      float elevation = sin(pos.x * 3.0 + uTime * 0.5) * 0.15
                      + sin(pos.y * 2.0 + uTime * 0.3) * 0.1
                      + sin((pos.x + pos.y) * 1.5 + uTime * 0.7) * 0.08;
      pos.z += elevation;
      vElevation = elevation;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `;

  const fragmentShader = `
    varying vec2 vUv;
    varying float vElevation;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform float uTime;

    void main() {
      float mixFactor = smoothstep(-0.2, 0.2, vElevation);
      vec3 color = mix(uColor2 * 0.3, uColor1, mixFactor);

      float glow = smoothstep(0.0, 0.3, vElevation) * 0.5;
      color += uColor1 * glow;

      float alpha = 0.6 + vElevation * 0.5;
      gl_FragColor = vec4(color, alpha);
    }
  `;

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, -3]}>
      <planeGeometry args={[15, 10, 64, 64]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function FloatingRings() {
  return (
    <>
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[-4, 2, -2]} rotation={[0.5, 0, 0]}>
          <torusGeometry args={[0.8, 0.05, 8, 32]} />
          <meshStandardMaterial color="#ef4444" transparent opacity={0.4} emissive="#ef4444" emissiveIntensity={0.3} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.8}>
        <mesh position={[4, -1, -4]} rotation={[0, 0.8, 0.3]}>
          <torusGeometry args={[0.6, 0.04, 8, 32]} />
          <meshStandardMaterial color="#f97316" transparent opacity={0.3} emissive="#f97316" emissiveIntensity={0.2} />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.3}>
        <mesh position={[2, 3, -5]} rotation={[0.3, 0.2, 0]}>
          <torusGeometry args={[1, 0.03, 8, 32]} />
          <meshStandardMaterial color="#ef4444" transparent opacity={0.2} />
        </mesh>
      </Float>
    </>
  );
}

export function ShaderBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.4 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <ShaderPlane />
        <FloatingRings />
      </Canvas>
    </div>
  );
}
