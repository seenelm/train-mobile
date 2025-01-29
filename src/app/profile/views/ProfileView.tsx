import React from "react";
import { View, Text, StyleSheet, Image, ImageSourcePropType } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectUser, logout } from "../../../services/authSlice";
import Button from "../../../components/button";
import profile from "../../../assets/icons/profilepic.png";
import edit from "../../../assets/icons/edit.webp";

const ProfileView: React.FC = () => {
  const userId: string | null = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
});

export default ProfileView;
