import * as download from "./download";
import { promptForOpenOutputChannel, DialogType } from "../utils/uiUtils";
import { TemplateNode } from "../explorer/online/TemplateNode";
import { LocalTemplateNode } from "../explorer/local/LocalTemplateNode";
import { file } from "../utils/fileUtils";
import { mineTemplateTreeDataProvider } from "../explorer/mine/MineTemplateTreeDataProvider";
import { MineTemplateNode } from "../explorer/mine/MineTemplateNode";

export async function like(
  node: TemplateNode | LocalTemplateNode,
  getPath: Function
): Promise<any[]> {
  // TODO: 抽离下载在线文件模块
  if (
    node instanceof TemplateNode &&
    !file.exist(file.onlineFile(node.fullname))
  ) {
    download.installOneTemplate(node);
  }

  const config = file.data(file.mineConfigDir());
  if (!config)
    return [{ name: node.fullname, path: getPath.call(file, node.fullname) }];

  // TODO: 优化数组更新机制
  let arr = JSON.parse(config);

  if (!arr.filter(item => item.name === node.fullname).length) {
    arr.push({
      name: node.fullname,
      path: getPath.call(file, node.fullname)
    });
  }

  return arr;
}

export async function addFavorite(node: TemplateNode | LocalTemplateNode) {
  try {
    let data =
      node instanceof TemplateNode
        ? await like(node, file.onlineFile)
        : node instanceof LocalTemplateNode
        ? await like(node, file.localFile)
        : null;
    if (!data) return;

    // 写入config 文件
    file.mkdir(file.mineDir());
    file.write(file.mineConfigDir(), JSON.stringify(data));

    // 更新Extension状态
    mineTemplateTreeDataProvider.refresh();
  } catch (error) {
    await promptForOpenOutputChannel(
      "Failed to add Favorite. Please open the output channel for details.",
      DialogType.error
    );
  }
}

export async function removeFavorite(node: MineTemplateNode) {
  try {
    const config = JSON.parse(file.data(file.mineConfigDir())!);

    file.write(
      file.mineConfigDir(),
      JSON.stringify(config.filter(item => item.name !== node.fullname))
    );
    // 更新Extension状态
    mineTemplateTreeDataProvider.refresh();
  } catch (error) {
    await promptForOpenOutputChannel(
      "Failed to remove Favorite. Please open the output channel for details.",
      DialogType.error
    );
  }
}
