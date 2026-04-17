<script setup>
import { onMounted } from 'vue';
import { useSubscriptionStore } from '@/stores/subscription'

const store = useSubscriptionStore();

onMounted(() => {
  document.title = 'Subscription Black Hole';
  store.initSubscriptions();
});
</script>

<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/add">Añadir Suscripción</router-link></li>
        <li><router-link to="/simulation">Simulación</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style scoped></style>
