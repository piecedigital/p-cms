"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var server_1 = require("react-dom/server");
var react_router_1 = require("react-router");
var handlebars = require("handlebars");
var filter = require("handlebars.filter");
var layout_1 = require("../views/layout");
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
        if (url.match(/^\/pc_admin/)) {
            // TODO: move aggregation here
            result = "" + server_1.renderToString(React.createElement(react_router_1.StaticRouter, { location: url, context: context },
                React.createElement(react_router_1.Route, { exact: true, component: function (props) { return React.createElement(layout_1.ReactHandler, __assign({}, props, options.data, { database: options.database })); } })));
            resolve(result);
        }
        else {
            var source_1 = layout_1.HandlebarsHandler(url);
            // got through each query and swap parameter markers
            source_1.queryList.map(function (queryObject, index) {
                if (!queryObject.query)
                    return;
                Object.keys(queryObject.query)
                    .map(function (queryKey) {
                    var queryData = queryObject.query[queryKey];
                    var regexMatcher = /{:(.+)}/;
                    var match = queryData.match(regexMatcher);
                    var param = Object.keys(helpers_1.regexURL(queryData).params).pop();
                    if (match) {
                        // swap
                        source_1.queryList[index].query[queryKey] = source_1.params[param];
                    }
                });
            });
            helpers_1.queryManyCollections(options.database, source_1.queryList)
                .then(function (dbData) {
                // console.log(dbData);
                var template = handlebars.compile(source_1.page);
                result = template(Object.assign(options.data || {}, source_1.params, dbData));
                resolve(result);
            })
                .catch(function (e) { return reject(e); });
        }
    });
}
exports.getView = getView;
