import 'reflect-metadata'; 
// @ts-ignore
import app from './app.js';

const port: any = process.env.PORT || 3000;

await app.listen({ port, host: '0.0.0.0' });
console.log(`🚀 Server listening on port ${port}`);