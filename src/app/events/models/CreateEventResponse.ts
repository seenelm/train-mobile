import { ObjectId } from 'mongodb';

export interface CreateEventResponse {
    id: ObjectId;
    name: string;
    admin: ObjectId[];
    invitees: ObjectId[];
    date: Date;
    startTime: Date;
    endTime: Date;
    location?: string;
    description?: string;
};