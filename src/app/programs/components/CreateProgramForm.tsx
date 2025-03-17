import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, RouteProp, useRoute } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/types/navigationTypes';
import * as Icons from '../../../assets/icons';
import { useCreateGroupProgram } from '../../groups/services/groupActions';
import { ProgramRequest } from '../../groups/models/Programs';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../services/authSlice';

type CreateProgramFormProps = {
  navigation: NavigationProp<MainStackParamList>;
};

type CreateProgramRouteProps = RouteProp<MainStackParamList, 'CreateProgram'>;

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
const programCategories = ['Strength', 'Hypertrophy', 'Endurance', 'Weight Loss', 'Mobility'];

const CreateProgramForm = ({ navigation }: CreateProgramFormProps) => {
  const insets = useSafeAreaInsets();
  const route = useRoute<CreateProgramRouteProps>();
  const { groupId } = route.params;
  const userId = useSelector(selectUser);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150');

  // Get the mutation hook
  const createGroupProgramMutation = useCreateGroupProgram();

  const handleCreateProgram = () => {
    // Validate form
    if (!title || !description || !duration || !selectedDifficulty || !selectedCategory) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    if (!groupId) {
      Alert.alert('Error', 'Group ID is missing. Cannot create program.');
      return;
    }

    // Create program object
    const newProgram: ProgramRequest = {
      name: title,
      description,
      category: selectedCategory,
      difficulty: selectedDifficulty,
      imagePath: imageUrl,
      createdBy: userId || 'unknown-user',
      numWeeks: parseInt(duration, 10),
      weeks: [], // This would be populated later
    };

    console.log('Creating program for group:', groupId);
    console.log('Program data:', newProgram);

    // Call the mutation
    createGroupProgramMutation.mutate(
      { groupId, program: newProgram },
      {
        onSuccess: () => {
          console.log('Program created successfully');
          
          // Show success message
          Alert.alert(
            'Program Created',
            'Your program has been created successfully!',
            [
              {
                text: 'OK',
                onPress: () => {
                  // First dismiss the modal
                  navigation.goBack();
                  
                  // Then navigate to WeekView after a short delay to ensure modal is dismissed
                  setTimeout(() => {
                    navigation.navigate('WeekView');
                  }, 300);
                }
              }
            ]
          );
        },
        onError: (error) => {
          console.error('Failed to create program:', error);
          Alert.alert(
            'Error',
            'Failed to create program. Please try again.'
          );
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Create New Program</Text>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Program Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter program title"
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter program description"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Duration (weeks)</Text>
          <TextInput
            style={styles.input}
            value={duration}
            onChangeText={setDuration}
            placeholder="Enter number of weeks"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Difficulty Level</Text>
          <View style={styles.optionsContainer}>
            {difficultyLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.optionButton,
                  selectedDifficulty === level && styles.selectedOption
                ]}
                onPress={() => setSelectedDifficulty(level)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedDifficulty === level && styles.selectedOptionText
                  ]}
                >
                  {level}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.optionsContainer}>
            {programCategories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.optionButton,
                  selectedCategory === category && styles.selectedOption
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text 
                  style={[
                    styles.optionText,
                    selectedCategory === category && styles.selectedOptionText
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.formGroup}>
          <Text style={styles.label}>Cover Image</Text>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: imageUrl }} 
              style={styles.previewImage} 
            />
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.createButton,
            createGroupProgramMutation.isLoading && styles.disabledButton
          ]}
          onPress={handleCreateProgram}
          disabled={createGroupProgramMutation.isLoading}
        >
          {createGroupProgramMutation.isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.createButtonText}>Create Program</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  optionText: {
    color: '#333',
    fontSize: 14,
  },
  selectedOptionText: {
    color: 'white',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateProgramForm;