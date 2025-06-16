import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { verifyOtpToken, verifyRegisterToken } from '../utils/jwt.utils.js';

const authGuard: FastifyPluginAsync = async (fastify) => {
    fastify.decorateRequest('otpUser', null);
    fastify.decorateRequest('registerUser', null);

    fastify.addHook('preHandler', async (request, reply) => {
        const otpToken = request.headers['x-otp-token'];
        const registerToken = request.headers['x-register-token'];

        if (request.routeOptions?.config?.skipAuth === true) {
            return; // ⛔ skip auth check
        }

        if (otpToken && typeof otpToken === 'string') {
        const payload = verifyOtpToken(otpToken);
        if (!payload) return reply.status(401).send({ message: 'Invalid OTP token' });
        request.otpUser = payload;
        } else if (registerToken && typeof registerToken === 'string') {
        const payload = verifyRegisterToken(registerToken);
        if (!payload) return reply.status(401).send({ message: 'Invalid Register token' });
        request.registerUser = payload;
        } else {
        return reply.status(401).send({ message: 'Missing token in headers' });
        }
    })
}
export default fp(authGuard);
