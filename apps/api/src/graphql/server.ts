import { ApolloServer } from "@apollo/server";
import fastifyApollo, {
  fastifyApolloDrainPlugin,
} from "@as-integrations/fastify";
import { makeExecutableSchema } from "@graphql-tools/schema";
import type { FastifyPluginAsync } from "fastify";
import { readFileSync } from "fs";
import { useServer } from "graphql-ws/use/ws";
import { join } from "path";
import { WebSocketServer } from "ws";

import type { BookingService } from "@entities/booking/booking.service.js";
import type { HotelService } from "@entities/hotel/hotel.service.js";
import type { RoomService } from "@entities/room/room.service.js";

import type { Context } from "./resolvers.js";
import { resolvers } from "./resolvers.js";

const typeDefs = readFileSync(
  join(process.cwd(), "src/graphql/schema.graphql"),
  "utf-8",
);

export const graphqlRoutes: FastifyPluginAsync<{
  hotelService: HotelService;
  roomService: RoomService;
  bookingService: BookingService;
}> = async (app, { hotelService, roomService, bookingService }) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const apolloServer = new ApolloServer<Context>({
    schema,
    // Enable introspection and sandbox
    introspection: true,
    plugins: [fastifyApolloDrainPlugin(app)],
  });

  await apolloServer.start();

  // WebSocket server for subscriptions — uses raw HTTP upgrade so it doesn't
  // conflict with the Apollo route.
  const wsServer = new WebSocketServer({ noServer: true });
  const contextValue = () => ({ hotelService, roomService, bookingService });
  useServer({ schema, context: contextValue }, wsServer);

  app.server.on("upgrade", (request, socket, head) => {
    if (request.url === "/api/graphql") {
      wsServer.handleUpgrade(request, socket, head, (client) => {
        wsServer.emit("connection", client, request);
      });
    }
  });

  // Регистрируем Apollo с context function
  await app.register(fastifyApollo(apolloServer), {
    path: "/graphql",
    context: async () => contextValue(),
  });

  // Serve GraphiQL IDE on /sandbox
  app.get("/sandbox", async (request, reply) => {
    reply.type("text/html");
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>GraphiQL</title>
          <style>
            body {
              height: 100%;
              margin: 0;
              width: 100%;
              overflow: hidden;
            }
            #graphiql {
              height: 100vh;
            }
          </style>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
          <link rel="stylesheet" href="https://unpkg.com/graphiql@3/graphiql.min.css" />
        </head>
        <body>
          <div id="graphiql">Loading...</div>
          <script src="https://unpkg.com/graphiql@3/graphiql.min.js" type="application/javascript"></script>
          <script>
            ReactDOM.createRoot(document.getElementById('graphiql')).render(
              React.createElement(GraphiQL, {
                fetcher: GraphiQL.createFetcher({ url: 'http://localhost:8080/api/graphql' }),
                defaultQuery: 'query GetHotels {\\n  hotels {\\n    id\\n    name\\n    city\\n  }\\n}',
              }),
            );
          </script>
        </body>
      </html>
    `;
  });
};
