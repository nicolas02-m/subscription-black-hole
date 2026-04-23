<script setup>
import DashboardActions from '@/components/dashboard/DashboardActions.vue'
import SubscriptionList from '@/components/dashboard/SubscriptionList.vue'
import ExpenseSummary from '@/components/dashboard/ExpenseSummary.vue'
import PlanetVisualisation from '@/components/dashboard/PlanetVisualisation.vue'
</script>

<template>
  <div>
    <h1>Dashboard</h1>
    <ExpenseSummary />
    <DashboardActions />
    <PlanetVisualisation />
    <SubscriptionList />
  </div>
</template>

<style scoped>
h1 {
    font-size: 2rem;
    margin: 2em;
    text-align: center;
}
</style>