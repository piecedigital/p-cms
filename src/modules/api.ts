import * as express from "express";
// import { Document, Types } from "mongoose";
import { getView } from "./render";
import Database from "./database";
import Store from "./store";
// import { ProjectInterface } from "../plugins/custom/portfolio/project.class";

const app = express();
let dbs: Database = null;
let store: Store = null;

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