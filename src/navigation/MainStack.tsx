import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import CreateEventView from '../app/events/views/CreateEventView';
import ProfileView from '../app/profile/views/ProfileView';
import EventOverview from '../app/events/views/EventOverview';
import ChatView from '../app/chat/views/ChatView';

import { MainStackParamList } from './types/navigationTypes';


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
        <Stack.Screen name="EventOverview" component={EventOverview} />
        <Stack.Screen name="Profile" component={ProfileView} />
        <Stack.Screen name="ChatView" component={ChatView} />
      </Stack.Navigator>
    );
  };
  
  export default MainStack;