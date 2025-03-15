import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import GroupFeed from "../app/groups/components/GroupFeed";
import GroupEvents from "../app/groups/components/GroupEvents";
import GroupShared from "../app/groups/components/GroupShared";


const Tab = createMaterialTopTabNavigator();

const TopTabs = () => {
  return (

      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "white",
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "grey",
          tabBarIndicatorStyle: {
            backgroundColor: "black",
          },
        }}
      >
        <Tab.Screen
          name="Feed"
          component={GroupFeed}
          options={{ tabBarLabel: "Feed" }}
        />
        <Tab.Screen
          name="Event"
          component={GroupEvents}
          options={{ tabBarLabel: "Events" }}
        />
        <Tab.Screen
          name="Payments"
          component={GroupShared}
          options={{ tabBarLabel: "Shared" }}
        />
      </Tab.Navigator>

  );
};


export default TopTabs;