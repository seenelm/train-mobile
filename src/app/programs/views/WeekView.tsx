import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/types/navigationTypes';

// Sample data for weeks in a program
const programWeeks = [
  {
    id: '1',
    weekNumber: 1,
    title: 'Foundation Week',
    description: 'Focus on form and building a base',
    workouts: 3,
    completed: 2,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '2',
    weekNumber: 2,
    title: 'Progressive Overload',
    description: 'Increase weight and challenge yourself',
    workouts: 4,
    completed: 1,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '3',
    weekNumber: 3,
    title: 'Hypertrophy Focus',
    description: 'Higher reps for muscle growth',
    workouts: 4,
    completed: 0,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '4',
    weekNumber: 4,
    title: 'Strength Week',
    description: 'Lower reps with higher weight',
    workouts: 3,
    completed: 0,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '5',
    weekNumber: 5,
    title: 'Deload Week',
    description: 'Recovery and active rest',
    workouts: 2,
    completed: 0,
    image: 'https://via.placeholder.com/150'
  },
];

type WeekViewProps = {
  navigation: NavigationProp<MainStackParamList>;
};

const WeekView = ({ navigation }: WeekViewProps) => {
  const insets = useSafeAreaInsets();

  const handleWeekPress = (weekId) => {
    // Navigate to specific workout view for this week
   navigation.navigate('WorkoutView', { weekId });
  };

  const renderWeekCard = ({ item }) => {
    const progressPercentage = (item.completed / item.workouts) * 100;
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => handleWeekPress(item.id)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.weekHeader}>
            <Text style={styles.weekNumber}>Week {item.weekNumber}</Text>
            <Text style={styles.workoutCount}>{item.workouts} workouts</Text>
          </View>
          <Text style={styles.weekTitle}>{item.title}</Text>
          <Text style={styles.weekDescription}>{item.description}</Text>
          
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${progressPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {item.completed}/{item.workouts} completed
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={programWeeks}
        renderItem={renderWeekCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 16,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  weekNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  workoutCount: {
    fontSize: 14,
    color: '#666',
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  weekDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBackground: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  separator: {
    height: 16,
  },
});

export default WeekView;