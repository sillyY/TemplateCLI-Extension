import { ViewBase } from "./viewBase";
import { OnlineNode } from "./node/onlineNode";

export class OnlineView extends ViewBase<OnlineNode> {
  constructor() {
    super("template.views.online");
  }

  getRoot() {
    return new OnlineNode(this);
  }
  protected registerCommands() {}

  protected onConfigurationChange() {
    this.initialize('explorer')
  }


}
