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

function openCancellationLink() {
  if (props.subscription.cancellationLink) {
    window.open(props.subscription.cancellationLink, '_blank')
  }
}
</script>

<template>
  <section class="cancelation-guide">
    <div class="payment-platform">
      <h2>Plataforma de pago:</h2>

      <div class="platform-options">
        <button
          v-for="plat in PLATFORMS"
          :key="plat.value"
          type="button"
          class="platform-option"
          :class="{ selected: plat.value === platform }"
          disabled
        >
          {{ plat.label }}
        </button>
      </div>

      <button
        class="cancelation-link-button"
        :disabled="!props.subscription.cancellationLink"
        @click="openCancellationLink"
      >
        Ir al enlace de cancelación
      </button>
    </div>

    <div class="steps-cancelation">
      <h2>{{ guide.title }} sigue estos pasos:</h2>
      <div class="check-cancelation">
        <ol>
          <li v-for="(step, index) in guide.steps" :key="step">
            <input type="checkbox" :id="'step-' + index">
            <label :for="'step-' + index">{{ step }}</label>
          </li>
        </ol>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cancelation-guide {
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 2fr;
  height: 50vh;
  margin: 40px 0;
}

.steps-cancelation,
.payment-platform {
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  height: 100%;
}

.steps-cancelation {
  display: flex;
  flex-direction: column;
}

.steps-cancelation h2 {
  font-size: var(--font-size-subheading);
  margin-bottom: 0;
  margin-top: 50px;
  text-align: center;
}

.payment-platform {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-platform h2 {
  font-size: var(--font-size-subheading);
  margin: 40px 0;
}

.platform-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 80%;
}

.platform-option {
  background-color: var(--surface-color);
  border: 2px solid var(--card-color);
  border-radius: 14px;
  color: var(--text-color);
  font-family: var(--font-body);
  font-size: 1em;
  font-weight: 600;
  opacity: 0.45;
  padding: 12px 16px;
}

.platform-option.selected {
  background-color: rgba(247, 179, 106, 0.15);
  border-color: var(--primary-color);
  color: var(--primary-color);
  opacity: 1;
}

.cancelation-link-button {
  background-color: var(--primary-color);
  border: 0px;
  border-radius: var(--border-radius);
  color: var(--surface-color);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  font-weight: 600;
  margin-bottom: 40px;
  margin-top: auto;
  padding: 20px;
  transition: translate 0.2s ease, background-color 0.3s ease;
  width: 80%;
}

.cancelation-link-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.cancelation-link-button:hover {
  background-color: var(--secondary-color);
  translate: 0px -10px;
}

.check-cancelation {
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
}

.check-cancelation ol {
  color: white;
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  gap: 50px;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 90%;
}

.check-cancelation li {
  align-items: start;
  display: grid;
  gap: 14px;
  grid-template-columns: 28px 1fr;
  line-height: 1.5;
}

.check-cancelation input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  background-color: var(--surface-color);
  border: 2px solid var(--primary-color);
  border-radius: 6px;
  cursor: pointer;
  display: grid;
  height: 22px;
  margin: 3px 0 0;
  place-content: center;
  transition: background-color 0.2s ease, border-color 0.2s ease;
  width: 22px;
}

.check-cancelation input[type="checkbox"]::before {
  background-color: var(--surface-color);
  clip-path: polygon(14% 44%, 0 59%, 42% 100%, 100% 16%, 84% 0, 38% 64%);
  content: "";
  height: 11px;
  transform: scale(0);
  transition: transform 0.15s ease;
  width: 11px;
}

.check-cancelation input[type="checkbox"]:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.check-cancelation input[type="checkbox"]:checked::before {
  transform: scale(1);
}

.check-cancelation label {
  color: var(--text-color);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: 1.2em;
}

@media (max-width: 950px) {
  .cancelation-guide {
    grid-template-columns: 1fr;
    height: auto;
  }

  .steps-cancelation,
  .payment-platform {
    height: auto;
  }

  .cancelation-link-button {
    margin-top: 30px;
  }

  .steps-cancelation {
    min-height: 420px;
    padding: 24px;
  }

  .check-cancelation {
    padding: 70px 0;
  }

  .check-cancelation ol {
    gap: 40px;
  }

  .check-cancelation li {
    gap: 12px;
  }
}
</style>
