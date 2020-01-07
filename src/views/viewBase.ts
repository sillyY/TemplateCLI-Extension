import {
  Disposable,
  TreeDataProvider,
  TreeItem,
  EventEmitter,
  TreeView,
  window,
  Event,
  TreeViewVisibilityChangeEvent,
  TreeItemCollapsibleState,
  TreeViewExpansionEvent
} from "vscode";
import { ViewNode } from "./node";
import { OnlineView } from "./onlineView";
import Library, {
  IOnlineLibrary,
  ILocalLibrary,
  IMineLibrary
} from "../library";

export type View = OnlineView;

export interface TreeViewNodeStateChangeEvent<T>
  extends TreeViewExpansionEvent<T> {
  state: TreeItemCollapsibleState;
}

export abstract class ViewBase<TRoot extends ViewNode<View>>
  implements TreeDataProvider<ViewNode<View>>, Disposable {
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

  get visible(): boolean {
		return this._tree !== undefined ? this._tree.visible : false;
	}

  protected _disposable: Disposable | undefined;
  protected _root: TRoot | undefined;
  protected _tree: TreeView<ViewNode> | undefined;

  constructor(public readonly id: string) {
    this.registerCommands();

    this.onConfigurationChange();
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
    this._tree = window.createTreeView(
      `${this.id}${container ? `:${container}` : ""}`,
      {
        ...options,
        treeDataProvider: this
      }
    );
  }
  protected abstract registerCommands(): void;
  protected abstract onConfigurationChange(): void;

  protected abstract initLibrary(): void;
  protected _library: Library<any>;
  get library() {
    return this._library;
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

  async refresh(reset: boolean = false) {
    if (this._root !== undefined && this._root.refresh !== undefined) {
			await this._root.refresh(reset);
		}

		this.triggerNodeChange();
  }

  async refreshNode(node: ViewNode, reset: boolean = false) {
    if (node.refresh !== undefined) {
			const cancel = await node.refresh(reset);
			if (cancel === true) return;
		}

		this.triggerNodeChange(node);
  }

  async refreshConfig(
    node: ViewNode,
    data: (IOnlineLibrary | ILocalLibrary | IMineLibrary)[]
  ) {
    console.log(node);
    this._library.triggerChange(data);
  }

  triggerNodeChange(node?: ViewNode) {
		// Since the root node won't actually refresh, force everything
		this._onDidChangeTreeData.fire(node !== undefined && node !== this._root ? node : undefined);
	}
}
