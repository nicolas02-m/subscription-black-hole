<script setup>
import { reactive, watch } from 'vue'
import PaymentPlatformCard from './PaymentPlatformCard.vue'
import { CATEGORIES } from '@/utils/constants'

const props = defineProps({
  initialValues: {
    type: Object,
    default: null
  },
  submitLabel: {
    type: String,
    default: 'Añadir Suscripción'
  }
})

const emit = defineEmits(['submit'])

function createDefaultForm() {
  return {
    id: null,
    name: '',
    price: '',
    frequency: 'monthly',
    category: 'streaming',
    paymentPlatform: 'creditCard',
    cancellationLink: '',
    dateofCreation: new Date().toISOString().split('T')[0]
  }
}

const form = reactive(createDefaultForm())

function populateForm(values) {
  const nextValues = {
    ...createDefaultForm(),
    ...(values ?? {})
  }

  form.id = nextValues.id
  form.name = nextValues.name
  form.price = nextValues.price
  form.frequency = nextValues.frequency
  form.category = nextValues.category
  form.paymentPlatform = nextValues.paymentPlatform
  form.cancellationLink = nextValues.cancellationLink
  form.dateofCreation = nextValues.dateofCreation
}

watch(() => props.initialValues, (values) => {
  populateForm(values)
}, { immediate: true })

function buildPayload() {
  const payload = {
    name: form.name.trim(),
    price: Number(form.price),
    frequency: form.frequency,
    category: form.category,
    paymentPlatform: form.paymentPlatform,
    cancellationLink: form.cancellationLink.trim(),
    dateofCreation: form.dateofCreation
  }

  if (form.id !== null && form.id !== undefined) {
    payload.id = form.id
  }

  return payload
}

function isEditMode() {
  return props.initialValues !== null
}

function resetForm() {
  if (isEditMode()) {
    populateForm(props.initialValues)
    return
  }

  populateForm()
}

function handleSubmit() {
  if (!form.name.trim()) {
    alert('Introduce el nombre de la suscripción')
    return
  }

  if (form.price === '' || Number(form.price) <= 0) {
    alert('Introduce un precio válido')
    return
  }

  const payload = buildPayload()

  if (!payload.id) {
    payload.id = Date.now()
  }

  emit('submit', payload)

  if (!isEditMode()) {
    resetForm()
  }
}

function handleReset() {
  if (confirm('¿Estás seguro de que quieres limpiar el formulario?')) {
    resetForm()
  }
}
</script>

