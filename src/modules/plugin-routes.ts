import Store from "./store";
import { join } from "path";

// const app = express();
// let store: Store = null;


export default function  (str: Store, cb: (data) => void) {
    str.getPlugins().map(plugin => {
        // require module and send back to callback
        try {
            const module = require(join(__dirname, `../plugins`, plugin.directory, "api.js"));

            cb(module.default);
        }
        catch(e) {
            console.error(`No API for plugin "${plugin.name}"`);
            // console.error(e);
        }
    });
    // return app;
};