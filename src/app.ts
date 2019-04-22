import * as express from "express";
import { join } from "path";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
// import { Types } from "mongoose";
// import * as bcrypt from "bcryptjs";
import * as helmet from "helmet";
import adminRoutes from "./modules/admin-routes";
import api from "./modules/api";
import themeRoutes from "./modules/theme-routes";
import pluginRoutes from "./modules/plugin-routes";
import Database from "./modules/database";
import Store from "./modules/store";
import { getView } from "./modules/render";
// import { UserInterface, User } from "./modules/user.class";
import { registerAdminView } from "./modules/register-admin-view";
import { getPlugins } from "./modules/helpers";
// import { readFile } from "fs";

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

const PORT = process.env["PORT"] || 8080;
const app = express();

let registerData: Record<string, any> = {};

try {
    registerData = require(join(__dirname, "srv-config.json")) || {};
} catch (error) {
}

process.env["THEME"] = registerData.theme || "example";

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

app.use("/favicon.ico", (req, res) => {
    try {
        res.sendFile(join(__dirname, "public/media/images/favicon.ico"));
    } catch(e) {
        console.log("Welp... guess no favicon");
    }
});
app.use("/public", express.static(join(__dirname, "public")));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route setup
app.use("/pc_admin", adminRoutes(dbs, store));
app.use("*", (req, res, next) => {
    if(dbs.Connected) {
        next();
    } else {
        res.redirect("/pc_admin");
    }
})
pluginRoutes("standard", store, data => {
    app.use("/api", data(dbs, store));
});
pluginRoutes("custom", store, data => {
    app.use("/api", data(dbs, store));
});
app.use("/api", api(dbs, store));
app.use(themeRoutes(dbs, store));
app.get("*", (req, res) => {
    // console.log(req.path);
    res.status(404).send(getView(req.url, {
        title: "Not Found",
        viewName: "404"
    }));
});

app.listen(PORT, () => {
    console.log("Listening on port", PORT);
});