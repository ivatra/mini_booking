import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/graphql/schema.graphql",
  generates: {
    "./src/graphql/generated.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        useIndexSignature: true,
        useTypeImports: true,
        typesPrefix: "Gql",
        contextType: "./resolvers#Context",
        mappers: {
          Hotel: "../entities/hotel/hotel.types#Hotel",
          Room: "../entities/room/room.types#Room",
          Booking: "../entities/booking/booking.types#Booking",
        },
        maybeValue: "T | null | undefined",
        scalars: {
          ID: "string",
        },
      },
    },
  },
};

export default config;
