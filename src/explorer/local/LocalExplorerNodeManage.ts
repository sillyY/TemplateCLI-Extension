import { Disposable } from "vscode";
import { listLocalTreeNodes } from "../../commands/list";
import { LocalTemplateNode } from "./LocalTemplateNode";
import { ILocalTreeNode } from "../../shared";
class LocalExplorerNodeManager implements Disposable {
  private explorerNodeSet: Set<LocalTemplateNode> = new Set<
    LocalTemplateNode
  >();

  public dispose(): void {
    this.explorerNodeSet.clear();
  }
  public async refreshCache(): Promise<void> {
    this.dispose();
    this.setSets(await listLocalTreeNodes());
  }
  public setSets(treeNodes: ILocalTreeNode[]): void {
    for (const treeItem of treeNodes) {
      const [name, extname] = treeItem.name.split(".");
      treeItem.name = name;
      treeItem.extname = extname;
      this.explorerNodeSet.add(new LocalTemplateNode(treeItem));
    }
  }
  public getRootNodes(): LocalTemplateNode[] {
    return [];
  }
  public getAllNodes(): LocalTemplateNode[] {
    return Array.from(this.explorerNodeSet.values());
  }
}

export const localExplorerNodeManager: LocalExplorerNodeManager = new LocalExplorerNodeManager();
