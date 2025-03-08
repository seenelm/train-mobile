import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectUser, logout } from "../../../services/authSlice";
import Button from "../../../components/button";
import profile from "../../../assets/icons/profilepic.png";
import edit from "../../../assets/icons/edit.webp";
import messaging from '@react-native-firebase/messaging';

const ProfileView: React.FC = () => {
  const userId: string | null = useSelector(selectUser);
  const dispatch = useDispatch();

  async function getToken() {
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    return token;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View>
          <Button
            imgSource={edit}
            style={styles.editButton}
            imgStyle={styles.editIcon}
            onPress={() => {}}
          />
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image style={styles.profileImg} source={profile} />
          <Text style={styles.username}>Yassine</Text>
          <Text style={styles.bio}>
            Hi I'm a developer from New York - I currently work for Sculptor
          </Text>
        </View>

        {/* Actions Section */}
        <View style={styles.actions}>
          <Button style={styles.button} onPress={() => {}}>
            Edit Profile
          </Button>
          <Button
            style={[styles.button, styles.logoutButton]}
            onPress={() => dispatch(logout())}
          >
            Logout
          </Button>
        </View>

        <View>
          <Button
            style={styles.button}
            onPress={getToken}
          >
            Get Token
          </Button>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContent: {
    flexGrow: 1,
  },
  editButton: {
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    textAlign: "center",
    color: "gray",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    padding: 10,
    height: 40,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton: {
    backgroundColor: "#f66",
  },
  testSection: {
    paddingHorizontal: 30,
    marginTop: 30,
    gap: 15,
  },
  testButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#4a90e2",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationButton: {
    backgroundColor: "#5cb85c",
  }
});

export default ProfileView;
