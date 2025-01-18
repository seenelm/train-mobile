import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Card from "../../components/card";
import Button from "../../components/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/store";
import { logout } from "../../services/authSlice";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
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
      <Button
        onPress={() => dispatch(logout())}
        imgSource={() => null}
        style={{ backgroundColor: "red", width: "20%" }}>
        
        Logout
        </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dashboard: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "flex-start",
    padding: 10,
  },
});

export default Dashboard;
