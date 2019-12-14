import { ITreeNode, TemplateState } from "../../shared";
import { Command } from "vscode";

export class TemplateNode {
  constructor(private data: ITreeNode) {}

  public get id(): string {
    return this.data.id;
  }

  public get name(): string {
    return this.data.name;
  }
  public get fullname(): string {
    return `${this.data.name}.${this.data.extname}`;
  }

  public get category(): string {
    return this.data.category;
  }

  public get description(): string {
    return this.data.description;
  }

  public get state(): TemplateState {
    return this.data.state;
  }
  public get language(): string {
    return this.data.language;
  }
  public get extname(): string {
    return this.data.extname;
  }
  public get isLanguage() {
    return !this.category && !this.description;
  }
  public get isCategory() {
    return this.category && !this.description;
  }
  public get isTemplate() {
    return !!this.name && !! this.description;
  }
  public get insertCommand(): Command {
    return {
      title: "Insert Code",
      command: "template.insertTemplate",
      arguments: [this]
    };
  }
}
