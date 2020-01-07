import { EventEmitter, Event, Disposable } from "vscode";
import { file } from "./utils";
import { requestAndSave } from "./utils/request";
import { REMOTE_URL } from "./views/node/onlineNode";
import { View } from "./views/viewBase";
import { LanguageType } from "./model/model";

export interface IOnlineLibrary {
  id: string;
  name: string;
  category: string;
  description: string;
  state: string;
  language: string;
  extname: string;
}

export interface ILocalLibrary {
  name: string;
  extname: string;
}
export interface IMineLibrary {
  name: string;
  extname: string;
  path: string;
}
export type ILibraryChange = (IOnlineLibrary | ILocalLibrary | IMineLibrary)[];

class Library<T extends ILibraryChange> implements Disposable {
  private readonly _disposable: Disposable;

  private _onDidOnlineChange = new EventEmitter<ILibraryChange>();
  get onDidOnlineChange(): Event<ILibraryChange> {
    return this._onDidOnlineChange.event;
  }

  private _onDidLocalChange = new EventEmitter<ILibraryChange>();
  get onDidLocalChange(): Event<ILibraryChange> {
    return this._onDidLocalChange.event;
  }

  private _onDidMineChange = new EventEmitter<ILibraryChange>();
  get onDidMineChange(): Event<ILibraryChange> {
    return this._onDidMineChange.event;
  }

  constructor(view: View, dst: string) {
    this._view = view;

    this.initialize(dst);

    this._disposable = Disposable.from(
      this.onDidOnlineChange(this.onLibraryChanged, this),
      this.onDidLocalChange(this.onLibraryChanged, this),
      this.onDidMineChange(this.onLibraryChanged, this)
    );
  }

  private _dst: string;
  get dst() {
    return this._dst;
  }

  private _libraries: T;
  get libraries() {
    return this._libraries;
  }

  private _remote: string;
  get remote() {
    return this._remote;
  }
  private _view: View;
  get view() {
    return this.view;
  }

  initialize(dst: string) {
    this._dst = dst;
    file.mkdir(file.dirname(dst));
    this._remote = REMOTE_URL;
  }

  initLibrary() {
    const data = file.data(this._dst);
    this._libraries = data ? JSON.parse(data) : [];
  }

  dispose() {
    this._disposable && this._disposable.dispose();
  }

  fireOnlineChanged(libraries: IOnlineLibrary[]) {
    this._onDidOnlineChange.fire(libraries);
  }

  fireLocalChanged(libraries: ILocalLibrary[]) {
    this._onDidLocalChange.fire(libraries);
  }

  fireMineChanged(libraries: IMineLibrary[]) {
    this._onDidMineChange.fire(libraries);
  }
  triggerChange(libraries: ILibraryChange) {
    if ("id" in libraries) {
      this.fireOnlineChanged(libraries);
    } else if ("path" in libraries) {
      this.fireMineChanged(libraries);
    } else {
      this.fireLocalChanged(libraries);
    }
  }

  consoleTemp() {
    console.log(this._view);
  }
  /**
   * @description: 根据language 获取categories
   * @param {LanguageType} lang language
   * @return: categories分类
   */
  getCategories(lang: LanguageType): string[] {
    let obj = {};
    this._libraries.forEach((item: IOnlineLibrary) => {
      if (item.language === lang) {
        if (!obj[item.category]) {
          obj[item.category] = true;
        }
        // NOTE: 不存在category，直接通过name 加入
        if (!item.category) {
          obj[item.name] = true;
        }
      }
    });
    return Object.keys(obj);
  }


  private onLibraryChanged(libraries: ILibraryChange) {
    file.write(this._dst, JSON.stringify(libraries));
  }

  async fetchLibrary() {
    await requestAndSave(this._remote, this._dst);
    this.initLibrary();
  }
}

export default Library;
