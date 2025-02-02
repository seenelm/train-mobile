import React from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import { ButtonProps } from "./types/globalTypes";

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.button, props.style]} onPress={props.onPress}>
      {props.children && (
        <Text style={[styles.buttonText, props.textStyle]}>{props.children}</Text>
      )}
      <Image source={props.imgSource} style={[styles.image, props.imgStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    height: 60,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    alignSelf: "center",
  },
  image: {
    // empty now
  },
});


export default Button;