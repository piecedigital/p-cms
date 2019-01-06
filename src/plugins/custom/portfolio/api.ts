/*
THIS CODE IS REQUIRED
DO NOT REMOVE
*/
import * as express from "express";
import { Document, Types } from "mongoose";
import { getView } from "../../../modules/render";
import Database from "../../../modules/database";
import Store from "../../../modules/store";
import { Project, ProjectModel } from "./portfolio.class";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { generatedDatabaseDates } from "../../../modules/helpers";

const app = express();
let dbs: Database = null;
let store: Store = null;
// END REQUIRED CODE

/*
ADD YOUR CUSTOM ROUTES HERE
*/
// Portfolio API
app.post("/add-project", (req, res) => {
    const project = new ProjectModel({
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
    project.save((err) => {
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
// END CUSTOM ROUTES

/*
THIS CODE IS REQUIRED
DO NOT REMOVE
*/
export default function (db, str) {
    dbs = db;
    store = str;
    return app;
};
// END REQUIRED CODE
