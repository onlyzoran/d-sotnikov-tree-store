<script setup lang="ts">
import { AgGridVue } from 'ag-grid-vue3'
import type { CellClassParams, CellStyle, ColDef, GridOptions, ValueGetterParams } from 'ag-grid-community'
import type { TreeRow } from '../utils/buildRowData'

defineProps<{
  rowData: TreeRow[]
  loading: boolean
}>()

function isGroup(row: TreeRow | undefined): boolean {
  return row?.category === 'Группа'
}

function groupRowClass(params: CellClassParams<TreeRow>): string {
  return isGroup(params.data) ? 'tree-grid__group' : ''
}

function categoryCellStyle(params: CellClassParams<TreeRow>): CellStyle {
  const level = Math.max(0, (params.data?.path.length ?? 1) - 1)
  return { '--tree-level': String(level) }
}

const defaultColDef: ColDef<TreeRow> = {
  sortable: false,
  filter: false,
  resizable: false,
}

const columnDefs: ColDef<TreeRow>[] = [
  {
    colId: 'rowNumber',
    headerName: '№ п\\п',
    pinned: 'left',
    width: 88,
    maxWidth: 88,
    cellClass: 'tree-grid__row-number',
    valueGetter: (params: ValueGetterParams<TreeRow>) => (params.node?.rowIndex ?? 0) + 1,
  },
  {
    colId: 'label',
    headerName: 'Наименование',
    field: 'label',
    flex: 1,
    minWidth: 240,
    cellClass: groupRowClass,
  },
]

const autoGroupColumnDef: ColDef<TreeRow> = {
  headerName: 'Категория',
  field: 'category',
  width: 240,
  minWidth: 200,
  cellClass: groupRowClass,
  cellStyle: categoryCellStyle,
  cellRendererParams: {
    suppressCount: true,
  },
}

const gridOptions: GridOptions<TreeRow> = {
  theme: 'legacy',
  treeData: true,
  getDataPath: (data) => data.path,
  groupDefaultExpanded: -1,
  animateRows: true,
  headerHeight: 40,
  rowHeight: 36,
  defaultColDef,
  columnDefs,
  autoGroupColumnDef,
  overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Загрузка данных...</span>',
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
  --ag-cell-horizontal-border: none;
  --ag-odd-row-background-color: #fff;
  --ag-header-column-resize-handle-display: none;
  --ag-cell-widget-spacing: 10px;
  --tree-text-indent: 18px;
  --tree-gutter: calc(var(--ag-icon-size) + var(--ag-cell-widget-spacing));
}

:deep(.ag-header-cell-label),
:deep(.tree-grid__row-number),
:deep(.tree-grid__group),
:deep(.tree-grid__group .ag-group-value) {
  font-weight: 600;
}

:deep(.ag-header-cell-resize) {
  display: none;
}

:deep(.ag-cell[col-id='ag-Grid-AutoColumn']) {
  padding-left: calc(var(--ag-cell-horizontal-padding) - 1px);
}

:deep(.ag-cell[col-id='ag-Grid-AutoColumn'] .ag-cell-wrapper) {
  position: relative;
  padding-left: var(--tree-gutter) !important;
}

:deep(.ag-group-expanded),
:deep(.ag-group-contracted) {
  position: absolute;
  inset: 0 auto 0 0;
  display: flex;
  align-items: center;
  margin: 0;
}

:deep(.ag-ltr .ag-row-group-leaf-indent) {
  margin-left: 0;
}

:deep(.ag-cell[col-id='ag-Grid-AutoColumn'] .ag-group-value) {
  padding-left: calc(var(--tree-level, 0) * var(--tree-text-indent));
}

:deep(.ag-cell.ag-cell-last-left-pinned:not(.ag-cell-range-right):not(.ag-cell-range-single-cell)),
:deep(.ag-row:not(.ag-header-row) > .ag-grid-pinned-left-cells .ag-grid-container-wrapper) {
  border-right: none !important;
}

:deep(.ag-header-row .ag-grid-pinned-left-cells .ag-grid-container-wrapper),
:deep(.ag-header-cell[col-id='ag-Grid-AutoColumn']) {
  border-right: 1px solid var(--ag-border-color);
}
</style>
