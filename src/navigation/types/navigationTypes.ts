export type MainStackParamList = {
  BottomTabs: undefined;
  CreateEvent: undefined;
  SearchLocation: undefined;
  EventOverview: undefined;
  Profile: undefined;
  ChatView: undefined;
  SearchView: undefined;
  EventCRUDView: undefined;
};

export type NavigationProps = {
  navigate: (screen: keyof MainStackParamList) => void;
};
