import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/types/navigationTypes';
import { useExercises } from '../services/programActions';
import { Exercise } from '../services/programServices';

// Define the props for the ExerciseView component
type ExerciseViewProps = {
  navigation: NavigationProp<MainStackParamList>;
  route: RouteProp<MainStackParamList, 'ExerciseView'>;
};

const ExerciseView = ({ navigation, route }: ExerciseViewProps) => {
  const insets = useSafeAreaInsets();
  // Get the workoutId from route params
  const { workoutId } = route.params;
  
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [selectedExercises, setSelectedExercises] = useState<{[key: string]: boolean}>({});
  
  // Use the custom hook to fetch exercises from RapidAPI
  const { 
    exercises, 
    loading, 
    error, 
    bodyParts, 
    selectedBodyPart,
    filterByBodyPart,
    resetFilters
  } = useExercises();

  const toggleExerciseExpand = (exerciseId: string) => {
    if (expandedExercise === exerciseId) {
      setExpandedExercise(null);
    } else {
      setExpandedExercise(exerciseId);
    }
  };

  const toggleExerciseSelect = (exerciseId: string) => {
    setSelectedExercises(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId]
    }));
  };

  const navigateToSetView = (exerciseId: string) => {
    navigation.navigate('SetView', { exerciseId });
  };

  // Simplified body part filter implementation
  const renderBodyPartFilter = () => {
    return (
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={['All', ...bodyParts]}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            const isSelected = 
              (item === 'All' && selectedBodyPart === null) || 
              (item !== 'All' && selectedBodyPart === item);
            
            return (
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  isSelected && styles.filterButtonSelected
                ]}
                onPress={() => {
                  if (item === 'All') {
                    resetFilters();
                  } else {
                    filterByBodyPart(item);
                  }
                }}
              >
                <Text 
                  style={[
                    styles.filterButtonText,
                    isSelected && styles.filterButtonTextSelected
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.filterList}
        />
      </View>
    );
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => {
    const isExpanded = expandedExercise === item.id;
    const isSelected = selectedExercises[item.id] || false;
    
    return (
      <View style={[styles.exerciseCard, isSelected && styles.exerciseCardSelected]}>
        <TouchableOpacity 
          style={styles.exerciseHeader}
          onPress={() => toggleExerciseExpand(item.id)}
          activeOpacity={0.7}
        >
          <View style={styles.exerciseBasicInfo}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.muscleGroup}>{item.bodyPart}</Text>
          </View>
          <TouchableOpacity
            style={[styles.selectButton, isSelected && styles.selectButtonSelected]}
            onPress={() => toggleExerciseSelect(item.id)}
          >
            <Text style={[styles.selectButtonText, isSelected && styles.selectButtonTextSelected]}>
              {isSelected ? 'Selected' : 'Select'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.expandedContent}>
            <Image 
              source={{ uri: item.gifUrl }} 
              style={styles.exerciseImage} 
              resizeMode="cover"
            />
            
            <View style={styles.exerciseDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Body Part:</Text>
                <Text style={styles.detailValue}>{item.bodyPart}</Text>
              </View>
              {item.target && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Target Muscle:</Text>
                  <Text style={styles.detailValue}>{item.target}</Text>
                </View>
              )}
              {item.equipment && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Equipment:</Text>
                  <Text style={styles.detailValue}>{item.equipment}</Text>
                </View>
              )}
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.logSetsButton}
                onPress={() => navigateToSetView(item.id)}
              >
                <Text style={styles.logSetsButtonText}>
                  Add to Workout
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
        <Text style={styles.workoutTitle}>Exercise Library</Text>
        <Text style={styles.workoutDescription}>
          Select exercises to add to your workout
        </Text>
      </View>
      
      {renderBodyPartFilter()}
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading exercises...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => resetFilters()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
      
      <View style={[styles.footer, { paddingBottom: insets.bottom || 16 }]}>
        <TouchableOpacity 
          style={styles.finishButton}
          onPress={() => {
            const selectedExerciseIds = Object.keys(selectedExercises).filter(id => selectedExercises[id]);
            console.log('Selected exercises:', selectedExerciseIds);
            // Here you would save the selected exercises to the workout
            navigation.goBack();
          }}
        >
          <Text style={styles.finishButtonText}>Add Selected Exercises</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  workoutDescription: {
    fontSize: 16,
    color: '#666',
  },
  filterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 10,
  },
  filterList: {
    paddingHorizontal: 16,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  filterButtonSelected: {
    backgroundColor: '#000',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  filterButtonTextSelected: {
    color: 'white',
  },
  listContainer: {
    padding: 16,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  exerciseCardSelected: {
    borderColor: '#000',
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
    marginBottom: 4,
  },
  muscleGroup: {
    fontSize: 14,
    color: '#666',
  },
  selectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  selectButtonSelected: {
    backgroundColor: '#000',
  },
  selectButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
  },
  selectButtonTextSelected: {
    color: 'white',
  },
  setInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setCount: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
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
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  exerciseDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    width: 120,
  },
  detailValue: {
    fontSize: 14,
    flex: 1,
  },
  notesContainer: {
    marginTop: 8,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  buttonContainer: {
    marginTop: 8,
  },
  logSetsButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logSetsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  completeButton: {
    marginTop: 8,
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#e0f2e0',
  },
  completeButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  separator: {
    height: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  finishButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#000',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ExerciseView;