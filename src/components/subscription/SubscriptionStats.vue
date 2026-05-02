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
  <section class="subscription-info"> 
<div class="sub-main-info">
    <div class="name-sub">
    <p>{{ namesub }}</p>
</div>
<span class="sub-divider"></span>
<div class="cat-sub"> 
    <h2>Categoria:</h2>
    <p>{{ category }}</p>
</div>
</div>

    <div class="subscription-stats">
        <h2>Próximo pago: </h2>
        <p>{{ formattedDate }}</p>
    </div>

<div class="total-spent">
    <h2>Total gastado: </h2>
    <p>{{ totalpaid.toFixed(2) }}€</p>
</div>

<div class="sub-price">
    <h2>Precio: </h2>
    <p>{{ price.toFixed(2) }}€</p>
</div>
</section>
</template>


<style scoped>
.subscription-info{
display: grid;
grid-template-columns: repeat(3, 1fr);
text-align: center;
gap: 40px;
padding: 1em;
}

.sub-main-info{
grid-column: 1/-1;
display: flex;
flex-direction: column;
align-items: center;
}

.sub-divider{
  border: 1px solid var(--primary-color);
  width: 60%;
  height: 0.1px;
  margin: 1em 0;
}

.subscription-stats,
.total-spent,
.sub-price {
  grid-column: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}


div p{
font-weight: bold;
font-size: 1.4em;
}

.name-sub p{
font-size: 2.4em;
}


@media (max-width: 950px){
.subscription-info{
grid-template-columns: 1fr;
}
}
</style>