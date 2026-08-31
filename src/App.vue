<script setup lang="ts">
import { onMounted } from 'vue'
import TreeGrid from './components/TreeGrid.vue'
import { useTreeData } from './composables/useTreeData'

const { loading, items, rowData, loadItems } = useTreeData()

onMounted(() => {
  void loadItems()
})
</script>

<template>
  <main class="app">
    <h1>Tree Store</h1>
    <p v-if="loading">Загрузка данных...</p>
    <p v-else>Загружено элементов: {{ items.length }}</p>
    <TreeGrid :row-data="rowData" />
  </main>
</template>

<style scoped>
.app {
  padding: 24px;
  font-family: system-ui, sans-serif;
}
</style>
