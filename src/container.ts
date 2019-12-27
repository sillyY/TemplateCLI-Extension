import { ExtensionContext } from "vscode";
import { OnlineView } from "./views/onlineView";
export class Container {
  private static _content: ExtensionContext;
  static get content(): ExtensionContext {
    return this._content;
  }

  private static _onlineView: unknown
  static get onlineView():  unknown {
      return this._onlineView
  }

  static initialize(content: ExtensionContext) {
    this._content = content

    content.subscriptions.push((this._onlineView = new OnlineView()))
  }
}