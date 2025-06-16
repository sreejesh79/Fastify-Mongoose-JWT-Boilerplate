// src/types/fastify.d.ts
import 'fastify';
import mongoose from 'mongoose';

declare module 'fastify' {
  interface FastifyInstance {
    mongoose: typeof mongoose;
  }

  interface FastifyContextConfig {
    skipAuth?: boolean;
  }
  
  interface FastifyRequest {
    otpUser?: any;
    registerUser?: any;
    user: any;
    cookies: {
      [cookieName: string]: string;
    }
  }

}