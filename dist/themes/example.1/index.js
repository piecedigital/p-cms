"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_helpers_1 = require("../../modules/react-helpers");
var fs_1 = require("fs");
var path_1 = require("path");
function danger() {
    var header = fs_1.readFileSync(path_1.join(__dirname, "partials/header.html")).toString(); // html files are already in relative dist folder. only ts files get moved
    var footer = fs_1.readFileSync(path_1.join(__dirname, "partials/footer.html")).toString(); // html files are already in relative dist folder. only ts files get moved
    var homeBody = fs_1.readFileSync(path_1.join(__dirname, "index.html")).toString();
    var foobarBody = fs_1.readFileSync(path_1.join(__dirname, "index.1.html")).toString();
    var home = new react_helpers_1.dangerousHTML("/", "" + header + homeBody + footer);
    var foobar = new react_helpers_1.dangerousHTML("/foobar", "" + header + foobarBody + footer);
    return react_helpers_1.dangerouslySetHTML([home, foobar]);
}
exports.danger = danger;
