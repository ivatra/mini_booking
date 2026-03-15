import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import { getEnvVar } from "./helpers/index.js";
import { AppError } from "./http-error.js";

export const errorHandler = (
  error: FastifyError | AppError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  // Log full error for debugging
  console.error("Error:", error);

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
    error: getEnvVar("NODE_ENV") === "development" ? error.message : undefined,
  });
};
