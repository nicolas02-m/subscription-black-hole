<script setup>
import router from '@/router';
</script>
<template>
  <div class="actions">
    <button @click="router.push('/add')">Añadir suscripción</button>
    <button @click="router.push('/simulation')">Simulación</button>
  </div>
</template>

<style scoped>

.actions {
    display: flex;
    margin-top: 150px;
    width: 100%;
    gap: 20px;

}
button {
    padding: 20px 40px;
    width: 100%;
    background-color: var(--primary-color);
    font-family: var(--font-heading);
    color: var(--surface-color);
    border: none;
    border-radius: 20px;
    font-size: 1.5em;
    cursor: pointer;
}

button:hover {
translate: 0px -10px;
transition: translate 0.3s ease-in-out, background-color 0.5s ease;
background-color: var(--secondary-color);
}

button:active {
    background-color: #555;
    transform: scale(0.95);
}

</style>