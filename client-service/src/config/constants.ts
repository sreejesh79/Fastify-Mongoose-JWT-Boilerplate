import { Service } from 'fastify-decorators';

@Service()
export class Expiries {
    public readonly OTP_EXPIRY: number = 60 * 600; // 5 minutes
    public readonly OTP_TOKEN_EXPIRY: number = 60 * 10; // 5 minutes
    public readonly REGISTER_TOKEN_EXPIRY: number = 60 * 30; // 30 minutes
    public readonly REFRESH_TOKEN_EXPIRY: number = ( 60 * 60 ) * 24; // 24 hrs
}