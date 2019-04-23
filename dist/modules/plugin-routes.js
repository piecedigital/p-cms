"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
// const app = express();
// let store: Store = null;
function default_1(str, cb) {
    str.getPlugins().map(function (plugin) {
        // require module and send back to callback
        try {
            var module_1 = require(path_1.join(__dirname, "../plugins", plugin.directory, "api.js"));
            cb(module_1.default);
        }
        catch (e) {
            console.error("No API for plugin \"" + plugin.name + "\"");
            // console.error(e);
        }
    });
    // return app;
}
exports.default = default_1;
;
