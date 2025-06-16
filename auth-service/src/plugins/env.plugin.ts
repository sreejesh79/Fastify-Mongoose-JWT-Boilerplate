import fp from 'fastify-plugin';
import * as dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { FastifyInstance } from 'fastify';

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
    PORT: z.string().default('3000'),
    MONGO_URI: z.string().url(),
    PRIVATE_KEY: z.string(),
    PUBLIC_KEY: z.string(),
    // Add more env vars as needed
  });

  type EnvConfig = z.infer<typeof envSchema>;

export default fp(async (fastify: FastifyInstance) => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;
    const envPath = join(__dirname, `../../${envFile}`);
    dotenv.config({ path: envPath });
  
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
      fastify.log.error('❌ Invalid environment variables:');
      console.error(result.error.format());
      process.exit(1); // Abort startup
    }
    fastify.log.info(`✅ Loaded env from ${envFile}`);
  });