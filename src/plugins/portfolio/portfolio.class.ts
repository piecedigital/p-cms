import {
    Connection,
    Model,
    model,
    Document,
    connection,
    connect,
    Schema,
    Types
} from "mongoose";

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

export class ToolCategory {
    name: string;
    toolList: string[];

    constructor(name: string, toolList: string[] = []) {
        this.name = name;
        this.toolList = toolList;
    }
}

export class Project {
    // _id?: Types.ObjectId;
    projectPK: string;
    name: string;
    description: string;
    projectURL: string;
    imageURL: string = "/public/media/images/cat-dog.jpg";
    tools: ToolCategory[];
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;

    constructor(projectPK: string, name: string, url: string, description: string = "") {
        this.projectPK =
        this.name = name;
        this.description = description;
        this.projectURL = url;
        this.tools = [];
    }
}

const ProjectSchema: Schema = new Schema({
    projectPK: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    projectURL: { type: String, required: true },
    imageURL: { type: String, default: "/public/media/images/cat-dog.jpg" },
    tools: { type: [Schema.Types.Mixed], default: [] },
}, { timestamps: true });

export const ProjectModel: Model<Document> = model("portfolios", ProjectSchema);

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