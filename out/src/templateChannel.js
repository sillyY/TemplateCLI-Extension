"use strict";
// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class TemplateChannel {
    constructor() {
        this.channel = vscode.window.createOutputChannel("LeetCode");
    }
    appendLine(message) {
        this.channel.appendLine(message);
    }
    append(message) {
        this.channel.append(message);
    }
    show() {
        this.channel.show();
    }
    dispose() {
        this.channel.dispose();
    }
}
exports.templateChannel = new TemplateChannel();
//# sourceMappingURL=templateChannel.js.map