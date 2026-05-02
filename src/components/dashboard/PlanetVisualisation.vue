<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { usePlanets } from '@/composables/usePlanets'
import { formatCurrency } from '@/utils/formatCurrency'

const store = useSubscriptionStore()
const { planets } = usePlanets()
const canvasRef = ref(null)
const hoveredPlanetId = ref(null)

const totalMonthlySpending = computed(() => {
  return store.monthlyTotal
})

function getSceneLayout(width, height) {
  const centerX = width / 2
  const centerY = height / 2
  const blackHoleRadius = 100
  const rightMinPlanetX = centerX + blackHoleRadius + 90
  const rightMaxPlanetX = width - 90
  const leftMinPlanetX = 90
  const leftMaxPlanetX = centerX - blackHoleRadius - 90
  const verticalSpread = height * 0.24
  const rightRange = Math.max(0, rightMaxPlanetX - rightMinPlanetX)
  const leftRange = Math.max(0, leftMaxPlanetX - leftMinPlanetX)

  return {
    centerX,
    centerY,
    blackHoleRadius,
    rightMinPlanetX,
    leftMaxPlanetX,
    verticalSpread,
    rightRange,
    leftRange
  }
}

function getPlanetPosition(planet, layout) {
  const x = planet.side === 'left'
    ? layout.leftMaxPlanetX - planet.distanceXNormalized * layout.leftRange
    : layout.rightMinPlanetX + planet.distanceXNormalized * layout.rightRange

  return {
    x,
    y: layout.centerY + planet.yOffsetNormalized * layout.verticalSpread,
    radius: 15 + planet.radiusNormalized * 60
  }
}

function drawPlanet(ctx, planet, position, isHovered = false) {
  const radius = isHovered ? position.radius + 8 : position.radius

  ctx.shadowColor = isHovered ? '#F7B36A' : 'rgba(0, 0, 0, 0)'
  ctx.shadowBlur = isHovered ? 24 : 0
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  ctx.fillStyle = planet.color
  ctx.beginPath()
  ctx.arc(position.x, position.y, radius, 0, Math.PI * 2)
  ctx.fill()


  ctx.strokeStyle = isHovered ? '#F7B36A' : 'rgba(255, 255, 255, 0.45)'
  ctx.lineWidth = isHovered ? 4 : 2
  ctx.stroke()

  ctx.fillStyle = 'white'
  ctx.font = isHovered ? 'bold 13px Space Grotesk' : 'bold 12px Space Grotesk'
  ctx.textAlign = 'center'
  ctx.fillText(planet.name, position.x, position.y - radius - 10)

  ctx.fillStyle = '#FFD700'
  ctx.font = isHovered ? '13px Space Grotesk' : '12px Space Grotesk'
  ctx.fillText(`${formatCurrency(planet.monthlyPrice)}/mes`, position.x, position.y + radius + 16)
}

function drawVisualization(ctx, width, height) {
  ctx.fillStyle = '#0B0F1A'
  ctx.fillRect(0, 0, width, height)

  const layout = getSceneLayout(width, height)

  ctx.shadowColor = '#f7b36a'
  ctx.shadowBlur = 55
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  ctx.fillStyle = 'black'
  ctx.beginPath()
  ctx.arc(layout.centerX, layout.centerY, layout.blackHoleRadius, 0, Math.PI * 2)
  ctx.fill()

  ctx.shadowColor = 'rgba(0, 0, 0, 0)'
  ctx.shadowBlur = 0

  ctx.fillStyle = 'white'
  ctx.textAlign = 'center'
  ctx.font = '700 14px Space Grotesk'
  ctx.fillText('Total / mes', layout.centerX, layout.centerY - 6)
  ctx.font = '700 16px Space Grotesk'
  ctx.fillText(formatCurrency(totalMonthlySpending.value), layout.centerX, layout.centerY + 12)

  const planetPositions = planets.value.map((planet) => ({
    planet,
    position: getPlanetPosition(planet, layout)
  }))
  const hoveredPlanet = planetPositions.find(({ planet }) => planet.id === hoveredPlanetId.value)

  planetPositions.forEach(({ planet, position }) => {
    if (planet.id !== hoveredPlanetId.value) {
      drawPlanet(ctx, planet, position)
    }
  })

  if (hoveredPlanet) {
    drawPlanet(ctx, hoveredPlanet.planet, hoveredPlanet.position, true)
  }
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

function getHoveredPlanetId(event) {
  if (!canvasRef.value) return null

  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  const mouseX = event.clientX - rect.left
  const mouseY = event.clientY - rect.top
  const layout = getSceneLayout(canvas.offsetWidth, canvas.offsetHeight)

  return [...planets.value].reverse().find((planet) => {
    const { x, y, radius } = getPlanetPosition(planet, layout)
    const distance = Math.hypot(mouseX - x, mouseY - y)

    return distance <= radius
  })?.id || null
}

function handleMouseMove(event) {
  const nextHoveredPlanetId = getHoveredPlanetId(event)

  if (hoveredPlanetId.value === nextHoveredPlanetId) return

  hoveredPlanetId.value = nextHoveredPlanetId
  canvasRef.value.style.cursor = nextHoveredPlanetId ? 'pointer' : 'default'
  render()
}

function handleMouseLeave() {
  if (!hoveredPlanetId.value) return

  hoveredPlanetId.value = null
  canvasRef.value.style.cursor = 'default'
  render()
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
  <section class="planet-visualization">
  <div>
    <h2>Visualización de Planetas</h2>
    <p>Las suscripciones más caras quedan más cerca del agujero negro y los planetas se reparten a ambos lados con pequeñas variaciones verticales.</p>
  </div>

  <div class="planetas">
    <canvas
      ref="canvasRef"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    ></canvas>
  </div>
  </section>
</template>

<style scoped>

.planet-visualization {
margin: 150px 0 100px 0;
}

p{
  color: var(--text-color);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  margin: 0px 0px 20px 10px;
}

h2{
  font-size: var(--font-size-heading);
  margin: 0px 0px 30px 30px;
  }

.planetas {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 580px;
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
}

canvas {
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
}
</style>
