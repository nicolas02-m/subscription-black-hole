<script setup>
import SubscriptionForm from '@/components/subscription/SubscriptionForm.vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

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
      :initialValues="subscription"
      submitLabel="Guardar Cambios"
      @submit="handleSubmit"
    />
    <p v-else>Subscription not found.</p>
  </div>
</template>

<style scoped>

</style>