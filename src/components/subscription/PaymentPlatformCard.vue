<script setup>
import { PLATFORMS } from '@/utils/platformGuides'

defineProps({
  modelValue: {
    type: String,
    default: 'creditCard'
  }
})

const emit = defineEmits(['update:modelValue'])

function selectPlatform(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="cardGroupPaymentPlatform">
    <button
      v-for="platform in PLATFORMS"
      :key="platform.value"
      type="button"
      class="cardPaymentPlatform"
      :class="{ active: modelValue === platform.value }"
      @click="selectPlatform(platform.value)"
    >
      <span class="cardTitle">{{ platform.label }}</span>
    </button>
  </div>
</template>

<style scoped>
.cardGroupPaymentPlatform {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 10px 0px;
}

.cardPaymentPlatform {
  background: var(--surface-color);
  border: 5px solid var(--card-color);
  border-radius: 14px;
  color: var(--text-color);
  cursor: pointer;
  padding: 16px;
  text-align: left;
  transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.cardPaymentPlatform:hover {
  border-color: var(--primary-color);
}

.cardPaymentPlatform.active {
  background-color: var(--primary-color);
  border-color: #111;
  color: var(--surface-color);
  transform: scale(1.02);
}

.cardTitle {
  font-weight: 700;
}

@media (max-width: 700px) {
  .cardGroupPaymentPlatform {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
