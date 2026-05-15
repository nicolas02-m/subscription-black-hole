<script setup>
import { onMounted } from 'vue';
import { useSubscriptionStore } from '@/stores/subscription'
import AppHeader from '@/components/layout/AppHeader.vue'

const store = useSubscriptionStore();

// Inicializa el titulo de la pagina y carga los datos guardados en localStorage.
onMounted(() => {
  document.title = 'Subscription Black Hole';
  store.initSubscriptions();
});
</script>

<template>
  <AppHeader />
<main>
  <router-view />
  </main>
</template>

<style scoped></style>
