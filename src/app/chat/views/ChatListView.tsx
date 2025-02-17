import React, { useState, useRef } from "react";
import { Text, View, TextInput, Animated, Image, StyleSheet } from "react-native";
import { global } from "../../../utils/global";
import Chat from "../components/Chat";
import Header from "../../../components/header";
import Button from "../../../components/button";
import * as Icons from "../../../assets/icons";

const HEADER_HEIGHT = 60;

const ChatList = ({ navigation }: { navigation: any }) => {
  const [search, setSearch] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;

  const chats = [
    { id: "1", name: "Family Group", lastMessage: "See you tomorrow!" },
    { id: "2", name: "Work Team", lastMessage: "Project update..." },
    { id: "3", name: "John Doe", lastMessage: "Thanks for the help!" },
  ];

  return (
    <View style={global.container}>
        <Header
          leftComponent={
            <>
              <Button
                onPress={() => navigation.navigate("Profile")}
                imgSource={Icons.profile}
                style={styles.iconContainer}
                imgStyle={styles.profileImage}
              />
              
            </>
          }
          middleComponent={
            <>
              <Text style={styles.headerText}>Chats</Text>
            </>
          }
        />

        <Chat chats={chats} />
        
       

      <Button
        onPress={() => navigation.navigate("AddChat")}
        style={styles.addGroupButton}
        imgSource={Icons.compose}
        imgStyle={styles.addGroupIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 45,
    height: 45,
    backgroundColor: "transparent",
  },
  messageContainer: {
    // paddingBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F6F6F8",
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  headerText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  addGroupButton: {
    position: "absolute",
    bottom: 20,
    right: 15,
    backgroundColor: "white",
    borderRadius: 30,
    width: 55,
    height: 55,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  addGroupIcon: {
    width: 24,
    height: 24,
  },
  headerComponentStyle: {
    height: HEADER_HEIGHT,
    justifyContent: "flex-end",
  },
});

/**
 * The main screen for the chat app, shows a list of chats
 * and a search bar to search for chats.
 *
 * @param {Object} props
 * @param {StackNavigationProp} props.navigation
 * @return {React.ReactElement}
 */
export default ChatList;