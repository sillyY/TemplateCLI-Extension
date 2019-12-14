// import * as vscode from "vscode";
// import { ITreeNode } from "../shared";
import { templateExecutor } from "../templateExecutor";
import { ITreeNode, ILocalTreeNode, TemplateState } from "../shared";
import { file } from "../utils/fileUtils";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";

export async function listTreeNodes(): Promise<ITreeNode[]> {
  try {
    return setTreeNodes(await templateExecutor.listTreeNodes());
  } catch (error) {
    await promptForOpenOutputChannel(
      "Failed to list templates. Please open the output channel for details.",
      DialogType.error
    );
    return [];
  }
}

export async function updateListTreeNodes(): Promise<ITreeNode[]> {
  try {
    return setTreeNodes(await templateExecutor.updateListTreeNodes());
  } catch (error) {
    await promptForOpenOutputChannel(
      "Failed to update templates. Please open the output channel for details.",
      DialogType.error
    );
    return [];
  }
}

function setTreeNodes(result): ITreeNode[] {
  const treeNodes: ITreeNode[] = [];
  for (const node of result) {
    if (file.exist(file.onlineDir() + "/" + node.name + node.extname)) {
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
}

/// local

export async function listLocalTreeNodes(): Promise<ILocalTreeNode[]> {
  try {
    return await templateExecutor.listLocalTreeNodes();
  } catch (error) {
    await promptForOpenOutputChannel(
      "Failed to list templates. Please open the output channel for details.",
      DialogType.error
    );
    return [];
  }
}
