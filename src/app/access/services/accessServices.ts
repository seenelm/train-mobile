import { api } from "../../../services/api";
import { UserLoginRequest } from "../models/UserLoginRequest";
import { UserLoginResponse } from "../models/UserLoginResponse";

export const loginRequest = async (userLoginRequest: UserLoginRequest): Promise<UserLoginResponse> => {
    try {
        const response = await api.post<UserLoginResponse>("/login", userLoginRequest);
        return response.data;
    } catch (error) {
        console.error("Error in loginRequest:", error);
        throw error;
    }
};
