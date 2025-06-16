// src/hooks/onSend.hook.ts
import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';

const onSendHookPlugin: FastifyPluginAsync = async (fastify) => {
  console.log('✅ onSend hook registered');

  fastify.addHook('onSend', async (request, reply, payload) => {
    console.log('🔥 onSend called');
    
    let data;
    try {
      data = JSON.parse(payload as string);
    } catch {
      data = payload;
    }

    if (data && typeof data === 'object' && 'status' in data && 'data' in data) {
      return payload; // already wrapped
    }

    const unified = {
      status: reply.statusCode >= 400 ? 'error' : 'success',
      data: data ?? null,
      message: reply.statusCode >= 400 ? 'An error occurred' : 'Request successful',
      code: reply.statusCode
    };

    return JSON.stringify(unified);
  });
};

export default fp(onSendHookPlugin, {
  name: 'onSendHookPlugin',
});
