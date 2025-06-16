import { Controller, GET } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('')
export default class MainController {
    @GET({
        url: '/',
        options: {
            config: {
                skipAuth: true
            }
        }
    })
    async home(request, reply) {
        reply.send('Welcome to Fastify Auth Boilerplate');
    }
}