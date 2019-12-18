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
function install(data, getPath, dir) {
    return __awaiter(this, void 0, void 0, function* () {
        let promises = [];
        for (const treeItem of data) {
            promises.push(new Promise((resolve, reject) => {
                try {
                    templateExecutor_1.templateExecutor.executeRequest(getPath(treeItem), `${dir}/${treeItem.name}${treeItem.extname}`, () => __awaiter(this, void 0, void 0, function* () {
                        resolve();
                    }));
                }
                catch (error) {
                    console.log(error);
                    reject(error);
                }
            }));
        }
        return yield Promise.all(promises);
    });
}
exports.install = install;
function downloadTemplate() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = JSON.parse(fileUtils_1.file.data(fileUtils_1.file.onlineConfigDir()));
            if (!data || !data.length)
                return;
            // 1. 检查文件是否存在
            fileUtils_1.file.mkdir(fileUtils_1.file.onlineDir());
            let chain = [];
            // 2. 下载数据
            chain.push(install(data, fileUtils_1.file.onlineTemplateSrc, fileUtils_1.file.onlineDir()));
            // 3. 更新配置文件
            chain.push(templateExecutor_1.templateExecutor.refreshTreeNodes(shared_1.TemplateState.Install, fileUtils_1.file.onlineConfigDir(), JSON.parse(fileUtils_1.file.data(fileUtils_1.file.onlineConfigDir())).map(item => `${item.name}.${item.extname}`)));
            yield templateExecutor_1.templateExecutor.downloadExecute(chain);
            TemplateTreeDataProvider_1.templateTreeDataProvider.refresh();
        }
        catch (err) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to download templates. Please open the output channel for details.", uiUtils_1.DialogType.error);
        }
    });
}
exports.downloadTemplate = downloadTemplate;
function installOneTemplate(node) {
    return __awaiter(this, void 0, void 0, function* () {
        yield install([node], fileUtils_1.file.onlineTemplateSrc.bind(fileUtils_1.file), fileUtils_1.file.onlineDir());
        // 2. 更新config
        yield templateExecutor_1.templateExecutor.refreshTreeNodes(shared_1.TemplateState.Install, fileUtils_1.file.onlineConfigDir(), [node.fullname]);
        // 3. 更新Extension状态
        TemplateTreeDataProvider_1.templateTreeDataProvider.refresh();
    });
}
exports.installOneTemplate = installOneTemplate;
//# sourceMappingURL=download.js.map