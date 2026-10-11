/**
 * inspect_glb.mjs
 * Run: node inspect_glb.mjs
 * Inspects the GLB to find: bones, mesh names, materials, background objects
 */
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Read raw GLB header + JSON chunk to extract scene structure
const glbPath = path.join(__dirname, '../public/models/dadapeer_avatar.glb')
const buf = readFileSync(glbPath)

// GLB: magic(4) version(4) length(4) | chunkLength(4) chunkType(4) chunkData...
const magic = buf.readUInt32LE(0)
const version = buf.readUInt32LE(4)
const chunkLength0 = buf.readUInt32LE(12)
const chunkType0 = buf.readUInt32LE(16)

console.log('=== GLB Header ===')
console.log(`Magic: 0x${magic.toString(16)} (should be 0x46546c67)`)
console.log(`Version: ${version}`)
console.log(`JSON chunk length: ${chunkLength0} bytes`)
console.log(`Chunk 0 type: 0x${chunkType0.toString(16)} (0x4e4f534a = JSON)`)

// Extract JSON chunk
const jsonStr = buf.slice(20, 20 + chunkLength0).toString('utf8')
const gltf = JSON.parse(jsonStr)

console.log('\n=== Scene Nodes ===')
if (gltf.nodes) {
  gltf.nodes.forEach((n, i) => {
    const hasMesh = n.mesh !== undefined
    const hasSkin = n.skin !== undefined
    const isJoint = gltf.skins?.some(s => s.joints.includes(i))
    console.log(`  [${i}] "${n.name}" | mesh:${hasMesh} skin:${hasSkin} joint:${isJoint}`)
  })
}

console.log('\n=== Meshes ===')
if (gltf.meshes) {
  gltf.meshes.forEach((m, i) => {
    const primCount = m.primitives?.length || 0
    const mats = m.primitives?.map(p => p.material).filter(v => v !== undefined) || []
    console.log(`  [${i}] "${m.name}" | primitives:${primCount} materials:[${mats.join(',')}]`)
  })
}

console.log('\n=== Skins / Bones ===')
if (gltf.skins) {
  gltf.skins.forEach((s, i) => {
    const jointNames = s.joints.map(j => gltf.nodes[j]?.name || `node${j}`)
    console.log(`  Skin[${i}] "${s.name}" joints(${s.joints.length}): ${jointNames.slice(0,20).join(', ')}...`)
  })
} else {
  console.log('  No skins found — model is not rigged')
}

console.log('\n=== Animations ===')
if (gltf.animations) {
  gltf.animations.forEach((a, i) => {
    console.log(`  [${i}] "${a.name}" channels:${a.channels?.length}`)
  })
} else {
  console.log('  No animations')
}

console.log('\n=== Materials ===')
if (gltf.materials) {
  gltf.materials.forEach((m, i) => {
    const alphaMode = m.alphaMode || 'OPAQUE'
    const doubleSided = m.doubleSided || false
    const baseColor = m.pbrMetallicRoughness?.baseColorFactor || 'texture'
    const hasTexture = !!m.pbrMetallicRoughness?.baseColorTexture
    console.log(`  [${i}] "${m.name}" | alpha:${alphaMode} doubleSided:${doubleSided} baseColor:${JSON.stringify(baseColor)} hasTexture:${hasTexture}`)
  })
}

console.log('\n=== Camera ===')
if (gltf.cameras) {
  gltf.cameras.forEach((c, i) => console.log(`  [${i}] "${c.name}" type:${c.type}`))
} else {
  console.log('  No embedded cameras')
}

console.log('\n=== Extensions used ===')
console.log(' ', JSON.stringify(gltf.extensionsUsed || []))
