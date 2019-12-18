import { IMineTreeNode } from "../../shared";
import { Command } from "vscode";

export class MineTemplateNode {
  constructor(private data: IMineTreeNode) {}

  public get name(): string {
    return this.data.name;
  }
  public get extname(): string {
    return this.data.extname;
  }
  public get path(): string {
    return this.data.path;
  }
  public get fullname(): string {
    return `${this.data.name}.${this.data.extname}`;
  }

  public get removeFavoriteCommand(): Command {
    return {
      title: "Remove Favorite",
      command: "template.removeFavorite",
      arguments: [this]
    };
  }

  public get insertCommand(): Command {
    return {
      title: "Insert Code",
      command: "template.insertTemplate",
      arguments: [this]
    };
  }
}
