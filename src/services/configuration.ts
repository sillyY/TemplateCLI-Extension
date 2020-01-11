import * as path from "path";
import { workspace, WorkspaceConfiguration } from "vscode";

class Configuration {
  private getWorkspaceConfiguration(): WorkspaceConfiguration {
    return workspace.getConfiguration("template");
  }
  private getWorkspaceFolder(): string {
    return this.getWorkspaceConfiguration().get<string>("workspaceFolder", "");
  }
  private getAppFolder(): string {
    return this.getWorkspaceConfiguration().get<string>("appFolder", "");
  }
  private getOnlineFolder(): string {
    return this.getWorkspaceConfiguration().get<string>("onlineFolder", "");
  }
  /**
   * @description: 获取当前系统根目录
   * @return: 根目录
   */
  private userHomeFolder(): string {
    return process.env.HOME || process.env.USERPROFILE || "";
  }

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
  /**
   * @description: 获取线上模板库目录路径
   * @return: 线上模板库目录路径
   */
  public onlineFolder(): string {
    return path.join(this.appFolder(), this.getOnlineFolder() || "online");
  }
  /**
   * @description: 获取线上模板库配置文件路径
   * @return: 线上模板库配置文件路径
   */
  public onlineLibraryConfigFile(): string {
    return path.join(this.onlineFolder(), "config.json");
  }

  /**
   * @description: 获取线上模板模板文件路径
   * @return: 线上模板库模板文件路径
   */
  public onlineLibraryFile(surfix: string): string {
    return path.join(this.onlineFolder(), surfix);
  }
}

export const configuration = new Configuration();
