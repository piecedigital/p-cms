import Store from "./store";
import { join } from "path";

// const app = express();
// let store: Store = null;


export default function (pluginType: string, str: Store, cb: (data) => void) {
    str.getPlugins().map(plugin => {
        // require module and send back to callback
        try {
            const module = require(join(__dirname, `../plugins/${pluginType}`, plugin.directory, "api.js"));

            cb(module.default);
        }
        catch(e) {
            console.error(`No API for ${pluginType} plugin "${plugin.name}"`);
            // console.error(e);
        }
    });
    // return app;
};