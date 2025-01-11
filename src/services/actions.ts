import * as Keychain from "react-native-keychain";
import { Dispatch } from 'redux';
import { setIsSignedIn, setUsername } from './authSlice';

export const fetchCredentials = async (dispatch: Dispatch) => {
  try {
    const credentials = await Keychain.getGenericPassword();

    if (credentials && credentials.password) {
      const [userId, token] = credentials.password.split(":");
      dispatch(setUsername(credentials.username));
      dispatch(setIsSignedIn(true));
    } else {
      dispatch(setIsSignedIn(false));
      // Navigate back to login screen
      console.log("No credentials are stored");
    }
  } catch (error) {
    console.error("Error accessing Keychain:", error);
  }
};

export const storeToken = async (username: string, token: string) => {
  console.log("Token to be Stored: ", token);

  await Keychain.setGenericPassword(username, token)
  .then(() => console.log("Token successfully stored"))
  .catch((error) => console.log("Error storing token in Keychain:", error));
};

export const getToken = async (): Promise<string | null> => {
  const keychainToken = await Keychain.getGenericPassword().catch((error) => {
    console.log("Error getting token: ", error);
  });

  if (keychainToken) {
    let token = keychainToken.password;
    if (token !== null) {
      return token;
    }
  }

  return null;
};