import { useMutation, useQuery, useQueryClient } from "react-query";
import { createEvent, getUserEvents } from "./eventServices";
import { CreateEventRequest } from "../models/createEventRequest";
import { CreateEventResponse } from "../models/createEventResponse";
import { ObjectId } from "mongodb";

export const useCreateEvent = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (createEventRequest: CreateEventRequest): Promise<CreateEventResponse> => createEvent(createEventRequest),
      onSuccess: () => {
        queryClient.invalidateQueries(["event"]);
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