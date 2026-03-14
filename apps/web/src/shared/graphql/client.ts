import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  split,
  type ApolloLink,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: import.meta.env.VITE_API_URL || "http://localhost:3000/graphql",
  credentials: "include",
});

// Create WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: (() => {
      const url =
        import.meta.env.VITE_API_URL || "http://localhost:3000/graphql";

      return url.replace(/^http/, "ws");
    })(),
  }),
);

// Split link based on operation type
const link: ApolloLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query) as {
      kind: string;
      operation?: string;
    };

    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink,
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
