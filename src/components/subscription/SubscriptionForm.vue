<script setup>
import { reactive, watch } from 'vue'
import PaymentPlaformCard from './PaymentPlaformCard.vue'
import { CATEGORIES } from '@/utils/constants'

const props = defineProps({
    initialValues: {
        type: Object,
        default: null,
    },
    submitLabel: {
        type: String,
        default: 'Añadir Suscripción',
    },
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
        dateofCreation: new Date().toISOString().split('T')[0],
    }
}

const form = reactive(createDefaultForm())

function normalizeDateForInput(value) {
    if (!value) {
        return createDefaultForm().dateofCreation
    }

    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return value
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
        return createDefaultForm().dateofCreation
    }

    return date.toISOString().split('T')[0]
}

function populateForm(values) {
    const nextValues = {
        ...createDefaultForm(),
        ...(values ?? {}),
    }

    form.id = nextValues.id
    form.name = nextValues.name
    form.price = nextValues.price
    form.frequency = nextValues.frequency
    form.category = nextValues.category
    form.paymentPlatform = nextValues.paymentPlatform
    form.cancellationLink = nextValues.cancellationLink
    form.dateofCreation = normalizeDateForInput(nextValues.dateofCreation)
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
        dateofCreation: form.dateofCreation,
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
                <input id="name" type="text" name="name" placeholder="Ej. Netflix" v-model="form.name" required>
            </div>
            <div class="field">
                <label for="price">Precio:</label>
                <input id="price" type="number" name="price" placeholder="12.99" v-model="form.price" min="0"
                    step="0.01" required>
                <span id="currency">€</span>
            </div>
            <div class="field">
                <label for="category">Categoría:</label>
                <select id="category" name="category" v-model="form.category">
                    <option v-for="cat in CATEGORIES" :key="cat.value" :value="cat.value">
                        {{ cat.label }}
                    </option>
                </select>
            </div>

            <div class="field">
                <label>Frecuencia de pago:</label>
                <div class="cardGroup">
                    <button type="button" class="card" :class="{ active: form.frequency === 'monthly' }"
                        @click="form.frequency = 'monthly'">
                        <span class="cardTitle">Mensual</span>
                    </button>
                    <button type="button" class="card" :class="{ active: form.frequency === 'yearly' }"
                        @click="form.frequency = 'yearly'">
                        <span class="cardTitle">Anual</span>
                    </button>
                </div>
            </div>
            <div class="field">
                <label for="dateofCreation">Fecha de creación:</label>
                <input id="dateofCreation" type="date" name="dateofCreation" v-model="form.dateofCreation">
            </div>
        </div>

        <div class="optionalSection">
            <h2>Paso 2: Datos opcionales</h2>
            <div class="field">
                <label>Plataforma de pago:</label>
                <PaymentPlaformCard v-model="form.paymentPlatform" />
            </div>
            <div class="field">
                <label for="cancellationLink">Link de cancelación:</label>
                <input id="cancellationLink" type="url" name="cancellationLink" placeholder="https://example.com/cancel"
                    v-model="form.cancellationLink">
            </div>
        </div>
        <div class="formActions">
            <button type="button" @click="handleReset">Limpiar Formulario</button>
            <button class="submitButton" type="submit">{{ submitLabel }}</button>
        </div>
    </form>
</template>

<style scoped>
.subscriptionForm {
    display: flex;
    flex-direction: column;
    gap: 22px;
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 16px;
    background: #fff;
}

.optionalSection {
    border-top: 1px solid black;
    padding-top: 20px;
}

.formGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.field label {
    font-weight: 600;
}

.field input,
.field select {
    padding: 12px 14px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font: inherit;
}

.cardGroup {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
}

.two-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
}

.card {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 16px;
    border: 2px solid #d8d8d8;
    border-radius: 14px;
    background: #fff;
    text-align: left;
    cursor: pointer;
    transition: transform 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.card:hover {
    border-color: #999;
}

.card.active {
    transform: scale(1.02);
    border-color: #111;
    background-color: #f3f3f3;
}

.cardTitle {
    font-weight: 700;
}

.formActions {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
}

.submitButton {
    padding: 12px 18px;
    border: none;
    border-radius: 10px;
    background: #111;
    color: #fff;
    font: inherit;
    cursor: pointer;
    transition: opacity 0.18s ease, transform 0.18s ease;
}

.submitButton:hover {
    opacity: 0.92;
}

.submitButton:active {
    transform: scale(0.98);
}

@media (max-width: 700px) {
    .formGrid,
    .cardGroup {
        grid-template-columns: 1fr;
    }
}
</style>
