<script setup>
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSubscriptionStore } from '@/stores/subscription'
import { useSimulationSelection } from '@/composables/useSimulationSelection'
import CategoryFilter from '@/components/dashboard/CategoryFilter.vue'
import { CATEGORIES, getCategoryLabel } from '@/utils/constants'

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
        <p>Suscripción</p>
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
          <span class="subscription-name">{{ subscription.name }}</span>
          <span>{{ getCategoryLabel(subscription.category) }}</span>
          <span>{{ subscription.price }}€</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subscription-selector {
  background-color: var(--surface-color);
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
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
  align-items: center;
  border-bottom: 2px solid var(--card-color);
  display: grid;
  font-weight: 600;
  gap: 16px;
  grid-template-columns: 50px 1fr 150px 100px;
  margin-bottom: 16px;
  padding: 0 18px 12px;
}

.categories-header p {
  color: var(--secondary-color);
  font-weight: 700;
  margin: 0;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.subscription-item {
  align-items: center;
  background-color: var(--background-color);
  border: 2px solid var(--primary-color);
  border-radius: 18px;
  color: var(--text-color);
  cursor: pointer;
  display: grid;
  font-family: var(--font-body);
  gap: 16px;
  grid-template-columns: 50px 1fr 150px 100px;
  padding: 16px 18px;
  transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
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
  background-color: var(--surface-color);
  border: 2px solid var(--primary-color);
  border-radius: 6px;
  cursor: pointer;
  display: grid;
  height: 22px;
  margin: 0;
  place-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  width: 22px;
}

.subscription-item input[type="checkbox"]::before {
  background-color: var(--surface-color);
  clip-path: polygon(14% 44%, 0 59%, 42% 100%, 100% 16%, 84% 0, 38% 64%);
  content: "";
  height: 11px;
  transform: scale(0);
  transition: transform 0.15s ease;
  width: 11px;
}

.subscription-item input[type="checkbox"]:checked {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.subscription-item input[type="checkbox"]:checked::before {
  transform: scale(1);
}

.subscription-name {
  color: var(--secondary-color);
  font-weight: bold;
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
