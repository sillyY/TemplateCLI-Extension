import { ViewBase } from "./viewBase";
import { OnlinesNode } from "./node/onlinesNode";
import Library from "../library";
import { configuration } from "../services/configuration";

export class OnlineView extends ViewBase<OnlinesNode> {
  constructor() {
    super("template.views.online");
  }

  get library() {
    return this._library;
  }

  getRoot() {
    return new OnlinesNode(this);
  }
  protected registerCommands() {}

  protected onConfigurationChange() {
    this.initialize("explorer");

    this.initLibrary();
  }

  protected initLibrary() {
    this._library = new Library(this, configuration.onlineLibraryFile());
  }
}
