<script setup>
import SubscriptionStats from '@/components/subscription/SubscriptionStats.vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import CancellationGuide from '@/components/subscription/CancellationGuide.vue'

const route = useRoute()
const subscriptionStore = useSubscriptionStore()

const subscription = computed(() => {
  const id = parseInt(route.params.id)
  return subscriptionStore.subscriptions.find(sub => sub.id === id)
})

function deleteSubscription() {
  if (confirm('¿Estás seguro de que quieres eliminar esta suscripción?')) {
    subscriptionStore.deleteSubscription(subscription.value.id)
    $router.push('/')
  }
}
</script>

<template>
  <div>
    <h1>Subscription Detail</h1>
    <button @click="$router.push(`/subscriptions/${subscription.id}/edit`)">Editar</button>
    <button @click="deleteSubscription" style="background-color: red; color: white;">Eliminar</button>
    <SubscriptionStats v-if="subscription" :subscription="subscription" />
    <p v-else>Subscription not found.</p>
  </div>
  <section>
  <CancellationGuide v-if="subscription" :subscription="subscription" />
  </section>
</template>

<style scoped>

</style>