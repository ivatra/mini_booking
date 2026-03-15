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

const uri =
  (import.meta.env.VITE_API_URL || "http://localhost:3000") + "/graphql";
const httpLink = new HttpLink({
  uri,
  credentials: "include",
});

// Create WebSocket link for subscriptions
const wsLink = new GraphQLWsLink(
  createClient({
    url: (() => {
      return uri.replace(/^http/, "ws");
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
