import * as express from "express";
import * as csrf from "csurf";
import { getView } from "./render";
import Database from "./database";
import Store from "./store";
import { aggregateAllPluginData, urlPrefixer } from "./helpers";

const app = express();
let dbs: Database = null;
let store: Store = null;

var up = urlPrefixer("");

app.get("/", (req, res) => {
    // aggregateAllPluginData(dbs, store, null, (data) => {
        getView(up(req.url), {
                title: "Home",
                // data,
                database: dbs
            })
            .then((result: string) => {
                res.send(result);
            })
            .catch(e => console.error(e));
    // });
});

app.get("/*", (req, res) => {
    getView(up(req.url), {
            title: "Home",
            // data,
            database: dbs
        })
        .then((result: string) => {
            res.send(result);
        })
        .catch(e => console.error(e));
});

export default function(db, str) {
    dbs = db;
    store = str;
    return app;
};