import type { FastifyReply, FastifyRequest } from "fastify";

import type { RoomService } from "./room.service.js";

type RoomListQuery = { hotelId?: string };

export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  getAll = async (
    request: FastifyRequest<{ Querystring: RoomListQuery }>,
    reply: FastifyReply,
  ) => {
    return reply.send(this.roomService.getAll(request.query.hotelId));
  };
}
