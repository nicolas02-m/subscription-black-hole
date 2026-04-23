<script setup>
import { PLATFORMS } from '@/utils/platformGuides'

const props = defineProps({
  modelValue: { type: String, default: 'creditCard' }
})

const emit = defineEmits(['update:modelValue'])

const platforms = PLATFORMS

function selectPlatform(value) {
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="cardGroupPaymentPlatform">
    <button
      v-for="platform in platforms"
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
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin: 10px 0px;
}

.cardPaymentPlatform {
   
    padding: 16px;
    border: 5px solid var(--card-color);
    border-radius: 14px;
    background: var(--surface-color);
    color: var(--text-color);
    text-align: left;
    cursor: pointer;
    transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.cardPaymentPlatform:hover {
    border-color: var(--primary-color);
}

.cardPaymentPlatform.active {
    transform: scale(1.02);
    border-color: #111;
    color: var(--surface-color);
    background-color: var(--primary-color);
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