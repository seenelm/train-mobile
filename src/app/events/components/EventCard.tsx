// components/EventCard.tsx
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type EventType = {
  _id: string;
  name: string;
  date: string;
};

type EventCardProps = {
  item: {
    image?: any;
    event: EventType;
  };
};

const EventCard = ({ item }: EventCardProps) => {
  return (
    <View style={styles.eventCard}>
      {item.image && <Image source={item.image} style={styles.eventImage} />}
      <View>
        <Text style={styles.eventTitle}>{item.event.name}</Text>
        <Text style={styles.eventDate}>{item.event.date}</Text>
      </View>
    </View>
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