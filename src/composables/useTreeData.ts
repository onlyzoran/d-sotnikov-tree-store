import { computed, ref, shallowRef } from 'vue'
import { TreeStore } from '../tree-store'
import type { TreeItem } from '../tree-store'
import { buildRowData } from '../utils/buildRowData'

const LOAD_DELAY_MS = 2000
const ITEMS_URL = '/data/items.json'

function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useTreeData() {
    const store = shallowRef(new TreeStore())
    const loading = ref(false)
    const version = ref(0)

    const items = computed(() => {
        version.value
        return store.value.getAll()
    })

    const rowData = computed(() => {
        version.value
        return buildRowData(store.value)
    })

    async function loadItems(): Promise<void> {
        loading.value = true

        await delay(LOAD_DELAY_MS)

        const response = await fetch(ITEMS_URL)
        const data = (await response.json()) as TreeItem[]
        store.value.setItems(data)
        version.value += 1
        loading.value = false
    }

    return {
        store,
        loading,
        items,
        rowData,
        loadItems
    }
}
