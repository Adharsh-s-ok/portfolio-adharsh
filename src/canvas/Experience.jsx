import { useRef, useMemo } from 'react'
import { useFrame, useThree, extend } from '@react-three/fiber'
import { shaderMaterial, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

import galaxyVert from './shaders/galaxy.vert'
import galaxyFrag from './shaders/galaxy.frag'

// ── Custom shader material ────────────────────────────────────────
const GalaxyMaterial = shaderMaterial(
  {
    uTime:  0,
    uSize:  200,
    uMouse: new THREE.Vector2(0, 0),
  },
  galaxyVert,
  galaxyFrag,
)
extend({ GalaxyMaterial })

// ── Galaxy ────────────────────────────────────────────────────────
const Galaxy = () => {
  const matRef = useRef()
  const { size } = useThree()

  const count  = 4000
  const arms   = 4
  const spread = 5

  const [positions, colors, scales, randomness, phases] = useMemo(() => {
    const pos   = new Float32Array(count * 3)
    const col   = new Float32Array(count * 3)
    const scl   = new Float32Array(count)
    const rand  = new Float32Array(count * 3)
    const phase = new Float32Array(count)

    const innerColor = new THREE.Color('#c8a96e')   // gold centre
    const outerColor = new THREE.Color('#4a5568')   // cool grey outer

    for (let i = 0; i < count; i++) {
      const i3      = i * 3
      const radius  = Math.random() * spread
      const armAngle = ((i % arms) / arms) * Math.PI * 2
      const spin     = radius * 0.6
      const angle    = armAngle + spin

      pos[i3]     = Math.cos(angle) * radius
      pos[i3 + 1] = 0
      pos[i3 + 2] = Math.sin(angle) * radius

      const mixColor = innerColor.clone().lerp(outerColor, radius / spread)
      col[i3]     = mixColor.r
      col[i3 + 1] = mixColor.g
      col[i3 + 2] = mixColor.b

      const randMag = Math.pow(Math.random(), 2) * 0.35
      rand[i3]     = (Math.random() - 0.5) * randMag
      rand[i3 + 1] = (Math.random() - 0.5) * randMag * 0.4
      rand[i3 + 2] = (Math.random() - 0.5) * randMag

      scl[i]   = Math.random() * 2.5 + 0.5
      phase[i] = Math.random() * Math.PI * 2
    }

    return [pos, col, scl, rand, phase]
  }, [])

  useFrame(({ clock, mouse }) => {
    if (!matRef.current) return
    matRef.current.uTime  = clock.elapsedTime
    matRef.current.uMouse.set(mouse.x, mouse.y)
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors,    3]} />
        <bufferAttribute attach="attributes-aScale"   args={[scales,    1]} />
        <bufferAttribute attach="attributes-aRandomness" args={[randomness, 3]} />
        <bufferAttribute attach="attributes-aPhase"   args={[phases,    1]} />
      </bufferGeometry>
      <galaxyMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexColors
        uSize={size.width < 768 ? 120 : 200}
      />
    </points>
  )
}

// ── Floating orb ──────────────────────────────────────────────────
const FloatingOrb = () => {
  const meshRef = useRef()

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = clock.elapsedTime * 0.15
    meshRef.current.rotation.y = clock.elapsedTime * 0.22
    meshRef.current.position.x += (mouse.x * 1.5 - meshRef.current.position.x) * 0.04
    meshRef.current.position.y += (-mouse.y * 1.5 - meshRef.current.position.y) * 0.04
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={[3.5, 0.5, -1.5]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#c8a96e"
          wireframe
          transparent
          opacity={0.18}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

// ── Scene ─────────────────────────────────────────────────────────
const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#c8a96e" />
      <Galaxy />
      <FloatingOrb />
    </>
  )
}

export default Experience
