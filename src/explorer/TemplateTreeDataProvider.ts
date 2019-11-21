import * as vscode from "vscode";
import { TemplateNode } from "./templateNode";
import { explorerNodeManager } from "./explorerNodeManager";
// import { Category } from "../shared";

export class TemplateTreeDataProvider
  implements vscode.TreeDataProvider<TemplateNode> {
  private context: vscode.ExtensionContext;
  private onDidChangeTreeDataEvent: vscode.EventEmitter<
    TemplateNode | undefined | null
  > = new vscode.EventEmitter<TemplateNode | undefined | null>();

  public initialize(context: vscode.ExtensionContext): void {
    this.context = context;
  }
  public async refresh(): Promise<void> {
    await explorerNodeManager.refreshCache();
    this.onDidChangeTreeDataEvent.fire();
  }
  public getChildren(
    element?: TemplateNode | undefined
  ): vscode.ProviderResult<TemplateNode[]> {
    if (!element) {
      return explorerNodeManager.getRootNodes();
    }
    console.log(this.context);
    return explorerNodeManager.getRootNodes();
  }

  public getTreeItem(element: TemplateNode): vscode.TreeItem {
    return {
      label: element.name
    };
  }
}

export const templateTreeDataProvider: TemplateTreeDataProvider = new TemplateTreeDataProvider();
