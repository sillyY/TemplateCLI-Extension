import { DialogType, promptForOpenOutputChannel } from "../utils/uiUtils";
import { file } from "../utils/fileUtils";
import { templateExecutor } from "../templateExecutor";
import { templateTreeDataProvider } from "../explorer/online/TemplateTreeDataProvider";
import { TemplateState } from "../shared";

export async function downloadTemplate(): Promise<void> {
  try {
    const data = JSON.parse(file.data(file.configDir())!);
    if (data) {
      file.mkdir(file.onlineDir());

      let chain: Promise<void>[] = [];
      for (const treeItem of data) {
        chain.push(
          new Promise(resolve => {
            templateExecutor.executeRequest(
              file.onlineTemplateSrc(treeItem),
              file.onlineDir() + "/" + "/" + treeItem.slug + "." + treeItem.lan,
              async () => {
                resolve();
              }
            );
          })
        );
      }
      await Promise.all(chain);
      await templateExecutor.refreshTreeNodes(
        TemplateState.Install,
        file.configDir(),
        data.map(item => `${item.slug}.${item.lan}`)
      );
      templateTreeDataProvider.refresh();
    }
  } catch (err) {
    await promptForOpenOutputChannel(
      "Failed to download templates. Please open the output channel for details.",
      DialogType.error
    );
  }
}
