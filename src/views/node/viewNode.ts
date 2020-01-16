import { TreeItem, Disposable } from "vscode";
import { View } from "../viewBase";
import { IOnlineLibrary, ILocalLibrary, IMineLibrary } from "../../library";
import { file } from "../../utils";
import { Container } from "../../container";

export enum ResourceType {
  Templates = "template:templates"
}

export interface ViewNode {
  readonly id?: string;
}

export abstract class ViewNode<TView extends View = View> {
  constructor(
    public readonly view: TView,
    protected readonly parent?: ViewNode
  ) {}

  initConfiguration(): void {}

  abstract getChildren(): ViewNode[] | Promise<ViewNode[]>;

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
  /**
   * @description: 判断本地模板库模板是否存在
   * @param {string} fullpath 路径
   * @return: true/false
   */
  protected isLocalFileExist(fullpath: string): boolean {
    return file.exist(fullpath);
  }
  /**
   * @description: 获取本地模板库模板数据
   * @param {string} fullpath 路径
   * @return: 本地文件数据
   */
  protected getLocalFile(fullpath: string): string | null {
    return file.data(fullpath);
  }
  /**
   * @description: 插入
   */
  protected insertTemplateToEditor(data: string) {
    Container.editor.insert(data);
  }

  protected triggerFileChanged(refresh: boolean = true) {
    this.view.library.fireExistFileChanged()
    refresh && this.view.refresh(true)
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
