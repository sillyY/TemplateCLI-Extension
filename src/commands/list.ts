import * as vscode from "vscode";
// import { ITreeNode } from "../shared";
import { templateExecutor } from "../templateExecutor";
import { ITreeNode, TemplateState } from "../shared";
import { file } from "../utils/fileUtils";

export async function listTreeNodes(): Promise<ITreeNode[]> {
  try {
    const templateConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(
      "template"
    );
    console.log("templateConfig: ", templateConfig);

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
    // TODO: ERROR catch
    console.log("error: ", error);
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
