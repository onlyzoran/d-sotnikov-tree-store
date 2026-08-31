<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import type { ColDef, GridOptions } from 'ag-grid-community'
import type { TreeRow } from '../utils/buildRowData'

defineProps<{
  rowData: TreeRow[]
}>()

const autoGroupColumnDef: ColDef = {
  headerName: 'Наименование',
  field: 'label',
  flex: 1,
  cellRendererParams: {
    suppressCount: true,
  },
}

const gridOptions: GridOptions<TreeRow> = {
  treeData: true,
  getDataPath: (data) => data.path,
  groupDefaultExpanded: -1,
  animateRows: true,
  autoGroupColumnDef,
}
</script>

<template>
  <ag-grid-vue
      class="ag-theme-alpine tree-grid"
      :row-data="rowData"
      :grid-options="gridOptions"
  />
</template>

<style scoped>
.tree-grid {
  width: 100%;
  height: 500px;
}
</style>
