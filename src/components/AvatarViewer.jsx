'use client'
/**
 * AvatarViewer.jsx
 *
 * Loads: public/models/dadapeer_avatar.glb
 * Model: Hunyuan3D-2 generated mesh — no rig, no texture, no background
 *        Raw geometry only (POSITION attributes, no normals/UVs)
 *
 * Features:
 * - Computes smooth vertex normals at load time
 * - Applies warm stylized skin-tone PBR material
 * - Mouse parallax: whole character looks toward cursor
 * - Cinematic 3-point lighting
 * - Transparent canvas (hero background shows through)
 * - Graceful fallback if model is missing
 * - Double-tap → /admin/login
 */

import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Float, ContactShadows, OrbitControls } from '@react-three/drei'
import { Suspense, useRef, useEffect, useState, useCallback } from 'react'
import * as THREE from 'three'
import { useRouter } from 'next/navigation'

// ─────────────────────────────────────────────────────────
// Character — loads GLB, computes normals, adds material
// ─────────────────────────────────────────────────────────
function Character({ url }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  // Pointer tracking
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.tx = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.ty = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onTouch = (e) => {
      if (!e.touches[0]) return
      mouse.current.tx = (e.touches[0].clientX / window.innerWidth) * 2 - 1
      mouse.current.ty = -(e.touches[0].clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchmove', onTouch)
    }
  }, [])

  // Process the raw mesh once: compute normals + assign warm PBR material
  useEffect(() => {
    if (!scene) return

    // Warm medium-brown stylized PBR — slightly desaturated for a sculpted look
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#b87a58'),
      roughness: 0.72,
      metalness: 0.0,
      envMapIntensity: 0.6,
    })

    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)

    // Scale: fit full height into ~1.9 units
    const scale = 1.9 / maxDim
    scene.scale.setScalar(scale)

    // Position: center horizontally, shift UP so the head is near the top of the frame
    // The camera looks at y=0.3, so we shift character center up by ~30% of height
    scene.position.set(
      -center.x * scale,
      -center.y * scale + (size.y * scale * 0.28),
      -center.z * scale
    )

    scene.traverse((child) => {
      if (child.isMesh) {
        // Compute smooth vertex normals (model has none — Hunyuan3D-2 raw mesh)
        if (child.geometry) {
          child.geometry.computeVertexNormals()
        }
        child.material = material
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [scene])

  // Smooth mouse-follow animation
  useFrame((state) => {
    if (!groupRef.current) return

    // Lerp mouse position for smoothness
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.tx, 0.06)
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.ty, 0.06)

    // Rotate toward cursor: max ±18° horizontal, ±10° vertical
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.current.x * 0.32,
      0.08
    )
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.current.y * 0.18,
      0.08
    )

    // Idle breathing bob
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 1.1) * 0.022
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// Animated kinetic-ring placeholder (no GLB yet)
// ─────────────────────────────────────────────────────────
function KineticPlaceholder() {
  const r1 = useRef(), r2 = useRef(), r3 = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (r1.current) { r1.current.rotation.z = t * 0.5; r1.current.scale.setScalar(1 + Math.sin(t * 1.4) * 0.05) }
    if (r2.current) { r2.current.rotation.z = -t * 0.3; r2.current.scale.setScalar(1 + Math.sin(t * 1.0 + 1.2) * 0.06) }
    if (r3.current) { r3.current.rotation.z = t * 0.18; r3.current.scale.setScalar(1 + Math.sin(t * 0.7 + 2.1) * 0.07) }
  })

  return (
    <group>
      <mesh ref={r3} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.92, 1.0, 96]} />
        <meshBasicMaterial color="#D91F25" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={r2} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.66, 0.76, 80]} />
        <meshBasicMaterial color="#D91F25" transparent opacity={0.14} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.44, 0.58, 64]} />
        <meshBasicMaterial color="#D91F25" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#D91F25" transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────
