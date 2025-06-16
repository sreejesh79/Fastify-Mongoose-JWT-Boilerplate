import { Service } from 'fastify-decorators';
import { IEmailOtpPayloadDTO } from '../dto/auth.dto';
import emailOTPModel, { IEmailOtpModel } from '../models/emailotp.model';


@Service()
class EmailOTPQueries {

	public addEmailOtp = async ( emailOtpDTO: IEmailOtpPayloadDTO ): Promise<IEmailOtpModel> => {
		const email: string = emailOtpDTO.email;
		const isEmailOtpExists: IEmailOtpModel = await emailOTPModel.findOne( {
			email
		} );
		if ( isEmailOtpExists && isEmailOtpExists._id ) {
			const emailOTPModelObj: IEmailOtpModel = await emailOTPModel.findByIdAndUpdate( isEmailOtpExists._id,
				emailOtpDTO
				, {
					new: true
				} );
			return emailOTPModelObj;
		} else {
			const otpRecord: IEmailOtpModel = await emailOTPModel.create( emailOtpDTO );
			return  otpRecord ;
		}
	};

	public getValidEmailOtp = async ( email: string, otp: string ): Promise<IEmailOtpModel> => {
		const emailOtpModelObj: IEmailOtpModel = await emailOTPModel.findOne( {
			otp: otp,
			email: email,
			otpExpiry: { $gt: new Date().getTime() }
		} );
		return emailOtpModelObj;
	};
}
export default EmailOTPQueries;
