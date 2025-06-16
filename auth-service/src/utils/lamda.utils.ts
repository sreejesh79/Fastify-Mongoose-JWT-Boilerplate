import { Service } from 'fastify-decorators';
import { ApiError } from '../errors/api.error';

@Service()
export class LamdaUtils {

    public readonly BASE_URL: string = process.env.API_GATEWAY_URL;
    public sesSendMail = async (params:any): Promise<any> => {
		try {
            const res: any = await fetch(`${this.BASE_URL}/mail`, {
                method: 'POST',
                headers: this._addHeaders(),
                body: JSON.stringify({ params: params })
            })
            const data: any = await res.json();
            console.log(data);
			return data;
		} catch (e) {
			throw new ApiError(500, e.message);
		}
		
	}

    private _addHeaders = () => {
        let headers: any = {};
        headers['content-type'] = 'application/json';
        headers['x-api-key'] = process.env.API_GATEWAY_KEY;
        return headers;
    }
}