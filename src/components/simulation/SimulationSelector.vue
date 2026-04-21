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
  <div>
    <h2>Seleccionar suscripciones</h2>
    <p>Elige las suscripciones que deseas eliminar para calcular el ahorro. ({{ getSelectedCount() }} seleccionadas)</p>
    
    <div class="subscription-selector">
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
        <div v-for="subscription in filteredSubscriptions" :key="subscription.id" class="subscription-item">
          <input 
            type="checkbox" 
            :checked="isSelected(subscription.id)"
            @change="toggleSubscription(subscription.id)"
          >
          <span>{{ subscription.name }}</span>
          <span>{{ subscription.category }}</span>
          <span>{{ subscription.price }}€</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subscription-selector {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
}

.header {
  margin-bottom: 16px;
}

.categories-header {
  display: grid;
  grid-template-columns: 50px 1fr 150px 100px;
  align-items: center;
  gap: 16px;
  padding: 12px;
  background-color: #f5f5f5;
  border-radius: 6px;
  font-weight: 600;
  margin-bottom: 12px;
}

.items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.subscription-item {
  display: grid;
  grid-template-columns: 50px 1fr 150px 100px;
  gap: 16px;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 6px;
  align-items: center;
}

.subscription-item:hover {
  background-color: #f9f9f9;
}

.subscription-item input[type="checkbox"] {
  cursor: pointer;
}
</style>
