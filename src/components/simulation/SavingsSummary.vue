<script setup>
import { computed, onBeforeUnmount, reactive, watch } from 'vue'
import { gsap } from 'gsap'
import { useSubscriptionStore } from '@/stores/subscription'
import { useSimulationSelection } from '@/composables/useSimulationSelection'
import { calculateAnnualCost, calculateMonthlyCost } from '@/utils/calculations'

const subscriptionStore = useSubscriptionStore()
const { activeSimulation } = useSimulationSelection()

let amountTween = null

const animatedSavings = reactive({
  monthly: 0,
  annual: 0
})

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

function animateSavings() {
  amountTween?.kill()

  amountTween = gsap.to(animatedSavings, {
    monthly: monthlySavings.value,
    annual: annualSavings.value,
    duration: 0.8,
    ease: 'power2.out'
  })
}

watch([monthlySavings, annualSavings], () => {
  animateSavings()
}, { immediate: true })

onBeforeUnmount(() => {
  amountTween?.kill()
})
</script>

<template>
  <div class="savings-summary">
    <h2>Ahorro potencial</h2>
    <div class="savings-grid">
      <div class="savings-card">
        <p>Por año</p>
        <span class="amount">{{ animatedSavings.annual.toFixed(2) }}€</span>
      </div>
      <div class="savings-card">
        <p>Por mes</p>
        <span class="amount">{{ animatedSavings.monthly.toFixed(2) }}€</span>
      </div>
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
  gap: 40px;
  justify-content: space-around;
  margin-top: 20px;
  padding: 20px;
}

.savings-card {
  background-color: var(--surface-color);
  border: 3px solid var(--primary-color);
  border-radius: var(--border-radius);
  font-family: var(--font-body);
  padding: 20px;
  width: 30%;
}

.savings-card p {
  font-size: var(--font-size-subheading);
  margin: 0;
  padding: 10px 0;
}

.amount {
  color: var(--primary-color);
  display: block;
  font-size: var(--font-size-heading);
  font-weight: bold;
  margin-top: 10px;
}

@media (max-width: 950px) {
  .savings-grid {
    flex-direction: column;
    gap: 20px;
    padding: 12px 0;
  }

  .savings-card {
    width: auto;
  }
}
</style>
