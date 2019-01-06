"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
THIS CODE IS REQUIRED
DO NOT REMOVE
*/
var express = require("express");
var mongoose_1 = require("mongoose");
var portfolio_class_1 = require("./portfolio.class");
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
        name: req.body["name"],
        description: req.body["description"],
        projectURL: req.body["project-url"],
    });
    // Object.assign({
    //     _id: new Types.ObjectId(),
    //     name: req.body["name"],
    //     projectURL: req.body["project-url"],
    //     description: req.body["description"],
    //     imageURL: req.body["image-url"] || "/public/media/images/cat-dog.jpg",
    //     tools: [],
    //     __v: 0,
    // } as Project, generatedDatabaseDates());
    // dbs.dbs.collection("portfolios").insertOne(project, (err) => {
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
        _id: req.body._id.map ? req.body._id.map(function (_id) { return mongoose_1.Types.ObjectId(_id); }) : mongoose_1.Types.ObjectId(req.body._id)
    }, function (err) {
        if (err)
            return console.error(err);
        console.log("project removed");
        res.redirect(req.headers.referer);
    });
    // res.redirect(req.headers.referer);
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
