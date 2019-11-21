import { ITreeNode } from "../shared";

export class TemplateNode {
  constructor(private data: ITreeNode) {}

  public get locked(): boolean {
    return this.data.locked;
  }

  public get name(): string {
    return this.data.name;
  }

  public get id(): string {
    return this.data.id;
  }
}
