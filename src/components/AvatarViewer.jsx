'use client'
/**
 * AvatarViewer.jsx
 *
 * HOW TO REPLACE THE PLACEHOLDER WITH YOUR REAL AVATAR
 * ──────────────────────────────────────────────────────
 * 1. Go to https://readyplayer.me (free, no install needed)
 * 2. Create your avatar:
 *    - Select "Half-body" or "Full-body" → Male
 *    - Skin tone: warm brown (#c28562 range)
 *    - Hair: short textured black, side-swept
 *    - Add moustache + short stubble beard
 *    - Eyes: dark brown
 *    - Outfit: dark crew-neck + denim jacket (or any dark streetwear)
 *    - Add the "vibes" style sunglasses if available
 * 3. Click "Download" → choose ".glb"
 * 4. Rename the file to: dadapeer_avatar.glb
 * 5. Place it at: public/models/dadapeer_avatar.glb
 * 6. Reload your dev server — it will load automatically.
 *
 * Alternative free sources for a quality stylized male GLB:
 * - https://www.mixamo.com (Mixamo characters)
 * - https://sketchfab.com/3d-models?features=downloadable&sort_by=-likeCount&q=stylized+male+character
 * - https://quaternius.com (Quaternius free packs — CC0)
 */

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, ContactShadows, useGLTF, Float, SpotLight, useProgress } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

