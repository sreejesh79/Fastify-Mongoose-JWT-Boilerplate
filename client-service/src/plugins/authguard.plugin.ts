import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

const authGuard: FastifyPluginAsync = async (fastify) => {

    fastify.addHook('preHandler', async (req, reply) => {
        if (req.routeOptions?.config?.skipAuth === true) {
            return; // ⛔ skip auth check
        }
        try {
            const user = await req.jwtVerify();
          } catch (err) {
            return reply.code(401).send(err.message);
          }
    })
}

export default fp(authGuard);