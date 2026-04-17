import { defineStore } from "pinia";

export const useSubscriptionStore = defineStore("subscription", {
  state: () => ({
    subscriptions: [],
  }),
  actions: {
    addSubscription(subscription) {
      this.subscriptions.push(subscription);
      this.saveSubscriptions();
    },
    deleteSubscription(id) {
      this.subscriptions = this.subscriptions.filter(sub => sub.id !== id);
      this.saveSubscriptions();
    },

    saveSubscriptions() {
      localStorage.setItem('subscriptions', JSON.stringify(this.subscriptions));
    },
    loadSubscriptions() {
      const data = localStorage.getItem('subscriptions');
      if (data) {
        this.subscriptions = JSON.parse(data);
      }
    }

  },
  getters: {
    monthlyTotal(state) {
      return state.subscriptions.reduce((total,sub) => { if (sub.frequency === 'yearly'){ return total + sub.price/12; }
      return total + sub.price; }, 0);
    },
    annualTotal(state) {
      return this.subscriptions.reduce((total, sub) => { return total + (sub.price * 12); }, 0);
    },
    categories(state) {
      const cats = state.subscriptions.map(sub => sub.category);
      return [...new Set(cats)];
    }
  }
});