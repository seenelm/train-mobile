import { MainStackParamList } from "../../../navigation/types/navigationTypes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type SearchProps<T extends keyof MainStackParamList = keyof MainStackParamList> = NativeStackScreenProps<MainStackParamList, T>;

