import { describe, expect, it } from 'vitest'
import { TreeStore } from '../../src/tree-store'
import type { TreeItem } from '../../src/tree-store'

function buildLargeTree(size: number): TreeItem[] {
    const items: TreeItem[] = [{ id: 0, parent: null, label: 'Root' }]

    for (let index = 1; index < size; index += 1) {
        const parentId = Math.floor((index - 1) / 5)
        items.push({
            id: index,
            parent: parentId,
            label: `Item ${index}`,
        })
    }

    return items
}

function measure(operation: () => void): number {
    const startedAt = performance.now()
    operation()
    return performance.now() - startedAt
}

describe('TreeStore performance', () => {
    const items = buildLargeTree(10000)
    const store = new TreeStore(items)
    const middleItemId = 5000
    const deepItemId = 9999

    it('gets item by id quickly', () => {
        const duration = measure(() => {
            for (let index = 0; index < 1000; index += 1) {
                store.getItem(middleItemId)
            }
        })

        expect(duration).toBeLessThan(50)
    })

    it('gets direct children quickly', () => {
        const duration = measure(() => {
            for (let index = 0; index < 1000; index += 1) {
                store.getChildren(middleItemId)
            }
        })

        expect(duration).toBeLessThan(50)
    })

    it('gets all descendants quickly', () => {
        const duration = measure(() => store.getAllChildren(0))
        expect(duration).toBeLessThan(100)
    })

    it('gets parent chain quickly', () => {
        const duration = measure(() => {
            for (let index = 0; index < 1000; index += 1) {
                store.getAllParents(deepItemId)
            }
        })

        expect(duration).toBeLessThan(50)
    })

    it('removes subtree quickly', () => {
        const mutableStore = new TreeStore(items)
        const duration = measure(() => mutableStore.removeItem(1))
        expect(duration).toBeLessThan(100)
        expect(mutableStore.getAll().length).toBeLessThan(items.length)
    })
})
