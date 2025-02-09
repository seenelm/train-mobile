import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { EventInputFormProps } from "../types/eventTypes";
import AddDescriptionButton from "./AddDescriptionButton";

const EventInput: React.FC<EventInputFormProps> = ({
  placeholder,
  value,
  onChangeText,
  style,
  imgSrc,
  imgStyle,
  hasButton,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]}
      />
      {hasButton && (
        <AddDescriptionButton style={styles.button} textStyle={styles.buttonText}>Add Description</AddDescriptionButton>
      )}
      {imgSrc && <Image source={imgSrc} style={[styles.image, imgStyle]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    margin: 10,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    borderWidth: 0,
  },
  image: {
    width: 20,
    height: 20,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: "lightgray",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black"
  }
});

export default EventInput;