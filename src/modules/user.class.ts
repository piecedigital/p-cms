import { Types } from "mongoose";

export class User{
    _id: Types.ObjectId;
    name: string;
    password: string;
}

export interface UserInterface{
    _id?: Types.ObjectId;
    name?: string;
    password?: string;
}