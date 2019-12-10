import * as vscode from "vscode";
import * as path from "path";
import { TemplateNode } from "./TemplateNode";
import { explorerNodeManager } from "./explorerNodeManager";
import { Language, TemplateState } from "../../shared";

export class TemplateTreeDataProvider
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
    await explorerNodeManager.refreshCache();
    this.onDidChangeTreeDataEvent.fire();
  }
  public async update(): Promise<void> {
    await explorerNodeManager.updateCache();
    this.onDidChangeTreeDataEvent.fire();
  }
  public getChildren(
    element?: TemplateNode | undefined
  ): vscode.ProviderResult<TemplateNode[]> {
    if (!element) {
      return explorerNodeManager.getRootNodes();
    }

    if (element.isLanguage) {
      switch (element.id) {
        case Language.All:
          return explorerNodeManager.getAllNodes();
        case Language.CSS:
          return explorerNodeManager.getCategoryNodes(
            Language.CSS.toLowerCase()
          );
        case Language.JavaScript:
          return explorerNodeManager.getCategoryNodes(
            Language.JavaScript.toLowerCase()
          );
        default:
          return [];
      }
    }

    if (element.isCategory) {
      return explorerNodeManager.getTemplateNodes(
        element.language,
        element.category
      );
    }

    return [];
  }

  public test() {
    console.log(this.context);
  }

  public getTreeItem(element: TemplateNode): vscode.TreeItem {
    return {
      label: element.isSlug ? `[${element.id}] ${element.name}` : element.name,
      collapsibleState: element.slug
        ? vscode.TreeItemCollapsibleState.None
        : vscode.TreeItemCollapsibleState.Collapsed,
      command: element.slug ? element.insertCommand : undefined,
      iconPath: this.parseIconPathFromProblemState(element)
    };
  }
  private parseIconPathFromProblemState(element: TemplateNode): string {
    if (!element.isSlug) {
      return "";
    }
    switch (element.state) {
      case TemplateState.Install:
        return this.context.asAbsolutePath(path.join("resources", "check.png"));
      case TemplateState.NotInstall:
        return this.context.asAbsolutePath(
          path.join("resources", "warning.png")
        );
      case TemplateState.Unknown:
        return this.context.asAbsolutePath(path.join("resources", "blank.png"));
      default:
        return "";
    }
  }
}

export const templateTreeDataProvider: TemplateTreeDataProvider = new TemplateTreeDataProvider();
