import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router } from "react-router";
// import views
import { Layout } from "../views/layout";
import { Home } from "../views/home";
import { $404 } from "../views/404";
import { InternalError } from "../views/internal-error";
import { AdminDashboard, AdminLogin } from "../views/admin";
import Database from "./database";

const context = {};

const views: Record<string, any> = {
    "index": Home,
    "home": Home,
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

    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <title>${options.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" media="screen" href="/public/css/style.css" />
    </head>
    <body>
        <div class="react-app">
            ${renderToString(
                (View) ? (
                    <Router location={url} context={context}>
                        <Layout {...options.data} database={options.database}>
                            <View />
                        </Layout>
                    </Router>
                ) : (
                    <Router location={url} context={context}>
                        <Layout {...options.data} database={options.database} />
                    </Router>
                )
            )}
        </div>
    </body>
    </html>`;
}