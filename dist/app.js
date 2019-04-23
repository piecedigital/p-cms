"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path_1 = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// import { Types } from "mongoose";
// import * as bcrypt from "bcryptjs";
var helmet = require("helmet");
var admin_routes_1 = require("./modules/admin-routes");
var api_1 = require("./modules/api");
var theme_routes_1 = require("./modules/theme-routes");
var plugin_routes_1 = require("./modules/plugin-routes");
var database_1 = require("./modules/database");
var store_1 = require("./modules/store");
var render_1 = require("./modules/render");
// import { UserInterface, User } from "./modules/user.class";
var register_admin_view_1 = require("./modules/register-admin-view");
var helpers_1 = require("./modules/helpers");
// import { readFile } from "fs";
var dbs = new database_1.default();
var store = new store_1.default();
function getPluginsAndRegister() {
    helpers_1.getPlugins(function (data) {
        var pr = data.pr, /* component,*/ directory = data.directory;
        try {
            store.addPlugin(register_admin_view_1.registerAdminView(pr, directory /*, component.default*/));
        }
        catch (error) {
            console.error("Could not load plugin", pr.name, error);
        }
    });
}
var PORT = process.env["PORT"] || 8080;
var app = express();
var registerData = {};
try {
    registerData = require(path_1.join(__dirname, "srv-config.json")) || {};
}
catch (error) {
}
process.env["THEME"] = registerData.theme || "example";
// load plugins
getPluginsAndRegister();
// header setup
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            // styleSrc: ["'self'"],
            // scriptSrc: ["'self'"],
            reportUri: "/report-violation"
        }
    }
}));
app.use("/favicon.ico", function (req, res) {
    try {
        res.sendFile(path_1.join(__dirname, "public/media/images/favicon.ico"));
    }
    catch (e) {
        console.log("Welp... guess no favicon");
    }
});
app.use("/public", express.static(path_1.join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// route setup
app.use("/pc_admin", admin_routes_1.default(dbs, store));
app.use("*", function (req, res, next) {
    if (dbs.Connected) {
        next();
    }
    else {
        res.redirect("/pc_admin");
    }
});
plugin_routes_1.default(store, function (data) {
    app.use("/api", data(dbs, store));
});
app.use("/api", api_1.default(dbs, store));
app.use(theme_routes_1.default(dbs, store));
app.get("*", function (req, res) {
    // console.log(req.path);
    res.status(404).send(render_1.getView(req.url, {
        title: "Not Found",
        viewName: "404"
    }));
});
app.listen(PORT, function () {
    console.log("Listening on port", PORT);
});
