<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import type { ColDef, GridOptions, ValueGetterParams } from 'ag-grid-community'
import type { TreeRow } from '../utils/buildRowData'

defineProps<{
  rowData: TreeRow[]
  loading: boolean
}>()

const columnDefs: ColDef<TreeRow>[] = [
  {
    headerName: '№ п/п',
    pinned: 'left',
    width: 90,
    valueGetter: (params: ValueGetterParams<TreeRow>) => (params.node?.rowIndex ?? 0) + 1,
  },
  {
    headerName: 'Категория',
    field: 'category',
    width: 120,
  },
]

const autoGroupColumnDef: ColDef<TreeRow> = {
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
  columnDefs,
  autoGroupColumnDef,
  overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Загрузка данных...</span>'
}
</script>

<template>
  <ag-grid-vue
      class="ag-theme-alpine tree-grid"
      :row-data="rowData"
      :loading="loading"
      :grid-options="gridOptions"
  />
</template>

<style scoped>
.tree-grid {
  width: 100%;
  height: 500px;
}
</style>
