<script setup></script>

<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/add">Add Subscription</router-link></li>
        <li><router-link to="/simulation">Simulation</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<style scoped></style>
