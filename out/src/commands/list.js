"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as vscode from "vscode";
// import { ITreeNode } from "../shared";
const templateExecutor_1 = require("../templateExecutor");
const shared_1 = require("../shared");
const fileUtils_1 = require("../utils/fileUtils");
const uiUtils_1 = require("../utils/uiUtils");
function listTreeNodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return setTreeNodes(yield templateExecutor_1.templateExecutor.listTreeNodes());
        }
        catch (error) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to list templates. Please open the output channel for details.", uiUtils_1.DialogType.error);
            return [];
        }
    });
}
exports.listTreeNodes = listTreeNodes;
function updateListTreeNodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return setTreeNodes(yield templateExecutor_1.templateExecutor.updateListTreeNodes());
        }
        catch (error) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to update templates. Please open the output channel for details.", uiUtils_1.DialogType.error);
            return [];
        }
    });
}
exports.updateListTreeNodes = updateListTreeNodes;
function setTreeNodes(result) {
    const treeNodes = [];
    for (const node of result) {
        if (fileUtils_1.file.exist(fileUtils_1.file.onlineDir() + "/" + "/" + node.slug + "." + node.lan)) {
            treeNodes.push(Object.assign(Object.assign({}, node), {
                state: shared_1.TemplateState.Install
            }));
        }
        treeNodes.push(node);
    }
    return treeNodes;
}
function refreshTreeNodes(state, arg) {
    let result;
    const data = fileUtils_1.file.data(fileUtils_1.file.configDir());
    if (!data)
        return;
    if (typeof arg === "string") {
        result = JSON.parse(data).map(item => item.slug === arg ? Object.assign(Object.assign({}, item), { state }) : item);
    }
    if (Object.prototype.toString.call(arg) === "[object Array]") {
        result = JSON.parse(data).map((item) => arg.includes(`${item.slug}.${item.lan}`)
            ? Object.assign(Object.assign({}, item), { state }) : item);
    }
    fileUtils_1.file.write(fileUtils_1.file.configDir(), JSON.stringify(result));
}
exports.refreshTreeNodes = refreshTreeNodes;
//# sourceMappingURL=list.js.map