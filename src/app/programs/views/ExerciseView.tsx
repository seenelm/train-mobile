import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/types/navigationTypes';

// Sample data for exercises in a workout
const workoutExercises = [
  {
    id: '1',
    name: 'Barbell Bench Press',
    muscleGroup: 'Chest',
    sets: 4,
    reps: '8-10',
    rest: '90 sec',
    weight: '135-185 lbs',
    notes: 'Focus on full range of motion and controlled descent',
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '2',
    name: 'Incline Dumbbell Press',
    muscleGroup: 'Upper Chest',
    sets: 3,
    reps: '10-12',
    rest: '60 sec',
    weight: '40-60 lbs',
    notes: 'Keep elbows at 45-degree angle to protect shoulders',
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '3',
    name: 'Cable Flyes',
    muscleGroup: 'Chest',
    sets: 3,
    reps: '12-15',
    rest: '60 sec',
    weight: '15-25 lbs',
    notes: 'Focus on the stretch and contraction',
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '4',
    name: 'Overhead Tricep Extension',
    muscleGroup: 'Triceps',
    sets: 3,
    reps: '12-15',
    rest: '45 sec',
    weight: '25-35 lbs',
    notes: 'Keep elbows close to head',
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '5',
    name: 'Lateral Raises',
    muscleGroup: 'Shoulders',
    sets: 3,
    reps: '12-15',
    rest: '45 sec',
    weight: '10-20 lbs',
    notes: 'Slight bend in elbows, raise to shoulder height',
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '6',
    name: 'Face Pulls',
    muscleGroup: 'Rear Delts',
    sets: 3,
    reps: '15-20',
    rest: '45 sec',
    weight: '20-30 lbs',
    notes: 'Pull towards forehead with external rotation',
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '7',
    name: 'Tricep Pushdowns',
    muscleGroup: 'Triceps',
    sets: 3,
    reps: '12-15',
    rest: '45 sec',
    weight: '30-50 lbs',
    notes: 'Keep elbows at sides, fully extend arms',
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: '8',
    name: 'Plank',
    muscleGroup: 'Core',
    sets: 3,
    reps: '30-60 sec',
    rest: '30 sec',
    weight: 'Bodyweight',
    notes: 'Maintain neutral spine position',
    completed: false,
    image: 'https://via.placeholder.com/150'
  },
];

type ExerciseViewProps = {
  navigation: NavigationProp<MainStackParamList>;
  route: RouteProp<MainStackParamList, 'ExerciseView'>;
};

const ExerciseView = ({ navigation, route }: ExerciseViewProps) => {
  const insets = useSafeAreaInsets();
  // Get the workoutId from route params
  const { workoutId } = route.params;
  
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  const toggleExerciseExpand = (exerciseId: string) => {
    if (expandedExercise === exerciseId) {
      setExpandedExercise(null);
    } else {
      setExpandedExercise(exerciseId);
    }
  };

  const toggleExerciseComplete = (exerciseId: string) => {
    // In a real app, you would update the exercise completion status
    console.log(`Toggle completion for exercise ${exerciseId}`);
  };

  const navigateToSetView = (exerciseId: string) => {
    navigation.navigate('SetView', { exerciseId });
  };

  const renderExerciseItem = ({ item }) => {
    const isExpanded = expandedExercise === item.id;
    
    return (
      <View style={styles.exerciseCard}>
        <TouchableOpacity 
          style={styles.exerciseHeader}
          onPress={() => toggleExerciseExpand(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.exerciseBasicInfo}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.muscleGroup}>{item.muscleGroup}</Text>
          </View>
          <View style={styles.setInfo}>
            <Text style={styles.setCount}>{item.sets} sets</Text>
            <Text style={styles.repCount}>{item.reps}</Text>
          </View>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Image source={{ uri: item.image }} style={styles.exerciseImage} />
            
            <View style={styles.exerciseDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Weight:</Text>
                <Text style={styles.detailValue}>{item.weight}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Rest:</Text>
                <Text style={styles.detailValue}>{item.rest}</Text>
              </View>
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <Text style={styles.notesText}>{item.notes}</Text>
              </View>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.logSetsButton}
                onPress={() => navigateToSetView(item.id)}
              >
                <Text style={styles.logSetsButtonText}>
                  Log Sets
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[
                  styles.completeButton, 
                  item.completed ? styles.completedButton : {}
                ]}
                onPress={() => toggleExerciseComplete(item.id)}
              >
                <Text style={styles.completeButtonText}>
                  {item.completed ? 'Completed' : 'Mark as Complete'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.workoutTitle}>Upper Body Power</Text>
        <Text style={styles.workoutDescription}>
          Focus on chest, shoulders, and triceps
        </Text>
      </View>
      
      <FlatList
        data={workoutExercises}
        renderItem={renderExerciseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      
      <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity style={styles.finishButton}>
          <Text style={styles.finishButtonText}>Finish Workout</Text>
        </TouchableOpacity>
      </View>
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
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  exerciseBasicInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  muscleGroup: {
    fontSize: 14,
    color: '#666',
  },
  setInfo: {
    alignItems: 'flex-end',
  },
  setCount: {
    fontSize: 14,
    fontWeight: '600',
  },
  repCount: {
    fontSize: 14,
    color: '#666',
  },
  expandedContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  exerciseImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  exerciseDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  detailValue: {
    fontSize: 14,
    color: '#666',
  },
  notesContainer: {
    marginTop: 8,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 8,
  },
  logSetsButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    height: 44,
  },
  logSetsButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 0,
    flex: 1,
    height: 44,
  },
  completedButton: {
    backgroundColor: '#8BC34A',
  },
  completeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  separator: {
    height: 12,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  finishButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  finishButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ExerciseView;