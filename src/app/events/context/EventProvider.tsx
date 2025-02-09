import React, {createContext,useContext, useState, ReactNode} from "react";

interface EventContextProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}

interface EventProviderProps {
    children: ReactNode;
}

const EventContext = createContext<EventContextProps | undefined>(undefined);

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw console.error("some context bullshit");
        
    }
    return context;
}

export const EventProvider: React.FC<EventProviderProps> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    

    const eventContextProps: EventContextProps = {
        selectedDate,
        setSelectedDate,
    };

    return(
        <EventContext.Provider value ={eventContextProps}>
            {children}
        </EventContext.Provider>
    )
}