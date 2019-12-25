"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function getWorkspaceConfiguration() {
    return vscode_1.workspace.getConfiguration("template");
}
exports.getWorkspaceConfiguration = getWorkspaceConfiguration;
function getWorkspaceFolder() {
    return getWorkspaceConfiguration().get("workspaceFolder", "");
}
exports.getWorkspaceFolder = getWorkspaceFolder;
//# sourceMappingURL=settingUtils.js.map