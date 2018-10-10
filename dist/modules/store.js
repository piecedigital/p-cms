"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Store = /** @class */ (function () {
    function Store() {
        this.plugins = [];
    }
    Store.prototype.addPlugin = function (p) {
        this.plugins.push(p);
    };
    Store.prototype.getPlugins = function () {
        return this.plugins;
    };
    Store.prototype.getPluginByName = function (name) {
        return this.plugins.find(function (x) { return !!x.name.match(name); });
    };
    return Store;
}());
exports.default = Store;
