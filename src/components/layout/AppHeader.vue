<script setup></script>

<template>
    <div class="nav-bar">
    <nav>
    <span id="logo">Logo</span>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/add">Añadir Suscripción</router-link></li>
        <li><router-link to="/simulation">Simulación</router-link></li>
      </ul>
    </nav>
    </div>
</template>

<style scoped>
.nav-bar{
display: flex;
justify-content: center;
position: sticky;
top: 20px;
}


nav {
  display: flex;
  justify-content: space-evenly;
  padding: 1rem;
  width: 80%;
  background-color: var(--surface-color);
  border-radius: 100px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 150px;
  background-color: var(--surface-color);
}

nav ul li a {
  color: var(--primary-color);
  background-color: var(--surface-color);
  text-decoration: none;
  font-weight: bold;
  font-size: 1.5rem;
  font-family: var(--font-heading);
  font-weight: 500;
  font-style: normal;
}

li:hover {
    transform: scale(1.02);
    translate: 0 -10px;
    transition: color 0.2s ease, transform 0.2s ease, translate 0.2s ease;
}

</style>