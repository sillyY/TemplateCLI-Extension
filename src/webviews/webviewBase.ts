import {
  Disposable,
  WebviewPanel,
  ViewColumn,
  window,
  Uri,
  workspace,
  commands
} from "vscode";
import * as path from "path";
import { Container } from "../container";

export interface IpcMessage {
  cbid: string;
  cmd: string;
  data: any;
}

export abstract class WebViewBase implements Disposable {
  protected _disposable: Disposable;
  private _disposablePanel: Disposable | undefined;
  private _panel: WebviewPanel | undefined;

  constructor(showCommand: string, private readonly _column?: ViewColumn) {
    this._disposable = Disposable.from(
      commands.registerCommand(showCommand, this.onShowCommand, this)
    );
  }

  abstract get filepath(): string;
  abstract get dirpath(): string;
  abstract get id(): string;
  abstract get title(): string;

  protected onShowCommand() {
    this.show(this._column);
  }

  abstract onMessageReceived(e: IpcMessage);

  private onMessageReceivedCore(e: IpcMessage) {
    if (e == null) return;

    this.onMessageReceived(e);
  }

  async show(column: ViewColumn = ViewColumn.Active): Promise<void> {
    const html = await this.getHtml();

    if (this._panel === void 0) {
      this._panel = window.createWebviewPanel(
        this.id,
        this.title,
        {
          viewColumn: column,
          preserveFocus: false
        },
        {
          retainContextWhenHidden: true,
          enableFindWidget: true,
          enableCommandUris: true,
          enableScripts: true
        }
      );
      this._panel.iconPath = Uri.file(
        Container.context.asAbsolutePath("resources/icon.png")
      );
      this._disposablePanel = Disposable.from(
        this._panel,
        this._panel.onDidDispose(this.onPanelDisposed, this),
        this._panel.webview.onDidReceiveMessage(
          this.onMessageReceivedCore,
          this
        )
      );

      this._panel.webview.html = html;
    } else {
      this._panel.webview.html = "";
      this._panel.reveal(this._panel.viewColumn || ViewColumn.Active, false);
    }
  }

  private _html: string | undefined;
  private async getHtml(): Promise<string> {
    let content;

    if (this._html !== void 0) return this._html;

    const doc = await workspace.openTextDocument(this.filepath);
    content = doc.getText();

    let html = content.replace(
      /(<link.+?href="|<script.+?src="|<img.+?src=")(.+?)"/g,
      //@ts-ignore
      (m, $1, $2) => {
        if ($2.substr(0, 2) == "//" || $2.substr(0, 5) == "https")
          return $1 + $2 + '"';
        return (
          $1 +
          Uri.file(path.join(this.dirpath, $2))
            .with({ scheme: "vscode-resource" })
            .toString() +
          '"'
        );
      }
    );

    this._html = html;
    return html;
  }

  dispose() {
    this._disposable && this._disposable.dispose();
    this._disposablePanel && this._disposablePanel.dispose();
  }

  private onPanelDisposed() {
    this._disposablePanel && this._disposablePanel.dispose();
    this._panel = undefined;
  }

  public postMessage(message: IpcMessage) {
    if (this._panel === undefined) return Promise.resolve(false);
    return this._panel.webview.postMessage(message);
  }
}
