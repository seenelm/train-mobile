import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";

const Signing: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isSignUp ? (
        <SignUpForm 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          confirmPassword={confirmPassword} 
          setConfirmPassword={setConfirmPassword} 
        />
      ) : (
        <SignInForm 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
        />
      )}
      <TouchableOpacity onPress={toggleForm} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>
          {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signing;
