import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "./http-error.js";

export const errorHandler = (
  error: FastifyError | AppError,
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      message: error.message,
    });
  }

  if (error.validation) {
    return reply.status(400).send({
      message: "Validation failed",
      details: error.validation,
    });
  }

  return reply.status(500).send({
    message: "Internal server error",
  });
};
