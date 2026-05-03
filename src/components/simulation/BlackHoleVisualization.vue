<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { useSimulationSelection } from '@/composables/useSimulationSelection'
import { calculateMonthlyCost, calculateRemainingCost } from '@/utils/calculations'

const props = defineProps({
  savingsPercentage: {
    type: Number,
    default: 0
  }
})

const canvasRef = ref(null)
const subscriptionStore = useSubscriptionStore()
const { activeSimulation } = useSimulationSelection()

const clampedSavings = computed(() => {
  return Math.min(100, Math.max(0, Number(props.savingsPercentage) || 0))
})

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

function drawAmountBlock(ctx, x, label, value) {
  ctx.textAlign = 'center'
  ctx.fillStyle = 'white'
  ctx.font = '600 16px Arial'
  ctx.fillText(label, x, 78)

  ctx.fillStyle = 'white'
  ctx.font = 'bold 28px Arial'
  ctx.fillText(`${value.toFixed(2)}€`, x, 114)
}

function drawBlackHole(ctx, width, height, savingsPercentage, currentCost, remainingCost) {
  ctx.fillStyle = '#0B0F1A'
  ctx.fillRect(0, 0, width, height)

  const centerY = height / 2 + 30
  const quarter = Math.min(width, height) / 4
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
  const savingsRadius = Math.max(minRadius, baseRadius * (1 - savingsPercentage / 100))

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
  ctx.font = 'bold 24px Arial'
  ctx.textAlign = 'center'
  ctx.fillText(`${savingsPercentage.toFixed(1)}% ahorrado`, width / 2, height - 40)
}

function renderBlackHole() {
  if (!canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  drawBlackHole(
    ctx,
    canvas.width,
    canvas.height,
    clampedSavings.value,
    currentMonthlyCost.value,
    remainingMonthlyCost.value
  )
}

onMounted(() => {
  renderBlackHole()
})

watch(() => props.savingsPercentage, () => {
  renderBlackHole()
})

watch(activeSimulation, () => {
  renderBlackHole()
})
</script>

<template>
  <div class="black-hole-container">
    <h2>Visualización de ahorro</h2>
    <canvas ref="canvasRef" width="700" height="700" class="black-hole-canvas"></canvas>
  </div>
</template>

<style scoped>
.black-hole-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 28px;
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  background-color: var(--surface-color);
}

.black-hole-container h2 {
  margin: 0;
}

.black-hole-canvas {
  width: 100%;
  max-width: 700px;
  border: 2px solid var(--primary-color);
  border-radius: var(--border-radius);
}
</style>
