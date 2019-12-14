import * as vscode from "vscode";
import { TemplateNode } from "../explorer/online/TemplateNode";
import { file } from "../utils/fileUtils";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";
import { LocalTemplateNode } from "../explorer/local/LocalTemplateNode";
import * as download from "./download";
import { templateExecutor } from "../templateExecutor";
import { TemplateState } from "../shared";
import { templateTreeDataProvider } from "../explorer/online/TemplateTreeDataProvider";

async function onlineInsert(node: TemplateNode) {
  const res = file.data(file.onlineFile(node.fullname));
  if (res) return insertEditor(res);

  // 1. 下载文件
  await download.install(
    [node],
    file.onlineTemplateSrc.bind(file),
    file.onlineDir()
  );

  // 2. 更新config
  await templateExecutor.refreshTreeNodes(
    TemplateState.Install,
    file.onlineConfigDir(),
    [node.fullname]
  );

  // 3. 更新Extension状态
  templateTreeDataProvider.refresh();

  return onlineInsert(node);
}

async function localInsert(node: LocalTemplateNode) {
  const res = file.data(file.localFile(node.fullname));
  if (res) return insertEditor(res);
}

export async function insertTemplate(
  node?: TemplateNode | LocalTemplateNode
): Promise<void> {
  if (!node) return;

  if (node instanceof TemplateNode) return await onlineInsert(node);
  if (node instanceof LocalTemplateNode) return await localInsert(node);
}

export async function insertEditor(data: string) {
  try {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      await promptForOpenOutputChannel(
        "Failed to found Editor. Please open the Editor.",
        DialogType.warning
      );
      return; // No open text editor
    }
    editor.edit(builder => {
      builder.insert(
        new vscode.Position(
          editor.selection.end.line,
          editor.selection.end.character
        ),
        data
      );
    });
  } catch (err) {
    await promptForOpenOutputChannel(
      "Failed to insert templates. Please open the output channel for details.",
      DialogType.error
    );
  }
}
