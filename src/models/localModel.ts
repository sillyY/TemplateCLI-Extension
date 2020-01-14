import { Model } from "./model";
import { ILocalLibrary } from "../library";

export class LocalModel extends Model {
  constructor(model: ILocalLibrary) {
    super(model.name, model.extname);
  }

  isTemplate() {
    return true;
  }
}
