import { describe, expect, it } from 'vitest'
import { TreeStore } from '../../src/tree-store'
import type { TreeItem } from '../../src/tree-store'

const sampleItems: TreeItem[] = [
    { id: 1, parent: null, label: 'Айтем 1' },
    { id: '91064cef', parent: 1, label: 'Айтем 2' },
    { id: 3, parent: 1, label: 'Айтем 3' },
    { id: 4, parent: '91064cef', label: 'Айтем 4' },
    { id: 5, parent: '91064cef', label: 'Айтем 5' },
    { id: 6, parent: '91064cef', label: 'Айтем 6' },
    { id: 7, parent: 4, label: 'Айтем 7' },
    { id: 8, parent: 4, label: 'Айтем 8' },
]

describe('TreeStore', () => {
    it('starts empty by default', () => {
        const store = new TreeStore()
        expect(store.getAll()).toEqual([])
        expect(store.getChildren(1)).toEqual([])
    })

    it('returns all items', () => {
        const store = new TreeStore(sampleItems)
        expect(store.getAll()).toHaveLength(8)
    })

    it('returns item by id', () => {
        const store = new TreeStore(sampleItems)
        expect(store.getItem(1)?.label).toBe('Айтем 1')
        expect(store.getItem('91064cef')?.label).toBe('Айтем 2')
        expect(store.getItem(999)).toBeUndefined()
    })

    it('returns direct children', () => {
        const store = new TreeStore(sampleItems)
        expect(store.getChildren(1).map((item) => item.id)).toEqual(['91064cef', 3])
        expect(store.getChildren(4).map((item) => item.id)).toEqual([7, 8])
        expect(store.getChildren(8)).toEqual([])
    })

    it('returns all descendants', () => {
        const store = new TreeStore(sampleItems)
        const children = store.getAllChildren('91064cef').map((item) => item.id)
        expect(children).toEqual([4, 5, 6, 7, 8])
    })

    it('returns parent chain from item to root', () => {
        const store = new TreeStore(sampleItems)
        const parents = store.getAllParents(7).map((item) => item.id)
        expect(parents).toEqual([7, 4, '91064cef', 1])
    })

    it('replaces items with setItems', () => {
        const store = new TreeStore(sampleItems)
        store.setItems([{ id: 10, parent: null, label: 'New root' }])
        expect(store.getAll()).toHaveLength(1)
        expect(store.getItem(1)).toBeUndefined()
    })

    it('adds a new item', () => {
        const store = new TreeStore(sampleItems)
        store.addItem({ id: 9, parent: 8, label: 'Айтем 9' })
        expect(store.getItem(9)?.label).toBe('Айтем 9')
        expect(store.getChildren(8).map((item) => item.id)).toEqual([9])
    })
})
