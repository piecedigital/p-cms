"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars = require("handlebars");
// import views
var layout_1 = require("../views/layout");
// import { Home } from "../views/home";
var _404_1 = require("../views/404");
var internal_error_1 = require("../views/internal-error");
var admin_1 = require("../views/admin");
var context = {};
var views = {
    // "index": Home,
    // "home": Home,
    "admin": admin_1.AdminDashboard,
    "adminLogin": admin_1.AdminLogin,
    "404": _404_1.$404,
    "internalError": internal_error_1.InternalError,
};
// export function getView(url: string, options: renderOptions): string {
//     return `${renderToString(
//         <Router location={url} context={context}>
//             <Route exact={true} component={(props) => <Layout {...props} {...options.data} database={options.database} />} />
//         </Router>
//     )}`;
// }
function getView(url, options) {
    var source = layout_1.Layout(url, options);
    var template = handlebars.compile(source);
    var result = template(options.data);
    return result;
}
exports.getView = getView;
