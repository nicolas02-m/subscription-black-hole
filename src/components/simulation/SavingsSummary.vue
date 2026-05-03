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
.savings-summary {
  background-color: var(--surface-color);
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  padding: 20px;
  text-align: center;
}

.savings-grid {
  display: flex;
  justify-content: space-around;
  gap: 40px;
  margin-top: 20px;
  padding: 20px;
}

.savings-card {
  background-color: var(--surface-color);
  border: 3px solid var(--primary-color);
  border-radius: var(--border-radius);
  padding: 20px;
  width: 30%;
  font-family: var(--font-body); 
}

.savings-card p {
  font-size: var(--font-size-subheading);
  padding: 10px 0;
  margin: 0;
}

.amount {
  display: block;
  font-size: var(--font-size-heading);
  font-weight: bold;
  color: var(--primary-color);
  margin-top: 10px;
}

.empty-state {
  margin-top: 20px;
  font-style: italic;
  color: var(--text-color);
  font-size: var(--font-size-body);
}
</style>