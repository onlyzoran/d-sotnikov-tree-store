<script setup lang="ts">
import { onMounted } from 'vue'
import { useTreeData } from './composables/useTreeData'

const { loading, items, loadItems } = useTreeData()

onMounted(() => {
  void loadItems()
})
</script>

<template>
  <main class="app">
    <p v-if="loading">Загрузка данных...</p>
    <p v-else>Загружено элементов: {{ items.length }}</p>
    <h1>Tree Store</h1>
  </main>
</template>

<style scoped>
.app {
  padding: 24px;
  font-family: system-ui, sans-serif;
}
</style>
