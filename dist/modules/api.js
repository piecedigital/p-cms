"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import { Document, Types } from "mongoose";
var render_1 = require("./render");
// import { ProjectInterface } from "../plugins/custom/portfolio/project.class";
var app = express();
var dbs = null;
var store = null;
app.post("*", function (req, res) {
    res.status(404).send(render_1.getView(req.url, {
        title: "Not Found",
        viewName: "404"
    }));
});
function default_1(db, str) {
    dbs = db;
    store = str;
    return app;
}
exports.default = default_1;
;
