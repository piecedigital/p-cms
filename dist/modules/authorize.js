"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
/**
 * Handles use authorization to access some paths
 * @param req Request object
 * @param dbs Database object
 * @param pass Callback if authorization passes
 * @param fail Callback if authorization fails
 */
function authorize(req, dbs, pass, fail) {
    dbs.SessionModel.findOne({
        _id: req.cookies["sessId"]
    }, function (err, doc) {
        if (err)
            return console.error(err);
        if (doc) {
            return pass();
        }
        else {
            return fail();
        }
    });
}
exports.authorize = authorize;
