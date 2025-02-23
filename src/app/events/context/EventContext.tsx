import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { Event } from '../types/eventTypes';

interface EventContextType {
  event: Event;
  setEvent: React.Dispatch<React.SetStateAction<Event>>;
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
  });

  return (
    <EventContext.Provider value={{ event, setEvent}}>
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