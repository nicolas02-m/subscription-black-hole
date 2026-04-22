<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { usePlanets } from '@/composables/usePlanets'
import { formatCurrency } from '@/utils/formatCurrency'

const store = useSubscriptionStore()
const { planets } = usePlanets()
const canvasRef = ref(null)

const totalMonthlySpending = computed(() => {
  return store.monthlyTotal
})

function drawVisualization(ctx, width, height) {
  ctx.fillStyle = '#0B0F1A'
  ctx.fillRect(0, 0, width, height)

  const centerX = width / 2
  const centerY = height / 2
  const blackHoleRadius = 100
  const rightMinPlanetX = centerX + blackHoleRadius + 90
  const rightMaxPlanetX = width - 90
  const leftMinPlanetX = 90
  const leftMaxPlanetX = centerX - blackHoleRadius - 90
  const verticalSpread = height * 0.24

  ctx.shadowColor = '#f7b36a'
  ctx.shadowBlur = 55
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  ctx.fillStyle = 'black'
  ctx.beginPath()
  ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2)
  ctx.fill()

  ctx.shadowColor = 'rgba(0, 0, 0, 0)'
  ctx.shadowBlur = 0

  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.font = '700 11px Arial'
  ctx.fillText('Total / mes', centerX, centerY - 6)
  ctx.font = '700 12px Arial'
  ctx.fillText(formatCurrency(totalMonthlySpending.value), centerX, centerY + 12)

  planets.value.forEach((planet) => {
    const rightRange = Math.max(0, rightMaxPlanetX - rightMinPlanetX)
    const leftRange = Math.max(0, leftMaxPlanetX - leftMinPlanetX)

    const x = planet.side === 'left'
      ? leftMaxPlanetX - planet.distanceXNormalized * leftRange
      : rightMinPlanetX + planet.distanceXNormalized * rightRange

    const y = centerY + planet.yOffsetNormalized * verticalSpread
    const radius = 18 + planet.radiusNormalized * 30

    ctx.fillStyle = planet.color
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)'
    ctx.lineWidth = 2
    ctx.stroke()

    ctx.fillStyle = 'white'
    ctx.font = 'bold 12px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(planet.name, x, y - radius - 10)

    ctx.fillStyle = '#FFD700'
    ctx.font = '11px Arial'
    ctx.fillText(`${formatCurrency(planet.monthlyPrice)}/mes`, x, y + radius + 16)
  })
}

function render() {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const width = canvas.offsetWidth
  const height = canvas.offsetHeight

  canvas.width = width
  canvas.height = height

  drawVisualization(ctx, width, height)
}

onMounted(() => {
  render()
})

watch(() => planets.value, () => {
  render()
}, { deep: true })

watch(totalMonthlySpending, () => {
  render()
})
</script>

<template>
  <div>
    <h2>Visualización de Planetas</h2>
    <p>Las suscripciones más caras quedan más cerca del agujero negro y los planetas se reparten a ambos lados con pequeñas variaciones verticales.</p>
  </div>

  <div class="planetas">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.planetas {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 580px;
  border: 1px solid #333;
  border-radius: 8px;
  background-color: #0B0F1A;
}

canvas {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
</style>
