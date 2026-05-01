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
    <div class="add-sub-title">
    <h1>Añadir Suscripción</h1>
    <p>Introduce los datos de la suscripción para poder visualizar su impacto y gestionarla</p>
  </div>
  <Calert v-if="successMessage" class="success-message">
      {{ successMessage }}
  </Calert>
  </header>
 
  
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
 grid-template-columns: 1.5fr 4fr;
}
.success-message {
  display: flex;
  justify-content: center;
  padding: 10px;
  font-size: 16px;
  border: 5px solid var(--sucess-color);
  border-radius: var(--border-radius);
  background-color: var(--sucess-color);
  color: var(--text-color);
  font-family: var(--font-body);
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
  
}
</style>