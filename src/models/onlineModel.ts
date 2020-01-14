import { Model } from "./model";
import { IOnlineLibrary } from "../library";

export class OnlineModel extends Model {
  private _id: string;
  get id() {
    return this._id;
  }

  private _category: string;
  get category() {
    return this._category;
  }

  private _description: string;
  get description() {
    return this._description;
  }

  private _state: number;
  get state() {
    return this._state;
  }

  private _language: string;
  get language() {
    return this._language;
  }

  private _parent: IOnlineLibrary | undefined;
  get parent() {
    return this._parent;
  }
  
  constructor(model: IOnlineLibrary, parent?: IOnlineLibrary) {
    super(model.name, model.extname);

    this.initialize(model);

    if (this.parent !== void 0) {
      this._parent = parent;
    }
  }

  initialize(model: IOnlineLibrary) {
    const { id, category, description, state, language } = model;

    this._id = id;
    this._category = category;
    this._description = description;
    this._state = state;
    this._language = language;
  }
  isLanguage() {
    return !!this.name && !!this.description;
  }

  isCategory() {
    return !!(this.category && !this.description);
  }

  isTemplate() {
    return !!this.name && !!this.description;
  }
}
