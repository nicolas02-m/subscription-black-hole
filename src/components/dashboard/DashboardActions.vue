<script setup>
import router from '@/router';
</script>
<template>
  <div class="actions">
    <button @click="router.push('/add')">Añadir suscripción
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-5.0 -10.0 110.0 135.0">
 <path d="m50 8.332c22.996 0 41.668 18.672 41.668 41.668s-18.672 41.668-41.668 41.668-41.668-18.672-41.668-41.668 18.672-41.668 41.668-41.668zm-4.168 45.836v12.5c0 2.3008 1.8672 4.1641 4.168 4.1641s4.168-1.8672 4.168-4.1641v-12.5h12.5c2.3008 0 4.1641-1.8672 4.1641-4.168s-1.8672-4.168-4.1641-4.168h-12.5v-12.5c0-2.3008-1.8672-4.1641-4.168-4.1641s-4.168 1.8672-4.168 4.1641v12.5h-12.5c-2.3008 0-4.1641 1.8672-4.1641 4.168s1.8672 4.168 4.1641 4.168z" fill-rule="evenodd"/></svg>
    </button>
    <button @click="router.push('/simulation')">Simulación

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80" x="0px" y="0px"><path d="m60,28h-24c-1.1,0-2,.9-2,2v30c0,1.1.9,2,2,2h24c1.1,0,2-.9,2-2v-30c0-1.1-.9-2-2-2Zm-18,29h-4v-4h4v4Zm0-9h-4v-4h4v4Zm8,9h-4v-4h4v4Zm0-9h-4v-4h4v4Zm8,9h-4v-4h4v4Zm0-9h-4v-4h4v4Zm0-9h-20v-6h20v6Z"/><path d="m32,39.3v-9.3c0-2.21,1.79-4,4-4h5.6c.26-1.29.4-2.63.4-4,0-11.05-8.95-20-20-20S2,10.95,2,22s8.95,20,20,20c3.65,0,7.06-.99,10-2.7Zm-15.5-13.8v-.5h3v.5c0,1.1.9,2,2,2h1c1.1,0,2-.9,2-2s-.9-2-2-2h-1c-2.76,0-5-2.24-5-5,0-2.41,1.72-4.43,4-4.9v-1.6h3v1.6c2.28.46,4,2.48,4,4.9v.5h-3v-.5c0-1.1-.9-2-2-2h-1c-1.1,0-2,.9-2,2s.9,2,2,2h1c2.76,0,5,2.24,5,5,0,2.41-1.72,4.43-4,4.9v1.6h-3v-1.6c-2.28-.46-4-2.48-4-4.9Z"/></svg>
    </button>
  </div>
</template>

<style scoped>

.actions {
    display: flex;
    margin-top: 150px;
    width: 100%;
    gap: 20px;

}
button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 40px;
    width: 100%;
    background-color: var(--primary-color);
    font-weight: 600;
    font-family: var(--font-heading);
    color: var(--surface-color);
    border: none;
    border-radius: 20px;
    font-size: 1.5em;
    cursor: pointer;
}

button:hover {
translate: 0px -10px;
transition: translate 0.3s ease-in-out, background-color 0.5s ease;
background-color: var(--secondary-color);
}

button:active {
    background-color: #555;
    transform: scale(0.95);
}

button svg {
    width: 50px;
    height: 50px;
    fill: var(--surface-color);
    margin-left: 10px;
}

@media (max-width: 950px) {
    .actions {
        flex-direction: column;
        gap: 50px;
    }
}

</style>