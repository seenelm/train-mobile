import React, { useState, useRef } from "react";
import { Text, View, TextInput, Animated, Image, StyleSheet } from "react-native";
import { global } from "../../../utils/global";
import Message from "../components/Message";
import Header from "../../../components/header";
import Button from "../../../components/button";
import * as Icons from "../../../assets/icons";

const HEADER_HEIGHT = 60;

const ChatList = ({ navigation }: { navigation: any }) => {
  const [search, setSearch] = useState("");
  const scrollY = useRef(new Animated.Value(0)).current;

  const conversations = [
    { id: "1", name: "Family Group", lastMessage: "See you tomorrow!" },
    { id: "2", name: "Work Team", lastMessage: "Project update..." },
    { id: "3", name: "John Doe", lastMessage: "Thanks for the help!" },
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: { item: typeof conversations[0] }) => (
    <Message
      name={item.name}
      content={item.lastMessage}
      profilePic={Icons.groupProfile}
      navigation={navigation}
      route={{ params: { currentRoom: item.name, id: item.id }}}
    />
  );

  const searchBarPosition = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <View style={global.container}>
        <Header
          leftComponent={
            <>
              <Button
                onPress={() => navigation.navigate("ProfileScreen")}
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
        
        <Animated.FlatList
          data={filteredConversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageContainer}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          ListHeaderComponent={
            <Animated.View style={{ transform: [{ translateY: searchBarPosition }] }}>
              <View style={styles.searchBar}>
                <Image source={Icons.search} style={styles.searchIcon} />
                <TextInput
                  placeholder="Jump to..."
                  value={search}
                  onChangeText={setSearch}
                  style={styles.input}
                />
              </View>
            </Animated.View>
          }
          ListHeaderComponentStyle={styles.headerComponentStyle}
        />

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

export default ChatList;