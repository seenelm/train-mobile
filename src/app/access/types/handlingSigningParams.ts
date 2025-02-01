import { AppDispatch } from "../../../services/store";
import { UserLoginRequest } from "../models/userLoginRequest";

export type HandleSigningParams = {
    isSignUp: boolean;
    password: string;
    confirmPassword: string;
    username: string;
    login: (userLoginRequest: UserLoginRequest, options: any) => void;
    dispatch: AppDispatch;
    storeToken: (username: string, token: string) => Promise<void>;
    showAlert: (title: string, message: string) => void;
  };