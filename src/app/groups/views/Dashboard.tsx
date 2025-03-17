import React from "react";
import { View, Image, StyleSheet, FlatList, RefreshControl, Text } from "react-native";
import Card from "../../../components/card";
import Button from "../../../components/button";
import Header from "../../../components/header";
import { MainStackParamList } from "../../../navigation/types/navigationTypes";
import GroupSkeleton from "../components/GroupSkeleton";
import { DashboardProps } from "../types/dashboardProps";
import * as Icons from "../../../assets/icons";
import profile from "../../../assets/icons/profilepic.png"
import logo from "../../../assets/icons/logo.png"
import { selectUser } from "../../../services/authSlice";
import { useSelector } from "react-redux";
import { useFetchUserGroups } from "../services/groupActions";
import { UserGroupsResponse, GroupResponse } from "../types/groupTypes";


const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const userId = useSelector(selectUser);
  // Only fetch user groups if userId exists
  const { data: userGroupsResponse, isLoading, error } = userId ? useFetchUserGroups(userId) : { data: undefined, isLoading: false, error: null };
  
  // Extract the groups array from the response
  const groups = (userGroupsResponse as UserGroupsResponse | undefined)?.groups || [];


  const nav = (screen: keyof MainStackParamList) => {
    navigation.navigate(screen as any);
  };


  const renderItem = ({ item }: { item: GroupResponse }) => {
    console.log("Rendering item:", item);
    return (
      <Card
        imageUrl="https://via.placeholder.com/150"
        groupName={item.groupName}
        groupId={item._id}
        onPress={() => navigation.navigate("TopTabs", { groupId: item._id.toString() })}
      />
    );
  };

  // Render skeleton items in the same layout as the cards
  const renderSkeletons = () => {
    // Create an array of 4 items for skeleton placeholders
    const skeletonItems = [1, 2, 3, 4];
    
    return (
      <FlatList
        data={skeletonItems}
        renderItem={() => <GroupSkeleton style={styles.groupSkeleton} />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    );
  };

  const handleRefresh = () => {
    // Add refresh logic here if needed
    console.log("Refreshing groups list");
  };

  // If there's an error, show it
  if (error) {
    console.error("Error fetching groups:", error);
  }

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Button
            onPress={() => nav("Profile")}
            imgSource={profile}
            style={styles.iconContainer}
            imgStyle={styles.profileImage}
          />
        }
        middleComponent={<Image source={logo} style={styles.logo} />}
        rightComponent={
          <>
            <Button
              onPress={() => nav("SearchView")}
              style={styles.iconContainer}
              imgSource={Icons.search}
              imgStyle={styles.image}
            />
          </>
        }
      />
      <View style={styles.dashboard}>
        {isLoading ? (
          renderSkeletons()
        ) : groups && groups.length > 0 ? (
          <FlatList
            data={groups}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
            numColumns={groups.length === 1 ? 1 : 2}
            key={groups.length === 1 ? "singleColumn" : "doubleColumn"}
            refreshControl={<RefreshControl refreshing={false} onRefresh={handleRefresh} />}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <Text style={styles.noGroupsText}>No groups found. Create or join a group to get started.</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dashboard: {
    flex: 1,
    justifyContent: 'center',
  },
  flatListContent: {
    padding: 10,
  },
  iconContainer: {
    flex: 1,
    aspectRatio: 1,
    maxHeight: 45,
    maxWidth: 45,
    backgroundColor: "transparent",
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 25,
  },
  logo: {
    backgroundColor: "transparent",
    width: 40,
    height: 40,
    padding: 4,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    marginTop: 2,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  noGroupsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    padding: 20,
  },
  groupSkeleton: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 8,
  },
});

export default Dashboard;
