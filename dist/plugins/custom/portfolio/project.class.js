"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tool = /** @class */ (function () {
    function Tool(name, description, url) {
        this.name = name;
        this.description = description;
        this.url = url;
    }
    return Tool;
}());
var ToolCategory = /** @class */ (function () {
    function ToolCategory(name, toolList) {
        if (toolList === void 0) { toolList = []; }
        this.name = name;
        this.toolList = toolList;
    }
    return ToolCategory;
}());
var Project = /** @class */ (function () {
    function Project(id, name, url, description) {
        if (description === void 0) { description = ""; }
        this.imageURL = "/public/media/images/cat-dog.jpg";
        this._id = id;
        this.name = name;
        this.description = description;
        this.projectURL = url;
        this.tools = [];
    }
    return Project;
}());
exports.Project = Project;
