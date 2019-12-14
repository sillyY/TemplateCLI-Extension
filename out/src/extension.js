"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const operate = require("./commands/operate");
const download = require("./commands/download");
const load = require("./commands/load");
const TemplateTreeDataProvider_1 = require("./explorer/online/TemplateTreeDataProvider");
const uiUtils_1 = require("./utils/uiUtils");
const templateChannel_1 = require("./templateChannel");
const LocalTemplateTreeDataProvider_1 = require("./explorer/local/LocalTemplateTreeDataProvider");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    try {
        console.log('Congratulations, your extension "template" is now active!');
        TemplateTreeDataProvider_1.templateTreeDataProvider.refresh();
        LocalTemplateTreeDataProvider_1.localTemplateTreeDataProvider.refresh();
        TemplateTreeDataProvider_1.templateTreeDataProvider.initialize(context);
        context.subscriptions.push(vscode.window.createTreeView("templateExplorer", {
            treeDataProvider: TemplateTreeDataProvider_1.templateTreeDataProvider,
            showCollapseAll: true
        }), vscode.window.createTreeView("localTemplateExplorer", {
            treeDataProvider: LocalTemplateTreeDataProvider_1.localTemplateTreeDataProvider,
            showCollapseAll: true
        }), vscode.commands.registerCommand("template.updateExplorer", () => TemplateTreeDataProvider_1.templateTreeDataProvider.update()), vscode.commands.registerCommand("template.refreshExplorer", () => Promise.all([
            TemplateTreeDataProvider_1.templateTreeDataProvider.refresh(),
            LocalTemplateTreeDataProvider_1.localTemplateTreeDataProvider.refresh()
        ])), vscode.commands.registerCommand("template.downloadTemplate", () => download.downloadTemplate()), vscode.commands.registerCommand("template.loadTemplate", () => load.loadTemplate()), vscode.commands.registerCommand("template.insertTemplate", (node) => operate.insertTemplate(node)));
    }
    catch (err) {
        templateChannel_1.templateChannel.appendLine(err.toString());
        uiUtils_1.promptForOpenOutputChannel("Extension initialization failed. Please open output channel for details.", uiUtils_1.DialogType.error);
    }
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map