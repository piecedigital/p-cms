import * as handlebars from "handlebars";
import * as filter from "handlebars.filter";
import { HandlebarsHandler } from "../content-handler";
import Database from "./database";
import { queryManyCollections } from "./helpers";

filter.registerFilter("currentTheme", function (data, other, another) {
    return data === process.env["THEME"];
});
filter.registerHelper(handlebars);

const context = {};

export interface renderOptions {
    title: string;
    viewName?: string;
    data?: Record<string, any>;
    database?: Database;
}

export function getView(url: string, options: renderOptions): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        let result = "";

        const source = HandlebarsHandler(url);

        // got through each query and swap parameter markers
        // swapParamMarkers(source);

        queryManyCollections(options.database, source.queryList)
            .then((dbData) => {
                // console.log(dbData);
                const template = handlebars.compile(source.page);
                result = template(Object.assign(options.data || {}, source.params, dbData));

                resolve(result);
            })
            .catch(e => reject(e));
    });
}