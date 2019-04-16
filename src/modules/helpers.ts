import Store from "./store";
import { Plugin, PluginRegister } from "./plugin.class";
import Database from "./database";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

export interface AggrOptions {
    excludedPlugins?: string[],
    excludedDatabases?: string[]
}

// gets every plugin and its database data
export function aggregateAllPluginData(dbs: Database, store: Store, options: AggrOptions = {}, callback: (data: any) => void) {
    new Promise((res, rej) => {
        const plugins = store.getPlugins();

        // data gathered from the database
        const data: Record<string, any> = {
            adminViews: []
        };

        // variable used to track how many databases have been queried
        if(plugins.length == 0) {
            res(data);
            return;
        }

        let index: number = -1;

        // iterate and send plugin info to itter2 until there are no more plugins
        function itter1() {
            index++;

            if(index >= plugins.length) {
                console.log("no more plugins");

                res(data);
                return;
            }

            data.adminViews.push(plugins[index]);
            itter2(plugins[index]);
        }

        // get database collection documents for a given plugin
        function itter2(plugin: Plugin) {
            console.log("getting plugin database data");
            if(plugin.databaseCollections.length == 0) {
                itter1();
            }

            let dataCollected = 0;
            plugin.databaseCollections.map((databaseName: string) => {
                // make sure database collections don't clash
                if(data[databaseName]) {
                    console.error(`Database "${databaseName}" for plugin "${plugin.name}" conflicts with an existing database of the same name`);
                    return;
                }

                dbs.dbs.collection(databaseName).find({}, {}).toArray((err, docs: Document[] = []) => {
                    if(err) {
                        console.error(err);
                    } else {
                        data[databaseName] = docs;
                    }
                    dataCollected++;
                    if(dataCollected == plugin.databaseCollections.length) itter1();
                });
            });
        }

        itter1();
    })
    .then((data: any) => {
        callback(data);
    })
    .catch(e => console.error(e));
}

export function urlPrefixer(prefix: string): (url: string) => string {
    return (url: string): string => {
        return `${prefix}${url}`;
    }
}

export interface loadedPluginData {
    pr: PluginRegister,
    component: any,
    directory: string
}

export function getPlugins(pluginType: string = "standard", callback: (data: any) => void) {
    readdirSync(join(__dirname, `../plugins/${pluginType}`))
    .map((folder: string) => {
        const pr: PluginRegister = require(join(__dirname, `../plugins/${pluginType}`, folder, "info.json"));
        const component = require(join(__dirname, `../plugins/${pluginType}`, folder, "index"));
        return { pr, component, directory: folder };
    })
    .map((data: loadedPluginData) => {
        callback(data);
    });
}

export interface ThemeRegister {
    name: string;
    description?: string,
    dateCreated?: string,
    author?: string,
    company?: string,
    image?: string
}

export interface loadedThemeData {
    tr: ThemeRegister,
    component: any,
    directory: string
}

export function getThemes(): loadedThemeData[] {
    return readdirSync(join(__dirname, `../themes`))
    .map((folder: string) => {
        try {
            const tr: ThemeRegister = require(join(__dirname, "../themes", folder, "info.json"));
            const component = require(join(__dirname, "../themes", folder, "index"));
            return { tr, component, directory: folder };
        }
        catch(e) {
            console.error(`Skipping "${folder}". Reason: ${e.message}` || e);
            return null;
        }
    }).filter(x => !!x); //filters out null values
}

export function generatedDatabaseDates(): {
    createdAt: number,
    updatedAt: number
} {
    const d = Date.now();
    return {
        createdAt: d,
        updatedAt: d,
    }
}

export function regexURL(url: string) {
    return new RegExp(url
        .replace("/", "\\/")
        .replace(".", "\\."), "i");
}