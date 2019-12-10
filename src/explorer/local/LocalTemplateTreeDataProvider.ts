import * as vscode from "vscode";
// import * as path from "path";
import { TemplateNode } from "./LocalTemplateNode";
// import { explorerNodeManager } from "./explorerNodeManager";
// import { TemplateState } from "../../shared";

export class LocalTemplateTreeDataProvider
  implements vscode.TreeDataProvider<TemplateNode> {
  private context: vscode.ExtensionContext;

  private onDidChangeTreeDataEvent: vscode.EventEmitter<
    TemplateNode | undefined | null
  > = new vscode.EventEmitter<TemplateNode | undefined | null>();

  public readonly onDidChangeTreeData: vscode.Event<any> = this
    .onDidChangeTreeDataEvent.event;

  public initialize(context: vscode.ExtensionContext): void {
    this.context = context;
  }

  public async refresh(): Promise<void> {
    // await explorerNodeManager.refreshCache();
    this.onDidChangeTreeDataEvent.fire();
  }
  public async update(): Promise<void> {
    // await explorerNodeManager.updateCache();
    this.onDidChangeTreeDataEvent.fire();
  }
  public getChildren(): vscode.ProviderResult<any[]> {
    return [
      {
        name: "all"
      },
      {
        name: "css"
      },
      {
        name: "js"
      }
    ];
  }

  public test() {
    console.log(this.context);
  }

  public getTreeItem(element: TemplateNode): vscode.TreeItem {
    return {
      label: element.name
    };
  }
}

export const localTemplateTreeDataProvider: LocalTemplateTreeDataProvider = new LocalTemplateTreeDataProvider();
