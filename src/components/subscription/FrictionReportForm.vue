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
    <div>
      <h2>Problemas de fricción</h2>
      <p>¿Qué problemas estás experimentando con tu suscripción?</p>
    </div>

    <div>
      <h3>Valoración de la experiencia:</h3>
      <select v-model="form.rating">
        <option value="1">Muy mala</option>
        <option value="2">Mala</option>
        <option value="3">Regular</option>
        <option value="4">Buena</option>
        <option value="5">Excelente</option>
      </select>

      <div>
        <input id="manySteps" v-model="form.manySteps" type="checkbox" name="manySteps">
        <label for="manySteps">Demasiados pasos</label>
      </div>
      <div>
        <input id="hiddenMenus" v-model="form.hiddenMenus" type="checkbox" name="hiddenMenus">
        <label for="hiddenMenus">Menus escondidos</label>
      </div>
      <div>
        <input id="manyConfirmations" v-model="form.manyConfirmations" type="checkbox" name="manyConfirmations">
        <label for="manyConfirmations">Muchas confirmaciones</label>
      </div>
      <div>
        <input id="pageErrors" v-model="form.pageErrors" type="checkbox" name="pageErrors">
        <label for="pageErrors">Errores en la página</label>
      </div>
      <div>
        <input id="others" v-model="form.others" type="checkbox" name="others">
        <label for="others">Otros</label>
      </div>
    </div>

    <div>
      <h3>Danos más detalles:</h3>
      <textarea
        v-model="form.details"
        placeholder="Describe las dificultades encontradas durante la cancelación de tu suscripción..."
      ></textarea>
    </div>

    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <button type="submit">Enviar reporte</button>
  </form>
</template>

<style scoped>
.friction-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.success-message {
  color: #1f6f43;
  font-weight: 600;
}
</style>
