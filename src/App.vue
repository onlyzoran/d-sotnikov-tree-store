<script setup lang="ts">
import { onMounted } from 'vue'
import TreeGrid from './components/TreeGrid.vue'
import { useTreeData } from './composables/useTreeData'

const { loading, rowData, loadItems } = useTreeData()

onMounted(() => {
  void loadItems()
})
</script>

<template>
  <main class="app">
    <h1>Tree Store</h1>
    <TreeGrid :row-data="rowData" :loading="loading" />
  </main>
</template>

<style scoped>
.app {
  padding: 24px;
  font-family: system-ui, sans-serif;
}
</style>
