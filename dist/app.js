"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose_1 = require("mongoose");
var bcrypt = require("bcryptjs");
var routes_1 = require("./modules/routes");
var api_1 = require("./modules/api");
var database_1 = require("./modules/database");
var store_1 = require("./modules/store");
var render_1 = require("./modules/render");
var register_admin_view_1 = require("./modules/register-admin-view");
var dbs = new database_1.default();
var store = new store_1.default();
dbs.successCallback = function () {
    var PORT = process.env["PORT"] || 8080;
    var app = express();
    // find or make temporary admin user
    dbs.AdminUserModel.findOne({
        name: "darryl"
    }, function (err, res) {
        console.log("looking for admin user");
        if (!res) {
            console.log("no admin user");
            var newAdminUser = new dbs.AdminUserModel({
                _id: new mongoose_1.Types.ObjectId(),
                name: "darryl",
                password: bcrypt.hashSync("0123456789", bcrypt.genSaltSync())
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
    // load standard plugins
    [].map(function (pr) {
        try {
            var x = require("./plugins/standard/" + pr.viewComponent).default;
            store.addPlugin(register_admin_view_1.registerAdminView(pr, x));
        }
        catch (error) {
            console.error("Could not load plugin", x.viewName, error);
        }
    });
    // load custom plugsins
    require(path.join(__dirname, "register.json")).plugins.map(function (pr) {
        try {
            var x = require("./plugins/custom/" + pr.viewComponent).default;
            store.addPlugin(register_admin_view_1.registerAdminView(pr, x));
        }
        catch (error) {
            console.error("Could not load plugin", x.viewName, error);
        }
    });
    app.use("/public", express.static(path.join(__dirname, "public")));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(routes_1.default(dbs, store));
    app.use("/api", api_1.default(dbs, store));
    app.listen(PORT, function () {
        console.log("Listening on port", PORT);
    });
};
dbs.errorCallback = function () {
    console.log("Fail fallback server");
    var PORT = process.env["PORT"] || 8080;
    var app = express();
    app.use("/public", express.static(path.join(__dirname, "public")));
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
