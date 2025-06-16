import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const onRouteHookPlugin: FastifyPluginAsync = async (fastify) => {
    console.log('✅ onRoute hook registered');
    fastify.addHook('onRoute', (routeOptions) => {
        console.log(`🛣️  Registered route: [${routeOptions.method}] ${routeOptions.url}`);
      });
}

export default fp(onRouteHookPlugin, {
  name: 'onRouteHookPlugin',
});