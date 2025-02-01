import { MainStackParamList } from "../../../navigation/types/mainStackParamList";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type DashboardProps<T extends keyof MainStackParamList = keyof MainStackParamList> = NativeStackScreenProps<MainStackParamList, T>;

