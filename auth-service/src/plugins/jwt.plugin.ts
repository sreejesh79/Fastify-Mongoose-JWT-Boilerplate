import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import fastifyJwt from '@fastify/jwt';
import { JWTCONFIG } from '../config/jwt.config';


const jwtPlugin: FastifyPluginAsync = async (fastify) => {
    // @ts-ignore
    fastify.register(fastifyJwt, {
        secret: {
          private: JWTCONFIG.PRIVATE_KEY,
          public: JWTCONFIG.PUBLIC_KEY
        },
        sign: {
          algorithm: JWTCONFIG.ALGORITHM,
        },
      });
}

export default fp(jwtPlugin);