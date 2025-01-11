import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import * as Keychain from 'react-native-keychain';

interface AuthState {
  isSignedIn: boolean;
  userId: string;
  username: string;
  password: string;
  name: string;
  token: string;
}


const initialState: AuthState = {
  isSignedIn: false,
  userId: "",
  username: "",
  password: "",
  name: "",
  token: "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.isSignedIn = true;
      state.userId = action.payload;
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.userId = "";
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    logout: (state) => {
      state.username = "";
      state.password = "";
      state.name = "";
      state.isSignedIn = false;
      Keychain.resetGenericPassword();
    },
  },
});

export const selectUser = createSelector(
  (state: { auth: AuthState }) => state.auth,
  (auth) => auth.userId
);

export const { signIn, signOut, setUsername, setPassword, setIsSignedIn, logout } = authSlice.actions;
export default authSlice.reducer;
