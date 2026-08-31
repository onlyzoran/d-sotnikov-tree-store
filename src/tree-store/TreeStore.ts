import type { TreeItem, TreeItemId } from './types.ts'

export class TreeStore {
    private items: TreeItem[] = []
    private itemsById = new Map<TreeItemId, TreeItem>()
    private childrenByParentId = new Map<TreeItemId | null, TreeItem[]>()

    constructor(items: TreeItem[] = []) {
        this.setItems(items)
    }

    getAll(): TreeItem[] {
        return this.items
    }

    getItem(id: TreeItemId): TreeItem | undefined {
        return this.itemsById.get(id)
    }

    getChildren(id: TreeItemId): TreeItem[] {
        return this.childrenByParentId.get(id) ?? []
    }

    setItems(items: TreeItem[]): void {
        this.items = [...items]
        this.rebuildIndexes()
    }

    private rebuildIndexes(): void {
        this.itemsById.clear()
        this.childrenByParentId.clear()

        for (const item of this.items) {
            this.itemsById.set(item.id, item)

            const parentId = item.parent
            const siblings = this.childrenByParentId.get(parentId)
            if (siblings) {
                siblings.push(item)
            } else {
                this.childrenByParentId.set(parentId, [item])
            }
        }
    }
}
