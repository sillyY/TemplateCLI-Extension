import {
  workspace,
  Uri,
  FileType,
  window,
  TextEditorEdit,
  Position,
  WorkspaceEdit
} from "vscode";
import { file } from "../utils";
import { win } from "./index";

class FileSystem {
  async getFileOrFolder(fullpath: string): Promise<[string, FileType][]> {
    const data = await workspace.fs.readDirectory(Uri.parse(fullpath));

    return data.length ? data.filter(item => item[0] !== ".DS_Store") : data;
  }

  getFileText(fullpath: string): string {
    const text = file.data(fullpath);
    return text ? text : "";
  }

  async edit(data: string): Promise<void> {
    try {
      // FIXME:
      // Make editor be the active textEditor all the time.
      // because if oepn other file and close
      // will not make the editor be the active textEditor.
      const editor = window.activeTextEditor;

      if (!editor) {
        console.error("Failed to found Editor. Please open the Editor.");
        win.showWarningMessage("未找到编辑窗口，请打开窗口重试!");
        win.setStatusBarMessage("⚠未找到编辑窗口，请打开窗口重试!")
        return;
      }
      editor.edit((builder: TextEditorEdit) => {
        builder.insert(
          new Position(
            editor!.selection.end.line,
            editor!.selection.end.character
          ),
          data
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
  async openText(fullpath: string) {
    return await window.showTextDocument(Uri.file(fullpath));
  }

  async createAndInsertFile(path: string, data: string) {
    // FIXME:
    // if use insert before rename, rename is not work.
    // make workspaceEdit be new Object all the time
    const workspaceEdit = new WorkspaceEdit();

    if (!workspaceEdit) {
      console.error("error");
      return;
    }
    const pathUri = Uri.parse(path);
    await workspaceEdit.createFile(pathUri);
    await workspace.applyEdit(workspaceEdit);
    return file.write(path, data);
    // await workspaceEdit.insert(pathUri, new Position(0, 0), data);
    // const editor = window.activeTextEditor;
    // return editor?.document.save()
  }

  async renameFile(oldPath: string, newPath: string) {
    // FIXME:
    // if use insert before rename, rename is not work.
    // make workspaceEdit be new Object all the time
    const workspaceEdit = new WorkspaceEdit();

    if (!workspaceEdit) {
      console.error("error");
      return;
    }
    workspaceEdit.renameFile(Uri.parse(oldPath), Uri.parse(newPath));
    return workspace.applyEdit(workspaceEdit);
  }

  deleteFile(fullpath: string) {
    return file.remove(fullpath);
  }
}

export const fs = new FileSystem();
