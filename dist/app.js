"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path_1 = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose_1 = require("mongoose");
var bcrypt = require("bcryptjs");
var helmet = require("helmet");
var admin_routes_1 = require("./modules/admin-routes");
var api_1 = require("./modules/api");
var theme_routes_1 = require("./modules/theme-routes");
var plugin_routes_1 = require("./modules/plugin-routes");
var database_1 = require("./modules/database");
var store_1 = require("./modules/store");
var render_1 = require("./modules/render");
var register_admin_view_1 = require("./modules/register-admin-view");
var helpers_1 = require("./modules/helpers");
var dbs = new database_1.default();
var store = new store_1.default();
function getPluginsAndRegister(pluginType) {
    if (pluginType === void 0) { pluginType = "standard"; }
    helpers_1.getPlugins(pluginType, function (data) {
        var pr = data.pr, component = data.component, directory = data.directory;
        try {
            store.addPlugin(register_admin_view_1.registerAdminView(pr, directory, component.default));
        }
        catch (error) {
            console.error("Could not load plugin", pr.name, error);
        }
    });
}
dbs.successCallback = function () {
    var PORT = process.env["PORT"] || 8080;
    var app = express();
    var registerData = require(path_1.join(__dirname, "register.json"));
    // find or make temporary admin user
    // TODO: implement real process for creating a first admin user
    dbs.AdminUserModel.findOne({
        name: "admin"
    }, function (err, res) {
        console.log("looking for admin user");
        if (!res) {
            console.log("no admin user");
            var newAdminUser = new dbs.AdminUserModel({
                _id: new mongoose_1.Types.ObjectId(),
                name: "admin",
                password: bcrypt.hashSync("password", bcrypt.genSaltSync())
            });
            newAdminUser.save(function (err) {
                if (err)
                    return console.error(err);
                console.log("created admin user");
            });
            return;
        }
        console.log("found admin user");
    });
    process.env["THEME"] = registerData.theme || "example";
    // console.log(registerData, process.env["THEME"]);
    // load standard plugins
    getPluginsAndRegister();
    // load custom plugsins
    getPluginsAndRegister("custom");
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
    app.use("/public", express.static(path_1.join(__dirname, "public")));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    // route setup
    app.use("/pc_admin", admin_routes_1.default(dbs, store));
    plugin_routes_1.default("standard", store, function (data) {
        app.use("/api", data(dbs, store));
    });
    plugin_routes_1.default("custom", store, function (data) {
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
};
dbs.errorCallback = function () {
    console.log("Fail fallback server");
    var PORT = process.env["PORT"] || 8080;
    var app = express();
    app.use("/public", express.static(path_1.join(__dirname, "public")));
    app.get("*", function (req, res) {
        res.send(render_1.getView(req.url, {
            title: "Error",
            viewName: "internalError",
            data: {
                code: 500,
                message: "There was an error establishing a connection to the database"
            }
        }));
    });
    app.listen(PORT, function () {
        console.log("Listening on port", PORT);
    });
};
