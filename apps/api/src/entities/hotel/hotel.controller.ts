import type { FastifyReply, FastifyRequest } from "fastify";

import type { HotelService } from "./hotel.service.js";

export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  getAll = async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.send(this.hotelService.getAll());
  };
}
