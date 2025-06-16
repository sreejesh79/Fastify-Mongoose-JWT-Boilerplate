import { Service } from 'fastify-decorators';
import RoleModel, { IRoleModel } from '../models/role.model';

@Service()
class RoleQueries {

	public getAll = async (): Promise<IRoleModel[]> => {
		const roles: IRoleModel[] = await RoleModel.find()
			.lean()
			.exec();
		return roles;
	};

	

	public getRolesByIds = async ( ids: string[] ): Promise<IRoleModel[]> => {
		const roles: IRoleModel[] = await RoleModel.find( { _id : { '$in': ids } } )
			.lean()
			.exec();
		return roles;
	};


	public getRoleByMachineName = async ( machineName: string ): Promise<IRoleModel> => {
		const role = await RoleModel.findOne( {
			machine_name: machineName
		} ).lean().exec();
		return role;
	};
}

export default RoleQueries;
