import * as express from "express";
import { Document, Types } from "mongoose";
import { getView } from "./render";
import Database from "./database";
import Store from "./store";
import { ProjectInterface } from "../plugins/custom/portfolio/project.class";

const app = express();
let dbs: Database = null;
let store: Store = null;

app.post("/add-project", (req, res) => {
    const project = ({
        _id: new Types.ObjectId(),
        name: req.body["name"],
        projectURL: req.body["project-url"],
        description: req.body["description"],
        imageURL: req.body["image-url"],
        tools: [],
    } as ProjectInterface);

     dbs.dbs.collection("portfolios").save(project, (err) => {
        if(err) return console.error(err);
        console.log("project added");
        res.redirect(req.headers.referer);
    });
});
 app.post("/remove-project", (req, res) => {
    console.log(req.body);
     dbs.dbs.collection("portfolios").remove({
        _id: req.body._id.map ? req.body._id.map(_id => Types.ObjectId(_id)) : Types.ObjectId(req.body._id)
    }, (err) => {
        if(err) return console.error(err);
        console.log("project removed");
        res.redirect(req.headers.referer);
    });
    // res.redirect(req.headers.referer);
});

app.post("*", (req, res) => {
    res.status(404).send(getView(req.url, {
        title: "Not Found",
        viewName: "404"
    }));
});

export default function(db, str) {
    dbs = db;
    store = str;
    return app;
};