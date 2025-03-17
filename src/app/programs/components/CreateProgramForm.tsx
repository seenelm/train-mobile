import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp } from '@react-navigation/native';
import { MainStackParamList } from '../../../navigation/types/navigationTypes';
import * as Icons from '../../../assets/icons';

type CreateProgramFormProps = {
  navigation: NavigationProp<MainStackParamList>;
};

const difficultyLevels = ['Beginner', 'Intermediate', 'Advanced'];
const programCategories = ['Strength', 'Hypertrophy', 'Endurance', 'Weight Loss', 'Mobility'];

const CreateProgramForm = ({ navigation }: CreateProgramFormProps) => {
  const insets = useSafeAreaInsets();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/150');

  const handleCreateProgram = () => {
    // Validate form
    if (!title || !description || !duration || !selectedDifficulty || !selectedCategory) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    // Create program object
    const newProgram = {
      id: Date.now().toString(),
      title,
      description,
      duration: parseInt(duration, 10),
      difficulty: selectedDifficulty,
      category: selectedCategory,
      image: imageUrl,
      weeks: [],
      createdAt: new Date().toISOString(),
    };

    // In a real app, you would save this to your backend
    console.log('New program created:', newProgram);
    
    // Navigate to WeekView or another appropriate screen
    Alert.alert(
      'Program Created',
      'Your program has been created successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
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
          style={styles.createButton}
          onPress={handleCreateProgram}
        >
          <Text style={styles.createButtonText}>Create Program</Text>
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
    fontWeight: 'bold',
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
    marginHorizontal: -4,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedOptionText: {
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  uploadButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#333',
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateProgramForm;