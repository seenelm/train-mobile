import { CreateEventRequest } from "../models/createEventRequest";

// Event data models (userState)
export interface Event {
    name: string;
    admin: string[];
    invitees: string[];
    startTime: Date;
    endTime: Date;
    location: string;
    description: string;
}

// Component props

// Conversion methods
export const fromEvent = (event: Event): CreateEventRequest => {
    const createEventRequest: CreateEventRequest = {
        name: event.name,
        admin: event.admin,
        invitees: event.invitees,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location
    }
    return createEventRequest;
}