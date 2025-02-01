import { api } from "../../../services/api";
import { EventRequest, EventResponse, UserEventResponse } from "../models/eventModel";

export const createEvent = async (createEventRequest: EventRequest): Promise<EventResponse> => {
  try {
    return await api.post("/events/", createEventRequest);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserEvents = async (userId: string): Promise<UserEventResponse[]> => {
  try {
    const response = await api.get(`/events/users/${userId}`);
    return response.data;
    
  } catch (error) {
    console.error(error);
    throw error;
  }
};