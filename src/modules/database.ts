import * as bcrypt from "bcryptjs";
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
import { readFile } from "fs";
import { join } from "path";
import { User } from "./user.class";

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
        this.dbs = connection;

        readFile(join(__dirname, "../srv-config.json"), (err, data) => {
            if (err) {
                return;
            }

            if (data) {
                var json = JSON.parse(data.toString());

                this.connect(
                    json.DB_USER,
                    json.DB_PASS,
                    json.DB_HOST,
                    json.DB_PORT,
                    json.DB_NAME,
                );
            }
        });
    }

    setupFirstAdminUser() {
        this.AdminUserModel.findOne({}, (err, res: Document) => {
            console.log("looking for admin user");

            if (!res) {
                console.log("no admin user");

                const newAdminUser = new this.AdminUserModel({
                    _id: new Types.ObjectId(),
                    name: "admin",
                    password: bcrypt.hashSync("password", bcrypt.genSaltSync())
                } as User);

                newAdminUser.save((err) => {
                    if (err) return console.error(err);
                    console.log("created admin user");
                });
                return;
            }
            console.log("found admin user");
        });
    }

    connect(DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME) {
        var url = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST || "localhost"}:${DB_PORT || 27017}/${DB_NAME}`;

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
        if (this.successCallback) this.successCallback();
    }

    private error(err) {
        console.log("Failed to establish database connection");
        console.error(err.stack || err);
        if (this.errorCallback) this.errorCallback(err);
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