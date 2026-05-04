<script setup>
import { computed } from 'vue'
import { useSubscriptionStore } from '@/stores/subscription'
import { getCategoryLabel } from '@/utils/constants'

const props = defineProps({
  subscription: {
    type: Object,
    required: true
  }
})

const subscriptionStore = useSubscriptionStore()

const subscriptionName = computed(() => {
  return props.subscription.name || 'N/A'
})

const nextPaymentDate = computed(() => {
  return subscriptionStore.nextPaymentFor(props.subscription)
})

const totalPaid = computed(() => {
  return subscriptionStore.totalPaidFor(props.subscription)
})

const price = computed(() => {
  return props.subscription.price || 0
})

const category = computed(() => {
  return getCategoryLabel(props.subscription.category)
})

const formattedDate = computed(() => {
  if (!nextPaymentDate.value) return 'No disponible'

  return nextPaymentDate.value.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})
</script>

<template>
  <section class="subscription-info">
    <div class="sub-main-info">
      <div class="name-sub">
        <p>{{ subscriptionName }}</p>
      </div>
      <span class="sub-divider"></span>
      <div>
        <h2>Categoría:</h2>
        <p>{{ category }}</p>
      </div>
    </div>

    <div class="subscription-stats">
      <h2>Próximo pago:</h2>
      <p>{{ formattedDate }}</p>
    </div>

    <div class="total-spent">
      <h2>Total gastado:</h2>
      <p>{{ totalPaid.toFixed(2) }}€</p>
    </div>

    <div class="sub-price">
      <h2>Precio:</h2>
      <p>{{ price.toFixed(2) }}€</p>
    </div>
  </section>
</template>

<style scoped>
.subscription-info {
  display: grid;
  gap: 40px;
  grid-template-columns: repeat(3, 1fr);
  padding: 1em;
  text-align: center;
}

.sub-main-info {
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-column: 1/-1;
}

.sub-divider {
  border: 1px solid var(--primary-color);
  height: 0.1px;
  margin: 1em 0;
  width: 60%;
}

.subscription-stats,
.total-spent,
.sub-price {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: center;
}

div p {
  font-size: 1.4em;
  font-weight: bold;
}

.name-sub p {
  font-size: 2.4em;
}

@media (max-width: 950px) {
  .subscription-info {
    grid-template-columns: 1fr;
  }
}
</style>
