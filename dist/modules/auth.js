"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose_1 = require("mongoose");
var bcrypt = require("bcryptjs");
var app = express();
/**
 * Handles use authorization to access some paths
 * @param req Request object
 * @param dbs Database object
 * @param pass Callback if authorization passes
 * @param fail Callback if authorization fails
 */
function authorize(req, dbs, pass, fail) {
    console.log("Authorizing...");
    var _id = null;
    try {
        _id = mongoose_1.Types.ObjectId(req.cookies["sessId"]);
    }
    catch (error) {
        console.error("improper session id");
    }
    dbs.SessionModel.findOne({
        _id: _id
    }, function (err, doc) {
        if (err)
            return console.error(err);
        if (doc) {
            console.log("pass");
            return pass();
        }
        else {
            return fail();
        }
    });
}
exports.authorize = authorize;
function authenticate(dbs, body, pass, fail) {
    console.log("Authenticating...");
    new Promise(function (resolve, reject) {
        dbs.AdminUserModel.findOne({
            name: body.username,
        }, function (err, doc) {
            if (err) {
                fail();
                return console.error("could not authenticate");
            }
            if (doc) {
                if (bcrypt.compareSync(body.password, doc.password)) {
                    console.log("authenticated");
                    resolve(doc._id);
                }
                else {
                    console.error("authentication failed: password");
                    fail();
                }
            }
            else {
                console.error("authentication failed: user");
                fail();
            }
        });
    })
        .then(function (userId) {
        var sess = new dbs.SessionModel({
            userId: userId
        });
        sess.save(function (err, doc) {
            if (err) {
                console.error(err.stack || err);
                fail();
            }
            else {
                console.log("pass");
                pass(doc._id);
            }
        });
    })
        .catch(function (e) { return console.error(e); });
}
exports.authenticate = authenticate;
function deauthenticate(dbs, sessId) {
    console.log("Deauthenticating...");
    var _id = null;
    try {
        _id = mongoose_1.Types.ObjectId(sessId);
    }
    catch (e) {
        console.error(e);
    }
    var sess = dbs.SessionModel.deleteOne({
        _id: _id
    }, function (err) {
        if (err)
            console.error(err);
    });
}
exports.deauthenticate = deauthenticate;
