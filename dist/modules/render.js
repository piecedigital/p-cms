"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var server_1 = require("react-dom/server");
var react_router_1 = require("react-router");
// import views
var layout_1 = require("../views/layout");
var home_1 = require("../views/home");
var _404_1 = require("../views/404");
var internal_error_1 = require("../views/internal-error");
var admin_1 = require("../views/admin");
var context = {};
var views = {
    "index": home_1.Home,
    "home": home_1.Home,
    "admin": admin_1.AdminDashboard,
    "adminLogin": admin_1.AdminLogin,
    "404": _404_1.$404,
    "internalError": internal_error_1.InternalError,
};
function getView(url, options) {
    options.viewName = options.viewName;
    var View = views[options.viewName];
    return "<!DOCTYPE html>\n    <html>\n    <head>\n        <meta charset=\"utf-8\" />\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"/>\n        <title>" + options.title + "</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        <link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\"/public/css/style.css\" />\n    </head>\n    <body>\n        <div class=\"react-app\">\n            " + server_1.renderToString((View) ? (React.createElement(react_router_1.StaticRouter, { location: url, context: context },
        React.createElement(layout_1.Layout, __assign({}, options.data, { database: options.database }),
            React.createElement(View, null)))) : (React.createElement(react_router_1.StaticRouter, { location: url, context: context },
        React.createElement(layout_1.Layout, __assign({}, options.data, { database: options.database }))))) + "\n        </div>\n    </body>\n    </html>";
}
exports.getView = getView;
