<script setup>
import SubscriptionListItem from './SubscriptionListItem.vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import CategoryFilter from './CategoryFilter.vue'
import { CATEGORIES } from '@/utils/constants'

const subscriptionStore = useSubscriptionStore()
const { subscriptions, categories } = storeToRefs(subscriptionStore)

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
  <section>
    <div class="header">
      <h2>Lista de suscripciones</h2>
      <CategoryFilter :categories="usedCategories" @categorySelected="onCategorySelected" />
    </div>

    <div class="items">
      <div class="categories">
        <p>Nombre</p>
        <p>Categoría</p>
        <p>Coste</p>
        <p>Ver detalles</p>
      </div>

      <ul>
        <li v-for="subscription in filteredSubscriptions" :key="subscription.id">
          <SubscriptionListItem :subscription="subscription" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.header {
  align-items: center;
  display: flex;
  gap: 24px;
  justify-content: space-between;
  margin: 10px 0 24px;
}

.header h2 {
  font-size: clamp(1.35rem, 4vw, var(--font-size-heading));
  margin: 0px 0px 30px 30px;
}

.categories {
  color: var(--text-color);
  display: grid;
  font-family: var(--font-body);
  font-size: larger;
  font-weight: 600;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr) minmax(120px, 0.8fr);
  padding: 10px;
  text-align: center;
}

.items {
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 20px;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  margin-bottom: 20px;
}

li:last-child {
  margin-bottom: 0;
}

@media (max-width: 950px) {
  .header {
    flex-direction: column;
  }

  .items {
    padding: 16px;
  }

  .categories {
    display: none;
  }
}
</style>
