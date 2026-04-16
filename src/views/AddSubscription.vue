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
  <header>
    <h1>Añadir Suscripción</h1>
    <p>Introduce los datos de la suscripción</p>
  </header>

  <p v-if="successMessage" class="success-message">
      {{ successMessage }}
    </p>
<section>
  <SubscriptionForm 
    @submit="handleSubmit"
  />
  </section>
</template>

<style scoped>
.success-message {
  margin-bottom: 20px;
  padding: 12px 16px;
  border: 1px solid #b7e4c7;
  border-radius: 10px;
  background-color: #f1fff5;
  color: #1f6f43;
}
</style>