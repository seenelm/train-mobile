import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ImageSourcePropType } from "react-native";
import { NavigationProp } from "@react-navigation/native";

interface RouteParams {
  id: string;
  currentRoom: string;
}

interface MessageProps {
  name: string;
  content: string;
  profilePic: ImageSourcePropType;
  navigation: NavigationProp<any>;
  route: {
    params: RouteParams;
  };
}

const Message: React.FC<MessageProps> = ({
  name,
  content,
  profilePic,
  navigation,
  route,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ChatScreen", {
          conversationId: route.params.id,
          currentRoom: route.params.currentRoom,
        })
      }
      style={styles.container}
    >
      <View style={styles.messageContainer}>
        <Image source={profilePic} style={styles.image} />
        <View style={styles.message}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.content} numberOfLines={2} ellipsizeMode="tail">
            {content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginRight: 30,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "flex-start",
    maxWidth: "90%",
    paddingHorizontal: 10,
  },
  message: {
    flexDirection: "column",
    marginLeft: 10,
    flexShrink: 1,
    justifyContent: "flex-start",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 15,
  },
  content: {
    fontSize: 14,
    flexShrink: 1,
    color: "#666",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 13,
    marginRight: 10,
  },
  container: {
    // Add container styles if needed
  },
});

export default Message;