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
const uiUtils_1 = require("../utils/uiUtils");
const fileUtils_1 = require("../utils/fileUtils");
const templateExecutor_1 = require("../templateExecutor");
const TemplateTreeDataProvider_1 = require("../explorer/online/TemplateTreeDataProvider");
const shared_1 = require("../shared");
function downloadTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = JSON.parse(fileUtils_1.file.data(fileUtils_1.file.configDir()));
            if (data) {
                fileUtils_1.file.mkdir(fileUtils_1.file.onlineDir());
                let chain = [];
                for (const treeItem of data) {
                    chain.push(new Promise(resolve => {
                        templateExecutor_1.templateExecutor.executeRequest(fileUtils_1.file.onlineTemplateSrc(treeItem), fileUtils_1.file.onlineDir() + "/" + "/" + treeItem.slug + "." + treeItem.lan, () => __awaiter(this, void 0, void 0, function* () {
                            resolve();
                        }));
                    }));
                }
                yield Promise.all(chain);
                yield templateExecutor_1.templateExecutor.refreshTreeNodes(shared_1.TemplateState.Install, fileUtils_1.file.configDir(), data.map(item => `${item.slug}.${item.lan}`));
                TemplateTreeDataProvider_1.templateTreeDataProvider.refresh();
            }
        }
        catch (err) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to download templates. Please open the output channel for details.", uiUtils_1.DialogType.error);
        }
    });
}
exports.downloadTemplate = downloadTemplate;
//# sourceMappingURL=download.js.map