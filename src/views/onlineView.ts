import { ViewBase } from "./viewBase";
import { OnlineNode } from "./node/onlineNode";
import Library from "../library";
import { configuration } from "../services/configuration";

export class OnlineView extends ViewBase<OnlineNode> {
  constructor() {
    super("template.views.online");
  }

  get library() {
    return this._library;
  }

  getRoot() {
    return new OnlineNode(this);
  }
  protected registerCommands() {}

  protected onConfigurationChange() {
    this.initialize("explorer");

    this.initLibrary();
  }

  protected initLibrary() {
    this._library = new Library(this, configuration.onlineFolder());
  }
}
