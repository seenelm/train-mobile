import { NavigationProp } from "@react-navigation/native";

export type MainStackParamList = {
  BottomTabs: undefined;
  TopTabs: { groupId: string };
  CreateEvent: undefined;
  SearchLocation: undefined;
  EventOverview: undefined;
  Profile: undefined;
  ChatView: undefined;
  SearchView: undefined;
  EventCRUDView: undefined;
  WeekView: undefined;
  WorkoutView: { weekId: string };
  ExerciseView: { workoutId: string };
  SetView: { exerciseId: string };
  CreateProgram: { groupId: string };
};

export type NavigationProps = {
  navigation: NavigationProp<MainStackParamList>;
};
