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
  <div class="page">
    <header class="page__header">
      <h1 class="page__title">Tree Store</h1>
      <p class="page__subtitle">Иерархическое хранилище элементов</p>
    </header>

    <section class="page__content">
      <TreeGrid :row-data="rowData" :loading="loading" />
    </section>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 32px;
  background: #f5f7fa;
  box-sizing: border-box;
}

.page__header {
  margin-bottom: 24px;
}

.page__title {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 600;
  color: #1f2937;
}

.page__subtitle {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.page__content {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgb(15 23 42 / 6%);
}
</style>
