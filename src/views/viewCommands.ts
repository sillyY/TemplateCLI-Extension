import { commands } from "vscode";

export class ViewCommands {
  constructor() {
    commands.registerCommand(
      "template.views.insert",
      (fn: <R>() => Promise<R>) => fn(),
      this
    );
    commands.registerCommand("template.view.edit", this.edit, this);
    commands.registerCommand("template.view.like", this.like, this);
    commands.registerCommand("template.view.unlike", this.unlike, this);
  }
  private async edit() {}
  private async like() {}
  private async unlike() {}
}
