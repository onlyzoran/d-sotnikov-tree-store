import type { TreeItem, TreeItemId } from './types'

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
        const result = [...this.getChildren(id)]

        for (const item of result) {
            result.push(...this.getChildren(item.id))
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
        this.indexItem(item)
    }

    removeItem(id: TreeItemId): void {
        const target = this.itemsById.get(id)
        if (!target) {
            return
        }

        const idsToRemove = new Set<TreeItemId>([id])
        for (const descendant of this.getAllChildren(id)) {
            idsToRemove.add(descendant.id)
        }

        this.items = this.items.filter((item) => !idsToRemove.has(item.id))
        this.removeChildFromParent(target.parent, target.id)

        for (const removeId of idsToRemove) {
            this.itemsById.delete(removeId)
            this.childrenByParentId.delete(removeId)
        }
    }

    updateItem(item: TreeItem): void {
        const existing = this.itemsById.get(item.id)
        if (!existing) {
            return
        }

        const previousParent = existing.parent
        Object.assign(existing, item)

        if (previousParent !== existing.parent) {
            this.removeChildFromParent(previousParent, existing.id)
            this.addToParentChildren(existing)
        }
    }

    private rebuildIndexes(): void {
        this.itemsById.clear()
        this.childrenByParentId.clear()

        for (const item of this.items) {
            this.indexItem(item)
        }
    }

    private indexItem(item: TreeItem): void {
        this.itemsById.set(item.id, item)
        this.addToParentChildren(item)
    }

    private addToParentChildren(item: TreeItem): void {
        const siblings = this.childrenByParentId.get(item.parent)
        if (siblings) {
            siblings.push(item)
        } else {
            this.childrenByParentId.set(item.parent, [item])
        }
    }

    private removeChildFromParent(parentId: TreeItemId | null, id: TreeItemId): void {
        const siblings = this.childrenByParentId.get(parentId)
        if (!siblings) {
            return
        }

        const index = siblings.findIndex((sibling) => sibling.id === id)
        if (index >= 0) {
            siblings.splice(index, 1)
        }
    }
}
