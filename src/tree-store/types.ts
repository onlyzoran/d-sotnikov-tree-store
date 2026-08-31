export type TreeItemId = number | string

export interface TreeItem {
    id: TreeItemId
    parent: TreeItemId | null
    label: string
    [key: string]: unknown
}
