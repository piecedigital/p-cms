import * as express from "express";
import * as csrf from "csurf";
import { Types } from "mongoose";
import { getView } from "./render";
import { authorize, authenticate, deauthenticate } from "./auth";
import Database from "./database";
import Store from "./store";
import { aggregateAllPluginData, urlPrefixer } from "./helpers";

const app = express();
let dbs: Database = null;
let store: Store = null;
const csrfProtection = csrf({ cookie: true });

var up = urlPrefixer("/pc_admin");

app.get("/", csrfProtection, (req, res) => {
    // console.log(`/`, req.path);
    authorize(
        req, dbs,
        () => {
            getView(up(req.url), {
                title: "Admin Dashboard",
                data: {
                    adminViews: store.getPlugins()
                }
            })
            .then(result => {
                res.send(result);
            })
            .catch(e => console.error(e));
        },
        () => res.redirect("/pc_admin/login")
    );
});

app.get("/logout", csrfProtection, (req, res) => {
    // console.log(`"/pc_admin-logout"`, req.path);
    deauthenticate(dbs, req.cookies["sessId"]);
    res.cookie("sessId", null);
    res.redirect("/pc_admin");
});

app.get("/login", csrfProtection, (req, res) => {
    // console.log(`"/pc_admin/login"`, req.path);
    authorize(req, dbs, () => {
        res.redirect("/pc_admin");
    }, () => {
        getView(up(req.url), {
            title: "Admin Login",
            data: {
                csrfToken: req.csrfToken()
            }
        })
        .then(result => {
            res.send(result);
        })
        .catch(e => console.error(e));
    });
});

app.get(/^\/plugin\/(.+)?$/i, csrfProtection, (req, res) => {
    console.log(`/^\/plugin\/(.+)?$/i`, req.path);
    authorize(
        req, dbs,
        () => {
            aggregateAllPluginData(dbs, store, null, (data: any) => {
                // console.log(data);
                getView(up(req.url), {
                    title: "Admin Dashboard",
                    data: {
                        adminViews: store.getPlugins()
                    }
                })
                .then(result => {
                    res.send(result);
                })
                .catch(e => console.error(e));
            });
        },
        () => res.redirect("/pc_admin/login")
    );
});

app.post("/login", csrfProtection, (req, res) => {
    // console.log(`"/pc_admin/login"`, req.path);
    authenticate(dbs, req.body, (sessId: Types.ObjectId) => {
        res.cookie("sessId", sessId);
        res.redirect("/pc_admin");
    }, () => {
        res.redirect("/pc_admin");
    });
});

export default function(db, str) {
    dbs = db;
    store = str;
    return app;
};