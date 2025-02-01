import { UserLoginRequest } from "../models/userLoginRequest";
import { signIn, setUsername, setIsSignedIn } from "../../../services/authSlice";
import { SigningData } from "../types/signingData";
import { HandleSigningParams } from "../types/handlingSigningParams";

export const handleSigning = ({
  isSignUp,
  password,
  confirmPassword,
  username,
  login,
  dispatch,
  storeToken,
  showAlert,
}: HandleSigningParams) => {
  if (isSignUp) {
    if (password !== confirmPassword) {
      showAlert("Error", "Passwords do not match");
      return;
    }
    showAlert("Success", "Sign up successful!");
  } else {
    const userLoginRequest: UserLoginRequest = { username, password };
    login(userLoginRequest, {
      onSuccess: async (data: SigningData) => {
        console.log("Login successful", data);
        await storeToken(username, data.token);
        const user = data.userId.toString();
        dispatch(signIn(user));
        dispatch(setUsername(username));
        dispatch(setIsSignedIn(true));
        showAlert("Success", "Login successful!");
      },
      onError: (error: Error) => {
        showAlert("Error", "Login failed. Please try again.");
      },
    });
  }
};