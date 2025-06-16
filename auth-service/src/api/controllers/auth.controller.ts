import { Controller, POST, Inject, Hook } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import AuthService from '../services/auth.service';
import { IEmailOtpPayloadDTO, IOtpBodyDTO, IUserDTO } from '../dto/auth.dto';
import { LoginValidator } from '../validators/login.validator';
import { RefreshValidator } from '../validators/refresh.validator';

@Controller('/auth')
export default class AuthController {

    @Inject(AuthService)
    private _authService: AuthService;

    @Inject(LoginValidator)
    private _loginValidator: LoginValidator;

    @Inject(RefreshValidator)
    private _refreshValidator: RefreshValidator;

    @Hook('preHandler')
    async validators(request: FastifyRequest, reply: FastifyReply) {
        if (request.url.includes('/login')) {
            await this._loginValidator.execute(request, reply);
        } else if (request.url.includes('/refresh') || request.url.includes('/logout')) {
            await this._refreshValidator.execute(request, reply);
        }
    }
    
    @POST('/otp/send', {
        config: {
            skipAuth: true
        }
    })
	async sendOtp(req: FastifyRequest, reply: FastifyReply) {
        const response = await this._authService.sendEmailOtp(<IEmailOtpPayloadDTO>req.body);
        reply.send(response); 
    }

    @POST( '/otp/verify' )
    async verifyOtp(req: FastifyRequest, reply: FastifyReply) {
        const body: IOtpBodyDTO = <IOtpBodyDTO>req.body;
        const response = await this._authService.verifyEmailOTP(<IUserDTO>req.otpUser, body.otp);
        reply.send(response);
    }
    
     @POST('/login', {
        config: {
            skipAuth: true
        }
    })
    async login (req: FastifyRequest, reply: FastifyReply) {
        console.log(req.user);
        const access: any = await this._authService.login(req, reply);
        reply.send(access);
    }

    @POST('/refresh', {
        config: {
            skipAuth: true
        }
    })
    async refresh (req: FastifyRequest, reply: FastifyReply) {
        const access: any = await this._authService.login(req, reply);
        reply.send(access);
    }

    @POST('/logout', {
        config: {
            skipAuth: true
        }
    })
    async logout(req: FastifyRequest, reply: FastifyReply) {
        const response: any = await this._authService.logout(req, reply);
        reply.send(response);
    }
}