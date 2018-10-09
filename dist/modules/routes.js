"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var render_1 = require("./render");
var auth_1 = require("./auth");
var csrf = require("csurf");
var app = express();
var dbs = null;
var store = null;
var csrfProtection = csrf({ cookie: true });
// gets every plugin and its database data
function aggregateAllPluginData(options, callback) {
    if (options === void 0) { options = {}; }
    new Promise(function (res, rej) {
        var x = store.getPlugins();
        // data gathered from the database
        var data = {
            adminViews: []
        };
        // variable used to track how many databases have been queried
        var dataCollected = 0;
        if (x.length == 0)
            res(data);
        x.map(function (plugin) {
            data.adminViews.push(plugin);
            plugin.databaseCollections.map(function (databaseName) {
                if (data[databaseName]) {
                    console.error("Database \"" + databaseName + "\" conflicts with an existing database of the same name");
                    return;
                }
                dbs.dbs.collection(databaseName).find({}, {}).toArray(function (err, docs) {
                    if (docs === void 0) { docs = []; }
                    dataCollected++;
                    if (err) {
                        console.error(err);
                    }
                    else {
                        data[databaseName] = docs;
                    }
                    if (dataCollected == x.length)
                        res(data);
                });
            });
        });
    })
        .then(function (data) {
        callback(data);
    })
        .catch(function (e) { return console.error(e); });
}
app.get("/", function (req, res) {
    // console.log(req.path);
    aggregateAllPluginData(null, function (data) {
        // console.log(data);
        res.send(render_1.getView(req.url, {
            title: "Home",
            data: data
        }));
    });
});
app.get(/^\/admin(\/.*)?$/i, csrfProtection, function (req, res) {
    // console.log(`/^\/admin(\/.*)?/i`, req.path);
    auth_1.authorize(req, dbs, function () {
        aggregateAllPluginData(null, function (data) {
            // console.log(data);
            res.send(render_1.getView(req.url, {
                title: "Admin Dashboard",
                data: data
            }));
        });
    }, function () { return res.redirect("/admin-login"); });
});
app.get("/admin-logout", csrfProtection, function (req, res) {
    // console.log(`"/admin-logout"`, req.path);
    auth_1.deauthenticate(dbs, req.cookies["sessId"]);
    res.cookie("sessId", null);
    res.redirect("/admin");
});
app.get("/admin-login", csrfProtection, function (req, res) {
    // console.log(`"/admin-login"`, req.path);
    auth_1.authorize(req, dbs, function () {
        res.redirect("/admin");
    }, function () {
        res.send(render_1.getView(req.url, {
            title: "Admin Login",
            data: {
                csrfToken: req.csrfToken()
            }
        }));
    });
});
app.post("/admin-login", csrfProtection, function (req, res) {
    // console.log(`"/admin-login"`, req.path);
    auth_1.authenticate(dbs, req.body, function (sessId) {
        res.cookie("sessId", sessId);
        res.redirect("/admin");
    }, function () {
        res.redirect("/admin");
    });
});
app.get("*", function (req, res) {
    // console.log(req.path);
    res.status(404).send(render_1.getView(req.url, {
        title: "Not Found",
        viewName: "404"
    }));
});
function default_1(db, str) {
    dbs = db;
    store = str;
    return app;
}
exports.default = default_1;
;