// Lights — cinematic 3-point + red bounce
// ─────────────────────────────────────────────────────────
function Lights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <hemisphereLight skyColor="#fff8f0" groundColor="#1a0800" intensity={0.9} />
      {/* Warm key — front left, high */}
      <directionalLight
        position={[2.5, 4.5, 3.5]}
        intensity={2.6}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={5}
        shadow-camera-bottom={-2}
      />
      {/* Cool fill — front right */}
      <directionalLight position={[-3, 2, 2]} intensity={1.1} color="#c8e0ff" />
      {/* Warm golden rim — upper back */}
      <pointLight position={[0, 3.5, -2.8]} intensity={4.5} color="#fde68a" distance={10} />
      {/* Red bounce from hero circle */}
      <pointLight position={[0, -2, 0.8]} intensity={2.8} color="#D91F25" distance={8} />
    </>
  )
}

// ─────────────────────────────────────────────────────────
// CSS pulse while loading / missing
// ─────────────────────────────────────────────────────────
function PulseRing() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <style>{`
        @keyframes dpPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.12); opacity: 1; }
        }
        @keyframes dpPulseInner {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.16); opacity: 0.85; }
        }
      `}</style>
      <div style={{
        width: 'clamp(100px, 14vw, 160px)',
        height: 'clamp(100px, 14vw, 160px)',
        borderRadius: '50%',
        background: 'rgba(217,31,37,0.15)',
        animation: 'dpPulse 2.2s ease-in-out infinite',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '60%', height: '60%',
          borderRadius: '50%',
          background: 'rgba(217,31,37,0.3)',
          animation: 'dpPulseInner 2.2s ease-in-out infinite 0.55s',
        }} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────────────────
export default function AvatarViewer({ modelUrl, className = '' }) {
  const [status, setStatus] = useState('checking') // checking | found | missing
  const lastTapRef = useRef(0)
  const router = useRouter()

  const resolvedUrl = modelUrl || '/models/dadapeer_avatar.glb'

  const goAdmin = useCallback(() => router.push('/admin/login'), [router])

  const onPointerDown = useCallback((e) => {
    e?.stopPropagation?.()
    const now = Date.now()
    if (now - lastTapRef.current < 300) goAdmin()
    lastTapRef.current = now
  }, [goAdmin])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') goAdmin()
  }, [goAdmin])

  useEffect(() => {
    let cancelled = false
    fetch(resolvedUrl, { method: 'HEAD' })
      .then((r) => { if (!cancelled) setStatus(r.ok ? 'found' : 'missing') })
      .catch(() => { if (!cancelled) setStatus('missing') })
    return () => { cancelled = true }
  }, [resolvedUrl])

  const modelReady = status === 'found'

  return (
    <div
      style={{ width: '100%', height: '100%', minHeight: 300, position: 'relative', outline: 'none' }}
      className={className}
      tabIndex={0}
      onKeyDown={onKeyDown}
      role="img"
      aria-label="Interactive 3D avatar"
    >
      {/* CSS pulse — shown while checking or missing */}
      {!modelReady && <div style={{ position: 'absolute', inset: 0 }}><PulseRing /></div>}

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0.5, 2.5], fov: 42 }}
        shadows
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.05 }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          outline: 'none',
          touchAction: 'none',
          opacity: modelReady ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      >
        <Lights />

        <Suspense fallback={null}>
          <Float
            speed={1.3}
            rotationIntensity={0.03}
            floatIntensity={0.12}
            floatingRange={[-0.05, 0.05]}
          >
            <group onDoubleClick={goAdmin} onPointerDown={onPointerDown}>
              {modelReady
                ? <Character url={resolvedUrl} />
                : <KineticPlaceholder />
              }
            </group>
          </Float>
        </Suspense>

        <ContactShadows
          position={[0, -1.65, 0]}
          opacity={0.5}
          scale={5}
          blur={2.2}
          color="#000000"
          frames={1}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.75}
          minAzimuthAngle={-Math.PI / 4.5}
          maxAzimuthAngle={Math.PI / 4.5}
        />
      </Canvas>
    </div>
  )
}
