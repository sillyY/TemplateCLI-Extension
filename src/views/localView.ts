import { ViewBase } from "./viewBase";
import { LocalNode } from "./node/localNode";
import { Container } from "../container";
import Library from "../library";
import { configuration } from "../services/configuration";
import { commands } from "vscode";

export class LocalView extends ViewBase<LocalNode> {
  constructor() {
    super("template.views.local");
  }

  get library() {
    return this._library;
  }

  getRoot() {
    return new LocalNode(this);
  }

  protected registerCommands() {
    void Container.viewCommands;

    commands.registerCommand(this.getQualifiedCommand("load"), () => {
      this.load(true);
    });

    commands.registerCommand(this.getQualifiedCommand("refresh"), () => {
      this.refresh(true);
    });
  }

  async load(reset: boolean = true) {
    if (this._root !== undefined && this._root.refresh !== undefined) {
      await this._root.load(reset);
    }

    this.triggerNodeChange();
  }

  protected onConfigurationChange() {
    this.initialize("explorer");
    this.initLibrary();
  }

  protected initLibrary() {
    this._library = new Library(this, configuration.localLibraryConfigFile());
  }
}
