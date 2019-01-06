import { dangerouslySetHTML, dangerousHTML } from "../../modules/react-helpers";
import { readFileSync } from "fs";
import { join } from "path";

export function danger() {
    const header = readFileSync(join(__dirname, "partials/header.html")).toString();// html files are already in relative dist folder. only ts files get moved
    const footer = readFileSync(join(__dirname, "partials/footer.html")).toString();// html files are already in relative dist folder. only ts files get moved

    const homeBody = readFileSync(join(__dirname, "index.html")).toString();
    const foobarBody = readFileSync(join(__dirname, "index.1.html")).toString();

    const home = new dangerousHTML("/", `${header}${homeBody}${footer}`);
    const foobar = new dangerousHTML("/foobar", `${header}${foobarBody}${footer}`);

    return dangerouslySetHTML([home, foobar]);
}