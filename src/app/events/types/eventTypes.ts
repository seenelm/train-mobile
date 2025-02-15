import { SharedValue } from "react-native-reanimated";
import { EventRequest } from "../models/eventModel";
import { TextStyle, ImageProps, ImageStyle } from "react-native";

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

export interface CreateEventFormProps {
  onSubmit: (createEventRequest: EventRequest) => void;
}

export interface EventInputFormProps {
  placeholder: string;
  value?: string;
  onChangeText: (text: string) => void;
  style?: TextStyle; // Optional, only for inputs like the description
  imgSrc?: ImageProps;
  imgStyle?: ImageStyle;
  hasButton?: boolean;
  addDescriptionButton?: AddDescriptionButtonProps;
}

export interface AddDescriptionButtonProps {
  onPress?: () => void;
  style?: any;
  textStyle?: any;
  children?: any;
}

/******************************************************************** */
