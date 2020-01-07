import { TreeItem, Disposable } from "vscode";
import { View } from "../viewBase";
import { IOnlineLibrary, ILocalLibrary, IMineLibrary } from "../../library";

export enum ResourceType {
  Templates = "template:templates"
}

export interface ViewNode {
  readonly id?: string;
}

export abstract class ViewNode<TView extends View = View>{
  constructor(
    public readonly view: TView,
    protected readonly parent?: ViewNode
  ) {
  }

  initConfiguration(): void {}

  abstract getChildren(): ViewNode<TView>[] | Promise<ViewNode<TView>[]>;

  getParent(): ViewNode | undefined {
    return this.parent;
  }

  abstract getTreeItem(): TreeItem | Promise<TreeItem>;

  refresh?(reset?: boolean): void | boolean | Promise<void> | Promise<boolean>;

  triggerChange(reset: boolean = false): Promise<void> {
    return this.view.refreshNode(this, reset);
  }

  triggerConfigChange(
    data: (IOnlineLibrary | ILocalLibrary | IMineLibrary)[]
  ): Promise<void> {
    return this.view.refreshConfig(this, data);
  }
}

export abstract class SubscribeableViewNode<
  TView extends View = View
> extends ViewNode<TView> {
  protected _disposable: Disposable;
  protected _subsciption: Promise<Disposable | undefined> | undefined;

  protected abstract subscribe():
    | Disposable
    | undefined
    | Promise<Disposable | undefined>;

  private _canSubscribe: boolean = true;
  protected get canSubscribe(): boolean {
    return this._canSubscribe;
  }
  protected set canSubscribe(value: boolean) {
    if (this._canSubscribe === value) return;

    this._canSubscribe = value;

    void this.ensureSubscription();
    if (value) {
      void this.triggerChange();
    }
  }

  constructor(view: TView, parent?: ViewNode) {
    super(view, parent); 

    const disposables = [
      this.view.onDidChangeVisibility(this.onVisibilityChanged, this),
      this.view.onDidChangeNodeState(this.onNodeStateChanged, this)
    ];

    this._disposable = Disposable.from(...disposables);
  }

  dispose() {
    void this.unsubscribe();

    this._disposable && this._disposable.dispose();
  }

  onVisibilityChanged() {
    void this.ensureSubscription();
  }

  onNodeStateChanged() {}

  async ensureSubscription() {
    if (!this.canSubscribe || !this.view.visible) {
      await this.unsubscribe();
      return;
    }

    if (this._subsciption !== void 0) return;

    this._subsciption = Promise.resolve(this.subscribe());
    await this._subsciption;
  }

  unsubscribe() {}
}
