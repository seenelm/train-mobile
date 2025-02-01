import { useMutation, useQueryClient } from "react-query";
import { loginRequest } from "./accessServices";
import { UserLoginRequest } from "../models/userLoginRequest";
import { UserLoginResponse } from "../models/userLoginResponse";

export const useLoginRequest = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (userLoginRequest: UserLoginRequest): Promise<UserLoginResponse> => loginRequest(userLoginRequest),
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
      },
      onError: (error) => {
        // log error to file
        console.error("useLoginRequest mutation error: ", error);
      },
    });
  };