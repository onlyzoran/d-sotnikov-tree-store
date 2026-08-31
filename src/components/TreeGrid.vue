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
    width: 100,
    maxWidth: 100,
    sortable: false,
    filter: false,
    valueGetter: (params: ValueGetterParams<TreeRow>) => (params.node?.rowIndex ?? 0) + 1,
  },
  {
    headerName: 'Категория',
    field: 'category',
    width: 140,
    maxWidth: 160,
    sortable: false,
    filter: false
  },
]

const autoGroupColumnDef: ColDef<TreeRow> = {
  headerName: 'Наименование',
  field: 'label',
  flex: 1,
  minWidth: 240,
  sortable: false,
  filter: false,
  cellRendererParams: {
    suppressCount: true,
  }
}

const gridOptions: GridOptions<TreeRow> = {
  treeData: true,
  getDataPath: (data) => data.path,
  groupDefaultExpanded: -1,
  animateRows: true,
  headerHeight: 40,
  rowHeight: 36,
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
  height: 560px;
}

:deep(.ag-header-cell-label) {
  font-weight: 600;
}
</style>
