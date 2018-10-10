"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var mongoose_1 = require("mongoose");
var bcrypt = require("bcryptjs");
var admin_routes_1 = require("./modules/admin-routes");
var api_1 = require("./modules/api");
var theme_routes_1 = require("./modules/theme-routes");
var database_1 = require("./modules/database");
var store_1 = require("./modules/store");
var render_1 = require("./modules/render");
var register_admin_view_1 = require("./modules/register-admin-view");
var fs_1 = require("fs");
var helpers_1 = require("./modules/helpers");
var dbs = new database_1.default();
var store = new store_1.default();
function getStuff(pluginType) {
    if (pluginType === void 0) { pluginType = "standard"; }
    fs_1.readdirSync(path.join(__dirname, "plugins/" + pluginType))
        .map(function (folder) {
        var pr = require(path.join(__dirname, "plugins/custom", folder, "info.json"));
        var component = require(path.join(__dirname, "plugins/custom", folder, "index"));
        return { pr: pr, component: component, directory: folder };
    })
        .map(function (data) {
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
    var registerData = require(path.join(__dirname, "register.json"));
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
    process.env["THEME"] = registerData.theme || "example";
    // console.log(registerData, process.env["THEME"]);
    // load standard plugins
    getStuff();
    // load custom plugsins
    getStuff("custom");
    app.use("/public", express.static(path.join(__dirname, "public")));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(theme_routes_1.default(dbs, store));
    app.use("/admin", admin_routes_1.default(dbs, store));
    app.use("/api", api_1.default(dbs, store));
    var up = helpers_1.urlPrefixer("/admin");
    app.get("*", function (req, res) {
        // console.log(req.path);
        res.status(404).send(render_1.getView(up(req.url), {
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
