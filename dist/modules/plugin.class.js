"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Plugin = /** @class */ (function () {
    function Plugin(name, component, databaseCollections, props) {
        if (databaseCollections === void 0) { databaseCollections = []; }
        if (props === void 0) { props = {}; }
        this.name = name;
        this.component = component;
        this.databaseCollections = databaseCollections;
        this.props = props;
    }
    Plugin.prototype.slug = function () {
        return this.name;
    };
    return Plugin;
}());
exports.Plugin = Plugin;
