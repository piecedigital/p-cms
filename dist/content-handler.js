"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./modules/helpers");
exports.HandlebarsHandler = function (url) {
    if (url.match(/^\/pc_admin/)) {
        return helpers_1.getAdminContent(url);
    }
    else {
        return helpers_1.getThemeContent(url);
    }
};
