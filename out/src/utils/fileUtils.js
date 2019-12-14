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
    /// base ///
    fullname(fulllpath) {
        return path.basename(fulllpath);
    }
    basename(fulllpath) {
        return path.basename(fulllpath, path.extname(fulllpath));
    }
    extname(fulllpath) {
        return path.extname(fulllpath);
    }
    dirname(fulllpath) {
        return path.dirname(fulllpath);
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
    listFile(fullpath) {
        return fs.existsSync(fullpath)
            ? fs.readdirSync(fullpath).filter(pathname => pathname !== ".DS_Store")
            : null;
    }
    /// online
    onlineBaseSrc() {
        return config_1.default.urls.base;
    }
    onlineConfigSrc() {
        return this.onlineBaseSrc() + "/config.json";
    }
    onlineTemplateSrc(node) {
        let { language, category, name, extname } = node;
        language = language ? `/${language}` : "";
        category = category ? `/${category}` : "";
        name = name ? `/${name}` : "";
        return `${this.onlineBaseSrc()}/libs${language}${category}${name}${extname}`;
    }
    /// online files ///
    onlineDir() {
        return path.join(this.appDir(), "online");
    }
    onlineFile(k) {
        return path.join(this.onlineDir(), k);
    }
    onlineConfigDir() {
        return path.join(this.onlineDir(), "config.json");
    }
    /// local file ///
    localDir() {
        return path.join(this.appDir(), "local");
    }
    localFile(k) {
        return path.join(this.localDir(), k);
    }
    localConfigDir() {
        return path.join(this.localDir(), "config.json");
    }
}
exports.file = new File();
//# sourceMappingURL=fileUtils.js.map