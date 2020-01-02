import { TreeItem } from "vscode";
import { View } from "../viewBase";
import { IOnlineLibrary, ILocalLibrary, IMineLibrary } from "../../library";

export abstract class ViewNode<TView extends View = View> {
  constructor(
    public readonly view: TView,
    protected readonly parent?: ViewNode
  ) {}

  abstract initConfiguration(): void;
  
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
