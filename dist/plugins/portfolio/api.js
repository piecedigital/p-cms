"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
THIS CODE IS REQUIRED
DO NOT REMOVE
*/
var express = require("express");
var portfolio_class_1 = require("./portfolio.class");
var uuid = require("uuid/v1");
var app = express();
var dbs = null;
var store = null;
// END REQUIRED CODE
/*
ADD YOUR CUSTOM ROUTES HERE
*/
// Portfolio API
app.post("/add-project", function (req, res) {
    var project = new portfolio_class_1.ProjectModel({
        projectPK: uuid(),
        name: req.body["name"],
        description: req.body["description"],
        projectURL: req.body["project-url"],
    });
    project.save(function (err) {
        if (err)
            return console.error(err);
        console.log("project added");
        res.redirect(req.headers.referer);
    });
});
app.post("/remove-project", function (req, res) {
    console.log(req.body);
    dbs.dbs.collection("portfolios").remove({
        projectPK: req.body.projectPK
    }, function (err) {
        if (err)
            return console.error(err);
        console.log("project removed");
        res.redirect(req.headers.referer);
    });
});
// END CUSTOM ROUTES
/*
THIS CODE IS REQUIRED
DO NOT REMOVE
*/
function default_1(db, str) {
    dbs = db;
    store = str;
    return app;
}
exports.default = default_1;
;
// END REQUIRED CODE
