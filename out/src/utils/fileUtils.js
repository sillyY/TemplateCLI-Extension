"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const mkdirp = require("mkdirp");
const config_1 = require("../shared/config");
class File {
    isWindows() {
        return process.platform === "win32";
    }
    userHomeDir() {
        return process.env.HOME || process.env.USERPROFILE || "";
    }
    homeDir() {
        return path.join(this.userHomeDir(), ".tl");
    }
    appDir() {
        const config = require("../shared/config");
        return path.join(this.homeDir(), config.app || "template-library");
    }
    cacheDir() {
        return path.join(this.appDir(), "cache");
    }
    codeDir(dir) {
        return path.join(__dirname, "..", dir || "");
    }
    /// online files ///
    onlineDir() {
        return path.join(this.appDir(), "online");
    }
    onlineFile(k) {
        return path.join(this.onlineDir(), k);
    }
    configDir() {
        return path.join(this.appDir(), "config.json");
    }
    pluginFile(name) {
        return path.join(this.appDir(), path.basename(name));
    }
    rm(fullpath) {
        return fs.unlinkSync(fullpath);
    }
    data(fullpath) {
        return fs.existsSync(fullpath)
            ? fs.readFileSync(fullpath).toString()
            : null;
    }
    mkdir(fullpath) {
        if (fs.existsSync(fullpath))
            return;
        mkdirp.sync(fullpath);
    }
    exist(fullpath) {
        return fs.existsSync(fullpath);
    }
    write(fullpath, data) {
        return fs.writeFileSync(fullpath, data);
    }
    /// online
    onlineBaseSrc() {
        return config_1.default.urls.base;
    }
    onlineConfigSrc() {
        return this.onlineBaseSrc() + "/config.json";
    }
    onlineTemplateSrc(node) {
        let { language, category, slug, lan } = node;
        language = language ? `/${language}` : "";
        category = category ? `/${category}` : "";
        slug = slug ? `/${slug}` : "";
        return `${this.onlineBaseSrc()}/libs${language}${category}${slug}.${lan}`;
    }
}
exports.file = new File();
//# sourceMappingURL=fileUtils.js.map