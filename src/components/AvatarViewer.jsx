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

  // Stylized LookDev Materials (Warm golden-hour skin, realistic hair, gold metal, tinted glass)
  const skinMaterial = new THREE.MeshStandardMaterial({ 
    color: '#c28562',
    roughness: 0.58,
    metalness: 0.04
  })
  
  const hairMaterial = new THREE.MeshStandardMaterial({ 
    color: '#1a191c', 
    roughness: 0.68, 
    metalness: 0.08 
  })
  
  // Denim / Casual Streetwear Shirt (from reference photo & YouTube style)
  const denimShirtMaterial = new THREE.MeshStandardMaterial({ 
    color: '#3d5a80', 
    roughness: 0.82, 
    metalness: 0.05 
  })

  const tshirtInnerMaterial = new THREE.MeshStandardMaterial({ 
    color: '#1e2229', 
    roughness: 0.9 
  })

  const goldFrameMaterial = new THREE.MeshStandardMaterial({
    color: '#ffd166',
    metalness: 0.92,
    roughness: 0.18
  })

  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: '#111317',
    transmission: 0.45,
    opacity: 0.92,
    transparent: true,
    roughness: 0.12,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1
  })
  
  const scleraMaterial = new THREE.MeshStandardMaterial({ 
    color: '#f8f8fa', 
    roughness: 0.15 
  })

  const irisMaterial = new THREE.MeshStandardMaterial({ 
    color: '#2a170d', 
    roughness: 0.25 
  })

  const pupilMaterial = new THREE.MeshBasicMaterial({ 
    color: '#080808' 
  })

  const eyeCatchlightMaterial = new THREE.MeshBasicMaterial({ 
    color: '#ffffff' 
  })

  const lipMaterial = new THREE.MeshStandardMaterial({ 
    color: '#b06556', 
    roughness: 0.52 
  })

  const teethMaterial = new THREE.MeshStandardMaterial({ 
    color: '#ffffff', 
    roughness: 0.18 
  })

  const beardMaterial = new THREE.MeshStandardMaterial({ 
    color: '#1e1c21', 
    roughness: 0.82 
  })

  return (
    <group ref={groupRef} position={[0, -0.68, 0]} scale={1.22}>
      {/* ── Streetwear / Casual Denim Shirt Outfit ── */}
      <group position={[0, -0.48, 0]}>
        {/* Dark Crewneck Inner Shirt */}
        <mesh position={[0, 0.22, 0.02]}>
          <cylinderGeometry args={[0.26, 0.34, 0.35, 32]} />
          <primitive object={tshirtInnerMaterial} attach="material" />
        </mesh>

        {/* Denim Outer Shirt Torso */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.48, 0.58, 0.75, 32]} />
          <primitive object={denimShirtMaterial} attach="material" />
        </mesh>

        {/* Left Arm / Shoulder */}
        <mesh position={[-0.46, 0.02, 0]} rotation={[0, 0, 0.25]}>
          <capsuleGeometry args={[0.16, 0.52, 16, 32]} />
          <primitive object={denimShirtMaterial} attach="material" />
        </mesh>

        {/* Right Arm / Shoulder */}
        <mesh position={[0.46, 0.02, 0]} rotation={[0, 0, -0.25]}>
          <capsuleGeometry args={[0.16, 0.52, 16, 32]} />
          <primitive object={denimShirtMaterial} attach="material" />
        </mesh>

        {/* Left Shirt Collar Lapel */}
        <RoundedBox args={[0.1, 0.32, 0.1]} radius={0.025} position={[-0.17, 0.22, 0.14]} rotation={[0.18, 0.25, -0.2]}>
          <primitive object={denimShirtMaterial} attach="material" />
        </RoundedBox>

        {/* Right Shirt Collar Lapel */}
        <RoundedBox args={[0.1, 0.32, 0.1]} radius={0.025} position={[0.17, 0.22, 0.14]} rotation={[0.18, -0.25, 0.2]}>
          <primitive object={denimShirtMaterial} attach="material" />
        </RoundedBox>
      </group>
      
      {/* ── Neck (Natural human proportions) ── */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.17, 0.19, 0.28, 32]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>
      
      {/* ── Head Group (Interactive Cursor / Head Rotation) ── */}
      <group ref={headRef} position={[0, 0.28, 0]}>
        
        {/* Cranium / Head Sphere Base */}
        <mesh position={[0, 0.06, -0.04]}>
          <sphereGeometry args={[0.39, 32, 32]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>

        {/* Structured Mid-Face & Cheekbones */}
        <RoundedBox args={[0.54, 0.44, 0.5]} radius={0.18} smoothness={5} position={[0, 0.02, 0.05]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>

        {/* Sculpted Jawline & Tapered Chin */}
        <RoundedBox args={[0.38, 0.32, 0.38]} radius={0.14} smoothness={5} position={[0, -0.18, 0.08]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>
        <RoundedBox args={[0.22, 0.16, 0.22]} radius={0.08} smoothness={4} position={[0, -0.28, 0.14]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>

        {/* Natural Rounded Ears */}
        <RoundedBox args={[0.05, 0.18, 0.1]} radius={0.025} position={[-0.3, 0.04, -0.02]} rotation={[0.08, -0.18, 0.05]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>
        <RoundedBox args={[0.05, 0.18, 0.1]} radius={0.025} position={[0.3, 0.04, -0.02]} rotation={[0.08, 0.18, -0.05]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>

        {/* ── Voluminous Layered Wavy Black Hair (Naturally sitting atop forehead & crown) ── */}
        {/* Hair Back & Crown */}
        <mesh position={[0, 0.28, -0.09]} scale={[1.04, 1.05, 1.04]}>
          <sphereGeometry args={[0.41, 32, 32]} />
          <primitive object={hairMaterial} attach="material" />
        </mesh>
        {/* Top Voluminous Wave */}
        <RoundedBox args={[0.58, 0.24, 0.58]} radius={0.14} smoothness={5} position={[0, 0.48, -0.02]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Stylish Front Quiff & Flow (Sweeping up and over, leaving forehead clear) */}
        <RoundedBox args={[0.44, 0.18, 0.38]} radius={0.1} smoothness={5} position={[0.06, 0.52, 0.1]} rotation={[0.08, 0.08, -0.12]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Side-swept textured lock */}
        <RoundedBox args={[0.32, 0.12, 0.24]} radius={0.06} smoothness={4} position={[0.1, 0.49, 0.19]} rotation={[0.14, 0.04, -0.14]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        <RoundedBox args={[0.18, 0.09, 0.16]} radius={0.04} smoothness={3} position={[-0.08, 0.46, 0.22]} rotation={[0.18, -0.08, 0.1]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Left Side Hair Taper */}
        <RoundedBox args={[0.07, 0.22, 0.3]} radius={0.035} position={[-0.28, 0.28, 0.01]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Right Side Hair Taper */}
        <RoundedBox args={[0.07, 0.22, 0.3]} radius={0.035} position={[0.28, 0.28, 0.01]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>

        {/* ── Expressive Eyes Behind Glasses ── */}
        {/* Left Eye */}
        <group position={[-0.13, 0.08, 0.24]}>
          <mesh>
            <sphereGeometry args={[0.065, 24, 24]} />
            <primitive object={scleraMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0.042]}>
            <sphereGeometry args={[0.04, 20, 20]} />
            <primitive object={irisMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0.054]}>
            <sphereGeometry args={[0.022, 16, 16]} />
            <primitive object={pupilMaterial} attach="material" />
          </mesh>
          <mesh position={[0.014, 0.014, 0.062]}>
            <sphereGeometry args={[0.009, 8, 8]} />
            <primitive object={eyeCatchlightMaterial} attach="material" />
          </mesh>
        </group>

        {/* Right Eye */}
        <group position={[0.13, 0.08, 0.24]}>
          <mesh>
            <sphereGeometry args={[0.065, 24, 24]} />
            <primitive object={scleraMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0.042]}>
            <sphereGeometry args={[0.04, 20, 20]} />
            <primitive object={irisMaterial} attach="material" />
          </mesh>
          <mesh position={[0, 0, 0.054]}>
            <sphereGeometry args={[0.022, 16, 16]} />
            <primitive object={pupilMaterial} attach="material" />
          </mesh>
          <mesh position={[0.014, 0.014, 0.062]}>
            <sphereGeometry args={[0.009, 8, 8]} />
            <primitive object={eyeCatchlightMaterial} attach="material" />
          </mesh>
        </group>

        {/* ── Thick Well-Shaped Eyebrows ── */}
        <RoundedBox args={[0.17, 0.038, 0.03]} radius={0.015} position={[-0.14, 0.17, 0.28]} rotation={[0.06, 0.04, 0.09]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        <RoundedBox args={[0.17, 0.038, 0.03]} radius={0.015} position={[0.14, 0.17, 0.28]} rotation={[0.06, -0.04, -0.09]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>

        {/* ── Iconic Gold-Framed "vibes" Sunglasses ── */}
        <group position={[0, 0.09, 0.33]}>
          {/* Left Lens */}
          <RoundedBox args={[0.22, 0.11, 0.01]} radius={0.035} position={[-0.13, 0, 0]}>
            <primitive object={lensMaterial} attach="material" />
          </RoundedBox>
          <Text position={[-0.13, 0, 0.012]} fontSize={0.042} color="#ffffff" anchorX="center" anchorY="middle">
            vibes
          </Text>
          {/* Left Gold Frame */}
          <RoundedBox args={[0.235, 0.125, 0.008]} radius={0.04} position={[-0.13, 0, 0.002]}>
            <primitive object={goldFrameMaterial} attach="material" />
          </RoundedBox>

          {/* Right Lens */}
          <RoundedBox args={[0.22, 0.11, 0.01]} radius={0.035} position={[0.13, 0, 0]}>
            <primitive object={lensMaterial} attach="material" />
          </RoundedBox>
          <Text position={[0.13, 0, 0.012]} fontSize={0.042} color="#ffffff" anchorX="center" anchorY="middle">
            vibes
          </Text>
          {/* Right Gold Frame */}
          <RoundedBox args={[0.235, 0.125, 0.008]} radius={0.04} position={[0.13, 0, 0.002]}>
            <primitive object={goldFrameMaterial} attach="material" />
          </RoundedBox>

          {/* Golden Center Bridge */}
          <mesh position={[0, 0.015, 0]}>
            <boxGeometry args={[0.05, 0.012, 0.008]} />
            <primitive object={goldFrameMaterial} attach="material" />
          </mesh>

          {/* Gold Temples */}
          <mesh position={[-0.26, 0, -0.15]} rotation={[0, -Math.PI / 2 + 0.12, 0]}>
            <boxGeometry args={[0.32, 0.01, 0.006]} />
            <primitive object={goldFrameMaterial} attach="material" />
          </mesh>
          <mesh position={[0.26, 0, -0.15]} rotation={[0, Math.PI / 2 - 0.12, 0]}>
            <boxGeometry args={[0.32, 0.01, 0.006]} />
            <primitive object={goldFrameMaterial} attach="material" />
          </mesh>
        </group>

        {/* ── Proportionate Sculpted Nose ── */}
        <RoundedBox args={[0.048, 0.13, 0.06]} radius={0.02} position={[0, 0.02, 0.28]} rotation={[-0.08, 0, 0]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>
        <mesh position={[0, -0.045, 0.31]} scale={[0.042, 0.038, 0.042]}>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>
        <mesh position={[-0.032, -0.055, 0.295]} scale={[0.022, 0.02, 0.024]}>
          <sphereGeometry args={[1, 12, 12]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>
        <mesh position={[0.032, -0.055, 0.295]} scale={[0.022, 0.02, 0.024]}>
          <sphereGeometry args={[1, 12, 12]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>

        {/* ── Charming Smile with Teeth & Lips ── */}
        {/* Upper Lip (Natural Cupid's Bow curve) */}
        <RoundedBox args={[0.15, 0.024, 0.02]} radius={0.009} position={[0, -0.118, 0.27]}>
          <primitive object={lipMaterial} attach="material" />
        </RoundedBox>
        {/* Bright Confident Curved Teeth Smile */}
        <mesh position={[0, -0.134, 0.268]}>
          <boxGeometry args={[0.12, 0.024, 0.016]} />
          <primitive object={teethMaterial} attach="material" />
        </mesh>
        {/* Lower Lip */}
        <RoundedBox args={[0.14, 0.028, 0.024]} radius={0.01} position={[0, -0.156, 0.27]}>
          <primitive object={lipMaterial} attach="material" />
        </RoundedBox>

        {/* ── Clean Groomed Moustache & Stubble Beard ── */}
        {/* Moustache */}
        <RoundedBox args={[0.2, 0.026, 0.016]} radius={0.008} position={[0, -0.095, 0.282]} rotation={[-0.04, 0, 0]}>
          <primitive object={beardMaterial} attach="material" />
        </RoundedBox>
        {/* Soul Patch */}
        <mesh position={[0, -0.18, 0.27]} scale={[0.022, 0.022, 0.006]}>
          <sphereGeometry args={[1, 12, 12]} />
          <primitive object={beardMaterial} attach="material" />
        </mesh>
        {/* Chin Stubble / Trimmed Beard */}
        <RoundedBox args={[0.18, 0.065, 0.12]} radius={0.025} position={[0, -0.24, 0.2]}>
          <primitive object={beardMaterial} attach="material" />
        </RoundedBox>
        {/* Jawline Beard Outline */}
        <RoundedBox args={[0.26, 0.04, 0.16]} radius={0.02} position={[0, -0.2, 0.14]}>
          <primitive object={beardMaterial} attach="material" />
        </RoundedBox>
      </group>
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
  const lastTapRef = useRef(0)
  const router = useRouter()

  const handleAdminTrigger = (e) => {
    if (e) {
      e.stopPropagation()
      // e.preventDefault() is not always available on synthetic R3F events, but we stop propagation.
    }
    router.push('/admin/login')
  }

  const handlePointerDown = (e) => {
    e.stopPropagation()
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      handleAdminTrigger(e)
    }
    lastTapRef.current = now
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
      tabIndex={0}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label="Interactive character. Double tap or press Enter for backstage."
    >
      <Canvas
        camera={{ position: [0, 0.3, 3.5], fov: 45 }}
        shadows
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%', outline: 'none', touchAction: 'none' }}
      >
        <ambientLight intensity={1.2} />
        <hemisphereLight skyColor="#ffe4d6" groundColor="#331818" intensity={1.1} />
        {/* Cinematic Key Light */}
        <directionalLight position={[4, 6, 4]} intensity={2.6} castShadow shadow-mapSize={[1024, 1024]} />
        {/* Soft Fill Light */}
        <directionalLight position={[-4, 2, 2]} intensity={1.2} color="#e0f2fe" />
        {/* Rim Light for depth */}
        <pointLight position={[0, 4, -3]} intensity={3.5} color="#fef08a" />
        {/* Red circle integration lighting */}
        <pointLight position={[0, -1, -1]} intensity={2.0} color="#D91F25" />

        <Suspense fallback={null}>
          <group onDoubleClick={handleAdminTrigger} onPointerDown={handlePointerDown}>
            <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
              {modelStatus === 'success' ? (
                <GLBModel url={modelUrl} />
              ) : (
                <FallbackCharacter />
              )}
            </Float>
          </group>
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
