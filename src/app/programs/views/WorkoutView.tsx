import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp, CommonActions } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/types/navigationTypes';

// Sample data for workouts in a week
const weekWorkouts = [
  {
    id: '1',
    title: 'Upper Body Power',
    description: 'Focus on chest, shoulders, and triceps',
    duration: '45 min',
    exercises: 8,
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '2',
    title: 'Lower Body Strength',
    description: 'Squats, deadlifts, and accessory movements',
    duration: '60 min',
    exercises: 7,
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '3',
    title: 'Core & Conditioning',
    description: 'Abdominal work and cardio intervals',
    duration: '30 min',
    exercises: 6,
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '4',
    title: 'Pull Day',
    description: 'Back, biceps, and rear delts',
    duration: '50 min',
    exercises: 9,
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '5',
    title: 'Active Recovery',
    description: 'Light cardio and mobility work',
    duration: '25 min',
    exercises: 5,
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
];

type WorkoutViewProps = {
  navigation: NavigationProp<MainStackParamList, 'WorkoutView'>;
  route: RouteProp<MainStackParamList, 'WorkoutView'>;
};

const WorkoutView = ({ navigation, route }: WorkoutViewProps) => {
  const insets = useSafeAreaInsets();
  // In a real app, you would get the weekId from route.params and fetch workouts
  // const { weekId } = route.params;

  const handleWorkoutPress = (workoutId: string) => {
    // Navigate to specific exercise view for this workout
    console.log(`Workout ${workoutId} pressed`);
    navigation.navigate('ExerciseView', { workoutId });
  };

  const renderWorkoutCard = ({ item }) => {
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => handleWorkoutPress(item.id)}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardHeaderContent}>
            <Text style={styles.workoutTitle}>{item.title}</Text>
            <Text style={styles.workoutDuration}>{item.duration}</Text>
          </View>
          <View style={[
            styles.statusIndicator, 
            { backgroundColor: item.completed ? '#4CAF50' : '#FFC107' }
          ]} />
        </View>
        
        <View style={styles.cardBody}>
          <Image source={{ uri: item.image }} style={styles.workoutImage} />
          <View style={styles.workoutDetails}>
            <Text style={styles.workoutDescription}>{item.description}</Text>
            <Text style={styles.exerciseCount}>{item.exercises} exercises</Text>
            
            <View style={styles.actionButton}>
              <Text style={styles.actionButtonText}>
                {item.completed ? 'Completed' : 'Start Workout'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.weekTitle}>Week 2: Progressive Overload</Text>
        <Text style={styles.weekDescription}>
          Focus on increasing weights and challenging yourself
        </Text>
      </View>
      
      <FlatList
        data={weekWorkouts}
        renderItem={renderWorkoutCard}
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
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  weekTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  weekDescription: {
    fontSize: 14,
    color: '#666',
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cardHeaderContent: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  workoutDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  cardBody: {
    flexDirection: 'row',
    padding: 16,
  },
  workoutImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  workoutDetails: {
    flex: 1,
    marginLeft: 16,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  exerciseCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  separator: {
    height: 16,
  },
});

export default WorkoutView;