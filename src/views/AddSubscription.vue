<script setup>
import SubscriptionForm from '@/components/subscription/SubscriptionForm.vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { ref } from 'vue'

const store = useSubscriptionStore()
const successMessage = ref('')

function handleSubmit(data) {
  store.addSubscription(data)
  successMessage.value = 'Suscripción añadida con éxito'

  setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}

</script>

<template>
  <div class="add-subscription-view">
  <header>
    <div class="add-sub-title">
    <h1>Añadir Suscripción</h1>
    <p>Introduce los datos de la suscripción para poder visualizar su impacto y gestionarla</p>
  </div>
  </header>
 
  
<section>
  <SubscriptionForm 
    @submit="handleSubmit"
  />
  </section>

  <div v-if="successMessage" class="success-popup" role="status" aria-live="polite">
      {{ successMessage }}
  </div>
 
  </div>
</template>

<style scoped>

.add-subscription-view {
 display: grid;
 grid-template-columns: 1.5fr 4fr;
}
.success-popup {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 20;
  max-width: min(320px, calc(100vw - 48px));
  padding: 18px 22px;
  border: 2px solid var(--sucess-color);
  border-radius: 18px;
  background-color: var(--surface-color);
  color: var(--text-color);
  font-family: var(--font-body);
  font-weight: 600;
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.25);
  animation: popup-in 0.25s ease;
}

.success-popup::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: var(--sucess-color);
}

@keyframes popup-in {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
header h1 {
    font-weight: 600;
    margin: 0px 0px 10px 30px;
}

header p {
    color: var(--text-color);
    font-family: var(--font-body);
    font-size: var(--font-size-body);
}

header {
  display: flex;
  flex-direction: column;
  gap: 20px;
    margin: 60px 0 0 0;
    padding: 10px;
}

@media (max-width: 950px) {
  .add-subscription-view {
    grid-template-columns: 1fr;
    padding: 0 20px;
  }

  header {
    text-align: center;
    margin: 40px 0;
  }

  .success-popup {
    top: 16px;
    right: 16px;
    left: 16px;
    max-width: none;
  }
  
}
</style>
