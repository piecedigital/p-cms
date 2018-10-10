import { Plugin } from "./plugin.class";

export default class Store {
    plugins: Plugin[];

    constructor() {
        this.plugins = [];
    }

    addPlugin(p: Plugin) {
        this.plugins.push(p);
    }

    getPlugins(): Plugin[] {
        return this.plugins;
    }

    getPluginByName(name: string): Plugin {
        return this.plugins.find(x => !!x.name.match(name));
    }
}