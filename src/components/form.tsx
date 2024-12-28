import React from "react";
import { View, Text, TextInput, StyleSheet, ViewStyle, TextStyle } from "react-native";

interface InputField {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: TextStyle & {
    textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center';
  };
  autoFocus?: boolean;
}

interface FormProps {
  title?: string;
  description?: string;
  inputs: InputField[];
  containerStyle?: ViewStyle;
}

const Form: React.FC<FormProps> = ({ title, description, inputs, containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text style={styles.description}>{description}</Text>}
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          placeholder={input.placeholder}
          value={input.value}
          onChangeText={input.onChangeText}
          secureTextEntry={input.secureTextEntry || false}
          style={[styles.input, input.style]}
          autoFocus={input.autoFocus && index === 0}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
});

export default Form;
