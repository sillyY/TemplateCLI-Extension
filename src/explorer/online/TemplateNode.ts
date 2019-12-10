import { ITreeNode, TemplateState } from "../../shared";
import { Command } from "vscode";

export class TemplateNode {
  constructor(private data: ITreeNode) {}

  public get id(): string {
    return this.data.id;
  }

  public get fid(): string {
    return this.data.fid;
  }

  public get name(): string {
    return this.data.name;
  }

  public get category(): string {
    return this.data.category;
  }

  public get slug(): string {
    return this.data.slug;
  }

  public get state(): TemplateState {
    return this.data.state;
  }
  public get language(): string {
    return this.data.language;
  }
  public get lan(): string {
    return this.data.lan;
  }
  public get isLanguage() {
    return !this.category && !this.slug;
  }
  public get isCategory() {
    return this.category && !this.slug;
  }
  public get isSlug() {
    return !!this.slug
  }
  public get insertCommand(): Command {
    return {
      title: "Insert Code",
      command: "template.insertTemplate",
      arguments: [this]
    };
  }
}
