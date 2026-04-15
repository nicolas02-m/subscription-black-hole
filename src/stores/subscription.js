import { defineStore } from "pinia";

export const useSubscriptionStore = defineStore("subscription", {
  state: () => ({
    subscriptions: [],
  }),
  actions: {
    addSubscription(subscription) {
      this.subscriptions.push(subscription);
    },
    deleteSubscription(id) {
      this.subscriptions = this.subscriptions.filter(sub => sub.id !== id);
    },
  },
  getters: {
    monthlyTotal(state) {
      return state.subscriptions.reduce((total,sub) => { if (sub.frequency === 'yearly'){ return total + sub.price/12; }
      return total + sub.price; }, 0);
    },
    annualTotal(state) {
      return this.subscriptions.reduce((total, sub) => { return total + (sub.price * 12); }, 0);
    }
  }
});