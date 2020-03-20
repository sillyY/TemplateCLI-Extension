import * as path from "path";
import { Container } from "../container";
import { IpcMessage } from "../webviews/webviewBase";
import { win, fs } from "./index";

class Helper {
  handler(cmd, data) {
    return this[cmd](data);
  }

  defaultMsg() {
    return {
      cmd: "vscode_callback",
      cbid: "",
      data: "操作成功"
    };
  }
  async uploadFile(data): Promise<IpcMessage> {
    const filedata = fs.getFileText(data);
    const basename = path.basename(data);
    const extname = path.extname(basename).substr(1);

    await fs.createAndInsertFile(
      Container.configuration.appFolder() + "/" + extname + "/" + basename,
      filedata
    );

    Container.view.triggerNodeChange();
    win.showInformationMessage("🎉上传文件成功");

    return this.defaultMsg();
  }

  async addSource(data): Promise<IpcMessage> {
    const { content, name } = data;

    const basename = path.basename(name);
    const extname = path.extname(basename).substr(1);

    await fs.createAndInsertFile(
      Container.configuration.appFolder() + "/" + extname + "/" + basename,
      content.replace(/<br\/>/g, "\n").replace(/&nbsp;/g, " ")
    );

    Container.view.triggerNodeChange();
    win.showInformationMessage("🎉导入文件成功");

    return this.defaultMsg();
  }
}

export const helper = new Helper();
