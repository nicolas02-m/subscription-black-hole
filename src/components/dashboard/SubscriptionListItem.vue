<script setup>
import router from '@/router';

const props = defineProps({
    subscription: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <div class="subscription-item">
        <p>{{ subscription.name }}</p>
        <p>{{ subscription.category }}</p>
        <p>{{ subscription.price }}€</p>
        <button @click="router.push(`/subscription/${subscription.id}`)">Ver detalles</button>
    </div>

</template>

<style scoped>
.subscription-item {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-align: center;
    border: 1px solid black;
    border-radius: 8px;
    padding: 10px;
}

p {
    margin: 10px;
    font-weight: 600;
}
</style>