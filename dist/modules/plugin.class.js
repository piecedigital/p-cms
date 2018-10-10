"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Plugin = /** @class */ (function () {
    function Plugin(pr, directory, component, props) {
        if (props === void 0) { props = {}; }
        this.description = "no description";
        this.dateCreated = "";
        this.author = "";
        this.company = "";
        this.databaseCollections = [];
        this.props = {};
        if (pr.name == null)
            return null;
        this.name = pr.name;
        this.description = pr.description || "no description";
        this.dateCreated = pr.dateCreated || "";
        this.author = pr.author || "";
        this.company = pr.company || "";
        this.databaseCollections = pr.databaseCollections || [];
        this.props = pr.props || {};
        this.directory = directory;
        this.component = component;
    }
    Plugin.prototype.slug = function () {
        return this.directory;
    };
    return Plugin;
}());
exports.Plugin = Plugin;
