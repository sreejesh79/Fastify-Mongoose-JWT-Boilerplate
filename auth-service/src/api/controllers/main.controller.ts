import { Controller, GET } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';

@Controller('')
export default class MainController {
    @GET('')
    async home(request, reply) {
        reply.send('Welcome to Fastify Boilerplate');
    }
}