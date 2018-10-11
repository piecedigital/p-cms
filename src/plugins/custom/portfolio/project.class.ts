import * as mongoose from "mongoose";

class Tool {
    name: string;
    description: string;
    url: string;

    constructor(name: string, description: string, url: string) {
        this.name = name;
        this.description = description;
        this.url = url;
    }
}

class ToolCategory {
    name: string;
    toolList: string[];

    constructor(name: string, toolList: [] = []) {
        this.name = name;
        this.toolList = toolList;
    }
}

export class Project {
    _id: mongoose.Types.ObjectId;
    name: string;
    description: string;
    projectURL: string;
    imageURL: string = "/public/media/images/cat-dog.jpg";
    tools: ToolCategory[];

    constructor(id: mongoose.Types.ObjectId, name: string, url: string, description: string = "") {
        this._id = id;
        this.name = name;
        this.description = description;
        this.projectURL = url;
        this.tools = [];
    }
}

export interface ProjectInterface {
    _id?: mongoose.Types.ObjectId;
    name?: string;
    description?: string;
    projectURL?: string;
    imageURL?: string;
    tools?: ToolCategory[];
    createdAt?: Date,
    updatedAt?: Date,
    __v?: number,
}