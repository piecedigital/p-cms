import { dangerouslySetHTML } from "../../modules/react-helpers";
import { readFileSync } from "fs";
import { join } from "path";

export function danger() {
    const header = readFileSync(join(__dirname, "partials/header.html")).toString();
    const body = readFileSync(join(__dirname, "index.html")).toString();
    const footer = readFileSync(join(__dirname, "partials/footer.html")).toString();
    return dangerouslySetHTML(`${header}${body}${footer}`);
}