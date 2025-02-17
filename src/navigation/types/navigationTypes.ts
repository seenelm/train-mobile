
export type MainStackParamList = {
    BottomTabs: undefined;
    CreateEvent: undefined;
    EventOverview: undefined;
    Profile: undefined;
    ChatView: undefined;
};

export type NavigationProps = {
  navigate: (screen: keyof MainStackParamList) => void;
};