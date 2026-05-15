<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { useSubscriptionStore } from '@/stores/subscription'
import { useSimulationSelection } from '@/composables/useSimulationSelection'
import { calculateMonthlyCost, calculateRemainingCost, calculateSavingsPercentage } from '@/utils/calculations'
import { formatCurrency } from '@/utils/formatCurrency'

const canvasRef = ref(null)
const subscriptionStore = useSubscriptionStore()
const { activeSimulation } = useSimulationSelection()

let resizeObserver = null
let activeTween = null

const animatedState = {
  currentCost: 0,
  remainingCost: 0,
  percentage: 0
}

const selectedSubs = computed(() => {
  // Filtra las suscripciones incluidas en la simulacion activa.
  return subscriptionStore.subscriptions.filter(sub =>
    activeSimulation.value.includes(sub.id)
  )
})

// Coste mensual total antes de aplicar la simulacion.
const currentMonthlyCost = computed(() => {
  return calculateMonthlyCost(subscriptionStore.subscriptions)
})

// Coste mensual que se ahorraria cancelando la seleccion simulada.
const savingsFromSelection = computed(() => {
  return calculateMonthlyCost(selectedSubs.value)
})

// Coste mensual que quedaria despues del ahorro simulado.
const remainingMonthlyCost = computed(() => {
  return calculateRemainingCost(currentMonthlyCost.value, savingsFromSelection.value)
})

// Porcentaje de ahorro calculado sobre el gasto actual.
const savingsPercentage = computed(() => {
  return Number(calculateSavingsPercentage(savingsFromSelection.value, currentMonthlyCost.value))
})

// Limita el porcentaje entre 0 y 100 para proteger el dibujo del canvas.
const clampedSavings = computed(() => {
  return Math.min(100, Math.max(0, savingsPercentage.value || 0))
})

// Pinta una etiqueta y su importe en la parte superior del canvas.
function drawAmountBlock(ctx, x, label, value) {
  ctx.textAlign = 'center'
  ctx.fillStyle = 'white'
  ctx.font = '600 16px Space Grotesk'
  ctx.fillText(label, x, 78)

  ctx.font = '700 28px Space Grotesk'
  ctx.fillText(formatCurrency(value), x, 114)
}

// Dibuja la comparativa visual entre gasto actual y gasto con ahorro.
function drawBlackHole(ctx, width, height, currentCost, remainingCost, percentage) {
  ctx.fillStyle = '#0B0F1A'
  ctx.fillRect(0, 0, width, height)

  const centerY = height / 2 + 30
  const quarter = width / 4
  const baseRadius = Math.min(width, height) * 0.2

  drawAmountBlock(ctx, quarter, 'Total:', currentCost)
  drawAmountBlock(ctx, quarter * 3, 'Gasto con ahorro:', remainingCost)

  ctx.shadowColor = '#f7b36a'
  ctx.shadowBlur = 40
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  ctx.fillStyle = 'black'
  ctx.beginPath()
  ctx.arc(quarter, centerY, baseRadius, 0, Math.PI * 2)
  ctx.fill()

  const minRadius = baseRadius * 0.15
  const savingsRadius = Math.max(minRadius, baseRadius * (1 - percentage / 100))

  // El segundo agujero se reduce en proporcion al ahorro simulado.
  ctx.shadowColor = '#55e9f7'
  ctx.shadowBlur = 30
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  ctx.fillStyle = 'black'
  ctx.beginPath()
  ctx.arc(quarter * 3, centerY, savingsRadius, 0, Math.PI * 2)
  ctx.fill()

  ctx.shadowColor = 'rgba(0, 0, 0, 0)'
  ctx.shadowBlur = 0

  ctx.fillStyle = 'white'
  ctx.font = '700 24px Space Grotesk'
  ctx.textAlign = 'center'
  ctx.fillText(`${percentage.toFixed(1)}% ahorrado`, width / 2, height - 40)
}

// Prepara contexto y escala del canvas para pantallas de alta densidad.
function getCanvasContext() {
  if (!canvasRef.value) return null

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const width = canvas.offsetWidth
  const height = canvas.offsetHeight

  if (!width || !height) return null

  const pixelRatio = window.devicePixelRatio || 1

  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

  return { ctx, width, height }
}

// Redibuja la visualizacion con el estado animado actual.
function renderBlackHole(state = animatedState) {
  const canvasContext = getCanvasContext()
  if (!canvasContext) return

  drawBlackHole(
    canvasContext.ctx,
    canvasContext.width,
    canvasContext.height,
    state.currentCost,
    state.remainingCost,
    state.percentage
  )
}

// Anima el cambio de importes y porcentaje antes de redibujar el canvas.
function animateBlackHole() {
  activeTween?.kill()

  activeTween = gsap.to(animatedState, {
    currentCost: currentMonthlyCost.value,
    remainingCost: remainingMonthlyCost.value,
    percentage: clampedSavings.value,
    duration: 0.9,
    ease: 'elastic.out(1, 1)',
    onUpdate: () => renderBlackHole()
  })
}

onMounted(() => {
  animateBlackHole()

  if (canvasRef.value) {
    resizeObserver = new ResizeObserver(() => {
      renderBlackHole()
    })
    resizeObserver.observe(canvasRef.value)
  }
})

onBeforeUnmount(() => {
  activeTween?.kill()
  resizeObserver?.disconnect()
})

watch([activeSimulation, currentMonthlyCost, remainingMonthlyCost, clampedSavings], () => {
  animateBlackHole()
})
</script>

<template>
  <div class="black-hole-container">
    <h2>Visualización de ahorro</h2>
    <canvas ref="canvasRef" class="black-hole-canvas"></canvas>
  </div>
</template>

<style scoped>
.black-hole-container {
  align-items: center;
  background-color: var(--surface-color);
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
}

.black-hole-container h2 {
  margin: 0;
}

.black-hole-canvas {
  aspect-ratio: 1;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
  display: block;
  max-width: 700px;
  width: 100%;
}
</style>
