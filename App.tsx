import React from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer, Theme, DarkTheme as NavigationDarkTheme, DefaultTheme } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";
import AuthStack from "./src/navigation/AuthStack";
import store, { persistor } from "./src/services/store";
import { RootState } from "./src/services/store";
import DarkMode from "./src/utils/darkmode.context";

const queryClient = new QueryClient();

const AppNavigator: React.FC = () => {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const user = useSelector((state: RootState) => state.auth.userId);
  console.log("isSignedIn", isSignedIn);
  console.log("user", user);

  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [useDeviceSettings, setUseDeviceSettings] = React.useState(false);
  const CustomDarkTheme: Theme = {
    ...NavigationDarkTheme,
    dark: true,
    colors:{
      ...NavigationDarkTheme.colors,
      primary: 'darkgrey',
      background: 'darkgrey',
      card: 'black',
      text: 'white',
      border: 'white',
      notification: 'white',

    }
  };

  return (
    <DarkMode.Provider value={{ isDarkMode, setIsDarkMode, useDeviceSettings, setUseDeviceSettings }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={isDarkMode ? CustomDarkTheme : DefaultTheme}>
          {isSignedIn ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
    </DarkMode.Provider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppNavigator />
      </QueryClientProvider>
    </Provider>
  );
}
