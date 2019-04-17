import { readFileSync } from "fs";
import { join } from "path";
import { regexURL, pickPage, PageResults, Route } from "../../modules/helpers";

export default function(url: string): PageResults {
    let header: string = "";
    let footer: string = "";
    let json: Record<string, any> = {};
    try {
        header = readFileSync(join(__dirname, "partials/header.handlebars")).toString();
        footer = readFileSync(join(__dirname, "partials/footer.handlebars")).toString();
        json = JSON.parse(readFileSync(join(__dirname, "routes.json")).toString());
    } catch (error) {
        console.error(`Theme requires 3 files: "partials/header.handlebars", "partials/footer.handlebars", and "routes.json"`);
    }

    let routes: Record<string, Route> = {};

    Object.keys(json).map(routeKey => {
        const routeData = json[routeKey];
        let data: Route = {
            props: {},
            page: null
        };

        data.props = routeData.props || {};
        data.page = (params: Record<string, any> = null) => {
            return readFileSync(join(__dirname, "pages", routeData.page)).toString()
        }

        routes[routeKey] = data;
    });

    // url match
    const results = pickPage(url, routes);
    results.page = header + results.page + footer;

    return results
}