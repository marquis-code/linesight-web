<script setup lang="ts">
const props = withDefaults(defineProps<{ anomalies?: any[]; lengthKm?: number; height?: number; tone?: 'dark' | 'light'; compact?: boolean }>(), { anomalies: () => [], lengthKm: 40, height: 260, tone: 'dark', compact: false })
const el = ref<HTMLCanvasElement | null>(null)
let ro: ResizeObserver | null = null

function draw() {
  const canvas = el.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.scale(dpr, dpr)
  const w = rect.width, h = rect.height
  const dark = props.tone === 'dark'
  ctx.clearRect(0, 0, w, h)
  ctx.fillStyle = dark ? '#0b1713' : '#f8f5ec'
  ctx.fillRect(0, 0, w, h)

  const pad = props.compact ? 16 : 28
  const plotTop = props.compact ? 30 : 44
  const plotBottom = h - (props.compact ? 24 : 40)
  ctx.strokeStyle = dark ? 'rgba(248,245,236,.08)' : 'rgba(7,16,14,.08)'
  ctx.lineWidth = 1
  for (let i = 0; i <= 8; i++) {
    const x = pad + (w - pad * 2) * (i / 8)
    ctx.beginPath(); ctx.moveTo(x, plotTop); ctx.lineTo(x, plotBottom); ctx.stroke()
  }
  for (let i = 0; i <= 4; i++) {
    const y = plotTop + (plotBottom - plotTop) * (i / 4)
    ctx.beginPath(); ctx.moveTo(pad, y); ctx.lineTo(w - pad, y); ctx.stroke()
  }

  const xAt = (d: number) => pad + (w - pad * 2) * Math.min(1, Math.max(0, d / Math.max(1, props.lengthKm * 1000)))
  const baseY = (x: number) => plotTop + (plotBottom - plotTop) * .58 + Math.sin(x / (w * .11)) * (plotBottom - plotTop) * .06

  // route shadow
  ctx.beginPath()
  for (let x = pad; x <= w - pad; x += 2) {
    const y = baseY(x)
    x === pad ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.strokeStyle = dark ? 'rgba(248,245,236,.16)' : 'rgba(7,16,14,.16)'
  ctx.lineWidth = 14
  ctx.lineCap = 'round'
  ctx.stroke()
  ctx.strokeStyle = dark ? '#5be3b3' : '#0b6b4e'
  ctx.lineWidth = 2
  ctx.stroke()

  const colors: Record<string, string> = { low: '#5be3b3', medium: '#f6c453', high: '#ff8a3d', critical: '#ff4d3d' }
  props.anomalies.forEach((a) => {
    const x = xAt(Number(a.distanceM || 0))
    const y = baseY(x)
    const depth = Number(a.depthPct || 10)
    const bar = Math.max(5, (depth / 100) * (plotBottom - plotTop) * .55)
    const color = colors[a.severity] || '#5be3b3'
    ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x, y - 4 - bar)
    ctx.strokeStyle = color; ctx.lineWidth = props.compact ? 3 : 2; ctx.stroke()
    ctx.beginPath(); ctx.arc(x, y, props.compact ? 4 : 5, 0, Math.PI * 2)
    ctx.fillStyle = color; ctx.fill()
    if (!props.compact) {
      ctx.fillStyle = color; ctx.font = '9px "IBM Plex Mono", monospace'
      ctx.fillText(`${depth.toFixed(0)}%`, x + 6, y - 8 - bar)
    }
  })

  ctx.fillStyle = dark ? 'rgba(248,245,236,.4)' : 'rgba(7,16,14,.45)'
  ctx.font = '9px "IBM Plex Mono", monospace'
  ctx.fillText('0 km', pad, h - 12)
  ctx.fillText(`${props.lengthKm} km`, w - pad - 34, h - 12)
  if (!props.compact) {
    ctx.fillStyle = dark ? 'rgba(248,245,236,.55)' : 'rgba(7,16,14,.55)'
    ctx.fillText('PIPELINE DISTANCE / METAL LOSS', pad, 22)
  }
}

onMounted(() => {
  draw()
  ro = new ResizeObserver(draw)
  if (el.value) ro.observe(el.value)
})
onUnmounted(() => ro?.disconnect())
watch(() => [props.anomalies, props.lengthKm, props.tone], draw, { deep: true })
</script>
<template>
  <canvas ref="el" class="block w-full" :style="{ height: `${height}px` }" aria-label="Pipeline anomaly depth profile" role="img" />
</template>
