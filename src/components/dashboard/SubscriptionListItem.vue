<script setup>
import { formatSubscriptionMonthlyPrice } from '@/utils/formatCurrency'

defineProps({
    subscription: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <RouterLink class="subscription-item" :to="`/subscriptions/${subscription.id}`">
        <p>{{ subscription.name }}</p>
        <p>{{ subscription.category }}</p>
        <p>{{ formatSubscriptionMonthlyPrice(subscription) }}</p>
        <span class="details-button">Ver detalles</span>
    </RouterLink>

</template>

<style scoped>
.subscription-item {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr) minmax(120px, 0.8fr);
    align-items: center;
    text-align: center;
    border: 5px solid var(--card-color);
    border-radius: var(--border-radius);
    padding: 20px;
    gap: 10px;
    text-decoration: none;
    cursor: pointer;
    transition: transform 0.3s ease, translate 0.3s ease, box-shadow 0.5s ease, border-color 0.3s ease;
}

.subscription-item:hover {
    transform: scale(1.01);
    translate: 0 -10px;
    box-shadow: 0px 0px 10px 2px var(--secondary-color);
    border-color: var(--secondary-color);
}

.subscription-item:focus-visible {
    outline: none;
    box-shadow: 0 0 0 4px rgba(85, 233, 247, 0.25);
    border-color: var(--secondary-color);
}

p {
    margin: 10px;
    font-family: var(--font-body);
    color: var(--primary-color);
    font-weight: 300;
    min-width: 0;
    overflow-wrap: anywhere;
}

.details-button {
    justify-self: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    width: min(100%, 150px);
    padding: 0 18px;
    border: 2px solid var(--primary-color);
    border-radius: 16px;
    background-color: var(--primary-color);
    color: var(--surface-color);
    font-family: var(--font-heading);
    font-size: 1em;
    font-weight: 700;
    transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}

.subscription-item:hover .details-button,
.subscription-item:focus-visible .details-button {
    background-color: var(--secondary-color);
    border-color: var(--secondary-color);
}

@media (max-width: 950px) {
    .subscription-item {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 10px;
    }

    .details-button {
        width: 60%;
        justify-self: center;
        margin-top: 10px;
    }

    p {
        margin: 4px 0;
    }
}
</style>
