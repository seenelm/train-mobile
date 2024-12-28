import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Card from "../../components/card";

const Dashboard: React.FC = () => {
  // Array of card data
  const cardData = [
    {
      imageUrl: "https://via.placeholder.com/150",
      groupName: "Fitspace A",
      groupId: { id: 1 },
      onPress: () => console.log("Pressed Fitspace A"),
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      groupName: "Fitspace B",
      groupId: { id: 2 },
      onPress: () => console.log("Pressed Fitspace B"),
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      groupName: "Fitspace C",
      groupId: { id: 3 },
      onPress: () => console.log("Pressed Fitspace C"),
    },
    {
      imageUrl: "https://via.placeholder.com/150",
      groupName: "Fitspace D",
      groupId: { id: 4 },
      onPress: () => console.log("Pressed Fitspace D"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.dashboard}>
        {cardData.map((card, index) => (
          <Card
            key={index}
            imageUrl={card.imageUrl}
            groupName={card.groupName}
            groupId={card.groupId}
            onPress={card.onPress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the full height and width
    backgroundColor: "#f5f5f5",
  },
  dashboard: {
    flexGrow: 1, // Allows the content to expand and fill the ScrollView
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start", // Ensures the items are aligned at the top
    padding: 10,
  },
});

export default Dashboard;
