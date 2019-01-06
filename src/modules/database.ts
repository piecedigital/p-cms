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

/**
 * The core database class that houses all CRUD needs
 */
class Database {
    dbs: Connection;
    Connected: boolean = false;
    AdminUserModel: Model<Document>;
    SessionModel: Model<Document>;

    successCallback: () => void;
    errorCallback: (err: any) => void;

    constructor() {
        var url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST || "localhost"}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME}`;

        this.dbs = connection;
        connect(url, {
            useNewUrlParser: true
        }, err => {
            if(err) this.error(err);
        });
        this.dbs.on("error", err => {
            this.error(err);
        });
        this.dbs.once("open", () => {
            this.success();
        });
    }

    private success() {
        this.Connected = true;
        console.log("Successfully established database connection");
        this.generateModels();
        this.successCallback();
    }

    private error(err) {
        console.log("Failed to establish database connection");
        console.error(err.stack || err);
        this.errorCallback(err);
    }

    /**
     * Generates the models for CRUD operations
     */
    private generateModels() {
        this.AdminUserModel = model("adminusers", UserSchema);
        this.SessionModel = model("sessions", SessionSchema);
    }
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });

const SessionSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
}, { timestamps: true });

export default Database;