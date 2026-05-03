<script setup>
import { computed } from 'vue'
import SavingsSummary from '@/components/simulation/SavingsSummary.vue'
import SimulationActions from '@/components/simulation/SimulationActions.vue'
import SimulationSelector from '@/components/simulation/SimulationSelector.vue'
import BlackHoleVisualization from '@/components/simulation/BlackHoleVisualization.vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { useSimulationSelection } from '@/composables/useSimulationSelection'
import { calculateMonthlyCost, calculateSavingsPercentage } from '@/utils/calculations'

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

const savingsPercentage = computed(() => {
  return calculateSavingsPercentage(savingsFromSelection.value, currentMonthlyCost.value)
})
</script>

<template>
  <div class="simulation-container">
    <header class="simulation-header">
      <div class="simulation-copy">
        <h1>Simulacion de ahorro</h1>
        <p>Selecciona las suscripciones que deseas eliminar para calcular el ahorro.</p>
      </div>
      <SimulationActions class="header-actions" />
    </header>

    <section>
      <SavingsSummary />
    </section>
    <section>
      <SimulationSelector />
    </section>
    <section>
      <BlackHoleVisualization :savingsPercentage="parseFloat(savingsPercentage)" />
    </section>
    <section>
      <SavingsComparison />
    </section>
  </div>
</template>

<style scoped>
.simulation-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 40px;
  gap: 40px;
}

.simulation-header {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  gap: 40px;
}

.simulation-copy h1,
.simulation-copy p {
  margin-top: 0;
}


@media (max-width: 1100px) {
  .simulation-container {
    grid-template-columns: 1fr;
  }

  .simulation-header {
    flex-direction: column;
  }
}
</style>
