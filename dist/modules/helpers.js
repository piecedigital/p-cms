"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// gets every plugin and its database data
function aggregateAllPluginData(dbs, store, options, callback) {
    if (options === void 0) { options = {}; }
    new Promise(function (res, rej) {
        var x = store.getPlugins();
        // data gathered from the database
        var data = {
            adminViews: []
        };
        // variable used to track how many databases have been queried
        var dataCollected = 0;
        if (x.length == 0)
            res(data);
        x.map(function (plugin) {
            data.adminViews.push(plugin);
            plugin.databaseCollections.map(function (databaseName) {
                if (data[databaseName]) {
                    console.error("Database \"" + databaseName + "\" conflicts with an existing database of the same name");
                    return;
                }
                dbs.dbs.collection(databaseName).find({}, {}).toArray(function (err, docs) {
                    if (docs === void 0) { docs = []; }
                    dataCollected++;
                    if (err) {
                        console.error(err);
                    }
                    else {
                        data[databaseName] = docs;
                    }
                    if (dataCollected == x.length)
                        res(data);
                });
            });
        });
    })
        .then(function (data) {
        callback(data);
    })
        .catch(function (e) { return console.error(e); });
}
exports.aggregateAllPluginData = aggregateAllPluginData;
function urlPrefixer(prefix) {
    return function (url) {
        return "" + prefix + url;
    };
}
exports.urlPrefixer = urlPrefixer;
