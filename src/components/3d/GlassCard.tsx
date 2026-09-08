import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function GlassMesh({ children, width, height }: { children?: React.ReactNode, width: number, height: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Rotate slightly on hover
      const targetRotationX = hovered ? 0.1 : 0;
      const targetRotationY = hovered ? 0.1 : 0;
      
      meshRef.current.rotation.x += (targetRotationX - meshRef.current.rotation.x) * delta * 5;
      meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * delta * 5;
    }
  });

  return (
    <RoundedBox
      ref={meshRef}
      args={[width, height, 0.2]} // Width, height, depth
      radius={0.1}
      smoothness={4}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <MeshTransmissionMaterial
        buffer={null}
        transmissionSampler
        backside
        thickness={0.5}
        roughness={0.1}
        transmission={1}
        ior={1.5}
        chromaticAberration={0.06}
        anisotropy={0.1}
        distortion={0.2}
        distortionScale={0.5}
        temporalDistortion={0.1}
        clearcoat={1}
        attenuationDistance={0.5}
        attenuationColor="#ffffff"
        color="#c9e8fb"
      />
      {children}
    </RoundedBox>
  );
}

interface GlassCardProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function GlassCard({ className = '', width = 3, height = 4 }: GlassCardProps) {
  return (
    <div className={`relative ${className}`} style={{ width: '100%', height: '400px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <GlassMesh width={width} height={height} />
      </Canvas>
    </div>
  );
}



