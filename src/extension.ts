// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
// import * as insert from "./commands/insert";
// import * as download from "./commands/download";
// import * as load from "./commands/load";
// import * as edit from "./commands/edit";
// import * as favorite from "./commands/favorite";
// import { templateTreeDataProvider } from "./explorer/online/TemplateTreeDataProvider";
// import { TemplateNode } from "./explorer/online/TemplateNode";
import { promptForOpenOutputChannel, DialogType } from "./utils/uiUtils";
import { templateChannel } from "./templateChannel";
// import { localTemplateTreeDataProvider } from "./explorer/local/LocalTemplateTreeDataProvider";
// import { LocalTemplateNode } from "./explorer/local/LocalTemplateNode";
// import { mineTemplateTreeDataProvider } from "./explorer/mine/MineTemplateTreeDataProvider";
// import { MineTemplateNode } from "./explorer/mine/MineTemplateNode";
import { Controller } from "./controller";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  try {
    // templateTreeDataProvider.refresh();
    // localTemplateTreeDataProvider.refresh();
    // mineTemplateTreeDataProvider.refresh();

    // templateTreeDataProvider.initialize(context);

    Controller.initialize(context, {
      views: {
        online: {
          enabled: true
        }
      }
    });

    // context.subscriptions.push(
    //   vscode.window.createTreeView("templateExplorer", {
    //     treeDataProvider: templateTreeDataProvider,
    //     showCollapseAll: true
    //   }),
    //   vscode.window.createTreeView("localTemplateExplorer", {
    //     treeDataProvider: localTemplateTreeDataProvider,
    //     showCollapseAll: true
    //   }),
    //   vscode.window.createTreeView("mineTemplateExplorer", {
    //     treeDataProvider: mineTemplateTreeDataProvider,
    //     showCollapseAll: true
    //   }),
    //   vscode.commands.registerCommand("template.updateExplorer", () =>
    //     templateTreeDataProvider.update()
    //   ),
    //   vscode.commands.registerCommand("template.refreshExplorer", () =>
    //     Promise.all([
    //       templateTreeDataProvider.refresh(),
    //       localTemplateTreeDataProvider.refresh(),
    //       mineTemplateTreeDataProvider.refresh()
    //     ])
    //   ),
    //   vscode.commands.registerCommand("template.downloadTemplate", () =>
    //     download.downloadTemplate()
    //   ),
    //   vscode.commands.registerCommand("template.loadTemplate", () =>
    //     load.loadTemplate()
    //   ),
    //   vscode.commands.registerCommand(
    //     "template.insertTemplate",
    //     (node: TemplateNode) => insert.insertTemplate(node)
    //   ),
    //   vscode.commands.registerCommand(
    //     "template.editTemplate",
    //     (node: TemplateNode | LocalTemplateNode) => {
    //       if (node instanceof TemplateNode) edit.onlineEdit(node);
    //       if (node instanceof LocalTemplateNode) edit.localEdit(node);
    //     }
    //   ),
    //   vscode.commands.registerCommand(
    //     "template.addFavorite",
    //     (node: TemplateNode | LocalTemplateNode) => favorite.addFavorite(node)
    //   ),
    //   vscode.commands.registerCommand(
    //     "template.removeFavorite",
    //     (node: MineTemplateNode) => favorite.removeFavorite(node)
    //   )
    // );
  } catch (err) {
    templateChannel.appendLine(err.toString());
    promptForOpenOutputChannel(
      "Extension initialization failed. Please open output channel for details.",
      DialogType.error
    );
  }
}
