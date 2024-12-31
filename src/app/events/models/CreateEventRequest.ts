import { ObjectId } from 'mongodb';

export interface CreateEventRequest {
    name: string;
    admin: ObjectId[];
    invitees: ObjectId[];
    date: Date;
    startTime: Date;
    endTime: Date;
    location?: string;
    description?: string;
}