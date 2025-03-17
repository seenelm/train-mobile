import axios from 'axios';

// Define the Exercise interface based on the RapidAPI response
export interface Exercise {
  id: string;
  name: string;
  bodyPart: string;
  gifUrl: string;
  target?: string;
  equipment?: string;
  secondaryMuscles?: string[];
  instructions?: string[];
}

// RapidAPI configuration
const RAPID_API_KEY = 'eafb80ef7cmsh28008d312b27656p14219djsn3c43a1979334'; // Replace with your actual RapidAPI key
const RAPID_API_HOST = 'exercisedb.p.rapidapi.com';
const BASE_URL = 'https://exercisedb.p.rapidapi.com';

// Create axios instance with RapidAPI headers
const exerciseApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-RapidAPI-Key': RAPID_API_KEY,
    'X-RapidAPI-Host': RAPID_API_HOST,
  },
});

/**
 * Fetch all exercises from the RapidAPI Exercises API
 * @returns Promise with array of exercises
 */
export const fetchAllExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await exerciseApiClient.get('/exercises');
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

/**
 * Fetch exercises by body part from the RapidAPI Exercises API
 * @param bodyPart The body part to filter exercises by
 * @returns Promise with array of exercises for the specified body part
 */
export const fetchExercisesByBodyPart = async (bodyPart: string): Promise<Exercise[]> => {
  try {
    const response = await exerciseApiClient.get(`/exercises/bodyPart/${bodyPart}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exercises for body part ${bodyPart}:`, error);
    throw error;
  }
};

/**
 * Fetch a single exercise by ID from the RapidAPI Exercises API
 * @param id The exercise ID
 * @returns Promise with the exercise details
 */
export const fetchExerciseById = async (id: string): Promise<Exercise> => {
  try {
    const response = await exerciseApiClient.get(`/exercises/exercise/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching exercise with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch all available body parts from the RapidAPI Exercises API
 * @returns Promise with array of body parts
 */
export const fetchBodyParts = async (): Promise<string[]> => {
  try {
    const response = await exerciseApiClient.get('/exercises/bodyPartList');
    return response.data;
  } catch (error) {
    console.error('Error fetching body parts:', error);
    throw error;
  }
};