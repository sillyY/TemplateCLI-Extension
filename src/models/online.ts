import { Disposable } from "vscode";

export class Online implements Disposable {
  private readonly _disposable: Disposable;

  readonly id: string
  readonly name: string
  readonly fullname: string
  readonly category: string
  readonly description: string
  readonly language: string
  readonly extname: string

  constructor() {}

  dispose() {
    this._disposable && this._disposable.dispose();
  }
}
