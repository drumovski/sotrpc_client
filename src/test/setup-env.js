//! add this to your setupFilesAfterEnv inside jest.config.js so it's imported for every test file
import { server } from "./server";

beforeAll(() => server.listen());
console.log("server inside setup-env=>", server);
// if you need to add a handler after calling setupServer for some specific test
// this will remove that handler for the rest of them
// (which is important for test isolation):
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
