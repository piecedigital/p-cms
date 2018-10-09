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
var AdminDashboardPortfolio = /** @class */ (function (_super) {
    __extends(AdminDashboardPortfolio, _super);
    function AdminDashboardPortfolio(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            portfolio: props.portfolio || []
        };
        return _this;
    }
    AdminDashboardPortfolio.prototype.render = function () {
        return ([
            React.createElement("div", { className: "page-wrap" },
                React.createElement("form", { action: "/api/remove-project", method: "POST" },
                    React.createElement("div", { className: "portfolio" }, this.state.portfolio.map(function (project, ind) {
                        return (React.createElement("div", { key: "" + project._id, className: "project" },
                            React.createElement("a", { href: project.projectURL },
                                React.createElement("img", { src: project.imageURL, alt: "" + project.description }),
                                React.createElement("div", { className: "project-name" },
                                    React.createElement("input", { type: "checkbox", name: "_id", id: "", value: project._id.toHexString() }),
                                    React.createElement("span", null, project.name)))));
                    })),
                    React.createElement("button", null, "Remove Selected")),
                React.createElement("form", { className: "add-project-form", action: "/api/add-project", method: "POST" },
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "" }, "Project Name"),
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", name: "name" })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "" }, "Project Description"),
                        React.createElement("br", null),
                        React.createElement("textarea", { name: "description", id: "", cols: 30, rows: 10 })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "" }, "Project URL"),
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", name: "project-url" })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "" }, "Project Image"),
                        React.createElement("br", null),
                        React.createElement("input", { type: "text", name: "image-url", defaultValue: "/public/media/images/cat-dog.jpg", disabled: true })),
                    React.createElement("button", null, "Submit")))
        ]);
    };
    return AdminDashboardPortfolio;
}(React.Component));
exports.AdminDashboardPortfolio = AdminDashboardPortfolio;
