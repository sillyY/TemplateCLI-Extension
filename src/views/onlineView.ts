import { ViewBase } from "./node/viewBase";
import { OnlineTrackerNode } from "./node/onlineTrackerNode";

export class OnlineView extends ViewBase<OnlineTrackerNode> {
    constructor() {
        super()
    }
    getRoot() {
        return new OnlineTrackerNode(this)
    }

    protected registerCommands() {

    }

}