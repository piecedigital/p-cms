"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_class_1 = require("./plugin.class");
function registerAdminView(data, component) {
    // console.log("register", data);
    return new plugin_class_1.Plugin(data.viewName, component, data.databaseCollections, data.props);
}
exports.registerAdminView = registerAdminView;
