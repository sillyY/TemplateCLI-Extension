import { Disposable } from "vscode";
import * as request from "request";
import * as fs from "fs";
import { file } from "./utils/fileUtils";
import { ITreeNode, TemplateState, ILocalTreeNode } from "./shared";

class TemplateExecutor implements Disposable {
  public dispose(): void {}

  public async listTreeNodes(): Promise<ITreeNode[]> {
    const data = file.data(file.onlineConfigDir());

    return data ? JSON.parse(data) : await this.updateListTreeNodes();
  }
  public async updateListTreeNodes(): Promise<ITreeNode[]> {
    const res = await this.updateFromOnline();
    const files = file.listFile(file.onlineDir());
    if (files && files.length) {
      this.refreshTreeNodes(
        TemplateState.Install,
        file.onlineConfigDir(),
        files
      );
      return JSON.parse(file.data(file.onlineConfigDir())!);
    } else {
      return res;
    }
  }
  public async updateFromOnline(): Promise<ITreeNode[]> {
    return new Promise(resolve => {
      file.mkdir(file.onlineDir());
      this.executeRequest(
        file.onlineConfigSrc(),
        file.onlineConfigDir(),
        () => {
          resolve(JSON.parse(file.data(file.onlineConfigDir())!));
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

  public refreshTreeNodes(state: number, path: string, template: string): void;
  public refreshTreeNodes(
    state: number,
    path: string,
    templates: string[]
  ): void;
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
        item.name === arg ? { ...item, ...{ state } } : item
      );
    }
    if (Object.prototype.toString.call(arg) === "[object Array]") {
      result = JSON.parse(data).map((item: ITreeNode) =>
        arg.includes(`${item.name}.${item.extname}`)
          ? { ...item, ...{ state } }
          : item
      );
    }
    file.write(path, JSON.stringify(result));
  }

  public addSource(path: string): void {
    const data = file.data(path);
    data && file.write(file.localFile(file.fullname(path)), data);
  }

  public async listLocalTreeNodes(): Promise<ILocalTreeNode[]> {
    // 1. 校检文件是否发生改变
    const files = file.listFile(file.localDir());
    if (files && files.length) {
      this.updateLocalConfig(files.filter(item => item !== "config.json"));
    }
    // 2. 读取配置文件，并返回
    const data = file.data(file.localConfigDir());
    return data ? JSON.parse(data) : [];
  }
  private updateLocalConfig(files: string[]): void {
    file.write(
      file.localConfigDir(),
      JSON.stringify(files.map(value => {
        return {
          name: value
        };
      }))
    );
  }
  public async downloadExecute<
    T extends Promise<void> | Promise<void[]> | void
  >(chain: T[]): Promise<void> {
    for (const cb of chain) {
      await cb;
    }
  }
}
export const templateExecutor: TemplateExecutor = new TemplateExecutor();
