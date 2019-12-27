import { Disposable } from "vscode";
import { library } from "../library";
import { file } from "../utils";

export class TemplateService implements Disposable {
  private readonly _disposable: Disposable;

  constructor() {
    this._disposable = Disposable.from(
      library.onDidOnlineChange(this.onLibraryChanged, this),
      library.onDidLocalChange(this.onLibraryChanged, this),
      library.onDidMineChange(this.onLibraryChanged, this)
    );
  }
  dispose() {
    this._disposable && this._disposable.dispose();
  }
  static async initialize(): Promise<void> {
    // this._path = path
  }

  private onLibraryChanged({ path, library }) {
    file.mkdir(file.dirname(path));
    file.write(path, JSON.stringify(library));
  }
}
