import { Plugin, PluginRegister } from "./plugin.class";

export function registerAdminView(data: PluginRegister, component: any): Plugin {
    // console.log("register", data);

    return new Plugin(data.viewName, component, data.databaseCollections, data.props);
}

