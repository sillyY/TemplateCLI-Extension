import { ExtensionContext } from "vscode";
import { OnlineView } from "./views/onlineView";
import { TemplateService } from "./services/templateService";
import { EditorService } from "./services/editorService";
import { ViewCommands } from "./views/viewCommands";
import { LocalView } from "./views/localView";
import { MineView } from "./views/mineView";
export class Container {
  private static _content: ExtensionContext;
  static get content() {
    return this._content;
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
  
  private static _onlineView: OnlineView;
  static get onlineView() {
    return this._onlineView;
  }

  private static _localView: LocalView;
  static get localView() {
    return this._localView
  }

  private static _mineView: MineView;
  static get mineView() {
    return this._mineView
  }

  static initialize(content: ExtensionContext) {
    this._content = content;

    content.subscriptions.push((this._template = new TemplateService()));
    content.subscriptions.push((this._editor = new EditorService()));

    content.subscriptions.push((this._onlineView = new OnlineView()));

    content.subscriptions.push((this._localView = new LocalView()))
    
    content.subscriptions.push((this._mineView = new MineView()))
  }
}
