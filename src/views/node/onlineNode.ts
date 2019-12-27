import { ViewNode } from "./viewNode";
import { OnlineView } from "../onlineView";
import { TreeItem } from "vscode";
import { REMOTE_URL } from "../../constant";

export class OnlineNode extends ViewNode<OnlineView> {
  readonly _path: string;
  protected get path() {
    return this._path;
  }

  private _remote: string;
  get remote() {
    return this._remote;
  }

  constructor(view: OnlineView) {
    super(view);

    this._remote = REMOTE_URL;
  }

  initConfiguration() {
      
  }
  async getChildren(): Promise<ViewNode[]> {
    return [];
  }

  getTreeItem(): TreeItem {
    return {};
  }
}
