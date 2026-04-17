import { defineStore } from "pinia";
import { useLocalStorage } from "@/composables/useLocalStorage";

const { saveSubscriptions, loadSubscriptions } = useLocalStorage();

export const useSubscriptionStore = defineStore("subscription", {
  state: () => ({
    subscriptions: [],
  }),
  actions: {
    addSubscription(subscription) {
      this.subscriptions.push(subscription);
      saveSubscriptions(this.subscriptions);
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