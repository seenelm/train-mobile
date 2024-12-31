import { api } from "../../../services/api";
import { CreateEventRequest } from "../models/createEventRequest";
import { CreateEventResponse } from "../models/createEventResponse";

export const createEvent = async (createEventRequest: CreateEventRequest): Promise<CreateEventResponse> => {
  try {
    return await api.post("events/", createEventRequest);
  } catch (error) {
    console.error(error);
    throw error;
  }

};