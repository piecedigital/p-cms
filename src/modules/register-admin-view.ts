import { Plugin, PluginRegister } from "./plugin.class";

export function registerAdminView(data: PluginRegister, directory: string/*, component: any*/): Plugin {
    // console.log("register", data);

    return new Plugin(data, directory/*, component*/);
}

