import { ref } from 'vue'

const selectedSubscriptions = ref([])
const activeSimulation = ref([])

export function useSimulationSelection() {
  function toggleSubscription(id) {
    const index = selectedSubscriptions.value.findIndex(sub => sub === id)
    if (index > -1) {
      selectedSubscriptions.value.splice(index, 1)
    } else {
      selectedSubscriptions.value.push(id)
    }
  }

  function isSelected(id) {
    return selectedSubscriptions.value.includes(id)
  }

  function getSelectedCount() {
    return selectedSubscriptions.value.length
  }

  function runSimulation() {
    activeSimulation.value = [...selectedSubscriptions.value]
  }

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
