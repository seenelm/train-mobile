import { server } from "./src/mocks/server";

beforeAll(() => {
  server.listen();
  server.events.on("request:start", ({ request }) => {
    console.log("Outgoing:", request.method, request.url);
  });
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
