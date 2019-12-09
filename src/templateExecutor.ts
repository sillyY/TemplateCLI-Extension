import { Disposable } from "vscode";
import * as request from "request";
import * as fs from "fs";
import { refreshTreeNodes } from "./commands/list";
import { file } from "./utils/fileUtils";
import { ITreeNode, TemplateState } from "./shared";

// import * as path from "path";
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
      refreshTreeNodes(TemplateState.Install, files);
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
}
export const templateExecutor: TemplateExecutor = new TemplateExecutor();
