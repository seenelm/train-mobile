import React, { useRef } from "react";
import { Animated, StyleSheet, Image, View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import your assets
import message from "../assets/icons/message.png";
import messageFocused from "../assets/icons/message-focus.png";
import group from "../assets/icons/group.png";
import groupFocused from "../assets/icons/group-focus.png";
import calendar from "../assets/icons/calendar.png";
import calendarFocused from "../assets/icons/calendar-focus.png";

// Import your screens
import ChatList from "../app/chat/views/ChatView";
import Dashboard from "../app/groups/views/Dashboard";
import Calendar from "../app/events/views/EventLanding";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const messageValue = useRef(new Animated.Value(1)).current;
  const groupValue = useRef(new Animated.Value(1)).current;
  const calendarValue = useRef(new Animated.Value(1)).current;

  const animateIcon = (value: Animated.Value) => {
    Animated.sequence([
      Animated.timing(value, {
        toValue: 1.05,
        duration: 70,
        useNativeDriver: false,
      }),
      Animated.timing(value, {
        toValue: 1,
        duration: 70,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Tab.Navigator
      initialRouteName="Search"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "white",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={ChatList}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.labelFocused : styles.labelUnfocused}>
              Chat
            </Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <Animated.View style={{ transform: [{ scale: messageValue }] }}>
              <Image
                source={focused ? messageFocused : message}
                style={[{ height: size, width: size }]}
              />
            </Animated.View>
          ),
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            animateIcon(messageValue);
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={Dashboard}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.labelFocused : styles.labelUnfocused}>
              Fitspaces
            </Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <Animated.View style={{ transform: [{ scale: groupValue }] }}>
              <Image
                source={focused ? groupFocused : group}
                style={[{ height: size, width: size }]}
              />
            </Animated.View>
          ),
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            animateIcon(groupValue);
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Calendar}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={focused ? styles.labelFocused : styles.labelUnfocused}>
              Calendar
            </Text>
          ),
          tabBarIcon: ({ size, focused }) => (
            <Animated.View style={{ transform: [{ scale: calendarValue }] }}>
              <Image
                source={focused ? calendarFocused : calendar}
                style={[{ height: size, width: size }]}
              />
            </Animated.View>
          ),
          headerShown: false,
        }}
        listeners={{
          focus: () => {
            animateIcon(calendarValue);
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  labelFocused: {
    color: "black",
    fontSize: 11,
  },
  labelUnfocused: {
    color: "gray",
    fontSize: 11,
  },
});

export default BottomTabs;
