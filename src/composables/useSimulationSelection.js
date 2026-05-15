import { ref } from 'vue'

const selectedSubscriptions = ref([])
const activeSimulation = ref([])

// Centraliza la seleccion temporal y la simulacion confirmada de ahorro.
export function useSimulationSelection() {
  // Alterna una suscripcion en la seleccion previa a ejecutar la simulacion.
  function toggleSubscription(id) {
    const index = selectedSubscriptions.value.findIndex(sub => sub === id)
    if (index > -1) {
      selectedSubscriptions.value.splice(index, 1)
    } else {
      selectedSubscriptions.value.push(id)
    }
  }

  // Indica si una suscripcion esta marcada en la seleccion temporal.
  function isSelected(id) {
    return selectedSubscriptions.value.includes(id)
  }

  // Devuelve cuantas suscripciones estan seleccionadas.
  function getSelectedCount() {
    return selectedSubscriptions.value.length
  }

  // Copia la seleccion actual como simulacion activa.
  function runSimulation() {
    activeSimulation.value = [...selectedSubscriptions.value]
  }

  // Limpia el resultado de simulacion sin modificar la seleccion temporal.
  function resetSimulation() {
    activeSimulation.value = []
  }

  return {
    selectedSubscriptions,
    activeSimulation,
    toggleSubscription,
    isSelected,
    getSelectedCount,
    runSimulation,
    resetSimulation
  }
}
