import * as express from "express";
import * as csrf from "csurf";
import { getView } from "./render";
import Database from "./database";
import Store from "./store";
import { aggregateAllPluginData, urlPrefixer } from "./helpers";

const app = express();
let dbs: Database = null;
let store: Store = null;
const csrfProtection = csrf({ cookie: true });

var up = urlPrefixer("");

app.get("/", (req, res) => {
    console.log("theme", req.path);
    aggregateAllPluginData(dbs, store, null, (data) => {
        // console.log(data);
        res.send(getView(up(req.url), {
            title: "Home",
            data
        }));
    });
});

export default function(db, str) {
    dbs = db;
    store = str;
    return app;
};