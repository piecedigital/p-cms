import Store from "./store";
import { Plugin, PluginRegister } from "./plugin.class";
import Database from "./database";
import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export interface AggrOptions {
    excludedPlugins?: string[],
    excludedDatabases?: string[]
}

export interface CollectionQuery {
    collectionName: string;
    query: Record<string, string>;
}


export interface regexURLreturn {
    regexURL?: RegExp;
    params?: Record<string, any>;
}

export interface Route {
    page: () => string;
    params?: Record<string, any>,
    query: CollectionQuery[],
}

export interface PageResults {
    page: string;
    params: Record<string, any>;
    queryList: CollectionQuery[];
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
    // component: any,
    directory: string
}

export interface loadedPluginData {
    pr: PluginRegister,
    component: any,
    directory: string
}

export function updateSRVConfig(data: Record<string, any>) {
    let config: Record<string, any> = {};

    try {
        config = JSON.parse(readFileSync(join(__dirname, "../srv-config.json")).toString());
    } catch (error) {
        config.theme = "example";
    }

    Object.keys(data)
        .map(key => {
            let updateData = data[key];

            config[key] = updateData;
        });

    writeFileSync(join(__dirname, "../srv-config.json"), JSON.stringify(data));
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
            if(plugin.databaseCollections.length === 0) {
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
                    data[collectionName] = docs[collectionName];
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

export function queryManyCollections(dbs: Database, queryList: CollectionQuery[]) {
    return new Promise<Record<string, Document[]>>((resolve, reject) => {
        let data: Record<string, Document[]> = {};

        if (!(queryList.length > 0)) {
            resolve(data);
        } else {
            queryList.map((query, ind) => {
                queryOneCollection(dbs, query)
                    .then(data => {
                        if (ind === queryList.length - 1) resolve(data);
                    })
                    .catch(e => console.error(e));
            });
        }
    });
}

export function queryOneCollection(dbs: Database, query: CollectionQuery) {
    return new Promise<Record<string, Document[]>>((resolve, reject) => {
        let data: Record<string, Document[]> = {};

        if(!query) {
            // No query?! YOU GET NOTHING! YOU LOSE! GOOD DAY, SIR!
            resolve(data);
        } else {
            let cursor = dbs.dbs.collection(query.collectionName).find(query.query, {});
            if(cursor) {
                cursor.toArray((err, docs: Document[] = []) => {
                    if (err) {
                        reject(err);
                    } else {
                        data[query.collectionName] = docs || [];
                        resolve(data);
                    }
                });
            } else {
                resolve(data);
            }
        }
    });
}

export function urlPrefixer(prefix: string): (url: string) => string {
    return (url: string): string => {
        return `${prefix}${url}`;
    }
}

// export function getPlugins(pluginType: string = "standard", callback: (data: any) => void) {
export function getPlugins(callback: (data: any) => void) {
    readdirSync(join(__dirname, `../plugins`))
    .map((folder: string) => {
        const pr: PluginRegister = JSON.parse(readFileSync(join(__dirname, `../plugins`, folder, "info.json")).toString());
        const component = readFileSync(join(__dirname, `../plugins`, folder, "index.handlebars")).toString();
        // const component = readFileSync(join(__dirname, `../plugins`, folder, "index.js")).toString();
        return { pr, component, directory: folder };
    })
    .map((data: loadedPluginData) => {
        callback(data);
    });
}

export function getThemes(): loadedThemeData[] {
    return readdirSync(join(__dirname, `../themes`))
    .map((folder: string) => {
        try {
            const tr: ThemeRegister = JSON.parse(readFileSync(join(__dirname, "../themes", folder, "info.json")).toString());
            return { tr, directory: folder };
        }
        catch(e) {
            console.error(`Skipping "${folder}". Reason: ${e.message}` || e);
            return null;
        }
    }).filter(x => !!x); //filters out null values
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

export function getViewContent(url: string, contentRoot: string): PageResults {
    let header: string = "";
    let footer: string = "";
    let json: Record<string, any> = {};

    try {
        header = readFileSync(`${contentRoot}/partials/header.handlebars`).toString();
        footer = readFileSync(`${contentRoot}/partials/footer.handlebars`).toString();
        json = JSON.parse(readFileSync(`${contentRoot}/routes.json`).toString());
    } catch (error) {
        console.error(`Content requires 3 files: "partials/header.handlebars", "partials/footer.handlebars", and "routes.json"`);
        console.error(error.message);
        return {
            params: {},
            queryList: [],
            page: "<center><h1>Critical error getting page content</h1></center>"
        }
    }

    let routes: Record<string, Route> = {};

    Object.keys(json).map(routeKey => {
        const routeData = json[routeKey];
        let data: Route = {
            params: {},
            page: null,
            query: []
        };

        data.params = routeData.params || {};
        data.query = routeData.queryList || [];
        data.page = () => {
            let page = routeData.page;

            const params = regexURL(routeData.page
                .replace(/\.\.\//g, "")
                .replace(/\/\w+\.\w+$/, "")
                .replace("plugins", "plugin"));
            const param = Object.keys(params.params).pop();
            const match = url.match(params.regexURL);

            // console.log(url, params.regexURL, match);

            if (match) {
                page = page.replace(`{:${param}}`, match[1]);
            }

            const path = join(contentRoot, `pages/${page}`);

            return readFileSync(path).toString()
        }

        routes[routeKey] = data;
    });

    // url match
    const results = pickPage(url, routes);
    results.page = header + results.page + footer;

    return results
}

export function getAdminContent(url: string): PageResults {
    const themeRoot = join(__dirname, `../admin`);

    return getViewContent(url, themeRoot);
}

export function getThemeContent(url: string): PageResults {
    const themeRoot = join(__dirname, `../themes/${process.env["THEME"]}`);

    return getViewContent(url, themeRoot);
}

export function pickPage(url: string, routes: Record<string, Route>): PageResults {
    const arr = Object.keys(routes);
    let params: Record<string, any> = {};
    let queryList: CollectionQuery[] = [];
    let page: string = "";
    let i = 0;
    while (!page && i < arr.length) {
        const routeString = arr[i];
        params = routes[routeString].params || {};
        queryList = routes[routeString].query || [];
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
            page = routes[routeString].page();
            break;
        }
        i++;
    }

    if(!page) {
        const routeString = "404";
        page = routes[routeString].page();
    }

    const res = {
        page,
        params,
        queryList
    };

    swapParamMarkers(res);

    return res;
}

export function swapParamMarkers(res: PageResults): void {
    res.queryList.map((queryObject, index) => {
        if (!queryObject.query) return;

        Object.keys(queryObject.query)
            .map(queryKey => {
                const queryData = queryObject.query[queryKey];

                const regexMatcher = /{:(.+)}/;
                const match = queryData.match(regexMatcher);

                const param = Object.keys(regexURL(queryData).params).pop();

                if (match) {
                    // swap
                    res.queryList[index].query[queryKey] = res.params[param];

                    console.log(queryKey, queryData, param, res.params[param]);
                }
            });
    });
}