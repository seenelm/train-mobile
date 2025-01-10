import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isSignedIn: boolean;
  user: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string>) => {
      state.isSignedIn = true;
      state.user = action.payload; // Set the user (e.g., username or email)
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.user = null;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;
