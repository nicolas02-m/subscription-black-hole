<script setup>
import { useSimulationSelection } from '@/composables/useSimulationSelection'

const { getSelectedCount, runSimulation, resetSimulation } = useSimulationSelection()

function handleRunSimulation() {
  runSimulation()
}

function handleReset() {
  resetSimulation()
}
</script>

<template>
  <div class="actions">
    <button 
      class="primary"
      :disabled="getSelectedCount() === 0"
      @click="handleRunSimulation"
    >
      Ejecutar simulación
    </button>
    <button 
      class="secondary"
      @click="handleReset"
    >
      Reiniciar simulación
    </button>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding: 20px;
  border-top: 1px solid #ddd;
}

button {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.primary {
  background-color: #27ae60;
  color: white;
}

.primary:hover:not(:disabled) {
  background-color: #229954;
}

.primary:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.secondary {
  background-color: #e74c3c;
  color: white;
}

.secondary:hover {
  background-color: #c0392b;
}
</style>