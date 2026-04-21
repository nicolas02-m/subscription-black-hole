<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  savingsPercentage: {
    type: Number,
    default: 0
  }
})

const canvasRef = ref(null)
const animationId = ref(null)
const animatedSavings = ref(0)

let rotation = 0
let lastTimestamp = 0

const clampedSavings = computed(() => {
  return Math.min(100, Math.max(0, Number(props.savingsPercentage) || 0))
})

const remainingPercentage = computed(() => {
  return Math.max(0, 100 - clampedSavings.value)
})

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3)
}

function drawBackground(ctx, width, height) {
  const spaceGradient = ctx.createLinearGradient(0, 0, width, height)
  spaceGradient.addColorStop(0, '#04111f')
  spaceGradient.addColorStop(0.55, '#12051d')
  spaceGradient.addColorStop(1, '#22110f')
  ctx.fillStyle = spaceGradient
  ctx.fillRect(0, 0, width, height)

  for (let i = 0; i < 60; i += 1) {
    const x = (i * 73) % width
    const y = (i * 131) % height
    const alpha = 0.12 + (i % 5) * 0.07
    const size = 1 + (i % 3)

    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
    ctx.beginPath()
    ctx.arc(x, y, size, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawComparisonBeam(ctx, width, height) {
  const gradient = ctx.createLinearGradient(width * 0.28, 0, width * 0.72, 0)
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
  gradient.addColorStop(0.5, 'rgba(127, 219, 255, 0.35)')
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

  ctx.strokeStyle = gradient
  ctx.lineWidth = 2
  ctx.setLineDash([8, 10])
  ctx.beginPath()
  ctx.moveTo(width * 0.28, height * 0.55)
  ctx.lineTo(width * 0.72, height * 0.55)
  ctx.stroke()
  ctx.setLineDash([])
}

function drawBlackHole(ctx, options) {
  const {
    centerX,
    centerY,
    baseRadius,
    displayedRadius,
    label,
    subtitle,
    highlight,
    intensity,
  } = options

  const diskRadius = displayedRadius * (1.7 + intensity * 0.18)
  const glowRadius = displayedRadius * (2 + intensity * 0.25)

  ctx.save()
  ctx.translate(centerX, centerY)

  const outerGlow = ctx.createRadialGradient(0, 0, displayedRadius * 0.2, 0, 0, glowRadius)
  outerGlow.addColorStop(0, `rgba(255, 188, 106, ${0.2 + intensity * 0.06})`)
  outerGlow.addColorStop(0.55, `rgba(97, 186, 255, ${0.18 + intensity * 0.05})`)
  outerGlow.addColorStop(1, 'rgba(97, 186, 255, 0)')
  ctx.fillStyle = outerGlow
  ctx.beginPath()
  ctx.arc(0, 0, glowRadius, 0, Math.PI * 2)
  ctx.fill()

  for (let i = 0; i < 3; i += 1) {
    ctx.save()
    ctx.rotate(rotation * (0.8 + i * 0.1) + i * 1.7)

    const diskGradient = ctx.createLinearGradient(-diskRadius, 0, diskRadius, 0)
    diskGradient.addColorStop(0, 'rgba(255, 140, 70, 0)')
    diskGradient.addColorStop(0.25, `rgba(255, 161, 87, ${0.18 + intensity * 0.04})`)
    diskGradient.addColorStop(0.5, `rgba(255, 231, 158, ${0.45 + intensity * 0.08})`)
    diskGradient.addColorStop(0.75, `rgba(255, 161, 87, ${0.2 + intensity * 0.05})`)
    diskGradient.addColorStop(1, 'rgba(255, 140, 70, 0)')

    ctx.fillStyle = diskGradient
    ctx.beginPath()
    ctx.ellipse(0, 0, diskRadius, diskRadius * 0.32, i * 0.2, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  ctx.strokeStyle = highlight
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(0, 0, displayedRadius + 6, 0, Math.PI * 2)
  ctx.stroke()

  const innerGlow = ctx.createRadialGradient(0, 0, displayedRadius * 0.15, 0, 0, displayedRadius * 0.95)
  innerGlow.addColorStop(0, 'rgba(20, 24, 38, 0.2)')
  innerGlow.addColorStop(1, 'rgba(0, 0, 0, 1)')
  ctx.fillStyle = innerGlow
  ctx.beginPath()
  ctx.arc(0, 0, displayedRadius, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = highlight
  ctx.font = '700 20px Georgia'
  ctx.textAlign = 'center'
  ctx.fillText(label, 0, baseRadius + 54)

  ctx.fillStyle = 'rgba(232, 240, 255, 0.88)'
  ctx.font = '600 14px Arial'
  ctx.fillText(subtitle, 0, baseRadius + 78)

  ctx.restore()
}

function drawDifferenceBadge(ctx, width, height, savings, remaining) {
  const badgeWidth = 220
  const badgeHeight = 84
  const x = (width - badgeWidth) / 2
  const y = 24

  ctx.fillStyle = 'rgba(6, 14, 28, 0.78)'
  ctx.strokeStyle = 'rgba(117, 215, 255, 0.45)'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.roundRect(x, y, badgeWidth, badgeHeight, 18)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = '#f4f8ff'
  ctx.font = '700 16px Georgia'
  ctx.textAlign = 'center'
  ctx.fillText(`Has recuperado ${savings.toFixed(1)}%`, width / 2, y + 30)

  ctx.fillStyle = 'rgba(207, 220, 255, 0.9)'
  ctx.font = '600 13px Arial'
  ctx.fillText(`El agujero queda en ${remaining.toFixed(1)}% del gasto original`, width / 2, y + 56)
}

function renderScene() {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height
  const baseRadius = Math.min(width, height) * 0.14
  const savings = animatedSavings.value
  const remainingRatio = Math.max(0, 1 - savings / 100)

  drawBackground(ctx, width, height)
  drawComparisonBeam(ctx, width, height)

  const originalRadius = baseRadius
  const simulatedRadius = baseRadius * Math.sqrt(remainingRatio)
  const leftX = width * 0.28
  const rightX = width * 0.72
  const centerY = height * 0.55

  drawBlackHole(ctx, {
    centerX: leftX,
    centerY,
    baseRadius,
    displayedRadius: originalRadius,
    label: 'Antes',
    subtitle: '100% del gasto actual',
    highlight: 'rgba(255, 165, 112, 0.85)',
    intensity: 1,
  })

  drawBlackHole(ctx, {
    centerX: rightX,
    centerY,
    baseRadius,
    displayedRadius: Math.max(baseRadius * 0.22, simulatedRadius),
    label: 'Después',
    subtitle: `${remainingPercentage.value.toFixed(1)}% del gasto restante`,
    highlight: 'rgba(117, 215, 255, 0.9)',
    intensity: remainingRatio,
  })

  drawDifferenceBadge(ctx, width, height, savings, remainingPercentage.value)
}

function animate(timestamp = 0) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp
  }

  const delta = timestamp - lastTimestamp
  lastTimestamp = timestamp
  rotation += delta * 0.0011

  const target = clampedSavings.value
  const difference = target - animatedSavings.value

  if (Math.abs(difference) > 0.05) {
    const step = Math.min(1, delta / 650)
    animatedSavings.value += difference * easeOutCubic(step)
  } else {
    animatedSavings.value = target
  }

  renderScene()
  animationId.value = requestAnimationFrame(animate)
}

function cancelAnimation() {
  if (animationId.value) {
    cancelAnimationFrame(animationId.value)
    animationId.value = null
  }
}

onMounted(() => {
  animatedSavings.value = clampedSavings.value
  animationId.value = requestAnimationFrame(animate)
})

onBeforeUnmount(() => {
  cancelAnimation()
})

watch(() => props.savingsPercentage, () => {
  if (!canvasRef.value) return
  renderScene()
})
</script>

<template>
  <div class="black-hole-container">
    <div class="heading">
      <h2>Black Hole Savings</h2>
      <p>La masa del agujero negro se reduce según el porcentaje real de gasto que eliminas.</p>
    </div>

    <canvas
      ref="canvasRef"
      width="880"
      height="460"
      class="black-hole-canvas"
    ></canvas>

    <div class="legend">
      <div class="legend-item">
        <span class="swatch before"></span>
        <span>Antes: gasto actual completo</span>
      </div>
      <div class="legend-item">
        <span class="swatch after"></span>
        <span>Después: gasto restante tras la simulación</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.black-hole-container {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  border: 1px solid #1d2b43;
  border-radius: 24px;
  background:
    radial-gradient(circle at top, rgba(76, 123, 186, 0.16), transparent 38%),
    linear-gradient(135deg, #08101b 0%, #12091e 48%, #1a130e 100%);
  box-shadow: 0 20px 45px rgba(4, 12, 24, 0.32);
}

.heading h2 {
  margin: 0 0 8px;
  color: #f7f8ff;
  font-size: 1.7rem;
}

.heading p {
  margin: 0;
  color: rgba(228, 236, 255, 0.82);
  line-height: 1.5;
}

.black-hole-canvas {
  width: 100%;
  max-width: 100%;
  border: 1px solid rgba(142, 188, 255, 0.18);
  border-radius: 20px;
  background: #060b14;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(234, 240, 255, 0.88);
  font-size: 0.95rem;
}

.swatch {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  box-shadow: 0 0 12px currentColor;
}

.before {
  background: #ffa570;
  color: #ffa570;
}

.after {
  background: #75d7ff;
  color: #75d7ff;
}

@media (max-width: 900px) {
  .black-hole-container {
    padding: 18px;
  }
}
</style>
