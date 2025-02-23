import React from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { EventList } from "../components/EventList";
import TopSheet from "../components/TopSheet";
import Button from "../../../components/button";
import addEvent from "../../../assets/icons/add.png";
import { CalendarProvider } from "../context/CalendarContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { EventCRUDViewNavigationData } from "./EventCrudView";

type RootStackParamList = { EventCRUDView: { data: EventCRUDViewNavigationData }; };

type EventCRUDViewNavigationProps = StackNavigationProp<RootStackParamList, "EventCRUDView">;

const EventLanding = () => {
  const navigation = useNavigation<EventCRUDViewNavigationProps>();
  const data: EventCRUDViewNavigationData = {
    mode: 'create'
  }

  return (
    <CalendarProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TopSheet /> 
          <EventList />
          <Button
            onPress={() => navigation.navigate('EventCRUDView', {data})}
            imgSource={addEvent}
            style={styles.addButton}
            imgStyle={styles.addIcon}
          />
        </View>
      </GestureHandlerRootView>
    </CalendarProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  addButton: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 20,
    right: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  addIcon: { width: 24, height: 24 },
});

export default EventLanding;