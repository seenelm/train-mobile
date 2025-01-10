import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/mainStack";
import AuthStack from "./src/navigation/authStack";
import store from "./src/services/store";
import { useSelector } from "react-redux";
import { RootState } from "./src/services/store";

const queryClient = new QueryClient();

const AppNavigator: React.FC = () => {
  const isSignedIn = useSelector((state: RootState) => state.auth.isSignedIn);
  console.log("isSignedIn", isSignedIn);

  return (
    <NavigationContainer>
      {isSignedIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
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
