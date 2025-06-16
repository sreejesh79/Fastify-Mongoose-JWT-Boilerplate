import { Service, Inject } from 'fastify-decorators';
import { FastifyRequest, FastifyReply } from 'fastify';
import { IEmailOtpModel, } from '../models/emailotp.model';
import EmailOTPQueries from '../queries/emailotp.queries';
import UtilityScripts from '../../utils/utilityscripts';
import { IEmailOtpDTO, IEmailOtpPayloadDTO, IUserDTO } from '../dto/auth.dto';
import { ApiError } from '../../errors/api.error';
import { Expiries } from '../../config/constants';
import { signOtpToken, signRegisterToken } from '../../utils/jwt.utils';
import { SESService } from './mail.service';
import { IUserModel } from '../models/user.model';
import UserQueries from '../queries/user.queries';
import { IUserBodyPayloadDTO } from '../dto/user.dto';
import UserService from './user.service';
import { signRefreshToken, signIDToken } from '../../utils/jwt.utils';
import { request } from 'https';

@Service()
class AuthService {


    @Inject(EmailOTPQueries)
    private _emailOtpQueries: EmailOTPQueries;

    @Inject(Expiries)
    private _expiries: Expiries;

    @Inject(SESService)
    private _sesService: SESService;

    @Inject(UserQueries)
    private _userQueries: UserQueries;

    @Inject(UserService)
    private _userService: UserService;

    public sendEmailOtp = async ( generateOtp: IEmailOtpPayloadDTO ): Promise<any> => {
		const email: string = generateOtp.email;
		const fullname: string = generateOtp.fullname;
		if ( await this._checkEmailExists( email ) ) {
			throw new ApiError( 400, 'Email ID already Exists');
		}
		const otp: string =  UtilityScripts.generateOTP();
		const otpExpiry: number = UtilityScripts.generateExpiry( this._expiries.OTP_EXPIRY );
		const otpToken: string = signOtpToken(generateOtp);
		const toEmail = email;
		const subject = 'Your Confirmation Code for Fastify Boilerplate';
		const body = `
        <html>
            <body>
                <p>
				To access Fastify Boilerplate App, please enter the confirmation code shown below.<br/><br/>
				<h1>${otp}</h1>
				<br/><br/>Thanks<br/><br/>Boilerplate Team
				</p>
            </body>
        </html>
    `;
		await this._sesService.sendMail( [toEmail], subject, body );
		const emailOTPDTO: IEmailOtpDTO = {
			email,
			otp,
			otpExpiry,
			otpToken,
			fullname
		};
		const response: IEmailOtpModel = await this._emailOtpQueries.addEmailOtp( emailOTPDTO );
		return  response
	};

    private _checkEmailExists = async ( email: string ): Promise<boolean> => {
		const emailExists: IUserModel = await this._userQueries.getByEmail( email );
		if ( emailExists && emailExists._id ) {
			return true;
		} else {
			return false;
		}
	};

    public verifyEmailOTP = async (otpUser: IUserDTO, otp: string): Promise<any> => {
        const email: string = otpUser.email;
        
        const emailOtp: IEmailOtpModel = await this._emailOtpQueries.getValidEmailOtp(email, otp);
        if (emailOtp && emailOtp._id) {
            const registerToken: string = signRegisterToken({
                email: otpUser.email,
                fullname: otpUser.fullname
            });
            return {
                email: emailOtp.email,
                fullname: emailOtp.fullname,
                registerToken
            }
        } else {
            throw new ApiError(400, 'Invalid Request');
        }
    }

    public register = async ( body: IUserBodyPayloadDTO):Promise<any> => {
        const newUser: IUserModel = await this._userService.create(body);
        return newUser;
    }

    public login = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {
        const user: any = req.user;
        let tokens: any = await this._generateTokens(user);
        const jwt: any = await reply.jwtSign( {
            uid: user._id
        } );
        const refreshToken = tokens.refreshToken;
        reply.setCookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/'
        })
        delete tokens.refreshToken;
        tokens.accessToken = jwt;
        return tokens;
    }

    private _generateTokens = async ( user: any ): Promise<any> => {
		const refreshToken: string = signRefreshToken(user);
		const updatedUser: any = await this._userQueries.updateRefreshToken( user._id, refreshToken );
        const idToken: string = signIDToken(updatedUser);
		
		const tokens: any = {
			refreshToken,
		    idToken
		};
		return tokens;
	};

    public logout = async (req: FastifyRequest, reply: FastifyReply): Promise<any> => {
        const user: any = req.user;
        reply.clearCookie('refreshToken');
        await this._userQueries.clearToken(user._id);
        return 'Logout Successfull';
    }
}   


export default AuthService;