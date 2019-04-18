import Store from "./store";
import { Plugin, PluginRegister } from "./plugin.class";
import Database from "./database";
import { readdirSync, readFileSync } from "fs";
import { join } from "path";

export interface AggrOptions {
    excludedPlugins?: string[],
    excludedDatabases?: string[]
}

export interface CollectionQuery {
    collectionName: string;
    query: Record<string, any>;
}

// gets every plugin and its database data
export function aggregateAllPluginData(dbs: Database, store: Store, options: AggrOptions = {}, callback: (data: any) => void) {
    new Promise((res, rej) => {
        const plugins = store.getPlugins();

        // data gathered from the database
        const data: Record<string, any> = {
            adminViews: []
        };

        // variable used to track how many collections have been queried
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

        // get collection documents for a given plugin
        function itter2(plugin: Plugin) {
            console.log("getting plugin database data");
            if(plugin.databaseCollections.length == 0) {
                itter1();
            }

            let dataCollected = 0;
            plugin.databaseCollections.map((collectionName: string) => {
                // make sure database collections don't clash
                if(data[collectionName]) {
                    console.error(`Database "${collectionName}" for plugin "${plugin.name}" conflicts with an existing database of the same name`);
                    return;
                }

                queryOneCollection(dbs, {
                    collectionName,
                    query: {}
                })
                .then((docs) => {
                    data[collectionName] = docs;
                    dataCollected++;
                    if(dataCollected == plugin.databaseCollections.length) itter1();
                })
                .catch(e => console.error(e));
            });
        }

        itter1();
    })
    .then((data: any) => {
        callback(data);
    })
    .catch(e => console.error(e));
}

export function queryOneCollection(dbs: Database, query: CollectionQuery) {
    return new Promise<Record<string, Document[]>>((resolve, reject) => {
        let data: Record<string, Document[]> = {};

        if(!query) return resolve(data);

        dbs.dbs.collection(query.collectionName).find(query.query, {}).toArray((err, docs: Document[] = []) => {
            if (err) {
                reject(err);
            } else {
                data[query.collectionName] = docs || [];
                resolve(data);
            }
        });
    });
}

export function queryManyCollections(dbs: Database, queryList: CollectionQuery[] ) {
    return new Promise<Record<string, Document[]>>((resolve, reject) => {
        let data: Record<string, Document[]> = {};

        queryList.map((query, ind) => {
            queryOneCollection(dbs, query)
            .then(data => {
                if (ind === queryList.length-1) resolve(data);
            })
            .catch(e => console.error(e));
        });
    });
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

export interface regexURLreturn {
    regexURL?: RegExp;
    params?: Record<string, any>;
}

export function regexURL(url: string) {
    let x: regexURLreturn = {
        params: {}
    };

    x.regexURL = new RegExp(url
        .replace("/", "\\/")
        .replace(".", "\\.")
        .replace(/{:[\w\d\-_]+}/g, (_) => {
            x.params[_.replace(/({:|})/g, "")] = null;
            return "(.+)";
        }), "i");

    return x;
}

export interface Route {
    page: (params: Record<string, any>) => string;
    params?: Record<string, any>,
    query: CollectionQuery[],
}

export interface PageResults {
    page: string;
    params: Record<string, any>;
    query: CollectionQuery[];
}

export function pickPage(url: string, routes: Record<string, Route>): PageResults {
    const arr = Object.keys(routes);
    let params: Record<string, any> = {};
    let query: CollectionQuery[] = [];
    let page: string = "";
    let i = 0;
    while (!page && i < arr.length) {
        const routeString = arr[i];
        params = routes[routeString].params || {};
        query = routes[routeString].query || [];
        const x = regexURL(routeString);
        const xx = new RegExp(x.regexURL);
        const match = url.match(xx);

        if (match) {
            var paramList = Object.keys(x.params);
            paramList.unshift(null);
            match.map((x, i) => {
                if(i>0) {
                    params[paramList[i]] = x;
                }
            });
            page = routes[routeString].page(params);
            break;
        }
        i++;
    }

    if(!page) {
        const routeString = "404";
        page = routes[routeString].page(params);
    }
    return {
        page,
        params,
        query
    };
}