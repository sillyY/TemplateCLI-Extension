import * as path from "path";
import * as fs from "fs";
import * as mkdirp from "mkdirp";
import * as fse from "fs-extra";

class File {
  public fullname(fullpath: string): string {
    return path.basename(fullpath);
  }

  public basename(fullpath: string): string {
    return path.basename(fullpath, path.extname(fullpath));
  }

  public extname(fullpath: string): string {
    return path.extname(fullpath);
  }

  public dirname(fullpath: string): string {
    return path.dirname(fullpath);
  }

  public rm(fullpath: string) {
    return fs.unlinkSync(fullpath);
  }

  public remove(fullpath: string) {
    return fse.removeSync(fullpath);
  }

  public data(fullpath: string): string | null {
    return fs.existsSync(fullpath)
      ? fs.readFileSync(fullpath).toString()
      : null;
  }

  public mkdir(fullpath: string) {
    if (fs.existsSync(fullpath)) return;
    mkdirp.sync(fullpath);
  }

  public exist(fullpath: string): boolean {
    return fs.existsSync(fullpath);
  }

  public write<T>(fullpath: string, data: T) {
    return fs.writeFileSync(fullpath, data);
  }

  public listFile(fullpath: string): string[] | null {
    return fs.existsSync(fullpath)
      ? fs.readdirSync(fullpath).filter(pathname => pathname !== ".DS_Store")
      : null;
  }

  public copyFile(src: string, dest: string) {
    fs.copyFileSync(src, dest);
  }
}

export const file = new File();
