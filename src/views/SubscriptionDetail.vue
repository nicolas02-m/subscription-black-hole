<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import SubscriptionStats from '@/components/subscription/SubscriptionStats.vue'
import CancellationGuide from '@/components/subscription/CancellationGuide.vue'
import FrictionReportForm from '@/components/subscription/FrictionReportForm.vue'
import { useSubscriptionStore } from '@/stores/subscription'

const route = useRoute()
const router = useRouter()
const subscriptionStore = useSubscriptionStore()

const subscription = computed(() => {
  const id = parseInt(route.params.id)
  return subscriptionStore.subscriptions.find(sub => sub.id === id)
})

function deleteSubscription() {
  if (!subscription.value) return

  if (confirm('¿Estás seguro de que quieres eliminar esta suscripción?')) {
    subscriptionStore.deleteSubscription(subscription.value.id)
    router.push('/')
  }
}
</script>

<template>
  <div>
    <h1>Detalle de la suscripción</h1>

    <section v-if="subscription" class="main-buttons">
      <button class="edit-button" @click="router.push(`/subscriptions/${subscription.id}/edit`)">
        Editar
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 100 125" x="0px" y="0px">
          <title>Artboard 10</title>
          <path d="M68.53,18a13,13,0,0,0-8.1,3.88L39.86,42.48A19.87,19.87,0,0,0,34,56.63V60a6,6,0,0,0,6,6h3.37a20,20,0,0,0,14.14-5.86L78.08,39.57A13,13,0,0,0,82,31.48,12.5,12.5,0,0,0,68.53,18ZM74,30.49a4.46,4.46,0,0,1-1.31,3.17L51.86,54.48A11.92,11.92,0,0,1,43.37,58H42V56.63a11.92,11.92,0,0,1,3.51-8.49L66.34,27.31A4.49,4.49,0,0,1,74,30.49Z"/>
          <path d="M30,82H66A12,12,0,0,0,78,70V58a4,4,0,0,0-8,0V70a4,4,0,0,1-4,4H30a4,4,0,0,1-4-4V34a4,4,0,0,1,4-4H42a4,4,0,0,0,0-8H30A12,12,0,0,0,18,34V70A12,12,0,0,0,30,82Z"/>
        </svg>
      </button>

      <button class="delete-button" @click="deleteSubscription">
        Eliminar
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
          <path d="m83.332 29.168h-12.5v-8.332c0-4.5977-3.7383-8.332-8.332-8.332h-25c-4.5977 0-8.332 3.7383-8.332 8.332v8.332h-12.5c-2.3008 0-4.168 1.8672-4.168 4.168 0 2.3008 1.8672 4.168 4.168 4.168h66.668c2.3047 0 4.168-1.8672 4.168-4.168-0.003906-2.3047-1.8672-4.168-4.1719-4.168zm-45.832 0v-8.332h25v8.332zm4.168 41.664c-2.3008 0-4.168-1.8633-4.168-4.168v-16.664c0-2.3008 1.8672-4.168 4.168-4.168s4.168 1.8672 4.168 4.168v16.668c-0.003907 2.3008-1.8672 4.1641-4.168 4.1641zm16.664 0c-2.3047 0-4.168-1.8633-4.168-4.168v-16.664c0-2.3008 1.8633-4.168 4.168-4.168 2.3047 0 4.168 1.8672 4.168 4.168v16.668c0 2.3008-1.8633 4.1641-4.168 4.1641zm20.801-20.316-3.2539 26.035c-0.77734 6.2422-6.1133 10.949-12.402 10.949h-26.953c-6.2891 0-11.621-4.707-12.402-10.949l-3.2539-26.035c-0.28516-2.2812 1.3359-4.3672 3.6172-4.6523 2.2695-0.30859 4.3672 1.332 4.6523 3.6172l3.2539 26.035c0.26172 2.0781 2.0352 3.6484 4.1328 3.6484h26.953c2.0977 0 3.875-1.5703 4.1328-3.6484l3.2539-26.035c0.28516-2.2812 2.3594-3.9102 4.6523-3.6172 2.2852 0.28906 3.9023 2.3711 3.6172 4.6523z"/>
        </svg>
      </button>
    </section>

    <SubscriptionStats v-if="subscription" :subscription="subscription" />
    <p v-else>Suscripción no encontrada.</p>
  </div>

  <CancellationGuide v-if="subscription" :subscription="subscription" />
  <FrictionReportForm v-if="subscription" :subscription="subscription" />
</template>

<style scoped>
h1 {
  padding: 40px;
  text-align: center;
}

.main-buttons {
  display: flex;
  gap: 24px;
  justify-content: space-evenly;
  padding: 0 1rem;
}

.main-buttons > button {
  align-items: center;
  background-color: var(--background-color);
  border: 0;
  border-radius: var(--border-radius);
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  font-weight: 600;
  gap: 20px;
  justify-content: center;
  padding: 30px;
  transition: translate 0.3s ease, background-color 0.3s ease;
  width: 30%;
}

.main-buttons > button:hover {
  translate: 0 -10px;
}

.main-buttons svg {
  flex: 0 0 50px;
  height: 50px;
  width: 50px;
}

.main-buttons > .edit-button {
  border: 3px solid var(--primary-color);
}

.edit-button svg {
  fill: var(--primary-color);
}

.edit-button:hover {
  background-color: var(--primary-color);
  color: var(--background-color);
}

.main-buttons > .delete-button {
  border: 3px solid var(--error-color);
}

.delete-button svg {
  fill: var(--error-color);
}

.delete-button:hover {
  background-color: var(--error-color);
  color: var(--background-color);
}

.edit-button:hover svg,
.delete-button:hover svg {
  fill: var(--background-color);
}

@media (max-width: 950px) {
  h1 {
    padding: 28px 12px;
  }

  .main-buttons > button {
    flex: 0 0 auto;
    min-width: 190px;
    padding: 20px 24px;
    width: auto;
  }

  .main-buttons svg {
    flex-basis: 50px;
    min-width: 50px;
  }
}
</style>
