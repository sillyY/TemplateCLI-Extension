"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const templateTreeDataProvider_1 = require("./explorer/templateTreeDataProvider");
const operate = require("./commands/operate");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    try {
        console.log('Congratulations, your extension "template" is now active!');
        templateTreeDataProvider_1.templateTreeDataProvider.refresh();
        templateTreeDataProvider_1.templateTreeDataProvider.initialize(context);
        context.subscriptions.push(vscode.window.createTreeView("templateExplorer", {
            treeDataProvider: templateTreeDataProvider_1.templateTreeDataProvider,
            showCollapseAll: true
        }), vscode.commands.registerCommand("template.refreshExplorer", () => templateTreeDataProvider_1.templateTreeDataProvider.refresh()), vscode.commands.registerCommand("template.downloadTemplate", () => {
            console.log("下载成功");
        }), vscode.commands.registerCommand("template.insertTemplate", (node) => operate.insertTemplate(node)));
    }
    catch (err) {
        console.log('err: ', err);
    }
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map