import { Disposable } from "vscode";import { file } from "../utils";
import { Online } from "../models/online";

export class TemplateService implements Disposable {
  private readonly _disposable: Disposable;

  private id

  constructor() {
    // this._disposable = Disposable.from(
    //   library.onDidOnlineChange(this.onLibraryChanged, this),
    //   library.onDidLocalChange(this.onLibraryChanged, this),
    //   library.onDidMineChange(this.onLibraryChanged, this)
    // );
  }
  dispose() {
    this._disposable && this._disposable.dispose();
  }
  static async initialize(): Promise<void> {
    // this._path = path
  }
  async getOnlineTemplates(): Promise<any[]> {
    const templateTree = await this.fetchOnlineTemplates();
    console.log(templateTree)
    
    return []
  }

  async fetchOnlineTemplates() {
    
  }

  private onLibraryChanged({ path, library }) {
    file.mkdir(file.dirname(path));
    file.write(path, JSON.stringify(library));
  }
}
