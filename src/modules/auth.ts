import * as express from "express";
import { Types, Document } from "mongoose";
import * as bcrypt from "bcryptjs";
import Database from "./database";
import { SessionInterface, Session } from "./session.class";
import { UserInterface } from "./user.class";

const app = express();

/**
 * Handles use authorization to access some paths
 * @param req Request object
 * @param dbs Database object
 * @param pass Callback if authorization passes
 * @param fail Callback if authorization fails
 */
export function authorize(req: express.Request, dbs: Database, pass: () => void, fail: () => void): void {
    console.log("Authorizing...");

    let _id = null;

    try {
        _id = Types.ObjectId(req.cookies["sessId"]);
    } catch (error) {
        console.error("improper session id");
    }

    dbs.SessionModel.findOne({
        _id
    } as SessionInterface, (err, doc: SessionInterface) => {
        if(err) return console.error(err);

        if(doc) {
            console.log("pass");

            return pass();
        } else {
            return fail();
        }
    });
}

export function authenticate(dbs: Database, body: any, pass: (sessId: Types.ObjectId) => void, fail: () => void): void {
    console.log("Authenticating...");

    new Promise((resolve, reject) => {
        dbs.AdminUserModel.findOne({
            name: body.username,
        } as UserInterface, (err, doc: UserInterface) => {
            if(err) {
                fail();
                return console.error("could not authenticate");
            }

            if(doc) {
                if(bcrypt.compareSync(body.password, doc.password)) {
                    console.log("authenticated");

                    resolve(doc._id);
                } else {
                    console.error("authentication failed: password");

                    fail();
                }
            } else {
                console.error("authentication failed: user");

                fail();
            }
        });
    })
    .then((userId: Types.ObjectId) => {
        let sess = new dbs.SessionModel({
            userId
        } as Session);

        sess.save((err, doc: Document) => {
            if(err) {
                console.error(err.stack || err);
                fail();
            } else {
                console.log("pass");

                pass(doc._id);
            }
        });
    })
    .catch(e => console.error(e));
}

export function deauthenticate(dbs: Database, sessId: string): void {
    console.log("Deauthenticating...");

    let _id = null;
    try {
        _id = Types.ObjectId(sessId);
    }
    catch(e) {
        console.error(e);
    }

    let sess = dbs.SessionModel.deleteOne({
        _id
    } as Session, (err) => {
        if(err) console.error(err);
    });
}