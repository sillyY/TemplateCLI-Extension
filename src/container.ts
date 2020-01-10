import { ExtensionContext } from "vscode";
import { OnlineView } from "./views/onlineView";
import { TemplateService } from "./template/templateService";
import { EditorService } from "./services/editorService";
import { ViewCommands } from "./views/viewCommands";
export class Container {
  private static _content: ExtensionContext;
  static get content() {
    return this._content;
  }

  private static _onlineView: OnlineView;
  static get onlineView() {
    return this._onlineView;
  }

  private static _template: TemplateService;
  static get template() {
    return this._template;
  }

  private static _editor: EditorService;
  static get editor() {
    return this._editor;
  }

  private static _viewCommands: ViewCommands | undefined;
	static get viewCommands() {
		if (this._viewCommands === undefined) {
			this._viewCommands = new ViewCommands();
		}
		return this._viewCommands;
	}

  static initialize(content: ExtensionContext) {
    this._content = content;

    content.subscriptions.push((this._template = new TemplateService()));
    content.subscriptions.push((this._editor = new EditorService()));

    content.subscriptions.push((this._onlineView = new OnlineView()));
  }
}
