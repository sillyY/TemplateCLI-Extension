import * as vscode from "vscode";
import { TemplateNode } from "../explorer/templateNode";
import { templateExecutor } from "../templateExecutor";
import { file } from "../utils/fileUtils";
import { TemplateState } from "../shared";
import {  refreshTreeNodes } from "./list";
import { templateTreeDataProvider } from "../explorer/templateTreeDataProvider";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";

export async function insertTemplate(node?: TemplateNode): Promise<void> {
  if (!node) return;

  await insertTemplateInternal(node);
}

export async function insertTemplateInternal(
  node: TemplateNode
): Promise<void> {
  try {
    let result: string;
    const res = file.data(file.onlineFile(node.slug));
    if (res) {
      result = res;
    } else {
      file.mkdir(file.onlineDir());
      templateExecutor.executeRequest(
        file.onlineTemplateSrc(node),
        file.onlineDir() + "/" + "/" + node.slug + "." + node.lan,
        async () => {
          result = file.data(file.onlineFile(node.slug + '.' + node.lan))!;
          refreshTreeNodes(TemplateState.Install, node.slug);
          const editor = vscode.window.activeTextEditor;
          if (!editor) {
            // FIXME: 加入提示语
            return; // No open text editor
          }
          const selection = editor.selection;
          editor.edit(builder => {
            builder.insert(
              new vscode.Position(selection.end.line, selection.end.character),
              result
            );
          });
          templateTreeDataProvider.refresh();
        }
      );
    }
  } catch (err) {
    await promptForOpenOutputChannel("Failed to insert templates. Please open the output channel for details.", DialogType.error);
  }
}

// // export function setTemplateState(node: ITreeNode, state: number) {
// //   // TODO: 优化该函数代码
// //   const { id, fid, name, category, slug, lan, language } = node;
// //   refreshTreeNodes(
// //     new TemplateNode({ id, fid, name, category, slug, lan, language, state })
// //   );
// // }

// export function setTemplateState1(slug: string, state: number) {
//   refreshTreeNodes1(slug, state)
// }
