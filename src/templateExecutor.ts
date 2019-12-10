import { Disposable } from "vscode";
import * as request from "request";
import * as fs from "fs";
import { file } from "./utils/fileUtils";
import { ITreeNode, TemplateState } from "./shared";

// import * as path from "path";
// TODO: 调整为多态，本地(local)和在线(online)继承父类
class TemplateExecutor implements Disposable {
  public dispose(): void {}

  public async listTreeNodes(): Promise<ITreeNode[]> {
    const data = file.data(file.configDir());

    return data ? JSON.parse(data) : await this.updateListTreeNodes();
  }
  public async updateListTreeNodes(): Promise<ITreeNode[]> {
    const res = await this.updateFromOnline();
    const files = file.listFile(file.onlineDir());
    if (files && files.length) {
      this.refreshTreeNodes(TemplateState.Install, file.configDir(), files);
      return JSON.parse(file.data(file.configDir())!);
    } else {
      return res;
    }
  }
  public async updateFromOnline(): Promise<ITreeNode[]> {
    return new Promise(resolve => {
      file.mkdir(file.appDir());
      this.executeRequest(
        file.onlineConfigSrc(),
        file.pluginFile(file.configDir()),
        () => {
          resolve(JSON.parse(file.data(file.configDir())!));
        }
      );
    });
  }
  public executeRequest(src: string, dst: string, cb: Function): void {
    const srcstream = request(src);
    const dststream = fs.createWriteStream(dst);
    let error;
    srcstream.on("response", function(res) {
      if (res.statusCode !== 200) {
        srcstream.emit("error", "HTTP Error: " + res.statusCode);
      }
    });
    srcstream.pipe(dststream);
    srcstream.on("error", function(e) {
      dststream.emit("error", e);
    });
    dststream.on("error", function(e) {
      error = e;
      dststream.end();
    });
    dststream.on("close", function() {
      if (error) file.rm(dst);
      cb();
    });
  }

  public refreshTreeNodes(state: number, path: string, slug: string): void;
  public refreshTreeNodes(state: number, path: string, slugs: string[]): void;
  public refreshTreeNodes(
    state: number,
    path: string,
    arg: string | string[]
  ): void {
    let result;

    const data = file.data(path);
    if (!data) return;

    if (typeof arg === "string") {
      result = JSON.parse(data).map(item =>
        item.slug === arg ? { ...item, ...{ state } } : item
      );
    }
    if (Object.prototype.toString.call(arg) === "[object Array]") {
      result = JSON.parse(data).map((item: ITreeNode) =>
        arg.includes(`${item.slug}.${item.lan}`)
          ? { ...item, ...{ state } }
          : item
      );
    }
    file.write(path, JSON.stringify(result));
  }
  
  public addSource(path: string) {
    const data = file.data(path);
    if (data) {
      file.write(file.localFile(file.basename(path)), data);
    }
  }

}
export const templateExecutor: TemplateExecutor = new TemplateExecutor();
