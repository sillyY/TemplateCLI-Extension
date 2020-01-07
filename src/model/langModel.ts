import { Model } from "./model";

export class LangModel extends Model {
  constructor(name: string, public isLanguag: boolean = true) {
    super(name, "");
  }

  isCategory() {
    return false;
  }

  isTemplate() {
    return false;
  }

  getChildren(): LangModel[] {
    return [];
  }

  getTreeItem() {
    return {
      label: this.name
    };
  }
}
