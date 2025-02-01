
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

export interface UserEventResponse {
    status: number;
    event: EventResponse;
}