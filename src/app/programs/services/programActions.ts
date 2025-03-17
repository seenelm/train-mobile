import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import * as programServices from './programServices';
import { Exercise } from './programServices';

/**
 * Custom hook to fetch and manage exercises from the RapidAPI
 */
export const useExercises = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bodyParts, setBodyParts] = useState<string[]>([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  /**
   * Fetch all exercises from the API
   */
  const fetchExercises = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await programServices.fetchAllExercises();
      setExercises(data);
      setFilteredExercises(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch exercises. Please try again later.');
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch exercises. Please try again later.');
    }
  }, []);

  /**
   * Fetch all available body parts
   */
  const fetchBodyParts = useCallback(async () => {
    try {
      const data = await programServices.fetchBodyParts();
      setBodyParts(data);
    } catch (err) {
      console.error('Error fetching body parts:', err);
    }
  }, []);

  /**
   * Filter exercises by body part
   */
  const filterByBodyPart = useCallback(async (bodyPart: string) => {
    setLoading(true);
    setError(null);
    setSelectedBodyPart(bodyPart);
    
    try {
      const data = await programServices.fetchExercisesByBodyPart(bodyPart);
      setFilteredExercises(data);
      setLoading(false);
    } catch (err) {
      setError(`Failed to fetch exercises for ${bodyPart}. Please try again later.`);
      setLoading(false);
      Alert.alert('Error', `Failed to fetch exercises for ${bodyPart}. Please try again later.`);
    }
  }, []);

  /**
   * Reset filters and show all exercises
   */
  const resetFilters = useCallback(() => {
    setSelectedBodyPart(null);
    setFilteredExercises(exercises);
  }, [exercises]);

  /**
   * Search exercises by name
   */
  const searchExercises = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) {
      if (selectedBodyPart) {
        filterByBodyPart(selectedBodyPart);
      } else {
        setFilteredExercises(exercises);
      }
      return;
    }

    const term = searchTerm.toLowerCase().trim();
    const results = exercises.filter(exercise => 
      exercise.name.toLowerCase().includes(term) || 
      exercise.bodyPart.toLowerCase().includes(term)
    );
    
    setFilteredExercises(results);
  }, [exercises, filterByBodyPart, selectedBodyPart]);

  // Load exercises and body parts on initial render
  useEffect(() => {
    fetchExercises();
    fetchBodyParts();
  }, [fetchExercises, fetchBodyParts]);

  return {
    exercises: filteredExercises,
    loading,
    error,
    bodyParts,
    selectedBodyPart,
    fetchExercises,
    filterByBodyPart,
    resetFilters,
    searchExercises
  };
};