import * as path from "path";
import { workspace, WorkspaceConfiguration, Disposable } from "vscode";

export class Configuration implements Disposable {
  // TODO: onDidChangeConfiguration 配置项监听事件
  // 后续dispose注入
  private getWorkspaceConfiguration(): WorkspaceConfiguration {
    return workspace.getConfiguration("template");
  }
  private getWorkspaceFolder(): string {
    return this.getWorkspaceConfiguration().get<string>("workspaceFolder", "");
  }
  private getAppFolder(): string {
    return this.getWorkspaceConfiguration().get<string>("appFolder", "");
  }

  private userHomeFolder(): string {
    return process.env.HOME || process.env.USERPROFILE || "";
  }

  dispose() {}
  /**
   * @description: 获取插件首页目录
   * @return: 插件首页目录-带隐藏.tl
   */
  public homeFolder(): string {
    return path.join(this.getWorkspaceFolder() || this.userHomeFolder(), ".tl");
  }

  /**
   * @description: 获取插件首页目录
   * @return: 插件首页目录-不带隐藏.tl
   */
  public appFolder(): string {
    return path.join(
      this.homeFolder(),
      this.getAppFolder() || "template-library"
    );
  }
}
