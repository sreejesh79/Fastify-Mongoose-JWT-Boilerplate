import { Service, Inject } from 'fastify-decorators';
import { IUserModel } from "../models/user.model";
import UserQueries from '../queries/user.queries';
import { ILoginPayloadDTO } from '../dto/auth.dto';
import { PasswordUtils } from '../../utils/password.utils';
import { ApiError } from '../../errors/api.error';

@Service()
export class LoginValidator {
    
    @Inject(UserQueries)
    private _userUeries: UserQueries;

    async execute (req, reply) {
        const body: ILoginPayloadDTO = <ILoginPayloadDTO>req.body;
        const userExists:IUserModel = await this._userUeries.getPasswordByEmail(body.email);
        if ( userExists && userExists._id ) {
            const isValidUser: Boolean = await PasswordUtils.comparePassword(body.password, userExists.password);
            if (isValidUser) {
                delete userExists.password;
                req.user = {
                    _id: userExists._id,
                    email: userExists.email
                };
            } else {
                throw new ApiError(401, 'Wrong Password');
            }
        } else {
            throw new ApiError(404, 'User not found');
        }
    }
}