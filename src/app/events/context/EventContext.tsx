import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { Event, AlertTime } from '../types/eventTypes';

interface EventContextType {
  event: Event;
  setEvent: React.Dispatch<React.SetStateAction<Event>>;
  updateEvent: (partialEvent: Partial<Event>) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
  children: ReactNode;
  userId: string;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children, userId }) => {
  const [event, setEvent] = useState<Event>({
    name: "",
    admin: [userId],
    invitees: [],
    startTime: new Date(),
    endTime: new Date(),
    location: "",
    description: "",
    alertTime: AlertTime.AT_TIME, // Default alert time is at the time of event
  });

  const updateEvent = (partialEvent: Partial<Event>) => {
    setEvent((prevEvent) => ({
        ...prevEvent,
        ...partialEvent,
    }));
  }

  return (
    <EventContext.Provider value={{ event, setEvent, updateEvent}}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
};