import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectUser, logout } from "../../../services/authSlice";
import Button from "../../../components/button";
import profile from "../../../assets/icons/profilepic.png"
import edit from "../../../assets/icons/edit.webp";

const ProfileView = () => {
  const userId = useSelector(selectUser);
  const dispatch = useDispatch();

  const name = "Yassine";
  const bio = "Testing Bio - Hi Im a developer from New York - I currently work for Sculptor";

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <View style={styles.banner}>
        <Button
          imgSource={edit}
          style={styles.editButton}
          imgStyle={styles.editIcon}
          onPress={handleLogout}
        />
      </View>
      <View style={styles.profileSection}>
        <Image style={styles.profileImg} source={profile} />
      </View>
      <View style={styles.infoSection}>
        <View style={styles.userInfo}>
          <Text style={styles.username}>@{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
        <View style={styles.buttonContainer}>
          <Button style={styles.buttonStyle} onPress={() => {}}>
            Edit Profile
          </Button>
          <Button
            style={[styles.buttonStyle, styles.notificationButtonStyle]}
            onPress={handleLogout}
          >
            N
          </Button>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
  },
  profileSection: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 75,
  },
  banner: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 150,
    backgroundColor: "black",
  },
  profileImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    zIndex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  infoSection: {
    padding: 20,
  },
  userInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  followInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  followItem: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  followNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  followLabel: {
    fontSize: 14,
    color: "gray",
  },
  followText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // Changed to center items vertically
  },
  buttonStyle: {
    padding: 10,
    height: 40,
    width: "75%",
    borderRadius: 8,
    flexGrow: 1, // Make the button expand to fill available space
  },
  notificationButtonStyle: {
    padding: 5,
    height: 40,
    borderRadius: 8,
    width: "1%",
    marginLeft: 10, // Add some space between the two buttons
  },
  editButton: {
    position: "absolute",
    top: 75, // Adjust top and right as needed
    right: 20,
    padding: 10, // Makes it easier to tap
    backgroundColor: "rgba(128, 128, 128, 0.5)", // See-through gray
    height: 40,
    width: 40,
  },
  editIcon: {
    width: 20, // Adjust size as needed
    height: 20,
  },
});

export default ProfileView;