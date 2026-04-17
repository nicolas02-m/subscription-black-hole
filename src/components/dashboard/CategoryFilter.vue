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
.categoryFilter {
    display: flex;
    margin-bottom: 20px;
}

.categoryFilter h3 {
    margin-bottom: 10px;
}
</style>