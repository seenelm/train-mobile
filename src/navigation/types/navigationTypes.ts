export type MainStackParamList = {
  BottomTabs: undefined;
  CreateEvent: undefined;
  SearchLocation: undefined;
  EventOverview: undefined;
  Profile: undefined;
  ChatView: undefined;
  SearchView: undefined;
};

export type NavigationProps = {
  navigate: (screen: keyof MainStackParamList) => void;
};
