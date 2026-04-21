<script setup>
import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { useSimulationSelection } from '@/composables/useSimulationSelection'
import { calculateMonthlyCost, calculateSavingsPercentage, calculateRemainingCost } from '@/utils/calculations'

const subscriptionStore = useSubscriptionStore()
const { activeSimulation } = useSimulationSelection()

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
  return calculateSavingsPercentage(savingsFromSelection.value, currentMonthlyCost.value)
})
</script>

<template>
  <div class="savings-comparison">
    <h2>Comparación de costos</h2>
    
    <div v-if="selectedSubs.length > 0" class="comparison-grid">
      <div class="comparison-card current">
        <h3>Costo actual (mensual)</h3>
        <span class="cost">{{ currentMonthlyCost.toFixed(2) }}€</span>
      </div>
      
      <div class="comparison-card removed">
        <h3>Eliminadas</h3>
        <span class="cost">{{ savingsFromSelection.toFixed(2) }}€</span>
      </div>
      
      <div class="comparison-card remaining">
        <h3>Costo después (mensual)</h3>
        <span class="cost">{{ remainingMonthlyCost.toFixed(2) }}€</span>
      </div>
    </div>

    <div v-if="selectedSubs.length > 0" class="savings-detail">
      <p>Ahorrarías un <strong>{{ savingsPercentage }}%</strong> de tus gastos de suscripción</p>
      <p>Suscripciones a eliminar: {{ selectedSubs.length }}</p>
    </div>

    <div v-else class="empty-state">
      <p>Ejecuta la simulación para ver la comparación de costos</p>
    </div>
  </div>
</template>

<style scoped>

</style>