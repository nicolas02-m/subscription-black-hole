<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { usePlanets } from '@/composables/usePlanets'
import { formatCurrency } from '@/utils/formatCurrency'

const store = useSubscriptionStore()
const { planets } = usePlanets()
const canvasRef = ref(null)
const hoveredPlanetId = ref(null)
let resizeObserver = null

const totalMonthlySpending = computed(() => {
  return store.monthlyTotal
})

function getSceneLayout(width, height) {
  const centerX = width / 2
  const centerY = height / 2
  const minSize = Math.min(width, height)
  const isCompact = width < 680
  const sceneScale = Math.min(1, Math.max(0.55, minSize / 700))
  const blackHoleRadius = Math.min(100, Math.max(52, minSize * 0.15))
  const planetGap = Math.max(32, 90 * sceneScale)
  const planetMargin = Math.max(34, 90 * sceneScale)
  const rightMinPlanetX = centerX + blackHoleRadius + planetGap
  const rightMaxPlanetX = width - planetMargin
  const leftMinPlanetX = planetMargin
  const leftMaxPlanetX = centerX - blackHoleRadius - planetGap
  const verticalSpread = height * (isCompact ? 0.34 : 0.24)
  const rightRange = Math.max(0, rightMaxPlanetX - rightMinPlanetX)
  const leftRange = Math.max(0, leftMaxPlanetX - leftMinPlanetX)

  return {
    centerX,
    centerY,
    width,
    height,
    sceneScale,
    isCompact,
    blackHoleRadius,
    rightMinPlanetX,
    leftMaxPlanetX,
    verticalSpread,
    rightRange,
    leftRange
  }
}

function getPlanetPosition(planet, layout, index = 0, total = 1) {
  const radius = Math.max(9, (10 + planet.radiusNormalized * 48) * layout.sceneScale)

  if (layout.isCompact) {
    const angleStep = (Math.PI * 2) / Math.max(total, 1)
    const angle = -Math.PI / 2 + index * angleStep
    const orbitFactor = 0.78 + planet.distanceXNormalized * 0.22
    const orbitX = Math.max(90, (layout.width / 2 - radius - 28) * orbitFactor)
    const orbitY = Math.max(120, (layout.height / 2 - radius - 42) * orbitFactor)

    return {
      x: layout.centerX + Math.cos(angle) * orbitX,
      y: layout.centerY + Math.sin(angle) * orbitY,
      radius
    }
  }

  const x = planet.side === 'left'
    ? layout.leftMaxPlanetX - planet.distanceXNormalized * layout.leftRange
    : layout.rightMinPlanetX + planet.distanceXNormalized * layout.rightRange

  return {
    x,
    y: layout.centerY + planet.yOffsetNormalized * layout.verticalSpread,
    radius
  }
}

function drawPlanet(ctx, planet, position, isHovered = false) {
  const radius = isHovered ? position.radius + Math.max(5, position.radius * 0.14) : position.radius

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
  const labelSize = Math.max(10, Math.min(13, position.radius * 0.34))
  ctx.font = isHovered ? `bold ${labelSize + 1}px Space Grotesk` : `bold ${labelSize}px Space Grotesk`
  ctx.textAlign = 'center'
  ctx.fillText(planet.name, position.x, position.y - radius - 10)

  ctx.fillStyle = '#FFD700'
  ctx.font = isHovered ? `${labelSize + 1}px Space Grotesk` : `${labelSize}px Space Grotesk`
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

  const planetPositions = planets.value.map((planet, index) => ({
    planet,
    position: getPlanetPosition(planet, layout, index, planets.value.length)
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
    const originalIndex = planets.value.findIndex(({ id }) => id === planet.id)
    const { x, y, radius } = getPlanetPosition(planet, layout, originalIndex, planets.value.length)
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

  if (canvasRef.value) {
    resizeObserver = new ResizeObserver(() => {
      render()
    })
    resizeObserver.observe(canvasRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
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
  min-width: 0;
}

p {
  color: var(--text-color);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  margin: 0px 0px 20px 10px;
}

h2 {
  font-size: var(--font-size-heading);
  margin: 0px 0px 30px 30px;
}

.planetas {
  display: flex;
  justify-content: center;
  align-items: center;
  height: clamp(460px, 62vw, 580px);
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  overflow: hidden;
}

canvas {
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
}

@media (max-width: 950px) {
  .planet-visualization {
    margin: 80px 0 70px;
  }

  h2 {
    margin-left: 0;
    font-size: clamp(1.35rem, 6vw, var(--font-size-heading));
  }

  p {
    margin-left: 0;
  }

  .planetas {
    height: 640px;
  }
}

@media (max-width: 430px) {
  .planetas {
    height: 560px;
  }
}
</style>
