import { Service, Inject } from 'fastify-decorators';
import { LamdaUtils } from '../../utils/lamda.utils';

@Service()
export class SESService {

    @Inject(LamdaUtils)
    private _lamdaUtils:LamdaUtils;

    public sendMail = async ( to: string[], subject: string, body: string ): Promise<any> => {
        const params: string = JSON.stringify( {
			'Source': process.env.FROM_EMAIL,
			'Destination': {
				'ToAddresses': to
			},
			'ReplyToAddresses': [],
			'Message': {
				'Body': {
					'Html': {
						'Charset': 'UTF-8',
						'Data': body
					}
				},
				'Subject': {
					'Charset': 'UTF-8',
					'Data': subject
				}
			}
		} );

        const emailResponse: any = await this._lamdaUtils.sesSendMail(params);
        return emailResponse;
    }

}