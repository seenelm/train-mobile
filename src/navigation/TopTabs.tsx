import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute, RouteProp } from "@react-navigation/native";
import GroupFeed from "../app/groups/components/GroupFeed";
import GroupEvents from "../app/groups/components/GroupEvents";
import GroupShared from "../app/groups/components/GroupShared";
import { MainStackParamList } from "./types/navigationTypes";

const Tab = createMaterialTopTabNavigator();

type TopTabsRouteProp = RouteProp<MainStackParamList, 'TopTabs'>;

const TopTabs = () => {
  const route = useRoute<TopTabsRouteProp>();
  const { groupId } = route.params;

  // Create a component that will receive the groupId prop
  const SharedTabWithProps = (props: any) => (
    <GroupShared {...props} groupId={groupId} />
  );

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
          component={SharedTabWithProps}
          options={{ tabBarLabel: "Shared" }}
        />
      </Tab.Navigator>
  );
};

export default TopTabs;