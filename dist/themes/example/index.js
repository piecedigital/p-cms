"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var helpers_1 = require("../../modules/helpers");
function default_1(url) {
    console.log("called", url);
    var header = fs_1.readFileSync(path_1.join(__dirname, "partials/header.handlebars")).toString();
    var footer = fs_1.readFileSync(path_1.join(__dirname, "partials/footer.handlebars")).toString();
    var routes = {
        "/foobar/{:id}": {
            page: function (params) {
                if (params === void 0) { params = null; }
                return fs_1.readFileSync(path_1.join(__dirname, "pages/foobar.handlebars")).toString();
            }
        },
        "/foobar": {
            props: {
                title: "FUBAR"
            },
            page: function (params) {
                if (params === void 0) { params = null; }
                return fs_1.readFileSync(path_1.join(__dirname, "pages/foobar.handlebars")).toString();
            }
        },
        "/$": {
            props: {
                title: "Home alt"
            },
            page: function (params) {
                if (params === void 0) { params = null; }
                return fs_1.readFileSync(path_1.join(__dirname, "pages/home.handlebars")).toString();
            }
        },
        "404": {
            props: {
                title: "404: Not Found"
            },
            page: function (params) {
                if (params === void 0) { params = null; }
                return fs_1.readFileSync(path_1.join(__dirname, "pages/home.handlebars")).toString();
            }
        },
    };
    // url match
    var results = helpers_1.pickPage(url, routes);
    results.page = header + results.page + footer;
    return results;
}
exports.default = default_1;
