import { ViewBase } from "./viewBase";
import { MineNode } from "./node/MineNode";
import { Container } from "../container";
import Library from "../library";
import { configuration } from "../services/configuration";
import { commands } from "vscode";

export class MineView extends ViewBase<MineNode> {
  constructor() {
    super("template.views.mine");
  }

  get library() {
    return this._library;
  }

  getRoot() {
    return new MineNode(this);
  }

  protected registerCommands() {
    void Container.viewCommands;

    commands.registerCommand(this.getQualifiedCommand("refresh"), () => {
      this.refresh(true);
    });
  }

  protected onConfigurationChange() {
    this.initialize("explorer");
    this.initLibrary();
  }

  protected initLibrary() {
    this._library = new Library(this, configuration.mineLibraryConfigFile());
  }
}
