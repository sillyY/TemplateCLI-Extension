// import * as vscode from "vscode";
// import { ITreeNode } from "../shared";
import { templateExecutor } from "../templateExecutor";
import { ITreeNode, TemplateState } from "../shared";
import { file } from "../utils/fileUtils";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";

export async function listTreeNodes(): Promise<ITreeNode[]> {
  try {
    const result = await templateExecutor.listTreeNodes();
    const treeNodes: ITreeNode[] = [];
    for (const node of result) {
      if (
        file.exist(file.onlineDir() + "/" + "/" + node.slug + "." + node.lan)
      ) {
        treeNodes.push({
          ...node,
          ...{
            state: TemplateState.Install
          }
        });
      }
      treeNodes.push(node);
    }
    return treeNodes;
  } catch (error) {
    await promptForOpenOutputChannel("Failed to list template's. Please open the output channel for details.", DialogType.error);
    return [];
  }
}
export function refreshTreeNodes(treeItem: ITreeNode): Promise<void> {
  return new Promise((resolve) =>  {
    let config = file.data(file.configDir());
    if (!config) return;
    // TODO: 优化改地方代码
    const { id, fid, name, lan, language, category, slug, state } = treeItem;
    const result = JSON.parse(config).map(item =>
      item.id === treeItem.id && item.language === treeItem.language
        ? { id, fid, name, lan, language, category, slug, state }
        : item
    );
    file.write(file.configDir(), JSON.stringify(result));
    resolve()

  })
}
