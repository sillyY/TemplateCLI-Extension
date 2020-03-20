import {
  window,
  WorkspaceFolder,
  workspace,
  Uri,
  OpenDialogOptions
} from "vscode";

class WindowService {
  showInputBox(msg: string) {
    return window.showInputBox({
      password: false, // 输入内容是否是密码
      ignoreFocusOut: false, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
      placeHolder: msg // 在输入框内的提示信息
    });
  }
  showInformationMessage(message: string, ...items: string[]) {
    return window.showInformationMessage(message, ...items);
  }

  showWarningMessage(message: string, ...items: string[]) {
    return window.showWarningMessage(message, ...items);
  }

  setStatusBarMessage(message: string, hideAfterTimeout = 3000) {
    return window.setStatusBarMessage(message, hideAfterTimeout);
  }

  async showOpenDialog(fsPath?: string): Promise<Uri[] | undefined> {
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

export const win = new WindowService();
