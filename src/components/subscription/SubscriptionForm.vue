<script setup>
import { reactive } from 'vue'
const emit = defineEmits(['submit'])

const form = reactive({
    name: '',
    price: '',
    frequency: 'monthly',
    category: 'streaming',
    paymentPlatform: 'creditCard',
    cancellationLink: '',
})

function buildPayload() {
    return {
        id: Date.now(),
        name: form.name.trim(),
        price: Number(form.price),
        frequency: form.frequency,
        category: form.category,
        paymentPlatform: form.paymentPlatform,
        cancellationLink: form.cancellationLink.trim(),
        active: true
    }
}

function resetForm() {
    form.name = ''
    form.price = ''
    form.frequency = 'monthly'
    form.category = 'streaming'
    form.paymentPlatform = 'creditCard'
    form.cancellationLink = ''
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

    emit('submit', buildPayload())
    resetForm()
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
                    <option value="streaming">Streaming</option>
                    <option value="music">Música</option>
                    <option value="gaming">Juegos</option>
                    <option value="software">Software</option>
                    <option value="education">Educación</option>
                    <option value="other">Otra</option>
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
        </div>

        <div class="optionalSection">
            <h2>Paso 2: Datos opcionales</h2>
            <div class="field">
                <label>Plataforma de pago:</label>
                <div class="cardGroupPaymentPlatform">
                    <button type="button" class="cardPaymentPlatform" :class="{ active: form.paymentPlatform === 'creditCard' }"
                        @click="form.paymentPlatform = 'creditCard'">
                        <span class="cardTitle">Tarjeta de crédito</span>
                    </button>
                    <button type="button" class="cardPaymentPlatform" :class="{ active: form.paymentPlatform === 'appleStore' }"
                        @click="form.paymentPlatform = 'appleStore'">
                        <span class="cardTitle">Apple Store</span>
                    </button>
                    <button type="button" class="cardPaymentPlatform" :class="{ active: form.paymentPlatform === 'playStore' }"
                        @click="form.paymentPlatform = 'playStore'">
                        <span class="cardTitle">Play Store</span>
                    </button>
                    <button type="button" class="cardPaymentPlatform" :class="{ active: form.paymentPlatform === 'paypal' }"
                        @click="form.paymentPlatform = 'paypal'">
                        <span class="cardTitle">PayPal</span>
                    </button>
                    <button type="button" class="cardPaymentPlatform" :class="{ active: form.paymentPlatform === 'web' }"
                        @click="form.paymentPlatform = 'web'">
                        <span class="cardTitle">Web</span>
                    </button>
                    <button type="button" class="cardPaymentPlatform" :class="{ active: form.paymentPlatform === 'other' }"
                        @click="form.paymentPlatform = 'other'">
                        <span class="cardTitle">Otros</span>
                    </button>
                </div>
            </div>
            <div class="field">
                <label for="cancellationLink">Link de cancelación:</label>
                <input id="cancellationLink" type="url" name="cancellationLink" placeholder="https://example.com/cancel"
                    v-model="form.cancellationLink">
            </div>
        </div>
        <div class="formActions">
            <button type="button" @click="handleReset">Limpiar Formulario</button>
            <button class="submitButton" type="submit">Añadir Suscripción</button>
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
.field select{
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

.cardGroupPaymentPlatform {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
}

.cardPaymentPlatform {
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

.cardPaymentPlatform:hover {
    border-color: #999;
}

.cardPaymentPlatform.active {
    transform: scale(1.02);
    border-color: #111;
    background-color: #f3f3f3;
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