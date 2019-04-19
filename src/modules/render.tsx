import * as React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter as Router, Route } from "react-router";
import * as handlebars from "handlebars";
// import views
import { HandlebarsHandler, ReactHandler } from "../views/layout";
// import { Home } from "../views/home";
import { $404 } from "../views/404";
import { InternalError } from "../views/internal-error";
import { AdminDashboard, AdminLogin } from "../views/admin";
import Database from "./database";
import { queryOneCollection, queryManyCollections, regexURL } from "./helpers";

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

export function getView(url: string, options: renderOptions): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let result = "";

        if(url.match(/^\/pc_admin/)) {
            // TODO: move aggregation here

            result = `${renderToString(
                <Router location={url} context={context}>
                    <Route exact={true} component={(props) => <ReactHandler {...props} {...options.data} database={options.database} />} />
                </Router>
            )}`;

            resolve(result);
        } else {
            const source = HandlebarsHandler(url);

            // got through each query and swap parameter markers
            source.queryList.map((queryObject, index) => {
                if(!queryObject.query) return;

                Object.keys(queryObject.query)
                    .map(queryKey => {
                        const queryData = queryObject.query[queryKey];

                        const regexMatcher = /{:(.+)}/;
                        const match = queryData.match(regexMatcher);

                        const param = Object.keys(regexURL(queryData).params).pop();

                        if (match) {
                            // swap
                            source.queryList[index].query[queryKey] = source.params[param];
                        }
                    });
            });

            queryManyCollections(options.database, source.queryList)
                .then((dbData) => {
                    // console.log(dbData);

                    const template = handlebars.compile(source.page);
                    result = template(Object.assign(options.data || {}, source.params, dbData));

                    resolve(result);
                })
                .catch(e => reject(e));
        }
    });
}