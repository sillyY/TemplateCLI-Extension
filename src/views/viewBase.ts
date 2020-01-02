import {
  Disposable,
  TreeDataProvider,
  TreeItem,
  EventEmitter,
  TreeView,
  window,
  Event
} from "vscode";
import { ViewNode } from "./node";
import { OnlineView } from "./onlineView";
import Library, {
  IOnlineLibrary,
  ILocalLibrary,
  IMineLibrary
} from "../library";

export type View = OnlineView;

export abstract class ViewBase<TRoot extends ViewNode<View>>
  implements TreeDataProvider<ViewNode<View>>, Disposable {
  protected _onDidChangeTreeData = new EventEmitter<ViewNode>();
  get onDidChangeTreeData(): Event<ViewNode> {
    return this._onDidChangeTreeData.event;
  }

  protected _disposable: Disposable | undefined;
  protected _root: TRoot | undefined;
  protected _tree: TreeView<ViewNode> | undefined;

  constructor(public readonly id: string) {
    this.registerCommands();

    this.onConfigurationChange()
  }
  dispose() {}

  protected abstract getRoot(): TRoot;
  
  protected initialize(
    container?: string,
    options: { showCollapseAll?: boolean } = {}
  ) {
    if (this._disposable) {
      this._disposable.dispose();
      this._onDidChangeTreeData = new EventEmitter<ViewNode>();
    }
    this._tree = window.createTreeView(`${this.id}${container ? `:${container}` : ''}`, {
      ...options,
      treeDataProvider: this
    });
    
  }
  protected abstract registerCommands(): void;
  protected abstract onConfigurationChange(): void

  protected abstract initLibrary(): void
  protected  _library: Library
  get library() {
    return this._library
  }

  protected ensureRoot() {
		if (this._root === undefined) {
			this._root = this.getRoot();
		}

		return this._root;
	}
  getChildren(
    node?: ViewNode<View>
  ): ViewNode<View>[] | Promise<ViewNode<View>[]> {
    if (node !== void 0) return node.getChildren();

    const root = this.ensureRoot();
    return root.getChildren();
  }

  getParent(node: ViewNode<View>): ViewNode<View> | undefined {
    return node.getParent();
  }

  getTreeItem(node: ViewNode<View>): TreeItem | Promise<TreeItem> {
    return node.getTreeItem();
  }

  async refreshNode(node: ViewNode, reset: boolean = false) {
    console.log(node, reset)
  }

  async refreshConfig(
    node: ViewNode,
    data: (IOnlineLibrary | ILocalLibrary | IMineLibrary)[]
  ) {
    this._library.triggerChange(data);
  }
}
