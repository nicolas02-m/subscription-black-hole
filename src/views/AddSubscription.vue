<script setup>
import SubscriptionForm from '@/components/subscription/SubscriptionForm.vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { ref } from 'vue'

const store = useSubscriptionStore()
const successMessage = ref('')

function handleSubmit(data) {
  store.addSubscription(data)
  successMessage.value = 'Suscripción añadida con éxito'
}

setTimeout(() => {
  successMessage.value = ''
}, 2000)

</script>

<template>
  <div class="add-subscription-view">
  <header>
    <h1>Añadir Suscripción</h1>
    <p>Introduce los datos de la suscripción para poder visualizar su impacto y gestionarla</p>
  </header>

  <p v-if="successMessage" class="success-message">
      {{ successMessage }}
    </p>
<section>
  <SubscriptionForm 
    @submit="handleSubmit"
  />
  </section>
  </div>
</template>

<style scoped>

.add-subscription-view {
 display: grid;
 grid-template-columns: 1fr 4fr;
 height: 100%;
}
.success-message {
  margin-bottom: 20px;
  padding: 12px 16px;
  border: 1px solid var(--success-color);
  border-radius: var(--border-radius);
  background-color: var(--surface-color);
  color: var(--success-color);
}
header h1 {
    color: var(--text-color);
    font-family: var(--font-body);
    font-weight: 600;
    font-size: var(--font-size-heading);
    margin: 0px 0px 10px 30px;
}

header p {
    color: var(--text-color);
    font-family: var(--font-body);
    font-size: var(--font-size-body);
}

header {
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
  
}
</style>