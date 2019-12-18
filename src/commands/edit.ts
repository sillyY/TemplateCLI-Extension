import * as vscode from "vscode";
import * as download from "./download";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";
import { LocalTemplateNode } from "../explorer/local/LocalTemplateNode";
import { TemplateNode } from "../explorer/online/TemplateNode";
import { file } from "../utils/fileUtils";
import { localTemplateTreeDataProvider } from "../explorer/local/LocalTemplateTreeDataProvider";
import { templateExecutor } from "../templateExecutor";
import { TemplateState } from "../shared";
import { templateTreeDataProvider } from "../explorer/online/TemplateTreeDataProvider";

export async function onlineEdit(node: TemplateNode) {
  try {
    // 1. 读取在线文件数据
    const name = node.name + node.extname,
      data = file.data(file.onlineFile(name));

    // 2. 在线本地不存在，加载网络资源
    if (!data) {
      download.installOneTemplate(node);

      return onlineEdit(node);
    }

    // 3. 创建本地副本
    file.mkdir(file.localDir());
    file.write(file.localFile(name), data);

    // 4. 调整本地config 文件
    let config = file.data(file.localConfigDir());
    if (config) {
      config = JSON.parse(config).push({ name });
      file.write(file.localConfigDir(), JSON.stringify(config));
    }
    localTemplateTreeDataProvider.refresh();

    // 5. 打开本地副本文件
    vscode.window.showTextDocument(vscode.Uri.file(file.localFile(name)));
  } catch (err) {
    await promptForOpenOutputChannel(
      "Failed to edit templates. Please open the output channel for details.",
      DialogType.error
    );
  }
}

export async function localEdit(node: LocalTemplateNode) {
  try {
    vscode.window.showTextDocument(
      vscode.Uri.file(file.localFile(node.fullname))
    );
  } catch (err) {
    await promptForOpenOutputChannel(
      "Failed to edit templates. Please open the output channel for details.",
      DialogType.error
    );
  }
}
