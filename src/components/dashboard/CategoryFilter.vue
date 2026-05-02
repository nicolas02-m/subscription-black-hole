<script setup>
const props = defineProps({
    categories: {
        type: Array,
        required: true
    }
});

const emit = defineEmits(['categorySelected']);
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
h3 {
font-family: var(--font-heading);
color: var(--text-color);
}

select {
    font-size: var(--font-size-body);
    font-family: var(--font-body);
    border: 5px solid var(--card-color);
    border-radius: var(--border-radius);
    background-color: var(--background-color);
    color: var(--text-color);
    padding: 15px;
}
.categoryFilter {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    gap: 20px;
}

.categoryFilter h3 {
    margin-bottom: 10px;
}
</style>