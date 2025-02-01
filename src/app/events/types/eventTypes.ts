import { CreateEventRequest } from "../models/createEventRequest";
import { SharedValue } from "react-native-reanimated";

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

// Custom Hook types

// CALENDAR GESTURE
export interface CalendarGesture {
    gestureHandler: any;
    viewMode: string;
    isScrollable: boolean;
    panelHeight: SharedValue<number>;
}

export const fromCalendarGestureHook = (gestureHandler: any, viewMode: string, isScrollable: boolean, panelHeight: SharedValue<number>): CalendarGesture => {
    const calendarGesture: CalendarGesture = {
        gestureHandler,
        viewMode,
        isScrollable,
        panelHeight
    };
    return calendarGesture;
}

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