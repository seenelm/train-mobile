import { api } from "../../../services/api";
import {
  EventRequest,
  EventResponse,
  UserEventResponse,
  UserEventStatusRequest,
} from "../models/eventModel";

export const createEvent = async (
  createEventRequest: EventRequest
): Promise<EventResponse> => {
  try {
    return await api.post("/events/", createEventRequest);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateEvent = async (
  eventRequest: EventRequest,
  eventId: string,
  adminId: string
) => {
  try {
    const response = await api.put(
      `/events/${eventId}/users/${adminId}`,
      eventRequest
    );
    console.log("UPDATE EVENT RESPONSE STATUS: ", response.status);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserEvents = async (
  userId: string
): Promise<UserEventResponse[]> => {
  try {
    const response = await api.get(`/events/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw error;
  }
};

export const getUserEventById = async (
  eventId: string,
  userId: string
): Promise<UserEventResponse> => {
  try {
    const response = await api.get(`/events/${eventId}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user event by id:", error);
    throw error;
  }
};

export const updateUserEventStatus = async (
  eventId: string,
  userEventStatusRequest: UserEventStatusRequest
): Promise<void> => {
  try {
    await api.put(`/events/${eventId}/status`, userEventStatusRequest);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
