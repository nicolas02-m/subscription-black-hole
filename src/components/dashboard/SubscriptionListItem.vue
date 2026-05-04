<script setup>
import { formatSubscriptionMonthlyPrice } from '@/utils/formatCurrency'
import { getCategoryLabel } from '@/utils/constants'

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
    <p>{{ getCategoryLabel(subscription.category) }}</p>
    <p>{{ formatSubscriptionMonthlyPrice(subscription) }}</p>
    <span class="details-button">Ver detalles</span>
  </RouterLink>
</template>

<style scoped>
.subscription-item {
  align-items: center;
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  display: grid;
  gap: 10px;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr) minmax(0, 0.8fr) minmax(120px, 0.8fr);
  padding: 20px;
  text-align: center;
  text-decoration: none;
  transition: transform 0.3s ease, translate 0.3s ease, box-shadow 0.5s ease, border-color 0.3s ease;
}

.subscription-item:hover {
  border-color: var(--secondary-color);
  box-shadow: 0px 0px 10px 2px var(--secondary-color);
  transform: scale(1.01);
  translate: 0 -10px;
}

.subscription-item:focus-visible {
  border-color: var(--secondary-color);
  box-shadow: 0 0 0 4px rgba(85, 233, 247, 0.25);
  outline: none;
}

p {
  color: var(--primary-color);
  font-family: var(--font-body);
  font-weight: 300;
  margin: 10px;
  min-width: 0;
  overflow-wrap: anywhere;
}

.details-button {
  align-items: center;
  background-color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 16px;
  color: var(--surface-color);
  display: inline-flex;
  font-family: var(--font-heading);
  font-size: 1em;
  font-weight: 700;
  justify-content: center;
  justify-self: center;
  min-height: 44px;
  padding: 0 18px;
  transition: background-color 0.25s ease, border-color 0.25s ease;
  width: min(100%, 150px);
}

.subscription-item:hover .details-button,
.subscription-item:focus-visible .details-button {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

@media (max-width: 950px) {
  .subscription-item {
    gap: 10px;
    grid-template-columns: 1fr;
    text-align: center;
  }

  .details-button {
    justify-self: center;
    margin-top: 10px;
    width: 60%;
  }

  p {
    margin: 4px 0;
  }
}
</style>
