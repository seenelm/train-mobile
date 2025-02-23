import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { UserEventResponse } from "../models/eventModel";
import { EventCRUDViewNavigationData } from "../views/EventCrudView";

type EventCardProps = {
  item: {
    image?: any;
    userEventResponse: UserEventResponse;
  };
};

// type RootStackParamList = { EventOverview: { userEventResponse: UserEventResponse }; };

// type EventOverviewScreenNavigationProp = StackNavigationProp<RootStackParamList, "EventOverview">;

type RootStackParamList = { EventCRUDView: { data: EventCRUDViewNavigationData }; };

type EventCRUDViewNavigationProps = StackNavigationProp<RootStackParamList, "EventCRUDView">;

const formatTime = (date: string | Date): string => {
  const parsedDate = date instanceof Date ? date : new Date(date);
  return parsedDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const formatDate = (date: string | Date): string => {
  const parsedDate = date instanceof Date ? date : new Date(date);
  return parsedDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  });
};


const formatEventDate = (startTime: string | Date, endTime: string | Date): string => {
  const startDate = startTime instanceof Date ? startTime : new Date(startTime);
  const endDate = endTime instanceof Date ? endTime : new Date(endTime);

  const isSameDay = startDate.toDateString() === endDate.toDateString();

  if (isSameDay) {
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  } else {
    return `${formatDate(startTime)} ${formatTime(startTime)} - ${formatDate(endTime)} ${formatTime(endTime)}`;
  }
};

const EventCard = ({ item }: EventCardProps) => {
  const navigation = useNavigation<EventCRUDViewNavigationProps>();

  const handlePress = () => {
    const data: EventCRUDViewNavigationData = {
      mode: 'view',
      userEventResponse: item.userEventResponse
    };

    navigation.navigate("EventCRUDView", {data});
  };

  return (
    <TouchableOpacity style={styles.eventCard} onPress={handlePress}>
      {item.image && <Image source={item.image} style={styles.eventImage} />}
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{item.userEventResponse.event.name}</Text>
        <Text style={styles.eventDate}>
          {formatEventDate(item.userEventResponse.event.startTime, item.userEventResponse.event.endTime)}
        </Text>
        <Text style={styles.eventLocation}>{item.userEventResponse.event.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  eventImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  eventDetails: {
    flex: 1, // Ensures the details take up the remaining space
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4, // Adds spacing between title and date
  },
  eventDate: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4, // Adds spacing between date and location
  },
  eventLocation: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic", // Optional: Makes the location text italic
  },
});

export default EventCard;