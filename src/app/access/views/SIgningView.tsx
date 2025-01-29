import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../services/store";
import { useLoginRequest } from "../services/accessActions";
import { storeToken, fetchCredentials } from "../../../services/actions";
import { handleSigning } from "../utils/handleSigning";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import Button from "../../../components/button";

const Signing: React.FC = () => {
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

  useEffect(() => {
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

      <Button
        onPress={() =>
          handleSigning({isSignUp,password,confirmPassword,username,login,dispatch,storeToken,showAlert: Alert.alert,})
        }
        style={{ alignSelf: "center", borderRadius: 10, width: "60%",}}
        textStyle={{ fontSize: 20, color: "white" }}
      >Sign {isSignUp ? "Up" : "In"}</Button>

      <TouchableOpacity onPress={toggleForm} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signing;