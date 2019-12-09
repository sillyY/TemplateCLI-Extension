import * as path from "path";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import DEFAULT_CONFIG from "../shared/config";
import { TemplateNode } from "../explorer/templateNode";

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

  public cacheDir() {
    return path.join(this.appDir(), "cache");
  }

  public codeDir(dir) {
    return path.join(__dirname, "..", dir || "");
  }

  /// online files ///
  public onlineDir() {
    return path.join(this.appDir(), "online");
  }
  public onlineFile(k) {
    return path.join(this.onlineDir(), k);
  }

  public configDir() {
    return path.join(this.appDir(), "config.json");
  }

  public pluginFile(name) {
    return path.join(this.appDir(), path.basename(name));
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
    return fs.existsSync(fullpath)
  }
  public write(fullpath, data) {
    return fs.writeFileSync(fullpath, data);
  }

  /// online
  public onlineBaseSrc() {
    return DEFAULT_CONFIG.urls.base;
  }
  public onlineConfigSrc() {
    return this.onlineBaseSrc() + "/config.json";
  }
  public onlineTemplateSrc(node: TemplateNode): string {
    let { language, category, slug, lan } = node;
    language = language ? `/${language}` : "";
    category = category ? `/${category}` : "";
    slug = slug ? `/${slug}` : "";

    return `${this.onlineBaseSrc()}/libs${language}${category}${slug}.${lan}`;
  }
}

export const file = new File();
