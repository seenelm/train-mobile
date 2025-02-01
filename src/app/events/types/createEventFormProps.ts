export interface CreateEventFormProps {
    onSubmit: (eventData: {
      eventName: string;
      eventDescription: string;
      eventLocation: string;
      eventDate: Date;
      startTime: Date;
      endTime: Date;
    }) => void;
  }