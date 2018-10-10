"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose_1 = require("mongoose");
var render_1 = require("./render");
var fs_1 = require("fs");
var path_1 = require("path");
var app = express();
var dbs = null;
var store = null;
app.post("/add-project", function (req, res) {
    var project = {
        _id: new mongoose_1.Types.ObjectId(),
        name: req.body["name"],
        projectURL: req.body["project-url"],
        description: req.body["description"],
        imageURL: req.body["image-url"],
        tools: [],
    };
    dbs.dbs.collection("portfolios").save(project, function (err) {
        if (err)
            return console.error(err);
        console.log("project added");
        res.redirect(req.headers.referer);
    });
});
app.post("/remove-project", function (req, res) {
    console.log(req.body);
    dbs.dbs.collection("portfolios").remove({
        _id: req.body._id.map ? req.body._id.map(function (_id) { return mongoose_1.Types.ObjectId(_id); }) : mongoose_1.Types.ObjectId(req.body._id)
    }, function (err) {
        if (err)
            return console.error(err);
        console.log("project removed");
        res.redirect(req.headers.referer);
    });
    // res.redirect(req.headers.referer);
});
app.post("/apply-theme", function (req, res) {
    console.log(req.body);
    process.env["THEME"] = req.body.theme;
    var file = JSON.parse(fs_1.readFileSync(path_1.join(__dirname, "../register.json")).toString());
    console.log(file);
    file.theme = req.body.theme;
    fs_1.writeFileSync(path_1.join(__dirname, "../register.json"), JSON.stringify(file));
    res.redirect(req.headers.referer);
});
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
