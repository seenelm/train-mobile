import { SharedValue } from "react-native-reanimated";
import { EventRequest } from "../models/eventModel";
import { TextStyle, ImageProps, ImageStyle } from "react-native";
import { MainStackParamList } from "../../../navigation/types/navigationTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

// EVENT USER STATE
export interface Event {
  name: string;
  admin: string[];
  invitees: string[];
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;
}

/******************************************************************** */

// COMPONENT TYPES
export interface WeekProps {
  week: Date[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

// export interface CreateEventFormProps<
//   T extends keyof MainStackParamList = keyof MainStackParamList
// > extends NativeStackScreenProps<MainStackParamList, T> {
//   onSubmit: (createEventRequest: EventRequest) => void;
// }

export interface CreateEventFormProps {
  onSubmit: (createEventRequest: EventRequest) => void;
}

export interface EventInputFormProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: TextStyle; // Optional, only for inputs like the description
  imgSrc?: ImageProps;
  imgStyle?: ImageStyle;
  hasButton?: boolean;
  onPress?: () => void;
  addDescriptionButton?: AddDescriptionButtonProps;
}

export interface AddDescriptionButtonProps {
  onPress?: () => void;
  style?: any;
  textStyle?: any;
  children?: any;
}

/******************************************************************** */
