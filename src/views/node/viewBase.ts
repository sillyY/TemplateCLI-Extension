import { ViewNode } from "./viewNode";
import { OnlineView } from "../onlineView";
import {
  TreeItemCollapsibleState,
  TreeViewExpansionEvent,
  TreeDataProvider,
  Disposable,
  TreeItem,
  EventEmitter,
  Event,
  TreeViewVisibilityChangeEvent
} from "vscode";

export type View = OnlineView;

export interface TreeViewNodeStateChangeEvent<T>
  extends TreeViewExpansionEvent<T> {
  state: TreeItemCollapsibleState;
}

export abstract class ViewBase<TRoot extends ViewNode<View>>
  implements TreeDataProvider<ViewNode>, Disposable {
  protected _onDidChangeTreeData = new EventEmitter<ViewNode>();
  get onDidChangeTreeData(): Event<ViewNode> {
    return this._onDidChangeTreeData.event;
  }

  private _onDidChangeVisibility = new EventEmitter<
    TreeViewVisibilityChangeEvent
  >();
  get onDidChangeVisibility(): Event<TreeViewVisibilityChangeEvent> {
    return this._onDidChangeVisibility.event;
  }

  private _onDidChangeNodeState = new EventEmitter<
    TreeViewNodeStateChangeEvent<ViewNode>
  >();
  get onDidChangeNodeState(): Event<TreeViewNodeStateChangeEvent<ViewNode>> {
    return this._onDidChangeNodeState.event;
  }

  protected _root: TRoot | undefined;

  protected abstract getRoot(): TRoot;

  constructor() {}

  protected _disposable: Disposable | undefined;

  dispose() {
    this._disposable && this._disposable.dispose();
  }
  protected ensureRoot() {
    if (this._root === undefined) {
      this._root = this.getRoot();
    }

    return this._root;
  }
  getChildren(node?: ViewNode): ViewNode[] | Promise<ViewNode[]> {
    if (node !== undefined) return node.getChildren();

    const root = this.ensureRoot();
    return root.getChildren();
  }

  getTreeItem(node: ViewNode): TreeItem | Promise<TreeItem> {
    return node.getTreeItem();
  }

  async refreshNode(node: ViewNode, reset: boolean = false) {
    if (node.refresh !== void 0) {
      const cancel = await node.refresh(reset);
      if (cancel === true) return;
    }

    this.triggerNodeChange(node);
  }

  triggerNodeChange(node?: ViewNode) {
    // Since the root node won't actually refresh, force everything
    this._onDidChangeTreeData.fire(
      node !== undefined && node !== this._root ? node : undefined
    );
  }
}
