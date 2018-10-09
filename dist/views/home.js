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
var Home = /** @class */ (function (_super) {
    __extends(Home, _super);
    function Home(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            portfolios: props.portfolios || []
        };
        return _this;
    }
    Home.prototype.render = function () {
        return ([
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
                    }))))
        ]);
    };
    return Home;
}(React.Component));
exports.Home = Home;
