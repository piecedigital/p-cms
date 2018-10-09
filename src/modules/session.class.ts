import { Types } from "mongoose";

export class Session{
    _id: Types.ObjectId;
    userId: Types.ObjectId;
}

export interface SessionInterface{
    _id?: Types.ObjectId;
    userId?: Types.ObjectId;
}
