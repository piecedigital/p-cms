"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var helpers_1 = require("../../modules/helpers");
function default_1(url) {
    var header = fs_1.readFileSync(path_1.join(__dirname, "partials/header.handlebars")).toString();
    var footer = fs_1.readFileSync(path_1.join(__dirname, "partials/footer.handlebars")).toString();
    var routes = {
        "/": {
            data: fs_1.readFileSync(path_1.join(__dirname, "pages/home.handlebars")).toString(),
        },
        "/foobar": {
            data: fs_1.readFileSync(path_1.join(__dirname, "pages/foobar.handlebars")).toString()
        },
    };
    // url match
    var xx = new RegExp(helpers_1.regexURL(url));
    var arr = Object.keys(routes);
    var page = "";
    var i = 0;
    while (!page && i < arr.length) {
        var key = arr[i];
        var match = key.match(xx);
        if (match) {
            page = routes[key].data;
            break;
        }
        i++;
    }
    return header + page + footer;
}
exports.default = default_1;
