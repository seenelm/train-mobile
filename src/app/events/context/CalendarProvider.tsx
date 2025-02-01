import React, {createContext,useContext, useState, ReactNode} from "react";

interface CalendarContextProps {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
}
interface CalendarProviderProps {
    children: ReactNode;
}

const CalendarContext = createContext<CalendarContextProps | undefined>(undefined);

export const useCalendarContext = () => {
    const context = useContext(CalendarContext);
    if (!context) {
        throw console.error("some context bullshit");
        
    }
    return context;
}

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return(
        <CalendarContext.Provider value ={{selectedDate, setSelectedDate}}>
            {children}
        </CalendarContext.Provider>
    )
}