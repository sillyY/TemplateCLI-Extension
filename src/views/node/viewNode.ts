import { View, TreeViewNodeStateChangeEvent } from "./viewBase";
import {
  Disposable,
  TreeViewVisibilityChangeEvent,
  TreeItemCollapsibleState,
  TreeItem
} from "vscode";

export interface ViewNode {
  readonly id?: string;
}
export abstract class ViewNode<TView extends View = View> {
  constructor(public readonly view: TView) {}

  abstract getChildren(): ViewNode[] | Promise<ViewNode[]>;

  abstract getTreeItem(): TreeItem | Promise<TreeItem>;

  refresh?(reset?: boolean): void | boolean | Promise<void> | Promise<boolean>;

  triggerChange(reset: boolean = false): Promise<void> {
    return this.view.refreshNode(this, reset);
  }
}

export abstract class SubscribeableViewNode<
  TView extends View = View
> extends ViewNode<TView> {
  protected _disposable: Disposable;
  protected _subscription: Promise<Disposable | undefined> | undefined;

  constructor(view: TView) {
    super(view);
    const disposables = [
      this.view.onDidChangeVisibility(this.onVisibilityChanged, this),
      this.view.onDidChangeNodeState(this.onNodeStateChanged, this)
    ];

    this._disposable = Disposable.from(...disposables);
  }

  dispose() {
    void this.unsubscribe();

    if (this._disposable !== undefined) {
      this._disposable.dispose();
    }
  }
  protected abstract subscribe(): Disposable | undefined | Promise<Disposable | undefined>;
  
  protected async unsubscribe(): Promise<void> {
    if (this._subscription !== void 0) {
      const subscriptionPromise = this._subscription;
      this._subscription = undefined;

      const subscription = await subscriptionPromise;
      if (subscription !== undefined) {
        subscription.dispose();
      }
    }
  }

  protected onVisibilityChanged(e: TreeViewVisibilityChangeEvent) {
    if (e.visible) {
      void this.triggerChange();
    }
  }

  protected onStateChanged?(state: TreeItemCollapsibleState): void;

  protected _state: TreeItemCollapsibleState | undefined;
  protected onNodeStateChanged(e: TreeViewNodeStateChangeEvent<ViewNode>) {
    if (e.element === this) {
      this._state = e.state;
      if (this.onStateChanged !== void 0) {
        this.onStateChanged(e.state);
      }
    }
  }
}
