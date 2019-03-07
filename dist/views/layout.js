"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var react_router_1 = require("react-router");
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
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(props) {
        var _this = _super.call(this, props) || this;
        // console.log("yerrrr", props.match, props.location);
        var theme = null;
        try {
            theme = require("../themes/" + process.env["THEME"] + "/index").danger();
        }
        catch (error) {
            // console.error(error);
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
        }
        if (!theme)
            console.error("There was a problem loading a theme. Even the backup failed...");
        _this.state = {
            theme: theme
        };
        return _this;
    }
    Layout.prototype.render = function () {
        var _this = this;
        return ([
            (this.props.children) ? (React.Children.map(this.props.children, function (child) { return React.cloneElement(child, _this.props); })) : (React.createElement(react_router_1.Switch, null,
                React.createElement(react_router_1.Route, { path: "/pc_admin", component: function (props) {
                        return React.createElement(admin_1.AdminDashboard, __assign({}, props, _this.props));
                    } }),
                React.createElement(react_router_1.Route, { path: "/", component: function (props) {
                        return React.createElement(_this.state.theme, __assign({}, props, _this.props));
                    } })))
        ]);
    };
    return Layout;
}(React.Component));
exports.Layout = Layout;
