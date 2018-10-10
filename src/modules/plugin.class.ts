export interface PluginRegister {
    name: string;
    description?: string,
    dateCreated?: string,
    author?: string,
    company?: string,
    databaseCollections?: string[];
    props?: Record<string, any>;
}

export class Plugin {
    name: string;
    description: string = "no description";
    dateCreated: string = "";
    author: string = "";
    company: string = "";
    databaseCollections: string[] = [];
    props: any = {};

    directory: string;
    component: any;

    constructor(pr: PluginRegister, directory: string, component: any, databaseCollections: string[] = [], props: any = {}) {
        if(pr.name == null) return null;

        this.name = pr.name;
        this.description = pr.description;
        this.dateCreated = pr.dateCreated;
        this.author = pr.author;
        this.company = pr.company;
        this.databaseCollections = pr.databaseCollections;
        this.props = pr.props;

        this.directory = directory;
        this.component = component;
    }

    slug() {
        return this.directory;
    }
}