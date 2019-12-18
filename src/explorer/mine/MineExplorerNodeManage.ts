import { Disposable } from "vscode";
import { MineTemplateNode } from "./MineTemplateNode";
import * as list from '../../commands/list'
import { IMineTreeNode } from "../../shared";

class MineExplorerNodeManager implements Disposable {
  private explorerNodeSet: Set<MineTemplateNode> = new Set<MineTemplateNode>();
  public dispose(): void {
    this.explorerNodeSet.clear();
  }
  public async refreshCache(): Promise<void> {
    this.dispose();
    this.setSets(await list.listMineTreeNodes());
  }

  public setSets(treeNodes: IMineTreeNode[]): void {
    for (const treeItem of treeNodes) {
      const [name, extname] = treeItem.name.split(".");
      treeItem.name = name;
      treeItem.extname = extname;
      this.explorerNodeSet.add(new MineTemplateNode(treeItem));
    }
  }
  public getAllNodes(): MineTemplateNode[] {
    return Array.from(this.explorerNodeSet.values());
  }
}

export const mineExplorerNodeManager: MineExplorerNodeManager = new MineExplorerNodeManager();
