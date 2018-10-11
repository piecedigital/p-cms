import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router, Route } from "react-router";
// import views
import { Layout } from "../views/layout";
// import { Home } from "../views/home";
import { $404 } from "../views/404";
import { InternalError } from "../views/internal-error";
import { AdminDashboard, AdminLogin } from "../views/admin";
import Database from "./database";

const context = {};

const views: Record<string, any> = {
    // "index": Home,
    // "home": Home,
    "admin": AdminDashboard,
    "adminLogin": AdminLogin,
    "404": $404,
    "internalError": InternalError,
}

export interface renderOptions {
    title: string;
    viewName?: string;
    data?: Record<string, any>;
    database?: Database;
}

export function getView(url: string, options: renderOptions): string {
    options.viewName = options.viewName;
    const View = views[options.viewName];

    return `${renderToString(
                (View) ? (
                    <Router location={url} context={context}>
                        <Route exact={true} component={(props) => <Layout {...props} {...options.data} database={options.database} />} >
                            <View />
                        </Route>
                    </Router>
                ) : (
                    <Router location={url} context={context}>
                        <Route exact={true} component={(props) => <Layout {...props} {...options.data} database={options.database} />} />
                    </Router>
                )
            )}`;
}