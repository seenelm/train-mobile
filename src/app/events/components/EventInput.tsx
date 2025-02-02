import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { EventInputFormProps } from "../types/eventTypes";

const EventInput: React.FC<EventInputFormProps> = ({ placeholder, value, onChangeText, style}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={[styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    margin: 10,
  },
});

export default EventInput;