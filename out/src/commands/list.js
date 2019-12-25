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
const utils_1 = require("../utils");
const shared_1 = require("../shared");
const templateChannel_1 = require("../templateChannel");
const templateExecutor_1 = require("../templateExecutor");
function listTreeNodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return setTreeNodes(yield templateExecutor_1.templateExecutor.listTreeNodes());
        }
        catch (error) {
            templateChannel_1.templateChannel.appendLine(error);
            yield utils_1.promptForOpenOutputChannel("Failed to list templates. Please open the output channel for details.", utils_1.DialogType.error);
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
            templateChannel_1.templateChannel.appendLine(error);
            yield utils_1.promptForOpenOutputChannel("Failed to update templates. Please open the output channel for details.", utils_1.DialogType.error);
            return [];
        }
    });
}
exports.updateListTreeNodes = updateListTreeNodes;
function setTreeNodes(result) {
    const treeNodes = [];
    for (const node of result) {
        if (utils_1.file.exist(utils_1.file.onlineDir() + "/" + node.name + node.extname)) {
            treeNodes.push(Object.assign(Object.assign({}, node), {
                state: shared_1.TemplateState.Install
            }));
        }
        treeNodes.push(node);
    }
    return treeNodes;
}
/// local
function listLocalTreeNodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield templateExecutor_1.templateExecutor.listLocalTreeNodes();
        }
        catch (error) {
            templateChannel_1.templateChannel.appendLine(error);
            yield utils_1.promptForOpenOutputChannel("Failed to list templates. Please open the output channel for details.", utils_1.DialogType.error);
            return [];
        }
    });
}
exports.listLocalTreeNodes = listLocalTreeNodes;
/// mine
function listMineTreeNodes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield templateExecutor_1.templateExecutor.listMineTreeNodes();
        }
        catch (error) {
            templateChannel_1.templateChannel.appendLine(error);
            yield utils_1.promptForOpenOutputChannel("Failed to list templates. Please open the output channel for details.", utils_1.DialogType.error);
            return [];
        }
    });
}
exports.listMineTreeNodes = listMineTreeNodes;
//# sourceMappingURL=list.js.map