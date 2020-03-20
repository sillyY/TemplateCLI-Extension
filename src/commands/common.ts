import { Disposable } from "vscode";

export enum Commands {}

export abstract class Command implements Disposable {
  private _disposable: Disposable;
  
  constructor() {}
  dispose() {
    this._disposable && this._disposable.dispose()
  }
}
