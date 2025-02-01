import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SubmitButtonProps {
  onPress: () => void;
  text: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, text }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SubmitButton;