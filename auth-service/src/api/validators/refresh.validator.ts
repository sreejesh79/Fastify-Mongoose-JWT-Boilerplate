import { Service, Inject } from 'fastify-decorators';
import UserQueries from '../queries/user.queries';
import { ApiError } from '../../errors/api.error';
import { verifyRefreshToken } from '../../utils/jwt.utils';

@Service()
export class RefreshValidator {

    @Inject(UserQueries)
    private _userQueries: UserQueries;

    async execute (req, reply) {
        const token = req.cookies?.refreshToken;
        if (token) {
            try {
                const payload = verifyRefreshToken(token);
                const user: any = await this._userQueries.getUserByToken(token);
                if (user && user._id) {
                    req.user = user;
                } else {
                    reply.clearCookie('refreshToken')
                    throw new ApiError(401, 'Token revoked.');
                }
            } catch (e) {
                reply.clearCookie('refreshToken')
                throw new ApiError(401, e.message);
            }
        } else {
            throw new ApiError(401, 'Refresh token not found in cookies.');
        }
    }
}