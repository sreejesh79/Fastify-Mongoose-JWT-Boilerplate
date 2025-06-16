import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

export class JWTCONFIG {

    public static readonly ALGORITHM: string = 'ES256';
    public static readonly EXPIRESIN: string = '1h';

    public static get PRIVATE_KEY(): any {
        return readFileSync(join(dirname(fileURLToPath(import.meta.url)), `../../.keys/${process.env.PRIVATE_KEY}`), 'utf8');
    }

    public static get PUBLIC_KEY(): any {
        return readFileSync(join(dirname(fileURLToPath(import.meta.url)), `../../.keys/${process.env.PUBLIC_KEY}`), 'utf8');
    }
}