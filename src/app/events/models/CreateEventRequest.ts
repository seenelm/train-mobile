export interface CreateEventRequest {
    name: string;
    admin: string[];
    invitees: string[];
    startTime: Date;
    endTime: Date;
    location?: string;
    description?: string;
}