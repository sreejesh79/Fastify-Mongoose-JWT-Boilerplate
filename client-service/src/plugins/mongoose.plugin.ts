// src/plugins/mongoose.ts
import fp from 'fastify-plugin';
import mongoose from 'mongoose';
import { FastifyInstance } from 'fastify';

export default fp(async (fastify: FastifyInstance) => {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';
  console.log('uri', uri);
  try {
    await mongoose.connect(uri);
    fastify.log.info(`MongoDB connected : ${uri}`);
  } catch (err) {
    fastify.log.error(err);
    throw err;
  }

  fastify.decorate('mongoose', mongoose);
});
