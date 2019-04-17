import { readFileSync } from "fs";
import { join } from "path";
import { regexURL, pickPage, PageResults, Route } from "../../modules/helpers";

export default function(url: string): PageResults {
    console.log("called", url);

    const header = readFileSync(join(__dirname, "partials/header.handlebars")).toString();
    const footer = readFileSync(join(__dirname, "partials/footer.handlebars")).toString();

    const routes: Record<string, Route> = {
        "/foobar/{:id}": {
            page: (params: Record<string, any> = null) => {
                return readFileSync(join(__dirname, "pages/foobar.handlebars")).toString()
            }
        },
        "/foobar": {
            props: {
                title: "FUBAR"
            },
            page: (params: Record<string, any> = null) => readFileSync(join(__dirname, "pages/foobar.handlebars")).toString()
        },
        "/$": {
            props: {
                title: "Home alt"
            },
            page: (params: Record<string, any> = null) => readFileSync(join(__dirname, "pages/home.handlebars")).toString()
        },
        "404": {
            props: {
                title: "404: Not Found"
            },
            page: (params: Record<string, any> = null) => {
                return readFileSync(join(__dirname, "pages/home.handlebars")).toString();
            }
        },
    };

    // url match
    const results = pickPage(url, routes);
    results.page = header + results.page + footer;

    return results
}