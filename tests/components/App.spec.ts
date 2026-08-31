import { defineComponent, h } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import App from '../../src/App.vue'
import type { TreeRow } from '../../src/utils/buildRowData'

const mocks = vi.hoisted(() => ({
    loadItems: vi.fn(),
    loading: null as { value: boolean } | null,
    rowData: null as { value: TreeRow[] } | null,
}))

vi.mock('../../src/composables/useTreeData', async () => {
    const { ref } = await import('vue')

    mocks.loading = ref(true)
    mocks.rowData = ref([])

    return {
        useTreeData: () => ({
            loading: mocks.loading!,
            rowData: mocks.rowData!,
            loadItems: mocks.loadItems,
        }),
    }
})

vi.mock('../../src/components/TreeGrid.vue', () => ({
    default: defineComponent({
        name: 'TreeGrid',
        props: {
            rowData: {
                type: Array,
                default: () => [],
            },
            loading: {
                type: Boolean,
                default: false,
            },
        },
        setup(props) {
            return () =>
                h('div', {
                    'data-testid': 'tree-grid',
                    'data-loading': String(props.loading),
                    'data-rows': String(props.rowData.length),
                })
        },
    }),
}))

describe('App', () => {
    beforeEach(() => {
        mocks.loadItems.mockClear()
        mocks.loading!.value = false
        mocks.rowData!.value = []
    })

    it('renders page title and subtitle', () => {
        const wrapper = mount(App)

        expect(wrapper.find('.page__title').text()).toBe('Tree Store')
        expect(wrapper.find('.page__subtitle').text()).toBe('Иерархическое хранилище элементов')
    })

    it('loads items on mount', async () => {
        mount(App)
        await flushPromises()

        expect(mocks.loadItems).toHaveBeenCalledTimes(1)
    })

    it('passes loading state and row data to TreeGrid', () => {
        mocks.loading!.value = true
        mocks.rowData!.value = [
            {
                id: 1,
                parent: null,
                label: 'Айтем 1',
                path: ['1'],
                category: 'Группа',
            },
        ]

        const wrapper = mount(App)
        const grid = wrapper.find('[data-testid="tree-grid"]')

        expect(grid.attributes('data-loading')).toBe('true')
        expect(grid.attributes('data-rows')).toBe('1')
    })
})
