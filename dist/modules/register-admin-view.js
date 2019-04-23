"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var plugin_class_1 = require("./plugin.class");
function registerAdminView(data, directory /*, component: any*/) {
    // console.log("register", data);
    return new plugin_class_1.Plugin(data, directory /*, component*/);
}
exports.registerAdminView = registerAdminView;
