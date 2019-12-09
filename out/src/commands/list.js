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
            const result = yield templateExecutor_1.templateExecutor.listTreeNodes();
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
        catch (error) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to list template's. Please open the output channel for details.", uiUtils_1.DialogType.error);
            return [];
        }
    });
}
exports.listTreeNodes = listTreeNodes;
function refreshTreeNodes(treeItem) {
    return new Promise((resolve) => {
        let config = fileUtils_1.file.data(fileUtils_1.file.configDir());
        if (!config)
            return;
        // TODO: 优化改地方代码
        const { id, fid, name, lan, language, category, slug, state } = treeItem;
        const result = JSON.parse(config).map(item => item.id === treeItem.id && item.language === treeItem.language
            ? { id, fid, name, lan, language, category, slug, state }
            : item);
        fileUtils_1.file.write(fileUtils_1.file.configDir(), JSON.stringify(result));
        resolve();
    });
}
exports.refreshTreeNodes = refreshTreeNodes;
//# sourceMappingURL=list.js.map