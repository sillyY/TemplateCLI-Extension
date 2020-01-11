import { EventEmitter, Event, Disposable } from "vscode";
import { file, requestAndSave } from "./utils";
import { REMOTE_URL } from "./views/node/onlineNode";
import { View } from "./views/viewBase";
import { LanguageType } from "./model/model";
import { OnlineView } from "./views/onlineView";

export interface IOnlineLibrary {
  id: string;
  name: string;
  category: string;
  description: string;
  state: number;
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

  private _onDidExistFileChange = new EventEmitter<void>();
  get onDidExistFileChange(): Event<void> {
    return this._onDidExistFileChange.event;
  }

  constructor(view: View, dst: string) {
    this._view = view;

    this._disposable = Disposable.from(
      this.onDidOnlineChange(this.onLibraryChanged, this),
      this.onDidLocalChange(this.onLibraryChanged, this),
      this.onDidMineChange(this.onLibraryChanged, this),
      this.onDidExistFileChange(this.onExistFileChanged, this)
    );

    setImmediate(() => this.initialize(dst));
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

  private _canModify: boolean = false;
  protected get canModify(): boolean {
    return this._canModify;
  }
  protected set canModify(value: boolean) {
    if (this._canModify === value) return;
    this._canModify = value;
  }

  initialize(dst: string) {
    this._dst = dst;
    file.mkdir(file.dirname(dst));
    this._remote = REMOTE_URL;
    this.setLibrary();
    this.fireExistFileChanged();
  }

  setLibrary() {
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
    this._canModify = false;
  }

  async fetchLibrary() {
    await requestAndSave(this._remote, this._dst);
  }
  fireExistFileChanged() {
    this._onDidExistFileChange.fire();
  }
  onExistFileChanged() {
    if (!(this._view instanceof OnlineView)) return;
    const files = this.getExistFile();

    const libraries = this.getNewLibries(files);
    this._canModify && this.triggerChange(libraries);
    this.setLibrary();
  }

  /**
   * @description: 检测库文件是否与库里文件数据一致
   * @param {string[]} files 库文件列表
   * @return: 新库config数据
   */
  getNewLibries(files: string[]): IOnlineLibrary[] {
    return this._libraries.map((l: IOnlineLibrary) => {
      if (files.length === 0 && l.state === 1) {
        this._canModify = true;
        return { ...l, ...{ state: 2 } };
      }
      if (files.includes(`${l.name}${l.extname}`)) {
        this._canModify = true;
        return { ...l, ...{ state: 1 } };
      }
      return l;
    });
  }
  /**
   * @description: 检查库文件是否存在
   */
  private getExistFile() {
    const files = file.listFile(file.dirname(this._dst));
    return files && files.length
      ? files.filter(name => name !== "config.json")
      : [];
  }
}

export default Library;
