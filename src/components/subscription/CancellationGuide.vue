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

      <button class="cancelation-link-button" @click="openCancellationLink" :disabled="!props.subscription.cancellationLink">
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
  grid-template-columns: 1fr 2fr;
  height: 50vh;
  gap: 40px;
  margin: 40px 0;
}

.steps-cancelation {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
}

.steps-cancelation h2{
text-align: center;
font-size: var(--font-size-subheading);
margin-top: 50px;
margin-bottom: 0;
}


.payment-platform {
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  height: 100%
}

.payment-platform h2{
margin: 40px 0;
font-size: var(--font-size-subheading);

}

.cancelation-link-button{
padding: 20px;
width: 80%;
color: var(--surface-color);
background-color: var(--primary-color);
border-radius: var(--border-radius);
font-family: var(--font-body);
font-size: var(--font-body);
font-weight: 600;
border: 0px;
cursor: pointer;
margin-top: auto;
margin-bottom: 40px;
}

.cancelation-link-button:disabled {
opacity: 0.5;
cursor: not-allowed;
}

.cancelation-link-button:hover{
translate: 0px -10px;
transition: 0.2s ease;
background-color: var(--secondary-color);
}

.platform-options {
display: flex;
flex-direction: column;
gap: 12px;
width: 80%;
}

.platform-option {
padding: 12px 16px;
border: 2px solid var(--card-color);
border-radius: 14px;
background-color: var(--surface-color);
color: var(--text-color);
font-family: var(--font-body);
font-size: 1em;
font-weight: 600;
opacity: 0.45;
}

.platform-option.selected {
border-color: var(--primary-color);
background-color: rgba(247, 179, 106, 0.15);
color: var(--primary-color);
opacity: 1;
}

.check-cancelation{
  display: flex;
flex: 1;
justify-content: center;
align-items: center;
}

.check-cancelation ol{
display: flex;
flex-direction: column;
gap: 50px;
color: white;
font-family: var(--font-body);
list-style: none;
padding: 0;
margin: 0;
width: 90%;
}

.check-cancelation li {
  display: grid;
  grid-template-columns: 28px 1fr;
  align-items: start;
  gap: 14px;
  line-height: 1.5;
}

.check-cancelation input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  display: grid;
  place-content: center;
  width: 22px;
  height: 22px;
  margin: 0;
  margin-top: 3px;
  border: 2px solid var(--primary-color);
  border-radius: 6px;
  background-color: var(--surface-color);
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.check-cancelation input[type="checkbox"]::before {
  content: "";
  width: 11px;
  height: 11px;
  clip-path: polygon(14% 44%, 0 59%, 42% 100%, 100% 16%, 84% 0, 38% 64%);
  background-color: var(--surface-color);
  transform: scale(0);
  transition: transform 0.15s ease;
}

.check-cancelation input[type="checkbox"]:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.check-cancelation input[type="checkbox"]:checked::before {
  transform: scale(1);
}


.check-cancelation label {
  cursor: pointer;
}


label{
font-family: var(--font-body);
color: var(--text-color);
font-size: 1.2em;
}

@media (max-width: 950px){
.cancelation-guide{
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
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 12px;
  line-height: 1.5;
}
}

</style>
