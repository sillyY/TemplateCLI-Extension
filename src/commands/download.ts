import { DialogType, promptForOpenOutputChannel, file } from "../utils";
import { TemplateState, ITreeNode } from "../shared";
import { templateChannel } from "../templateChannel";
import { templateExecutor } from "../templateExecutor";
import { TemplateNode } from "../explorer/online/TemplateNode";
import { templateTreeDataProvider } from "../explorer/online/TemplateTreeDataProvider";

export async function install(
  data: ITreeNode[],
  getPath: Function,
  dir: string
): Promise<void[]> {
  let promises: Promise<void>[] | null = [];
  for (const treeItem of data) {
    promises.push(
      new Promise((resolve, reject) => {
        try {
          templateExecutor.executeRequest(
            getPath(treeItem),
            `${dir}/${treeItem.name}${treeItem.extname}`,
            async () => {
              resolve();
            }
          );
        } catch (error) {
          reject(error);
        }
      })
    );
  }
  return await Promise.all(promises);
}

export async function downloadTemplate(): Promise<void> {
  try {
    const data = JSON.parse(file.data(file.onlineConfigDir())!);
    if (!data || !data.length) return;

    // 1. 检查文件是否存在
    file.mkdir(file.onlineDir());

    let chain: (Promise<void> | Promise<void[]> | void)[] | null = [];

    // 2. 下载数据
    chain.push(install(data, file.onlineTemplateSrc, file.onlineDir()));

    // 3. 更新配置文件
    chain.push(
      templateExecutor.refreshTreeNodes(
        TemplateState.Install,
        file.onlineConfigDir(),
        JSON.parse(file.data(file.onlineConfigDir())!).map(
          item => `${item.name}.${item.extname}`
        )
      )
    );

    await templateExecutor.downloadExecute(chain);

    templateTreeDataProvider.refresh();
  } catch (error) {
    templateChannel.appendLine(error)
    await promptForOpenOutputChannel(
      "Failed to download templates. Please open the output channel for details.",
      DialogType.error
    );
  }
}

export async function installOneTemplate(node: TemplateNode): Promise<void> {
  await install([node], file.onlineTemplateSrc.bind(file), file.onlineDir());

  // 2. 更新config
  await templateExecutor.refreshTreeNodes(
    TemplateState.Install,
    file.onlineConfigDir(),
    [node.fullname]
  );

  // 3. 更新Extension状态
  templateTreeDataProvider.refresh();
}
