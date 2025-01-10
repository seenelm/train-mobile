import { ObjectId } from "mongodb";

export interface UserLoginResponse {
    userId: ObjectId;
    token: string | void;
    username: string;
    name: string;
}