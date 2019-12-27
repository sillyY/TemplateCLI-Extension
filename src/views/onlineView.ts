import { ViewBase } from "./viewBase";
import { OnlineNode } from "./node/onlineNode";

export class OnlineView extends ViewBase {
  constructor() {
    super();
  }

  getRoot() {
    return new OnlineNode(this);
  }
  initialize() {
      
  }
  protected registerCommands() {}
}
