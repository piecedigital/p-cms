"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars = require("handlebars");
var filter = require("handlebars.filter");
var content_handler_1 = require("../content-handler");
var helpers_1 = require("./helpers");
// filter.registerFilter("foobar", function (data, other) {
//     const res = (data);
//     console.log(data, res, other);
//     return res;
// });
filter.registerHelper(handlebars);
var context = {};
function getView(url, options) {
    return new Promise(function (resolve, reject) {
        var result = "";
        var source = content_handler_1.HandlebarsHandler(url);
        // got through each query and swap parameter markers
        // swapParamMarkers(source);
        helpers_1.queryManyCollections(options.database, source.queryList)
            .then(function (dbData) {
            // console.log(dbData);
            var template = handlebars.compile(source.page);
            result = template(Object.assign(options.data || {}, source.params, dbData));
            resolve(result);
        })
            .catch(function (e) { return reject(e); });
    });
}
exports.getView = getView;
