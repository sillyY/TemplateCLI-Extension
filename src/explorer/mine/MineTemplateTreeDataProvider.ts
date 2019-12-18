import * as vscode from "vscode";
import { MineTemplateNode } from "./MineTemplateNode";
import { mineExplorerNodeManager } from "./MineExplorerNodeManage";

export class MineTemplateTreeDataProvider
  implements vscode.TreeDataProvider<MineTemplateNode> {
  private onDidChangeTreeDataEvent: vscode.EventEmitter<
    MineTemplateNode | undefined | null
  > = new vscode.EventEmitter<MineTemplateNode | undefined | null>();

  public readonly onDidChangeTreeData: vscode.Event<any> = this
    .onDidChangeTreeDataEvent.event;

  public async refresh(): Promise<void> {
    await mineExplorerNodeManager.refreshCache();
    this.onDidChangeTreeDataEvent.fire();
  }
  public getChildren(): vscode.ProviderResult<any[]> {
    return mineExplorerNodeManager.getAllNodes();
  }
  public getTreeItem(element: MineTemplateNode): vscode.TreeItem {
    return {
      label: element.name,
      command: element.insertCommand,
      contextValue: "template"
    };
  }
}

export const mineTemplateTreeDataProvider: MineTemplateTreeDataProvider = new MineTemplateTreeDataProvider();
