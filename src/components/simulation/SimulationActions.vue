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
    <button class="primary" :disabled="getSelectedCount() === 0" @click="handleRunSimulation">
      Ejecutar simulación
    </button>
    <button class="secondary" @click="handleReset">
      Reiniciar simulación
    </button>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  justify-content: space-around;
  gap: 16px;
  padding: 20px;
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  background-color: var(--surface-color);
}

button {
  width: 100%;
  padding: 16px 24px;
  border-radius: var(--border-radius);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  font-weight: 600;
  cursor: pointer;
  transition: translate 0.3s ease, transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.primary {
  border: 0;
  background-color: var(--primary-color);
  color: var(--surface-color);
}

.primary:hover:not(:disabled) {
  translate: 0 -10px;
  transform: scale(1.05);
  background-color: var(--secondary-color);
}

.primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  translate: 0;
}

.secondary {
  border: 3px solid var(--primary-color);
  background-color: transparent;
  color: var(--primary-color);
}

.secondary:hover {
  translate: 0 -10px;
  transform: scale(1.05);
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

button:active:not(:disabled) {
  transform: scale(0.98);
}

@media (max-width: 1100px) {
  .actions {
    flex-direction: column;
  }
}
</style>
