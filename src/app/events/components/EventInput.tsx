import React from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";
import { EventInputFormProps } from "../types/eventTypes";
import AddDescriptionButton from "./AddDescriptionButton";
import AlertContextMenu from "./AlertContextMenu";

const EventInput: React.FC<EventInputFormProps> = ({
  placeholder,
  value,
  onChangeText,
  onPress,
  style,
  imgSrc,
  imgStyle,
  hasButton,
  hasAlert
}) => {
  return (
    <View style={styles.container}>
      {placeholder && <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onPress={onPress}
        style={[styles.input, style]}
      />}
      {hasButton && <AddDescriptionButton />}
      {imgSrc && <Image source={imgSrc} style={[styles.image, imgStyle]} />}
      {hasAlert && <AlertContextMenu />}
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
    padding: 20,
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