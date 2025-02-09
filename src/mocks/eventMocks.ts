import { EventResponse } from "../app/events/models/eventModel";

export const eventMocks: EventResponse[] = [
  {
    id: "1",
    name: "Event 1",
    admin: ["1234", "5678"],
    invitees: ["1234", "5678"],
    startTime: "2023-10-01T10:00:00Z",
    endTime: "2023-10-01T12:00:00Z",
    location: "Location 1",
    description: "Description 1",
  },
  {
    id: "2",
    name: "Event 2",
    admin: ["1234", "5678"],
    invitees: ["1234", "5678"],
    startTime: "2023-10-02T14:00:00Z",
    endTime: "2023-10-02T16:00:00Z",
    location: "Location 2",
    description: "Description 2",
  },
  {
    id: "3",
    name: "Event 3",
    admin: ["1234", "5678"],
    invitees: ["1234", "5678"],
    startTime: "2023-10-03T09:00:00Z",
    endTime: "2023-10-03T11:00:00Z",
    location: "Location 3",
    description: "Description 3",
  },
];
