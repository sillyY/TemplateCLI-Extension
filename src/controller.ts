import { ExtensionContext } from "vscode";
import { file } from "./utils";
import ConfigManager from "./services/configService";
import { Config } from "./config";
import { OnlineView } from "./views/onlineView";

export class Controller {
  static initialize(context: ExtensionContext, config: Config) {
    this._context = context;
    this._config = config

    context.subscriptions.push(
      (this._onlineConfigService = new ConfigManager(file.onlineConfigDir()))
    );
    context.subscriptions.push(
      (this._localConfigService = new ConfigManager(file.localConfigDir()))
    );
    context.subscriptions.push(
      (this._mineConfigService = new ConfigManager(file.mineConfigDir()))
    );

    if(config.views.online.enabled) {
        context.subscriptions.push(this._onlineView = new OnlineView())
    }
  }

  private static _context: ExtensionContext;
  static get context() {
    return this._context;
  }

  private static _config: Config;
  static get config() {
      return this._config
  }

  private static _onlineConfigService: ConfigManager;
  static get onlineConfigService() {
    return this._onlineConfigService;
  }

  private static _localConfigService: ConfigManager;
  static get localConfigService() {
    return this._localConfigService;
  }

  private static _mineConfigService: ConfigManager;
  static get mineConfigService() {
    return this._mineConfigService;
  }

  private static _onlineView: OnlineView | undefined;
  static get onlineView() {
      if(this._onlineView === void 0) {
          this._context.subscriptions.push((this._onlineView = new OnlineView()))
      }
      return this._onlineView
  }
}
