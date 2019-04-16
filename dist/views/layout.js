"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import views
var _404_1 = require("../views/404");
var internal_error_1 = require("../views/internal-error");
var admin_1 = require("../views/admin");
var views = {
    "admin": admin_1.AdminDashboard,
    "adminLogin": admin_1.AdminLogin,
    "404": _404_1.$404,
    "internalError": internal_error_1.InternalError,
};
// export class Layout extends React.Component {
//     state: {
//         theme: any
//     };
//     props: any;
//     constructor(props) {
//         super(props);
//         // console.log("yerrrr", props.match, props.location);
//         let theme = null;
//         try {
//             theme = require(`../themes/${process.env["THEME"]}/index`).danger()
//         } catch (error) {
//             // console.error(error);
//             try {
//                 theme = require(`../themes/${process.env["THEME"]}/index`).default
//             } catch (error) {
//                 // console.error(error);
//                 try {
//                     theme = require(`../themes/example/index`).default
//                 } catch (error) {
//                     // console.error(error);
//                 }
//             }
//         }
//         if(!theme) console.error("There was a problem loading a theme. Even the backup failed...");
//         this.state = {
//             theme
//         };
//     }
//     render() {
//         return ([
//             (this.props.children) ? (
//                 React.Children.map(
//                     this.props.children,
//                     child => React.cloneElement(child as React.ReactElement<any>, this.props)
//                 )
//             ) : (
//                 <Switch>
//                     <Route path="/pc_admin" component={(props) => {
//                         return <AdminDashboard {...props} {...this.props} />;
//                     }} />
//                     <Route path="/" component={(props) => {
//                         return <this.state.theme {...props} {...this.props} />;
//                     }} />
//                     {/* <Route component={$404} /> */}
//                 </Switch>
//             )
//         ]);
//     }
// }
exports.Layout = function (url, options) {
    var theme = null;
    try {
        theme = require("../themes/" + process.env["THEME"] + "/index").default;
    }
    catch (error) {
        // console.error(error);
        try {
            theme = require("../themes/example/index").default;
        }
        catch (error) {
            // console.error(error);
        }
    }
    var stuff = {
        "/pc_admin": admin_1.AdminDashboard,
        "/": theme(url)
    };
    return stuff["/"];
};
