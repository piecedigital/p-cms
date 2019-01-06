"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
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
exports.ToolCategory = ToolCategory;
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
var ProjectSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    projectURL: { type: String, required: true },
    imageURL: { type: String, default: "/public/media/images/cat-dog.jpg" },
    tools: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
}, { timestamps: true });
exports.ProjectModel = mongoose_1.model("portfolios", ProjectSchema);
// export interface ProjectInterface {
//     _id?: mongoose.Types.ObjectId;
//     name?: string;
//     description?: string;
//     projectURL?: string;
//     imageURL?: string;
//     tools?: ToolCategory[];
//     createdAt?: Date,
//     updatedAt?: Date,
//     __v?: number,
// }
