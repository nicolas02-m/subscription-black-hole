<script setup>
import { computed } from 'vue'
import SavingsSummary from '@/components/simulation/SavingsSummary.vue'
import SavingsComparison from '@/components/simulation/SavingsComparison.vue'
import SimulationActions from '@/components/simulation/SimaulationActions.vue'
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
  <div>
    <h1>Simulación de ahorro</h1>
    <p>selecciona las suscripciones que deseas eliminar para calcular el ahorro.</p>
  </div>
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
  <section>
    <SimulationActions />
  </section>
</template>

<style scoped></style>