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
const vscode = require("vscode");
const TemplateNode_1 = require("../explorer/online/TemplateNode");
const fileUtils_1 = require("../utils/fileUtils");
const uiUtils_1 = require("../utils/uiUtils");
const LocalTemplateNode_1 = require("../explorer/local/LocalTemplateNode");
const download = require("./download");
const templateExecutor_1 = require("../templateExecutor");
const shared_1 = require("../shared");
const TemplateTreeDataProvider_1 = require("../explorer/online/TemplateTreeDataProvider");
function onlineInsert(node) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = fileUtils_1.file.data(fileUtils_1.file.onlineFile(node.fullname));
        if (res)
            return insertEditor(res);
        // 1. 下载文件
        yield download.install([node], fileUtils_1.file.onlineTemplateSrc.bind(fileUtils_1.file), fileUtils_1.file.onlineDir());
        // 2. 更新config
        yield templateExecutor_1.templateExecutor.refreshTreeNodes(shared_1.TemplateState.Install, fileUtils_1.file.onlineConfigDir(), [node.fullname]);
        // 3. 更新Extension状态
        TemplateTreeDataProvider_1.templateTreeDataProvider.refresh();
        return onlineInsert(node);
    });
}
function localInsert(node) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = fileUtils_1.file.data(fileUtils_1.file.localFile(node.fullname));
        if (res)
            return insertEditor(res);
    });
}
function insertTemplate(node) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node)
            return;
        if (node instanceof TemplateNode_1.TemplateNode)
            return yield onlineInsert(node);
        if (node instanceof LocalTemplateNode_1.LocalTemplateNode)
            return yield localInsert(node);
    });
}
exports.insertTemplate = insertTemplate;
function insertEditor(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                yield uiUtils_1.promptForOpenOutputChannel("Failed to found Editor. Please open the Editor.", uiUtils_1.DialogType.warning);
                return; // No open text editor
            }
            editor.edit(builder => {
                builder.insert(new vscode.Position(editor.selection.end.line, editor.selection.end.character), data);
            });
        }
        catch (err) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to insert templates. Please open the output channel for details.", uiUtils_1.DialogType.error);
        }
    });
}
exports.insertEditor = insertEditor;
//# sourceMappingURL=operate.js.map