import { Model } from "./model";
import { IMineLibrary } from "../library";

export class MineModel extends Model {
  private _path: string;
  get path() {
    return this._path;
  }

  constructor(model: IMineLibrary) {
    super(model.name, model.extname);

    this._path = model.path;
  }

  isTemplate() {
    return true;
  }
}
