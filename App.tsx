import React from "react";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/mainStack";
import AuthStack from "./src/navigation/authStack";
import store, { persistor } from "./src/services/store";
import { RootState } from "./src/services/store";

const queryClient = new QueryClient();

const AppNavigator: React.FC = () => {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  const user = useSelector((state: RootState) => state.auth.userId);
  console.log("isSignedIn", isSignedIn);
  console.log("user", user);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {isSignedIn ? <MainStack /> : <AuthStack />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
