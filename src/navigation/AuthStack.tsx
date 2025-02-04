import React from "react";
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import Landing from "../app/access/views/LandingView";
import Signing from "../app/access/views/SigningView";

export type AuthStackParamList = {
  Landing: undefined;
  Signing: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    }}
  >
    <Stack.Screen name="Landing" component={Landing} />
    <Stack.Screen name="Signing" component={Signing} />
  </Stack.Navigator>
);

export default AuthStack;
