"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var csrf = require("csurf");
var mongoose_1 = require("mongoose");
var bcrypt = require("bcryptjs");
var render_1 = require("./render");
var auth_1 = require("./auth");
var helpers_1 = require("./helpers");
var app = express();
var dbs = null;
var store = null;
var csrfProtection = csrf({ cookie: true });
var up = helpers_1.urlPrefixer("/pc_admin");
app.get("*", function (req, res, next) {
    if (!dbs.Connected && !req.url.match("db-setup")) {
        res.redirect("/pc_admin/db-setup");
        return;
    }
    else {
        next();
    }
});
app.get("/", csrfProtection, function (req, res) {
    auth_1.authorize(req, dbs, function () {
        render_1.getView(up(req.url), {
            title: "Admin Dashboard",
            data: {
                adminViews: store.getPlugins()
            }
        })
            .then(function (result) {
            res.send(result);
        })
            .catch(function (e) { return console.error(e); });
    }, function () { return res.redirect("/pc_admin/login"); });
});
app.get("/db-setup", csrfProtection, function (req, res) {
    render_1.getView(up(req.url), {
        title: "Setup Database",
        data: {
            csrfToken: req.csrfToken()
        }
    })
        .then(function (result) {
        res.send(result);
    })
        .catch(function (e) { return console.error(e); });
});
app.post("/db-setup", csrfProtection, function (req, res) {
    var _a = req.body, username = _a.username, password = _a.password, dbName = _a.dbName, dbHost = _a.dbHost;
    dbs.connect(username, password, dbHost, process.env["DB_PORT"] || 27017, dbName);
    dbs.successCallback = function () {
        console.log("successful connection");
        res.redirect("/pc_admin");
        helpers_1.updateSRVConfig({
            DB_USER: username,
            DB_PASS: password,
            DB_NAME: dbName,
            DB_HOST: dbHost,
        });
    };
    dbs.errorCallback = function (err) {
        console.error(err);
    };
});
app.get("/logout", function (req, res) {
    // console.log(`"/pc_admin-logout"`, req.path);
    auth_1.deauthenticate(dbs, req.cookies["sessId"]);
    res.cookie("sessId", null);
    res.redirect("/pc_admin");
});
app.get("/login", csrfProtection, function (req, res) {
    // console.log(`"/pc_admin/login"`, req.path);
    auth_1.authorize(req, dbs, function () {
        res.redirect("/pc_admin");
    }, function () {
        render_1.getView(up(req.url), {
            title: "Admin Login",
            data: {
                csrfToken: req.csrfToken()
            }
        })
            .then(function (result) {
            res.send(result);
        })
            .catch(function (e) { return console.error(e); });
    });
});
app.get("/signup", csrfProtection, function (req, res) {
    auth_1.authorize(req, dbs, function () {
        res.redirect("/pc_admin");
    }, function () {
        render_1.getView(up(req.url), {
            title: "Admin Signup",
            data: {
                csrfToken: req.csrfToken()
            }
        })
            .then(function (result) {
            res.send(result);
        })
            .catch(function (e) { return console.error(e); });
    });
});
app.get(/^\/plugin\/(.+)?$/i, function (req, res) {
    auth_1.authorize(req, dbs, function () {
        helpers_1.aggregateAllPluginData(dbs, store, null, function (data) {
            // console.log("DATAAAAAAAA", data);
            render_1.getView(up(req.url), {
                title: "Admin Dashboard",
                data: Object.assign(data, {
                    adminViews: store.getPlugins()
                })
            })
                .then(function (result) {
                res.send(result);
            })
                .catch(function (e) { return console.error(e); });
        });
    }, function () { return res.redirect("/pc_admin/login"); });
});
app.post("/login", csrfProtection, function (req, res) {
    // console.log(`"/pc_admin/login"`, req.path);
    auth_1.authenticate(dbs, req.body, function (sessId) {
        res.cookie("sessId", sessId);
        res.redirect("/pc_admin");
    }, function () {
        res.redirect("/pc_admin");
    });
});
app.post("/signup", csrfProtection, function (req, res) {
    if (req.body.password === req.body.password) {
        if (!res) {
            var newAdminUser = new dbs.AdminUserModel({
                _id: new mongoose_1.Types.ObjectId(),
                displayName: req.body.displayName,
                name: req.body.username.toLowerCase(),
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync())
            });
            newAdminUser.save(function (err) {
                if (err)
                    return console.error(err);
                console.log("created admin user");
                res.redirect("/pc_admin/login");
            });
        }
    }
    else {
        res.redirect("/pc_admin/signup");
    }
});
function default_1(db, str) {
    dbs = db;
    store = str;
    return app;
}
exports.default = default_1;
;
