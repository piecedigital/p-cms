import { readFileSync } from "fs";
import { join } from "path";
import { regexURL } from "../../modules/helpers";

interface Route {
    data: string;
    // props?: Record<string, any>
}

export default function(url: string) {
    const header = readFileSync(join(__dirname, "partials/header.handlebars")).toString();
    const footer = readFileSync(join(__dirname, "partials/footer.handlebars")).toString();

    const routes: Record<string, Route> = {
        "/": {
            data: readFileSync(join(__dirname, "pages/home.handlebars")).toString(),
        },
        "/foobar": {
            data: readFileSync(join(__dirname, "pages/foobar.handlebars")).toString()
        },
    };

    // url match
    const arr = Object.keys(routes);
    let page: string = "";
    let i = 0;
    while (!page && i < arr.length) {
        const key = arr[i];
        const xx = new RegExp(regexURL(key));
        const match = url.match(xx);

        if (match) {
            page = routes[key].data;
            break;
        }
        i++;
    }

    return header + page + footer;
}