import { Disposable, TreeDataProvider, TreeItem } from "vscode";
import { ViewNode } from "./node";
import { OnlineView } from "./onlineView";

export type View = OnlineView;

export abstract class ViewBase
  implements TreeDataProvider<ViewNode<View>>, Disposable {

  constructor() {
    this.initialize()
  }
  dispose() {}

  abstract initialize(): Promise<void>

  getChildren(
    node?: ViewNode<View>
  ): ViewNode<View>[] | Promise<ViewNode<View>[]> {
    if (node !== void 0) return node.getChildren();
    return [];
  }

  getParent(node: ViewNode<View>): ViewNode<View> | undefined {
    return node.getParent();
  }

  getTreeItem(node: ViewNode<View>): TreeItem | Promise<TreeItem> {
    return node.getTreeItem();
  }

  async refreshNode(node: ViewNode, reset: boolean = false) {}

  async refreshConfig(node: ViewNode, reset: boolean = false) {}
}
