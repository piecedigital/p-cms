export interface PluginRegister {
    viewName: string;
    viewComponent: string;
    databaseCollections: string[];
    props: Record<string, any>;
}

export class Plugin {
    name: string;
    component: any;
    databaseCollections: string[];
    props: any;

    constructor(name: string, component: any, databaseCollections: string[] = [], props: any = {}) {
        this.name = name;
        this.component = component;
        this.databaseCollections = databaseCollections;
        this.props = props;
    }

    slug() {
        return this.name;
    }
}