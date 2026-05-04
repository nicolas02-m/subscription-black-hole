<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SubscriptionForm from '@/components/subscription/SubscriptionForm.vue'
import { useSubscriptionStore } from '@/stores/subscription'

const route = useRoute()
const router = useRouter()
const subscriptionStore = useSubscriptionStore()

const subscription = computed(() => {
  const id = parseInt(route.params.id)
  return subscriptionStore.subscriptions.find(sub => sub.id === id)
})

function handleSubmit(payload) {
  subscriptionStore.updateSubscription(subscription.value.id, payload)
  router.push(`/subscriptions/${subscription.value.id}`)
}
</script>

<template>
  <div>
    <h1>Editar Suscripción</h1>
    <SubscriptionForm
      v-if="subscription"
      :initial-values="subscription"
      submit-label="Guardar Cambios"
      @submit="handleSubmit"
    />
    <p v-else>Suscripción no encontrada.</p>
  </div>
</template>
