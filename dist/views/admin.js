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
var react_router_dom_1 = require("react-router-dom");
var _404_1 = require("./404");
var header_1 = require("./partials/header");
var footer_1 = require("./partials/footer");
var AdminDashboard = /** @class */ (function (_super) {
    __extends(AdminDashboard, _super);
    function AdminDashboard(props) {
        var _this = _super.call(this, props) || this;
        // console.log("admin", props);
        _this.state = {
            adminViews: props.adminViews || []
        };
        return _this;
    }
    AdminDashboard.prototype.render = function () {
        var _this = this;
        return ([
            React.createElement("span", { dangerouslySetInnerHTML: {
                    __html: header_1.default({
                        title: "Admin Dashboard"
                    })
                } }),
            React.createElement("div", { className: "admin-dashboard" },
                React.createElement("div", { className: "nav" },
                    React.createElement("div", { className: "item" },
                        React.createElement(react_router_dom_1.Link, { to: "/" }, "View Site")),
                    React.createElement("div", { className: "item" },
                        React.createElement(react_router_dom_1.Link, { to: "/pc_admin/logout" }, "Logout"))),
                React.createElement("section", { className: "side-panel" },
                    React.createElement(react_router_dom_1.Link, { to: "/pc_admin", className: "row logo" },
                        React.createElement("h4", null, "My CMS")),
                    this.state.adminViews.map(function (view, ind) {
                        return (React.createElement(react_router_dom_1.Link, { key: view.directory + "-" + ind, to: "/pc_admin/plugin/" + view.slug(), className: "row" },
                            React.createElement("h4", null, view.name)));
                    })),
                React.createElement("section", { className: "main-content" },
                    React.createElement(react_router_1.Switch, null,
                        React.createElement(react_router_1.Route, { path: "/pc_admin/login", render: function (props) { return React.createElement(AdminLogin, __assign({}, props, _this.props)); } }),
                        React.createElement(react_router_1.Route, { path: "/pc_admin/signup", render: function (props) { return React.createElement(AdminSignup, __assign({}, props, _this.props)); } }),
                        React.createElement(react_router_1.Route, { path: "/pc_admin/db-setup", render: function (props) { return React.createElement(AdminDBSetup, __assign({}, props, _this.props)); } }),
                        this.state.adminViews.map(function (view) {
                            return (React.createElement(react_router_1.Route, { key: view.name, path: "/pc_admin/plugin/" + view.directory, render: function (props) { return React.createElement(view.component, __assign({}, props, _this.props)); } }));
                        }),
                        React.createElement(react_router_1.Route, { path: "/pc_admin", render: function (props) { return React.createElement(AdminDashboardWelcome, __assign({}, props, _this.props)); } }),
                        React.createElement(react_router_1.Route, { path: "*", render: function (props) { return React.createElement(_404_1.$404, __assign({}, props, _this.props)); } })))),
            React.createElement("span", { dangerouslySetInnerHTML: {
                    __html: footer_1.default(null)
                } })
        ]);
    };
    return AdminDashboard;
}(React.Component));
exports.AdminDashboard = AdminDashboard;
var AdminDashboardWelcome = /** @class */ (function (_super) {
    __extends(AdminDashboardWelcome, _super);
    function AdminDashboardWelcome(props) {
        return _super.call(this, props) || this;
    }
    AdminDashboardWelcome.prototype.render = function () {
        return ([
            React.createElement("section", { className: "header" },
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("header", null,
                        React.createElement("h1", null, "Welcome!"))))
        ]);
    };
    return AdminDashboardWelcome;
}(React.Component));
exports.AdminDashboardWelcome = AdminDashboardWelcome;
var AdminLogin = /** @class */ (function (_super) {
    __extends(AdminLogin, _super);
    function AdminLogin(props) {
        return _super.call(this, props) || this;
    }
    AdminLogin.prototype.render = function () {
        return ([
            React.createElement("section", { className: "header" },
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("header", null,
                        React.createElement("h1", null, "Login")),
                    React.createElement("form", { action: "/pc_admin/login", method: "POST" },
                        React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrfToken }),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Username:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "text", name: "username" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Password:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "password", name: "password" })),
                        React.createElement("div", null,
                            React.createElement("button", { type: "submit" }, "Login")))))
        ]);
    };
    return AdminLogin;
}(React.Component));
exports.AdminLogin = AdminLogin;
var AdminSignup = /** @class */ (function (_super) {
    __extends(AdminSignup, _super);
    function AdminSignup(props) {
        return _super.call(this, props) || this;
    }
    AdminSignup.prototype.render = function () {
        return ([
            React.createElement("section", { className: "header" },
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("header", null,
                        React.createElement("h1", null, "Signup")),
                    React.createElement("form", { action: "/pc_admin/signup", method: "POST" },
                        React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrfToken }),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Your Name:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "text", name: "displayName" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Username:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "text", name: "username" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Password:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "password", name: "password" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Password:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "password", name: "passwordConfirm" })),
                        React.createElement("div", null,
                            React.createElement("button", { type: "submit" }, "Signup")))))
        ]);
    };
    return AdminSignup;
}(React.Component));
exports.AdminSignup = AdminSignup;
var AdminDBSetup = /** @class */ (function (_super) {
    __extends(AdminDBSetup, _super);
    function AdminDBSetup(props) {
        return _super.call(this, props) || this;
    }
    AdminDBSetup.prototype.render = function () {
        return ([
            React.createElement("section", { className: "header" },
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("header", null,
                        React.createElement("h1", null, "Setup Database Connection")),
                    React.createElement("form", { action: "/pc_admin/db-setup", method: "POST" },
                        React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrfToken }),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Database Name:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "text", name: "dbName", placeholder: "piecedigital-cms" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Database Host:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "text", name: "dbHost", placeholder: "localhost" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Username:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "text", name: "username" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "" }, "Password:"),
                            React.createElement("br", null),
                            React.createElement("input", { type: "password", name: "password" })),
                        React.createElement("div", null,
                            React.createElement("button", { type: "submit" }, "Submit")))))
        ]);
    };
    return AdminDBSetup;
}(React.Component));
exports.AdminDBSetup = AdminDBSetup;
