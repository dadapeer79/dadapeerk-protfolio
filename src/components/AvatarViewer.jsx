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

  // Refined Stylized Character Shaders & Materials (Matte, warm, cinematic)
  const skinMaterial = new THREE.MeshStandardMaterial({ 
    color: '#bd8668',
    roughness: 0.65,
    metalness: 0.02
  })
  
  const hairMaterial = new THREE.MeshStandardMaterial({ 
    color: '#18181a', 
    roughness: 0.75, 
    metalness: 0.05 
  })
  
  const jacketMaterial = new THREE.MeshStandardMaterial({ 
    color: '#16171a', 
    roughness: 0.85, 
    metalness: 0.08 
  })

  const tshirtMaterial = new THREE.MeshStandardMaterial({ 
    color: '#2b2d31', 
    roughness: 0.9 
  })

  const chainMaterial = new THREE.MeshStandardMaterial({
    color: '#d4af37',
    metalness: 0.85,
    roughness: 0.3
  })
  
  const scleraMaterial = new THREE.MeshStandardMaterial({ 
    color: '#f0f0f2', 
    roughness: 0.2 
  })

  const irisMaterial = new THREE.MeshStandardMaterial({ 
    color: '#2c180e', 
    roughness: 0.3 
  })

  const pupilMaterial = new THREE.MeshBasicMaterial({ 
    color: '#0a0a0a' 
  })

  const eyeReflectionMaterial = new THREE.MeshBasicMaterial({ 
    color: '#ffffff' 
  })

  const lipMaterial = new THREE.MeshStandardMaterial({ 
    color: '#9e5e50', 
    roughness: 0.6 
  })

  const teethMaterial = new THREE.MeshStandardMaterial({ 
    color: '#f8f8fa', 
    roughness: 0.3 
  })

  const beardMaterial = new THREE.MeshStandardMaterial({ 
    color: '#1f1f22', 
    roughness: 0.85 
  })

  return (
    <group ref={groupRef} position={[0, -0.65, 0]} scale={1.22}>
      {/* ── Streetwear / Casual Developer Outfit ── */}
      <group position={[0, -0.65, 0]}>
        {/* Inner Dark T-Shirt */}
        <mesh position={[0, 0.25, 0.02]}>
          <cylinderGeometry args={[0.34, 0.42, 0.5, 32]} />
          <primitive object={tshirtMaterial} attach="material" />
        </mesh>

        {/* Minimalist Gold Chain */}
        <mesh position={[0, 0.35, 0.15]} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.15, 0.012, 16, 32]} />
          <primitive object={chainMaterial} attach="material" />
        </mesh>

        {/* Sleek Outer Jacket Torso */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.56, 0.68, 0.95, 32]} />
          <primitive object={jacketMaterial} attach="material" />
        </mesh>

        {/* Left Shoulder & Arm */}
        <mesh position={[-0.56, 0.05, 0]} rotation={[0, 0, 0.18]}>
          <capsuleGeometry args={[0.18, 0.6, 16, 32]} />
          <primitive object={jacketMaterial} attach="material" />
        </mesh>

        {/* Right Shoulder & Arm */}
        <mesh position={[0.56, 0.05, 0]} rotation={[0, 0, -0.18]}>
          <capsuleGeometry args={[0.18, 0.6, 16, 32]} />
          <primitive object={jacketMaterial} attach="material" />
        </mesh>

        {/* Jacket Collar Left */}
        <RoundedBox args={[0.1, 0.45, 0.14]} radius={0.03} position={[-0.22, 0.3, 0.16]} rotation={[0.15, 0.2, -0.2]}>
          <primitive object={jacketMaterial} attach="material" />
        </RoundedBox>

        {/* Jacket Collar Right */}
        <RoundedBox args={[0.1, 0.45, 0.14]} radius={0.03} position={[0.22, 0.3, 0.16]} rotation={[0.15, -0.2, 0.2]}>
          <primitive object={jacketMaterial} attach="material" />
        </RoundedBox>
      </group>
      
      {/* ── Neck & Adam's Apple ── */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.18, 0.21, 0.38, 32]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>
      
      {/* ── Head Group (Interactive Eye Tracking & Nodding) ── */}
      <group ref={headRef} position={[0, 0.6, 0]}>
        
        {/* Cranium / Head Foundation */}
        <mesh position={[0, 0.05, -0.05]}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>

        {/* Structured Mid-Face & Cheekbones */}
        <RoundedBox args={[0.62, 0.45, 0.58]} radius={0.16} smoothness={5} position={[0, 0.02, 0.06]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>

        {/* Defined Jawline & Tapered Chin */}
        <RoundedBox args={[0.44, 0.32, 0.42]} radius={0.14} smoothness={5} position={[0, -0.25, 0.12]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>
        <RoundedBox args={[0.24, 0.2, 0.25]} radius={0.08} smoothness={4} position={[0, -0.36, 0.2]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>

        {/* Ears */}
        <RoundedBox args={[0.06, 0.22, 0.12]} radius={0.03} position={[-0.34, 0.02, -0.02]} rotation={[0.08, -0.2, 0.05]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>
        <RoundedBox args={[0.06, 0.22, 0.12]} radius={0.03} position={[0.34, 0.02, -0.02]} rotation={[0.08, 0.2, -0.05]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>

        {/* ── Voluminous Textured Modern Hairstyle ── */}
        {/* Back and side hair base */}
        <mesh position={[0, 0.14, -0.08]} scale={[1.04, 1.02, 1.02]}>
          <sphereGeometry args={[0.44, 32, 32]} />
          <primitive object={hairMaterial} attach="material" />
        </mesh>
        {/* Top volume */}
        <RoundedBox args={[0.68, 0.26, 0.7]} radius={0.12} smoothness={5} position={[0, 0.38, -0.02]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Side-swept textured crown (Left to Right flow) */}
        <RoundedBox args={[0.56, 0.22, 0.54]} radius={0.1} smoothness={5} position={[0.06, 0.45, 0.06]} rotation={[0.08, 0.1, -0.12]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Front stylish quiff wave */}
        <RoundedBox args={[0.46, 0.16, 0.34]} radius={0.08} smoothness={4} position={[0.08, 0.44, 0.22]} rotation={[0.16, 0.05, -0.14]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Accentuated front lock */}
        <RoundedBox args={[0.22, 0.12, 0.18]} radius={0.05} smoothness={3} position={[-0.08, 0.39, 0.28]} rotation={[0.2, -0.08, 0.1]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Left taper fade */}
        <RoundedBox args={[0.08, 0.28, 0.38]} radius={0.04} position={[-0.32, 0.14, 0.02]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        {/* Right taper fade */}
        <RoundedBox args={[0.08, 0.28, 0.38]} radius={0.04} position={[0.32, 0.14, 0.02]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>

        {/* ── Expressive Eyes & Gaze ── */}
        {/* Left Eye */}
        <group position={[-0.14, 0.06, 0.28]}>
          {/* Eyeball */}
          <mesh>
            <sphereGeometry args={[0.075, 24, 24]} />
            <primitive object={scleraMaterial} attach="material" />
          </mesh>
          {/* Iris */}
          <mesh position={[0, 0, 0.048]}>
            <sphereGeometry args={[0.046, 20, 20]} />
            <primitive object={irisMaterial} attach="material" />
          </mesh>
          {/* Pupil */}
          <mesh position={[0, 0, 0.062]}>
            <sphereGeometry args={[0.026, 16, 16]} />
            <primitive object={pupilMaterial} attach="material" />
          </mesh>
          {/* Specular Catchlight */}
          <mesh position={[0.016, 0.016, 0.072]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <primitive object={eyeReflectionMaterial} attach="material" />
          </mesh>
          {/* Upper Eyelid / Crease */}
          <RoundedBox args={[0.15, 0.035, 0.06]} radius={0.015} position={[0, 0.065, 0.03]} rotation={[0, 0, -0.04]}>
            <primitive object={skinMaterial} attach="material" />
          </RoundedBox>
        </group>

        {/* Right Eye */}
        <group position={[0.14, 0.06, 0.28]}>
          {/* Eyeball */}
          <mesh>
            <sphereGeometry args={[0.075, 24, 24]} />
            <primitive object={scleraMaterial} attach="material" />
          </mesh>
          {/* Iris */}
          <mesh position={[0, 0, 0.048]}>
            <sphereGeometry args={[0.046, 20, 20]} />
            <primitive object={irisMaterial} attach="material" />
          </mesh>
          {/* Pupil */}
          <mesh position={[0, 0, 0.062]}>
            <sphereGeometry args={[0.026, 16, 16]} />
            <primitive object={pupilMaterial} attach="material" />
          </mesh>
          {/* Specular Catchlight */}
          <mesh position={[0.016, 0.016, 0.072]}>
            <sphereGeometry args={[0.01, 8, 8]} />
            <primitive object={eyeReflectionMaterial} attach="material" />
          </mesh>
          {/* Upper Eyelid / Crease */}
          <RoundedBox args={[0.15, 0.035, 0.06]} radius={0.015} position={[0, 0.065, 0.03]} rotation={[0, 0, 0.04]}>
            <primitive object={skinMaterial} attach="material" />
          </RoundedBox>
        </group>

        {/* ── Thick Well-Shaped Eyebrows ── */}
        <RoundedBox args={[0.18, 0.042, 0.035]} radius={0.015} position={[-0.15, 0.165, 0.32]} rotation={[0.06, 0.04, 0.1]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>
        <RoundedBox args={[0.18, 0.042, 0.035]} radius={0.015} position={[0.15, 0.165, 0.32]} rotation={[0.06, -0.04, -0.1]}>
          <primitive object={hairMaterial} attach="material" />
        </RoundedBox>

        {/* ── Natural Proportionate Sculpted Nose ── */}
        {/* Bridge */}
        <RoundedBox args={[0.058, 0.17, 0.08]} radius={0.025} position={[0, 0.025, 0.315]} rotation={[-0.12, 0, 0]}>
          <primitive object={skinMaterial} attach="material" />
        </RoundedBox>
        {/* Nose Tip */}
        <mesh position={[0, -0.055, 0.355]} scale={[0.055, 0.048, 0.055]}>
          <sphereGeometry args={[1, 16, 16]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>
        {/* Nostril Left */}
        <mesh position={[-0.042, -0.068, 0.335]} scale={[0.028, 0.025, 0.032]}>
          <sphereGeometry args={[1, 12, 12]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>
        {/* Nostril Right */}
        <mesh position={[0.042, -0.068, 0.335]} scale={[0.028, 0.025, 0.032]}>
          <sphereGeometry args={[1, 12, 12]} />
          <primitive object={skinMaterial} attach="material" />
        </mesh>

        {/* ── Charming Smile & Lips ── */}
        {/* Upper Lip */}
        <RoundedBox args={[0.16, 0.028, 0.025]} radius={0.01} position={[0, -0.155, 0.325]}>
          <primitive object={lipMaterial} attach="material" />
        </RoundedBox>
        {/* Subtle confident white teeth peek */}
        <mesh position={[0, -0.175, 0.32]}>
          <boxGeometry args={[0.11, 0.02, 0.015]} />
          <primitive object={teethMaterial} attach="material" />
        </mesh>
        {/* Lower Lip */}
        <RoundedBox args={[0.15, 0.032, 0.03]} radius={0.012} position={[0, -0.195, 0.325]}>
          <primitive object={lipMaterial} attach="material" />
        </RoundedBox>

        {/* ── Groomed Moustache & Stubble Beard ── */}
        {/* Clean Moustache */}
        <RoundedBox args={[0.22, 0.032, 0.02]} radius={0.01} position={[0, -0.13, 0.335]} rotation={[-0.05, 0, 0]}>
          <primitive object={beardMaterial} attach="material" />
        </RoundedBox>
        {/* Soul Patch */}
        <mesh position={[0, -0.23, 0.33]} scale={[0.028, 0.028, 0.008]}>
          <sphereGeometry args={[1, 12, 12]} />
          <primitive object={beardMaterial} attach="material" />
        </mesh>
        {/* Chin Stubble / Trimmed Beard */}
        <RoundedBox args={[0.22, 0.09, 0.16]} radius={0.035} position={[0, -0.32, 0.24]}>
          <primitive object={beardMaterial} attach="material" />
        </RoundedBox>
        {/* Jawline Beard Lines */}
        <RoundedBox args={[0.3, 0.05, 0.2]} radius={0.025} position={[0, -0.27, 0.16]}>
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
            <group onDoubleClick={handleAdminTrigger} onPointerDown={handlePointerDown}>
              <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.1}>
                {modelStatus === 'success' ? (
                  <GLBModel url={modelUrl} />
                ) : (
                  <FallbackCharacter />
                )}
              </Float>
            </group>
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
