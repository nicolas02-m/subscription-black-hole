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
  const problems = []

  if (form.manySteps) problems.push('manySteps')
  if (form.hiddenMenus) problems.push('hiddenMenus')
  if (form.manyConfirmations) problems.push('manyConfirmations')
  if (form.pageErrors) problems.push('pageErrors')
  if (form.others) problems.push('others')

  return problems
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
      <div id="many-steps">
        <input id="manySteps" v-model="form.manySteps" type="checkbox" name="manySteps">
        <label for="manySteps">Demasiados pasos</label>
      </div>
      <div id="hidden-menus">
        <input id="hiddenMenus" v-model="form.hiddenMenus" type="checkbox" name="hiddenMenus">
        <label for="hiddenMenus">Menus escondidos</label>
      </div>
      <div id="many-confirmations">
        <input id="manyConfirmations" v-model="form.manyConfirmations" type="checkbox" name="manyConfirmations">
        <label for="manyConfirmations">Muchas confirmaciones</label>
      </div>
      <div id="page-error">
        <input id="pageErrors" v-model="form.pageErrors" type="checkbox" name="pageErrors">
        <label for="pageErrors">Errores en la página</label>
      </div>
      <div id="other">
        <input id="others" v-model="form.others" type="checkbox" name="others">
        <label for="others">Otros</label>
      </div>
    </div>
    </div>


      <div class="text-details">
        <h3>Danos más detalles:</h3>
        <textarea v-model="form.details"
          placeholder="Describe las dificultades encontradas durante la cancelación de tu suscripción..."></textarea>
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
  margin: 80px 0 100px 0;
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  padding: 40px 0;
}

.experience{
display: flex;
flex-direction: column;
align-items: center;
gap: 40px;
width: 100%;
}

.title-friction {
  text-align: center;
  padding: 0px 0px 40px 00px;
}

.checkbox-friction{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.checkbox-friction > div {
  display: grid;
  grid-template-columns: 28px 1fr;
  align-items: start;
  gap: 14px;
  line-height: 1.5;
}

.checkbox-friction input[type="checkbox"] {
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

.checkbox-friction input[type="checkbox"]::before {
  content: "";
  width: 11px;
  height: 11px;
  clip-path: polygon(14% 44%, 0 59%, 42% 100%, 100% 16%, 84% 0, 38% 64%);
  background-color: var(--surface-color);
  transform: scale(0);
  transition: transform 0.15s ease;
}

.checkbox-friction input[type="checkbox"]:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

.checkbox-friction input[type="checkbox"]:checked::before {
  transform: scale(1);
}


.checkbox-friction label {
  font-family: var(--font-body);
  color: var(--text-color);
  cursor: pointer;
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
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.rating-dot span {
  display: grid;
  place-content: center;
  width: 44px;
  height: 44px;
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  background-color: var(--surface-color);
  color: var(--primary-color);
  font-family: var(--font-heading);
  font-weight: 700;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.rating-dot:hover span,
.rating-dot.selected span {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: var(--surface-color);
  transition: translate 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  translate: 0 -10px;
}

.success-popup {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 20;
  max-width: min(320px, calc(100vw - 48px));
  padding: 18px 22px;
  border: 2px solid var(--sucess-color);
  border-radius: 18px;
  background-color: var(--surface-color);
  color: var(--text-color);
  font-weight: 600;
  font-family: var(--font-body);
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.25);
  animation: popup-in 0.25s ease;
}

.success-popup::before {
  content: "";
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background-color: var(--sucess-color);
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

.friction-report {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

textarea {
  height: 20vh;
  border: 5px solid var(--primary-color);
  background-color: var(--background-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  padding: 20px;
}

textarea:focus{
  border-color: var(--secondary-color);
}



textarea::placeholder{
color: var(--text-color);
font-family: var(--font-body);
}

.text-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  margin: 0 40px;
}

.text-details button{
padding: 20px;
color: var(--surface-color);
background-color: var(--primary-color);
border-radius: var(--border-radius);
font-family: var(--font-body);
font-size: var(--font-body);
font-weight: 600;
border: 0px;
cursor: pointer;
margin-top: auto;
margin-top: 40px;
}

.text-details button:hover{
translate: 0px -5px;
transition: 0.2s ease, background-color 0.3s ease;
background-color: var(--secondary-color);
}



@media (max-width: 950px){

.friction-report {
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
}

.success-popup {
  top: 16px;
  right: 16px;
  left: 16px;
  max-width: none;
}

}
</style>
