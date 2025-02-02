import { Event } from "../types/eventTypes";

export interface EventResponse {
    id: string;
    name: string;
    admin: string[];
    invitees: string[];
    startTime: string;
    endTime: string;
    location?: string;
    description?: string;
};

export interface EventRequest {
    name: string;
    admin: string[];
    invitees: string[];
    startTime: Date;
    endTime: Date;
    location?: string;
    description?: string;
}

export const fromEvent = (event: Event): EventRequest => {
    const createEventRequest: EventRequest = {
        name: event.name,
        admin: event.admin,
        invitees: event.invitees,
        startTime: event.startTime,
        endTime: event.endTime,
        location: event.location
    }
    return createEventRequest;
}

export interface UserEventResponse {
    status: number;
    event: EventResponse;
}