import * as path from "path";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import DEFAULT_CONFIG from "../shared/config";
import { TemplateNode } from "../explorer/online/TemplateNode";

class File {
  public isWindows() {
    return process.platform === "win32";
  }
  public userHomeDir(): string {
    return process.env.HOME || process.env.USERPROFILE || "";
  }
  public homeDir() {
    return path.join(this.userHomeDir(), ".tl");
  }
  public appDir() {
    const config = require("../shared/config");
    return path.join(this.homeDir(), config.app || "template-library");
  }

  /// base ///
  public fullname(fulllpath) {
    return path.basename(fulllpath);
  }
  public basename(fulllpath) {
    return path.basename(fulllpath, path.extname(fulllpath));
  }
  public extname(fulllpath) {
    return path.extname(fulllpath);
  }
  public dirname(fulllpath) {
    return path.dirname(fulllpath);
  }

  public rm(fullpath) {
    return fs.unlinkSync(fullpath);
  }
  public data(fullpath) {
    return fs.existsSync(fullpath)
      ? fs.readFileSync(fullpath).toString()
      : null;
  }

  public mkdir(fullpath) {
    if (fs.existsSync(fullpath)) return;
    mkdirp.sync(fullpath);
  }
  public exist(fullpath) {
    return fs.existsSync(fullpath);
  }
  public write(fullpath, data) {
    return fs.writeFileSync(fullpath, data);
  }
  public listFile(fullpath) {
    return fs.existsSync(fullpath)
      ? fs.readdirSync(fullpath).filter(pathname => pathname !== ".DS_Store")
      : null;
  }

  /// online
  public onlineBaseSrc() {
    return DEFAULT_CONFIG.urls.base;
  }
  public onlineConfigSrc() {
    return this.onlineBaseSrc() + "/config.json";
  }
  public onlineTemplateSrc(node: TemplateNode): string {
    let { language, category, name, extname } = node;
    language = language ? `/${language}` : "";
    category = category ? `/${category}` : "";
    name = name ? `/${name}` : "";

    return `${this.onlineBaseSrc()}/libs${language}${category}${name}${extname}`;
  }

  /// online files ///
  public onlineDir() {
    return path.join(this.appDir(), "online");
  }
  public onlineFile(k) {
    return path.join(this.onlineDir(), k);
  }
  public onlineConfigDir() {
    return path.join(this.onlineDir(), "config.json");
  }

  /// local file ///
  public localDir() {
    return path.join(this.appDir(), "local");
  }
  public localFile(k) {
    return path.join(this.localDir(), k);
  }
  public localConfigDir() {
    return path.join(this.localDir(), "config.json");
  }
}

export const file = new File();
