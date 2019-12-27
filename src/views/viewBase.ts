import {
  Disposable,
  TreeDataProvider,
  TreeItem,
  EventEmitter,
  TreeView,
  window
} from "vscode";
import { ViewNode } from "./node";
import { OnlineView } from "./onlineView";
import {
  library,
  IOnlineLibrary,
  ILocalLibrary,
  IMineLibrary
} from "../library";

export type View = OnlineView;

export abstract class ViewBase
  implements TreeDataProvider<ViewNode<View>>, Disposable {
  protected _onDidChangeTreeData = new EventEmitter<ViewNode>();
  get onDidChangeTreeData(): Event<ViewNode> {
    return this._onDidChangeTreeData.event;
  }

  protected _disposable: Disposable | undefined;
  protected _tree: TreeView<ViewNode> | undefined;

  constructor() {
    this.registerCommands();
  }
  dispose() {}

  protected initialize(
    container?: string,
    options: { showCollapseAll?: boolean } = {}
  ) {
    if (this._disposable) {
      this._disposable.dispose();
      this._onDidChangeTreeData = new EventEmitter<ViewNode>();
    }
    this._tree = window.createTreeView(container ? container : "", {
      ...options,
      treeDataProvider: this
    });
    
  }
  protected abstract registerCommands(): void;
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

  async refreshConfig(
    node: ViewNode,
    data: IOnlineLibrary | ILocalLibrary | IMineLibrary
  ) {
    library.triggerChange(node._path, data);
  }
}
