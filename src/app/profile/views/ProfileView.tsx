import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert, ScrollView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectUser, logout } from "../../../services/authSlice";
import Button from "../../../components/button";
import Header from "../../../components/header";
import profile from "../../../assets/icons/profilepic.png";
import * as Icons from "../../../assets/icons";
import messaging from '@react-native-firebase/messaging';

const ProfileView: React.FC = () => {
  const userId: string | null = useSelector(selectUser);
  const dispatch = useDispatch();

  async function getToken() {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const renderSupportOption = (title: string, onPress: () => void) => (
    <TouchableOpacity style={styles.supportOption} onPress={onPress}>
      <Text style={styles.supportOptionText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        middleComponent={<Text style={styles.headerTitle}>Profile</Text>}
        rightComponent={
          <TouchableOpacity style={styles.editIconContainer} onPress={() => {}}>
            <Image source={Icons.editing} style={styles.editIcon} />
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image style={styles.profileImg} source={profile} />
          <Text style={styles.name}>Yassine</Text>
          <Text style={styles.username}>@yassine_dev</Text>
          <Text style={styles.bio}>
            Hi I'm a developer from New York - I currently work for Sculptor
          </Text>
        </View>

        {/* Support Options Container */}
        <View style={styles.supportContainer}>
          {renderSupportOption("Support", () => {})}
          {renderSupportOption("Device Settings", () => {})}
          {renderSupportOption("Terms and Conditions", () => {})}
          <TouchableOpacity style={[styles.supportOption, styles.logoutOption]} onPress={handleLogout}>
            <Text style={[styles.supportOptionText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>

        {/* Token Button (for development) */}
        <View style={styles.devSection}>
          <Button
            style={styles.tokenButton}
            onPress={getToken}
          >
            Get FCM Token
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
    padding: 7.5,
  },
  editIconContainer: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 25,
    maxWidth: 25,
  },
  editIcon: {
    width: 25,
    height: 25,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  profileImg: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: "#888",
    marginBottom: 15,
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    lineHeight: 20,
  },
  supportContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingTop: 20,
  },
  supportOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  supportOptionText: {
    fontSize: 16,
    color: "#333",
  },
  logoutOption: {
    marginTop: 10,
    borderBottomWidth: 0,
  },
  logoutText: {
    color: "#f66",
    fontWeight: "500",
  },
  devSection: {
    paddingHorizontal: 20,
    marginTop: 40,
    alignItems: "center",
  },
  tokenButton: {
    padding: 10,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
});

export default ProfileView;
