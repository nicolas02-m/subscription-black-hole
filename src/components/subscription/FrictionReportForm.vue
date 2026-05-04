<script setup>
import { reactive, ref } from 'vue'
import { saveFrictionReport } from '@/services/frictionServices'

const props = defineProps({
  subscription: {
    type: Object,
    required: true
  }
})

const successMessage = ref('')

const form = reactive({
  rating: '3',
  manySteps: false,
  hiddenMenus: false,
  manyConfirmations: false,
  pageErrors: false,
  others: false,
  details: ''
})

const ratings = [
  { value: '1', label: 'Muy mala' },
  { value: '2', label: 'Mala' },
  { value: '3', label: 'Regular' },
  { value: '4', label: 'Buena' },
  { value: '5', label: 'Excelente' }
]

const problemOptions = [
  { key: 'manySteps', label: 'Demasiados pasos' },
  { key: 'hiddenMenus', label: 'Menús escondidos' },
  { key: 'manyConfirmations', label: 'Muchas confirmaciones' },
  { key: 'pageErrors', label: 'Errores en la página' },
  { key: 'others', label: 'Otros' }
]

function resetForm() {
  form.rating = '3'
  form.manySteps = false
  form.hiddenMenus = false
  form.manyConfirmations = false
  form.pageErrors = false
  form.others = false
  form.details = ''
}

function buildProblems() {
  return problemOptions
    .filter(option => form[option.key])
    .map(option => option.key)
}

function handleSubmit() {
  const report = {
    subscriptionId: props.subscription.id,
    subscriptionName: props.subscription.name,
    rating: Number(form.rating),
    problems: buildProblems(),
    details: form.details.trim()
  }

  saveFrictionReport(report)
  successMessage.value = 'Reporte enviado correctamente'
  resetForm()

  setTimeout(() => {
    successMessage.value = ''
  }, 2000)
}
</script>

<template>
  <form class="friction-form" @submit.prevent="handleSubmit">
    <div class="title-friction">
      <h2>Problemas de fricción</h2>
      <p>¿Qué problemas estás experimentando con tu suscripción?</p>
    </div>

    <section class="friction-report">
      <div class="experience">
        <div class="experience-rating">
          <h3>Valoración de la experiencia:</h3>
          <div class="rating-dots" role="radiogroup" aria-label="Valoración de la experiencia">
            <label
              v-for="rating in ratings"
              :key="rating.value"
              class="rating-dot"
              :class="{ selected: form.rating === rating.value }"
              :title="rating.label"
            >
              <input v-model="form.rating" type="radio" name="rating" :value="rating.value">
              <span>{{ rating.value }}</span>
            </label>
          </div>
        </div>

        <div class="checkbox-friction">
          <div v-for="option in problemOptions" :key="option.key">
            <input :id="option.key" v-model="form[option.key]" type="checkbox" :name="option.key">
            <label :for="option.key">{{ option.label }}</label>
          </div>
        </div>
      </div>

      <div class="text-details">
        <h3>Danos más detalles:</h3>
        <textarea
          v-model="form.details"
          placeholder="Describe las dificultades encontradas durante la cancelación de tu suscripción..."
        ></textarea>
        <button type="submit">Enviar reporte</button>
      </div>
    </section>

    <div v-if="successMessage" class="success-popup" role="status" aria-live="polite">
      {{ successMessage }}
    </div>
  </form>
</template>

<style scoped>
.friction-form {
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  margin: 80px 0 100px 0;
  padding: 40px 0;
}

.title-friction {
  padding: 0px 0px 40px 0px;
  text-align: center;
}

.friction-report {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.experience {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
}

.experience-rating {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.rating-dots {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.rating-dot {
  cursor: pointer;
}

.rating-dot input {
  opacity: 0;
  pointer-events: none;
  position: absolute;
}

.rating-dot span {
  background-color: var(--surface-color);
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  color: var(--primary-color);
  display: grid;
  font-family: var(--font-heading);
  font-weight: 700;
  height: 44px;
  place-content: center;
  transition: translate 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease;
  width: 44px;
}

.rating-dot:hover span,
.rating-dot.selected span {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: var(--surface-color);
  translate: 0 -10px;
}

.checkbox-friction {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.checkbox-friction > div {
  align-items: start;
  display: grid;
  gap: 14px;
  grid-template-columns: 28px 1fr;
  line-height: 1.5;
}

.checkbox-friction input[type="checkbox"] {
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

.checkbox-friction input[type="checkbox"]::before {
  background-color: var(--surface-color);
  clip-path: polygon(14% 44%, 0 59%, 42% 100%, 100% 16%, 84% 0, 38% 64%);
  content: "";
  height: 11px;
  transform: scale(0);
  transition: transform 0.15s ease;
  width: 11px;
}

.checkbox-friction input[type="checkbox"]:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkbox-friction input[type="checkbox"]:checked::before {
  transform: scale(1);
}

.checkbox-friction label {
  color: var(--text-color);
  cursor: pointer;
  font-family: var(--font-body);
}

.text-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
  margin: 0 40px;
}

textarea {
  background-color: var(--background-color);
  border: 5px solid var(--primary-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  height: 20vh;
  padding: 20px;
}

textarea:focus {
  border-color: var(--secondary-color);
}

textarea::placeholder {
  color: var(--text-color);
  font-family: var(--font-body);
}

.text-details button {
  background-color: var(--primary-color);
  border: 0px;
  border-radius: var(--border-radius);
  color: var(--surface-color);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  font-weight: 600;
  margin-top: 40px;
  padding: 20px;
  transition: translate 0.2s ease, background-color 0.3s ease;
}

.text-details button:hover {
  background-color: var(--secondary-color);
  translate: 0px -5px;
}

.success-popup {
  animation: popup-in 0.25s ease;
  background-color: var(--surface-color);
  border: 2px solid var(--sucess-color);
  border-radius: 18px;
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.25);
  color: var(--text-color);
  font-family: var(--font-body);
  font-weight: 600;
  max-width: min(320px, calc(100vw - 48px));
  padding: 18px 22px;
  position: fixed;
  right: 24px;
  top: 24px;
  z-index: 20;
}

.success-popup::before {
  background-color: var(--sucess-color);
  border-radius: 50%;
  content: "";
  display: inline-block;
  height: 10px;
  margin-right: 10px;
  width: 10px;
}

@keyframes popup-in {
  from {
    opacity: 0;
    transform: translateY(-12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 950px) {
  .friction-report {
    gap: 30px;
    grid-template-columns: 1fr;
  }

  .success-popup {
    left: 16px;
    max-width: none;
    right: 16px;
    top: 16px;
  }
}
</style>
