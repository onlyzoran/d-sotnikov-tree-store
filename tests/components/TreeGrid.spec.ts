import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import TreeGrid from '../../src/components/TreeGrid.vue'
import type { TreeRow } from '../../src/utils/buildRowData'

const gridProps = vi.hoisted(() => ({
    current: null as {
        rowData?: TreeRow[]
        loading?: boolean
        gridOptions?: Record<string, unknown>
    } | null,
}))

vi.mock('ag-grid-vue3', () => ({
    AgGridVue: defineComponent({
        name: 'AgGridVue',
        props: {
            rowData: {
                type: Array,
                default: () => [],
            },
            loading: {
                type: Boolean,
                default: false,
            },
            gridOptions: {
                type: Object,
                default: () => ({}),
            },
        },
        setup(props) {
            gridProps.current = props
            return () =>
                h('div', {
                    'data-testid': 'ag-grid',
                    'data-loading': String(props.loading),
                    'data-rows': String(props.rowData.length),
                })
        },
    }),
}))

const sampleRows: TreeRow[] = [
    {
        id: 1,
        parent: null,
        label: 'Айтем 1',
        path: ['1'],
        category: 'Группа',
    },
    {
        id: 3,
        parent: 1,
        label: 'Айтем 3',
        path: ['1', '3'],
        category: 'Элемент',
    },
]

describe('TreeGrid', () => {
    it('renders ag-grid component', () => {
        const wrapper = mount(TreeGrid, {
            props: {
                rowData: sampleRows,
                loading: false,
            },
        })

        expect(wrapper.find('[data-testid="ag-grid"]').exists()).toBe(true)
    })

    it('passes row data and loading state to ag-grid', () => {
        mount(TreeGrid, {
            props: {
                rowData: sampleRows,
                loading: true,
            },
        })

        expect(gridProps.current?.rowData).toEqual(sampleRows)
        expect(gridProps.current?.loading).toBe(true)
    })

    it('configures tree data grid options', () => {
        mount(TreeGrid, {
            props: {
                rowData: sampleRows,
                loading: false,
            },
        })

        const options = gridProps.current?.gridOptions as {
            theme?: string
            treeData?: boolean
            groupDefaultExpanded?: number
            columnDefs?: Array<{ headerName?: string; pinned?: string }>
            autoGroupColumnDef?: { headerName?: string; field?: string }
            overlayLoadingTemplate?: string
            getDataPath?: (data: TreeRow) => string[]
        }

        expect(options?.theme).toBe('legacy')
        expect(options?.treeData).toBe(true)
        expect(options?.groupDefaultExpanded).toBe(-1)
        expect(options?.getDataPath?.(sampleRows[1])).toEqual(['1', '3'])
        expect(options?.columnDefs?.map((column) => column.headerName)).toEqual(['№ п/п', 'Наименование'])
        expect(options?.autoGroupColumnDef?.headerName).toBe('Категория')
        expect(options?.autoGroupColumnDef?.field).toBe('category')
        expect(options?.overlayLoadingTemplate).toContain('Загрузка данных')
    })
})
