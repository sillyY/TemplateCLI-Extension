import { TreeItem } from "vscode";
import * as fspath from "path";
import { TemplateView } from "./view";
import { fs, win } from "../services";

export enum ResourceType {
  Folder = "template:Folder",
  File = "template:File"
}

export abstract class ViewNode {
  constructor(
    public readonly view: TemplateView,
    path: string,
    protected readonly parent?: ViewNode
  ) {
    this._path = path;
    this._basename = fspath.basename(path);
    this._extname = fspath.extname(path).replace(".", "");
    this._dirname = fspath.dirname(path);
  }

  protected _path: string;
  get path() {
    return this._path;
  }

  protected _basename: string;
  get basename() {
    return this._basename;
  }

  protected _extname: string;
  get extname() {
    return this._extname;
  }

  protected _dirname: string;
  get dirname() {
    return this._dirname;
  }

  abstract getChildren(): ViewNode[] | Promise<ViewNode[]>;

  getParent(): ViewNode | undefined {
    return this.parent;
  }

  abstract getTreeItem(): TreeItem | Promise<TreeItem>;

  async triggerDelete() {
    await fs.deleteFile(this.path);
    this.view.triggerNodeChange();
    this.onSuccessHandler("文件或文件夹已删除!")
  }

  onSuccessHandler(message: string) {
    win.showInformationMessage(message);
    win.setStatusBarMessage(message);
  }
}
