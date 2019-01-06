"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * The core database class that houses all CRUD needs
 */
var Database = /** @class */ (function () {
    function Database() {
        var _this = this;
        this.Connected = false;
        var url = "mongodb://" + process.env.DB_USER + ":" + process.env.DB_PASS + "@" + (process.env.DB_HOST || "localhost") + ":" + (process.env.DB_PORT || 27017) + "/" + process.env.DB_NAME;
        this.dbs = mongoose_1.connection;
        mongoose_1.connect(url, {
            useNewUrlParser: true
        }, function (err) {
            if (err)
                _this.error(err);
        });
        this.dbs.on("error", function (err) {
            _this.error(err);
        });
        this.dbs.once("open", function () {
            _this.success();
        });
    }
    Database.prototype.success = function () {
        this.Connected = true;
        console.log("Successfully established database connection");
        this.generateModels();
        this.successCallback();
    };
    Database.prototype.error = function (err) {
        console.log("Failed to establish database connection");
        console.error(err.stack || err);
        this.errorCallback(err);
    };
    /**
     * Generates the models for CRUD operations
     */
    Database.prototype.generateModels = function () {
        this.AdminUserModel = mongoose_1.model("adminusers", UserSchema);
        this.SessionModel = mongoose_1.model("sessions", SessionSchema);
    };
    return Database;
}());
var UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true });
var SessionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
}, { timestamps: true });
exports.default = Database;
