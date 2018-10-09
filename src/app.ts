import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import { Types } from "mongoose";
import * as bcrypt from "bcryptjs";
import routes from "./modules/routes";
import api from "./modules/api";
import Database from "./modules/database";
import Store from "./modules/store";
import { getView } from "./modules/render";
import { UserInterface, User } from "./modules/user.class";
import { registerAdminView } from "./modules/register-admin-view";
import { Plugin, PluginRegister } from "./modules/plugin.class";

const dbs = new Database();
const store = new Store();

dbs.successCallback = () => {
    const PORT = process.env["PORT"] || 8080;

    const app = express();

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

    // load standard plugins
    [].map((pr: PluginRegister) => {
        try {
            var x = require(`./plugins/standard/${pr.viewComponent}`).default;
            store.addPlugin(registerAdminView(pr, x));
        } catch (error) {
            console.error("Could not load plugin", x.viewName, error);
        }
    });
    // load custom plugsins
    require(path.join(__dirname, "register.json")).plugins.map((pr: PluginRegister) => {
        try {
            var x = require(`./plugins/custom/${pr.viewComponent}`).default;
            store.addPlugin(registerAdminView(pr, x));
        } catch (error) {
            console.error("Could not load plugin", x.viewName, error);
        }
    });

    app.use("/public", express.static(path.join(__dirname, "public")));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(routes(dbs, store));
    app.use("/api", api(dbs, store));

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