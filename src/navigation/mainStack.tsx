import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './bottomTabs';
import CreateEventView from '../app/events/views/CreateEventView';
import ProfileView from '../app/profile/views/ProfileView';

import { MainStackParamList } from './types/MainStackParamList';


const Stack = createNativeStackNavigator<MainStackParamList>();

// Main Stack Navigator
const MainStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="CreateEvent" component={CreateEventView} />
        <Stack.Screen name="Profile" component={ProfileView} />
      </Stack.Navigator>
    );
  };
  
  export default MainStack;