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
    justify-content: space-evenly;

}
button {
    padding: 30px;
    background-color: black;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #333; 
}

button:active {
    background-color: #555;
    transform: scale(0.95);
}

</style>