<script setup>
import { useSubscriptionStore } from '@/stores/subscription'
import { useSimulationSelection } from '@/composables/useSimulationSelection'
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import CategoryFilter from '@/components/dashboard/CategoryFilter.vue'
import { CATEGORIES } from '@/utils/constants'

const subscriptionStore = useSubscriptionStore()
const { subscriptions, categories } = storeToRefs(subscriptionStore)
const { toggleSubscription, isSelected, getSelectedCount } = useSimulationSelection()

const selectedCategory = ref('')

const filteredSubscriptions = computed(() => {
  if (!selectedCategory.value) return subscriptions.value
  return subscriptions.value.filter(sub => sub.category === selectedCategory.value)
})

const usedCategories = computed(() => {
  const used = categories.value
  return CATEGORIES.filter(cat => used.includes(cat.value))
})

const onCategorySelected = (cat) => {
  selectedCategory.value = cat
}
</script>

<template>
  <div class="subscription-selector">
    <h2>Seleccionar suscripciones</h2>
    <p>Elige las suscripciones que deseas eliminar para calcular el ahorro. ({{ getSelectedCount() }} seleccionadas)</p>
    
    <div class="selector-content">
      <div class="header">
        <CategoryFilter :categories="usedCategories" @categorySelected="onCategorySelected" />
      </div>
      
      <div class="categories-header">
        <span></span>
        <p>Subscripción</p>
        <p>Categoría</p>
        <p>Impacto mensual</p>
      </div>

      <div class="items">
        <label
          v-for="subscription in filteredSubscriptions"
          :key="subscription.id"
          class="subscription-item"
          :class="{ selected: isSelected(subscription.id) }"
        >
          <input 
            type="checkbox" 
            :checked="isSelected(subscription.id)"
            @change="toggleSubscription(subscription.id)"
          >
          <span>{{ subscription.name }}</span>
          <span>{{ subscription.category }}</span>
          <span>{{ subscription.price }}€</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subscription-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  padding: 28px;
  background-color: var(--surface-color);
}

.subscription-selector h2,
.subscription-selector p {
  margin: 0;
}

.selector-content {
  display: flex;
  flex-direction: column;
}

.header {
  margin-bottom: 20px;
}

.categories-header {
  display: grid;
  grid-template-columns: 50px 1fr 150px 100px;
  align-items: center;
  gap: 16px;
  padding: 0 18px 12px;
  border-bottom: 2px solid var(--card-color);
  font-weight: 600;
  margin-bottom: 16px;
}

.categories-header p {
  margin: 0;
  color: var(--secondary-color);
  font-weight: 700;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.subscription-item {
  display: grid;
  grid-template-columns: 50px 1fr 150px 100px;
  gap: 16px;
  padding: 16px 18px;
  border: 2px solid var(--primary-color);
  border-radius: 18px;
  align-items: center;
  background-color: var(--background-color);
  color: var(--text-color);
  cursor: pointer;
  font-family: var(--font-body);
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.subscription-item:hover,
.subscription-item.selected {
  background-color: var(--card-color);
  border-color: var(--secondary-color);
  transform: translateY(-5px);
}

.subscription-item span:last-child {
  color: var(--primary-color);
  font-weight: 700;
}

.subscription-item input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  display: grid;
  place-content: center;
  width: 22px;
  height: 22px;
  margin: 0;
  border: 2px solid var(--primary-color);
  border-radius: 6px;
  background-color: var(--surface-color);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.subscription-item input[type="checkbox"]::before {
  content: "";
  width: 11px;
  height: 11px;
  clip-path: polygon(14% 44%, 0 59%, 42% 100%, 100% 16%, 84% 0, 38% 64%);
  background-color: var(--surface-color);
  transform: scale(0);
  transition: transform 0.15s ease;
}

.subscription-item input[type="checkbox"]:checked {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.subscription-item input[type="checkbox"]:checked::before {
  transform: scale(1);
}

@media (max-width: 720px) {
  .subscription-selector {
    padding: 22px;
  }

  .categories-header {
    display: none;
  }

  .subscription-item {
    grid-template-columns: 34px 1fr;
  }

  .subscription-item span:nth-of-type(2),
  .subscription-item span:nth-of-type(3) {
    grid-column: 2;
  }
}
</style>
