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
    helpers_1.aggregateAllPluginData(dbs, store, null, function (data) {
        render_1.getView(up(req.url), {
            title: "Home",
            data: data
        })
            .then(function (result) {
            res.send(result);
        })
            .catch(function (e) { return console.error(e); });
    });
});
app.get("/*", function (req, res) {
    // TODO: move aggregation to render
    helpers_1.aggregateAllPluginData(dbs, store, null, function (data) {
        render_1.getView(up(req.url), {
            title: "Home",
            data: data
        })
            .then(function (result) {
            res.send(result);
        })
            .catch(function (e) { return console.error(e); });
    });
});
function default_1(db, str) {
    dbs = db;
    store = str;
    return app;
}
exports.default = default_1;
;
