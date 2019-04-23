import * as express from "express";
import * as csrf from "csurf";
import { Types } from "mongoose";
import * as bcrypt from "bcryptjs";
import { User } from "./user.class";
import { getView } from "./render";
import { authorize, authenticate, deauthenticate } from "./auth";
import Database from "./database";
import Store from "./store";
import { aggregateAllPluginData, urlPrefixer, updateSRVConfig, getThemes } from "./helpers";
import { isNull } from "util";

const app = express();
let dbs: Database = null;
let store: Store = null;
const csrfProtection = csrf({ cookie: true });

var up = urlPrefixer("/pc_admin");

app.get("*", (req, res, next) => {
    if (!dbs.Connected && !req.url.match("db-setup")) {
        res.redirect("/pc_admin/db-setup");
        return;
    } else {
        next();
    }
});

app.get("/", csrfProtection, (req, res) => {
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

app.get("/db-setup", csrfProtection, (req, res) => {
    if (dbs.Connected) {
        res.redirect("/pc_admin");
    } else {
        getView(up(req.url), {
            title: "Setup Database",
            data: {
                csrfToken: req.csrfToken()
            }
        })
        .then(result => {
            res.send(result);
        })
        .catch(e => console.error(e));
    }
});

app.post("/db-setup", csrfProtection, (req, res) => {
    const {
        username,
        password,
        dbName,
        dbHost
    } = req.body;

    dbs.connect(username, password, dbHost, process.env["DB_PORT"] || 27017, dbName);
    dbs.successCallback = () => {
        console.log("successful connection");
        res.redirect("/pc_admin");

        updateSRVConfig({
            DB_USER: username,
            DB_PASS: password,
            DB_NAME: dbName,
            DB_HOST: dbHost,
        });
    };
    dbs.errorCallback = err => {
        console.error(err);
    }
});

app.get("/logout", (req, res) => {
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
        dbs.AdminUserModel.findOne({}, (err, doc) => {
            if (!isNull(doc)) {
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
            } else {
                res.redirect("signup");
            }
        });
    });
});

app.get("/signup", csrfProtection, (req, res) => {
    authorize(req, dbs, () => {
        res.redirect("/pc_admin");
    }, () => {
        getView(up(req.url), {
            title: "Admin Signup",
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

app.get(/^\/plugin\/(.+)?$/i, (req, res) => {
    authorize(
        req, dbs,
        () => {
            aggregateAllPluginData(dbs, store, null, (data: any) => {
                // console.log("DATAAAAAAAA", data);
                getView(up(req.url), {
                    title: "Admin Dashboard",
                    data: Object.assign(data, {
                        adminViews: store.getPlugins(),
                        themes: getThemes(),
                        currentTheme: process.env["THEME"]
                    })
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

app.post("/signup", csrfProtection, (req, res) => {
    if(req.body.password === req.body.password) {
        const newAdminUser = new dbs.AdminUserModel({
            _id: new Types.ObjectId(),
            displayName: req.body.displayName,
            name: req.body.username.toLowerCase(),
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
        } as User);

        newAdminUser.save((err) => {
            if (err) {
                console.error(err);
                res.redirect("/pc_admin/signup");
            } else {
                console.log("created admin user");
                res.redirect("/pc_admin/login");
            }
        });
    } else {
        res.redirect("/pc_admin/signup");
    }
});

export default function(db, str) {
    dbs = db;
    store = str;
    return app;
};