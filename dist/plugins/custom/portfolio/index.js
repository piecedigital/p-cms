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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Index = /** @class */ (function (_super) {
    __extends(Index, _super);
    function Index(props) {
        var _this = _super.call(this, props) || this;
        // console.log(props);
        _this.state = {
            portfolios: props.portfolios || []
        };
        return _this;
    }
    Index.prototype.render = function () {
        return ([
            React.createElement("div", { className: "page-wrap portfolio" },
                React.createElement("form", { action: "/api/remove-project", method: "POST" },
                    React.createElement("h2", null, "List of Projects"),
                    React.createElement("div", { className: "projects" }, this.state.portfolios.map(function (project, ind) {
                        return ([
                            React.createElement("input", { key: project.projectPK + "-input", id: project.projectPK + "-input", type: "checkbox", name: "projectPK", value: project.projectPK }),
                            React.createElement("div", { key: "" + project.projectPK, className: "project" },
                                React.createElement("label", { htmlFor: project.projectPK + "-input" },
                                    React.createElement("div", { className: "image" },
                                        React.createElement("img", { src: project.imageURL, alt: "" + project.description })),
                                    React.createElement("div", { className: "info" },
                                        React.createElement("div", { className: "project-name" },
                                            React.createElement("span", null, project.name)))))
                        ]);
                    })),
                    React.createElement("button", null, "Remove Selected")),
                React.createElement("hr", { className: "separator" }),
                React.createElement("form", { className: "add-project-form", action: "/api/add-project", method: "POST" },
                    React.createElement("h2", null, "Add New Project"),
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
    return Index;
}(React.Component));
exports.default = Index;
