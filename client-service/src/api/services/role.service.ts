import { Service, Inject } from 'fastify-decorators';
import { IRoleModel } from '../models/role.model';
import RoleQueries from '../queries/role.queries';

@Service()
export default class RoleService {

    @Inject(RoleQueries)
    private _roleQueries: RoleQueries

    public getAllRoles = async ():Promise<IRoleModel[]> => {
        const roles: IRoleModel[] = await this._roleQueries.getAll();
        return roles;
    }
}