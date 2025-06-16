import { FastifyPluginAsync } from 'fastify';
import { ApiError } from '../errors/api.error.js';

const errorHandlerPlugin: FastifyPluginAsync = async (fastify) => {
    fastify.setErrorHandler((error, request, reply) => {
      fastify.log.error(error);
  
      if (error instanceof ApiError) {
        reply.status(error.statusCode).send({
          error: true,
          status: 'fail',
          message: error.message,
          code: error.statusCode
        });
        return;
      }
  
      if (error.validation) {
        reply.status(400).send({
          error: true,
          status: 'fail',
          message: 'Validation error',
          errors: error.validation,
          code: 400
        });
        return;
      }
  
      reply.status(error.statusCode ?? 500).send({
        error: true,
        status: 'error',
        message: error.message || 'Internal Server Error',
        code: 500
      });
    });
  };
  
  export default errorHandlerPlugin;