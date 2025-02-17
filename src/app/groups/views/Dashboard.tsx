import React from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import Card from "../../../components/card";
import Button from "../../../components/button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../components/header";
import { MainStackParamList } from "../../../navigation/types/navigationTypes";
import { DashboardProps } from "../types/dashboardProps";
import * as Icons from "../../../assets/icons";
import profile from "../../../assets/icons/profilepic.png"
import logo from "../../../assets/icons/logo.png"



const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
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
  const nav = (screen: keyof MainStackParamList) => {
    navigation.navigate(screen);
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Button
            onPress={() => nav("SearchView")}
            imgSource={profile}
            style={styles.iconContainer}
            imgStyle={styles.profileImage}
          />
        }
        middleComponent={<Image source={logo} style={styles.logo} />}
        rightComponent={
          <>
            <Button
              onPress={() => {}}
              style={styles.iconContainer}
              imgSource={Icons.search}
              imgStyle={styles.image}
            />
          </>
        }
      />
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
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 45,
    maxWidth: 45,
    backgroundColor: "transparent",
    marginBottom: 10,
  },

  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  logo: {
    backgroundColor: "transparent",
    width: 40,
    height: 40,
    padding: 5,

  },
  image: {
    flex: 1,
    aspectRatio: 1,
    marginTop: 2,
  },
});

export default Dashboard;
