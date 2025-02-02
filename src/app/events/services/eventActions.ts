import { useMutation, useQuery, useQueryClient } from "react-query";
import { createEvent, getUserEvents } from "./eventServices";
import { EventRequest } from "../models/eventModel";
import { EventResponse } from "../models/eventModel";
import { ObjectId } from "mongodb";

export const useCreateEvent = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (createEventRequest: EventRequest): Promise<EventResponse> => createEvent(createEventRequest),
      onSuccess: () => {
        queryClient.invalidateQueries(["userEvents"]);
      },
      onError: (error) => {
        // log error to file
        console.error("useCreateEvent mutation error: ", error);
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
  }