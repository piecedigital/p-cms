"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var render_1 = require("./render");
var helpers_1 = require("./helpers");
var app = express();
var dbs = null;
var store = null;
var up = helpers_1.urlPrefixer("");
app.get("/", function (req, res) {
    // aggregateAllPluginData(dbs, store, null, (data) => {
    render_1.getView(up(req.url), {
        title: "Home",
        // data,
        database: dbs
    })
        .then(function (result) {
        res.send(result);
    })
        .catch(function (e) { return console.error(e); });
    // });
});
app.get("/*", function (req, res) {
    render_1.getView(up(req.url), {
        title: "Home",
        // data,
        database: dbs
    })
        .then(function (result) {
        res.send(result);
    })
        .catch(function (e) { return console.error(e); });
});
function default_1(db, str) {
    dbs = db;
    store = str;
    return app;
}
exports.default = default_1;
;
