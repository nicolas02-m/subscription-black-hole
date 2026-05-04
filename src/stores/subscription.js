import { defineStore } from 'pinia'
import { useLocalStorage } from '@/composables/useLocalStorage'
import { calculateAnnualCost, calculateMonthlyCost } from '@/utils/calculations'
import { normalizeCategoryValue } from '@/utils/constants'

const { saveSubscriptions, loadSubscriptions } = useLocalStorage()

function parseDate(dateString) {
  if (!dateString) return null
  return new Date(dateString)
}

function normalizeSubscription(subscription) {
  return {
    ...subscription,
    category: normalizeCategoryValue(subscription.category),
    price: Number(subscription.price) || 0
  }
}

function calculateNextPaymentDate(subscription) {
  const startDate = parseDate(subscription.dateofCreation)
  if (!startDate) return null

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let nextDate = new Date(startDate)

  while (nextDate < today) {
    if (subscription.frequency === 'yearly') {
      nextDate.setFullYear(nextDate.getFullYear() + 1)
    } else {
      nextDate.setMonth(nextDate.getMonth() + 1)
    }
  }

  return nextDate
}

function calculateTotalPaid(subscription) {
  const startDate = parseDate(subscription.dateofCreation)
  if (!startDate) return 0

  const now = new Date()
  now.setHours(0, 0, 0, 0)

  let nextDate = new Date(startDate)
  let count = 0

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
    addSubscription(subscription) {
      this.subscriptions.push(normalizeSubscription(subscription))
      saveSubscriptions(this.subscriptions)
    },
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
    deleteSubscription(id) {
      this.subscriptions = this.subscriptions.filter(sub => sub.id !== id)
      saveSubscriptions(this.subscriptions)
    },
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
