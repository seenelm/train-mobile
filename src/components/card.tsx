import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import ContextMenu from "react-native-context-menu-view";
import { CardProps } from "./types/globalTypes";


const Card: React.FC<CardProps> = ({ imageUrl, groupName, groupId, onPress }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={()=>{}}
        style={styles.touchableArea}
        activeOpacity={0.6}
        >
            <ContextMenu actions={[{ title: "Edit Fitspace", systemIcon: "pencil" }, { title: "Leave Fitspace", systemIcon: "trash", destructive: true }]}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </ContextMenu>
        </TouchableOpacity>
      <Text style={styles.groupName}>{groupName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 200,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
  },
  groupName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  touchableArea: {
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    width: "85%",
    flex: 1,
    borderRadius: 15,
  },
});

export default Card;
