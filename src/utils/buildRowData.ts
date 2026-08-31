import type { TreeItem } from '../tree-store'
import type { TreeStore } from '../tree-store'

export type TreeRow = TreeItem & {
    path: string[]
    category: 'Группа' | 'Элемент'
}

export function buildRowData(store: TreeStore): TreeRow[] {
    return store.getAll().map((item) => {
        const chain = store.getAllParents(item.id)
        const path = chain
            .slice()
            .reverse()
            .map((node) => String(node.id))

        const category = store.getChildren(item.id).length > 0 ? 'Группа' : 'Элемент'

        return { ...item, path, category }
    })
}
