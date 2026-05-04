<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { useSimulationSelection } from '@/composables/useSimulationSelection'
import { calculateMonthlyCost, calculateRemainingCost, calculateSavingsPercentage } from '@/utils/calculations'
import { formatCurrency } from '@/utils/formatCurrency'

const canvasRef = ref(null)
const subscriptionStore = useSubscriptionStore()
const { activeSimulation } = useSimulationSelection()

let resizeObserver = null

const selectedSubs = computed(() => {
  return subscriptionStore.subscriptions.filter(sub =>
    activeSimulation.value.includes(sub.id)
  )
})

const currentMonthlyCost = computed(() => {
  return calculateMonthlyCost(subscriptionStore.subscriptions)
})

const savingsFromSelection = computed(() => {
  return calculateMonthlyCost(selectedSubs.value)
})

const remainingMonthlyCost = computed(() => {
  return calculateRemainingCost(currentMonthlyCost.value, savingsFromSelection.value)
})

const savingsPercentage = computed(() => {
  return Number(calculateSavingsPercentage(savingsFromSelection.value, currentMonthlyCost.value))
})

const clampedSavings = computed(() => {
  return Math.min(100, Math.max(0, savingsPercentage.value || 0))
})

function drawAmountBlock(ctx, x, label, value) {
  ctx.textAlign = 'center'
  ctx.fillStyle = 'white'
  ctx.font = '600 16px Space Grotesk'
  ctx.fillText(label, x, 78)

  ctx.font = '700 28px Space Grotesk'
  ctx.fillText(formatCurrency(value), x, 114)
}

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

function renderBlackHole() {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  const width = canvas.offsetWidth
  const height = canvas.offsetHeight
  const pixelRatio = window.devicePixelRatio || 1

  canvas.width = width * pixelRatio
  canvas.height = height * pixelRatio
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)

  drawBlackHole(
    ctx,
    width,
    height,
    currentMonthlyCost.value,
    remainingMonthlyCost.value,
    clampedSavings.value
  )
}

onMounted(() => {
  renderBlackHole()

  if (canvasRef.value) {
    resizeObserver = new ResizeObserver(() => {
      renderBlackHole()
    })
    resizeObserver.observe(canvasRef.value)
  }
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})

watch([activeSimulation, currentMonthlyCost], () => {
  renderBlackHole()
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
