import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import TopTabs from './TopTabs';
import CreateEventView from '../app/events/views/CreateEventView';
import ProfileView from '../app/profile/views/ProfileView';
import ChatView from '../app/chat/views/ChatView';
import SearchView from '../app/search/views/SearchView';
import SearchLocationView from '../app/events/views/SearchLocationView';
import EventCRUDView from '../app/events/views/EventCRUDView';
import WeekView from '../app/programs/views/WeekView';
import WorkoutView from '../app/programs/views/WorkoutView';
import ExerciseView from '../app/programs/views/ExerciseView';
import SetView from '../app/programs/views/SetView';

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
        <Stack.Screen 
          name="TopTabs" 
          component={TopTabs} 
          options={{ 
            headerShown: true, 
            title: "Group Details", 
            headerTitleStyle: { 
              fontWeight: 'bold', 
              
            }, 
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: "black",
          }} 
        />
        <Stack.Screen name="CreateEvent" component={CreateEventView} />
        <Stack.Screen name="SearchLocation" component={SearchLocationView} options={{presentation: "modal"}} />
        <Stack.Screen name="Profile" component={ProfileView} />
        <Stack.Screen name="ChatView" component={ChatView} />
        <Stack.Screen name="SearchView" component={SearchView} />
        <Stack.Screen name="EventCRUDView" component={EventCRUDView} options={{presentation: "modal"}}/>
        <Stack.Screen name="WeekView" component={WeekView} />
        <Stack.Screen name="WorkoutView" component={WorkoutView} />
        <Stack.Screen name="ExerciseView" component={ExerciseView} />
        <Stack.Screen 
          name="SetView" 
          component={SetView} 
          options={{ 
            headerShown: true, 
            title: "Track Your Sets", 
            headerTitleStyle: { 
              fontWeight: 'bold',
            }, 
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerBackButtonDisplayMode: "minimal",
            headerTintColor: "black",
          }}
        />
      </Stack.Navigator>
    );
  };
  
  export default MainStack;