"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
// gets every plugin and its database data
function aggregateAllPluginData(dbs, store, options, callback) {
    if (options === void 0) { options = {}; }
    new Promise(function (res, rej) {
        var plugins = store.getPlugins();
        // data gathered from the database
        var data = {
            adminViews: []
        };
        // variable used to track how many databases have been queried
        if (plugins.length == 0) {
            res(data);
            return;
        }
        var index = -1;
        function itter1() {
            index++;
            if (index >= plugins.length) {
                console.log("no more plugins");
                res(data);
                return;
            }
            data.adminViews.push(plugins[index]);
            itter2(plugins[index]);
        }
        function itter2(plugin) {
            console.log("getting plugin database data");
            if (plugin.databaseCollections.length == 0) {
                itter1();
            }
            var dataCollected = 0;
            plugin.databaseCollections.map(function (databaseName) {
                if (data[databaseName]) {
                    console.error("Database \"" + databaseName + "\" conflicts with an existing database of the same name");
                    return;
                }
                dbs.dbs.collection(databaseName).find({}, {}).toArray(function (err, docs) {
                    if (docs === void 0) { docs = []; }
                    if (err) {
                        console.error(err);
                    }
                    else {
                        data[databaseName] = docs;
                    }
                    dataCollected++;
                    if (dataCollected == plugin.databaseCollections.length)
                        itter1();
                });
            });
        }
        itter1();
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
function getPlugins(pluginType, callback) {
    if (pluginType === void 0) { pluginType = "standard"; }
    fs_1.readdirSync(path_1.join(__dirname, "../plugins/" + pluginType))
        .map(function (folder) {
        var pr = require(path_1.join(__dirname, "../plugins/" + pluginType, folder, "info.json"));
        var component = require(path_1.join(__dirname, "../plugins/" + pluginType, folder, "index"));
        return { pr: pr, component: component, directory: folder };
    })
        .map(function (data) {
        callback(data);
    });
}
exports.getPlugins = getPlugins;
function getThemes() {
    var returnData = null;
    return fs_1.readdirSync(path_1.join(__dirname, "../themes"))
        .map(function (folder) {
        var tr = require(path_1.join(__dirname, "../themes", folder, "info.json"));
        var component = require(path_1.join(__dirname, "../themes", folder, "index"));
        return { tr: tr, component: component, directory: folder };
    });
    return returnData;
}
exports.getThemes = getThemes;
