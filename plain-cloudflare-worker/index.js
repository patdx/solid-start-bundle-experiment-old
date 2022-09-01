import { createServer } from "@graphql-yoga/common";

const server = createServer({
  schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello from Yoga!",
      },
    },
  },
});

export default {
  fetch(request) {
    return server.handleRequest(request);
  },
};
