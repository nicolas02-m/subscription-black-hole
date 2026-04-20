<script setup></script>

<template>
  <div>
    <h2>Problemas de fricción</h2>
    <p>¿Qué problemas estás experimentando con tu suscripción?</p>
  </div>
<div>
<h3>Valoración de la experiencia:</h3>
    <select>
        <option value="1">Muy mala</option>
        <option value="2">Mala</option>
        <option value="3">Regular</option>
        <option value="4">Buena</option>
        <option value="5">Excelente</option>
    </select>

    <div>
        <input type="checkbox" id="manySteps" name="manySteps">
        <label for="manySteps">Demasiados pasos</label>
    </div>
    <div>
        <input type="checkbox" id="hiddenMenus" name="hiddenMenus">
        <label for="hiddenMenus">Menus escondidos</label>
    </div>
    <div>
        <input type="checkbox" id="manyConfirmations" name="manyConfirmations">
        <label for="manyConfirmations">Muchas confirmaciones</label>
    </div>
    <div>
        <input type="checkbox" id="pageErrors" name="pageErrors">
        <label for="pageErrors">Errores en la página</label>
    </div>
    <div>
        <input type="checkbox" id="others" name="others">
        <label for="others">Otros</label>
    </div>

</div>

<div>
    <h3>Danos más detalles:</h3>
    <textarea placeholder="Describe las dificultades encontradas durante la cancelación de tu suscripción..."></textarea>
</div>

<button type="submit">Enviar reporte</button>
</template>

<style scoped></style>