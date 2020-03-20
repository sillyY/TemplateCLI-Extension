import * as path from "path";
import { ViewNode, ResourceType } from "../viewNode";
import { TreeItem, TreeItemCollapsibleState, FileType } from "vscode";
import { Container } from "../../container";
import { TemplateView } from "../view";
import { win, fs } from "../../services";

export class FileNode extends ViewNode {
  constructor(
    view: TemplateView,
    path: string,
    parent: ViewNode,
    public readonly file: [string, FileType]
  ) {
    super(view, path, parent);
  }

  getChildren() {
    return [];
  }

  async getTreeItem(): Promise<TreeItem> {
    const label = this.file[0] || "";

    const item = new TreeItem(label, TreeItemCollapsibleState.None);
    item.contextValue = ResourceType.File;
    item.iconPath = {
      dark: this.getImg(this.extname),
      light: this.getImg(this.extname)
    };
    item.command = {
      title: "Insert Template",
      command: "template.view.insert",
      arguments: [this]
    };

    return item;
  }

  private getImg(extname: string) {
    switch (extname) {
      case "js":
        return Container.context.asAbsolutePath(
          path.join("resources/icons", "javascript.svg")
        );
      case "css":
        return Container.context.asAbsolutePath(
          path.join("resources/icons", "css.svg")
        );
      case "ts":
        return Container.context.asAbsolutePath(
          path.join("resources/icons", "typescript.svg")
        );
      default:
        return "";
    }
  }

  triggerInsert() {
    const data = fs.getFileText(this.path);
    data && fs.edit(data);

    this.onSuccessHandler("👏文件插入成功")
  }

  triggerEdit() {
    fs.openText(this.path);
  }

  async triggerRename() {
    const name = await win.showInputBox("请输入新文件名.");
    if(!name) return
    await fs.renameFile(this.path, `${this.dirname}/${name}.${this.extname}`);
    this.view.triggerNodeChange();

    this.onSuccessHandler("👏文件重命名成功")
  }
}
