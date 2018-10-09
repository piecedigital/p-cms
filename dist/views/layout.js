"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var home_1 = require("../views/home");
var _404_1 = require("../views/404");
var internal_error_1 = require("../views/internal-error");
var admin_1 = require("../views/admin");
var views = {
    "index": home_1.Home,
    "home": home_1.Home,
    "admin": admin_1.AdminDashboard,
    "adminLogin": admin_1.AdminLogin,
    "404": _404_1.$404,
    "internalError": internal_error_1.InternalError,
};
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Layout.prototype.render = function () {
        var _this = this;
        return ([
            React.createElement("nav", null,
                React.createElement("div", { className: "page-wrap" })),
            (this.props.children) ? (React.Children.map(this.props.children, function (child) { return React.cloneElement(child, _this.props); })) : (React.createElement(react_router_1.Switch, null,
                React.createElement(react_router_1.Route, { path: "/admin*", render: function (props) { return React.createElement(admin_1.AdminDashboard, __assign({}, props, _this.props)); } }),
                React.createElement(react_router_1.Route, { path: "/", render: function (props) { return React.createElement(home_1.Home, __assign({}, props, _this.props)); } }),
                React.createElement(react_router_1.Route, { component: _404_1.$404 }))),
            React.createElement("section", { className: "footer" },
                React.createElement("div", { className: "section-separator" },
                    React.createElement("div", { className: "triangle" })),
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("footer", null, "\u00A9 Copyright  Darryl Dixon, 2018. All Rights Reserved.")))
        ]);
    };
    return Layout;
}(React.Component));
exports.Layout = Layout;
