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
const uiUtils_1 = require("../utils/uiUtils");
const templateExecutor_1 = require("../templateExecutor");
const fileUtils_1 = require("../utils/fileUtils");
function addTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: true,
                openLabel: "Select"
            });
            if (!res || !res.length)
                return;
            // generate local file
            fileUtils_1.file.mkdir(fileUtils_1.file.localDir());
            yield Promise.all(res.map(item => templateExecutor_1.templateExecutor.addSource(item.path)));
            // generate local config.json
            fileUtils_1.file.write(fileUtils_1.file.localConfigDir(), JSON.stringify(res.map((item) => {
                return {
                    name: fileUtils_1.file.basename(item.path)
                };
            })));
        }
        catch (err) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to add templates. Please open the output channel for details.", uiUtils_1.DialogType.error);
        }
    });
}
exports.addTemplate = addTemplate;
//# sourceMappingURL=add.js.map