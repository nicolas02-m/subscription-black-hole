<script setup>
import { useSubscriptionStore } from '@/stores/subscription';
const store = useSubscriptionStore();

</script>
<template>
  <div class="expense-summary">
    <h2>Gastados suscripciones</h2>
    <div class="total">
    <p>{{store.monthlyTotal.toFixed(2)}}/mes</p>
    <p>{{store.annualTotal.toFixed(2)}}/año</p>
  </div>
  </div>
</template>
<style scoped>

.expense-summary {
    margin-bottom: 20px;
}
.total {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
        border: 1px solid black;
    border-radius: 8px;
}

p {
    font-weight: 600;
    gap: 10px;
    font-size: 4em;
    margin: 8px 0;
}
</style>