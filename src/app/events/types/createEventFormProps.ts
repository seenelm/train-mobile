import { CreateEventRequest } from "../models/createEventRequest";
export interface CreateEventFormProps {
    onSubmit: (createEventRequest: CreateEventRequest) => void;
  }