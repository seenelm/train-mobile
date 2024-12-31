import { useMutation, useQueryClient } from "react-query";
import { createEvent } from "./eventService";
import { CreateEventRequest } from "../models/createEventRequest";
import { CreateEventResponse } from "../models/createEventResponse";

export const useCreateEvent = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (createEventRequest: CreateEventRequest): Promise<CreateEventResponse> => createEvent(createEventRequest),
      onSuccess: () => {
        queryClient.invalidateQueries(["event"]);
      },
      onError: (error) => {
        // log error to file
        console.error("useAddGroup mutation error: ", error);
      },
    });
  };