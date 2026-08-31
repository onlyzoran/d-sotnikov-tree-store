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

    getAllChildren(id: TreeItemId): TreeItem[] {
        const result: TreeItem[] = []
        const queue = [...this.getChildren(id)]

        while (queue.length > 0) {
            const item = queue.shift()!
            result.push(item)
            queue.push(...this.getChildren(item.id))
        }

        return result
    }

    getAllParents(id: TreeItemId): TreeItem[] {
        const result: TreeItem[] = []
        let current = this.itemsById.get(id)

        while (current) {
            result.push(current)
            current = current.parent !== null ? this.itemsById.get(current.parent) : undefined
        }

        return result
    }

    setItems(items: TreeItem[]): void {
        this.items = [...items]
        this.rebuildIndexes()
    }

    addItem(item: TreeItem): void {
        this.items.push(item)
        this.itemsById.set(item.id, item)

        const parentId = item.parent
        const siblings = this.childrenByParentId.get(parentId)
        if (siblings) {
            siblings.push(item)
        } else {
            this.childrenByParentId.set(parentId, [item])
        }
    }

    removeItem(id: TreeItemId): void {
        const idsToRemove = new Set<TreeItemId>([id, ...this.getAllChildren(id).map((item) => item.id)])

        this.items = this.items.filter((item) => !idsToRemove.has(item.id))

        for (const removeId of idsToRemove) {
            this.itemsById.delete(removeId)
        }

        this.rebuildIndexes()
    }

    updateItem(item: TreeItem): void {
        const existing = this.itemsById.get(item.id)
        if (!existing) {
            return
        }

        const parentChanged = existing.parent !== item.parent
        Object.assign(existing, item)

        if (parentChanged) {
            this.rebuildIndexes()
        }
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
