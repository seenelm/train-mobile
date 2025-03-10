import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import ContextMenu from "react-native-context-menu-view";
import { CardProps } from "./types/globalTypes";
import * as Icons from "../assets/icons";

// Get screen dimensions
const { width: screenWidth } = Dimensions.get('window');

// Calculate dynamic card dimensions
const cardWidth = (screenWidth - 30) / 2;
const cardHeight = cardWidth * 1.1;

const Card: React.FC<CardProps> = ({ imageUrl, groupName, groupId, onPress }) => {
  return (
    <View style={styles.card}>
      <ContextMenu actions={[{ title: "Edit Fitspace", systemIcon: "pencil" }, { title: "Leave Fitspace", systemIcon: "trash", destructive: true }]}>
        <TouchableOpacity
          onPress={onPress}
          activeOpacity={0.6}
          style={styles.touchableArea}
        >
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
      </ContextMenu>
      
      <View style={styles.footer}>
        <Text style={styles.groupName} numberOfLines={1} ellipsizeMode="tail">{groupName}</Text>
        <TouchableOpacity style={styles.editButton}>
          <Image source={Icons.editing || require('../assets/icons/edit.png')} style={styles.editIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    padding: 10,
    flexDirection: 'column',
    marginRight: 10,
  },
  touchableArea: {
    width: cardWidth - 20,
    
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  groupName: {
    fontSize: Math.max(12, cardWidth * 0.08),
    fontWeight: "bold",
    flex: 1,
    marginRight: 5,
  },
  editButton: {
    padding: 3,
  },
  editIcon: {
    width: 18,
    height: 18,
  },
});

export default Card;
