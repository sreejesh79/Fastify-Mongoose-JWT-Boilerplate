import { Service, Inject } from 'fastify-decorators';
import { IUserBodyPayloadDTO } from "../dto/user.dto";
import RoleQueries from '../queries/role.queries';
import { IRoleModel } from '../models/role.model';
import { ApiError } from '../../errors/api.error';

@Service()
export class UserValidator {

    @Inject(RoleQueries)
    private _roleQueries: RoleQueries;

    async validateRole(req, reply) {
        const body: IUserBodyPayloadDTO = <IUserBodyPayloadDTO>req.body;
    	const role: string  = body.role;
        console.log(role);
        const validRole: IRoleModel = await this._roleQueries.getRoleByMachineName( role );
        if (validRole && validRole._id) {
            body.role = validRole._id;
            req.body = body;
        } else {
            throw new ApiError(400, `Role ${role} not found`);
        }
    }
}