import { ViewBase } from "./viewBase";
import { OnlinesNode } from "./node/onlinesNode";
import Library from "../library";
import { configuration } from "../services/configuration";
import { Container } from "../container";
import { commands } from "vscode";

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
  protected registerCommands() {
    void Container.viewCommands;

    commands.registerCommand(this.getQualifiedCommand("refresh"), () =>
      this.refresh(true)
    );
    commands.registerCommand(this.getQualifiedCommand("update"), () => {
      this.update();
    });
    commands.registerCommand(this.getQualifiedCommand("download"), () => {
      this.download();
    });
  }

  protected onConfigurationChange() {
    this.initialize("explorer");

    this.initLibrary();
  }

  protected initLibrary() {
    this._library = new Library(this, configuration.onlineLibraryFile());
  }

  private async update() {
    await this.library.fetchLibrary();
    this.refresh(true);
  }
  private download() {
    this.library.fireExistFileChanged()
    this.refresh(true);
  }
}
