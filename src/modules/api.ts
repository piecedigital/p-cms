import * as express from "express";
import { Document, Types } from "mongoose";
import { getView } from "./render";
import Database from "./database";
import Store from "./store";
import { Project } from "../plugins/custom/portfolio/portfolio.class";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const app = express();
let dbs: Database = null;
let store: Store = null;

app.post("/apply-theme", (req, res) => {
    console.log(req.body);

    process.env["THEME"] = req.body.theme;
    var file = JSON.parse(readFileSync(join(__dirname, "../register.json")).toString());
    console.log(file);

    file.theme = req.body.theme;

    writeFileSync(join(__dirname, "../register.json"), JSON.stringify(file));

    res.redirect(req.headers.referer);
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