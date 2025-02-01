import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { EventResponse } from "../models/eventModel";

type EventCardProps = {
  item: {
    image?: any;
    event: EventResponse;
  };
};

type RootStackParamList = { EventOverview: { event: EventResponse };};

type EventOverviewScreenNavigationProp = StackNavigationProp< RootStackParamList, "EventOverview" >;


const formatTime = (date: string | Date): string => {
  const parsedDate = date instanceof Date ? date : new Date(date);
  return parsedDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};


const EventCard = ({ item }: EventCardProps) => {
  const navigation = useNavigation<EventOverviewScreenNavigationProp>();
  
  const handlePress = () => {
    navigation.navigate("EventOverview", { event: item.event });
  };
  return (
    <TouchableOpacity style={styles.eventCard} onPress={handlePress}>
      {item.image && <Image source={item.image} style={styles.eventImage} />}
      <View>
        <Text style={styles.eventTitle}>{item.event.name}</Text>
        <Text style={styles.eventDate}>{formatTime(item.event.startTime)}</Text>
        <Text style={styles.eventDate}>{formatTime(item.event.endTime)}</Text>
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
    borderRadius: 20 
  },
  eventTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#333" 
  },
  eventDate: { 
    fontSize: 14, 
    color: "#666" 
  },
});

export default EventCard;