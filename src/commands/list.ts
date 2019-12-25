import { DialogType, promptForOpenOutputChannel, file } from "../utils";
import {
  ITreeNode,
  ILocalTreeNode,
  TemplateState,
  IMineTreeNode
} from "../shared";
import { templateChannel } from "../templateChannel";
import { templateExecutor } from "../templateExecutor";

export async function listTreeNodes(): Promise<ITreeNode[]> {
  try {
    return setTreeNodes(await templateExecutor.listTreeNodes());
  } catch (error) {
    templateChannel.appendLine(error)
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
    templateChannel.appendLine(error)
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
    templateChannel.appendLine(error)
    await promptForOpenOutputChannel(
      "Failed to list templates. Please open the output channel for details.",
      DialogType.error
    );
    return [];
  }
}

/// mine

export async function listMineTreeNodes(): Promise<IMineTreeNode[]> {
  try {
    return await templateExecutor.listMineTreeNodes();
  } catch (error) {
    templateChannel.appendLine(error)
    await promptForOpenOutputChannel(
      "Failed to list templates. Please open the output channel for details.",
      DialogType.error
    );
    return [];
  }
}
