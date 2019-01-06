"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
THIS CODE IS REQUIRED
DO NOT REMOVE
*/
var express = require("express");
var render_1 = require("./render");
var fs_1 = require("fs");
var path_1 = require("path");
var app = express();
var dbs = null;
var store = null;
app.post("/apply-theme", function (req, res) {
    console.log(req.body);
    process.env["THEME"] = req.body.theme;
    var file = JSON.parse(fs_1.readFileSync(path_1.join(__dirname, "../register.json")).toString());
    console.log(file);
    file.theme = req.body.theme;
    fs_1.writeFileSync(path_1.join(__dirname, "../register.json"), JSON.stringify(file));
    res.redirect(req.headers.referer);
});
// END REQUIRED CODE
/*
ADD YOUR CUSTOM ROUTES HERE
*/
// Portfolio API
/*
app.post("/add-project", (req, res) => {
    const project = Object.assign({
        _id: new Types.ObjectId(),
        name: req.body["name"],
        projectURL: req.body["project-url"],
        description: req.body["description"],
        imageURL: req.body["image-url"] || "/public/media/images/cat-dog.jpg",
        tools: [],
        __v: 0,
    } as Project, generatedDatabaseDates());

    dbs.dbs.collection("portfolios").insertOne(project, (err) => {
        if (err) return console.error(err);
        console.log("project added");
        res.redirect(req.headers.referer);
    });
});

app.post("/remove-project", (req, res) => {
    console.log(req.body);
    dbs.dbs.collection("portfolios").remove({
        _id: req.body._id.map ? req.body._id.map(_id => Types.ObjectId(_id)) : Types.ObjectId(req.body._id)
    }, (err) => {
        if (err) return console.error(err);
        console.log("project removed");
        res.redirect(req.headers.referer);
    });
    // res.redirect(req.headers.referer);
});
*/
// END CUSTOM ROUTES
/*
THIS CODE IS REQUIRED
DO NOT REMOVE
*/
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
// END REQUIRED CODE
