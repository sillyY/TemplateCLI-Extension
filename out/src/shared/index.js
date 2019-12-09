"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateState;
(function (TemplateState) {
    TemplateState[TemplateState["Install"] = 1] = "Install";
    TemplateState[TemplateState["NotInstall"] = 2] = "NotInstall";
    TemplateState[TemplateState["Unknown"] = 3] = "Unknown";
})(TemplateState = exports.TemplateState || (exports.TemplateState = {}));
var Language;
(function (Language) {
    Language["All"] = "All";
    Language["CSS"] = "CSS";
    Language["JavaScript"] = "JavaScript";
})(Language = exports.Language || (exports.Language = {}));
exports.defaultTreeNode = {
    id: "",
    fid: "",
    name: "",
    category: "",
    slug: "",
    state: TemplateState.Install,
    language: "",
    lan: ""
};
//# sourceMappingURL=index.js.map