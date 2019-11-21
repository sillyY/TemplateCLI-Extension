"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const templateTreeDataProvider_1 = require("./explorer/templateTreeDataProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "template" is now active!');
    templateTreeDataProvider_1.templateTreeDataProvider.initialize(context);
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand("extension.helloWorld", () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage("Hello World!");
    });
    context.subscriptions.push(vscode.window.createTreeView("templateExplorer", {
        treeDataProvider: templateTreeDataProvider_1.templateTreeDataProvider,
        showCollapseAll: true
    }), disposable);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map