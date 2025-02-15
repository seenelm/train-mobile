import { http, HttpResponse } from "msw";
import { apiUrl } from "../common/config";
import { eventMocks } from "./eventMocks";

export const handlers = [
  http.post(`${apiUrl}/api/events`, () => {
    return HttpResponse.json(eventMocks, { status: 201 });
  }),
];
