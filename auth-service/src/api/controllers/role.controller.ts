import { Controller, GET, Inject } from 'fastify-decorators';
import { FastifyReply, FastifyRequest } from 'fastify';
import RoleService from '../services/role.service';

@Controller('/role')
export default class RoleCOntroller {
    
    @Inject(RoleService)
    private _roleService: RoleService;

    @GET('/list')
    async list(req: FastifyRequest, res: FastifyReply) {

        const roles = await this._roleService.getAllRoles();
        res.send(roles);
    }
}