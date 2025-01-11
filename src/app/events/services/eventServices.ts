import { ObjectId } from "mongodb";
import { api } from "../../../services/api";
import { CreateEventRequest } from "../models/createEventRequest";
import { CreateEventResponse } from "../models/createEventResponse";

export const createEvent = async (createEventRequest: CreateEventRequest): Promise<CreateEventResponse> => {
  try {
    return await api.post("/events/", createEventRequest);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserEvents = async (userId: string) => {
  try {
    const response = await api.get(`/events/users/${userId}`);
    return response.data;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};