// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { templateTreeDataProvider } from "./explorer/templateTreeDataProvider";
import { TemplateNode } from "./explorer/templateNode";
import * as operate from "./commands/operate";
import * as download from "./commands/download";
import { promptForOpenOutputChannel, DialogType } from "./utils/uiUtils";
import { templateChannel } from "./templateChannel";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  try {
    console.log('Congratulations, your extension "template" is now active!');

    templateTreeDataProvider.refresh();

    templateTreeDataProvider.initialize(context);

    context.subscriptions.push(
      vscode.window.createTreeView("templateExplorer", {
        treeDataProvider: templateTreeDataProvider,
        showCollapseAll: true
      }),
      vscode.commands.registerCommand("template.refreshExplorer", () =>
        templateTreeDataProvider.update()
      ),
      vscode.commands.registerCommand("template.downloadTemplate", () =>
        download.downloadTemplate()
      ),
      vscode.commands.registerCommand(
        "template.insertTemplate",
        (node: TemplateNode) => operate.insertTemplate(node)
      )
    );
  } catch (err) {
    templateChannel.appendLine(err.toString());
    promptForOpenOutputChannel(
      "Extension initialization failed. Please open output channel for details.",
      DialogType.error
    );
  }
}
