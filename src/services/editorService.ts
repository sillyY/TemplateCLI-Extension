import {
  TextEditor,
  window,
  TextEditorEdit,
  Position,
  Disposable,
  Uri,
  WorkspaceFolder,
  workspace,
  OpenDialogOptions
} from "vscode";

export class EditorService implements Disposable {
  private readonly _disposable: Disposable;

  private _editor: TextEditor | undefined;
  get editor() {
    return this._editor;
  }

  constructor() {
    this._editor = window.activeTextEditor;
  }

  dispose() {
    this._disposable && this._disposable.dispose();
  }
  /**
   * @description: 插入模板数据到当前编辑器
   * @param {string} data  模板数据
   */
  async insert(data: string) {
    try {
      if (!this._editor) {
        console.error("Failed to found Editor. Please open the Editor.");
        return;
      }

      this._editor.edit((builder: TextEditorEdit) => {
        builder.insert(
          new Position(
            this._editor!.selection.end.line,
            this._editor!.selection.end.character
          ),
          data
        );
      });
    } catch (error) {
      console.log(error);
    }
  }

  async load(fsPath?: string): Promise<Uri[] | undefined> {
    const defaultUri: Uri | undefined = this.getBelongingWorkspaceFolderUri(
      fsPath
    );
    const options: OpenDialogOptions = {
      defaultUri,
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: true,
      openLabel: "Select"
    };

    return await window.showOpenDialog(options);
  }

  private getBelongingWorkspaceFolderUri(
    fsPath: string | undefined
  ): Uri | undefined {
    let defaultUri: Uri | undefined;
    if (fsPath) {
      const workspaceFolder:
        | WorkspaceFolder
        | undefined = workspace.getWorkspaceFolder(Uri.file(fsPath));
      if (workspaceFolder) {
        defaultUri = workspaceFolder.uri;
      }
    }
    return defaultUri;
  }
}
