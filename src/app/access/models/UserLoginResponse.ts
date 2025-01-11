import { ObjectId } from "mongodb";

export interface UserLoginResponse {
    userId: string;
    token: string;
    username: string;
    name: string;
}