import { TextStyle, TouchableOpacityProps } from "react-native";

export interface ButtonProps {
  onPress?: () => void;
  children?: any;
  imgSource?: any;
  imgStyle?: any;
  style?: any;
  textStyle?: any;
}

export interface CardProps {
  imageUrl: string;
  groupName: string;
  groupId: Object;
  onPress: TouchableOpacityProps['onPress'];
}
