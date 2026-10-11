/**
 * inspect_glb_deep.mjs
 * Deep inspection: geometry primitive details, vertex count, attributes
 */
import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const glbPath = path.join(__dirname, '../public/models/dadapeer_avatar.glb')
const buf = readFileSync(glbPath)

const chunkLength0 = buf.readUInt32LE(12)
const jsonStr = buf.slice(20, 20 + chunkLength0).toString('utf8')
const gltf = JSON.parse(jsonStr)

console.log('=== Full GLTF JSON ===')
console.log(JSON.stringify(gltf, null, 2))
