import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../services/store";
import { signIn, signOut, setIsSignedIn, setUsername } from "../../../services/authSlice";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import { useLoginRequest } from "../services/accessActions";
import { UserLoginRequest } from "../models/UserLoginRequest";
import { storeToken, fetchCredentials } from "../../../services/actions";

const Signing: React.FC = () => {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const dispatch = useDispatch<AppDispatch>();

  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsernameState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: login, isLoading } = useLoginRequest();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setUsernameState("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = () => {
    if (isSignUp) {
      // Handle sign-up logic here
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }
      Alert.alert("Success", "Sign up successful!");
    } else {
      // Handle sign-in logic here
      const userLoginRequest: UserLoginRequest = { username, password };
      login(userLoginRequest, {
        onSuccess: async (data) => {
          console.log("Login successful", data);

          // Store token in Keychain
          await storeToken(username, data.token);

          // Dispatch Redux actions
          const user = data.userId.toString();
          dispatch(signIn(user));
          dispatch(setUsername(username));
          dispatch(setIsSignedIn(true));

          Alert.alert("Success", "Login successful!");
          // Handle successful login (e.g., navigate to another screen)
        },
        onError: (error) => {
          Alert.alert("Error", "Login failed. Please try again.");
        },
      });
    }
  };

  useEffect(() => {
    // Fetch credentials on app load
    fetchCredentials(dispatch);
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isSignUp ? (
        <SignUpForm
          email={username}
          setEmail={setUsernameState}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      ) : (
        <SignInForm
          email={username}
          setEmail={setUsernameState}
          password={password}
          setPassword={setPassword}
        />
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: "blue",
          borderRadius: 5,
        }}
      >
        <Text style={{ color: "white" }}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleForm} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signing;
