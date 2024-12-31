import { TextStyle } from "react-native";
export interface FormProps {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: TextStyle; // Optional, only for inputs like the description
  }
  