<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['categorySelected'])
</script>

<template>
  <div class="categoryFilter">
    <h3>Filtrar por categoría</h3>
    <select @change="emit('categorySelected', $event.target.value)">
      <option value="">Todas</option>
      <option v-for="category in props.categories" :key="category.value" :value="category.value">
        {{ category.label }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.categoryFilter {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 100%;
}

.categoryFilter h3 {
  flex: 0 0 auto;
}

h3 {
  color: var(--text-color);
  font-family: var(--font-heading);
  margin: 0;
}

select {
  background-color: var(--background-color);
  border: 5px solid var(--card-color);
  border-radius: var(--border-radius);
  color: var(--text-color);
  font-family: var(--font-body);
  font-size: var(--font-size-body);
  padding: 15px;
  width: min(100%, 320px);
}

@media (max-width: 950px) {
  .categoryFilter {
    align-items: stretch;
    flex-direction: column;
    width: 100%;
  }

  select {
    width: 100%;
  }
}
</style>
