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
const request = require("request");
const fs = require("fs");
const list_1 = require("./commands/list");
const fileUtils_1 = require("./utils/fileUtils");
const shared_1 = require("./shared");
// import * as path from "path";
class TemplateExecutor {
    dispose() { }
    listTreeNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = fileUtils_1.file.data(fileUtils_1.file.configDir());
            return data ? JSON.parse(data) : yield this.updateListTreeNodes();
        });
    }
    updateListTreeNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.updateFromOnline();
            const files = fileUtils_1.file.listFile(fileUtils_1.file.onlineDir());
            if (files && files.length) {
                list_1.refreshTreeNodes(shared_1.TemplateState.Install, files);
                return JSON.parse(fileUtils_1.file.data(fileUtils_1.file.configDir()));
            }
            else {
                return res;
            }
        });
    }
    updateFromOnline() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                fileUtils_1.file.mkdir(fileUtils_1.file.appDir());
                this.executeRequest(fileUtils_1.file.onlineConfigSrc(), fileUtils_1.file.pluginFile(fileUtils_1.file.configDir()), () => {
                    resolve(JSON.parse(fileUtils_1.file.data(fileUtils_1.file.configDir())));
                });
            });
        });
    }
    executeRequest(src, dst, cb) {
        const srcstream = request(src);
        const dststream = fs.createWriteStream(dst);
        let error;
        srcstream.on("response", function (res) {
            if (res.statusCode !== 200) {
                srcstream.emit("error", "HTTP Error: " + res.statusCode);
            }
        });
        srcstream.pipe(dststream);
        srcstream.on("error", function (e) {
            dststream.emit("error", e);
        });
        dststream.on("error", function (e) {
            error = e;
            dststream.end();
        });
        dststream.on("close", function () {
            if (error)
                fileUtils_1.file.rm(dst);
            cb();
        });
    }
}
exports.templateExecutor = new TemplateExecutor();
//# sourceMappingURL=templateExecutor.js.map