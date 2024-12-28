import React from "react";
import { View, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import TopSheet from "../components/TopSheet";
import Button from "../../../components/button";
import addEvent from "../../../assets/icons/add.png";

type NavigationProps = {
  navigate: (screen: string) => void;
};

const EventLanding = () => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TopSheet />
        <Button
          onPress={() => navigation.navigate('CreateEvent')}
          imgSource={addEvent}
          style={styles.addButton}
          imgStyle={styles.addIcon}
        />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8f8" },
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