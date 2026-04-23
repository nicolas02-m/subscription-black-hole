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
    color: var(--text-color);
    font-family: var(--font-body);
    font-weight: 600;
    font-size: var(--font-size-heading);
    margin: 0px 0px 30px 30px;
}

.expense-summary {
    margin-bottom: 20px;
}
.total {
    display: flex;
    padding: 30px;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    border: 5px solid var(--card-color);
    border-radius: var(--border-radius);
    gap: 10px;
}

span {
    color: var(--primary-color);
    font-weight: 600;
    margin: 8px 0;
    font-size: 1.5em;
}

p {
    color: var(--text-color);
    font-weight: 600;
    gap: 10px;
    margin: 8px 0;
    font-size: 4em;
}
</style>