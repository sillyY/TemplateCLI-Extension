import { Disposable } from "vscode";
import * as request from "request";
import * as fs from "fs";
import { file } from "./utils/fileUtils";

// import * as path from "path";
class TemplateExecutor implements Disposable {
  public dispose(): void {}

  public listTreeNodes(): any {
    return new Promise(resolve => {
      console.log("initializing all templates");
      // 1. find template config
      const config = file.data(file.configDir());
      // FIXME: config 不存在情况下
      if (config) {
        resolve(JSON.parse(config));
      } else {
        file.mkdir(file.appDir());
        this.executeRequest(
          file.onlineConfigSrc(),
          file.pluginFile(file.configDir()),
          () => {
            resolve(JSON.parse(file.data(file.configDir())!));
          }
        );
      }
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
