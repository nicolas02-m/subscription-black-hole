<script setup>
import SubscriptionStats from '@/components/subscription/SubscriptionStats.vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import CancellationGuide from '@/components/subscription/CancellationGuide.vue'
import FrictionReportForm from '@/components/subscription/FrictionReportForm.vue'

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
    <h1>Detalle de la suscripción</h1>
    <section class="main-buttons">
    <button id="edit" @click="$router.push(`/subscriptions/${subscription.id}/edit`)">Editar</button>
    <button id="delete" @click="deleteSubscription">Eliminar</button>
    </section>
    <SubscriptionStats v-if="subscription" :subscription="subscription" />
    <p v-else>Subscription not found.</p>
  </div>
  <section>
  <CancellationGuide v-if="subscription" :subscription="subscription" />
  </section>

  <section>
    <FrictionReportForm v-if="subscription" :subscription="subscription" />
  </section>
</template>

<style scoped>
h1{
text-align: center;
padding: 40px;
}

.main-buttons{
display: flex;
justify-content: space-evenly;
}

#edit{
  background-color: var(--background-color);
  border: 3px solid var(--primary-color);
  color: var(--text-color)
}

#edit:hover{
  background-color: var(--primary-color);
  color: var(--background-color);
}

#delete{
  background-color: var(--background-color);
  border: 3px solid var(--error-color);
  color: var(--text-color)
}

#delete:hover{
  background-color: var(--error-color);
  color: var(--background-color);
}

.main-buttons > button{
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  font-weight: 600;
padding: 30px;
width: 30%;
border-radius: var(--border-radius);
border: 0;
}

.main-buttons > button:hover{
cursor: pointer;
translate: 0 -10px;
transition: translate 0.3s ease, background-color 0.3s ease;
}

</style>