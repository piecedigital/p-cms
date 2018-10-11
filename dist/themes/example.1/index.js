"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_helpers_1 = require("../../modules/react-helpers");
var fs_1 = require("fs");
var path_1 = require("path");
function danger() {
    var header = fs_1.readFileSync(path_1.join(__dirname, "partials/header.html")).toString();
    var body = fs_1.readFileSync(path_1.join(__dirname, "index.html")).toString();
    var footer = fs_1.readFileSync(path_1.join(__dirname, "partials/footer.html")).toString();
    return react_helpers_1.dangerouslySetHTML("" + header + body + footer);
}
exports.danger = danger;
