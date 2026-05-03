<script setup>
import { useSubscriptionStore } from '@/stores/subscription';
const store = useSubscriptionStore();

</script>
<template>
  <div class="expense-summary">
    <h2>Gastados suscripciones</h2>
    <div class="total">
    <p><span>{{store.monthlyTotal.toFixed(2)}}</span>/mes</p>
    <p><span>{{store.annualTotal.toFixed(2)}}</span>/año</p>
  </div>
  </div>
</template>
<style scoped>

h2 {
    font-weight: 600;
    font-size: clamp(1.35rem, 4vw, var(--font-size-heading));
    margin: 0 0 24px;
}

.expense-summary {
    margin-bottom: 20px;
    min-width: 0;
}
.total {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: 30px;
    border: 5px solid var(--card-color);
    border-radius: var(--border-radius);
    gap: 20px;
    min-width: 0;
}

span {
    color: var(--primary-color);
    font-weight: 600;
    font-size: clamp(1.5rem, 8vw, 1.5em);
}

p {
    color: var(--text-color);
    font-weight: 600;
    margin: 8px 0;
    font-size: clamp(1.6rem, 8vw, 4em);
    line-height: 1.05;
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
