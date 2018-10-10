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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var helpers_1 = require("../../../modules/helpers");
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            themes: helpers_1.getThemes() || []
        };
        return _this;
    }
    Index.prototype.render = function () {
        return ([
            React.createElement("div", { className: "page-wrap portfolio" },
                React.createElement("form", { action: "/api/apply-theme", method: "POST" },
                    React.createElement("div", { className: "themes" }, this.state.themes.map(function (theme, ind) {
                        return ([
                            React.createElement("input", { key: "" + theme.directory, type: "radio", name: "theme", id: "" + theme.directory, value: theme.directory, checked: process.env["THEME"] === theme.directory, readOnly: true }),
                            React.createElement("label", { key: "" + theme.directory, htmlFor: "" + theme.directory, className: "theme" },
                                (theme.tr.image) ? (React.createElement("div", { className: "image" },
                                    React.createElement("img", { src: theme.tr.image }))) : null,
                                React.createElement("div", { className: "info" },
                                    React.createElement("div", { className: "project-name" },
                                        React.createElement("span", null, theme.tr.name)),
                                    React.createElement("div", { className: "separator" }),
                                    React.createElement("div", { className: "project-description" },
                                        React.createElement("span", null, theme.tr.description))))
                        ]);
                    })),
                    React.createElement("br", null),
                    React.createElement("div", { className: "separator" }),
                    React.createElement("br", null),
                    React.createElement("button", null, "Apply Theme")))
        ]);
    };
    return Index;
}(React.Component));
exports.default = Index;
