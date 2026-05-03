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
    margin: 0;
}

select {
    width: min(100%, 320px);
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
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    max-width: 100%;
}

.categoryFilter h3 {
    flex: 0 0 auto;
}

@media (max-width: 950px) {
    .categoryFilter {
        width: 100%;
        flex-direction: column;
        align-items: stretch;
    }

    select {
        width: 100%;
    }
}
</style>
