<script setup>
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="app-header">
    <nav class="nav-bar" aria-label="Navegacion principal">
      <router-link class="logo-link" to="/" aria-label="Subscription Black Hole" @click="closeMenu">
        <img
          class="logo"
          src="@/assets/images/Logo-subscription-black-hole.png"
          alt="Subscription Black Hole"
        >
      </router-link>

      <button class="menu-button" type="button" :aria-expanded="isMenuOpen" aria-controls="main-menu" aria-label="Abrir menu" @click="toggleMenu">
        
        <svg
          class="menu-icon"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
          viewBox="0 0 100 125"
          x="0px"
          y="0px"
          aria-hidden="true"
        >
          <path d="M26,77H74a4,4,0,0,0,0-8H26a4,4,0,0,0,0,8Z"/>
          <path d="M26,54H74a4,4,0,0,0,0-8H26a4,4,0,0,0,0,8Z"/>
          <path d="M26,31H74a4,4,0,0,0,0-8H26a4,4,0,0,0,0,8Z"/>
        </svg>
      </button>

      <ul id="main-menu" class="nav-links" :class="{ 'is-open': isMenuOpen }">
        <li><router-link to="/" @click="closeMenu">Dashboard</router-link></li>
        <li><router-link to="/add" @click="closeMenu">Añadir Suscripción</router-link></li>
        <li><router-link to="/simulation" @click="closeMenu">Simulación</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: center;
  padding: 0 1rem;
  position: sticky;
  top: 20px;
  z-index: 10;
}

.nav-bar {
  align-items: center;
  background-color: var(--surface-color);
  border-radius: 100px;
  display: flex;
  gap: clamp(2rem, 8vw, 6rem);
  justify-content: space-around;
  padding: 1rem;
  width: min(100%, 1100px);
}

.logo-link {
  align-items: center;
  display: inline-flex;
  flex: 0 0 auto;
}

.logo {
  display: block;
  height: 130px;
  width: auto;
}

.menu-button {
  display: none;
}

.nav-links {
  align-items: center;
  background-color: var(--surface-color);
  display: flex;
  gap: clamp(1.5rem, 5vw, 5rem);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  transition: transform 0.25s ease;
}

.nav-links li:hover {
  transform: translateY(-4px) scale(1.05);
}

.nav-links li a {
  background-color: var(--surface-color);
  color: var(--primary-color);
  font-family: var(--font-heading);
  font-size: clamp(1rem, 2vw, 1.5rem);
  font-style: normal;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
  white-space: nowrap;
}

.nav-links a:hover {
  color: var(--secondary-color);
}

@media (max-width: 950px) {
  .app-header {
    padding: 0 0.75rem;
    position: sticky;
    top: 12px;
  }

  .nav-bar {
    gap: 1rem;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    position: relative;
    width: 80%;
  }

  .logo {
    height: 90px;
  }

  .menu-button {
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    height: 50px;
    padding: 0;
    border: none;
    background-color: var(--surface-color);
    width: 50px;
  }

  .menu-icon {
    fill: var(--primary-color);
    height: 60px;
    width: auto;
  }

  .nav-links {
    border-radius: var(--border-radius);
    display: none;
    flex-direction: column;
    gap: 1rem;
    left: 0;
    padding: 1.25rem;
    position: absolute;
    right: 0;
    top: calc(100% + 0.75rem);
    z-index: 20;
  }

  .nav-links.is-open {
    display: flex;
  }

  .nav-links li:hover {
    transform: none;
  }

  .nav-links li a {
    display: block;
    font-size: 1.2rem;
    text-align: center;
  }
}
</style>
