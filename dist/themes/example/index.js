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
var header_1 = require("./partials/header");
var footer_1 = require("./partials/footer");
var react_router_1 = require("react-router");
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index(props) {
        return _super.call(this, props) || this;
    }
    Index.prototype.render = function () {
        var _this = this;
        return ([
            React.createElement("div", { className: "", dangerouslySetInnerHTML: {
                    __html: header_1.default({
                        title: "Home"
                    })
                } }),
            React.createElement(react_router_1.Switch, null,
                React.createElement(react_router_1.Route, { exact: true, path: "/", component: function (props) { return React.createElement(Home, __assign({}, _this.props)); } }),
                React.createElement(react_router_1.Route, { exact: true, path: "/foobar", component: function (props) { return React.createElement(Foobar, __assign({}, _this.props)); } })),
            React.createElement("span", { dangerouslySetInnerHTML: {
                    __html: footer_1.default(null)
                } })
        ]);
    };
    return Index;
}(React.Component));
exports.default = Index;
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        // console.log("home", props);
        _this.state = {
            portfolios: props.portfolios || []
        };
        return _this;
    }
    Home.prototype.render = function () {
        return ([
            React.createElement("nav", null,
                React.createElement("div", { className: "page-wrap" })),
            React.createElement("section", { className: "header" },
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("header", null,
                        React.createElement("h1", null, "Welcome To This Website")))),
            React.createElement("section", null,
                React.createElement("div", { className: "section-separator" },
                    React.createElement("div", { className: "triangle" })),
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("p", null,
                        React.createElement("span", { className: "bold" }, "Lorem ipsum dolor sit amet"),
                        ", consectetur adipiscing elit. Curabitur ac massa et purus faucibus pulvinar vitae consequat nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras varius leo nulla, ac condimentum turpis pellentesque tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."))),
            React.createElement("section", null,
                React.createElement("div", { className: "section-separator" },
                    React.createElement("div", { className: "triangle" })),
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("div", { className: "title" }, "Projects"),
                    React.createElement("div", { className: "separator" }),
                    React.createElement("div", { className: "image-cta" }, this.state.portfolios.map(function (project, ind) {
                        return (React.createElement("div", { key: project.name + "-" + ind, className: "img" },
                            React.createElement("a", { href: project.projectURL },
                                React.createElement("img", { src: project.imageURL, alt: "project name: " + project.name }),
                                React.createElement("div", { className: "separator" }),
                                React.createElement("div", null, project.name))));
                    })))),
            React.createElement("section", { className: "footer" },
                React.createElement("div", { className: "section-separator" },
                    React.createElement("div", { className: "triangle" })),
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("footer", null, "\u00A9 Copyright  Darryl Dixon, 2018. All Rights Reserved.")))
        ]);
    };
    return Home;
}(React.Component));
var Foobar = /** @class */ (function (_super) {
    __extends(Foobar, _super);
    function Foobar(props) {
        var _this = _super.call(this, props) || this;
        // console.log("home", props);
        _this.state = {
            portfolios: props.portfolios || []
        };
        return _this;
    }
    Foobar.prototype.render = function () {
        return ([
            React.createElement("nav", null,
                React.createElement("div", { className: "page-wrap" })),
            React.createElement("section", { className: "header" },
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("header", null,
                        React.createElement("h1", null, "Alternate Web Page")))),
            React.createElement("section", null,
                React.createElement("div", { className: "section-separator" },
                    React.createElement("div", { className: "triangle" })),
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("p", null,
                        React.createElement("span", { className: "bold" }, "Lorem ipsum dolor sit amet"),
                        ", consectetur adipiscing elit. Curabitur ac massa et purus faucibus pulvinar vitae consequat nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras varius leo nulla, ac condimentum turpis pellentesque tincidunt. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."))),
            React.createElement("section", null,
                React.createElement("div", { className: "section-separator" },
                    React.createElement("div", { className: "triangle" })),
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("div", { className: "title" }, "Projects"),
                    React.createElement("div", { className: "separator" }),
                    React.createElement("div", { className: "image-cta" }, this.state.portfolios.map(function (project, ind) {
                        return (React.createElement("div", { key: project.name + "-" + ind, className: "img" },
                            React.createElement("a", { href: project.projectURL },
                                React.createElement("img", { src: project.imageURL, alt: "project name: " + project.name }),
                                React.createElement("div", { className: "separator" }),
                                React.createElement("div", null, project.name))));
                    })))),
            React.createElement("section", { className: "footer" },
                React.createElement("div", { className: "section-separator" },
                    React.createElement("div", { className: "triangle" })),
                React.createElement("div", { className: "page-wrap" },
                    React.createElement("footer", null, "\u00A9 Copyright  Darryl Dixon, 2018. All Rights Reserved.")))
        ]);
    };
    return Foobar;
}(React.Component));
