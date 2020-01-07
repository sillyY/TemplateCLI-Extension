import { Model } from "./model";

export class CategoryModel extends Model {
  constructor(
    name: string,
    public readonly lang: string,
    public isCategory: boolean = true
  ) {
    super(name, "");

  }

  isLanguage() {
    return false;
  }

  isTemplate() {
    return false;
  }
}
