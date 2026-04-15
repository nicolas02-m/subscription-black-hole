import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/DashboardView.vue";
import SubscriptionDetail from "@/views/SubscritptionDetail.vue";
import SimulationView from "@/views/SimulationView.vue";
import AddSubscription from "@/views/AddSubscription.vue";
import EditSubscriptionView from "@/views/EditSubscriptionView.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: DashboardView
  },
  {
    path: "/add",
    name: "AddSubscription",
    component: AddSubscription
  },
  {
    path: "/simulation",
    name: "Simulation",
    component: SimulationView
  },
  {
    path: "/subscriptions/:id",
    name: "SubscriptionDetail",
    component: SubscriptionDetail
  },
  {
    path: "/subscriptions/:id/edit",
    name: "EditSubscription",
    component: EditSubscriptionView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;