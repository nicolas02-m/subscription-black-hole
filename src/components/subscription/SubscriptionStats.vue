<script setup>
import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'

const props = defineProps({
  subscription: {
    type: Object,
    required: true
  }
})

const subscriptionStore = useSubscriptionStore()

const namesub = computed(() => {
  return props.subscription.name || 'N/A'
})

const date = computed(() => {
  return subscriptionStore.nextPaymentFor(props.subscription)
})

const totalpaid = computed(() => {
  return subscriptionStore.totalPaidFor(props.subscription)
})

const price = computed(() => {
  return props.subscription.price || 0
})


const category = computed(() => {
  return props.subscription.category || 'N/A'
})

const formattedDate = computed(() => {
  if (!date.value) return 'No disponible'
  return date.value.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})
</script>

<template>
<div>
    <h2>Nombre de la suscripción</h2>
    <p>{{ namesub }}</p>
</div>
<div> 
    <h2>Categoria</h2>
    <p>{{ category }}</p>
</div>

    <div class="subscription-stats">
        <h2>Próximo pago</h2>
        <p>{{ formattedDate }}</p>
    </div>

<div>
    <h2>Total gastado</h2>
    <p>{{ totalpaid.toFixed(2) }}€</p>
</div>

<div>
    <h2>Precio:</h2>
    <p>{{ price.toFixed(2) }}€</p>
</div>
</template>