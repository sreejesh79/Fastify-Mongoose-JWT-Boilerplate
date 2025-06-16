import { Service, Inject } from 'fastify-decorators';
import { IUserBodyPayloadDTO, IUserQueryPayloadDTO } from '../dto/user.dto';
import { IUserModel } from '../models/user.model';
import UserQueries from '../queries/user.queries';

@Service()
class UserService {

    @Inject(UserQueries)
    private _userQueries: UserQueries;
    
    public create = async ( body: IUserBodyPayloadDTO ): Promise<IUserModel> => {
        const payload: IUserQueryPayloadDTO = { ...body };
        payload.roles = [];
		payload.roles.push( body.role );

        const createUser: IUserModel = await this._userQueries.addUser( payload );
		return createUser;
    }
}

export default UserService;