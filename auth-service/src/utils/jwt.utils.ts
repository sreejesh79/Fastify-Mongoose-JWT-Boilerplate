import jwt from 'jsonwebtoken';

export const signOtpToken = (payload: object) =>
    jwt.sign(payload, process.env.OTP_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '10m' });

export const verifyOtpToken = (token: string) =>
    jwt.verify(token, process.env.OTP_TOKEN_SECRET) as any;

export const signRegisterToken = (payload: object) =>
    jwt.sign(payload, process.env.REGISTER_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '1h' });

export const verifyRegisterToken = (token: string) =>
    jwt.verify(token, process.env.REGISTER_TOKEN_SECRET) as any;

export const signRefreshToken = (payload: object) =>
    jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '24h' });

export const verifyRefreshToken = (token: string) =>
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET) as any;

export const signIDToken = (payload: object) =>
    jwt.sign(payload, process.env.ID_TOKEN_SECRET, { algorithm: 'HS256', expiresIn: '5m' })

export const verifyIDToken = (token: string) =>
    jwt.verify(token, process.env.ID_TOKEN_SECRET) as any;