import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

function LiquidDroplet() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#a8b1ff"
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={1}
          roughness={0.1}
          distort={0.4} // Level of distortion
          speed={3} // Speed of the liquid animation
        />
      </mesh>
    </Float>
  );
}

export default function LiquidLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: '80px', height: '80px' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Environment preset="city" />
        <LiquidDroplet />
      </Canvas>
    </div>
  );
}



