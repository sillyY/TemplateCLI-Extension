"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const fs = require("fs");
const fileUtils_1 = require("./utils/fileUtils");
// import * as path from "path";
class TemplateExecutor {
    dispose() { }
    listTreeNodes() {
        return new Promise(resolve => {
            console.log("initializing all plugins");
            // 1. find template config
            const config = fileUtils_1.file.data(fileUtils_1.file.configDir());
            // FIXME: config 不存在情况下
            if (config) {
                resolve(JSON.parse(config));
            }
            else {
                fileUtils_1.file.mkdir(fileUtils_1.file.appDir());
                this.executeRequest(fileUtils_1.file.onlineConfigSrc(), fileUtils_1.file.pluginFile(fileUtils_1.file.configDir()), () => {
                    resolve(JSON.parse(fileUtils_1.file.data(fileUtils_1.file.configDir())));
                });
            }
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