import * as vscode from "vscode";
import { LocalTemplateNode } from "./LocalTemplateNode";
import { localExplorerNodeManager } from "./LocalExplorerNodeManage";

export class LocalTemplateTreeDataProvider
  implements vscode.TreeDataProvider<LocalTemplateNode> {
  private onDidChangeTreeDataEvent: vscode.EventEmitter<
    LocalTemplateNode | undefined | null
  > = new vscode.EventEmitter<LocalTemplateNode | undefined | null>();

  public readonly onDidChangeTreeData: vscode.Event<any> = this
    .onDidChangeTreeDataEvent.event;

  public async refresh(): Promise<void> {
    await localExplorerNodeManager.refreshCache();
    this.onDidChangeTreeDataEvent.fire();
  }
  public getChildren(): vscode.ProviderResult<any[]> {
    return localExplorerNodeManager.getAllNodes();
  }
  public getTreeItem(element: LocalTemplateNode): vscode.TreeItem {
    return {
      label: element.name,
      command: element.insertCommand,
      contextValue: "template"
    };
  }
}

export const localTemplateTreeDataProvider: LocalTemplateTreeDataProvider = new LocalTemplateTreeDataProvider();
