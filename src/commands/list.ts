// import * as vscode from "vscode";
// import { ITreeNode } from "../shared";
import { templateExecutor } from "../templateExecutor";
import { ITreeNode, TemplateState } from "../shared";
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
    if (file.exist(file.onlineDir() + "/" + "/" + node.slug + "." + node.lan)) {
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
export function refreshTreeNodes(state: number, slug: string): void;
export function refreshTreeNodes(state: number, slugs: string[]): void;
export function refreshTreeNodes(state: number, arg: string | string[]): void {
  let result;

  const data = file.data(file.configDir());
  if (!data) return;

  if (typeof arg === "string") {
    result = JSON.parse(data).map(item =>
      item.slug === arg ? { ...item, ...{ state } } : item
    );
  }
  if (Object.prototype.toString.call(arg) === "[object Array]") {
    result = JSON.parse(data).map((item: ITreeNode) =>
      arg.includes(`${item.slug}.${item.lan}`)
        ? { ...item, ...{ state } }
        : item
    );
  }
  file.write(file.configDir(), JSON.stringify(result));
}
