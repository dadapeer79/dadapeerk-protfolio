'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, ContactShadows, Float } from '@react-three/drei'
import { Suspense, useRef, useState, useEffect } from 'react'

function Avatar({ modelUrl }) {
  if (!modelUrl) {
    return (
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[0, 0, 0]} scale={1.5}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#B9FF2F" />
        </mesh>
      </Float>
    )
  }

  // Note: For this to work with real models later, you will need suspense or a try/catch
  const { scene } = useGLTF(modelUrl)
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive object={scene} scale={2} position={[0, -1, 0]} />
    </Float>
  )
}

export default function Hero3D({ modelUrl }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-full bg-ink-black flex items-center justify-center text-warm-white">Loading 3D...</div>

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <Suspense fallback={null}>
        <Avatar modelUrl={modelUrl} />
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      <ContactShadows opacity={0.4} scale={10} blur={2} far={4} color="#000000" />
    </Canvas>
  )
}
