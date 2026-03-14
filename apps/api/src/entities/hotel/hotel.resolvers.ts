import type {
  GqlHotel,
  GqlHotelResolvers,
  GqlQueryResolvers,
} from "@graphql/generated.js";
import type { Context } from "@graphql/resolvers.js";

export const hotelQueryResolvers: Pick<
  GqlQueryResolvers<Context>,
  "hotels" | "hotel"
> = {
  async hotels(_parent, _args, { hotelService }) {
    return hotelService.getAll();
  },

  async hotel(_parent, { id }, { hotelService }) {
    return hotelService.getById(id) ?? null;
  },
};

export const hotelFieldResolvers: GqlHotelResolvers<Context> = {
  async rooms(hotel, _args, { roomService }) {
    return roomService.getByHotelId(hotel.id);
  },

  async roomsCount(
    hotel: GqlHotel,
    _args: Record<string, never>,
    { roomService }: Context,
  ): Promise<number> {
    const rooms = await roomService.getByHotelId(hotel.id);
    return rooms.length;
  },
};
