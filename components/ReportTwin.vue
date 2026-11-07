<script setup lang="ts">
import * as THREE from 'three'
const props = withDefaults(defineProps<{ anomalies?: any[]; lengthKm?: number; height?: number }>(), { anomalies: () => [], lengthKm: 40, height: 320 })
const mount = ref<HTMLDivElement | null>(null)
const fallback = ref(false)
let renderer: THREE.WebGLRenderer | null = null
let frame = 0
let observer: ResizeObserver | null = null
let drag = false, lastX = 0, rotY = -0.5
let cleanup = () => {}
const palette: Record<string, number> = { low: 0x5be3b3, medium: 0xf6c453, high: 0xff8a3d, critical: 0xff4d3d }

onMounted(() => {
  if (!mount.value) return
  try { const probe = document.createElement('canvas'); if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) { fallback.value = true; return } } catch { fallback.value = true; return }
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x0b1713)
  scene.fog = new THREE.Fog(0x0b1713, 18, 46)
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
  camera.position.set(0, 7, 24)
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  mount.value.appendChild(renderer.domElement)
  renderer.domElement.style.width = '100%'
  renderer.domElement.style.height = '100%'
  renderer.domElement.style.display = 'block'

  scene.add(new THREE.AmbientLight(0xffffff, 1.4))
  const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(5, 8, 6); scene.add(key)
  const rim = new THREE.DirectionalLight(0x5be3b3, 1.5); rim.position.set(-8, 2, -8); scene.add(rim)

  const segments = 96
  const points = 9
  const radius = 1.5
  const length = 17
  const positions: number[] = []
  for (let i = 0; i <= segments; i++) {
    const x = -length / 2 + (i / segments) * length
    const wobble = Math.sin(i / 8) * 0.06
    for (let j = 0; j < points; j++) {
      const a = (j / points) * Math.PI * 2
      positions.push(x, Math.cos(a) * (radius + wobble), Math.sin(a) * (radius + wobble))
    }
  }
  const indices: number[] = []
  for (let i = 0; i < segments; i++) for (let j = 0; j < points; j++) {
    const a = i * points + j, b = i * points + ((j + 1) % points), c = (i + 1) * points + j, d = (i + 1) * points + ((j + 1) % points)
    indices.push(a, c, b, b, c, d)
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geo.setIndex(indices); geo.computeVertexNormals()
  const pipe = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x21322a, metalness: .85, roughness: .28, side: THREE.DoubleSide, transparent: true, opacity: .9 }))
  pipe.rotation.z = 0
  scene.add(pipe)

  // flange rings
  for (const x of [-length / 2, length / 2]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius + .12, .07, 10, 48), new THREE.MeshStandardMaterial({ color: 0x5be3b3, metalness: .6, roughness: .3 }))
    ring.rotation.y = Math.PI / 2; ring.position.x = x; scene.add(ring)
  }
  // floor grid
  const grid = new THREE.GridHelper(36, 36, 0x1f362b, 0x14251d); grid.position.y = -3.6; scene.add(grid)

  const group = new THREE.Group(); scene.add(group)
  for (const a of props.anomalies) {
    const x = -length / 2 + (Number(a.distanceM) / Math.max(1, props.lengthKm * 1000)) * length
    const depth = Number(a.depthPct || 10) / 100
    const color = palette[a.severity] || 0x5be3b3
    const ring = new THREE.Mesh(new THREE.TorusGeometry(radius + .16, .045 + depth * .12, 8, 32), new THREE.MeshBasicMaterial({ color }))
    ring.rotation.y = Math.PI / 2; ring.position.x = x; group.add(ring)
    const marker = new THREE.Mesh(new THREE.SphereGeometry(.11 + depth * .25, 12, 12), new THREE.MeshBasicMaterial({ color }))
    marker.position.set(x, radius + .25, 0); group.add(marker)
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, .8, 6), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .55 }))
    beam.position.set(x, radius + .65, 0); group.add(beam)
  }

  const resize = () => {
    if (!mount.value || !renderer) return
    const w = mount.value.clientWidth, h = mount.value.clientHeight
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix()
  }
  observer = new ResizeObserver(resize); observer.observe(mount.value); resize()

  const onDown = (e: PointerEvent) => { drag = true; lastX = e.clientX }
  const onUp = () => { drag = false }
  const onMove = (e: PointerEvent) => { if (!drag) return; rotY += (e.clientX - lastX) * .006; lastX = e.clientX }
  const el = renderer.domElement
  el.addEventListener('pointerdown', onDown); window.addEventListener('pointerup', onUp); el.addEventListener('pointermove', onMove)

  const animate = () => {
    frame = requestAnimationFrame(animate)
    if (!drag) rotY += .0012
    group.rotation.y = rotY
    pipe.rotation.y = rotY
    camera.position.y = 7 + Math.sin(performance.now() / 4200) * .35
    camera.lookAt(0, 0, 0)
    renderer?.render(scene, camera)
  }
  animate()

  cleanup = () => {
    cancelAnimationFrame(frame); observer?.disconnect(); renderer?.dispose()
    el.removeEventListener('pointerdown', onDown); window.removeEventListener('pointerup', onUp); el.removeEventListener('pointermove', onMove)
    scene.traverse((obj) => { if (obj instanceof THREE.Mesh) { obj.geometry.dispose(); if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose()); else obj.material.dispose() } })
    mount.value?.removeChild(el)
  }
})
onUnmounted(() => cleanup())
</script>
<template>
  <div v-if="!fallback" ref="mount" class="relative w-full overflow-hidden rounded-xl" :style="{ height: `${height}px` }" aria-label="Interactive 3D pipe view">
    <div class="pointer-events-none absolute left-3 top-3 z-10 rounded-full border border-bone/15 bg-ink/60 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[.1em] text-bone/75 backdrop-blur">Drag to orbit · live 3D twin</div>
  </div>
  <div v-else class="overflow-hidden rounded-xl bg-ink"><AnomalyCanvas :anomalies="anomalies" :length-km="lengthKm" :height="height - 40" /></div>
</template>
