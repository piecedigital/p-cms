"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var helpers_1 = require("../../modules/helpers");
function default_1(url) {
    var header = "";
    var footer = "";
    var json = {};
    try {
        header = fs_1.readFileSync(path_1.join(__dirname, "partials/header.handlebars")).toString();
        footer = fs_1.readFileSync(path_1.join(__dirname, "partials/footer.handlebars")).toString();
        json = JSON.parse(fs_1.readFileSync(path_1.join(__dirname, "routes.json")).toString());
    }
    catch (error) {
        console.error("Theme requires 3 files: \"partials/header.handlebars\", \"partials/footer.handlebars\", and \"routes.json\"");
    }
    var routes = {};
    Object.keys(json).map(function (routeKey) {
        var routeData = json[routeKey];
        var data = {
            params: {},
            page: null,
            query: []
        };
        data.params = routeData.params || {};
        data.query = routeData.queryList || [];
        data.page = function (params) {
            if (params === void 0) { params = null; }
            return fs_1.readFileSync(path_1.join(__dirname, "pages", routeData.page)).toString();
        };
        routes[routeKey] = data;
    });
    // url match
    var results = helpers_1.pickPage(url, routes);
    results.page = header + results.page + footer;
    return results;
}
exports.default = default_1;
