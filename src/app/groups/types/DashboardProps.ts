import { MainStackParamList } from "../../../navigation/types/MainStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type DashboardProps<T extends keyof MainStackParamList = keyof MainStackParamList> = NativeStackScreenProps<MainStackParamList, T>;

