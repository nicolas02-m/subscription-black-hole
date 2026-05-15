import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { calculateAnnualCost, calculateMonthlyCost } from '@/utils/calculations'
import { normalizeCategoryValue } from '@/utils/constants'

const { saveSubscriptions, loadSubscriptions } = useLocalStorage()

// Convierte una fecha guardada a Date. Devuelve null si no hay valor.
function parseDate(dateString) {
  if (!dateString) return null
  return new Date(dateString)
}

// Unifica los datos base de una suscripcion antes de guardarla o mostrarla.
function normalizeSubscription(subscription) {
  return {
    ...subscription,
    category: normalizeCategoryValue(subscription.category),
    price: Number(subscription.price) || 0
  }
}

// Calcula la siguiente fecha de cobro segun la fecha inicial y la frecuencia.
function calculateNextPaymentDate(subscription) {
  const startDate = parseDate(subscription.dateofCreation)
  if (!startDate) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let nextDate = new Date(startDate)

  // Avanza cobro a cobro hasta encontrar una fecha futura o igual a hoy.
  while (nextDate < today) {
    if (subscription.frequency === 'yearly') {
      nextDate.setFullYear(nextDate.getFullYear() + 1)
    } else {
      nextDate.setMonth(nextDate.getMonth() + 1)
    }
  }

  return nextDate
}

// Calcula el importe historico pagado desde el alta hasta hoy.
function calculateTotalPaid(subscription) {
  const startDate = parseDate(subscription.dateofCreation)
  if (!startDate) return 0

  const now = new Date()
  now.setHours(0, 0, 0, 0)

  let nextDate = new Date(startDate)
  let count = 0

  // Cuenta cada cobro ya producido para multiplicarlo por el precio original.
  while (nextDate <= now) {
    count++
    if (subscription.frequency === 'yearly') {
      nextDate.setFullYear(nextDate.getFullYear() + 1)
    } else {
      nextDate.setMonth(nextDate.getMonth() + 1)
    }
  }

  return count * (Number(subscription.price) || 0)
}

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    subscriptions: []
  }),
  actions: {
    // Guarda una nueva suscripcion y actualiza el almacenamiento local.
    addSubscription(subscription) {
      this.subscriptions.push(normalizeSubscription(subscription))
      saveSubscriptions(this.subscriptions)
    },
    // Actualiza una suscripcion existente manteniendo los campos no editados.
    updateSubscription(id, subscription) {
      const index = this.subscriptions.findIndex(sub => sub.id === id)

      if (index !== -1) {
        this.subscriptions[index] = normalizeSubscription({
          ...this.subscriptions[index],
          ...subscription
        })
        saveSubscriptions(this.subscriptions)
      }
    },
    // Elimina una suscripcion por id y sincroniza el almacenamiento local.
    deleteSubscription(id) {
      this.subscriptions = this.subscriptions.filter(sub => sub.id !== id)
      saveSubscriptions(this.subscriptions)
    },
    // Carga las suscripciones del navegador al iniciar la aplicacion.
    initSubscriptions() {
      const data = loadSubscriptions()

      if (data) {
        this.subscriptions = data.map(normalizeSubscription)
        saveSubscriptions(this.subscriptions)
      }
    }
  },
  getters: {
    monthlyTotal(state) {
      return calculateMonthlyCost(state.subscriptions)
    },
    annualTotal(state) {
      return calculateAnnualCost(state.subscriptions)
    },
    categories(state) {
      const cats = state.subscriptions.map(sub => sub.category)
      // Set elimina categorias repetidas para alimentar los filtros.
      return [...new Set(cats)]
    },
    nextPaymentFor: () => (subscription) => {
      return calculateNextPaymentDate(subscription)
    },
    totalPaidFor: () => (subscription) => {
      return calculateTotalPaid(subscription)
    }
  }
})
