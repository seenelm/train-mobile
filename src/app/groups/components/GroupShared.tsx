import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp, useRoute, RouteProp } from "@react-navigation/native";
import { MainStackParamList } from "../../../navigation/types/navigationTypes";
import Button from "../../../components/button";
import * as Icons from "../../../assets/icons";
import { useFetchGroupPrograms } from "../services/groupActions";
import { ProgramResponse } from "../models/Programs";

type GroupSharedProps = {
  navigation: NavigationProp<MainStackParamList>;
  groupId: string;
};

const GroupShared = ({ navigation, groupId }: GroupSharedProps) => {
  const { data: programs, isLoading, error } = useFetchGroupPrograms(groupId);
  console.log("programs: ", JSON.stringify(programs, null, 2));
  const insets = useSafeAreaInsets();
  
  
  const renderProgram = ({ item }: { item: ProgramResponse }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('WeekView')}
    >
      <Image source={{ uri: item.imagePath }} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        data={programs?.data}
        renderItem={renderProgram}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Button
        onPress={() => navigation.navigate('CreateProgram', { groupId })}
        imgSource={Icons.add}
        style={styles.addButton}
        imgStyle={styles.addIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 16,
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 12,
  },
  addButton: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 55,
    height: 55,
    position: "absolute",
    bottom: 20,
    right: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  addIcon: { width: 24, height: 24 },
});

export default GroupShared;