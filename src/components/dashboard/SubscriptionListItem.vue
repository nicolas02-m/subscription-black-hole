<script setup>
import router from '@/router'
import { formatSubscriptionMonthlyPrice } from '@/utils/formatCurrency'

const props = defineProps({
    subscription: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div class="subscription-item">
        <p>{{ subscription.name }}</p>
        <p>{{ subscription.category }}</p>
        <p>{{ formatSubscriptionMonthlyPrice(subscription) }}</p>
        <button @click="router.push(`/subscriptions/${subscription.id}`)">Ver detalles</button>
    </div>

</template>

<style scoped>
.subscription-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    border: 5px solid var(--card-color);
    border-radius: var(--border-radius);
    padding: 20px;
    gap: 10px;
}

.subscription-item:hover {
    transform: scale(1.02);
    translate: 0 -10px;
    transition: color 0.2s ease, transform 0.2s ease, translate 0.2s ease, box-shadow 0.5s ease;
    box-shadow: 0px 0px 10px 2px var(--primary-color);
}

p {
    margin: 10px;
    font-family: var(--font-body);
    color: var(--primary-color);
    font-weight: 300;
}
</style>
