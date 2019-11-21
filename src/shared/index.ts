export interface ITreeNode {
    locked: boolean
    id: string
    name: string
}

export const defaultTreeNode:  ITreeNode = {
    locked: false,
    id: "",
    name: ""
}
export enum Category {
    All = "All",
    Css = 'Css',
}