<template>
  <form class="subscriptionForm" @submit.prevent="handleSubmit">
    <h2>Paso 1: Datos obligatorios</h2>
    <div class="formGrid">
      <div class="field">
        <label for="name">Nombre:</label>
        <input id="name" v-model="form.name" type="text" name="name" placeholder="Ej. Netflix" required>
      </div>

      <div class="field">
        <label for="price">Precio:</label>
        <input id="price" v-model="form.price" type="number" name="price" placeholder="12.99" min="0" step="0.01" required>
      </div>

      <div class="field">
        <label for="category">Categoría:</label>
        <select id="category" v-model="form.category" name="category">
          <option v-for="cat in CATEGORIES" :key="cat.value" :value="cat.value">
            {{ cat.label }}
          </option>
        </select>
      </div>

      <div class="field">
        <label>Frecuencia de pago:</label>
        <div class="cardGroup">
          <button
            type="button"
            class="card"
            :class="{ active: form.frequency === 'monthly' }"
            @click="form.frequency = 'monthly'"
          >
            <span class="cardTitle">Mensual</span>
          </button>
          <button
            type="button"
            class="card"
            :class="{ active: form.frequency === 'yearly' }"
            @click="form.frequency = 'yearly'"
          >
            <span class="cardTitle">Anual</span>
          </button>
        </div>
      </div>

      <div class="field">
        <label for="dateofCreation">Fecha de creación:</label>
        <input id="dateofCreation" v-model="form.dateofCreation" type="date" name="dateofCreation">
      </div>
    </div>

    <div class="optionalSection">
      <h2>Paso 2: Datos opcionales</h2>
      <div class="field">
        <label>Plataforma de pago:</label>
        <PaymentPlatformCard v-model="form.paymentPlatform" />
      </div>
      <div class="field">
        <label for="cancellationLink">Link de cancelación:</label>
        <input
          id="cancellationLink"
          v-model="form.cancellationLink"
          type="url"
          name="cancellationLink"
          placeholder="https://example.com/cancel"
        >
      </div>
    </div>

    <div class="formActions">
      <button class="clearButton" type="button" @click="handleReset">Limpiar Formulario</button>
      <button class="submitButton" type="submit">
        {{ submitLabel }}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
          <path
            d="m50 8.332c22.996 0 41.668 18.672 41.668 41.668s-18.672 41.668-41.668 41.668-41.668-18.672-41.668-41.668 18.672-41.668 41.668-41.668zm-4.168 45.836v12.5c0 2.3008 1.8672 4.1641 4.168 4.1641s4.168-1.8672 4.168-4.1641v-12.5h12.5c2.3008 0 4.1641-1.8672 4.1641-4.168s-1.8672-4.168-4.1641-4.168h-12.5v-12.5c0-2.3008-1.8672-4.1641-4.168-4.1641s-4.168 1.8672-4.168 4.1641v12.5h-12.5c-2.3008 0-4.1641 1.8672-4.1641 4.168s1.8672 4.168 4.1641 4.168z"
            fill-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </form>
</template>

<style scoped>
.subscriptionForm {
  background: var(--surface-color);
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  gap: 22px;
  margin-top: 40px;
  padding: 24px;
}

.optionalSection {
  border-top: 5px solid var(--card-color);
  padding-top: 20px;
}

.optionalSection .field {
  margin: 30px 0;
}

.formGrid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

.field label {
  font-family: var(--font-body);
  font-size: var(--font-text-size);
  font-weight: 600;
}

.field input,
.field select {
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  font-family: var(--font-body);
  font-size: var(--font-text-size);
  font-weight: 600;
  padding: 12px 14px;
}

.cardGroup {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card {
  background: var(--surface-color);
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px;
  text-align: left;
  transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.card:hover {
  border-color: var(--primary-color);
}

.card.active {
  background-color: var(--primary-color);
  color: var(--surface-color);
  transform: scale(1.02);
}

.cardTitle {
  font-weight: 700;
}

.formActions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 4px;
}

.submitButton {
  align-items: center;
  background: var(--primary-color);
  border: none;
  border-radius: var(--border-radius);
  color: var(--surface-color);
  cursor: pointer;
  display: flex;
  font-family: var(--font-body);
  font-size: var(--font-text-size);
  font-weight: 600;
  padding: 12px 18px;
  transition: translate 0.3s ease, transform 0.4s ease, background-color 0.3s ease;
}

.submitButton svg {
  fill: var(--surface-color);
  height: 30px;
  margin-left: 8px;
  width: 30px;
}

.submitButton:hover {
  background-color: var(--secondary-color);
  opacity: 0.9;
  transform: scale(1.1);
  translate: 0 -10px;
}

.submitButton:active {
  transform: scale(0.98);
}

.clearButton {
  background: transparent;
  border: none;
  border-radius: var(--border-radius);
  color: var(--primary-color);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--font-text-size);
  font-weight: 600;
  padding: 12px 18px;
  transition: transform 0.4s ease, translate 0.3s ease, color 0.3s ease;
}

.clearButton:hover {
  color: var(--secondary-color);
  transform: scale(1.1);
  translate: 0 -10px;
}

@media (max-width: 950px) {
  .formGrid,
  .cardGroup {
    grid-template-columns: 1fr;
  }
}
</style>
