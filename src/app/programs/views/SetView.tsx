import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput,
  Alert
} from 'react-native';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/types/navigationTypes';

// Define the structure for a single set
type SetData = {
  id: string;
  weight: string;
  reps: string;
  completed: boolean;
};

// Define props for the component
type SetViewProps = {
  navigation: NavigationProp<MainStackParamList>;
  route: RouteProp<MainStackParamList, 'SetView'>;
};

// Sample exercise data - in a real app, you would fetch this based on exerciseId
const getExerciseById = (exerciseId: string) => {
  return {
    id: exerciseId,
    name: 'Barbell Bench Press',
    muscleGroup: 'Chest',
    targetSets: 4,
    targetReps: '8-10',
    suggestedWeight: '135-185 lbs',
    notes: 'Focus on full range of motion and controlled descent',
  };
};

const SetView = ({ navigation, route }: SetViewProps) => {
  const { exerciseId } = route.params;
  
  // Get exercise details
  const exercise = getExerciseById(exerciseId);
  
  // Initialize sets based on target sets from exercise
  const [sets, setSets] = useState<SetData[]>(() => {
    const initialSets = [];
    for (let i = 0; i < exercise.targetSets; i++) {
      initialSets.push({
        id: `set-${i+1}`,
        weight: '',
        reps: '',
        completed: false
      });
    }
    return initialSets;
  });
  
  // Function to update a specific set's data
  const updateSetData = (id: string, field: 'weight' | 'reps', value: string) => {
    setSets(prevSets => 
      prevSets.map(set => 
        set.id === id ? { ...set, [field]: value } : set
      )
    );
  };
  
  // Function to toggle completion status of a set
  const toggleSetCompletion = (id: string) => {
    setSets(prevSets => 
      prevSets.map(set => 
        set.id === id ? { ...set, completed: !set.completed } : set
      )
    );
  };
  
  // Function to add a new set
  const addSet = () => {
    const newSetId = `set-${sets.length + 1}`;
    setSets([...sets, { id: newSetId, weight: '', reps: '', completed: false }]);
  };
  
  // Function to remove a set
  const removeSet = (id: string) => {
    setSets(prevSets => prevSets.filter(set => set.id !== id));
  };
  
  // Function to save all set data
  const saveSetData = () => {
    // In a real app, you would send this data to your backend
    console.log('Saving set data:', sets);
    
    // Show confirmation and navigate back
    Alert.alert(
      'Success',
      'Your workout data has been saved!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.exerciseName}>{exercise.name}</Text>
        <Text style={styles.muscleGroup}>{exercise.muscleGroup}</Text>
        <View style={styles.targetContainer}>
          <Text style={styles.targetLabel}>Target: </Text>
          <Text style={styles.targetValue}>{exercise.targetSets} sets of {exercise.targetReps} reps</Text>
        </View>
        <View style={styles.targetContainer}>
          <Text style={styles.targetLabel}>Suggested weight: </Text>
          <Text style={styles.targetValue}>{exercise.suggestedWeight}</Text>
        </View>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.setsContainer}>
          <View style={styles.setHeaderRow}>
            <Text style={[styles.setHeaderText, styles.setNumberHeader]}>Set</Text>
            <Text style={[styles.setHeaderText, styles.weightHeader]}>Weight</Text>
            <Text style={[styles.setHeaderText, styles.repsHeader]}>Reps</Text>
            <Text style={[styles.setHeaderText, styles.statusHeader]}>Status</Text>
            <View style={styles.actionHeader} />
          </View>
          
          {sets.map((set, index) => (
            <View key={set.id} style={styles.setRow}>
              <Text style={styles.setNumber}>{index + 1}</Text>
              
              <View style={styles.weightContainer}>
                <TextInput
                  style={styles.input}
                  value={set.weight}
                  onChangeText={(value) => updateSetData(set.id, 'weight', value)}
                  placeholder="0"
                  keyboardType="numeric"
                />
                <Text style={styles.unitText}>lbs</Text>
              </View>
              
              <TextInput
                style={[styles.input, styles.repsInput]}
                value={set.reps}
                onChangeText={(value) => updateSetData(set.id, 'reps', value)}
                placeholder="0"
                keyboardType="numeric"
              />
              
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  set.completed ? styles.completedButton : styles.pendingButton
                ]}
                onPress={() => toggleSetCompletion(set.id)}
              >
                <Text style={styles.statusButtonText}>
                  {set.completed ? 'Done' : 'To Do'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeSet(set.id)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
          
          <TouchableOpacity style={styles.addSetButton} onPress={addSet}>
            <Text style={styles.addSetButtonText}>+ Add Set</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Notes:</Text>
          <Text style={styles.notesText}>{exercise.notes}</Text>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveSetData}>
          <Text style={styles.saveButtonText}>Save Workout</Text>
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
  exerciseName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  muscleGroup: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  targetContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  targetLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  targetValue: {
    fontSize: 14,
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  setsContainer: {
    padding: 16,
  },
  setHeaderRow: {
    flexDirection: 'row',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 8,
  },
  setHeaderText: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: 14,
  },
  setNumberHeader: {
    width: 40,
  },
  weightHeader: {
    flex: 1,
  },
  repsHeader: {
    width: 60,
    textAlign: 'center',
  },
  statusHeader: {
    width: 70,
    textAlign: 'center',
  },
  actionHeader: {
    width: 40,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  setNumber: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  weightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  unitText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  repsInput: {
    width: 60,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  statusButton: {
    width: 70,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  pendingButton: {
    backgroundColor: '#FFC107',
  },
  completedButton: {
    backgroundColor: '#4CAF50',
  },
  statusButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  removeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    fontSize: 16,
    color: '#FF5252',
    fontWeight: 'bold',
  },
  addSetButton: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  addSetButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  notesContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    margin: 16,
    borderRadius: 8,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notesText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SetView;