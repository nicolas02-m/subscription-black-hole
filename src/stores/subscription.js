import { defineStore } from "pinia";
import { useLocalStorage } from "@/composables/useLocalStorage";

const { saveSubscriptions, loadSubscriptions } = useLocalStorage();

function parseDate(dateString) {
  if (!dateString) return null;
  return new Date(dateString);
}

function calculateNextPaymentDate(subscription) {
  const startDate = parseDate(subscription.dateofCreation);
  if (!startDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let nextDate = new Date(startDate);

  while (nextDate < today) {
    if (subscription.frequency === 'yearly') {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    } else {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
  }

  return nextDate;
}

function formatDate(date) {
  if (!date) return 'No disponible';

  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function calculateTotalPaid(subscription) {
  const startDate = parseDate(subscription.dateofCreation);
  if (!startDate) return 0;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let nextDate = new Date(startDate);
  let count = 0;

  while (nextDate <= now) {
    count++;
    if (subscription.frequency === 'yearly') {
      nextDate.setFullYear(nextDate.getFullYear() + 1);
    } else {
      nextDate.setMonth(nextDate.getMonth() + 1);
    }
  }

  return count * subscription.price;
}

export const useSubscriptionStore = defineStore("subscription", {
  state: () => ({
    subscriptions: [],
  }),
  actions: {
    addSubscription(subscription) {
      this.subscriptions.push(subscription);
      saveSubscriptions(this.subscriptions);
    },
    updateSubscription(id, subscription) {
      const index = this.subscriptions.findIndex(sub => sub.id === id);
      if (index !== -1) {
        this.subscriptions[index] = { ...this.subscriptions[index], ...subscription };
        saveSubscriptions(this.subscriptions);
      }
    },
    deleteSubscription(id) {
      this.subscriptions = this.subscriptions.filter(sub => sub.id !== id);
      saveSubscriptions(this.subscriptions);
    },

    initSubscriptions() {
      const data = loadSubscriptions();
      if (data) {
        this.subscriptions = data;
      }
    },
  },
  getters: {
    monthlyTotal(state) {
      return state.subscriptions.reduce((total, sub) => {
        if (sub.frequency === 'yearly') {
          return total + sub.price / 12;
        }
        return total + sub.price;
      }, 0);
    },
    annualTotal(state) {
  return state.subscriptions.reduce((total, sub) => {
    if (sub.frequency === 'yearly') {
      return total + sub.price;
    }
    return total + sub.price * 12;
  }, 0);
},
    categories(state) {
      const cats = state.subscriptions.map(sub => sub.category);
      return [...new Set(cats)];
    },
    nextPaymentFor: (state) => (subscription) => {
      return calculateNextPaymentDate(subscription);
    },
    nextPaymentForId: (state) => (id) => {
      const sub = state.subscriptions.find(item => item.id === id);
      return sub ? calculateNextPaymentDate(sub) : null;
    },
    totalPaidFor: (state) => (subscription) => {
      return calculateTotalPaid(subscription);
    },
    totalPaidForId: (state) => (id) => {
      const sub = state.subscriptions.find(item => item.id === id);
      return sub ? calculateTotalPaid(sub) : 0;
    },
  },
});