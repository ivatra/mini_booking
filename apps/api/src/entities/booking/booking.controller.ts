import type { FastifyReply, FastifyRequest } from "fastify";

import type { BookingService } from "./booking.service.js";
import type { CreateBookingInput } from "./booking.types.js";

export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  getAll = async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.send(this.bookingService.list());
  };
  public create = async (
    request: FastifyRequest<{ Body: CreateBookingInput }>,
    reply: FastifyReply,
  ) => {
    const booking = this.bookingService.create(request.body);

    return reply.status(201).send(booking);
  };
}
