import { commands } from "vscode";

export class ViewCommands {
  constructor() {
    commands.registerCommand("template.view.insert", this.insert, this);
    commands.registerCommand("template.view.edit", this.edit, this);
    commands.registerCommand("template.view.like", this.like, this);
    commands.registerCommand("template.view.unlike", this.unlike, this);
  }
  private async insert() {}
  private async edit() {}
  private async like() {}
  private async unlike() {}
}
