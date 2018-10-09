import * as express from "express";
import { getView } from "./render";
import { authorize, authenticate, deauthenticate } from "./auth";
import * as csrf from "csurf";
import Database from "./database";
import { Project } from "./project.class";
import { Document, Types } from "mongoose";
import Store from "./store";
import { Plugin } from "./plugin.class";

const app = express();
let dbs: Database = null;
let store: Store = null;
const csrfProtection = csrf({ cookie: true });

// gets every plugin and its database data
function aggregateAllPluginData(options: {
    excludedPlugins?: string[],
    excludedDatabases?: string[]
} = {}, callback: (data: any) => void) {
    new Promise((res, rej) => {
        const x = store.getPlugins();

        // data gathered from the database
        const data: Record<string, any> = {
            adminViews: []
        };

        // variable used to track how many databases have been queried
        let dataCollected = 0;
        if(x.length == 0) res(data);

        x.map((plugin: Plugin) => {
            data.adminViews.push(plugin);

            plugin.databaseCollections.map((databaseName: string) => {
                if(data[databaseName]) {
                    console.error(`Database "${databaseName}" conflicts with an existing database of the same name`);
                    return;
                }

                dbs.dbs.collection(databaseName).find({}, {}).toArray((err, docs: Document[] = []) => {
                    dataCollected++;

                    if(err) {
                        console.error(err);
                    } else {
                        data[databaseName] = docs;
                    }

                    if(dataCollected == x.length) res(data);
                });
            });
        });
    })
    .then((data: any) => {
        callback(data);
    })
    .catch(e => console.error(e));
}

app.get("/", (req, res) => {
    // console.log(req.path);
    aggregateAllPluginData(null, (data) => {
        // console.log(data);
        res.send(getView(req.url, {
            title: "Home",
            data
        }));
    });
});

app.get(/^\/admin(\/.*)?$/i, csrfProtection, (req, res) => {
    // console.log(`/^\/admin(\/.*)?/i`, req.path);
    authorize(
        req, dbs,
        () => {
            aggregateAllPluginData(null, (data: any) => {
                // console.log(data);
                res.send(getView(req.url, {
                    title: "Admin Dashboard",
                    data
                }));
            });
        },
        () => res.redirect("/admin-login")
    );
});

app.get("/admin-logout", csrfProtection, (req, res) => {
    // console.log(`"/admin-logout"`, req.path);
    deauthenticate(dbs, req.cookies["sessId"]);
    res.cookie("sessId", null);
    res.redirect("/admin");
});

app.get("/admin-login", csrfProtection, (req, res) => {
    // console.log(`"/admin-login"`, req.path);
    authorize(req, dbs, () => {
        res.redirect("/admin");
    }, () => {
        res.send(getView(req.url, {
            title: "Admin Login",
            data: {
                csrfToken: req.csrfToken()
            }
        }));
    });
});

app.post("/admin-login", csrfProtection, (req, res) => {
    // console.log(`"/admin-login"`, req.path);
    authenticate(dbs, req.body, (sessId: Types.ObjectId) => {
        res.cookie("sessId", sessId);
        res.redirect("/admin");
    }, () => {
        res.redirect("/admin");
    });
});

app.get("*", (req, res) => {
    // console.log(req.path);
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