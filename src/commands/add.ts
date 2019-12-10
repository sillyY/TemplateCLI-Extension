import * as vscode from "vscode";
import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";
import { templateExecutor } from "../templateExecutor";

import { file } from "../utils/fileUtils";

export async function addTemplate(): Promise<void> {
  try {
    const res: vscode.Uri[] | undefined = await vscode.window.showOpenDialog({
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: true,
      openLabel: "Select"
    });
    if (!res || !res.length) return;
    // generate local file
    file.mkdir(file.localDir());
    await Promise.all(res.map(item => templateExecutor.addSource(item.path)));

    // generate local config.json
    file.write(
      file.localConfigDir(),
      JSON.stringify(
        res.map((item: vscode.Uri) => {
          return {
            name: file.basename(item.path)
          };
        })
      )
    );
  } catch (err) {
    await promptForOpenOutputChannel(
      "Failed to add templates. Please open the output channel for details.",
      DialogType.error
    );
  }
}