// ─────────────────────────────────────────────────────────
// GLBModel — loads & displays an actual 3D model file
// ─────────────────────────────────────────────────────────
function GLBModel({ url }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handler = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const touchHandler = (e) => {
      if (!e.touches[0]) return
      mouse.current.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handler)
    window.addEventListener('touchmove', touchHandler, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handler)
      window.removeEventListener('touchmove', touchHandler)
    }
  }, [])

  // Auto-fit the model to the scene
  useEffect(() => {
    if (!scene) return
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 1.8 / maxDim
    scene.scale.setScalar(scale)
    scene.position.set(
      -center.x * scale,
      -center.y * scale - (size.y * scale * 0.1), // slight downward shift to frame torso+head
      -center.z * scale
    )

    // Enhance materials: warm skin tones, better roughness
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.needsUpdate = true
        }
      }
    })
  }, [scene])

  // Subtle idle parallax — head tracks mouse
  useFrame((state) => {
    if (!groupRef.current) return
    const targetY = mouse.current.x * 0.18
    const targetX = mouse.current.y * 0.1
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05)
    // Idle breathing bob
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.018
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// AnimatedPlaceholder — shown when no GLB exists yet
// Premium kinetic rings + pulsing silhouette
// ─────────────────────────────────────────────────────────
function AnimatedPlaceholder() {
  const ring1 = useRef()
  const ring2 = useRef()
  const ring3 = useRef()
  const core = useRef()
  const silRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1.current) {
      ring1.current.rotation.z = t * 0.4
      ring1.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.04)
    }
    if (ring2.current) {
      ring2.current.rotation.z = -t * 0.25
      ring2.current.scale.setScalar(1 + Math.sin(t * 0.9 + 1) * 0.055)
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.15
      ring3.current.scale.setScalar(1 + Math.sin(t * 0.7 + 2) * 0.065)
    }
    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(t * 1.8) * 0.06)
    }
    if (silRef.current) {
      silRef.current.position.y = Math.sin(t * 1.1) * 0.04 - 0.5
    }
  })

  const redMat = new THREE.MeshBasicMaterial({ color: '#D91F25', transparent: true, opacity: 0.18, side: THREE.DoubleSide })
  const red2Mat = new THREE.MeshBasicMaterial({ color: '#D91F25', transparent: true, opacity: 0.10, side: THREE.DoubleSide })
  const red3Mat = new THREE.MeshBasicMaterial({ color: '#D91F25', transparent: true, opacity: 0.06, side: THREE.DoubleSide })
  const coreMat = new THREE.MeshBasicMaterial({ color: '#D91F25', transparent: true, opacity: 0.5 })
  const silMat = new THREE.MeshStandardMaterial({ color: '#1a1a1a', transparent: true, opacity: 0.25, roughness: 1 })

  return (
    <group>
      {/* Outer rings — kinetic animation */}
      <mesh ref={ring3} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.95, 1.02, 80]} />
        <primitive object={red3Mat} attach="material" />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.72, 0.82, 80]} />
        <primitive object={red2Mat} attach="material" />
      </mesh>
      <mesh ref={ring1} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.64, 64]} />
        <primitive object={redMat} attach="material" />
      </mesh>

      {/* Glowing core */}
      <mesh ref={core} position={[0, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <primitive object={coreMat} attach="material" />
      </mesh>

      {/* Ghost silhouette — abstract human form */}
      <group ref={silRef}>
        {/* Head */}
        <mesh position={[0, 0.72, 0]}>
          <sphereGeometry args={[0.2, 24, 24]} />
          <primitive object={silMat} attach="material" />
        </mesh>
        {/* Torso */}
        <mesh position={[0, 0.18, 0]}>
          <capsuleGeometry args={[0.15, 0.45, 8, 16]} />
          <primitive object={silMat} attach="material" />
        </mesh>
        {/* Left arm */}
        <mesh position={[-0.28, 0.28, 0]} rotation={[0, 0, 0.35]}>
          <capsuleGeometry args={[0.065, 0.38, 6, 12]} />
          <primitive object={silMat} attach="material" />
        </mesh>
        {/* Right arm */}
        <mesh position={[0.28, 0.28, 0]} rotation={[0, 0, -0.35]}>
          <capsuleGeometry args={[0.065, 0.38, 6, 12]} />
          <primitive object={silMat} attach="material" />
        </mesh>
      </group>
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// CSS-only placeholder (shown before Three.js canvas boots)
// ─────────────────────────────────────────────────────────
function HTMLPlaceholder() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '1rem',
    }}>
      <div style={{
        width: 'clamp(120px, 16vw, 180px)',
        height: 'clamp(120px, 16vw, 180px)',
        borderRadius: '50%',
        background: 'rgba(217,31,37,0.18)',
        animation: 'avatarPulse 2s ease-in-out infinite',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '60%', height: '60%',
          borderRadius: '50%',
          background: 'rgba(217,31,37,0.35)',
          animation: 'avatarPulse 2s ease-in-out infinite 0.5s',
        }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Main export — AvatarViewer
// ─────────────────────────────────────────────────────────
export default function AvatarViewer({ modelUrl, className = '' }) {
  const [modelStatus, setModelStatus] = useState('checking') // checking | found | missing
  const lastTapRef = useRef(0)
  const router = useRouter()

  // Resolve the actual model path to check
  const resolvedUrl = modelUrl || '/models/dadapeer_avatar.glb'

  const handleAdminTrigger = useCallback(() => {
    router.push('/admin/login')
  }, [router])

  const handlePointerDown = useCallback((e) => {
    e?.stopPropagation?.()
    const now = Date.now()
    if (now - lastTapRef.current < 300) {
      handleAdminTrigger()
    }
    lastTapRef.current = now
  }, [handleAdminTrigger])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') handleAdminTrigger()
  }, [handleAdminTrigger])

  // HEAD-request the model path to determine if GLB actually exists
  useEffect(() => {
    fetch(resolvedUrl, { method: 'HEAD' })
      .then((res) => {
        setModelStatus(res.ok ? 'found' : 'missing')
      })
      .catch(() => setModelStatus('missing'))
  }, [resolvedUrl])

  return (
    <>
      {/* Pulse animation keyframes injected once */}
      <style>{`
        @keyframes avatarPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.08); opacity: 1; }
        }
      `}</style>

      <div
        style={{ width: '100%', height: '100%', minHeight: 320, cursor: modelStatus === 'found' ? 'grab' : 'default', outline: 'none' }}
        className={className}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="img"
        aria-label="Portfolio avatar"
      >
        {/* While checking or missing — show CSS pulse placeholder */}
        {modelStatus !== 'found' && <HTMLPlaceholder />}

        {/* Canvas — always mount when found; show kinetic rings while checking */}
        {modelStatus !== 'checking' && (
          <Canvas
            camera={{ position: [0, 0.4, 2.8], fov: 42 }}
            shadows
            dpr={[1, 2]}
            style={{
              width: '100%',
              height: modelStatus === 'found' ? '100%' : '0px',
              position: modelStatus === 'found' ? 'relative' : 'absolute',
              outline: 'none',
              touchAction: 'none',
            }}
          >
            {/* Cinematic lighting rig */}
            <ambientLight intensity={0.9} />
            <hemisphereLight skyColor="#fff5e8" groundColor="#1a0a00" intensity={1.0} />
            {/* Warm key light — front left */}
            <directionalLight
              position={[2.5, 5, 3.5]}
              intensity={2.8}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-near={0.1}
              shadow-camera-far={20}
              shadow-camera-left={-3}
              shadow-camera-right={3}
              shadow-camera-top={4}
              shadow-camera-bottom={-2}
            />
            {/* Cool fill — front right */}
            <directionalLight position={[-3, 2, 2]} intensity={1.0} color="#d0e8ff" />
            {/* Warm golden rim — behind */}
            <pointLight position={[0, 3.5, -2.5]} intensity={4} color="#fde68a" />
            {/* Red circle bounce — subtle red from below */}
            <pointLight position={[0, -1.5, 0.5]} intensity={2.5} color="#D91F25" />

            <Suspense fallback={null}>
              <Float speed={1.4} rotationIntensity={0.04} floatIntensity={0.14}>
                <group
                  onDoubleClick={handleAdminTrigger}
                  onPointerDown={handlePointerDown}
                >
                  {modelStatus === 'found' ? (
                    <GLBModel url={resolvedUrl} />
                  ) : (
                    <AnimatedPlaceholder />
                  )}
                </group>
              </Float>
            </Suspense>

            <ContactShadows
              position={[0, -1.6, 0]}
              opacity={0.55}
              scale={6}
              blur={2.5}
              color="#000000"
            />

            <OrbitControls
              enableZoom={false}
              enablePan={false}
              minPolarAngle={Math.PI / 3.2}
              maxPolarAngle={Math.PI / 1.8}
              minAzimuthAngle={-Math.PI / 5}
              maxAzimuthAngle={Math.PI / 5}
            />
          </Canvas>
        )}
      </div>
    </>
  )
}
