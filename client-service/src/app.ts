import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import { bootstrap } from 'fastify-decorators';
import { join } from 'path';
import envPlugin from './plugins/env.plugin.js';
import jwtPlugin from './plugins/jwt.plugin.js';
import errorHandlerPlugin from './plugins/error.plugin.js';
import onSendHook from './hooks/onSend.hook.js'; // If using compiled JS
import onRouteHook from './hooks/onRoute.hook.js';
// dotenv.config();
import mongoosePlugin from './plugins/mongoose.plugin.js'; // .js for ESModules
import authguardPlugin from './plugins/authguard.plugin.js';


// import connectDB from './config/db.js';


const app = Fastify({ logger: true });

await app.register(cors, {
    origin: '*', // Or specify allowed origins
  });

await app.register(helmet, {
contentSecurityPolicy: false,
});

await app.register(rateLimit, {
    max: 100,             // Max 100 requests
    timeWindow: '1 minute', // Per minute
    allowList: ['127.0.0.1'], // Whitelist (optional)
    ban: 2,               // Ban after 2 timeWindow violations
  });

  await app.register(envPlugin);
  await app.register(errorHandlerPlugin);
  await app.register(jwtPlugin);
  await app.register(authguardPlugin);
  await app.register(onSendHook);
  await app.register(onRouteHook);
  await app.register(mongoosePlugin);

  const controllersDir =
  process.env.NODE_ENV === 'prod'
    ? join(process.cwd(), 'dist/api/controllers')
    : join(process.cwd(), 'src/api/controllers');

await bootstrap(app, {
  directory: controllersDir,
  mask: /\.controller\.[tj]s$/,
 prefix: '/api/v1'
});
// await connectDB();

// app.register(userRoutes, { prefix: '/api/users' });

export default app;
