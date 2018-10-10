import Store from "./store";
import { Plugin } from "./plugin.class";
import Database from "./database";

export interface AggrOptions {
    excludedPlugins?: string[],
    excludedDatabases?: string[]
}

// gets every plugin and its database data
export function aggregateAllPluginData(dbs: Database, store: Store, options: AggrOptions = {}, callback: (data: any) => void) {
    new Promise((res, rej) => {
        const x = store.getPlugins();

        // data gathered from the database
        const data: Record<string, any> = {
            adminViews: []
        };

        // variable used to track how many databases have been queried
        let dataCollected = 0;
        if(x.length == 0) res(data);

        x.map((plugin: Plugin) => {
            data.adminViews.push(plugin);

            plugin.databaseCollections.map((databaseName: string) => {
                if(data[databaseName]) {
                    console.error(`Database "${databaseName}" conflicts with an existing database of the same name`);
                    return;
                }

                dbs.dbs.collection(databaseName).find({}, {}).toArray((err, docs: Document[] = []) => {
                    dataCollected++;

                    if(err) {
                        console.error(err);
                    } else {
                        data[databaseName] = docs;
                    }

                    if(dataCollected == x.length) res(data);
                });
            });
        });
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