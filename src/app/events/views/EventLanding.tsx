import React from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps } from "../types/navigationProps";
import { EventList } from "../components/EventList";
import TopSheet from "../components/TopSheet";
import Button from "../../../components/button";
import addEvent from "../../../assets/icons/add.png";
import { CalendarProvider } from "../context/CalendarProvider";


const EventLanding = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <CalendarProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <TopSheet /> 
          <EventList />
          <Button
            onPress={() => navigation.navigate('CreateEvent')}
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
  eventList: { padding: 20 },
  eventCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  eventImage: { width: 40, height: 40, marginRight: 10, borderRadius: 20 },
  eventTitle: { fontSize: 16, fontWeight: "bold", color: "#333" },
  eventDate: { fontSize: 14, color: "#666" },
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