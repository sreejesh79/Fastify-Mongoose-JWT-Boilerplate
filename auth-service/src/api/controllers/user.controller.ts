import { Controller, POST, Inject, Hook } from 'fastify-decorators';
import { UserValidator } from '../validators/user.validator';
import UserService from '../services/user.service';
import { IUserBodyPayloadDTO } from '../dto/user.dto';

@Controller('/user')
export default class UserController {

    @Inject(UserService)
    private _userService: UserService;

    @Inject(UserValidator)
    private _validator: UserValidator;

    @Hook('preHandler')
    async userValidator(req, reply) {
        if (req.url.includes('/register')){
            await this._validator.validateRole(req, reply);
        }
    }
    @POST('/register')
    async register(req, reply) {
       // await this._validator.validateRole(req, reply);
        const body: IUserBodyPayloadDTO = <IUserBodyPayloadDTO>req.body;
        const response = await this._userService.create(body);
        reply.send(response);
    }

}