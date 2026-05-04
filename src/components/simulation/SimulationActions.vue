<script setup>
import { useSimulationSelection } from '@/composables/useSimulationSelection'

const { getSelectedCount, runSimulation, resetSimulation } = useSimulationSelection()
</script>

<template>
  <div class="actions">
    <button class="primary" :disabled="getSelectedCount() === 0" @click="runSimulation">
      Ejecutar simulación
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125">
        <path d="M50,98.7C23.2,98.7,1.4,77,1.4,50.2S23.2,1.6,50,1.6s48.6,21.8,48.6,48.6S76.8,98.7,50,98.7z M50,7.6  C26.5,7.6,7.4,26.7,7.4,50.2c0,23.5,19.1,42.6,42.6,42.6c23.5,0,42.6-19.1,42.6-42.6C92.6,26.7,73.5,7.6,50,7.6z"/>
        <path d="M39.8,74.3c-0.4,0-0.9-0.1-1.3-0.3c-1-0.5-1.6-1.5-1.6-2.6V28.1c0-1.1,0.6-2.1,1.6-2.6c1-0.5,2.2-0.4,3,0.3  l27.9,21.6c0.7,0.6,1.1,1.5,1.1,2.3c0,0.9-0.4,1.8-1.1,2.3L41.6,73.7C41.1,74.1,40.4,74.3,39.8,74.3z M42.7,34v31.5l20.4-15.8  L42.7,34z"/>
      </svg>
    </button>

    <button class="secondary" @click="resetSimulation">
      Reiniciar simulación
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" x="0px" y="0px">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.75463 7C7.21158 5.18252 9.44546 4.01468 11.9526 4.00014C11.987 3.99994 12.0213 3.99996 12.0557 4.00019C14.1899 4.01474 16.1256 4.86498 17.5518 6.24003C17.6346 6.31978 17.7156 6.40134 17.7949 6.48468C19.136 7.89332 19.9688 9.79034 19.9991 11.8816C20.0004 11.9644 20.0003 12.0472 19.999 12.1301C19.9659 14.2041 19.1436 16.0863 17.8194 17.4896C17.7136 17.6017 17.6045 17.7108 17.4922 17.8169C16.0866 19.1445 14.2001 19.9682 12.1214 19.9991C12.0447 20.0003 11.9678 20.0003 11.8909 19.9993C7.85982 19.9454 4.54848 16.9101 4.06165 12.998C3.99344 12.45 3.55229 12 3 12C2.44772 12 1.99481 12.4488 2.04994 12.9983C2.08376 13.3355 2.13461 13.6698 2.20202 14C2.5565 15.7365 3.36894 17.3602 4.57153 18.6946C6.22692 20.5315 8.50415 21.6899 10.9636 21.9461C13.423 22.2024 15.8901 21.5384 17.8886 20.0823C19.8872 18.6262 21.2754 16.4813 21.7852 14.0617C22.295 11.6421 21.8902 9.11945 20.6491 6.98077C19.408 4.84208 17.4185 3.23907 15.0648 2.48123C12.7111 1.72339 10.16 1.86448 7.90423 2.87725C6.34818 3.57586 5.00873 4.65506 4 5.99997V4C4 3.44772 3.55228 3 3 3C2.44772 3 2 3.44772 2 4V8V9H3H7C7.55228 9 8 8.55228 8 8C8 7.44772 7.55228 7 7 7H5.75463Z"/>
      </svg>
    </button>
  </div>
</template>

<style scoped>
.actions {
  background-color: var(--surface-color);
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  display: flex;
  gap: 16px;
  justify-content: space-around;
  padding: 20px;
}

button {
  border-radius: var(--border-radius);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  font-weight: 600;
  padding: 16px 24px;
  transition: translate 0.3s ease, transform 0.3s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  width: 100%;
}

.primary,
.secondary {
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.primary {
  background-color: var(--primary-color);
  border: 0;
  color: var(--surface-color);
}

.primary svg,
.secondary svg {
  height: 40px;
  width: 40px;
}

.primary svg {
  fill: var(--background-color);
}

.primary:hover:not(:disabled) {
  background-color: var(--secondary-color);
  transform: scale(1.05);
  translate: 0 -10px;
}

.primary:disabled {
  cursor: not-allowed;
  opacity: 0.45;
  transform: none;
  translate: 0;
}

.secondary {
  background-color: transparent;
  border: 3px solid var(--primary-color);
  color: var(--primary-color);
}

.secondary svg {
  fill: var(--primary-color);
}

.secondary:hover {
  border-color: var(--secondary-color);
  color: var(--secondary-color);
  transform: scale(1.05);
  translate: 0 -10px;
}

.secondary:hover svg {
  fill: var(--secondary-color);
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
