import { ILocalTreeNode } from "../../shared";
import { Command } from "vscode";

export class LocalTemplateNode {
  constructor(private data: ILocalTreeNode) {}

  public get name(): string {
    return this.data.name;
  }
  public get extname(): string {
    return this.data.extname;
  }

  public get insertCommand(): Command {
    return {
      title: "Insert Code",
      command: "template.insertLocalTemplate",
      arguments: [this]
    };
  }
}
