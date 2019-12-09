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
const templateExecutor_1 = require("../templateExecutor");
const fileUtils_1 = require("../utils/fileUtils");
const shared_1 = require("../shared");
const list_1 = require("./list");
const templateTreeDataProvider_1 = require("../explorer/templateTreeDataProvider");
const uiUtils_1 = require("../utils/uiUtils");
function insertTemplate(node) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!node)
            return;
        yield insertTemplateInternal(node);
    });
}
exports.insertTemplate = insertTemplate;
function insertTemplateInternal(node) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result;
            const res = fileUtils_1.file.data(fileUtils_1.file.onlineFile(node.slug));
            if (res) {
                result = res;
            }
            else {
                fileUtils_1.file.mkdir(fileUtils_1.file.onlineDir());
                templateExecutor_1.templateExecutor.executeRequest(fileUtils_1.file.onlineTemplateSrc(node), fileUtils_1.file.onlineDir() + "/" + "/" + node.slug + "." + node.lan, () => __awaiter(this, void 0, void 0, function* () {
                    result = fileUtils_1.file.data(fileUtils_1.file.onlineFile(node.slug + '.' + node.lan));
                    list_1.refreshTreeNodes(shared_1.TemplateState.Install, node.slug);
                    const editor = vscode.window.activeTextEditor;
                    if (!editor) {
                        // FIXME: 加入提示语
                        return; // No open text editor
                    }
                    const selection = editor.selection;
                    editor.edit(builder => {
                        builder.insert(new vscode.Position(selection.end.line, selection.end.character), result);
                    });
                    templateTreeDataProvider_1.templateTreeDataProvider.refresh();
                }));
            }
        }
        catch (err) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to insert templates. Please open the output channel for details.", uiUtils_1.DialogType.error);
        }
    });
}
exports.insertTemplateInternal = insertTemplateInternal;
// // export function setTemplateState(node: ITreeNode, state: number) {
// //   // TODO: 优化该函数代码
// //   const { id, fid, name, category, slug, lan, language } = node;
// //   refreshTreeNodes(
// //     new TemplateNode({ id, fid, name, category, slug, lan, language, state })
// //   );
// // }
// export function setTemplateState1(slug: string, state: number) {
//   refreshTreeNodes1(slug, state)
// }
//# sourceMappingURL=operate.js.map