<script setup>
import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { useSimulationSelection } from '@/composables/useSimulationSelection'
import { calculateMonthlyCost, calculateAnnualCost } from '@/utils/calculations'

const subscriptionStore = useSubscriptionStore()
const { activeSimulation } = useSimulationSelection()

const selectedSubs = computed(() => {
  return subscriptionStore.subscriptions.filter(sub => 
    activeSimulation.value.includes(sub.id)
  )
})

const monthlySavings = computed(() => {
  return calculateMonthlyCost(selectedSubs.value)
})

const annualSavings = computed(() => {
  return calculateAnnualCost(selectedSubs.value)
})
</script>

<template>
  <div class="savings-summary">
    <h2>Ahorro potencial</h2>
    <div class="savings-grid">
      <div class="savings-card">
        <p>Por año</p>
        <span class="amount">{{ annualSavings.toFixed(2) }}€</span>
      </div>
      <div class="savings-card">
        <p>Por mes</p>
        <span class="amount">{{ monthlySavings.toFixed(2) }}€</span>
      </div>
    </div>
    <div v-if="selectedSubs.length === 0" class="empty-state">
      <p>Ejecuta la simulación para ver el ahorro potencial</p>
    </div>
  </div>
</template>

<style scoped>

</style>