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
// import views
var _404_1 = require("../views/404");
var internal_error_1 = require("../views/internal-error");
var admin_1 = require("../views/admin");
var helpers_1 = require("../modules/helpers");
var views = {
    "admin": admin_1.AdminDashboard,
    "adminLogin": admin_1.AdminLogin,
    "404": _404_1.$404,
    "internalError": internal_error_1.InternalError,
};
var ReactHandler = /** @class */ (function (_super) {
    __extends(ReactHandler, _super);
    function ReactHandler(props) {
        var _this = _super.call(this, props) || this;
        // console.log("yerrrr", props.match, props.location);
        _this.state = {};
        return _this;
    }
    ReactHandler.prototype.render = function () {
        var _this = this;
        return ([
            (this.props.children) ? (React.Children.map(this.props.children, function (child) { return React.cloneElement(child, _this.props); })) : path = "/pc_admin", component = {}(props),
            __assign({ return: function () { } }, props),
            __assign({}, this.props) /  > 
        ]);
    };
    return ReactHandler;
}(React.Component));
exports.ReactHandler = ReactHandler;
/>
    < /Switch>;
;
exports.HandlebarsHandler = function (url) {
    if (url.match(/^\/pc_admin/)) {
        return helpers_1.getAdminContent(url);
    }
    else {
        return helpers_1.getThemeContent(url);
    }
};
