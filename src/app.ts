import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { Types, plugin } from "mongoose";
import * as bcrypt from "bcryptjs";
import adminRoutes from "./modules/admin-routes";
import api from "./modules/api";
import themeRoutes from "./modules/theme-routes";
import Database from "./modules/database";
import Store from "./modules/store";
import { getView } from "./modules/render";
import { UserInterface, User } from "./modules/user.class";
import { registerAdminView } from "./modules/register-admin-view";
import { PluginRegister } from "./modules/plugin.class";
import { readdirSync } from "fs";
import { urlPrefixer, getPlugins } from "./modules/helpers";

const dbs = new Database();
const store = new Store();

function getPluginsAndRegister(pluginType: string = "standard") {
    getPlugins(pluginType, (data) => {
        const {
            pr, component, directory
        } = data;

        try {
            store.addPlugin(registerAdminView(pr, directory, component.default));
        } catch (error) {
            console.error("Could not load plugin", pr.name, error);
        }
    })
}

dbs.successCallback = () => {
    const PORT = process.env["PORT"] || 8080;
    const app = express();

    const registerData = require(path.join(__dirname, "register.json"));

    // find or make temporary admin user
    dbs.AdminUserModel.findOne({
        name: "darryl"
    } as UserInterface, (err, res: Document) => {
        console.log("looking for admin user");

        if(!res) {
            console.log("no admin user");

            const newAdminUser = new dbs.AdminUserModel({
                _id: new Types.ObjectId(),
                name: "darryl",
                password: bcrypt.hashSync("0123456789", bcrypt.genSaltSync())
            } as User);

            newAdminUser.save((err) => {
                if(err) return console.error(err);
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

    app.use("/public", express.static(path.join(__dirname, "public")));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(themeRoutes(dbs, store));
    app.use("/admin", adminRoutes(dbs, store));
    app.use("/api", api(dbs, store));
    var up = urlPrefixer("/admin");
    app.get("*", (req, res) => {
        // console.log(req.path);
        res.status(404).send(getView(up(req.url), {
            title: "Not Found",
            viewName: "404"
        }));
    });

    app.listen(PORT, () => {
        console.log("Listening on port", PORT);
    });
}

dbs.errorCallback = () => {
    console.log("Fail fallback server");

    const PORT = process.env["PORT"] || 8080;

    const app = express();

    app.use("/public", express.static(path.join(__dirname, "public")));
    app.get("*", (req, res) => {
        res.send(getView(req.url, {
            title: "Error",
            viewName: "internalError",
            data: {
                code: 500,
                message: "There was an error establishing a connection to the database"
            }
        }));
    });

    app.listen(PORT, () => {
        console.log("Listening on port", PORT);
    });
}