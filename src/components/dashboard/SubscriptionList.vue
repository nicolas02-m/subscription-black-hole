<script setup>
import SubscriptionListItem from './SubscriptionListItem.vue';
import { useSubscriptionStore } from '@/stores/subscription';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import CategoryFilter from './CategoryFilter.vue';
import { CATEGORIES } from '@/utils/constants';

const subscriptionStore = useSubscriptionStore();
const { subscriptions, categories } = storeToRefs(subscriptionStore);

const selectedCategory = ref('');

const filteredSubscriptions = computed(() => {
    if (!selectedCategory.value) return subscriptions.value;
    return subscriptions.value.filter(sub => sub.category === selectedCategory.value);
});

const usedCategories = computed(() => {
    const used = categories.value;
    return CATEGORIES.filter(cat => used.includes(cat.value));
});

const onCategorySelected = (cat) => {
    selectedCategory.value = cat;
};
</script>

<template>
    <div class="subscription-list">
        <div class="header">
            <h2>Subscription List</h2>
            <CategoryFilter :categories="categories" @categorySelected="onCategorySelected" />
        </div>
        <section class="items">
            <div class="categories">
                <p>Nombre</p>
                <p>Categoria</p>
                <p>Coste</p>
                <p>Ver detalles</p>
            </div>
            <ul>
                <li v-for="subscription in filteredSubscriptions" :key="subscription.id">
                    <SubscriptionListItem :subscription="subscription" />
                </li>
            </ul>
        </section>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    margin: 10px;
}

.categories {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    font-weight: 600;
    font-size: larger;
    padding: 10px;
    text-align: center;
}

ul {
    padding: 0;
}

.items {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px;
}

li {
    list-style: none;
    margin-bottom: 10px;
}
</style>