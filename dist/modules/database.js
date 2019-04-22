"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var mongoose_1 = require("mongoose");
var fs_1 = require("fs");
var path_1 = require("path");
/**
 * The core database class that houses all CRUD needs
 */
var Database = /** @class */ (function () {
    function Database() {
        var _this = this;
        this.Connected = false;
        this.dbs = mongoose_1.connection;
        fs_1.readFile(path_1.join(__dirname, "../srv-config.json"), function (err, data) {
            if (err) {
                return;
            }
            if (data) {
                var json = JSON.parse(data.toString());
                _this.connect(json.DB_USER, json.DB_PASS, json.DB_HOST, json.DB_PORT, json.DB_NAME);
            }
        });
    }
    Database.prototype.setupFirstAdminUser = function () {
        var _this = this;
        this.AdminUserModel.findOne({}, function (err, res) {
            console.log("looking for admin user");
            if (!res) {
                console.log("no admin user");
                var newAdminUser = new _this.AdminUserModel({
                    _id: new mongoose_1.Types.ObjectId(),
                    name: "admin",
                    password: bcrypt.hashSync("password", bcrypt.genSaltSync())
                });
                newAdminUser.save(function (err) {
                    if (err)
                        return console.error(err);
                    console.log("created admin user");
                });
                return;
            }
            console.log("found admin user");
        });
    };
    Database.prototype.connect = function (DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME) {
        var _this = this;
        var url = "mongodb://" + DB_USER + ":" + DB_PASS + "@" + (DB_HOST || "localhost") + ":" + (DB_PORT || 27017) + "/" + DB_NAME;
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
    };
    Database.prototype.success = function () {
        this.Connected = true;
        console.log("Successfully established database connection");
        this.generateModels();
        if (this.successCallback)
            this.successCallback();
    };
    Database.prototype.error = function (err) {
        console.log("Failed to establish database connection");
        console.error(err.stack || err);
        if (this.errorCallback)
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
