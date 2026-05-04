<script setup>
import SavingsSummary from '@/components/simulation/SavingsSummary.vue'
import SimulationActions from '@/components/simulation/SimulationActions.vue'
import SimulationSelector from '@/components/simulation/SimulationSelector.vue'
import BlackHoleVisualization from '@/components/simulation/BlackHoleVisualization.vue'
</script>

<template>
  <div class="simulation-container">
    <header class="simulation-header">
      <div class="simulation-copy">
        <h1>Simulación de ahorro</h1>
        <p>Selecciona las suscripciones que deseas eliminar para calcular el ahorro.</p>
      </div>
      <SimulationActions />
    </header>

    <SavingsSummary />
    <SimulationSelector />
    <BlackHoleVisualization />
  </div>
</template>

<style scoped>
.simulation-container {
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 1fr;
  margin-top: 40px;
}

.simulation-header {
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: 40px;
  text-align: center;
}

.simulation-copy h1,
.simulation-copy p {
  margin-top: 0;
}

@media (max-width: 1100px) {
  .simulation-container {
    grid-template-columns: 1fr;
  }
}
</style>
