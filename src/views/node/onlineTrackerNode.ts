import { OnlineView } from "../onlineView";
import { SubscribeableViewNode, ViewNode } from "./viewNode";
import { TreeItem, Disposable } from "vscode";
import { OnlineNode } from "./onlineNode";

export class OnlineTrackerNode extends SubscribeableViewNode<OnlineView> {
    private _child: OnlineNode | undefined
    constructor(view: OnlineView) {
        super(view)
    }
    dispose() {
        super.dispose()
        this.resetChild()
    }

    private resetChild() {
        if(this._child === void 0) return

        this._child.dispose()
        this._child = undefined
    }

    getChildren(): ViewNode[] {
        return []
    }

    getTreeItem(): TreeItem {
        return {}
    }

    subscribe() {
        return Disposable.from(
             
        )
    }
}