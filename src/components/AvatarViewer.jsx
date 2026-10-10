'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, ContactShadows, useGLTF, Text, RoundedBox, Environment } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

// Premium Placeholder Character matching the stylized reference
function FallbackCharacter() {
  const groupRef = useRef()
  const headRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame((state) => {
    if (!headRef.current) return
    const targetX = mouse.current.y * 0.2
    const targetY = mouse.current.x * 0.25
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetX, 0.08)
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetY, 0.08)
    
    // Gentle breathing animation
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.02 - 0.7
    }
  })

  // Premium Materials
  const skinMaterial = new THREE.MeshPhysicalMaterial({ 
    color: '#a36c53', roughness: 0.4, metalness: 0.1, clearcoat: 0.1 
  })
  const hairMaterial = new THREE.MeshStandardMaterial({ 
    color: '#0d0d0d', roughness: 0.7, metalness: 0.1 
  })
  const shirtMaterial = new THREE.MeshStandardMaterial({ 
    color: '#416682', roughness: 0.8 // Blue shirt from reference
  })
  const eyeMaterial = new THREE.MeshStandardMaterial({ color: '#050505', roughness: 0.1 })
  const glassMaterial = new THREE.MeshPhysicalMaterial({ 
    color: '#050505', transmission: 0.6, opacity: 0.9, transparent: true, roughness: 0.1, clearcoat: 1
  })
  const frameMaterial = new THREE.MeshStandardMaterial({ color: '#e6c875', roughness: 0.2, metalness: 0.8 }) // Gold rims
  const teethMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.2 })
  const lipMaterial = new THREE.MeshStandardMaterial({ color: '#7a4233', roughness: 0.5 })

  return (
    <group ref={groupRef} position={[0, -0.7, 0]} scale={1.25}>
      {/* Body / Shirt */}
      <mesh position={[0, -0.7, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 1.2, 32]} />
        <primitive object={shirtMaterial} attach="material" />
      </mesh>
      
      {/* Neck */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.35, 32]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>
      
      {/* Head Group */}
      <group ref={headRef} position={[0, 0.55, 0]}>
        {/* Main Head - Rounded for a more organic look */}
        <RoundedBox args={[0.75, 0.9, 0.8]} radius={0.15} smoothness={4} position={[0, 0, 0]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>
        
        {/* Hair - Base Volume */}
        <RoundedBox args={[0.82, 0.25, 0.85]} radius={0.1} smoothness={4} position={[0, 0.45, -0.05]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Hair - Side-swept textured top */}
        <RoundedBox args={[0.7, 0.35, 0.6]} radius={0.1} smoothness={4} position={[0.08, 0.52, 0.15]} rotation={[0, 0, -0.15]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Hair - Front swoop */}
        <RoundedBox args={[0.3, 0.2, 0.3]} radius={0.05} smoothness={4} position={[0.2, 0.45, 0.4]} rotation={[0.2, 0, -0.2]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>

        {/* Eyes */}
        <mesh position={[-0.18, 0.08, 0.4]}>
          <sphereGeometry args={[0.07, 32, 32]} />
          <primitive object={eyeMaterial} attach="material" />
        </mesh>
        <mesh position={[0.18, 0.08, 0.4]}>
          <sphereGeometry args={[0.07, 32, 32]} />
          <primitive object={eyeMaterial} attach="material" />
        </mesh>

        {/* Thick Eyebrows */}
        <RoundedBox args={[0.18, 0.05, 0.03]} radius={0.01} position={[-0.18, 0.22, 0.41]} rotation={[0, 0, 0.08]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        <RoundedBox args={[0.18, 0.05, 0.03]} radius={0.01} position={[0.18, 0.22, 0.41]} rotation={[0, 0, -0.08]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>

        {/* Nose */}
        <mesh position={[0, -0.05, 0.42]}>
          <sphereGeometry args={[0.08, 32, 32]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>

        {/* Moustache & Beard Stubble */}
        {/* Moustache */}
        <RoundedBox args={[0.32, 0.04, 0.02]} radius={0.01} position={[0, -0.18, 0.41]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Chin beard */}
        <RoundedBox args={[0.25, 0.06, 0.02]} radius={0.01} position={[0, -0.4, 0.39]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        
        {/* Smile (Lips & Teeth) */}
        {/* Lower lip */}
        <mesh position={[0, -0.28, 0.41]}>
          <boxGeometry args={[0.22, 0.03, 0.02]} />
          <primitive object={lipMaterial} attach="material" />
        </mesh>
        {/* Teeth */}
        <mesh position={[0, -0.24, 0.41]}>
          <boxGeometry args={[0.2, 0.04, 0.01]} />
          <primitive object={teethMaterial} attach="material" />
        </mesh>

        {/* "VIBES" Glasses */}
        {/* Left Lens */}
        <RoundedBox args={[0.28, 0.16, 0.01]} radius={0.05} position={[-0.18, 0.08, 0.44]}>
          <primitive object={glassMaterial} attach="material" />
        </RoundedBox>
        <Text position={[-0.18, 0.08, 0.45]} fontSize={0.06} color="#ffffff" anchorX="center" anchorY="middle">
          vibes
        </Text>
        {/* Left Frame */}
        <RoundedBox args={[0.3, 0.18, 0.01]} radius={0.06} position={[-0.18, 0.08, 0.445]}>
          <primitive object={frameMaterial} attach="material" />
        </RoundedBox>
        
        {/* Right Lens */}
        <RoundedBox args={[0.28, 0.16, 0.01]} radius={0.05} position={[0.18, 0.08, 0.44]}>
          <primitive object={glassMaterial} attach="material" />
        </RoundedBox>
        <Text position={[0.18, 0.08, 0.45]} fontSize={0.06} color="#ffffff" anchorX="center" anchorY="middle">
          vibes
        </Text>
        {/* Right Frame */}
        <RoundedBox args={[0.3, 0.18, 0.01]} radius={0.06} position={[0.18, 0.08, 0.445]}>
          <primitive object={frameMaterial} attach="material" />
        </RoundedBox>
        
        {/* Bridge */}
        <mesh position={[0, 0.08, 0.44]}>
          <boxGeometry args={[0.1, 0.02, 0.01]} />
          <primitive object={frameMaterial} attach="material" />
        </mesh>
        {/* Arms */}
        <mesh position={[-0.35, 0.08, 0.2]} rotation={[0, -Math.PI / 2, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.01]} />
          <primitive object={frameMaterial} attach="material" />
        </mesh>
        <mesh position={[0.35, 0.08, 0.2]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.4, 0.02, 0.01]} />
          <primitive object={frameMaterial} attach="material" />
        </mesh>
      </group>
      
      {/* Placeholder Label */}
      <Text
        position={[0, -1.5, 0.5]}
        fontSize={0.12}
        color="rgba(255,255,255,0.7)"
        anchorX="center"
        anchorY="middle"
      >
        [ PROCEDURAL PLACEHOLDER ]
      </Text>
    </group>
  )
}

function GLBModel({ url }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const targetX = mouse.current.y * 0.15
    const targetY = mouse.current.x * 0.25
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05)
    // Breathing idle animation
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.02 - 1.2
  })

  // Center and scale the model automatically
  useEffect(() => {
    if (scene) {
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      scene.position.x = -center.x
      scene.position.y = -center.y
      scene.position.z = -center.z
    }
  }, [scene])

  return (
    <group ref={groupRef} scale={1.8}>
      <primitive object={scene} />
    </group>
  )
}

export default function AvatarViewer({ modelUrl = '/models/dadapeer_avatar.glb', className = '' }) {
  const [modelStatus, setModelStatus] = useState('loading')
  const router = useRouter()

  const handleAdminTrigger = (e) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    router.push('/admin/login')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAdminTrigger(e)
    }
  }

  // Pre-load check to see if custom model exists
  useEffect(() => {
    if (!modelUrl) {
      setModelStatus('error')
      return
    }
    fetch(modelUrl, { method: 'HEAD' })
      .then(res => {
        if (res.ok) {
          setModelStatus('success')
        } else {
          setModelStatus('error')
        }
      })
      .catch(() => setModelStatus('error'))
  }, [modelUrl])

  return (
    <div 
      style={{ width: '100%', height: '100%', minHeight: 320, cursor: 'pointer', outline: 'none' }} 
      className={className}
      onDoubleClick={handleAdminTrigger}
      onTouchStart={(e) => {
        // Simple double tap detection
        const now = Date.now()
        const last = e.currentTarget.lastTap || 0
        if (now - last < 300) handleAdminTrigger(e)
        e.currentTarget.lastTap = now
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label="Interactive character. Double click or press Enter for backstage."
    >
      <Canvas
        camera={{ position: [0, 0.3, 3.5], fov: 45 }}
        shadows
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', outline: 'none' }}
      >
        <ambientLight intensity={0.5} />
        {/* Cinematic Key Light */}
        <directionalLight position={[4, 6, 4]} intensity={2.5} castShadow shadow-mapSize={[1024, 1024]} />
        {/* Soft Fill Light */}
        <directionalLight position={[-4, 2, 1]} intensity={0.8} color="#e0f2fe" />
        {/* Rim Light for depth */}
        <pointLight position={[0, 4, -3]} intensity={3} color="#fef08a" />
        {/* Red circle integration lighting */}
        <pointLight position={[0, -1, -1]} intensity={1.5} color="#D91F25" />
        
        <Environment preset="studio" blur={0.5} />

        <Suspense fallback={null}>
          {modelStatus !== 'loading' && (
            <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
              {modelStatus === 'success' ? (
                <GLBModel url={modelUrl} />
              ) : (
                <FallbackCharacter />
              )}
            </Float>
          )}
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.6}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.6}
          scale={7}
          blur={2.5}
          color="#000000"
        />
      </Canvas>
    </div>
  )
}
