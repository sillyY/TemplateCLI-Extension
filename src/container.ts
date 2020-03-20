import { ExtensionContext } from "vscode";
import { Configuration } from "./services";
import { TemplateView } from "./views/view";
import { SettingsWebview } from "./webviews/settingsWebview";

export class Container {
  private static _context: ExtensionContext;
  static get context() {
    return this._context;
  }

  private static _view: TemplateView;
  static get view() {
    return this._view;
  }

  private static _configuration: Configuration;
  static get configuration() {
    return this._configuration;
  }

  private static _settingsview: SettingsWebview;
  static get settingsview() {
    return this._settingsview;
  }

  static initialize(context: ExtensionContext) {
    this._context = context;

    context.subscriptions.push((this._configuration = new Configuration()));

    context.subscriptions.push(
      (this._view = new TemplateView("template.view"))
    );

    context.subscriptions.push((this._settingsview = new SettingsWebview()));
  }
}
