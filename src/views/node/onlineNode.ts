import { ViewNode } from "./viewNode";
import { OnlineView } from "../onlineView";
import { TreeItem } from "vscode";

export const REMOTE_URL = 'https://cdn.jsdelivr.net/gh/sillyY/template-library'
export const TEMPLATE_PREFIX = "https://cdn.jsdelivr.net/gh/sillyY/template-library"


export class OnlineNode extends ViewNode<OnlineView> {
  private _children: OnlineNode[] | undefined

  private _remote: string;
  get remote() {
    return this._remote;
  }

  private _prefix: string;
  get prefix() {
    return this._prefix
  }

  constructor(view: OnlineView) {
    super(view);

    this._remote = REMOTE_URL;
    this._prefix = TEMPLATE_PREFIX
  }

  initConfiguration() {}
  async getChildren(): Promise<ViewNode[]> {
    if(this._children === void 0) {
      const libraries = this.view.library.libraries
      if(!libraries || libraries) await this.view.library.fetchLibrary()
      // this.view.library.libraries
    }
    return [this];
  }

  getTreeItem(): TreeItem {
    return {
      label: "123"
    };
  }
}
