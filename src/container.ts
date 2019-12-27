import { ExtensionContext } from "vscode";
import { OnlineView } from "./views/onlineView";
import { TemplateService } from "./template/templateService";
export class Container {
  private static _content: ExtensionContext;
  static get content(): ExtensionContext {
    return this._content;
  }

  private static _onlineView: OnlineView
  static get onlineView():  OnlineView {
      return this._onlineView
  }

  private static _template: TemplateService;
  static get template(): TemplateService {
    return this._template
  }

  static initialize(content: ExtensionContext) {
    this._content = content

    content.subscriptions.push((this._template = new TemplateService()))

    content.subscriptions.push((this._onlineView = new OnlineView()))
  }
}
