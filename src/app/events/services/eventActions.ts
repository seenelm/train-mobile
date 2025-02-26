import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createEvent,
  getUserEvents,
  updateEvent,
  updateUserEventStatus,
  getUserEventById,
} from "./eventServices";
import { EventRequest, UserEventStatusRequest } from "../models/eventModel";
import { EventResponse } from "../models/eventModel";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (createEventRequest: EventRequest): Promise<EventResponse> =>
      createEvent(createEventRequest),
    onSuccess: () => {
      queryClient.invalidateQueries(["userEvents"]);
    },
    onError: (error) => {
      // log error to file
      console.error("useCreateEvent mutation error: ", error);
    },
  });
};

export const useUpdateEvent = (eventId: string, adminId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventRequest: EventRequest) =>
      updateEvent(eventRequest, eventId, adminId),
    onSuccess: () => {
      queryClient.invalidateQueries(["userEvents"]);
    },
    onError: (error) => {
      // log error to file
      console.error("useCreateEvent mutation error: ", error);
    },
  });
};

export const useUpdateUserEventStatus = (eventId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userEventStatusRequest: UserEventStatusRequest) =>
      updateUserEventStatus(eventId, userEventStatusRequest),
    onSuccess: () => {
      queryClient.invalidateQueries(["userEvents"]);
    },
    onError: (error) => {
      // log error to file
      console.error("useUpdateUserEventStatus mutation error: ", error);
    },
  });
};

export const useGetUserEvents = (userId: string) => {
  return useQuery({
    queryKey: ["userEvents", userId],
    queryFn: () => getUserEvents(userId),
    onError: (error) => {
      // log error to file
      console.error("useGetUserEvents query error: ", error);
    },
  });
};

export const useGetUserEventById = (eventId: string, userId: string) => {
  return useQuery({
    queryKey: ["userEventById", eventId, userId],
    queryFn: () => getUserEventById(eventId, userId),
    onError: (error) => {
      // log error to file
      console.error("useGetUserEventById query error: ", error);
    },
  });
};
