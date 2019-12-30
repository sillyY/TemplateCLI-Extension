import { EventEmitter, Event } from "vscode";
// import { ViewNode } from "./views/node";

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
export interface ILibraryChange {
  path: string;
  library: IOnlineLibrary | ILocalLibrary | IMineLibrary;
}

class Library {
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

  fireOnlineChanged(data: ILibraryChange) {
    this._onDidOnlineChange.fire(data);
  }

  fireLocalChanged(data: ILibraryChange) {
    this._onDidLocalChange.fire(data);
  }

  fireMineChanged(data: ILibraryChange) {
    this._onDidMineChange.fire(data);
  }
  triggerChange(
    path: string,
    library: IOnlineLibrary | ILocalLibrary | IMineLibrary
  ) {
    if ("id" in library) {
      this.fireOnlineChanged({
        path,
        library
      });
    } else if ("path" in library) {
      this.fireMineChanged({
        path,
        library
      });
    } else {
      this.fireLocalChanged({
        path,
        library
      });
    }
  }
}

export const library = new Library();
