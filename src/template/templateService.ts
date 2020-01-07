import { Disposable,  EventEmitter, Event } from "vscode";

export class TemplateService implements Disposable {
  private readonly _disposable: Disposable;

  private _onDidChangeTemplates = new EventEmitter<void>();
  get onDidChangeTemplates(): Event<void> {
    return this._onDidChangeTemplates.event;
  }

  dispose() {
    this._disposable && this._disposable.dispose();
  }
  constructor() {}

  private fireTemplatesChanged() {
    this._onDidChangeTemplates.fire();
  }

  consoleFire() {
    this.fireTemplatesChanged()
  }
}
