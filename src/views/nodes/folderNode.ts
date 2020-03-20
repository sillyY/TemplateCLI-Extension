import * as path from "path";
import { ViewNode, ResourceType } from "../viewNode";
import { Container } from "../../container";
import { FileNode } from "./index";
import { TreeItem, TreeItemCollapsibleState, ThemeIcon } from "vscode";
import { TemplateView } from "../view";
import { win, fs } from "../../services";

export class FolderNode extends ViewNode {
  constructor(view: TemplateView, path: string, parent?: ViewNode) {
    super(view, path, parent);
  }

  async getChildren(): Promise<ViewNode[]> {
    const children: ViewNode[] = [];

    const data = await fs.getFileOrFolder(this.path);

    data.forEach(item => {
      switch (item[1]) {
        case 1:
          children.push(
            new FileNode(this.view, this.path + "/" + item[0], this, item)
          );
          break;
        case 2:
          children.push(
            new FolderNode(this.view, this.path + "/" + item[0], this)
          );
        default:
          break;
      }
    });
    return children;
  }

  getTreeItem(): TreeItem {
    const item = new TreeItem(this.basename, TreeItemCollapsibleState.Expanded);
    item.contextValue = ResourceType.Folder;

    item.iconPath = this.getImg(this.extname);
    return item;
  }

  private getImg(extname) {
    switch (extname) {
      case "src":
        return Container.context.asAbsolutePath(
          path.join("resources/icons", "javascript.svg")
        );

      default:
        return ThemeIcon.Folder;
    }
  }
  async triggerRename() {
    const name = await win.showInputBox("请输入新文件夹名.");
    if(!name) return
    await fs.renameFile(this.path, `${this.dirname}/${name}`);
    this.view.triggerNodeChange();
    this.onSuccessHandler("👏文件夹重命名成功")
  }
}
