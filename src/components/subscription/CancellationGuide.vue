<script setup>
import { computed } from 'vue'
import { CANCELLATION_GUIDES, PLATFORMS } from '@/utils/platformGuides'

const props = defineProps({
  subscription: {
    type: Object,
    required: true
  }
})

const platform = computed(() => props.subscription.paymentPlatform || 'other')
const guide = computed(() => CANCELLATION_GUIDES[platform.value] || CANCELLATION_GUIDES.other)
const platformLabel = computed(() => {
  const plat = PLATFORMS.find(p => p.value === platform.value)
  return plat ? plat.label : 'Desconocido'
})

function openCancellationLink() {
  if (props.subscription.cancellationLink) {
    window.open(props.subscription.cancellationLink, '_blank')
  }
}
</script>

<template>
  <div>
    <h2>{{ guide.title }}</h2>
    <p>Plataforma de pago: {{ platformLabel }}</p>
    <p>Para cancelar tu suscripción, sigue estos pasos:</p>
    <ol>
      <li v-for="(step, index) in guide.steps" :key="step">
        <input type="checkbox" :id="'step-' + index">
        <label :for="'step-' + index">{{ step }}</label>
      </li>
    </ol>
    <button 
      @click="openCancellationLink" 
      :disabled="!props.subscription.cancellationLink"
    >
      Ir al enlace de cancelación
    </button>
  </div>
</template>

<style scoped>  </style>