"use strict";
// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function getWorkspaceConfiguration() {
    return vscode_1.workspace.getConfiguration("template");
}
exports.getWorkspaceConfiguration = getWorkspaceConfiguration;
function shouldHideSolvedProblem() {
    return getWorkspaceConfiguration().get("hideSolved", false);
}
exports.shouldHideSolvedProblem = shouldHideSolvedProblem;
function getWorkspaceFolder() {
    return getWorkspaceConfiguration().get("workspaceFolder", "");
}
exports.getWorkspaceFolder = getWorkspaceFolder;
function getEditorShortcuts() {
    return getWorkspaceConfiguration().get("editor.shortcuts", ["submit", "test"]);
}
exports.getEditorShortcuts = getEditorShortcuts;
//# sourceMappingURL=settingUtils.js.map