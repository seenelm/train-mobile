import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";
import { MainStackParamList } from "../../../navigation/types/navigationTypes";
import Button from "../../../components/button";
import * as Icons from "../../../assets/icons";

type GroupSharedProps = {
  navigation: NavigationProp<MainStackParamList>;
};

// Add this type definition after your GroupSharedProps type
type WorkoutProgram = {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
};

// Sample workout program data
const workoutPrograms = [
  {
    id: '1',
    title: 'Beginner Strength Training',
    description: 'A 4-week program for beginners to build foundational strength',
    url: 'https://www.example.com/beginner-strength',
    icon: 'https://via.placeholder.com/150'
  },
  {
    id: '2',
    title: 'HIIT Cardio Challenge',
    description: '30-day high intensity interval training for fat loss',
    url: 'https://www.example.com/hiit-cardio',
    icon: 'https://via.placeholder.com/150'
  },
  {
    id: '3',
    title: 'Mobility & Recovery',
    description: 'Essential stretches and mobility work for recovery days',
    url: 'https://www.example.com/mobility',
    icon: 'https://via.placeholder.com/150'
  },
  {
    id: '4',
    title: 'Bodyweight Basics',
    description: 'No equipment needed - full body workouts using just your bodyweight',
    url: 'https://www.example.com/bodyweight',
    icon: 'https://via.placeholder.com/150'
  },
  {
    id: '5',
    title: 'Powerlifting Program',
    description: 'Advanced 12-week program focused on the big three lifts',
    url: 'https://www.example.com/powerlifting',
    icon: 'https://via.placeholder.com/150'
  }
];

const GroupShared = ({ navigation }: GroupSharedProps) => {
  const insets = useSafeAreaInsets();
  

  const renderItem = ({ item }: { item: WorkoutProgram }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('WeekView')}
    >
      <Image source={{ uri: item.icon }} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <FlatList
        data={workoutPrograms}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <Button
            onPress={() => {navigation.navigate('CreateProgram')}}
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