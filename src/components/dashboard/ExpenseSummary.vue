<script setup>
import { useSubscriptionStore } from '@/stores/subscription'

const store = useSubscriptionStore()
</script>

<template>
  <div class="expense-summary">
    <h2>Gastos suscripciones</h2>
    <div class="total">
      <p><span>{{ store.monthlyTotal.toFixed(2) }}</span>/mes</p>
      <p><span>{{ store.annualTotal.toFixed(2) }}</span>/año</p>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-size: clamp(1.35rem, 4vw, var(--font-size-heading));
  font-weight: 600;
  margin: 0px 0px 30px 30px;
}

.expense-summary {
  margin-bottom: 20px;
  min-width: 0;
}

.total {
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  min-width: 0;
  padding: 30px;
}

span {
  color: var(--primary-color);
  font-size: clamp(1.5rem, 8vw, 1.5em);
  font-weight: 600;
}

p {
  color: var(--text-color);
  font-size: clamp(1.6rem, 8vw, 4em);
  font-weight: 600;
  line-height: 1.05;
  margin: 8px 0;
  min-width: 0;
  overflow-wrap: anywhere;
  text-align: center;
}

@media (max-width: 720px) {
  .total {
    grid-template-columns: 1fr;
    padding: 22px;
  }
}
</style>
