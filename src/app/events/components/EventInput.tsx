import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { EventInputFormProps } from "../types/eventTypes";

const EventInput: React.FC<EventInputFormProps> = ({ placeholder, value, onChangeText, style, ...props }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, style]} {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default EventInput;